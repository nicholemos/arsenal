/* Ameaças de Arton - Modelos do Bestiário de Arton
 * Licantropo, Chefe Final, Mestre da Fonte e Vilão Modular.
 * Carregar DEPOIS de app.js. Cria uma ameaça homebrew nova a partir da criatura escolhida
 * (a ficha original nunca é alterada). */
(function () {
    'use strict';

    // ---------------------------------------------------------------
    // Utilidades
    // ---------------------------------------------------------------
    const ND_LADDER = ['1/4', '1/2', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
        '13', '14', '15', '16', '17', '18', '19', '20', 'S', 'S+'];
    const PATAMARES = ['Iniciante', 'Veterano', 'Campeão', 'Lenda'];
    const CD_PATAMAR = [15, 25, 30, 35];
    const RD_PATAMAR = [0, 5, 10, 20];
    const HB_KEY = 't20_homebrew_threats';

    const esc = (s) => String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const clone = (o) => JSON.parse(JSON.stringify(o));

    function patamarIndex(nd) {
        const n = parseND(nd);
        if (n <= 4) return 0;
        if (n <= 10) return 1;
        if (n <= 16) return 2;
        return 3;
    }

    function ndPlus(nd, passos) {
        const s = String(nd).trim().toUpperCase();
        if (s === '1/4' || s === '1/2') {
            // Regra do livro: ND menor que 1 torna-se 2 ao virar chefe final (+2 já incluso)
            return ND_LADDER[ND_LADDER.indexOf('2') + Math.max(0, passos - 2)];
        }
        let i = ND_LADDER.indexOf(s);
        if (i < 0) return String(nd);
        i = Math.min(ND_LADDER.length - 1, i + passos);
        return ND_LADDER[i];
    }

    // "1.100" -> 1100 ; "540" -> 540 ; "—" -> NaN
    function parseNum(str) {
        if (str === undefined || str === null) return NaN;
        const s = String(str).trim();
        if (/^\d{1,3}(\.\d{3})+$/.test(s)) return parseInt(s.replace(/\./g, ''), 10);
        if (/^\d+$/.test(s)) return parseInt(s, 10);
        return NaN;
    }
    function fmtNum(n) {
        return n >= 1000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : String(n);
    }

    function bonusNum(b) {
        const m = String(b || '').match(/[+-]?\d+/);
        return m ? parseInt(m[0], 10) : NaN;
    }
    function parseDano(d) {
        const m = String(d || '').match(/^\s*(\d+d\d+)\s*([+-]\s*\d+)?/);
        if (!m) return null;
        return { dados: m[1], fixo: m[2] ? parseInt(m[2].replace(/\s/g, ''), 10) : 0 };
    }
    const sinal = (n) => (n >= 0 ? '+' + n : String(n));
    const fmtDano = (dados, fixo) => dados + (fixo ? sinal(fixo) : '');

    function melhorCorpoACorpo(t) {
        let melhor = null;
        (t.ataques || []).forEach((a) => {
            if (a.tipo && a.tipo !== 'Corpo a Corpo' && a.tipo !== 'Homebrew') return;
            const b = bonusNum(a.bonus);
            const d = parseDano(a.dano);
            if (isNaN(b) || !d) return;
            if (!melhor || b > melhor.b) melhor = { a, b, d };
        });
        return melhor;
    }

    function temHabilidade(t, nome) {
        return (t.habilidades || []).some((h) => h.nome && h.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    function addObs(txt, novo) {
        const parts = String(txt || '').split(',').map((s) => s.trim()).filter(Boolean);
        const lower = parts.map((s) => s.toLowerCase());
        novo.split(',').map((s) => s.trim()).filter(Boolean).forEach((n) => {
            if (!lower.includes(n.toLowerCase())) { parts.push(n); lower.push(n.toLowerCase()); }
        });
        return parts.join(', ');
    }
    // Garante redução de dano genérica de pelo menos "rd"
    function garantirRD(defesaObs, rd) {
        if (!rd) return defesaObs || '';
        const re = /redução de dano (\d+)(?!\d|\s*\/)/i;
        const m = String(defesaObs || '').match(re);
        if (m) {
            return parseInt(m[1], 10) >= rd ? defesaObs : defesaObs.replace(re, 'redução de dano ' + rd);
        }
        return addObs(defesaObs, 'redução de dano ' + rd);
    }
    function maiorCD(t) {
        let max = 0;
        const txt = JSON.stringify([t.habilidades || [], t.ataques || []]);
        (txt.match(/CD (\d+)/g) || []).forEach((s) => { max = Math.max(max, parseInt(s.slice(3), 10)); });
        return max;
    }
    function nomeUnico(base) {
        const usados = new Set(allThreats.map((t) => t.nome.toLowerCase()));
        let hb = [];
        try { hb = JSON.parse(localStorage.getItem(HB_KEY)) || []; } catch (e) { hb = []; }
        hb.forEach((t) => usados.add(t.nome.toLowerCase()));
        let nome = base, i = 2;
        while (usados.has(nome.toLowerCase())) nome = base + ' (' + i++ + ')';
        return nome;
    }
    const get = (nome) => allThreats.find((t) => t.nome === nome);

    // ---------------------------------------------------------------
    // Texto comum a vários modelos
    // ---------------------------------------------------------------
    const TXT_MAIOR_QUE_A_MORTE = 'Enquanto tiver pelo menos metade de seus PV, a criatura é imune a habilidades de "morte instantânea": efeitos que reduzem seus PV a 0 ou menos instantaneamente, ou que aprisionam ou destroem sua alma ou corpo (como Roubar a Alma e Buraco Negro). O mestre tem a palavra final. Ela ainda pode ser reduzida a 0 PV ou menos por dano ou perda de vida.';

    // ---------------------------------------------------------------
    // CHEFE FINAL (base) - Bestiário de Arton, p. 175
    // ---------------------------------------------------------------
    function aplicarChefeBase(t, opts) {
        const mudancas = [];
        const pat = patamarIndex(t.nd);
        const ndOrig = parseND(t.nd);
        const pvOrig = parseNum(t.pv);

        if (!opts.semDobrarPV) {
            t.pv = fmtNum(pvOrig * 2);
            mudancas.push('PV dobrados: ' + fmtNum(pvOrig) + ' → ' + t.pv);
        }
        const pmOrig = parseNum(t.pm);
        if (!isNaN(pmOrig) && pmOrig > 0) {
            const ganho = 2 * Math.max(1, Math.floor(ndOrig));
            t.pm = String(pmOrig + ganho);
            mudancas.push('PM +' + ganho + ' (+2 por ND): ' + pmOrig + ' → ' + t.pm);
        }
        if (!temHabilidade(t, 'Maior que a Morte') && !/maior que a morte/i.test(t.defesaObs || '')) {
            t.defesaObs = addObs(t.defesaObs, 'maior que a morte');
            t.habilidades.push({ nome: 'Maior que a Morte', tipo: 'Qualidade', desc: TXT_MAIOR_QUE_A_MORTE });
            mudancas.push('Habilidade Maior que a Morte');
        }
        const rd = RD_PATAMAR[pat];
        if (rd) {
            const antes = t.defesaObs || '';
            t.defesaObs = garantirRD(t.defesaObs, rd);
            if (antes !== t.defesaObs) mudancas.push('Redução de dano ' + rd + ' (patamar ' + PATAMARES[pat].toLowerCase() + ')');
        }
        const nd2 = ndPlus(t.nd, 2);
        mudancas.push('ND ' + t.nd + ' → ' + nd2 + ' (apenas para XP e tesouro)');
        t.nd = nd2;
        return { pat, cd: CD_PATAMAR[pat], mudancas };
    }

    // ---------------------------------------------------------------
    // MESTRE DA FONTE - Bestiário de Arton, pp. 175-178
    // ---------------------------------------------------------------
    // c = { i: índice do patamar, cd }  |  v(c, a,b,c,d) escolhe pelo patamar
    const v = (c, a, b, cc, d) => [a, b, cc, d][c.i];

    const FONTES = {
        engenhoca: { nome: 'Engenhoca Alimentadora', resumo: 'Aparato mecânico fixo que pode ser danificado ou sabotado.',
            desc: (c) => 'Um aparato mecânico que não pode ser movido, mas pode ser danificado ou sabotado. É um objeto com Defesa e resistências iguais às do chefe -10, ' + v(c, 25, 100, 250, 400) + ' PV, redução de dano ' + v(c, 0, 5, 10, 20) + ', imunidade a dano psíquico e veneno; é desabilitada quando seus PV chegam a zero. Uma ação completa e um teste de Ladinagem ou Ofício (engenhoqueiro) sabota a engenhoca: ela perde PV iguais ao resultado.' },
        fluxo: { nome: 'Fluxo Divino', resumo: 'Concentração de poder dos deuses. 3 sucessos em Religião ou Vontade.',
            desc: (c) => 'Uma concentração de poder dos deuses. Para desabilitá-la é preciso interromper o fluxo (negociando com as divindades ou desfazendo o ritual): o grupo acumula 3 sucessos em testes de Religião ou Vontade, cada um como ação completa. Devotos da divindade em questão recebem +5 ou -5 no teste se, a critério do mestre, desabilitar o fluxo beneficiar ou contrariar a divindade. Um personagem com Canalizar Energia Positiva/Negativa pode gastar ' + v(c, 1, 2, 4, 5) + ' PM para obter um sucesso automático em um dos testes (uma vez por cena).' },
        ermos: { nome: 'Fúria dos Ermos', resumo: 'Inúmeras criaturas da natureza alimentam o chefe. 3 sucessos em Adestramento ou Sobrevivência.',
            desc: () => 'O poder vem de inúmeras criaturas do mundo natural, impossíveis de eliminar em pouco tempo, mas que podem ser convencidas a abandonar o chefe. O grupo acumula 3 sucessos em testes de Adestramento ou Sobrevivência (Empatia Selvagem dá +5 no teste), cada um como ação completa.' },
        labirinto: { nome: 'Labirinto da Mente', resumo: 'Efeito psíquico. 3 sucessos em Diplomacia ou Intuição, ou condições mentais/de medo.',
            desc: () => 'O efeito é de natureza psíquica; ocorre dentro da mente de cada criatura na área ou como ondas de energia mental. O grupo acumula 3 sucessos em testes de Diplomacia ou Intuição, cada um como ação completa. Alternativamente, um personagem pode usar uma habilidade que cause condição mental ou de medo (o labirinto falha automaticamente no teste contra ela); cada condição diferente causada conta como um sucesso.' },
        ruptura: { nome: 'Ruptura Planar', resumo: 'Fonte em outro plano acessada por uma ruptura. 3 sucessos em Conhecimento ou Misticismo.',
            desc: () => 'A fonte de poder está em outro plano e é acessada por uma ruptura na realidade. O grupo acumula 3 sucessos em testes de Conhecimento ou Misticismo para fechá-la, cada um como ação completa. As magias Tranca Arcana, Dissipar Magia, Selo de Mana, Campo Antimagia e Buraco Negro podem ser lançadas como parte de cada teste, dando bônus igual ao custo básico em PM da magia (mas ela não gera seus efeitos).' },
        vitimas: { nome: 'Vítimas Inconscientes', resumo: 'O poder vem de criaturas inconscientes. 3 sucessos em Cura ou Investigação.',
            desc: (c) => 'A manifestação extrai seu poder de um grupo de criaturas inconscientes. Para desabilitar é preciso reanimar as vítimas: 3 sucessos em testes de Cura ou Investigação, cada um como ação completa. Um efeito que cure ' + v(c, 10, 30, 60, 100) + ' PV conta como um sucesso; alternativamente, causar ' + v(c, 5, 15, 30, 50) + ' pontos de dano também conta como sucesso, mas significa matar algumas das vítimas.' }
    };

    const EMANACOES = {
        repulsor: { nome: 'Campo Repulsor', resumo: 'Pulsos de energia empurram quem avança rumo ao chefe.',
            descricao: 'Pulsos de energia se opõem à aproximação de qualquer criatura, golpeando e empurrando aqueles que tentam avançar rumo ao chefe.',
            beneficios: (c) => 'O chefe recebe +5 na Defesa e, uma vez por rodada, pode lançar Campo de Força sem gastar PM (limite de PM igual ao seu ND). Ataques à distância contra o chefe sofrem -5 e causam metade do dano, e personagens que tentam avançar na direção do chefe se deslocam à metade do movimento.',
            e1: (c) => 'Cada personagem sofre ' + v(c, '1d6', '2d6', '3d6', '5d6') + ' pontos de dano e fica lento até o fim da cena ou até desabilitar a fonte de poder (Fortitude reduz à metade e evita a condição).',
            e2: (c) => 'Teste estendido em grupo de Atletismo ou Fortitude (3 sucessos; um personagem lento sofre -2 no teste). Em uma falha, cada personagem sofre ' + v(c, '1d4', '2d4', '3d4', '5d4') + ' pontos de dano e, em uma falha total, sofre -2 em todos os testes. Uma magia de teletransporte (Salto Dimensional ou Teletransporte) substitui um dos testes e dá sucesso automático (apenas uma vez no estágio).',
            e3: (c) => 'Cada personagem faz dois testes de perícias diferentes entre Acrobacia, Atletismo, Fortitude ou Reflexos. Para cada falha, sofre ' + v(c, '1d6', '2d6', '3d6', '5d6') + ' pontos de dano e perde um de seus itens empunhados ou vestidos (à escolha dele). Itens perdidos são recuperados ao fim da cena.' },
        profanacao: { nome: 'Profanação Mefítica', resumo: 'A área está impregnada de energia profana nociva.',
            descricao: 'A área está impregnada de energia profana nociva.',
            beneficios: () => 'O chefe recebe imunidade a trevas e veneno. Sempre que uma criatura sofre dano do chefe ou falha em um teste de resistência dele, sofre uma penalidade cumulativa de -1 em todos os testes.',
            e1: (c) => 'Cada personagem perde ' + v(c, '1d4', '2d4', '3d4', '5d4') + ' pontos de vida e fica enjoado (Fortitude reduz a perda à metade e evita a condição).',
            e2: (c) => 'Teste estendido em grupo de Religião ou Vontade (3 sucessos; um personagem enjoado sofre -2). Em uma falha, cada personagem reduz seus PV máximos em ' + v(c, 1, 2, 5, 10) + ' e, em uma falha total, efeitos de cura aplicados nos personagens têm apenas metade do efeito. É possível lançar as magias Consagrar e Purificação no lugar de um teste (cada uma uma vez; conta como um sucesso). O efeito conta como uma maldição.',
            e3: () => 'Cada personagem faz três testes em qualquer combinação de Fortitude e Religião. Conforme as falhas (1, 2, 3), sofre: fraco / debilitado / debilitado e vulnerável. O efeito conta como uma doença.' },
        tempestade: { nome: 'Tempestade Energética', resumo: 'Ventos e precipitações castigam a região. (Escolha o tipo de energia.)',
            descricao: 'Ventos, precipitações e outras manifestações climáticas se abatem sobre a região. A magia Resistência a Energia é útil: a cada estágio, um personagem pode lançá-la para dar +5 nos testes de perícia do estágio às criaturas afetadas.',
            beneficios: (c) => 'Inimigos do chefe na área sofrem -5 em Percepção, em testes de concentração para magias e em ataques à distância. Uma vez por rodada, o chefe pode gastar uma ação livre para disparar um raio de energia em uma criatura em alcance médio: ' + v(c, '3d6', '6d6', '9d6', '12d6') + ' (Reflexos reduz à metade).',
            e1: () => 'Cada personagem faz um teste de resistência (escolha o tipo ao criar a tempestade). Se falhar, torna-se vulnerável ao tipo de dano da tempestade; um personagem imune a este tipo, em vez disso, perde a imunidade.',
            e2: (c) => 'Teste estendido em grupo de Acrobacia, Atletismo ou da perícia de resistência do estágio 1 (5 sucessos). Em uma falha, cada personagem sofre ' + v(c, '1d6', '2d6', '3d6', '5d6') + ' pontos de dano.',
            e3: () => 'Cada personagem faz três testes da perícia de resistência do estágio 1. Se falhar em pelo menos dois, é recoberto por uma camada do elemento da emanação: fica enredado e sofre -5 em testes de resistência contra efeitos que causem dano desse tipo.' },
        vortice: { nome: 'Vórtice de Mana', resumo: 'Campo de energia intangível que drena quem está dentro.',
            descricao: 'Um campo de energia intangível varre a região, drenando aqueles em seu interior.',
            beneficios: (c) => 'O custo em PM das habilidades do chefe é reduzido em -1. No início de cada turno do chefe durante o confronto final, cada personagem perde ' + v(c, '1d4', '1d4', '2d4', '2d4') + ' PM; para cada resultado 4 nesses dados, o chefe recupera 10 PV.',
            e1: (c) => 'Teste estendido em grupo de Misticismo ou Vontade (3 sucessos). A cada falha, cada personagem perde ' + v(c, 1, 2, 3, 5) + ' PM.',
            e2: () => 'Cada personagem faz um teste de Misticismo ou Vontade. Se falhar, fica alquebrado.',
            e3: () => 'Cada personagem faz três testes de Misticismo ou Vontade. Se falhar em pelo menos dois, seu mana se emaranha com o corpo físico: sempre que gastar ou perder PM, perde a mesma quantidade de PV.' }
    };

    // ---------------------------------------------------------------
    // VILÃO MODULAR - partes (Bestiário de Arton, pp. 179-182)
    // ---------------------------------------------------------------
    const H = (nome, tipo, desc) => ({ nome, tipo, desc });
    const PARTES = {
        aparato: { nome: 'Aparato Sensorial', resumo: 'Sensores e olhos místicos aprimoram a percepção do chefe.', hab: [
            H('Sentidos Amplificados', 'Qualidade', 'O chefe recebe +5 em Percepção e percepção às cegas (médio).'),
            H('Antecipar Ameaça', 'Movimento', 'O chefe escolhe uma criatura em alcance médio. Até o próximo turno do aparato sensorial, recebe +5 na Defesa e em testes de resistência contra o alvo.'),
            H('Travar Mira', 'Padrão', 'O chefe escolhe uma criatura em alcance médio. Até o próximo turno do aparato sensorial, sempre que fizer um teste de ataque contra o alvo rola dois dados e usa o melhor resultado e, sempre que o alvo fizer um teste de resistência contra o chefe, rola dois dados e usa o pior.')] },
        asas: { nome: 'Asas', resumo: 'Um par de asas permite voar (ou reforça as asas já existentes).', hab: [
            H('Voo', 'Qualidade', 'O chefe recebe deslocamento de voo igual ao dobro do deslocamento normal ou 15m (o que for maior). Se já possui deslocamento de voo, ele dobra (ou aumenta para 15m, o que for maior).'),
            H('Bater Asas', 'Padrão', 'O chefe bate as asas, varrendo um cone de 9m como a magia Sopro das Uivantes, exceto que não gasta PM (limite de PM igual ao seu ND original) e empurra qualquer criatura menor que ele. Recarga (padrão).'),
            H('Investida Alada', 'Completa', (c) => 'O chefe faz uma investida voando. Causa ' + v(c, '+1d8', '+2d6', '+2d8', '+2d12') + ' pontos de dano e pode continuar se movendo após o ataque, até o limite de seu deslocamento.'),
            H('Movimentar-se', 'Movimento', 'O chefe percorre uma distância igual ao seu deslocamento de voo.')] },
        blindagem: { nome: 'Blindagem Reforçada', resumo: 'Placas de armadura ou campo de energia. Dobro de PV, mas sem turno extra.', pvMult: 2, hab: [
            H('Couraça Protetora', 'Qualidade', 'Esta parte recebe +5 na Defesa, em testes de resistência e na redução de dano e tem o dobro dos pontos de vida de uma parte normal, mas não fornece um turno extra ao chefe.')] },
        braco: { nome: 'Braço Adicional', resumo: 'Membro manipulador extra (pode ser escolhida até duas vezes).', max: 2, hab: [
            H('Empunhadura Extra', 'Qualidade', 'O chefe pode empunhar um item de uma mão adicional (com duas partes manipuladoras, pode empunhar dois itens de uma mão ou um de duas mãos). Se for uma arma, use as estatísticas de uma das armas em sua ficha.'),
            H('Ataque Extra', 'Padrão', 'O chefe faz um ataque com a arma empunhada com essa parte.'),
            H('Manipular Item', 'Movimento', 'O chefe manipula um item que poderia ser manuseado com essa parte.')] },
        propulsor: { nome: 'Conjunto Propulsor', resumo: 'Reforço nos membros locomotores ou forma independente de movimento.', hab: [
            H('Movimento Acelerado', 'Qualidade', 'O chefe ignora terreno difícil e todas as suas formas de deslocamento aumentam em +6m.'),
            H('Atropelamento', 'Completa', (c) => 'O chefe percorre até o dobro do deslocamento, podendo passar pelo espaço de inimigos menores (sem repetir espaço). Criaturas atropeladas sofrem ' + v(c, '2d6', '2d8', '3d10', '4d12') + ' pontos de dano e ficam caídas (Reflexos reduz à metade e evita a condição).'),
            H('Investida Agressiva', 'Completa', (c) => 'O chefe faz uma investida. Se acertar, causa ' + v(c, '+2d8', '+2d10', '+2d12', '+4d12') + ' pontos de dano.'),
            H('Movimentar-se', 'Movimento', 'O chefe percorre uma distância igual ao seu deslocamento.')] },
        disparador: { nome: 'Disparador Acoplado', resumo: 'Arma de ataque à distância ou outra forma de disparar projéteis.', hab: [
            H('Mira Aprimorada', 'Qualidade', 'Quando faz um ataque à distância, o chefe rola dois dados e usa o melhor resultado.'),
            H('Acumular Munição', 'Movimento', 'O chefe acumula energia para um disparo poderoso. Seu próximo disparo com esta parte causa dois dados extras de dano.'),
            H('Disparo Explosivo', 'Completa', (c) => 'O chefe dispara uma carga explosiva que afeta uma esfera de 6m de raio em alcance médio. Criaturas na área sofrem ' + v(c, '2d6', '4d6', '6d6', '10d6') + ' pontos de dano (Reflexos reduz à metade). Recarga (movimento).'),
            H('Disparo Unificado', 'Padrão', (c) => 'O chefe ataca uma criatura em alcance médio. O alvo sofre ' + v(c, '2d8', '4d8', '6d8', '10d8') + ' pontos de dano e fica caído (Reflexos reduz à metade e evita a condição).')] },
        tentacular: { nome: 'Emaranhado Tentacular', resumo: 'Vários tentáculos que agarram e atrapalham os inimigos.', hab: [
            H('Tentáculos Disruptivos', 'Qualidade', 'Uma área de 9m de raio ao redor do chefe é considerada terreno difícil.'),
            H('Agarrar Aprimorado', 'Movimento', 'O chefe faz a manobra agarrar contra uma criatura em alcance curto. Seu teste é igual ao seu ataque corpo a corpo modificado por seu tamanho. Pode manter até uma criatura por patamar agarrada dessa forma.'),
            H('Arremesso Tentacular', 'Padrão', 'Se começar o turno desta parte agarrando uma criatura menor que ele com seus tentáculos, o chefe a arremessa 1d6 x 1,5m em uma direção à sua escolha. A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 de dano de impacto para cada 1,5m arremessada.')] },
        escudo: { nome: 'Escudo Mental', resumo: 'A mente do chefe é protegida contra ataques psíquicos.', hab: [
            H('Mente Protegida', 'Qualidade', 'O chefe recebe +5 em Vontade e imunidade a efeitos mentais e dano psíquico.'),
            H('Erguer Defesas', 'Reação', 'Uma vez por rodada, quando faz um teste de Vontade, o chefe rola dois dados e usa o melhor resultado. Se passar, acumula uma carga psíquica.'),
            H('Rajada Mental', 'Padrão', 'O chefe dispara energia psíquica contra uma criatura em alcance médio, como a magia Adaga Mental, exceto que não gasta PM (limite de PM igual ao seu ND original). Gasta quaisquer cargas psíquicas acumuladas; para cada carga, causa +2d6 pontos de dano. Recarga (movimento).')] },
        aura: { nome: 'Gerador de Aura', resumo: 'Nuvem gasosa, concentração de energia ou enxame de criaturinhas mortais.', hab: [
            H('Aura Obscurecente', 'Qualidade', 'O chefe emana uma aura de 9m de raio. Dentro dela, todas as criaturas têm camuflagem leve (o chefe percebe normalmente dentro da própria aura).'),
            H('Pulso Agressivo', 'Padrão', (c) => 'A aura causa ' + v(c, '2d6', '4d6', '6d6', '10d6') + ' pontos de dano em todos os inimigos em seu interior. Criaturas afetadas fazem um teste de resistência para reduzir o dano à metade (Fortitude, Reflexos ou Vontade, conforme a natureza da aura).')] },
        matriz: { nome: 'Matriz Regeneradora', resumo: 'Fonte de energia vital ou sistema de cura independente.', hab: [
            H('Fortalecimento Corporal', 'Qualidade', 'Quando faz um teste de Fortitude, o chefe rola dois dados e usa o melhor resultado.'),
            H('Curar-se', 'Padrão', (c) => 'O chefe recupera ' + v(c, 10, 25, 50, 100) + ' PV de uma de suas partes não desabilitada.'),
            H('Recuperar-se', 'Movimento', 'O chefe refaz um teste de resistência contra uma condição (como abalado, paralisado etc.) que o esteja afetando.')] },
        oubliette: { nome: 'Oubliette Portátil', resumo: 'Jaula acoplada ou bolsão mágico para aprisionar os inimigos.', hab: [
            H('Armadilha Cruel', 'Qualidade', 'Ataques contra o oubliette têm 25% de chance de atingir, em vez dele, uma das criaturas engolidas. Um atacante pode aceitar -5 em seu teste de ataque para evitar essa chance.'),
            H('Engolir', 'Padrão', (c) => 'O chefe usa a habilidade Engolir. No início de cada turno do oubliette, a criatura engolida sofre ' + v(c, '2d6', '2d8', '4d6', '4d12') + ' pontos de dano. Ela pode escapar causando um total de ' + v(c, 10, 25, 50, 75) + ' pontos de dano ao interior do oubliette (Defesa ' + v(c, 10, 15, 20, 25) + ', redução de dano 0). O chefe pode manter até uma criatura engolida por patamar.')] },
        sonoro: { nome: 'Projetor Sonoro', resumo: 'Pulsos sônicos que machucam e enlouquecem os inimigos.', hab: [
            H('Zunido Constante', 'Qualidade', 'O chefe emite uma aura de som agudo de 30m de raio. Inimigos nessa área ficam surdos.'),
            H('Pulso Sônico', 'Padrão', 'O chefe emite uma rajada sonora contra uma criatura ou objeto em alcance curto, como a magia Despedaçar, exceto que não gasta PM (limite de PM igual ao seu ND original) e pode usar seus aprimoramentos como se tivesse acesso aos mesmos círculos de magia que um clérigo de seu nível. Recarga (movimento).'),
            H('Ruptura Sonora', 'Padrão', (c) => 'O chefe emite um disparo sonoro concentrado contra uma criatura em alcance curto. A vítima perde ' + v(c, '1d4', '1d6', '2d4', '2d6') + ' PM (Vontade reduz à metade).')] },
        reflexos: { nome: 'Reflexos Defensivos', resumo: 'Esquiva de ataques e de efeitos prejudiciais.', hab: [
            H('Blindagem', 'Qualidade', 'Esta parte tem um bônus de +5 na Defesa.'),
            H('Prontidão de Defesa', 'Qualidade', 'O chefe recebe a habilidade Evasão e não pode ser flanqueado.'),
            H('Manobra Defensiva', 'Reação', 'Uma vez por rodada, quando sofre um ataque, o chefe pode fazer o atacante rolar dois dados e usar o pior resultado nesse ataque.'),
            H('Posicionar-se', 'Movimento', 'O chefe percorre até 6m; pode passar pelo espaço ocupado por inimigos sem testes, mas esses espaços contam como terreno difícil.')] }
    };

    // ---------------------------------------------------------------
    // LICANTROPO - Dragão Brasil 232, "Licantropos Artonianos" (pp. 11-17):
    // Licantropia, Personagens Licantropos, Formas de Licantropo e Forma de Fera
    // ---------------------------------------------------------------
    const ANIMAIS = {
        lobo: { rotulo: 'Lobisomem (lobo)', animal: 'Lobo', plural: 'lobos e lobos-das-cavernas', empatia: 'Lobos', forca: 2,
            hibrida: 'Recebe +2 em Força.',
            fera: 'Seu tamanho se torna Médio, seu deslocamento se torna 15m e recebe +2 em Força e uma arma natural de mordida (1d6, crítico x2, perfuração). Uma vez por rodada, ao agredir com uma arma, pode gastar 1 PM para fazer um ataque extra com a mordida. Ao acertar a mordida, pode gastar 1 PM para fazer a manobra derrubar contra o alvo (ação livre, em criaturas sem PM).',
            extras: [] },
        onca: { rotulo: 'Licantropo Onça', animal: 'Onça', plural: 'onças', empatia: 'Onças', forca: 0,
            hibrida: 'Pode usar Emboscar (se já tiver o poder, o custo diminui em -1 PM).',
            fera: 'Seu tamanho se torna Médio, seu deslocamento se torna 15m (natação 6m), recebe uma arma natural de mordida e duas de garra (como na forma híbrida) e pode usar Emboscar (se já tiver o poder, o custo diminui em -1 PM).',
            extras: [{ nome: 'Emboscar', tipo: 'Livre', desc: 'Na primeira rodada de combate, se estiver em forma híbrida ou de onça, pode realizar uma ação padrão adicional.' }] },
        rato: { rotulo: 'Licantropo Rato', animal: 'Rato', plural: 'ratos', empatia: 'Ratos', forca: 0,
            hibrida: 'Recebe deslocamento de escalada igual à metade do deslocamento.',
            fera: 'Seu tamanho se torna Minúsculo, seu deslocamento se torna 12m e recebe deslocamento de escalada igual à metade do deslocamento e uma arma natural de mordida (como na forma híbrida).',
            extras: [{ nome: 'Dentes de Roedor', tipo: 'Qualidade', desc: 'Em um acerto crítico com a mordida, deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador do crítico.' }] },
        selako: { rotulo: 'Licantropo Selako', animal: 'Selako', plural: 'selakos', empatia: 'Selakos', forca: 0,
            hibrida: 'Recebe deslocamento de natação igual ao seu deslocamento.',
            fera: 'Recebe deslocamento de natação igual ao seu deslocamento e uma arma natural de mordida (como na forma híbrida).',
            extras: [{ nome: 'Dentes Afiados', tipo: 'Qualidade', desc: 'Em um acerto crítico com a mordida, a vítima fica sangrando.' }] },
        texugo: { rotulo: 'Licantropo Texugo', animal: 'Texugo', plural: 'texugos', empatia: 'Texugos', forca: 0,
            hibrida: 'Pode usar Durão (se já tiver a habilidade, o custo diminui em -1 PM).',
            fera: 'Seu tamanho se torna Pequeno, seu deslocamento se torna 12m (escavar 3m), pode usar Durão (se já tiver a habilidade, o custo diminui em -1 PM) e recebe uma arma natural de mordida (1d6, crítico x2, perfuração). Uma vez por rodada, ao agredir com uma arma, pode gastar 1 PM para fazer um ataque extra com a mordida.',
            extras: [{ nome: 'Durão', tipo: 'Reação', desc: 'Uma vez por rodada, se estiver em forma híbrida ou de texugo, ao sofrer dano reduz esse dano à metade.' }] }
    };

    function aplicarLicantropo(t, opts) {
        const info = ANIMAIS[opts.animal] || ANIMAIS.lobo;
        const mc = melhorCorpoACorpo(t);
        const cd = Math.max(1, parseInt(opts.cd, 10) || 15);
        const rd = opts.rd || 0;
        const m = [];
        const f = info.forca;

        // Sentidos Aguçados: faro e visão na penumbra
        t.percepcaoObs = addObs(t.percepcaoObs, 'faro, visão na penumbra');
        m.push('Sentidos Aguçados: faro e visão na penumbra');
        if (rd) {
            t.defesaObs = addObs(t.defesaObs, 'redução de dano ' + rd + '/mitral');
            m.push('Defesa: redução de dano ' + rd + '/mitral (opcional, como nas fichas de licantropos do livro)');
        }

        // Armas naturais: 1d6 (regra) ou o mesmo número de dados da arma principal
        const dados = opts.dano === 'literal' ? '1d6' : Math.max(1, parseInt(mc.d.dados, 10)) + 'd6';
        const bHib = mc.b + f, fHib = mc.d.fixo + f;
        const novos = [
            { nome: 'Garra x2 (Híbrida)', tipo: 'Corpo a Corpo', bonus: sinal(bHib), dano: fmtDano(dados, fHib), desc: 'Corte, crítico x2. Alternativa a arma + garra.' },
            { nome: 'Mordida (Híbrida)', tipo: 'Corpo a Corpo', bonus: sinal(bHib), dano: fmtDano(dados, fHib), desc: 'Perfuração, crítico x2.' }
        ];
        if (opts.animal === 'onca') {
            novos.push({ nome: 'Garra x2 (Onça)', tipo: 'Corpo a Corpo', bonus: sinal(bHib), dano: fmtDano(dados, fHib), desc: 'Corte, crítico x2.' });
        }
        novos.push({ nome: 'Mordida (' + info.animal + ')', tipo: 'Corpo a Corpo', bonus: sinal(bHib), dano: fmtDano(dados, fHib), desc: 'Perfuração, crítico x2.' });
        t.ataques = (t.ataques || []).concat(novos);
        m.push('Ataques naturais: garra x2 e mordida (' + dados + sinal(fHib).replace('+0', '') + ', ' + sinal(bHib) + ' para acertar), a partir de "' + mc.a.nome + '" (' + mc.a.bonus + ', ' + mc.a.dano + ')' + (f ? '; +' + f + ' de Força já somados' : ''));

        // Empatia: +5 em Adestramento com a espécie
        const per = (t.pericias || []).find((x) => /^adestramento$/i.test(x.nome));
        if (per && /^[+-]?\d+/.test(String(per.valor))) {
            const base = parseInt(String(per.valor), 10);
            per.valor = per.valor.replace(/^[+-]?\d+/, sinal(base)) + ' (' + sinal(base + 5) + ' com ' + info.empatia.toLowerCase() + ')';
            m.push('Adestramento: ' + per.valor);
        }

        const hab = [
            { nome: 'Sentidos Aguçados', tipo: 'Qualidade', desc: 'O licantropo recebe faro e visão na penumbra.' },
            { nome: 'Empatia com ' + info.empatia, tipo: 'Qualidade', desc: 'Recebe +5 em testes de Adestramento com ' + info.plural + ' (incluindo versões primitivas, reais e gigantes) e pode usar Adestramento para mudar atitude e persuasão com essas criaturas.' },
            { nome: 'Maldição da Licantropia', tipo: 'Qualidade', desc: 'Um humanoide que sofra dano da mordida do licantropo contrai licantropia (Fort CD ' + cd + ' evita).' },
            { nome: 'Mudança de Forma', tipo: 'Completa', desc: 'Assume a forma híbrida ou de fera (as estatísticas padrão são para humanoide). Em todos os casos, um licantropo morto ou inconsciente reverte à forma humanoide. ' +
                'FORMA HÍBRIDA: fera humanoide com a cabeça e características do animal. O equipamento vestido desaparece, mas seus efeitos são mantidos. Recebe uma arma natural de mordida (1d6, crítico x2, perfuração) e duas de garra (1d6 cada, crítico x2, corte); nesta ficha os ataques já estão calculados. Uma vez por rodada, ao agredir com outra arma, pode gastar 1 PM para um ataque extra com a mordida e 1 PM para um ataque extra com uma garra livre (não usada no turno); como alternativa, usa as garras com habilidades de arma secundária (como Estilo de Duas Armas). ' + info.hibrida + ' ' +
                'FORMA DE FERA (' + info.animal.toLowerCase() + '): um animal comum; não pode falar, empunhar itens nem lançar magias. O equipamento desaparece, mas seus efeitos são mantidos. Outras criaturas fazem um teste de Percepção oposto ao teste de Enganação dele (+10) para perceber que não é um animal comum. ' + info.fera }
        ].concat(info.extras.map((e) => clone(e)));
        hab.push({ nome: 'Aversão a Mitral', tipo: 'Qualidade', desc: 'O licantropo sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral.' });
        t.habilidades = (t.habilidades || []).concat(hab);
        m.push('Habilidades: ' + hab.map((h) => h.nome).join(', '));

        t.observacao = [t.observacao, 'Licantropia (Dragão Brasil 232, p. 13): maldição mágica que afeta apenas humanoides. A vítima é acometida ao presenciar violência física e, na noite seguinte, se transforma na forma híbrida e parte em um surto de violência até o amanhecer, sem lembranças. Uma vítima ciente pode fazer um teste de Vontade (CD 25, +5 por teste anterior; -5 se participou da violência) para evitar a transformação. Cura: magia Purificação (com o aprimoramento que dissipa encantamento, necromancia e transmutação) ou efeito que remova maldição.'].filter(Boolean).join(' ');
        return { mudancas: m };
    }

    // ---------------------------------------------------------------
    // Tabela 2-3 (Ameaças de Arton, pp. 382-384): parâmetros por ND e papel
    // ---------------------------------------------------------------
    const TABELA = {"solo": {"1/4": {"ataque": 6, "dano": 8, "defesa": 11, "forte": 3, "media": 0, "fraca": -2, "pv": 7, "cd": 12}, "1/2": {"ataque": 7, "dano": 10, "defesa": 14, "forte": 6, "media": 3, "fraca": -1, "pv": 15, "cd": 13}, "1": {"ataque": 9, "dano": 15, "defesa": 16, "forte": 11, "media": 5, "fraca": 0, "pv": 35, "cd": 14}, "2": {"ataque": 12, "dano": 18, "defesa": 19, "forte": 13, "media": 7, "fraca": 2, "pv": 70, "cd": 16}, "3": {"ataque": 14, "dano": 21, "defesa": 21, "forte": 15, "media": 9, "fraca": 3, "pv": 105, "cd": 17}, "4": {"ataque": 16, "dano": 24, "defesa": 23, "forte": 16, "media": 10, "fraca": 4, "pv": 140, "cd": 18}, "5": {"ataque": 17, "dano": 40, "defesa": 24, "forte": 17, "media": 11, "fraca": 5, "pv": 200, "cd": 20}, "6": {"ataque": 20, "dano": 56, "defesa": 27, "forte": 18, "media": 12, "fraca": 6, "pv": 240, "cd": 22}, "7": {"ataque": 24, "dano": 62, "defesa": 31, "forte": 20, "media": 14, "fraca": 7, "pv": 280, "cd": 24}, "8": {"ataque": 26, "dano": 68, "defesa": 33, "forte": 21, "media": 15, "fraca": 8, "pv": 320, "cd": 26}, "9": {"ataque": 27, "dano": 74, "defesa": 34, "forte": 21, "media": 15, "fraca": 9, "pv": 360, "cd": 28}, "10": {"ataque": 29, "dano": 80, "defesa": 36, "forte": 22, "media": 16, "fraca": 10, "pv": 400, "cd": 30}, "11": {"ataque": 34, "dano": 130, "defesa": 41, "forte": 24, "media": 18, "fraca": 11, "pv": 550, "cd": 31}, "12": {"ataque": 36, "dano": 144, "defesa": 43, "forte": 26, "media": 20, "fraca": 12, "pv": 600, "cd": 33}, "13": {"ataque": 37, "dano": 158, "defesa": 44, "forte": 26, "media": 20, "fraca": 13, "pv": 650, "cd": 35}, "14": {"ataque": 39, "dano": 172, "defesa": 46, "forte": 28, "media": 22, "fraca": 14, "pv": 700, "cd": 38}, "15": {"ataque": 43, "dano": 186, "defesa": 50, "forte": 28, "media": 22, "fraca": 15, "pv": 750, "cd": 40}, "16": {"ataque": 46, "dano": 200, "defesa": 53, "forte": 30, "media": 24, "fraca": 16, "pv": 800, "cd": 42}, "17": {"ataque": 47, "dano": 270, "defesa": 54, "forte": 30, "media": 24, "fraca": 17, "pv": 1020, "cd": 44}, "18": {"ataque": 49, "dano": 288, "defesa": 56, "forte": 32, "media": 26, "fraca": 18, "pv": 1080, "cd": 47}, "19": {"ataque": 52, "dano": 306, "defesa": 59, "forte": 32, "media": 26, "fraca": 19, "pv": 1140, "cd": 47}, "20": {"ataque": 54, "dano": 324, "defesa": 61, "forte": 34, "media": 28, "fraca": 20, "pv": 1200, "cd": 49}, "S": {"ataque": 58, "dano": 360, "defesa": 65, "forte": 36, "media": 30, "fraca": 22, "pv": 2500, "cd": 51}, "S+": {"ataque": 65, "dano": 500, "defesa": 70, "forte": 38, "media": 33, "fraca": 25, "pv": 4000, "cd": 55}}, "lacaio": {"1/4": {"ataque": 7, "dano": 9, "defesa": 10, "forte": 2, "media": 0, "fraca": -1, "pv": 4, "cd": 12}, "1/2": {"ataque": 9, "dano": 11, "defesa": 13, "forte": 5, "media": 3, "fraca": 0, "pv": 6, "cd": 13}, "1": {"ataque": 11, "dano": 17, "defesa": 15, "forte": 10, "media": 5, "fraca": 1, "pv": 9, "cd": 14}, "2": {"ataque": 14, "dano": 21, "defesa": 18, "forte": 12, "media": 7, "fraca": 3, "pv": 14, "cd": 16}, "3": {"ataque": 16, "dano": 24, "defesa": 20, "forte": 14, "media": 9, "fraca": 4, "pv": 21, "cd": 17}, "4": {"ataque": 17, "dano": 32, "defesa": 22, "forte": 15, "media": 10, "fraca": 5, "pv": 28, "cd": 18}, "5": {"ataque": 20, "dano": 56, "defesa": 23, "forte": 16, "media": 11, "fraca": 6, "pv": 40, "cd": 20}, "6": {"ataque": 24, "dano": 62, "defesa": 26, "forte": 17, "media": 12, "fraca": 7, "pv": 48, "cd": 22}, "7": {"ataque": 26, "dano": 68, "defesa": 30, "forte": 19, "media": 14, "fraca": 8, "pv": 56, "cd": 24}, "8": {"ataque": 27, "dano": 74, "defesa": 32, "forte": 20, "media": 15, "fraca": 9, "pv": 64, "cd": 26}, "9": {"ataque": 29, "dano": 80, "defesa": 33, "forte": 20, "media": 15, "fraca": 10, "pv": 72, "cd": 28}, "10": {"ataque": 34, "dano": 105, "defesa": 35, "forte": 21, "media": 16, "fraca": 11, "pv": 80, "cd": 30}, "11": {"ataque": 36, "dano": 144, "defesa": 40, "forte": 23, "media": 18, "fraca": 12, "pv": 110, "cd": 31}, "12": {"ataque": 37, "dano": 158, "defesa": 42, "forte": 25, "media": 20, "fraca": 13, "pv": 120, "cd": 33}, "13": {"ataque": 39, "dano": 172, "defesa": 43, "forte": 25, "media": 20, "fraca": 14, "pv": 130, "cd": 35}, "14": {"ataque": 43, "dano": 186, "defesa": 45, "forte": 27, "media": 22, "fraca": 15, "pv": 140, "cd": 38}, "15": {"ataque": 46, "dano": 200, "defesa": 49, "forte": 27, "media": 22, "fraca": 16, "pv": 150, "cd": 40}, "16": {"ataque": 47, "dano": 235, "defesa": 52, "forte": 29, "media": 24, "fraca": 17, "pv": 160, "cd": 42}, "17": {"ataque": 49, "dano": 288, "defesa": 53, "forte": 29, "media": 24, "fraca": 18, "pv": 204, "cd": 44}, "18": {"ataque": 52, "dano": 306, "defesa": 55, "forte": 31, "media": 26, "fraca": 19, "pv": 216, "cd": 47}, "19": {"ataque": 54, "dano": 324, "defesa": 58, "forte": 31, "media": 26, "fraca": 20, "pv": 228, "cd": 47}, "20": {"ataque": 56, "dano": 344, "defesa": 60, "forte": 33, "media": 28, "fraca": 21, "pv": 240, "cd": 49}, "S": {"ataque": 60, "dano": 385, "defesa": 64, "forte": 35, "media": 30, "fraca": 23, "pv": 500, "cd": 51}, "S+": {"ataque": 67, "dano": 540, "defesa": 69, "forte": 37, "media": 33, "fraca": 26, "pv": 800, "cd": 55}}, "especial": {"1/4": {"ataque": 4, "dano": 8, "defesa": 11, "forte": 3, "media": 0, "fraca": -2, "pv": 5, "cd": 14}, "1/2": {"ataque": 5, "dano": 10, "defesa": 12, "forte": 6, "media": 3, "fraca": -1, "pv": 11, "cd": 15}, "1": {"ataque": 7, "dano": 15, "defesa": 14, "forte": 11, "media": 5, "fraca": 0, "pv": 25, "cd": 16}, "2": {"ataque": 10, "dano": 18, "defesa": 17, "forte": 13, "media": 7, "fraca": 2, "pv": 49, "cd": 18}, "3": {"ataque": 12, "dano": 21, "defesa": 19, "forte": 15, "media": 9, "fraca": 3, "pv": 74, "cd": 19}, "4": {"ataque": 14, "dano": 24, "defesa": 21, "forte": 16, "media": 10, "fraca": 4, "pv": 98, "cd": 20}, "5": {"ataque": 15, "dano": 40, "defesa": 22, "forte": 17, "media": 11, "fraca": 5, "pv": 140, "cd": 22}, "6": {"ataque": 18, "dano": 56, "defesa": 25, "forte": 18, "media": 12, "fraca": 6, "pv": 168, "cd": 24}, "7": {"ataque": 22, "dano": 62, "defesa": 29, "forte": 20, "media": 14, "fraca": 7, "pv": 196, "cd": 26}, "8": {"ataque": 24, "dano": 68, "defesa": 31, "forte": 21, "media": 15, "fraca": 8, "pv": 224, "cd": 28}, "9": {"ataque": 25, "dano": 74, "defesa": 32, "forte": 21, "media": 15, "fraca": 9, "pv": 252, "cd": 30}, "10": {"ataque": 27, "dano": 80, "defesa": 34, "forte": 22, "media": 16, "fraca": 10, "pv": 280, "cd": 32}, "11": {"ataque": 32, "dano": 130, "defesa": 39, "forte": 24, "media": 18, "fraca": 11, "pv": 385, "cd": 33}, "12": {"ataque": 34, "dano": 144, "defesa": 41, "forte": 26, "media": 20, "fraca": 12, "pv": 420, "cd": 35}, "13": {"ataque": 35, "dano": 158, "defesa": 42, "forte": 26, "media": 20, "fraca": 13, "pv": 455, "cd": 37}, "14": {"ataque": 37, "dano": 172, "defesa": 44, "forte": 28, "media": 22, "fraca": 14, "pv": 490, "cd": 40}, "15": {"ataque": 41, "dano": 186, "defesa": 48, "forte": 28, "media": 22, "fraca": 15, "pv": 525, "cd": 42}, "16": {"ataque": 44, "dano": 200, "defesa": 51, "forte": 30, "media": 24, "fraca": 16, "pv": 560, "cd": 44}, "17": {"ataque": 45, "dano": 270, "defesa": 52, "forte": 30, "media": 24, "fraca": 17, "pv": 714, "cd": 46}, "18": {"ataque": 47, "dano": 288, "defesa": 54, "forte": 32, "media": 26, "fraca": 18, "pv": 756, "cd": 49}, "19": {"ataque": 50, "dano": 306, "defesa": 57, "forte": 32, "media": 26, "fraca": 19, "pv": 798, "cd": 49}, "20": {"ataque": 52, "dano": 324, "defesa": 59, "forte": 34, "media": 28, "fraca": 20, "pv": 840, "cd": 51}, "S": {"ataque": 55, "dano": 360, "defesa": 63, "forte": 36, "media": 30, "fraca": 22, "pv": 1750, "cd": 55}, "S+": {"ataque": 60, "dano": 500, "defesa": 67, "forte": 38, "media": 33, "fraca": 25, "pv": 2800, "cd": 60}}};
    const TAMANHOS = ['Minúsculo', 'Pequeno', 'Médio', 'Grande', 'Enorme', 'Colossal'];

    // ---------------------------------------------------------------
    // REI DA ARENA - Ameaças de Arton, Chefe Final (pp. 368-370)
    // ---------------------------------------------------------------
    const ARENAS = {
        anfiteatro: { nome: 'Anfiteatro', resumo: 'Plateia cheia: bônus em testes de perícia.',
            desc: (c) => 'O chefe recebe ' + v(c, '+1', '+2', '+5', '+10') + ' em testes de perícia. Uma vez por rodada, um personagem pode gastar uma ação padrão e fazer um teste de Atuação ou Diplomacia; se passar, recebe o bônus da arena no lugar do chefe por 1 rodada.' },
        cemiterio: { nome: 'Cemitério', resumo: 'Campo sob a magia Profanar, que favorece mortos-vivos.',
            desc: (c) => 'O cemitério está sob efeito da magia Profanar. Além disso, mortos-vivos e devotos de divindades que canalizam energia negativa recebem ' + v(c, '+0', '+1', '+2', '+5') + ' na Defesa e em testes de perícia. Uma magia Consagrar anula este efeito por 1d6 rodadas.' },
        embarcacao: { nome: 'Embarcação Instável', resumo: 'Convés que balança: terreno difícil e quedas.',
            desc: () => 'A embarcação é terreno difícil. Além disso, no final de cada rodada, cada personagem deve passar em um teste de Acrobacia ou Reflexos ou ficará caído. Caso falhe por 5 ou mais, também fica enjoado por 1 rodada.' },
        lodacal: { nome: 'Lodaçal Contaminado', resumo: 'Pântano de vapores venenosos.',
            desc: (c) => 'O lodaçal é terreno difícil e seus vapores fornecem camuflagem leve a qualquer criatura além de 6m. No início de cada um de seus turnos, cada personagem perde ' + v(c, '1d6', '2d6', '4d6', '8d6') + ' pontos de vida e fica enjoado pelo veneno do local (Fort reduz a perda à metade e evita a condição).' },
        ringue: { nome: 'Ringue Brutal', resumo: 'Combate selvagem: dano extra e punição por erros.',
            desc: (c) => 'Os ataques com arma do chefe causam +2 dados de dano. Além disso, sempre que um personagem erra um ataque por 5 ou mais, ou sempre que falha em um teste relacionado a movimento (como Acrobacia para passar por um inimigo, Atletismo para correr ou Luta para evitar ser empurrado), sofre ' + v(c, '2d8', '4d8', '6d8', '8d8') + ' pontos de dano de corte (Reflexos evita; se falhar por 10 ou mais, sofre o dobro de dano).' },
        salao: { nome: 'Salão Assombrado', resumo: 'Fantasmas que agarram e causam medo.',
            desc: (c) => 'Os personagens sofrem -5 em testes de resistência contra efeitos de medo e suas habilidades de luz custam +1 PM. No final de cada um de seus turnos, cada personagem deve fazer um teste de Reflexos. Se falhar, fica agarrado e imóvel. Um personagem agarrado desta forma sofre ' + v(c, '1d8', '2d8', '3d8', '5d8') + ' pontos de dano de frio no início de cada um de seus turnos e pode se soltar com uma ação padrão e um teste de Atletismo.' },
        santuario: { nome: 'Santuário Verdejante', resumo: 'Vegetação densa: camuflagem e espinhos.',
            desc: (c) => 'A densa vegetação fornece camuflagem leve a criaturas além de 6m e elimina a penalidade em Furtividade por mover-se ou fazer uma ação chamativa. Além disso, o terreno é difícil e qualquer personagem que se mova sofre ' + v(c, '1d6', '2d6', '3d6', '5d6') + ' pontos de dano de perfuração (Ref evita).' },
        templo: { nome: 'Templo', resumo: 'Local sagrado sob a magia Consagrar.',
            desc: (c) => 'O templo está sob efeito da magia Consagrar. Além disso, se ele for devotado a uma divindade específica, devotos dessa divindade recebem ' + v(c, '+1', '+2', '+5', '+10') + ' na Defesa e em testes de perícia. Uma magia Profanar anula este efeito por 1d6 rodadas.' },
        vortice: { nome: 'Vórtice Místico', resumo: 'Energia que drena o mana dos heróis e cura o chefe.',
            desc: (c) => 'No início de cada um de seus turnos, o chefe escolhe um número de criaturas igual a 1 + seu patamar (' + (c.i + 2) + ' criaturas). Cada criatura escolhida é atingida por um vórtice de energia e perde ' + v(c, '1d4', '2d4', '3d4', '5d4') + ' PM (Von reduz à metade). Para cada resultado 4 nesses dados, o chefe recupera 5 PV.' },
        vulcao: { nome: 'Vulcão', resumo: 'Calor crescente e lava no fim.',
            desc: (c) => 'No fim da segunda rodada, e a cada 2 rodadas subsequentes (4ª, 6ª etc.), a arena causa dano de fogo (ou de outro tipo apropriado) a todas as criaturas. O dano é igual a 1d6 por rodada transcorrida (2d6 na segunda rodada, 4d6 na quarta e assim sucessivamente) até um máximo de ' + (2 * (c.i + 1)) + 'd6. Além disso, no fim da décima rodada, a arena é coberta de lava, causando os efeitos de imersão total (Tormenta20, p. 319).' }
    };

    const RECURSOS = {
        armadilha: { nome: 'Armadilha Oculta', resumo: 'Objeto Médio escondido que prende uma criatura.',
            desc: (c) => 'Objeto Médio que começa o encontro escondido. O chefe pode gastar uma ação de movimento para ativar a armadilha; quando faz isso, uma criatura em alcance médio sofre ' + v(c, '1d6', '2d6', '4d6', '8d6') + ' pontos de dano de perfuração e fica imóvel (Ref evita). Um personagem imobilizado precisa gastar uma ação padrão e passar em um teste de Atletismo ou Ladinagem para se livrar da condição.' },
        arsenal: { nome: 'Arsenal Escondido', resumo: 'Itens mágicos escondidos na arena.',
            desc: () => 'O chefe tem itens mágicos escondidos na arena; possui um item mágico menor para cada patamar e pode substituir dois itens menores por um médio, ou três itens menores por um item maior. Pode gastar uma ação de movimento para empunhar um desses itens de qualquer ponto da arena. Um personagem pode gastar uma ação padrão e fazer um teste de Investigação ou Percepção para encontrar um dos itens.' },
        campeao: { nome: 'Campeão Secreto', resumo: 'Lacaio escondido que surge de emboscada.',
            desc: (c) => 'O chefe possui um campeão, uma criatura lacaio de ND igual ao seu (ND ' + c.nd + '), escondido em algum ponto da arena. Pode gastar uma ação de movimento para liberar o lacaio, que age a partir da sua próxima rodada. O lacaio recebe +2 em testes de ataque e rolagens de dano para cada rodada de combate transcorrida antes de ser liberado e, em seu primeiro turno, os personagens são considerados desprevenidos contra ele.' },
        coracao: { nome: 'Coração de Gigante', resumo: 'Objeto que fortalece o chefe (e pode ser devorado).',
            desc: (c) => 'Objeto Pequeno que começa o encontro em um ponto visível, como um pedestal ou suporte. Enquanto o coração estiver visível, o chefe recebe +2 em Força e seus ataques com armas causam ' + v(c, '+1d', '+2d', '+3d', '+5d') + ' de dano. Um personagem pode tentar devorar o coração: requer uma ação completa e um teste de Fortitude. Se passar, devora o coração e recebe seus benefícios até o fim da cena. Se falhar, perde ' + v(c, '1d6', '2d6', '3d6', '5d6') + ' pontos de vida e fica enjoado por 1d4 rodadas.' },
        fonte: { nome: 'Fonte Curativa', resumo: 'Cura acelerada para o chefe; pode ser usada pelos heróis.',
            desc: (c) => 'Energias místicas fornecem cura acelerada ' + v(c, 5, 10, 20, 50) + ' para o chefe. Um personagem pode gastar duas ações completas e fazer um teste de Religião; se passar, gera um pulso que cura todos os personagens em uma quantidade de PV equivalente ao valor de cura acelerada, então desativa a fonte.' },
        lacaios: { nome: 'Lacaios', resumo: 'De 2 a 4 lacaios que absorvem dano pelo chefe.',
            desc: (c) => 'O chefe possui de 2 a 4 lacaios, com ND somado igual a até o ND do chefe -2 (ND ' + (Math.max(0, Math.floor(parseND(c.nd)) - 2)) + '). Quando sofre dano, o chefe pode transferi-lo para um desses lacaios.' },
        linhas: { nome: 'Linhas de Mana', resumo: 'Fluxo arcano que dá CD e PM ao chefe.',
            desc: (c) => 'Linhas de fluxo arcano atravessam a arena. O chefe recebe ' + v(c, '+1', '+2', '+3', '+5') + ' na CD de suas habilidades e recupera ' + v(c, 1, 2, 3, 5) + ' PM no início de cada um de seus turnos. Um personagem pode gastar uma ação padrão e fazer um teste de Misticismo para receber esse benefício no lugar do chefe por 1 rodada (uma vez por cena por personagem).' },
        orbe: { nome: 'Orbe Elemental', resumo: 'Orbe que reduz dano de um elemento.', opcao: 'orbe',
            desc: (c, o) => 'Objeto Médio que começa o encontro em um ponto visível, como um pedestal ou suporte. O chefe ignora ' + v(c, 25, 50, 75, 100) + '% de todo dano de ' + (o.orbe || 'um tipo específico entre ácido, eletricidade, fogo, frio, luz ou trevas') + '. O orbe não pode ser movido, tem Defesa e PV iguais aos de um lacaio com o mesmo ND do chefe, é imune a esse elemento e é vulnerável a outro tipo de dano à escolha do mestre.' },
        passagens: { nome: 'Passagens Secretas', resumo: 'Três passagens para surgir de surpresa.',
            desc: () => 'A arena possui três passagens secretas em pontos distintos. Se estiver adjacente a uma dessas passagens, o chefe pode gastar uma ação de movimento para se deslocar para um ponto adjacente a qualquer outra passagem. Se o chefe atacar uma criatura na mesma rodada em que usou uma passagem secreta, a vítima é considerada desprevenida contra esse ataque. Um personagem pode desativar uma passagem com uma ação completa e um teste de Ladinagem.' },
        selo: { nome: 'Selo Místico', resumo: 'Símbolo que lança uma magia de graça.', opcao: 'selo',
            desc: (c, o) => 'A arena possui um símbolo místico visível que armazena poder mágico. Magia escolhida (' + v(c, '1º', '2º', '3º', '4º') + ' círculo): ' + (o.selo || 'à escolha do mestre') + '. O chefe pode gastar uma ação de movimento para lançar o efeito básico da magia escolhida sem gastar PM. Um personagem pode desativar o sigilo com uma ação completa e um teste de Misticismo.' },
        sorvedouro: { nome: 'Sorvedouro de Magia', resumo: 'Redemoinhos que sugam PM dos heróis.',
            desc: (c) => 'Redemoinhos arcanos sugam a energia dos aventureiros. No fim de cada rodada, todas as criaturas escolhidas pelo chefe perdem ' + v(c, '1', '1d4', '1d6', '2d4') + ' PM (Von evita). Um personagem pode desativar o sorvedouro com uma ação completa e um teste de Misticismo.' },
        torreta: { nome: 'Torreta', resumo: 'Objeto Médio que atira com o ataque do chefe.',
            desc: () => 'Objeto Médio. O chefe pode gastar uma ação de movimento para ativar a torreta, que dispara contra uma criatura em alcance médio. O alvo sofre um ataque à distância com as mesmas características (ataque, dano e crítico) de um dos ataques do chefe (corpo a corpo ou à distância). Um personagem pode desativar a torreta com uma ação completa e um teste de Ladinagem.' }
    };

    function tabelaCD(nd) {
        const r = TABELA.solo[String(nd)];
        return r ? r.cd : CD_PATAMAR[patamarIndex(nd)];
    }
    const nRecursos = (nd) => 2 * (patamarIndex(nd) + 1);

    function aplicarRei(t, o) {
        const ndOrig = t.nd;
        const r = aplicarChefeBase(t, {});
        const c = { i: r.pat, cd: tabelaCD(ndOrig), nd: ndOrig };
        const arena = ARENAS[o.arena];
        const hab = [];
        hab.push({ nome: 'Rei da Arena', tipo: 'Qualidade', desc: 'Chefe final definido pelo local do combate: na arena é quase invencível. O combate é conduzido normalmente, com uma exceção: no fim do turno de cada personagem jogador, o chefe recebe uma ação de movimento que só pode ser usada para ativar um de seus recursos. Ele não pode ativar o mesmo recurso mais de uma vez na mesma rodada, mas pode ativá-los mesmo impossibilitado de fazer ações. Os aventureiros podem identificar a natureza de cada recurso (como identificar criatura, CD ' + (15 + Math.floor(parseND(ndOrig))) + ', com qualquer perícia relacionada ao recurso). CD dos efeitos da arena e dos recursos: ' + c.cd + '. Criaturas geradas por recursos não contam para as recompensas do encontro.' });
        hab.push({ nome: 'Arena: ' + arena.nome, tipo: 'Arena', desc: 'Afeta apenas as criaturas à escolha do chefe e se aplica a toda a área do encontro. ' + arena.desc(c) });
        o.recursos.forEach((k) => {
            const rc = RECURSOS[k];
            hab.push({ nome: 'Recurso: ' + rc.nome, tipo: 'Recurso', desc: rc.desc(c, o) });
        });
        t.habilidades = t.habilidades.concat(hab);
        const m = r.mudancas.slice();
        m.push('Arena: ' + arena.nome);
        m.push('Recursos (' + o.recursos.length + '): ' + o.recursos.map((k) => RECURSOS[k].nome).join(', '));
        t.observacao = [t.observacao, 'Chefe final (Rei da Arena), patamar ' + PATAMARES[r.pat].toLowerCase() + ', CD da arena e dos recursos ' + c.cd + '. Os recursos ocupam espaços físicos na arena e devem ser posicionados antes do encontro; alguns podem ser sabotados, desabilitados ou destruídos.'].filter(Boolean).join(' ');
        return { mudancas: m };
    }

    // ---------------------------------------------------------------
    // BANDO - Ameaças de Arton, Como Criar Bandos (pp. 388-389)
    // ---------------------------------------------------------------
    const TXT_BANDO = 'A criatura é formada por um grupo de indivíduos, geralmente seres do mesmo tipo (existem bandos mistos). Se um ataque do bando exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque do bando errar, ele ainda assim causa metade do dano. Um bando é imune a manobras de combate e a efeitos que afetam apenas uma criatura e não causam dano, mas tem vulnerabilidade a dano de área. Um personagem com o poder Trespassar que acerte o bando pode usá-lo para fazer um ataque adicional contra ele (apenas uma vez por turno).';

    function adivinharPapel(t) {
        const nd = String(t.nd), pv = parseNum(t.pv);
        const mc = melhorCorpoACorpo(t);
        const atq = mc ? mc.b : NaN;
        let melhor = 'solo', menor = Infinity;
        ['lacaio', 'solo', 'especial'].forEach((r) => {
            const ref = TABELA[r][nd];
            if (!ref) return;
            const d = Math.abs(Math.log(pv / ref.pv)) + (isNaN(atq) ? 0 : 0.06 * Math.abs(atq - ref.ataque));
            if (d < menor) { menor = d; melhor = r; }
        });
        return melhor;
    }

    function tamanhoDe(tipo) {
        for (let i = 0; i < TAMANHOS.length; i++) if (new RegExp('\\b' + TAMANHOS[i] + '\\b').test(tipo || '')) return i;
        return -1;
    }

    // multiplica dados e dano fixo de expressões "NdM+K"
    function multDano(txt, f) {
        return String(txt).replace(/(\d+)d(\d+)(\s*\+\s*(\d+))?/g, (m0, n, d, _x, k) => {
            const nn = parseInt(n, 10) * f;
            return nn + 'd' + d + (k !== undefined ? '+' + (parseInt(k, 10) * f) : '');
        });
    }
    const PALAVRAS_DANO = '(?:pontos de dano|de dano|de ácido|de eletricidade|de fogo|de frio|de luz|de trevas|de corte|de impacto|de perfuração|de essência|de veneno|psíquico|de sangramento)';
    function multDanoHab(desc, f) {
        const re = new RegExp('(\\d+d\\d+(?:\\s*\\+\\s*\\d+)?)(\\s+' + PALAVRAS_DANO + ')', 'g');
        return String(desc)
            .replace(re, (m0, dado, resto) => multDano(dado, f) + resto)
            .replace(/\b(perde|perdem) (\d+) (PV|pontos de vida)/g, (m0, vb, n, un) => vb + ' ' + (parseInt(n, 10) * f) + ' ' + un)
            .replace(/\b(\d+)( pontos de dano)/g, (m0, n, resto) => (parseInt(n, 10) * f) + resto);
    }
    const somaTodos = (txt, re, delta) => String(txt).replace(re, (m0, pre, n) => pre + sinal(parseInt(n, 10) + delta));

    function aplicarBando(t, o) {
        const m = [];
        const nd0 = String(t.nd), nd1 = o.nd;
        const role = o.papel;
        const rb = TABELA[role][nd0], rn = TABELA[role][nd1];
        const patDelta = patamarIndex(nd1) - patamarIndex(nd0);
        const dAt = rn.ataque - rb.ataque;
        const dDef = rn.defesa - rb.defesa;
        const dCD = rn.cd - rb.cd;

        // Defesa
        const def0 = parseInt(t.defesa, 10);
        t.defesa = String(def0 + dDef);
        t.defesaObs = addObs(t.defesaObs, 'vulnerabilidade a dano de área');
        m.push('Defesa ' + def0 + ' → ' + t.defesa + ' (tabela do papel ' + role + ': ND ' + nd0 + ' → ' + nd1 + ')');

        // Resistências: cada uma mantém sua categoria (forte, média ou fraca) e o desvio em relação à tabela
        ['fort', 'ref', 'von'].forEach((k) => {
            const val = bonusNum(t[k]);
            if (isNaN(val)) return;
            let cat = 'forte', dist = Infinity;
            ['forte', 'media', 'fraca'].forEach((c) => { const d = Math.abs(val - rb[c]); if (d < dist) { dist = d; cat = c; } });
            const novo = val + (rn[cat] - rb[cat]);
            t[k] = sinal(novo);
        });
        m.push('Resistências: Fort ' + t.fort + ', Ref ' + t.ref + ', Von ' + t.von);

        // PV mantendo a proporção da criatura em relação à tabela
        const pv0 = parseNum(t.pv);
        const razao = pv0 / rb.pv;
        const pv1 = Math.max(1, Math.round(rn.pv * razao));
        t.pv = fmtNum(pv1);
        m.push('PV ' + fmtNum(pv0) + ' → ' + t.pv + (Math.abs(razao - 1) > 0.05 ? ' (mantém a proporção de ' + razao.toFixed(2) + 'x em relação à tabela)' : ''));

        // Ataques (bônus + dano)
        const fator = [1, 2, 4, 6][Math.max(0, Math.min(3, patDelta))];
        (t.ataques || []).forEach((a) => {
            if (/^[+-]?\d/.test(String(a.bonus))) a.bonus = sinal(bonusNum(a.bonus) + dAt);
            if (fator > 1) { a.dano = multDano(a.dano, fator); a.desc = multDanoHab(a.desc || '', fator); }
            a.desc = somaTodos(a.desc || '', /(CD )(\d+)/g, dCD).replace(/CD \+/g, 'CD ');
            if (!/\[Bando\]/.test(a.nome)) a.nome = a.nome + ' [Bando]';
        });
        m.push('Ataques: ' + (dAt >= 0 ? '+' : '') + dAt + ' no bônus' + (fator > 1 ? ' e dano x' + fator + ' (subiu ' + patDelta + ' patamar' + (patDelta > 1 ? 'es' : '') + ')' : ' (mesmo patamar: dano mantido)'));

        // Habilidades: CDs e testes de manobra deslocados; dano multiplicado (exceto magias)
        (t.habilidades || []).forEach((h) => {
            h.desc = String(h.desc || '');
            h.desc = h.desc.replace(/CD (\d+)/g, (x, n) => (/para extrair/.test(h.desc.slice(h.desc.indexOf(x), h.desc.indexOf(x) + 40)) ? x : 'CD ' + (parseInt(n, 10) + dCD)));
            h.desc = h.desc.replace(/(teste \+)(\d+)/g, (x, pre, n) => pre + (parseInt(n, 10) + dAt));
            if (fator > 1 && !/^Magia:/.test(h.nome)) h.desc = multDanoHab(h.desc, fator);
        });
        m.push('CDs das habilidades ' + (dCD >= 0 ? '+' : '') + dCD + ' (tabela de ' + nd0 + ' para ' + nd1 + ')');

        // Perícias: metade da mudança de ND (+ bônus de treinamento nos limites do ND 7 e 15)
        const n0 = parseND(nd0), n1 = parseND(nd1);
        let dPer = Math.floor((n1 - n0) / 2);
        [7, 15].forEach((lim) => { if (n0 < lim && n1 >= lim) dPer += 2; });
        if (dPer && (t.pericias || []).length) {
            t.pericias.forEach((p) => { p.valor = String(p.valor).replace(/[+-]\d+/g, (x) => sinal(parseInt(x, 10) + dPer)); });
            m.push('Perícias ' + (dPer >= 0 ? '+' : '') + dPer + ' (metade da mudança de ND, mais o bônus de treinamento nos ND 7 e 15)');
        }

        // Tamanho
        const tam0 = tamanhoDe(t.tipo);
        if (tam0 >= 0) {
            const tam1 = Math.max(0, Math.min(TAMANHOS.length - 1, o.tamanho));
            if (tam1 !== tam0) {
                t.tipo = t.tipo.replace(new RegExp('\\b' + TAMANHOS[tam0] + '\\b'), TAMANHOS[tam1]);
                m.push('Tamanho ' + TAMANHOS[tam0] + ' → ' + TAMANHOS[tam1] + ' (afeta Furtividade e manobras, não o tamanho das armas)');
            }
        }

        // Habilidades de bando
        const novas = [{ nome: 'Bando', tipo: 'Qualidade', desc: TXT_BANDO }];
        if (o.extra === 'varrer' && patDelta > 0) {
            novas.push({ nome: 'Varrer', tipo: 'Livre', desc: 'Uma vez por rodada, quando o bando faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.' });
        }
        t.habilidades = (t.habilidades || []).concat(novas);
        m.push('Habilidades: ' + novas.map((h) => h.nome).join(', '));
        if (patDelta > 0 && o.extra !== 'varrer') m.push('O bando subiu de patamar: considere acrescentar uma habilidade conforme o papel de combate.');

        // Tesouro: CD para extrair = 15 + ND
        if (t.tesouro && /para extrair/.test(t.tesouro)) {
            t.tesouro = t.tesouro.replace(/CD (\d+)( para extrair)/g, (x, n, p) => 'CD ' + (15 + Math.floor(n1)) + p);
            m.push('CD para extrair recursos do tesouro: ' + (15 + Math.floor(n1)) + ' (15 + ND). Ajuste as quantidades pelo número de indivíduos.');
        }
        t.nd = nd1;
        m.push('ND ' + nd0 + ' → ' + nd1);
        t.observacao = [t.observacao, 'Bando (' + (o.composicao || 'composição não definida') + '), papel de combate ' + role + ', baseado em "' + nd0 + '".'].filter(Boolean).join(' ');
        return { mudancas: m };
    }

    // ---------------------------------------------------------------
    // Montagem das habilidades de Mestre da Fonte / Vilão Modular
    // ---------------------------------------------------------------
    function hMestreDaFonte(t, opts, c) {
        const f = FONTES[opts.fonte], e = EMANACOES[opts.emanacao];
        const out = [];
        out.push({ nome: 'Mestre da Fonte', tipo: 'Qualidade', desc: 'Chefe final no centro de um fenômeno sobrenatural. O combate tem três estágios (cada um conta como uma cena e representa uma região sob efeito da fonte) e um confronto final em combate normal, em que os personagens começam em alcance médio do chefe e podem interagir com a fonte de poder: desabilitá-la elimina a emanação e seus benefícios. CD dos testes contra a fonte e a emanação: ' + c.cd + ' (patamar ' + PATAMARES[c.i].toLowerCase() + '). Criaturas geradas por esses efeitos não contam para as recompensas do encontro.' });
        out.push({ nome: 'Fonte de Poder: ' + f.nome, tipo: 'Fonte de Poder', desc: f.desc(c) + ' Para descobrir como desabilitar a fonte, um personagem gasta uma ação completa e faz um teste de uma perícia apropriada contra CD ' + c.cd + '; um sucesso revela uma das perícias ou ações que a desabilitam.' });
        out.push({ nome: 'Emanação: ' + e.nome + ' (Benefícios)', tipo: 'Emanação', desc: e.descricao + ' ' + e.beneficios(c) + ' Condições e penalidades geradas duram até o fim do confronto final ou até a fonte de poder ser desabilitada.' });
        out.push({ nome: 'Emanação: ' + e.nome + ' (Estágio 1)', tipo: 'Estágio 1', desc: e.e1(c) });
        out.push({ nome: 'Emanação: ' + e.nome + ' (Estágio 2)', tipo: 'Estágio 2', desc: e.e2(c) });
        out.push({ nome: 'Emanação: ' + e.nome + ' (Estágio 3)', tipo: 'Estágio 3', desc: e.e3(c) });
        return out;
    }

    function pvParte(pvChefe, mult) { return Math.round(pvChefe * 0.4 * (mult || 1)); }

    function hVilaoModular(t, opts, c, pvChefe) {
        const out = [];
        const sel = opts.partes; // [{id, qtd}]
        const total = sel.reduce((s, p) => s + p.qtd, 0);
        out.push({ nome: 'Vilão Modular', tipo: 'Qualidade', desc: 'Chefe final com ' + total + ' partes (cada parte além da terceira aumenta o ND em +1, apenas para XP e tesouro). Cada parte é uma criatura separada para ser atacada ou receber efeitos e tem 40% dos PV do chefe (' + fmtNum(pvParte(pvChefe)) + ' PV), com a Defesa, os testes de resistência, a redução de dano, as imunidades e as vulnerabilidades do chefe. Uma parte reduzida a 0 PV é desabilitada (sem PV negativos) e não fornece mais benefícios. Os personagens não podem afetar o chefe de nenhuma forma, nem com efeitos em área, até desabilitarem todas as partes. A cada rodada o chefe age em seu turno normal (só com as habilidades dele) e ganha um turno adicional por parte não desabilitada, na iniciativa -5, -10 e assim por diante, usando em cada um uma parte que ainda não usou na rodada. Habilidades passivas e reações estão sempre disponíveis; as demais só no turno da parte. CD dos testes contra as partes: ' + c.cd + '.' });
        sel.forEach((s) => {
            const p = PARTES[s.id];
            for (let k = 1; k <= s.qtd; k++) {
                const rot = s.qtd > 1 ? ' ' + k : '';
                const pv = pvParte(pvChefe, p.pvMult);
                out.push({ nome: 'Parte ' + p.nome + rot + ' (' + fmtNum(pv) + ' PV)', tipo: 'Parte', desc: p.resumo + (p.pvMult ? ' Tem o dobro dos PV de uma parte normal e não fornece turno extra.' : '') });
                p.hab.forEach((h) => {
                    out.push({ nome: 'Parte ' + p.nome + rot + ': ' + h.nome, tipo: h.tipo, desc: typeof h.desc === 'function' ? h.desc(c) : h.desc });
                });
            }
        });
        return out;
    }

    // ---------------------------------------------------------------
    // Definição dos modelos
    // ---------------------------------------------------------------
    function jaTem(t, ids) {
        const lista = (t.modelos || []).concat(t.modelo ? [t.modelo] : []);
        return lista.some((x) => ids.includes(x));
    }
    function reasonChefe(t) {
        if (jaTem(t, ['Chefe Final', 'Mestre da Fonte', 'Rei da Arena', 'Vilão Modular'])) return 'já é um chefe final';
        if (isNaN(parseNum(t.pv))) return 'PV não numéricos';
        if (/maior que a morte/i.test(JSON.stringify([t.defesaObs, (t.habilidades || []).map((h) => h.nome)])) && /chefe/i.test(t.nome)) return 'já é um chefe final';
        return null;
    }

    const MODELOS = {
        licantropo: {
            id: 'licantropo', titulo: 'Licantropo', icone: 'fa-moon',
            resumo: 'Transforma um humanoide em licantropo, com as regras de Licantropos Artonianos: Sentidos Aguçados, Empatia, Maldição da Licantropia, Aversão a Mitral e as formas híbrida e de fera.',
            fonteLivro: 'Dragão Brasil 232, Licantropos Artonianos (pp. 11-17)',
            nota: 'Garra e mordida usam o bônus e o dano fixo do maior ataque corpo a corpo da criatura. Os dados seguem a regra (1d6) ou o mesmo número de dados da arma principal, à sua escolha. Lobisomens somam +2 em Força nas formas híbrida e de lobo. A redução de dano /mitral aparece nas fichas de licantropos, mas não nas regras, por isso é opcional.',
            compat(t) {
                if (jaTem(t, ['Licantropo'])) return 'já recebeu o modelo Licantropo';
                if (!/humanoide/i.test(t.tipo || '')) return 'a licantropia afeta apenas humanoides';
                if (temHabilidade(t, 'Maldição da Licantropia') || /licantrop|lobisomem/i.test(t.nome)) return 'já é um licantropo';
                if (!melhorCorpoACorpo(t)) return 'sem ataque corpo a corpo com bônus e dano';
                return null;
            },
            defaults(t) {
                const cdBase = maiorCD(t);
                return { animal: 'lobo', cd: cdBase || (12 + Math.ceil(parseND(t.nd) * 1.3)), rd: parseND(t.nd) >= 13 ? 10 : 5, dano: 'escalado' };
            },
            nome(t, o) { return (o.animal === 'lobo' ? 'Lobisomem ' : (ANIMAIS[o.animal].rotulo + ' ')) + t.nome; },
            apply(t, o) { return aplicarLicantropo(t, o); }
        },
        chefe: {
            id: 'chefe', titulo: 'Chefe Final', icone: 'fa-crown',
            resumo: 'Transforma qualquer criatura em um chefe final para a última batalha: PV dobrados, +2 PM por ND, Maior que a Morte, redução de dano conforme o patamar e ND +2 (apenas para XP e tesouro).',
            fonteLivro: 'Bestiário de Arton, Chefes Finais (p. 175)',
            nota: 'As criaturas mais apropriadas são solos e especiais; lacaios não são bons chefes finais. Para um chefe com arquétipo, use Mestre da Fonte ou Vilão Modular.',
            compat: reasonChefe,
            defaults() { return {}; },
            nome(t) { return t.nome + ' (Chefe Final)'; },
            apply(t, o) { const r = aplicarChefeBase(t, {}); return { mudancas: r.mudancas }; }
        },
        mestre: {
            id: 'mestre', titulo: 'Mestre da Fonte', icone: 'fa-bolt',
            resumo: 'Chefe final no centro de um fenômeno sobrenatural: uma fonte de poder gera uma emanação que o grupo enfrenta em três estágios antes do confronto final.',
            fonteLivro: 'Bestiário de Arton, Mestre da Fonte (pp. 175-178)',
            nota: 'Aplica também as mudanças de Chefe Final (PV dobrados, +2 PM por ND, Maior que a Morte, RD por patamar, ND +2).',
            compat: reasonChefe,
            defaults() { return { fonte: 'fluxo', emanacao: 'repulsor' }; },
            nome(t) { return t.nome + ' (Mestre da Fonte)'; },
            apply(t, o) {
                const r = aplicarChefeBase(t, {});
                const habs = hMestreDaFonte(t, o, { i: r.pat, cd: r.cd });
                t.habilidades = t.habilidades.concat(habs);
                const m = r.mudancas.slice();
                m.push('Fonte de Poder: ' + FONTES[o.fonte].nome);
                m.push('Emanação: ' + EMANACOES[o.emanacao].nome + ' (benefícios e três estágios)');
                t.observacao = [t.observacao, 'Chefe final (Mestre da Fonte), patamar ' + PATAMARES[r.pat].toLowerCase() + ', CD ' + r.cd + '. Se a emanação ou a fonte causarem dano, escolha o tipo de dano conforme o conceito do chefe.'].filter(Boolean).join(' ');
                return { mudancas: m };
            }
        },
        rei: {
            id: 'rei', titulo: 'Rei da Arena', icone: 'fa-chess-rook',
            resumo: 'Chefe final definido pelo local do combate: em sua arena (anfiteatro, templo, vulcão...) e com seus recursos (torretas, passagens secretas, fontes de cura...) ele é quase invencível.',
            fonteLivro: 'Ameaças de Arton, Chefe Final: Rei da Arena (pp. 368-370)',
            nota: 'Aplica também as mudanças de Chefe Final (PV dobrados, +2 PM por ND, Maior que a Morte, RD por patamar, ND +2). São 2 recursos por patamar do chefe. Reserve o chefe para a batalha final da aventura.',
            compat: reasonChefe,
            defaults(t) { return { arena: 'anfiteatro', recursos: [], orbe: 'fogo', selo: '', n: nRecursos(t.nd) }; },
            nome(t) { return t.nome + ' (Rei da Arena)'; },
            validar(o) {
                if (o.recursos.length !== o.n) return 'Escolha exatamente ' + o.n + ' recursos (' + o.recursos.length + ' escolhidos).';
                return null;
            },
            apply(t, o) { return aplicarRei(t, o); }
        },
        bando: {
            id: 'bando', titulo: 'Bando', icone: 'fa-users',
            resumo: 'Transforma uma criatura em um bando: um grupo de indivíduos que age como uma única ameaça, com ND, tamanho e estatísticas recalculados pela tabela de parâmetros.',
            fonteLivro: 'Ameaças de Arton, Como Criar Bandos (pp. 388-389)',
            nota: 'Referência do livro: um bando de dez indivíduos tem ND 2 a 4 acima da criatura-base e tamanho +1; dezenas ou cem têm ND +6 a +8 e tamanho +3 (até Colossal). Dano só muda se o bando subir de patamar (x2, x4 ou x6). Equipamento, número de ataques e ajustes finais ficam por sua conta.',
            compat(t) {
                if (jaTem(t, ['Bando']) || (t.habilidades || []).some((h) => h.nome === 'Bando') || (t.ataques || []).some((a) => /\[Bando\]/.test(a.nome))) return 'já é um bando';
                if (isNaN(parseNum(t.pv))) return 'PV não numéricos';
                if (!TABELA.solo[String(t.nd)]) return 'ND fora da tabela de parâmetros';
                if (isNaN(parseInt(t.defesa, 10)) || isNaN(bonusNum(t.fort)) || isNaN(bonusNum(t.ref)) || isNaN(bonusNum(t.von))) return 'Defesa ou resistências não numéricas';
                if (String(t.nd) === 'S+') return 'não há ND acima de S+';
                return null;
            },
            defaults(t) {
                const i = ND_LADDER.indexOf(String(t.nd));
                const tam = tamanhoDe(t.tipo);
                return { papel: adivinharPapel(t), comp: 'dez', composicao: 'cerca de dez indivíduos', ndBase: String(t.nd),
                    nd: ND_LADDER[Math.min(ND_LADDER.length - 1, i + 3)], tamanho: tam < 0 ? -1 : Math.min(5, tam + 1), extra: 'nenhuma', nome: 'Bando de ' + t.nome };
            },
            nome(t, o) { return (o.nome && o.nome.trim()) ? o.nome.trim() : 'Bando de ' + t.nome; },
            validar(o) {
                if (ND_LADDER.indexOf(o.nd) <= ND_LADDER.indexOf(o.ndBase)) return 'O ND do bando deve ser maior que o da criatura-base (ND ' + o.ndBase + ').';
                return null;
            },
            apply(t, o) { return aplicarBando(t, o); }
        },
        modular: {
            id: 'modular', titulo: 'Vilão Modular', icone: 'fa-puzzle-piece',
            resumo: 'Chefe final cujo poder vem de partes acopladas ao corpo (de 3 a 5). Os heróis precisam desabilitar todas as partes antes de afetar o vilão, que ganha um turno extra por parte.',
            fonteLivro: 'Bestiário de Arton, Vilão Modular (pp. 179-182)',
            nota: 'Aplica as mudanças de Chefe Final, mas não dobra os PV do vilão. Cada parte tem 40% dos PV dele.',
            compat: reasonChefe,
            defaults() { return { partes: [{ id: 'aparato', qtd: 1 }, { id: 'propulsor', qtd: 1 }, { id: 'reflexos', qtd: 1 }] }; },
            nome(t) { return t.nome + ' (Vilão Modular)'; },
            validar(o) {
                const tot = o.partes.reduce((s, p) => s + p.qtd, 0);
                if (tot < 3) return 'Escolha ao menos 3 partes.';
                if (tot > 5) return 'O vilão modular tem no máximo 5 partes.';
                return null;
            },
            apply(t, o) {
                const pvOrig = parseNum(t.pv);
                const r = aplicarChefeBase(t, { semDobrarPV: true });
                const total = o.partes.reduce((s, p) => s + p.qtd, 0);
                const extra = Math.max(0, total - 3);
                const m = r.mudancas.filter((x) => !x.startsWith('ND '));
                m.unshift('PV do vilão mantidos em ' + fmtNum(pvOrig) + ' (não são dobrados)');
                if (extra) { t.nd = ndPlus(t.nd, extra); }
                m.push('ND final: ' + t.nd + ' (+2 de chefe final' + (extra ? ' e +' + extra + ' pelas partes além da terceira' : '') + ', apenas para XP e tesouro)');
                const habs = hVilaoModular(t, o, { i: r.pat, cd: r.cd }, pvOrig);
                t.habilidades = t.habilidades.concat(habs);
                m.push(total + ' partes, ' + fmtNum(pvParte(pvOrig)) + ' PV cada: ' + o.partes.map((p) => PARTES[p.id].nome + (p.qtd > 1 ? ' x' + p.qtd : '')).join(', '));
                t.observacao = [t.observacao, 'Chefe final (Vilão Modular), patamar ' + PATAMARES[r.pat].toLowerCase() + ', CD das partes ' + r.cd + '. Se uma parte causar dano, escolha o tipo conforme o conceito do chefe.'].filter(Boolean).join(' ');
                return { mudancas: m };
            }
        }
    };

    // ---------------------------------------------------------------
    // Estado e interface
    // ---------------------------------------------------------------
    const state = { modelo: null, baseNome: null, opts: {}, busca: '' };
    const compatCache = {};

    function compatDe(modelo, t) {
        const k = modelo.id + '|' + t.nome + '|' + t.fonte;
        if (!(k in compatCache)) compatCache[k] = modelo.compat(t);
        return compatCache[k];
    }

    function construir(modelo, baseNome, opts) {
        const base = get(baseNome);
        if (!base) return null;
        const t = clone(base);
        delete t.img; delete t.imgPosition;
        t.habilidades = t.habilidades || [];
        t.ataques = t.ataques || [];
        const res = modelo.apply(t, opts);
        t.nome = modelo.nome(base, opts);
        t.fonte = 'Homebrew';
        t.isHomebrew = true;
        t.modelos = (base.modelos || []).concat(modelo.titulo);
        t.modelo = modelo.titulo;
        t.baseNome = base.nome;
        t.baseFonte = base.fonte || '';
        t.observacao = [t.observacao, 'Modelo ' + modelo.titulo + ' aplicado sobre "' + base.nome + '" (' + (base.fonte || 'fonte desconhecida') + ').'].filter(Boolean).join(' ');
        return { t, mudancas: res.mudancas };
    }

    function montarModal() {
        if (document.getElementById('modelo-modal')) return;
        const div = document.createElement('div');
        div.className = 'modal-overlay hidden';
        div.id = 'modelo-modal';
        div.innerHTML = `
            <div class="modal-card modelo-modal-card" role="dialog" aria-labelledby="modelo-title">
                <div class="modal-header">
                    <h2 id="modelo-title"></h2>
                    <button class="modal-close-btn" id="modelo-close" title="Fechar"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-body modal-scrollable-body">
                    <div class="modelo-intro">
                        <p id="modelo-resumo"></p>
                        <p class="modelo-fonte"><i class="fa-solid fa-book-bookmark"></i> <span id="modelo-fonte-livro"></span></p>
                        <p class="modelo-nota" id="modelo-nota"></p>
                    </div>
                    <section class="modelo-section">
                        <h3>Criatura base</h3>
                        <div id="modelo-escolhida" class="modelo-escolhida hidden"></div>
                        <div id="modelo-busca-wrap">
                            <input type="text" id="modelo-busca" class="modelo-busca" placeholder="Buscar criatura compatível por nome, tipo ou fonte..." autocomplete="off">
                            <div id="modelo-lista" class="modelo-lista"></div>
                            <p id="modelo-contagem" class="modelo-contagem"></p>
                        </div>
                    </section>
                    <section class="modelo-section hidden" id="modelo-opcoes-sec">
                        <h3>Opções do modelo</h3>
                        <div id="modelo-opcoes"></div>
                    </section>
                    <section class="modelo-section hidden" id="modelo-previa-sec">
                        <h3>Prévia das alterações</h3>
                        <div id="modelo-previa"></div>
                    </section>
                    <div class="form-actions-row">
                        <button type="button" class="action-btn-secondary" id="modelo-cancelar">Cancelar</button>
                        <button type="button" class="action-btn-blood" id="modelo-aplicar" disabled>Aplicar modelo</button>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(div);
        div.addEventListener('click', (e) => { if (e.target === div) fechar(); });
        document.getElementById('modelo-close').addEventListener('click', fechar);
        document.getElementById('modelo-cancelar').addEventListener('click', fechar);
        document.getElementById('modelo-aplicar').addEventListener('click', aplicar);
        document.getElementById('modelo-busca').addEventListener('input', (e) => { state.busca = e.target.value; renderLista(); });
        document.addEventListener('keydown', (e) => {
            const m = document.getElementById('modelo-modal');
            if (e.key === 'Escape' && m && !m.classList.contains('hidden')) fechar();
        });
    }

    function abrir(modeloId, baseNome) {
        const modelo = MODELOS[modeloId];
        if (!modelo) return;
        montarModal();
        state.modelo = modelo;
        state.baseNome = null;
        state.busca = '';
        state.opts = {};
        document.getElementById('modelo-title').innerHTML = '<i class="fa-solid ' + modelo.icone + '"></i> Modelo: ' + esc(modelo.titulo);
        document.getElementById('modelo-resumo').textContent = modelo.resumo;
        document.getElementById('modelo-fonte-livro').textContent = modelo.fonteLivro;
        document.getElementById('modelo-nota').textContent = modelo.nota;
        document.getElementById('modelo-busca').value = '';
        document.getElementById('modelo-modal').classList.remove('hidden');
        if (baseNome) escolher(baseNome); else { atualizarEscolha(); renderLista(); }
        if (!baseNome) setTimeout(() => document.getElementById('modelo-busca').focus(), 50);
    }

    function fechar() {
        const m = document.getElementById('modelo-modal');
        if (m) m.classList.add('hidden');
    }

    function renderLista() {
        const modelo = state.modelo;
        const lista = document.getElementById('modelo-lista');
        const termo = state.busca.trim().toLowerCase();
        const compat = [];
        let incompat = 0;
        allThreats.forEach((t) => {
            if (termo && !(t.nome + ' ' + (t.tipo || '') + ' ' + (t.fonte || '')).toLowerCase().includes(termo)) return;
            if (compatDe(modelo, t) === null) compat.push(t); else incompat++;
        });
        compat.sort((a, b) => parseND(a.nd) - parseND(b.nd) || a.nome.localeCompare(b.nome, 'pt-BR'));
        const MAX = 60;
        lista.innerHTML = compat.slice(0, MAX).map((t) => `
            <button type="button" class="modelo-item" data-nome="${esc(t.nome)}">
                <span class="mi-nome">${esc(t.nome)}</span>
                <span class="mi-meta">${esc(t.tipo || '—')} &bull; ${esc(t.fonte || '')}</span>
                <span class="nd-badge">ND ${esc(t.nd)}</span>
            </button>`).join('');
        lista.querySelectorAll('.modelo-item').forEach((b) => b.addEventListener('click', () => escolher(b.dataset.nome)));
        const c = document.getElementById('modelo-contagem');
        c.textContent = compat.length === 0
            ? 'Nenhuma criatura compatível encontrada nos bancos ativos' + (termo ? ' para essa busca.' : '.')
            : (compat.length > MAX ? 'Mostrando ' + MAX + ' de ' + compat.length + ' criaturas compatíveis; refine a busca. ' : compat.length + ' criaturas compatíveis. ') + (incompat ? incompat + ' incompatíveis ocultas.' : '');
    }

    function escolher(nome) {
        const t = get(nome);
        if (!t) return;
        state.baseNome = nome;
        const motivo = compatDe(state.modelo, t);
        state.opts = motivo ? {} : state.modelo.defaults(t);
        atualizarEscolha();
        renderOpcoes();
        renderPrevia();
    }

    function atualizarEscolha() {
        const box = document.getElementById('modelo-escolhida');
        const wrap = document.getElementById('modelo-busca-wrap');
        const t = state.baseNome ? get(state.baseNome) : null;
        if (!t) {
            box.classList.add('hidden'); wrap.classList.remove('hidden');
            document.getElementById('modelo-opcoes-sec').classList.add('hidden');
            document.getElementById('modelo-previa-sec').classList.add('hidden');
            document.getElementById('modelo-aplicar').disabled = true;
            return;
        }
        const motivo = compatDe(state.modelo, t);
        box.classList.remove('hidden');
        box.innerHTML = `
            <div>
                <strong>${esc(t.nome)}</strong> <span class="nd-badge">ND ${esc(t.nd)}</span>
                <div class="mi-meta">${esc(t.tipo || '—')} &bull; ${esc(t.fonte || '')}</div>
                ${motivo ? '<div class="modelo-erro"><i class="fa-solid fa-triangle-exclamation"></i> Incompatível com este modelo: ' + esc(motivo) + '.</div>' : ''}
            </div>
            <button type="button" class="btn-secondary-gold-small" id="modelo-trocar"><i class="fa-solid fa-rotate"></i> Trocar</button>`;
        document.getElementById('modelo-trocar').addEventListener('click', () => {
            state.baseNome = null; atualizarEscolha(); renderLista();
        });
        wrap.classList.toggle('hidden', !motivo);
        if (motivo) renderLista();
    }

    function renderOpcoes() {
        const sec = document.getElementById('modelo-opcoes-sec');
        const box = document.getElementById('modelo-opcoes');
        const t = get(state.baseNome);
        if (!t || compatDe(state.modelo, t)) { sec.classList.add('hidden'); return; }
        const id = state.modelo.id;
        let html = '';
        if (id === 'licantropo') {
            html = `
            <div class="form-row-2">
                <div class="form-group-input"><label for="mo-animal">Tipo de licantropo</label>
                    <select id="mo-animal">${Object.keys(ANIMAIS).map((k) => `<option value="${k}" ${state.opts.animal === k ? 'selected' : ''}>${esc(ANIMAIS[k].rotulo)}</option>`).join('')}</select></div>
                <div class="form-group-input"><label for="mo-cd">CD da maldição (Fortitude)</label>
                    <input type="number" id="mo-cd" min="1" value="${state.opts.cd}"></div>
            </div>
            <div class="form-row-2">
                <div class="form-group-input"><label for="mo-dano">Dados das armas naturais</label>
                    <select id="mo-dano">
                        <option value="escalado" ${state.opts.dano === 'escalado' ? 'selected' : ''}>Mesmo nº de dados da arma principal (d6)</option>
                        <option value="literal" ${state.opts.dano === 'literal' ? 'selected' : ''}>Regra literal (1d6)</option>
                    </select></div>
                <div class="form-group-input"><label for="mo-rd">Redução de dano /mitral (0 = não aplicar)</label>
                    <input type="number" id="mo-rd" min="0" value="${state.opts.rd}"></div>
            </div>`;
        } else if (id === 'mestre') {
            html = `
            <div class="form-group-input"><label for="mo-fonte">Fonte de poder</label>
                <select id="mo-fonte">${Object.keys(FONTES).map((k) => `<option value="${k}" ${state.opts.fonte === k ? 'selected' : ''}>${esc(FONTES[k].nome)}</option>`).join('')}</select>
                <small class="mo-hint" id="mo-fonte-hint"></small></div>
            <div class="form-group-input"><label for="mo-emanacao">Emanação</label>
                <select id="mo-emanacao">${Object.keys(EMANACOES).map((k) => `<option value="${k}" ${state.opts.emanacao === k ? 'selected' : ''}>${esc(EMANACOES[k].nome)}</option>`).join('')}</select>
                <small class="mo-hint" id="mo-emanacao-hint"></small></div>`;
        } else if (id === 'modular') {
            html = `<p class="modelo-contagem" id="mo-partes-info"></p><div class="modelo-partes">` +
                Object.keys(PARTES).map((k) => {
                    const p = PARTES[k];
                    const sel = state.opts.partes.find((x) => x.id === k);
                    return `<label class="modelo-parte ${sel ? 'on' : ''}">
                        <input type="checkbox" data-parte="${k}" ${sel ? 'checked' : ''}>
                        <span><strong>${esc(p.nome)}</strong><small>${esc(p.resumo)}</small></span>
                        ${p.max ? `<select data-qtd="${k}" ${sel ? '' : 'disabled'} title="Quantidade"><option value="1" ${sel && sel.qtd === 1 ? 'selected' : ''}>1x</option><option value="2" ${sel && sel.qtd === 2 ? 'selected' : ''}>2x</option></select>` : ''}
                    </label>`;
                }).join('') + '</div>';
        } else if (id === 'rei') {
            const n = state.opts.n;
            const orbeSel = state.opts.recursos.includes('orbe'), seloSel = state.opts.recursos.includes('selo');
            html = `
            <div class="form-group-input"><label for="mo-arena">Arena</label>
                <select id="mo-arena">${Object.keys(ARENAS).map((k) => `<option value="${k}" ${state.opts.arena === k ? 'selected' : ''}>${esc(ARENAS[k].nome)}</option>`).join('')}</select>
                <small class="mo-hint" id="mo-arena-hint"></small></div>
            <p class="modelo-contagem" id="mo-recursos-info"></p>
            <div class="modelo-partes">` + Object.keys(RECURSOS).map((k) => {
                const r = RECURSOS[k], sel = state.opts.recursos.includes(k);
                return `<label class="modelo-parte ${sel ? 'on' : ''}"><input type="checkbox" data-recurso="${k}" ${sel ? 'checked' : ''}>
                    <span><strong>${esc(r.nome)}</strong><small>${esc(r.resumo)}</small></span></label>`;
            }).join('') + `</div>` +
            (orbeSel ? `<div class="form-group-input"><label for="mo-orbe">Orbe Elemental: tipo de dano</label>
                <select id="mo-orbe">${['ácido', 'eletricidade', 'fogo', 'frio', 'luz', 'trevas'].map((e) => `<option value="${e}" ${state.opts.orbe === e ? 'selected' : ''}>${e}</option>`).join('')}</select></div>` : '') +
            (seloSel ? `<div class="form-group-input"><label for="mo-selo">Selo Místico: magia escolhida</label>
                <input type="text" id="mo-selo" value="${esc(state.opts.selo)}" placeholder="Ex.: Bola de Fogo"></div>` : '');
        } else if (id === 'bando') {
            const o = state.opts, base = get(state.baseNome);
            const i0 = ND_LADDER.indexOf(o.ndBase);
            html = `
            <div class="form-group-input"><label for="mo-nome">Nome do bando</label>
                <input type="text" id="mo-nome" value="${esc(o.nome)}"></div>
            <div class="form-row-2">
                <div class="form-group-input"><label for="mo-comp">Composição</label>
                    <select id="mo-comp">
                        <option value="dez" ${o.comp === 'dez' ? 'selected' : ''}>Cerca de dez indivíduos</option>
                        <option value="cem" ${o.comp === 'cem' ? 'selected' : ''}>Dezenas ou cerca de cem</option>
                        <option value="outro" ${o.comp === 'outro' ? 'selected' : ''}>Personalizada</option>
                    </select></div>
                <div class="form-group-input"><label for="mo-papel">Papel de combate (tabela)</label>
                    <select id="mo-papel">${['lacaio', 'solo', 'especial'].map((r) => `<option value="${r}" ${o.papel === r ? 'selected' : ''}>${r.charAt(0).toUpperCase() + r.slice(1)}</option>`).join('')}</select></div>
            </div>
            <div class="form-row-2">
                <div class="form-group-input"><label for="mo-nd">ND do bando (criatura-base: ND ${esc(o.ndBase)})</label>
                    <select id="mo-nd">${ND_LADDER.slice(i0 + 1).map((n) => `<option value="${n}" ${o.nd === n ? 'selected' : ''}>ND ${n}</option>`).join('')}</select></div>
                <div class="form-group-input"><label for="mo-tam">Tamanho do bando</label>
                    <select id="mo-tam" ${o.tamanho < 0 ? 'disabled' : ''}>${TAMANHOS.map((n, k) => `<option value="${k}" ${o.tamanho === k ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
            </div>
            <div class="form-group-input"><label for="mo-extra">Habilidade extra (se o bando subir de patamar)</label>
                <select id="mo-extra"><option value="nenhuma" ${o.extra === 'nenhuma' ? 'selected' : ''}>Nenhuma</option><option value="varrer" ${o.extra === 'varrer' ? 'selected' : ''}>Varrer</option></select>
                <small class="mo-hint">O papel de combate foi estimado pelos PV da criatura em relação à tabela; troque se não corresponder.</small></div>`;
        } else {
            html = '<p class="modelo-contagem">Este modelo não tem opções: as alterações seguem as regras do livro.</p>';
        }
        box.innerHTML = html;
        sec.classList.remove('hidden');
        ligarOpcoes();
    }

    function ligarOpcoes() {
        const id = state.modelo.id;
        const on = (sel, ev, fn) => { const el = document.querySelector(sel); if (el) el.addEventListener(ev, fn); };
        if (id === 'licantropo') {
            on('#mo-animal', 'change', (e) => { state.opts.animal = e.target.value; renderPrevia(); });
            on('#mo-cd', 'input', (e) => { state.opts.cd = e.target.value; renderPrevia(); });
            on('#mo-rd', 'input', (e) => { state.opts.rd = parseInt(e.target.value, 10) || 0; renderPrevia(); });
            on('#mo-dano', 'change', (e) => { state.opts.dano = e.target.value; renderPrevia(); });
        } else if (id === 'mestre') {
            const dicas = () => {
                document.getElementById('mo-fonte-hint').textContent = FONTES[state.opts.fonte].resumo;
                document.getElementById('mo-emanacao-hint').textContent = EMANACOES[state.opts.emanacao].resumo;
            };
            on('#mo-fonte', 'change', (e) => { state.opts.fonte = e.target.value; dicas(); renderPrevia(); });
            on('#mo-emanacao', 'change', (e) => { state.opts.emanacao = e.target.value; dicas(); renderPrevia(); });
            dicas();
        } else if (id === 'rei') {
            on('#mo-arena', 'change', (e) => { state.opts.arena = e.target.value; dicaArena(); renderPrevia(); });
            const dicaArena = () => { const h = document.getElementById('mo-arena-hint'); if (h) h.textContent = ARENAS[state.opts.arena].resumo; };
            dicaArena();
            document.querySelectorAll('[data-recurso]').forEach((cb) => cb.addEventListener('change', () => {
                const k = cb.dataset.recurso;
                if (cb.checked) state.opts.recursos.push(k); else state.opts.recursos = state.opts.recursos.filter((x) => x !== k);
                if (k === 'orbe' || k === 'selo') renderOpcoes();
                else cb.closest('.modelo-parte').classList.toggle('on', cb.checked);
                renderPrevia();
            }));
            on('#mo-orbe', 'change', (e) => { state.opts.orbe = e.target.value; renderPrevia(); });
            on('#mo-selo', 'input', (e) => { state.opts.selo = e.target.value; renderPrevia(); });
        } else if (id === 'bando') {
            const o = state.opts;
            const base = get(state.baseNome);
            const i0 = ND_LADDER.indexOf(o.ndBase);
            const tam0 = tamanhoDe(base.tipo);
            on('#mo-nome', 'input', (e) => { o.nome = e.target.value; renderPrevia(); });
            on('#mo-papel', 'change', (e) => { o.papel = e.target.value; renderPrevia(); });
            on('#mo-nd', 'change', (e) => { o.nd = e.target.value; o.comp = 'outro'; document.getElementById('mo-comp').value = 'outro'; o.composicao = 'composição personalizada'; renderPrevia(); });
            on('#mo-tam', 'change', (e) => { o.tamanho = parseInt(e.target.value, 10); o.comp = 'outro'; document.getElementById('mo-comp').value = 'outro'; o.composicao = 'composição personalizada'; renderPrevia(); });
            on('#mo-extra', 'change', (e) => { o.extra = e.target.value; renderPrevia(); });
            on('#mo-comp', 'change', (e) => {
                o.comp = e.target.value;
                if (o.comp === 'dez') { o.nd = ND_LADDER[Math.min(ND_LADDER.length - 1, i0 + 3)]; o.tamanho = tam0 < 0 ? -1 : Math.min(5, tam0 + 1); o.composicao = 'cerca de dez indivíduos'; }
                if (o.comp === 'cem') { o.nd = ND_LADDER[Math.min(ND_LADDER.length - 1, i0 + 7)]; o.tamanho = tam0 < 0 ? -1 : Math.min(5, tam0 + 3); o.composicao = 'dezenas ou cerca de cem indivíduos'; }
                if (o.comp === 'outro') o.composicao = 'composição personalizada';
                document.getElementById('mo-nd').value = o.nd;
                if (o.tamanho >= 0) document.getElementById('mo-tam').value = String(o.tamanho);
                renderPrevia();
            });
        } else if (id === 'modular') {
            document.querySelectorAll('[data-parte]').forEach((cb) => cb.addEventListener('change', () => {
                const k = cb.dataset.parte;
                if (cb.checked) state.opts.partes.push({ id: k, qtd: 1 });
                else state.opts.partes = state.opts.partes.filter((p) => p.id !== k);
                const sel = document.querySelector('[data-qtd="' + k + '"]');
                if (sel) { sel.disabled = !cb.checked; sel.value = '1'; }
                cb.closest('.modelo-parte').classList.toggle('on', cb.checked);
                renderPrevia();
            }));
            document.querySelectorAll('[data-qtd]').forEach((s) => s.addEventListener('change', () => {
                const p = state.opts.partes.find((x) => x.id === s.dataset.qtd);
                if (p) p.qtd = parseInt(s.value, 10);
                renderPrevia();
            }));
        }
    }

    function renderPrevia() {
        const sec = document.getElementById('modelo-previa-sec');
        const box = document.getElementById('modelo-previa');
        const btn = document.getElementById('modelo-aplicar');
        const t = state.baseNome ? get(state.baseNome) : null;
        if (!t || compatDe(state.modelo, t)) { sec.classList.add('hidden'); btn.disabled = true; return; }
        sec.classList.remove('hidden');
        const erro = state.modelo.validar ? state.modelo.validar(state.opts) : null;
        if (state.modelo.id === 'modular') {
            const tot = state.opts.partes.reduce((s, p) => s + p.qtd, 0);
            const info = document.getElementById('mo-partes-info');
            if (info) info.textContent = tot + ' de 5 partes escolhidas (mínimo 3).';
        }
        if (state.modelo.id === 'rei') {
            const info = document.getElementById('mo-recursos-info');
            if (info) info.textContent = state.opts.recursos.length + ' de ' + state.opts.n + ' recursos escolhidos (2 por patamar do chefe: ' + PATAMARES[patamarIndex(get(state.baseNome).nd)].toLowerCase() + ').';
        }
        if (erro) {
            box.innerHTML = '<div class="modelo-erro"><i class="fa-solid fa-triangle-exclamation"></i> ' + esc(erro) + '</div>';
            btn.disabled = true;
            return;
        }
        let r;
        try { r = construir(state.modelo, state.baseNome, clone(state.opts)); } catch (e) { console.error(e); r = null; }
        if (!r) { box.innerHTML = '<div class="modelo-erro">Não foi possível montar a prévia.</div>'; btn.disabled = true; return; }
        const b = get(state.baseNome), n = r.t;
        const linha = (rot, a, c) => `<tr><th>${rot}</th><td>${esc(a)}</td><td class="seta">→</td><td>${esc(c)}</td></tr>`;
        box.innerHTML = `
            <div class="modelo-novo-nome"><i class="fa-solid fa-scroll"></i> <strong>${esc(n.nome)}</strong></div>
            <table class="modelo-comparacao">
                ${linha('ND', b.nd, n.nd)}${linha('PV', b.pv, n.pv)}${linha('PM', b.pm || 0, n.pm || 0)}
                ${linha('Defesa', b.defesa + (b.defesaObs ? ' (' + b.defesaObs + ')' : ''), n.defesa + (n.defesaObs ? ' (' + n.defesaObs + ')' : ''))}
                ${b.tipo !== n.tipo ? linha('Tipo', b.tipo, n.tipo) : ''}
                ${(b.fort + b.ref + b.von) !== (n.fort + n.ref + n.von) ? linha('Resist.', 'Fort ' + b.fort + ', Ref ' + b.ref + ', Von ' + b.von, 'Fort ' + n.fort + ', Ref ' + n.ref + ', Von ' + n.von) : ''}
                ${linha('Ataques', (b.ataques || []).length, (n.ataques || []).length)}
                ${linha('Habilidades', (b.habilidades || []).length, (n.habilidades || []).length)}
            </table>
            <ul class="modelo-mudancas">${r.mudancas.map((m) => '<li>' + esc(m) + '</li>').join('')}</ul>
            <p class="modelo-contagem">Será salva como ameaça homebrew; a ficha original não é alterada.</p>`;
        btn.disabled = false;
    }

    function aplicar() {
        const modelo = state.modelo;
        if (!modelo || !state.baseNome) return;
        const t0 = get(state.baseNome);
        if (!t0 || compatDe(modelo, t0)) return;
        const r = construir(modelo, state.baseNome, clone(state.opts));
        if (!r) return;
        r.t.nome = nomeUnico(r.t.nome);

        let hb = [];
        try { hb = JSON.parse(localStorage.getItem(HB_KEY)) || []; } catch (e) { hb = []; }
        hb.unshift(r.t);
        localStorage.setItem(HB_KEY, JSON.stringify(hb));

        // Garante que o banco geral (onde ficam os homebrews) esteja ativo
        if (!dbGeral) {
            dbGeral = true;
            const chk = document.getElementById('db-check-geral');
            if (chk) chk.checked = true;
        }
        loadThreats();
        updateThreatsGrid();
        fechar();
        setTimeout(() => showDetail(r.t.nome), 150);
    }

    // ---------------------------------------------------------------
    // Botões (barra lateral e ficha)
    // ---------------------------------------------------------------
    window.renderModelButtons = function (nome) {
        return '<div class="modelo-ficha-bar"><span class="modelo-ficha-rotulo"><i class="fa-solid fa-wand-sparkles"></i> Aplicar modelo</span>' +
            Object.keys(MODELOS).map((k) => {
                const m = MODELOS[k];
                const ok = compatDe(m, get(nome) || {});
                return '<button type="button" class="modelo-chip' + (ok ? ' off' : '') + '" data-modelo="' + k + '" data-base="' + esc(nome) + '" title="' + esc(ok ? 'Incompatível: ' + ok : m.resumo) + '">' +
                    '<i class="fa-solid ' + m.icone + '"></i> ' + esc(m.titulo) + '</button>';
            }).join('') + '</div>';
    };

    document.addEventListener('click', (e) => {
        const b = e.target.closest('[data-modelo]');
        if (!b) return;
        e.preventDefault();
        abrir(b.dataset.modelo, b.dataset.base || null);
    });

    window.openModeloModal = abrir;
    window.MODELOS_T20 = MODELOS;
})();
