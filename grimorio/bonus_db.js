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
 * Efeitos NÃO numéricos (ações extras, imunidades, sentidos...):
 *   traits:      lista de { tipo, texto, id?, cond? }. "tipo" é uma chave de BONUS_TRAIT_TIPOS.
 *
 * Campos extras por magia:
 *   variantes:   escolhas mutuamente exclusivas ({ label, efeitos?, traits?, duracao? }).
 *                Se efeitos/traits forem omitidos, valem os da própria magia.
 *   opcoes:      aprimoramentos liga/desliga: { label, efeitos?, traits?, remove?: [ids de traits], duracao? }
 *   duracao:     (em variante/opcao) substitui a duração mostrada, ex.: "cena"
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
    { nome: "Movimento", icone: "fa-person-running", alvos: ["Deslocamento", "Deslocamento de voo"] },
    {
        nome: "Proteção", icone: "fa-user-shield", alvos: [
            "PV temporários", "Redução de dano", "Redução de dano (impacto)", "Redução de dano (trevas)",
            "Redução de dano (elemento do sopro)", "Resistência a energia (todas)", "Resistência a ácido",
            "Resistência a eletricidade", "Resistência a fogo", "Resistência a frio", "Resistência a luz", "Resistência a trevas"
        ]
    }
];

// Tipos de efeitos especiais (ordem = ordem de exibição)
const BONUS_TRAIT_TIPOS = {
    acao:       { nome: "Ações",       icone: "fa-bolt" },
    movimento:  { nome: "Movimento",   icone: "fa-wind" },
    rolagem:    { nome: "Rolagens",    icone: "fa-dice" },
    sentido:    { nome: "Sentidos",    icone: "fa-eye" },
    defesa:     { nome: "Defesa",      icone: "fa-shield-halved" },
    imunidade:  { nome: "Imunidades",  icone: "fa-ban" },
    ofensa:     { nome: "Ofensivo",    icone: "fa-burst" },
    restricao:  { nome: "Restrições",  icone: "fa-lock" },
    outro:      { nome: "Outros",      icone: "fa-star" }
};

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
        traits: [{ tipo: "imunidade", texto: "Imune a medo" }],
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
        opcoes: [
            { label: "Saltos: Atletismo total +30 (+1 PM)", efeitos: [{ alvos: ["Atletismo"], valor: 30, cond: "para saltar" }] },
            { label: "Escala paredes e tetos sem testes (+1 PM)", traits: [{ tipo: "movimento", texto: "Escala paredes e tetos sem testes de Atletismo (precisa das mãos livres)" }] }
        ],
        efeitos: [
            { alvos: ["Deslocamento"], valor: 9, un: "m" },
            { alvos: ["Atletismo"], valor: 10 }
        ],
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
        traits: [
            { tipo: "defesa", texto: "Invisível: camuflagem total; quem não o vê fica desprevenido contra seus ataques" },
            { tipo: "restricao", texto: "Termina ao fazer uma ação hostil contra uma criatura" }
        ],
        opcoes: [
            { label: "Duração: cena (+3 PM, 3º círculo)", duracao: "cena" }
        ],
        efeitos: [
            { alvos: ["Furtividade"], valor: 10, cond: "contra ouvir" }
        ]
    },
    "Máquina de Combate": {
        traits: [{ tipo: "restricao", texto: "Perde 1d4 PV ao fim de cada turno em que executar uma ação padrão" }],
        efeitos: [
            { alvos: ["Atletismo", "Luta"], valor: 5 }
        ],
        nota: "Alvo: construto."
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
        traits: [
            { tipo: "defesa", texto: "50% de chance de ataques e habilidades de outras criaturas não o afetarem" },
            { tipo: "restricao", texto: "25% de chance de seus ataques e habilidades não afetarem outras criaturas" }
        ],
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
        traits: [{ tipo: "imunidade", texto: "Imune a medo" }],
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
        traits: [
            { tipo: "outro", texto: "Aumenta uma categoria de tamanho (equipamento se ajusta)" },
            { tipo: "restricao", texto: "Não pode lançar magias" }
        ],
        efeitos: [
            { alvos: ["Força"], valor: 4 },
            { alvos: ["Redução de dano"], valor: 10 }
        ],
        ajustes: [
            { label: "Aumenta o bônus de Força em +1 (+2 PM)", deltas: { 0: 1 }, max: 5 },
            { label: "Aumenta a RD em +5 (+5 PM)", deltas: { 1: 5 }, max: 5 }
        ],
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
        traits: [
            { tipo: "restricao", texto: "Não pode lançar magias durante a transformação" },
            { tipo: "outro", texto: "Proficiente em todas as armas" }
        ],
        efeitos: [
            { alvos: ["Defesa"], valor: 6 },
            { alvos: ["Testes de ataque", "Rolagens de dano"], valor: 6, cond: "corpo a corpo" },
            { alvos: ["PV temporários"], valor: 30 }
        ],
        ajustes: [
            { label: "+1 nos bônus e +10 PV temporários (+2 PM)", deltas: { 0: 1, 1: 1, 2: 10 }, max: 5 }
        ],
    },

    // ----------------------------- 4º CÍRCULO -----------------------------
    "Transformação em Dragão": {
        traits: [
            { tipo: "ofensa", texto: "Sopro (ação padrão, 1x/rodada): 8d6+8 de dano do elemento em cone de 9m (Reflexos reduz à metade)" }
        ],
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
                traits: [{ tipo: "imunidade", texto: "Imune a encantamento" }],
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
    },

    // ===================== MAGIAS COM EFEITOS ESPECIAIS =====================

    "Velocidade": {
        resumo: "Uma ação padrão ou de movimento adicional por turno",
        variantes: [
            {
                label: "Padrão: ação padrão ou de movimento adicional (sustentada)",
                duracao: "sustentada",
                traits: [
                    { tipo: "acao", texto: "Uma ação padrão ou de movimento adicional por turno" },
                    { tipo: "restricao", id: "vel-restr", texto: "A ação adicional não pode lançar magias nem ativar engenhocas" }
                ]
            },
            {
                label: "Aprimorada: apenas ação de movimento adicional (cena)",
                duracao: "cena",
                traits: [
                    { tipo: "acao", texto: "Uma ação de movimento adicional por turno" },
                    { tipo: "restricao", id: "vel-restr", texto: "A ação adicional não pode lançar magias nem ativar engenhocas" }
                ]
            }
        ],
        opcoes: [
            {
                label: "Mente acelerada: a ação adicional lança magias e ativa engenhocas (+7 PM, 4º círculo, só em você)",
                remove: ["vel-restr"],
                traits: [{ tipo: "acao", texto: "A ação adicional também pode lançar magias e ativar engenhocas" }]
            }
        ],
        nota: "Uma criatura só recebe uma ação adicional por turno como efeito de Velocidade."
    },
    "Concentração de Combate": {
        resumo: "Ao atacar, rola dois dados e usa o melhor",
        variantes: [
            {
                label: "Livre, 1 rodada",
                duracao: "1 rodada",
                traits: [{ tipo: "rolagem", texto: "Ao atacar, rola dois dados e usa o melhor resultado" }]
            },
            {
                label: "Padrão, cena (+2 PM, 2º círculo)",
                duracao: "cena",
                traits: [{ tipo: "rolagem", texto: "Ao atacar, rola dois dados e usa o melhor resultado" }]
            },
            {
                label: "Cena + inimigos rolam o pior contra você (+5 PM, 3º círculo)",
                duracao: "cena",
                traits: [
                    { tipo: "rolagem", texto: "Ao atacar, rola dois dados e usa o melhor resultado" },
                    { tipo: "rolagem", texto: "Inimigos que atacam você rolam dois dados e usam o pior resultado" }
                ]
            },
            {
                label: "1 dia: sexto sentido (+14 PM, 5º círculo)",
                duracao: "1 dia",
                efeitos: [{ alvos: ["Defesa", "Reflexos"], valor: 10 }],
                traits: [
                    { tipo: "rolagem", texto: "Ao atacar, rola dois dados e usa o melhor resultado" },
                    { tipo: "sentido", texto: "Sexto sentido: avisa de qualquer perigo ou ameaça" },
                    { tipo: "imunidade", texto: "Imune a surpreendido e desprevenido" }
                ]
            }
        ]
    },
    "Orientação": {
        resumo: "Teste de perícia com dois dados, ficando com o melhor",
        variantes: [
            {
                label: "Próximo teste de perícia (1 rodada)",
                duracao: "1 rodada",
                traits: [{ tipo: "rolagem", texto: "Próximo teste de perícia: rola dois dados e fica com o melhor" }]
            },
            {
                label: "Um atributo à escolha, cena (+2 PM, 2º círculo)",
                duracao: "cena",
                traits: [{ tipo: "rolagem", texto: "Testes de perícia do atributo escolhido: dois dados, fica com o melhor (não vale para ataque ou resistência)" }]
            },
            {
                label: "Atributos físicos ou mentais, cena (+5 PM, 3º círculo)",
                duracao: "cena",
                traits: [{ tipo: "rolagem", texto: "Testes de perícia dos atributos físicos (ou mentais): dois dados, fica com o melhor (não vale para ataque ou resistência)" }]
            }
        ]
    },
    "Ossos de Adamante": {
        resumo: "Redução de impacto 5 e fortificação 25%",
        variantes: [
            {
                label: "Normal: redução de impacto 5, fortificação 25%",
                efeitos: [{ alvos: ["Redução de dano (impacto)"], valor: 5 }],
                traits: [
                    { tipo: "defesa", texto: "Fortificação 25%" },
                    { tipo: "restricao", texto: "Não consegue mudar de forma (Forma Selvagem, metamorfose)" }
                ]
            },
            {
                label: "Aprimorado: RD 5 e fortificação 50% (+2 PM, 2º círculo)",
                efeitos: [{ alvos: ["Redução de dano"], valor: 5 }],
                traits: [
                    { tipo: "defesa", texto: "Fortificação 50%" },
                    { tipo: "restricao", texto: "Não consegue mudar de forma (Forma Selvagem, metamorfose)" }
                ]
            }
        ]
    },
    "Resistência a Energia": {
        resumo: "Resistência 10 contra um tipo de energia à escolha",
        variantes: [
            ["ácido", "Resistência a ácido"],
            ["eletricidade", "Resistência a eletricidade"],
            ["fogo", "Resistência a fogo"],
            ["frio", "Resistência a frio"],
            ["luz", "Resistência a luz"],
            ["trevas", "Resistência a trevas"]
        ].map(([nome, alvo]) => ({ label: `Resistência 10 a ${nome}`, efeitos: [{ alvos: [alvo], valor: 10 }] }))
            .concat([{ label: "Todos os tipos de energia (+5 PM, 3º círculo)", efeitos: [{ alvos: ["Resistência a energia (todas)"], valor: 10 }] }]),
        ajustes: [
            { label: "Aumenta a resistência em +5 (+2 PM)", deltas: { 0: 5 }, max: 5 }
        ],
        opcoes: [
            { label: "Duração: 1 dia (+2 PM, 2º círculo)", duracao: "1 dia" }
        ]
    },
    "Suporte Ambiental": {
        traits: [
            { tipo: "imunidade", texto: "Imune a calor e frio extremos" },
            { tipo: "movimento", texto: "Respira na água (ou no ar, se respira água); não sufoca em fumaça densa" }
        ]
    },
    "Sorriso da Fortuna": {
        traits: [
            { tipo: "rolagem", texto: "Testes de Jogatina (jogos de azar): dois dados, fica com o melhor — descarrega após 3 usos" }
        ],
        nota: "Afeta apenas jogos e itens mundanos."
    },
    "Arma Espiritual": {
        traits: [
            { tipo: "ofensa", texto: "Reação (1x/rodada): ao sofrer ataque corpo a corpo, a arma causa 2d6 de dano no atacante" }
        ],
        opcoes: [
            { label: "A arma também protege você: +1 na Defesa (+1 PM)", efeitos: [{ alvos: ["Defesa"], valor: 1 }] },
            { label: "Duração sustentada: a arma também ataca à distância (+2 PM)", duracao: "sustentada" }
        ]
    },
    "Discrição": {
        efeitos: [
            { alvos: ["Investigação", "Percepção"], valor: -10, inimigos: true, cond: "testes contra o alvo" }
        ],
        ajustes: [
            { label: "Aumenta a penalidade para –15 (+2 PM, 2º círculo)", deltas: { 0: -5 }, max: 1 }
        ],
        nota: "Não torna o alvo invisível. Em combate, inimigos próximos que falharem em Vontade ignoram a criatura."
    },
    "Camuflagem Ilusória": {
        variantes: [
            {
                label: "Camuflagem (cena)",
                traits: [{ tipo: "defesa", texto: "Recebe os efeitos de camuflagem" }]
            },
            {
                label: "Sustentada: camuflagem leve com 50% de falha (+3 PM)",
                duracao: "sustentada",
                traits: [{ tipo: "defesa", texto: "Camuflagem leve com chance de falha de 50%" }]
            }
        ]
    },
    "Orbe do Oceano": {
        traits: [
            { tipo: "defesa", texto: "Camuflagem leve e cobertura leve" }
        ],
        opcoes: [
            { label: "Duração: cena (+4 PM, 3º círculo)", duracao: "cena" }
        ]
    },
    "Viagem Onírica": {
        efeitos: [
            { alvos: ["Deslocamento de voo"], valor: 18, un: "m" }
        ],
        traits: [
            { tipo: "defesa", texto: "Espírito incorpóreo (visto como forma translúcida)" },
            { tipo: "restricao", texto: "Não fala, ataca, lança magias nem interage com criaturas e objetos materiais" }
        ],
        nota: "Seu corpo fica adormecido; a magia é cancelada se ele for perturbado."
    },
    "Coração Imortal": {
        traits: [
            { tipo: "defesa", texto: "Fortificação 100%" },
            { tipo: "imunidade", texto: "Imune a sangramento" }
        ],
        opcoes: [
            { label: "Duração: 1 dia (+2 PM)", duracao: "1 dia" }
        ]
    },
    "Pele de Pedra": {
        resumo: "Redução de dano 5 (10 com aprimoramento)",
        variantes: [
            { label: "Pedra: redução de dano 5", efeitos: [{ alvos: ["Redução de dano"], valor: 5 }] },
            { label: "Aço: redução de dano 10 (+4 PM, 4º círculo)", efeitos: [{ alvos: ["Redução de dano"], valor: 10 }] }
        ],
        opcoes: [
            { label: "Duração: 1 dia (+4 PM)", duracao: "1 dia" }
        ]
    },
    "Voo": {
        efeitos: [
            { alvos: ["Deslocamento de voo"], valor: 12, un: "m" }
        ],
        traits: [
            { tipo: "movimento", texto: "Pode atacar e lançar magias normalmente enquanto voa; ao fim, desce como em Queda Suave" }
        ],
        opcoes: [
            { label: "Duração: 1 dia (+4 PM, 4º círculo)", duracao: "1 dia" }
        ]
    },
    "Premonição": {
        traits: [
            { tipo: "rolagem", texto: "1x/rodada: pode rolar novamente um teste recém realizado (deve aceitar o novo resultado)" }
        ],
        opcoes: [
            { label: "Duração: 1 dia (+10 PM)", duracao: "1 dia" }
        ]
    },
    "Visão da Verdade": {
        traits: [
            { tipo: "sentido", texto: "Vê através de camuflagem e escuridão (normais e mágicas) e da verdade de ilusões e transmutações" }
        ],
        opcoes: [
            { label: "Sentidos apurados: +10 em Percepção (+1 PM)", efeitos: [{ alvos: ["Percepção"], valor: 10 }] },
            { label: "Escuta falsidades: +10 em Intuição (+2 PM)", efeitos: [{ alvos: ["Intuição"], valor: 10 }] },
            { label: "Enxerga através de paredes de até 30cm (+4 PM)", traits: [{ tipo: "sentido", texto: "Enxerga através de paredes e barreiras de até 30cm de espessura" }] }
        ]
    },
    "Invulnerabilidade": {
        resumo: "Imunidade a condições mentais ou físicas",
        variantes: [
            {
                label: "Proteção mental",
                traits: [
                    { tipo: "imunidade", texto: "Imune a abalado, alquebrado, apavorado, atordoado, confuso, esmorecido, fascinado, frustrado e pasmo" },
                    { tipo: "imunidade", texto: "Imune a efeitos de encantamento e ilusão" }
                ]
            },
            {
                label: "Proteção física",
                traits: [
                    { tipo: "imunidade", texto: "Imune a atordoado, cego, debilitado, enjoado, envenenado, exausto, fatigado, fraco, lento, ofuscado e paralisado" },
                    { tipo: "imunidade", texto: "Imune a acertos críticos, ataques furtivos e doenças" }
                ]
            }
        ]
    },
    "Libertação": {
        traits: [
            { tipo: "imunidade", texto: "Imune a efeitos de movimento; ignora efeitos que impeçam ou restrinjam o deslocamento" },
            { tipo: "outro", texto: "Usa habilidades que exigem liberdade de movimentos mesmo com armadura ou escudo" }
        ],
        opcoes: [
            { label: "Caminha sobre água e outros líquidos (+2 PM)", traits: [{ tipo: "movimento", texto: "Caminha sobre líquidos com deslocamento normal" }] },
            { label: "Escolhe 20 em Atletismo (+2 PM)", traits: [{ tipo: "rolagem", texto: "Pode escolher 20 em testes de Atletismo" }] },
            { label: "Escolhe 20 em Acrobacia e faz todas as manobras (+2 PM)", traits: [{ tipo: "rolagem", texto: "Pode escolher 20 em Acrobacia e fazer todas as manobras da perícia, mesmo sem treinamento" }] }
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
