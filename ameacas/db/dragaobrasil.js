const dragaobrasil_db = [
    {
        "nome": "Arraia-Seca",
        "tipo": "Monstro Médio",
        "nd": "3",
        "iniciativa": "+6",
        "percepcao": "+6",
        "percepcaoObs": "percepção às cegas (médio)",
        "defesa": "19",
        "fort": "+4",
        "ref": "+14",
        "von": "+9",
        "defesaObs": "redução de fogo 5",
        "pv": "24",
        "desl": "9m (6q), escavação 9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "3",
            "con": "2",
            "int": "–4",
            "sab": "1",
            "car": "–4"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "4d4+12",
                "desc": "Crítico 19."
            }
        ],
        "habilidades": [
            {
                "nome": "Armadilha de Ferrão",
                "tipo": "Habilidade",
                "desc": "Se estiver imóvel sob a areia, funciona como uma armadilha que ocupa 1,5m. Criaturas que entram sofrem 4d8+6 de perfuração e ficam sangrando (Ref CD 17 reduz à metade e evita a condição). Não pode ser desarmada, mas pode ser encontrada (veja Espreitadora das Areias)."
            },
            {
                "nome": "Deslizamento Camuflado",
                "tipo": "Qualidade",
                "desc": "Possui camuflagem leve enquanto está em terreno arenoso."
            },
            {
                "nome": "Espritadora das Areias",
                "tipo": "Qualidade",
                "desc": "Enquanto parada sob a areia, é muito difícil percebê-la. A CD para Investigação ou Percepção é 30, ou +10 em seu teste de Furtividade, o que for maior."
            }
        ],
        "pericias": [
            "Furtividade +6"
        ],
        "tesouro": "Nenhum",
        "fonte": "Dragão Brasil"
    },
    {
        "nome": "Anshira",
        "tipo": "Espírito Médio",
        "nd": "9",
        "iniciativa": "+9",
        "percepcao": "+16",
        "percepcaoObs": "visão no escuro",
        "defesa": "32",
        "fort": "+14",
        "ref": "+10",
        "von": "+21",
        "defesaObs": "imunidade a ácido e efeitos mentais, redução de dano 5/mitral",
        "pv": "224",
        "desl": "9m (6q), sem redução por terreno difícil natural",
        "pm": "55",
        "atributos": {
            "for": "–1",
            "des": "1",
            "con": "3",
            "int": "1",
            "sab": "6",
            "car": "6"
        },
        "ataques": [],
        "habilidades": [
            {
                "nome": "Refúgio Rochoso",
                "tipo": "Qualidade",
                "desc": "A caverna da anshira fornece uma condição de descanso confortável para ela e quaisquer criaturas que acolher."
            },
            {
                "nome": "Sentidos da Caverna",
                "tipo": "Qualidade",
                "desc": "Dentro de sua caverna, possui percepção às cegas em toda a área."
            },
            {
                "nome": "Simbiose Rochosa",
                "tipo": "Qualidade",
                "desc": "O espírito da anshira é a própria caverna. Quando sua forma humanoide é destruída, outra surge em 2d4 dias no ponto mais profundo da caverna. Não pode se afastar mais de 2km da entrada, ou perde 8d6 PV por hora. Só pode ser morta com um desmoronamento enquanto estiver fora da caverna."
            },
            {
                "nome": "Magias",
                "tipo": "Habilidade",
                "desc": "Conjuradora de 9º nível (CD 32)."
            }
        ],
        "magias": [
            {
                "nome": "Comando",
                "acao": "Padrão",
                "custo": "4 PM",
                "efeito": "Duas criaturas em alcance curto ficam pasmas por 1 rodada. Von evita. Cada criatura só pode ser afetada uma vez por cena."
            },
            {
                "nome": "Controlar Terra",
                "acao": "Padrão",
                "custo": "9 PM",
                "efeito": "Transforma 9 cubos de terra (1,5m de lado) em alcance longo em uma parede (RD 8 e 50 PV) que fornece cobertura total. Pode aplicar outros efeitos conforme regras de Tormenta20."
            },
            {
                "nome": "Enfeitiçar",
                "acao": "Padrão",
                "custo": "1 PM",
                "efeito": "Um humanoide em alcance curto fica enfeitiçado. Von evita. Ações hostis contra o alvo ou seus aliados dissipam a magia."
            },
            {
                "nome": "Pele de Pedra",
                "acao": "Padrão",
                "custo": "6 PM",
                "efeito": "Recebe redução de dano 5 até o fim da cena."
            },
            {
                "nome": "Tranquilidade",
                "acao": "Padrão",
                "custo": "2 PM",
                "efeito": "Uma criatura em alcance curto tem sua atitude mudada para indiferente e não pode atacar ou realizar ações hostis até o fim da cena. Von reduz para penalidade de –2 em testes de ataque. Ações hostis contra o alvo ou seus aliados dissipam a magia."
            }
        ],
        "pericias": [
            "Adestramento +16",
            "Diplomacia +16",
            "Furtividade +11 (+16 em desertos)",
            "Intuição +14",
            "Misticismo +9",
            "Sobrevivência +16"
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil"
    },
    {
        "nome": "Caçador de Condenados",
        "tipo": "Morto-vivo Grande",
        "nd": "11",
        "iniciativa": "+10",
        "percepcao": "+9",
        "percepcaoObs": "visão no escuro",
        "defesa": "40",
        "fort": "+24",
        "ref": "+18",
        "von": "+11",
        "defesaObs": "redução corte, frio e perfuração 5",
        "pv": "530",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "7",
            "des": "1",
            "con": "2",
            "int": "–2",
            "sab": "0",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Cimitarra",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d6+10",
                "desc": "Crítico 18."
            },
            {
                "nome": "Foice",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d4+10",
                "desc": "Crítico x3."
            },
            {
                "nome": "Maça",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "3d8+10",
                "desc": ""
            },
            {
                "nome": "Machadinha",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d6+10",
                "desc": "Crítico x3."
            },
            {
                "nome": "Cauda Óssea",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "2d12+10 corte",
                "desc": "Se causar 5 ou mais de dano além do necessário para acertar, alvo fica sangrando."
            }
        ],
        "habilidades": [
            {
                "nome": "Cauda Óssea",
                "tipo": "Habilidade",
                "desc": "Se um ataque de cauda acertar uma criatura por 5 ou mais, ela fica sangrando."
            },
            {
                "nome": "Condenação Corrupta (Movimento)",
                "tipo": "Habilidade",
                "desc": "Condena uma criatura em alcance curto. A criatura fica abalada e alquebrada (Von CD 31 evita). Uma vez afetada, não pode ser alvo novamente por 24h. Recarga (movimento). Mental."
            },
            {
                "nome": "Sequência Mortal",
                "tipo": "Habilidade",
                "desc": "Sempre que acerta um ataque em uma criatura, recebe bônus cumulativo de +1d6 em rolagens de dano contra ela até o fim do turno."
            },
            {
                "nome": "Obediência Eterna",
                "tipo": "Qualidade",
                "desc": "Sofre –5 em testes contra devotos de Sszzaas."
            }
        ],
        "pericias": [
            "Intimidação +8",
            "Sobrevivência +9"
        ],
        "equipamento": [
            "Armadura de couro batido",
            "Cimitarra",
            "Foice",
            "Maça",
            "Machadinha"
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil"
    },
    {
        "nome": "Constritora Arenosa",
        "tipo": "Monstro Grande",
        "nd": "9",
        "iniciativa": "+10",
        "percepcao": "+10",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "32",
        "fort": "+15",
        "ref": "+21",
        "von": "+9",
        "defesaObs": "fortificação 75%, imunidade a ácido, eletricidade, metamorfose e trevas",
        "pv": "325",
        "desl": "9m (6q), escalar 6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "5",
            "int": "–5",
            "sab": "2",
            "car": "–4"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "6d12+23",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado (Livre)",
                "tipo": "Habilidade",
                "desc": "Se acerta um ataque de mordida, pode fazer a manobra agarrar (teste +28)."
            },
            {
                "nome": "Constrição (Livre)",
                "tipo": "Habilidade",
                "desc": "No início de cada turno, causa 12d12+23 pontos de dano de impacto na criatura que estiver agarrando."
            },
            {
                "nome": "Escorrer",
                "tipo": "Qualidade",
                "desc": "Pode passar por qualquer espaço apertado por onde um grão de areia poderia passar."
            },
            {
                "nome": "Forma de Areia",
                "tipo": "Qualidade",
                "desc": "Pode se transformar em uma pilha de areia imóvel. Um personagem deve passar em Percepção (CD 35) para perceber que é uma criatura; em terreno arenoso, a CD aumenta para 40."
            },
            {
                "nome": "Vulnerabilidade Hídrica",
                "tipo": "Qualidade",
                "desc": "Se ficar pelo menos 1 rodada imersa em líquido, começa a se transformar em lama, ficando debilitada e lenta até passar 1 hora fora do líquido."
            }
        ],
        "pericias": [
            "Furtividade +8 (+13 em deserto)"
        ],
        "tesouro": "Duas gemas negras (T$ 1.000 cada) e duas presas de ônix (T$ 300 cada, usadas para fabricar armas de corte, leves ou de uma mão, superiores).",
        "fonte": "Dragão Brasil"
    },
    {
        "nome": "Ressecado Saqueador",
        "tipo": "Morto-vivo Médio",
        "nd": "4",
        "iniciativa": "+5",
        "percepcao": "+5",
        "percepcaoObs": "sensibilidade à luz, visão no escuro",
        "defesa": "22",
        "fort": "+10",
        "ref": "+15",
        "von": "+5",
        "defesaObs": "imunidade a frio, redução de corte e perfuração 5, vulnerabilidade a fogo",
        "pv": "30",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "1",
            "int": "0",
            "sab": "1",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Cimitarra",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "2d6+12",
                "desc": "Crítico 18, mais 2d8 trevas."
            },
            {
                "nome": "Arco Curto",
                "tipo": "À Distância",
                "bonus": "+16",
                "dano": "2d6+12",
                "desc": "Crítico x3, mais 2d8 trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Celeridade Odiosa",
                "tipo": "Habilidade",
                "desc": "Pode executar uma ação padrão adicional em seu primeiro turno de combate."
            },
            {
                "nome": "Ódio aos Vivos",
                "tipo": "Habilidade",
                "desc": "Contra criaturas vivas, recebe +2 em testes de perícia e causa +2d4 pontos de dano."
            },
            {
                "nome": "Visão Tumular",
                "tipo": "Qualidade",
                "desc": "Está permanentemente sob efeito da magia Visão Mística com aprimoramento para enxergar criaturas e objetos invisíveis."
            }
        ],
        "pericias": [
            "Cavalgar +5",
            "Intimidação +4",
            "Sobrevivência +5"
        ],
        "equipamento": [
            "Arco curto",
            "Armadura de couro batido",
            "Cimitarra",
            "Escudo leve",
            "Flechas x20"
        ],
        "tesouro": "Metade",
        "fonte": "Dragão Brasil"
    },
    {
        "nome": "Ressecado Líder",
        "tipo": "Morto-vivo Médio",
        "nd": "4",
        "iniciativa": "+8",
        "percepcao": "+8",
        "percepcaoObs": "sensibilidade à luz, visão no escuro",
        "defesa": "31",
        "fort": "+14",
        "ref": "+20",
        "von": "+7",
        "defesaObs": "imunidade a frio, redução de corte e perfuração 5, vulnerabilidade a fogo",
        "pv": "280",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "1",
            "con": "2",
            "int": "1",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Cimitarra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d6+12",
                "desc": "Crítico 18, mais 2d8 trevas."
            },
            {
                "nome": "Arco Curto x2",
                "tipo": "À Distância",
                "bonus": "+24",
                "dano": "2d6+12",
                "desc": "Crítico x3, mais 2d8 trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Celeridade Odiosa",
                "tipo": "Habilidade",
                "desc": "Pode executar uma ação padrão adicional em seu primeiro turno de combate."
            },
            {
                "nome": "Ódio aos Vivos",
                "tipo": "Habilidade",
                "desc": "Contra criaturas vivas, recebe +2 em testes de perícia e causa +2d4 pontos de dano."
            },
            {
                "nome": "Ordens Letais (Movimento)",
                "tipo": "Habilidade",
                "desc": "Comanda aliados ressecados em alcance médio. Eles recebem +1d4 em rolagens de dano até o fim da cena. Contra criaturas vivas, este bônus se torna +2d4."
            },
            {
                "nome": "Visão Tumular",
                "tipo": "Qualidade",
                "desc": "Está permanentemente sob efeito da magia Visão Mística com aprimoramento para enxergar criaturas e objetos invisíveis."
            }
        ],
        "pericias": [
            "Cavalgar +8",
            "Guerra +8",
            "Intimidação +7",
            "Sobrevivência +8"
        ],
        "equipamento": [
            "Arco curto",
            "Cimitarra",
            "Couraça",
            "Escudo leve",
            "Flechas x20"
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil"
    },
    {
        "nome": "Vigilante",
        "tipo": "Humanoide Médio",
        "nd": "7",
        "iniciativa": "+12",
        "percepcao": "+10",
        "percepcaoObs": "",
        "defesa": "30",
        "fort": "+14",
        "ref": "+17",
        "von": "+11",
        "defesaObs": "resistência a encantos +2",
        "pv": "50",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "3",
            "con": "2",
            "int": "1",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Espada longa",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "2d8+25",
                "desc": "19."
            },
            {
                "nome": "Balestra alquímica",
                "tipo": "À Distância",
                "bonus": "+27",
                "dano": "2d12+25",
                "desc": "Mais 6d6 de ácido, mais lento pela cena (Fort CD 24 reduz a 1 rodada), 19."
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Coordenado",
                "tipo": "Padrão",
                "desc": "Dois ou mais guardas podem atacar em conjunto. Use as mesmas estatísticas do ataque escolhido (corpo a corpo ou à distância), com bônus de +4 no teste de ataque e +1d8+10 na rolagem de dano para cada guarda além do primeiro."
            },
            {
                "nome": "Ginete de Baleote",
                "tipo": "Qualidade",
                "desc": "Alguns vigilantes possuem um baleote, um parceiro montaria Grande (veja Ameaças de Arton, p. 210). Enquanto estiver montado, recebe deslocamento de voo 12m e pode usar uma ação de movimento para causar 2d6 de dano de eletricidade em uma linha de 9m."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+12"
            },
            {
                "nome": "Cavalgar",
                "valor": "+12"
            },
            {
                "nome": "Intuição",
                "valor": "+10"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Dragão Brasil",
        "equipamento": "Espada longa certeira de adamante, balestra certeira com injeção alquímica, cota de malha de mitral"
    },
    {
        "nome": "Comissário Vigílico",
        "tipo": "Humanoide Médio",
        "nd": "11",
        "iniciativa": "+14",
        "percepcao": "+16",
        "percepcaoObs": "",
        "defesa": "42",
        "fort": "+15",
        "ref": "+20",
        "von": "+25",
        "defesaObs": "resistência a magia +2",
        "pv": "250",
        "desl": "9m (6q)",
        "pm": "81",
        "atributos": {
            "for": "2",
            "des": "3",
            "con": "2",
            "int": "4",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Espada longa",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "2d10+30",
                "desc": "Mais 10d8+20 de eletricidade, 18."
            }
        ],
        "habilidades": [
            {
                "nome": "Conjurador Encouraçado",
                "tipo": "Qualidade",
                "desc": "Pode lançar magias arcanas cavalgando e/ou de armadura sem precisar de testes de Misticismo."
            },
            {
                "nome": "Visão do Oficial",
                "tipo": "Qualidade",
                "desc": "Permanentemente sob efeito da magia Visão Mística com o aprimoramento que permite enxergar criaturas e objetos invisíveis e soma sua Inteligência aos seus testes de Intuição e Percepção (já contabilizado)."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um mago de 11º nível (CD 37). • Amarras Etéreas (Padrão, 5 PM) Quatro laços de energia se enroscam em uma criatura em alcance médio, deixando-a agarrada (Ref evita). A vítima pode gastar uma ação padrão para fazer um teste de Atletismo; se passar, destrói um laço, mais um laço adicional para cada 5 pontos pelos quais superou a CD. Os laços podem ser atacados: cada um tem Def 10, 10 PV, RD 5 e imunidade a dano mágico. Se todos forem destruídos, a magia é dissipada. O oficial pode gastar +2 PM para afetar +1 alvo (até 11 PM para 4 alvos). • Arma Mágica (Padrão, 10 PM) Uma arma em alcance de toque se torna mágica até o fim da cena: +3 em testes de ataque e rolagens de dano e +2d6 de fogo. Se estiver empunhando a arma, usa Inteligência no lugar de Força nos testes de ataque (ataque total +40). • Dissipar Magia (Padrão, 3 PM) Escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo; todas as magias no alvo com CD menor que o teste são dissipadas. Contra um item mágico, transforma-o em mundano por 1d6 rodadas (Von anula). • Seta Infalível Daquele Professor Mequetrefe (Padrão, 7 PM) Projeta cinco lanças de energia distribuídas em até cinco criaturas em alcance médio; cada lança causa 1d8+1 de dano de essência (uma delas recebe +4 na rolagem de dano)."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Intuição",
                "valor": "+16"
            },
            {
                "nome": "Misticismo",
                "valor": "+15"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Dragão Brasil",
        "equipamento": "Espada longa certeira e precisa de adamante, cota de malha de mitral"
    },
    {
        "nome": "Aster Arelor, a Lâmina Celeste",
        "tipo": "Espírito (suraggel) Médio",
        "nd": "15",
        "iniciativa": "+22",
        "percepcao": "+23",
        "percepcaoObs": "visão no escuro",
        "defesa": "55",
        "fort": "+17",
        "ref": "+22",
        "von": "+27",
        "defesaObs": "resistência a encantamentos +2",
        "pv": "700",
        "desl": "9m (6q), voo 18m (12q)",
        "pm": "81",
        "atributos": {
            "for": "4",
            "des": "7",
            "con": "5",
            "int": "3",
            "sab": "5",
            "car": "5"
        },
        "ataques": [
            {
                "nome": "Espada longa",
                "tipo": "Corpo a Corpo",
                "bonus": "+45",
                "dano": "4d10+30",
                "desc": "x3, 17, mais 2d8 de eletricidade."
            }
        ],
        "habilidades": [
            {
                "nome": "Aura de Disciplina",
                "tipo": "Qualidade",
                "desc": "Emana uma aura de disciplina com 9m de raio. Criaturas que comecem o turno dentro da aura sofrem –5 em Enganação, Furtividade e Ladinagem. Aliados de Aster dentro da aura recebem +5 em testes de ataque e de Vontade."
            },
            {
                "nome": "Golpe da Ascensão",
                "tipo": "Completa",
                "desc": "Aster voa ao redor de uma criatura Grande ou menor, que deve fazer um teste de Fortitude (CD 45). Em falha, a lufada de vento das asas a ergue do solo, deixando-a desprevenida; Aster golpeia com +2 na margem de ameaça, +1 no multiplicador de crítico e ignorando 20 de RD. Por fim, a criatura despenca, sofrendo 4d6 de impacto e ficando caída. Em sucesso, Aster ainda pode atacar, mas sem os bônus da habilidade. Recarga (movimento)."
            },
            {
                "nome": "Graça Aérea",
                "tipo": "Qualidade",
                "desc": "Se gastar uma ação de movimento para se deslocar voando, Aster recebe +5 na Defesa e evasão aprimorada."
            },
            {
                "nome": "Olhar Dourado",
                "tipo": "Movimento",
                "desc": "Uma criatura em alcance médio sofre 6d12+6 de dano de luz e fica cega por 1d4+1 rodadas (Fort CD 45 reduz para ofuscado por 1 rodada). Como alternativa, gera o efeito básico de Dissipar Magia, exceto que só dissipa efeitos de encantamento, ilusão ou trevas e que Aster faz um teste de Intuição contra a CD da magia, em vez de Misticismo."
            },
            {
                "nome": "Visão do Oficial",
                "tipo": "Qualidade",
                "desc": "Permanentemente sob efeito da magia Visão Mística com o aprimoramento que permite enxergar criaturas e objetos invisíveis e soma sua Inteligência aos seus testes de Intuição e Percepção (já contabilizado)."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+22"
            },
            {
                "nome": "Intuição",
                "valor": "+23"
            },
            {
                "nome": "Misticismo",
                "valor": "+18"
            },
            {
                "nome": "Nobreza",
                "valor": "+18"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Dragão Brasil",
        "equipamento": "Couraça defensora e protetora, espada longa certeira, formidável e precisa de mitral"
    },
    {
        "nome": "Capanga da Sangue Sombrio",
        "tipo": "Humanoide Médio",
        "nd": "6",
        "iniciativa": "+13",
        "percepcao": "+10",
        "percepcaoObs": "",
        "defesa": "32",
        "fort": "+14",
        "ref": "+19",
        "von": "+8",
        "defesaObs": "",
        "pv": "40",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "4",
            "con": "1",
            "int": "1",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Adagas",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "2d6+15",
                "desc": "x2, mais veneno, 19."
            },
            {
                "nome": "Besta de repetição",
                "tipo": "À Distância",
                "bonus": "+27",
                "dano": "2d8+15",
                "desc": "x2, mais veneno, 19."
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "tipo": "Qualidade",
                "desc": "+4d6."
            },
            {
                "nome": "Capuz das Profundezas",
                "tipo": "Livre",
                "desc": "Uma vez por cena, o capanga fica invisível por uma rodada."
            },
            {
                "nome": "Veneno: Peçonha Comum",
                "tipo": "Qualidade",
                "desc": "A vítima perde 1d12 PV."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+13"
            },
            {
                "nome": "Furtividade",
                "valor": "+13"
            },
            {
                "nome": "Ladinagem",
                "valor": "+13"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Dragão Brasil",
        "equipamento": "Espada curta certeira, besta de repetição certeira, peçonha comum x6"
    },
    {
        "nome": "Executor da Sangue Sombrio",
        "tipo": "Humanoide Médio",
        "nd": "10",
        "iniciativa": "+18",
        "percepcao": "+13",
        "percepcaoObs": "",
        "defesa": "37",
        "fort": "+16",
        "ref": "+20",
        "von": "+12",
        "defesaObs": "",
        "pv": "66",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "4",
            "con": "1",
            "int": "1",
            "sab": "2",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Espada-gadanho",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "2d8+20",
                "desc": "x2, mais veneno, 18."
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo Letal",
                "tipo": "Qualidade",
                "desc": "+6d8. O executor pode fazer até dois ataques furtivos por rodada. Sempre que rola um 7 ou 8 em um dado de dano da habilidade, rola um dado extra."
            },
            {
                "nome": "Capuz das Profundezas",
                "tipo": "Livre",
                "desc": "Uma vez por cena, o executor fica invisível por uma rodada."
            },
            {
                "nome": "Frasco de Sombras Drenantes",
                "tipo": "Padrão",
                "desc": "Uma vez por cena, o executor atira um frasco de vidro em um ponto qualquer em alcance curto. O frasco libera tentáculos de sombra: criaturas a até 3m perdem 4d8+4 PV e ficam debilitadas (Fort CD 30 reduz a condição para fraco), na rodada em que é usado e na seguinte. Não afeta membros da Sangue Sombrio."
            },
            {
                "nome": "Truque das Profundezas",
                "tipo": "Qualidade",
                "desc": "Pode sacar ou guardar itens como ação livre. Uma vez por cena, se sacar sua espada-gadanho e atacar no mesmo turno, o oponente fica desprevenido contra esse ataque."
            },
            {
                "nome": "Veneno: Peçonha Concentrada",
                "tipo": "Qualidade",
                "desc": "A vítima perde 1d12 PV por rodada durante 3 rodadas (Fort CD 32 reduz para perde 1d12 PV)."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+15"
            },
            {
                "nome": "Furtividade",
                "valor": "+15"
            },
            {
                "nome": "Intimidação",
                "valor": "+13"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Dragão Brasil",
        "equipamento": "Espada-gadanho certeira e precisa, peçonha concentrada x3"
    },
    {
        "nome": "Zordoelaram",
        "tipo": "Morto-vivo Médio",
        "nd": "18",
        "iniciativa": "+26",
        "percepcao": "+32",
        "percepcaoObs": "visão no escuro",
        "defesa": "55",
        "fort": "+19",
        "ref": "+27",
        "von": "+32",
        "defesaObs": "cura acelerada 20, redução de dano 20/luz, resistência a encantamentos +5",
        "pv": "660",
        "desl": "18m (12q), escalar 18m (12q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "6",
            "con": "4",
            "int": "7",
            "sab": "5",
            "car": "7"
        },
        "ataques": [
            {
                "nome": "Espada longa",
                "tipo": "Corpo a Corpo",
                "bonus": "+49",
                "dano": "4d10+32",
                "desc": "x3, 16/x3, mais 4d10 de trevas."
            },
            {
                "nome": "Garra",
                "tipo": "Corpo a Corpo",
                "bonus": "+45",
                "dano": "4d6+30",
                "desc": "Mais 4d10 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Dominação Vampírica",
                "tipo": "Padrão",
                "desc": "Sussurra palavras de controle para um humanoide em alcance curto. A vítima fica confusa, enfeitiçada ou fascinada até o fim da cena, ou perde as memórias da última hora, à escolha do vampiro (Von CD 49 evita). Uma criatura só pode ser alvo desta habilidade uma vez por cena."
            },
            {
                "nome": "Drenar Sangue",
                "tipo": "Padrão",
                "desc": "Drena sangue de uma criatura viva que esteja agarrando: causa 6d10 de dano de perfuração e recupera a mesma quantidade de PV. Uma criatura morta desta forma se erguerá como um vampiro na próxima noite e deverá vencer um teste de Vontade oposto contra Zordoelaram ou ficará sob o controle dele até que ele a liberte ou seja destruído."
            },
            {
                "nome": "Forma de Morcego",
                "tipo": "Padrão",
                "desc": "Transforma-se em um morcego Minúsculo (+5 em Furtividade e –5 em testes de manobra) com deslocamento de voo 12m. Seu equipamento é absorvido (retorna ao normal) e as outras estatísticas não são alteradas. A transformação dura quanto tempo ele desejar, mas termina se fizer um ataque, usar uma habilidade mágica ou sofrer dano."
            },
            {
                "nome": "Manipular as Sombras",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, quando é alvo de um efeito hostil, Zordoelaram pode redirecioná-lo a qualquer outra criatura em alcance curto — inclusive à própria criatura que fez o efeito. A criatura tem direito a Reflexos (CD 49) para evitar."
            },
            {
                "nome": "Orgulho",
                "tipo": "Reação",
                "desc": "Uma vez por cena, quando faz um teste de perícia, Zordoelaram soma o dobro de seu Carisma (+14) nesse teste."
            },
            {
                "nome": "Presença Majestosa",
                "tipo": "Reação",
                "desc": "Quando uma criatura ataca Zordoelaram, deve passar em um teste de Vontade (CD 49) ou não conseguirá machucá-lo e perderá a ação. Quem passa no teste não é mais afetado por esta habilidade até o fim da cena."
            },
            {
                "nome": "Sensibilidade ao Sol",
                "tipo": "Qualidade",
                "desc": "Quando exposto a luz solar direta, fica ofuscado e perde 6d10 PV por rodada."
            },
            {
                "nome": "Sombras Sedentas",
                "tipo": "Padrão",
                "desc": "Conjura tentáculos com presas em uma área de 6m de raio em alcance médio. Todas as criaturas na área perdem 10d10+10 PV (Fort CD 49 reduz à metade) e 6d8+6 PM (Von CD 49 reduz à metade). Recarga (usar Drenar Sangue)."
            },
            {
                "nome": "Velocidade Ancestral",
                "tipo": "Qualidade",
                "desc": "Uma vez por rodada, pode usar Dominação Vampírica, Drenar Sangue ou Sombras Sedentas como uma ação livre."
            },
            {
                "nome": "Visão da Verdade",
                "tipo": "Qualidade",
                "desc": "Permanentemente sob o efeito da magia Visão da Verdade, com +10 em Percepção e Intuição."
            }
        ],
        "pericias": [
            {
                "nome": "Diplomacia",
                "valor": "+24"
            },
            {
                "nome": "Enganação",
                "valor": "+27"
            },
            {
                "nome": "Furtividade",
                "valor": "+26"
            },
            {
                "nome": "Intuição",
                "valor": "+32"
            },
            {
                "nome": "Misticismo",
                "valor": "+24"
            },
            {
                "nome": "Nobreza",
                "valor": "+24"
            }
        ],
        "tesouro": "Dobro",
        "fonte": "Dragão Brasil",
        "equipamento": "Armadura completa cravejada de gemas, delicada e selada de mitral, espada longa formidável, precisa, pungente e veloz de mitral"
    },
    {
        "nome": "Lobisomem Predador Urbano",
        "tipo": "Humanoide (humano) Médio",
        "nd": "4",
        "iniciativa": "+10",
        "percepcao": "+5",
        "percepcaoObs": "faro, visão na penumbra",
        "defesa": "23",
        "fort": "+4",
        "ref": "+16",
        "von": "+10",
        "defesaObs": "evasão, redução de dano 5/mitral",
        "pv": "140",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "1",
            "des": "4",
            "con": "1",
            "int": "0",
            "sab": "1",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Adaga x2 (Humanoide)",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "1d4+4",
                "desc": "19."
            },
            {
                "nome": "Garra x2 (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "1d6+4",
                "desc": ""
            },
            {
                "nome": "Mordida (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "1d6+4",
                "desc": ""
            },
            {
                "nome": "Mordida (Lobo)",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "2d6+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "tipo": "Qualidade",
                "desc": "+2d6."
            },
            {
                "nome": "Empatia com Lobos",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com lobos e lobos-das-cavernas."
            },
            {
                "nome": "Maldição da Licantropia",
                "tipo": "Qualidade",
                "desc": "Um humanoide que sofra dano da mordida do lobisomem contrai licantropia (Fort CD 18 evita; veja Licantropia)."
            },
            {
                "nome": "Mudança de Forma",
                "tipo": "Completa",
                "desc": "O lobisomem muda de forma entre humanoide, híbrida ou de lobo (as estatísticas padrão são para humanoide). Veja Formas de Licantropo. Forma Híbrida: +2 em Força (já contabilizado nos ataques) e usa os ataques híbridos. Forma de Lobo: +2 em Força, deslocamento 15m e usa os ataques de lobo; ao acertar a mordida, pode fazer a manobra derrubar (teste +16) como ação livre."
            },
            {
                "nome": "Aversão a Mitral",
                "tipo": "Qualidade",
                "desc": "O lobisomem sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+6 (+11 com lobos)"
            },
            {
                "nome": "Enganação",
                "valor": "+9"
            },
            {
                "nome": "Furtividade",
                "valor": "+10"
            },
            {
                "nome": "Jogatina",
                "valor": "+6"
            },
            {
                "nome": "Ladinagem",
                "valor": "+8"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil",
        "equipamento": "Adaga x2, capa esvoaçante, gázua"
    },
    {
        "nome": "Lobisomem Caçador de Recompensas",
        "tipo": "Humanoide (anão) Médio",
        "nd": "9",
        "iniciativa": "+10",
        "percepcao": "+10",
        "percepcaoObs": "+12 em subterrâneo, faro, visão no escuro",
        "defesa": "34",
        "fort": "+22",
        "ref": "+9",
        "von": "+15",
        "defesaObs": "imunidade a medo, redução de dano 5/mitral",
        "pv": "355",
        "desl": "9m (6q), sem redução por terreno difícil",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "2",
            "con": "3",
            "int": "0",
            "sab": "2",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Lança x2 (Humanoide)",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "4d6+15",
                "desc": ""
            },
            {
                "nome": "Lança (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+28",
                "dano": "4d6+17",
                "desc": ""
            },
            {
                "nome": "Garra (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+28",
                "dano": "2d6+8",
                "desc": "Pode atacar com duas garras em vez de lança + garra."
            },
            {
                "nome": "Mordida (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+28",
                "dano": "2d6+8",
                "desc": ""
            },
            {
                "nome": "Mordida (Lobo)",
                "tipo": "Corpo a Corpo",
                "bonus": "+28",
                "dano": "4d6+16",
                "desc": ""
            },
            {
                "nome": "Besta leve x2",
                "tipo": "À Distância",
                "bonus": "+27",
                "dano": "2d8+13",
                "desc": "19, mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Empatia com Lobos",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com lobos e lobos-das-cavernas."
            },
            {
                "nome": "Maldição da Licantropia",
                "tipo": "Qualidade",
                "desc": "Um humanoide que sofra dano da mordida do lobisomem contrai licantropia (Fort CD 28 evita; veja Licantropia)."
            },
            {
                "nome": "Marca da Presa",
                "tipo": "Livre",
                "desc": "Uma vez por rodada, analisa uma criatura em alcance longo. Até o fim da cena, recebe +3 em testes de perícia, +3 na margem de ameaça e +1d12 em rolagens de dano contra ela (bônus dobrados contra humanoides e monstros)."
            },
            {
                "nome": "Mudança de Forma",
                "tipo": "Completa",
                "desc": "O lobisomem muda de forma entre humanoide, híbrida ou de lobo (as estatísticas padrão são para humanoide). Veja Formas de Licantropo. Forma Híbrida: +2 em Força (já contabilizado nos ataques) e usa os ataques híbridos. Forma de Lobo: +2 em Força, deslocamento 15m e usa os ataques de lobo; ao acertar a mordida, pode fazer a manobra derrubar (teste +28) como ação livre."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha potente (perde 2d12 PV por rodada durante 3 rodadas, Fort CD 28 reduz a duração para 1 rodada)."
            },
            {
                "nome": "Aversão a Mitral",
                "tipo": "Qualidade",
                "desc": "O lobisomem sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+7 (+12 com lobos)"
            },
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Investigação",
                "valor": "+10"
            },
            {
                "nome": "Intimidação",
                "valor": "+7"
            },
            {
                "nome": "Intuição",
                "valor": "+10"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+12"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil",
        "equipamento": "Besta leve, capa pesada, couraça, lança, virotes x20"
    },
    {
        "nome": "Licantropo Onça Pirata de Rio",
        "tipo": "Humanoide (humano) Médio",
        "nd": "7",
        "iniciativa": "+14",
        "percepcao": "+9",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "30",
        "fort": "+13",
        "ref": "+19",
        "von": "+9",
        "defesaObs": "evasão, redução de dano 5/mitral",
        "pv": "270",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "5",
            "con": "2",
            "int": "0",
            "sab": "2",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Cimitarra x2 (Humanoide)",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "4d8+10",
                "desc": "18."
            },
            {
                "nome": "Cimitarra (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "4d8+10",
                "desc": "18. Pode atacar com duas garras em vez de cimitarra + garra."
            },
            {
                "nome": "Garra (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d8+5",
                "desc": ""
            },
            {
                "nome": "Mordida (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d8+5",
                "desc": ""
            },
            {
                "nome": "Mordida (Onça)",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "4d8+10",
                "desc": ""
            },
            {
                "nome": "Pistola x2",
                "tipo": "À Distância",
                "bonus": "+23",
                "dano": "6d6+10",
                "desc": "18/x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Correr pelo Cordame",
                "tipo": "Completa",
                "desc": "Percorre até seu deslocamento ignorando terreno difícil e faz um ataque corpo a corpo com +2 no teste de ataque e +1d6 na rolagem de dano."
            },
            {
                "nome": "Emboscar",
                "tipo": "Livre",
                "desc": "Na primeira rodada de combate, se estiver em forma híbrida ou de onça, pode realizar uma ação padrão adicional."
            },
            {
                "nome": "Empatia com Onças",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com onças."
            },
            {
                "nome": "Maldição da Licantropia",
                "tipo": "Qualidade",
                "desc": "Um humanoide que sofra dano da mordida do licantropo onça contrai licantropia (Fort CD 28 evita; veja Licantropia)."
            },
            {
                "nome": "Mudança de Forma",
                "tipo": "Completa",
                "desc": "O licantropo onça muda de forma entre humanoide, híbrida ou de onça (as estatísticas padrão são para humanoide). Veja Formas de Licantropo. Forma Híbrida: usa os ataques híbridos e pode usar Emboscar. Forma de Onça: deslocamento 15m (natação 6m), usa os ataques de onça e pode usar Emboscar."
            },
            {
                "nome": "Pernas do Mar",
                "tipo": "Qualidade",
                "desc": "Quando se equilibra ou escala, não fica desprevenido e seu deslocamento não é reduzido à metade."
            },
            {
                "nome": "Saque Rápido",
                "tipo": "Qualidade",
                "desc": "Pode sacar ou guardar itens como ação livre e recarregar a pistola como ação de movimento."
            },
            {
                "nome": "Aversão a Mitral",
                "tipo": "Qualidade",
                "desc": "O licantropo onça sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+14"
            },
            {
                "nome": "Adestramento",
                "valor": "+11 (+16 com onças)"
            },
            {
                "nome": "Atletismo",
                "valor": "+11"
            },
            {
                "nome": "Intimidação",
                "valor": "+13"
            },
            {
                "nome": "Pilotagem",
                "valor": "+11"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil",
        "equipamento": "Balas x20, bandana aprimorada, cimitarra, pistola"
    },
    {
        "nome": "Licantropo Onça Lutador de Arena",
        "tipo": "Humanoide (humano) Médio",
        "nd": "11",
        "iniciativa": "+12",
        "percepcao": "+12",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "40",
        "fort": "+22",
        "ref": "+18",
        "von": "+13",
        "defesaObs": "evasão, redução de dano 5/mitral",
        "pv": "530",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "3",
            "con": "4",
            "int": "0",
            "sab": "3",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Ataque desarmado x2 (Humanoide)",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d10+20",
                "desc": "19/x3."
            },
            {
                "nome": "Garra x2 (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d10+20",
                "desc": "19/x3."
            },
            {
                "nome": "Mordida (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "4d10+20",
                "desc": "19/x3."
            },
            {
                "nome": "Mordida x2 (Onça)",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d10+20",
                "desc": "19/x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Emboscar",
                "tipo": "Livre",
                "desc": "Na primeira rodada de combate, se estiver em forma híbrida ou de onça, pode realizar uma ação padrão adicional."
            },
            {
                "nome": "Empatia com Onças",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com onças."
            },
            {
                "nome": "Maldição da Licantropia",
                "tipo": "Qualidade",
                "desc": "Um humanoide que sofra dano da mordida do licantropo onça contrai licantropia (Fort CD 31 evita; veja Licantropia)."
            },
            {
                "nome": "Mudança de Forma",
                "tipo": "Completa",
                "desc": "O licantropo onça muda de forma entre humanoide, híbrida ou de onça (as estatísticas padrão são para humanoide). Veja Formas de Licantropo. Forma Híbrida: usa os ataques híbridos e pode usar Emboscar. Forma de Onça: deslocamento 15m (natação 6m), usa os ataques de onça e pode usar Emboscar."
            },
            {
                "nome": "Presas de Adamante",
                "tipo": "Qualidade",
                "desc": "Seus ataques ignoram até 10 pontos da redução de dano dos alvos."
            },
            {
                "nome": "Rasteira",
                "tipo": "Livre",
                "desc": "Uma vez por rodada, quando acerta um ataque corpo a corpo, pode fazer a manobra derrubar contra o alvo (teste +34)."
            },
            {
                "nome": "Voadora Feral",
                "tipo": "Qualidade",
                "desc": "Ao fazer uma investida, causa +1d6 de dano por cada 3m percorridos até o alvo."
            },
            {
                "nome": "Aversão a Mitral",
                "tipo": "Qualidade",
                "desc": "O licantropo onça sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+14"
            },
            {
                "nome": "Adestramento",
                "valor": "+9 (+14 com onças)"
            },
            {
                "nome": "Atletismo",
                "valor": "+16"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil"
    },
    {
        "nome": "Licantropo Rato Comedor de Restos",
        "tipo": "Humanoide (goblin) Pequeno",
        "nd": "1",
        "iniciativa": "+5",
        "percepcao": "+0",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "15",
        "fort": "+5",
        "ref": "+10",
        "von": "+1",
        "defesaObs": "redução de dano 5/mitral",
        "pv": "10",
        "desl": "9m (6q), escalada 9m",
        "pm": "0",
        "atributos": {
            "for": "0",
            "des": "3",
            "con": "1",
            "int": "1",
            "sab": "0",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Adaga x2 (Humanoide)",
                "tipo": "Corpo a Corpo",
                "bonus": "+11",
                "dano": "1d4+3",
                "desc": "19."
            },
            {
                "nome": "Adaga x2 (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+11",
                "dano": "1d4+3",
                "desc": "19."
            },
            {
                "nome": "Mordida (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+11",
                "dano": "1d6+3",
                "desc": ""
            },
            {
                "nome": "Mordida (Rato)",
                "tipo": "Corpo a Corpo",
                "bonus": "+11",
                "dano": "1d6+3",
                "desc": ""
            },
            {
                "nome": "Besta leve",
                "tipo": "À Distância",
                "bonus": "+11",
                "dano": "1d8+3",
                "desc": "19."
            }
        ],
        "habilidades": [
            {
                "nome": "Dentes de Roedor",
                "tipo": "Qualidade",
                "desc": "Em um acerto crítico com a mordida, deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador do crítico."
            },
            {
                "nome": "Empatia com Ratos",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com ratos."
            },
            {
                "nome": "Maldição da Licantropia",
                "tipo": "Qualidade",
                "desc": "Um humanoide que sofra dano da mordida do licantropo rato contrai licantropia (Fort CD 14 evita; veja Licantropia)."
            },
            {
                "nome": "Mudança de Forma",
                "tipo": "Completa",
                "desc": "O licantropo rato muda de forma entre humanoide, híbrida ou de rato (as estatísticas padrão são para humanoide). Veja Formas de Licantropo. Forma Híbrida: usa os ataques híbridos. Forma de Rato: torna-se Minúsculo, deslocamento 12m, escalada 12m e usa os ataques de rato."
            },
            {
                "nome": "Aversão a Mitral",
                "tipo": "Qualidade",
                "desc": "O licantropo rato sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+1 (+6 com ratos)"
            },
            {
                "nome": "Enganação",
                "valor": "+1"
            },
            {
                "nome": "Furtividade",
                "valor": "+7"
            },
            {
                "nome": "Ladinagem",
                "valor": "+5"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+2"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil",
        "equipamento": "Adaga x3, armadura de couro"
    },
    {
        "nome": "Licantropo Rato Infiltrador Veterano",
        "tipo": "Humanoide (hobgoblin) Médio",
        "nd": "7",
        "iniciativa": "+11",
        "percepcao": "+8",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "32",
        "fort": "+14",
        "ref": "+20",
        "von": "+7",
        "defesaObs": "redução de dano 5/mitral",
        "pv": "270",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "4",
            "con": "3",
            "int": "1",
            "sab": "1",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Corrente com espinhos x2 (Humanoide)",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "4d4+14",
                "desc": "18."
            },
            {
                "nome": "Corrente com espinhos x2 (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "4d4+14",
                "desc": "18."
            },
            {
                "nome": "Mordida (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+11",
                "dano": "3d6+14",
                "desc": ""
            },
            {
                "nome": "Mordida (Rato)",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "3d6+14",
                "desc": ""
            },
            {
                "nome": "Arco longo x2",
                "tipo": "À Distância",
                "bonus": "+24",
                "dano": "3d8+14",
                "desc": "x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Dentes de Roedor",
                "tipo": "Qualidade",
                "desc": "Em um acerto crítico com a mordida, deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador do crítico."
            },
            {
                "nome": "Empatia com Ratos",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com ratos."
            },
            {
                "nome": "Maldição da Licantropia",
                "tipo": "Qualidade",
                "desc": "Um humanoide que sofra dano da mordida do licantropo rato contrai licantropia (Fort CD 24 evita; veja Licantropia)."
            },
            {
                "nome": "Mudança de Forma",
                "tipo": "Completa",
                "desc": "O licantropo rato muda de forma entre humanoide, híbrida ou de rato (as estatísticas padrão são para humanoide). Veja Formas de Licantropo. Forma Híbrida: escalada 6m e usa os ataques híbridos. Forma de Rato: torna-se Minúsculo, escalada 6m e usa os ataques de rato."
            },
            {
                "nome": "Aversão a Mitral",
                "tipo": "Qualidade",
                "desc": "O licantropo rato sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+11"
            },
            {
                "nome": "Adestramento",
                "valor": "+9 (+14 com ratos)"
            },
            {
                "nome": "Atletismo",
                "valor": "+9"
            },
            {
                "nome": "Enganação",
                "valor": "+9"
            },
            {
                "nome": "Furtividade",
                "valor": "+11 (+13 em cidades)"
            },
            {
                "nome": "Guerra",
                "valor": "+8"
            },
            {
                "nome": "Ladinagem",
                "valor": "+11"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+8"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil",
        "equipamento": "Arco longo, armadura de couro, corrente de espinhos precisa, manto camuflado (urbano), pó do desaparecimento"
    },
    {
        "nome": "Licantropo Selako Farejador de Sangue",
        "tipo": "Humanoide (humano) Médio",
        "nd": "3",
        "iniciativa": "+4",
        "percepcao": "+4",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "21",
        "fort": "+15",
        "ref": "+10",
        "von": "+2",
        "defesaObs": "redução de dano 5/mitral",
        "pv": "115",
        "desl": "9m (6q), natação 9m",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "3",
            "con": "2",
            "int": "0",
            "sab": "1",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Lança x2 (Humanoide)",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d6+3",
                "desc": ""
            },
            {
                "nome": "Lança (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d6+3",
                "desc": "Pode atacar com duas garras em vez de lança + garra."
            },
            {
                "nome": "Garra (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d6+3",
                "desc": ""
            },
            {
                "nome": "Mordida (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d10+3",
                "desc": "x3."
            },
            {
                "nome": "Mordida (Selako)",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d10+10",
                "desc": ""
            },
            {
                "nome": "Azagaia",
                "tipo": "À Distância",
                "bonus": "+14",
                "dano": "1d6+3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Dentes Afiados",
                "tipo": "Qualidade",
                "desc": "Em um acerto crítico com a mordida, a vítima fica sangrando."
            },
            {
                "nome": "Faro do Selako",
                "tipo": "Qualidade",
                "desc": "Não fica desprevenido contra inimigos que estejam sangrando."
            },
            {
                "nome": "Empatia com Selakos",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com selakos."
            },
            {
                "nome": "Maldição da Licantropia",
                "tipo": "Qualidade",
                "desc": "Um humanoide que sofra dano da mordida do licantropo selako contrai licantropia (Fort CD 17 evita; veja Licantropia)."
            },
            {
                "nome": "Mudança de Forma",
                "tipo": "Completa",
                "desc": "O licantropo selako muda de forma entre humanoide, híbrida ou de selako (as estatísticas padrão são para humanoide). Veja Formas de Licantropo. Forma Híbrida: torna-se Grande, natação 9m e usa os ataques híbridos. Forma de Selako: torna-se Grande, deslocamento vira natação 18m e usa os ataques de selako."
            },
            {
                "nome": "Aversão a Mitral",
                "tipo": "Qualidade",
                "desc": "O licantropo selako sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+2 (+7 com selakos)"
            },
            {
                "nome": "Atletismo",
                "valor": "+6"
            },
            {
                "nome": "Intimidação",
                "valor": "+2"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil",
        "equipamento": "Azagaia x3, lança"
    },
    {
        "nome": "Licantropo Selako Terror dos Mares",
        "tipo": "Humanoide (elfo-do-mar) Médio",
        "nd": "9",
        "iniciativa": "+4",
        "percepcao": "+4",
        "percepcaoObs": "faro, percepção às cegas (apenas embaixo d'água), visão no escuro",
        "defesa": "34",
        "fort": "+20",
        "ref": "+15",
        "von": "+10",
        "defesaObs": "redução de corte 5, redução de dano 5/mitral",
        "pv": "115",
        "desl": "9m (6q), natação 9m",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "4",
            "con": "3",
            "int": "0",
            "sab": "2",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Tridente x2 (Humanoide)",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "2d6+17",
                "desc": "x3."
            },
            {
                "nome": "Tridente (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "2d6+17",
                "desc": "x3. Pode atacar com duas garras em vez de tridente + garra."
            },
            {
                "nome": "Garra (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "2d6+17",
                "desc": ""
            },
            {
                "nome": "Mordida (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "2d10+17",
                "desc": "x3."
            },
            {
                "nome": "Mordida (Selako)",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "2d10+10",
                "desc": ""
            },
            {
                "nome": "Azagaia",
                "tipo": "À Distância",
                "bonus": "+27",
                "dano": "2d6+17",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Caçador Submarino",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de perícia (exceto ataque) em terreno aquático, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Dentes Afiados",
                "tipo": "Qualidade",
                "desc": "As mordidas ignoram 5 pontos de redução de dano. Em um acerto crítico com a mordida, a vítima fica sangrando."
            },
            {
                "nome": "Destruidor",
                "tipo": "Qualidade",
                "desc": "Causa dano dobrado contra objetos. Em um acerto crítico, pode fazer a manobra quebrar como ação livre (teste +31)."
            },
            {
                "nome": "Faro do Selako",
                "tipo": "Qualidade",
                "desc": "Não fica desprevenido contra inimigos que estejam sangrando."
            },
            {
                "nome": "Empatia com Selakos",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com selakos."
            },
            {
                "nome": "Maldição da Licantropia",
                "tipo": "Qualidade",
                "desc": "Um humanoide que sofra dano da mordida do licantropo selako contrai licantropia (Fort CD 28 evita; veja Licantropia)."
            },
            {
                "nome": "Mudança de Forma",
                "tipo": "Completa",
                "desc": "O licantropo selako muda de forma entre humanoide, híbrida ou de selako (as estatísticas padrão são para humanoide). Veja Formas de Licantropo. Forma Híbrida: torna-se Grande, natação 9m e usa os ataques híbridos. Forma de Selako: torna-se Grande, deslocamento vira natação 18m e usa os ataques de selako."
            },
            {
                "nome": "Aversão a Mitral",
                "tipo": "Qualidade",
                "desc": "O licantropo selako sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+8 (+13 com selakos)"
            },
            {
                "nome": "Atletismo",
                "valor": "+12"
            },
            {
                "nome": "Furtividade",
                "valor": "+10 (+8 em forma híbrida ou de fera)"
            },
            {
                "nome": "Intimidação",
                "valor": "+8"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+10 (+12 embaixo d'água)"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil",
        "equipamento": "Azagaia x3, couraça de lanajuste sob medida (veja Ameaças de Arton, p. 400), tridente maciço"
    },
    {
        "nome": "Licantropo Texugo Furioso",
        "tipo": "Humanoide (anão) Médio",
        "nd": "5",
        "iniciativa": "+4",
        "percepcao": "+6",
        "percepcaoObs": "+8 em subterrâneo, faro, visão no escuro",
        "defesa": "23",
        "fort": "+17",
        "ref": "+5",
        "von": "+11",
        "defesaObs": "redução de dano 5/mitral",
        "pv": "205",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "0",
            "con": "5",
            "int": "0",
            "sab": "2",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Machado de guerra (Humanoide)",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "2d12+16",
                "desc": "x3."
            },
            {
                "nome": "Garra x2 (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "2d6+10",
                "desc": ""
            },
            {
                "nome": "Mordida (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "2d6+10",
                "desc": ""
            },
            {
                "nome": "Mordida (Texugo)",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "4d6+16",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Durão",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, se estiver em forma híbrida ou de texugo, ao sofrer dano reduz esse dano à metade."
            },
            {
                "nome": "Empatia com Texugos",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com texugos."
            },
            {
                "nome": "Fúria",
                "tipo": "Livre",
                "desc": "Recebe +2 em testes de ataque e rolagens de dano. O efeito termina se ele terminar 1 rodada sem ter atacado nem sido alvo de um efeito hostil. Recarga (movimento)."
            },
            {
                "nome": "Maldição da Licantropia",
                "tipo": "Qualidade",
                "desc": "Um humanoide que sofra dano da mordida do licantropo texugo contrai licantropia (Fort CD 20 evita; veja Licantropia)."
            },
            {
                "nome": "Mudança de Forma",
                "tipo": "Completa",
                "desc": "O licantropo texugo muda de forma entre humanoide, híbrida ou de texugo (as estatísticas padrão são para humanoide). Veja Formas de Licantropo. Forma Híbrida: usa os ataques híbridos e pode usar Durão. Forma de Texugo: torna-se Pequeno, deslocamento 12m (escalada 3m), usa os ataques de texugo e pode usar Durão."
            },
            {
                "nome": "Aversão a Mitral",
                "tipo": "Qualidade",
                "desc": "O licantropo texugo sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+4 (+9 com texugos)"
            },
            {
                "nome": "Atletismo",
                "valor": "+6"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+6"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil",
        "equipamento": "Gibão de peles, machado de guerra"
    },
    {
        "nome": "Licantropo Texugo Servo da Noite",
        "tipo": "Humanoide (hynne) Pequeno",
        "nd": "8",
        "iniciativa": "+12",
        "percepcao": "+13",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "29",
        "fort": "+8",
        "ref": "+15",
        "von": "+21",
        "defesaObs": "redução de dano 5/mitral",
        "pv": "215",
        "desl": "6m (4q), sem redução por terreno difícil natural",
        "pm": "45",
        "atributos": {
            "for": "-1",
            "des": "4",
            "con": "1",
            "int": "1",
            "sab": "5",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Clava (Humanoide)",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d6+15",
                "desc": ""
            },
            {
                "nome": "Garra x2 (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d6+15",
                "desc": "19."
            },
            {
                "nome": "Mordida (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "2d6+15",
                "desc": "19."
            },
            {
                "nome": "Mordida (Texugo)",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d8+15",
                "desc": "19."
            }
        ],
        "habilidades": [
            {
                "nome": "Armadura de Ossos",
                "tipo": "Movimento",
                "desc": "Custos: 2 PM. Recebe +2 na Defesa e em Intimidação e redução de corte, frio e trevas 5 até o fim da cena."
            },
            {
                "nome": "Durão",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, se estiver em forma híbrida ou de texugo, ao sofrer dano reduz esse dano à metade."
            },
            {
                "nome": "Empatia com Texugos",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com texugos."
            },
            {
                "nome": "Magia Natural",
                "tipo": "Qualidade",
                "desc": "Pode lançar magias e empunhar catalisadores e esotéricos na forma de texugo."
            },
            {
                "nome": "Maldição da Licantropia",
                "tipo": "Qualidade",
                "desc": "Um humanoide que sofra dano da mordida do licantropo texugo contrai licantropia (Fort CD 28 evita; veja Licantropia)."
            },
            {
                "nome": "Mudança de Forma",
                "tipo": "Completa",
                "desc": "O licantropo texugo muda de forma entre humanoide, híbrida ou de texugo (as estatísticas padrão são para humanoide). Veja Formas de Licantropo. Forma Híbrida: usa os ataques híbridos e pode usar Durão. Forma de Texugo: torna-se Pequeno, deslocamento 12m (escalada 3m), usa os ataques de texugo e pode usar Durão."
            },
            {
                "nome": "Sorte Salvadora",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de resistência, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Visão nas Trevas",
                "tipo": "Qualidade",
                "desc": "Enxerga no escuro mesmo em magias de escuridão."
            },
            {
                "nome": "Magia: Armamento da Natureza",
                "tipo": "Movimento",
                "desc": "Custos: 8 PM. Uma de suas armas torna-se mágica e seu dano aumenta em dois passos (de 1d6 para 1d10 ou de 1d8 para 1d12) até o fim da cena. Como druida de Tenebra de 8º nível (CD 28)."
            },
            {
                "nome": "Magia: Curar Ferimentos",
                "tipo": "Padrão",
                "desc": "Custos: 8 PM. Uma criatura adjacente cura 9d8+9 PV."
            },
            {
                "nome": "Magia: Miasma Mefítico",
                "tipo": "Padrão",
                "desc": "Custos: 7 PM. Nuvem de 6m de raio em alcance médio causa 7d6 de ácido e deixa as criaturas enjoadas por 1 rodada (Fort CD 28 reduz à metade e evita a condição)."
            },
            {
                "nome": "Magia: Toque Vampírico",
                "tipo": "Padrão",
                "desc": "Custos: 7 PM. Faz um ataque corpo a corpo; se acertar, além do dano normal causa 8d6 de trevas (Fort CD 28 reduz à metade) e recupera PV iguais à metade do dano de trevas."
            },
            {
                "nome": "Aversão a Mitral",
                "tipo": "Qualidade",
                "desc": "O licantropo texugo sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+10 (+15 com texugos)"
            },
            {
                "nome": "Atletismo",
                "valor": "+12"
            },
            {
                "nome": "Enganação",
                "valor": "+12"
            },
            {
                "nome": "Misticismo",
                "valor": "+9"
            },
            {
                "nome": "Religião",
                "valor": "+13"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+15"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil",
        "equipamento": "Armadura de couro, clava, símbolo sagrado de Tenebra, terra de cemitério x3"
    },
    {
        "nome": "Mamãe Glop",
        "tipo": "Monstro Grande",
        "nd": "2",
        "iniciativa": "+3",
        "percepcao": "-3",
        "percepcaoObs": "percepção às cegas",
        "defesa": "13",
        "fort": "+6",
        "ref": "+3",
        "von": "-3",
        "defesaObs": "imunidade a ácido",
        "pv": "48",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "-1",
            "con": "2",
            "int": "—",
            "sab": "-5",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Pancada",
                "tipo": "Corpo a Corpo",
                "bonus": "+6",
                "dano": "1d6+2",
                "desc": "Mais 1d6 de ácido."
            }
        ],
        "habilidades": [
            {
                "nome": "Glops Filhinhos",
                "tipo": "Qualidade",
                "desc": "Está sempre acompanhada por 1d4 glops (Tormenta20, p. 286), que a protegem instintivamente. Esses glops (e os gerados pela Meiose Glópica) não rendem XP ao grupo."
            },
            {
                "nome": "Meiose Glópica",
                "tipo": "Livre",
                "desc": "Quando ameaçada, gera outros glops. No início de cada turno dela, role um dado: em resultado par, um glop surge num espaço adjacente e age normalmente a partir da próxima rodada."
            }
        ],
        "pericias": [],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil",
        "observacao": "Versão da aventura \"Monstros e Homens\" (DB 232, Breves Jornadas), com números diferentes da versão de Ameaças de Arton."
    },
    {
        "nome": "Xamã Finntroll",
        "tipo": "Monstro (finntroll) Médio",
        "nd": "2",
        "iniciativa": "+5",
        "percepcao": "+6",
        "percepcaoObs": "visão no escuro",
        "defesa": "17",
        "fort": "+7",
        "ref": "+2",
        "von": "+13",
        "defesaObs": "cura acelerada 5/ácido ou fogo",
        "pv": "50",
        "desl": "9m (6q)",
        "pm": "13",
        "atributos": {
            "for": "-1",
            "des": "2",
            "con": "4",
            "int": "1",
            "sab": "3",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Garras x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d6+3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Natureza Vegetal",
                "tipo": "Qualidade",
                "desc": "Imune a atordoamento e metamorfose, mas afetado especificamente por efeitos que afetem plantas monstruosas. Em magias sem teste de resistência, tem direito a um teste de Fortitude (CD da magia) para evitar o efeito."
            },
            {
                "nome": "Urro Divino",
                "tipo": "Livre",
                "desc": "Custos: 1 PM. Ao fazer um ataque ou lançar uma magia, soma sua Constituição (+4) às rolagens de dano."
            },
            {
                "nome": "Intolerância a Luz",
                "tipo": "Qualidade",
                "desc": "Exposto à luz do sol ou similar, fica ofuscado e não consegue usar sua cura acelerada."
            },
            {
                "nome": "Magia: Amedrontar",
                "tipo": "Padrão",
                "desc": "Custos: 1 PM. Um animal ou humanoide em alcance curto fica apavorado por 1 rodada e depois abalado pelo resto da cena. Como clérigo de Megalokk de 2º nível (CD 18)."
            },
            {
                "nome": "Magia: Curar Ferimentos",
                "tipo": "Padrão",
                "desc": "Custos: 2 PM. Uma criatura adjacente cura 3d8+3 PV."
            },
            {
                "nome": "Magia: Escudo da Fé",
                "tipo": "Reação",
                "desc": "Custos: 1 PM. Quando uma criatura em alcance curto sofre um ataque, recebe +2 na Defesa até seu próximo turno."
            },
            {
                "nome": "Magia: Perdição",
                "tipo": "Padrão",
                "desc": "Custos: 1 PM. Criaturas escolhidas em alcance curto sofrem -1 em testes de ataque e rolagens de dano até o fim da cena."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+3"
            },
            {
                "nome": "Atletismo",
                "valor": "+2"
            },
            {
                "nome": "Intimidação",
                "valor": "+3"
            },
            {
                "nome": "Religião",
                "valor": "+6"
            }
        ],
        "tesouro": "",
        "fonte": "Dragão Brasil"
    },
    {
        "nome": "Ginete de Troll Purista",
        "tipo": "Humanoide (humano) Médio",
        "nd": "2",
        "iniciativa": "+4",
        "percepcao": "+2",
        "percepcaoObs": "",
        "defesa": "20",
        "fort": "+13",
        "ref": "+7",
        "von": "+2",
        "defesaObs": "",
        "pv": "70",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "3",
            "int": "0",
            "sab": "-1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Lança montada",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "2d8+8",
                "desc": ""
            },
            {
                "nome": "Garras x2 (montaria)",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "1d6+3",
                "desc": "Somente enquanto montado, em adição à lança."
            }
        ],
        "habilidades": [
            {
                "nome": "Corcel Troll",
                "tipo": "Qualidade",
                "desc": "Cavalga um troll treinado, parceiro montaria Grande. Enquanto montado, seu deslocamento vira 12m, recebe uma ação de movimento extra (apenas para se deslocar) e os ataques de garras da montaria, em adição à lança."
            },
            {
                "nome": "Investida Atroz",
                "tipo": "Completa",
                "desc": "Faz uma investida e ataca com a lança montada e todos os ataques da montaria. Todos recebem +2 da investida, mas devem ser feitos contra a mesma criatura."
            },
            {
                "nome": "Ódio Puro",
                "tipo": "Qualidade",
                "desc": "Recebe +5 em testes de Vontade quando segue ordens de um superior e +2 em rolagens de dano contra humanoides não humanos."
            }
        ],
        "pericias": [
            {
                "nome": "Cavalgar",
                "valor": "+4"
            },
            {
                "nome": "Guerra",
                "valor": "+3"
            },
            {
                "nome": "Intimidação",
                "valor": "+3"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Dragão Brasil",
        "equipamento": "Escudo pesado, lança, meia armadura"
    }



];

if (typeof module !== "undefined") module.exports = dragaobrasil_db;
