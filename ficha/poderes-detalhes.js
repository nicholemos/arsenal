// ============================================================
//  poderes-detalhes.js — Bônus automáticos dos PODERES GERAIS na ficha
//  (combate, destino, magia e Tormenta). Carregue ANTES de script.js.
//  Habilidades e poderes de classe ficam para outro arquivo.
//
//  A chave é o nome do poder (como aparece na lista de poderes da ficha).
//  Campos (todos opcionais; número OU função (ctx) => número):
//    defesa          -> bônus na Defesa
//    pericias        -> [{ pericias: ['Atletismo'], valor: 2 }]
//    periciasAtributo-> [{ pericias: ['Intuição'], atributo: 'INT' }]  (soma o modificador;
//                       NÃO soma se a perícia já usa esse atributo)
//    todasPericias   -> bônus em todas as perícias (exceto Luta e Pontaria, como os mods temporários)
//    naoTreinadas    -> bônus em perícias NÃO treinadas
//    pv / pm         -> PV/PM máximos (aplicados automaticamente ao adicionar/alterar o poder;
//                       ao aplicar Classes, entram junto com o PV/PM da classe)
//    carga           -> espaços no limite de carga
//    deslocamento    -> metros somados ao deslocamento (aparece como aviso abaixo do campo)
//    cargaAtributo   -> soma o modificador no limite de carga (se a carga já não usa esse atributo)
//    condicao        -> 'armaduraPesada' | 'semArmaduraPesada' | 'semArmadura' | 'escudo' | 'pvMetade'
//                       (lidos da própria ficha)
//    escalaTormenta  -> true: valores × (1 + 1 a cada dois OUTROS poderes da Tormenta)
//
//  ctx: { level, patamar, attrs, tormentaOutros, escudoBonus, atual,
//         contaPoderes([nomes]), tem(nome), ordem([nomes]),
//         nivelClasse(idClasse), escala(idClasse, nivelInicial, aCadaN) }
//  'valor' dentro de pericias também aceita função (ctx) => número.
//  Poderes de CLASSE ficam em poderes-classe-detalhes.js (somados a esta tabela).
//
//  REGRA: o mesmo atributo nunca é somado duas vezes no mesmo valor.
//  Poderes duplicados na ficha contam uma vez só.
// ============================================================
const POWER_AUTOBONUS_ENABLED = true;

const PODERES_TORMENTA = [
    'Anatomia Insana', 'Antenas', 'Armamento Aberrante', 'Articulações Flexíveis', 'Asas Insetoides',
    'Carapaça', 'Corpo Aberrante', 'Cuspir Enxame', 'Dentes Afiados', 'Desprezar a Realidade',
    'Empunhadura Rubra', 'Fome de Mana', 'Larva Explosiva', 'Legião Aberrante', 'Mãos Membranosas',
    'Membros Estendidos', 'Membros Extras', 'Mente Aberrante', 'Olhos Vermelhos', 'Pele Corrompida',
    'Sangue Ácido', 'Visco Rubro', 'Bolsões Insanos', 'Carapaça Corrompida', 'Repulsivo'
];

const POWER_SHEET_DETAILS = {
    // ───────────── COMBATE ─────────────
    'Esquiva': {
        defesa: 2,
        pericias: [{ pericias: ['Reflexos'], valor: 2 }]
    },
    'Vitalidade': {
        pv: ctx => ctx.level,                                  // +1 PV por nível (inclusive o 1º)
        pericias: [{ pericias: ['Fortitude'], valor: 2 }]
    },
    'Estilo de Arma e Escudo': {
        condicao: 'escudo',                                    // +2 no bônus de Defesa do escudo
        defesa: 2
    },
    'Encouraçado': {
        condicao: 'armaduraPesada',
        // +2 e mais +2 para cada poder que tenha Encouraçado como pré-requisito
        defesa: ctx => 2 + 2 * ctx.contaPoderes(['Inexpugnável', 'Encastelado', 'Fanático', 'Catafractário'])
    },
    'Inexpugnável': {
        condicao: 'armaduraPesada',
        pericias: [{ pericias: ['Fortitude', 'Reflexos', 'Vontade'], valor: 2 }]
    },
    'Saque Rápido': {
        pericias: [{ pericias: ['Iniciativa'], valor: 2 }]
    },
    'Adestrar Montaria': {
        pericias: [{ pericias: ['Adestramento'], valor: 2 }]
    },
    'Coração de Dragão': {
        pv: 2,
        pm: 2
    },
    'Coragem Aguerrida': {
        condicao: 'pvMetade',                                   // PV atuais na metade ou menos
        defesa: 2,
        todasPericias: 2
    },

    // ───────────── DESTINO ─────────────
    'Atlético': {
        pericias: [{ pericias: ['Atletismo'], valor: 2 }],
        deslocamento: 3
    },
    'Investigador': {
        pericias: [{ pericias: ['Investigação'], valor: 2 }],
        periciasAtributo: [{ pericias: ['Intuição'], atributo: 'INT' }]
    },
    'Sentidos Aguçados': {
        pericias: [{ pericias: ['Percepção'], valor: 2 }]
    },
    'Pose Assustadora': {
        pericias: [{ pericias: ['Intimidação'], valor: 2 }]
    },
    'Vontade de Ferro': {
        pm: ctx => Math.floor(ctx.level / 2),                   // +1 PM a cada dois níveis
        pericias: [{ pericias: ['Vontade'], valor: 2 }]
    },
    'Herói dos Sete Instrumentos': {
        naoTreinadas: ctx => (ctx.level >= 15 ? 3 : ctx.level >= 7 ? 2 : 1)
    },
    'Costas Largas': { carga: 5 },
    'Grandão': { carga: 5 },
    'Inventário Organizado': {
        // A ficha força a carga para INT (script.js). Este bônus cobre o caso de a
        // carga ainda estar em outro atributo, somando INT sem repetir quando já usa INT.
        cargaAtributo: 'INT'
    },
    'Bom de Garfo': {
        pv: ctx => 3 * ctx.patamar                              // +3 PV por patamar
    },
    'Certificado de Conclusão': {
        pm: 1
    },

    // ───────────── TORMENTA (+1 a cada dois outros poderes da Tormenta) ─────────────
    'Antenas': {
        escalaTormenta: true,
        pericias: [{ pericias: ['Iniciativa', 'Percepção', 'Vontade'], valor: 1 }]
    },
    'Articulações Flexíveis': {
        escalaTormenta: true,
        pericias: [{ pericias: ['Acrobacia', 'Furtividade', 'Reflexos'], valor: 1 }]
    },
    'Carapaça': {
        escalaTormenta: true,
        defesa: 1
    },
    'Mãos Membranosas': {
        escalaTormenta: true,
        pericias: [{ pericias: ['Atletismo', 'Fortitude'], valor: 1 }]
    },
    'Olhos Vermelhos': {
        escalaTormenta: true,
        pericias: [{ pericias: ['Intimidação'], valor: 1 }]
    },
    'Bolsões Insanos': {
        carga: ctx => 2 + ctx.tormentaOutros                    // +2 espaços, +1 por outro poder da Tormenta
    }
};

// ------------------------------------------------------------
//  Cálculo (sem DOM)
//    opts: { poderes:[nomes], level, classes:[{id, level}], attrs:{FOR..CAR},
//            skillAttrs:{perícia:atributo}, loadAttr:'FOR', escudoBonus,
//            estado:{ armaduraPesada, semArmaduraPesada, semArmadura, escudo, pvMetade } }
// ------------------------------------------------------------
const POWER_SHEET_CALC = (function () {
    const norm = t => String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    const slug = t => norm(t).replace(/[^a-z0-9]/g, '');
    const TORMENTA = new Set(PODERES_TORMENTA.map(norm));
    const SKIP_TODAS = ['luta', 'pontaria'];

    // índice reconstruído quando outras tabelas (poderes de classe) são somadas a POWER_SHEET_DETAILS
    let _n = -1, INDEX = {};
    function indice() {
        const ks = Object.keys(POWER_SHEET_DETAILS);
        if (ks.length !== _n) { INDEX = {}; ks.forEach(k => { INDEX[norm(k)] = k; }); _n = ks.length; }
        return INDEX;
    }
    function chaveBase(n) { const m = n.match(/^(.+?)\s*[(:]/); return m ? m[1].trim() : n; }
    function chaveDoPoder(nomeFicha) {
        const idx = indice(), n = norm(nomeFicha);
        if (idx[n]) return idx[n];
        const b = chaveBase(n);
        return idx[b] || null;                        // "Vitalidade (variante)" / "Poder: algo"
    }
    const vazio = () => ({ total: 0, fontes: [] });

    function compute(opts) {
        opts = opts || {};
        const level = Math.min(20, Math.max(1, parseInt(opts.level) || 1));
        const attrs = opts.attrs || {};
        const skillAttrs = opts.skillAttrs || {};
        const estado = opts.estado || {};
        const classes = opts.classes || [];
        const mod = a => parseInt(attrs[a]) || 0;

        const possuidos = new Set((opts.poderes || []).map(norm).filter(Boolean));
        const chaves = new Set();
        (opts.poderes || []).forEach(p => { const k = chaveDoPoder(p); if (k) chaves.add(k); });
        const tormentaTotal = Array.from(possuidos).filter(n => TORMENTA.has(chaveBase(n)) || TORMENTA.has(n)).length;

        const ctx = {
            level, attrs,
            patamar: level >= 17 ? 4 : level >= 11 ? 3 : level >= 5 ? 2 : 1,
            escudoBonus: parseInt(opts.escudoBonus) || 0,
            tormentaOutros: 0, atual: '',
            contaPoderes: lista => lista.filter(n => possuidos.has(norm(n))).length,
            tem: nome => possuidos.has(norm(nome)),
            // posição (1, 2, 3...) do poder atual entre os que o personagem possui da lista
            ordem: lista => {
                const ln = lista.map(norm);
                const donos = Array.from(possuidos).filter(n => ln.includes(n));
                return donos.indexOf(norm(ctx.atual)) + 1;
            },
            // nível na classe; se a classe não está na lista de classes, usa o nível total
            nivelClasse: id => {
                const c = classes.find(x => slug(x.id) === slug(id));
                return c ? (parseInt(c.level) || 0) : level;
            },
            // 1 no nível inicial e +1 a cada "passo" níveis seguintes (0 antes do nível inicial)
            escala: (id, inicio, passo) => {
                const n = ctx.nivelClasse(id);
                return n >= inicio ? 1 + Math.floor((n - inicio) / passo) : 0;
            }
        };

        const out = {
            pericias: {}, todasPericias: vazio(), naoTreinadas: vazio(),
            defesa: vazio(), pv: vazio(), pm: vazio(), carga: vazio(), deslocamento: vazio(),
            ignorados: []
        };
        const val = (v) => (typeof v === 'function' ? v(ctx) : v) || 0;
        const add = (acc, valor, fonte) => { if (!valor) return; acc.total += valor; acc.fontes.push({ valor, fonte }); };
        const atributosPericia = {};      // perícia -> atributos já somados (o da própria perícia conta)

        chaves.forEach(nome => {
            const d = POWER_SHEET_DETAILS[nome];
            if (d.condicao && !estado[d.condicao]) return;
            ctx.atual = nome;
            ctx.tormentaOutros = TORMENTA.has(norm(nome)) ? Math.max(0, tormentaTotal - 1) : 0;
            const mult = d.escalaTormenta ? 1 + Math.floor(ctx.tormentaOutros / 2) : 1;

            add(out.defesa, val(d.defesa) * mult, nome);
            add(out.pv, val(d.pv) * mult, nome);
            add(out.pm, val(d.pm) * mult, nome);
            add(out.carga, val(d.carga) * mult, nome);
            add(out.deslocamento, val(d.deslocamento) * mult, nome);
            add(out.todasPericias, val(d.todasPericias) * mult, nome);
            add(out.naoTreinadas, val(d.naoTreinadas) * mult, nome);

            (d.pericias || []).forEach(b => {
                const v = (typeof b.valor === 'function' ? b.valor(ctx) : b.valor) * mult;
                b.pericias.forEach(p => {
                    const k = norm(p); out.pericias[k] = out.pericias[k] || vazio();
                    add(out.pericias[k], v, nome);
                });
            });
            (d.periciasAtributo || []).forEach(b => b.pericias.forEach(p => {
                const k = norm(p);
                if (!atributosPericia[k]) atributosPericia[k] = new Set([skillAttrs[p] || '']);
                if (atributosPericia[k].has(b.atributo)) {
                    out.ignorados.push({ pericia: p, atributo: b.atributo, fonte: nome }); return;
                }
                atributosPericia[k].add(b.atributo);
                out.pericias[k] = out.pericias[k] || vazio();
                add(out.pericias[k], mod(b.atributo), nome + ' (' + b.atributo + ')');
            }));
            if (d.cargaAtributo) {
                if (d.cargaAtributo === opts.loadAttr) out.ignorados.push({ pericia: 'carga', atributo: d.cargaAtributo, fonte: nome });
                else add(out.carga, mod(d.cargaAtributo), nome + ' (' + d.cargaAtributo + ')');
            }
        });
        return out;
    }

    // Bônus total de uma perícia (específico + todas + não treinadas)
    function periciaBonus(res, nomePericia, treinada) {
        const k = norm(nomePericia);
        const r = vazio();
        const esp = res.pericias[k];
        if (esp) { r.total += esp.total; r.fontes = r.fontes.concat(esp.fontes); }
        if (!SKIP_TODAS.includes(k) && res.todasPericias.total) { r.total += res.todasPericias.total; r.fontes = r.fontes.concat(res.todasPericias.fontes); }
        if (!treinada && res.naoTreinadas.total) { r.total += res.naoTreinadas.total; r.fontes = r.fontes.concat(res.naoTreinadas.fontes); }
        return r;
    }

    return { compute, periciaBonus, norm };
})();

if (typeof window !== 'undefined') {
    window.POWER_SHEET_DETAILS = POWER_SHEET_DETAILS;
    window.POWER_SHEET_CALC = POWER_SHEET_CALC;
}
