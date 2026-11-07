// ============================================================
//  racas-detalhes.js — Detalhes mecânicos de raça usados pela ficha
//  Carregue ANTES de script.js. A chave é o id da raça em RACE_DATA
//  (../calculadora/racas.js).
//
//  Campos disponíveis:
//    pvPrimeiroNivel / pvPorNivel -> PV extras (1º nível + por nível seguinte)
//    pvBonus(level)               -> alternativa em função para fórmulas próprias
//    pmPrimeiroNivel / pmPorNivel -> PM extras (1º nível + por nível seguinte)
//    pmBonus(level)               -> alternativa em função para fórmulas próprias
//    deslocamento                 -> deslocamento racial fixo (ex.: '6m')
//    deslocamentoNuncaReduzido    -> apenas informativo (armadura/carga)
//    escaladaIgualDeslocamento    -> mostra escalada igual ao deslocamento terrestre
//    sentidos                     -> ['Visão no escuro', 'Visão na penumbra', ...]
//    notas                        -> textos de regras exibidos como referência
//    ataqueBonus                  -> { palavras: [...], valor: n }
//    periciasBonus                -> [{ pericias: [...], valor: n, condicao?: '...' }]
//                                    (sem condicao = aplicado automaticamente na perícia)
//    magias                       -> [{ nome: '...', atributo: '...', spell?: '...', nota?: '...' }]
//                                    (adicionadas à ficha; 'spell' usa outra magia como base)
//    defesaAtiva                  -> { valor, custo, acao, duracao } (buff exibido como referência)
//    reducaoDano                  -> { valor, custo, condicao } (redução reativa exibida como referência)
//    proficiencias                -> ['Tipo Monstro', 'RD 5 fogo', ...] (chips na ficha: tipo de criatura, imunidades, RD)
//    defesaItem                   -> { nome, bonus, note } (linha extra de Defesa criada ao aplicar a raça)
//    ataquesNaturais              -> [{ nome, dano, critico, tipo, alcance?, desc }] (linha criada em Ataques)
//    periciasBonus.valor          -> aceita negativo (penalidade fixa, ex.: -5)
// ============================================================
const RACE_SHEET_DETAILS = {
    dwarf: {
        nome: 'Anão/Anã',
        // Duro como Pedra: +3 PV no 1º nível e +1 por nível seguinte
        pvPrimeiroNivel: 3,
        pvPorNivel: 1,
        // Devagar e Sempre
        deslocamento: '6m',
        deslocamentoNuncaReduzido: true,
        // Tradição de Heredrimm
        ataqueBonus: { palavras: ['machado', 'martelo', 'marreta', 'picareta'], valor: 2 },
        // Conhecimento das Rochas (visão no escuro e perícias no subterrâneo)
        sentidos: ['Visão no escuro'],
        periciasBonus: [
            { pericias: ['Percepção', 'Sobrevivência'], valor: 2, condicao: 'no subterrâneo' }
        ]
    },

    elfo: {
        nome: 'Elfo/Elfa',
        // Graça de Glórienn
        deslocamento: '12m',
        // Sangue Mágico: +1 PM por nível
        pmPrimeiroNivel: 1,
        pmPorNivel: 1,
        // Sentidos Élficos
        sentidos: ['Visão na penumbra'],
        // Sentidos Élficos: +2 fixo em Misticismo e Percepção
        periciasBonus: [
            { pericias: ['Misticismo', 'Percepção'], valor: 2 }
        ]
    },

    goblin: {
        nome: 'Goblin',
        // Peste Esguia: Pequeno, mas mantém deslocamento 9m
        deslocamento: '9m',
        // Rato das Ruas: +2 em Fortitude
        periciasBonus: [
            { pericias: ['Fortitude'], valor: 2 }
        ],
        // Espelunqueiro: escalada igual ao deslocamento terrestre
        escaladaIgualDeslocamento: true,
        sentidos: ['Visão no escuro'],
        notas: [
            'Recuperação de PV e PM nunca inferior ao nível.',
            'Engenhoso: sem penalidade por não usar ferramentas; +2 com as ferramentas adequadas.'
        ]
    },

    hynne: {
        nome: 'Hynne',
        // Pequeno e Rechonchudo: tamanho Pequeno e deslocamento 6m (tamanho já vem de RACE_DATA)
        deslocamento: '6m',
        // +2 em Enganação (aplicado automaticamente na perícia)
        periciasBonus: [
            { pericias: ['Enganação'], valor: 2 }
        ],
        notas: [
            'Arremessador: ataque à distância com funda ou arma de arremesso aumenta o dano em um passo.',
            'Sorte Salvadora: gaste 1 PM para rolar novamente um teste de resistência.'
        ]
    },

    kliren: {
        nome: 'Kliren',
        // Vanguardista: proficiência em armas de fogo
        proficiencias: ['Arma de Fogo'],
        notas: [
            'Híbrido: treinado em uma perícia à sua escolha (não precisa ser da sua classe).',
            'Engenhosidade: gaste 2 PM para somar sua Inteligência em testes de perícia (não em ataques). Recebendo novamente, custo reduzido em –1 PM.',
            'Ossos Frágeis: +1 de dano adicional por dado de dano de impacto.',
            'Vanguardista: proficiência em armas de fogo e +2 em Ofício (uma qualquer, a sua escolha).'
        ]
    },

    lefou: {
        nome: 'Lefou',
        // Cria da Tormenta: +5 em resistência contra efeitos de lefeu e da Tormenta
        proficiencias: ['Resistência à Tormenta (+5 em testes de resistência contra lefeu e Tormenta)'],
        notas: [
            'Deformidade: +2 em duas perícias à sua escolha. Cada bônus conta como um poder da Tormenta; pode trocar um bônus por um poder da Tormenta.'
        ]
    },

    medusa: {
        nome: 'Medusa',
        // Cria de Megalokk: tipo monstro + visão no escuro
        proficiencias: ['Visão no escuro', 'Tipo Monstro'],
        notas: [
            'Natureza Venenosa: resistência a veneno +5. Gastar ação de movimento e 1 PM para envenenar arma em uso (perda 1d12 PV no próximo acerto; dura até acertar ou fim da cena).',
            'Olhar Atordoante: gastar ação de movimento e 1 PM para forçar criatura em alcance curto a teste de Fortitude (CD Car); falha = atordoada por 1 rodada (uma vez por cena).'
        ]
    },

    minotaur: {
        nome: 'Minotauro',
        proficiencias: ['Faro'],
        defesaItem: { nome: 'Couro Rígido', bonus: 1, note: '+1 na Defesa' },
        notas: [
            'Chifres: arma natural (dano 1d6, crítico x2, perfuração); uma vez por rodada, gastar 1 PM para ataque extra com os chifres ao agredir.',
            'Couro Rígido: +1 na Defesa.',
            'Faro: contra inimigos que não pode ver, não fica desprevenido e camuflagem total causa apenas 20% de falha em alcance curto.',
            'Medo de Altura: adjacente a queda de 3m ou mais, fica abalado.'
        ]
    },

    dahllan: {
        nome: 'Dahllan',
        // Amiga das Plantas: magia racial adicionada automaticamente à ficha
        magias: [
            { nome: 'Controlar Plantas', atributo: 'Sabedoria' }
        ],
        // Armadura de Allihanna: buff ativável (exibido como referência)
        defesaAtiva: { valor: 2, custo: '1 PM', acao: 'ação de movimento', duracao: 'até o fim da cena' }
        // Empatia Selvagem: permite usar Adestramento com animais; sem bônus fixo.
    },

    sahiri: {
        nome: 'Sahiri',
        // Animar Rochas: usa Conjurar Monstro como base, exigindo terra/rocha
        magias: [
            {
                nome: 'Conjurar Monstro',
                atributo: 'Sabedoria',
                nota: 'Animar Rochas: exige acesso a terra ou rocha equivalente a uma criatura Pequena.'
            }
        ],
        // Proteção da Terra: redução reativa de dano (exibida como referência)
        reducaoDano: { valor: 5, custo: '1 PM', condicao: 'em contato com terra ou pedra' }
    },

    qareen: {
        nome: 'Qareen',
        // Sem efeito mecânico automático na ficha (resistência elemental e tatuagem mística são opções aplicadas via seletores em script.js).
        notas: []
    },

    siren: {
        nome: 'Sereia/Tritão',
        // +1 em três atributos diferentes vem de RACE_DATA (siren: isChoice/choiceCount 3).
        // Canção dos Mares (duas magias à escolha), Mestre do Tridente e Transformação Anfíbia vêm de racialPowers (RACE_DATA).
        // As duas magias da Canção dos Mares são escolhidas via seletores em script.js e aplicadas na área de MAGIAS.
        notas: []
    },

    silfide: {
        nome: 'Sílfide',
        proficiencias: ['Tipo Espírito', 'Visão na Penumbra'],
        // Carisma +2, Destreza +1, Força −2 vem de RACE_DATA (silfide: attributes fixos, isChoice false).
        // Asas de Borboleta, Espírito da Natureza vêm de racialPowers (RACE_DATA).
        // As duas magias da Magia das Fadas são escolhidas via seletores em script.js e aplicadas na área de MAGIAS.
        notas: []
    },

    aggelus: {
        nome: 'Suraggel - Aggelus',
        proficiencias: ['Tipo Espírito', 'Visão no Escuro'],
        periciasBonus: [
            { pericias: ['Diplomacia', 'Intuição'], valor: 2 }
        ],
        // Sabedoria +2, Carisma +1 vem de RACE_DATA (aggelus: attributes fixos).
        // Herança Divina vem de racialPowers (RACE_DATA).
        // Luz Sagrada (+2 Diplomacia e Intuição; magia Luz divina, atributo-chave Carisma) – aplicada automaticamente em script.js.
        notas: []
    },

    sulfure: {
        nome: 'Suraggel - Sulfure',
        proficiencias: ['Tipo Espírito', 'Visão no Escuro'],
        periciasBonus: [
            { pericias: ['Enganação', 'Furtividade'], valor: 2 }
        ],
        // Destreza +2, Inteligência +1 vem de RACE_DATA (sulfure: attributes fixos).
        // Herança Divina vem de racialPowers (RACE_DATA).
        // Sombras Profanas (+2 Enganação e Furtividade; magia Escuridão divina, atributo-chave Inteligência) – aplicada automaticamente em script.js.
        notas: []
    },

    trog: {
        nome: 'Trog',
        proficiencias: ['Tipo Monstro', 'Visão no Escuro'],
        defesaItem: { nome: 'Reptiliano', bonus: 1, note: '+1 na Defesa' },
        // Constituição +2, Força +1, Inteligência −1 vem de RACE_DATA (trog: attributes fixos).
        // Herança Divina vem de racialPowers (RACE_DATA).
        notas: [
            'Mau Cheiro: ação padrão e 2 PM para expelir gás fétido. Criaturas em alcance curto (exceto trogs) fazem Fortitude (CD Con) ou ficam enjoadas 1d6 rodadas; quem passa fica imune por um dia.',
            'Mordida: arma natural (1d6, crítico ×2, perfuração). Uma vez por rodada, ao usar agredir com outra arma, gasta 1 PM para ataque extra corpo a corpo com a mordida.',
            'Reptiliano: tipo monstro, visão no escuro, +1 na Defesa e, sem armadura ou roupas pesadas, +5 em Furtividade.',
            'Sangue Frio: sofre +1 de dano por dado de dano de frio.'
        ]
    },

    troguinho: {
        nome: 'Trog Anão',
        proficiencias: ['Tipo Monstro', 'Visão no Escuro'],
        pvPrimeiroNivel: 1,
        pvPorNivel: 1,
        deslocamento: '6m',
        deslocamentoNuncaReduzido: true,
        // Constituição +2, Força +1, Inteligência −1, Destreza −1 vem de RACE_DATA (troguinho: attributes fixos).
        notas: [
            'Quase Anão: tipo monstro, visão no escuro, +1 PV por nível e deslocamento 6m (não reduzido por armadura ou excesso de carga).',
            'Mau Cheiro: ação padrão e 2 PM para expelir gás fétido. Criaturas em alcance curto (exceto trogs) fazem Fortitude (CD Con) ou ficam enjoadas 1d6 rodadas; quem passa fica imune por um dia.',
            'Mordida: arma natural (1d6). Uma vez por rodada, ao usar agredir com outra arma, gasta 1 PM para ataque extra corpo a corpo com a mordida.'
        ]
    },

    bugbear: {
        nome: 'Bugbear (Ameaças)',
        proficiencias: ['Faro', 'Visão no Escuro'],
        // Força +2, Destreza +1, Carisma −1 vem de RACE_DATA (bugbear: attributes fixos).
        // Empunhadura Poderosa, Saborear Pavor e Sentidos de Predador vêm de racialPowers (RACE_DATA).
        notas: [
            'Empunhadura Poderosa: ao usar arma feita para uma categoria de tamanho maior, a penalidade de ataque diminui para –2. Recebendo novamente, a penalidade cai para 0 e permite armas de até duas categorias maiores com penalidade –5.',
            'Saborear Pavor: usa Força como atributo-chave de Intimidação (em vez de Carisma). Em alcance curto de criatura abalada ou apavorada, recebe bônus no ataque igual à penalidade da condição.',
            'Sentidos de Predador: faro e visão no escuro.'
        ]
    },

    centaur: {
        nome: 'Centauro (Ameaças)',
        deslocamento: '12m',
        // Sabedoria +2, Força +1, Destreza −1, Inteligência −1 vêm de RACE_DATA (centaur: attributes fixos).
        // Tamanho Grande vem de RACE_DATA (centaur: tamanho Grande).
        // Avantajado, Cascos, Ginete Natural e Medo de Altura vêm de racialPowers (RACE_DATA).
        notas: [
            'Avantajado: tamanho Grande e deslocamento 12m.',
            'Cascos: arma natural (1d8, crítico ×2, impacto). Uma vez por rodada, ao usar agredir com outra arma, gasta 1 PM para ataque extra corpo a corpo com os cascos.',
            'Ginete Natural: considerado montado para investidas e armas. Pode escolher Carga de Cavalaria sem pré-requisitos. Não pode se beneficiar de montaria e, carregando um cavaleiro, sofre −2 em testes e fica em condição ruim para lançar magias.',
            'Medo de Altura: adjacente a queda de 3m ou mais, fica abalado.'
        ]
    },

    // ========================================================
    //  RAÇAS ADICIONADAS — Golem, Osteon e Ghanor
    //  (Humano, Aberrante, Kallyanach, Moreau e Feérico não entram aqui:
    //   dependem só de escolhas feitas na calculadora/modal.)
    // ========================================================
    golem: {
        nome: 'Golem',
        sentidos: ['Visão no escuro'],
        proficiencias: ['Tipo Construto', 'Imune a cansaço, efeitos metabólicos e veneno'],
        // Força +1, Carisma −1 (cumulativo com Chassi e Tamanho) vem de RACE_DATA.
        notas: [
            'Propósito de Criação: sem origem; recebe um poder geral à sua escolha.',
            'Criatura Artificial: não precisa respirar, alimentar-se ou dormir. Ofício (artesão) substitui Cura.'
        ]
    },

    osteon: {
        nome: 'Osteon',
        sentidos: ['Visão no escuro'],
        proficiencias: [
            'Tipo Morto-vivo',
            'RD 5 corte, frio e perfuração',
            'Imune a cansaço, metabólicos, trevas e veneno'
        ],
        notas: [
            'Natureza Esquelética: cura mágica causa dano; trevas recuperam seus PV.',
            'Preço da Não Vida: precisa de 8h sob a luz de estrelas ou no subterrâneo para recuperar PV e PM (não afetado por condições de descanso); do contrário sofre efeitos de fome.'
        ]
    },

    dwarf_ghanor: {
        nome: 'Anão/Anã (Ghanor)',
        // Moldado nas Rochas: +1 PV por nível (inclusive no 1º)
        pvPrimeiroNivel: 1,
        pvPorNivel: 1,
        // Devagar e Sempre
        deslocamento: '6m',
        deslocamentoNuncaReduzido: true,
        sentidos: ['Visão no escuro'],
        // Busca pela Perfeição
        periciasBonus: [
            { pericias: ['Ofício'], valor: 2 }
        ],
        notas: [
            'Busca pela Perfeição: se treinado em Ofício, fabrica itens superiores com uma melhoria adicional (cumulativo).'
        ]
    },

    elf_ghanor: {
        nome: 'Elfo/Elfa (Ghanor)',
        // Passo Leve
        deslocamento: '12m',
        // Magia Antiga: +1 PM por nível
        pmPrimeiroNivel: 1,
        pmPorNivel: 1,
        sentidos: ['Visão na penumbra'],
        periciasBonus: [
            { pericias: ['Furtividade'], valor: 2 },          // Passo Leve
            { pericias: ['Percepção'], valor: 2 },            // Sentidos Élficos
            { pericias: ['Diplomacia', 'Vontade'], valor: -5 } // Sentimentos Conflitantes
        ],
        notas: [
            'Armas da Floresta: arcos contam como armas simples e causam +2 de dano.',
            'Magia Antiga: usa Sabedoria como atributo-chave de Misticismo e de magias arcanas.',
            'Sentimentos Conflitantes: –5 em Diplomacia e Vontade (já aplicado). Consumir turlin anula a penalidade por uma cena.'
        ]
    },

    giant_ghanor: {
        nome: 'Gigante (Ghanor)',
        // Primitivo: –5 em Diplomacia, Intuição e Ofício
        periciasBonus: [
            { pericias: ['Diplomacia', 'Intuição', 'Ofício'], valor: -5 }
        ],
        notas: [
            'Grandão: tamanho Grande; soma a Força nos PV totais. Pode usar armas normais ou aumentadas; armaduras devem ser sob medida.',
            'Primitivo: –5 em Diplomacia, Intuição e Ofício (já aplicado) e –5 em ataques com armas marciais ou exóticas.'
        ]
    },

    hobgoblin_ghanor: {
        nome: 'Hobgoblin (Ghanor)',
        sentidos: ['Visão no escuro'],
        notas: [
            'Couro Duro: redução de dano igual à Constituição (limitada pelo nível).',
            'Dependência de Liderança: nunca age antes do líder escolhido e sofre –1 em perícias se estiver além de alcance médio dele.',
            'Militarista: recebe um poder de combate à sua escolha.',
            'Natureza Bestial: usa Constituição como atributo-chave de Intimidação (em vez de Carisma).'
        ]
    },

    halfelf_ghanor: {
        nome: 'Meio-Elfo (Ghanor)',
        sentidos: ['Visão na penumbra'],
        periciasBonus: [
            { pericias: ['Intuição', 'Percepção'], valor: 2 }
        ],
        notas: [
            'Longa Infância: escolhe uma origem adicional (recebe o benefício, mas não os itens).'
        ]
    },

    cambionte: {
        nome: 'Cambionte (Ghanor)',
        sentidos: ['Visão no escuro'],
        proficiencias: ['Tipo Espírito'],
        periciasBonus: [
            { pericias: ['Intimidação', 'Intuição'], valor: 2 }
        ],
        magias: [
            { nome: 'Enfeitiçar', atributo: 'Carisma' }
        ],
        notas: [
            'Estigma: NPCs têm atitude inicial uma categoria pior em relação a você.'
        ]
    },

    nefilim: {
        nome: 'Nefilim (Ghanor)',
        sentidos: ['Visão no escuro'],
        proficiencias: ['Tipo Espírito'],
        // Obstinação: +2 em testes de resistência
        periciasBonus: [
            { pericias: ['Fortitude', 'Reflexos', 'Vontade'], valor: 2 }
        ],
        magias: [
            { nome: 'Arma Espiritual', atributo: 'Sabedoria' }
        ],
        notas: []
    },

    // ========================================================
    //  RAÇAS ADICIONADAS — Ameaças de Arton
    // ========================================================
    halforc_ameacas: {
        nome: 'Meio-Orc (Ameaças)',
        sentidos: ['Visão no escuro'],
        periciasBonus: [
            { pericias: ['Intimidação'], valor: 2 },
            { pericias: ['Percepção', 'Sobrevivência'], valor: 2, condicao: 'no subterrâneo' }
        ],
        notas: [
            'Adaptável: treinado em uma perícia à sua escolha.',
            'Sangue Orc: +1 de dano com armas corpo a corpo e de arremesso. Conta como orc para efeitos de raça.'
        ]
    },

    orc_ameacas: {
        nome: 'Orc (Ameaças)',
        sentidos: ['Visão no escuro'],
        periciasBonus: [
            { pericias: ['Fortitude'], valor: 2 },
            { pericias: ['Percepção', 'Sobrevivência'], valor: 2, condicao: 'no subterrâneo' }
        ],
        notas: [
            'Feroz: +2 de dano corpo a corpo e de arremesso; se sofrer dano de um inimigo, +4 até o fim do seu próximo turno.',
            'Vigor Brutal: soma a Força no total de PV.',
            'Habitante das Cavernas: possui sensibilidade a luz.'
        ]
    },

    tabrachi: {
        nome: 'Tabrachi (Ameaças)',
        sentidos: ['Visão na penumbra'],
        periciasBonus: [
            { pericias: ['Atletismo'], valor: 10, condicao: 'para saltar' }
        ],
        ataquesNaturais: [
            { nome: 'Língua', dano: '1d4', critico: 'x2', tipo: '', alcance: '3m',
              desc: 'Arma natural (alcance 3m). +2 para desarmar e derrubar. Pode gastar 1 PM para fazer um ataque extra com a língua ao usar a ação agredir.' }
        ],
        notas: [
            'Batráquio: deslocamento de natação igual ao deslocamento terrestre.'
        ]
    },

    ogre: {
        nome: 'Ogro (Ameaças)',
        sentidos: ['Visão na penumbra'],
        proficiencias: ['Tipo Gigante'],
        // Camada de Ingenuidade
        periciasBonus: [
            { pericias: ['Intuição', 'Vontade'], valor: -5 }
        ],
        notas: [
            'Tamanho Grande.',
            '… Maior a Porrada!: em ataque corpo a corpo, gaste 1 PM para causar +1d8 de dano do mesmo tipo se acertar.',
            'Camada de Ingenuidade: –5 em Intuição e Vontade (já aplicado).'
        ]
    },

    hobgoblin_ameacas: {
        nome: 'Hobgoblin (Ameaças)',
        sentidos: ['Visão no escuro'],
        periciasBonus: [
            { pericias: ['Furtividade'], valor: 2 },
            { pericias: ['Ofício'], valor: 2, condicao: '(armeiro)' }
        ],
        notas: [
            'Arte da Guerra: treinado em Guerra e proficiente em armas marciais; se já for proficiente, +2 de dano com elas.',
            'Metalurgia Hobgoblin: se treinado em Ofício (armeiro), fabrica itens superiores com uma melhoria; custo de melhorias reduzido a 1/4 do preço.'
        ]
    },

    gnoll: {
        nome: 'Gnoll (Ameaças)',
        sentidos: ['Faro'],
        ataquesNaturais: [
            { nome: 'Mordida', dano: '1d6', critico: 'x2', tipo: 'Perfuração',
              desc: 'Arma natural. Uma vez por rodada, ao usar agredir com outra arma, gasta 1 PM para ataque extra corpo a corpo com a mordida.' }
        ],
        notas: [
            'Faro: contra inimigos em alcance curto que não possa ver, não fica desprevenido e camuflagem total causa apenas 20% de falha.',
            'Oportunista: +2 de dano contra criaturas que sofreram dano de outras fontes desde seu último turno.',
            'Rendição: ganha 1d4 PM temporários se um inimigo se render. Lutando com menos de 1/4 dos PV sem se render, fica alquebrado.'
        ]
    },

    kaijin: {
        nome: 'Kaijin (Ameaças)',
        proficiencias: [
            'Tipo Monstro',
            'RD 2 (Couraça Rubra)',
            'Resistência +5 contra lefeu e Tormenta'
        ],
        notas: [
            'Couraça Rubra e Disforme contam como poderes da Tormenta (exceto para perda de Carisma).',
            'Cria da Tormenta: efeitos que não afetam lefou não afetam você.',
            'Disforme: itens mundanos devem ser adaptados (1 dia, +50% do custo).',
            'Terror Vivo: usa Força como atributo-chave de Intimidação e recebe um poder da Tormenta à escolha (não conta para perda de Carisma).'
        ]
    },

    kappa: {
        nome: 'Kappa (Ameaças)',
        proficiencias: ['Tipo Espírito'],
        magias: [
            { nome: 'Curar Ferimentos', atributo: 'Sabedoria',
              nota: 'Cura das Águas: inutilizada se a água da cabeça for derramada.' }
        ],
        notas: [
            'Alma da Água: deslocamento de natação igual ao terrestre.',
            'Carapaça Kappa: não pode ser flanqueado; cobertura leve submerso ou caído. Soma Constituição na Defesa (limitada pelo nível) se não usar armadura pesada (ou +2 se já somar Constituição).',
            "Tigela D'água: ao falhar por 5 ou mais contra agarrar, derrubar ou empurrar, derrama a água e fica enjoado até reencher (ação padrão em fonte de água)."
        ]
    },

    nezumi: {
        nome: 'Nezumi (Ameaças)',
        // Pequeno, Mas Não Metade
        deslocamento: '9m',
        sentidos: ['Faro', 'Visão na penumbra'],
        periciasBonus: [
            { pericias: ['Intimidação'], valor: 2 }
        ],
        ataquesNaturais: [
            { nome: 'Mordida', dano: '1d6', critico: 'x2', tipo: 'Perfuração',
              desc: 'Arma natural (Roedor). Pode gastar 1 PM para ataque extra. Críticos avariam a armadura do alvo ou aumentam o multiplicador em +1.' }
        ],
        notas: [
            'Pequeno, Mas Não Metade: resistência a medo +5 contra criaturas maiores.',
            'Mão de Rato: pode usar armas de até duas categorias de tamanho acima da sua, com –2 nos ataques (reduzido a 0 com Empunhadura Poderosa).'
        ]
    },

    tengu: {
        nome: 'Tengu (Ameaças)',
        sentidos: ['Visão no escuro'],
        proficiencias: ['Tipo Espírito'],
        periciasBonus: [
            { pericias: ['Percepção'], valor: 2 }
        ],
        notas: [
            'Asas Desorientadoras: se não estiver voando, recebe Finta Aprimorada (ou +5 em Enganação para fintar se já tiver o poder).',
            'Caminhante do Céu: paira a 1,5m (9m); gasta 1 PM/rodada para voar (12m). Ao abrir as asas, ocupa espaço de uma categoria maior.'
        ]
    },

    minauro: {
        nome: 'Minauro (Ameaças)',
        sentidos: ['Faro'],
        periciasBonus: [
            { pericias: ['Diplomacia', 'Investigação'], valor: 2 }
        ],
        notas: [
            'Faro: contra inimigos em alcance curto que não possa ver, não fica desprevenido e camuflagem total causa apenas 20% de falha.',
            'Plurivalente: recebe um poder geral à sua escolha.'
        ]
    },

    kobold: {
        nome: 'Kobolds (Ameaças)',
        sentidos: ['Visão no escuro'],
        proficiencias: ['Tipo Monstro'],
        periciasBonus: [
            { pericias: ['Sobrevivência'], valor: 2 }
        ],
        notas: [
            'Enxame Escamoso: conta como Pequeno para espaços. Em testes de resistência contra efeitos sem dano e de alvo único, rola 2 dados. Vulnerável a efeitos de área.',
            'Sensibilidade a Luz: fica ofuscado sob luz do sol ou similar.'
        ]
    },

    harpia: {
        nome: 'Harpia (Ameaças)',
        sentidos: ['Visão no escuro'],
        proficiencias: ['Tipo Monstro'],
        periciasBonus: [
            { pericias: ['Intimidação', 'Sobrevivência'], valor: 2 }
        ],
        ataquesNaturais: [
            { nome: 'Garras', dano: '1d6', critico: 'x2', tipo: '',
              desc: 'Pés Rapinantes: arma natural. Pode gastar 1 PM para ataque extra com a garra, ou usá-las como armas secundárias.' }
        ],
        notas: [
            'Asas de Abutre: paira a 1,5m (12m), ignora terreno difícil e é imune a queda. Sem armadura pesada, gasta 1 PM/rodada para voar (18m).',
            'Grito Aterrorizante: ação padrão e 1 PM; criaturas em alcance curto ficam abaladas (Vontade, CD Car, evita).',
            'Pés Rapinantes: os pés podem ser usados como mãos.'
        ]
    },

    ceratops: {
        nome: 'Ceratops (Ameaças)',
        defesaItem: { nome: 'Paquidérmico', bonus: 1, note: '+1 na Defesa' },
        ataquesNaturais: [
            { nome: 'Chifres', dano: '1d8', critico: 'x2', tipo: '',
              desc: 'Arma natural. Uma vez por rodada, ao usar agredir, gasta 1 PM para ataque extra com os chifres.' }
        ],
        notas: [
            'Paquidérmico: tamanho Grande; usa Força como atributo-chave de Intimidação.',
            'Papel Tribal: treinado em uma perícia entre Cura, Intimidação, Ofício ou Sobrevivência.',
            'Medo de Altura: adjacente a queda de 3m ou mais, fica abalado.'
        ]
    },

    pteros: {
        nome: 'Pteros (Ameaças)',
        sentidos: ['Visão na penumbra'],
        periciasBonus: [
            { pericias: ['Percepção', 'Sobrevivência'], valor: 2 }
        ],
        ataquesNaturais: [
            { nome: 'Garras', dano: '1d6', critico: 'x2', tipo: '',
              desc: 'Pés Rapinantes: duas armas naturais. Pode gastar 1 PM para ataque extra ou usá-las como armas secundárias.' }
        ],
        notas: [
            'Tamanho Grande.',
            'Senhor dos Céus: paira a 1,5m (9m); sem armadura pesada, gasta 1 PM/rodada para voar (12m). Ocupa espaço de uma categoria maior ao abrir as asas.',
            'Ligação Natural: vínculo mental com uma criatura (Int –3 ou mais); comunicação em alcance longo e sabe sua direção/distância. Pode trocar no início de cada aventura.',
            'Mãos Rudimentares: itens mundanos devem ser adaptados (1 dia, +50% do custo). Itens iniciais já vêm adaptados.'
        ]
    },

    velocis: {
        nome: 'Velocis (Ameaças)',
        deslocamento: '12m',
        sentidos: ['Visão na penumbra', 'Faro'],
        proficiencias: ['RD 2 corte e perfuração'],
        periciasBonus: [
            { pericias: ['Sobrevivência'], valor: 2 }
        ],
        notas: [
            'Através de Espinheiros: ignora terreno difícil natural.',
            'Velocista da Planície: usa Destreza para Atletismo e rola dois dados (melhor resultado) para correr ou saltar.'
        ]
    },

    voracis: {
        nome: 'Voracis (Ameaças)',
        sentidos: ['Visão na penumbra', 'Faro'],
        // Rainha da Selva: escalada 9m
        escaladaIgualDeslocamento: true,
        periciasBonus: [
            { pericias: ['Sobrevivência', 'Atletismo'], valor: 2 }
        ],
        ataquesNaturais: [
            { nome: 'Garras', dano: '1d6', critico: 'x2', tipo: '',
              desc: 'Duas armas naturais. Pode gastar 1 PM para ataque extra com uma garra livre ao usar a ação agredir.' }
        ],
        notas: [
            'Rainha da Selva: recupera +1 PV por nível ao descansar.'
        ]
    },

    yidishan: {
        nome: 'Yidishan (Ameaças)',
        proficiencias: ['Tipo Construto', 'Imune a cansaço, efeitos metabólicos e veneno'],
        // Peças Metálicas
        defesaItem: { nome: 'Peças Metálicas', bonus: 2, note: '+2 na Defesa (–2 de penalidade de armadura: aplique à mão)' },
        notas: [
            'Híbrido Mecânico: não respira, come ou dorme. Cura mundana reduzida à metade. Recupera PV/PM fixos por descanso (8h inerte).',
            'Peças Metálicas: penalidade de armadura de –2.'
        ]
    },

    sea_elf: {
        nome: 'Elfo do Mar (Ameaças)',
        sentidos: ['Visão na penumbra'],
        ataqueBonus: { palavras: ['arpão', 'rede', 'tridente'], valor: 2 },
        periciasBonus: [
            { pericias: ['Furtividade', 'Sobrevivência'], valor: 2, condicao: 'na água' }
        ],
        notas: [
            'Arsenal do Oceano: proficiência em arpão, rede e tridente (se já for proficiente, contam como armas leves).',
            'Cria das Águas: deslocamento de natação igual ao terrestre; na água, percepção às cegas 18m e +2 na Defesa.',
            'Dependência de Água: mais de um dia sem contato com água = não recupera PM com descanso.'
        ]
    },

    nagah_macho: {
        nome: 'Nagah (Macho - Ameaças)',
        sentidos: ['Visão na penumbra'],
        proficiencias: ['Resistência a veneno +5'],
        defesaItem: { nome: 'Presentes de Sszzaas', bonus: 1, note: '+1 na Defesa' },
        periciasBonus: [
            { pericias: ['Enganação'], valor: 2 }
        ],
        ataquesNaturais: [
            { nome: 'Cauda', dano: '1d6', critico: 'x2', tipo: '',
              desc: 'Arma natural. Pode gastar 1 PM para ataque extra com a cauda ao usar a ação agredir.' }
        ],
        notas: [
            'Inocência Dissimulada: gaste 2 PM para trocar um teste de perícia baseada em Int, Sab ou Car por Enganação.',
            'Fraquezas Ofídias: +1 de dano por dado de frio sofrido e –5 em resistências contra músicas de Bardo.'
        ]
    },

    nagah_femea: {
        nome: 'Nagah (Fêmea - Ameaças)',
        sentidos: ['Visão na penumbra'],
        proficiencias: ['Resistência a veneno +5'],
        defesaItem: { nome: 'Presentes de Sszzaas', bonus: 1, note: '+1 na Defesa' },
        periciasBonus: [
            { pericias: ['Enganação'], valor: 2 }
        ],
        ataquesNaturais: [
            { nome: 'Cauda', dano: '1d6', critico: 'x2', tipo: '',
              desc: 'Arma natural. Pode gastar 1 PM para ataque extra com a cauda ao usar a ação agredir.' }
        ],
        notas: [
            'Inocência Dissimulada: gaste 2 PM para trocar um teste de perícia baseada em Int, Sab ou Car por Enganação.',
            'Fraquezas Ofídias: +1 de dano por dado de frio sofrido e –5 em resistências contra músicas de Bardo.'
        ]
    },

    fintroll: {
        nome: 'Fintroll (Ameaças)',
        proficiencias: [
            'Tipo Monstro',
            'Imune a atordoamento e metamorfose',
            'Resistência a magia +2'
        ],
        periciasBonus: [
            { pericias: ['Misticismo'], valor: 2 }
        ],
        notas: [
            'Corpo Vegetal: contra magias sem resistência, tem direito a Fortitude (CD da magia) para evitar o efeito.',
            'Regeneração Vegetal: uma vez por rodada, 1 PM para recuperar 5 PV (não cura dano de ácido ou fogo).',
            'Intolerância a Luz: sensibilidade a luz; sob luz do sol ou similar, não consegue ativar a Regeneração Vegetal.'
        ]
    },

    soterrado: {
        nome: 'Soterrado (Ameaças)',
        sentidos: ['Visão no escuro'],
        proficiencias: [
            'Tipo Morto-vivo',
            'RD 5 corte e perfuração, RD 10 frio',
            'Imune a cansaço, metabólicos, trevas e veneno'
        ],
        notas: [
            'Abraço Gélido: +2 em testes para agarrar; ataques desarmados e com armas naturais causam +2 de dano de frio.',
            'Esquife de Gelo: sofre 1 ponto de dano adicional por dado de dano de fogo.',
            'Natureza Esquelética: cura mágica causa dano; trevas recuperam seus PV.',
            'Preço da Não Vida: precisa de 8h sob a luz de estrelas ou no subterrâneo para recuperar PV e PM; do contrário sofre efeitos de fome.'
        ]
    },

    // ========================================================
    //  RAÇAS ADICIONADAS — Heróis de Arton / Outras
    // ========================================================
    duende: {
        nome: 'Duende (Heróis de Arton)',
        // Natureza e tamanho (e suas vantagens) vêm da calculadora; aqui só as fraquezas fixas.
        notas: [
            'Aversão a Ferro: +1 de dano por dado de ataques de ferro/aço; sofre 1d6 de dano por rodada se empunhar ou vestir metal.',
            'Aversão a Sinos: fica alquebrado e esmorecido ao ouvir sinos (em cidades, role 1d6; 1 = ouviu).',
            'Tabu: escolha uma perícia (Diplomacia, Iniciativa, Luta ou Percepção) para sofrer –5. Desrespeitar o tabu causa fadiga/morte.'
        ]
    },

    eiradaan: {
        nome: 'Eiradaan (Heróis de Arton)',
        sentidos: ['Visão na penumbra'],
        proficiencias: ['Tipo Espírito'],
        notas: [
            'Essência Feérica: pode falar com animais livremente.',
            'Magia Instintiva: usa Sabedoria para magias arcanas e Misticismo; +1 PM para aprimoramentos ao lançar magias (não cumulativo).',
            'Sentidos Místicos: sempre sob o efeito básico de Visão Mística.',
            'Canção da Melancolia: em testes de Vontade contra efeitos mentais, rola dois dados e usa o pior.'
        ]
    },

    galokk: {
        nome: 'Galokk (Heróis de Arton)',
        proficiencias: ['Tipo Gigante'],
        notas: [
            'Meio-Gigante: tamanho Grande; usa Força como atributo-chave de Intimidação.',
            'Força dos Titãs: ao acertar ataque corpo a corpo/arremesso, gaste 1 PM; se rolar o máximo no dado de dano, rola um dado extra (limite = Força).',
            'Infância Entre os Pequenos: treinado em uma perícia à sua escolha.'
        ]
    },

    halfelf_herois: {
        nome: 'Meio-Elfo (Heróis de Arton)',
        // Sangue Élfico: +1 PM a cada nível ímpar
        pmBonus: (lv) => Math.ceil(lv / 2),
        sentidos: ['Visão na penumbra'],
        // Entre Dois Mundos: +1 em perícias baseadas em Carisma
        periciasBonus: [
            { pericias: ['Adestramento', 'Atuação', 'Diplomacia', 'Enganação', 'Intimidação', 'Jogatina'], valor: 1 }
        ],
        notas: [
            'Ambição Herdada: recebe um poder geral ou poder único de origem à sua escolha.',
            'Sangue Élfico: é considerado um elfo.'
        ]
    },

    satiro: {
        nome: 'Sátiro (Heróis de Arton)',
        deslocamento: '12m',
        sentidos: ['Visão na penumbra'],
        proficiencias: ['Tipo Espírito'],
        periciasBonus: [
            { pericias: ['Atuação', 'Fortitude'], valor: 2 }
        ],
        magias: [
            { nome: 'Amedrontar', atributo: 'Carisma', nota: 'Instrumentista Mágico: exige um instrumento musical.' },
            { nome: 'Enfeitiçar', atributo: 'Carisma', nota: 'Instrumentista Mágico: exige um instrumento musical.' },
            { nome: 'Hipnotismo', atributo: 'Carisma', nota: 'Instrumentista Mágico: exige um instrumento musical.' },
            { nome: 'Sono', atributo: 'Carisma', nota: 'Instrumentista Mágico: exige um instrumento musical.' }
        ],
        ataquesNaturais: [
            { nome: 'Marrada', dano: '1d6', critico: 'x2', tipo: '',
              desc: 'Arma natural. Pode gastar 1 PM para ataque extra com a marrada ao usar a ação agredir.' }
        ],
        notas: [
            'Pernas Caprinas: usa Destreza para Atletismo.'
        ]
    },

    nailanandora: {
        nome: 'Nailanandora (Duelo de Dragões)',
        sentidos: ['Visão na penumbra'],
        proficiencias: ['Resistência a encantamento +2'],
        periciasBonus: [
            { pericias: ['Misticismo', 'Percepção'], valor: 2 }
        ],
        notas: [
            'Asas Emplumadas: gasta 1 PM por rodada para voar (12m); enquanto voa, +2 na Defesa e em Reflexos.'
        ]
    },

    // ========================================================
    //  RAÇAS ADICIONADAS — Bestiário
    // ========================================================
    elfoGelo: {
        nome: 'Elfo-do-Gelo',
        // Graça de Beluhga (não reduzido por terreno difícil natural)
        deslocamento: '12m',
        sentidos: ['Visão na penumbra'],
        proficiencias: ['RD frio 10'],
        periciasBonus: [
            { pericias: ['Percepção', 'Sobrevivência'], valor: 2 }
        ],
        notas: [
            'Herança Gélida: quando causa dano, causa +1d4 de dano de frio.'
        ]
    },

    lamia: {
        nome: 'Lâmia',
        deslocamento: '12m',
        sentidos: ['Visão no escuro'],
        proficiencias: ['Tipo Monstro'],
        periciasBonus: [
            { pericias: ['Enganação', 'Furtividade'], valor: 2 }
        ],
        ataquesNaturais: [
            { nome: 'Toque Psíquico', dano: '1d6', critico: 'x2', tipo: 'Psíquico',
              desc: 'Arma natural. Uma vez por rodada, ao usar agredir com outra arma, gasta 1 PM para ataque corpo a corpo extra, desde que tenha uma mão livre não usada para atacar neste turno.' }
        ],
        notas: [
            'Corpo Felino: tamanho Grande, mas conta como Média para as armas que usa.',
            'Magia das Lâmias: duas magias à escolha entre Criar Ilusão, Compreensão, Disfarce Ilusório e Visão Mística (Carisma), selecionadas ao criar a raça e aplicadas automaticamente na aba de magias.'
        ]
    },

    manotauro: {
        nome: 'Manotauro',
        deslocamento: '12m',
        ataquesNaturais: [
            { nome: 'Cascos', dano: '1d8', critico: 'x2', tipo: 'Impacto',
              desc: 'Arma natural. Uma vez por rodada, ao usar agredir com outra arma, gasta 1 PM para ataque extra com os cascos.' },
            { nome: 'Chifres', dano: '1d8', critico: 'x2', tipo: 'Perfuração',
              desc: 'Arma natural. Uma vez por rodada, ao usar agredir com outra arma, gasta 1 PM para ataque extra com os chifres.' }
        ],
        notas: [
            'Corpulento: tamanho Grande. Não pode se beneficiar de montaria e, carregando um cavaleiro, sofre –2 em testes e fica em condição ruim para lançar magias.',
            'Medo de Altura: adjacente a queda de 3m ou mais, fica abalado.'
        ]
    },

    salamandra: {
        nome: 'Salamandra',
        sentidos: ['Visão no escuro'],
        proficiencias: ['Tipo Espírito', 'RD fogo 10'],
        periciasBonus: [
            { pericias: ['Ofício'], valor: 2, condicao: '(ferreiro)' }
        ],
        ataquesNaturais: [
            { nome: 'Cauda', dano: '1d6', critico: 'x2', tipo: 'Perfuração',
              desc: 'Arma natural. Uma vez por rodada, ao usar agredir com outra arma, gasta 1 PM para ataque extra com a cauda.' }
        ],
        notas: [
            'Calor Natural: gaste 2 PM para causar +1d6 de dano de fogo com seus ataques até o fim da cena.',
            'Fraqueza Glacial: –5 em testes contra efeitos de frio e +1 de dano por dado de dano de frio sofrido.'
        ]
    },

    vampiro: {
        nome: 'Vampiro',
        sentidos: ['Visão no escuro'],
        proficiencias: ['Tipo Morto-vivo', 'Imune a cansaço, metabólicos, trevas e veneno'],
        // Bênçãos Vampíricas e Resquícios da Outra Vida são escolhas feitas à mão.
        notas: [
            'Natureza Não Viva: não respira, alimenta-se só de sangue; dormir à noite não recupera PV e PM. Cura mágica de luz causa dano.',
            'Dieta de Sangue: 1 dose de sangue por semana (1 litro ou 2d6 PV drenados).',
            'Perda da Humanidade: as fraquezas vampíricas se agravam a cada bênção adquirida.',
            'Resquícios da Outra Vida: treinado em uma perícia à escolha ou um poder geral.'
        ]
    },

    // ========================================================
    //  RAÇAS ADICIONADAS — Dragão Brasil
    // ========================================================
    anaoSuperficie: {
        nome: 'Anão da Superfície',
        // Duro como Pedra: +3 PV no 1º nível e +1 por nível seguinte
        pvPrimeiroNivel: 3,
        pvPorNivel: 1,
        // Devagar e Sempre
        deslocamento: '6m',
        deslocamentoNuncaReduzido: true,
        // Tradição de Heredrimm
        ataqueBonus: { palavras: ['machado', 'martelo', 'marreta', 'picareta'], valor: 2 },
        notas: [
            'Tradição de Heredrimm: para você, machados, martelos, marretas e picaretas são armas simples.',
            'Somente o Necessário: uma vez por sessão, ação completa e 1 PM para achar em seus equipamentos um item de T$ 1d10 + nível (ou materiais de fabricação de T$ 1d6 + nível).'
        ]
    },

    elfoSombrio: {
        nome: 'Elfo-Sombrio',
        sentidos: ['Visão na penumbra'],
        periciasBonus: [
            { pericias: ['Misticismo', 'Percepção'], valor: 2 }
        ],
        ataqueBonus: { palavras: ['florete', 'gadanho', 'mosquete'], valor: 2 },
        magias: [
            { nome: 'Invisibilidade', nota: 'Manto das Sombras: só pode ser lançada em si mesmo.' }
        ],
        notas: [
            'Arsenal de Tenebra: proficiência em florete, gadanho e mosquete (se já for proficiente, pode considerá-la arma leve).',
            'Sensibilidade ao Sol: sob luz solar direta, fica ofuscado e perde 2d6 PV por patamar por rodada.'
        ]
    },

    medusaDraconica: {
        nome: 'Medusa Dracônica',
        sentidos: ['Visão no escuro'],
        proficiencias: ['Tipo Monstro'],
        notas: [
            'Natureza Elemental: escolha ácido, eletricidade, fogo ou frio para ter RD 5 desse tipo; ação de movimento e 1 PM para encantar a arma, causando +1d12 desse tipo até acertar ou até o fim da cena.',
            'Olhar Místico: lança uma magia de 1º círculo à escolha, da energia da Natureza Elemental (não pode se estiver cego).'
        ]
    },

    teju: {
        nome: 'Teju',
        sentidos: ['Visão na penumbra'],
        escaladaIgualDeslocamento: true,
        ataquesNaturais: [
            { nome: 'Língua', dano: '1d4', critico: 'x2', tipo: '', alcance: '3m',
              desc: 'Arma natural (alcance 3m). +2 para desarmar e derrubar. Pode gastar 1 PM para ataque extra com a língua ao usar a ação agredir.' }
        ],
        notas: [
            'Mecanismo de Defesa: ao sofrer crítico (ou efeito que decepe um membro), gaste 3 PM para descolar o membro e reduzir o dano à metade. O membro leva 2d6 dias para crescer.'
        ]
    },

    licantropo: {
        nome: 'Licantropo',
        sentidos: ['Faro', 'Visão na penumbra'],
        notas: [
            'Aversão a Mitral: sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral.',
            'Maldição da Licantropia: humanoide atingido pela sua mordida contrai licantropia (Fortitude, CD baseada em Constituição, evita).',
            'Transformação Incontrolável: ao presenciar violência física letal, pode assumir a forma híbrida na noite seguinte até o amanhecer (Vontade CD 25 evita, se souber da maldição).'
        ]
    },

    lobisomem: {
        nome: 'Lobisomem',
        sentidos: ['Faro', 'Visão na penumbra'],
        notas: [
            'Aversão a Mitral: sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral.',
            'Empatia com Lobos: +5 em testes de Adestramento com lobos e lobos-das-cavernas; pode usar a perícia para mudar atitude e persuasão com essas criaturas.',
            'Maldição da Licantropia: humanoide atingido pela mordida contrai licantropia (Fortitude, CD baseada em Constituição, evita).',
            'Forma Híbrida: +2 em Força, mordida natural (1d6) e duas garras naturais (1d6 cada). O equipamento vestido desaparece, mas mantém seus efeitos. Ao usar Agredir com outra arma, gaste 1 PM por um ataque extra de mordida e 1 PM por um ataque extra com uma garra livre; as garras servem como arma secundária.',
            'Forma de Lobo: tamanho Médio, deslocamento 15m, +2 em Força e mordida natural (1d6). Não fala, não empunha itens nem lança magias; o equipamento desaparece, mas mantém os efeitos dos itens vestidos. Gaste 1 PM para um ataque extra de mordida; ao acertar a mordida, gaste 1 PM para derrubar. Recebe +10 em Enganação contra Percepção para parecer um animal comum.',
            'Transformação Incontrolável: a transformação involuntária é sempre na forma híbrida e o personagem fica sob controle do mestre. Morto ou inconsciente, reverte à forma humanoide.'
        ]
    }
};

if (typeof window !== 'undefined') window.RACE_SHEET_DETAILS = RACE_SHEET_DETAILS;
