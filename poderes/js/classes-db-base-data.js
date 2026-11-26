// ============================================================
//  CLASSES BASE — DRAGÃO BRASIL / A LENDA DE RUFF GHANOR
// ------------------------------------------------------------
//  Místico e Samurai (Dragão Brasil) e Soldado (A Lenda de Ruff
//  Ghanor) são classes completas próprias (não variantes de uma
//  classe do livro básico). Transcrito e reorganizado a partir
//  do material do usuário.
//
//  Mesmo formato de `data.js`/`classes-db-data.js`
//  (type/class/subType/pathReq/req/name/desc), com pathReq:
//  '<classe>-base' para habilidades fixas por nível e 'all'
//  para o pool de poderes selecionáveis — plugam direto no
//  motor de renderização de Classes existente.
//
//  Místico atualizado para a versão final da classe: Combate
//  Elemental, Afinidade Elemental, Moldar Elemento, Tradição
//  Oral reformulada, novos poderes e Guias Elementais.
//  `classesDbBaseGuides` reúne os seis guias como parceiros
//  especiais (fora do pool de poderes), com suas ordens.
// ============================================================

const classesDbBasePowers = [
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 1",
    name: "Afinidade Elemental",
    desc: "Escolha um elemento entre água, ar, fogo, luz, terra e trevas. Uma vez feita, essa escolha não pode ser mudada. Você recebe redução 5 contra o tipo de dano associado ao seu elemento para cada círculo de magia que pode lançar (RD 5 no 1º nível, RD 10 no 6º, RD 15 no 10º e RD 20 no 14º). Além disso, cada elemento adiciona uma perícia à sua lista de perícias de classe e define a condição adicional causada pelo seu Combate Elemental.<br><br><strong>Os Seis Elementos</strong><br>• <strong>Água</strong> — dano de frio; escola Encantamento; condição Lento; perícia Diplomacia (Car); guias assassino, perseguidor ou vigilante.<br>• <strong>Ar</strong> — dano de eletricidade; escola Ilusão; condição Ofuscado; perícia Enganação (Car); guias ajudante, guardião ou médico.<br>• <strong>Fogo</strong> — dano de fogo; escola Transmutação; condição Em Chamas (não tem duração de 1 rodada); perícia Acrobacia (Des); guias atirador, combatente ou fortão.<br>• <strong>Luz</strong> — dano de luz; escola Abjuração; condição Ofuscado; perícia Cura (Sab); guias guardião, médico ou vigilante.<br>• <strong>Terra</strong> — dano de ácido; escola Convocação; condição Vulnerável; perícia Investigação (Int); guias combatente, guardião ou montaria.<br>• <strong>Trevas</strong> — dano de trevas; escola Necromancia; condição Não pode curar PV; perícia Intimidação (Car); guias assassino, magivocador ou perseguidor.<br><br><strong>Ditames.</strong> O místico expande suas magias conhecidas através de ditames, conjuntos temáticos fechados. Ele não tem acesso a habilidades como Conhecimento Mágico do arcanista, precisando seguir padrões e tradições estabelecidos há muito tempo e passados de geração em geração. Quando adquire um poder de ditame, se o místico já conhece uma das magias indicadas, pode trocá-la por outra magia arcana de mesmo círculo, desde que essa magia seja de uma de suas escolas permitidas.<br><br><strong>Expressões naturais.</strong> Alguns poderes fazem referência a expressões naturais de um elemento: manifestações que ocorrem sem serem alimentadas de magia. Uma fogueira pode servir como expressão natural de fogo mesmo que tenha sido acesa com uma Bola de Fogo, mas um ber'baram ou outro elemental não poderia, bem como as chamas da magia Muralha Elemental. Para luz, são ambientes iluminados; para trevas, ambientes desprovidos de iluminação; para água, corpos de água limpos como poças, lagos e rios; para terra, montanhas e extensões de terra fértil; para ar, ambientes com ar puro, normalmente encontrados em altitudes elevadas."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 1",
    name: "Combate Elemental",
    desc: "Quando faz um ataque com uma arma corpo a corpo, você pode gastar PM para infundir a arma com seu elemento. Para cada PM gasto (limitado pelo seu círculo máximo de magias), você causa +1d6 pontos de dano extra do seu elemento. Esse valor aumenta para +2d6 no 6º nível, +3d6 no 10º nível e +4d6 no 14º nível. Se causar dano, também causa a condição do seu elemento (veja Afinidade Elemental) por 1 rodada — exceto Em Chamas, que não tem duração de 1 rodada. Se você lançou uma magia do seu elemento no turno em que fez o ataque, recebe um bônus nesse teste de ataque igual ao dobro do círculo da magia."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 1",
    name: "Magias",
    desc: "Você pode lançar magias arcanas de 1º círculo de evocação, de uma segunda escola definida pelo seu elemento e de uma terceira escola à sua escolha (uma vez feita, essa escolha não pode ser mudada). À medida que sobe de nível, pode lançar magias de círculos maiores (2º círculo no 6º nível, 3º círculo no 10º nível e 4º círculo no 14º nível). Você começa com Criar Elementos e duas magias de 1º círculo a sua escolha. A cada nível par (2º, 4º etc.), aprende uma magia de qualquer círculo e escola que possa lançar. Você pode lançar essas magias vestindo armaduras leves sem precisar de testes de Misticismo. Seu atributo-chave para lançar magias é Sabedoria e você soma sua Sabedoria no seu total de PM.<br><br>Alguns poderes fazem referência a magias do seu elemento. Isso quer dizer magias que causem dano do tipo do seu elemento e magias da escola associada ao seu elemento."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 2",
    name: "Língua Primordial",
    desc: "No 2º nível, você pode se comunicar com qualquer espírito com quem compartilhe Afinidade Elemental. Você recebe +5 em testes de Carisma e de perícias originalmente baseadas em Carisma com essas criaturas."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 3",
    name: "Moldar Elemento",
    desc: "No 3º nível, você pode usar a energia elemental do ambiente para fortalecer suas magias. Se estiver em contato com uma expressão natural do seu elemento de tamanho Grande, você pode gastar uma ação de movimento para aumentar seu limite de PM para magias do seu elemento em +1. Conforme sobe de nível, precisa de expressões cada vez menores e obtém bônus cada vez maiores: Médio, +2 no 8º nível; Pequeno, +3 no 15º nível; Minúsculo, +4 no 20º nível (como ação livre, pela Comunhão Suprema)."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 3",
    name: "Tradição Oral",
    desc: "A partir do 3º nível, você pode fazer testes de Conhecimento mesmo sem ser treinado e, quando faz um teste de Conhecimento ou Misticismo, pode gastar 1 PM para rolá-lo novamente."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 4",
    name: "Sexto Sentido",
    desc: "No 4º nível, você pode somar sua Sabedoria, limitada pelo seu nível, à sua Defesa."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 6",
    name: "Afinidade Evoluída",
    desc: "No 6º nível, escolha uma das seguintes opções.<br><br><strong>Afinidade Concentrada.</strong> A CD para resistir a suas magias aumenta em +2. Além disso, magias de dano causam um dado de dano extra do mesmo tipo.<br><br><strong>Afinidade Expandida.</strong> Escolha um segundo elemento para sua habilidade Afinidade Elemental. Você se torna treinado na perícia relacionada ao segundo elemento e recebe todos os benefícios de Afinidade Elemental relativos a ele, incluindo redução de dano e acesso a sua escola associada. Para todos os sentidos, o segundo elemento também é considerado seu elemento."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 6",
    name: "Guias Elementais (regras)",
    desc: "Guias elementais são um tipo especial de parceiro, obtido pelo poder Pacto Elemental. Um guia deve ser invocado através de uma expressão natural do seu elemento de qualquer tamanho, com uma ação de movimento e 2 PM; ele desaparece no final da cena. No 7º nível, você pode gastar +1 PM para invocá-lo como parceiro veterano; no 15º nível, +2 PM para invocá-lo como parceiro mestre.<br><br>Em seu turno, você pode dar uma ordem ao guia usando uma ação de movimento. As ordens de cada guia são apresentadas em sua descrição; algumas custam PM. Quaisquer bônus das ordens acumulam com os bônus de parceiro do guia, mas não com os bônus de outros parceiros. Todas essas ações são habilidades mágicas.<br><br>O bônus para testes do guia é igual à sua Sabedoria mais seu círculo máximo de magias. Em situações condizentes com a natureza do guia, esse bônus aumenta em +2 por patamar do guia. Ordens além das listadas podem receber esse bônus, a critério do mestre; situações completamente avessas à natureza do guia aplicam um redutor de mesmo valor.<br><br>Se você tem um alikunhá, não precisa de uma expressão natural do seu elemento para invocar o guia. Em vez disso, você transforma o alikunhá no guia ao realizar o ritual.<br><br><strong>Ordens por elemento:</strong><br>• <strong>Água:</strong> Bolha; Escudo Hídrico; Jato Hidráulico (1 PM).<br>• <strong>Ar:</strong> Barreira Eólica; Bons Ventos (reação); Planar (2 PM).<br>• <strong>Fogo:</strong> Aura de Calor; Chicote de Chamas (2 PM); Labareda Propulsora.<br>• <strong>Luz:</strong> Brilhar; Curar (2 PM); Cegar (1/cena).<br>• <strong>Terra:</strong> Arremesso de Rocha (2 PM); Muralha; Tunelar.<br>• <strong>Trevas:</strong> Manto Sombrio; Tentáculo Obscuro (2 PM); Apavorar."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 20",
    name: "Comunhão Suprema",
    desc: "No 20º nível, você desenvolve uma comunhão perfeita com seu elemento. Você se torna imune ao tipo de dano da sua Afinidade Elemental e pode usar Moldar Elemento como uma ação livre com uma expressão elemental Minúscula (+4). Além disso, uma vez por cena, você pode gastar uma ação de movimento para receber três poderes de magia que cumpram os pré-requisitos à sua escolha. Se também gastar 1 PM por poder, você não precisa cumprir seus pré-requisitos. Você mantém os poderes até o final da cena. Finalmente, você pode gastar o dobro de PM em Combate Elemental."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Absorver Elemento",
    desc: "Uma vez por cena, quando está em contato com uma expressão natural do seu elemento de tamanho Médio ou maior, você pode gastar uma ação de movimento para absorver energia mágica. Você adquire uma quantidade de PM temporários igual ao seu círculo máximo de magias. Esses PM duram por uma cena e não são cumulativos."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "12º nível de místico, Afinidade Expandida",
    name: "Afinidade Maior",
    desc: "Escolha um terceiro elemento para sua habilidade Afinidade Elemental. Você se torna treinado na perícia relacionada ao terceiro elemento e recebe todos os benefícios de Afinidade Elemental relativos a ele, incluindo redução de dano e acesso a sua escola associada. Para todos os sentidos, o terceiro elemento também é considerado seu elemento."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (terra)",
    name: "Andar pelas Paredes",
    desc: "Você recebe deslocamento de escalada igual ao seu deslocamento padrão. Você não fica desprevenido enquanto escala desse modo."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "4º nível de místico, Afinidade Elemental (terra)",
    name: "Armadura Rochosa",
    desc: "Você pode usar uma ação de movimento e 1 PM para criar uma couraça ou uma meia armadura de terra e rocha que não atrapalha os gestos necessários para lançar magias arcanas. Você é proficiente com a armadura e ela dura por uma cena antes de se desfazer em poeira. Se estiver em contato com uma expressão natural de terra Grande ou maior, a penalidade da armadura diminui em 1."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Aumento de Atributo",
    desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (luz)",
    name: "Auréola Celeste",
    desc: "Quando usa uma magia de abjuração ou que cause dano de luz, você pode gastar uma ação de movimento e PM para fazer uma auréola surgir sobre a cabeça de um aliado em alcance curto. A auréola concede 5 PV temporários por PM gasto, desaparecendo quando acabarem os PV ou no final da cena. Além disso, enquanto a auréola durar, o aliado recebe +1 em testes de resistência."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Pacto Elemental",
    name: "Busca Mágica",
    desc: "Escolha uma magia de um círculo ao qual você tenha acesso (mesmo não tendo acesso à escola da magia ou a magias divinas). Seu guia elemental vai buscar a magia e você a aprende e pode lançar por um dia. Seu parceiro atravessa os planos de existência para encontrar a magia, se ausentando por uma hora por círculo da magia requisitada, mais uma hora adicional caso a magia seja de uma escola à qual você não tenha acesso e outra hora adicional caso a magia seja divina."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Contramágica Elemental",
    desc: "Você pode fazer contramágicas contra magias do seu elemento usando qualquer magia do mesmo círculo. Se usar uma magia do seu elemento para fazer uma contramágica, pode fazê-lo como reação."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Contramágica Elemental",
    name: "Contramágica Poderosa",
    desc: "Quando faz contramágicas usando magias do seu elemento, você pode usar magias um círculo abaixo da magia que quer anular."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Corpo Elemental",
    desc: "Uma vez por cena, você pode gastar uma ação de movimento para fortalecer seu físico. Você adquire uma quantidade de PV temporários igual a 5 vezes seu círculo máximo de magias, ou o dobro disso se estiver em contato com uma expressão natural do seu elemento de tamanho Médio ou maior. Esses PV duram por uma cena e não são cumulativos."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "17º nível de místico, dois poderes de ditame",
    name: "Ditame Absoluto",
    desc: "Você ganha acesso ao 5º círculo de magias e aprende uma magia de uma escola associada à sua Afinidade Elemental. Você não pode saber mais de uma magia de 5º círculo."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (água)",
    name: "Ditame da Chuva",
    desc: "Você aprende a magia Área Escorregadia. No 6º nível, aprende Tempestade Divina. No 10º nível, aprende Controlar Água."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (luz)",
    name: "Ditame da Cura",
    desc: "Você aprende a magia Curar Ferimentos. No 6º nível, aprende Purificação. No 10º nível, aprende Sopro da Salvação."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (fogo ou luz)",
    name: "Ditame da Manhã",
    desc: "Você aprende a magia Luz e tem acesso a todos os seus aprimoramentos, como se fosse um conjurador arcano e divino. No 6º nível, aprende Raio Solar. No 10º nível, aprende Coluna de Chamas."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (terra)",
    name: "Ditame da Montanha",
    desc: "Você aprende a magia Primor Atlético. No 10º nível, aprende Controlar Terra. No 14º nível, aprende Terremoto."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "6º nível de místico",
    name: "Ditame da Profecia",
    desc: "Você aprende a magia Augúrio. No 10º nível, aprende Lendas & Histórias e Vidência. Se lançar Augúrio em contato com uma expressão natural do seu elemento de tamanho Grande ou maior, não há chance de falha."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (água ou ar)",
    name: "Ditame das Brumas",
    desc: "Você aprende a magia Névoa. No 6º nível, aprende Camuflagem Ilusória e Miasma Mefítico."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (fogo)",
    name: "Ditame das Chamas",
    desc: "Você aprende a magia Explosão de Chamas. No 6º nível, aprende Controlar Fogo. No 10º nível, aprende Muralha Elemental (somente fogo)."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (trevas)",
    name: "Ditame do Breu",
    desc: "Você aprende a magia Escuridão. No 10º nível, aprende Anular a Luz e Manto de Sombras."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (luz ou trevas)",
    name: "Ditame do Crepúsculo",
    desc: "Você aprende as magias Consagrar e Profanar. No 6º nível, aprende Crânio Voador de Vladislav."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "treinado em Luta",
    name: "Ditame do Espadachim",
    desc: "Você aprende a magia Concentração de Combate. No 6º nível, aprende Velocidade. No 10º nível, aprende Transformação de Guerra."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "6º nível de místico",
    name: "Ditame dos Portais",
    desc: "Você aprende a magia Salto Dimensional. A partir do 10º nível, aprende Teletransporte. A partir do 14º nível, aprende Viagem Planar."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (ar)",
    name: "Ditame dos Ventos",
    desc: "Você aprende a magia Queda Suave. No 6º nível, aprende Controlar Ar. No 14º nível, aprende Controlar o Clima."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Disparo Elemental",
    name: "Disparo em Linha",
    desc: "Quando usa Disparo Elemental, você pode gastar 2 PM para atingir vários alvos. Faça um ataque à distância e compare-o com a Defesa de cada inimigo em uma linha de 9m."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "treinado em Pontaria",
    name: "Disparo Elemental",
    desc: "Você pode usar Combate Elemental com armas de ataque à distância."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "17º nível de místico",
    name: "Elemento Indomável",
    desc: "Quando usa Elemento Penetrante, se gastar 5 PM, você também ignora a imunidade dos alvos."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Elemento Penetrante",
    desc: "Quando causa dano do seu elemento, você pode gastar uma quantidade de PM limitada pelo seu círculo máximo de magias. Para cada PM gasto dessa forma, você ignora até 10 pontos da redução de dano dos alvos contra esse tipo de dano."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "6º nível de místico",
    name: "Elemento Poderoso",
    desc: "Quando lança uma magia do seu elemento, você pode gastar PM (limitado pelo seu círculo máximo de magias) para aumentar seu poder. Para cada PM gasto, a CD para resistir à sua magia aumenta em +1."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (água ou ar)",
    name: "Empuxo",
    desc: "Você sempre flutua na superfície de qualquer corpo d'água ou fluido similar, e ganha deslocamento de natação igual ao seu deslocamento padrão."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (terra)",
    name: "Escavadeira",
    desc: "Você recebe deslocamento de escavar igual a seu deslocamento padrão."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (terra)",
    name: "Estabilidade Terrena",
    desc: "Você recebe um bônus igual ao seu círculo máximo de magias em testes de manobra para se defender."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Escudo Elemental",
    desc: "Quando usa seu Combate Elemental, você recebe um bônus na Defesa e em testes de resistência igual à quantidade de PM gastos nele por 1 rodada. Se você lançou uma magia do seu elemento neste turno, também recebe redução de dano igual ao dobro do círculo da magia por 1 rodada."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Familiar Elemental",
    desc: "Você recebe um familiar arcano (Tormenta20 Jogo do Ano, página 38). Seu familiar deve ser um elemental com quem você compartilhe Afinidade Elemental (veja Ameaças de Arton)."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Flagelo Elemental",
    desc: "Quando usa Combate Elemental e faz um acerto crítico, seu dano extra fornecido por Combate Elemental é multiplicado junto do dano da arma. Se você lançou uma magia de 4º ou 5º círculo do seu elemento neste turno, aumente o multiplicador de crítico em 1."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Frenesi Elemental",
    desc: "Uma vez por rodada, quando faz um acerto crítico com uma arma corpo a corpo, você pode gastar 2 PM para lançar uma magia do seu elemento como parte da mesma ação. Essa magia não pode receber aprimoramentos."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (água)",
    name: "Hidratação",
    desc: "Quando lança uma magia de encantamento ou que cause dano de frio, você pode gastar PM para se hidratar. Cada PM gasto cura 5 PV."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (ar)",
    name: "Oito Nuvens",
    desc: "Quando lança uma magia de ilusão ou que cause dano de eletricidade, você pode gastar uma ação de movimento e PM para ser rodeado por nuvens até o final da cena. Cada nuvem custa 1 PM e concede +1 na Defesa; enquanto tiver cinco nuvens ou mais, você tem camuflagem. Quando um ataque contra você erra, uma nuvem se dissipa. Você não pode ter mais que oito nuvens."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Pacto Elemental",
    name: "Pacto Cooperativo",
    desc: "Uma vez por rodada, você pode dar ordens para seu guia elemental como uma ação livre. Seu guia também fornece bônus por flanquear contra um inimigo por rodada."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "6º nível de místico",
    name: "Pacto Elemental",
    desc: "Você cria um vínculo mágico com uma criatura primordial através de um ritual. Este guia elemental é do mesmo tipo da sua Afinidade Elemental, obedece às suas ordens e se arrisca para ajudá-lo. Para receber seus benefícios, você deve invocá-lo (veja a seção Guias Elementais)."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Pacto Elemental",
    name: "Pacto Hábil",
    desc: "Você recebe um bônus de +2 nos testes do seu guia elemental. Este bônus aumenta em +1 por patamar acima de iniciante (+3 no 5º nível, +4 no 11º nível, +5 no 17º nível)."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Perícia Mística",
    desc: "Você recebe um bônus de +2 nos testes da perícia da sua Afinidade Elemental. Este bônus aumenta em +1 por patamar acima de iniciante, como Pacto Hábil."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (ar ou fogo)",
    name: "Propulsão",
    desc: "Você pode gastar 1 PM para adquirir deslocamento de voo 12m, mas cai se não encerrar seu movimento em uma superfície que sustente seu peso. A partir do 10º nível, você aprende e pode lançar Voo."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (trevas)",
    name: "Resistência Tenebrosa",
    desc: "Quando faz um teste de resistência, você pode gastar 1 PM para receber um bônus igual ao círculo máximo de magia que pode lançar."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (fogo)",
    name: "Supernova",
    desc: "Quando lança uma magia instantânea que cause dano de fogo, você pode sofrer perda de vida (limitada a 5x seu círculo máximo de magia) para deixar as chamas brancas e mais perigosas. Cada 5 PV perdidos aumentam o dano em +1d12."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Sustento Primordial",
    desc: "Quando descansa em contato com uma expressão natural do seu elemento de tamanho Grande ou maior, suas condições de descanso melhoram em um passo."
  },
  {
    type: "class",
    source: "dragaobrasil",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade Elemental (trevas)",
    name: "Visão Noturna",
    desc: "Você recebe visão na penumbra. Se já tem visão na penumbra, em vez disso, recebe visão no escuro. Se já tem visão na penumbra e visão no escuro, em vez disso, quando faz ataques afetados por camuflagem leve ou total, a chance de falha é reduzida em 10% (camuflagem leve fica com 10% de chance e camuflagem total fica com 40%)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "ability",
    pathReq: "samurai-base",
    req: "Nível 1",
    name: "Arma Ancestral",
    desc: "Você recebe proficiência em Katana e começa o jogo com uma arma ancestral, uma katana superior com uma melhoria com preço total de até T$ 500. Nos níveis 4, 6 e 8, sua arma ancestral recebe uma nova melhoria à sua escolha. Nas mãos de qualquer outra pessoa, sua arma ancestral funciona como uma arma normal (sem benefícios por melhorias ou encantamentos). Se perder sua arma ancestral, você perde todos os seus PM e só pode recuperá-los no dia seguinte. Você pode reforjar uma arma ancestral perdida ou destruída com uma semana de trabalho e o gasto de tibares em valor igual ao preço básico da arma."
  },
  {
    type: "class",
    class: "samurai",
    subType: "ability",
    pathReq: "samurai-base",
    req: "Nível 1",
    name: "Código do Samurai",
    desc: "Você deve sempre manter sua palavra e nunca pode recusar um pedido de ajuda de alguém inocente. Além disso, nunca pode mentir, trapacear ou roubar. Se violar o código, você perde todos os seus PM e só pode recuperá-los a partir do próximo dia."
  },
  {
    type: "class",
    class: "samurai",
    subType: "ability",
    pathReq: "samurai-base",
    req: "Nível 1",
    name: "Grito de Kiai",
    desc: "Quando faz um ataque corpo à corpo, você pode gastar 2 PM para rolar dois dados e usar o melhor resultado, Se acertar esse ataque, você recebe + 1d4 na rolagem de dano. Esse dano extra é multiplicado em caso de acerto crítico. A cada quatro níveis, o bônus de dano aumenta conforme indicado na tabela da classe."
  },
  {
    type: "class",
    class: "samurai",
    subType: "ability",
    pathReq: "samurai-base",
    req: "Nível 3",
    name: "Olhar Assustador",
    desc: "No 3º nível, você recebe +1 em Intimidação e Intuição. A cada seis níveis, esse bônus aumenta em +1."
  },
  {
    type: "class",
    class: "samurai",
    subType: "ability",
    pathReq: "samurai-base",
    req: "Nível 10",
    name: "Arma Espiritual",
    desc: "No 10º nível, sua arma ancestral se torna uma arma mágica com um encanto à sua escolha. Nos níveis 12 e 14 ela recebe um novo encanto a sua escolha."
  },
  {
    type: "class",
    class: "samurai",
    subType: "ability",
    pathReq: "samurai-base",
    req: "Nível 20",
    name: "Shogun",
    desc: "No 20° nível, o multiplicador de crítico da sua arma ancestral aumenta em dois. Além disso, recupera uma quantidade de pontos de vida igual a esse dano extra."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Arma Ancestral Adicional",
    desc: "Você recebe uma arma ancestral adicional de um tipo à sua escolha. Esta arma segue a mesma progressão de melhorias e encantos de sua primeira arma ancestral, mas você pode escolher benefícios diferentes para ela."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "5º nível de samurai",
    name: "Arma Reverberante",
    desc: "Quando usa Grito de Kiai para atacar com sua arma ancestral, você pode gastar +1 PM para aumentar o bônus de dano em +1 dado do mesmo tipo concedido por seu grito."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "6º nível de samurai",
    name: "Arma Veloz",
    desc: "Uma vez por rodada, quando usa a ação agredir com sua arma ancestral, você pode gastar 2 PM para realizar um ataque adicional com essa mesma arma."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Sab 1",
    name: "Ataque Disciplinado",
    desc: "Quando ataca com sua arma ancestral, você soma sua Sabedoria nas rolagens de dano (limitado pelo seu nível)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Aumento de Atributo",
    desc: "Você recebe + 1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Con 1",
    name: "Avalanche das Três Mãos",
    desc: "Se estiver usando sua arma ancestral com as duas mãos, você soma sua Constituição nas rolagens de dano (limitado pelo seu nível)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Corte da Correnteza",
    desc: "Se estiver usando sua arma ancestral em corpo a corpo em uma das mãos e nada na outra, você recebe +2 na margem de ameaça e causa + 1d6 pontos de dano com acertos críticos."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Daisho",
    desc: "Você recebe proficiência com wakizashi e recebe uma dessas armas como uma arma ancestral adicional. Esta arma segue a mesma progressão de melhorias e encantos de sua primeira arma ancestral, mas você pode escolher benefícios diferentes para ela."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Despertar Ancestral",
    desc: "A sintonia entre um samurai e sua arma ancestral cresce conforme ela é utilizada, concedendo-lhe a habilidade de invocar poderes mágicos a partir de suas melhorias ou encantamentos. Escolha uma das opções a seguir; você pode escolher Despertar Ancestral novamente, escolhendo uma nova opção como um novo poder, mas não mais de uma vez por patamar."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Des 2",
    name: "Dois Céus",
    desc: "Se estiver empunhando sua arma ancestral e uma segunda arma (e pelo menos uma delas for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre -2 em todos os testes de ataque até o seu próximo turno. Se possuir Estilo de Duas Armas, quando usa Grito de Kiai você pode gastar +1 PM para aplicar seu efeito a ambas as armas."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Sab 1",
    name: "Emblema do Império de Jade",
    desc: "Você soma sua Sabedoria em Diplomacia, Guerra é Nobreza."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "treinado em Vontade",
    name: "Equilíbrio Interior",
    desc: "Quando rola um 1 natural em um teste, você pode rolar novamente o dado. Você só pode usar este poder uma vez por teste."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Espírito Incisivo",
    desc: "Você recebe + 1 no multiplicador de critico em ataques com sua arma ancestral."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "12º nível de samurai",
    name: "Honra dos Ancestrais",
    desc: "O nome de sua família invoca a honra e tradição de seus antepassados. Uma vez por cena, você pode gastar uma ação de movimento para fazer um teste de Diplomacia, Intimidação ou Nobreza (CD) 10) e impressionar os presentes. Se passar, você recebe +1 em todos os seus testes de perícias baseadas em Carisma até o fim da cena. Esse bônus aumenta em +1 para cada 5 pontos pelos quais o resultado do teste exceder à CD (+2 para um resultado 15, +3 para 20 e assim por diante). Como alternativa, você pode aplicar esse bônus em seu próximo teste de ataque nesta cena."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Sab 1",
    name: "Honra Inabalável",
    desc: "Você soma sua Sabedoria em seu total de pontos de vida e se torna imune a efeitos de medo. Este poder não elimina fobias raciais (como o medo de altura dos minotauros)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "treinado em Iniciativa",
    name: "laijutsu",
    desc: "Você soma sua Sabedoria em Iniciativa e pode sacar ou guardar armas como uma ação livre (em vez de ação de movimento). Além disso, quando faz um teste de Iniciativa para agir, para cada 10 pontos no resultado de seu teste, você recebe +1 em testes de ataque e rolagens de dano com arma na primeira rodada de combate."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Serenidade dos Kami",
    name: "Ira Gentil",
    desc: "Enquanto tiver pontos de vida temporários fornecidos por Serenidade dos Kami, você soma seu bônus de Olhar Assustador em testes de ataque e rolagens de dano com sua arma ancestral."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "treinado em Intimidação",
    name: "Kiai Assustador",
    desc: "Quando usa Grito de Kiai, você pode pagar 1 PM. Se acertar o ataque, todos os oponentes em alcance curto ficam abalados por 1 rodada."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Kiai Estremecedor",
    desc: "Quando usa Grito de Kiai, você pode pagar 1 PM. Se acertar o ataque, todos os oponentes em alcance curto do alvo do ataque ficam caídos (Fortitude CD Sab evita)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Serenidade dos Kami",
    name: "Limiar da Tempestade",
    desc: "Quando faz um ataque, você pode gastar todos os PV temporários fornecidos por Serenidade dos Kami. Se fizer isso, você recebe um bônus na rolagem de dano deste ataque igual à metade dos PV gastos."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "treinado em Pontaria",
    name: "Kyudo",
    desc: "Você pode usar Grito de Kiai com ataques à distância. Quando usa uma arma de ataque à distância, pode usar sua Sabedoria em vez de Destreza nos testes de ataque (e, caso possua o poder Estilo de Disparo, nas rolagens de dano)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "8º nível de samurai, treinado em Ofício (caligrafo)",
    name: "Meditação Artistica",
    desc: "Você pode gastar 1 hora e 5 PM escrevendo um pequeno poema enquanto medita sobre os desafios por vir. Você recebe 5d6 dados de concentração. Pelas próximas 24 horas, sempre que for realizar um teste de perícia, você pode gastar um desses d6 e adicionar o resultado rolado como um bônus no teste."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Avalanche das Três Mãos, Serenidade dos Kami",
    name: "Montanha Serena",
    desc: "Enquanto tiver pontos de vida temporários fornecidos por Serenidade dos Kami, você soma sua Constituição em testes de manobra e na CD para resistir às suas habilidades de samurai."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Dois Céus, Serenidade dos Kami",
    name: "Nuvem Serena",
    desc: "Enquanto tiver pontos de vida temporários fornecidos por Serenidade dos Kami, o dano de sua arma ancestral aumenta em um passo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Corte da Correnteza, Serenidade dos Kami",
    name: "Rio Sereno",
    desc: "Enquanto tiver pontos de vida temporários fornecidos por Serenidade dos Kami, seu deslocamento aumenta em +3m e não é reduzido por terreno difícil natural."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Ronin",
    desc: "Você não precisa mais seguir seu Código do Samurai. Além disso, você pode trocar sua katana por outro tipo de arma, e não está limitado a katanas como sua arma ancestral."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Serenidade dos Kami",
    desc: "Você pode gastar uma ação de movimento e 3 PM para receber uma quantidade de PV temporários igual ao seu nível + sua sabedoria. Se usar este poder na primeira rodada de um combate, você não precisa gastar PM."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral profana ou sagrada",
    name: "Acima do Bem e do Mal",
    desc: "Quando faz um ataque com sua arma ancestral, você pode gastar 2 PM para aplicar o dano adicional do seu encanto profano ou sagrado contra qualquer criatura."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral dançarina",
    name: "Ancestral Dançarino",
    desc: "Quando usa o efeito de dançarina de sua arma ancestral, você pode gastar 2 PM para invocar um espírito ancestral para empunhar a arma. O espírito permanece enquanto dançarina for sustentada, não conta para seu limite de parceiros e é de um parceiro veterano fortão e guardião."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral macabra",
    name: "Aspecto Assustador",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar 1 PM para assumir um aspecto assustador. Se acertar o ataque, o alvo fica abalado (Vont CD Sab evita)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral banhada em ouro",
    name: "Aspecto Dourado",
    desc: "Você pode gastar 1 PM para substituir um teste de resistência por um teste de Diplomacia."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral cravejada de gemas",
    name: "Aspecto Opulento",
    desc: "Uma vez por rodada, você pode gastar 1 PM para fintar como uma ação de movimento (ou livre, se tiver Finta Aprimorada)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral cruel",
    name: "Avalanche Súbita",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar 1 PM para desferir um golpe atordoante. Se acertar o ataque, o alvo fica atordoado por uma rodada (Fort CD Sab evita; uma criatura só pode ser atordoada por esta habilidade uma vez por cena). Se sua arma ancestral for atroz, a CD para resistir a este poder aumenta em +2."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral energética",
    name: "Cortar Magia",
    desc: "Enquanto empunha sua arma ancestral, você pode usar Dissipar Magia com o modificador de contramágica, mas apenas em magias que tenham você como alvo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral precisa",
    name: "Corte do Vácuo",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar 1 PM projetar uma onda de energia. O alcance desse ataque se torna curto e todo o dano causado se torna de essência."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral maciça",
    name: "Cortador de Cavalos",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar 1 PM para causar um dado de dano extra do mesmo tipo da arma."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral congelante, corrosiva, elétrica, flamejante ou tumular",
    name: "Dança dos Elementos",
    desc: "Quando usa sua arma ancestral para causar dano por frio, ácido, eletricidade, fogo ou trevas, você pode gastar 1 PM para aumentar cada dado de dano em um passo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral excruciante",
    name: "Dor Infinita",
    desc: "Quando acerta um construto ou morto-vivo, você pode gastar 2 PM para aplicar nele o efeito de seu encanto excruciante."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral injeção alquímica",
    name: "Engenhosidade Alquímica",
    desc: "Quando usa injeção alquímica, você pode gastar 1 PM para aumentar o dano do preparado em um dado do mesmo tipo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral defensora",
    name: "Escudo Ancestral",
    desc: "Quando faz um ataque com sua arma ancestral, você pode gastar 2 PM para escolher um aliado adjacente. Esse aliado recebe +5 na Defesa por uma rodada."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de mitral",
    name: "Essência Fluida",
    desc: "Quando obtém um acerto crítico com sua arma ancestral, você pode gastar 1 PM para se mover até o seu deslocamento."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de gelo eterno",
    name: "Essência Gélida",
    desc: "Quando faz um teste de Iniciativa, você pode gastar 1 PM para receber redução contra frio igual ao seu nível + sua Sabedoria até o fim da cena."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de adamante",
    name: "Essência Invencível",
    desc: "Quando faz um ataque com sua arma ancestral, você pode gastar 1 PM para aumentar o dano desse ataque em um passo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de matéria vermelha, Ronin",
    name: "Essência Lefeu",
    desc: "Se estiver empunhando sua arma ancestral, você pode gastar 3 PM para somar sua Sabedoria nos testes de ataque e Reflexos e na Defesa por 1 rodada."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de lanajuste",
    name: "Essência Marinha",
    desc: "Você soma sua Sabedoria em Atletismo e, quando faz um teste de Atletismo para nadar, pode gastar 1 PM para rolar dois dados e usar o melhor resultado."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de prata",
    name: "Essência Prateada",
    desc: "Quando acerta um ataque com sua arma ancestral, você pode gastar 1 PM. Se fizer isso, o alvo perde cura acelerada por 1 rodada."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de casco de monstro",
    name: "Essência Monstruosa",
    desc: "Quando faz um acerto crítico com sua arma ancestral, você pode gastar 1 PM para receber uma quantidade de PV temporários igual à metade do seu nível + Sabedoria."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de aço-rubi",
    name: "Essência Rubi",
    desc: "Quando faz um ataque com sua arma ancestral, você pode gastar 1 PM para ignorar toda a redução de dano do alvo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de madeira tollon",
    name: "Essência Virente",
    desc: "Se estiver empunhando sua arma ancestral, você pode gastar 1 PM para receber resistência a magia igual a sua Sabedoria por 1 rodada."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral drenante",
    name: "Fulgor Púrpura",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar uma quantidade de PV temporários limitada pela sua Sabedoria. Para cada 2 PV gastos, seu ataque causa +1d8 pontos de dano de essência."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral penetrante*",
    name: "Golpe Fantasma",
    desc: "Quando faz um ataque com sua arma ancestral, você pode gastar 1 PM para ignorar as imunidades do alvo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral destruidora",
    name: "Instinto Destruidor",
    desc: "Você recebe +2 em testes de manobra para quebrar. Sempre que reduz um item a 0 PV com essa manobra, você recupera 1 PM."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral piedosa",
    name: "Lâmina Invertida",
    desc: "Você pode ativar ou desativar o encantamento piedosa sem gastar PM."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral sanguinária",
    name: "Lâmina Sedenta",
    desc: "Quando faz um ataque contra um alvo sangrando, você pode gastar 2 PM para receber +5 no teste de ataque e na rolagem de dano."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral harmonizada",
    name: "Mistério Nebuloso",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar 1 PM para obter camuflagem leve por um turno."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral assassina, Ronin",
    name: "Nada Além de Um Assassino",
    desc: "Você recebe a habilidade Ataque Furtivo +1d6. Você pode escolher este poder várias vezes (mas apenas uma vez por patamar) e seus efeitos se acumulam."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral dilacerante ou lancinante",
    name: "Paradoxo Absoluto",
    desc: "Quando faz um acerto crítico, você pode gastar 2 PM. Se fizer isso, soma sua Sabedoria na rolagem de dano (cumulativo com outros efeitos que somam este atributo). Se sua arma for lancinante, em vez disso você soma o dobro da Sabedoria."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral veloz",
    name: "Paradoxo da Celeridade",
    desc: "Uma vez por rodada, quando faz um acerto crítico com sua arma ancestral, você pode gastar 2 PM para fazer um ataque adicional contra o mesmo inimigo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral anticriatura",
    name: "Paradoxo da Extinção",
    desc: "Quando faz um acerto crítico com sua arma ancestral, você pode gastar 2 PM para multiplicar o dano adicional causado pelo encanto anticriatura."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral caçadora",
    name: "Paradoxo da Extremidade",
    desc: "Uma vez por rodada, quando faz um acerto crítico com sua arma ancestral, você pode gastar 2 PM para fazer outro ataque contra uma criatura adjacente."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral ameaçadora",
    name: "Paradoxo do Gume",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar 2 PM para somar sua Sabedoria na margem de ameaça."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral conjuradora",
    name: "Paradoxo da Magia",
    desc: "Quando faz um acerto crítico com sua arma ancestral em um ataque em que tenha descarregado uma magia armazenada na arma, você pode gastar uma quantidade de PM igual ao círculo da magia para recuperá-la (ela volta a ser guardada na arma)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral venenosa",
    name: "Paradoxo Viperino",
    desc: "Quando faz um acerto crítico com sua arma ancestral, você pode gastar 1 PM para ignorar imunidade ou resistência a veneno da criatura atingida."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral formidável ou magnífica",
    name: "Perfeição Marcial",
    desc: "Você pode usar uma ação de movimento e 2 PM para somar seu bônus de Olhar Assustador no próximo teste de ataque e, caso acerte, na rolagem de dano com sua arma ancestral. Caso a arma seja magnífica, esse bônus é dobrado."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral mira telescópica",
    name: "Tiro Perfeito",
    desc: "Quando faz um ataque a distância com sua arma ancestral, você pode gastar 1 PM para ignorar camuflagem e cobertura."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral trovejante",
    name: "Trovão Incessante",
    desc: "Quando faz um acerto crítico, você pode gastar 2 PM para ativar o encanto trovejante, mesmo que já o tenha usado nessa cena."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral equilibrada",
    name: "Roda Fluvial",
    desc: "Quando faz um ataque com sua arma ancestral, você pode gastar 2 PM para fazer uma manobra de combate como uma ação livre."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral de arremesso",
    name: "Venha Cá",
    desc: "Quando faz um ataque corpo a corpo com uma arma ancestral de arremesso, você pode gastar 2 PM para arrastar o inimigo até o espaço vazio mais próximo a 1,5m de você (Ref CD Sab)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral certeira",
    name: "Voo da Andorinha",
    desc: "Uma vez por rodada, quando um inimigo erra um ataque corpo a corpo contra você, você pode gastar 1 PM para fazer um ataque contra ele usando sua arma ancestral. Se a arma for pungente, você recebe +2 nesse teste de ataque."
  },
  {
    type: "class",
    class: "soldado",
    subType: "ability",
    pathReq: "soldado-base",
    req: "Nível 1",
    name: "Ataque Disciplinado",
    desc: "Quando faz um ataque, você pode gastar 1 PM para rolar dois dados e usar o melhor resultado. Se acertar esse ataque, você recebe +1d6 na rolagem de dano. A cada quatro níveis, você pode gastar +1 PM para aumentar o número de dados de dano extras (veja a tabela da classe)."
  },
  {
    type: "class",
    class: "soldado",
    subType: "ability",
    pathReq: "soldado-base",
    req: "Nível 3",
    name: "Estratégia de Defesa",
    desc: "No 3º nível, escolha entre Infantaria Leve ou Tropa de Choque. Infantaria Leve. Você recebe +2 na Defesa. Esse bônus aumenta em +2 a cada quatro níveis. Você não pode usar esta habilidade se estiver imóvel ou usando armadura pesada. Tropa de Choque. Você recebe proficiência com armaduras pesadas. Quando usa armadura pesada, você recebe redução de dano 2. Esta redução de dano aumenta em +2 a cada quatro níveis."
  },
  {
    type: "class",
    class: "soldado",
    subType: "ability",
    pathReq: "soldado-base",
    req: "Nível 6",
    name: "Ataque Extra",
    desc: "A partir do 6º nível, quando usa a ação agredir, você pode gastar 2 PM para realizar um ataque adicional uma vez por rodada."
  },
  {
    type: "class",
    class: "soldado",
    subType: "ability",
    pathReq: "soldado-base",
    req: "Nível 10",
    name: "Supremacia Marcial",
    desc: "A partir do 10º nível, sempre que você faz um ataque e reduz os pontos de vida de um inimigo a 0 ou menos, você recebe 2 pontos de mana temporários (cumulativos). Você pode ganhar um máximo de PM temporários por cena igual ao seu nível. Esses pontos temporários desaparecem no fim da cena."
  },
  {
    type: "class",
    class: "soldado",
    subType: "ability",
    pathReq: "soldado-base",
    req: "Nível 20",
    name: "Mestre da Batalha",
    desc: "No 20º nível, o dano adicional causado por seu Ataque Disciplinado também é multiplicado em caso de acerto crítico. Além disso, quando acerta um ataque disciplinado, você recupera uma quantidade de pontos de vida igual ao dano extra causado por ele."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "Des 2",
    name: "Ambidestria",
    desc: "Se estiver empunhando duas armas (e pelo menos uma delas for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre –2 em todos os testes de ataque até seu próximo turno."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Alabardeiro",
    desc: "Quando ataca um inimigo com uma arma alongada, você pode gastar 1 PM para fazer um ataque adicional contra um inimigo adjacente ao alvo original, se houver. Você pode atacar este segundo inimigo mesmo que ele esteja fora de seu alcance natural, mas não se ele estiver atrás de cobertura total."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "Sab 1",
    name: "Arqueiro",
    desc: "Se estiver usando uma arma de ataque à distância, você soma sua Sabedoria em rolagens de dano (limitado pelo seu nível)."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "Des 1",
    name: "Ataque Reflexo",
    desc: "Se um alvo em alcance de seus ataques corpo a corpo ficar desprevenido ou se mover voluntariamente para fora do seu alcance, você pode gastar 1 PM para fazer um ataque corpo a corpo contra esse alvo (apenas uma vez por alvo a cada rodada)."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Aumento de Atributo",
    desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Bater e Correr",
    desc: "Quando faz uma investida, você pode continuar se movendo após o ataque, até o limite de seu deslocamento. Se gastar 2 PM, pode fazer uma investida sobre terreno difícil e sem sofrer a penalidade de Defesa."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "For 1",
    name: "Destruidor",
    desc: "Quando causa dano com uma arma corpo a corpo de duas mãos, você pode rolar novamente qualquer resultado 1 ou 2 da rolagem de dano da arma."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "5º nível de soldado",
    name: "Disciplina Superior",
    desc: "O dado de dano que você rola por Ataque Disciplinado aumenta para d8."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "Especialista em Armadura, Especialização em Arma",
    name: "Equipamento Padrão",
    desc: "Se estiver empunhando uma arma com a qual tenha o poder Especialização em Arma, e usando uma armadura com a qual tenha o poder Especialista em Armadura, os benefícios desses dois poderes são dobrados."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "Int 1",
    name: "Esgrimista",
    desc: "Quando usa uma arma corpo a corpo leve ou ágil, você soma sua Inteligência em rolagens de dano (limitado pelo seu nível)."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Especialista em Armadura",
    desc: "Escolha uma armadura. Se estiver usando esta armadura, você recebe +1 na Defesa e redução de dano 1. Você pode escolher este poder outras vezes para armaduras diferentes."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Especialização em Arma",
    desc: "Escolha uma arma. Você recebe +2 em rolagens de dano com a arma escolhida. Você pode escolher este poder outras vezes para armas diferentes."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Golpe de Raspão",
    desc: "Uma vez por rodada, quando erra um ataque, você pode gastar 2 PM. Se fizer isso, causa metade do dano que o ataque causaria (ignorando efeitos que se aplicariam caso o ataque acertasse)."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Golpe Demolidor",
    desc: "Quando usa a manobra  quebrar ou ataca um objeto, você pode gastar 2 PM para ignorar a RD dele."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "treinado em Luta",
    name: "Golpe Oportunista",
    desc: "Quando usa a ação agredir e acerta um ataque, você pode pagar 1 PM para fazer um ataque desarmado extra contra o mesmo oponente."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Ímpeto",
    desc: "Você pode gastar 1 PM para aumentar seu deslocamento em +6m por uma rodada."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Lutador de Taverna",
    desc: "Seus ataques desarmados causam 1d6 pontos de dano. Quando faz um ataque desarmado, pode gastar 2 PM. Se fizer isso e acertar o ataque, o inimigo deve fazer um teste de Fortitude (CD For). Se ele falhar, fica atordoado por uma rodada. Você só pode usar este poder uma vez por cena contra uma mesma criatura."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "Especialização em Arma com a arma escolhida, 12º nível de soldado",
    name: "Mestre em Arma",
    desc: "Escolha uma arma. Com esta arma, seu dano aumenta em um passo e você pode gastar 2 PM para rolar novamente um teste de ataque recém realizado."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "treinado em Guerra, 10º nível de soldado",
    name: "Planejamento Marcial",
    desc: "Uma vez por dia, você pode gastar uma hora e 3 PM para escolher um poder de soldado ou de combate cujos pré-requisitos cumpra. Você recebe os benefícios desse poder até o próximo dia."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Precisão Disciplinada",
    desc: "Quando usa Ataque Disciplinado, você pode gastar 1 PM para aumentar a margem de ameaça do ataque em +2 ou para ignorar 10 pontos de redução de dano."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Solidez",
    desc: "Se estiver usando um escudo, você aplica o bônus na Defesa recebido pelo escudo em testes de resistência."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "6º nível de soldado",
    name: "Tornado de Dor",
    desc: "Você pode gastar uma ação padrão e 2 PM para desferir uma série de golpes giratórios. Faça um ataque corpo a corpo e compare-o com a Defesa de cada inimigo adjacente. Então faça uma rolagem de dano com um bônus cumulativo de +2 para cada acerto e aplique-a em cada inimigo atingido."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Valentão",
    desc: "Você recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, flanqueados ou indefesos"
  }
];

// ============================================================
//  GUIAS ELEMENTAIS — PARCEIROS ESPECIAIS DO MÍSTICO
// ------------------------------------------------------------
//  Dados estruturados para o sistema de parceiros. Cada guia é
//  invocado por Pacto Elemental e usa as regras gerais de guias
//  elementais (ver habilidade "Guias Elementais (regras)").
//  `orders` são as ordens que o místico pode conceder com uma
//  ação de movimento; ordens sem custo indicado são gratuitas.
// ============================================================

const classesDbBaseGuides = [
  {
    id: "guia-agua",
    name: "Guia Elemental da Água",
    element: "Água",
    damageType: "Frio",
    school: "Encantamento",
    condition: "Lento",
    skill: "Diplomacia (Car)",
    partnerTypes: ["Assassino", "Perseguidor", "Vigilante"],
    invocation: "Ação de movimento e 2 PM, em contato com uma expressão natural de água de qualquer tamanho. Dura até o final da cena. No 7º nível, +1 PM para parceiro veterano; no 15º nível, +2 PM para parceiro mestre.",
    orders: [
      {
        name: "Bolha",
        cost: "0 PM",
        desc: "O guia cria uma bolha esférica contendo ar até o final da cena. A bolha tem raio em metros igual à sua Sabedoria x3. Todas as criaturas no interior podem respirar normalmente, mesmo embaixo d'água. Você pode direcionar o elemental como uma ação de movimento, com deslocamento de natação 9m; além disso, pode gastar PM para aumentar esse deslocamento em +3m por PM (limitado pelo seu círculo máximo de magias) até o final da cena. A bolha estoura caso sofra qualquer dano."
      },
      {
        name: "Escudo Hídrico",
        cost: "0 PM",
        desc: "O guia se transforma em um disco de água rodopiante e o protege de ataques. Você recebe +2 na Defesa até o começo do seu próximo turno. Se uma criatura o atingir com um ataque corpo a corpo enquanto este efeito estiver ativo, você pode gastar 1 PM para fazer uma manobra de empurrar como reação."
      },
      {
        name: "Jato Hidráulico",
        cost: "1 PM",
        desc: "O guia dispara um jato de água pressurizado em um alvo em alcance curto. O alvo sofre 3d6 pontos de dano de impacto (+1d6 por patamar acima de iniciante) e fica caído (Fortitude CD Sab reduz o dano à metade e evita a condição). Alternativamente, o jato pode empurrar uma criatura voluntária até 6m em uma direção à sua escolha."
      }
    ]
  },
  {
    id: "guia-ar",
    name: "Guia Elemental do Ar",
    element: "Ar",
    damageType: "Eletricidade",
    school: "Ilusão",
    condition: "Ofuscado",
    skill: "Enganação (Car)",
    partnerTypes: ["Ajudante", "Guardião", "Médico"],
    invocation: "Ação de movimento e 2 PM, em contato com uma expressão natural de ar de qualquer tamanho. Dura até o final da cena. No 7º nível, +1 PM para parceiro veterano; no 15º nível, +2 PM para parceiro mestre.",
    orders: [
      {
        name: "Barreira Eólica",
        cost: "0 PM",
        desc: "Você recebe camuflagem contra ataques à distância e +2 em Reflexos por uma rodada."
      },
      {
        name: "Bons Ventos",
        cost: "0 PM",
        desc: "Ao contrário de outras ações do elemental, esta é uma reação; você pode lançar Queda Suave, mas apenas em você mesmo."
      },
      {
        name: "Planar",
        cost: "2 PM",
        desc: "Uma criatura em alcance curto recebe deslocamento de voo 12m por uma rodada."
      }
    ]
  },
  {
    id: "guia-fogo",
    name: "Guia Elemental do Fogo",
    element: "Fogo",
    damageType: "Fogo",
    school: "Transmutação",
    condition: "Em Chamas",
    skill: "Acrobacia (Des)",
    partnerTypes: ["Atirador", "Combatente", "Fortão"],
    invocation: "Ação de movimento e 2 PM, em contato com uma expressão natural de fogo de qualquer tamanho. Dura até o final da cena. No 7º nível, +1 PM para parceiro veterano; no 15º nível, +2 PM para parceiro mestre.",
    orders: [
      {
        name: "Aura de Calor",
        cost: "0 PM",
        desc: "Até sua próxima rodada, inimigos que terminarem seus turnos adjacentes a você sofrem 2d6+2 pontos de dano de fogo."
      },
      {
        name: "Chicote de Chamas",
        cost: "2 PM",
        desc: "O elemental acerta uma criatura em alcance curto com um jato de chamas que causa 4d6 pontos de dano de fogo (Reflexos CD Sab reduz à metade)."
      },
      {
        name: "Labareda Propulsora",
        cost: "0 PM",
        desc: "Uma criatura em alcance curto recebe +10 em Atletismo para correr e saltar por uma rodada."
      }
    ]
  },
  {
    id: "guia-luz",
    name: "Guia Elemental da Luz",
    element: "Luz",
    damageType: "Luz",
    school: "Abjuração",
    condition: "Ofuscado",
    skill: "Cura (Sab)",
    partnerTypes: ["Guardião", "Médico", "Vigilante"],
    invocation: "Ação de movimento e 2 PM, em contato com uma expressão natural de luz de qualquer tamanho. Dura até o final da cena. No 7º nível, +1 PM para parceiro veterano; no 15º nível, +2 PM para parceiro mestre.",
    orders: [
      {
        name: "Brilhar",
        cost: "0 PM",
        desc: "Emite luz como uma tocha. Uma criatura dentro do alcance curto fica ofuscada por 1 rodada (Vontade CD Sab evita)."
      },
      {
        name: "Curar",
        cost: "2 PM",
        desc: "Uma criatura dentro do alcance curto cura 4d8 pontos de vida."
      },
      {
        name: "Cegar",
        cost: "0 PM",
        desc: "Uma criatura dentro do alcance curto fica cega por 1 rodada (apenas uma vez por cena; Vontade CD Sab evita)."
      }
    ]
  },
  {
    id: "guia-terra",
    name: "Guia Elemental da Terra",
    element: "Terra",
    damageType: "Ácido",
    school: "Convocação",
    condition: "Vulnerável",
    skill: "Investigação (Int)",
    partnerTypes: ["Combatente", "Guardião", "Montaria"],
    invocation: "Ação de movimento e 2 PM, em contato com uma expressão natural de terra de qualquer tamanho. Dura até o final da cena. No 7º nível, +1 PM para parceiro veterano; no 15º nível, +2 PM para parceiro mestre.",
    orders: [
      {
        name: "Arremesso de Rocha",
        cost: "2 PM",
        desc: "O elemental arremessa um pedregulho contra um alvo em alcance médio, causando 5d6 pontos de dano de impacto (Reflexos CD Sab evita)."
      },
      {
        name: "Muralha",
        cost: "0 PM",
        desc: "Você recebe resistência a corte, impacto e perfuração 10 por uma rodada."
      },
      {
        name: "Tunelar",
        cost: "0 PM",
        desc: "Uma criatura dentro do alcance curto recebe deslocamento de escalada 12m ou escavar 9m por uma rodada."
      }
    ]
  },
  {
    id: "guia-trevas",
    name: "Guia Elemental das Trevas",
    element: "Trevas",
    damageType: "Trevas",
    school: "Necromancia",
    condition: "Não pode curar PV",
    skill: "Intimidação (Car)",
    partnerTypes: ["Assassino", "Magivocador", "Perseguidor"],
    invocation: "Ação de movimento e 2 PM, em contato com uma expressão natural de trevas de qualquer tamanho. Dura até o final da cena. No 7º nível, +1 PM para parceiro veterano; no 15º nível, +2 PM para parceiro mestre.",
    orders: [
      {
        name: "Manto Sombrio",
        cost: "0 PM",
        desc: "Uma criatura dentro do alcance curto recebe +10 em Furtividade para se esconder por 1 rodada."
      },
      {
        name: "Tentáculo Obscuro",
        cost: "2 PM",
        desc: "O elemental agarra uma criatura dentro do alcance médio com seu tentáculo."
      },
      {
        name: "Apavorar",
        cost: "0 PM",
        desc: "Uma criatura dentro do alcance curto fica abalada (Vontade CD Sab evita)."
      }
    ]
  }
];
