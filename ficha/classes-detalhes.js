// ============================================================
//  classes-detalhes.js — Detalhes mecânicos de classe usados pela ficha
//  Carregue DEPOIS de classes-data.js e ANTES de script.js.
//  A chave é o id da classe em classes-data.js (ou o nome sem acento/minúsculo).
//
//  Campos por classe:
//    pmAtributo      -> atributo somado UMA vez ao total de PM ('INT', 'SAB', 'CAR'...).
//                       Array = usa o maior modificador entre os listados (ex.: ['INT','CAR']).
//                       Vale para TODAS as classes do personagem (multiclasse).
//    variantes       -> { 'Nome da variante': { pmAtributo } } substitui o da classe.
//    poderes         -> { 'Nome do poder': { aliases?, pmAtributo?, pvAtributo?, defesaAtributo?, nota? } }
//                       Só conta se o poder estiver na ficha (lista "Classe e Poderes")
//                       e a classe estiver entre as classes do personagem.
//
//  REGRA: o mesmo atributo nunca é somado duas vezes no mesmo valor.
//    PM:     sem atributo "de base" (cada atributo entra uma única vez)
//    PV:     CON já entra por nível, então nenhum poder soma CON de novo
//    Defesa: o atributo escolhido na fórmula da Defesa (se marcado) já está contado
// ============================================================
const CLASS_PM_SOMENTE_CLASSE_INICIAL = false;

const CLASS_SHEET_DETAILS = {
    arcanista: {
        nome: 'Arcanista',
        // Sem caminho escolhido: usa o maior entre Inteligência e Carisma (como na Forja)
        pmAtributo: ['INT', 'CAR'],
        variantes: {
            'Mago':       { pmAtributo: 'INT' },
            'Bruxo':      { pmAtributo: 'INT' },
            'Necromante': { pmAtributo: 'INT' },
            'Feiticeiro': { pmAtributo: 'CAR' }
        }
    },

    barbaro: {
        nome: 'Bárbaro',
        poderes: {
            'Totem Espiritual': { aliases: ['Totem'], pmAtributo: 'SAB', nota: 'soma Sabedoria nos PM' }
        }
    },

    bardo:    { nome: 'Bardo',    pmAtributo: 'CAR' },
    paladino: { nome: 'Paladino', pmAtributo: 'CAR' },
    druida:   { nome: 'Druida',   pmAtributo: 'SAB' },
    frade:    { nome: 'Frade',    pmAtributo: 'SAB' },

    clerigo: {
        nome: 'Clérigo',
        pmAtributo: 'SAB',
        variantes: {
            'Usurpador': { pmAtributo: 'CAR' }
        }
    },

    lutador: {
        nome: 'Lutador',
        poderes: {
            'Sarado':   { defesaAtributo: 'FOR', nota: 'soma Força na Defesa' },
            'Trincado': { pvAtributo: 'FOR',     nota: 'soma Força nos PV (uma única vez)' }
        }
    }
};

// ------------------------------------------------------------
//  Cálculo (sem DOM). Entrada:
//    classes: [{ id, name?, level, variant }]  — posição 0 = classe inicial
//    attrs:   { FOR, DES, CON, INT, SAB, CAR }  — modificadores
//    poderes: ['Sarado', 'Totem Espiritual', ...] — nomes dos poderes da ficha
//    base:    { pm: [], pv: ['CON'], def: ['DES'] } — atributos já contados
//  Saída: { pm, pv, def } com { total, fontes:[{atributo, valor, fonte}] }
//         e `ignorados` (somas descartadas por repetir atributo).
// ------------------------------------------------------------
const CLASS_SHEET_CALC = (function () {
    const norm = t => String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    const slug = t => norm(t).replace(/[^a-z0-9]/g, '');

    function detalhe(c) {
        return CLASS_SHEET_DETAILS[c.id] || CLASS_SHEET_DETAILS[slug(c.id)] || CLASS_SHEET_DETAILS[slug(c.name)] || null;
    }
    function variante(det, nome) {
        if (!det || !det.variantes || !nome) return null;
        const k = Object.keys(det.variantes).find(v => slug(v) === slug(nome));
        return k ? det.variantes[k] : null;
    }
    function nomePoderBate(nomeFicha, chave, aliases) {
        const n = norm(nomeFicha);
        return [chave].concat(aliases || []).some(a => {
            const k = norm(a);
            return n === k || n.startsWith(k + ' ') || n.startsWith(k + ':') || n.startsWith(k + '(');
        });
    }

    function compute(opts) {
        const classes = (opts && opts.classes) || [];
        const attrs = (opts && opts.attrs) || {};
        const poderes = (opts && opts.poderes) || [];
        const base = Object.assign({ pm: [], pv: ['CON'], def: [] }, (opts && opts.base) || {});
        const mod = a => parseInt(attrs[a]) || 0;

        const out = { pm: { total: 0, fontes: [] }, pv: { total: 0, fontes: [] }, def: { total: 0, fontes: [] }, ignorados: [] };
        const usados = { pm: new Set(base.pm), pv: new Set(base.pv), def: new Set(base.def) };

        function somar(stat, atributo, fonte) {
            if (!atributo) return;
            if (usados[stat].has(atributo)) { out.ignorados.push({ stat, atributo, fonte }); return; }
            usados[stat].add(atributo);
            const valor = mod(atributo);
            out[stat].total += valor;
            out[stat].fontes.push({ atributo, valor, fonte });
        }

        // 1) atributo-chave de PM de cada classe (multiclasse: todas somam)
        classes.forEach((c, i) => {
            if (CLASS_PM_SOMENTE_CLASSE_INICIAL && i > 0) return;
            const det = detalhe(c); if (!det) return;
            const v = variante(det, c.variant);
            let atr = (v && v.pmAtributo) || det.pmAtributo;
            if (!atr) return;
            if (Array.isArray(atr)) atr = atr.slice().sort((a, b) => mod(b) - mod(a))[0];
            somar('pm', atr, (det.nome || c.name || c.id) + (c.variant ? ` (${c.variant})` : ''));
        });

        // 2) poderes que somam atributo
        classes.forEach(c => {
            const det = detalhe(c); if (!det || !det.poderes) return;
            Object.keys(det.poderes).forEach(nome => {
                const p = det.poderes[nome];
                if (!poderes.some(pf => nomePoderBate(pf, nome, p.aliases))) return;
                somar('pm', p.pmAtributo, nome);
                somar('pv', p.pvAtributo, nome);
                somar('def', p.defesaAtributo, nome);
            });
        });
        return out;
    }

    // Nomes de poderes que alteram cada valor (para detectar lançamento manual duplicado)
    function nomesPoderes(classes) {
        const nomes = [];
        (classes || []).forEach(c => {
            const det = detalhe(c); if (!det || !det.poderes) return;
            Object.keys(det.poderes).forEach(n => nomes.push({ nome: n, aliases: det.poderes[n].aliases || [], def: !!det.poderes[n].defesaAtributo }));
        });
        return nomes;
    }

    return { compute, nomesPoderes, norm, slug };
})();

if (typeof window !== 'undefined') { window.CLASS_SHEET_DETAILS = CLASS_SHEET_DETAILS; window.CLASS_SHEET_CALC = CLASS_SHEET_CALC; }
