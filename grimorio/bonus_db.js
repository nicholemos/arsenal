/**
 * Grimório de Arton - Banco de Bônus
 *
 * Os bônus continuam descritos em texto no spells_db.js; aqui ficam as versões
 * ESTRUTURADAS dos bônus numéricos de cada magia, usadas pelo card "Bônus Ativos".
 *
 * Formato de cada efeito:
 *   alvos:       lista de alvos (ou nomes de grupo, ver BONUS_GRUPOS)
 *   exceto:      (opcional) alvos de um grupo que ficam de fora
 *   valor:       número (negativo = penalidade)
 *   un:          (opcional) unidade exibida junto ao valor, ex.: "m"
 *   tipo:        (opcional) "encanto", etc. Tipos diferentes se acumulam entre si.
 *                Sem tipo = "geral". Bônus do MESMO tipo e MESMO alvo: vale o maior.
 *   cumulativo:  (opcional) true = sempre soma (Armadura Arcana, Oração)
 *   cond:        (opcional) condição ("contra o animal"...). Vai para "Situacionais"
 *   inimigos:    (opcional) true = efeito aplicado aos inimigos (ex.: penalidades da Oração)
 *
 * Campos extras por magia:
 *   variantes:   escolhas mutuamente exclusivas de efeitos (atributo à escolha etc.)
 *   ajustes:     aprimoramentos que mexem em valores: { label, deltas: {indiceDoEfeito: +n}, max, min }
 *   nota:        texto livre mostrado no card
 *   resumo:      (opcional) texto curto para a lista de seleção
 */

const BONUS_GRUPOS = {
    "Testes de resistência": ["Fortitude", "Reflexos", "Vontade"],
    "Atributos físicos": ["Força", "Destreza", "Constituição"],
    "Atributos mentais": ["Inteligência", "Sabedoria", "Carisma"],
    "Perícias de Carisma": ["Adestramento", "Atuação", "Diplomacia", "Enganação", "Intimidação", "Jogatina"]
};

// Categorias e ordem de exibição dos alvos no card
const BONUS_CATEGORIAS = [
    { nome: "Combate", icone: "fa-shield-halved", alvos: ["Defesa", "Testes de ataque", "Rolagens de dano"] },
    { nome: "Atributos", icone: "fa-dumbbell", alvos: ["Força", "Destreza", "Constituição", "Inteligência", "Sabedoria", "Carisma"] },
    { nome: "Resistências", icone: "fa-heart-pulse", alvos: ["Fortitude", "Reflexos", "Vontade"] },
    {
        nome: "Perícias", icone: "fa-dice-d20", alvos: [
            "Testes de perícia", "Acrobacia", "Adestramento", "Atletismo", "Atuação", "Cavalgar", "Conhecimento", "Cura",
            "Diplomacia", "Enganação", "Furtividade", "Guerra", "Iniciativa", "Intimidação", "Intuição", "Investigação",
            "Jogatina", "Ladinagem", "Luta", "Misticismo", "Nobreza", "Ofício", "Percepção", "Pilotagem", "Pontaria",
            "Religião", "Sobrevivência"
        ]
    },
    { nome: "Movimento", icone: "fa-person-running", alvos: ["Deslocamento"] },
    { nome: "Proteção", icone: "fa-user-shield", alvos: ["PV temporários", "Redução de dano", "Redução de dano (trevas)", "Redução de dano (elemento do sopro)"] }
];

// ==========================================================================
// MAGIAS COM BÔNUS
// ==========================================================================

const BONUS_DB = {

    // ----------------------------- 1º CÍRCULO -----------------------------
    "Acalmar Animal": {
        efeitos: [
            { alvos: ["Adestramento", "Diplomacia"], valor: 10, cond: "contra o animal alvo" }
        ]
    },
    "Arma de Jade": {
        efeitos: [
            { alvos: ["Testes de ataque", "Rolagens de dano"], valor: 1, tipo: "encanto" }
        ],
        ajustes: [
            { label: "Aumenta o bônus de ataque e dano em +1 (+2 PM)", deltas: { 0: 1 }, max: 5 }
        ],
        nota: "Contra espíritos, os bônus da magia são dobrados."
    },
    "Arma Mágica": {
        efeitos: [
            { alvos: ["Testes de ataque", "Rolagens de dano"], valor: 1, tipo: "encanto" }
        ],
        ajustes: [
            { label: "Aumenta o bônus em +1 (+2 PM)", deltas: { 0: 1 }, max: 5 }
        ]
    },
    "Armadura Arcana": {
        efeitos: [
            { alvos: ["Defesa"], valor: 5, cumulativo: true }
        ],
        ajustes: [
            { label: "Aumenta o bônus na Defesa em +1 (+2 PM)", deltas: { 0: 1 }, max: 5 }
        ],
        nota: "Cumulativa com outras magias, mas não com o bônus de armaduras."
    },
    "Arsenal de Allihanna": {
        efeitos: [
            { alvos: ["Testes de ataque", "Rolagens de dano"], valor: 1, tipo: "encanto" }
        ],
        ajustes: [
            { label: "Aumenta o bônus em +1 (+2 PM)", deltas: { 0: 1 }, max: 5 }
        ]
    },
    "Aviso": {
        efeitos: [
            { alvos: ["Iniciativa", "Percepção"], valor: 5, cond: "apenas no próximo teste da cena" }
        ],
        nota: "Modo Alerta da magia."
    },
    "Bênção": {
        efeitos: [
            { alvos: ["Testes de ataque", "Rolagens de dano"], valor: 1 }
        ],
        ajustes: [
            { label: "Aumenta os bônus em +1 (+2 PM)", deltas: { 0: 1 }, max: 5 }
        ]
    },
    "Caminhos da Natureza": {
        efeitos: [
            { alvos: ["Deslocamento"], valor: 3, un: "m" }
        ],
        ajustes: [
            { label: "Aumenta o bônus de deslocamento em +3m (+2 PM)", deltas: { 0: 3 }, max: 5 }
        ]
    },
    "Disfarce Ilusório": {
        efeitos: [
            { alvos: ["Enganação"], valor: 10, cond: "para disfarce" }
        ]
    },
    "Enfeitiçar": {
        efeitos: [
            { alvos: ["Diplomacia"], valor: 10, cond: "com a vítima" }
        ]
    },
    "Escapatória de Hyninn": {
        resumo: "Ladinagem (armadilhas) ou Reflexos +5, em um teste",
        variantes: [
            { label: "Ladinagem para desarmar armadilhas +5", efeitos: [{ alvos: ["Ladinagem"], valor: 5, cond: "desarmar armadilhas, em um único teste" }] },
            { label: "Reflexos +5", efeitos: [{ alvos: ["Reflexos"], valor: 5, cond: "em um único teste" }] }
        ]
    },
    "Escudo da Fé": {
        efeitos: [
            { alvos: ["Defesa"], valor: 2 }
        ],
        ajustes: [
            { label: "Aumenta o bônus na Defesa em +1 (+2 PM)", deltas: { 0: 1 }, max: 5 }
        ]
    },
    "Euforia de Valkaria": {
        efeitos: [
            { alvos: ["Testes de ataque"], valor: 1, cond: "lutando em desvantagem" }
        ],
        ajustes: [
            { label: "Aumenta o bônus em testes de ataque em +1 (+2 PM)", deltas: { 0: 1 }, max: 5 }
        ],
        nota: "Também torna o alvo imune a medo."
    },
    "Imagem Espelhada": {
        efeitos: [
            { alvos: ["Defesa"], valor: 6 }
        ],
        ajustes: [
            { label: "Cópias: + aprimoramento (+2 Defesa cada, +2 PM) / – cópias destruídas", deltas: { 0: 2 }, min: -3, max: 5 }
        ],
        nota: "Cada ataque que erra destrói uma cópia e reduz o bônus em 2; use o controle acima para refletir isso."
    },
    "Paixão de Marah": {
        efeitos: [
            { alvos: ["Perícias de Carisma"], exceto: ["Intimidação"], valor: 2 }
        ]
    },
    "Percepção Rubra": {
        efeitos: [
            { alvos: ["Testes de ataque", "Reflexos", "Defesa"], valor: 1 }
        ],
        ajustes: [
            { label: "Aumenta o bônus em +1 (+2 PM, Devotos de Aharadak)", deltas: { 0: 1 }, max: 5 }
        ]
    },
    "Primor Atlético": {
        efeitos: [
            { alvos: ["Deslocamento"], valor: 9, un: "m" },
            { alvos: ["Atletismo"], valor: 10 }
        ],
        nota: "Para saltar, o aprimoramento de +1 PM soma +20 em Atletismo (total +30)."
    },
    "Proteção de Tauron": {
        efeitos: [
            { alvos: ["Defesa"], valor: 2 }
        ],
        ajustes: [
            { label: "Aumenta o bônus na Defesa em +2 (+2 PM, 2º círculo)", deltas: { 0: 2 }, max: 5 }
        ]
    },
    "Proteção Divina": {
        efeitos: [
            { alvos: ["Testes de resistência"], valor: 2 }
        ],
        ajustes: [
            { label: "Aumenta o bônus concedido em +1 (+2 PM)", deltas: { 0: 1 }, max: 5 }
        ]
    },
    "Punho de Mitral": {
        efeitos: [
            { alvos: ["Testes de ataque"], valor: 1, cond: "ataques desarmados com a mão de mitral" }
        ],
        ajustes: [
            { label: "Muda o bônus em ataque para +2 (+2 PM)", deltas: { 0: 1 }, max: 1 }
        ]
    },
    "Toque de Megalokk": {
        efeitos: [
            { alvos: ["Intimidação"], valor: 5 },
            { alvos: ["Perícias de Carisma"], exceto: ["Intimidação"], valor: -5 }
        ]
    },
    "Voz da Razão": {
        efeitos: [
            { alvos: ["Conhecimento", "Diplomacia", "Intimidação"], valor: 5 }
        ],
        ajustes: [
            { label: "Muda o bônus para +10 (+2 PM, 2º círculo)", deltas: { 0: 5 }, max: 1 }
        ]
    },

    // ----------------------------- 2º CÍRCULO -----------------------------
    "Aparência Perfeita": {
        efeitos: [
            { alvos: ["Carisma"], valor: 2 },
            { alvos: ["Diplomacia", "Enganação"], valor: 5 }
        ],
        nota: "Se o seu Carisma for menor que 5, ele se torna 5 (isso conta como bônus)."
    },
    "Couraça de Allihanna": {
        efeitos: [
            { alvos: ["Defesa"], valor: 2, tipo: "encanto" }
        ],
        ajustes: [
            { label: "Aumenta a Defesa em +1 (+1 PM)", deltas: { 0: 1 }, max: 5 }
        ],
        nota: "Em vestuário, não é cumulativo com armadura."
    },
    "Físico Divino": gerarVariantesAtributo(["Força", "Destreza", "Constituição"], "Atributos físicos", "físicos", "Não oferece PV ou PM adicionais."),
    "Mente Divina": gerarVariantesAtributo(["Inteligência", "Sabedoria", "Carisma"], "Atributos mentais", "mentais", "Não oferece PV, PM ou perícias adicionais."),
    "Invisibilidade": {
        efeitos: [
            { alvos: ["Furtividade"], valor: 10, cond: "contra ouvir" }
        ]
    },
    "Máquina de Combate": {
        efeitos: [
            { alvos: ["Atletismo", "Luta"], valor: 5 }
        ],
        nota: "Alvo: construto. Perde 1d4 PV ao fim de cada turno em que usar ação padrão."
    },
    "Metamorfose": {
        efeitos: [
            { alvos: ["Enganação"], valor: 20, cond: "para disfarce" }
        ]
    },
    "Oração": {
        efeitos: [
            { alvos: ["Testes de perícia"], valor: 2, cumulativo: true },
            { alvos: ["Rolagens de dano"], valor: 2, cumulativo: true },
            { alvos: ["Testes de perícia"], valor: -2, cumulativo: true, inimigos: true },
            { alvos: ["Rolagens de dano"], valor: -2, cumulativo: true, inimigos: true }
        ],
        ajustes: [
            { label: "Aumenta os bônus em +1 (+2 PM)", deltas: { 0: 1, 1: 1 }, max: 5 },
            { label: "Aumenta as penalidades em –1 (+2 PM)", deltas: { 2: -1, 3: -1 }, max: 5 }
        ],
        nota: "Cumulativa com outras magias. Aliados no alcance recebem os bônus; inimigos sofrem as penalidades."
    },
    "Piscar": {
        efeitos: [
            { alvos: ["Testes de ataque"], valor: 2 }
        ]
    },
    "Vestimenta da Fé": {
        efeitos: [
            { alvos: ["Defesa"], valor: 2, tipo: "encanto" }
        ],
        ajustes: [
            { label: "Aumenta o bônus em +1 (+4 PM)", deltas: { 0: 1 }, max: 5 }
        ],
        nota: "Em vestuário, não é cumulativo com armadura."
    },

    // ----------------------------- 3º CÍRCULO -----------------------------
    "Anular a Luz": {
        efeitos: [
            { alvos: ["Defesa"], valor: 4 }
        ],
        ajustes: [
            { label: "Aumenta o bônus na Defesa em +1 (+2 PM)", deltas: { 0: 1 }, max: 5 }
        ],
        nota: "Vale para aliados na área, até o fim da cena."
    },
    "Dispersar as Trevas": {
        efeitos: [
            { alvos: ["Testes de resistência"], valor: 4 },
            { alvos: ["Redução de dano (trevas)"], valor: 10 }
        ],
        ajustes: [
            { label: "Aumenta o bônus nas resistências em +1 (+2 PM)", deltas: { 0: 1 }, max: 5 }
        ],
        nota: "Vale para aliados na área, até o fim da cena."
    },
    "Heroísmo": {
        efeitos: [
            { alvos: ["PV temporários"], valor: 40 },
            { alvos: ["Testes de ataque", "Rolagens de dano"], valor: 4, cond: "contra o inimigo de maior ND da cena" }
        ],
        ajustes: [
            { label: "Muda o bônus para +6 (+2 PM)", deltas: { 1: 2 }, max: 1 }
        ],
        nota: "Também torna o alvo imune a medo."
    },
    "Potência Divina": {
        efeitos: [
            { alvos: ["Força"], valor: 4 },
            { alvos: ["Redução de dano"], valor: 10 }
        ],
        ajustes: [
            { label: "Aumenta o bônus de Força em +1 (+2 PM)", deltas: { 0: 1 }, max: 5 },
            { label: "Aumenta a RD em +5 (+5 PM)", deltas: { 1: 5 }, max: 5 }
        ],
        nota: "Você aumenta uma categoria de tamanho e não pode lançar magias."
    },
    "Proteção contra Magia": {
        efeitos: [
            { alvos: ["Testes de resistência"], valor: 5, cond: "contra magias" }
        ],
        ajustes: [
            { label: "Muda o bônus para +10 (+4 PM, 4º círculo)", deltas: { 0: 5 }, max: 1 }
        ]
    },
    "Transformação de Guerra": {
        efeitos: [
            { alvos: ["Defesa"], valor: 6 },
            { alvos: ["Testes de ataque", "Rolagens de dano"], valor: 6, cond: "corpo a corpo" },
            { alvos: ["PV temporários"], valor: 30 }
        ],
        ajustes: [
            { label: "+1 nos bônus e +10 PV temporários (+2 PM)", deltas: { 0: 1, 1: 1, 2: 10 }, max: 5 }
        ],
        nota: "Você não pode lançar magias durante a transformação."
    },

    // ----------------------------- 4º CÍRCULO -----------------------------
    "Transformação em Dragão": {
        efeitos: [
            { alvos: ["Força", "Constituição", "Inteligência", "Carisma"], valor: 2 },
            { alvos: ["Defesa"], valor: 5 },
            { alvos: ["Redução de dano (elemento do sopro)"], valor: 30 }
        ],
        ajustes: [
            { label: "Aumenta o bônus na Defesa em +1 (+2 PM)", deltas: { 1: 1 }, max: 5 },
            { label: "Bônus em atributos passa para +4 (+3 PM)", deltas: { 0: 2 }, max: 1 }
        ]
    },

    // ----------------------------- 5º CÍRCULO -----------------------------
    "Aura Divina": {
        resumo: "Defesa e resistências +10 (devotos) ou +5 (não devotos)",
        variantes: [
            {
                label: "Aliado devoto da mesma divindade (+10)",
                efeitos: [
                    { alvos: ["Defesa"], valor: 10 },
                    { alvos: ["Testes de resistência"], valor: 10 }
                ]
            },
            {
                label: "Aliado não devoto (+5)",
                efeitos: [
                    { alvos: ["Defesa"], valor: 5 },
                    { alvos: ["Testes de resistência"], valor: 5 }
                ]
            }
        ],
        ajustes: [
            { label: "Aumenta os bônus na Defesa e nas resistências em +1 (+2 PM)", deltas: { 0: 1, 1: 1 }, max: 5 }
        ]
    }
};

// Gera as opções de "Físico Divino" / "Mente Divina"
function gerarVariantesAtributo(atributos, grupo, plural, nota) {
    const variantes = [];
    atributos.forEach(a => variantes.push({ label: `+2 em ${a}`, efeitos: [{ alvos: [a], valor: 2 }] }));
    variantes.push({ label: `+2 nos três atributos ${plural} (apr. 3 PM, 3º círculo)`, efeitos: [{ alvos: [grupo], valor: 2 }] });
    atributos.forEach(a => variantes.push({ label: `+4 em ${a} (apr. 7 PM, 4º círculo)`, efeitos: [{ alvos: [a], valor: 4 }] }));
    variantes.push({ label: `+4 nos três atributos ${plural} (apr. 12 PM, 5º círculo)`, efeitos: [{ alvos: [grupo], valor: 4 }] });
    return {
        resumo: `Atributo ${plural === "físicos" ? "físico" : "mental"} à escolha: +2 (ou mais, com aprimoramentos)`,
        variantes,
        nota
    };
}
