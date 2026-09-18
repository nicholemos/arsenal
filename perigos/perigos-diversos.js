// ============================================================
// PERIGOS DIVERSOS — regras de referência de Tormenta20
// (clima, terreno, viagem, perigos ambientais, doenças,
//  armadilhas, maldições, fenômenos rubros)
// Cada entrada: categoria, subcategoria (opcional), origem, nome, efeito (HTML)
// ============================================================

const perigosDiversos = [

  // ===================== CLIMA =====================
  {
    categoria: "Clima",
    subcategoria: "Temperatura",
    categorias: ["Clima", "Terrenos"],
    origem: "Livro Básico",
    nome: "Calor e Frio",
    descricao: "Temperaturas extremas de deserto ou tundra que desgastam quem se expõe a elas por muito tempo.",
    imagem: "https://media.tenor.com/z-jwynP8HloAAAAM/hot-water-cold-water.gif",
    efeito: `
      <p>Em clima muito <strong>quente (acima de 50°C)</strong> ou muito <strong>frio (abaixo de –10°C)</strong>, cada personagem faz um teste de <strong>Fortitude</strong> por dia (<strong>CD 15 +1</strong> por teste anterior).</p>
      <ul>
        <li><strong>Falha:</strong> sofre <strong>1d6</strong> de dano de fogo ou frio, que só cura ao sair do clima.</li>
        <li>Em <strong>calor/frio extremos</strong> (acima de 60°C ou abaixo de –20°C), o teste é feito <strong>por minuto</strong>.</li>
      </ul>
    `
  },
  {
    categoria: "Clima",
    subcategoria: "Visibilidade",
    origem: "Livro Básico",
    nome: "Neblina",
    descricao: "Névoa densa que embaça a visão e esconde criaturas a distância.",
    imagem: "https://giffiles.alphacoders.com/223/223076.gif",
    efeito: `
      <p>Fornece <strong>camuflagem leve</strong> a criaturas a até 1,5m e <strong>camuflagem total</strong> a criaturas além disso.</p>
    `
  },
  {
    categoria: "Clima",
    subcategoria: "Precipitações",
    origem: "Livro Básico",
    nome: "Chuva",
    descricao: "Chuva comum, que molha e atrapalha a visão e o disparo de flechas.",
    imagem: "https://media1.tenor.com/m/m0BRL411tzEAAAAd/ichigo-rain.gif",
    efeito: `<p><strong>–5</strong> em testes de Percepção. Efeitos iguais aos de vento forte.</p>`
  },
  {
    categoria: "Clima",
    subcategoria: "Precipitações",
    origem: "Livro Básico",
    nome: "Granizo",
    descricao: "Chuva de pedras de gelo que machuca quem está exposto a ela.",
    imagem: "https://media.tenor.com/oUlkZEwEV1sAAAAM/hail-dents.gif",
    efeito: `<p>Como chuva, mas no início de cada rodada todas as criaturas sofrem <strong>1 ponto de dano de impacto</strong>.</p>`
  },
  {
    categoria: "Clima",
    subcategoria: "Precipitações",
    categorias: ["Clima", "Terrenos"],
    origem: "Livro Básico",
    nome: "Neve",
    descricao: "Manto de neve que dificulta o deslocamento pelo terreno.",
    imagem: "https://media.tenor.com/kU_EwdsrkLkAAAAM/frieren-dies-cold.gif",
    efeito: `<p>Como chuva, mas cria <strong>terreno difícil</strong>.</p>`
  },
  {
    categoria: "Clima",
    subcategoria: "Precipitações",
    origem: "Livro Básico",
    nome: "Tempestade",
    descricao: "Tempestade violenta, com raios que podem atingir os viajantes.",
    imagem: "https://media1.tenor.com/m/4lTo4bQF7p8AAAAd/i-am-the-storm-dmc.gif",
    efeito: `
      <p><strong>–10</strong> em testes de Percepção. Efeitos iguais aos de vendaval.</p>
      <p>No início de cada rodada, <strong>10%</strong> de chance de uma criatura aleatória ser atingida por um raio (<strong>8d10</strong> de dano de eletricidade).</p>
    `
  },
  {
    categoria: "Clima",
    subcategoria: "Vento",
    origem: "Livro Básico",
    nome: "Vento Forte",
    descricao: "Rajadas que desviam flechas e podem apagar fogueiras.",
    imagem: "https://i.pinimg.com/originals/2e/de/84/2ede84b9334d8fdae9c8d5427d54a4ef.gif",
    efeito: `<p><strong>–2</strong> em ataques à distância. <strong>50%</strong> de chance por rodada de apagar chamas ou dissipar névoas.</p>`
  },
  {
    categoria: "Clima",
    subcategoria: "Vento",
    origem: "Livro Básico",
    nome: "Vendaval",
    descricao: "Vento intenso que torna quase impossível atirar e apaga fogo com facilidade.",
    imagem: "https://media.tenor.com/OB_ORRzmmWQAAAAM/open-door-wind.gif",
    efeito: `<p><strong>–5</strong> em ataques à distância. Apaga chamas e dissipa névoas automaticamente.</p>`
  },
  {
    categoria: "Clima",
    subcategoria: "Vento",
    origem: "Livro Básico",
    nome: "Furacão",
    descricao: "Vento destrutivo, capaz de derrubar e arrastar quem estiver exposto.",
    imagem: "https://media1.tenor.com/m/i0xioXEunlIAAAAd/little-rain-tornado-rainstorm.gif",
    efeito: `
      <p>Torna ataques à distância <strong>impossíveis</strong>, apaga chamas e dissipa névoas.</p>
      <p>No início de cada rodada, criaturas Médias ou menores fazem <strong>Fortitude CD 15</strong> ou caem, são arrastadas <strong>1d4 x 1,5m</strong> na direção do vento e sofrem <strong>1d6</strong> de dano de impacto por 1,5m arrastado.</p>
    `
  },
  {
    categoria: "Clima",
    subcategoria: "Vento",
    origem: "Livro Básico",
    nome: "Tornado",
    descricao: "Coluna de vento violenta que ergue e arremessa criaturas pelo ar.",
    imagem: "https://i.makeagif.com/media/1-11-2017/Im6QiX.gif",
    efeito: `
      <p>Torna ataques à distância <strong>impossíveis</strong>, apaga chamas e dissipa névoas.</p>
      <p>No início de cada rodada, criaturas Grandes ou menores fazem <strong>Fortitude CD 25</strong> ou caem, são arrastadas <strong>1d12 x 1,5m</strong> em direção aleatória e sofrem <strong>1d6</strong> de dano de impacto por 1,5m arrastado.</p>
    `
  },

  // ===================== TERRENOS =====================
  {
    categoria: "Terrenos", subcategoria: "Colinas", origem: "Livro Básico",     nome: "Inclinação Suave",
    descricao: "Encosta suave que dá vantagem tática a quem está no alto.",
    imagem: "https://i.makeagif.com/media/10-27-2021/F7A0LR.gif",
    efeito: `<p>Não afeta o movimento, mas quem está no lado superior recebe bônus por terreno elevado contra quem está no lado inferior.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Colinas", origem: "Livro Básico",     nome: "Inclinação Íngreme",
    descricao: "Ladeira acentuada, arriscada para quem tenta descê-la correndo.",
    imagem: "https://preview.redd.it/which-album-makes-you-feel-like-you-are-falling-down-a-hill-v0-e4o9e51psp7e1.gif?width=320&auto=webp&s=b773815e8595d39b3b74b85b3706355de83a6037",
    efeito: `<p>Conta como <strong>terreno difícil</strong> para subir. Descer correndo/investindo exige <strong>Acrobacia ou Cavalgar CD 10</strong>; falha: cai, rola <strong>1d4 x 1,5m</strong> e sofre <strong>1d6</strong> de dano de impacto por 1,5m rolado.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Colinas", origem: "Livro Básico",     nome: "Penhasco",
    descricao: "Paredão rochoso que bloqueia a passagem e precisa ser escalado.",
    imagem: "https://i.makeagif.com/media/11-12-2023/4VRV33.gif",
    efeito: `<p>Rochedo alto (normalmente <strong>1d6 x 3m</strong>). Escalar exige <strong>Atletismo CD 15</strong>.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Desertos", origem: "Livro Básico",     nome: "Dunas",
    descricao: "Montes de areia que rolam sob os pés como uma ladeira macia.",
    imagem: "https://media.tenor.com/kz7ODkrtWxgAAAAM/tumble-professor-sheldon-oberon.gif",
    efeito: `<p>Funcionam como inclinações íngremes, mas cair e rolar de uma duna <strong>não causa dano</strong>.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Florestas", origem: "Livro Básico",     nome: "Árvores",
    descricao: "Árvores que servem de cobertura, obstáculo ou ponto de escalada.",
    imagem: "https://i0.wp.com/media3.giphy.com/media/xTiQyLI5U2jGQOaQ7K/giphy.gif",
    efeito: `
      <p><strong>Estreita</strong> (menos de 1,5m): RD 5, 100 PV. Pode compartilhar o espaço e ganhar cobertura leve.</p>
      <p><strong>Larga</strong> (mais de 1,5m): RD 5, 500 PV. Não pode compartilhar o espaço, mas ganha cobertura leve atrás dela.</p>
      <p>Subir exige <strong>Atletismo CD 15</strong>; equilibrar-se no topo exige <strong>Acrobacia CD 15</strong>. No topo de árvore larga, camuflagem leve contra criaturas no solo.</p>
    `
  },
  {
    categoria: "Terrenos", subcategoria: "Florestas", origem: "Livro Básico",     nome: "Folhagens",
    descricao: "Moitas densas que escondem quem se abaixa nelas.",
    imagem: "https://media.tenor.com/_-VeE9sp4SIAAAAM/homer-bush.gif",
    efeito: `<p>Moitas e arbustos contam como <strong>terreno difícil</strong> e dão camuflagem leve a quem está dentro.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Florestas", origem: "Livro Básico",     nome: "Vegetação Rasteira",
    descricao: "Galhos secos e mato baixo que denunciam quem passa por perto.",
    imagem: "https://media.tenor.com/uGkkfZOUGqYAAAAM/sword-people-are-awesome.gif",
    efeito: `<p>Conta como <strong>terreno difícil</strong> e impõe <strong>–2</strong> em Furtividade (folhas secas e galhos).</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Montanhas", origem: "Livro Básico",     nome: "Abismo",
    descricao: "Fenda profunda no chão, que exige escalada para ser atravessada.",
    imagem: "https://media.tenor.com/wYXyXah_6eYAAAAM/jump-cave.gif",
    efeito: `<p>Fenda com <strong>1d4 x 1,5m</strong> de largura e <strong>2d4 x 3m</strong> de profundidade. Escalar para fora exige <strong>Atletismo CD 20</strong>.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Montanhas", origem: "Livro Básico",     nome: "Altitude",
    descricao: "Ar rarefeito de grandes altitudes, que cansa quem sobe sem se aclimatar.",
    imagem: "https://y.getyarn.io/715292c3-dba0-4b0e-a7d2-5de6ca284b34_text.gif",
    efeito: `<p>No cume, <strong>Fortitude CD 15 +1</strong> por teste anterior, por dia. Falha: fica <strong>fatigado</strong> (ou exausto, se já fatigado) até descer.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Montanhas", origem: "Livro Básico",     nome: "Paredão",
    descricao: "Muralha rochosa vertical, um desafio e tanto para escaladores.",
    imagem: "https://media.tenor.com/HESdUS-VxGgAAAAM/climb-wall-flip-gangsta.gif",
    efeito: `<p>Penhasco vertical, normalmente <strong>2d6 x 3m</strong> de altura. Escalar exige <strong>Atletismo CD 25</strong>.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Montanhas", origem: "Livro Básico",     nome: "Seixos",
    descricao: "Pedregulho solto numa ladeira, que torna o piso ainda mais traiçoeiro.",
    imagem: "https://steemitimages.com/p/FUkUE5bzkAZSUQtscsBsFx5imG6WU3gSfePkK5Gond6i74E7yP1UQG4CFkTy8mmANV9fptD5PYsU8z8jnG7HyRSX4oqrEWCGPuWkUAEFdNLBQwP9aF7ViuJYTVWSe48btr7yfCuNkCyddA2g1tKZRLbQ5C4DSnZg1yBK?mode=fit&format=match",
    efeito: `<p>Em inclinações íngremes cobertas de pedrinhas, a CD para descer correndo/investindo sobe para <strong>15</strong>.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Pântanos", origem: "Livro Básico",     nome: "Lodaçal",
    descricao: "Lama funda que gruda nos pés e deixa a vítima exposta.",
    imagem: "https://media.tenor.com/OWEaaAPh398AAAAM/ambush-camouflage.gif",
    efeito: `<p>Conta como <strong>terreno difícil</strong> e impõe a condição <strong>vulnerável</strong> a quem está dentro.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Planícies", origem: "Livro Básico",     nome: "Trincheira",
    descricao: "Vala ou fosso que protege de ataques à distância.",
    imagem: "https://i.makeagif.com/media/10-02-2016/KDpdVQ.gif",
    efeito: `<p>Dá <strong>cobertura leve</strong> contra ataques à distância. Sair de uma trincheira (ou vala, leito de rio seco) conta como <strong>terreno difícil</strong>.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Ártico", categorias: ["Terrenos", "Clima"], origem: "Livro Básico",     nome: "Gelo",
    descricao: "Superfície congelada e escorregadia, que pode derrubar quem anda depressa.",
    imagem: "https://i.pinimg.com/originals/f2/06/df/f206df0670729df8c22d8378e162a1f5.gif",
    efeito: `<p>Andar à metade do deslocamento não exige teste. Andar normal, correr, investir ou sofrer dano sobre o gelo exige <strong>Acrobacia CD 15</strong> (ou igual ao dano sofrido); falha: cai e desliza <strong>1d4 x 1,5m</strong>.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Ártico", categorias: ["Terrenos", "Clima"], origem: "Livro Básico",     nome: "Rio Congelado",
    descricao: "Rio coberto por uma camada de gelo, que pode ceder sob o peso de quem anda por cima.",
    imagem: "https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUybGRodjVnb3JzbWk2Z3pydmY5ajNtZmczdGlkZjN2MzZ4MWtzc3d4NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kZf3skI372AcynFWtd/giphy.gif",
    efeito: `<p>Como andar sobre gelo. Se o d4 do deslize resultar em <strong>1</strong>, o gelo quebra e a criatura afunda: <strong>1d6</strong> de dano de frio por rodada, precisa nadar para sair (ação de movimento sob um buraco no gelo). Abrir um buraco exige <strong>10</strong> pontos de dano de impacto/fogo.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Ártico", categorias: ["Terrenos", "Clima"], origem: "Ameaças de Arton",     nome: "Rio Congelado (versão expandida)",
    descricao: "Versão mais detalhada do rio congelado, com risco real de afundar sob o gelo quebrado.",
    imagem: "https://media1.tenor.com/m/d1XAJHc_3IYAAAAd/fail-fall.gif",
    efeito: `
      <p>Rio de 9m a 18m de margem a margem. Andar à metade do deslocamento não exige teste; ao normal, correr, investir ou sofrer dano exige <strong>Acrobacia CD 15</strong> (ou igual ao dano sofrido).</p>
      <p>Falha: role <strong>1d4</strong> — em 2, 3 ou 4, desliza esse resultado x1,5m; em <strong>1</strong>, o gelo cede e afunda na água.</p>
      <p>Afundado: <strong>2d4</strong> de dano de frio por rodada; <strong>Atletismo CD 15</strong> para nadar até um buraco e subir, senão é arrastado pela correnteza embaixo do gelo. Abrir um buraco exige <strong>20</strong> pontos de dano de impacto, perfuração ou fogo. Ao sair da água, sofre os efeitos de frio extremo até se aquecer.</p>
    `
  },
  {
    categoria: "Terrenos", subcategoria: "Aquático", origem: "Livro Básico", nome: "Água Corrente",
    descricao: "Correnteza de rio que arrasta quem tenta nadar contra ela.",
    imagem: "https://i.makeagif.com/media/7-10-2018/MWLflZ.gif",
    efeito: `
      <p>Velocidade típica: <strong>1d6 x 3m</strong>/rodada, arrastando quem está na água. <strong>Atletismo CD 15</strong> (correntezas até 9m/rodada) ou <strong>CD 20</strong> (mais rápidas) para nadar.</p>
      <p>Sair de correnteza de 15m+/rodada exige alcançar margem/apoio e <strong>Atletismo CD 20</strong> para se agarrar.</p>
    `
  },
  {
    categoria: "Terrenos", subcategoria: "Aquático", origem: "Livro Básico", nome: "Água Parada",
    descricao: "Lago ou poça tranquila, sem correnteza para atrapalhar quem nada.",
    imagem: "https://i.pinimg.com/originals/a4/5a/1f/a45a1f51e61ff3a132448cd2da769693.gif",
    efeito: `<p>Exige testes normais de Atletismo para nadar, sem modificadores adicionais.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Aquático", origem: "Livro Básico", nome: "Personagens Submersos",
    descricao: "Debaixo d'água, lutar e se mover fica muito mais difícil.",
    imagem: "https://i.imgur.com/1OAT8p5.gif",                                     
    efeito: `
      <p>Não podem falar (nem lançar magias). <strong>–2</strong> em ataques, <strong>–5</strong> em Percepção. Só se movem nadando (Atletismo). Depois de <strong>1 + Constituição</strong> rodadas sem ar, começam a sufocar (<a href="#sufocamento" onclick="event.stopPropagation()">ver Sufocamento</a>).</p>
      <p>Armas à distância não funcionam (exceto arremesso de perfuração, bestas e redes); armas de corte/impacto não-naturais causam <strong>metade do dano</strong>. Ganham camuflagem e cobertura leves contra quem está fora d'água.</p>
    `
  },
  {
    categoria: "Terrenos", subcategoria: "Outros Elementos dos Ermos", origem: "Livro Básico", nome: "Covil",
    descricao: "Toca ou esconderijo de alguma criatura selvagem nos ermos.",
    imagem:"https://media.tenor.com/iqh-stwYQ7MAAAAM/cat-meow.gif",
    efeito: `<p>Percebido com Percepção/Sobrevivência (a última identifica o habitante, CD 15 + ND). <strong>25%</strong> de chance do morador estar ausente (e tesouro desprotegido).</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Outros Elementos dos Ermos", origem: "Livro Básico", nome: "Ruína",
    descricao: "Restos de uma construção antiga, escondendo perigo, tesouro ou os dois.",
    imagem:"https://64.media.tumblr.com/590bc622e9137ce557103d7484351008/34a06fa4380364d6-18/s540x810/61013ebf931de1ee0edb628639d1a99428af8e41.gif",
    efeito: `<p>Ao entrar, role <strong>1d6</strong>: 1-2) só uma ameaça; 3-4) vazia; 5) ameaça e tesouro; 6) só tesouro. Uso pensado para ruínas pequenas — ruínas grandes viram masmorras.</p>`
  },
  {
    categoria: "Terrenos", subcategoria: "Outros Elementos dos Ermos", origem: "Livro Básico", nome: "Santuário",
    descricao: "Pequeno altar dedicado a um deus, que pode abençoar ou amaldiçoar quem o toca.",
    imagem:"https://avatarfiles.alphacoders.com/108/108473.gif",
    efeito: `<p><strong>Religião CD 20</strong> identifica o deus. Tocar santuário do próprio deus patrono dá o efeito de uma magia (1x/dia). Tocar santuário de deus inimigo <strong>amaldiçoa</strong> o personagem até o fim do dia.</p>`
  },

  // ===================== VIAGENS =====================
  {
    categoria: "Viagens",
    origem: "Livro Básico",
    nome: "Regras de Viagem",
    descricao: "Regras para calcular distância, ritmo e suprimentos de uma jornada.",
    imagem: "https://i.makeagif.com/media/1-27-2018/Ho5Zf-.gif",
    efeito: `
      <p><strong>Terreno e Clima:</strong> em terreno difícil (florestas, pântanos...) ou clima ruim (chuva, neblina...) a distância percorrida cai pela <strong>metade</strong> (reduções cumulativas). Sobrevivência pode anular a redução, a critério do mestre.</p>
      <p><strong>Marcha Forçada:</strong> dobra a distância por hora, mas a cada hora exige <strong>Fortitude CD 15 +1</strong> por teste anterior; falha: <strong>1d6</strong> de dano.</p>
      <p><strong>Perdendo-se:</strong> sem estrada/marco, o guia faz <strong>Sobrevivência</strong> por dia ou o grupo se perde e segue direção aleatória. 1x/dia cada personagem pode tentar <strong>Sobrevivência (CD 20 –1 por dia perdido)</strong> para se reorientar.</p>
      <p><strong>Suprimentos:</strong> Sobrevivência para encontrar comida/água; Fortitude para resistir à fome e sede quando o suprimento é escasso.</p>
      <table class="table table-sm">
        <thead><tr><th>Deslocamento</th><th>Por hora</th><th>Por dia</th></tr></thead>
        <tbody>
          <tr><td>4,5m</td><td>2,25km</td><td>18km</td></tr>
          <tr><td>6m</td><td>3km</td><td>24km</td></tr>
          <tr><td>7,5m</td><td>3,75km</td><td>30km</td></tr>
          <tr><td>9m</td><td>4,5km</td><td>36km</td></tr>
          <tr><td>12m</td><td>6km</td><td>48km</td></tr>
        </tbody>
      </table>
    `
  },

  // ===================== PERIGOS AMBIENTAIS (efeitos gerais) =====================
  { categoria: "Perigos Ambientais", origem: "Livro Básico", nome: "Ácido",
    descricao: "Poça ou nuvem de ácido que corrói a pele de quem entra em contato.",
    imagem:"https://i.makeagif.com/media/10-03-2016/OFhH1u.gif",
    efeito: `<p><strong>1d6</strong> de dano por rodada de exposição. Imersão total: <strong>10d6</strong>/rodada, com <strong>1 rodada adicional</strong> de dano persistente ao sair.</p>` },
  { categoria: "Perigos Ambientais", origem: "Livro Básico", nome: "Areia Movediça",
    descricao: "Areia instável que suga quem pisa nela e pode afogá-lo por completo.",
    imagem:"https://gifdb.com/images/thumbnail/disenchanment-animation-quicksand-1vz05kowyad6a621.gif",
    efeito: `<p><strong>Sobrevivência CD 25</strong> para notar. Quem entra fica <strong>agarrado</strong>; após 1 rodada agarrado, submerge (<a href="#sufocamento" onclick="event.stopPropagation()">ver Sufocamento</a>). Escapar: ação completa + <strong>Atletismo CD 25</strong>; falha por 5+: fatigado (ou pior). Aliados de fora podem ajudar no teste.</p>` },
  { categoria: "Perigos Ambientais", origem: "Livro Básico", nome: "Escuridão Leve",
    descricao: "Penumbra que dificulta enxergar claramente a distância.",
    imagem:"https://giffiles.alphacoders.com/257/2578.gif",
    efeito: `<p>Penumbra (noite enluarada, cantos afastados de postes). Dá <strong>camuflagem leve</strong>.</p>` },
  { categoria: "Perigos Ambientais", origem: "Livro Básico", nome: "Escuridão Total",
    descricao: "Trevas completas, sem nenhuma fonte de luz.",
    imagem:"https://giffiles.alphacoders.com/917/91713.gif",
    efeito: `<p>Breu completo, sem luz. Dá <strong>camuflagem total</strong>.</p>` },
  { categoria: "Perigos Ambientais", categorias: ["Perigos Ambientais", "Clima"], origem: "Livro Básico", nome: "Fogo",
    descricao: "Chamas abertas que incendeiam quem se aproxima demais.",
    imagem:"https://media.tenor.com/0y8yGK559cAAAAAM/flames-twin.gif",
    efeito: `<p>Exposição exige <strong>Reflexos CD 15</strong>; falha: fica em chamas, <strong>1d6</strong>/rodada até apagar (ação padrão ou imersão em água). Fogo instantâneo (magias como Bola de Fogo) não incendeia.</p>` },
  { categoria: "Perigos Ambientais", origem: "Livro Básico", nome: "Fome e Sede",
    descricao: "Privação prolongada de comida ou água, que vai debilitando o corpo aos poucos.",
    imagem:"https://media.tenor.com/iw5o7VV16rEAAAAM/hungry-panda.gif",
    efeito: `<p>1 dia sem consequência. Depois, <strong>Fortitude CD 15 +1</strong> por teste anterior por dia: 1ª falha fatigado, 2ª exausto, 3ª inconsciente, 4ª letal. Só cura com comida/bebida (efeito de metabolismo).</p>` },
  { categoria: "Perigos Ambientais", origem: "Livro Básico", nome: "Fumaça",
    descricao: "Nuvem de fumaça espessa que sufoca e embaça a visão de quem está dentro.",
    imagem:"https://i.pinimg.com/originals/a6/b7/9d/a6b79ddbd73ebfb5dc54e442f4ebd77c.gif",
    efeito: `<p>Imerso em fumaça densa: <strong>Fortitude CD 10 +1</strong> por teste anterior, por turno; falha: perde o turno tossindo; duas falhas seguidas: <strong>1d6</strong> de dano (metabolismo). Dá camuflagem leve.</p>` },
  { categoria: "Perigos Ambientais", origem: "Livro Básico", nome: "Lava",
    descricao: "Rocha derretida escaldante, letal ao contato.",
    imagem:"https://media.tenor.com/5uGCtlnH_3wAAAAM/squidward-the-floor-is-lava.gif",    
    efeito: `<p><strong>2d6</strong> de dano de fogo por rodada de exposição direta. Imersão total: <strong>20d6</strong>/rodada, com 1 rodada adicional de dano persistente.</p>` },
  { categoria: "Perigos Ambientais", categorias: ["Perigos Ambientais", "Terrenos"], origem: "Livro Básico", nome: "Queda",
    descricao: "Tombo de uma certa altura, cujo dano cresce com a distância caída.",
    imagem:"https://media.tenor.com/gS_8S0YcCzEAAAAM/kratos-falling-minecraft-meme.gif",    
    efeito: `<p><strong>1d6</strong> de dano de impacto por 1,5m, até <strong>40d6</strong> (60m). Cair na água reduz o dano em 6m (–4d6). Objeto pesado caindo sobre alguém: mesma proporção (dobrado se muito pesado).</p>` },
  { categoria: "Perigos Ambientais", origem: "Livro Básico", nome: "Sono",
    descricao: "Privação de sono, que aos poucos deixa a vítima exausta e vulnerável.",
    imagem:"https://media.tenor.com/0WwPx5h_mZYAAAAM/gintoki-no-sleep.gif",
    efeito: `<p>1 noite sem dormir sem problema (mas não recupera PV/PM). Depois, <strong>Fortitude CD 15 +1</strong> por teste anterior, por dia sem dormir: falha = fatigado → exausto → inconsciente (só acorda após 8h de sono).</p>` },
  { categoria: "Perigos Ambientais", origem: "Livro Básico", nome: "Sufocamento",
    descricao: "Falta de ar, seja por afogamento ou ambiente sem oxigênio.",
    imagem:"https://i.pinimg.com/originals/ae/b4/20/aeb42019b0409b98aed663f35b613828.gif",    
    efeito: `<p>Prende a respiração por <strong>1 + Constituição</strong> rodadas. Depois, <strong>Fortitude CD 15 +1</strong> por teste anterior, por rodada; falha: inconsciente e <strong>1d6</strong> PV/rodada até respirar ou morrer (metabolismo).</p>` },
  { categoria: "Fenômenos Rubros", categorias: ["Perigos Ambientais", "Clima"], origem: "Livro Básico", nome: "Tormenta",
    descricao: "Efeito de estar em território tomado pela Tormenta, que corrompe corpo e mente aos poucos.",
    imagem:"https://media1.tenor.com/m/Jwt6qkC_SdkAAAAd/anime-kaifuku.gif",
    efeito: `
      <p>Ao entrar em área de Tormenta, fica <strong>frustrado</strong> automaticamente. No início de cada dia, <strong>Vontade CD 25 + 2</strong> por dia consecutivo anterior; falha: esmorecido → confuso → insano (personagem vira NPC maligno do mestre).</p>
      <p>Habilidades com custo em PM custam <strong>+2 PM</strong>; itens mágicos perdem um encantamento (à escolha do portador); recuperação de PV/PM por descanso cai à metade. Lefeu e lefou são imunes.</p>
    `
  },
  { categoria: "Perigos Ambientais", origem: "Ameaças de Arton", nome: "Ar Saturado",
    descricao: "Ar denso e opressivo, típico das terras devastadas pela Tormenta.",
    imagem:"https://media1.tenor.com/m/EptD4idr4NYAAAAd/durarara-celty-sturluson.gif",
    efeito: `<p><strong>Fortitude CD 15</strong> por dia de exposição; falha: alquebrado e fatigado (metabolismo). Na área, calor/frio causam <strong>+1d6</strong> de dano extra e descanso é sempre uma categoria pior.</p>` },
  { categoria: "Perigos Ambientais", origem: "Ameaças de Arton", nome: "Área Desencantada",
    descricao: "Região onde a magia se torna instável e mais custosa de manter.",
    imagem:"https://i.pinimg.com/originals/b4/57/92/b45792fb02884e80384b0d4eea5a0e99.gif",
    efeito: `<p>Custo em PM de habilidades/efeitos aumenta <strong>+1</strong>; recuperação de PM por descanso é sempre <strong>ruim</strong>, independente de outros fatores.</p>` },
  { categoria: "Perigos Ambientais", origem: "Ameaças de Arton", nome: "Dejetos Alquímicos",
    descricao: "Resíduo de poções descartadas, perigoso para quem encosta nele.",
    imagem:"https://media.tenor.com/goL67UzQb24AAAAM/futurama-toxic-waste.gif",
    efeito: `<p>Área de ~3m com resíduos de poções. Contato: <strong>4d4</strong> de dano de ácido + 1 condição aleatória por 1 dia (1d6: abalado/alquebrado/cego/enjoado/fatigado/lento); <strong>Fortitude CD 20</strong> reduz o dano à metade e evita a condição.</p>` },
  { categoria: "Perigos Ambientais", origem: "Ameaças de Arton", nome: "Eletricidade",
    descricao: "Corrente elétrica exposta que choca e paralisa quem a toca.",
    imagem:"https://gifdb.com/images/thumbnail/homer-simpson-electrocuted-with-coke-cans-dloamtsa2us3ctwo.gif",
    efeito: `<p>Contato por rodada: <strong>2d6</strong> de dano e atordoado por 1 rodada (<strong>Fortitude CD 20</strong> reduz à metade e evita a condição; criatura molhada/com armadura de metal sofre –5). Dados de dano no valor máximo rolam um dado adicional.</p>` },
  { categoria: "Perigos Ambientais", origem: "Ameaças de Arton", nome: "Lodo Negro",
    descricao: "Substância mortal ligada a Ragnar, letal até em pequena quantidade.",
    imagem:"https://i.pinimg.com/originals/e0/b3/34/e0b3348eb097fdbb0b5dc72c8895a498.gif",
    efeito: `<p>Essência de Ragnar. Contato: <strong>Fortitude CD 35</strong> por rodada — sucesso: perde <strong>10d12</strong> PV; falha: perde os PV normalmente ou fica com PV em –10 (o pior). Imersão total mata instantaneamente, sem teste. Atravessa barreiras sólidas; não pode ser armazenado.</p>` },

  // ===================== ARMADILHAS =====================
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "1/4", nome: "Agulha Envenenada",
    descricao: "Armadilha simples que injeta veneno em quem a aciona.",
    imagem: "https://media1.tenor.com/m/Mf_L0XtoraMAAAAd/injection-poison.gif",
    efeito: `<p>1 dano de perfuração + perde 1d12 PV por veneno; Reflexos CD 20 evita; Investigação CD 25 / Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "1/4", nome: "Arame Farpado",
    descricao: "Fios cortantes escondidos no caminho, difíceis de atravessar sem se ferir.",
    imagem: "https://i.ibb.co/DDM7G6TM/b19z1z.gif",
    efeito: `<p>Terreno difícil + 1d6+2 de dano de corte a quem atravessa; Investigação CD 10 / Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "1/4", nome: "Fosso Camuflado",
    descricao: "Buraco disfarçado no chão que faz a vítima cair.",
    imagem: "https://media.tenor.com/iRbA_mS95asAAAAM/cope-bird.gif",
    efeito: `<p>Queda de 3m: 2d6 de dano de impacto (Atletismo CD 20 para sair); Reflexos CD 20 evita; Investigação/Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "1/4", nome: "Rede",
    descricao: "Rede que cai sobre a vítima e a prende no lugar.",
    imagem: "https://media1.tenor.com/m/dO4weEfiTAAAAAAd/net-dropping-frank-raymond.gif",
    efeito: `<p>Fica agarrado (ação completa + Acrobacia CD 20 para escapar); Reflexos CD 20 evita; Investigação/Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "1/4", nome: "Virote",
    descricao: "Mecanismo que dispara uma flecha ou dardo automaticamente.",
    imagem: "https://64.media.tumblr.com/f424558a78eebd237f8d4e47d8e78b70/tumblr_oywq9vGf9X1qmob6ro1_500.gif",
    efeito: `<p>1d10+2 de dano de perfuração; Reflexos CD 20 evita; Investigação CD 25 / Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "1/2", nome: "Fosso Profundo",
    descricao: "Versão mais funda do fosso camuflado, com queda mais perigosa.",
    imagem: "https://media.tenor.com/QI5aB9J8uWkAAAAM/marina-ruy-barbosa-buraco.gif",
    efeito: `<p>Queda de 6m: 4d6 de dano de impacto (Atletismo CD 20 para sair); Reflexos CD 20 evita; Investigação/Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "1/2", nome: "Lâmina na Parede",
    descricao: "Lâmina escondida que se projeta da parede ao ser acionada.",
    imagem: "https://y.getyarn.io/662422e4-8fe4-4f34-b365-8818fa73c004_text.gif",    
    efeito: `<p>2d6+5 de dano de corte; Reflexos CD 20 evita; Investigação CD 25 / Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "1", nome: "Bloco de Pedra",
    descricao: "Bloco pesado que despenca sobre quem passa por baixo.",
    imagem: "https://static.wixstatic.com/media/108448_1c6300fde2834f1bb4ec55121c9bc62b~mv2.gif",
    efeito: `<p>6d6 de dano de impacto; Reflexos CD 20 evita; Investigação/Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "1", nome: "Pêndulo de Teto",
    descricao: "Lâmina que balança do teto, cortando quem estiver no caminho.",
    imagem: "https://media.moddb.com/images/games/1/41/40291/swingingAxes2.gif",
    efeito: `<p>1d12+10 de dano de corte; Reflexos CD 25 evita; Investigação CD 25 / Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "2", nome: "Fosso com Estacas",
    descricao: "Fosso camuflado com estacas afiadas no fundo.",
    imagem: "https://media.tenor.com/O78-UpBZGCQAAAAM/gwent-gwentcard.gif",
    efeito: `<p>Queda de 9m: 6d6 de impacto + estacas 2d4+5 de perfuração (Atletismo CD 20 para sair); Reflexos CD 20 evita; Investigação/Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "2", nome: "Runa de Proteção",
    descricao: "Símbolo mágico que explode em energia elemental ao ser ativado.",
    imagem:"https://media.giphy.com/media/L0xPxPJfYEtfmjuZdO/giphy.gif",
    efeito: `<p>6d6 de dano elemental (à escolha) em criaturas a até 3m; Reflexos CD 20 reduz à metade (quem ativou não tem direito); Investigação/Ladinagem CD 25.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "2", nome: "Símbolo do Medo",
    descricao: "Runa que enche de terror quem a ativa.",
    imagem: "https://i.makeagif.com/media/2-04-2023/0m81RS.gif",
    efeito: `<p>Criaturas em alcance curto ficam abaladas até o fim da cena; Vontade CD 20 evita; Investigação/Ladinagem CD 25.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "3", nome: "Estátua Executora",
    descricao: "Estátua armadilhada que golpeia com lâminas escondidas.",
    imagem: "https://media.tenor.com/9nOFCp6-XbMAAAAM/doctor-who-weeping-angel.gif",  
    efeito: `<p>1d12+10 + 1d12+10 de dano de corte (dois Reflexos CD 25, um para cada dano); Investigação/Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "3", nome: "Gás Venenoso",
    descricao: "Armadilha que libera uma nuvem tóxica ao ser ativada.",
    imagem: "https://64.media.tumblr.com/7b161ceb8017dd3304375cd153caf37c/tumblr_n6xr8qGNgP1rrkahjo1_400.gif",
    efeito: `<p>Perde 1d12 PV por veneno por rodada durante 2d4 rodadas; Fortitude CD 20 reduz à metade; Investigação/Ladinagem CD 25.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "3", nome: "Símbolo do Sono",
    descricao: "Runa que faz adormecer instantaneamente quem a aciona.",
    imagem: "https://giffiles.alphacoders.com/212/212080.gif",
    efeito: `<p>Criaturas de nível 8 ou menos em alcance curto caem inconscientes (como Sono); Vontade CD 20 evita; Investigação/Ladinagem CD 25.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "4", nome: "Parede Instável",
    descricao: "Trecho de parede ou teto prestes a desabar.",
    imagem: "https://i.makeagif.com/media/10-22-2015/3jE2O1.gif",
    efeito: `<p>8d6 de dano de impacto num quadrado de 3m; Reflexos CD 25 reduz à metade; Investigação/Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "4", nome: "Símbolo da Dor",
    descricao: "Runa que causa uma dor incapacitante em quem a ativa.",
    imagem: "https://i.pinimg.com/originals/5a/08/cb/5a08cb0f9422f189805ecf07562d98cc.gif",  
    efeito: `<p>–5 em todos os testes até o fim da cena; Fortitude CD 25 evita; Investigação/Ladinagem CD 30.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "5", nome: "Bruma da Insanidade",
    descricao: "Névoa mágica que enlouquece temporariamente quem a respira.",
    imagem: "https://i.pinimg.com/originals/05/85/24/058524a397c38ebcc3f08f293fc80ac9.gif",
    efeito: `<p>Criaturas em cubo de 6m ficam confusas até o fim da cena; Fortitude CD 20 evita; Investigação/Ladinagem CD 25.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "5", nome: "Símbolo do Atordoamento",
    descricao: "Runa que atordoa violentamente quem a ativa.",
    imagem: "https://static.wikia.nocookie.net/assassinationclassroom/images/f/f6/Nagisa%27s_Nekodamashi.gif",
    efeito: `<p>Atordoado por 1d6 rodadas em alcance curto; Fortitude CD 25 evita; Investigação/Ladinagem CD 30.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "6", nome: "Desabamento do Teto",
    descricao: "Parte da estrutura desaba sobre a área, esmagando quem estiver embaixo.",
    imagem: "https://i.imgur.com/15NIpbl.gif",
    efeito: `<p>15d6 de dano de impacto num quadrado de 6m; Reflexos CD 30 reduz à metade; Investigação/Ladinagem CD 25.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "6", nome: "Símbolo da Insanidade",
    descricao: "Runa que corrompe a mente de forma permanente.",
    imagem: "https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyMHNmb3oxd2pidXFwMnZwajF4YmN4cGszYWJ5cm82MjhpOW45cWxmOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/BbJdwrOsM7nTa/giphy-downsized.gif",
    efeito: `<p>Confusão permanente em alcance curto; Vontade CD 25 evita; Investigação/Ladinagem CD 30.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "8", nome: "Abismo da Morte",
    descricao: "Fosso profundo e mortal, forrado de estacas no fundo.",
    imagem: "https://i.pinimg.com/originals/5e/32/d1/5e32d16157549e4be0245ecd7a893caf.gif",
    efeito: `<p>Queda de 30m sobre estacas: 20d6 de impacto + 2d8+10 de perfuração (Atletismo CD 25 para sair); Reflexos CD 30 evita; Investigação/Ladinagem CD 30.</p>` },
  { categoria: "Armadilhas", origem: "Livro Básico", nd: "8", nome: "Símbolo da Morte",
    descricao: "A mais letal das runas, capaz de matar instantaneamente.",
    imagem:"https://i.makeagif.com/media/2-21-2017/po8R1Z.gif",
    efeito: `<p>Reduz a –1 PV em alcance curto; Fortitude CD 30 reduz para 10d6 de dano de trevas; Investigação/Ladinagem CD 30.</p>` },
  { categoria: "Armadilhas", origem: "Ameaças de Arton", nd: "1/2", nome: "Armadilha de Gaiola",
    descricao: "Mecanismo que prende a vítima dentro de uma gaiola.",
    imagem: "https://media.tenor.com/L0nzBi_dQv4AAAAM/trap-cats.gif",
    efeito: `<p>Prende a criatura numa gaiola de 1,5m (Força/Ladinagem CD 25 para abrir ou quebrar as grades: RD 10, 60 PV); Investigação CD 20 / Ladinagem CD 25.</p>` },
  { categoria: "Armadilhas", origem: "Ameaças de Arton", nd: "1", nome: "Runa de Aceleração",
    descricao: "Runa que arremessa a vítima com violência para longe.",
    imagem: "https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUyNjM0Y3Fud2toMXVzNXNlcGptbXY2dW81eGk3MWZ6dWs4MXRzNm9heSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5XvhZSJHr8wOk/source.gif",
    efeito: `<p>Arremessa a criatura 9m na direção que se movia; colisão causa 1d6 de impacto por 1,5m; Fortitude CD 20 reduz a distância à metade; Investigação/Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Ameaças de Arton", nd: "2", nome: "Gás Pútrido",
    descricao: "Gás nauseante liberado por um mecanismo escondido.",
    imagem:"https://i.makeagif.com/media/10-09-2024/LcCZLP.gif",
    efeito: `<p>Enjoado por uma cena em alcance curto; Fortitude CD 20 reduz para 1d4 rodadas; Investigação/Ladinagem CD 25.</p>` },
  { categoria: "Armadilhas", origem: "Ameaças de Arton", nd: "2", nome: "Piso Eletrificado",
    descricao: "Trecho do chão que choca quem pisa nele.",
    imagem:"https://i.pinimg.com/originals/26/21/c5/2621c5be81ffc0b0264c3b5110f419e7.gif",
    efeito: `<p>6d6 de dano de eletricidade num quadrado de 3m; Fortitude CD 20 reduz à metade (–5 se molhado/armadura de metal); Investigação CD 25 / Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Ameaças de Arton", nd: "3", nome: "Jato de Chamas",
    descricao: "Labareda disparada por um mecanismo escondido na parede ou no chão.",
    imagem:"https://media1.tenor.com/m/r6SiwZxivQoAAAAd/alone-fire.gif",
    efeito: `<p>6d6 de dano de fogo + fica em chamas, numa linha de 6m; Reflexos CD 25 reduz à metade e evita a condição; Investigação/Ladinagem CD 25.</p>` },
  { categoria: "Armadilhas", origem: "Ameaças de Arton", nd: "5", nome: "Extrato de Oxxdon",
    descricao: "Substância alquímica que enferruja e destrói metais rapidamente.",
    imagem: "https://media1.tenor.com/m/SxnPBnUsOmEAAAAd/zoro-sword-rust-one-piece.gif",
    efeito: `<p>Objetos de metal num raio de 3m oxidam e são destruídos; construtos de metal perdem 4d12 PV e ficam exaustos até reparo; Reflexos CD 25 evita destruição de itens; Fortitude CD 25 reduz efeito em construtos; Investigação/Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Ameaças de Arton", nd: "5", nome: "Mina Terrestre",
    descricao: "Explosivo escondido sob o chão, ativado por pressão.",
    imagem: "https://i.imgflip.com/397jj3.gif",
    efeito: `<p>12d6 de dano de impacto numa esfera de 3m; Reflexos CD 25 evita; Investigação/Ladinagem CD 25.</p>` },
  { categoria: "Armadilhas", origem: "Ameaças de Arton", nd: "5", nome: "Runa de Teletransporte",
    descricao: "Runa que transporta a vítima para outro lugar, geralmente uma prisão.",
    imagem: "https://media.tenor.com/p16UWvoiHHUAAAAM/teleportation-number-five.gif",
    efeito: `<p>Transporta a criatura (até 3m) para superfície sólida desocupada em alcance médio (geralmente uma prisão); Vontade CD 20 evita; Investigação CD 25 / Ladinagem CD 20.</p>` },
  { categoria: "Armadilhas", origem: "Ameaças de Arton", nd: "5", nome: "Símbolo da Anulação",
    descricao: "Runa que anula magias e desencanta itens próximos.",
    imagem: "https://media1.tenor.com/m/VE40mSXP7jQAAAAd/dispel-magic-d%26d-5e-spell.gif",
    efeito: `<p>Dissipa magias em alcance curto e torna itens mágicos mundanos; Investigação/Ladinagem CD 25 (ND 5).</p>` },
  { categoria: "Armadilhas", origem: "Ameaças de Arton", nd: "9", nome: "Estátua de Górgona",
    descricao: "Estátua armadilhada que petrifica quem estiver à sua frente.",
    imagem: "https://i.makeagif.com/media/10-31-2014/XGcJhB.gif",
    efeito: `<p>Petrifica criaturas num cone de 9m à frente; Reflexos CD 25 evita; Investigação/Ladinagem CD 25.</p>` },
  { categoria: "Armadilhas", origem: "Ameaças de Arton", nd: "10", nome: "Runa de Desintegração",
    descricao: "Runa avançada, capaz de desintegrar completamente sua vítima.",
    imagem: "https://media1.tenor.com/m/EnkVDrFxg7oAAAAd/meme-vaporized.gif",
    efeito: `<p>10d12 de dano de essência em alcance curto; Fortitude CD 30 reduz para 2d12; se os PV chegarem a 0 ou menos, a criatura é desintegrada (só resta pó); Investigação/Ladinagem CD 30.</p>` },
  { categoria: "Armadilhas", origem: "Ameaças de Arton", nd: "13", nome: "Sussurro de Sszzaas",
    descricao: "Armadilha psíquica que vira a vítima contra seus próprios aliados.",
    imagem: "https://media.tenor.com/4YWkTbA2-tgAAAAM/pointing-traitor.gif",  
    efeito: `<p>A vítima passa a ver aliados como inimigos e é forçada a agir contra eles; Vontade CD 30 evita (pode repetir ao fim de cada rodada); Investigação/Ladinagem CD 30. <em>Encantamento.</em></p>` },

  // ===================== DOENÇAS =====================
  { categoria: "Doenças", origem: "Livro Básico", nome: "Calafrio Diabólico",
    descricao: "Doença sobrenatural transmitida por contato, de origem infernal.",
    imagem:"https://i.pinimg.com/originals/db/f4/5b/dbf45b32930595173f177258ac107433.gif",
    efeito: `<p>Contato, CD 25. Progressão: fraca → debilitada → inconsciente → morre.</p>` },
  { categoria: "Doenças", origem: "Livro Básico", nome: "Febre do Riso",
    descricao: "Doença respiratória que deixa a vítima com o julgamento cada vez mais confuso.",
    imagem:"https://i.makeagif.com/media/11-03-2015/XV7zZO.gif",
    efeito: `<p>Inalação, CD 20. Progressão (no início de cada cena): frustrada → esmorecida → confusa.</p>` },
  { categoria: "Doenças", origem: "Livro Básico", nome: "Febre Mental",
    descricao: "Doença respiratória que corrói lentamente a sanidade da vítima.",
    imagem:"https://gifdb.com/images/thumbnail/eri-sick-hospital-anime-l5h292m30ps3f77o.gif",
    efeito: `<p>Inalação, CD 20. Progressão: frustrada → esmorecida → alquebrada.</p>` },
  { categoria: "Doenças", origem: "Livro Básico", nome: "Infecção do Esgoto",
    descricao: "Infecção comum, contraída em esgotos e lugares insalubres.",
    imagem:"https://i.ibb.co/mV7zfPfp/b1dhff.gif",
    efeito: `<p>Contato, CD 15. Progressão: fraca → debilitada.</p>` },
  { categoria: "Doenças", origem: "Livro Básico", nome: "Maldição Pegajosa",
    descricao: "Doença mágica de cura difícil, que drena a vida aos poucos.",
    imagem:"https://i.ibb.co/qYxHYn2r/b1di8n.gif",
    efeito: `<p>Contato, CD 20 (precisa de 3 sucessos seguidos para curar). Progressão: perde 1d12 PV → 2d12 PV → 4d12 PV.</p>` },
  { categoria: "Doenças", origem: "Livro Básico", nome: "Moléstia Demoníaca",
    descricao: "Doença de origem infernal que corrói corpo e atributo até matar.",
    imagem:"https://i.makeagif.com/media/12-26-2022/lmHAJI.gif",
    efeito: `<p>Contato, CD 20. Progressão: perde 1d12 PV → 2d12 PV → perde 1 de Constituição* → morre.</p>` },
  { categoria: "Doenças", origem: "Livro Básico", nome: "Tremores",
    descricao: "Doença que deixa a vítima com tremores incontroláveis.",
    imagem:"https://media.tenor.com/E0CudqG7DKYAAAAM/cold-cool.gif",
    efeito: `<p>Contato, CD 15. Efeito: vulnerável.</p>` },
  { categoria: "Doenças", origem: "Livro Básico", nome: "Varíola",
    descricao: "Doença clássica, transmitida pelo ar, que desfigura e enfraquece.",
    imagem:"https://media.tenor.com/gEWH8FSyrhwAAAAM/grand-blue-puke.gif",
    efeito: `<p>Inalação, CD 20. Progressão: enjoada → debilitada → perde 1 de Carisma* → morre.</p>` },
  { categoria: "Doenças", origem: "Ameaças de Arton", nome: "Alergia Elemental",
    descricao: "Condição que torna a vítima extra sensível a um tipo de energia elemental.",
    imagem:"https://i.gifer.com/7UlM.gif",  
    efeito: `<p>Contato e Ingestão, CD 25 (uma versão por tipo de energia). Progressão: vulnerável ao tipo de energia → perde 1 PM ao sofrer dano desse tipo → sofre também uma condição conforme o elemento (ácido: vulnerável; eletricidade: ofuscado; fogo: em chamas; frio: lento; luz: cego; trevas: cura pela metade).</p>` },
  { categoria: "Doenças", origem: "Ameaças de Arton", nome: "Doença de Descompressão Etérea",
    descricao: "Mal contraído por contato com planos etéreos instáveis, que drena a energia mágica.",
    imagem:"https://i.makeagif.com/media/11-29-2017/d66kjD.gif",
    efeito: `<p>Contato, CD 20. Progressão: esmorecida → perde 2d10 PM (não recuperáveis até curar).</p>` },
  { categoria: "Doenças", origem: "Ameaças de Arton", nome: "Febre do Carniçal",
    descricao: "Doença que, se não tratada, transforma o morto em um carniçal.",
    imagem:"https://gifdb.com/images/branded/high/scooby-doo-sick-fever-gb48civkll2qyvzr.gif",
    efeito: `<p>Contato, CD 15. Progressão: fraca → enjoada → morre (retorna como carniçal à meia-noite seguinte).</p>` },
  { categoria: "Doenças", origem: "Ameaças de Arton", nome: "Febre Necrótica",
    descricao: "Doença fatal que ressuscita a vítima como um zumbi.",
    imagem:"https://media1.tenor.com/m/dmakd4fZFsMAAAAd/zoro-rust-fruit-one-piece.gif",
    efeito: `<p>Contato, CD 20. Progressão: fraca → debilitada → morre (retorna como zumbi 3 dias depois).</p>` },
  { categoria: "Doenças", origem: "Ameaças de Arton", nome: "Gripe do Fluxo",
    descricao: "Doença que atrapalha o controle sobre a própria magia.",
    imagem:"https://media1.tenor.com/m/5IqebOP-PmgAAAAd/bruno-bucciarati-giorno-giovanna.gif",
    efeito: `<p>Inalação, CD 25. Progressão: esmorecida → não sustenta magias até curar → perde 1 de Sabedoria*.</p>` },
  { categoria: "Doenças", origem: "Ameaças de Arton", nome: "Infecção Escarlate",
    descricao: "Doença que mata e depois ressuscita a vítima como um infecto.",
    imagem:"https://i.ibb.co/8LYSGsXc/animesher-com-ikoma-koutetsujoi-no-kabaneiru-gif-1440294.gif",
    efeito: `<p>Contato, CD 20. Progressão: perde 1d12 PV → 2d12 PV → perde 1 de Carisma* → morre (retorna como infecto no dia seguinte).</p>` },
  { categoria: "Doenças", origem: "Ameaças de Arton", nome: "Náusea Antinatural",
    descricao: "Doença que faz a vítima expelir criaturas infernais de dentro do próprio corpo.",
    imagem:"https://i.ibb.co/yF1ZTP3Q/b1dnfw.gif",
    efeito: `<p>Contato, CD 25. Progressão: perde 1d4 PM e 1d12 PV → 2d4 PM e 2d12 PV → expele um enxame infernal e o ciclo reinicia. PM/PV perdidos só voltam com a doença curada.</p>` },
  { categoria: "Doenças", origem: "Ameaças de Arton", nome: "Podridão da Múmia",
    descricao: "Maldição-doença, só curável por magia, que apodrece o corpo aos poucos.",
    imagem:"https://i.makeagif.com/media/11-03-2015/06s9al.gif",
    efeito: `<p>Contato, CD 20 (só cura por meios mágicos; passar no teste apenas impede a progressão). Progressão: lenta → fatigada → exausta → perde 1 de Constituição* → morre.</p>` },
  { categoria: "Doenças", origem: "Ameaças de Arton", nome: "Praga Coral",
    descricao: "Doença raríssima e quase incurável, que corrói os atributos físicos da vítima.",
    imagem:"https://i.ibb.co/jZMDxvpb/b1dp70.gif",
    efeito: `<p>Contato e Inalação, CD 35 (sem cura conhecida; passar no teste ou curar doenças só impede a progressão naquele dia). Progressão: fraca → debilitada → debilitada + perde 1 de Força, Constituição e Carisma (cumulativo, reversível só com Desejo/Intervenção Divina). Se algum atributo chegar a –5, vira monstro do mestre.</p>` },
  { categoria: "Doenças", origem: "Ameaças de Arton", nome: "Pulmão em Brasa",
    descricao: "Doença respiratória que termina numa explosão fatal de fogo nos pulmões.",
    imagem:"https://gifdb.com/images/branded/high/spicy-flamethrower-fire-anime-megumi-tadakoro-cyoh7ex5wsipnnyi.gif",
    efeito: `<p>Inalação, CD 20. Progressão: fatigada → exausta → morre numa explosão (6d6 de fogo num raio de 3m).</p>` },
  { categoria: "Doenças", origem: "Ameaças de Arton", nome: "Rinite Feérica",
    descricao: "Doença de origem feérica que deixa a vítima mais vulnerável a efeitos mágicos.",
    imagem:"https://i.makeagif.com/media/3-07-2019/hHWuUq.gif",
    efeito: `<p>Inalação, CD 20. Progressão: vulnerável a magia → vulnerável e alquebrada → além dos anteriores, enjoada por 1 rodada sempre que sofre efeito mágico.</p>` },
  { categoria: "Doenças", origem: "Ameaças de Arton", nome: "Tremedeira Desastrada",
    descricao: "Doença que deixa as mãos trêmulas, arriscando derrubar armas em combate.",
    imagem:"https://media.tenor.com/nGkSLnewVhAAAAAM/kaguya-kaguya-shinomiya.gif",
    efeito: `<p>Inalação, CD 20. Progressão: fatigada → exausta → exausta + 25% de chance de derrubar a arma a cada ataque.</p>` },

  // ===================== FENÔMENOS RUBROS =====================
  {
    categoria: "Fenômenos Rubros", origem: "Ameaças de Arton", nome: "Fenômenos Rubros (regra geral)",
    descricao: "Tabela de fenômenos aleatórios que assolam viajantes em território tomado pela Tormenta.",
    imagem: "https://i.makeagif.com/media/10-27-2015/rB6H8p.gif",
    efeito: `
      <p>A cada hora de viagem em área de Tormenta, role <strong>1d8</strong>: 1) Caos de Sangue; 2) Neblina Venenosa; 3) Labaredas Infernais; 4) Chuva Ácida; 5) Temperaturas Implacáveis; 6) Tempestade Elétrica; 7) Pesadelos Reais; 8) Nenhum fenômeno.</p>
      <p><strong>Conhecimento ou Sobrevivência CD 35</strong> identifica o fenômeno com 1 rodada de antecedência. As distâncias/áreas dos fenômenos são vagas e não seguem a realidade normal — fugir do local não evita o efeito. Os efeitos ignoram imunidades, exceto imunidades específicas contra a Tormenta.</p>
    `
  },
  { categoria: "Fenômenos Rubros", origem: "Ameaças de Arton", nome: "Caos de Sangue",
    descricao: "Fenômeno raro em que dois efeitos da Tormenta acontecem ao mesmo tempo.",
    imagem: "https://64.media.tumblr.com/25899ba049cbcbb2f22b1218ad0a0d2a/tumblr_nt773j3Zv81uz35lto1_500.gif",
    efeito: `<p>Role <strong>duas vezes</strong> na tabela usando 1d6+1 no lugar do 1d8. Resultados iguais são cumulativos.</p>` },
  { categoria: "Fenômenos Rubros", origem: "Ameaças de Arton", nome: "Chuva Ácida",
    descricao: "Chuva corrosiva que queima a pele de quem é pego por ela.",
    imagem: "https://i.ibb.co/pjzPfXR5/b1gb3v.gif",
    efeito: `<p>Dura 2d4 rodadas; no início de cada rodada, <strong>4d8</strong> de dano de ácido (persiste 1 rodada extra após se abrigar ou a chuva acabar).</p>` },
  { categoria: "Fenômenos Rubros", origem: "Ameaças de Arton", nome: "Labaredas Infernais",
    descricao: "Explosões de fogo infernal que atingem aleatoriamente quem está na área.",
    imagem: "https://i.pinimg.com/originals/50/6e/9b/506e9b48b067d33ba3e6c949e6e94ef6.gif",
    efeito: `<p>Ao se manifestar e por mais 1d4 rodadas, <strong>50%</strong> de chance por rodada de ser atingido: <strong>10d6</strong> de dano (metade fogo, metade trevas); Reflexos CD 35 reduz à metade.</p>` },
  { categoria: "Fenômenos Rubros", origem: "Ameaças de Arton", nome: "Neblina Venenosa",
    descricao: "Névoa tóxica da Tormenta, que envenena e corrói tudo o que encontra.",
    imagem: "https://i.ibb.co/231wK99k/b1gbhn.gif",
    efeito: `<p>Dura 2d4 rodadas (dissipa com vento forte em 1d4 rodadas ou vendaval em 1). Camuflagem leve a 1,5m, total além disso. Quem inicia o turno dentro perde <strong>8d4</strong> PV e tem itens expostos avariados (persiste 1 rodada extra ao sair).</p>` },
  { categoria: "Fenômenos Rubros", origem: "Ameaças de Arton", nome: "Pesadelos Reais",
    descricao: "Fenômeno que materializa os piores pesadelos da vítima diante dela.",
    imagem: "https://giffiles.alphacoders.com/918/91820.gif",
    efeito: `<p>Fica apavorado, sofre <strong>6d8</strong> de dano psíquico e perde <strong>1d6</strong> PM (Vontade CD 35 evita ambos); repete o teste a cada turno até passar em dois seguidos. <em>Medo.</em></p>` },
  { categoria: "Fenômenos Rubros", origem: "Ameaças de Arton", nome: "Temperaturas Implacáveis",
    descricao: "Calor e frio extremos simultâneos, um dos fenômenos mais desgastantes da Tormenta.",
    imagem: "https://i.pinimg.com/originals/01/9b/b4/019bb406e83cbed43dcf6207444f368b.gif",
    efeito: `<p>Calor e frio extremos simultâneos por 2d4 minutos; a cada minuto, <strong>Fortitude CD 25 +1</strong> por teste anterior; falha: <strong>4d6</strong> de dano (metade fogo, metade frio), só cura ao fim do fenômeno.</p>` },
  { categoria: "Fenômenos Rubros", origem: "Ameaças de Arton", nome: "Tempestade Elétrica",
    descricao: "Tempestade sobrenatural cujos raios corroem e eletrocutam quem atingem.",
    imagem: "https://media1.tenor.com/m/pa6K5WaelrUAAAAd/thunder-lightning.gif",
    efeito: `<p>Dura 2d4 rodadas; a cada rodada, uma criatura aleatória sofre <strong>20d8</strong> de dano (metade ácido, metade eletricidade); cada resultado 8 nos dados também tira 2 PM (Reflexos CD 35 reduz dano e perda de PM à metade).</p>` },

  // ===================== MALDIÇÕES =====================
  {
    categoria: "Maldições", origem: "Ameaças de Arton", nome: "Maldições (regra geral)",
    descricao: "Regras gerais para criar, detectar e remover maldições mágicas.",
    imagem: "https://media1.tenor.com/m/Q1O8I_BflscAAAAd/i-curse-you-julie-engelbrecht.gif",
    efeito: `
      <p><strong>Ativação:</strong> cada maldição tem uma condição própria (mover um objeto, entrar num local, violar um sarcófago) definida pelo mestre.</p>
      <p><strong>Detecção:</strong> estudar o local/objeto por minutos + <strong>Investigação ou Misticismo</strong> (CD igual à da maldição).</p>
      <p><strong>Teste de Resistência:</strong> Vontade ao ser ativada; CD conforme a fonte (habilidades da criatura, ou definida pelo mestre para lugares/objetos).</p>
      <p><strong>Remoção:</strong> cada maldição tem forma própria; em geral também remove com <strong>Desejo</strong> ou <strong>Intervenção Divina</strong> (2 PM de sacrifício).</p>
    `
  },
  { categoria: "Maldições", origem: "Ameaças de Arton", nome: "Conhecimento Proibido",
    descricao: "Maldição que protege segredos perigosos demais para serem conhecidos.",
    imagem: "https://media1.tenor.com/m/apK_BqxJqUIAAAAd/book-explosion.gif",
    efeito: `<p>Protege livros/conhecimentos perigosos. A vítima fica confusa até o fim da cena e perde 1 ponto permanente de Sabedoria ou Carisma por dia (aleatório). Se um atributo chegar a –5, vira monstro do mestre. Remoção: ritual de clérigo de Tannah-Toh lançando Dispersar as Trevas (T$ 1.000 em incensos).</p>` },
  { categoria: "Maldições", origem: "Ameaças de Arton", nome: "Fúria de Allihanna",
    descricao: "Punição da natureza contra quem comete crimes ambientais.",
    imagem: "https://media1.tenor.com/m/a2q7QaF9-n0AAAAd/mother-nature-not-nice-to-fool-with-mother-nature.gif",
    efeito: `<p>Punição por crimes contra a natureza. Animais, devotos de Allihanna e afins recebem +5 em testes/dano contra a vítima e a tratam como hostil. Ambientes naturais viram terreno difícil e –5 em Acrobacia/Atletismo neles; descanso natural sempre dois níveis pior. Remoção: perdão de clérigo/druida de Allihanna (magias de 4º círculo), geralmente ligado a um serviço reparador.</p>` },
  { categoria: "Maldições", origem: "Ameaças de Arton", nome: "Maldição do Bardo",
    descricao: "Maldição lançada por um bardo morto, que anula todo o talento da vítima.",
    imagem: "https://media1.tenor.com/m/9fRxMiPp0fkAAAAd/bard-singing.gif",
    efeito: `<p>Todos os atributos da vítima são tratados como 0 para perícias e CDs de habilidades. Remoção: desafiar a alma do bardo morto a um duelo artístico (3 testes opostos de Atuação, vencer ao menos 2) — só uma vez por aventura.</p>` },
  { categoria: "Maldições", origem: "Ameaças de Arton", nome: "Mortuária",
    descricao: "Maldição ligada à morte e à necromancia, que expõe a vítima às trevas.",
    imagem: "https://i.makeagif.com/media/4-07-2018/etWji-.gif",
    efeito: `<p>Causada por mortalhas ou tumbas necromânticas. A vítima fica cansada/decrépita e ganha vulnerabilidade a trevas (substitui qualquer imunidade/RD e a cura por dano de trevas). Remoção: destruir a mortalha causadora, ou ritual de 1h e T$ 1.000 lançando Dispersar as Trevas sobre os restos mortais (se causada por violar uma tumba).</p>` },
  { categoria: "Maldições", origem: "Ameaças de Arton", nome: "Toque de Tibar",
    descricao: "Punição do deus da ganância, que transforma posses em lixo sem valor.",
    imagem: "https://media.tenor.com/oWG00iG4_j0AAAAM/magic.gif",
    efeito: `<p>Punição por crimes contra os dogmas de Tibar. Tudo que a vítima veste/empunha vira pirita: armas –2 em ataque/dano, armaduras/escudos –2 de Defesa, itens gerais –2 em testes. Remoção: reparar o crime cometido (devolver lucros, apagar segredos obtidos, etc.).</p>` },
];
