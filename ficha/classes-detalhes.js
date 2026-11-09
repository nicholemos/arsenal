// ============================================================
//  classes-detalhes.js — Detalhes mecânicos de classe usados pela ficha
//  Carregue DEPOIS de classes-data.js e ANTES de script.js.
//  A chave é o id da classe em classes-data.js (ou o nome sem acento/minúsculo).
//
//  Campos por classe:
//    pmAtributo      -> atributo somado UMA vez ao total de PM ('INT', 'SAB', 'CAR'...).
//                       Array = usa o maior modificador entre os listados (ex.: ['INT','CAR']).
//                       Só vale para a CLASSE INICIAL (mesma regra da Forja).
//    variantes       -> { 'Nome da variante': { pmAtributo } } substitui o da classe.
//    poderes         -> { 'Nome do poder': { aliases?, pmAtributo?, pvAtributo?, defesaAtributo?, nota? } }
//                       Só conta se o poder estiver na ficha (lista "Classe e Poderes")
//                       e a classe estiver entre as classes do personagem.
//                       Campos do poder: pmAtributo | pvAtributo | defesaAtributo,
//                       condicao ('semArmadura' | 'semArmaduraPesada' | 'armaduraPesada' | 'escudo' | 'pvMetade'),
//                       limiteNivel (true = o bônus não passa do nível do personagem).
//  Bônus FIXOS e por nível (+2 em perícia, +1 Defesa a cada 4 níveis...) ficam em
//  poderes-classe-detalhes.js.
//
//  REGRA: o mesmo atributo nunca é somado duas vezes no mesmo valor.
//    PM:     sem atributo "de base" (cada atributo entra uma única vez)
//    PV:     CON já entra por nível, então nenhum poder soma CON de novo
//    Defesa: o atributo escolhido na fórmula da Defesa (se marcado) já está contado
// ============================================================
const CLASS_PM_SOMENTE_CLASSE_INICIAL = true;

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
        },
        poderes: {
            'Linhagem Dracônica': { pvAtributo: 'CAR', nota: 'Feiticeiro: soma Carisma nos PV iniciais' }
        }
    },

    bucaneiro: {
        nome: 'Bucaneiro',
        poderes: {
            'Insolência': { defesaAtributo: 'CAR', limiteNivel: true, condicao: 'semArmaduraPesada' }
        }
    },

    cacador: {
        nome: 'Caçador',
        poderes: {
            'Elo com a Natureza': { pmAtributo: 'SAB', nota: 'soma Sabedoria nos PM' }
        }
    },

    guerreiro: {
        nome: 'Guerreiro',
        poderes: {
            'Defesa Estratégica': { defesaAtributo: 'INT', limiteNivel: true }
        }
    },

    ladino: {
        nome: 'Ladino',
        poderes: {
            'Charme': { pmAtributo: 'CAR', nota: 'Ventanista: soma Carisma nos PM' }
        }
    },

    barbaro: {
        nome: 'Bárbaro',
        poderes: {
            'Totem Espiritual': { aliases: ['Totem'], pmAtributo: 'SAB', nota: 'soma Sabedoria nos PM' },
            'Tanga de Peles':   { defesaAtributo: 'CON', condicao: 'semArmadura', nota: 'soma Constituição na Defesa sem armadura' }
        }
    },

    bardo:    { nome: 'Bardo',    pmAtributo: 'CAR' },
    paladino: { nome: 'Paladino', pmAtributo: 'CAR', poderes: { 'Abençoado': { pmAtributo: 'CAR' } } },
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
            // Conforme o data.js: Sarado soma Força nos PV (uma vez) e em Fortitude;
            // Trincado soma Constituição no DANO desarmado (sem efeito automático).
            'Sarado':           { pvAtributo: 'FOR', nota: 'soma Força nos PV (uma única vez)' },
            'Braços Calejados': { defesaAtributo: 'FOR', limiteNivel: true, condicao: 'semArmadura', nota: 'sem armadura, soma Força na Defesa' },
            'Casca Grossa':     { defesaAtributo: 'CON', limiteNivel: true, condicao: 'semArmaduraPesada', nota: 'soma Constituição na Defesa' }
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
        const estado = (opts && opts.estado) || {};
        const nivel = Math.min(20, Math.max(1, parseInt(opts && opts.level) || 1));
        const mod = a => parseInt(attrs[a]) || 0;

        const out = { pm: { total: 0, fontes: [] }, pv: { total: 0, fontes: [] }, def: { total: 0, fontes: [] }, ignorados: [] };
        const usados = { pm: new Set(base.pm), pv: new Set(base.pv), def: new Set(base.def) };

        function somar(stat, atributo, fonte, limitarAoNivel) {
            if (!atributo) return;
            if (usados[stat].has(atributo)) { out.ignorados.push({ stat, atributo, fonte }); return; }
            usados[stat].add(atributo);
            let valor = mod(atributo);
            if (limitarAoNivel) valor = Math.min(valor, nivel);
            out[stat].total += valor;
            out[stat].fontes.push({ atributo, valor, fonte });
        }

        // 1) atributo-chave de PM da classe inicial (e, se configurado, das demais)
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
                if (p.condicao && !estado[p.condicao]) return;       // condição falsa não consome o atributo
                somar('pm', p.pmAtributo, nome, p.limiteNivel);
                somar('pv', p.pvAtributo, nome, p.limiteNivel);
                somar('def', p.defesaAtributo, nome, p.limiteNivel);
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
