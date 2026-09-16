/* ============================================================
   CULINÁRIA AVANÇADA — Tormenta20
   Fonte: Heróis de Arton, Cap. 4 (Regras Opcionais), p. 305-309

   Estrutura no mesmo modelo dos demais arquivos de dados:
     culinariaData.item        -> array de itens (categoria própria "Culinária")
     culinariaData.regras      -> resumo das regras (para exibição/tooltip)
     culinariaData.poderes     -> poderes gerais das regras opcionais

   Categoria "Culinária" (seletor próprio), com dois tipos:
     "Ingredientes"      -> Tabela 4-7
     "Pratos Especiais"  -> Tabela 4-8
   Ficam isolados dos pratos do livro básico em data/itens.js.

   Campos extras usados só por esta lista:
     ingredientes         -> array com os insumos do prato
     custo_ingredientes   -> custo total dos insumos ao cozinhar
     cd                   -> CD do teste de Ofício (cozinheiro)
     beneficio            -> efeito mecânico resumido
     beneficio_temperado  -> efeito já com a regra de Tempero Especial aplicada
   ============================================================ */

const culinariaData = {

  // ===== RESUMO DAS REGRAS =====
  regras: {
    titulo: "Culinária Avançada",
    fonte: "Heróis de Arton",
    pagina: "305-309",
    resumo: "Regras alternativas e mais detalhadas para a fabricação de pratos especiais. Substituem as regras do livro básico (mais simples) quando a culinária é um aspecto importante da campanha.",
    basico: [
      "Um prato especial deve ser consumido ao ser comprado ou fabricado.",
      "O efeito dura 1 dia.",
      "Você só pode receber um bônus de alimentação por dia (veja o poder Bom de Garfo).",
      "Cada ingrediente ocupa 0,5 espaço.",
      "O preço de compra da tabela é por porção individual; ao cozinhar, você faz comida suficiente para o grupo inteiro (cerca de 5 pessoas)."
    ],
    fabricacao: [
      {
        titulo: "Receitas",
        texto: "Ao se tornar treinado em Ofício (cozinheiro) você aprende 1 + Inteligência receitas. Aprender uma nova receita (lendo livros ou estudando com outro cozinheiro) leva 1 dia e custa T$ 100 — alguns cozinheiros aceitam serviços como pagamento."
      },
      {
        titulo: "Ingredientes",
        texto: "Cada prato exige dois ou três ingredientes (alguns, quatro). Os preços da tabela consideram insumos de ótima qualidade; insumos comuns são mais baratos, mas não geram efeito em jogo."
      },
      {
        titulo: "Teste",
        texto: "Sabendo a receita e tendo os ingredientes, preparar o prato exige 1 hora de trabalho, o gasto dos insumos e um teste de Ofício (cozinheiro) com CD variável. Se passar, prepara comida para o grupo inteiro."
      },
      {
        titulo: "Tempero Especial",
        texto: "Um personagem treinado em Ofício (cozinheiro) pode gastar uma porção de especiarias (além dos ingredientes do prato) para aumentar a CD em +5. Passando no teste, bônus numéricos do prato (incluindo rolagens de dados) aumentam em +1, e PV/PM temporários aumentam em 50%. Outros efeitos não são aprimorados."
      },
      {
        titulo: "Outros Pratos",
        texto: "O mestre pode adaptar pratos de outros suplementos (Ameaças de Arton, Deuses de Arton) definindo ingredientes e CD, usando esta tabela como referência."
      }
    ]
  },

  // ===== NOVOS PODERES GERAIS =====
  poderes: [
    {
      nome: "Ás da Cozinha",
      tipo: "Poder Geral",
      descricao: "Você aprende três novas receitas e mais três ao atingir o patamar campeão e novamente ao atingir o lendário. Além disso, ao preparar um prato especial pode acumular os benefícios de dois pratos (bônus iguais não se acumulam). A CD é igual à do prato mais difícil +5 e você gasta os ingredientes de ambos.",
      prereq: "Treinado em Ofício (cozinheiro), 5º nível de personagem.",
      fonte: "Heróis de Arton",
      pagina: "309"
    },
    {
      nome: "Bom de Garfo",
      tipo: "Poder Geral",
      descricao: "Você recebe +3 PV por patamar e pode comer até dois pratos especiais por dia, recebendo os benefícios de ambos (bônus iguais não se acumulam).",
      prereq: "Con 1.",
      fonte: "Heróis de Arton",
      pagina: "309"
    }
  ],

  // ===== ITENS =====
  item: [

    /* ---------- INGREDIENTES (Tabela 4-7) ---------- */
    {
      nome: "Açúcar das Fadas",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 50",
      espacos: "0,5",
      descricao: "Pó prateado, brilhante e doce, ligado a frutas da Pondsmânia ou às asas de criaturas feéricas. Raro e caro.",
      fonte: "Heróis de Arton",
      pagina: "305"
    },
    {
      nome: "Ave",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 4",
      espacos: "0,5",
      descricao: "Carne de aves comuns, como frango e ganso.",
      fonte: "Heróis de Arton",
      pagina: "305"
    },
    {
      nome: "Avelã de Norba",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 40",
      espacos: "0,5",
      descricao: "Avelã específica que só os esquilos de Norba, nas Repúblicas Livres de Sambúrdia, conseguem encontrar.",
      fonte: "Heróis de Arton",
      pagina: "305"
    },
    {
      nome: "Carne",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 16",
      espacos: "0,5",
      descricao: "De ovelha, gado ou trobo. Cara, pois esses animais são criados principalmente para lã, leite e tração.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Carne de Caça",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 32",
      espacos: "0,5",
      descricao: "De cervo, javali, faisão ou monstros como urso-coruja, serpe e lobo-das-cavernas. Mais cara, mais nutritiva e de sabor mais forte que a carne de criação.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Cereal",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 1",
      espacos: "0,5",
      descricao: "Base da alimentação artoniana: trigo, centeio e cevada, além de arroz, milho e aveia em algumas regiões.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Cogumelo",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 5",
      espacos: "0,5",
      descricao: "Alimento comum e acessível, mas visto com desconfiança em certos lugares por sua ligação com a natureza e a magia.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Especiarias",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 100",
      espacos: "0,5",
      descricao: "Pimentas, ervas, flores e temperos de terras distantes (às vezes de origem mágica), valorizados pelas casas nobres como símbolo de poder. Uma porção permite usar a regra de Tempero Especial.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Farinha",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 1",
      espacos: "0,5",
      descricao: "Obtida da moagem de cereais. Essencial para pães, mingaus e bolos, comuns entre os camponeses.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Fruta",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 3",
      espacos: "0,5",
      descricao: "De maçãs, peras e pêssegos a melões, tâmaras e figos. Servidas cozidas como acompanhamento ou cruas como sobremesa.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Gorad",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 30",
      espacos: "0,5",
      descricao: "Iguaria doce originária da província de Tragematum, no Império de Tauron.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Legume",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 1",
      espacos: "0,5",
      descricao: "Cebola, alho, nabo, cenoura, ervilha, feijão e outros.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Leite",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 1",
      espacos: "0,5",
      descricao: "Alimento importante por si só e base de manteigas e queijos.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Molho Tamuraniano",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 30",
      espacos: "0,5",
      descricao: "Molho escuro, salgado e forte, produzido apenas no Império de Jade e no bairro de Nitamu-ra, em Valkaria. Seu segredo nunca foi revelado a estrangeiros.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Óleo",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 3",
      espacos: "0,5",
      descricao: "De origem vegetal, usado para cozinhar, temperar e conservar alimentos.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Ovo de Monstro",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 50",
      espacos: "0,5",
      descricao: "Ovos de criaturas monstruosas, como grifos, serpes e ursos-corujas.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Peixe",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 7",
      espacos: "0,5",
      descricao: "Consumido fresco, salgado ou defumado. Os mais apreciados são salmão, enguia e lampreia.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Porco",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 8",
      espacos: "0,5",
      descricao: "A carne de açougue mais comum no Reinado — o porco é criado principalmente para o abate.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Queijo",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 6",
      espacos: "0,5",
      descricao: "Fortes ou suaves, com ou sem aromatizantes, comuns tanto em tavernas quanto em banquetes nobres.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Verdura",
      categoria: "Culinária",
      tipo: "Ingredientes",
      preco: "T$ 1",
      espacos: "0,5",
      descricao: "Repolho, couve, urtiga, acelga, espinafre, alface e outras folhas.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },

    /* ---------- PRATOS ESPECIAIS (Tabela 4-8) ----------
       preco = porção individual comprada pronta
       custo_ingredientes = gasto ao cozinhar (rende comida para o grupo)
    ------------------------------------------------------ */
    {
      nome: "Assado de Carnes",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 60",
      espacos: "—",
      beneficio: "+2 em rolagens de dano corpo a corpo",
      beneficio_temperado: "+3 em rolagens de dano corpo a corpo",
      ingredientes: ["Carne", "Carne de caça", "Porco"],
      custo_ingredientes: "T$ 56",
      cd: 25,
      descricao: "Prato muito apreciado no Reinado, mas malvisto no Império de Tauron. Pura proteína — deixa qualquer um mais forte. Você recebe +2 em rolagens de dano corpo a corpo.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Balinhas",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 60",
      espacos: "—",
      beneficio: "+2 em rolagens de dano de magias",
      beneficio_temperado: "+3 em rolagens de dano de magias",
      ingredientes: ["Açúcar das fadas", "Fruta"],
      custo_ingredientes: "T$ 53",
      cd: 25,
      descricao: "Balas coloridas e doces, prediletas dos arcanistas, que juram que o açúcar feérico potencializa suas magias. Você recebe +2 em rolagens de dano de magias.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Banquete dos Heróis",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 150",
      espacos: "—",
      beneficio: "+1 em um atributo",
      beneficio_temperado: "+2 em um atributo",
      ingredientes: ["Carne de caça", "Ovo de monstro", "Avelã de Norba"],
      custo_ingredientes: "T$ 82",
      cd: 30,
      descricao: "Uma mesa repleta das melhores comidas que o dinheiro pode pagar. Você recebe +1 em um atributo à sua escolha. O aumento não oferece PV, PM ou perícias adicionais.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Batata Valkariana",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 2",
      espacos: "—",
      beneficio: "+1d6 em um teste",
      beneficio_temperado: "+1d6+1 em um teste",
      ingredientes: ["Óleo", "Legume"],
      custo_ingredientes: "T$ 4",
      cd: 15,
      descricao: "Batatas fritas em óleo fervente, gordurosas e pouco nutritivas — coisa de metrópole como Valkaria. Saborosas, deixam qualquer um empolgado: você recebe +1d6 em um teste à sua escolha até o fim do dia.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Bolo de Cenoura",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 4",
      espacos: "—",
      beneficio: "+2 em Percepção",
      beneficio_temperado: "+3 em Percepção",
      ingredientes: ["Farinha", "Fruta", "Óleo"],
      custo_ingredientes: "T$ 7",
      cd: 20,
      descricao: "Sobremesa simples que, segundo os anciões do Reinado, faz bem para a vista. Eles parecem ter razão: fornece +2 em testes de Percepção.",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Bolo do Panteão",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 200",
      espacos: "—",
      beneficio: "Reduz em –1 PM o custo de uma habilidade (mínimo 1)",
      beneficio_temperado: "Sem aprimoramento (efeito não numérico)",
      ingredientes: ["Açúcar das fadas", "Avelã de Norba", "Farinha", "Gorad"],
      custo_ingredientes: "T$ 121",
      cd: 30,
      descricao: "Sobremesa divina de gorad, caríssima, servida apenas em banquetes reais ou em tavernas de aventureiros famosos. Escolha uma habilidade: seu custo em PM diminui em –1 (mínimo 1).",
      fonte: "Heróis de Arton",
      pagina: "306"
    },
    {
      nome: "Ensopado Reforçado",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 12",
      espacos: "—",
      // A Tabela 4-8 indica "–3m no deslocamento"; o texto descritivo (p. 308) indica "–1,5m".
      beneficio: "+20 PV temporários, –1,5m no deslocamento",
      beneficio_temperado: "+30 PV temporários, –1,5m no deslocamento",
      ingredientes: ["Fruta", "Porco", "Verdura"],
      custo_ingredientes: "T$ 12",
      cd: 20,
      descricao: "Prato nutritivo e pesado. Você recebe +20 PV temporários, mas seu deslocamento diminui em –1,5m (a tabela da p. 307 registra –3m).",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Estrogonofe",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 18",
      espacos: "—",
      beneficio: "+2 em Vontade",
      beneficio_temperado: "+3 em Vontade",
      ingredientes: ["Carne", "Cogumelo", "Leite"],
      custo_ingredientes: "T$ 22",
      cd: 20,
      descricao: "Iguaria inventada nas cortes do antigo Reino de Yudennach — dizem que é uma das poucas coisas boas a sair de lá. Deixa você firme em suas convicções: +2 em testes de Vontade.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Futomaki",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 12",
      espacos: "—",
      beneficio: "+2 em Diplomacia",
      beneficio_temperado: "+3 em Diplomacia",
      ingredientes: ["Cereal", "Peixe"],
      custo_ingredientes: "T$ 8",
      cd: 20,
      descricao: "Criado no Império de Jade, é um rolo de arroz recheado com peixes, folhas e raízes. Refeição elegante que deixa todos dispostos a dialogar: +2 em testes de Diplomacia.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Gorad Quente",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 18",
      espacos: "—",
      beneficio: "+2 PM temporários",
      beneficio_temperado: "+3 PM temporários",
      ingredientes: ["Gorad", "Leite"],
      custo_ingredientes: "T$ 31",
      cd: 25,
      descricao: "Gorad e leite servidos fumegando. O gorad ativa o cérebro, fornecendo +2 PM temporários.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Gorvelã",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 90",
      espacos: "—",
      beneficio: "+5 PM temporários",
      beneficio_temperado: "+7 PM temporários (7,5 arredondado)",
      ingredientes: ["Gorad", "Avelã de Norba"],
      custo_ingredientes: "T$ 70",
      cd: 30,
      descricao: "Gorad com avelã de Norba. Sobremesa cara, mas deliciosa. Fornece +5 PM temporários.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Javali do Bosque Enevoado",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 60",
      espacos: "—",
      beneficio: "+2 na Defesa",
      beneficio_temperado: "+3 na Defesa",
      ingredientes: ["Carne de caça", "Cogumelo", "Farinha"],
      custo_ingredientes: "T$ 38",
      cd: 20,
      descricao: "Ensopado de javali cozido em caldo de cerveja escura e mel, servido com pão rústico recheado de cogumelos. De sabor forte, deixa quem come mais confiante para encarar qualquer luta: +2 na Defesa.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Macarrão de Yuvalin",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 6",
      espacos: "—",
      beneficio: "+5 PV temporários",
      beneficio_temperado: "+7 PV temporários (7,5 arredondado)",
      ingredientes: ["Farinha", "Leite", "Porco"],
      custo_ingredientes: "T$ 10",
      cd: 20,
      descricao: "Macarrão com bacon e creme de leite, criado pelos mineiros de Yuvalin, em Zakharov, para encarar longas jornadas de trabalho. Fornece +5 PV temporários.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Manjar dos Titãs",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 150",
      espacos: "—",
      beneficio: "+1d4 em testes de perícias físicas (For, Des, Con)",
      beneficio_temperado: "+1d4+1 em testes de perícias físicas (For, Des, Con)",
      ingredientes: ["Avelã de Norba", "Farinha", "Ovo de monstro"],
      custo_ingredientes: "T$ 91",
      cd: 30,
      descricao: "Pão de trigo de leveduras alquimicamente tratadas, recheado com pasta de nozes e queijo de leite de urso-coruja. Prato robusto que deixa qualquer um ousado: +1d4 em testes de perícias baseadas em Força, Destreza ou Constituição.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Ovo de Monstro Frito",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 30",
      espacos: "—",
      beneficio: "+10 PV temporários",
      beneficio_temperado: "+15 PV temporários",
      ingredientes: ["Ovo de monstro", "Óleo"],
      custo_ingredientes: "T$ 53",
      cd: 25,
      descricao: "Receita simples; o segredo está nos ingredientes. Feito com ovos de monstros, é extremamente nutritivo: +10 PV temporários.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Pão de Queijo",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 10",
      espacos: "—",
      beneficio: "+2 em Fortitude",
      beneficio_temperado: "+3 em Fortitude",
      ingredientes: ["Farinha", "Queijo"],
      custo_ingredientes: "T$ 7",
      cd: 20,
      descricao: "Um bom pão de queijo deixa qualquer aventureiro nutrido e saudável: +2 em testes de Fortitude.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Pavão Celestial",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 150",
      espacos: "—",
      beneficio: "+1d4 em testes de perícias mentais (Int, Sab, Car)",
      beneficio_temperado: "+1d4+1 em testes de perícias mentais (Int, Sab, Car)",
      ingredientes: ["Açúcar das fadas", "Carne de caça", "Fruta"],
      custo_ingredientes: "T$ 85",
      cd: 30,
      descricao: "Ave de caça marinada em vinho, acompanhada de um molho espesso de pêssegos e figos. Extremamente elegante: +1d4 em testes de perícias baseadas em Inteligência, Sabedoria e Carisma.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Pizza",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 6",
      espacos: "—",
      beneficio: "+1 em todos os testes de resistência",
      beneficio_temperado: "+2 em todos os testes de resistência",
      ingredientes: ["Farinha", "Fruta", "Queijo"],
      custo_ingredientes: "T$ 10",
      cd: 20,
      descricao: "Disco de massa com molho de tomate e queijo, criado pelo nobre Guido Venusto, de Ahlen, para conquistar a corte pela barriga — até um espião roubar a receita e custar-lhe a vida. Deixa você pronto para encarar qualquer perigo: +1 em todos os testes de resistência.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Porco Deheoni",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 36",
      espacos: "—",
      beneficio: "+1 em ataques corpo a corpo",
      beneficio_temperado: "+2 em ataques corpo a corpo",
      ingredientes: ["Porco", "Fruta", "Legume"],
      custo_ingredientes: "T$ 12",
      cd: 20,
      descricao: "Prato típico de Deheon, hoje popular em todo o Reinado. O porco assado deixa quem come valente e brigão: +1 em testes de ataque corpo a corpo.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Prato do Aventureiro",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 2",
      espacos: "—",
      beneficio: "+1/nível na recuperação de PV na próxima noite de sono",
      beneficio_temperado: "+2/nível na recuperação de PV na próxima noite de sono",
      ingredientes: ["Ave", "Legume"],
      custo_ingredientes: "T$ 5",
      cd: 15,
      descricao: "Cozido de frango com legumes: refeição simples, mas que mantém qualquer um bem alimentado. Na próxima noite de sono você aumenta a recuperação de pontos de vida em +1 por nível.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Salada de Salistick",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 4",
      espacos: "—",
      beneficio: "+1,5m no deslocamento",
      beneficio_temperado: "+2,5m no deslocamento",
      ingredientes: ["Ave", "Fruta", "Legume"],
      custo_ingredientes: "T$ 8",
      cd: 20,
      descricao: "Folhas com carne de frango, criada no Reino sem Deuses, onde a saúde é grande preocupação. Alimentação leve e nutritiva: aumenta seu deslocamento em +1,5m.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Salada Élfica",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 4",
      espacos: "—",
      beneficio: "+1 em ataques à distância",
      beneficio_temperado: "+2 em ataques à distância",
      ingredientes: ["Fruta", "Legume", "Verdura"],
      custo_ingredientes: "T$ 5",
      cd: 20,
      descricao: "Salada vegetariana de folhas, frutas e legumes, inventada em Lenórienn e passada aos reinos humanos de Lamnor antes do isolamento dos povos. Leve e equilibrada, inspira disparos precisos: +1 em testes de ataque à distância.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Salada Imperial",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 6",
      espacos: "—",
      beneficio: "+2 em Iniciativa",
      beneficio_temperado: "+3 em Iniciativa",
      ingredientes: ["Porco", "Queijo", "Verdura"],
      custo_ingredientes: "T$ 15",
      cd: 20,
      descricao: "Mistura de folhas com bacon e queijo: leve, mas empolgante. Fornece +2 em testes de Iniciativa.",
      fonte: "Heróis de Arton",
      pagina: "308"
    },
    {
      nome: "Sashimi",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 60",
      espacos: "—",
      beneficio: "+2 em rolagens de dano à distância",
      beneficio_temperado: "+3 em rolagens de dano à distância",
      ingredientes: ["Peixe", "Molho tamuraniano"],
      custo_ingredientes: "T$ 37",
      cd: 25,
      descricao: "Iguaria tamuraniana de peixes e frutos do mar fatiados, servida com molho do Império de Jade. Refinada, leve e equilibrada: +2 em rolagens de dano à distância.",
      fonte: "Heróis de Arton",
      pagina: "309"
    },
    {
      nome: "Sopa de Cogumelos",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 6",
      espacos: "—",
      beneficio: "+2 em Misticismo",
      beneficio_temperado: "+3 em Misticismo",
      ingredientes: ["Cogumelo", "Legume", "Verdura"],
      custo_ingredientes: "T$ 7",
      cd: 20,
      descricao: "Esta sopa expande sua percepção mística: +2 em testes de Misticismo.",
      fonte: "Heróis de Arton",
      pagina: "309"
    },
    {
      nome: "Sopa de Peixe",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 3",
      espacos: "—",
      beneficio: "+1/nível na recuperação de PM na próxima noite de sono",
      beneficio_temperado: "+2/nível na recuperação de PM na próxima noite de sono",
      ingredientes: ["Verdura", "Peixe"],
      custo_ingredientes: "T$ 8",
      cd: 15,
      descricao: "Cozido de peixe com verduras: prato humilde, mas que garante descanso relaxante. Na próxima noite de sono você aumenta a recuperação de pontos de mana em +1 por nível.",
      fonte: "Heróis de Arton",
      pagina: "309"
    },
    {
      nome: "Torta de Maçã",
      categoria: "Culinária",
      tipo: "Pratos Especiais",
      preco: "T$ 2",
      espacos: "—",
      beneficio: "Resistência a veneno +5",
      beneficio_temperado: "Resistência a veneno +6",
      ingredientes: ["Farinha", "Fruta"],
      custo_ingredientes: "T$ 4",
      cd: 20,
      descricao: "Contam que, após uma bruxa matar uma princesa com uma maçã envenenada, Thantalla-Dhaedelin decretou que maçãs nunca mais fariam mal a ninguém. Lenda ou não, comer este prato fornece resistência a veneno +5.",
      fonte: "Heróis de Arton",
      pagina: "309"
    }
  ]
};
