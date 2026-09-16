// =================================================================
// BANCO DE DADOS OFICIAL — CANDEH'SSA (Libertação de Valkaria)
// Conteúdo baseado na aventura T20, resumido/adaptado para uso em mesa.
// =================================================================
window.CANDEHSSA_DB = {
  estabelecimentos: [
    {
      nome: "Antiquário",
      resumo: "Itens mágicos",
      npcs: ["Ashtad & Khordad"],
      descricao: "Chalé de madeira com janelas de vidro colorido e um pergolado de rosas na entrada. Durante o dia quem cuida do balcão é Ashtad; à noite, Khordad assume o posto, à luz de velas.",
      servicos: "Compra e venda de acessórios mágicos. Disponibilidade ao procurar um item específico: 75% para acessórios menores, 50% para médios e 25% para maiores.",
      honrarias: "Recebe um acessório mágico à escolha: menor (veterano), médio (campeão) ou maior (lenda)."
    },
    {
      nome: "Arena",
      resumo: "Treino de lutas e apostas",
      npcs: ["Caliandre", "Juno", "Martin"],
      descricao: "Anfiteatro onde combatentes testam talentos e apostam tibares. A campeã Caliandre está sempre pronta para um duelo amistoso, ao lado do minotauro Juno e do mercenário Martin.",
      servicos: "Uma vez por descanso, cada personagem pode lutar na arena e apostar tibares em um teste de Luta: de perder tudo (9 ou menos) a receber o triplo da aposta (30+). Também é possível apostar como espectador usando Jogatina.",
      honrarias: "Recebe um poder de combate à escolha."
    },
    {
      nome: "Biblioteca",
      resumo: "Treino arcano e informações",
      npcs: ["Barossa", "Eh'mmed", "Teclis"],
      descricao: "Construção de linhas retas e colunas de mármore branco, cercada de espelhos d'água. Frequentada por Eh'mmed (o Sábio), Teclis (o escriba) e Barossa (a Estudiosa).",
      servicos: "Testes de Conhecimento e outras perícias para pesquisar qualquer assunto. Vende pergaminhos: role 1d6, se o resultado for maior que o círculo da magia desejada, ela está disponível.",
      honrarias: "Ao fazer um teste de Conhecimento ou Misticismo, pode pagar 1 PM para rolar dois dados e ficar com o melhor."
    },
    {
      nome: "Bosque",
      resumo: "Treino de caça e animais",
      npcs: ["Lassance", "Viridiane"],
      descricao: "Um belo bosque lilás próximo à cidade, tranquilo e cheio de vida selvagem. Lar da dríade Lassance, protetora do local, e da tímida unicórnio Viridiane.",
      servicos: "Clareiras para treino e meditação, além de território de caça e coleta de materiais e ingredientes.",
      honrarias: "Pode usar a habilidade Marca da Presa como um caçador do mesmo nível; se já a possui, cada dado de dano dela aumenta um passo."
    },
    {
      nome: "Casa de Banho",
      resumo: "Cura e descanso",
      npcs: ["Aaliyah"],
      descricao: "Ampla construção de pedra com águas termais relaxantes. Aaliyah, a concierge, recebe os visitantes na entrada.",
      servicos: "PV máximos aumentam em +5 por patamar. Uma noite ali remove qualquer condição temporária.",
      honrarias: "Uma vez por dia, obtém o resultado máximo nos dados de cura de uma de suas habilidades."
    },
    {
      nome: "Churrascaria",
      resumo: "Alimentação especial",
      npcs: ["Punddin", "Tonhão"],
      descricao: "Grande salão circular com cheiro constante de churrasco. O ogro Tonhão vira os espetos enquanto Punddin prepara os acompanhamentos.",
      servicos: "Bebidas e pratos comuns sem custo. Prepara o 'misturadinho dos deuses' com até três acompanhamentos (cada um exige um ingrediente e concede um bônus: PV/PM temporários, +1 em Resistência, +1,5m de deslocamento ou +2 em uma perícia à escolha).",
      honrarias: "+2 em Fortitude e, uma vez por dia, pode remover uma condição de cansaço."
    },
    {
      nome: "Estalagem",
      resumo: "Descanso e recuperação",
      npcs: ["Mahin"],
      descricao: "Construção térrea revestida de madeira escura e vitrais coloridos, tranquila e bem cuidada por Mahin, com acomodações para diferentes tipos de hóspedes.",
      servicos: "PV máximos aumentam em +5 por patamar. Possui quartos especiais para hóspedes variados (sereias, elfos-do-mar, devotos de Allihanna, etc.).",
      honrarias: "O descanso recupera 1 PM e 1 PV adicional por nível."
    },
    {
      nome: "Guilda",
      resumo: "Missões e novos personagens",
      npcs: ["Myssia"],
      descricao: "Salão comunal de dois andares, sempre agitado. Myssia, a recepcionista, gerencia o grande quadro de missões atrás do balcão.",
      servicos: "Oferece missões menores requisitadas por NPCs da cidade (criadas pelo mestre ou geradas na tabela de missões aleatórias).",
      honrarias: "Recebe uma recompensa adicional em cada missão (role novamente na tabela de Recompensa)."
    },
    {
      nome: "Laboratório",
      resumo: "Poções e outros inventos",
      npcs: ["Frann", "Nthanda"],
      descricao: "Casebre cheio de frascos alquímicos e maquinário estranho, lar da medusa inventora Frann e da serena Nthanda.",
      servicos: "Vende itens alquímicos e poções mágicas. Disponibilidade: role 1d6, se o resultado for maior que o círculo da poção desejada, ela está disponível.",
      honrarias: "A CD dos itens alquímicos usados aumenta em +2, ou recebe uma engenhoca extra (fora do limite normal)."
    },
    {
      nome: "Mercado",
      resumo: "Itens em geral",
      npcs: ["Lyssara", "Nahiri", "Tharuk"],
      descricao: "Praça comercial caótica mas organizada, com bazares e bancas. Tharuk, o mercador, e sua filha Nahiri têm a maior banca; Lyssara cuida de uma floricultura próxima.",
      servicos: "Vende qualquer item comum do livro básico não encontrado em outro estabelecimento de Candeh'ssa.",
      honrarias: "Uma vez por descanso, recebe 30% de desconto no preço de um único item."
    },
    {
      nome: "Oficina",
      resumo: "Armas, armaduras e afins",
      npcs: ["Harko", "Kandor", "Phylla"],
      descricao: "Casa de pedra com pátio, forja e bancadas de trabalho. Lar dos três mestres artífices: Harko (armeiro), Phylla (couraceira) e Kandor (artesão).",
      servicos: "Vende armas, escudos e armaduras normais e superiores, aplica melhorias e encantos. Disponibilidade: 75% para itens menores, 50% médios, 25% maiores.",
      honrarias: "Um item recebe uma melhoria à escolha (exceto material especial), desde que cumpra os pré-requisitos."
    },
    {
      nome: "Pesqueiro",
      resumo: "Pesca e descanso",
      npcs: ["Andris", "Nerus"],
      descricao: "Casa modesta perto do melhor ponto de pesca do lago central, cuidada pelo casal Nerus e Andris.",
      servicos: "Oferece descanso e pesca: teste de Sobrevivência CD 15 rende um pescado (mais um a cada 10 pontos acima da CD). Pescados podem ser trocados com Andris por recursos naturais, ou vendidos.",
      honrarias: "Uma arma à escolha recebe a melhoria lanajuste (ou +1 na margem de ameaça, se já a possuir)."
    },
    {
      nome: "Taverna",
      resumo: "Alimentação e comemoração",
      npcs: ["Artemisia", "Bragi", "Nima"],
      descricao: "Salão aconchegante sempre cheio, com mesas de jogo geridas pela crupiê Artemisia, vigiado pelo atento Bragi, com comida preparada por Nima, a taverneira.",
      servicos: "Qualquer item da categoria Alimentação. Lugar propício para testes de Jogatina e Investigação. Personagens treinados em Atuação podem se apresentar no palco por tibares.",
      honrarias: "+2 em testes de perícias baseadas em Carisma e, uma vez por aventura, pode fazer um teste de Diplomacia para mudar atitude sem a penalidade padrão de -10."
    },
    {
      nome: "Templo",
      resumo: "Treino divino, cura e penitência",
      npcs: ["Rafiq", "Tanit"],
      descricao: "Templo imponente com vinte colunas dedicadas ao Panteão. Cuidado por Rafiq, o Piedoso (energia positiva), e Tanit, a Oculta (energia negativa).",
      servicos: "Ritos de penitência, água benta, itens esotéricos e serviços de magia divina. Devotos de deuses de energia positiva recebem 10% de desconto em qualquer transação.",
      honrarias: "Devotos recebem um poder concedido extra de sua divindade."
    }
  ],

  npcs: [
    { nome: "Aaliyah", estabelecimento: "Casa de Banho", descricao: "Moreau do gato, de cabelos e orelhas cinza e olhos cor de caramelo. Recepciona com um sorriso doce, mas está sempre atenta a tudo ao redor; nos momentos livres, faz tricô.", gostos: "Cafuné, tricô, perfumes, fofoca.", desgostos: "Coisas fedorentas, barulho, chuva.", ultimaDemanda: "Sonha em visitar uma masmorra, mesmo pequena, para ver suas maravilhas de perto (missão de escolta).", beneficios: "Cordial: +2 em Percepção. Leal: ignora penalidade de armadura em Acrobacia e Furtividade. Íntimo: pode usar a honraria da Casa de Banho uma vez adicional por dia." },
    { nome: "Andris", estabelecimento: "Pesqueiro", descricao: "Qareen calmo e plácido, marido de Nerus, passa os dias limpando peixes e cuidando dos criadouros. Usa braceletes de couro e calça branca impecável.", gostos: "Peixes raros, facas de qualidade, organização.", desgostos: "Roupas de cores muito fortes, bagunça.", ultimaDemanda: "Deseja uma faca que nunca perca o fio (missão de manufatura em Oceano/Wynna ou recuperação em Keenn).", beneficios: "Cordial: +5 em testes de perícia para extrair recursos de criaturas. Leal: +1 na margem de ameaça com armas leves ou de uma mão que causem dano de perfuração. Íntimo: esse bônus sobe para +2 contra uma criatura identificada com sucesso." },
    { nome: "Artemisia", estabelecimento: "Taverna", descricao: "Sílfide pequena de cabelos verdes, crupiê sortuda e bem-humorada, sempre em busca de apostas e diversão.", gostos: "Jogos de azar, bebidas fortes, tudo que seja verde.", desgostos: "Livros, poções mágicas, armas de ferro.", ultimaDemanda: "Seu dado da sorte 'perde a bênção' sempre que ela perde um jogo — vencê-la em Jogatina gera uma missão envolvendo o dado abençoado.", beneficios: "Cordial: 1x/masmorra, ao rolar 10 ou menos em um teste de perícia, pode rolar +1d4 extra. Leal: o dado extra sobe para +1d6. Íntimo: pode usar 2x/masmorra (uma vez por teste)." },
    { nome: "Ashtad & Khordad", estabelecimento: "Antiquário", descricao: "Duas qareen de pele dourada com manchas prateadas, fisicamente parecidas mas nunca vistas juntas. Ashtad é ruiva e mais vista de dia; Khordad tem cabelos escuros e é mais reclusa, à noite.", gostos: "Itens mágicos, flores, perfumes, joias, doces (Ashtad) ou livros (Khordad).", desgostos: "Barulho, curiosidade exagerada, perguntas pessoais, multidões.", ultimaDemanda: "Escondem um segredo mágico — dividem o mesmo corpo — revelado apenas por uma missão de pesquisa em Glórienn, Tanna-Toh ou Wynna.", beneficios: "Cordial: +5 em testes de perícia para identificar itens e seus usos. Leal: 10% de desconto (cumulativo) no Antiquário. Íntimo: pode vestir um item mágico adicional." },
    { nome: "Barossa", estabelecimento: "Biblioteca", descricao: "Pequena sulfure de pele azul e óculos, sempre estudando — especialmente sobre hidras, seu assunto favorito.", gostos: "Hidras (muitas vezes mencionadas), sorvete de maracujá.", desgostos: "Barulho, dias de sol, multidões.", ultimaDemanda: "Deseja criar sua própria hidra; precisa de uma missão de escolta em Megalokk, Sszzaas ou Thyatis.", beneficios: "Cordial: +2 em testes de perícia para identificar criatura. Leal: quando atacada mais de uma vez na rodada pela mesma criatura, recebe +2 cumulativo na Defesa e redução de dano contra ela. Íntimo: 1x/rodada pode identificar criatura como ação livre, com +2 em perícia contra ela se passar." },
    { nome: "Bragi", estabelecimento: "Taverna", descricao: "Sulfure isolado e ranzinza, de olhos dourados fendidos, chifres e escamas de dragão, sempre com uma espada montante nas costas.", gostos: "Montantes, qareen, instrumentos musicais.", desgostos: "Cores vibrantes, comidas picantes, armas leves.", ultimaDemanda: "Perdeu entes queridos num acidente e deseja caçar a criatura responsável (missão de caça em qualquer masmorra).", beneficios: "Cordial: proficiência em uma arma marcial de duas mãos à escolha (ou +2 no dano, se já proficiente). Leal: +1 em ataque e margem de ameaça com armas de duas mãos. Íntimo: 1x/cena recebe 10 PV temporários por patamar (viram 2 PM se perdidos); o bônus Leal sobe para +2." },
    { nome: "Caliandre", estabelecimento: "Arena", descricao: "Aggelus de cabelos negros e halo luminoso, sempre sorridente, adora um bom duelo amistoso; pode mudar de forma em combate.", gostos: "Armas exóticas, combate, manobras, duelos.", desgostos: "Magia arcana, passividade, inimigos em desvantagem.", ultimaDemanda: "Colecionadora de armas, deseja recuperar uma peça específica em Tauron, Lin-Wu, Keenn ou Khalmyr.", beneficios: "Cordial: +5 em testes de manobra. Leal: pode usar Derrubar, Desarmar, Finta ou Quebrar Aprimorado. Íntimo: torna-se uma parceira combatente mestre nas masmorras." },
    { nome: "Eh'mmed", estabelecimento: "Biblioteca", descricao: "Qareen encapuzado, de olhos prateados, sempre entediado ou cansado; rabugento, mas protetor dos cidadãos de Candeh'ssa. Só aparece a heróis já provados.", gostos: "Candeh'ssa, o saber.", desgostos: "Aventureiros, ameaças à cidade ou seus cidadãos.", ultimaDemanda: "Exige que o personagem cumpra antes a Última Demanda de outra pessoa.", beneficios: "Cordial: aprende uma magia arcana de convocação ou transmutação de 1º círculo. Leal: +2 PM para aprimorar essa magia. Íntimo: ao morrer, fica em 0 PV e é resgatado por Eh'mmed (uma vez na campanha)." },
    { nome: "Frann", estabelecimento: "Laboratório", descricao: "Medusa inventora de terninho, óculos e serpentes coloridas nos cabelos; cética, curiosa, responsável pelas inovações técnicas da cidade.", gostos: "Inovação, tecnologia, armas de fogo, roupas casuais.", desgostos: "Apego às tradições, roupas formais.", ultimaDemanda: "Quer provar-se explorando os limites de suas invenções (missão de escolta).", beneficios: "Cordial: armas recebem +1 em ataque e dano no primeiro encontro da próxima masmorra. Leal: o bônus dura até o próximo descanso. Íntimo: o bônus dura até o fim da masmorra." },
    { nome: "Harko", estabelecimento: "Oficina", descricao: "Qareen moreno de braços fortes e riso fácil, o armeiro da cidade, animado com a chegada dos heróis e novas ideias de armamentos.", gostos: "Dias de sol, cerveja, festas, armas exóticas.", desgostos: "Objetos domésticos de metal, pessoas passivas demais.", ultimaDemanda: "Deseja sofrer 'a maior ressaca de todos os tempos' e precisa da maior caça de Allihanna, Oceano, Lena ou Megalokk.", beneficios: "Cordial: armas recebem +1 em ataque e dano no primeiro encontro da próxima masmorra. Leal: o bônus dura até o próximo descanso. Íntimo: o bônus dura até o fim da masmorra." },
    { nome: "Juno", estabelecimento: "Arena", descricao: "Minotauro musculoso de semblante contemplativo, filósofo marcial que prefere argumentos aos punhos sempre que possível.", gostos: "Combate desarmado, liberdade, comida, Tapista.", desgostos: "Armas, covardia, escravidão, preguiça.", ultimaDemanda: "Deseja meditar em um espaço divino (missão de escolta em Lin-Wu ou Tauron).", beneficios: "Cordial: dano de ataques desarmados sobe um passo. Leal: +5 em testes de manobra com ataques desarmados. Íntimo: 1x/rodada pode fazer manobra desarmada como ação livre ao acertar um ataque desarmado." },
    { nome: "Kandor", estabelecimento: "Oficina", descricao: "Aggelus quieto e detalhista, artesão versátil (artesanato, alfaiataria, carpintaria), raramente interage fora do seu posto.", gostos: "Plantas, conchas, objetos de formato orgânico.", desgostos: "Festas, pessoas barulhentas, desperdício.", ultimaDemanda: "Obcecado por perfeição inspirada na natureza, precisa de uma missão de pesquisa em Allihanna, Azgher ou Oceano.", beneficios: "Cordial: recebe uma ferramenta aprimorada à escolha. Leal: paga metade do preço por itens mundanos que Kandor fabrica. Íntimo: um item recebe ajuste especial (+10 PV ou +1 PM por patamar)." },
    { nome: "Lassance", estabelecimento: "Bosque", descricao: "Dríade muito bela, de cabelos como folhagens e pele como madeira sedosa; tímida com estranhos, mas divertida com quem confia.", gostos: "Pessoas belas, geleia, chuva.", desgostos: "Desrespeito à natureza, matança, flores cortadas.", ultimaDemanda: "Deseja uma geleia de frutas raras (missão de manufatura em três masmorras diferentes).", beneficios: "Cordial: +2 em Adestramento e Cura. Leal: pode lançar Controlar Plantas (custo -1 PM se já conhece). Íntimo: pode usar o poder Companheiro Animal como um druida do mesmo nível." },
    { nome: "Lyssara", estabelecimento: "Mercado", descricao: "Aggelus de meia-idade, cabelos azul-escuro, apaixonada por flores desde sempre; tímida, mas prestativa a ponto de ter dificuldade em negar pedidos.", gostos: "Flores, livros, silêncio, sobremesas de baunilha.", desgostos: "Invasão de espaço pessoal, gente barulhenta, chocolate.", ultimaDemanda: "Deseja a rara Kinabalu Mágica, uma tulipa luminosa encontrada apenas em Wynna (missão de recuperação).", beneficios: "Cordial: +2 em Ofício (alquimista) e Sobrevivência. Leal: soma o atributo principal aos PV recuperados por habilidades de cura. Íntimo: preparados alquímicos usados ganham +1 dado extra do mesmo tipo." },
    { nome: "Mahin", estabelecimento: "Estalagem", descricao: "Aggelus ruiva, reservada e silenciosa, conhece cada canto de Candeh'ssa. Irmã gêmea de Nima, de quem está afastada após uma briga antiga.", gostos: "Mapas, peças de cerâmica, Nima.", desgostos: "Tecidos esvoaçantes, itens de madeira, animais selvagens.", ultimaDemanda: "Quer fazer as pazes com Nima, com um vaso de cerâmica perfeito (missão de pesquisa/Sobrevivência em Allihanna, Marah ou Glórienn).", beneficios: "Cordial: +3 em PV máximos por patamar. Leal: ao descansar, remove também uma condição. Íntimo: excesso de PV recuperado no descanso vira PV temporário até o fim da próxima masmorra." },
    { nome: "Martin", estabelecimento: "Qualquer (perambula pela cidade)", descricao: "Humano magro e alto, ex-mercenário de Portsmouth já falecido, agora 'contratado' para ajudar os futuros Libertadores. Cínico, mas competente.", gostos: "Magia arcana, combate honrado, pacifismo.", desgostos: "Dinheiro, combate desonrado, violência.", ultimaDemanda: "Sente falta de seus antigos companheiros de bando; deseja recuperar o estandarte do grupo, perdido na masmorra de Keenn.", beneficios: "Cordial: pode usar o poder Valentão. Leal: resistência a magia arcana +5. Íntimo: o bônus de dano do poder Valentão sobe para +5." },
    { nome: "Myssia", estabelecimento: "Guilda", descricao: "Moça de cabelos loiros encaracolados, extremamente organizada, cuida do balcão de missões o dia todo, falando rápido demais às vezes.", gostos: "Organização, listas bem-feitas, sorvete de morango.", desgostos: "Bagunça, coisas erráticas, cebola na comida.", ultimaDemanda: "Sua Última Demanda é que a Última Demanda de duas outras pessoas seja concluída.", beneficios: "Cordial: 1x/masmorra pode rerrolar um teste de perícia relacionado a uma missão. Leal: ao concluir uma missão, o mestre rola duas recompensas e o grupo escolhe uma. Íntimo: pode elaborar sua própria missão na tabela aleatória (uma vez por personagem)." },
    { nome: "Nahiri", estabelecimento: "Mercado", descricao: "Qareen do ar de pele escura, cabelos e olhos verde-claro, filha adotiva de Tharuk; sonha em ser aventureira e adora ouvir histórias de masmorras.", gostos: "Aventuras, coisas brilhantes, flertar, magia.", desgostos: "Assuntos burocráticos, tempo frio, pimenta.", ultimaDemanda: "Quer acompanhar o grupo em uma missão de escolta em qualquer masmorra.", beneficios: "Cordial: +2 em Diplomacia. Leal: pode lançar Criar Ilusão (custo -1 PM se já conhece). Íntimo: torna-se parceira veterana adepta, ajudante ou magivocadora." },
    { nome: "Nerus", estabelecimento: "Pesqueiro", descricao: "Elfa-do-mar musculosa e animada, de cabelos verdes curtos, esposa de Andris; sempre convida os aventureiros para a pesca diária.", gostos: "Peixes raros, marcenaria, nadar.", desgostos: "Dias nublados, comidas doces, aulas teóricas longas.", ultimaDemanda: "Sonha pescar um kraken; precisa de uma isca especial de Allihanna, Oceano ou Megalokk (missão de caça).", beneficios: "Cordial: +2 em Atletismo e Sobrevivência. Leal: proficiência com o arpão. Íntimo: ao acertar manobra segurando a corda de um arpão preso a um alvo, pode arrastá-lo 9m." },
    { nome: "Nima", estabelecimento: "Taverna", descricao: "Aggelus jovem de cabelos ruivos e olhos lilases, taverneira faladeira e bem relacionada; irmã gêmea de Mahin, afastada dela há anos.", gostos: "Conversas, especiarias, lírios brancos, Mahin.", desgostos: "Roupas de couro, armaduras, animais selvagens.", ultimaDemanda: "Quer fazer as pazes com Mahin com um vaso de cerâmica perfeito (missão de manufatura em Lena, Marah ou Wynna).", beneficios: "Cordial: o bônus de um prato especial consumido dura dois dias. Leal: pode acumular dois bônus de alimentação por vez. Íntimo: uma vez por visita, pode pagar para promover uma comemoração para a cidade, ganhando resistência a magia +5 e 10 PV temporários por patamar até o fim da próxima masmorra." },
    { nome: "Nthanda", estabelecimento: "Laboratório", descricao: "Aggelus de pele com tatuagens que brilham como estrelas, serena e caridosa, de poucas palavras; vive fabricando bálsamos e remédios.", gostos: "Orvalho, chuva, pássaros, penas coloridas.", desgostos: "Pelo de animal, bagunça e sujeira.", ultimaDemanda: "Precisa de um catalisador universal poderoso, obtido em ambiente de energia divina (missão de manufatura de Ofício em qualquer masmorra).", beneficios: "Cordial: a cada retorno a Candeh'ssa, ganha 2d4 x T$10 em essências/bálsamos. Leal: sobe para 2d6 x T$10, incluindo ácidos, bombas e fogos alquímicos. Íntimo: inclui também uma poção à escolha (Curar Ferimentos 4d8+4, Bola de Fogo 6d6, Purificação ou Resistência a Energia)." },
    { nome: "Phylla", estabelecimento: "Oficina", descricao: "Mulher pequena, de riso fácil e mãos rápidas, a mais jovem trabalhadora da Oficina, apaixonada por histórias de outras culturas.", gostos: "Itens de pedra, culturas distantes, histórias.", desgostos: "Livros parados, coisas paradas, pessoas quietas demais.", ultimaDemanda: "Perdeu seu brunidor favorito para aventureiros anteriores; precisa de uma missão de recuperação em qualquer masmorra.", beneficios: "Cordial: +2 em Investigação e Percepção. Leal: 1x/masmorra pode 'achar' uma ferramenta com uma melhoria nos bolsos. Íntimo: pode gastar 1 PM para achar a fraqueza de um inimigo (+5 no dano se ele usa armadura ou é construto)." },
    { nome: "Punddin", estabelecimento: "Churrascaria", descricao: "Moreau herdeira do coelho, doce, calma e tímida, adora assar doces mesmo sendo capaz de muito mais na cozinha.", gostos: "Coelhos, cor-de-rosa, chantilly, livros de terror.", desgostos: "Pimenta, carne, bagunça na cozinha.", ultimaDemanda: "Quer fazer um bolo enorme, mas precisa de açúcar de fada raro (missão de recuperação em Glórienn, Lena, Marah ou Wynna).", beneficios: "Cordial: +2 em Ofício (cozinheiro). Leal: 1x/dia pode gastar 1 PM para que pratos especiais concedam 2d8 PV temporários adicionais. Íntimo: pratos especiais permitem ignorar a primeira condição de medo ou mental sofrida no dia." },
    { nome: "Rafiq", estabelecimento: "Templo", descricao: "Jovem aggelus alto, de pele escura e cabeça raspada, sacerdote devoto de energia positiva, com predileção por aventureiros de razões nobres.", gostos: "Heroísmo, romances históricos, incenso.", desgostos: "Barulho, exibicionismo, descrença ou desrespeito aos deuses.", ultimaDemanda: "Pede que levem suas ofertas a três masmorras de deuses de energia positiva (missões de entrega).", beneficios: "Cordial: magias de cura recuperam +1 PV por círculo conjurável. Leal: uma magia divina conhecida custa -1 PM. Íntimo: magias divinas de toque ganham um novo aprimoramento (+1 PM: alcance curto)." },
    { nome: "Tanit", estabelecimento: "Templo", descricao: "Qareen de cabelo cacheado lilás, clériga de energia negativa; entediada com a cidade, mas fascinada pelos aventureiros.", gostos: "Poder, joias, presentes caros, passeios noturnos.", desgostos: "Altruísmo, flores, luzes fortes.", ultimaDemanda: "Deseja uma escolta a uma masmorra de um deus de energia negativa, na esperança de escapar para lá.", beneficios: "Cordial: aprende uma magia divina de necromancia ou transmutação de 1º círculo. Leal: ganha 2 PM temporários ao reduzir um inimigo a 0 PV com magia divina. Íntimo: um espírito abissal surge como parceiro na primeira vez que o personagem chega à metade dos PV em uma masmorra." },
    { nome: "Teclis", estabelecimento: "Biblioteca", descricao: "Elfo escriba franzino e tímido, exceto quando o assunto é magia — aí se torna um apaixonado por conhecimento arcano.", gostos: "Conhecimento arcano, pergaminhos, mistérios mágicos.", desgostos: "Inventores, engenhoqueiros, goblinoides, armas de fogo.", ultimaDemanda: "Quer novas informações mágicas, trazidas por uma missão de reconhecimento em Wynna, Tanna-Toh ou Glórienn.", beneficios: "Cordial: ao procurar um pergaminho na biblioteca, rola dois dados e fica com o melhor. Leal: 25% de chance de um pergaminho de magia usado não ser consumido. Íntimo: aprende temporariamente uma magia de até 3º círculo de um pergaminho, válida na próxima masmorra." },
    { nome: "Tharuk", estabelecimento: "Mercado", descricao: "Anão forte, de barba e cabelos pretos, focado no trabalho e na filha Nahiri; evita falar do passado como um Libertador fracassado.", gostos: "Nahiri, cerveja anã, histórias de Doherimm.", desgostos: "Falar do passado, anões sem barba, mexerem com a filha.", ultimaDemanda: "Deixou para trás seu machado de família na fuga de sua antiga jornada; quer recuperá-lo em uma das cinco primeiras masmorras.", beneficios: "Cordial: a cada retorno a Candeh'ssa, ganha um item à escolha de até T$100. Leal: o valor sobe para T$200. Íntimo: torna-se um parceiro veterano combatente, fortão ou guardião." },
    { nome: "Tonhão", estabelecimento: "Churrascaria", descricao: "Grande ogro de sorriso bobo, chegou recentemente à cidade depois que seu bando o abandonou por não querer lutar como os outros.", gostos: "Carne, cozinhar, ajuda na cozinha.", desgostos: "Peixe, dias chuvosos, não poder cozinhar.", ultimaDemanda: "Quer assar o churrasco perfeito e precisa temperar seus espetos em uma fonte de calor sobrenatural (missão de manufatura de Ofício/artesão em Azgher, Thyatis ou Wynna).", beneficios: "Compartilha os benefícios da Churrascaria: extração de recurso extra de criaturas, acesso a Abençoar Alimentos e um ingrediente adicional no misturadinho dos deuses conforme o nível de afinidade." },
    { nome: "Viridiane", estabelecimento: "Bosque", descricao: "Bela unicórnio fêmea, extremamente tímida mesmo entre os nativos; pode adotar forma humanoide e vive sob a proteção de Lassance.", gostos: "Silêncio, segurança, confeitos.", desgostos: "Armas, ruído alto, itens de couro, agressividade.", ultimaDemanda: "Quer vencer a própria timidez acompanhando o grupo em um desafio, escolhendo quem a tratou com mais candura e confiança.", beneficios: "Cordial: +2 em Percepção e Sobrevivência. Leal: pode lançar Purificação uma vez na próxima masmorra. Íntimo: atua como parceira unicórnio veterana nas masmorras (ou mestre, se o personagem for nível 11+)." }
  ],

  // Tabela "Missões Aleatórias" (p. 34): 2d8 Solicitante, 1d8 Objetivo, 1d6 Recompensa
  missoesAleatorias: {
    solicitantePorRolagem: {
      2: "Taverna", 3: "Taverna", 4: "Estalagem", 5: "Laboratório", 6: "Templo",
      7: "Biblioteca", 8: "Oficina", 9: "Churrascaria", 10: "Casa de Banho",
      11: "Antiquário", 12: "Arena", 13: "Pesqueiro", 14: "Bosque", 15: "Mercado", 16: "Guilda"
    },
    objetivos: {
      1: { nome: "Manufatura", descricao: "Fabricar um item específico, que só pode ser produzido em determinado local da masmorra. Exige 1 dia, matérias-primas (fornecidas pelo solicitante, ocupam 1d3 espaços) e um teste de Ofício (CD 15 + nível da masmorra)." },
      2: { nome: "Escolta", descricao: "Um NPC do estabelecimento precisa entrar na masmorra. Ele atua como um parceiro iniciante que não fornece benefícios, é vulnerável e precisa percorrer a masmorra do início ao fim. Se morrer, a missão falha." },
      3: { nome: "Entrega", descricao: "Deixar um item (que ocupa 2d4 espaços) em uma câmara numerada específica da masmorra. Se a masmorra não for concluída, o item retorna à cidade e a missão falha." },
      4: { nome: "Caça", descricao: "Abater uma criatura particularmente perigosa na masmorra e trazê-la para Candeh'ssa. A criatura recebe +2 em testes de perícia e na Defesa." },
      5: { nome: "Ritual", descricao: "Executar um ritual em uma câmara numerada específica. É um teste estendido (CD 15 + nível da masmorra, 3 sucessos) de Misticismo ou Religião, 1 hora por teste. Em falha total, os PM máximos de cada personagem diminuem em 1 por nível até a conclusão da próxima masmorra." },
      6: { nome: "Recuperação", descricao: "Resgatar um item (que ocupa 2d4 espaços) em uma das câmaras numeradas. Uma vez recuperado, atrai a atenção das criaturas locais, que recebem +2 em testes de ataque contra os personagens." },
      7: { nome: "Resgate", descricao: "Um habitante precisa ser resgatado de uma câmara numerada da masmorra. Atua como em Escolta, mas sua presença atiça as criaturas locais, que recebem +2 em rolagens de dano contra os aventureiros." },
      8: { nome: "Pesquisa", descricao: "Registrar um fenômeno ou aparição em uma câmara numerada específica. É um teste estendido (CD 15 + nível da masmorra, 3 sucessos) de Conhecimento, Investigação ou Sobrevivência, 1 hora por teste. Em falha total, os PV máximos de cada personagem diminuem em 1 por nível até a conclusão da próxima masmorra." }
    },
    recompensas: {
      1: { nome: "Informação", descricao: "Uma informação útil: uma dica para se aproximar de um NPC, o Agrado dos Deuses de uma das próximas masmorras, ou uma dica sobre perigos e desafios futuros (a critério do mestre)." },
      2: { nome: "Favor", descricao: "Um favor de um habitante do estabelecimento solicitante: um uso adicional da honraria, a ajuda do habitante como parceiro na próxima masmorra, ou outro favor combinado com o mestre." },
      3: { nome: "Tesouro (riqueza)", descricao: "Role na tabela Tesouros (Tormenta20, p. 328), coluna de riquezas, na linha correspondente ao nível do grupo." },
      4: { nome: "Tesouro (item)", descricao: "Role na tabela Tesouros (Tormenta20, p. 328), coluna de itens, na linha correspondente ao nível do grupo." },
      5: { nome: "Tesouro (ambos)", descricao: "Role na tabela Tesouros (Tormenta20, p. 328), nas colunas de riquezas e de itens, na linha correspondente ao nível do grupo." },
      6: { nome: "1d4 PA", descricao: "1d4 Pontos de Afinidade com um habitante à sua escolha do estabelecimento solicitante (só pode ser recebido uma vez por habitante)." }
    }
  }
};
