const BESTIARIO_DB = [
    {
        "nome": "Abelha-Grifo",
        "tipo": "Animal Grande",
        "nd": "4",
        "iniciativa": "+7",
        "percepcao": "+4",
        "percepcaoObs": "visão na penumbra",
        "defesa": "22",
        "fort": "+10",
        "ref": "+15",
        "von": "+5",
        "defesaObs": "imunidade a encantamento",
        "pv": "38",
        "desl": "18m (12q), escalada 18m (12q), voo 24m (16q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "3",
            "con": "3",
            "int": "-5",
            "sab": "0",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "4d6+18",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +19)."
            },
            {
                "nome": "Ferroada",
                "tipo": "Completa",
                "desc": "Se começar o turno agarrada a um inimigo e estiver com 10 PV ou menos, desfere a ferroada: o inimigo sofre 1d8+9 de perfuração e é inoculado com veneno paralisante (perde 2d12 PV e fica paralisado por 1d4 rodadas, Fort CD 18 reduz a perda de vida à metade e evita a condição). O ferrão se solta e a abelha-grifo morre em 1d6 horas."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro montaria (Grande). Iniciante: seu deslocamento muda para 15m e você recebe deslocamento de escalada 15m. Veterano: como acima, +2 em testes de agarrar e deslocamento de voo 15m. Mestre: como acima, mas os deslocamentos fornecidos aumentam para 18m e você recebe uma ação de movimento extra por turno (apenas para se deslocar)."
            }
        ],
        "pericias": [],
        "tesouro": "Nenhum",
        "fonte": "Bestiário de Arton"
    },
    {
        "nome": "Agelfeld",
        "tipo": "Espírito Grande",
        "nd": "5",
        "iniciativa": "+9",
        "percepcao": "+4",
        "percepcaoObs": "visão no escuro",
        "defesa": "22",
        "fort": "+11",
        "ref": "+17",
        "von": "+5",
        "defesaObs": "imunidade a atordoamento, eletricidade e trevas",
        "pv": "145",
        "desl": "voo 24m (16q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "5",
            "con": "1",
            "int": "-2",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+15",
                "dano": "2d8+8",
                "desc": "Mais 1d6 de eletricidade."
            }
        ],
        "habilidades": [
            {
                "nome": "Aura de Fumaça",
                "tipo": "Qualidade",
                "desc": "Aura de fumaça de 6m de raio. No início de cada turno do agelfeld, cada outra criatura na área faz um teste de Fortitude (CD 22, +1 por teste anterior). Se falhar, fica atordoada por 1 rodada (apenas uma vez por cena) e perde 1d6 PV por sufocamento. Metabolismo."
            },
            {
                "nome": "Corpo Difuso",
                "tipo": "Qualidade",
                "desc": "Qualquer ataque ou habilidade hostil (incluindo efeitos de área) contra o agelfeld tem 20% de chance de erro."
            },
            {
                "nome": "Força dos Ventos",
                "tipo": "Qualidade",
                "desc": "Não sofre os efeitos nocivos de vento (Tormenta20, p. 267). Em uma tempestade, recebe +5 em testes de ataque e rolagens de dano com as garras e, uma vez por rodada, pode executar uma manobra agarrar, derrubar e empurrar como ação livre (teste +22)."
            }
        ],
        "pericias": [],
        "tesouro": "Nenhum",
        "fonte": "Bestiário de Arton"
    },
    {
        "nome": "Alce",
        "tipo": "Animal Grande",
        "nd": "1",
        "iniciativa": "+2",
        "percepcao": "+5",
        "percepcaoObs": "faro, visão na penumbra",
        "defesa": "15",
        "fort": "+8",
        "ref": "+3",
        "von": "+5",
        "defesaObs": "",
        "pv": "36",
        "desl": "15m (10q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "0",
            "con": "3",
            "int": "-4",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "2d6+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Investida Avassaladora",
                "tipo": "Completa",
                "desc": "Faz uma investida com os chifres. Se acertar, causa +1d6 de dano e a vítima é arremessada 1d6 x 1,5m na direção oposta."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro montaria (Grande). Iniciante: seu deslocamento muda para 12m e você recebe +2 em testes de ataque ao fazer investidas. Veterano: uma vez por rodada, +1d6 em uma rolagem de dano corpo a corpo (+2d6 se for de uma investida). Mestre: ao fazer uma investida, você pode usar Ataque Pesado; se já possuir esse poder, recebe +2 no teste de manobra."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+7"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Bestiário de Arton"
    },
    {
        "nome": "Alghari",
        "tipo": "Monstro Grande",
        "nd": "4",
        "iniciativa": "+6",
        "percepcao": "+6",
        "percepcaoObs": "visão no escuro",
        "defesa": "23",
        "fort": "+15",
        "ref": "+3",
        "von": "+9",
        "defesaObs": "redução de ácido, fogo e frio 10, vulnerabilidade a eletricidade",
        "pv": "140",
        "desl": "12m (8q), natação 12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "2",
            "con": "4",
            "int": "-1",
            "sab": "2",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "1d8+6",
                "desc": ""
            },
            {
                "nome": "Cascos",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "2d6+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Afogamento Malévolo",
                "tipo": "Livre",
                "desc": "Se começar o turno agarrando uma criatura e ambos estiverem dentro d'água, submerge a criatura violentamente. A vítima sofre 3d6+6 de impacto e deve fazer um teste de Fortitude para prender a respiração (Sufocamento, Tormenta20, p. 319)."
            },
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Chifres (teste +18). Só pode usar esta habilidade se ele e a criatura atacada estiverem dentro d'água."
            },
            {
                "nome": "Corpo Oleoso",
                "tipo": "Qualidade",
                "desc": "+5 em testes para resistir a efeitos de movimento (incluindo a manobra agarrar)."
            },
            {
                "nome": "Isca Ilusória",
                "tipo": "Padrão",
                "desc": "Lança a magia Criar Ilusão como feiticeiro de 4º nível, sem gastar PM (CD 20, limite de PM 7). Só cria a ilusão de uma única criatura humanoide por vez, e ela sempre terá um pequeno par de chifres, não importa sua raça."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+11"
            },
            {
                "nome": "Enganação",
                "valor": "+12"
            },
            {
                "nome": "Furtividade",
                "valor": "+4 (+14 em ambientes aquáticos)"
            },
            {
                "nome": "Intuição",
                "valor": "+6"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+8"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Bestiário de Arton"
    },
    {
        "nome": "Ameba Gigante",
        "tipo": "Monstro Enorme",
        "nd": "7",
        "iniciativa": "+3",
        "percepcao": "+8",
        "percepcaoObs": "percepção às cegas (médio)",
        "defesa": "25",
        "fort": "+18",
        "ref": "+6",
        "von": "+12",
        "defesaObs": "imunidade a ácido e eletricidade, redução de dano 5, vulnerabilidade a fogo",
        "pv": "310",
        "desl": "6m (4q), natação 6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "0",
            "con": "6",
            "int": "-5",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Três pseudópodes",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d8+8",
                "desc": "Mais 1d6 de ácido."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Pseudópode (teste +29)."
            },
            {
                "nome": "Engolir",
                "tipo": "Padrão",
                "desc": "No início de cada turno da ameba, a criatura engolida sofre 2d8+16 de ácido. Ela pode escapar causando um total de 20 pontos de dano ao interior da ameba (Defesa 10)."
            },
            {
                "nome": "Fluidos Paralisantes",
                "tipo": "Qualidade",
                "desc": "No início de cada turno da ameba, a criatura engolida faz um teste de Fortitude (CD 24). Se falhar, fica paralisada por 1 rodada."
            },
            {
                "nome": "Organismo Congelável",
                "tipo": "Qualidade",
                "desc": "Quando sofre dano de frio, fica lenta e vulnerável por 1 rodada."
            },
            {
                "nome": "Núcleo",
                "tipo": "Qualidade",
                "desc": "Uma criatura engolida que não esteja paralisada pode tentar destruir o núcleo em vez de escapar. O núcleo tem Defesa 15, 31 PV e as mesmas características do interior da ameba. Se for destruído, a ameba gigante morre imediatamente."
            }
        ],
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+2 (+12 em aquático e subterrâneo)"
            }
        ],
        "tesouro": "Padrão (apenas material inorgânico), 1d6 doses de ácido (CD 22 para extrair)",
        "fonte": "Bestiário de Arton"
    },
    {
        "nome": "Ancião das Rochas",
        "tipo": "Espírito Grande",
        "nd": "8",
        "iniciativa": "+2",
        "percepcao": "+12",
        "percepcaoObs": "percepção às cegas (médio), visão no escuro",
        "defesa": "32",
        "fort": "+21",
        "ref": "+8",
        "von": "+15",
        "defesaObs": "imunidade a encantamento, eletricidade e frio, redução de dano 5",
        "pv": "220",
        "desl": "6m (4q), escavação 6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "-2",
            "con": "5",
            "int": "2",
            "sab": "4",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Duas pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "4d12+8",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Comunhão com a Natureza",
                "tipo": "Qualidade",
                "desc": "Uma vez por dia, ao despertar, recebe o efeito básico da magia Comunhão com a Natureza."
            },
            {
                "nome": "Conhecimento das Eras",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de Conhecimento, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Imobilidade",
                "tipo": "Qualidade",
                "desc": "Pode permanecer completamente imóvel. Assim, uma criatura deve passar em um teste de Percepção (CD 35, +5 se o ancião estiver adjacente a uma formação rochosa Grande ou maior) para perceber que ele é uma criatura e não uma rocha."
            },
            {
                "nome": "Senhor da Pedra",
                "tipo": "Padrão",
                "desc": "Lança a magia Controlar Terra sem gastar PM (CD 28, limite de PM 12)."
            },
            {
                "nome": "Toque Pedregoso",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida por uma pancada do ancião faz um teste de Fortitude (CD 28). Se falhar, fica lenta; se já estiver lenta, fica petrificada permanentemente. A petrificação pode ser removida pelo ancião à vontade e por efeitos que removam paralisia."
            }
        ],
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+17"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+12"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Bestiário de Arton"
    },
    {
        "nome": "Ankthyr",
        "tipo": "Animal Grande",
        "nd": "8",
        "iniciativa": "+10",
        "percepcao": "+8",
        "percepcaoObs": "visão no escuro",
        "defesa": "33",
        "fort": "+21",
        "ref": "+8",
        "von": "+15",
        "defesaObs": "redução de ácido 5, redução de dano 5",
        "pv": "308",
        "desl": "12m (8q), escavação 6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "2",
            "con": "4",
            "int": "-5",
            "sab": "0",
            "car": "-3"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "4d12+24",
                "desc": "Mais 4d8 de ácido."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +28)."
            },
            {
                "nome": "Cuspe Ácido",
                "tipo": "Padrão",
                "desc": "Cospe ácido em uma criatura a até 9m. A vítima sofre 6d8+6 de ácido e fica coberta por um muco corrosivo (Ref CD 26 reduz à metade e evita o muco). Uma criatura coberta sofre mais 3d8+3 de ácido no início dos seus dois próximos turnos. Recarga (movimento)."
            },
            {
                "nome": "Espreitador Subterrâneo",
                "tipo": "Padrão",
                "desc": "Se estiver completamente soterrado, pode emergir do solo e atacar uma criatura a até 4,5m do seu ponto de saída. Ao fazer isso, recebe +2 no teste de ataque e causa +1d12 de dano."
            },
            {
                "nome": "Sentido Sísmico",
                "tipo": "Qualidade",
                "desc": "Percepção às cegas em alcance médio, mas apenas para criaturas e objetos em contato com a mesma superfície que ele."
            }
        ],
        "pericias": [],
        "tesouro": "Metade e 1 peça de carapaça de ankthyr (CD 23 para extrair)",
        "fonte": "Bestiário de Arton"
    },
    {
        "nome": "Aranha-Óssea",
        "tipo": "Monstro Grande",
        "nd": "11",
        "iniciativa": "+12",
        "percepcao": "+10",
        "percepcaoObs": "visão no escuro",
        "defesa": "41",
        "fort": "+18",
        "ref": "+24",
        "von": "+11",
        "defesaObs": "evasão, imunidade a trevas, redução de corte, frio e perfuração 5",
        "pv": "540",
        "desl": "12m (8q), escalar 12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "3",
            "con": "2",
            "int": "-3",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Mordida x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "2d12+30",
                "desc": "Mais 4d10 de trevas, mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Armadilha Planejada",
                "tipo": "Reação",
                "desc": "Quando um inimigo em alcance médio se move dentro do covil da aranha-óssea, ela faz surgir uma teia (veja Teia) em um quadrado de 1,5m de lado ocupado pela criatura. Recarga (padrão)."
            },
            {
                "nome": "Imitar Presa",
                "tipo": "Padrão",
                "desc": "Cria ilusões sonoras, como o efeito básico da magia Criar Ilusão (CD 31), mas apenas para imitar as vozes de indivíduos que já tenha ouvido."
            },
            {
                "nome": "Teia",
                "tipo": "Padrão",
                "desc": "Dispara teia em um quadrado de 3m de lado em alcance curto. A teia é feita de trevas e afeta mesmo incorpóreos. Criaturas na área ficam enredadas (Ref CD 31 evita) e não recuperam PV enquanto enredadas. Para se soltar: ação completa e teste de Força ou Acrobacia (CD 25), ou cortar a teia (cada espaço de 1,5m tem 10 PV, RD 5 e imunidade a trevas). Também pode cobrir uma área quadrada de 6m de lado; nesse caso a teia é quase invisível (Percepção CD 25) e quem entra na área fica enredado. A aranha anda na própria teia sem se enredar e percebe automaticamente (como percepção às cegas) qualquer criatura nela."
            },
            {
                "nome": "Veneno Debilitado",
                "tipo": "Qualidade",
                "desc": "Fort CD 31 reduz para fraco por 1 rodada."
            }
        ],
        "pericias": [
            {
                "nome": "Enganação",
                "valor": "+12"
            },
            {
                "nome": "Furtividade",
                "valor": "+14"
            }
        ],
        "tesouro": "1d4+1 doses de essência de sombra (CD 26 para extrair)",
        "fonte": "Bestiário de Arton"
    },
    {
        "nome": "Aspecto de Azgher",
        "tipo": "Humanoide (humano) Médio",
        "nd": "5",
        "iniciativa": "+7",
        "percepcao": "+6",
        "percepcaoObs": "percepção às cegas",
        "defesa": "24",
        "fort": "+5",
        "ref": "+11",
        "von": "+17",
        "defesaObs": "evasão, redução de dano de luz, fogo, frio e trevas 10",
        "pv": "190",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "3",
            "con": "4",
            "int": "1",
            "sab": "2",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Cimitarra",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "4d6+8",
                "desc": "18, mais 4d6 de fogo."
            },
            {
                "nome": "Arco curto",
                "tipo": "À Distância",
                "bonus": "+17",
                "dano": "8d8 luz",
                "desc": "x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Escaramuça",
                "tipo": "Qualidade",
                "desc": "Quando se move 6m ou mais, recebe +2 na Defesa e em Reflexos e +1d8 nas rolagens de dano até o início do próximo turno."
            },
            {
                "nome": "Fulgor Solar",
                "tipo": "Qualidade",
                "desc": "Quando uma criatura em alcance curto o ataca, ela fica ofuscada por 1 rodada (Ref CD 20 evita e a criatura não pode mais ser ofuscada por esta habilidade até o fim da cena)."
            },
            {
                "nome": "Inimigo dos Mortos",
                "tipo": "Qualidade",
                "desc": "Seus ataques causam +2d6 de dano de luz contra mortos-vivos."
            },
            {
                "nome": "Olhar Vigilante",
                "tipo": "Qualidade",
                "desc": "Está permanentemente sob o efeito básico da magia Visão da Verdade."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro veterano que fornece redução de dano de luz, fogo, frio e trevas 5 e permite usar o poder Espada Solar (Tormenta20, p. 133); se você já tem o poder, o dano de fogo dele aumenta em mais um dado do mesmo tipo. Apoia apenas personagens devotos de Azgher de nível maior que o dele; se você violar as Obrigações & Restrições de Azgher, ele deixa de apoiá-lo."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+8"
            },
            {
                "nome": "Diplomacia",
                "valor": "+8"
            },
            {
                "nome": "Intuição",
                "valor": "+11"
            },
            {
                "nome": "Religião",
                "valor": "+6"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+11"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Bestiário de Arton",
        "equipamento": "Arco curto, armadura de couro, cimitarra"
    },
    {
        "nome": "Aspecto de Hyninn",
        "tipo": "Construto Médio",
        "nd": "4",
        "iniciativa": "+15",
        "percepcao": "+6",
        "percepcaoObs": "visão no escuro",
        "defesa": "21",
        "fort": "+4",
        "ref": "+16",
        "von": "+10",
        "defesaObs": "evasão aprimorada, redução de dano 5",
        "pv": "99",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "9",
            "con": "2",
            "int": "6",
            "sab": "2",
            "car": "7"
        },
        "ataques": [
            {
                "nome": "Duas pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d6+5",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Aparência Inócua",
                "tipo": "Qualidade",
                "desc": "Não sofre penalidade em Furtividade por se mover ao deslocamento normal ou por atacar e fazer outras ações chamativas."
            },
            {
                "nome": "Armadilha Animada",
                "tipo": "Qualidade",
                "desc": "Possui uma armadilha incorporada à sua forma, escolhida entre as descritas a seguir. Se estiver imóvel (veja Imobilidade), a armadilha pode ser acionada por qualquer personagem que tente manuseá-lo ou abri-lo. A CD dos testes de Investigação e Ladinagem é 25 e a CD do teste de resistência é 20."
            },
            {
                "nome": "Armadilha: Agulhas Envenenadas",
                "tipo": "Qualidade",
                "desc": "Criaturas em alcance curto perdem 1d12 PV por veneno por rodada durante 1d4+1 rodadas (Fort reduz para 1 rodada)."
            },
            {
                "nome": "Armadilha: Disparador Elétrico",
                "tipo": "Qualidade",
                "desc": "Criaturas em alcance curto sofrem 2d12 de eletricidade e ficam atordoadas por 1 rodada (Ref reduz o dano à metade e evita a condição)."
            },
            {
                "nome": "Armadilha: Gás Sonífero",
                "tipo": "Qualidade",
                "desc": "Criaturas em alcance curto ficam inconscientes, como na magia Sono (Von evita)."
            },
            {
                "nome": "Armadilha: Grito Agonizante",
                "tipo": "Qualidade",
                "desc": "Criaturas em alcance curto sofrem dores terríveis, com penalidade de -5 em todos os testes até o fim da cena (Fort reduz para 1 rodada)."
            },
            {
                "nome": "Ataque Furtivo",
                "tipo": "Qualidade",
                "desc": "+2d6 (pode usar esta habilidade duas vezes por rodada)."
            },
            {
                "nome": "Imobilidade",
                "tipo": "Qualidade",
                "desc": "Pode permanecer completamente imóvel. Assim, um personagem deve passar em um teste de Percepção (CD 35) para perceber que ele é uma criatura e não um objeto."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro veterano que fornece +2 em Jogatina e Ladinagem e permite usar um poder de Armadilha do caçador (Tormenta20, p. 50), definido pelo aspecto. A armadilha é mágica, pode ser preparada em locais sem os materiais propícios e não é percebida automaticamente por criaturas que a vejam ser preparada. Se você já possui um poder de Armadilha, a CD para resistir a todas as suas armadilhas aumenta em +2. Se você violar as Obrigações & Restrições de Hyninn, ele deixa de apoiá-lo."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+7"
            },
            {
                "nome": "Acrobacia",
                "valor": "+13"
            },
            {
                "nome": "Diplomacia",
                "valor": "+11"
            },
            {
                "nome": "Enganação",
                "valor": "+13"
            },
            {
                "nome": "Furtividade",
                "valor": "+15"
            },
            {
                "nome": "Intuição",
                "valor": "+6"
            },
            {
                "nome": "Jogatina",
                "valor": "+16"
            },
            {
                "nome": "Ladinagem",
                "valor": "+18"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Bestiário de Arton"
    },
    {
        "nome": "Aspecto de Megalokk",
        "tipo": "Monstro Grande",
        "nd": "5",
        "iniciativa": "+7",
        "percepcao": "+7",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "23",
        "fort": "+16",
        "ref": "+10",
        "von": "+4",
        "defesaObs": "imunidade a efeitos mentais e medo, resistência a magia +2",
        "pv": "200",
        "desl": "12m (8q), voo 15m (10q)",
        "pm": "0",
        "atributos": {
            "for": "7",
            "des": "3",
            "con": "5",
            "int": "-4",
            "sab": "3",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Quatro mordidas",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "2d8+5",
                "desc": "x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Quatro Cabeças Monstruosas",
                "tipo": "Qualidade",
                "desc": "Tem quatro cabeças distintas que concedem habilidades especiais, escolhidas entre as cabeças descritas a seguir."
            },
            {
                "nome": "Cabeça: Bulette",
                "tipo": "Qualidade",
                "desc": "Ao acertar um ataque de mordida com esta cabeça, pode usar a manobra agarrar como ação livre (teste +19)."
            },
            {
                "nome": "Cabeça: Cocatriz",
                "tipo": "Qualidade",
                "desc": "Uma criatura que sofra dano da bicada dessa cabeça fica lenta (Fort CD 20 evita). Se já estiver lenta, fica petrificada permanentemente. Efeitos que removem paralisia revertem a petrificação."
            },
            {
                "nome": "Cabeça: Dragão",
                "tipo": "Qualidade",
                "desc": "No lugar de um de seus ataques de mordida, pode cuspir ácido em um cone de 6m. Criaturas na área sofrem 5d6 de ácido (Ref CD 20 reduz à metade). Recarga (movimento)."
            },
            {
                "nome": "Cabeça: Hidra",
                "tipo": "Qualidade",
                "desc": "Ganha cura acelerada 20/ácido ou fogo."
            },
            {
                "nome": "Cabeça: Mycotann",
                "tipo": "Qualidade",
                "desc": "No lugar de um de seus ataques de mordida, pode disparar uma nuvem de esporos que atinge uma criatura em alcance curto. A criatura fica enredada ou, se já estiver enredada por este efeito, fica paralisada (Fort CD 20 evita). Veneno."
            },
            {
                "nome": "Cabeça: Razza'kham",
                "tipo": "Qualidade",
                "desc": "Sempre que esta cabeça rola um resultado máximo em um dado de dano, rola um dado extra de dano do mesmo tipo."
            },
            {
                "nome": "Cabeça: Sapo Atroz",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida por uma mordida desta cabeça perde 1d12 PV e fica paralisada por 1 rodada (Fort CD 20 evita a paralisia e reduz a perda de vida para 1d6). Uma criatura só pode ser paralisada por este efeito uma vez por cena. Veneno."
            },
            {
                "nome": "Cabeça: Verme do Gelo",
                "tipo": "Qualidade",
                "desc": "Ganha imunidade a frio e os ataques com essa cabeça causam +1d6 de dano de frio."
            },
            {
                "nome": "Cabeça: Warg",
                "tipo": "Qualidade",
                "desc": "Se acertar um ataque de mordida com esta cabeça, pode usar a manobra derrubar como ação livre (teste +20)."
            },
            {
                "nome": "Mente Quádrupla",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de Percepção ou Vontade, joga quatro dados e usa o melhor resultado."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro veterano que fornece os benefícios de quatro parceiros iniciantes diferentes (exceto montaria) entre os descritos em Tormenta20 ou, a critério do mestre, outros parceiros monstros iniciantes. Você só recebe os benefícios de dois dos tipos escolhidos por vez, podendo trocar um ou ambos no início de cada turno como ação livre. Além disso, ao fazer um teste de Percepção, você pode jogar um dado adicional e usar o melhor resultado. Se você violar as Obrigações & Restrições de Megalokk, ele deixa de apoiá-lo."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+11"
            },
            {
                "nome": "Intimidação",
                "valor": "+7"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+9"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Bestiário de Arton"
    },
    {
        "pm": "0",
        "percepcaoObs": "",
        "defesaObs": "cura acelerada 5, evasão, imunidade a adivinhação, efeitos mentais e veneno",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+10"
            },
            {
                "nome": "Conhecimento",
                "valor": "+11"
            },
            {
                "nome": "Diplomacia",
                "valor": "+11"
            },
            {
                "nome": "Enganação",
                "valor": "+16"
            },
            {
                "nome": "Furtividade",
                "valor": "+10"
            },
            {
                "nome": "Intuição",
                "valor": "+12"
            },
            {
                "nome": "Investigação",
                "valor": "+9"
            },
            {
                "nome": "Ladinagem",
                "valor": "+10"
            },
            {
                "nome": "Misticismo",
                "valor": "+9"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Aspecto de Sszzaas",
        "tipo": "Humanoide (duplo) Médio",
        "nd": "5",
        "iniciativa": "+10",
        "percepcao": "+7",
        "defesa": "22",
        "fort": "+6",
        "ref": "+16",
        "von": "+11",
        "pv": "165",
        "desl": "9m (6q)",
        "atributos": {
            "for": "2",
            "des": "6",
            "con": "2",
            "int": "5",
            "sab": "3",
            "car": "7"
        },
        "ataques": [
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+15",
                "dano": "1d6+7",
                "desc": "Mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "tipo": "Qualidade",
                "desc": "+3d6."
            },
            {
                "nome": "Aspecto da Serpente",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de Enganação, Furtividade ou Intuição, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Detectar Pensamentos",
                "tipo": "Qualidade",
                "desc": "Detecta constantemente os pensamentos superficiais de todas as criaturas inteligentes em alcance curto. Não pode ser surpreendido por elas e recebe +2 na Defesa e em testes de perícia contra elas. Uma criatura ciente disso pode gastar uma ação de movimento e passar em Vontade (CD 22) para esconder os pensamentos até o fim da cena."
            },
            {
                "nome": "Falso Amigo",
                "tipo": "Qualidade",
                "desc": "Ao usar Mudar Forma, recebe +10 nos testes de Enganação. Alternativamente, com o suplemento Ameaças de Arton, pode agir como um falso amigo veterano de qualquer tipo (p. 327)."
            },
            {
                "nome": "Mudar Forma",
                "tipo": "Padrão",
                "desc": "Assume a forma de qualquer humanoide de tamanho Pequeno a Grande, como na magia Metamorfose. Pode manter a forma por tempo indeterminado; se morrer, reverte à forma natural."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha concentrada (perde 1d12 PV durante 3 rodadas, Fort CD 22 reduz a duração para 1 rodada)."
            }
        ],
        "tesouro": "Nenhum",
        "equipamento": "Geralmente nenhum; pode portar armas, ferramentas e roupas adequadas ao disfarce atual"
    },
    {
        "pm": "31",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "evasão, imunidade a efeitos de sentidos, encantamento, escuridão e dano de luz e trevas",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+14"
            },
            {
                "nome": "Atuação",
                "valor": "+12"
            },
            {
                "nome": "Diplomacia",
                "valor": "+14"
            },
            {
                "nome": "Enganação",
                "valor": "+12"
            },
            {
                "nome": "Furtividade",
                "valor": "+22"
            },
            {
                "nome": "Intimidação",
                "valor": "+12"
            },
            {
                "nome": "Misticismo",
                "valor": "+11"
            },
            {
                "nome": "Religião",
                "valor": "+13"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Aspecto de Tenebra",
        "tipo": "Morto-vivo Minúsculo",
        "nd": "5",
        "iniciativa": "+14",
        "percepcao": "+10",
        "defesa": "22",
        "fort": "+5",
        "ref": "+11",
        "von": "+17",
        "pv": "140",
        "desl": "12m (8q)",
        "atributos": {
            "for": "0",
            "des": "8",
            "con": "2",
            "int": "7",
            "sab": "4",
            "car": "8"
        },
        "ataques": [
            {
                "nome": "Garra",
                "tipo": "Corpo a Corpo",
                "bonus": "+15",
                "dano": "1d6+8",
                "desc": "Mais 2d6 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Determinação Vaidosa",
                "tipo": "Reação",
                "desc": "Quando falha em um teste de resistência, pode repetir o teste usando Vontade (apenas uma vez por teste)."
            },
            {
                "nome": "Presença Manhosa",
                "tipo": "Qualidade",
                "desc": "Uma criatura que tente uma ação hostil contra o aspecto faz um teste de Vontade (CD 22); se falhar, perde a ação (apenas uma vez por cena)."
            },
            {
                "nome": "Visão nas Trevas",
                "tipo": "Qualidade",
                "desc": "Enxerga perfeitamente no escuro, incluindo em magias de escuridão."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como uma clériga de Tenebra de 5º nível (CD 22; -1 PM no custo de Escuridão e Toque Vampírico, já contabilizado)."
            },
            {
                "nome": "Magia: Curar Ferimentos",
                "tipo": "Padrão",
                "desc": "Custos: 5 PM. Uma criatura adjacente cura 6d8+6 PV."
            },
            {
                "nome": "Magia: Escuridão",
                "tipo": "Padrão",
                "desc": "Custos: 4 PM. Até o fim da cena, um objeto em alcance curto emana escuridão total em raio de 9m, bloqueando a visão na área e através dela."
            },
            {
                "nome": "Magia: Profanar",
                "tipo": "Padrão",
                "desc": "Custos: 4 PM. Esfera de 9m em alcance longo se enche de energia negativa por 1 dia. Dentro dela, todo dano de trevas é maximizado e mortos-vivos recebem +3 na Defesa e em todos os testes."
            },
            {
                "nome": "Magia: Toque Vampírico",
                "tipo": "Padrão",
                "desc": "Custos: 4 PM. Faz um ataque corpo a corpo. Se acertar, além do dano normal causa 6d6 de trevas (Fort reduz à metade) e recupera PV iguais à metade do dano de trevas."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro veterano que atua como familiar gato (Tormenta20, p. 38) e permite lançar Escuridão e Toque Vampírico. Se você já conhece essas magias, o custo delas diminui em -1 PM (cumulativo com reduções de poderes concedidos de Tenebra). Se você violar as Obrigações & Restrições de Tenebra, ele deixa de apoiá-lo."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "percepção às cegas (médio)",
        "defesaObs": "evasão, imunidade a acertos críticos, atordoamento, efeitos de metabolismo e metamorfose e medo, redução de dano 5, resistência a magia +2",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+10"
            },
            {
                "nome": "Religião",
                "valor": "+9"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Aspecto de Thwor",
        "tipo": "Espírito Grande",
        "nd": "4",
        "iniciativa": "+6",
        "percepcao": "+7",
        "defesa": "23",
        "fort": "+16",
        "ref": "+10",
        "von": "+4",
        "pv": "140",
        "desl": "voo 15m (10q)",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "5",
            "int": "0",
            "sab": "3",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Pancada",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "2d12+11",
                "desc": "x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Investida Avassaladora",
                "tipo": "Completa",
                "desc": "Faz uma investida com a pancada. Se acertar, causa +2d12 de dano e a vítima é arremessada 1d6 x 1,5m na direção oposta."
            },
            {
                "nome": "Pancada Atordoante",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida pela pancada fica atordoada por 1 rodada (Fort CD 20 evita). Uma criatura só pode ser atordoada por esta habilidade uma vez por cena."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro veterano que fornece +2 na Defesa e em testes para empurrar. Além disso, sempre que faz um ataque corpo a corpo, você pode gastar 1 PM; se fizer isso e acertar, causa +1d12 de dano de impacto e pode fazer uma manobra empurrar contra o alvo como ação livre. Se você violar as Obrigações & Restrições de Thwor, ele deixa de apoiá-lo."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a ácido, frio, medo, trevas e veneno, redução de dano 20, resistência a magia +5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+24"
            },
            {
                "nome": "Enganação",
                "valor": "+23"
            },
            {
                "nome": "Guerra",
                "valor": "+22"
            },
            {
                "nome": "Intimidação",
                "valor": "+23"
            },
            {
                "nome": "Intuição",
                "valor": "+21"
            },
            {
                "nome": "Misticismo",
                "valor": "+22"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Bhargaal",
        "tipo": "Espírito (abissal) Enorme",
        "nd": "19",
        "iniciativa": "+18",
        "percepcao": "+19",
        "defesa": "58",
        "fort": "+32",
        "ref": "+19",
        "von": "+26",
        "pv": "1100",
        "desl": "12m (8q), voo 24m (16q)",
        "atributos": {
            "for": "7",
            "des": "3",
            "con": "5",
            "int": "5",
            "sab": "4",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Espada de sombras x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+52",
                "dano": "4d12+10",
                "desc": "18, mais 4d8 de frio e 4d8 de trevas."
            },
            {
                "nome": "Garra",
                "tipo": "Corpo a Corpo",
                "bonus": "+52",
                "dano": "4d6+10",
                "desc": "Mais 4d8 de frio."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Garra (teste +57)."
            },
            {
                "nome": "Aura Gélida",
                "tipo": "Qualidade",
                "desc": "Aura de sombras gélidas de 9m de raio que obscurece a visão e enfraquece as chamas. É uma área de escuridão total (Tormenta20, p. 318) em que habilidades de fogo custam +1 PM e causam -1 ponto de dano por dado."
            },
            {
                "nome": "Congelar as Trevas",
                "tipo": "Qualidade",
                "desc": "O dano de frio que causa em criaturas em uma área de escuridão é dobrado."
            },
            {
                "nome": "Constrição Sombria",
                "tipo": "Livre",
                "desc": "No início de cada turno dele, causa 2d6+10 de impacto e 4d8 de frio em cada criatura que esteja agarrando. Se a criatura sofrer dano de frio assim, por cada resultado par nos dados desse dano ela também perde 1 PM."
            },
            {
                "nome": "Cristalizar Alma",
                "tipo": "Reação",
                "desc": "Ao matar uma criatura que tenha alma, rola 1d20: se o resultado for igual ou maior que os PM que a criatura tinha ao morrer, a alma é aprisionada em um cristal de gelo mágico. Ela só pode ser trazida de volta à vida se o cristal for quebrado."
            },
            {
                "nome": "Talho da Alma",
                "tipo": "Qualidade",
                "desc": "Quando acerta um ataque com a espada de sombras e a criatura sofre dano de frio, por cada resultado par nos dados desse dano de frio ela também perde 1 PM."
            },
            {
                "nome": "Visão Abissal",
                "tipo": "Qualidade",
                "desc": "Está permanentemente sob efeito da magia Visão Mística, com o aprimoramento que permite enxergar criaturas e objetos invisíveis."
            },
            {
                "nome": "Vulnerabilidade Sagrada",
                "tipo": "Qualidade",
                "desc": "Uma criatura sob efeito da magia Bênção ignora 10 pontos da redução de dano dele."
            }
        ],
        "tesouro": "Dobro mais 1d4 almas cristalizadas",
        "observacao": "Alma cristalizada: fragmento de gelo mágico com uma alma. Uma ação padrão para quebrá-la devolve 4d6 PM a quem a quebra (a alma é consumida e perdida para sempre). Também pode ser usada para tentar restaurar a alma à vida, a critério do mestre."
    },
    {
        "pm": "22",
        "percepcaoObs": "",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+8"
            },
            {
                "nome": "Conhecimento",
                "valor": "+8"
            },
            {
                "nome": "Cura",
                "valor": "+10"
            },
            {
                "nome": "Intuição",
                "valor": "+8"
            },
            {
                "nome": "Misticismo",
                "valor": "+6"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+10"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Bruxo Rural",
        "tipo": "Humanoide (humano) Médio",
        "nd": "4",
        "iniciativa": "+3",
        "percepcao": "+8",
        "defesa": "22",
        "fort": "+10",
        "ref": "+4",
        "von": "+17",
        "pv": "68",
        "desl": "9m (6q), sem redução por terreno difícil natural",
        "atributos": {
            "for": "0",
            "des": "1",
            "con": "1",
            "int": "2",
            "sab": "4",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Bordão x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+13",
                "dano": "1d6+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Bolsa de Ervas",
                "tipo": "Qualidade",
                "desc": "Enquanto tiver a bolsa, sempre que lança uma magia pode aplicar o efeito de um catalisador à sua escolha entre os descritos em Tormenta20 (pp. 160 a 161)."
            },
            {
                "nome": "Simpatia Preparada",
                "tipo": "Livre",
                "desc": "No primeiro turno de cada cena, ao lançar uma magia com execução de ação completa, padrão ou movimento, pode mudar a execução dela para livre."
            },
            {
                "nome": "Sussurros das Matas",
                "tipo": "Qualidade",
                "desc": "Em um bosque ou outra área de terreno natural, recebe +2 na Defesa e em Reflexos e não pode ser surpreendido."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um conjurador arcano de 4º nível (CD 22; atributo-chave Sabedoria)."
            },
            {
                "nome": "Magia: Adaga Mental",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Uma criatura em alcance curto sofre 3d6 de dano psíquico e fica atordoada por 1 rodada (Von reduz o dano à metade e evita a condição). Uma criatura só pode ser atordoada por esta magia uma vez por cena."
            },
            {
                "nome": "Magia: Amedrontar",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Von reduz para abalado por 1d4 rodadas)."
            },
            {
                "nome": "Magia: Armamento da Natureza",
                "tipo": "Movimento",
                "desc": "Custos: 4 PM. O bordão torna-se mágico até o fim da cena: +1 em testes de ataque e dano aumentado em um passo (de 1d6 para 1d8)."
            },
            {
                "nome": "Magia: Controlar Plantas",
                "tipo": "Padrão",
                "desc": "Custos: 2 PM. Um quadrado de 9m de vegetação em alcance curto vira terreno difícil. Criaturas na área ao ser lançada ou no início dos próprios turnos ficam enredadas e imóveis (Fort evita). Uma vítima se liberta com ação padrão e teste de Acrobacia ou Atletismo."
            },
            {
                "nome": "Magia: Curar Ferimentos",
                "tipo": "Padrão",
                "desc": "Custos: 4 PM. Uma criatura adjacente cura 5d8+5 PV."
            },
            {
                "nome": "Magia: Orientação",
                "tipo": "Padrão",
                "desc": "Custos: 1 PM. No próximo teste de perícia até o fim da próxima rodada, uma criatura em alcance curto rola dois dados e fica com o melhor resultado."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Bordão, farrapos de ermitão, gorro de ervas"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "imunidade a medo e surpreendido, redução de dano 5, resistência a magia +5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+31"
            },
            {
                "nome": "Furtividade",
                "valor": "+16"
            },
            {
                "nome": "Guerra",
                "valor": "+11"
            },
            {
                "nome": "Intimidação",
                "valor": "+22"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+14"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Bugbear Conquistador",
        "tipo": "Humanoide (bugbear) Médio",
        "nd": "14",
        "iniciativa": "+14",
        "percepcao": "+12",
        "defesa": "44",
        "fort": "+28",
        "ref": "+22",
        "von": "+14",
        "pv": "500",
        "desl": "12m (8q)",
        "atributos": {
            "for": "6",
            "des": "3",
            "con": "4",
            "int": "0",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Machado de guerra x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+37",
                "dano": "4d12+21",
                "desc": "x5."
            }
        ],
        "habilidades": [
            {
                "nome": "Brado Apavorante",
                "tipo": "Movimento",
                "desc": "Inimigos a até 9m ficam apavorados por 1 rodada e depois abalados (Von CD 38 reduz para abalado por 1d4 rodadas). Recarga (movimento)."
            },
            {
                "nome": "Destruidor",
                "tipo": "Qualidade",
                "desc": "Ao causar dano com uma arma corpo a corpo de duas mãos, pode rolar novamente qualquer resultado 1 ou 2 das rolagens de dano da arma."
            },
            {
                "nome": "Espírito Inquebrável",
                "tipo": "Qualidade",
                "desc": "Enquanto está em fúria, não fica inconsciente por ser reduzido a 0 PV ou menos. Ao ser reduzido a -250 PV, morre (ou fica inconsciente, se o dano for não letal)."
            },
            {
                "nome": "Êxtase no Medo",
                "tipo": "Qualidade",
                "desc": "Sofre metade do dano de criaturas sob algum efeito de medo."
            },
            {
                "nome": "Fúria",
                "tipo": "Livre",
                "desc": "+4 em testes de Intimidação e de ataque e em rolagens de dano. Termina se ele terminar 1 rodada sem ter atacado nem ser alvo de um efeito hostil. Recarga (movimento)."
            },
            {
                "nome": "Saborear Pavor",
                "tipo": "Qualidade",
                "desc": "Se estiver em alcance curto de outra criatura abalada ou apavorada, recebe nos testes de ataque um bônus igual à penalidade causada pela condição."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Machado de guerra maciço aumentado"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "não pode ser flanqueado",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+6"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Camaleão Feral",
        "tipo": "Monstro Médio",
        "nd": "1",
        "iniciativa": "+4",
        "percepcao": "+3",
        "defesa": "16",
        "fort": "+10",
        "ref": "+6",
        "von": "+0",
        "pv": "36",
        "desl": "9m (6q), escalada 9m (6q)",
        "atributos": {
            "for": "2",
            "des": "2",
            "con": "1",
            "int": "-5",
            "sab": "1",
            "car": "-3"
        },
        "ataques": [
            {
                "nome": "Língua",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d6+4",
                "desc": "Impacto, mais veneno, alcance 3m."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Língua (teste +11)."
            },
            {
                "nome": "Mastigar",
                "tipo": "Livre",
                "desc": "No início de cada turno dele, causa 2d6+6 de corte, mais veneno, na criatura que estiver agarrando com a língua."
            },
            {
                "nome": "Mimetismo",
                "tipo": "Movimento",
                "desc": "Muda a cor da pele para se misturar ao ambiente: camuflagem leve e +5 em Furtividade até o fim da cena ou até mudar de ambiente. Recarga (movimento)."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Perde 1d12 PV e fica paralisado por 1 rodada (Fort CD 14 evita a paralisia e reduz a perda de vida para 1d6)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "evasão, imunidade a efeitos de movimento, ilusão e surpreendido, redução de dano 10",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+20"
            },
            {
                "nome": "Atletismo",
                "valor": "+21"
            },
            {
                "nome": "Intuição",
                "valor": "+14"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Campeão de Mitral",
        "tipo": "Construto Grande",
        "nd": "16",
        "iniciativa": "+20",
        "percepcao": "+19",
        "defesa": "52",
        "fort": "+24",
        "ref": "+30",
        "von": "+16",
        "pv": "750",
        "desl": "12m (8q), sem redução por terreno difícil",
        "atributos": {
            "for": "7",
            "des": "4",
            "con": "9",
            "int": "—",
            "sab": "0",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Lâmina de mitral x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+46",
                "dano": "4d10+20",
                "desc": "Corte, 18, mais 4d8 de eletricidade."
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Acrobático",
                "tipo": "Padrão",
                "desc": "Salta até o limite do deslocamento em direção a uma criatura e faz um ataque contra ela, com os benefícios de uma carga; se acertar, causa +2d10 de dano. Recarga (movimento)."
            },
            {
                "nome": "Escudo Atento",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, se o protegido estiver adjacente e for alvo de um efeito hostil, o campeão se torna o novo alvo (ainda faz os testes de resistência e qualquer dano que o efeito cause a ele é reduzido à metade)."
            },
            {
                "nome": "Lançador de Granadas",
                "tipo": "Padrão",
                "desc": "Dispara até duas granadas explosivas contra pontos diferentes em alcance médio. Criaturas a até 3m de cada ponto sofrem 6d6 de impacto e 6d6 de eletricidade (Ref CD 40 reduz à metade). Quem sofrer dano de eletricidade e falhar no teste também fica vulnerável."
            },
            {
                "nome": "Imunidade a Magia",
                "tipo": "Qualidade",
                "desc": "Imune a efeitos mágicos, exceto: efeitos mágicos de frio o deixam lento por 1d6 rodadas; efeitos mágicos de ácido e eletricidade removem a condição lento e curam 1 PV para cada 3 pontos de dano que causariam."
            },
            {
                "nome": "Protegido",
                "tipo": "Qualidade",
                "desc": "Cada campeão é encarregado de um \"protegido\", que deve proteger a todo custo (só um por vez). Atribuir um novo protegido é uma ação completa que só o protegido atual ou o fabricante pode executar."
            },
            {
                "nome": "Sensores Defensivos",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de Iniciativa, Intuição ou Percepção, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Socorro Emergencial",
                "tipo": "Padrão",
                "desc": "Lança Curar Ferimentos como magia simulada, que afeta apenas o protegido, sem gastar PM (limite 16 PM). Recarga (movimento)."
            }
        ],
        "tesouro": "Lascas de mitral (CD 31 para extrair, vale T$ 4.000 para fabricar itens de mitral)"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "evasão",
        "pericias": [
            {
                "nome": "Sobrevivência",
                "valor": "+6"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Canifado",
        "tipo": "Espírito Minúsculo",
        "nd": "1",
        "iniciativa": "+4",
        "percepcao": "+6",
        "defesa": "15",
        "fort": "+4",
        "ref": "+7",
        "von": "+5",
        "pv": "22",
        "desl": "12m (8q), voo 9m (6q)",
        "atributos": {
            "for": "0",
            "des": "2",
            "con": "2",
            "int": "-4",
            "sab": "2",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+7",
                "dano": "1d6+2",
                "desc": "Mais 2d6 de luz."
            }
        ],
        "habilidades": [
            {
                "nome": "Aparência Inofensiva",
                "tipo": "Qualidade",
                "desc": "A primeira criatura inteligente (Int -3 ou maior) que atacar o canifado em uma cena faz um teste de Vontade (CD 17); se falhar, perde a ação. Seres com sangue feérico (dahllan, duendes, eiradaan, hynne, sátiros, sílfides) sofrem -5 neste teste."
            },
            {
                "nome": "Latido Cromático",
                "tipo": "Padrão",
                "desc": "Lança a magia Leque Cromático com todos os aprimoramentos (CD 17). Recarga (movimento)."
            },
            {
                "nome": "Familiar",
                "tipo": "Qualidade",
                "desc": "Um canifado familiar permite lançar Leque Cromático. Se você aprender novamente essa magia, o custo dela diminui em -1 PM."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro especial (vigilante). Iniciante: +2 em Percepção e Sobrevivência. Veterano: você pode lançar Leque Cromático (atributo-chave Carisma). Mestre: uma vez por rodada, pode aumentar para curto o alcance de uma habilidade de alcance de toque que tenha como alvo um aliado."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a eletricidade, redução de dano 5",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Cariátide Mecânica",
        "tipo": "Construto Médio",
        "nd": "5",
        "iniciativa": "+9",
        "percepcao": "+5",
        "defesa": "24",
        "fort": "+10",
        "ref": "+17",
        "von": "+6",
        "pv": "190",
        "desl": "9m (6q)",
        "atributos": {
            "for": "3",
            "des": "5",
            "con": "3",
            "int": "—",
            "sab": "1",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Duas pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "2d8+11",
                "desc": "x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Imobilidade",
                "tipo": "Qualidade",
                "desc": "Pode permanecer completamente imóvel. Assim, um personagem deve passar em um teste de Percepção (CD 35) para perceber que ela é uma criatura e não uma coluna."
            },
            {
                "nome": "Pancada Estonteante",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida por uma pancada fica atordoada por 1 rodada (apenas uma vez por cena, Fort CD 20 evita)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, percepção às cegas (longo)",
        "defesaObs": "imunidade a atordoamento, cego, efeitos mentais, fogo, medo, sangramento e veneno, redução de dano 15",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Carniceiro Acorrentado",
        "tipo": "Espírito (abissal) Médio",
        "nd": "13",
        "iniciativa": "+13",
        "percepcao": "+12",
        "defesa": "44",
        "fort": "+26",
        "ref": "+13",
        "von": "+20",
        "pv": "666",
        "desl": "9m (6q)",
        "atributos": {
            "for": "5",
            "des": "3",
            "con": "4",
            "int": "-1",
            "sab": "2",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Duas correntes",
                "tipo": "Corpo a Corpo",
                "bonus": "+37",
                "dano": "4d6+15",
                "desc": "Impacto, x3, mais 4d8 de trevas, alcance 4,5m."
            },
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+37",
                "dano": "4d6+15",
                "desc": "Mais 4d8 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Derrubar",
                "tipo": "Livre",
                "desc": "Corrente (teste +39)."
            },
            {
                "nome": "Explosão de Correntes",
                "tipo": "Completa",
                "desc": "Correntes de sangue se projetam em raio de 9m. Inimigos na área sofrem 2d6+15 de impacto e 2d8 de trevas e ficam enredados (Ref CD 35 reduz à metade e evita a condição). Uma criatura enredada se liberta com uma ação completa. Recarga (movimento)."
            },
            {
                "nome": "Êxtase do Sangue",
                "tipo": "Qualidade",
                "desc": "Por cada rodada em que causou dano a pelo menos um inimigo, o dano de trevas dos ataques aumenta em +1d8 cumulativo até o fim da cena."
            },
            {
                "nome": "Marrada Sanguinária",
                "tipo": "Qualidade",
                "desc": "Ao fazer uma investida com os chifres, causa +2d6 de perfuração e, se acertar, deixa o alvo caído e sangrando."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a atordoamento e eletricidade, redução de dano 5",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Carrasco Oco",
        "tipo": "Construto Médio",
        "nd": "7",
        "iniciativa": "+11",
        "percepcao": "+12",
        "defesa": "29",
        "fort": "+14",
        "ref": "+7",
        "von": "+20",
        "pv": "270",
        "desl": "6m (4q)",
        "atributos": {
            "for": "4",
            "des": "1",
            "con": "3",
            "int": "-3",
            "sab": "2",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Duas pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d8+10",
                "desc": "Alcance 4,5m."
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d6+10",
                "desc": "Mais 2d6 de ácido."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Pancada (teste +24)."
            },
            {
                "nome": "Engolir",
                "tipo": "Padrão",
                "desc": "Pode engolir criaturas da sua categoria de tamanho. No início de cada turno dele, a criatura engolida sofre 2d6+5 de perfuração e 2d6 de ácido. Ela escapa causando 20 pontos de dano ao carrasco (Defesa 10, redução de dano 0)."
            },
            {
                "nome": "Imobilidade",
                "tipo": "Qualidade",
                "desc": "Pode permanecer completamente imóvel. Assim, um personagem deve passar em um teste de Percepção (CD 35) para perceber que é uma criatura e não um instrumento de tortura."
            },
            {
                "nome": "Induzir Claustrofobia",
                "tipo": "Livre",
                "desc": "Ao engolir uma criatura, inunda a mente dela com pavor claustrofóbico: apavorada por 1 rodada e depois abalada enquanto engolida (Von CD 24 evita, e a criatura não pode mais ser afetada por esta habilidade até o fim da cena)."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "redução de dano 5, vulnerabilidade a frio",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+14"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Carrasco Yudennach",
        "tipo": "Monstro Grande",
        "nd": "6",
        "iniciativa": "+8",
        "percepcao": "+9",
        "defesa": "25",
        "fort": "+18",
        "ref": "+12",
        "von": "+6",
        "pv": "150",
        "desl": "12m (8q)",
        "atributos": {
            "for": "7",
            "des": "1",
            "con": "5",
            "int": "-5",
            "sab": "2",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "2d10+10",
                "desc": ""
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "2d6+10",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ódio Instintivo",
                "tipo": "Qualidade",
                "desc": "+2 em testes de Vontade e em rolagens de dano contra humanoides não humanos."
            },
            {
                "nome": "Salto Esmagador",
                "tipo": "Padrão",
                "desc": "Pula e cai sobre um oponente menor que ele em alcance curto. O alvo fica caído e sofre 4d6+20 de impacto (Ref CD 22 reduz à metade e evita a condição)."
            },
            {
                "nome": "Varrida de Cauda",
                "tipo": "Padrão",
                "desc": "Golpeia todas as criaturas em um cone de 6m: 4d6+10 de impacto e arremesso de 1d4 x 1,5m na direção oposta. A criatura pode reagir contra-atacando (um ataque corpo a corpo contra o carrasco) ou escapando (Reflexos CD 22: reduz o dano à metade e não é arremessada)."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "imunidade a encantamento, redução de dano 10/mágica",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Catóblepa",
        "tipo": "Monstro Enorme",
        "nd": "8",
        "iniciativa": "+7",
        "percepcao": "+9",
        "defesa": "33",
        "fort": "+20",
        "ref": "+9",
        "von": "+15",
        "pv": "320",
        "desl": "12m (8q), natação 6m (4q)",
        "atributos": {
            "for": "7",
            "des": "-1",
            "con": "6",
            "int": "-5",
            "sab": "1",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Cabeçada",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "4d10+35",
                "desc": "Impacto."
            }
        ],
        "habilidades": [
            {
                "nome": "Cabeçada Avassaladora",
                "tipo": "Livre",
                "desc": "Ao acertar a cabeçada, arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 26 evita). A vítima fica caída e, se atingir um obstáculo, sofre 1d6 de impacto para cada 1,5m arremessada."
            },
            {
                "nome": "Mugido Enganador",
                "tipo": "Movimento",
                "desc": "Mugido que atrai a atenção de todas as criaturas em raio de 30m. Elas fazem um teste de Vontade (CD 26); se falharem, são levadas a olhar para a face do catóblepa. A criatura não pode fechar os olhos para evitar o efeito, mas ainda tem direito ao teste de Reflexos contra o olhar. Encantamento."
            },
            {
                "nome": "Olhar Letal",
                "tipo": "Qualidade",
                "desc": "No início do turno dele, cada personagem em alcance curto faz um teste de Reflexos (CD 26). Se passar, desvia o olhar; se falhar, fica enjoado; se já estiver enjoado, morre. Fechar os olhos concede imunidade, mas impõe os efeitos de estar cego. Um personagem morto assim pode ser revivido se um dos olhos do catóblepa for esmagado sobre sua testa em até um dia. Metabolismo."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "imunidade a encantamento, redução de dano 10/mágica",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Catóblepa Guardião dos Juncos",
        "tipo": "Monstro Enorme",
        "nd": "9",
        "iniciativa": "+7",
        "percepcao": "+9",
        "defesa": "35",
        "fort": "+20",
        "ref": "+9",
        "von": "+15",
        "pv": "360",
        "desl": "12m (8q), natação 6m (4q)",
        "atributos": {
            "for": "7",
            "des": "-1",
            "con": "6",
            "int": "-5",
            "sab": "1",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Cabeçada",
                "tipo": "Corpo a Corpo",
                "bonus": "+28",
                "dano": "4d10+35",
                "desc": "Impacto."
            }
        ],
        "habilidades": [
            {
                "nome": "Cabeçada Avassaladora",
                "tipo": "Livre",
                "desc": "Ao acertar a cabeçada, arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 28 evita). A vítima fica caída e, se atingir um obstáculo, sofre 1d6 de impacto para cada 1,5m arremessada."
            },
            {
                "nome": "Mugido Enganador",
                "tipo": "Movimento",
                "desc": "Mugido que atrai a atenção de todas as criaturas em raio de 30m. Elas fazem um teste de Vontade (CD 28); se falharem, são levadas a olhar para a face do catóblepa. A criatura não pode fechar os olhos para evitar o efeito, mas ainda tem direito ao teste de Reflexos contra o olhar. Encantamento."
            },
            {
                "nome": "Olhar Anurídeo",
                "tipo": "Qualidade",
                "desc": "Substitui o Olhar Letal e funciona de forma semelhante (Reflexos CD 28), mas em vez de morrer, uma criatura enjoada que falha no teste se transforma em um tabrachi (Ameaças de Arton, p. 36): perde todas as memórias e vira um NPC. A transformação é permanente, mas pode ser revertida com Dispersar as Trevas lançada por um sacerdote de Inghlblhphollstgt."
            }
        ],
        "tesouro": "Padrão",
        "observacao": "Catóblepa único, protetor do templo de Inghlblhphollstgt. Usa as estatísticas do Catóblepa com ND 9: +2 em testes de ataque, na Defesa e na CD das habilidades (valores já somados aqui), PV 360 e Olhar Anurídeo no lugar do Olhar Letal."
    },
    {
        "pm": "0",
        "percepcaoObs": "",
        "defesaObs": "resistência a medo +5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+8"
            },
            {
                "nome": "Cavalgar",
                "valor": "+8"
            },
            {
                "nome": "Enganação",
                "valor": "+12"
            },
            {
                "nome": "Guerra",
                "valor": "+6"
            },
            {
                "nome": "Nobreza",
                "valor": "+6"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Cavaleiro Desonrado",
        "tipo": "Humanoide (humano) Médio",
        "nd": "6",
        "iniciativa": "+6",
        "percepcao": "+5",
        "defesa": "29",
        "fort": "+18",
        "ref": "+8",
        "von": "+10",
        "pv": "180",
        "desl": "6m (4q)",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "3",
            "int": "1",
            "sab": "0",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Lança montada x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+19",
                "dano": "1d8+12",
                "desc": "x3, alcance 3m."
            },
            {
                "nome": "Martelo de guerra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+19",
                "dano": "1d10+12",
                "desc": "x3, mais veneno. Alternativa à lança montada."
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "tipo": "Qualidade",
                "desc": "+3d6."
            },
            {
                "nome": "Cavaleiro Experiente",
                "tipo": "Qualidade",
                "desc": "Passa automaticamente em testes de Cavalgar para não cair da montaria ao sofrer dano e não sofre penalidades para atacar à distância montado. Ao fazer uma investida montada, causa +2d8 de dano e pode continuar se movendo depois do ataque (em linha reta, com movimento máximo igual ao dobro do deslocamento)."
            },
            {
                "nome": "Corcel de Batalha",
                "tipo": "Qualidade",
                "desc": "Cavalga um cavalo de guerra (Tormenta20, p. 262). Montado, seu deslocamento vira 15m, recebe uma ação de movimento extra por turno (apenas para se deslocar) e +2 nos testes de ataque corpo a corpo."
            },
            {
                "nome": "Truque Sujo",
                "tipo": "Movimento",
                "desc": "Teste de Enganação contra a Percepção de uma criatura adjacente; se vencer, ela fica desprevenida contra ele até o fim do turno (apenas uma vez por cena)."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha comum (perde 1d12 PV, Fort CD 20 evita)."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Cavalo de guerra, escudo pesado, lança montada, martelo de guerra, meia armadura cravejada de gemas, peçonha comum x1d4"
    },
    {
        "pm": "44",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a efeitos de metabolismo e trevas, redução de dano 5",
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+9"
            },
            {
                "nome": "Enganação",
                "valor": "+12"
            },
            {
                "nome": "Intimidação",
                "valor": "+12"
            },
            {
                "nome": "Misticismo",
                "valor": "+9"
            },
            {
                "nome": "Religião",
                "valor": "+15"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Ceifeiro Sombrio",
        "tipo": "Humanoide (humano) Médio",
        "nd": "7",
        "iniciativa": "+7",
        "percepcao": "+13",
        "defesa": "25",
        "fort": "+14",
        "ref": "+7",
        "von": "+20",
        "pv": "170",
        "desl": "9m (6q)",
        "atributos": {
            "for": "2",
            "des": "0",
            "con": "2",
            "int": "2",
            "sab": "6",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Gadanho profano",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "4d4+4",
                "desc": "x4, mais 4d8 de frio."
            }
        ],
        "habilidades": [
            {
                "nome": "Conjuração Inabalável",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de Vontade para manter a concentração em uma magia, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Fúria Diabólica",
                "tipo": "Livre",
                "desc": "Uma vez por cena, entra em fúria: +3 em testes de ataque, na CD das magias e em rolagens de dano. Não pode fazer ações que exijam calma e concentração (como Furtividade), mas pode lançar magias. Termina se, ao fim da rodada, não tiver atacado, lançado magia nem sido alvo de efeito hostil."
            },
            {
                "nome": "Gadanho Profano",
                "tipo": "Qualidade",
                "desc": "Nas mãos do ceifeiro, o gadanho conta como gadanho formidável e causa +4d8 de frio (já contabilizados)."
            },
            {
                "nome": "Segadura de Sangue",
                "tipo": "Livre",
                "desc": "Uma vez por rodada, ao reduzir o alvo a 0 PV ou menos com o gadanho, faz um ataque adicional contra outra criatura ao alcance."
            },
            {
                "nome": "Visão nas Trevas",
                "tipo": "Qualidade",
                "desc": "Enxerga perfeitamente no escuro, incluindo em magias de escuridão."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um clérigo de Tenebra de 7º nível (CD 26, -1 PM para Escuridão)."
            },
            {
                "nome": "Magia: Curar Ferimentos",
                "tipo": "Padrão",
                "desc": "Custos: 7 PM. Uma criatura adjacente cura 8d8+8 PV."
            },
            {
                "nome": "Magia: Escudo da Fé",
                "tipo": "Reação",
                "desc": "Custos: 6 PM. Uma criatura em alcance curto que sofre um ataque recebe camuflagem contra ataques à distância e +4 na Defesa até seu próximo turno."
            },
            {
                "nome": "Magia: Escuridão",
                "tipo": "Padrão",
                "desc": "Custos: 4 PM. Até o fim da cena, um objeto em alcance curto emana escuridão total em raio de 9m, bloqueando a visão na área e através dela."
            },
            {
                "nome": "Magia: Toque Vampírico",
                "tipo": "Padrão",
                "desc": "Custos: 7 PM. Faz um ataque corpo a corpo. Se acertar, além do dano normal causa 8d6 de trevas (Fort reduz à metade) e recupera PV iguais à metade do dano de trevas."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Gadanho macabro, símbolo sagrado de Tenebra"
    },
    {
        "pm": "73",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a efeitos de metabolismo e trevas, redução de dano 10",
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+12"
            },
            {
                "nome": "Enganação",
                "valor": "+16"
            },
            {
                "nome": "Intimidação",
                "valor": "+16"
            },
            {
                "nome": "Misticismo",
                "valor": "+12"
            },
            {
                "nome": "Religião",
                "valor": "+19"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Alto Ceifeiro Sombrio",
        "tipo": "Humanoide (humano) Médio",
        "nd": "12",
        "iniciativa": "+10",
        "percepcao": "+17",
        "defesa": "39",
        "fort": "+20",
        "ref": "+12",
        "von": "+26",
        "pv": "380",
        "desl": "9m (6q)",
        "atributos": {
            "for": "3",
            "des": "0",
            "con": "2",
            "int": "2",
            "sab": "7",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Gadanho da morte",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "6d4+6",
                "desc": "x5, mais 6d8 de frio."
            }
        ],
        "habilidades": [
            {
                "nome": "Armadura de Ossos",
                "tipo": "Movimento",
                "desc": "Custos: 2 PM. +2 na Defesa e em Intimidação e redução de corte e frio 5 até o fim da cena."
            },
            {
                "nome": "Conjuração Inabalável",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de Vontade para manter a concentração em uma magia, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Fúria Diabólica",
                "tipo": "Livre",
                "desc": "Uma vez por cena, entra em fúria: +4 em testes de ataque, na CD das magias e em rolagens de dano. Não pode fazer ações que exijam calma e concentração, mas pode lançar magias. Termina se, ao fim da rodada, não tiver atacado, lançado magia nem sido alvo de efeito hostil."
            },
            {
                "nome": "Gadanho da Morte",
                "tipo": "Qualidade",
                "desc": "Conta como gadanho formidável lancinante e causa +6d8 de frio (já contabilizados)."
            },
            {
                "nome": "Magia Acelerada",
                "tipo": "Livre",
                "desc": "Custos: +4 PM. Uma vez por rodada, ao lançar uma magia de execução movimento, padrão ou completa, muda a execução para livre."
            },
            {
                "nome": "Segadura das Trevas",
                "tipo": "Livre",
                "desc": "Ao reduzir o alvo a 0 PV ou menos com o gadanho, faz um ataque adicional contra outra criatura ao alcance."
            },
            {
                "nome": "Visão nas Trevas",
                "tipo": "Qualidade",
                "desc": "Enxerga perfeitamente no escuro, incluindo em magias de escuridão."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um clérigo de Tenebra de 12º nível (CD 35, -1 PM para Escuridão)."
            },
            {
                "nome": "Magia: Curar Ferimentos",
                "tipo": "Padrão",
                "desc": "Custos: 12 PM. Uma criatura adjacente cura 13d8+13 PV."
            },
            {
                "nome": "Magia: Escudo da Fé",
                "tipo": "Reação",
                "desc": "Custos: 8 PM. Uma criatura em alcance curto que sofre um ataque recebe camuflagem contra ataques à distância e +5 na Defesa até seu próximo turno."
            },
            {
                "nome": "Magia: Escuridão",
                "tipo": "Padrão",
                "desc": "Custos: 4 PM. Até o fim da cena, um objeto em alcance curto emana escuridão total em raio de 9m, bloqueando a visão na área e através dela."
            },
            {
                "nome": "Magia: Manto de Sombras",
                "tipo": "Padrão",
                "desc": "Custos: 6 PM, sustentada. Torna-se incorpóreo. Pode gastar uma ação de movimento e 1 PM para \"entrar\" em uma sombra de seu tamanho ou maior e se teletransportar para outra em alcance médio. Fica vulnerável à luz direta: se exposto a uma fonte de luz, sofre 1 ponto de dano por rodada."
            },
            {
                "nome": "Magia: Toque Vampírico",
                "tipo": "Padrão",
                "desc": "Custos: 9 PM. Faz um ataque corpo a corpo. Se acertar, além do dano normal causa 10d6 de trevas (Fort reduz à metade) e recupera PV iguais à metade do dano de trevas."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Gadanho macabro maciço, símbolo sagrado de Tenebra"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+9"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+6"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Chacal",
        "tipo": "Animal Pequeno",
        "nd": "1/4",
        "iniciativa": "+5",
        "percepcao": "+6",
        "defesa": "13",
        "fort": "+0",
        "ref": "+3",
        "von": "-1",
        "pv": "7",
        "desl": "12m (8q)",
        "atributos": {
            "for": "1",
            "des": "3",
            "con": "2",
            "int": "-4",
            "sab": "2",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+6",
                "dano": "1d4+4",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Derrubar",
                "tipo": "Livre",
                "desc": "Se acerta a mordida, pode fazer a manobra derrubar (teste +6)."
            },
            {
                "nome": "Táticas de Alcateia",
                "tipo": "Qualidade",
                "desc": "Ao flanquear um inimigo, o chacal recebe +2 no teste de ataque e na rolagem de dano (além do bônus normal por flanquear, para um total de +4 no ataque e +2 no dano)."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro montaria (Pequeno). Iniciante: seu deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (apenas para se deslocar). Veterano: como acima, +2 em Furtividade e, uma vez por rodada, +1d6 em uma rolagem de dano corpo a corpo. Mestre: como acima; além disso, uma vez por rodada, ao acertar um ataque corpo a corpo, pode fazer a manobra derrubar como ação livre."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+8"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+7"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Alcateia de Chacais",
        "tipo": "Animal Grande",
        "nd": "3",
        "iniciativa": "+6",
        "percepcao": "+7",
        "defesa": "19",
        "fort": "+9",
        "ref": "+15",
        "von": "+4",
        "pv": "90",
        "desl": "12m (8q)",
        "atributos": {
            "for": "1",
            "des": "3",
            "con": "2",
            "int": "-4",
            "sab": "2",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida [Bando]",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d4+4",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Cercar a Presa",
                "tipo": "Qualidade",
                "desc": "Ao atacar uma criatura menor que ela, flanqueia essa criatura mesmo sem aliado no lado oposto."
            },
            {
                "nome": "Derrubar",
                "tipo": "Livre",
                "desc": "Se acerta a mordida, pode fazer a manobra derrubar (teste +16)."
            },
            {
                "nome": "Táticas de Alcateia",
                "tipo": "Qualidade",
                "desc": "Ao flanquear um inimigo, a alcateia recebe +2 no teste de ataque e na rolagem de dano (além do bônus normal por flanquear, para um total de +4 no ataque e +2 no dano)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "percepção às cegas (médio)",
        "defesaObs": "fortificação 25%, imunidade a sangramento, natureza vegetal, redução de dano 5/corte, vulnerabilidade a fogo",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Cipó Assassino",
        "tipo": "Monstro Médio",
        "nd": "4",
        "iniciativa": "+2",
        "percepcao": "+4",
        "defesa": "23",
        "fort": "+16",
        "ref": "+7",
        "von": "+7",
        "pv": "125",
        "desl": "3m (2q), escalar 3m (2q), natação 3m (2q; apenas boia, não mergulha nem respira sob a água)",
        "atributos": {
            "for": "3",
            "des": "-2",
            "con": "2",
            "int": "-5",
            "sab": "0",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Dois tentáculos",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "1d12+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Tentáculo (teste +18)."
            },
            {
                "nome": "Estrangular",
                "tipo": "Livre",
                "desc": "No início de cada turno dele, causa 2d12+6 de impacto em cada criatura que estiver agarrando. A criatura agarrada assim não pode falar."
            },
            {
                "nome": "Parte da Paisagem",
                "tipo": "Qualidade",
                "desc": "Parece uma trepadeira, arbusto ou planta inócua. Uma criatura deve passar em um teste de Sobrevivência (CD 35) para perceber que é uma criatura e não um vegetal normal."
            }
        ],
        "tesouro": "Metade"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a efeitos mentais, dano psíquico e medo, redução de dano 5/mitral",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+13"
            },
            {
                "nome": "Intuição",
                "valor": "+7"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Come-Sonhos",
        "tipo": "Espírito Minúsculo",
        "nd": "2",
        "iniciativa": "+6",
        "percepcao": "+5",
        "defesa": "18",
        "fort": "+3",
        "ref": "+12",
        "von": "+7",
        "pv": "14",
        "desl": "9m (6q)",
        "atributos": {
            "for": "-3",
            "des": "3",
            "con": "2",
            "int": "0",
            "sab": "2",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+13",
                "dano": "4d4+4",
                "desc": "Mais 2d6 de dano psíquico."
            }
        ],
        "habilidades": [
            {
                "nome": "Devorar Sonhos",
                "tipo": "Padrão",
                "desc": "Devora os sonhos de uma criatura em alcance curto: ela perde 1d4+1 PM (Von CD 16 reduz à metade) e, para cada PM perdido, o come-sonhos recebe 5 PV temporários cumulativos. Se a criatura estiver inconsciente, a perda de PM é dobrada. Recarga (causar dano psíquico com a mordida)."
            },
            {
                "nome": "Êxtase Onírico",
                "tipo": "Qualidade",
                "desc": "Se fosse sofrer dano psíquico, em vez disso cura PV iguais ao dano que sofreria."
            }
        ],
        "tesouro": "1d4 doses de essência de mana (CD 17 para extrair)"
    },
    {
        "pm": "22",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "imunidade a frio e trevas",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Intimidação",
                "valor": "+11"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Corcel das Trevas",
        "tipo": "Espírito Grande",
        "nd": "6",
        "iniciativa": "+7",
        "percepcao": "+9",
        "defesa": "25",
        "fort": "+14",
        "ref": "+11",
        "von": "+11",
        "pv": "160",
        "desl": "15m (10q), voo 24m (16q)",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "2",
            "int": "0",
            "sab": "2",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Cascos",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "4d8+22",
                "desc": "Mais 2d12 de frio."
            }
        ],
        "habilidades": [
            {
                "nome": "Atropelamento",
                "tipo": "Completa",
                "desc": "Percorre até o dobro do deslocamento, podendo passar pelo espaço de inimigos menores (sem repetir espaço). Criaturas atropeladas sofrem 4d8+22 de impacto e 2d12 de frio e ficam caídas e lentas (Ref CD 24 reduz à metade e evita as condições). Recarga (movimento)."
            },
            {
                "nome": "Poderes Sombrios",
                "tipo": "Padrão",
                "desc": "Evoca um dos efeitos a seguir (Invocar Sombras, Pesadelo ou Relincho Congelante). Recarga (padrão)."
            },
            {
                "nome": "Poder Sombrio: Invocar Sombras",
                "tipo": "Padrão",
                "desc": "Forma uma nuvem em cubo de 6m em alcance curto até o fim da cena. Criaturas a até 5m têm camuflagem leve e criaturas a partir de 3m têm camuflagem total. Vento forte a dispersa em 4 rodadas e um vendaval em 1. No início dos turnos, outras criaturas na nuvem e criaturas com faro em alcance curto ficam enjoadas por 1 rodada (Fort CD 24 evita)."
            },
            {
                "nome": "Poder Sombrio: Pesadelo",
                "tipo": "Padrão",
                "desc": "Invade os sonhos de uma criatura viva em alcance longo. No próximo descanso, ela faz Vontade (CD 24); se falhar, tem sono perturbado: não recupera PV e PM, sofre 1d10 de trevas e acorda fatigada."
            },
            {
                "nome": "Poder Sombrio: Relincho Congelante",
                "tipo": "Padrão",
                "desc": "Sopra ar congelado em cone de 9m: 8d6+8 de frio e lentidão (Ref CD 24 reduz à metade e evita a condição)."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro montaria (Grande) que só segue devotos de Tenebra. Iniciante: seu deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (apenas para se deslocar). Veterano: como acima, mas o deslocamento muda para voo 15m e, uma vez por rodada, ao causar dano você causa +1d6 de frio. Mestre: como acima, mas você recebe redução de frio 10 e o dano de frio adicional aumenta para +1d8."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "resistência a magia +2, vulnerabilidade a impacto",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+4 (+9 voando)"
            },
            {
                "nome": "Intuição",
                "valor": "+8"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Coruja-Gigante",
        "tipo": "Monstro Grande",
        "nd": "3",
        "iniciativa": "+6",
        "percepcao": "+8",
        "defesa": "20",
        "fort": "+3",
        "ref": "+15",
        "von": "+9",
        "pv": "90",
        "desl": "6m (4q), voo 24m (16q)",
        "atributos": {
            "for": "3",
            "des": "3",
            "con": "1",
            "int": "-2",
            "sab": "3",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d8+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Bote",
                "tipo": "Completa",
                "desc": "Faz uma investida e ataca com as duas garras. Os dois ataques recebem +2 da investida, mas devem ser feitos contra o mesmo alvo."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro montaria (Grande). Iniciante: resistência a magia +2 e +2 em Intuição (jovem demais para ser montaria). Veterano: pode ser usada como montaria, com deslocamento 9m (voo 12m). Mestre: voo 15m, resistência a magia +5 e bônus em Intuição +5."
            }
        ],
        "tesouro": "Nenhum",
        "observacao": "Sabedoria Estrígia: uma coruja-gigante pode partilhar sua sabedoria com quem julga digno. O personagem escolhe uma perícia baseada em Sabedoria e, até o fim da próxima aventura, pode usar o poder Foco em Perícia nela. Só uma coruja-gigante por vez."
    },
    {
        "pm": "64",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "evasão, redução de fogo e luz 10",
        "pericias": [
            {
                "nome": "Diplomacia",
                "valor": "+13"
            },
            {
                "nome": "Intuição",
                "valor": "+16"
            },
            {
                "nome": "Misticismo",
                "valor": "+13"
            },
            {
                "nome": "Nobreza",
                "valor": "+13"
            },
            {
                "nome": "Religião",
                "valor": "+19"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Couatl da Luz",
        "tipo": "Espírito Grande",
        "nd": "12",
        "iniciativa": "+14",
        "percepcao": "+14",
        "defesa": "37",
        "fort": "+12",
        "ref": "+20",
        "von": "+25",
        "pv": "425",
        "desl": "6m (4q), voo 18m (12q)",
        "atributos": {
            "for": "5",
            "des": "4",
            "con": "3",
            "int": "3",
            "sab": "4",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Mordida x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d8+20",
                "desc": "Mais 4d12 de fogo."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +36)."
            },
            {
                "nome": "Constrição",
                "tipo": "Livre",
                "desc": "No início de cada turno dele, causa 4d8+20 de impacto e 4d12 de fogo na criatura que estiver agarrando."
            },
            {
                "nome": "Representante do Sol",
                "tipo": "Qualidade",
                "desc": "Contra mortos-vivos, devotos de deuses que canalizam apenas energia negativa e criaturas malignas (a critério do mestre), a CD para resistir às habilidades dele aumenta em +2."
            },
            {
                "nome": "Telepatia",
                "tipo": "Qualidade",
                "desc": "Comunica-se telepaticamente com qualquer criatura inteligente (Int -3 ou maior) em alcance médio."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um clérigo de Azgher de 12º nível (CD 35)."
            },
            {
                "nome": "Magia: Coluna de Chamas",
                "tipo": "Padrão",
                "desc": "Custos: 12 PM. Cilindro de fogo sagrado de 3m de raio e 30m de altura desce dos céus em alcance longo, causando 9d6 de fogo e 9d6 de luz nas criaturas e objetos livres na área."
            },
            {
                "nome": "Magia: Compreensão",
                "tipo": "Padrão",
                "desc": "Custos: 4 PM. Vasculha os pensamentos de um alvo em alcance curto para extrair informações (Von evita)."
            },
            {
                "nome": "Magia: Concentração de Combate",
                "tipo": "Padrão",
                "desc": "Custos: 8 PM. Até o fim da cena, ao atacar rola dois dados e usa o melhor; quando um oponente o ataca, rola dois dados e usa o pior."
            },
            {
                "nome": "Magia: Controlar Fogo",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Chameja qualquer número de armas e ataques desarmados escolhidos em alcance curto; até o fim da cena causam +1d6 de fogo."
            },
            {
                "nome": "Magia: Curar Ferimentos",
                "tipo": "Padrão",
                "desc": "Custos: 12 PM. Uma criatura adjacente cura 13d8+13 PV."
            },
            {
                "nome": "Magia: Dispersar as Trevas",
                "tipo": "Padrão",
                "desc": "Custos: 6 PM. Emana luz em esfera de 6m e faz um teste de Religião. Magias de até 3º círculo na área com CD igual ou menor que o teste são dissipadas, aliados recebem +4 em testes de resistência e redução de trevas 10 até o fim da cena, e inimigos ficam cegos por 1d4 rodadas (uma vez por cena)."
            },
            {
                "nome": "Magia: Escudo da Fé",
                "tipo": "Reação",
                "desc": "Custos: 5 PM. Uma criatura em alcance curto que sofre um ataque recebe +4 na Defesa até seu próximo turno."
            },
            {
                "nome": "Magia: Libertação",
                "tipo": "Padrão",
                "desc": "Custos: 10 PM. Até o fim da cena, uma criatura em alcance curto fica imune a efeitos de movimento, ignora efeitos que restrinjam seu deslocamento e pode usar habilidades que exigem liberdade de movimentos mesmo com armadura ou escudo."
            },
            {
                "nome": "Magia: Purificação",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Remove uma condição entre abalado, apavorado, alquebrado, atordoado, cego, confuso, debilitado, enjoado, envenenado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, ofuscado, paralisado, pasmo ou surdo de uma criatura adjacente."
            },
            {
                "nome": "Magia: Resistência a Energia",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Até o fim da cena, uma criatura adjacente recebe redução de dano 15 contra ácido, eletricidade, fogo, frio, luz ou trevas, à escolha do couatl."
            },
            {
                "nome": "Magia: Luz",
                "tipo": "Padrão",
                "desc": "Custos: 1 PM. Uma criatura fica ofuscada pela cena (Von evita)."
            }
        ],
        "tesouro": "Dobro"
    },
    {
        "pm": "64",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "evasão, redução de frio e trevas 10",
        "pericias": [
            {
                "nome": "Diplomacia",
                "valor": "+13"
            },
            {
                "nome": "Furtividade",
                "valor": "+12"
            },
            {
                "nome": "Intuição",
                "valor": "+16"
            },
            {
                "nome": "Misticismo",
                "valor": "+13"
            },
            {
                "nome": "Religião",
                "valor": "+19"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Couatl das Trevas",
        "tipo": "Espírito Grande",
        "nd": "12",
        "iniciativa": "+14",
        "percepcao": "+14",
        "defesa": "37",
        "fort": "+12",
        "ref": "+20",
        "von": "+25",
        "pv": "425",
        "desl": "6m (4q), voo 18m (12q)",
        "atributos": {
            "for": "5",
            "des": "4",
            "con": "3",
            "int": "3",
            "sab": "4",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Mordida x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d8+20",
                "desc": "Mais 4d12 de frio, mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Representante da Noite",
                "tipo": "Qualidade",
                "desc": "Contra criaturas sem visão no escuro ou na penumbra, devotos de deuses que canalizam apenas energia positiva e criaturas bondosas (a critério do mestre), a CD para resistir às habilidades dele aumenta em +2."
            },
            {
                "nome": "Telepatia",
                "tipo": "Qualidade",
                "desc": "Comunica-se telepaticamente com qualquer criatura inteligente (Int -3 ou maior) em alcance médio."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha potente (perde 2d12 PV por rodada durante 3 rodadas, Fort CD 35 reduz a duração para 1 rodada)."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um clérigo de Tenebra de 12º nível (CD 35)."
            },
            {
                "nome": "Magia: Anular a Luz",
                "tipo": "Padrão",
                "desc": "Custos: 6 PM. Emana escuridão em esfera de 6m e faz um teste de Religião. Magias de até 3º círculo na área com CD igual ou menor que o teste são dissipadas, aliados recebem +4 na Defesa até o fim da cena e inimigos ficam enjoados por 1d4 rodadas (uma vez por cena)."
            },
            {
                "nome": "Magia: Compreensão",
                "tipo": "Padrão",
                "desc": "Custos: 4 PM. Vasculha os pensamentos de um alvo em alcance curto para extrair informações (Von evita)."
            },
            {
                "nome": "Magia: Concentração de Combate",
                "tipo": "Padrão",
                "desc": "Custos: 8 PM. Até o fim da cena, ao atacar rola dois dados e usa o melhor; quando um oponente o ataca, rola dois dados e usa o pior."
            },
            {
                "nome": "Magia: Curar Ferimentos",
                "tipo": "Padrão",
                "desc": "Custos: 12 PM. Uma criatura adjacente cura 13d8+13 PV."
            },
            {
                "nome": "Magia: Escudo da Fé",
                "tipo": "Reação",
                "desc": "Custos: 5 PM. Uma criatura em alcance curto que sofre um ataque recebe +4 na Defesa até seu próximo turno."
            },
            {
                "nome": "Magia: Escuridão",
                "tipo": "Padrão",
                "desc": "Custos: 6 PM. Até o fim da cena, é coberto por sombras que dão +10 em Furtividade e camuflagem leve."
            },
            {
                "nome": "Magia: Libertação",
                "tipo": "Padrão",
                "desc": "Custos: 10 PM. Até o fim da cena, uma criatura em alcance curto fica imune a efeitos de movimento, ignora efeitos que restrinjam seu deslocamento e pode usar habilidades que exigem liberdade de movimentos mesmo com armadura ou escudo."
            },
            {
                "nome": "Magia: Raio do Enfraquecimento",
                "tipo": "Padrão",
                "desc": "Custos: 8 PM. Criaturas escolhidas em alcance curto ficam exaustas (Fort muda para fatigado)."
            },
            {
                "nome": "Magia: Relâmpago",
                "tipo": "Padrão",
                "desc": "Custos: 12 PM. Causa 12d6 de eletricidade em criaturas à sua escolha em alcance médio (Ref reduz à metade)."
            },
            {
                "nome": "Magia: Resistência a Energia",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Até o fim da cena, uma criatura adjacente recebe redução de dano 15 contra ácido, eletricidade, fogo, frio, luz ou trevas, à escolha do couatl."
            },
            {
                "nome": "Magia: Toque Vampírico",
                "tipo": "Padrão",
                "desc": "Custos: 11 PM. Faz um ataque de mordida. Se acertar, além do dano normal causa 12d6 de trevas e recupera metade desse dano em PV."
            }
        ],
        "tesouro": "Dobro"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+4 (+9 dentro d'água)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Crocodilo",
        "tipo": "Animal Grande",
        "nd": "2",
        "iniciativa": "+4",
        "percepcao": "+4",
        "defesa": "17",
        "fort": "+11",
        "ref": "+8",
        "von": "+4",
        "pv": "70",
        "desl": "6m (4q), natação 9m (6q)",
        "atributos": {
            "for": "5",
            "des": "1",
            "con": "3",
            "int": "-5",
            "sab": "1",
            "car": "-4"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+13",
                "dano": "1d8+6",
                "desc": ""
            },
            {
                "nome": "Cauda",
                "tipo": "Corpo a Corpo",
                "bonus": "+13",
                "dano": "1d6+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +15)."
            },
            {
                "nome": "Giro da Morte",
                "tipo": "Qualidade",
                "desc": "Se estiver agarrando uma criatura dentro d'água e usar novamente a manobra agarrar para causar dano, causa +2d8 de dano."
            }
        ],
        "tesouro": "Couro de crocodilo (CD 17 para extrair, vale T$ 30 para fabricar armaduras superiores)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a atordoado e petrificado, redução de dano 10",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Defensor Rochoso",
        "tipo": "Construto Médio",
        "nd": "8",
        "iniciativa": "+8",
        "percepcao": "+8",
        "defesa": "33",
        "fort": "+20",
        "ref": "+9",
        "von": "+15",
        "pv": "72",
        "desl": "6m (4q)",
        "atributos": {
            "for": "6",
            "des": "0",
            "con": "3",
            "int": "—",
            "sab": "0",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Duas pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "4d8+19",
                "desc": "x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Imobilidade",
                "tipo": "Qualidade",
                "desc": "Pode permanecer completamente imóvel. Assim, um personagem deve passar em um teste de Percepção (CD 35) para perceber que é uma criatura e não uma estátua."
            },
            {
                "nome": "Natureza Abascanta",
                "tipo": "Qualidade",
                "desc": "50% de chance de ignorar um efeito mágico (como se fosse imune), exceto a magia Despedaçar."
            },
            {
                "nome": "Reverter Transformação",
                "tipo": "Qualidade",
                "desc": "Se for alvo de um efeito mágico que reverte paralisia, faz um teste de Vontade (CD do efeito ou CD Car do usuário). Se falhar, a transformação é revertida e ele volta ao normal, com 1 PV e atordoado por 1 rodada."
            }
        ],
        "tesouro": "Nenhum",
        "observacao": "Indivíduo transformado em pedra por uma matriarca euríade (veja p. 75 do livro). A transformação é permanente, mesmo após a morte da matriarca."
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+5 (+10 em ambientes naturais)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Devolvido Predador",
        "tipo": "Morto-vivo Médio",
        "nd": "2",
        "iniciativa": "+3",
        "percepcao": "+3",
        "defesa": "18",
        "fort": "+7",
        "ref": "+12",
        "von": "+3",
        "pv": "15",
        "desl": "9m (6q), sem redução por terreno difícil natural",
        "atributos": {
            "for": "3",
            "des": "2",
            "con": "0",
            "int": "—",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Lança",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "3d8+7",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Golpe Necrótico",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida por um ataque corpo a corpo do devolvido faz um teste de Reflexos (CD 16). Se falhar, pelas próximas 24 horas qualquer efeito de cura aplicado nela recupera a quantidade mínima de PV."
            },
            {
                "nome": "Gravetos Farpados",
                "tipo": "Qualidade",
                "desc": "Sempre que rola 6 em um de seus dados de dano de perfuração, deixa a vítima sangrando."
            },
            {
                "nome": "Natureza Terrosa",
                "tipo": "Qualidade",
                "desc": "Se fosse sofrer dano de ácido, em vez disso recebe essa quantidade de pontos de vida temporários, até um valor igual aos seus PV máximos."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Lança"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+4 (+9 em ambientes naturais)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Devolvido Andarilho",
        "tipo": "Morto-vivo Médio",
        "nd": "1/2",
        "iniciativa": "+2",
        "percepcao": "+2",
        "defesa": "15",
        "fort": "+3",
        "ref": "+5",
        "von": "+0",
        "pv": "7",
        "desl": "9m (6q), sem redução por terreno difícil natural",
        "atributos": {
            "for": "2",
            "des": "2",
            "con": "0",
            "int": "—",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Lança",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "2d6+4",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Golpe Necrótico",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida por um ataque corpo a corpo do devolvido faz um teste de Reflexos (CD 13). Se falhar, pelas próximas 24 horas qualquer efeito de cura aplicado nela recupera a quantidade mínima de PV."
            },
            {
                "nome": "Natureza Terrosa",
                "tipo": "Qualidade",
                "desc": "Se fosse sofrer dano de ácido, em vez disso recebe essa quantidade de pontos de vida temporários, até um valor igual aos seus PV máximos."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Lança"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a ácido e fogo",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+10"
            },
            {
                "nome": "Misticismo",
                "valor": "+7"
            },
            {
                "nome": "Ofício (alquimista)",
                "valor": "+7"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Diabrete Explosivo",
        "tipo": "Espírito (abissal) Minúsculo",
        "nd": "3",
        "iniciativa": "+5",
        "percepcao": "+4",
        "defesa": "19",
        "fort": "+8",
        "ref": "+14",
        "von": "+5",
        "pv": "27",
        "desl": "6m (4q), voo 12m (8q)",
        "atributos": {
            "for": "-2",
            "des": "2",
            "con": "0",
            "int": "2",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d6+8",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Detonação Final",
                "tipo": "Reação",
                "desc": "Ao ser reduzido a 0 PV, explode em chamas. Criaturas adjacentes sofrem 2d6 de fogo e ficam em chamas (Ref CD 17 reduz à metade e evita a condição)."
            },
            {
                "nome": "Fogo Infernal",
                "tipo": "Padrão",
                "desc": "Arremessa um frasco de pólvora em uma criatura em alcance curto: 1d6 de fogo e 1d6 de trevas e fica em chamas (Ref CD 17 reduz à metade e evita a condição)."
            },
            {
                "nome": "Inocular Pólvora",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida pelo ferrão é inoculada com pólvora infernal. No início do próximo turno dela, sofre 1d6 de fogo e 1d6 de trevas e fica sangrando (Fort CD 17 reduz à metade e evita a condição)."
            },
            {
                "nome": "Peste Invisível",
                "tipo": "Padrão",
                "desc": "Fica invisível (como na magia Invisibilidade) até o fim da cena ou até fazer um ataque."
            }
        ],
        "tesouro": "1d4 doses de fogo alquímico"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "incorpóreo",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+16"
            },
            {
                "nome": "Intimidação",
                "valor": "+17"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Drachnir",
        "tipo": "Morto-vivo Médio",
        "nd": "12",
        "iniciativa": "+14",
        "percepcao": "+12",
        "defesa": "39",
        "fort": "+12",
        "ref": "+21",
        "von": "+21",
        "pv": "390",
        "desl": "voo 18m (12q)",
        "atributos": {
            "for": "—",
            "des": "4",
            "con": "1",
            "int": "2",
            "sab": "2",
            "car": "5"
        },
        "ataques": [
            {
                "nome": "Toque espectral x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+31",
                "dano": "6d8+35",
                "desc": "Trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Aura Antinatural",
                "tipo": "Qualidade",
                "desc": "Aura antinatural de 9m de raio. Animais não entram voluntariamente; se forçados, ficam apavorados e usam todas as ações para sair (um parceiro animal apavorado assim não fornece seus benefícios)."
            },
            {
                "nome": "Drenar Energia",
                "tipo": "Qualidade",
                "desc": "Ao causar dano com o toque espectral em uma criatura viva, impõe penalidade cumulativa de -1 em todos os testes de perícia dela por 1 dia (Fort CD 32 evita) e recupera 5 PV a cada penalidade. Um dia depois, a criatura repete o teste de Fortitude para cada penalidade sofrida; para cada falha, perde 1 nível permanentemente. Efeitos que removem alquebrado recuperam 1 nível por uso."
            },
            {
                "nome": "Lamento da Drachnir",
                "tipo": "Completa",
                "desc": "Lamento apavorante em raio de 9m. Cada outra criatura na área faz Vontade (CD 32); se falhar, é reduzida a 0 PV e fica apavorada por 1 dia. Se passar, não pode ser afetada por esta habilidade por 1 dia. Criaturas surdas não são afetadas. Recarga (recuperar 20 PV com Drenar Energia)."
            }
        ],
        "tesouro": "Nenhum",
        "observacao": "Se sua forma espectral for destruída, retorna na noite seguinte. Só é eliminada de vez se, antes da próxima noite, o local for purificado (magia Consagrar com aprimoramento de duração permanente)."
    },
    {
        "pm": "0",
        "percepcaoObs": "percepção às cegas, visão no escuro",
        "defesaObs": "imunidade a acertos críticos, atordoamento, efeitos de metamorfose, paralisia e veneno, maior que a morte, redução de dano 20, resistência a magia +5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+29"
            },
            {
                "nome": "Misticismo",
                "valor": "+21"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Dragão-de-Aço",
        "tipo": "Construto Enorme",
        "nd": "17",
        "iniciativa": "+16",
        "percepcao": "+15",
        "defesa": "53",
        "fort": "+30",
        "ref": "+23",
        "von": "+18",
        "pv": "1050",
        "desl": "21m (14q), escalada 12m (8q)",
        "atributos": {
            "for": "15",
            "des": "2",
            "con": "16",
            "int": "2",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Quatro garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+42",
                "dano": "4d8+15",
                "desc": "18."
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+42",
                "dano": "3d8+15",
                "desc": "x4."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Garra (teste +47)."
            },
            {
                "nome": "Dilacerar",
                "tipo": "Qualidade",
                "desc": "Se acerta duas garras na mesma criatura no mesmo turno, causa mais 3d8+15 de dano."
            },
            {
                "nome": "Liga Drolem",
                "tipo": "Qualidade",
                "desc": "Se passar em um teste de resistência contra uma magia que o afete, o efeito é revertido contra o conjurador (se a magia tem outros alvos ou área, o restante do efeito é resolvido normalmente)."
            },
            {
                "nome": "Mandíbula Destruidora",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida pela mordida tem a armadura ou o escudo (à escolha dele) avariado. Sem armadura nem escudo, sofre +4d8 de dano (em ambos os casos, Ref CD 44 evita)."
            },
            {
                "nome": "Ódio à Vida",
                "tipo": "Qualidade",
                "desc": "Sempre que começa o turno em alcance curto de um dragão ou humanoide, entra em fúria: +5 em testes de ataque e +1d8 em rolagens de dano corpo a corpo contra essas criaturas até o fim da cena."
            },
            {
                "nome": "Rangido Aterrador",
                "tipo": "Qualidade",
                "desc": "Ao fazer uma ação de movimento para se deslocar, criaturas a até 9m ficam apavoradas (4 níveis ou menos) ou abaladas (5 níveis ou mais) até o fim da cena (Vontade CD 44 evita; quem passa fica imune pela cena)."
            },
            {
                "nome": "Sopro",
                "tipo": "Padrão",
                "desc": "Cone de 15m: 8d12 de veneno e envenenamento por 1d4 rodadas (Fort CD 44 reduz a perda à metade e evita o envenenamento). Uma criatura envenenada perde 2d12 PV por rodada. Recarga (movimento)."
            }
        ],
        "tesouro": "Padrão mais liga drolem (CD 32 para extrair, reduz em 1 PM o custo para fabricar um item mágico)"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, percepção às cegas, visão no escuro",
        "defesaObs": "imunidade a atordoamento, cansaço, metamorfose e paralisia, redução de dano 10, resistência a magia +3",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+21"
            },
            {
                "nome": "Intimidação",
                "valor": "+14"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+11"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Dragotauro",
        "tipo": "Monstro Enorme",
        "nd": "12",
        "iniciativa": "+12",
        "percepcao": "+11",
        "defesa": "43",
        "fort": "+26",
        "ref": "+12",
        "von": "+20",
        "pv": "620",
        "desl": "12m (8q), voo 24m (16q)",
        "atributos": {
            "for": "9",
            "des": "2",
            "con": "7",
            "int": "2",
            "sab": "1",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "4d10+20",
                "desc": "18."
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "3d10+20",
                "desc": "18."
            },
            {
                "nome": "Patas dianteiras",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "4d10+20",
                "desc": "Corte, 18. Só se acertar as duas garras na mesma criatura no mesmo turno."
            },
            {
                "nome": "Patas traseiras",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "4d10+20",
                "desc": "Corte, 18. Reação, veja Patas Traseiras."
            }
        ],
        "habilidades": [
            {
                "nome": "Asas Defletoras",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, ao sofrer dano, reduz esse dano à metade. Não pode usar se estiver voando."
            },
            {
                "nome": "Bote",
                "tipo": "Completa",
                "desc": "Faz uma investida e ataca com a mordida e as duas garras. Os três ataques recebem +2 da investida, mas devem ser feitos contra o mesmo alvo."
            },
            {
                "nome": "Guincho Dracônico",
                "tipo": "Padrão",
                "desc": "Cone de 12m: 12d12 de dano psíquico e apavorado (4 níveis ou menos) ou abalado (5 níveis ou mais). Passar em Vontade (CD 33) reduz o dano à metade, evita a condição e imuniza a criatura por 1 dia. Recarga (movimento)."
            },
            {
                "nome": "Patas Dianteiras",
                "tipo": "Qualidade",
                "desc": "Se acerta os dois ataques de garra na mesma criatura no mesmo turno, pode fazer um ataque com as patas dianteiras."
            },
            {
                "nome": "Patas Traseiras",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, quando uma criatura erra um ataque corpo a corpo contra ele por 5 ou mais, faz um ataque com as patas traseiras contra essa criatura."
            }
        ],
        "tesouro": "Padrão e 2 peças de couro de dragão (CD 27 para extrair)"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro",
        "defesaObs": "evasão",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+8"
            },
            {
                "nome": "Ofício (artesão)",
                "valor": "+4"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+3"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Drigg Artesão",
        "tipo": "Humanoide (drigg) Pequeno",
        "nd": "1/4",
        "iniciativa": "+4",
        "percepcao": "+3",
        "defesa": "11",
        "fort": "-2",
        "ref": "+0",
        "von": "+3",
        "pv": "5",
        "desl": "6m (4q), natação 6m (4q), sem redução por terreno difícil natural",
        "atributos": {
            "for": "-1",
            "des": "2",
            "con": "1",
            "int": "0",
            "sab": "2",
            "car": "1"
        },
        "ataques": [],
        "habilidades": [
            {
                "nome": "Bomba Óssea",
                "tipo": "Padrão",
                "desc": "Arremessa uma bomba de veneno ósseo em um ponto em alcance curto. Criaturas a até 3m do ponto perdem 4d4 PV e ficam sangrando (Fort CD 14 reduz a perda à metade e evita a condição). Recarga (movimento)."
            }
        ],
        "tesouro": "Metade mais 1d4 doses de veneno ósseo"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro",
        "defesaObs": "evasão",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+1"
            },
            {
                "nome": "Furtividade",
                "valor": "+9"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+6"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Drigg Caçador",
        "tipo": "Humanoide (drigg) Pequeno",
        "nd": "1/2",
        "iniciativa": "+5",
        "percepcao": "+4",
        "defesa": "14",
        "fort": "+3",
        "ref": "+6",
        "von": "-1",
        "pv": "15",
        "desl": "6m (4q), natação 6m (4q), sem redução por terreno difícil natural",
        "atributos": {
            "for": "-1",
            "des": "3",
            "con": "2",
            "int": "0",
            "sab": "2",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Clava",
                "tipo": "Corpo a Corpo",
                "bonus": "+7",
                "dano": "1d6",
                "desc": ""
            },
            {
                "nome": "Funda",
                "tipo": "À Distância",
                "bonus": "+7",
                "dano": "1d6",
                "desc": "Mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "tipo": "Qualidade",
                "desc": "+2d6."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Veneno ósseo (perde 4d4 PV e fica sangrando, Fort CD 13 reduz a perda à metade e evita a condição)."
            }
        ],
        "tesouro": "Metade mais 1d4 doses de veneno ósseo",
        "equipamento": "Clava, funda, pedras x20",
        "observacao": "Veneno ósseo (item): inalação, perde 4d4 PV e fica sangrando (perde 2d4 PV). T$ 20, 0,5 espaço. Fabricado só por driggs."
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "redução de frio 10",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+4"
            },
            {
                "nome": "Furtividade",
                "valor": "+6 (+11 em ártico)"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+7"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Elfo-do-Gelo Caçador",
        "tipo": "Humanoide (elfo-do-gelo) Médio",
        "nd": "2",
        "iniciativa": "+6",
        "percepcao": "+7",
        "defesa": "18",
        "fort": "+7",
        "ref": "+11",
        "von": "+4",
        "pv": "13",
        "desl": "12m (8q), sem redução por terreno difícil natural",
        "atributos": {
            "for": "1",
            "des": "3",
            "con": "1",
            "int": "-1",
            "sab": "2",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Machado de batalha",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d6+5",
                "desc": "x3, mais 1d6+2 de frio."
            },
            {
                "nome": "Arco longo",
                "tipo": "À Distância",
                "bonus": "+14",
                "dano": "2d8+3",
                "desc": "x3, mais 1d6+2 de frio."
            }
        ],
        "habilidades": [
            {
                "nome": "Emboscar",
                "tipo": "Qualidade",
                "desc": "Na primeira rodada de combate, pode realizar uma ação padrão adicional."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Arco longo, armadura de couro, flechas x20, machado de batalha"
    },
    {
        "pm": "38",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "evasão, redução de frio 15",
        "pericias": [
            {
                "nome": "Cura",
                "valor": "+10"
            },
            {
                "nome": "Misticismo",
                "valor": "+4"
            },
            {
                "nome": "Religião",
                "valor": "+10"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+12"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Elfo-do-Gelo Acólito da Geada",
        "tipo": "Humanoide (elfo-do-gelo) Médio",
        "nd": "5",
        "iniciativa": "+7",
        "percepcao": "+12",
        "defesa": "22",
        "fort": "+11",
        "ref": "+5",
        "von": "+17",
        "pv": "120",
        "desl": "12m (8q), sem redução por terreno difícil natural",
        "atributos": {
            "for": "0",
            "des": "3",
            "con": "1",
            "int": "0",
            "sab": "6",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Machado de batalha x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+15",
                "dano": "1d12+5",
                "desc": "x3, mais 2d6+2 de frio."
            }
        ],
        "habilidades": [
            {
                "nome": "Bênção do Frio",
                "tipo": "Qualidade",
                "desc": "Se terminar o turno adjacente a inimigos, eles ficam enredados por cristais de gelo por 1 rodada; se já estavam enredados assim, ficam imóveis por 1 rodada (Fort CD 22 evita a condição imóvel)."
            },
            {
                "nome": "Prece de Combate",
                "tipo": "Qualidade",
                "desc": "Custos: +2 PM. Ao lançar em si mesmo uma magia de execução padrão, pode lançá-la como ação de movimento."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um clérigo de Beluhga de 5º nível (CD 22)."
            },
            {
                "nome": "Magia: Arma Espiritual",
                "tipo": "Padrão",
                "desc": "Custos: 5 PM, sustentada. Uma vez por rodada, como ação livre, causa 3d6 de corte automaticamente a uma criatura adjacente. Se não fizer isso e sofrer um ataque corpo a corpo na rodada, pode usar uma reação para causar esse dano ao atacante."
            },
            {
                "nome": "Magia: Curar Ferimentos",
                "tipo": "Padrão",
                "desc": "Custos: 5 PM. Uma criatura adjacente cura 6d8+6 PV."
            },
            {
                "nome": "Magia: Escudo da Fé",
                "tipo": "Reação",
                "desc": "Custos: 1 PM. Uma criatura em alcance curto que sofre um ataque recebe +2 na Defesa por 1 turno."
            },
            {
                "nome": "Magia: Físico Divino",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Uma criatura adjacente recebe +2 em Força, Destreza ou Constituição até o fim da cena (sem PV ou PM adicionais)."
            },
            {
                "nome": "Magia: Sopro das Uivantes",
                "tipo": "Padrão",
                "desc": "Custos: 5 PM. Cone de 9m: 6d6+2 de frio e, se a criatura for Média ou menor, fica caída e é empurrada 6m. Se bater em parede ou objeto sólido (não criatura), sofre +2d6 de impacto (Fort reduz à metade e evita a condição e o empurrão)."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Escudo leve, essência de mana x2, machado de batalha, símbolo sagrado de Beluhga"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "evasão, redução de frio 15",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+14"
            },
            {
                "nome": "Atletismo",
                "valor": "+11"
            },
            {
                "nome": "Furtividade",
                "valor": "+14 (+19 em ártico)"
            },
            {
                "nome": "Guerra",
                "valor": "+9"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+16"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Elfo-do-Gelo Campeão da Neve",
        "tipo": "Humanoide (elfo-do-gelo) Médio",
        "nd": "11",
        "iniciativa": "+14",
        "percepcao": "+14",
        "defesa": "39",
        "fort": "+11",
        "ref": "+24",
        "von": "+18",
        "pv": "320",
        "desl": "12m (8q), sem redução por terreno difícil natural",
        "atributos": {
            "for": "2",
            "des": "5",
            "con": "2",
            "int": "0",
            "sab": "3",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Machado de batalha x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d12+10",
                "desc": "x3, mais 2d6+4 de frio."
            },
            {
                "nome": "Espada curta",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d6+10",
                "desc": "19, mais 2d6+2 de frio."
            },
            {
                "nome": "Arco longo x2",
                "tipo": "À Distância",
                "bonus": "+34",
                "dano": "4d8+10",
                "desc": "x3, mais 2d6+4 de frio."
            }
        ],
        "habilidades": [
            {
                "nome": "Armadura de Neve",
                "tipo": "Movimento",
                "desc": "Cobre-se de gelo resistente que fornece 200 PV temporários até o fim da cena, mas sofre o dobro de dano de fogo. Enquanto tiver esses PV temporários, recebe camuflagem leve. Recarga (padrão)."
            },
            {
                "nome": "Bênção do Frio",
                "tipo": "Qualidade",
                "desc": "Se terminar o turno adjacente a inimigos, eles ficam enredados por cristais de gelo por 1 rodada; se já estavam enredados assim, ficam imóveis por 1 rodada (Fort CD 31 evita a condição imóvel)."
            },
            {
                "nome": "Bote",
                "tipo": "Completa",
                "desc": "Faz uma investida e faz os dois ataques de machado de batalha e o ataque de espada curta. Os três ataques recebem +2 da investida, mas devem ser feitos contra o mesmo alvo."
            },
            {
                "nome": "Emboscar",
                "tipo": "Qualidade",
                "desc": "Na primeira rodada de combate, pode realizar uma ação padrão adicional."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Arco longo, armadura de couro, espada curta, flechas de gelo eterno x20, machado de batalha de gelo eterno, símbolo sagrado de Beluhga"
    },
    {
        "pm": "23",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+5"
            },
            {
                "nome": "Misticismo",
                "valor": "+7"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Elfo Lanceiro Arcano",
        "tipo": "Humanoide (elfo) Médio",
        "nd": "4",
        "iniciativa": "+7",
        "percepcao": "+6",
        "defesa": "20",
        "fort": "+5",
        "ref": "+15",
        "von": "+10",
        "pv": "30",
        "desl": "12m (8q)",
        "atributos": {
            "for": "1",
            "des": "3",
            "con": "1",
            "int": "1",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Lança",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "2d6+12",
                "desc": "Mais 2d8 de essência."
            }
        ],
        "habilidades": [
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um bruxo de 2º nível (CD 18, limite de PM 2). Seu foco arcano é sua lança."
            },
            {
                "nome": "Magia: Armadura Arcana",
                "tipo": "Reação",
                "desc": "Custos: 2 PM. +5 na Defesa contra o próximo ataque que sofrer."
            },
            {
                "nome": "Magia: Primor Atlético",
                "tipo": "Movimento",
                "desc": "Custos: 2 PM. Salta e pousa em alcance corpo a corpo de uma criatura em alcance curto. Se atacar essa criatura corpo a corpo neste turno, recebe os benefícios e penalidades de uma investida e causa um dado extra (d6) de dano do mesmo tipo."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Lança"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "evasão",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Elfo Arqueiro Foragido",
        "tipo": "Humanoide (elfo) Médio",
        "nd": "9",
        "iniciativa": "+16",
        "percepcao": "+10",
        "defesa": "34",
        "fort": "+10",
        "ref": "+20",
        "von": "+15",
        "pv": "64",
        "desl": "12m (8q)",
        "atributos": {
            "for": "-1",
            "des": "6",
            "con": "1",
            "int": "2",
            "sab": "0",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Arco longo x2",
                "tipo": "À Distância",
                "bonus": "+30",
                "dano": "2d8+15",
                "desc": "19/x3, mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Disparo Preciso",
                "tipo": "Qualidade",
                "desc": "Faz ataques à distância contra oponentes envolvidos em combate corpo a corpo sem a penalidade de -5 no ataque."
            },
            {
                "nome": "Flecha Amiga",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, quando um aliado em alcance médio ataca um inimigo, faz um ataque de arco longo contra esse mesmo inimigo."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha concentrada (perde 1d12 PV durante 3 rodadas, Fort CD 28 reduz a duração para 1 rodada)."
            }
        ],
        "tesouro": "Nenhum",
        "equipamento": "Arco longo preciso, couraça, flechas x20, peçonha concentrada x1d4"
    },
    {
        "pm": "64",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "evasão, imunidade a encantamento",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+17"
            },
            {
                "nome": "Atletismo",
                "valor": "+11"
            },
            {
                "nome": "Guerra",
                "valor": "+17"
            },
            {
                "nome": "Misticismo",
                "valor": "+15"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Elfo Espadachim Legionário",
        "tipo": "Humanoide (elfo) Médio",
        "nd": "13",
        "iniciativa": "+20",
        "percepcao": "+12",
        "defesa": "44",
        "fort": "+13",
        "ref": "+26",
        "von": "+20",
        "pv": "590",
        "desl": "12m (8q)",
        "atributos": {
            "for": "1",
            "des": "5",
            "con": "1",
            "int": "5",
            "sab": "0",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Florete x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "4d6+20",
                "desc": "17, mais 4d8 de essência."
            }
        ],
        "habilidades": [
            {
                "nome": "Bloqueio Resistente",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, ao ser atingido por um ataque, faz um teste de ataque com o florete. O dano do ataque é reduzido em um valor igual ao resultado do teste."
            },
            {
                "nome": "Prontidão Marcial",
                "tipo": "Qualidade",
                "desc": "Se for o primeiro na iniciativa, ganha uma ação padrão extra na primeira rodada."
            },
            {
                "nome": "Ripostar",
                "tipo": "Reação",
                "desc": "Ao usar Bloqueio Resistente e reduzir o dano a 0, faz um ataque corpo a corpo imediato contra o inimigo que o atacou (se ao alcance)."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um bruxo de 5º nível (CD 35, limite de PM 5). Seu foco arcano é o florete."
            },
            {
                "nome": "Magia: Armadura Arcana",
                "tipo": "Reação",
                "desc": "Custos: 2 PM. +5 na Defesa contra o próximo ataque que sofrer."
            },
            {
                "nome": "Magia: Concentração de Combate",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Até o fim da cena, sempre que faz um ataque, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Magia: Dissipar Magia",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo com CD igual ou menor que o resultado são dissipadas."
            },
            {
                "nome": "Magia: Velocidade",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM, sustentada. Pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias."
            }
        ],
        "tesouro": "Dobro",
        "equipamento": "Florete preciso, sapato de camurça aprimorado"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de frio, impacto e perfuração 5",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+4"
            },
            {
                "nome": "Furtividade",
                "valor": "+11"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Empalhado Corvo",
        "tipo": "Morto-vivo Minúsculo",
        "nd": "1/4",
        "iniciativa": "+6",
        "percepcao": "+3",
        "defesa": "11",
        "fort": "-2",
        "ref": "+3",
        "von": "+0",
        "pv": "9",
        "desl": "3m (2q), voo 12m (8q)",
        "atributos": {
            "for": "-4",
            "des": "2",
            "con": "1",
            "int": "—",
            "sab": "1",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+6",
                "dano": "1d4+2",
                "desc": "Mais 1d6 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Obra de Taxidermia",
                "tipo": "Qualidade",
                "desc": "Pode permanecer completamente imóvel. Assim, um personagem deve passar em um teste de Cura ou Percepção (CD 25) para perceber que é um morto-vivo e não um animal inanimado."
            },
            {
                "nome": "Sangrar Palha",
                "tipo": "Qualidade",
                "desc": "O multiplicador de crítico de ataques com armas de corte contra o empalhado aumenta em +1."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de frio, impacto e perfuração 5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+4"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Empalhado Serviçal",
        "tipo": "Morto-vivo Médio",
        "nd": "1",
        "iniciativa": "+2",
        "percepcao": "+3",
        "defesa": "14",
        "fort": "+10",
        "ref": "+1",
        "von": "+5",
        "pv": "14",
        "desl": "9m (6q)",
        "atributos": {
            "for": "2",
            "des": "0",
            "con": "2",
            "int": "—",
            "sab": "1",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Foice",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d6+2",
                "desc": "x3, mais 1d6 de trevas."
            },
            {
                "nome": "Pancada",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d4+2",
                "desc": "Mais 1d6 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Zelo Sangrento",
                "tipo": "Qualidade",
                "desc": "Na presença de seu criador, recebe +2 em testes de ataque e rolagens de dano."
            },
            {
                "nome": "Sangrar Palha",
                "tipo": "Qualidade",
                "desc": "O multiplicador de crítico de ataques com armas de corte contra o empalhado aumenta em +1."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "evasão, redução de frio, impacto e perfuração 5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+9"
            },
            {
                "nome": "Furtividade",
                "valor": "+9"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Empalhado Guardião Ofídico",
        "tipo": "Morto-vivo Médio",
        "nd": "6",
        "iniciativa": "+7",
        "percepcao": "+5",
        "defesa": "26",
        "fort": "+6",
        "ref": "+18",
        "von": "+12",
        "pv": "240",
        "desl": "9m (6q)",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "1",
            "int": "—",
            "sab": "0",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Cimitarra x4",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "1d6+4",
                "desc": "18, mais 1d6 de trevas."
            },
            {
                "nome": "Cauda",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d6+4",
                "desc": "Mais 1d6 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Armadilha de Lâminas",
                "tipo": "Reação",
                "desc": "Toda vez que uma criatura erra um ataque corpo a corpo contra ele, causa 1d6 de corte e 1d6 de trevas a ela (Ref CD 22 evita)."
            },
            {
                "nome": "Emboscar",
                "tipo": "Qualidade",
                "desc": "Na primeira rodada de combate, pode realizar uma ação padrão adicional."
            },
            {
                "nome": "Sangrar Palha",
                "tipo": "Qualidade",
                "desc": "O multiplicador de crítico de ataques com armas de corte contra o empalhado aumenta em +1."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "22",
        "percepcaoObs": "",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+8"
            },
            {
                "nome": "Adestramento",
                "valor": "+10"
            },
            {
                "nome": "Atuação",
                "valor": "+11"
            },
            {
                "nome": "Diplomacia",
                "valor": "+8"
            },
            {
                "nome": "Enganação",
                "valor": "+13"
            },
            {
                "nome": "Furtividade",
                "valor": "+10"
            },
            {
                "nome": "Intuição",
                "valor": "+5"
            },
            {
                "nome": "Misticismo",
                "valor": "+7"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Encantador de Pragas",
        "tipo": "Humanoide (humano) Médio",
        "nd": "4",
        "iniciativa": "+8",
        "percepcao": "+5",
        "defesa": "21",
        "fort": "+4",
        "ref": "+10",
        "von": "+16",
        "pv": "98",
        "desl": "9m (6q)",
        "atributos": {
            "for": "0",
            "des": "4",
            "con": "1",
            "int": "3",
            "sab": "1",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Florete",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "1d6+4",
                "desc": "18."
            }
        ],
        "habilidades": [
            {
                "nome": "Empatia com Pragas",
                "tipo": "Qualidade",
                "desc": "+5 em testes de perícia com animais e monstros irracionais (Int -5 ou -4) e pode usar Atuação com eles para mudar atitude e persuasão (Tormenta20, p. 118)."
            },
            {
                "nome": "Encantar Pragas",
                "tipo": "Completa",
                "desc": "Usa a música para gerar um dos efeitos a seguir (Atrair ou Enxamear)."
            },
            {
                "nome": "Encantar Pragas: Atrair",
                "tipo": "Completa",
                "desc": "Atrai todos os animais e monstros irracionais (Int -5 ou -4) Minúsculos em alcance longo. Chegam em 1d3 rodadas, ficam prestativos e permanecem até o fim da cena ou até serem dispensados. Se usar Enxamear com essas criaturas presentes, cria 1d3+1 enxames (em vez de 1)."
            },
            {
                "nome": "Encantar Pragas: Enxamear",
                "tipo": "Completa",
                "desc": "Um enxame de ratos (ou equivalentes) surge em alcance médio e ocupa um quadrado de 3m. No fim de cada turno do encantador, o enxame causa 4d12 de corte a qualquer criatura em seu espaço (Fort CD 22 reduz à metade). O encantador pode gastar uma ação livre para mover o enxame 12m (uma vez por rodada por enxame). O enxame se dispersa ao fim da cena."
            },
            {
                "nome": "Escudo de Pestes",
                "tipo": "Reação",
                "desc": "Ao sofrer dano, reduz esse dano à metade (uma vez por rodada, e apenas se estiver adjacente a um de seus enxames)."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura de couro, capa esvoaçante, flauta aprimorada, florete"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de eletricidade e fogo 5",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+9"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Aranha Engenhoca",
        "tipo": "Construto Minúsculo",
        "nd": "1/4",
        "iniciativa": "+4",
        "percepcao": "+2",
        "defesa": "11",
        "fort": "+0",
        "ref": "+3",
        "von": "-2",
        "pv": "7",
        "desl": "6m (4q), escalada 6m (4q)",
        "atributos": {
            "for": "-1",
            "des": "2",
            "con": "2",
            "int": "—",
            "sab": "0",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+4",
                "dano": "1d4+2",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Teia",
                "tipo": "Padrão",
                "desc": "Dispara teia em um cubo de 6m de lado em alcance curto. Criaturas na área ficam enredadas (Ref CD 14 evita). Uma criatura enredada se solta com uma ação padrão e um teste de Força ou Acrobacia (CD 14). A área é terreno difícil e a teia é inflamável: qualquer ataque que cause dano de fogo destrói as teias por onde passar, libertando as criaturas, mas deixando-as em chamas. A aranha anda na própria teia sem se enredar."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro engenhômato que conta como uma engenhoca de Teia e aumenta em +1 a CD dos testes de Reflexos para resistir às suas engenhocas."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de eletricidade e fogo 5",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+12"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Coruja Engenhoca",
        "tipo": "Construto Minúsculo",
        "nd": "1/2",
        "iniciativa": "+5",
        "percepcao": "+4",
        "defesa": "14",
        "fort": "-1",
        "ref": "+6",
        "von": "+3",
        "pv": "15",
        "desl": "3m (2q), voo 18m (12q)",
        "atributos": {
            "for": "-2",
            "des": "3",
            "con": "2",
            "int": "—",
            "sab": "0",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+7",
                "dano": "2d4+5",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Mergulho",
                "tipo": "Qualidade",
                "desc": "Ao fazer uma investida alada, pode continuar se movendo depois do ataque, em linha reta e com movimento máximo ainda limitado ao dobro do deslocamento."
            },
            {
                "nome": "Programação Orientada",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, ao fazer um teste de perícia, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro engenhômato que conta como uma engenhoca de Orientação e fornece +2 em testes de uma perícia originalmente baseada em Sabedoria (definida na fabricação da coruja)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "redução de eletricidade e fogo 5",
        "pericias": [
            {
                "nome": "Sobrevivência",
                "valor": "+4"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Cão Engenhoca",
        "tipo": "Construto Pequeno",
        "nd": "1",
        "iniciativa": "+5",
        "percepcao": "+4",
        "defesa": "16",
        "fort": "+11",
        "ref": "+5",
        "von": "+0",
        "pv": "35",
        "desl": "12m (8q)",
        "atributos": {
            "for": "1",
            "des": "3",
            "con": "2",
            "int": "—",
            "sab": "0",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d8+4",
                "desc": "Mais 2d6 de eletricidade."
            }
        ],
        "habilidades": [
            {
                "nome": "Chamado da Matilha",
                "tipo": "Padrão",
                "desc": "Uma vez por cena, cria uma cópia sua feita de eletricidade, que dura até o fim da cena ou até ele morrer. Uma vez por rodada, quando o cão sofre um ataque corpo a corpo, pode usar uma reação para que a cópia cause automaticamente 2d6 de eletricidade ao atacante."
            },
            {
                "nome": "Derrubar",
                "tipo": "Livre",
                "desc": "Se acerta a mordida, pode fazer a manobra derrubar (teste +7)."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro engenhômato que conta como uma engenhoca de Arma Espiritual e fornece +1 em testes de ataque corpo a corpo."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de dano 5, redução de eletricidade e fogo 5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+10"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Urso Engenhoca",
        "tipo": "Construto Grande",
        "nd": "3",
        "iniciativa": "+4",
        "percepcao": "+5",
        "defesa": "21",
        "fort": "+15",
        "ref": "+9",
        "von": "+3",
        "pv": "105",
        "desl": "12m (8q)",
        "atributos": {
            "for": "5",
            "des": "1",
            "con": "6",
            "int": "—",
            "sab": "0",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d6+4",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Salto Defensivo",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, recebe +5 na Defesa e em Reflexos contra um ataque ou efeito prestes a atingi-lo. Após a resolução do efeito, salta para um espaço adjacente desocupado."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro engenhômato que conta como uma engenhoca de Salto Dimensional e como uma montaria (Grande) que muda seu deslocamento para 12m."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "imunidade a efeitos mentais e medo",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+12"
            },
            {
                "nome": "Intimidação",
                "valor": "+12"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Enlouquecido Rubro",
        "tipo": "Humanoide (bugbear) Médio",
        "nd": "6",
        "iniciativa": "+7",
        "percepcao": "+0",
        "defesa": "24",
        "fort": "+18",
        "ref": "+18",
        "von": "+0",
        "pv": "200",
        "desl": "9m (6q)",
        "atributos": {
            "for": "7",
            "des": "2",
            "con": "3",
            "int": "0",
            "sab": "-5",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Maça x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "2d8+10",
                "desc": "Mais 2d6 de dano psíquico."
            }
        ],
        "habilidades": [
            {
                "nome": "Alimentar a Loucura",
                "tipo": "Qualidade",
                "desc": "Se estiver em alcance curto de outra criatura sob efeito de uma condição mental ou de medo, recebe +2 em testes de ataque e rolagens de dano."
            },
            {
                "nome": "Indiferença à Dor",
                "tipo": "Qualidade",
                "desc": "Todo o dano não mágico que sofre é reduzido à metade."
            },
            {
                "nome": "Mente Aberrante",
                "tipo": "Qualidade",
                "desc": "Sempre que faz um teste de Vontade para resistir a uma habilidade, a criatura que usou essa habilidade sofre 3d6 de dano psíquico."
            },
            {
                "nome": "Olhar Insano",
                "tipo": "Movimento",
                "desc": "Uma criatura em alcance curto, capaz de ver o enlouquecido, faz um teste de Vontade (CD 22). Se falhar, sofre um efeito (role 1d6): 1) abalada; 2) alquebrada; 3) atordoada por 1 rodada; 4) confusa; 5) frustrada; 6) 3d6 de dano psíquico. Uma criatura só pode ser alvo desta habilidade uma vez por cena."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Maça aumentada"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "imunidade a efeitos mentais",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+7"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Caprino Ensandecido",
        "tipo": "Monstro Médio",
        "nd": "1/2",
        "iniciativa": "+3",
        "percepcao": "+3",
        "defesa": "13",
        "fort": "+3",
        "ref": "+5",
        "von": "+0",
        "pv": "7",
        "desl": "12m (8q)",
        "atributos": {
            "for": "2",
            "des": "1",
            "con": "2",
            "int": "-1",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Foice",
                "tipo": "Corpo a Corpo",
                "bonus": "+8",
                "dano": "1d6+2",
                "desc": "x3."
            },
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+8",
                "dano": "1d6+2",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Frenesi Ensandecido",
                "tipo": "Reação",
                "desc": "Quando uma criatura viva a até 9m do caprino sofre dano de corte ou perfuração, ele entra em frenesi até o fim da cena: +2 em testes de ataque, rolagens de dano e testes de resistência, mas não pode realizar ações que exijam calma e concentração e deve sempre atacar o inimigo mais próximo que possa atacar."
            },
            {
                "nome": "Marrada Atordoante",
                "tipo": "Completa",
                "desc": "Faz uma investida e ataca com os chifres. Se acertar, a vítima fica atordoada por 1 rodada (Fort CD 13 evita). Uma criatura só pode ser atordoada por esta habilidade uma vez por cena."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Foice"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "imunidade a efeitos mentais",
        "pericias": [
            {
                "nome": "Intimidação",
                "valor": "+5"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Suíno Ensandecido",
        "tipo": "Monstro Médio",
        "nd": "1",
        "iniciativa": "+2",
        "percepcao": "+3",
        "defesa": "15",
        "fort": "+10",
        "ref": "+5",
        "von": "+1",
        "pv": "10",
        "desl": "9m (6q)",
        "atributos": {
            "for": "3",
            "des": "0",
            "con": "3",
            "int": "-1",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Machado de lenha",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d6+4",
                "desc": "x3."
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d4+4",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Frenesi Ensandecido",
                "tipo": "Reação",
                "desc": "Quando uma criatura viva a até 9m do suíno sofre dano de corte ou perfuração, ele entra em frenesi até o fim da cena: +2 em testes de ataque, rolagens de dano e testes de resistência, mas não pode realizar ações que exijam calma e concentração e deve sempre atacar o inimigo mais próximo que possa atacar."
            },
            {
                "nome": "Ímpeto Ensandecido",
                "tipo": "Qualidade",
                "desc": "Pode continuar agindo normalmente por mais 1 rodada quando seus PV são reduzidos a 0 ou menos."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Andrajos de aldeão, machado de lenha"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "fortificação 25%, imunidade a efeitos mentais",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+7"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+6"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Bovino Ensandecido",
        "tipo": "Monstro Grande",
        "nd": "3",
        "iniciativa": "+3",
        "percepcao": "+4",
        "defesa": "18",
        "fort": "+14",
        "ref": "+4",
        "von": "+9",
        "pv": "28",
        "desl": "9m (6q)",
        "atributos": {
            "for": "4",
            "des": "0",
            "con": "3",
            "int": "-1",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Gadanho aumentado",
                "tipo": "Corpo a Corpo",
                "bonus": "+15",
                "dano": "2d6+6",
                "desc": "x4."
            },
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+15",
                "dano": "1d8+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Frenesi Ensandecido",
                "tipo": "Reação",
                "desc": "Quando uma criatura viva a até 9m do bovino sofre dano de corte ou perfuração, ele entra em frenesi até o fim da cena: +2 em testes de ataque, rolagens de dano e testes de resistência, mas não pode realizar ações que exijam calma e concentração e deve sempre atacar o inimigo mais próximo que possa atacar."
            },
            {
                "nome": "Mugido Perturbador",
                "tipo": "Movimento",
                "desc": "Inimigos em alcance médio capazes de ouvi-lo perdem 1d4 PM (Von CD 17 evita). Só pode usar esta habilidade uma vez por cena."
            },
            {
                "nome": "Medo de Altura",
                "tipo": "Qualidade",
                "desc": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), fica abalado."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Gadanho aumentado"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "fortificação 25%, incorpóreo, redução de dano 10/luz, vulnerabilidade a fogo",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+5 (+15 em florestas)"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+16"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Entessombra Broto",
        "tipo": "Morto-vivo Grande",
        "nd": "9",
        "iniciativa": "+7",
        "percepcao": "+11",
        "defesa": "35",
        "fort": "+21",
        "ref": "+9",
        "von": "+15",
        "pv": "350",
        "desl": "9m (6q), sem redução por terreno difícil",
        "atributos": {
            "for": "6",
            "des": "-1",
            "con": "3",
            "int": "0",
            "sab": "2",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Duas pancadas gélidas",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "4d6+6",
                "desc": "Frio, mais 4d6+6 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Drenar Vitalidade",
                "tipo": "Qualidade",
                "desc": "Uma criatura viva atingida por uma pancada gélida faz um teste de Fortitude (CD 28). Se falhar, fica fraca e o entessombra recebe 20 PV temporários cumulativos."
            },
            {
                "nome": "Pastor dos Mortos",
                "tipo": "Completa",
                "desc": "Invoca mãos espectrais que se projetam do chão em raio de 30m. Quando usa esta habilidade, e no início de cada turno dele, todas as criaturas na área em contato com o solo sofrem 2d8 de corte e 2d8 de trevas e ficam enredadas por 1 rodada (Ref CD 28 reduz à metade e evita a condição). As mãos permanecem até o fim da cena ou até ele usar a habilidade novamente. Recarga (movimento)."
            },
            {
                "nome": "Travessia Sombria",
                "tipo": "Completa",
                "desc": "Percorre até o dobro do deslocamento, podendo passar pelo espaço de inimigos menores, mas sem repetir espaço. Criaturas atravessadas sofrem 4d6+3 de frio e 4d6+3 de trevas e ficam abaladas (Ref CD 28 reduz à metade e evita a condição). Recarga (movimento)."
            },
            {
                "nome": "Fraqueza Solar",
                "tipo": "Qualidade",
                "desc": "Exposto à luz solar natural, fica debilitado."
            }
        ],
        "tesouro": "Padrão mais 1 dose de terra de cemitério (CD 24 para extrair)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "fortificação 25%, incorpóreo, redução de dano 20/luz, vulnerabilidade a fogo",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+5 (+15 em florestas)"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+19"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Entessombra",
        "tipo": "Morto-vivo Enorme",
        "nd": "14",
        "iniciativa": "+10",
        "percepcao": "+14",
        "defesa": "46",
        "fort": "+28",
        "ref": "+12",
        "von": "+24",
        "pv": "690",
        "desl": "9m (6q), sem redução por terreno difícil",
        "atributos": {
            "for": "9",
            "des": "-1",
            "con": "5",
            "int": "0",
            "sab": "3",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Duas pancadas gélidas",
                "tipo": "Corpo a Corpo",
                "bonus": "+39",
                "dano": "4d8+20",
                "desc": "Frio, mais 4d8+20 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Drenar Vitalidade",
                "tipo": "Qualidade",
                "desc": "Uma criatura viva atingida por uma pancada gélida faz um teste de Fortitude (CD 38). Se falhar, fica fraca e o entessombra recebe 30 PV temporários cumulativos."
            },
            {
                "nome": "Pastor dos Mortos",
                "tipo": "Completa",
                "desc": "Invoca mãos espectrais que se projetam do chão em raio de 30m. Quando usa esta habilidade, e no início de cada turno dele, todas as criaturas na área em contato com o solo sofrem 4d8 de corte e 4d8 de trevas e ficam enredadas por 1 rodada (Ref CD 38 reduz à metade e evita a condição). As mãos permanecem até o fim da cena ou até ele usar a habilidade novamente. Recarga (movimento)."
            },
            {
                "nome": "Travessia Sombria",
                "tipo": "Completa",
                "desc": "Percorre até o dobro do deslocamento, podendo passar pelo espaço de inimigos menores, mas sem repetir espaço. Criaturas atravessadas sofrem 4d8+10 de frio e 4d8+10 de trevas e ficam abaladas (Ref CD 38 reduz à metade e evita a condição). Recarga (movimento)."
            },
            {
                "nome": "Fraqueza Solar",
                "tipo": "Qualidade",
                "desc": "Exposto à luz solar natural, fica debilitado."
            }
        ],
        "tesouro": "Padrão mais 1 dose de terra de cemitério (CD 29 para extrair)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "vulnerabilidade a veneno",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Enxame Taturana",
        "tipo": "Monstro Enorme",
        "nd": "4",
        "iniciativa": "+5",
        "percepcao": "+5",
        "defesa": "23",
        "fort": "+10",
        "ref": "+16",
        "von": "+4",
        "pv": "140",
        "desl": "6m (4q), voo 9m (6q)",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "2",
            "int": "-5",
            "sab": "1",
            "car": "-4"
        },
        "ataques": [
            {
                "nome": "Enxame",
                "tipo": "Corpo a Corpo",
                "bonus": "automático",
                "dano": "4d6 perfuração",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Convergência de Besouros",
                "tipo": "Reação",
                "desc": "Quando sofre dano, atrai outros besouros das cercanias. Pelas próximas 2d4 rodadas, o enxame recebe +10 PV no início de cada um dos seus turnos. Só pode usar esta habilidade uma vez por cena."
            },
            {
                "nome": "Entrar nas Roupas",
                "tipo": "Qualidade",
                "desc": "Quando uma criatura sai do espaço do enxame, alguns besouros ficam alojados em suas vestes. Ela continua sofrendo metade do dano de Enxame até gastar uma ação de movimento por item vestido para se livrar dos besouros."
            },
            {
                "nome": "Força dos Números",
                "tipo": "Qualidade",
                "desc": "Recebe +1 em rolagens de dano para cada 10 PV totais que possui."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de corte, frio e perfuração 5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+12"
            },
            {
                "nome": "Furtividade",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Amálgama Esqueleto",
        "tipo": "Morto-vivo Grande",
        "nd": "7",
        "iniciativa": "+7",
        "percepcao": "+8",
        "defesa": "31",
        "fort": "+20",
        "ref": "+14",
        "von": "+7",
        "pv": "290",
        "desl": "9m (6q), escalar 6m (4q)",
        "atributos": {
            "for": "5",
            "des": "0",
            "con": "4",
            "int": "-4",
            "sab": "1",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Machado de batalha",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d8+15",
                "desc": "x3."
            },
            {
                "nome": "Espada longa",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "1d10+15",
                "desc": "19."
            },
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "1d8+15",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Absorção Óssea",
                "tipo": "Livre",
                "desc": "No início de cada turno dele, causa 2d6+15 de perfuração na criatura que estiver agarrando com Agarramento Esquelético. Se matar uma criatura assim, arranca os ossos do corpo dela e os incorpora ao seu, recuperando 50 PV."
            },
            {
                "nome": "Agarramento Esquelético",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, quando uma criatura Grande ou menor erra um ataque corpo a corpo contra ele, pode fazer a manobra agarrar (teste +26) contra o atacante usando os ossos do tronco. Pode manter uma criatura agarrada dessa forma por vez."
            },
            {
                "nome": "Arremessar Ossos Sobressalentes",
                "tipo": "Padrão",
                "desc": "Arremessa ossos em um cone de 6m. Criaturas na área sofrem 4d8+15 de perfuração (Ref CD 24 reduz à metade). Recarga (movimento)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de corte, frio e perfuração 5",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+4 (+9 dentro d'água)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Crocodilo Esqueleto",
        "tipo": "Morto-vivo Grande",
        "nd": "2",
        "iniciativa": "+4",
        "percepcao": "+4",
        "defesa": "18",
        "fort": "+13",
        "ref": "+7",
        "von": "+2",
        "pv": "63",
        "desl": "6m (4q), natação 9m (6q)",
        "atributos": {
            "for": "5",
            "des": "1",
            "con": "3",
            "int": "—",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "1d10+6",
                "desc": ""
            },
            {
                "nome": "Cauda",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "1d8+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +14)."
            },
            {
                "nome": "Bocarra Desimpedida",
                "tipo": "Qualidade",
                "desc": "Se vencer um teste oposto para agarrar uma criatura Grande ou menor por 5 ou mais, \"engole\" uma parte da criatura (braço, perna ou asa) e a captura com as costelas. Contra uma criatura agarrada assim, recebe +5 em testes de manobra para agarrar e causa +1d10 de dano com essa manobra."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de corte, frio e perfuração 5",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Serpe Esqueleto",
        "tipo": "Morto-vivo Grande",
        "nd": "5",
        "iniciativa": "+5",
        "percepcao": "+7",
        "defesa": "24",
        "fort": "+10",
        "ref": "+16",
        "von": "+5",
        "pv": "210",
        "desl": "9m (6q)",
        "atributos": {
            "for": "6",
            "des": "1",
            "con": "6",
            "int": "—",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "2d6+12",
                "desc": ""
            },
            {
                "nome": "Ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "1d8+12",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +19)."
            },
            {
                "nome": "Inocular Sombras",
                "tipo": "Qualidade",
                "desc": "Uma criatura viva atingida pelo ferrão faz um teste de Vontade (CD 20). Se falhar, sofre 2d8 de dano de trevas. Veneno."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "cura acelerada 20/ácido ou fogo, resistência a veneno +5, imunidade a metamorfose",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+11"
            },
            {
                "nome": "Intimidação",
                "valor": "+11"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+13"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Euríade",
        "tipo": "Monstro Grande",
        "nd": "11",
        "iniciativa": "+13",
        "percepcao": "+11",
        "defesa": "41",
        "fort": "+24",
        "ref": "+11",
        "von": "+18",
        "pv": "540",
        "desl": "9m (6q), escalada 6m (4q)",
        "atributos": {
            "for": "3",
            "des": "4",
            "con": "2",
            "int": "0",
            "sab": "2",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "2d12+25",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Dilacerar",
                "tipo": "Qualidade",
                "desc": "Se acerta os dois ataques de garra em uma mesma criatura na mesma rodada, causa mais 4d12+25 de dano."
            },
            {
                "nome": "Jato de Veneno",
                "tipo": "Movimento",
                "desc": "Uma vez por rodada, as serpentes na cabeça cospem veneno em um cone de 6m. Criaturas na área perdem 4d12 PV (Fort CD 31 reduz a perda à metade). Veneno."
            },
            {
                "nome": "Olhar Petrificante",
                "tipo": "Qualidade",
                "desc": "No início do turno dela, cada personagem em alcance curto faz um teste de Reflexos (CD 31). Se passar, desvia o olhar; se falhar, fica lento; se já estiver lento, fica petrificado permanentemente. Pode fechar os olhos como reação para ficar imune, mas fica cego por 1 rodada. Efeitos que removem paralisia revertem a petrificação. Metamorfose."
            }
        ],
        "tesouro": "Padrão. O covil tem 25% de chance de conter 1 ovo de euríade (T$ 5.000)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "cura acelerada 20/ácido ou fogo, resistência a veneno +5, imunidade a metamorfose",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+13"
            },
            {
                "nome": "Intimidação",
                "valor": "+14"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+16"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Matriarca Euríade",
        "tipo": "Monstro Grande",
        "nd": "14",
        "iniciativa": "+15",
        "percepcao": "+12",
        "defesa": "46",
        "fort": "+28",
        "ref": "+14",
        "von": "+22",
        "pv": "680",
        "desl": "9m (6q), escalada 6m (4q)",
        "atributos": {
            "for": "4",
            "des": "4",
            "con": "2",
            "int": "0",
            "sab": "3",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+39",
                "dano": "3d12+30",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Dilacerar",
                "tipo": "Qualidade",
                "desc": "Se acerta os dois ataques de garra em uma mesma criatura na mesma rodada, causa mais 6d12+30 de dano."
            },
            {
                "nome": "Jato de Veneno",
                "tipo": "Movimento",
                "desc": "Uma vez por rodada, as serpentes na cabeça cospem veneno em um cone de 9m. Criaturas na área perdem 6d12 PV (Fort CD 38 reduz a perda à metade). Veneno."
            },
            {
                "nome": "Olhar Litopugnaz",
                "tipo": "Qualidade",
                "desc": "No início do turno dela, cada personagem em alcance curto faz um teste de Reflexos (CD 38). Se passar, desvia o olhar; se falhar, fica lento; se já estiver lento, se transforma permanentemente em um defensor rochoso sob controle da euríade. Pode fechar os olhos como reação para ficar imune, mas fica cego por 1 rodada. Efeitos mágicos que removem paralisia revertem a transformação. Metamorfose."
            }
        ],
        "tesouro": "Padrão. O covil tem 25% de chance de conter 1 ovo de euríade (T$ 5.000)"
    },
    {
        "pm": "41",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de ácido 5, resistência a efeitos lefeu e da Tormenta +5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+8"
            },
            {
                "nome": "Conhecimento",
                "valor": "+5"
            },
            {
                "nome": "Intimidação",
                "valor": "+12"
            },
            {
                "nome": "Misticismo",
                "valor": "+7"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Iniciado Rubro",
        "tipo": "Monstro (lefou) Médio",
        "nd": "5",
        "iniciativa": "+6",
        "percepcao": "+4",
        "defesa": "22",
        "fort": "+17",
        "ref": "+5",
        "von": "+11",
        "pv": "110",
        "desl": "9m (6q)",
        "atributos": {
            "for": "2",
            "des": "0",
            "con": "2",
            "int": "1",
            "sab": "-2",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+15",
                "dano": "2d6+3",
                "desc": "Mais 4d4 de ácido."
            }
        ],
        "habilidades": [
            {
                "nome": "Reação Corrosiva",
                "tipo": "Livre",
                "desc": "Se o iniciado acerta os dois ataques de garra em uma mesma criatura na mesma rodada, injeta ácido no sangue dela. No início de cada turno da criatura, ela faz um teste de Fortitude (CD 22). Se falhar, sofre 4d4 de ácido. Se passar, evita o dano nessa rodada e, se passar duas vezes em sequência, elimina o ácido. Se a criatura for reduzida a 0 PV por esse dano, seu corpo explode, matando-a e causando 4d4 de ácido em todas as criaturas a até 3m (Ref CD 22 reduz à metade). Não afeta criaturas sem sangue, como construtos ou mortos-vivos."
            },
            {
                "nome": "Sangue Ácido",
                "tipo": "Qualidade",
                "desc": "Quando sofre dano por um ataque corpo a corpo, o atacante sofre 3 pontos de dano de ácido."
            },
            {
                "nome": "Tempo Místico",
                "tipo": "Livre",
                "desc": "Custos: 2 PM. Uma vez por rodada, ao lançar uma magia com execução de movimento, padrão ou completa, o iniciado pode perder 1d6, 1d8 ou 1d12 PV para diminuir o tempo de execução da magia em um, dois ou três passos, respectivamente (até um mínimo de ação livre). Essa perda de vida só pode ser curada com descanso."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um feiticeiro de linhagem rubra de 5º nível (CD 22)."
            },
            {
                "nome": "Magia: Amedrontar",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Uma criatura em alcance curto fica apavorada por 1 rodada e depois abalada (Von reduz para abalada por 1d4 rodadas)."
            },
            {
                "nome": "Magia: Armadura Arcana",
                "tipo": "Reação",
                "desc": "Custos: 2 PM. +5 na Defesa contra o próximo ataque que sofrer."
            },
            {
                "nome": "Magia: Concentração de Combate",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Até o fim da cena, sempre que faz um ataque, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Magia: Flecha Ácida",
                "tipo": "Padrão",
                "desc": "Custos: 4 PM. Dispara um projétil em uma criatura ou objeto em alcance médio. O alvo sofre 4d6 de ácido e fica coberto por muco corrosivo que causa 2d6 de ácido no início de cada um dos seus dois próximos turnos. Se o alvo usar armadura ou escudo, o muco corrói o item, reduzindo seu bônus na Defesa em 1 ponto permanentemente (Ref reduz à metade e evita o muco)."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "119",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "fortificação 25%, imunidade a ácido, redução de dano 5, resistência a efeitos lefeu e da Tormenta +5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+14"
            },
            {
                "nome": "Conhecimento",
                "valor": "+11"
            },
            {
                "nome": "Intimidação",
                "valor": "+22"
            },
            {
                "nome": "Misticismo",
                "valor": "+13"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Mestre da Feitiçaria Rubra",
        "tipo": "Monstro (lefou) Médio",
        "nd": "13",
        "iniciativa": "+14",
        "percepcao": "+11",
        "defesa": "42",
        "fort": "+26",
        "ref": "+13",
        "von": "+20",
        "pv": "390",
        "desl": "12m (8q)",
        "atributos": {
            "for": "3",
            "des": "0",
            "con": "1",
            "int": "1",
            "sab": "-3",
            "car": "8"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "4d6+8",
                "desc": "Mais 4d12 de ácido."
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "4d8+8",
                "desc": "Mais 4d12 de ácido."
            }
        ],
        "habilidades": [
            {
                "nome": "Desprezar a Realidade",
                "tipo": "Livre",
                "desc": "Custos: 2 PM. Até o início do próximo turno, ignora terreno difícil e causa 40% de chance de falha em efeitos usados contra ele."
            },
            {
                "nome": "Linhagem Rubra",
                "tipo": "Qualidade",
                "desc": "O custo das magias Amedrontar, Armadura Arcana, Concentração de Combate, Enxame Rubro de Ichabod e Flecha Ácida diminui em -1 PM (já contabilizado)."
            },
            {
                "nome": "Reação Corrosiva",
                "tipo": "Livre",
                "desc": "Se o mestre acerta os dois ataques de garra em uma mesma criatura na mesma rodada, injeta ácido no sangue dela. No início de cada turno da criatura, ela faz um teste de Fortitude (CD 37). Se falhar, sofre 8d4 de ácido. Se passar, evita o dano nessa rodada e, se passar duas vezes em sequência, elimina o ácido. Se a criatura for reduzida a 0 PV por esse dano, seu corpo explode, matando-a e causando 8d4 de ácido em todas as criaturas a até 3m (Ref CD 37 reduz à metade). Não afeta criaturas sem sangue, como construtos ou mortos-vivos."
            },
            {
                "nome": "Sangue Ácido",
                "tipo": "Qualidade",
                "desc": "Quando sofre dano por um ataque corpo a corpo, o atacante sofre 5 pontos de dano de ácido."
            },
            {
                "nome": "Tempo Místico",
                "tipo": "Livre",
                "desc": "Custos: 2 PM. Uma vez por rodada, ao lançar uma magia com execução de movimento, padrão ou completa, o mestre pode perder 1d6, 1d8 ou 1d12 PV para diminuir o tempo de execução da magia em um, dois ou três passos, respectivamente (até um mínimo de ação livre). Essa perda de vida só pode ser curada com descanso."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um feiticeiro de linhagem rubra de 13º nível (CD 37)."
            },
            {
                "nome": "Magia: Amedrontar",
                "tipo": "Padrão",
                "desc": "Custos: 5 PM. Animais e humanoides em alcance curto à escolha dele ficam apavorados por 1 rodada e depois abalados (Von reduz para abalado por 1d4 rodadas)."
            },
            {
                "nome": "Magia: Armadura Arcana",
                "tipo": "Reação",
                "desc": "Custos: 1 PM. +5 na Defesa contra o próximo ataque que sofrer."
            },
            {
                "nome": "Magia: Concentração de Combate",
                "tipo": "Padrão",
                "desc": "Custos: 7 PM. Até o fim da cena, quando faz um ataque, rola dois dados e usa o melhor; quando um oponente o ataca, rola dois dados e usa o pior."
            },
            {
                "nome": "Magia: Enxame Rubro de Ichabod",
                "tipo": "Padrão",
                "desc": "Custos: 13 PM, sustentada. Um enxame de parasitas da Tormenta surge em alcance médio e ocupa uma área de 3m. No fim de cada turno dele, o enxame causa 6d12 de ácido a qualquer criatura em seu espaço (Ref reduz à metade). No início de cada turno, rola 1d6: em 5 ou 6, um novo enxame surge adjacente a um existente. Pode gastar uma ação de movimento para mover todos os enxames 12m, sem ocuparem o mesmo espaço."
            },
            {
                "nome": "Magia: Flecha Ácida",
                "tipo": "Padrão",
                "desc": "Custos: 13 PM. Dispara um projétil em uma criatura ou objeto em alcance médio. O alvo sofre 9d6 de ácido e fica coberto por muco corrosivo que causa 7d6 de ácido no início de cada um dos seus dois próximos turnos. Se o alvo usar armadura ou escudo, o muco corrói o item, reduzindo seu bônus na Defesa em 1 ponto permanentemente (Ref reduz à metade e evita o muco)."
            },
            {
                "nome": "Magia: Libertação",
                "tipo": "Padrão",
                "desc": "Custos: 10 PM. Até o fim da cena, fica imune a efeitos de movimento e ignora qualquer efeito que impeça ou restrinja seu deslocamento."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "evasão, redução de dano 10/trevas, imunidade a doenças, fogo e medo",
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+11"
            },
            {
                "nome": "Diplomacia",
                "valor": "+14"
            },
            {
                "nome": "Intuição",
                "valor": "+12"
            },
            {
                "nome": "Misticismo",
                "valor": "+11"
            },
            {
                "nome": "Religião",
                "valor": "+12"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Fênix",
        "tipo": "Espírito Pequeno",
        "nd": "10",
        "iniciativa": "+12",
        "percepcao": "+12",
        "defesa": "35",
        "fort": "+14",
        "ref": "+18",
        "von": "+16",
        "pv": "390",
        "desl": "6m (4q), voo 18m (12q)",
        "atributos": {
            "for": "0",
            "des": "3",
            "con": "3",
            "int": "2",
            "sab": "3",
            "car": "5"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+28",
                "dano": "2d10+15",
                "desc": "Mais 2d6 de fogo."
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+28",
                "dano": "2d8+15",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Armas Abençoadas",
                "tipo": "Qualidade",
                "desc": "As armas naturais são consideradas mágicas e sagradas e causam +2d8 de dano contra devotos de deuses que canalizam apenas energia negativa e criaturas malignas (a critério do mestre)."
            },
            {
                "nome": "Ressurreição",
                "tipo": "Qualidade",
                "desc": "Após a explosão do sacrifício, de seus restos mortais surgem 1d4+1 filhotes de fênix, que possuem todas as lembranças da mãe."
            },
            {
                "nome": "Sacrifício",
                "tipo": "Reação",
                "desc": "Quando é reduzida a 0 PV, explode em uma bola de fogo de 6m de raio. Criaturas na área sofrem 14d6+14 de fogo (Ref CD 30 reduz à metade)."
            },
            {
                "nome": "Telepatia Inata",
                "tipo": "Qualidade",
                "desc": "Comunica-se telepaticamente com qualquer criatura a até 9m."
            },
            {
                "nome": "Visão Flamejante",
                "tipo": "Qualidade",
                "desc": "Está permanentemente sob efeito da magia Visão Mística, com o aprimoramento que permite enxergar criaturas e objetos invisíveis."
            }
        ],
        "tesouro": "Uma porção de cinzas de fênix (CD 25 para extrair, vale 1 PM para fabricar um item mágico relacionado a fogo) e 1d3 penas de fênix (CD 25 para extrair; só por um personagem adjacente à fênix quando ela morrer e que abra mão do teste de resistência contra o sacrifício dela)",
        "observacao": "Pena de fênix: item raríssimo (até T$ 5.000). Empunhando uma, o personagem gasta uma ação completa e a consome para ressuscitar uma criatura que esteja tocando, como pelo poder Dom da Ressurreição (Tormenta20, p. 133). Vendê-la é sacrilégio para devotos de Thyatis."
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "redução de dano 15/mitral",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+16"
            },
            {
                "nome": "Furtividade",
                "valor": "+12"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Fera-da-Desgraça",
        "tipo": "Monstro Enorme",
        "nd": "12",
        "iniciativa": "+12",
        "percepcao": "+12",
        "defesa": "41",
        "fort": "+26",
        "ref": "+12",
        "von": "+20",
        "pv": "420",
        "desl": "12m (8q)",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "6",
            "int": "-4",
            "sab": "2",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+37",
                "dano": "3d10+24",
                "desc": "Mais 2d8 de trevas."
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+37",
                "dano": "3d8+24",
                "desc": "19, mais 2d8 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +42)."
            },
            {
                "nome": "Bocas Imitadoras",
                "tipo": "Qualidade",
                "desc": "Pode imitar qualquer som que tenha ouvido, incluindo vozes. Uma criatura que ouça um som produzido pela fera faz um teste de Intuição (CD 35); se passar, percebe que é uma imitação."
            },
            {
                "nome": "Farejar Magia",
                "tipo": "Qualidade",
                "desc": "Fareja automaticamente a presença de magia em alcance médio, como se tivesse passado em um teste para detectar magia (Tormenta20, p. 121)."
            },
            {
                "nome": "Mordida Dissipante",
                "tipo": "Livre",
                "desc": "Quando acerta um ataque de mordida, causa um efeito semelhante à magia Dissipar Magia sobre o alvo, usando Vontade no lugar de Misticismo. Para cada efeito dissipado, recebe 10 PV temporários cumulativos."
            },
            {
                "nome": "Rogar Maldição",
                "tipo": "Livre",
                "desc": "Roga uma das maldições a seguir sobre uma criatura em alcance curto (Fort CD 35 evita; uma criatura que tenha falhado em Intuição contra as Bocas Imitadoras na cena sofre -5 nesse teste). Pode usar mais de uma vez por rodada, mas só uma vez contra a mesma criatura em cada rodada."
            },
            {
                "nome": "Maldição: Debilidade",
                "tipo": "Livre",
                "desc": "A criatura fica esmorecida e não pode se comunicar ou lançar magias. Ainda reconhece aliados e pode segui-los e ajudá-los, mas de maneira simplória."
            },
            {
                "nome": "Maldição: Doença",
                "tipo": "Livre",
                "desc": "A criatura contrai uma doença à escolha da fera, que a afeta imediatamente (sem período de incubação)."
            },
            {
                "nome": "Maldição: Fraqueza",
                "tipo": "Livre",
                "desc": "A criatura fica debilitada e lenta."
            },
            {
                "nome": "Maldição: Isolamento",
                "tipo": "Livre",
                "desc": "A criatura perde um de seus cinco sentidos à escolha da fera. Sem visão, fica cega; sem audição, surda; sem olfato ou paladar, não pode usar a habilidade faro; sem tato, fica caída e não pode se levantar."
            }
        ],
        "tesouro": "Padrão mais 1d6 línguas amaldiçoadas (CD 27 para extrair)",
        "observacao": "Língua amaldiçoada: só obtida do cadáver da fera. Catalisador (T$ 150, 0,5 espaço): +2 na CD de magias de necromancia e, se usada em Rogar Maldição, diminui seu custo em -2 PM."
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+4"
            },
            {
                "nome": "Furtividade",
                "valor": "+12 (+14 em deserto)"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Ferani Lanceiro",
        "tipo": "Monstro (trog) Médio",
        "nd": "3",
        "iniciativa": "+6",
        "percepcao": "+5",
        "defesa": "20",
        "fort": "+9",
        "ref": "+14",
        "von": "+4",
        "pv": "21",
        "desl": "9m (6q)",
        "atributos": {
            "for": "1",
            "des": "3",
            "con": "3",
            "int": "-1",
            "sab": "2",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Lança",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "2d6+7",
                "desc": ""
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "1d6+7",
                "desc": ""
            },
            {
                "nome": "Arco curto x2",
                "tipo": "À Distância",
                "bonus": "+16",
                "dano": "1d6+5",
                "desc": "x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Emboscar",
                "tipo": "Qualidade",
                "desc": "Na primeira rodada de combate, pode realizar uma ação padrão adicional."
            },
            {
                "nome": "Mau Cheiro",
                "tipo": "Padrão",
                "desc": "Todas as criaturas (exceto trogs) em alcance curto ficam enjoadas por 1d6 rodadas (Fort CD 17 evita). Uma criatura que passe no teste fica imune a esta habilidade por um dia. Veneno."
            },
            {
                "nome": "Sangue Frio",
                "tipo": "Qualidade",
                "desc": "Sofre 1 ponto de dano adicional por dado de dano de frio."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Arco curto, escudo leve, flechas x20, lança, manto camuflado (deserto)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "evasão, imunidade a medo",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+7"
            },
            {
                "nome": "Furtividade",
                "valor": "+16 (+18 em deserto)"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+9"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Ferani Miragem",
        "tipo": "Monstro (trog) Médio",
        "nd": "6",
        "iniciativa": "+10",
        "percepcao": "+7",
        "defesa": "27",
        "fort": "+12",
        "ref": "+18",
        "von": "+6",
        "pv": "200",
        "desl": "12m (8q)",
        "atributos": {
            "for": "2",
            "des": "5",
            "con": "3",
            "int": "-1",
            "sab": "2",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Lança",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "2d8+14",
                "desc": "19, mais veneno."
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "2d6+14",
                "desc": "Mais veneno."
            },
            {
                "nome": "Arco curto x2",
                "tipo": "À Distância",
                "bonus": "+20",
                "dano": "2d6+12",
                "desc": "x3, mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Emboscar",
                "tipo": "Qualidade",
                "desc": "Na primeira rodada de combate, pode realizar uma ação padrão adicional."
            },
            {
                "nome": "Escaramuça Desértica",
                "tipo": "Qualidade",
                "desc": "Quando se move 6m ou mais, até o início do próximo turno recebe camuflagem leve, +2 na Defesa e em Reflexos e +1d8 nas rolagens de dano em ataques contra alvos em alcance curto."
            },
            {
                "nome": "Mau Cheiro",
                "tipo": "Padrão",
                "desc": "Todas as criaturas (exceto trogs) em alcance curto ficam enjoadas por 1d6 rodadas (Fort CD 22 evita). Uma criatura que passe no teste fica imune a esta habilidade por um dia. Veneno."
            },
            {
                "nome": "Passo do Deserto",
                "tipo": "Livre",
                "desc": "Se estiver sobre areia, terra ou outro terreno que não seja rocha sólida (ou equivalente), teleporta-se para um espaço desocupado em alcance curto sobre o mesmo tipo de terreno. Recarga (movimento)."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha comum (perde 1d12 PV, Fort CD 22 evita)."
            },
            {
                "nome": "Sangue Frio",
                "tipo": "Qualidade",
                "desc": "Sofre 1 ponto de dano adicional por dado de dano de frio."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Arco curto, escudo leve, flechas x20, lança precisa, manto camuflado (deserto)"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "imunidade a medo, redução de dano 10/mágico, resistência a magia +2",
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+11 (+21 com leões)"
            },
            {
                "nome": "Atletismo",
                "valor": "+18"
            },
            {
                "nome": "Furtividade",
                "valor": "+10"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Leoa-Rainha",
        "tipo": "Animal Enorme",
        "nd": "7",
        "iniciativa": "+13",
        "percepcao": "+14",
        "defesa": "31",
        "fort": "+15",
        "ref": "+17",
        "von": "+9",
        "pv": "265",
        "desl": "15m (10q)",
        "atributos": {
            "for": "9",
            "des": "4",
            "con": "7",
            "int": "0",
            "sab": "3",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "3d10+7",
                "desc": "19."
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "3d8+7",
                "desc": "19."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +29)."
            },
            {
                "nome": "Bote",
                "tipo": "Completa",
                "desc": "Faz uma investida e ataca com a mordida e as duas garras. Os três ataques recebem +2 da investida, mas devem ser feitos contra a mesma criatura."
            },
            {
                "nome": "Empatia Selvagem",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com leões."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "imunidade a medo, redução de dano 10/mágico, resistência a magia +2",
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+12 (+22 com tigres)"
            },
            {
                "nome": "Atletismo",
                "valor": "+19"
            },
            {
                "nome": "Furtividade",
                "valor": "+12 (+17 em florestas)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Tigre-Rei",
        "tipo": "Animal Enorme",
        "nd": "9",
        "iniciativa": "+18",
        "percepcao": "+14",
        "defesa": "33",
        "fort": "+15",
        "ref": "+21",
        "von": "+9",
        "pv": "310",
        "desl": "15m (10q)",
        "atributos": {
            "for": "9",
            "des": "5",
            "con": "7",
            "int": "0",
            "sab": "3",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "3d10+9",
                "desc": ""
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "3d8+9",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Bote",
                "tipo": "Completa",
                "desc": "Faz uma investida e ataca com a mordida e as duas garras. Os três ataques recebem +2 da investida, mas devem ser feitos contra a mesma criatura."
            },
            {
                "nome": "Empatia Selvagem",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com tigres."
            },
            {
                "nome": "Ímpeto Destrutivo",
                "tipo": "Qualidade",
                "desc": "Recebe +2 em testes de ataque e rolagens de dano no primeiro turno de combate."
            },
            {
                "nome": "Rugido Paralisante",
                "tipo": "Movimento",
                "desc": "Criaturas em alcance curto ficam imóveis por 1 rodada (Fort CD 26 evita). Uma criatura só pode ser alvo desta habilidade uma vez por cena."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "evasão, imunidade a medo, redução de dano 10/mágico, resistência a magia +2",
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+10 (+20 com grifos)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Grifo-Rei",
        "tipo": "Animal Enorme",
        "nd": "12",
        "iniciativa": "+17",
        "percepcao": "+15",
        "defesa": "43",
        "fort": "+20",
        "ref": "+26",
        "von": "+12",
        "pv": "600",
        "desl": "12m (8q), voo 24m (16q)",
        "atributos": {
            "for": "9",
            "des": "5",
            "con": "7",
            "int": "0",
            "sab": "3",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "4d12+20",
                "desc": ""
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "4d8+20",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Bote",
                "tipo": "Completa",
                "desc": "Faz uma investida e ataca com a mordida e as duas garras. Os três ataques recebem +2 da investida, mas devem ser feitos contra a mesma criatura."
            },
            {
                "nome": "Empatia Selvagem",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com grifos."
            },
            {
                "nome": "Aura de Majestade",
                "tipo": "Qualidade",
                "desc": "Sempre que uma criatura tentar executar uma ação hostil contra o grifo-rei pela primeira vez em uma cena, faz um teste de Vontade (CD 35). Se falhar, sofre -3 em testes de perícia e rolagens de dano contra ele até o fim da cena. Medo."
            }
        ],
        "tesouro": ""
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "imunidade a medo, redução de dano 5, redução de dano 10/mágico, resistência a magia +2",
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+17 (+27 com elefantes)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Elefante-Rei",
        "tipo": "Animal Colossal",
        "nd": "15",
        "iniciativa": "+13",
        "percepcao": "+18",
        "defesa": "50",
        "fort": "+30",
        "ref": "+13",
        "von": "+22",
        "pv": "730",
        "desl": "12m (8q)",
        "atributos": {
            "for": "10",
            "des": "0",
            "con": "8",
            "int": "0",
            "sab": "3",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Presas",
                "tipo": "Corpo a Corpo",
                "bonus": "+43",
                "dano": "6d12+66",
                "desc": "x3."
            },
            {
                "nome": "Tromba",
                "tipo": "Corpo a Corpo",
                "bonus": "+43",
                "dano": "6d10+50",
                "desc": "Impacto."
            }
        ],
        "habilidades": [
            {
                "nome": "Arremessar",
                "tipo": "Movimento",
                "desc": "Se começar o turno agarrando uma criatura Grande ou menor, arremessa a vítima 1d6 x 1,5m em uma direção à sua escolha. A vítima sofre 6d8 de impacto, fica caída e, se atingir um obstáculo, sofre +2d8 (Ref CD 40 reduz à metade e evita a condição)."
            },
            {
                "nome": "Atropelamento",
                "tipo": "Completa",
                "desc": "Percorre até o dobro do deslocamento, podendo passar pelo espaço de inimigos menores, mas sem repetir espaço. Criaturas atropeladas sofrem 6d10+50 de impacto e ficam caídas (Ref CD 40 reduz à metade e evita a condição). Recarga (movimento)."
            },
            {
                "nome": "Empatia Selvagem",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com elefantes."
            },
            {
                "nome": "Pisotear",
                "tipo": "Padrão",
                "desc": "Uma criatura que esteja agarrando, ou caída adjacente a ele, sofre 12d10+100 de impacto e fica fraca por 1 rodada (Fort CD 40 reduz à metade e evita a condição)."
            },
            {
                "nome": "Prender",
                "tipo": "Livre",
                "desc": "Se acerta um ataque de tromba, pode fazer a manobra agarrar ou derrubar (teste +53)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+1 (+11 dentro d'água)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Fobossuco",
        "tipo": "Animal Enorme",
        "nd": "6",
        "iniciativa": "+6",
        "percepcao": "+6",
        "defesa": "25",
        "fort": "+18",
        "ref": "+12",
        "von": "+6",
        "pv": "220",
        "desl": "6m (4q), natação 9m (6q)",
        "atributos": {
            "for": "7",
            "des": "1",
            "con": "4",
            "int": "-5",
            "sab": "1",
            "car": "-4"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+21",
                "dano": "2d10+18",
                "desc": ""
            },
            {
                "nome": "Cauda",
                "tipo": "Corpo a Corpo",
                "bonus": "+21",
                "dano": "2d8+18",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +26)."
            },
            {
                "nome": "Cauda Esperta",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, quando uma criatura se move para flanqueá-lo, faz um ataque de cauda contra ela. Se acertar, a criatura interrompe seu deslocamento, é empurrada 1,5m para longe e perde a ação que usou para se deslocar."
            },
            {
                "nome": "Giro da Morte",
                "tipo": "Qualidade",
                "desc": "Se estiver agarrando uma criatura dentro d'água e usar novamente a manobra agarrar para causar dano, causa +4d10 de dano."
            }
        ],
        "tesouro": "Couro de fobossuco (CD 21 para extrair, vale T$ 100 para fabricar armaduras superiores)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "fortificação 25%, imunidade a sangramento, natureza vegetal, vulnerabilidade a fogo",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+7 (+12 em áreas de vegetação, como jardins)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Gárgula de Topiária Média",
        "tipo": "Construto Média",
        "nd": "4",
        "iniciativa": "+7",
        "percepcao": "+5",
        "defesa": "22",
        "fort": "+10",
        "ref": "+15",
        "von": "+5",
        "pv": "30",
        "desl": "9m (6q), escalar 9m (6q)",
        "atributos": {
            "for": "6",
            "des": "3",
            "con": "3",
            "int": "—",
            "sab": "1",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Pancada",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "4d6+18",
                "desc": ""
            },
            {
                "nome": "Espinhos",
                "tipo": "À Distância",
                "bonus": "+17",
                "dano": "2d6+9 perfuração",
                "desc": "Alcance curto."
            }
        ],
        "habilidades": [
            {
                "nome": "Amontoado Vegetal",
                "tipo": "Reação",
                "desc": "Quando sofre um ataque corpo a corpo, o atacante faz um teste de Luta ou Reflexos (CD 18). Se falhar, o ataque não causa dano e parte do corpo da gárgula se enrosca na arma: se o atacante usou uma arma empunhada, ela é desarmada e tragada; se usou um ataque desarmado ou arma natural, o atacante é agarrado (só uma criatura agarrada assim por vez). Uma arma tragada é recuperada vencendo uma manobra desarmar contra a gárgula."
            },
            {
                "nome": "Imobilidade",
                "tipo": "Qualidade",
                "desc": "Pode permanecer completamente imóvel. Assim, um personagem deve passar em um teste de Percepção (CD 35) para perceber que é uma criatura e não uma escultura vegetal."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "fortificação 25%, imunidade a sangramento, natureza vegetal, vulnerabilidade a fogo",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+7 (+12 em áreas de vegetação, como jardins)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Gárgula de Topiária Grande",
        "tipo": "Construto Grande",
        "nd": "6",
        "iniciativa": "+7",
        "percepcao": "+6",
        "defesa": "26",
        "fort": "+12",
        "ref": "+17",
        "von": "+7",
        "pv": "50",
        "desl": "9m (6q), escalar 9m (6q)",
        "atributos": {
            "for": "7",
            "des": "2",
            "con": "3",
            "int": "—",
            "sab": "1",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Duas pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "4d6+18",
                "desc": ""
            },
            {
                "nome": "Espinhos x2",
                "tipo": "À Distância",
                "bonus": "+24",
                "dano": "2d6+9 perfuração",
                "desc": "Alcance curto."
            }
        ],
        "habilidades": [
            {
                "nome": "Amontoado Vegetal",
                "tipo": "Reação",
                "desc": "Quando sofre um ataque corpo a corpo, o atacante faz um teste de Luta ou Reflexos (CD 22). Se falhar, o ataque não causa dano e parte do corpo da gárgula se enrosca na arma: se o atacante usou uma arma empunhada, ela é desarmada e tragada; se usou um ataque desarmado ou arma natural, o atacante é agarrado (só uma criatura agarrada assim por vez). Uma arma tragada é recuperada vencendo uma manobra desarmar contra a gárgula."
            },
            {
                "nome": "Imobilidade",
                "tipo": "Qualidade",
                "desc": "Pode permanecer completamente imóvel. Assim, um personagem deve passar em um teste de Percepção (CD 35) para perceber que é uma criatura e não uma escultura vegetal."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, percepção às cegas, visão no escuro",
        "defesaObs": "cura acelerada 30/fogo ou luz, imunidade a frio, medo e trevas, redução de dano 10/mágico, resistência a magia +5",
        "pericias": [
            {
                "nome": "Cavalgar",
                "valor": "+17"
            },
            {
                "nome": "Furtividade",
                "valor": "+19"
            },
            {
                "nome": "Intimidação",
                "valor": "+17"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Ginete do Pavor",
        "tipo": "Espírito Médio",
        "nd": "17",
        "iniciativa": "+17",
        "percepcao": "+17",
        "defesa": "54",
        "fort": "+30",
        "ref": "+24",
        "von": "+17",
        "pv": "999",
        "desl": "9m (6q)",
        "atributos": {
            "for": "7",
            "des": "3",
            "con": "5",
            "int": "1",
            "sab": "3",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Gadanho x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+47",
                "dano": "4d12+30",
                "desc": "x4, mais 4d8 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Arma de Morte",
                "tipo": "Qualidade",
                "desc": "O gadanho é uma arma mágica que ignora redução de dano. Cada vez que reduz um inimigo a 0 PV ou menos com ela, o dano de trevas aumenta em +1d8 até o fim da cena."
            },
            {
                "nome": "Mão de Ragnar",
                "tipo": "Qualidade",
                "desc": "Criaturas imunes a dano de trevas sofrem metade do dano de trevas dele, e criaturas que recuperariam PV com dano de trevas não o fazem."
            },
            {
                "nome": "Olhar Amedrontador",
                "tipo": "Movimento",
                "desc": "Lança Amedrontar como um clérigo de Ragnar de 17º nível, sem gastar PM (CD 44, limite de PM 17)."
            },
            {
                "nome": "Passo Fantasmagórico",
                "tipo": "Qualidade",
                "desc": "Sempre que se desloca, ele e a montaria ficam incorpóreos até o fim do deslocamento. Qualquer criatura nos espaços pelos quais passar sofre 4d8 de frio e 4d8 de trevas e fica alquebrada (Von CD 44 reduz à metade e evita a condição)."
            },
            {
                "nome": "Warg Espectral",
                "tipo": "Qualidade",
                "desc": "Cavalga um warg espectral, parceiro montaria (Grande) que não reduz sua Furtividade. Montado, seu deslocamento vira voo 15m (10q), recebe uma ação de movimento extra por turno (apenas para se deslocar) e +1d6 em rolagens de dano corpo a corpo; uma vez por rodada, ao acertar um ataque corpo a corpo, pode fazer a manobra derrubar como ação livre (teste +49)."
            },
            {
                "nome": "Inimigo da Luz",
                "tipo": "Qualidade",
                "desc": "Exposto à luz do sol ou similar, fica ofuscado e sua cura acelerada não funciona."
            }
        ],
        "tesouro": "Essência de morte (CD 32 para extrair, reduz em 1 PM o custo para fabricar uma arma com o encanto tumular)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+12"
            },
            {
                "nome": "Furtividade",
                "valor": "+4"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Giralon",
        "tipo": "Animal Grande",
        "nd": "5",
        "iniciativa": "+6",
        "percepcao": "+7",
        "defesa": "23",
        "fort": "+16",
        "ref": "+10",
        "von": "+4",
        "pv": "160",
        "desl": "9m (6q), escalada 6m (4q)",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "3",
            "int": "-4",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Pancada x4",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "1d6+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Pancada (teste +19)."
            },
            {
                "nome": "Pancadas Sequenciais",
                "tipo": "Qualidade",
                "desc": "Para cada ataque de pancada que acerta em uma criatura, o dano dos próximos ataques de pancada contra essa mesma criatura neste turno aumenta em um passo."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "percepção às cegas (médio), visão na penumbra",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+5"
            },
            {
                "nome": "Atletismo",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Golfinho",
        "tipo": "Animal Médio",
        "nd": "1",
        "iniciativa": "+5",
        "percepcao": "+5",
        "defesa": "15",
        "fort": "+5",
        "ref": "+8",
        "von": "+3",
        "pv": "32",
        "desl": "natação 18m (12q)",
        "atributos": {
            "for": "0",
            "des": "3",
            "con": "1",
            "int": "-4",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Pancada",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d6+3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Investida Aquática",
                "tipo": "Qualidade",
                "desc": "Quando faz uma investida, causa +2d6 de dano."
            },
            {
                "nome": "Raio Sônico",
                "tipo": "Padrão",
                "desc": "Emite um raio sônico contra uma criatura em alcance médio. A criatura fica atordoada por 1 rodada (apenas uma vez por cena) e sofre 4d6 de dano mental (Fort CD 14 reduz o dano à metade e evita a condição). Só pode usar se ele e o alvo estiverem no mesmo corpo d'água. Recarga (movimento)."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro especial (combatente). Iniciante: uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo. Veterano: você pode usar o poder Ímpeto (se já o tem, o bônus de deslocamento dele aumenta para 9m). Mestre: uma vez por rodada, você pode gastar 1 PM para emitir um raio sônico em uma criatura em alcance curto: ela fica atordoada por 1 rodada (apenas uma vez por cena) e sofre 4d6 de dano mental (Fort CD Car reduz o dano à metade e evita a condição). Só se você e o alvo estiverem no mesmo corpo d'água."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "+8 em subterrâneo, visão no escuro",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+5 (+15 em subterrâneo)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Grick",
        "tipo": "Monstro Médio",
        "nd": "2",
        "iniciativa": "+5",
        "percepcao": "+3",
        "defesa": "19",
        "fort": "+2",
        "ref": "+13",
        "von": "+7",
        "pv": "40",
        "desl": "12m (8q), escalada 12m (8q)",
        "atributos": {
            "for": "2",
            "des": "2",
            "con": "2",
            "int": "-2",
            "sab": "0",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Quatro tentáculos",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "1d4+2",
                "desc": ""
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "1d4+2",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Punição Inescapável",
                "tipo": "Reação",
                "desc": "Quando um inimigo erra um ataque contra o grick e o grick o está flanqueando, faz um ataque de tentáculo contra ele. Uma vez por rodada."
            }
        ],
        "tesouro": "Metade"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "evasão, resistência a medo +2",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+11"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Grifilho",
        "tipo": "Monstro Minúsculo",
        "nd": "1",
        "iniciativa": "+6",
        "percepcao": "+6",
        "defesa": "16",
        "fort": "+2",
        "ref": "+10",
        "von": "+4",
        "pv": "28",
        "desl": "9m (6q), voo 9m (6q)",
        "atributos": {
            "for": "-1",
            "des": "2",
            "con": "2",
            "int": "-4",
            "sab": "2",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d4+2",
                "desc": ""
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d4+2",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Bote",
                "tipo": "Completa",
                "desc": "Faz uma investida e ataca com a mordida e as duas garras. Os três ataques recebem +2 da investida, mas devem ser feitos contra o mesmo alvo."
            },
            {
                "nome": "Familiar",
                "tipo": "Qualidade",
                "desc": "Permite gastar 1 PM, ao lançar uma magia com alcance de toque, para receber +2 na CD dessa magia."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro especial (perseguidor). Iniciante: você recebe +2 em Furtividade e Percepção. Veterano: você pode usar Esquiva (se já possuir esse poder, o bônus dele aumenta em +1). Mestre: quando faz uma investida, você causa +3d4 de dano."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a medo",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Grifo Celestial",
        "tipo": "Espírito Enorme",
        "nd": "8",
        "iniciativa": "+13",
        "percepcao": "+13",
        "defesa": "32",
        "fort": "+12",
        "ref": "+21",
        "von": "+12",
        "pv": "320",
        "desl": "12m (8q), voo 36m (24q)",
        "atributos": {
            "for": "6",
            "des": "5",
            "con": "4",
            "int": "-1",
            "sab": "3",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "2d12+14",
                "desc": ""
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "2d6+14",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Bote Rasante",
                "tipo": "Completa",
                "desc": "Faz uma investida e ataca com a mordida e as duas garras. Os três ataques recebem +2 da investida, mas devem ser feitos contra o mesmo alvo. Após os ataques, pode continuar o movimento até o limite do deslocamento."
            },
            {
                "nome": "Presença Majestosa",
                "tipo": "Qualidade",
                "desc": "Uma criatura que ataque o grifo faz um teste de Vontade (CD 26). Se falhar, não consegue machucá-lo e perde a ação. Se passar, não é mais afetada por esta habilidade até o fim da cena."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro montaria (Enorme) que só segue devotos de Allihanna. Iniciante: seu deslocamento (normal e de voo) muda para 12m. Veterano: você recebe uma ação de movimento extra por turno (apenas para se deslocar) e, uma vez por rodada, +1d6 em uma rolagem de dano corpo a corpo. Mestre: o deslocamento (normal e de voo) muda para 18m e o bônus na rolagem de dano aumenta para +2d6."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de dano 5/corte ou fogo",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+7"
            },
            {
                "nome": "Furtividade",
                "valor": "+4 (+9 em florestas)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Guardião de Palha",
        "tipo": "Construto Médio",
        "nd": "2",
        "iniciativa": "+4",
        "percepcao": "+3",
        "defesa": "19",
        "fort": "+13",
        "ref": "+2",
        "von": "+7",
        "pv": "70",
        "desl": "9m (6q), sem redução por terreno difícil",
        "atributos": {
            "for": "4",
            "des": "1",
            "con": "2",
            "int": "—",
            "sab": "0",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Duas pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "2d4+4",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Controlar Plantas",
                "tipo": "Padrão",
                "desc": "Transforma um quadrado de 9m de vegetação em alcance curto em terreno difícil. Criaturas na área quando a habilidade é usada, ou no início dos próprios turnos, ficam enredadas e imóveis (Fort CD 16 evita). Uma vítima se liberta com uma ação padrão e um teste de Acrobacia ou Atletismo (CD 16)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "117",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de dano 20, imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo e paralisia",
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+23"
            },
            {
                "nome": "Cura",
                "valor": "+25"
            },
            {
                "nome": "Diplomacia",
                "valor": "+21"
            },
            {
                "nome": "Furtividade",
                "valor": "+11 (+21 em terrenos naturais)"
            },
            {
                "nome": "Intimidação",
                "valor": "+25"
            },
            {
                "nome": "Intuição",
                "valor": "+25"
            },
            {
                "nome": "Misticismo",
                "valor": "+19"
            },
            {
                "nome": "Religião",
                "valor": "+25"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+30"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Guardião do Equilíbrio",
        "tipo": "Espírito Médio",
        "nd": "18",
        "iniciativa": "+16",
        "percepcao": "+25",
        "defesa": "54",
        "fort": "+26",
        "ref": "+18",
        "von": "+32",
        "pv": "750",
        "desl": "12m (8q), sem redução por terreno difícil natural",
        "atributos": {
            "for": "8",
            "des": "1",
            "con": "7",
            "int": "3",
            "sab": "10",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Cajado x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+47",
                "dano": "4d12+20",
                "desc": "Mais 10d4 de ácido, 8d6 de eletricidade, 6d8 de fogo e 4d10 de frio."
            }
        ],
        "habilidades": [
            {
                "nome": "Absorver Elementos",
                "tipo": "Qualidade",
                "desc": "É imune a ácido, eletricidade, fogo e frio. Se fosse sofrer dano desses tipos (exceto de suas próprias habilidades), em vez disso recebe um benefício conforme o tipo: ácido, seus efeitos que causam dano de ácido causam +1 ponto de dano por dado até o fim da cena; eletricidade, deslocamento +6m até o fim da cena; fogo, pode executar uma ação padrão adicional no próximo turno; frio, 50 PV temporários."
            },
            {
                "nome": "Gênese Elemental",
                "tipo": "Qualidade",
                "desc": "Ao lançar uma magia de ácido, eletricidade, fogo ou frio, cria 1d4 capangas elementais Médios em espaços desocupados adjacentes ao alvo ou dentro da área da magia. Agem a partir da próxima rodada dele, têm deslocamento 9m e podem gastar uma ação padrão para causar 4d12 de dano do tipo da magia. Têm Defesa 35, 80 PV, imunidade a atordoamento, cansaço, dano do seu elemento, dano não letal, efeitos de metabolismo e paralisia, falham automaticamente em qualquer teste oposto ou de resistência e desaparecem ao chegar a 0 PV ou no fim da cena."
            },
            {
                "nome": "Manifestar Elementos",
                "tipo": "Livre",
                "desc": "Uma vez por rodada, ao lançar uma magia de ácido, eletricidade, fogo ou frio com execução de movimento, padrão ou completa, muda a execução para livre."
            },
            {
                "nome": "Punição Elemental",
                "tipo": "Qualidade",
                "desc": "Ao lançar uma magia de ácido, eletricidade, fogo ou frio que permita teste de resistência, aplica uma condição adicional a todas as criaturas que falharem: ácido, enjoado por 1 rodada; eletricidade, surdo por 1 rodada e caído; fogo, ofuscado por 1 rodada; frio, enredado por 1 rodada."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um druida de Arton de 18º nível (CD 49)."
            },
            {
                "nome": "Magia: Bola de Fogo",
                "tipo": "Padrão",
                "desc": "Custos: 17 PM. Explosão em alcance médio que causa 20d6 de fogo em todas as criaturas em raio de 6m (Ref reduz à metade)."
            },
            {
                "nome": "Magia: Flecha Ácida",
                "tipo": "Padrão",
                "desc": "Custos: 18 PM. Dispara um projétil em uma criatura ou objeto em alcance médio. O alvo sofre 10d6 de ácido e fica coberto por muco corrosivo que causa 8d6 de ácido no início de cada um dos dois próximos turnos dele. Se usar armadura ou escudo, o muco corrói o item, reduzindo seu bônus na Defesa em 2 pontos permanentemente (Ref reduz à metade e evita o muco)."
            },
            {
                "nome": "Magia: Relâmpago",
                "tipo": "Padrão",
                "desc": "Custos: 18 PM. Relâmpago em cada criatura escolhida em alcance médio, causando 18d6 de eletricidade (Ref reduz à metade)."
            },
            {
                "nome": "Magia: Sopro das Uivantes",
                "tipo": "Padrão",
                "desc": "Custos: 18 PM. Criaturas em um cone de 9m sofrem 16d6 de frio e, se Grandes ou menores, ficam caídas e são empurradas 6m. Se houver parede ou objeto sólido (não criatura) no caminho, a criatura para, mas sofre +2d6 de impacto (Fort reduz à metade e evita a condição e o empurrão)."
            }
        ],
        "tesouro": "Centelha elemental (CD 33 para extrair, vale 1 PM para fabricar um item mágico que cause dano de ácido, eletricidade, fogo ou frio)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a ácido e veneno, redução de dano 5/armas primitivas",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Havorarr",
        "tipo": "Monstro Grande",
        "nd": "4",
        "iniciativa": "+6",
        "percepcao": "+6",
        "defesa": "21",
        "fort": "+16",
        "ref": "+4",
        "von": "+10",
        "pv": "98",
        "desl": "voo 12m (8q)",
        "atributos": {
            "for": "2",
            "des": "2",
            "con": "4",
            "int": "-4",
            "sab": "2",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d12+10",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Aura Desmanteladora",
                "tipo": "Qualidade",
                "desc": "No início de cada turno dele, todos os itens e construtos em um raio de 9m são afetados por um efeito desmantelador. Armas, armaduras, ferramentas e engenhocas são avariadas (uma engenhoca avariada tem a CD de ativação aumentada em +5); itens mágicos têm direito a um teste de resistência (CD 20) para evitar a condição. Construtos perdem 2d12 PV (Fort CD 20 evita). Itens primitivos (sem custo em T$, como bordões e clavas) não são afetados."
            },
            {
                "nome": "Pústulas Corrosivas",
                "tipo": "Qualidade",
                "desc": "Sempre que uma criatura adjacente causa dano a ele, ela sofre 2d6 de ácido (Ref CD 20 evita)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a confusão",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+9"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Hipogrifo",
        "tipo": "Monstro Grande",
        "nd": "2",
        "iniciativa": "+9",
        "percepcao": "+6",
        "defesa": "18",
        "fort": "+7",
        "ref": "+13",
        "von": "+3",
        "pv": "75",
        "desl": "15m (10q), voo 30m (20q)",
        "atributos": {
            "for": "4",
            "des": "4",
            "con": "3",
            "int": "-4",
            "sab": "1",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "1d8+4",
                "desc": ""
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "1d4+4",
                "desc": ""
            },
            {
                "nome": "Cascos",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "2d4+4",
                "desc": "Alternativa à mordida e às garras."
            }
        ],
        "habilidades": [
            {
                "nome": "Coice",
                "tipo": "Movimento",
                "desc": "Se estiver flanqueado, o hipogrifo faz um ataque com os cascos."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro montaria (Grande). Iniciante: você recebe +1 em Iniciativa, Reflexos e na Defesa (um hipogrifo iniciante é um filhote e não pode ser usado como montaria). Veterano: como acima, mas pode ser usado como montaria, mudando seu deslocamento para voo 18m. Mestre: como acima, mas você recebe uma ação de movimento extra por turno (apenas para se deslocar)."
            }
        ],
        "tesouro": "Metade"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a ácido, confusão e veneno, redução de dano 5, redução de frio e trevas 10",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Intimidação",
                "valor": "+13"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Hipogrifo Abissal",
        "tipo": "Espírito (abissal) Grande",
        "nd": "7",
        "iniciativa": "+13",
        "percepcao": "+11",
        "defesa": "30",
        "fort": "+14",
        "ref": "+20",
        "von": "+8",
        "pv": "290",
        "desl": "15m (10q), voo 30m (20q)",
        "atributos": {
            "for": "4",
            "des": "4",
            "con": "3",
            "int": "-4",
            "sab": "2",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d6+11",
                "desc": "Mais 2d6 de frio."
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "1d6+11",
                "desc": "Mais 2d6 de frio."
            },
            {
                "nome": "Cascos",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d6+11",
                "desc": "Mais 2d6 de frio. Alternativa à mordida e às garras."
            }
        ],
        "habilidades": [
            {
                "nome": "Coice",
                "tipo": "Movimento",
                "desc": "Se estiver flanqueado, o hipogrifo abissal faz um ataque com os cascos."
            },
            {
                "nome": "Imprevisibilidade Infernal",
                "tipo": "Qualidade",
                "desc": "Emana uma aura de caos abissal de 9m de raio. No final de cada turno dele, rola 1d6. Em valor ímpar, até a próxima rodada dele, seus inimigos na área sofrem penalidade em testes igual ao valor do d6. Em valor par, seus inimigos na área sofrem dano de frio igual a 2d8 x o resultado do d6."
            }
        ],
        "tesouro": "Padrão mais 1d6 penas gélidas (CD 22 para extrair; cada pena gélida equivale a uma dose de líquen lilás)"
    },
    {
        "pm": "5d20",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a efeitos de adivinhação, encantamento, metamorfose, mentais e movimento, redução de dano 10, resistência a magia +5",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+20"
            },
            {
                "nome": "Atletismo",
                "valor": "+22"
            },
            {
                "nome": "Enganação",
                "valor": "+20"
            },
            {
                "nome": "Religião",
                "valor": "+17"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Hipogrifo de Nimb",
        "tipo": "Espírito (celestial) Grande",
        "nd": "15",
        "iniciativa": "+20",
        "percepcao": "+17",
        "defesa": "50",
        "fort": "+15",
        "ref": "+28",
        "von": "+22",
        "pv": "750",
        "desl": "15m (10q), voo 36m (24q)",
        "atributos": {
            "for": "7",
            "des": "5",
            "con": "5",
            "int": "2",
            "sab": "2",
            "car": "5"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+39",
                "dano": "4d10+25",
                "desc": ""
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+39",
                "dano": "2d8+25",
                "desc": ""
            },
            {
                "nome": "Cascos",
                "tipo": "Corpo a Corpo",
                "bonus": "+39",
                "dano": "4d8+25",
                "desc": "Alternativa à mordida e às garras."
            }
        ],
        "habilidades": [
            {
                "nome": "Alterar Forma",
                "tipo": "Padrão",
                "desc": "Assume a forma de um humano com vestes leves e coloridas, como a magia Metamorfose (apenas para essa forma e tamanho). Nessa forma perde o deslocamento de voo, mas mantém as outras habilidades. Volta à forma normal com uma ação padrão."
            },
            {
                "nome": "Armas da Desordem",
                "tipo": "Qualidade",
                "desc": "As armas naturais são armas mágicas que causam +2d6 de dano contra criaturas que não estejam sob algum efeito de metamorfose."
            },
            {
                "nome": "Coice",
                "tipo": "Movimento",
                "desc": "Se estiver flanqueado, o Hipogrifo faz um ataque com os cascos."
            },
            {
                "nome": "Imortal",
                "tipo": "Qualidade",
                "desc": "Se for morto ou destruído de qualquer forma, Nimb o ressuscita em 1d4 dias. Apenas Nimb pode destruí-lo permanentemente."
            },
            {
                "nome": "Magia Acelerada",
                "tipo": "Livre",
                "desc": "Custos: +4 PM. Uma vez por rodada, ao lançar uma magia com execução de movimento, padrão ou completa, muda a execução dela para livre."
            },
            {
                "nome": "Maldição da Insanidade",
                "tipo": "Qualidade",
                "desc": "Uma criatura que monte o Hipogrifo sofre os efeitos da magia Sussurros Insanos (Von CD 40 evita; devotos de Khalmyr sofrem -5 nesse teste). Ele pode anular esse efeito para criaturas que aceite como cavaleiros."
            },
            {
                "nome": "Sorte dos Loucos",
                "tipo": "Livre",
                "desc": "Custos: 1 PM. Quando faz um teste, pode rolá-lo novamente (mais de uma vez por teste). Se ainda assim falhar, perde 1d6 PM para cada vez que usou este poder no teste."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um clérigo de Nimb de 15º nível (CD 40)."
            },
            {
                "nome": "Magia: Despedaçar",
                "tipo": "Padrão",
                "desc": "Custos: 15 PM. Um alvo em alcance curto sofre 8d8+16 de impacto se for uma criatura, ou o dobro disso sem aplicar redução de dano se for um construto ou objeto mundano Pequeno, e fica atordoado (Fort reduz à metade e evita a condição). Uma criatura só pode ficar atordoada por esta magia uma vez por cena."
            },
            {
                "nome": "Magia: Dificultar Detecção",
                "tipo": "Padrão",
                "desc": "Custos: 1 PM. Uma criatura (com equipamento) ou objeto em alcance de toque é ocultado contra qualquer meio mágico de detecção por 1 dia. Um conjurador que lance magia de adivinhação para detectar o alvo faz um teste de Vontade; se falhar, a magia não funciona, mas os PM são gastos."
            },
            {
                "nome": "Magia: Sussurros Insanos",
                "tipo": "Padrão",
                "desc": "Custos: 12 PM. Até 4 criaturas em alcance curto ficam confusas (Von evita)."
            },
            {
                "nome": "Magia: Viagem Planar",
                "tipo": "Padrão",
                "desc": "Custos: 12 PM. Ele e até 5 criaturas voluntárias que esteja tocando viajam para outro Plano."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro montaria (Grande) que aceita ser montado apenas por quem ele quiser. Seu deslocamento muda para 18m (voo 36m) e você recebe uma ação de movimento extra por turno (apenas para se deslocar). Além disso, você pode lançar Sussurros Insanos (se aprender essa magia, o custo dela diminui em -1 PM)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+9"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Hipopótamo",
        "tipo": "Animal Grande",
        "nd": "4",
        "iniciativa": "+3",
        "percepcao": "+5",
        "defesa": "23",
        "fort": "+16",
        "ref": "+4",
        "von": "+10",
        "pv": "140",
        "desl": "9m (6q), natação 9m (6q)",
        "atributos": {
            "for": "5",
            "des": "-1",
            "con": "3",
            "int": "-4",
            "sab": "1",
            "car": "-3"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "2d12+11",
                "desc": "x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Mordida Avassaladora",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida pela mordida tem a armadura ou o escudo (à escolha dele) avariado. Se não usar armadura nem escudo, sofre +1d12 de dano (em ambos os casos, Ref CD 18 evita)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a frio",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+8"
            },
            {
                "nome": "Furtividade",
                "valor": "+4"
            },
            {
                "nome": "Guerra",
                "valor": "+5"
            },
            {
                "nome": "Intimidação",
                "valor": "+6"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Inumano Combatente",
        "tipo": "Morto-vivo Médio",
        "nd": "6",
        "iniciativa": "+7",
        "percepcao": "+6",
        "defesa": "26",
        "fort": "+17",
        "ref": "+12",
        "von": "+7",
        "pv": "56",
        "desl": "9m (6q)",
        "atributos": {
            "for": "3",
            "des": "2",
            "con": "1",
            "int": "0",
            "sab": "1",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Espada longa x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d8+9",
                "desc": "19, mais 2d12 de trevas."
            },
            {
                "nome": "Azagaia",
                "tipo": "À Distância",
                "bonus": "+24",
                "dano": "2d6+9",
                "desc": "Mais 2d12 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Drenar Energia",
                "tipo": "Qualidade",
                "desc": "Uma criatura viva que sofra dano de trevas do inumano sofre uma penalidade cumulativa de -1 em testes de perícia (Fort CD 22 evita). Se acumular uma penalidade igual ou maior que seu próprio nível, a criatura morre e se transforma em um inumano sob controle do mestre. A penalidade é removida com descanso ou efeitos mágicos capazes de remover qualquer condição de metabolismo (cada dia de descanso ou efeito diminui a penalidade em 1)."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Azagaia x3, escudo pesado, espada longa, gibão de peles"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a frio, redução de dano 5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Furtividade",
                "valor": "+5"
            },
            {
                "nome": "Guerra",
                "valor": "+13"
            },
            {
                "nome": "Intimidação",
                "valor": "+13"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Inumano General",
        "tipo": "Morto-vivo Médio",
        "nd": "11",
        "iniciativa": "+11",
        "percepcao": "+10",
        "defesa": "41",
        "fort": "+24",
        "ref": "+18",
        "von": "+11",
        "pv": "490",
        "desl": "9m (6q)",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "2",
            "int": "2",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Machado anão x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+32",
                "dano": "2d10+26",
                "desc": "x3, mais 4d12 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Drenar Energia",
                "tipo": "Qualidade",
                "desc": "Uma criatura viva que sofra dano de trevas do inumano general sofre uma penalidade cumulativa de -1 em testes de perícia (Fort CD 31 evita). Se acumular uma penalidade igual ou maior que seu próprio nível, a criatura morre e se transforma em um inumano sob controle do mestre. A penalidade é removida com descanso ou efeitos mágicos capazes de remover qualquer condição de metabolismo (cada dia de descanso ou efeito diminui a penalidade em 1)."
            },
            {
                "nome": "Fornalha do Ódio",
                "tipo": "Qualidade",
                "desc": "Sempre que acerta um ataque corpo a corpo, recupera 5 PV e recebe um bônus cumulativo de +2 em testes de ataque e rolagens de dano durante o próximo turno."
            },
            {
                "nome": "Ordens",
                "tipo": "Movimento",
                "desc": "Grita ordens para aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena."
            },
            {
                "nome": "Varrer",
                "tipo": "Livre",
                "desc": "Uma vez por rodada, quando faz um ataque corpo a corpo e reduz os PV do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do alcance."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura completa macabra, escudo pesado reforçado, machado anão atroz"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Javali",
        "tipo": "Animal Médio",
        "nd": "1/2",
        "iniciativa": "+2",
        "percepcao": "+3",
        "defesa": "14",
        "fort": "+6",
        "ref": "-2",
        "von": "+3",
        "pv": "16",
        "desl": "12m (8q)",
        "atributos": {
            "for": "2",
            "des": "0",
            "con": "3",
            "int": "-4",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+5",
                "dano": "2d6+3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ímpeto Feroz",
                "tipo": "Qualidade",
                "desc": "Não fica inconsciente quando reduzido a 0 PV ou menos e, nessa condição, recebe +2 em testes de ataque e rolagens de dano. Ao ser reduzido a -8 PV, morre (ou fica inconsciente, no caso de dano não letal)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "fortificação 50%, imunidade a veneno",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+12"
            }
        ],
        "fonte": "Bestiário de Arton",
        "tipo": "Monstro Grande",
        "desl": "12m (8q), escalada 12m (8q)",
        "nome": "Khelk'kar Bruto",
        "nd": "7",
        "iniciativa": "+9",
        "percepcao": "+7",
        "defesa": "30",
        "fort": "+19",
        "ref": "+14",
        "von": "+8",
        "pv": "58",
        "atributos": {
            "for": "5",
            "des": "2",
            "con": "3",
            "int": "0",
            "sab": "0",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Alabarda",
                "tipo": "Corpo a Corpo",
                "bonus": "+25",
                "dano": "2d6+10",
                "desc": "x3."
            },
            {
                "nome": "Pinças",
                "tipo": "Corpo a Corpo",
                "bonus": "+25",
                "dano": "2d6+10",
                "desc": ""
            },
            {
                "nome": "Ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+25",
                "dano": "1d10+10",
                "desc": "Mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Pinças (teste +27)."
            },
            {
                "nome": "Pressionar",
                "tipo": "Livre",
                "desc": "No início de cada turno dele, causa 4d6+10 de corte na criatura que estiver agarrando com as pinças. Sempre que rolar o resultado máximo em um desses dados, rola um dado extra, repetindo o processo a cada resultado máximo."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha concentrada (perde 2d12 PV por rodada durante 3 rodadas, Fort CD 24 reduz a duração para 1 rodada)."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Alabarda aumentada"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "fortificação 50%, imunidade a veneno",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+15"
            },
            {
                "nome": "Intimidação",
                "valor": "+7"
            }
        ],
        "fonte": "Bestiário de Arton",
        "tipo": "Monstro Grande",
        "desl": "12m (8q), escalada 12m (8q)",
        "nome": "Khelk'kar Chefe",
        "nd": "11",
        "iniciativa": "+11",
        "percepcao": "+10",
        "defesa": "41",
        "fort": "+24",
        "ref": "+18",
        "von": "+11",
        "pv": "550",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "4",
            "int": "0",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Alabarda",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "3d12+10",
                "desc": "x4."
            },
            {
                "nome": "Pinças",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "3d12+10",
                "desc": ""
            },
            {
                "nome": "Ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "3d10+10",
                "desc": "Mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Pinças (teste +36)."
            },
            {
                "nome": "Ferroada Avassaladora",
                "tipo": "Qualidade",
                "desc": "Se um ataque de ferrão acertar a Defesa de uma criatura por 5 ou mais, inocula uma dose adicional de peçonha: a CD para resistir ao veneno desse ataque aumenta em +5 e ele causa o dobro de perda de vida."
            },
            {
                "nome": "Pressionar",
                "tipo": "Livre",
                "desc": "No início de cada turno dele, causa 6d6+10 de corte na criatura que estiver agarrando com as pinças. Sempre que rolar o resultado máximo em um desses dados, rola um dado extra, repetindo o processo a cada resultado máximo."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha concentrada (perde 2d12 PV por rodada durante 3 rodadas, Fort CD 31 reduz a duração para 1 rodada)."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Alabarda aumentada maciça"
    },
    {
        "pm": "0",
        "percepcaoObs": "percepção às cegas (longo)",
        "defesaObs": "fortificação 25%, natureza vegetal, redução de dano 5/corte, resistência a veneno +5, vulnerabilidade a fogo",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Khovantir",
        "tipo": "Monstro Enorme",
        "nd": "8",
        "iniciativa": "+10",
        "percepcao": "+9",
        "defesa": "31",
        "fort": "+15",
        "ref": "+21",
        "von": "+8",
        "pv": "300",
        "desl": "9m (6q)",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "3",
            "int": "-5",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Quatro tentáculos",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "2d10+8",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Tentáculo (teste +32)."
            },
            {
                "nome": "Arremessar",
                "tipo": "Movimento",
                "desc": "Se começar o turno agarrando uma criatura Média ou menor, arremessa a vítima 1d6 x 1,5m em uma direção à sua escolha. A vítima sofre 2d6 de impacto, fica caída e, se atingir um obstáculo, sofre +2d6 (Ref CD 28 reduz à metade e evita a condição). Recarga (movimento)."
            },
            {
                "nome": "Chuva de Espinhos",
                "tipo": "Completa",
                "desc": "Projeta uma chuva de espinhos sobre uma área de 6m de raio em alcance médio. Criaturas na área sofrem 5d10+5 de perfuração (Ref CD 28 reduz à metade). Recarga (movimento)."
            },
            {
                "nome": "Esporos Venenosos",
                "tipo": "Reação",
                "desc": "Na primeira vez em cada cena em que é reduzido a 100 PV ou menos, expele esporos venenosos em raio de 9m. Outras criaturas na área perdem 6d12 PV e ficam fracas e vulneráveis (Fort CD 28 reduz a perda de vida à metade e evita as condições). Veneno."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "evasão, imunidade a eletricidade",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+9"
            }
        ],
        "fonte": "Bestiário de Arton",
        "desl": "12m (8q), natação 9m (6q)",
        "atributos": {
            "for": "0",
            "des": "3",
            "con": "1",
            "int": "-5",
            "sab": "1",
            "car": "-2"
        },
        "tesouro": "Metade",
        "nome": "Lagarto-Elétrico",
        "tipo": "Monstro Pequeno",
        "nd": "1",
        "iniciativa": "+5",
        "percepcao": "+5",
        "defesa": "15",
        "fort": "+5",
        "ref": "+10",
        "von": "+1",
        "pv": "24",
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+7",
                "dano": "1d6+3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Choque",
                "tipo": "Padrão",
                "desc": "Dispara uma descarga elétrica em uma criatura em alcance curto. O alvo fica atordoado por 1 rodada (apenas uma vez por cena) e sofre 3d6+3 de eletricidade (Ref CD 16 reduz à metade e evita a condição)."
            },
            {
                "nome": "Relâmpago Conjunto",
                "tipo": "Completa",
                "desc": "Se dois ou mais lagartos-elétricos estiverem adjacentes, todos podem usar esta habilidade para descarregar eletricidade em uma linha de 30m. Criaturas na área ficam atordoadas por 1 rodada (apenas uma vez por cena) e sofrem 6d6+6 de eletricidade, mais 1d6+1 para cada lagarto-elétrico além do segundo (Ref CD 16 reduz à metade e evita a condição). Recarga (movimento)."
            },
            {
                "nome": "Familiar",
                "tipo": "Qualidade",
                "desc": "Um lagarto-elétrico familiar fornece +1 PM para gastar em aprimoramentos sempre que você lança uma magia de eletricidade."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro especial (destruidor). Iniciante: uma vez por rodada, você pode gastar 1 PM para causar 2d6 de eletricidade em uma criatura em alcance curto. Veterano: você pode lançar Toque Chocante (se já conhece a magia, o custo dela diminui em -1 PM). Mestre: você recebe redução de eletricidade 20."
            }
        ]
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "evasão, imunidade a eletricidade",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+9"
            }
        ],
        "fonte": "Bestiário de Arton",
        "desl": "12m (8q), natação 9m (6q)",
        "atributos": {
            "for": "0",
            "des": "3",
            "con": "1",
            "int": "-5",
            "sab": "1",
            "car": "-2"
        },
        "tesouro": "Metade",
        "nome": "Tempestade de Lagartos",
        "tipo": "Monstro Médio",
        "nd": "5",
        "iniciativa": "+7",
        "percepcao": "+7",
        "defesa": "23",
        "fort": "+11",
        "ref": "+16",
        "von": "+6",
        "pv": "135",
        "ataques": [
            {
                "nome": "Mordida [Bando]",
                "tipo": "Corpo a Corpo",
                "bonus": "+15",
                "dano": "2d6+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Choque",
                "tipo": "Padrão",
                "desc": "Dispara uma descarga elétrica em uma criatura em alcance curto. O alvo fica atordoado por 1 rodada (apenas uma vez por cena) e sofre 6d6+6 de eletricidade (Ref CD 22 reduz à metade e evita a condição)."
            },
            {
                "nome": "Relâmpago Conjunto",
                "tipo": "Completa",
                "desc": "Descarrega eletricidade em qualquer número de criaturas escolhidas em alcance médio. Cada criatura fica atordoada por 1 rodada (apenas uma vez por cena) e sofre 8d6+8 de eletricidade (Ref CD 22 reduz à metade e evita a condição). Recarga (movimento)."
            }
        ]
    },
    {
        "pm": "40",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Diplomacia",
                "valor": "+13"
            },
            {
                "nome": "Enganação",
                "valor": "+16"
            },
            {
                "nome": "Furtividade",
                "valor": "+7"
            },
            {
                "nome": "Intuição",
                "valor": "+9"
            },
            {
                "nome": "Misticismo",
                "valor": "+6"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Lâmia",
        "tipo": "Monstro Grande",
        "nd": "6",
        "iniciativa": "+7",
        "percepcao": "+7",
        "defesa": "25",
        "fort": "+6",
        "ref": "+12",
        "von": "+18",
        "pv": "160",
        "desl": "12m (8q)",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "1",
            "int": "1",
            "sab": "2",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Cimitarra",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "2d8+14",
                "desc": "17."
            },
            {
                "nome": "Toque",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "6d6+12 psíquico",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Drenar Sabedoria",
                "tipo": "Livre",
                "desc": "Uma criatura atingida pelo toque da lâmia fica frustrada (Von CD 24 evita). Se já estiver frustrada (mesmo por este efeito), fica esmorecida e, se já estiver esmorecida, fica inconsciente."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como uma feiticeira de 6º nível (CD 24)."
            },
            {
                "nome": "Magia: Criar Ilusão",
                "tipo": "Padrão",
                "desc": "Custos: 2 PM. Cria ilusões com sons complexos (equivalente a 5 pessoas por cubo) em alcance médio, ocupando até 4 cubos de 1,5m. As ilusões são incapazes de causar e sofrer dano (Von desacredita)."
            },
            {
                "nome": "Magia: Imagem Espelhada",
                "tipo": "Padrão",
                "desc": "Custos: 5 PM. Cinco cópias ilusórias da lâmia surgem ao seu redor, concedendo +10 na Defesa. Cada vez que um ataque erra a lâmia, uma das cópias desaparece e o bônus na Defesa diminui em 2."
            },
            {
                "nome": "Magia: Aparência Perfeita",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. A lâmia recebe +2 em Carisma e +5 em Diplomacia e Enganação (sem PV ou PM adicionais). Ao fim de cada cena, pode gastar os PM da magia novamente como ação livre para mantê-la ativa."
            },
            {
                "nome": "Magia: Disfarce Ilusório",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Até o fim da cena, muda a própria aparência, incluindo equipamento, odores e sensações (altura, peso, tom de pele, cor de cabelo, timbre de voz etc.). Recebe +20 em testes de Enganação para disfarce (Von desacredita)."
            },
            {
                "nome": "Magia: Enfeitiçar",
                "tipo": "Padrão",
                "desc": "Custos: 1 PM. Um humanoide em alcance curto fica enfeitiçado pela lâmia até o fim da cena, ou até a lâmia ou um aliado dela tomar uma ação hostil contra ele."
            },
            {
                "nome": "Magia: Sono",
                "tipo": "Padrão",
                "desc": "Custos: 5 PM. Uma criatura em alcance curto fica inconsciente ou, se envolvida em combate ou outra situação perigosa, fica exausta por 1d4+1 rodadas (nos dois casos, Von reduz para fatigado por 1d4 rodadas)."
            },
            {
                "nome": "Magia: Sussurros Insanos",
                "tipo": "Padrão",
                "desc": "Custos: 6 PM. Uma criatura em alcance curto fica confusa (Von evita)."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Bracelete cravejado de gemas, colar banhado a ouro, cimitarra precisa"
    },
    {
        "pm": "90",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a atordoamento e efeitos mentais, redução de psíquico 10",
        "pericias": [
            {
                "nome": "Diplomacia",
                "valor": "+18"
            },
            {
                "nome": "Enganação",
                "valor": "+18"
            },
            {
                "nome": "Furtividade",
                "valor": "+12"
            },
            {
                "nome": "Intuição",
                "valor": "+15"
            },
            {
                "nome": "Misticismo",
                "valor": "+13"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Lâmia Mercadora de Futuros",
        "tipo": "Monstro Grande",
        "nd": "12",
        "iniciativa": "+12",
        "percepcao": "+13",
        "defesa": "41",
        "fort": "+12",
        "ref": "+20",
        "von": "+26",
        "pv": "410",
        "desl": "12m (8q)",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "2",
            "int": "1",
            "sab": "3",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Cimitarra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d8+18",
                "desc": "17."
            },
            {
                "nome": "Toque",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "12d6+30 psíquico",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Contramágica Auspiciosa",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, ao ver uma magia ser conjurada, faz uma contramágica. Se usar Dissipar Magia para isso, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Drenar Sabedoria",
                "tipo": "Livre",
                "desc": "Uma criatura atingida pelo toque da lâmia fica frustrada (Von CD 35 evita). Se já estiver frustrada (mesmo por este efeito), fica esmorecida e, se já estiver esmorecida, fica inconsciente."
            },
            {
                "nome": "Futuro Negociado",
                "tipo": "Livre",
                "desc": "Uma vez por cena, ao fazer um teste de perícia, pode substituir o resultado do d20 por um 20."
            },
            {
                "nome": "Magia Acelerada",
                "tipo": "Livre",
                "desc": "Custos: +4 PM. Uma vez por rodada, ao lançar uma magia com execução de movimento, padrão ou completa, muda a execução dela para livre."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como uma feiticeira de 12º nível (CD 35)."
            },
            {
                "nome": "Magia: Adaga Mental",
                "tipo": "Padrão",
                "desc": "Custos: 11 PM. Uma criatura em alcance curto sofre 7d6 de dano psíquico e fica atordoada por 1 rodada (Von reduz o dano à metade e evita a condição). A lâmia lança a magia sem gesticular ou pronunciar palavras e a adaga é invisível; se o alvo falhar no teste, não percebe que foi alvo da magia. Uma criatura só pode ser atordoada por esta magia uma vez por cena."
            },
            {
                "nome": "Magia: Dissipar Magia",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado são dissipadas."
            },
            {
                "nome": "Magia: Imagem Espelhada",
                "tipo": "Padrão",
                "desc": "Custos: 7 PM. Cinco cópias ilusórias surgem ao seu redor, concedendo +10 na Defesa. Cada vez que um ataque erra a lâmia, uma das cópias desaparece e o bônus na Defesa diminui em 2, mas a criatura atacante fica ofuscada por 1 rodada."
            },
            {
                "nome": "Magia: Aparência Perfeita",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. A lâmia recebe +2 em Carisma e +5 em Diplomacia e Enganação (sem PV ou PM adicionais). Ao fim de cada cena, pode gastar os PM da magia novamente como ação livre para mantê-la ativa."
            },
            {
                "nome": "Magia: Disfarce Ilusório",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Até o fim da cena, muda a própria aparência, incluindo equipamento, odores e sensações (altura, peso, tom de pele, cor de cabelo, timbre de voz etc.). Recebe +20 em testes de Enganação para disfarce (Von desacredita)."
            },
            {
                "nome": "Magia: Enfeitiçar",
                "tipo": "Padrão",
                "desc": "Custos: 1 PM. Um humanoide em alcance curto fica enfeitiçado pela lâmia até o fim da cena, ou até a lâmia ou um aliado dela tomar uma ação hostil contra ele."
            },
            {
                "nome": "Magia: Sono",
                "tipo": "Padrão",
                "desc": "Custos: 5 PM. Uma criatura em alcance curto fica inconsciente ou, se envolvida em combate ou outra situação perigosa, fica exausta por 1d4+1 rodadas (nos dois casos, Von reduz para fatigado por 1d4 rodadas)."
            },
            {
                "nome": "Magia: Sussurros Insanos",
                "tipo": "Padrão",
                "desc": "Custos: 6 PM. Uma criatura em alcance curto fica confusa (Von evita)."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Bracelete cravejado de gemas, colar banhado a ouro, cimitarra formidável precisa",
        "observacao": "Barganhando o Futuro: um personagem pode barganhar com a lâmia e escolher uma magia de adivinhação de até 3º círculo, que poderá lançar uma única vez como feiticeiro de 12º nível (CD Car ou atributo-chave de magias arcanas, limite de PM 12), sem gastar PM. Em troca, para cada círculo da magia, quando fizer um teste de perícia e o d20 der 20 natural, o resultado vira 10 (só vale para testes significativos, a critério do mestre). A barganha não pode ser desfeita."
    },
    {
        "pm": "135",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a atordoamento e efeitos mentais, redução de psíquico 10, resistência a magia +5",
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+21"
            },
            {
                "nome": "Diplomacia",
                "valor": "+28"
            },
            {
                "nome": "Enganação",
                "valor": "+28"
            },
            {
                "nome": "Furtividade",
                "valor": "+18"
            },
            {
                "nome": "Guerra",
                "valor": "+21"
            },
            {
                "nome": "Intimidação",
                "valor": "+28"
            },
            {
                "nome": "Intuição",
                "valor": "+22"
            },
            {
                "nome": "Misticismo",
                "valor": "+21"
            },
            {
                "nome": "Nobreza",
                "valor": "+21"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Ankhenaten, a Rainha de Antylia",
        "tipo": "Monstro Grande",
        "nd": "18",
        "iniciativa": "+18",
        "percepcao": "+20",
        "defesa": "54",
        "fort": "+18",
        "ref": "+26",
        "von": "+32",
        "pv": "760",
        "desl": "12m (8q)",
        "atributos": {
            "for": "3",
            "des": "3",
            "con": "3",
            "int": "4",
            "sab": "5",
            "car": "11"
        },
        "ataques": [
            {
                "nome": "Cimitarra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+47",
                "dano": "4d12+30",
                "desc": "17, mais 6d10 de dano psíquico."
            },
            {
                "nome": "Toque",
                "tipo": "Corpo a Corpo",
                "bonus": "+47",
                "dano": "12d10+30 psíquico",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Contramágica Auspiciosa",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, ao ver uma magia ser conjurada, faz uma contramágica. Se usar Dissipar Magia para isso, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Drenar Sabedoria",
                "tipo": "Livre",
                "desc": "Uma criatura atingida pelo toque de Ankhenaten fica frustrada (Von CD 49 evita). Se já estiver frustrada (mesmo por este efeito), fica esmorecida e, se já estiver esmorecida, fica inconsciente."
            },
            {
                "nome": "Jogo da Corte",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de Diplomacia, Intuição ou Nobreza, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Magia Acelerada",
                "tipo": "Livre",
                "desc": "Custos: +4 PM. Uma vez por rodada, ao lançar uma magia com execução de movimento, padrão ou completa, muda a execução dela para livre."
            },
            {
                "nome": "Presença Opressora",
                "tipo": "Reação",
                "desc": "Quando uma criatura com valor de Inteligência tenta machucá-la, essa criatura faz um teste de Vontade (CD 49). Se falhar, não consegue machucá-la, perde a ação e sofre 6d12 de dano psíquico. Só pode usar esta habilidade uma vez por criatura na mesma cena."
            },
            {
                "nome": "Orgulho",
                "tipo": "Reação",
                "desc": "Uma vez por cena, ao fazer um teste de perícia, soma o dobro de seu Carisma (+22) nesse teste."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como uma feiticeira de 18º nível (CD 49)."
            },
            {
                "nome": "Magia: Adaga Mental",
                "tipo": "Padrão",
                "desc": "Custos: 17 PM. Uma criatura em alcance curto sofre 10d6 de dano psíquico e fica atordoada por 1 rodada (Von reduz o dano à metade e evita a condição). A lâmia lança a magia sem gesticular ou pronunciar palavras e a adaga é invisível; se o alvo falhar no teste, não percebe que foi alvo da magia. Uma criatura só pode ser atordoada por esta magia uma vez por cena."
            },
            {
                "nome": "Magia: Dissipar Magia",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado são dissipadas."
            },
            {
                "nome": "Magia: Imagem Espelhada",
                "tipo": "Padrão",
                "desc": "Custos: 11 PM. Cinco cópias ilusórias surgem ao seu redor, concedendo +14 na Defesa. Cada vez que um ataque erra a lâmia, uma das cópias desaparece e o bônus na Defesa diminui em 2, mas a criatura atacante fica ofuscada por 1 rodada."
            },
            {
                "nome": "Magia: Toque Vampírico",
                "tipo": "Padrão",
                "desc": "Custos: 13 PM. Faz um ataque corpo a corpo. Se acertar, além do dano normal causa 14d6 de trevas e recupera PV iguais à metade desse dano de trevas."
            },
            {
                "nome": "Magia: Velocidade",
                "tipo": "Padrão",
                "desc": "Custos: 10 PM, sustentada. Pode executar uma ação padrão adicional por turno."
            },
            {
                "nome": "Magia: Aparência Perfeita",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. A lâmia recebe +2 em Carisma e +5 em Diplomacia e Enganação (sem PV ou PM adicionais). Ao fim de cada cena, pode gastar os PM da magia novamente como ação livre para mantê-la ativa."
            },
            {
                "nome": "Magia: Disfarce Ilusório",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Até o fim da cena, muda a própria aparência, incluindo equipamento, odores e sensações (altura, peso, tom de pele, cor de cabelo, timbre de voz etc.). Recebe +20 em testes de Enganação para disfarce (Von desacredita)."
            },
            {
                "nome": "Magia: Enfeitiçar",
                "tipo": "Padrão",
                "desc": "Custos: 1 PM. Um humanoide em alcance curto fica enfeitiçado pela lâmia até o fim da cena, ou até a lâmia ou um aliado dela tomar uma ação hostil contra ele."
            },
            {
                "nome": "Magia: Sono",
                "tipo": "Padrão",
                "desc": "Custos: 5 PM. Uma criatura em alcance curto fica inconsciente ou, se envolvida em combate ou outra situação perigosa, fica exausta por 1d4+1 rodadas (nos dois casos, Von reduz para fatigado por 1d4 rodadas)."
            },
            {
                "nome": "Magia: Sussurros Insanos",
                "tipo": "Padrão",
                "desc": "Custos: 6 PM. Uma criatura em alcance curto fica confusa (Von evita)."
            }
        ],
        "tesouro": "Dobro",
        "equipamento": "Bracelete cravejado de gemas, colar banhado a ouro, coroa majestosa, cimitarra formidável precisa"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, percepção às cegas (médio)",
        "defesaObs": "imunidade a atordoamento, cansaço, metabolismo e veneno, redução de dano 20/adamante",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+20"
            },
            {
                "nome": "Furtividade",
                "valor": "+15"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Leão-de-Keenn",
        "tipo": "Monstro Enorme",
        "nd": "14",
        "iniciativa": "+15",
        "percepcao": "+14",
        "defesa": "46",
        "fort": "+28",
        "ref": "+22",
        "von": "+14",
        "pv": "700",
        "desl": "15m (10q)",
        "atributos": {
            "for": "7",
            "des": "2",
            "con": "5",
            "int": "-4",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+39",
                "dano": "6d6+27",
                "desc": ""
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+39",
                "dano": "4d6+27",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +44)."
            },
            {
                "nome": "Bote",
                "tipo": "Completa",
                "desc": "Faz uma investida e ataca com a mordida e as duas garras. Os três ataques recebem +2 da investida, mas devem ser feitos contra o mesmo alvo."
            },
            {
                "nome": "Dilacerar",
                "tipo": "Qualidade",
                "desc": "Se acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 4d6+27 de dano."
            },
            {
                "nome": "Engolir",
                "tipo": "Padrão",
                "desc": "No início de cada turno dele, a criatura engolida sofre 4d8+18 de impacto mais 4d8+18 de ácido. Ela escapa causando um total de 75 pontos de dano a ele (Defesa 20)."
            },
            {
                "nome": "Rugido Aterrorizante",
                "tipo": "Padrão",
                "desc": "Todas as criaturas em alcance longo ficam apavoradas (Von CD 38 muda para abaladas). Recarga (movimento)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de corte, frio e perfuração 5",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Legionário Condenado",
        "tipo": "Morto-vivo Médio",
        "nd": "7",
        "iniciativa": "+8",
        "percepcao": "+6",
        "defesa": "33",
        "fort": "+19",
        "ref": "+9",
        "von": "+13",
        "pv": "71",
        "desl": "6m (4q)",
        "atributos": {
            "for": "5",
            "des": "0",
            "con": "2",
            "int": "1",
            "sab": "-1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Gládio",
                "tipo": "Corpo a Corpo",
                "bonus": "+25",
                "dano": "2d6+12",
                "desc": "19/x3, mais 2d8 de trevas."
            },
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+25",
                "dano": "2d6+12",
                "desc": "Mais 2d8 de trevas."
            },
            {
                "nome": "Azagaia",
                "tipo": "À Distância",
                "bonus": "+25",
                "dano": "2d6+5",
                "desc": "Mais 2d8 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Falange",
                "tipo": "Movimento",
                "desc": "Se estiver usando um escudo e adjacente a um aliado com esta habilidade, pode formar uma falange com ele. Enquanto adjacentes, os participantes da falange recebem +2 na Defesa e em testes de resistência."
            },
            {
                "nome": "Azagaia Impura",
                "tipo": "Qualidade",
                "desc": "Uma criatura que sofra dano de trevas de uma azagaia de um membro da Legião não pode recuperar PV por 1d4 rodadas."
            },
            {
                "nome": "Pela XIII",
                "tipo": "Livre",
                "desc": "Pode executar uma ação padrão adicional em seu primeiro turno de combate."
            },
            {
                "nome": "Lembrança Vergonhosa",
                "tipo": "Qualidade",
                "desc": "Se estiver em alcance curto de uma área de Tormenta, de criaturas da Tormenta ou de devotos de Aharadak, fica abalado."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Azagaia x3, escudo pesado, gládio, loriga segmentada",
        "observacao": "Maldição da Legio Precita: membros derrotados retornam na noite seguinte à sua morte."
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de corte, frio e perfuração 5",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Decúria Condenada",
        "tipo": "Morto-vivo Grande",
        "nd": "11",
        "iniciativa": "+10",
        "percepcao": "+8",
        "defesa": "39",
        "fort": "+23",
        "ref": "+13",
        "von": "+17",
        "pv": "165",
        "desl": "6m (4q)",
        "atributos": {
            "for": "5",
            "des": "0",
            "con": "2",
            "int": "1",
            "sab": "-1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Gládio [Bando]",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "4d6+24",
                "desc": "19/x3, mais 4d8 de trevas."
            },
            {
                "nome": "Chifres [Bando]",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "4d6+24",
                "desc": "Mais 4d8 de trevas."
            },
            {
                "nome": "Azagaia [Bando]",
                "tipo": "À Distância",
                "bonus": "+36",
                "dano": "4d6+10",
                "desc": "Mais 4d8 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Disciplina Militar",
                "tipo": "Qualidade",
                "desc": "Ao usar a ação agredir dentro de uma área de Estandarte Profano (veja Centurião Condenado), a decúria pode fazer um ataque adicional."
            },
            {
                "nome": "Falange",
                "tipo": "Movimento",
                "desc": "A decúria assume uma formação defensiva. Enquanto tiver pelo menos metade de seus PV, recebe +2 na Defesa e em testes de resistência."
            },
            {
                "nome": "Azagaia Impura",
                "tipo": "Qualidade",
                "desc": "Uma criatura que sofra dano de trevas de uma azagaia de um membro da Legião não pode recuperar PV por 1d4 rodadas."
            },
            {
                "nome": "Pela XIII",
                "tipo": "Livre",
                "desc": "Pode executar uma ação padrão adicional em seu primeiro turno de combate."
            },
            {
                "nome": "Lembrança Vergonhosa",
                "tipo": "Qualidade",
                "desc": "Se estiver em alcance curto de uma área de Tormenta, de criaturas da Tormenta ou de devotos de Aharadak, fica abalado."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Azagaia x3, escudo pesado, gládio, loriga segmentada (1d10 de cada)",
        "observacao": "Maldição da Legio Precita: membros derrotados retornam na noite seguinte à sua morte."
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a encantamento, redução de dano 5, redução de corte, frio e perfuração 5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+19"
            },
            {
                "nome": "Guerra",
                "valor": "+15"
            },
            {
                "nome": "Intimidação",
                "valor": "+13"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+12"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Centurião Condenado",
        "tipo": "Morto-vivo Médio",
        "nd": "13",
        "iniciativa": "+12",
        "percepcao": "+12",
        "defesa": "45",
        "fort": "+26",
        "ref": "+14",
        "von": "+19",
        "pv": "810",
        "desl": "6m (4q)",
        "atributos": {
            "for": "7",
            "des": "0",
            "con": "4",
            "int": "3",
            "sab": "0",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Gládio x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "2d12+20",
                "desc": "19/x3, mais 4d8 de trevas."
            },
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "2d12+20",
                "desc": "Mais 4d8 de trevas."
            },
            {
                "nome": "Azagaia",
                "tipo": "À Distância",
                "bonus": "+36",
                "dano": "2d8+20",
                "desc": "Mais 4d8 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Coordenar Ataque",
                "tipo": "Movimento",
                "desc": "Coordena os ataques de uma falange da qual esteja participando. Até o próximo turno dele, sempre que um participante da falange fizer um ataque, pode rolar dois dados e usar o melhor resultado."
            },
            {
                "nome": "É Proibido Morrer",
                "tipo": "Qualidade",
                "desc": "Aliados em alcance médio recebem redução de dano 5."
            },
            {
                "nome": "Estandarte Profano",
                "tipo": "Qualidade",
                "desc": "Emana uma aura de energia negativa de 30m de raio. Dentro dela, dano de trevas e PV curados por trevas são maximizados e membros da Legião recebem +2 em todos os testes."
            },
            {
                "nome": "Falange",
                "tipo": "Movimento",
                "desc": "Se estiver usando um escudo e adjacente a um aliado com esta habilidade, pode formar uma falange com ele. Enquanto adjacentes, os participantes da falange recebem +2 na Defesa e em testes de resistência."
            },
            {
                "nome": "Azagaia Impura",
                "tipo": "Qualidade",
                "desc": "Uma criatura que sofra dano de trevas de uma azagaia de um membro da Legião não pode recuperar PV por 1d4 rodadas."
            },
            {
                "nome": "Pela XIII",
                "tipo": "Livre",
                "desc": "Pode executar uma ação padrão adicional em seu primeiro turno de combate."
            },
            {
                "nome": "Lembrança Vergonhosa",
                "tipo": "Qualidade",
                "desc": "Se estiver em alcance curto de uma área de Tormenta, de criaturas da Tormenta ou de devotos de Aharadak, fica abalado."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Azagaia x3, escudo pesado, gládio certeiro, loriga segmentada reforçada",
        "observacao": "Maldição da Legio Precita: membros derrotados retornam na noite seguinte à sua morte."
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "fortificação 50%, imunidade a efeitos mentais e encantamento, redução de dano 10, redução de corte, frio e perfuração 5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+24"
            },
            {
                "nome": "Guerra",
                "valor": "+20"
            },
            {
                "nome": "Intimidação",
                "valor": "+19"
            },
            {
                "nome": "Nobreza",
                "valor": "+20"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+16"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Saedius Caecilianus, Legado da XIII",
        "tipo": "Morto-vivo Médio",
        "nd": "16",
        "iniciativa": "+16",
        "percepcao": "+16",
        "defesa": "54",
        "fort": "+30",
        "ref": "+17",
        "von": "+23",
        "pv": "1200",
        "desl": "6m (4q)",
        "atributos": {
            "for": "8",
            "des": "0",
            "con": "4",
            "int": "4",
            "sab": "0",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Gládio x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+48",
                "dano": "2d12+22",
                "desc": "19/x3, mais 4d8 de trevas."
            },
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+46",
                "dano": "2d12+20",
                "desc": "Mais 4d8 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Bloqueio com Escudo",
                "tipo": "Reação",
                "desc": "Quando sofre dano pela primeira vez em cada rodada, recebe redução de dano 20 contra esse dano. Só pode usar se estiver empunhando um escudo."
            },
            {
                "nome": "Falange",
                "tipo": "Movimento",
                "desc": "Se estiver usando um escudo e adjacente a um aliado com esta habilidade, pode formar uma falange com ele. Enquanto adjacentes, os participantes da falange recebem +2 na Defesa e em testes de resistência."
            },
            {
                "nome": "Gládio Sanguinário",
                "tipo": "Qualidade",
                "desc": "Uma criatura viva atingida pelo gládio fica sangrando. A perda de PV é cumulativa: uma criatura atingida duas vezes perde 2d6 PV por rodada por sangramento."
            },
            {
                "nome": "Legado Condenado",
                "tipo": "Qualidade",
                "desc": "Emana uma aura de energia negativa de 30m de raio. Dentro dela, dano de trevas e PV curados por trevas são maximizados e, quando um membro da Legião faz um teste, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Resoluto",
                "tipo": "Livre",
                "desc": "Uma vez por rodada, refaz um teste de resistência contra uma condição (como enfeitiçado, paralisado etc.) que o esteja afetando. O segundo teste recebe +5 e, se passar, cancela o efeito. Só pode usar esta habilidade uma vez por efeito."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Azagaia x3, escudo pesado, gládio certeiro formidável sanguinário, loriga segmentada reforçada defensora fortificada",
        "observacao": "Maldição da Legio Precita: derrotado, retorna na noite seguinte à sua morte."
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a ácido, eletricidade e fogo, redução de dano 5, resistência a movimento +5",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Limpa-túneis",
        "tipo": "Construto Grande",
        "nd": "9",
        "iniciativa": "+8",
        "percepcao": "+8",
        "defesa": "34",
        "fort": "+21",
        "ref": "+9",
        "von": "+15",
        "pv": "380",
        "desl": "6m (4q), sem redução por terreno difícil",
        "atributos": {
            "for": "7",
            "des": "0",
            "con": "6",
            "int": "—",
            "sab": "0",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Perfuratriz",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "4d12+10",
                "desc": "Perfuração."
            },
            {
                "nome": "Serra giratória",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "6d8+10",
                "desc": "Corte."
            }
        ],
        "habilidades": [
            {
                "nome": "Arsenal de Limpeza",
                "tipo": "Qualidade",
                "desc": "As armas ignoram até 10 pontos da redução de dano de criaturas e objetos. Uma criatura atingida pela perfuratriz fica sangrando e uma criatura atingida pela serra giratória sofre +1d8 de dano para cada resultado 8 nos dados de dano da arma."
            },
            {
                "nome": "Atropelamento",
                "tipo": "Completa",
                "desc": "Percorre até o dobro do deslocamento, podendo passar pelo espaço de inimigos menores, mas sem repetir espaço. Criaturas atropeladas sofrem 4d12+10 de impacto, ficam caídas (Ref CD 28 reduz à metade e evita a condição) e são empurradas até o fim do movimento. Recarga (movimento)."
            },
            {
                "nome": "Placa Frontal",
                "tipo": "Qualidade",
                "desc": "A placa frontal forma uma parede de 3m de lado que oferece camuflagem total para ele. A parede só pode ser transposta por criaturas incorpóreas ou Minúsculas."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "imunidade a surpreendido, redução de dano 5/mitral",
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+4 (+9 com lobos)"
            },
            {
                "nome": "Atletismo",
                "valor": "+11"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+7"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Lobisomem Bárbaro",
        "tipo": "Humanoide (humano) Médio",
        "nd": "5",
        "iniciativa": "+5",
        "percepcao": "+7",
        "defesa": "25",
        "fort": "+17",
        "ref": "+11",
        "von": "+5",
        "pv": "240",
        "desl": "12m (8q)",
        "atributos": {
            "for": "5",
            "des": "1",
            "con": "5",
            "int": "-1",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Machado de batalha (Humanoide)",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "2d12+12",
                "desc": "x3."
            },
            {
                "nome": "Machado de batalha (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "2d12+14",
                "desc": "x3."
            },
            {
                "nome": "Garra (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "2d6+8",
                "desc": "Pode atacar com duas garras em vez de machado + garra."
            },
            {
                "nome": "Mordida (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "2d6+8",
                "desc": ""
            },
            {
                "nome": "Mordida (Lobo)",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "2d6+6",
                "desc": ""
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
                "desc": "Um humanoide que sofra dano da mordida do lobisomem contrai licantropia (Fort CD 22 evita; veja Licantropia)."
            },
            {
                "nome": "Fúria",
                "tipo": "Livre",
                "desc": "Uma vez por cena, entra em fúria: +2 em testes de ataque e rolagens de dano, mas não pode fazer ações que exijam calma e concentração (como Furtividade). A fúria termina se, ao fim da rodada, não tiver atacado nem sido alvo de um efeito hostil."
            },
            {
                "nome": "Mudança de Forma",
                "tipo": "Completa",
                "desc": "Muda de forma entre humanoide, híbrida ou lobo (as estatísticas padrão são para humanoide). Forma Híbrida: +2 em Força (já contabilizado nos ataques) e usa os ataques híbridos. Forma de Lobo: +2 em Força (já contabilizado nos ataques), deslocamento 15m e usa os ataques de lobo; ao acertar a mordida, pode fazer a manobra derrubar (teste +18) como ação livre."
            },
            {
                "nome": "Aversão a Mitral",
                "tipo": "Qualidade",
                "desc": "O lobisomem bárbaro sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Machado de batalha"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "imunidade a encantamento, redução de dano 10/mitral",
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+15 (+20 com lobos)"
            },
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Diplomacia",
                "valor": "+19"
            },
            {
                "nome": "Enganação",
                "valor": "+17"
            },
            {
                "nome": "Intimidação",
                "valor": "+17"
            },
            {
                "nome": "Intuição",
                "valor": "+10"
            },
            {
                "nome": "Nobreza",
                "valor": "+14"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Lobisomem Fidalgo",
        "tipo": "Humanoide (humano) Médio",
        "nd": "13",
        "iniciativa": "+12",
        "percepcao": "+12",
        "defesa": "45",
        "fort": "+13",
        "ref": "+26",
        "von": "+20",
        "pv": "590",
        "desl": "12m (8q)",
        "atributos": {
            "for": "3",
            "des": "2",
            "con": "3",
            "int": "2",
            "sab": "0",
            "car": "5"
        },
        "ataques": [
            {
                "nome": "Espada bastarda x2 (Humanoide)",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "4d10+16",
                "desc": "19."
            },
            {
                "nome": "Espada bastarda x2 (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+38",
                "dano": "4d10+18",
                "desc": "19."
            },
            {
                "nome": "Garra (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+38",
                "dano": "3d12+18",
                "desc": "Pode atacar com duas garras em vez de espada + garra."
            },
            {
                "nome": "Mordida (Híbrida)",
                "tipo": "Corpo a Corpo",
                "bonus": "+38",
                "dano": "3d12+18",
                "desc": ""
            },
            {
                "nome": "Mordida (Lobo)",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "3d12+16",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Empatia com Lobos",
                "tipo": "Qualidade",
                "desc": "Pode usar Adestramento para mudar atitude e persuasão com lobos e lobos-das-cavernas."
            },
            {
                "nome": "Jogo da Corte",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de Diplomacia, Intuição ou Nobreza, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Maldição da Licantropia",
                "tipo": "Qualidade",
                "desc": "Um humanoide que sofra dano da mordida do lobisomem contrai licantropia (Fort CD 35 evita; veja Licantropia)."
            },
            {
                "nome": "Mudança de Forma",
                "tipo": "Completa",
                "desc": "Muda de forma entre humanoide, híbrida ou lobo (as estatísticas padrão são para humanoide). Forma Híbrida: +2 em Força (já contabilizado nos ataques) e usa os ataques híbridos. Forma de Lobo: +2 em Força (já contabilizado nos ataques), deslocamento 15m e usa os ataques de lobo; ao acertar a mordida, pode fazer a manobra derrubar (teste +36) como ação livre."
            },
            {
                "nome": "Orgulho",
                "tipo": "Reação",
                "desc": "Uma vez por cena, ao fazer um teste de perícia, soma o dobro do Carisma (+10) nesse teste."
            },
            {
                "nome": "Uivo Afiado",
                "tipo": "Reação",
                "desc": "Ao assumir a forma de lobo ou híbrida, faz um teste de Intimidação oposto ao teste de Vontade de cada inimigo em alcance médio. Se vencer, causa 6d8 de dano psíquico não letal à criatura; se perder, causa metade. Se uma criatura for reduzida a 0 PV ou menos, em vez de cair inconsciente fica apavorada e foge da maneira mais eficiente possível."
            },
            {
                "nome": "Aversão a Mitral",
                "tipo": "Qualidade",
                "desc": "O lobisomem fidalgo sofre 1 ponto de dano adicional por dado de dano de ataques com armas de mitral e perde 1d6 PV por rodada se estiver empunhando ou vestindo um item de mitral."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Couraça banhada a ouro, espada bastarda de batalha certeira"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de impacto e frio 5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Furtividade",
                "valor": "+4"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Lula-Gigante",
        "tipo": "Animal Enorme",
        "nd": "7",
        "iniciativa": "+9",
        "percepcao": "+8",
        "defesa": "27",
        "fort": "+20",
        "ref": "+14",
        "von": "+7",
        "pv": "290",
        "desl": "6m (4q), natação 18m (12q)",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "2",
            "int": "-5",
            "sab": "1",
            "car": "-3"
        },
        "ataques": [
            {
                "nome": "Quatro tentáculos",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d8+9",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Tentáculo (teste +31)."
            },
            {
                "nome": "Bicada",
                "tipo": "Movimento",
                "desc": "Uma vez por rodada, morde uma criatura que esteja agarrando, causando 2d6+5 de corte."
            },
            {
                "nome": "Constrição",
                "tipo": "Livre",
                "desc": "No início de cada turno dela, causa 4d8+9 de impacto em cada criatura que estiver agarrando."
            },
            {
                "nome": "Nuvem de Tinta",
                "tipo": "Movimento",
                "desc": "Expele uma nuvem de tinta em um cone de 18m. Dentro dela, criaturas a até 1,5m têm camuflagem leve e criaturas a partir de 3m têm camuflagem total, e todas as criaturas têm o deslocamento reduzido para 3m e sofrem -5 em testes de ataque e rolagens de dano. A lula é imune aos efeitos da nuvem. Recarga (movimento)."
            },
            {
                "nome": "Decápode",
                "tipo": "Qualidade",
                "desc": "Tem dez tentáculos, mas só ataca com quatro por rodada. Fora d'água (em terra firme ou abordando uma embarcação, por exemplo), usa os demais para locomoção. Completamente dentro d'água, pode usá-los para manter criaturas adicionais agarradas (até dez criaturas agarradas)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "",
        "defesaObs": "redução de dano 5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+16"
            },
            {
                "nome": "Intimidação",
                "valor": "+16"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+10"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Manotauro Selvagem",
        "tipo": "Humanoide (manotauro) Grande",
        "nd": "12",
        "iniciativa": "+11",
        "percepcao": "+12",
        "defesa": "43",
        "fort": "+26",
        "ref": "+12",
        "von": "+20",
        "pv": "600",
        "desl": "12m (8q)",
        "atributos": {
            "for": "6",
            "des": "1",
            "con": "3",
            "int": "-1",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "2d10+25",
                "desc": "x3."
            },
            {
                "nome": "Machado de guerra",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "4d12+25",
                "desc": "x4."
            },
            {
                "nome": "Cascos",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "2d10+25",
                "desc": "x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Chifrada Revidante",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, quando sofre dano de um ataque corpo a corpo enquanto está em fúria, faz um ataque de chifres contra a criatura que o atacou."
            },
            {
                "nome": "Fúria Táurica",
                "tipo": "Livre",
                "desc": "Uma vez por cena, entra em fúria: +4 em testes de ataque e rolagens de dano corpo a corpo e, quando um ataque excede a Defesa do alvo por 5 ou mais, causa dois dados extras de dano do mesmo tipo. Não pode fazer ações que exijam calma e concentração (como Furtividade). A fúria termina se, ao fim da rodada, não tiver atacado nem sido alvo de um efeito hostil."
            },
            {
                "nome": "Sede Sanguinária",
                "tipo": "Qualidade",
                "desc": "Enquanto em fúria, ao fazer um acerto crítico ou reduzir um inimigo a 0 PV ou menos, recupera 10 PV e recebe um bônus cumulativo de +2 em testes de ataque e rolagens de dano (limitado pelo nível dele) até o fim da cena."
            },
            {
                "nome": "Medo de Altura",
                "tipo": "Qualidade",
                "desc": "Se estiver adjacente a uma queda de 3m ou mais de altura, fica abalado."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Machado de guerra aumentado cruel"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "imunidade a encantamento e trevas, redução de dano 5/adamante, resistência a magia +2",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+11"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+10 (+20 para rastrear)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Mastim-das-Sombras",
        "tipo": "Espírito Médio",
        "nd": "7",
        "iniciativa": "+8",
        "percepcao": "+9",
        "defesa": "30",
        "fort": "+18",
        "ref": "+9",
        "von": "+14",
        "pv": "270",
        "desl": "15m (10q)",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "3",
            "int": "-3",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+25",
                "dano": "4d8+20",
                "desc": "Mais 6d6 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Derrubar",
                "tipo": "Livre",
                "desc": "Se acerta um ataque de mordida, pode fazer a manobra derrubar (teste +25)."
            },
            {
                "nome": "Faro Supremo",
                "tipo": "Qualidade",
                "desc": "Faro tido como o melhor de Arton e dos mundos divinos. Fareja qualquer coisa, de criaturas a objetos e emoções, com alcance ilimitado no mesmo Plano. Quando lhe apresentam uma referência, pode rastrear o que quer que seja, desde que esteja no mesmo Plano (por exemplo, farejar um chapéu e ir atrás do dono)."
            },
            {
                "nome": "Pelagem Tenebrosa",
                "tipo": "Qualidade",
                "desc": "Enquanto recebe camuflagem por escuridão, a chance de falha contra ele aumenta em 10% (30% para camuflagem leve e 60% para camuflagem total)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de dano 20/mágico",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+23"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+11"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Mecanófago",
        "tipo": "Construto Enorme",
        "nd": "14",
        "iniciativa": "+11",
        "percepcao": "+11",
        "defesa": "46",
        "fort": "+28",
        "ref": "+14",
        "von": "+22",
        "pv": "700",
        "desl": "9m (6q)",
        "atributos": {
            "for": "12",
            "des": "0",
            "con": "9",
            "int": "—",
            "sab": "0",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Duas pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+39",
                "dano": "4d10+8",
                "desc": "Mais 6d8 de eletricidade."
            }
        ],
        "habilidades": [
            {
                "nome": "Assimilar Armamento",
                "tipo": "Movimento",
                "desc": "Se começar o turno empunhando uma arma, a assimila: soma o dano e as habilidades da arma a uma de suas pancadas (cada pancada pode ter até três armas assimiladas). Uma arma assimilada só pode ser recuperada com a destruição do mecanófago."
            },
            {
                "nome": "Caçador de Mecanismos",
                "tipo": "Qualidade",
                "desc": "Recebe +5 em testes contra construtos e engenhocas."
            },
            {
                "nome": "Desarmar",
                "tipo": "Livre",
                "desc": "Pancada (teste +44)."
            },
            {
                "nome": "Onda Despedaçadora",
                "tipo": "Padrão",
                "desc": "Emite uma onda sonora em um cone de 18m. Criaturas na área sofrem 8d8+16 de impacto e ficam atordoadas; construtos e objetos mundanos Médios ou menores sofrem o dobro desse dano sem aplicar redução de dano (Fort CD 38 reduz o dano à metade e evita a condição). Uma criatura só pode ser atordoada por esta habilidade uma vez por cena. Recarga (movimento)."
            },
            {
                "nome": "Saquear Construto",
                "tipo": "Padrão",
                "desc": "Se começar o turno adjacente a um construto atordoado, inconsciente, morto ou pasmo, saqueia uma de suas partes. O construto perde 6d10+12 PV e fica fraco, mesmo que seja imune a esta condição (condições cumulativas; Fort CD 38 reduz a perda de vida à metade e evita a condição). O mecanófago recebe PV temporários cumulativos iguais aos PV perdidos pelo construto e, para cada condição causada, um bônus cumulativo de +2 em testes até o fim da cena."
            }
        ],
        "tesouro": "Destroços recicláveis (CD 29, valem T$ 3.000 para fabricar armas e armaduras superiores)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Cura",
                "valor": "+20"
            },
            {
                "nome": "Intuição",
                "valor": "+12"
            },
            {
                "nome": "Ofício (alquimista)",
                "valor": "+10"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Medicômato Enlouquecido",
        "tipo": "Construto Médio",
        "nd": "12",
        "iniciativa": "+11",
        "percepcao": "+12",
        "defesa": "39",
        "fort": "+26",
        "ref": "+12",
        "von": "+20",
        "pv": "380",
        "desl": "9m (6q)",
        "atributos": {
            "for": "2",
            "des": "1",
            "con": "3",
            "int": "0",
            "sab": "2",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Bisturi x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d8+13",
                "desc": "Corte."
            },
            {
                "nome": "Seringa",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "5d4+13",
                "desc": "Perfuração."
            }
        ],
        "habilidades": [
            {
                "nome": "Conhecimento Anatômico",
                "tipo": "Qualidade",
                "desc": "Os ataques corpo a corpo causam +5d6 de dano em animais, monstros e humanoides."
            },
            {
                "nome": "Farmacologia Insana",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida pela seringa é inoculada com um preparado alquímico que ferve seu sangue. Ao ser atingida, e no início de cada turno dela, sofre 6d8 de fogo e fica enjoada por 1 rodada (Fort CD 35 reduz o dano à metade e evita a condição). Se passar em dois testes de Fortitude seguidos, o efeito se encerra. Se for reduzida a 0 PV por esse dano, seu corpo explode, matando-a e causando 8d6 de fogo em todas as criaturas a até 3m (Ref CD 35 reduz à metade). Não afeta criaturas sem sangue, como construtos ou mortos-vivos."
            },
            {
                "nome": "Incisão Precisa",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida pelo bisturi fica sangrando. Se já estiver sangrando, a perda de vida pelo sangramento aumenta em um passo cumulativo (de d6 para d8 e de d8 para d10, por exemplo)."
            },
            {
                "nome": "Intervenção Emergencial",
                "tipo": "Qualidade",
                "desc": "Se acerta o ataque de bisturi e o ataque de seringa na mesma criatura na mesma rodada, faz um teste de Cura. A vítima perde PV iguais ao resultado desse teste e fica vulnerável."
            }
        ],
        "tesouro": "Instrumentos cirúrgicos (CD 27, equivalem a uma maleta de medicamentos aprimorada) mais 2d4 bálsamos restauradores"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "fortificação 50%, imunidade a veneno",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Escorpião-de-Megalon",
        "tipo": "Monstro Grande",
        "nd": "3",
        "iniciativa": "+5",
        "percepcao": "+6",
        "defesa": "22",
        "fort": "+15",
        "ref": "+9",
        "von": "+3",
        "pv": "108",
        "desl": "12m (8q), escalada 12m (8q)",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "4",
            "int": "-5",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Pinças",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d6+6",
                "desc": ""
            },
            {
                "nome": "Ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d10+3",
                "desc": "Mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Pinças (teste +16)."
            },
            {
                "nome": "Ferroada Instintiva",
                "tipo": "Reação",
                "desc": "Na primeira vez em cada cena em que é atingido por um ataque corpo a corpo, faz um ataque de ferrão contra o atacante, com +5 no teste de ataque."
            },
            {
                "nome": "Incontrolável",
                "tipo": "Qualidade",
                "desc": "É imune a encantamento, medo e efeitos mentais. Se sofrer um efeito desse tipo, entra em fúria até o fim da cena: +2 em testes de ataque e rolagens de dano e imunidade a dano psíquico."
            },
            {
                "nome": "Pressionar",
                "tipo": "Livre",
                "desc": "No início de cada turno dele, causa 4d6+10 de corte na criatura que estiver agarrando com as pinças. Sempre que rolar o resultado máximo em um desses dados, rola um dado extra, repetindo o processo a cada resultado máximo."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha comum (perde 1d12 PV, Fort CD 17 evita)."
            }
        ],
        "tesouro": "1d4+1 doses de peçonha comum (CD 18 para extrair)"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "redução de corte e frio 10",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+15"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Mastim-de-Megalon",
        "tipo": "Monstro Grande",
        "nd": "7",
        "iniciativa": "+10",
        "percepcao": "+11",
        "defesa": "30",
        "fort": "+20",
        "ref": "+14",
        "von": "+7",
        "pv": "290",
        "desl": "15m (10q)",
        "atributos": {
            "for": "6",
            "des": "3",
            "con": "6",
            "int": "-4",
            "sab": "2",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "5d12+30",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +28)."
            },
            {
                "nome": "Incontrolável",
                "tipo": "Qualidade",
                "desc": "É imune a encantamento, medo e efeitos mentais. Se sofrer um efeito desse tipo, entra em fúria até o fim da cena: +3 em testes de ataque e rolagens de dano e imunidade a dano psíquico."
            },
            {
                "nome": "Latido Aterrador",
                "tipo": "Livre",
                "desc": "No primeiro turno de combate, emite um latido assustador. Cada criatura em alcance médio capaz de ouvi-lo fica abalada por 1d4 rodadas (Von CD 24 evita)."
            },
            {
                "nome": "Pele Solta",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste para resistir a uma condição de movimento (incluindo ser agarrado), rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Sacudir",
                "tipo": "Livre",
                "desc": "No início de cada turno dele, causa 10d12+30 de corte na criatura que estiver agarrando e a deixa atordoada (Fort CD 24 evita a condição; uma criatura só pode ser atordoada por esta habilidade uma vez por cena)."
            }
        ],
        "tesouro": "Padrão mais glândula salivar (CD 22 para extrair, vale T$ 360 para fabricar poções de magias de transmutação)"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "cura acelerada 10, fortificação 25%, redução de dano 15, redução de ácido e eletricidade 10",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+29"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Lagarto-de-Megalon",
        "tipo": "Monstro Colossal",
        "nd": "16",
        "iniciativa": "+17",
        "percepcao": "+12",
        "defesa": "53",
        "fort": "+30",
        "ref": "+24",
        "von": "+16",
        "pv": "820",
        "desl": "15m (10q), escalada 9m (6q), natação 12m (8q)",
        "atributos": {
            "for": "13",
            "des": "3",
            "con": "8",
            "int": "-5",
            "sab": "2",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+46",
                "dano": "6d12+30",
                "desc": "Mais 6d12 de ácido."
            },
            {
                "nome": "Cauda",
                "tipo": "Corpo a Corpo",
                "bonus": "+46",
                "dano": "4d12+30",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +51)."
            },
            {
                "nome": "Engolir",
                "tipo": "Livre",
                "desc": "No início de cada turno dele, a criatura engolida sofre 2d12+15 de impacto mais 2d12+15 de ácido. Ela escapa causando um total de 100 pontos de dano a ele (Defesa 20, redução de dano 0)."
            },
            {
                "nome": "Incontrolável",
                "tipo": "Qualidade",
                "desc": "É imune a encantamento, medo e efeitos mentais. Se sofrer um efeito desse tipo, entra em fúria até o fim da cena: +5 em testes de ataque e rolagens de dano e imunidade a dano psíquico."
            },
            {
                "nome": "Sopro Corrosivo",
                "tipo": "Padrão",
                "desc": "Todas as criaturas em um cone de 12m sofrem 5d20 de ácido e ficam vulneráveis (Ref CD 42 reduz o dano à metade e evita a condição). Recarga (movimento)."
            },
            {
                "nome": "Varrida de Cauda",
                "tipo": "Qualidade",
                "desc": "Os ataques de cauda atingem todas as criaturas em um cone de 6m (para cada ataque, faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área)."
            }
        ],
        "tesouro": "Padrão mais glândula salivar monstruosa (CD 31 para extrair, vale T$ 2.560 para fabricar poções de magias de transmutação)"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, percepção às cegas (médio), visão no escuro",
        "defesaObs": "redução de dano 10",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+26"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Megapeia",
        "tipo": "Monstro Colossal",
        "nd": "16",
        "iniciativa": "+16",
        "percepcao": "+16",
        "defesa": "52",
        "fort": "+30",
        "ref": "+24",
        "von": "+16",
        "pv": "800",
        "desl": "18m (12q), sem redução por terreno difícil",
        "atributos": {
            "for": "7",
            "des": "2",
            "con": "4",
            "int": "-5",
            "sab": "2",
            "car": "-4"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+47",
                "dano": "6d20+40",
                "desc": "Mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Atropelamento",
                "tipo": "Completa",
                "desc": "Percorre até o dobro do deslocamento, podendo passar pelo espaço de inimigos menores, mas sem repetir espaço. Criaturas atropeladas sofrem 4d20+25 de impacto e ficam caídas (Ref CD 42 reduz à metade e evita a condição). Recarga (movimento)."
            },
            {
                "nome": "Mil Pernas",
                "tipo": "Qualidade",
                "desc": "Recebe +10 em testes contra efeitos que tentem derrubá-la ou empurrá-la."
            },
            {
                "nome": "Quelíceras Alongadas",
                "tipo": "Qualidade",
                "desc": "A mordida ignora 10 pontos da redução de dano dos alvos e atinge todas as criaturas em um quadrado de 4,5m (para cada ataque, faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área)."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Duas doses de peçonha potente (para cada dose, perde 2d12 PV por rodada durante 3 rodadas, Fort CD 42 reduz para 1 rodada)."
            }
        ],
        "tesouro": "Padrão, mais 2d4 doses de peçonha potente (CD 31 para extrair)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "evasão, resistência a veneno +5",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+11"
            },
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Enganação",
                "valor": "+11"
            },
            {
                "nome": "Furtividade",
                "valor": "+11"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Nagah Pugilista",
        "tipo": "Humanoide (nagah) Médio",
        "nd": "9",
        "iniciativa": "+11",
        "percepcao": "+11",
        "defesa": "34",
        "fort": "+12",
        "ref": "+18",
        "von": "+15",
        "pv": "230",
        "desl": "12m (8q)",
        "atributos": {
            "for": "5",
            "des": "3",
            "con": "2",
            "int": "0",
            "sab": "3",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Pancada x4",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "1d6+8",
                "desc": "19/x3."
            },
            {
                "nome": "Cauda",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "1d6+8",
                "desc": "19/x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Derrubar",
                "tipo": "Livre",
                "desc": "Se acerta um ataque de cauda, pode fazer a manobra derrubar (teste +27)."
            },
            {
                "nome": "Esquiva Elusiva",
                "tipo": "Reação",
                "desc": "Quando é atingido por um ataque, faz um teste de Enganação e subtrai o resultado do dano causado pelo ataque. Pode usar duas vezes por rodada, mas só uma vez contra o mesmo ataque."
            },
            {
                "nome": "Inocência Dissimulada",
                "tipo": "Qualidade",
                "desc": "Uma vez por cena, pode substituir um teste de perícia por um teste de Enganação."
            },
            {
                "nome": "Sequência Avassaladora",
                "tipo": "Qualidade",
                "desc": "Para cada ataque de pancada que acerta em uma criatura, aumenta em +1d6 o dano dos próximos ataques de pancada contra ela neste turno. Se acertar quatro ataques de pancada na mesma criatura no mesmo turno, deixa essa criatura fraca."
            },
            {
                "nome": "Fraquezas Ofídicas",
                "tipo": "Qualidade",
                "desc": "Sofre 1 ponto de dano adicional por dado de dano de frio e -5 em testes de resistência contra Músicas de bardo."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a efeitos mentais e de movimento, incorpóreo",
        "pericias": [
            {
                "nome": "Intimidação",
                "valor": "+17"
            },
            {
                "nome": "Pilotagem",
                "valor": "+23"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Barcaça de Mercadores Rancorosos",
        "tipo": "Morto-vivo Enorme",
        "nd": "12",
        "iniciativa": "+13",
        "percepcao": "+15",
        "defesa": "41",
        "fort": "+12",
        "ref": "+20",
        "von": "+26",
        "pv": "—",
        "desl": "natação 12m (8q)",
        "atributos": {
            "for": "—",
            "des": "3",
            "con": "1",
            "int": "2",
            "sab": "3",
            "car": "5"
        },
        "ataques": [
            {
                "nome": "Balestra",
                "tipo": "À Distância",
                "bonus": "+34",
                "dano": "3d12+15 trevas",
                "desc": "Mais 3d12+15 de frio, x3, alcance longo."
            }
        ],
        "habilidades": [
            {
                "nome": "Abordagem Apavorante",
                "tipo": "Livre",
                "desc": "Na primeira vez em cada cena em que o navio usa Tripulação Fantasmagórica, cada criatura capaz de ver os capangas fica abalada (Von CD 35 evita). Se falhar por 5 ou mais, fica apavorada e, se falhar por 10 ou mais, também envelhece 2d4 anos. Medo."
            },
            {
                "nome": "Atropelamento Etéreo",
                "tipo": "Completa",
                "desc": "Percorre até o dobro do deslocamento, podendo passar pelo espaço de outras embarcações e de inimigos menores, mas sem repetir espaço. Criaturas atropeladas sofrem 6d6 de trevas mais 6d6 de frio e ficam pasmas (Fort CD 35 reduz à metade e evita a condição). Uma criatura só pode ficar pasma por esta habilidade uma vez por cena. Recarga (movimento)."
            },
            {
                "nome": "Desprezo pela Prosperidade",
                "tipo": "Qualidade",
                "desc": "Por cada item superior ou mágico que um personagem esteja vestindo ou empunhando, ele sofre +1d4 de dano da barcaça e de seus capangas."
            },
            {
                "nome": "Drenar Vida",
                "tipo": "Qualidade",
                "desc": "Uma criatura que sofra dano de trevas do navio (mas não da tripulação) tem os PV máximos reduzidos em 10 por 1 dia, cumulativamente (Fort CD 35 evita). Se os PV máximos chegarem a 0, fica inconsciente até serem restabelecidos."
            },
            {
                "nome": "Memento",
                "tipo": "Qualidade",
                "desc": "Embora a tripulação possa sofrer dano, o navio em si é imune a dano e perda de vida. Se toda a tripulação fantasmagórica for derrotada, ele desaparece e ressurge 1d4 dias depois. Só é derrotado em definitivo concluindo o assunto que o prende a este mundo (purificar seus destroços, entregar sua carga perdida, concluir uma missão interrompida), e então é destruído automaticamente."
            },
            {
                "nome": "Nau Etérea",
                "tipo": "Qualidade",
                "desc": "Só se desloca pela superfície da água, mas não é afetado por condições climáticas ou por terreno aquático difícil."
            },
            {
                "nome": "Tripulação Fantasmagórica",
                "tipo": "Livre",
                "desc": "Uma vez por rodada, se estiver adjacente a uma embarcação, invoca capangas em espaços desocupados em alcance curto: 1d6+2 capangas mercadores rancorosos (15 capangas por cena). Cada mercador é um morto-vivo incorpóreo com deslocamento 9m, Defesa 35, 80 PV e dano 2d8+3 de trevas. Agem a partir da próxima rodada do navio, gastam uma ação padrão para causar o dano listado e usam as estatísticas do navio para seus testes opostos e de resistência."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a efeitos mentais e de movimento, incorpóreo",
        "pericias": [
            {
                "nome": "Intimidação",
                "valor": "+21"
            },
            {
                "nome": "Pilotagem",
                "valor": "+25"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Veleiro de Piratas Condenados",
        "tipo": "Morto-vivo Colossal",
        "nd": "15",
        "iniciativa": "+15",
        "percepcao": "+19",
        "defesa": "48",
        "fort": "+22",
        "ref": "+15",
        "von": "+28",
        "pv": "—",
        "desl": "natação 15m (10q)",
        "atributos": {
            "for": "—",
            "des": "2",
            "con": "3",
            "int": "3",
            "sab": "4",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Canhão",
                "tipo": "À Distância",
                "bonus": "+41",
                "dano": "4d12+15 trevas",
                "desc": "Mais 4d12+15 de frio, 19/x3, alcance longo."
            }
        ],
        "habilidades": [
            {
                "nome": "Abordagem Apavorante",
                "tipo": "Livre",
                "desc": "Na primeira vez em cada cena em que o navio usa Tripulação Fantasmagórica, cada criatura capaz de ver os capangas fica abalada (Von CD 42 evita). Se falhar por 5 ou mais, fica apavorada e, se falhar por 10 ou mais, também envelhece 2d4 anos. Medo."
            },
            {
                "nome": "Atropelamento Etéreo",
                "tipo": "Completa",
                "desc": "Percorre até o dobro do deslocamento, podendo passar pelo espaço de outras embarcações e de inimigos menores, mas sem repetir espaço. Criaturas atropeladas sofrem 8d6 de trevas mais 8d6 de frio e ficam pasmas (Fort CD 42 reduz à metade e evita a condição). Uma criatura só pode ficar pasma por esta habilidade uma vez por cena. Recarga (movimento)."
            },
            {
                "nome": "Trespassar Alma",
                "tipo": "Qualidade",
                "desc": "Quando uma criatura sofre dano de trevas do canhão, sua alma é momentaneamente arrancada do corpo. Fica atordoada por 1 rodada e perde 2d8 PM; se já foi atordoada por esta habilidade na cena, em vez disso fica debilitada por 1 rodada (Von CD 42 reduz a perda à metade e evita a condição)."
            },
            {
                "nome": "Drenar Vida",
                "tipo": "Qualidade",
                "desc": "Uma criatura que sofra dano de trevas do navio (mas não da tripulação) tem os PV máximos reduzidos em 10 por 1 dia, cumulativamente (Fort CD 42 evita). Se os PV máximos chegarem a 0, fica inconsciente até serem restabelecidos."
            },
            {
                "nome": "Memento",
                "tipo": "Qualidade",
                "desc": "Embora a tripulação possa sofrer dano, o navio em si é imune a dano e perda de vida. Se toda a tripulação fantasmagórica for derrotada, ele desaparece e ressurge 1d4 dias depois. Só é derrotado em definitivo concluindo o assunto que o prende a este mundo (purificar seus destroços, entregar sua carga perdida, concluir uma missão interrompida), e então é destruído automaticamente."
            },
            {
                "nome": "Nau Etérea",
                "tipo": "Qualidade",
                "desc": "Só se desloca pela superfície da água, mas não é afetado por condições climáticas ou por terreno aquático difícil."
            },
            {
                "nome": "Tripulação Fantasmagórica",
                "tipo": "Livre",
                "desc": "Uma vez por rodada, se estiver adjacente a uma embarcação, invoca capangas em espaços desocupados em alcance curto: 2d4+2 capangas piratas condenados (20 capangas por cena). Cada pirata é um morto-vivo incorpóreo com deslocamento 9m, Defesa 43, 120 PV e dano 3d8+5 de trevas. Agem a partir da próxima rodada do navio, gastam uma ação padrão para causar o dano listado e usam as estatísticas do navio para seus testes opostos e de resistência."
            }
        ],
        "tesouro": "Dobro"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a efeitos mentais e de movimento, incorpóreo",
        "pericias": [
            {
                "nome": "Intimidação",
                "valor": "+26"
            },
            {
                "nome": "Pilotagem",
                "valor": "+30"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "O Profano",
        "tipo": "Morto-vivo Colossal",
        "nd": "S",
        "iniciativa": "+17",
        "percepcao": "+21",
        "defesa": "63",
        "fort": "+22",
        "ref": "+30",
        "von": "+36",
        "pv": "—",
        "desl": "natação 18m (12q)",
        "atributos": {
            "for": "—",
            "des": "1",
            "con": "4",
            "int": "4",
            "sab": "3",
            "car": "8"
        },
        "ataques": [
            {
                "nome": "Dois canhões",
                "tipo": "À Distância",
                "bonus": "+55",
                "dano": "4d12+15 trevas",
                "desc": "Mais 4d12+15 de frio, 19/x3, alcance longo."
            }
        ],
        "habilidades": [
            {
                "nome": "Abordagem Apavorante",
                "tipo": "Livre",
                "desc": "Na primeira vez em cada cena em que o navio usa Tripulação Fantasmagórica, cada criatura capaz de ver os capangas fica abalada (Von CD 55 evita). Se falhar por 5 ou mais, fica apavorada e, se falhar por 10 ou mais, também envelhece 2d4 anos. Medo."
            },
            {
                "nome": "Atropelamento Etéreo",
                "tipo": "Completa",
                "desc": "Percorre até o dobro do deslocamento, podendo passar pelo espaço de outras embarcações e de inimigos menores, mas sem repetir espaço. Criaturas atropeladas sofrem 8d12 de trevas mais 8d12 de frio e ficam pasmas (Fort CD 55 reduz à metade e evita a condição). Uma criatura só pode ficar pasma por esta habilidade uma vez por cena. Recarga (movimento)."
            },
            {
                "nome": "Capitão Filork Olho Vivo",
                "tipo": "Reação",
                "desc": "Quando pelo menos 20 capangas marujos hynne são invocados pelo Profano, o Capitão Filork surge em um espaço desocupado em alcance curto. Age como um capanga marujo hynne, mas tem Defesa 58, 220 PV e dano 3d12+5 de trevas mais 3d12+5 de frio."
            },
            {
                "nome": "Lamento dos Refugiados",
                "tipo": "Reação",
                "desc": "Quando 15 capangas marujos hynne do Profano são destruídos, um coro de espíritos dos refugiados emite uma violenta aura de energia negativa de 30m de raio. Cada criatura que comece o turno nessa área sofre 5d12 de trevas e 5d12 de dano psíquico e fica debilitada e esmorecida (Von CD 55 reduz para fraca e frustrada)."
            },
            {
                "nome": "Trespassar Alma",
                "tipo": "Qualidade",
                "desc": "Quando uma criatura sofre dano de trevas do canhão, sua alma é momentaneamente arrancada do corpo. Fica atordoada por 1 rodada e perde 4d8 PM; se já foi atordoada por esta habilidade na cena, em vez disso fica debilitada por 1 rodada (Von CD 55 reduz a perda à metade e evita a condição)."
            },
            {
                "nome": "Drenar Vida",
                "tipo": "Qualidade",
                "desc": "Uma criatura que sofra dano de trevas do navio (mas não da tripulação) tem os PV máximos reduzidos em 10 por 1 dia, cumulativamente (Fort CD 55 evita). Se os PV máximos chegarem a 0, fica inconsciente até serem restabelecidos."
            },
            {
                "nome": "Memento",
                "tipo": "Qualidade",
                "desc": "Embora a tripulação possa sofrer dano, o navio em si é imune a dano e perda de vida. Se toda a tripulação fantasmagórica for derrotada, ele desaparece e ressurge 1d4 dias depois. Só é derrotado em definitivo concluindo o assunto que o prende a este mundo (purificar seus destroços, entregar sua carga perdida, concluir uma missão interrompida), e então é destruído automaticamente."
            },
            {
                "nome": "Nau Etérea",
                "tipo": "Qualidade",
                "desc": "Só se desloca pela superfície da água, mas não é afetado por condições climáticas ou por terreno aquático difícil."
            },
            {
                "nome": "Tripulação Fantasmagórica",
                "tipo": "Livre",
                "desc": "Uma vez por rodada, se estiver adjacente a uma embarcação, invoca capangas em espaços desocupados em alcance curto: 2d6+2 capangas marujos hynne (30 capangas por cena). Cada marujo é um morto-vivo incorpóreo com deslocamento 6m, Defesa 55, 160 PV e dano 2d12+5 de trevas mais 2d12+5 de frio. Ao fazer um teste de resistência, o marujo rola dois dados e usa o melhor resultado. Agem a partir da próxima rodada do navio, gastam uma ação padrão para causar o dano listado e usam as estatísticas do navio para seus testes opostos e de resistência."
            }
        ],
        "tesouro": "Dobro mais essência espectral (vale 3 PM para fabricar itens mágicos)",
        "observacao": "Antigo Mergulhão Audaz, galeão do capitão hynne Filork Olho Vivo, amaldiçoado na Noite da Ascensão Profana. Para dar descanso ao navio: recuperar os restos mortais do capitão (protegidos magicamente nos destroços do Mergulhão Audaz), levá-los à cidade natal dele em Hongari e realizar um ritual de purificação (que exige magias poderosas, pois se opõe ao poder de Ferren Asloth)."
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "cura acelerada 130, imunidade a trevas",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+6 (+16 em pântanos)"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Necro-hidra",
        "tipo": "Monstro Enorme",
        "nd": "14",
        "iniciativa": "+11",
        "percepcao": "+12",
        "defesa": "40",
        "fort": "+28",
        "ref": "+22",
        "von": "+12",
        "pv": "700",
        "desl": "9m (6q), natação 9m (6q)",
        "atributos": {
            "for": "10",
            "des": "0",
            "con": "10",
            "int": "-4",
            "sab": "1",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Cinco mordidas",
                "tipo": "Corpo a Corpo",
                "bonus": "+39",
                "dano": "4d6+20",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Cortar Cabeças",
                "tipo": "Qualidade",
                "desc": "As cabeças são o ponto fraco e podem ser atacadas diretamente (-2 no teste de ataque). Se o ataque acertar e causar pelo menos 35 pontos de dano de corte, a cabeça é decepada e ela perde um ataque de mordida. Porém, 1d4 rodadas depois duas novas nascem no lugar (até dez cabeças). Para impedir isso, é preciso purificar o pescoço, causando 35 pontos de dano de eletricidade ou luz na necro-hidra. Se todas as cabeças forem decepadas e todos os pescoços purificados, ela morre."
            },
            {
                "nome": "Erguer os Mortos",
                "tipo": "Qualidade",
                "desc": "Projeta uma aura necromântica de 30m de raio. Cadáveres que passem 10 minutos dentro da aura são erguidos como zumbis (Tormenta20, p. 297)."
            },
            {
                "nome": "Fome de Trevas",
                "tipo": "Qualidade",
                "desc": "Ao causar dano a um morto-vivo, recupera PV iguais à metade do dano causado e o morto-vivo não pode curar esse dano com efeitos de trevas."
            },
            {
                "nome": "Perceber os Mortos",
                "tipo": "Qualidade",
                "desc": "Percebe a presença de mortos-vivos em alcance médio como se tivesse percepção às cegas contra essas criaturas."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "imunidade a ácido, redução de corte e perfuração 5",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Nogg",
        "tipo": "Monstro Médio",
        "nd": "1",
        "iniciativa": "+3",
        "percepcao": "+3",
        "defesa": "15",
        "fort": "+11",
        "ref": "+6",
        "von": "+2",
        "pv": "11",
        "desl": "9m (6q)",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "2",
            "int": "-1",
            "sab": "0",
            "car": "-4"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "2d8+8",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Amontoar",
                "tipo": "Qualidade",
                "desc": "Quando flanqueia um inimigo, recebe +1 no teste de ataque e na rolagem de dano para cada outro nogg que também esteja flanqueando aquele inimigo."
            },
            {
                "nome": "Dependência Estratégica",
                "tipo": "Qualidade",
                "desc": "Se não estiver a pelo menos alcance médio de uma criatura capaz de liderá-lo (um aliado solo ou especial), sofre -2 em testes de perícia."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "imunidade a ofuscado, redução de fogo e frio 5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+17"
            },
            {
                "nome": "Intuição",
                "valor": "-1"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+8"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Ogro das Sanguinárias",
        "tipo": "Humanoide (gigante) Grande",
        "nd": "8",
        "iniciativa": "+8",
        "percepcao": "+4",
        "defesa": "31",
        "fort": "+21",
        "ref": "+15",
        "von": "+3",
        "pv": "360",
        "desl": "9m (6q), escalada 6m (4q)",
        "atributos": {
            "for": "9",
            "des": "0",
            "con": "5",
            "int": "-3",
            "sab": "0",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Machado de guerra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "3d6+22",
                "desc": "x3."
            },
            {
                "nome": "Azagaia x2",
                "tipo": "À Distância",
                "bonus": "+26",
                "dano": "1d8+22",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Fúria Sanguinária",
                "tipo": "Livre",
                "desc": "Uma vez por cena, entra em frenesi: +3 em testes de ataque e rolagens de dano corpo a corpo e com armas de arremesso, e seu tamanho conta como uma categoria maior para manobras de combate e para resistir a habilidades relacionadas a tamanho (como o aprimoramento da magia Tempestade Divina)."
            },
            {
                "nome": "Investida Inclemente",
                "tipo": "Qualidade",
                "desc": "Ao fazer uma investida, sofre -5 na Defesa (em vez de -2), mas o ataque causa três dados extras de dano."
            },
            {
                "nome": "Obtuso Demais…",
                "tipo": "Qualidade",
                "desc": "Sofre -5 em testes de Intuição e Vontade (já contabilizados)."
            },
            {
                "nome": "…Para Morrer!",
                "tipo": "Qualidade",
                "desc": "Todo o dano de corte, impacto e perfuração que sofre é reduzido à metade. Sempre que reduz os PV de um inimigo a 0 ou menos, recupera 20 PV."
            },
            {
                "nome": "Varrer",
                "tipo": "Livre",
                "desc": "Uma vez por rodada, quando faz um ataque corpo a corpo e reduz os PV do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do alcance."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Azagaia aumentada x4, gibão de peles, machado de guerra aumentado"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "imunidade a dano (conforme sua cor), natureza vegetal, redução de impacto 10",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Orquídea-Carnívora",
        "tipo": "Monstro Grande",
        "nd": "10",
        "iniciativa": "+8",
        "percepcao": "+5",
        "defesa": "36",
        "fort": "+21",
        "ref": "+14",
        "von": "+13",
        "pv": "400",
        "desl": "6m (4q)",
        "atributos": {
            "for": "7",
            "des": "-1",
            "con": "4",
            "int": "-4",
            "sab": "0",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "2d10+9",
                "desc": "x3."
            },
            {
                "nome": "Tentáculo x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "3d6+9",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Tentáculo (teste +31)."
            },
            {
                "nome": "Camuflagem Vegetal",
                "tipo": "Qualidade",
                "desc": "Pode permanecer completamente imóvel. Assim, um personagem deve passar em um teste de Percepção (CD 35) para perceber que é um monstro e não uma planta inanimada."
            },
            {
                "nome": "Engolir",
                "tipo": "Padrão",
                "desc": "No início de cada turno dela, a criatura engolida sofre 2d8+6 de impacto e 2d8+6 de dano do mesmo tipo de sua imunidade elemental. Escapa causando um total de 25 pontos de dano ao interior da orquídea (Defesa 15)."
            },
            {
                "nome": "Imunidade Elemental",
                "tipo": "Qualidade",
                "desc": "Cada orquídea é imune a um tipo de dano, determinado pela cor da flor: vermelha (fogo), azul (frio) ou verde (ácido)."
            },
            {
                "nome": "Sopro de Pólen",
                "tipo": "Padrão",
                "desc": "Sopra pólen carregado de energia elemental, conforme a cor da flor (Vermelha, Azul ou Verde). Recarga (movimento)."
            },
            {
                "nome": "Sopro de Pólen: Orquídea Vermelha",
                "tipo": "Padrão",
                "desc": "Projeta uma esfera flamejante de pólen que explode em uma esfera de 6m de raio em alcance médio. Criaturas na área sofrem 15d6+5 de fogo e ficam em chamas (Ref CD 30 reduz à metade e evita a condição)."
            },
            {
                "nome": "Sopro de Pólen: Orquídea Azul",
                "tipo": "Padrão",
                "desc": "Expele pólen gélido em um cone de 9m. Criaturas na área sofrem 15d6+5 de frio e ficam lentas (Ref CD 30 reduz à metade e evita a condição)."
            },
            {
                "nome": "Sopro de Pólen: Orquídea Verde",
                "tipo": "Padrão",
                "desc": "Exala uma nuvem de gás venenoso em uma área de 12m de raio ao seu redor. Outras criaturas na área ficam inconscientes (Fort CD 30 muda para enjoada). Metabolismo."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+4"
            },
            {
                "nome": "Diplomacia",
                "valor": "+2"
            },
            {
                "nome": "Enganação",
                "valor": "+9"
            },
            {
                "nome": "Furtividade",
                "valor": "+6"
            },
            {
                "nome": "Ladinagem",
                "valor": "+4"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Mercador Desonesto",
        "tipo": "Humanoide (hynne) Pequeno",
        "nd": "1",
        "iniciativa": "+4",
        "percepcao": "+3",
        "defesa": "13",
        "fort": "+0",
        "ref": "+11",
        "von": "+5",
        "pv": "11",
        "desl": "6m (4q)",
        "atributos": {
            "for": "-1",
            "des": "2",
            "con": "0",
            "int": "1",
            "sab": "1",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Adaga",
                "tipo": "Corpo a Corpo",
                "bonus": "+5",
                "dano": "1d4+2",
                "desc": "19."
            }
        ],
        "habilidades": [
            {
                "nome": "Lábia Marota",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de Diplomacia ou Enganação, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Mercadorias Falsificadas",
                "tipo": "Qualidade",
                "desc": "Possui um estoque de mercadorias falsas ou defeituosas que parecem de excelente qualidade. Perceber a falsificação exige um teste oposto de Percepção ou do Ofício apropriado contra a Enganação do mercador. Qualidades: Arma Quebradiça (metade do preço; com acerto crítico se estilhaça), Armadura de Papelão (metade do preço; desmancha em contato com líquido), Ferramenta de Brinquedo (metade do preço; quebra se o usuário falhar por 5 ou mais ou rolar 1 natural), Pergaminho com Erros Gramaticais (magia de 1º ou 2º círculo com 20% de desconto; teste de Conhecimento ou Ofício (escriba) CD 20 ou a magia tem efeito oposto), Poção Aguada (poção de 1º ou 2º círculo com 20% de desconto; efeitos numéricos pela metade e duração diminui em um passo)."
            },
            {
                "nome": "Pernas Pra Que Te Quero",
                "tipo": "Qualidade",
                "desc": "Quando se move na direção oposta de um inimigo, seu deslocamento aumenta em +6m até o fim do turno."
            },
            {
                "nome": "Sorte Salvadora",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de resistência, rola dois dados e usa o melhor resultado."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Adaga, capa esvoaçante"
    },
    {
        "pm": "0",
        "percepcaoObs": "+6 em subterrâneo, visão no escuro",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+5"
            },
            {
                "nome": "Enganação",
                "valor": "+6"
            },
            {
                "nome": "Intimidação",
                "valor": "+4"
            },
            {
                "nome": "Ladinagem",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Anão Brigão",
        "tipo": "Humanoide (anão) Médio",
        "nd": "2",
        "iniciativa": "+3",
        "percepcao": "+4",
        "defesa": "17",
        "fort": "+13",
        "ref": "+2",
        "von": "+7",
        "pv": "48",
        "desl": "6m (4q)",
        "atributos": {
            "for": "2",
            "des": "0",
            "con": "2",
            "int": "0",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Ataque desarmado x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d8+5",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Puxar Briga",
                "tipo": "Completa",
                "desc": "Incita uma briga na taverna. A briga é um teste estendido em grupo de Luta (CD 20, 5 sucessos). Para cada falha, todos os personagens sofrem 1d4 de impacto não letal e o anão usa Soco Larápio contra aquele personagem. Em uma falha total, o grupo é desacordado e desperta 1d4 horas depois em um beco qualquer. Pode incitar uma briga uma vez por cena."
            },
            {
                "nome": "Parô, Parô!",
                "tipo": "Reação",
                "desc": "Quando sofre um efeito que reduziria seus PV a 0 ou menos, finge uma rendição dramática. A criatura que gerou o efeito faz um teste de Vontade (CD 16); se falhar, em vez de sofrer o efeito, o anão fica com 1 PV. Uma vez por cena."
            },
            {
                "nome": "Soco Larápio",
                "tipo": "Padrão",
                "desc": "Faz um ataque desarmado. Se acertar, em vez de causar dano, rouba 1d8+5 tibares do alvo (Percepção CD 16 evita)."
            }
        ],
        "tesouro": "Padrão",
        "observacao": "Com o suplemento Ameaças de Arton, pode-se trocar os efeitos de Puxar Briga pelo perigo complexo Briga de Taverna (p. 363). Nesse caso o anão não é afetado e pode usar Soco Larápio uma vez por rodada contra qualquer personagem que tenha falhado no teste de perícia daquela rodada."
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Atuação",
                "valor": "+7"
            },
            {
                "nome": "Diplomacia",
                "valor": "+7"
            },
            {
                "nome": "Enganação",
                "valor": "+11"
            },
            {
                "nome": "Furtividade",
                "valor": "+8"
            },
            {
                "nome": "Intimidação",
                "valor": "+7"
            },
            {
                "nome": "Ladinagem",
                "valor": "+8"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Falso Vidente",
        "tipo": "Humanoide (elfo) Médio",
        "nd": "3",
        "iniciativa": "+6",
        "percepcao": "+5",
        "defesa": "14",
        "fort": "+4",
        "ref": "+10",
        "von": "+16",
        "pv": "25",
        "desl": "12m (8q)",
        "atributos": {
            "for": "-1",
            "des": "3",
            "con": "-1",
            "int": "3",
            "sab": "0",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Ataque desarmado",
                "tipo": "Corpo a Corpo",
                "bonus": "+7",
                "dano": "1d3+2",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Aparência Inofensiva",
                "tipo": "Qualidade",
                "desc": "A primeira criatura inteligente (Int -3 ou maior) que atacar o falso vidente em uma cena faz um teste de Vontade (CD 20). Se falhar, perde a ação."
            },
            {
                "nome": "Leitura Falsa",
                "tipo": "Completa",
                "desc": "Faz uma falsa leitura da sorte para uma criatura disposta e adjacente. Faz um teste de Enganação oposto à Intuição dela e, se vencer, descobre alguma informação valiosa que poderá ser negociada com um oponente dos aventureiros. O mestre recebe 4d8 dados de auxílio: até o fim da aventura, quando um NPC inteligente (Int -3 ou maior) faz um teste, o mestre pode gastar 1d8 e somar o resultado como bônus. Não pode usar em combate."
            },
            {
                "nome": "Golpista Habilidoso",
                "tipo": "Qualidade",
                "desc": "Ao fazer um teste de Enganação ou Ladinagem, rola dois dados e usa o melhor resultado."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Adaga, capa esvoaçante aprimorada, gazua"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a fogo e metamorfose, redução de dano 20, resistência a magia +5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+28"
            },
            {
                "nome": "Conhecimento",
                "valor": "+21"
            },
            {
                "nome": "Diplomacia",
                "valor": "+22"
            },
            {
                "nome": "Intimidação",
                "valor": "+22"
            },
            {
                "nome": "Intuição",
                "valor": "+21"
            },
            {
                "nome": "Misticismo",
                "valor": "+21"
            },
            {
                "nome": "Religião",
                "valor": "+21"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Pileus Colosso (Estágio Um)",
        "tipo": "Morto-vivo Grande",
        "nd": "20",
        "iniciativa": "+22",
        "percepcao": "+19",
        "defesa": "60",
        "fort": "+33",
        "ref": "+21",
        "von": "+28",
        "pv": "360",
        "desl": "12m (8q)",
        "atributos": {
            "for": "10",
            "des": "4",
            "con": "4",
            "int": "3",
            "sab": "3",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Duas pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+56",
                "dano": "2d100+25",
                "desc": "18/x4."
            }
        ],
        "habilidades": [
            {
                "nome": "Evolução Sombria",
                "tipo": "Reação",
                "desc": "Quando é reduzido a 0 PV, explode em uma onda de energia negativa, causando 5d20 de trevas a todas as criaturas vivas em raio de 30m (Fort CD 49 reduz à metade). Então surge em sua segunda forma (veja Pileus Assassino) e age normalmente a partir do próximo turno."
            },
            {
                "nome": "Puxão Sobrenatural",
                "tipo": "Livre",
                "desc": "Uma vez por rodada, cria um tentáculo de sombras em linha desimpedida até uma criatura em alcance médio. A criatura faz um teste de Vontade (CD 49). Se falhar, é puxada em linha reta até o pileus, bate na armadura dele, sofre 10d12+10 de perfuração e fica caída em um espaço adjacente à escolha dele."
            },
            {
                "nome": "Varrer",
                "tipo": "Livre",
                "desc": "Uma vez por rodada, quando faz um ataque corpo a corpo e reduz os PV do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do alcance."
            },
            {
                "nome": "Visão Arcana",
                "tipo": "Qualidade",
                "desc": "Está permanentemente sob efeito da magia Visão Mística, com o aprimoramento que permite enxergar criaturas e objetos invisíveis."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "evasão aprimorada, imunidade a efeitos de movimento, frio, metamorfose e surpreendido, redução de dano 10/impacto mágico, resistência a magia +5",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+26"
            },
            {
                "nome": "Atletismo",
                "valor": "+25"
            },
            {
                "nome": "Conhecimento",
                "valor": "+22"
            },
            {
                "nome": "Diplomacia",
                "valor": "+22"
            },
            {
                "nome": "Intimidação",
                "valor": "+22"
            },
            {
                "nome": "Intuição",
                "valor": "+21"
            },
            {
                "nome": "Misticismo",
                "valor": "+22"
            },
            {
                "nome": "Religião",
                "valor": "+21"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Pileus Assassino (Estágio Dois)",
        "tipo": "Morto-vivo Médio",
        "nd": "20",
        "iniciativa": "+26",
        "percepcao": "+19",
        "defesa": "60",
        "fort": "+28",
        "ref": "+33",
        "von": "+21",
        "pv": "1200",
        "desl": "18m (12q)",
        "atributos": {
            "for": "7",
            "des": "8",
            "con": "4",
            "int": "4",
            "sab": "3",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Adagas sombrias x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+56",
                "dano": "4d12+25",
                "desc": "16, mais 4d8 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "tipo": "Qualidade",
                "desc": "+10d8."
            },
            {
                "nome": "Evolução Sombria",
                "tipo": "Reação",
                "desc": "Quando é reduzido a 0 PV, explode em uma onda de energia negativa, causando 5d20 de trevas a todas as criaturas vivas em raio de 30m (Fort CD 49 reduz à metade). Então surge em sua terceira forma (veja Pileus Mago) e age normalmente a partir do próximo turno."
            },
            {
                "nome": "Porta Dimensional Sombria",
                "tipo": "Livre",
                "desc": "Teletransporta-se para um espaço livre que possa ver em alcance médio. Se o espaço for adjacente a um inimigo, ele fica desprevenido contra o pileus por 1 rodada. Só pode usar uma vez por rodada, e apenas a partir do segundo turno após assumir este estágio."
            },
            {
                "nome": "Punhais da Morte",
                "tipo": "Qualidade",
                "desc": "As adagas são feitas da própria energia sombria que o alimenta. Contam como adagas ameaçadoras dilacerantes sanguinárias, não podem ser desarmadas e se desfazem quando ele muda de estágio."
            },
            {
                "nome": "Visão Arcana",
                "tipo": "Qualidade",
                "desc": "Está permanentemente sob efeito da magia Visão Mística, com o aprimoramento que permite enxergar criaturas e objetos invisíveis."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "170",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a eletricidade e metamorfose, incorpóreo, redução de dano 10, resistência a magia +5",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+26"
            },
            {
                "nome": "Conhecimento",
                "valor": "+28"
            },
            {
                "nome": "Diplomacia",
                "valor": "+24"
            },
            {
                "nome": "Intimidação",
                "valor": "+27"
            },
            {
                "nome": "Intuição",
                "valor": "+23"
            },
            {
                "nome": "Misticismo",
                "valor": "+28"
            },
            {
                "nome": "Religião",
                "valor": "+23"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Pileus Mago (Estágio Três)",
        "tipo": "Morto-vivo Médio",
        "nd": "20",
        "iniciativa": "+26",
        "percepcao": "+21",
        "defesa": "60",
        "fort": "+21",
        "ref": "+28",
        "von": "+33",
        "pv": "840",
        "desl": "voo 18m (12q)",
        "atributos": {
            "for": "—",
            "des": "8",
            "con": "5",
            "int": "10",
            "sab": "5",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Toque sombrio",
                "tipo": "Corpo a Corpo",
                "bonus": "+55",
                "dano": "10d6+10 trevas",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Arcano de Batalha",
                "tipo": "Qualidade",
                "desc": "Soma sua Inteligência nas rolagens de dano quando lança magias (já contabilizado)."
            },
            {
                "nome": "Contramágica Superior",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, ao ver uma magia ser conjurada, faz uma contramágica. Se usar Dissipar Magia para isso, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Drenar Existência",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida pelo toque drenante tem os PV máximos reduzidos em 20 e os PM máximos reduzidos em 3, ambos por 1 dia, cumulativamente (Fort CD 51 evita). Se os PV máximos chegarem a 0, fica inconsciente até serem restabelecidos. Sempre que reduz PV e PM máximos de uma criatura, o pileus recupera essa mesma quantidade de PV e PM."
            },
            {
                "nome": "Extinguir a Vida",
                "tipo": "Qualidade",
                "desc": "Uma criatura que sofra dano de trevas do pileus não pode recuperar PV por 1 rodada."
            },
            {
                "nome": "Fluxo de Mana",
                "tipo": "Qualidade",
                "desc": "Pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (pagando o custo de cada um)."
            },
            {
                "nome": "Magia Acelerada",
                "tipo": "Livre",
                "desc": "Custos: +4 PM. Uma vez por rodada, ao lançar uma magia com execução de movimento, padrão ou completa, muda a execução dela para livre."
            },
            {
                "nome": "Pacto Além das Trevas",
                "tipo": "Qualidade",
                "desc": "Criaturas imunes a dano de trevas sofrem metade do dano de trevas do pileus e mortos-vivos não recuperam PV com esse dano."
            },
            {
                "nome": "Visão Arcana",
                "tipo": "Qualidade",
                "desc": "Está permanentemente sob efeito da magia Visão Mística, com o aprimoramento que permite enxergar criaturas e objetos invisíveis."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um mago de 20º nível (CD 51)."
            },
            {
                "nome": "Magia: Desespero Esmagador",
                "tipo": "Padrão",
                "desc": "Custos: 8 PM. Criaturas em um cone de 6m ficam debilitadas e esmorecidas pela cena (Von reduz para 1 rodada)."
            },
            {
                "nome": "Magia: Dissipar Magia",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado são dissipadas."
            },
            {
                "nome": "Magia: Ferver Sangue",
                "tipo": "Padrão",
                "desc": "Custos: 19 PM, sustentada. O sangue de criaturas escolhidas em alcance curto começa a ferver. Ao lançar, e no início de cada turno dele, cada criatura sofre 6d8+10 de fogo e fica enjoada por 1 rodada (Fort reduz à metade e evita a condição). Se passar em dois testes de Fortitude seguidos, dissipa a magia sobre si. Se um alvo for reduzido a 0 PV por esse dano, seu corpo explode, causando 6d6 de fogo em todas as criaturas a até 3m (Ref reduz à metade). Não afeta criaturas sem sangue."
            },
            {
                "nome": "Magia: Relâmpago",
                "tipo": "Padrão",
                "desc": "Custos: 16 PM. Lança um relâmpago em cada criatura escolhida em alcance médio, causando 16d6+10 de eletricidade (Ref reduz à metade)."
            },
            {
                "nome": "Magia: Tentáculos de Trevas",
                "tipo": "Padrão",
                "desc": "Custos: 14 PM. Até o fim da cena, tentáculos surgem em uma esfera de 9m em alcance médio e tentam agarrar todas as criaturas na área. Ao lançar, e no início de cada turno dele, faz um teste da manobra agarrar (usando Misticismo) contra cada criatura na área. Se passar, a criatura é agarrada; se já estava agarrada, é esmagada, sofrendo 10d6 de trevas (cada tentáculo recebe +10 na primeira rolagem de dano). A área é terreno difícil e os tentáculos são imunes a dano."
            },
            {
                "nome": "Magia: Toque da Morte",
                "tipo": "Padrão",
                "desc": "Custos: 17 PM. Uma criatura em alcance curto sofre 10d8+20 de trevas. Um inimigo com menos da metade dos PV faz um teste de Fortitude: se passar, sofre o dano normal; se falhar, seus PV são reduzidos a -10."
            },
            {
                "nome": "Magia: Toque Vampírico",
                "tipo": "Padrão",
                "desc": "Custos: 9 PM. Faz um ataque corpo a corpo. Se acertar, além do dano normal causa 10d6+10 de trevas e recupera metade desse dano em PV."
            },
            {
                "nome": "Magia: Velocidade",
                "tipo": "Padrão",
                "desc": "Custos: 10 PM, sustentada. Pode executar uma ação padrão adicional por turno."
            }
        ],
        "tesouro": "Dobro",
        "observacao": "Enfrentando o Pileus: enfrentar os três estágios em sequência conta como encontro de ND 22 para XP; enfrentar dois estágios (por exemplo, a partir do assassino) conta como ND 21; um único estágio é ND 20. Após evoluir, o pileus retrocede um estágio por semana. Derrotado como mago, morre para sempre."
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a eletricidade e fogo, redução de dano 5",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Pistoleiro Mecânico",
        "tipo": "Construto Médio",
        "nd": "11",
        "iniciativa": "+17",
        "percepcao": "+11",
        "defesa": "40",
        "fort": "+18",
        "ref": "+24",
        "von": "+11",
        "pv": "540",
        "desl": "9m (6q)",
        "atributos": {
            "for": "3",
            "des": "6",
            "con": "4",
            "int": "—",
            "sab": "0",
            "car": "-5"
        },
        "ataques": [
            {
                "nome": "Duas pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "2d8+20",
                "desc": ""
            },
            {
                "nome": "Duas pistolas x2",
                "tipo": "À Distância",
                "bonus": "+34",
                "dano": "4d8+15",
                "desc": "18/x3, alcance médio."
            }
        ],
        "habilidades": [
            {
                "nome": "Armamento Embutido",
                "tipo": "Qualidade",
                "desc": "As pistolas não podem ser desarmadas e são recarregadas automaticamente. Recebe +5 em testes para resistir à manobra quebrar."
            },
            {
                "nome": "Grudar o Cano",
                "tipo": "Qualidade",
                "desc": "Causa +1d8 de dano com as pistolas contra alvos adjacentes."
            },
            {
                "nome": "Pontaria Mecanizada",
                "tipo": "Qualidade",
                "desc": "Não sofre a penalidade de -5 em ataques por disparar contra oponentes envolvidos em combate corpo a corpo e, ao atacar com as pistolas, rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Ódio Programado",
                "tipo": "Qualidade",
                "desc": "Recebe +1d8 em rolagens de dano contra humanoides não humanos."
            },
            {
                "nome": "Sensores Térmicos",
                "tipo": "Qualidade",
                "desc": "Pode enxergar criaturas vivas invisíveis."
            }
        ],
        "tesouro": "Duas pistolas certeiras precisas (CD 26 para extrair) e peças reaproveitáveis (valem T$ 1.000 para fabricar engenhocas)"
    },
    {
        "pm": "78",
        "percepcaoObs": "",
        "defesaObs": "imunidade a medo e veneno, redução de dano 10",
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+20"
            },
            {
                "nome": "Atletismo",
                "valor": "+20"
            },
            {
                "nome": "Intimidação",
                "valor": "+15"
            },
            {
                "nome": "Religião",
                "valor": "+20"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+22"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Príncipe Centauro",
        "tipo": "Humanoide (centauro) Grande",
        "nd": "16",
        "iniciativa": "+16",
        "percepcao": "+20",
        "defesa": "53",
        "fort": "+30",
        "ref": "+16",
        "von": "+24",
        "pv": "790",
        "desl": "15m (10q), sem redução por terreno difícil natural",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "5",
            "int": "0",
            "sab": "6",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Gadanho x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+46",
                "dano": "4d12+30",
                "desc": "19/x5, mais 4d8 de luz."
            },
            {
                "nome": "Cascos",
                "tipo": "Corpo a Corpo",
                "bonus": "+46",
                "dano": "2d12+30",
                "desc": "18, mais 4d8 de luz."
            }
        ],
        "habilidades": [
            {
                "nome": "Coice Oportuno",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, quando uma criatura erra um ataque corpo a corpo contra ele por 5 ou mais, faz um ataque de cascos contra essa criatura."
            },
            {
                "nome": "Conjuração Rocinante",
                "tipo": "Reação",
                "desc": "Custos: 1 PM. Uma vez por rodada, ao lançar uma magia, faz um ataque de cascos."
            },
            {
                "nome": "Liberdade da Pradaria",
                "tipo": "Reação",
                "desc": "Custos: 1 PM. Ao lançar uma magia ao ar livre, aumenta o alcance dela em um passo (de toque para curto, de curto para médio ou de médio para longo)."
            },
            {
                "nome": "Segar",
                "tipo": "Completa",
                "desc": "Faz um único ataque de gadanho e o compara com a Defesa de cada inimigo adjacente. Cada criatura atingida sofre o dano do ataque e fica caída e sangrando. Recarga (movimento)."
            },
            {
                "nome": "Voz da Natureza",
                "tipo": "Qualidade",
                "desc": "Pode falar com animais (como o efeito da magia Voz Divina)."
            },
            {
                "nome": "Medo de Altura",
                "tipo": "Qualidade",
                "desc": "Se estiver adjacente a uma queda de 3m ou mais de altura, fica abalado."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um druida de Allihanna de 16º nível (CD 42)."
            },
            {
                "nome": "Magia: Coluna de Chamas",
                "tipo": "Padrão",
                "desc": "Custos: 16 PM. Cilindro de fogo sagrado de 3m de raio e 30m de altura desce dos céus em alcance longo, causando 11d6 de fogo mais 11d6 de luz nas criaturas e objetos livres na área (Ref reduz à metade)."
            },
            {
                "nome": "Magia: Comunhão com a Natureza",
                "tipo": "Completa",
                "desc": "Custos: 6 PM. Recebe 6d4 dados de auxílio que duram pelo dia ou até serem gastos. Ao fazer um teste de perícia na natureza, pode gastar dois desses dados para receber +2d4 no teste."
            },
            {
                "nome": "Magia: Concentração de Combate",
                "tipo": "Padrão",
                "desc": "Custos: 8 PM. Até o fim da cena, ao atacar rola dois dados e usa o melhor; quando um oponente o ataca, rola dois dados e usa o pior."
            },
            {
                "nome": "Magia: Curar Ferimentos",
                "tipo": "Padrão",
                "desc": "Custos: 16 PM. Uma criatura em alcance curto cura 17d8+17 PV."
            },
            {
                "nome": "Magia: Pele de Pedra",
                "tipo": "Padrão",
                "desc": "Custos: 10 PM. Aumenta a redução de dano dele em +10 até o fim da cena."
            },
            {
                "nome": "Magia: Primor Atlético",
                "tipo": "Padrão",
                "desc": "Custos: 4 PM. Até o fim da cena, recebe deslocamento +9m, +10 em Atletismo e, ao fazer um teste de perícia baseada em Força, Destreza ou Constituição (exceto ataque ou resistência), rola dois dados e usa o melhor."
            }
        ],
        "tesouro": "Nenhum",
        "equipamento": "Gadanho maciço ameaçador dilacerante formidável aumentado, símbolo sagrado de Allihanna"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "evasão, imunidade a confusão, redução de dano 10/mágico",
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+19"
            },
            {
                "nome": "Atletismo",
                "valor": "+19"
            },
            {
                "nome": "Atuação",
                "valor": "+22"
            },
            {
                "nome": "Cavalgar",
                "valor": "+21"
            },
            {
                "nome": "Enganação",
                "valor": "+19"
            },
            {
                "nome": "Furtividade",
                "valor": "+16"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+13"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Protetor das Matas",
        "tipo": "Espírito (sátiro) Médio",
        "nd": "15",
        "iniciativa": "+19",
        "percepcao": "+13",
        "defesa": "50",
        "fort": "+17",
        "ref": "+28",
        "von": "+22",
        "pv": "750",
        "desl": "12m (8q), sem redução por terreno difícil natural",
        "atributos": {
            "for": "2",
            "des": "6",
            "con": "3",
            "int": "1",
            "sab": "0",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Espada longa x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+44",
                "dano": "6d8+16",
                "desc": "19, mais 6d6 de dano psíquico."
            },
            {
                "nome": "Marrada",
                "tipo": "Corpo a Corpo",
                "bonus": "+42",
                "dano": "6d6+16",
                "desc": "Mais 6d6 de dano psíquico."
            }
        ],
        "habilidades": [
            {
                "nome": "Aura de Vinhas",
                "tipo": "Qualidade",
                "desc": "Emana uma aura que anima a vegetação em um raio de 9m. Nessa área, terreno natural se torna difícil."
            },
            {
                "nome": "Instrumentista Mágico",
                "tipo": "Padrão",
                "desc": "Lança uma magia entre Amedrontar, Enfeitiçar, Hipnotismo e Sono sem gastar PM (CD 40, limite de PM 15). Pode lançar cada uma dessas magias uma vez por cena."
            },
            {
                "nome": "Lança Natural",
                "tipo": "Padrão",
                "desc": "Cria uma lança de vinhas e a arremessa contra uma criatura em alcance curto. O alvo sofre 8d12+16 de perfuração e fica enredado (Ref CD 40 reduz à metade e evita a condição). Uma criatura enredada assim remove a condição gastando uma ação completa."
            },
            {
                "nome": "Montaria Feérica",
                "tipo": "Qualidade",
                "desc": "Cavalga um alce, parceiro montaria (Grande) que não reduz sua Furtividade. Montado, recebe +1d6 em rolagens de dano corpo a corpo e, ao fazer uma investida, +2 no teste de ataque e, se acertar, pode fazer a manobra derrubar ou empurrar contra o alvo como ação livre (teste +49)."
            },
            {
                "nome": "Passo da Floresta",
                "tipo": "Movimento",
                "desc": "Ele (e a montaria, se montado) se teleporta para um espaço desocupado que possa ver em alcance médio. Criaturas adjacentes a esse espaço ficam desprevenidas contra o protetor até o início do próximo turno dele. Só pode usar em terrenos naturais. Recarga (movimento)."
            },
            {
                "nome": "Vozes da Pondsmânia",
                "tipo": "Reação",
                "desc": "Na primeira vez em cada cena em que é reduzido a 375 PV ou menos, invoca o poder das terras feéricas. Todos os inimigos em alcance médio perdem 2d8 PM e ficam confusos (Von CD 40 reduz a perda à metade e evita a condição)."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Couraça delicada sob medida, escudo leve ajustado, espada longa formidável, instrumento musical (flauta) aprimorado"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Sobrevivência",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Rafeiro Putrefato",
        "tipo": "Morto-vivo Médio",
        "nd": "1/2",
        "iniciativa": "+4",
        "percepcao": "+5",
        "defesa": "13",
        "fort": "+5",
        "ref": "+3",
        "von": "+0",
        "pv": "7",
        "desl": "12m (8q)",
        "atributos": {
            "for": "2",
            "des": "2",
            "con": "3",
            "int": "-4",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "2d6+4",
                "desc": "Mais doença."
            }
        ],
        "habilidades": [
            {
                "nome": "Derrubar",
                "tipo": "Livre",
                "desc": "Se acerta um ataque de mordida, pode fazer a manobra derrubar (teste +9)."
            },
            {
                "nome": "Doença",
                "tipo": "Qualidade",
                "desc": "Uma criatura mordida contrai a doença infecção do esgoto (Fort CD 13 evita)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, percepção às cegas (médio), visão no escuro",
        "defesaObs": "cura acelerada 5, imunidade a ácido, efeitos mentais, eletricidade, encantamento, medo e trevas, redução de dano 5/mágico",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+8"
            },
            {
                "nome": "Furtividade",
                "valor": "+9"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Zangão do Pesadelo",
        "tipo": "Construto Médio",
        "nd": "5",
        "iniciativa": "+9",
        "percepcao": "+7",
        "defesa": "24",
        "fort": "+11",
        "ref": "+15",
        "von": "+7",
        "pv": "140",
        "desl": "15m (10q)",
        "atributos": {
            "for": "4",
            "des": "5",
            "con": "2",
            "int": "-2",
            "sab": "1",
            "car": "-3"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "2d8+11",
                "desc": ""
            },
            {
                "nome": "Cauda-espinho",
                "tipo": "À Distância",
                "bonus": "+17",
                "dano": "2d6+8",
                "desc": "Perfuração, alcance curto. Pode ser usada na mesma ação agredir da mordida. Cada zangão possui apenas um tipo de cauda."
            },
            {
                "nome": "Cauda-ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "1d6+4",
                "desc": "Perfuração, mais peçonha concentrada (perde 1d12 PV por rodada durante 3 rodadas, Fort CD 20 reduz para 1 rodada). Cada zangão possui apenas um tipo de cauda."
            },
            {
                "nome": "Cauda-lâmina",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "2d8+11",
                "desc": "18/x3, corte. Cada zangão possui apenas um tipo de cauda."
            },
            {
                "nome": "Cauda-tentáculo",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "1d8+8",
                "desc": "Impacto, mais agarrar aprimorado (teste +19). Cada zangão possui apenas um tipo de cauda."
            }
        ],
        "habilidades": [
            {
                "nome": "Cauda Especializada",
                "tipo": "Qualidade",
                "desc": "Cada zangão do pesadelo possui um tipo de cauda, conforme sua função: espinho (ataque à distância), ferrão (veneno), lâmina (corte) ou tentáculo (agarrar)."
            },
            {
                "nome": "Mente Alienígena",
                "tipo": "Qualidade",
                "desc": "Quando uma criatura usa um efeito mental ou de encantamento contra o zangão, é atingida por um terrível choque de retorno: sofre 6d6 de dano psíquico e fica atordoada por 1 rodada e abalada (Von CD 20 reduz à metade e evita as condições)."
            }
        ],
        "tesouro": "Nenhum",
        "observacao": "Natureza do Pesadelo (cada soldado e Mestre possui uma, à escolha ou 1d4; CD igual à de Mente Alienígena): 1) Desastre: quem sofre a mordida fica confuso (Von evita; uma vez por cena por criatura). 2) Fracasso: a vítima da mordida perde 1d6 PM e fica esmorecida (Von evita). 3) Perseguição: a vítima da mordida faz Vontade; se falhar, até o fim da cena considera seus aliados como inimigos para efeitos de como suas habilidades interagem com eles. 4) Morte: a vítima da mordida não pode recuperar PV por 1 rodada."
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, percepção às cegas (médio), visão no escuro",
        "defesaObs": "cura acelerada 5, imunidade a ácido, efeitos mentais, eletricidade, encantamento, medo e trevas, redução de dano 5/mágico",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+7"
            },
            {
                "nome": "Furtividade",
                "valor": "+9"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+7"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Coletor do Pesadelo",
        "tipo": "Construto Médio",
        "nd": "6",
        "iniciativa": "+9",
        "percepcao": "+9",
        "defesa": "25",
        "fort": "+6",
        "ref": "+18",
        "von": "+12",
        "pv": "160",
        "desl": "15m (10q)",
        "atributos": {
            "for": "2",
            "des": "4",
            "con": "2",
            "int": "-2",
            "sab": "2",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "4d8+10",
                "desc": ""
            },
            {
                "nome": "Cauda-tentáculo",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "1d8+10",
                "desc": "Mais 4d6 de dano psíquico."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Cauda-tentáculo (teste +20)."
            },
            {
                "nome": "Mente Alienígena",
                "tipo": "Qualidade",
                "desc": "Quando uma criatura usa um efeito mental ou de encantamento contra o coletor, é atingida por um terrível choque de retorno: sofre 6d6 de dano psíquico e fica atordoada por 1 rodada e abalada (Von CD 24 reduz à metade e evita as condições)."
            },
            {
                "nome": "Roubar Sonhos",
                "tipo": "Livre",
                "desc": "No início de cada turno dele, drena os sonhos de uma criatura que esteja agarrando. A vítima perde 1d4 PM (o dobro se estiver inconsciente) e fica alquebrada. Se já estiver alquebrada, em vez disso perde um de seus sonhos (Von CD 24 reduz a perda à metade e evita a condição ou a perda do sonho)."
            }
        ],
        "tesouro": "Nenhum",
        "observacao": "Sonhos Roubados: a vítima perde o maior sonho (esquece o interesse, não o objeto) e sofre pesadelos recorrentes. Sonho de Amor: PM total diminui em um valor igual ao nível (recuperar: +1 PM por dois níveis). Sonho de Aprendizado: -2 em três perícias treinadas (recuperar: +2 nelas). Sonho de Destruição: PV total diminui em um valor igual ao nível (recuperar: +1 PV por nível). Nenhum Sonho: recuperação de PV e PM diminui em um passo (removível por Purificação ou efeito que remova maldições). Natureza do Pesadelo (cada soldado e Mestre possui uma, à escolha ou 1d4; CD igual à de Mente Alienígena): 1) Desastre: quem sofre a mordida fica confuso (Von evita; uma vez por cena por criatura). 2) Fracasso: a vítima da mordida perde 1d6 PM e fica esmorecida (Von evita). 3) Perseguição: a vítima da mordida faz Vontade; se falhar, até o fim da cena considera seus aliados como inimigos para efeitos de como suas habilidades interagem com eles. 4) Morte: a vítima da mordida não pode recuperar PV por 1 rodada."
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, percepção às cegas (médio), visão no escuro",
        "defesaObs": "cura acelerada 5, imunidade a ácido, efeitos mentais, eletricidade, encantamento, medo e trevas, redução de dano 10/mágico",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+15"
            },
            {
                "nome": "Furtividade",
                "valor": "+16"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+11"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Ceifador do Pesadelo",
        "tipo": "Construto Médio",
        "nd": "8",
        "iniciativa": "+14",
        "percepcao": "+11",
        "defesa": "33",
        "fort": "+15",
        "ref": "+21",
        "von": "+8",
        "pv": "280",
        "desl": "15m (10q)",
        "atributos": {
            "for": "5",
            "des": "6",
            "con": "3",
            "int": "-1",
            "sab": "1",
            "car": "-3"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "3d8+20",
                "desc": ""
            },
            {
                "nome": "Cauda-lâmina",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "4d6+20",
                "desc": "18/x3, corte."
            }
        ],
        "habilidades": [
            {
                "nome": "Mente Alienígena",
                "tipo": "Qualidade",
                "desc": "Quando uma criatura usa um efeito mental ou de encantamento contra o ceifador, é atingida por um terrível choque de retorno: sofre 8d6 de dano psíquico e fica atordoada por 1 rodada e abalada (Von CD 26 reduz à metade e evita as condições)."
            }
        ],
        "tesouro": "Nenhum",
        "observacao": "Natureza do Pesadelo (cada soldado e Mestre possui uma, à escolha ou 1d4; CD igual à de Mente Alienígena): 1) Desastre: quem sofre a mordida fica confuso (Von evita; uma vez por cena por criatura). 2) Fracasso: a vítima da mordida perde 1d6 PM e fica esmorecida (Von evita). 3) Perseguição: a vítima da mordida faz Vontade; se falhar, até o fim da cena considera seus aliados como inimigos para efeitos de como suas habilidades interagem com eles. 4) Morte: a vítima da mordida não pode recuperar PV por 1 rodada."
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, percepção às cegas (médio), visão no escuro",
        "defesaObs": "cura acelerada 10, imunidade a ácido, efeitos mentais, eletricidade, encantamento, medo e trevas, redução de dano 10/mágico",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+18"
            },
            {
                "nome": "Furtividade",
                "valor": "+17"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+12"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Pesadelo Polivalente",
        "tipo": "Construto Grande",
        "nd": "10",
        "iniciativa": "+15",
        "percepcao": "+12",
        "defesa": "36",
        "fort": "+16",
        "ref": "+22",
        "von": "+10",
        "pv": "370",
        "desl": "15m (10q)",
        "atributos": {
            "for": "7",
            "des": "6",
            "con": "5",
            "int": "-2",
            "sab": "1",
            "car": "-3"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "3d8+10",
                "desc": ""
            },
            {
                "nome": "Cauda-espinho",
                "tipo": "À Distância",
                "bonus": "+29",
                "dano": "2d4+10",
                "desc": "Perfuração, alcance curto."
            },
            {
                "nome": "Cauda-ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "2d4+5",
                "desc": "Perfuração, mais peçonha concentrada (perde 2d12 PV por rodada durante 3 rodadas, Fort CD 30 reduz para 1 rodada)."
            },
            {
                "nome": "Cauda-lâmina",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "2d6+10",
                "desc": "18/x3, corte."
            },
            {
                "nome": "Cauda-tentáculo",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "1d6+5",
                "desc": "Esmagamento, mais agarrar aprimorado (teste +33)."
            }
        ],
        "habilidades": [
            {
                "nome": "Mente Alienígena",
                "tipo": "Qualidade",
                "desc": "Quando uma criatura usa um efeito mental ou de encantamento contra o pesadelo polivalente, é atingida por um terrível choque de retorno: sofre 8d6 de dano psíquico e fica atordoada por 1 rodada e abalada (Von CD 30 reduz à metade e evita as condições)."
            },
            {
                "nome": "Múltiplas Caudas",
                "tipo": "Qualidade",
                "desc": "Possui quatro caudas diferentes (espinho, ferrão, lâmina e tentáculo). Ao fazer a ação agredir, pode atacar uma vez com cada cauda e uma vez com a mordida. A cauda-espinho é um ataque à distância que pode ser usado em conjunto com as demais."
            },
            {
                "nome": "Pesadelo Combinado",
                "tipo": "Qualidade",
                "desc": "Recebe duas habilidades de Natureza do Pesadelo (veja observação)."
            }
        ],
        "tesouro": "Nenhum",
        "observacao": "Natureza do Pesadelo (cada soldado e Mestre possui uma, à escolha ou 1d4; CD igual à de Mente Alienígena): 1) Desastre: quem sofre a mordida fica confuso (Von evita; uma vez por cena por criatura). 2) Fracasso: a vítima da mordida perde 1d6 PM e fica esmorecida (Von evita). 3) Perseguição: a vítima da mordida faz Vontade; se falhar, até o fim da cena considera seus aliados como inimigos para efeitos de como suas habilidades interagem com eles. 4) Morte: a vítima da mordida não pode recuperar PV por 1 rodada."
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, percepção às cegas (longo), visão no escuro",
        "defesaObs": "cura acelerada 20, imunidade a ácido, efeitos mentais, eletricidade, encantamento, medo e trevas, redução de dano 20/mágico",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+26"
            },
            {
                "nome": "Guerra",
                "valor": "+19"
            },
            {
                "nome": "Intimidação",
                "valor": "+23"
            },
            {
                "nome": "Intuição",
                "valor": "+18"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Mestre do Pesadelo",
        "tipo": "Construto Enorme",
        "nd": "15",
        "iniciativa": "+16",
        "percepcao": "+18",
        "defesa": "48",
        "fort": "+22",
        "ref": "+28",
        "von": "+15",
        "pv": "780",
        "desl": "15m (10q)",
        "atributos": {
            "for": "11",
            "des": "3",
            "con": "6",
            "int": "4",
            "sab": "3",
            "car": "5"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+43",
                "dano": "4d8+20",
                "desc": ""
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+43",
                "dano": "2d8+10",
                "desc": ""
            },
            {
                "nome": "Cauda-espinho",
                "tipo": "À Distância",
                "bonus": "+43",
                "dano": "3d4+20",
                "desc": "Perfuração, alcance curto."
            },
            {
                "nome": "Cauda-ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+43",
                "dano": "3d4+10",
                "desc": "Perfuração, mais peçonha anciã (perde 3d12 PV por rodada durante 3 rodadas e ignora imunidade a veneno, Fort CD 40 reduz para 1 rodada)."
            },
            {
                "nome": "Cauda-lâmina",
                "tipo": "Corpo a Corpo",
                "bonus": "+43",
                "dano": "3d6+20",
                "desc": "18/x3, corte."
            },
            {
                "nome": "Cauda-tentáculo",
                "tipo": "Corpo a Corpo",
                "bonus": "+43",
                "dano": "1d6+10",
                "desc": "Esmagamento, mais agarrar aprimorado (teste +50)."
            }
        ],
        "habilidades": [
            {
                "nome": "Manifestar Pesadelo",
                "tipo": "Qualidade",
                "desc": "Pode lançar a magia Sonho, bem como qualquer magia de ilusão, como um feiticeiro de 15º nível sem gastar PM (CD 40, limite de PM 15)."
            },
            {
                "nome": "Mente Alienígena",
                "tipo": "Qualidade",
                "desc": "Quando uma criatura usa um efeito mental ou de encantamento contra o Mestre, é atingida por um terrível choque de retorno: sofre 12d6 de dano psíquico e fica atordoada por 1 rodada e abalada (Von CD 40 reduz à metade e evita as condições)."
            },
            {
                "nome": "Múltiplas Caudas",
                "tipo": "Qualidade",
                "desc": "Possui quatro caudas diferentes (espinho, ferrão, lâmina e tentáculo). Ao fazer a ação agredir, pode atacar uma vez com cada cauda e uma vez com a mordida."
            },
            {
                "nome": "Natureza Onírica",
                "tipo": "Qualidade",
                "desc": "Tem 50% de chance de ignorar dano, condições e penalidades causadas por fontes não mágicas."
            },
            {
                "nome": "Partilhar Pesadelo",
                "tipo": "Qualidade",
                "desc": "Emana uma aura de 30m de raio. Outras criaturas do pesadelo na área podem usar a habilidade Natureza do Pesadelo do Mestre."
            },
            {
                "nome": "Pesadelo Primordial",
                "tipo": "Qualidade",
                "desc": "Cada Mestre possui a habilidade Natureza do Pesadelo correspondente ao pesadelo que representa. Pode usá-la também com os ataques de garra."
            }
        ],
        "tesouro": "Centelha onírica (CD 30 para extrair). Se absorvida, permite lançar uma magia de ilusão de até 2º círculo, escolhida ao receber a habilidade (atributo-chave Carisma)",
        "observacao": "Os quatro Mestres: Arquean (Desastre), Zulfahar (Fracasso), Daennya (Perseguição) e Tolzir (Morte). Natureza do Pesadelo (cada soldado e Mestre possui uma, à escolha ou 1d4; CD igual à de Mente Alienígena): 1) Desastre: quem sofre a mordida fica confuso (Von evita; uma vez por cena por criatura). 2) Fracasso: a vítima da mordida perde 1d6 PM e fica esmorecida (Von evita). 3) Perseguição: a vítima da mordida faz Vontade; se falhar, até o fim da cena considera seus aliados como inimigos para efeitos de como suas habilidades interagem com eles. 4) Morte: a vítima da mordida não pode recuperar PV por 1 rodada."
    },
    {
        "pm": "0",
        "percepcaoObs": "percepção às cegas (longo), visão no escuro",
        "defesaObs": "cura acelerada 20, imunidade a ácido, efeitos mentais, eletricidade, encantamento, medo e trevas, incorpórea, maior que a morte, redução de dano 30",
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+20"
            },
            {
                "nome": "Cura",
                "valor": "+18"
            },
            {
                "nome": "Diplomacia",
                "valor": "+22"
            },
            {
                "nome": "Furtividade",
                "valor": "+24"
            },
            {
                "nome": "Intimidação",
                "valor": "+24"
            },
            {
                "nome": "Intuição",
                "valor": "+18"
            },
            {
                "nome": "Misticismo",
                "valor": "+22"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Judara, Soberana do Pesadelo",
        "tipo": "Construto Médio",
        "nd": "19",
        "iniciativa": "+19",
        "percepcao": "+20",
        "defesa": "51",
        "fort": "+17",
        "ref": "+24",
        "von": "+30",
        "pv": "720",
        "desl": "voo 18m (12q)",
        "atributos": {
            "for": "—",
            "des": "5",
            "con": "2",
            "int": "6",
            "sab": "4",
            "car": "8"
        },
        "ataques": [
            {
                "nome": "Quatro tentáculos oníricos",
                "tipo": "Corpo a Corpo",
                "bonus": "+44",
                "dano": "6d12+28 psíquico",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Manifestar Pesadelo",
                "tipo": "Qualidade",
                "desc": "Pode lançar a magia Sonho, bem como qualquer magia de encantamento e ilusão, como uma feiticeira de 17º nível sem gastar PM (CD 46, limite de PM 17). Uma vez por rodada, pode lançar uma dessas magias como ação livre."
            },
            {
                "nome": "Mente Alienígena",
                "tipo": "Qualidade",
                "desc": "Quando uma criatura usa um efeito mental ou de encantamento contra Judara, é atingida por um terrível choque de retorno: sofre 15d6 de dano psíquico e fica atordoada por 1 rodada e abalada (Von CD 46 reduz à metade e evita as condições)."
            },
            {
                "nome": "Partilhar Pesadelos",
                "tipo": "Qualidade",
                "desc": "Emana uma aura de 30m de raio. Outras criaturas do pesadelo na área podem usar as habilidades Natureza do Pesadelo dela."
            },
            {
                "nome": "Epítome do Pesadelo",
                "tipo": "Qualidade",
                "desc": "Possui todas as habilidades Natureza do Pesadelo. Pode usar cada uma uma vez por rodada com um ataque de tentáculo onírico diferente."
            },
            {
                "nome": "Vilã Modular",
                "tipo": "Qualidade",
                "desc": "Vilã modular com três partes, cada uma representando uma esfera de energia onírica. Cada parte tem 288 PV e usa a Defesa, os testes de resistência, as imunidades e a redução de dano de Judara. A cada rodada, para cada parte que não esteja desabilitada, Judara recebe um turno extra (respectivamente na iniciativa -5, -10 e -15), em que usa as habilidades de uma parte que ainda não tenha usado nessa rodada."
            },
            {
                "nome": "Parte Emaranhado Tentacular: Tentáculos Disruptivos",
                "tipo": "Qualidade",
                "desc": "Uma área de 9m de raio ao redor de Judara é terreno difícil."
            },
            {
                "nome": "Parte Emaranhado Tentacular: Agarrar Aprimorado",
                "tipo": "Movimento",
                "desc": "Faz a manobra agarrar contra uma criatura em alcance curto (teste +44). Pode manter até quatro criaturas agarradas assim."
            },
            {
                "nome": "Parte Emaranhado Tentacular: Arremesso Tentacular",
                "tipo": "Padrão",
                "desc": "Se começar o turno desta parte agarrando uma criatura menor que ela, arremessa-a 1d6 x 1,5m em uma direção à sua escolha. A vítima fica caída e, se atingir um obstáculo, sofre 1d6 de impacto para cada 1,5m arremessada."
            },
            {
                "nome": "Parte Escudo Mental: Mente Protegida",
                "tipo": "Qualidade",
                "desc": "Recebe +5 em Vontade e imunidade a dano psíquico."
            },
            {
                "nome": "Parte Escudo Mental: Erguer Defesas",
                "tipo": "Reação",
                "desc": "Uma vez por rodada, ao fazer um teste de Vontade, rola dois dados e usa o melhor resultado. Se passar, acumula uma carga psíquica."
            },
            {
                "nome": "Parte Escudo Mental: Rajada Mental",
                "tipo": "Padrão",
                "desc": "Dispara energia psíquica contra uma criatura em alcance médio, como a magia Adaga Mental sem gastar PM (CD 35, limite de PM 17). Gasta todas as cargas psíquicas acumuladas; para cada carga, causa +2d6 de dano. Recarga (movimento)."
            },
            {
                "nome": "Parte Gerador de Aura: Aura Obscurecente",
                "tipo": "Qualidade",
                "desc": "Gera uma aura psíquica de 9m ao redor. Todas as criaturas dentro dela têm camuflagem leve (Judara percebe normalmente dentro da própria aura)."
            },
            {
                "nome": "Parte Gerador de Aura: Pulso Agressivo",
                "tipo": "Padrão",
                "desc": "A aura causa 10d6 de essência em todos os inimigos em seu interior (Von CD 35 reduz à metade)."
            }
        ],
        "tesouro": "Centelha onírica real (CD 32 para extrair). Se absorvida, permite lançar duas magias, de encantamento e ilusão, de até 2º círculo, escolhidas ao receber a habilidade (atributo-chave Carisma)"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "imunidade a fogo, redução de dano 10/mágico, vulnerabilidade a frio",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+15"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Rhayrachay",
        "tipo": "Espírito Grande",
        "nd": "11",
        "iniciativa": "+12",
        "percepcao": "+10",
        "defesa": "41",
        "fort": "+20",
        "ref": "+18",
        "von": "+15",
        "pv": "535",
        "desl": "12m (8q)",
        "atributos": {
            "for": "7",
            "des": "3",
            "con": "5",
            "int": "-2",
            "sab": "1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "6d6+23",
                "desc": "Mais 6d6 de fogo."
            }
        ],
        "habilidades": [
            {
                "nome": "Armadura Espinhosa",
                "tipo": "Qualidade",
                "desc": "Se agarrar ou for agarrado por uma criatura enquanto veste a armadura, causa dano igual à sua Força (7) na criatura envolvida na manobra. Esse dano é causado quando a manobra é feita e no início de cada turno dele, enquanto ela for mantida."
            },
            {
                "nome": "Saliva Incendiária",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida pela mordida fica em chamas. Se já estiver em chamas, em vez disso o dado de dano da condição aumenta em um passo."
            },
            {
                "nome": "Sopro",
                "tipo": "Padrão",
                "desc": "Cospe fogo em um cone de 6m. Criaturas na área sofrem 12d6+12 de fogo (Ref CD 31 reduz à metade). Recarga (movimento)."
            }
        ],
        "tesouro": "2d4 doses de essência abissal (CD 26 para extrair)",
        "equipamento": "Cota de malha espinhosa"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão na penumbra",
        "defesaObs": "redução de eletricidade 20",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Roca",
        "tipo": "Animal Colossal",
        "nd": "11",
        "iniciativa": "+12",
        "percepcao": "+13",
        "defesa": "39",
        "fort": "+11",
        "ref": "+24",
        "von": "+18",
        "pv": "550",
        "desl": "9m (6q), voo 36m (24q)",
        "atributos": {
            "for": "9",
            "des": "3",
            "con": "6",
            "int": "-4",
            "sab": "2",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "4d8+20",
                "desc": ""
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "4d10+20",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Garra (teste +40)."
            },
            {
                "nome": "Investida Aérea",
                "tipo": "Completa",
                "desc": "Faz uma investida voando e ataca com as duas garras. Os dois ataques recebem +2 da investida e, se ambos acertarem a mesma criatura, cada um causa +2d10 de dano."
            }
        ],
        "tesouro": "Especial (veja Ninho de Rocas)",
        "observacao": "Ninho de Roca. Habitantes (1d8): 1 orc mutante (ND 5); 2 serpe (ND 5); 3 enlouquecido rubro (ND 6); 4 dois ursos-coruja (ND 6); 5 amálgama esqueleto (ND 7); 6 ameba gigante (ND 7); 7 duas mantícoras (ND 8); 8 ankthyr (ND 8). Tesouro (1d8): 1 Metade; 2-3 Padrão; 4 dobro de dinheiro e padrão para itens; 5 padrão de dinheiro e dobro para itens; 6 Dobro."
    },
    {
        "pm": "0",
        "percepcaoObs": "percepção às cegas (longo, apenas dentro d'água), visão na penumbra",
        "defesaObs": "redução de dano 10, redução de ácido e frio 10",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+20"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Rodrocentar",
        "tipo": "Animal Enorme",
        "nd": "17",
        "iniciativa": "+15",
        "percepcao": "+16",
        "defesa": "52",
        "fort": "+30",
        "ref": "+17",
        "von": "+24",
        "pv": "1000",
        "desl": "6m (4q), natação 18m (12q)",
        "atributos": {
            "for": "6",
            "des": "1",
            "con": "5",
            "int": "-4",
            "sab": "2",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+47",
                "dano": "6d20+90",
                "desc": "Mais 8d8 de impacto."
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +52)."
            },
            {
                "nome": "Emergir",
                "tipo": "Completa",
                "desc": "Emerge à superfície da água, atingindo todas as criaturas em um quadrado de 6m imediatamente acima dele. Criaturas na área sofrem 6d12 de impacto e são arremessadas 1d4 x 1,5m na direção oposta (Fort CD 44 reduz à metade e evita o arremesso). Cada vítima fica caída e, se atingir um obstáculo, sofre 1d6 de impacto para cada 1,5m arremessada."
            },
            {
                "nome": "Engolir",
                "tipo": "Padrão",
                "desc": "No início de cada turno dele, a criatura engolida sofre 6d6+25 de impacto mais 6d6+25 de ácido. Escapa causando um total de 200 pontos de dano a ele (Defesa 25, redução de dano 0)."
            },
            {
                "nome": "Soçobrar",
                "tipo": "Padrão",
                "desc": "Atira o corpanzil contra uma embarcação (ou objeto semelhante), fazendo-a balançar violentamente. Todas as criaturas na embarcação sofrem 6d10+20 de impacto e ficam atordoadas por 1 rodada e caídas (Ref CD 44 reduz o dano à metade e evita as condições). Uma criatura só pode ser atordoada assim uma vez por cena."
            },
            {
                "nome": "Táticas de Caça",
                "tipo": "Qualidade",
                "desc": "Ao flanquear um inimigo, causa +2d8 de impacto com a mordida."
            }
        ],
        "tesouro": "Âmbar dourado (CD 32 para extrair, vale 1 PM para fabricar um item mágico que forneça bônus em Constituição ou cure pontos de vida)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a fogo",
        "pericias": [
            {
                "nome": "Ofício (ferreiro)",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Salamandra Plebeia",
        "tipo": "Espírito Médio",
        "nd": "4",
        "iniciativa": "+7",
        "percepcao": "+3",
        "defesa": "22",
        "fort": "+10",
        "ref": "+15",
        "von": "+5",
        "pv": "35",
        "desl": "9m (6q)",
        "atributos": {
            "for": "2",
            "des": "3",
            "con": "2",
            "int": "-1",
            "sab": "0",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Lança",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "1d6+9",
                "desc": "Mais 1d6 de fogo."
            },
            {
                "nome": "Cauda",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "1d6+9",
                "desc": "Mais 1d6 de fogo."
            },
            {
                "nome": "Lança",
                "tipo": "À Distância",
                "bonus": "+17",
                "dano": "1d6+9",
                "desc": "Mais 1d6 de fogo."
            }
        ],
        "habilidades": [
            {
                "nome": "Calor Natural",
                "tipo": "Qualidade",
                "desc": "Causa +1d6 de dano de fogo com seus ataques (já contabilizado)."
            },
            {
                "nome": "Sensibilidade ao Frio",
                "tipo": "Qualidade",
                "desc": "Sofre -5 em testes contra efeitos de frio e 1 ponto de dano adicional por dado de dano de frio."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Lança"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a fogo",
        "pericias": [
            {
                "nome": "Guerra",
                "valor": "+7"
            },
            {
                "nome": "Intimidação",
                "valor": "+9"
            },
            {
                "nome": "Ofício (ferreiro)",
                "valor": "+7"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Salamandra Guerreira",
        "tipo": "Espírito Médio",
        "nd": "6",
        "iniciativa": "+8",
        "percepcao": "+4",
        "defesa": "27",
        "fort": "+18",
        "ref": "+12",
        "von": "+6",
        "pv": "240",
        "desl": "9m (6q)",
        "atributos": {
            "for": "4",
            "des": "3",
            "con": "3",
            "int": "0",
            "sab": "0",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Tridente",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "1d8+17",
                "desc": "x3, mais 2d6 de fogo."
            },
            {
                "nome": "Cauda",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "1d6+17",
                "desc": "Mais 2d6 de fogo."
            },
            {
                "nome": "Tridente",
                "tipo": "À Distância",
                "bonus": "+20",
                "dano": "1d8+17",
                "desc": "x3, mais 2d6 de fogo."
            }
        ],
        "habilidades": [
            {
                "nome": "Calor Natural",
                "tipo": "Qualidade",
                "desc": "Causa +2d6 de dano de fogo com seus ataques (já contabilizado)."
            },
            {
                "nome": "Onda de Chamas",
                "tipo": "Completa",
                "desc": "Invoca uma onda de chamas de 12m de largura e 3m de altura que percorre 30m em linha reta. Criaturas na área sofrem 6d6 de fogo e ficam em chamas (Ref CD 22 reduz à metade e evita a condição). Recarga (movimento)."
            },
            {
                "nome": "Tridente Ardente",
                "tipo": "Padrão",
                "desc": "Dispara três raios de chamas do tridente contra uma criatura em alcance curto. Cada raio causa 4d6 de fogo (Ref CD 22 evita; um teste por raio). Recarga (movimento)."
            },
            {
                "nome": "Sensibilidade ao Frio",
                "tipo": "Qualidade",
                "desc": "Sofre -5 em testes contra efeitos de frio e 1 ponto de dano adicional por dado de dano de frio."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Couraça reforçada, tridente maciço"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a fogo, redução de dano 10",
        "pericias": [
            {
                "nome": "Guerra",
                "valor": "+12"
            },
            {
                "nome": "Intimidação",
                "valor": "+13"
            },
            {
                "nome": "Nobreza",
                "valor": "+12"
            },
            {
                "nome": "Ofício (ferreiro)",
                "valor": "+12"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Salamandra Nobre",
        "tipo": "Espírito Médio",
        "nd": "8",
        "iniciativa": "+11",
        "percepcao": "+7",
        "defesa": "33",
        "fort": "+21",
        "ref": "+15",
        "von": "+8",
        "pv": "320",
        "desl": "9m (6q)",
        "atributos": {
            "for": "5",
            "des": "3",
            "con": "4",
            "int": "2",
            "sab": "0",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Tridente",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "2d8+20",
                "desc": "19/x3, mais 2d6 de fogo."
            },
            {
                "nome": "Cauda",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "2d6+20",
                "desc": "Mais 2d6 de fogo."
            },
            {
                "nome": "Tridente",
                "tipo": "À Distância",
                "bonus": "+26",
                "dano": "2d8+20",
                "desc": "19/x3, mais 2d6 de fogo."
            }
        ],
        "habilidades": [
            {
                "nome": "Calor Natural",
                "tipo": "Qualidade",
                "desc": "Causa +2d6 de dano de fogo com seus ataques (já contabilizado)."
            },
            {
                "nome": "Onda de Chamas",
                "tipo": "Completa",
                "desc": "Invoca uma onda de chamas de 12m de largura e 3m de altura que percorre 30m em linha reta. Criaturas na área sofrem 8d6 de fogo e ficam em chamas (Ref CD 26 reduz à metade e evita a condição). Recarga (movimento)."
            },
            {
                "nome": "Realeza Flamejante",
                "tipo": "Qualidade",
                "desc": "No início de cada turno dela, todas as criaturas adjacentes sofrem 2d6 de fogo."
            },
            {
                "nome": "Tridente Ardente",
                "tipo": "Padrão",
                "desc": "Dispara três raios de chamas do tridente contra uma criatura em alcance curto. Cada raio causa 5d6 de fogo (Ref CD 26 evita; um teste por raio). Recarga (movimento)."
            },
            {
                "nome": "Sensibilidade ao Frio",
                "tipo": "Qualidade",
                "desc": "Sofre -5 em testes contra efeitos de frio e 1 ponto de dano adicional por dado de dano de frio."
            }
        ],
        "tesouro": "Dobro",
        "equipamento": "Couraça reforçada, tridente maciço de mitral"
    },
    {
        "pm": "0",
        "percepcaoObs": "",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+5"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Saqueador Bruto",
        "tipo": "Humanoide (humano) Médio",
        "nd": "1/2",
        "iniciativa": "+2",
        "percepcao": "+3",
        "defesa": "12",
        "fort": "+5",
        "ref": "+1",
        "von": "+2",
        "pv": "9",
        "desl": "9m (6q)",
        "atributos": {
            "for": "3",
            "des": "0",
            "con": "2",
            "int": "-1",
            "sab": "1",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Tacape",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d10+5",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Nativo das Sanguinárias",
                "tipo": "Qualidade",
                "desc": "Recebe +2 em testes e rolagens de dano contra monstros."
            },
            {
                "nome": "Retaliação Brutal",
                "tipo": "Reação",
                "desc": "Quando é reduzido a 0 PV ou menos por uma criatura adjacente, faz um ataque de tacape contra essa criatura."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Tacape"
    },
    {
        "pm": "0",
        "percepcaoObs": "",
        "defesaObs": "evasão",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+6"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Saqueador Pugilista",
        "tipo": "Humanoide (humano) Médio",
        "nd": "1",
        "iniciativa": "+3",
        "percepcao": "+3",
        "defesa": "15",
        "fort": "+10",
        "ref": "+2",
        "von": "+4",
        "pv": "36",
        "desl": "9m (6q)",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "2",
            "int": "-1",
            "sab": "1",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Ataque desarmado x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d8+4",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Ataque desarmado (teste +12)."
            },
            {
                "nome": "Cabeçada Brutal",
                "tipo": "Qualidade",
                "desc": "Se fizer um ataque desarmado contra uma criatura que está agarrando, causa +1d8 de dano e deixa a criatura atordoada (Fort CD 14 evita). Uma criatura só pode ser atordoada por esta habilidade uma vez por cena."
            },
            {
                "nome": "Nativo das Sanguinárias",
                "tipo": "Qualidade",
                "desc": "Recebe +2 em testes e rolagens de dano contra monstros."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Manopla"
    },
    {
        "pm": "0",
        "percepcaoObs": "",
        "defesaObs": "evasão",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+7"
            },
            {
                "nome": "Guerra",
                "valor": "+2"
            },
            {
                "nome": "Intimidação",
                "valor": "+8"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+7"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Saqueador Líder de Bando",
        "tipo": "Humanoide (humano) Médio",
        "nd": "3",
        "iniciativa": "+4",
        "percepcao": "+5",
        "defesa": "21",
        "fort": "+13",
        "ref": "+5",
        "von": "+9",
        "pv": "105",
        "desl": "9m (6q)",
        "atributos": {
            "for": "4",
            "des": "1",
            "con": "3",
            "int": "-1",
            "sab": "2",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Machado de batalha",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d10+10",
                "desc": "x3."
            }
        ],
        "habilidades": [
            {
                "nome": "Incitar o Bando",
                "tipo": "Movimento",
                "desc": "Grita ordens para aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena e 10 PV temporários (apenas uma vez por cena)."
            },
            {
                "nome": "Nativo das Sanguinárias",
                "tipo": "Qualidade",
                "desc": "Recebe +3 em testes e rolagens de dano contra monstros."
            },
            {
                "nome": "Perseverança Brutal",
                "tipo": "Reação",
                "desc": "Uma vez por cena, quando sofre dano, evita esse dano."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura de couro macabra, machado de batalha"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Sarcodio",
        "tipo": "Morto-vivo Médio",
        "nd": "3",
        "iniciativa": "+0",
        "percepcao": "-1",
        "defesa": "20",
        "fort": "+15",
        "ref": "+3",
        "von": "+9",
        "pv": "98",
        "desl": "6m (4q)",
        "atributos": {
            "for": "4",
            "des": "-1",
            "con": "2",
            "int": "-5",
            "sab": "-2",
            "car": "-4"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d6+3",
                "desc": ""
            },
            {
                "nome": "Pancada",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d6+3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Anatomia Insana Acidental",
                "tipo": "Qualidade",
                "desc": "Tem 25% de chance de ignorar qualquer dano. A área atingida não era exatamente necessária para o funcionamento do morto-vivo."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "cura acelerada 10, imunidade a atordoamento e petrificação, redução de dano 10/adamante, resistência a magia +5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+16"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Tausideros",
        "tipo": "Monstro Grande",
        "nd": "9",
        "iniciativa": "+8",
        "percepcao": "+11",
        "defesa": "42",
        "fort": "+20",
        "ref": "+13",
        "von": "+26",
        "pv": "350",
        "desl": "12m (8q)",
        "atributos": {
            "for": "8",
            "des": "0",
            "con": "5",
            "int": "-4",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "4d8+26",
                "desc": "Mais 2d12 de ácido."
            }
        ],
        "habilidades": [
            {
                "nome": "Investida Avassaladora",
                "tipo": "Completa",
                "desc": "Faz uma investida com os chifres. Se acertar, causa +4d8 de dano e arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 28 evita). A vítima fica caída e, se atingir um obstáculo, sofre 1d6 de impacto para cada 1,5m arremessada."
            },
            {
                "nome": "Sopro Petrificante",
                "tipo": "Padrão",
                "desc": "Exala gás petrificante em um cone de 9m. Cada criatura na área sofre 6d6 de ácido e fica lenta (CD 28 reduz à metade e evita a condição). Se já estiver lenta, fica petrificada permanentemente. Efeitos que removem paralisia revertem a petrificação. Metamorfose. Recarga (movimento)."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, visão na penumbra",
        "defesaObs": "resistência a efeitos de movimento +5",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+7"
            },
            {
                "nome": "Atletismo",
                "valor": "+5"
            },
            {
                "nome": "Furtividade",
                "valor": "+9"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Texugo",
        "tipo": "Animal Pequeno",
        "nd": "1/2",
        "iniciativa": "+5",
        "percepcao": "+5",
        "defesa": "14",
        "fort": "+3",
        "ref": "+5",
        "von": "+0",
        "pv": "16",
        "desl": "12m (8q), escavar 3m (2q)",
        "atributos": {
            "for": "-1",
            "des": "3",
            "con": "2",
            "int": "-4",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+6",
                "dano": "1d6+1",
                "desc": ""
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+6",
                "dano": "1d4+1",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Retalhação Furiosa",
                "tipo": "Qualidade",
                "desc": "Quando sofre dano, recebe +2 em testes de ataque e rolagens de dano até o fim do próximo turno."
            },
            {
                "nome": "Parceiro",
                "tipo": "Qualidade",
                "desc": "Parceiro especial (combatente). Iniciante: uma vez por rodada, você recebe +1d4 em um teste de ataque corpo a corpo. Veterano: sua margem de ameaça com armas corpo a corpo aumenta em +1. Mestre: quando sofre dano, você recebe +2 em testes de ataque e rolagens de dano até o fim do próximo turno."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "resistência a magia +3",
        "pericias": [
            {
                "nome": "Misticismo",
                "valor": "+18"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+14"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Tirano Ocular",
        "tipo": "Monstro Grande",
        "nd": "13",
        "iniciativa": "+8",
        "percepcao": "+17",
        "defesa": "42",
        "fort": "+20",
        "ref": "+13",
        "von": "+26",
        "pv": "440",
        "desl": "voo 9m (6q)",
        "atributos": {
            "for": "0",
            "des": "2",
            "con": "4",
            "int": "3",
            "sab": "2",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "4d6+30",
                "desc": "Mais 2d12 de ácido."
            }
        ],
        "habilidades": [
            {
                "nome": "Aura Devoradora",
                "tipo": "Qualidade",
                "desc": "Projeta uma aura constante de fome mágica de 18m. Dentro dela, as habilidades mágicas das outras criaturas custam +1 PM."
            },
            {
                "nome": "Mil Olhos",
                "tipo": "Movimento",
                "desc": "Dispara 1d4 olhos menores, que emitem os efeitos a seguir (role 1d6 para cada olho; o mesmo efeito pode ser usado mais de uma vez na mesma ação). Recarga (movimento)."
            },
            {
                "nome": "Mil Olhos 1: Olhar Enervante",
                "tipo": "Movimento",
                "desc": "Uma criatura em alcance médio fica apavorada por 1 rodada e depois abalada até o fim da cena (Von CD 37 reduz para abalada por 1d4 rodadas)."
            },
            {
                "nome": "Mil Olhos 2: Olhar Cativante",
                "tipo": "Movimento",
                "desc": "Uma criatura em alcance médio sofre o efeito básico da magia Enfeitiçar (Von CD 37 evita)."
            },
            {
                "nome": "Mil Olhos 3: Olhar Corrosivo",
                "tipo": "Movimento",
                "desc": "Projeta energia corrosiva em um cone de 9m. Criaturas na área sofrem 6d12 de ácido e são cobertas por muco (Ref CD 37 reduz à metade e evita o muco). Uma criatura coberta sofre 2d12 de ácido no início de cada um dos dois próximos turnos do tirano."
            },
            {
                "nome": "Mil Olhos 4: Olhar Debilitante",
                "tipo": "Movimento",
                "desc": "Uma criatura em alcance médio fica exausta por 1 rodada e caída (Fort CD 37 reduz para fatigada por 1d4 rodadas)."
            },
            {
                "nome": "Mil Olhos 5: Olhar Energético",
                "tipo": "Movimento",
                "desc": "Criaturas à escolha do tirano em alcance médio sofrem 4d12+4 de essência e ficam ofuscadas por 1d4 rodadas (Ref CD 37 reduz à metade e evita a condição)."
            },
            {
                "nome": "Mil Olhos 6: Olhar Retardador",
                "tipo": "Movimento",
                "desc": "Uma criatura em alcance médio fica paralisada por 1 rodada e depois lenta (Fort CD 37 reduz para lenta por 1d4 rodadas)."
            },
            {
                "nome": "Mordida Descendente",
                "tipo": "Movimento",
                "desc": "Faz um ataque de mordida contra uma criatura caída."
            },
            {
                "nome": "Tentáculos Cruéis",
                "tipo": "Padrão",
                "desc": "Pode agarrar uma criatura em alcance curto e arrastá-la para a boca (teste +40). Se fizer isso, o alvo fica agarrado e caído adjacente ao tirano."
            },
            {
                "nome": "Triolhos Místicos",
                "tipo": "Padrão",
                "desc": "Dispara um de seus olhos principais (Monóculo Abascanto, Desintegrador ou Petrificante). Não pode disparar o mesmo olho duas vezes em sequência."
            },
            {
                "nome": "Triolhos Místicos: Monóculo Abascanto",
                "tipo": "Padrão",
                "desc": "Projeta o efeito básico de Dissipar Magia em uma esfera de 3m de raio em alcance médio."
            },
            {
                "nome": "Triolhos Místicos: Monóculo Desintegrador",
                "tipo": "Padrão",
                "desc": "Dispara um raio fino e esverdeado que causa 10d12 de essência em uma criatura ou objeto em alcance médio (Fort CD 37 reduz para 2d12). Independentemente do teste, se os PV do alvo forem reduzidos a 0 ou menos, ele é completamente desintegrado."
            },
            {
                "nome": "Triolhos Místicos: Monóculo Petrificante",
                "tipo": "Padrão",
                "desc": "Projeta ondas petrificantes em um cone de 9m. Criaturas na área ficam lentas (Fort CD 37 evita). Se já estiver lenta, a criatura fica petrificada permanentemente. Efeitos que removem paralisia revertem a petrificação. Metamorfose."
            },
            {
                "nome": "Ver Através",
                "tipo": "Qualidade",
                "desc": "Está permanentemente sob efeito da magia Visão da Verdade, com todos os aprimoramentos."
            },
            {
                "nome": "Visão Total",
                "tipo": "Qualidade",
                "desc": "Enxerga em todas as direções e não pode ser flanqueado."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "cura acelerada 15/ácido ou fogo",
        "pericias": [
            {
                "nome": "Diplomacia",
                "valor": "+7"
            },
            {
                "nome": "Intimidação",
                "valor": "+13"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Troll da Ponte",
        "tipo": "Monstro Grande",
        "nd": "7",
        "iniciativa": "+4",
        "percepcao": "+4",
        "defesa": "29",
        "fort": "+17",
        "ref": "+13",
        "von": "+8",
        "pv": "225",
        "desl": "9m (6q)",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "6",
            "int": "-1",
            "sab": "0",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Tacape",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "3d6+19",
                "desc": ""
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d8+19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Expulsão Violenta",
                "tipo": "Livre",
                "desc": "Quando acerta um ataque de tacape, arremessa a vítima 1d4 x 1,5m (o dobro se estiver na ponte dele) em uma direção à sua escolha (Fort CD 24 evita). A vítima fica caída e, se atingir um obstáculo, sofre 1d6 de impacto para cada 1,5m arremessada."
            },
            {
                "nome": "Pedágio do Troll",
                "tipo": "Qualidade",
                "desc": "Cobra um pedágio por criatura equivalente a 1d4 x T$ 100 (role uma vez para cada troll); pagar permite atravessar em segurança. É possível reduzir o pedágio pela metade com um teste estendido de Diplomacia (CD 24, 3 sucessos). Uma falha o enfurece: cobra o dobro e recebe +3 em testes de ataque e rolagens de dano até o fim da cena."
            },
            {
                "nome": "Ponte",
                "tipo": "Qualidade",
                "desc": "Possui uma ponte, ou passagem semelhante, que funciona como seu covil. Dentro dela, ou a até 9m dela, recebe +3 na Defesa e sua cura acelerada aumenta para 30."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Tacape aumentado"
    },
    {
        "pm": "0",
        "percepcaoObs": "faro, percepção às cegas, visão no escuro",
        "defesaObs": "cura acelerada 30/ácido ou fogo, imunidade a frio, redução de dano 5",
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+16"
            },
            {
                "nome": "Atletismo",
                "valor": "+20"
            },
            {
                "nome": "Furtividade",
                "valor": "+28"
            },
            {
                "nome": "Guerra",
                "valor": "+14"
            },
            {
                "nome": "Intimidação",
                "valor": "+14"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+15"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Troll Kirtryoll",
        "tipo": "Monstro Grande",
        "nd": "15",
        "iniciativa": "+18",
        "percepcao": "+17",
        "defesa": "43",
        "fort": "+22",
        "ref": "+28",
        "von": "+15",
        "pv": "730",
        "desl": "12m (8q), natação 9m (6q)",
        "atributos": {
            "for": "7",
            "des": "3",
            "con": "6",
            "int": "1",
            "sab": "2",
            "car": "-1"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+43",
                "dano": "4d8+28",
                "desc": ""
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+43",
                "dano": "2d12+28",
                "desc": "19."
            },
            {
                "nome": "Arco longo x2",
                "tipo": "À Distância",
                "bonus": "+39",
                "dano": "4d8+38",
                "desc": "x3, mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Absorver Energia",
                "tipo": "Qualidade",
                "desc": "Se fosse sofrer dano de frio, em vez disso recebe PV temporários iguais ao dano que sofreria. Para cada 10 PV temporários recebidos assim, recebe +1 em testes de ataque e rolagens de dano até o fim da cena. Sob efeito de Campo de Invisibilidade, esta habilidade também se aplica a dano de luz."
            },
            {
                "nome": "Campo de Invisibilidade",
                "tipo": "Movimento",
                "desc": "Fica invisível (camuflagem total e +10 em Furtividade, já contabilizado, e criaturas que não possam percebê-lo ficam desprevenidas) até o fim da cena ou até sofrer um acerto crítico. Recarga (padrão)."
            },
            {
                "nome": "Condicionamento de Predador",
                "tipo": "Qualidade",
                "desc": "Pode se esconder mesmo sem camuflagem ou cobertura disponíveis, não sofre penalidade em Furtividade por se mover ao deslocamento normal e reduz a penalidade em Furtividade por atacar e fazer ações chamativas para -5."
            },
            {
                "nome": "Dilacerar",
                "tipo": "Qualidade",
                "desc": "Se acerta os dois ataques de garra em uma mesma criatura na mesma rodada, causa mais 4d12+28 de dano."
            },
            {
                "nome": "Marca da Presa",
                "tipo": "Movimento",
                "desc": "Analisa uma criatura em alcance curto. Até o fim da cena, recebe +2d10 em rolagens de dano contra essa criatura. Esse dano adicional é dobrado contra criaturas desprevenidas."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha potente (perde 2d12 PV durante 3 rodadas, Fort CD 40 reduz a duração para 1 rodada)."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Arco longo, flechas x20, peçonha potente x4"
    },
    {
        "pm": "69",
        "percepcaoObs": "faro, visão no escuro",
        "defesaObs": "cura acelerada 20/ácido ou fogo",
        "pericias": [
            {
                "nome": "Intimidação",
                "valor": "+11"
            },
            {
                "nome": "Misticismo",
                "valor": "+11"
            },
            {
                "nome": "Ofício (alquimista)",
                "valor": "+11"
            },
            {
                "nome": "Ofício (cozinheiro)",
                "valor": "+11"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+16"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Troll Xamã",
        "tipo": "Monstro Grande",
        "nd": "13",
        "iniciativa": "+12",
        "percepcao": "+14",
        "defesa": "41",
        "fort": "+20",
        "ref": "+13",
        "von": "+26",
        "pv": "455",
        "desl": "9m (6q)",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "6",
            "int": "1",
            "sab": "4",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Bordão x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "2d8+30",
                "desc": "Mais 4d6 de ácido."
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "1d8+30",
                "desc": "Mais 6d6 de ácido."
            }
        ],
        "habilidades": [
            {
                "nome": "Elo com a Natureza",
                "tipo": "Qualidade",
                "desc": "Se estiver a pelo menos 30m do covil, recupera 5 PM no início de cada turno."
            },
            {
                "nome": "Lacaios Arbustos",
                "tipo": "Qualidade",
                "desc": "Está sempre acompanhado por 2d4+2 lacaios arbustos animados. Cada arbusto tem deslocamento 9m (sem redução por terreno difícil natural) e pode gastar uma ação padrão para causar 2d6+4 de corte em uma criatura a até 3m. Têm For 3, Des 1, Defesa 27 e 1 PV e falham automaticamente em qualquer teste oposto ou de resistência. Se perder um lacaio, o troll cria um novo com 1 dia de trabalho."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um conjurador divino de 13º nível (CD 37)."
            },
            {
                "nome": "Magia: Coluna de Chamas",
                "tipo": "Padrão",
                "desc": "Custos: 13 PM. Cilindro de fogo sagrado de 3m de raio e 30m de altura desce dos céus em alcance longo, causando 13d6 de fogo mais 6d6 de luz nas criaturas e objetos livres na área (Ref reduz à metade)."
            },
            {
                "nome": "Magia: Curar Ferimentos",
                "tipo": "Padrão",
                "desc": "Custos: 13 PM. Uma criatura adjacente cura 14d8+14 PV."
            },
            {
                "nome": "Magia: Desintegrar",
                "tipo": "Padrão",
                "desc": "Custos: 10 PM. Uma criatura ou objeto em alcance médio sofre 10d12 de essência (Fort reduz para 2d12). Se reduzido a 0 PV, o alvo vira pó."
            },
            {
                "nome": "Magia: Imobilizar",
                "tipo": "Padrão",
                "desc": "Custos: 9 PM. Uma criatura em alcance curto fica paralisada (Von reduz para lenta). A cada rodada, a vítima pode gastar uma ação completa para fazer um novo teste de Vontade; se passar, se liberta."
            },
            {
                "nome": "Magia: Potência Divina",
                "tipo": "Padrão",
                "desc": "Custos: 13 PM, sustentada. O tamanho aumenta uma categoria e ele recebe Força +5 e redução de dano 15. Seus ataques passam a: bordão x2 +40 (2d10+35 mais 4d6 de ácido) e mordida +40 (1d10+35 mais 6d6 de ácido). Não pode lançar magias enquanto estiver sob efeito de Potência Divina."
            }
        ],
        "tesouro": "Padrão mais 1d4+1 poções",
        "equipamento": "Bordão, instrumentos de ofício (alquimista e cozinheiro)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "cura acelerada 5, redução de dano 5/luz",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+7"
            },
            {
                "nome": "Enganação",
                "valor": "+11"
            },
            {
                "nome": "Furtividade",
                "valor": "+8"
            },
            {
                "nome": "Intimidação",
                "valor": "+8"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Vampiro Neófito",
        "tipo": "Morto-vivo Médio",
        "nd": "5",
        "iniciativa": "+8",
        "percepcao": "+7",
        "defesa": "27",
        "fort": "+5",
        "ref": "+17",
        "von": "+11",
        "pv": "140",
        "desl": "12m (8q), escalar 12m (8q)",
        "atributos": {
            "for": "3",
            "des": "2",
            "con": "3",
            "int": "1",
            "sab": "1",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "1d8+10",
                "desc": "Mais 1d10 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Dominação Vampírica",
                "tipo": "Padrão",
                "desc": "Sussurra palavras de controle para um humanoide em alcance curto. A vítima fica confusa, enfeitiçada ou fascinada até o final da cena ou perde as memórias da última hora, à escolha do vampiro (Von CD 20 evita). Uma criatura só pode ser alvo desta habilidade uma vez por cena."
            },
            {
                "nome": "Drenar Sangue",
                "tipo": "Padrão",
                "desc": "Drena sangue de uma criatura viva que esteja agarrando: causa 4d6 de perfuração e recupera a mesma quantidade de PV. Uma criatura morta assim se ergue como um vampiro na próxima noite e deve vencer um teste de Vontade oposto contra o vampiro ou ficará sob o controle dele até que ele a liberte ou seja destruído."
            },
            {
                "nome": "Forma de Morcego",
                "tipo": "Padrão",
                "desc": "Transforma-se em um morcego: torna-se Minúsculo (+5 em Furtividade e -5 em testes de manobra) e recebe deslocamento de voo 12m. O equipamento é absorvido (retornando quando volta ao normal) e as outras estatísticas não mudam. A transformação dura o tempo que desejar, mas termina se fizer um ataque, lançar uma magia ou sofrer dano."
            },
            {
                "nome": "Sensibilidade ao Sol",
                "tipo": "Qualidade",
                "desc": "Quando exposto à luz solar direta, fica ofuscado e perde 3d6 PV por rodada."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura de couro, capa esvoaçante"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "cura acelerada 5, redução de dano 5/luz",
        "pericias": [
            {
                "nome": "Diplomacia",
                "valor": "+16"
            },
            {
                "nome": "Enganação",
                "valor": "+15"
            },
            {
                "nome": "Furtividade",
                "valor": "+12"
            },
            {
                "nome": "Intimidação",
                "valor": "+13"
            },
            {
                "nome": "Nobreza",
                "valor": "+10"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Vampiro Fidalgo",
        "tipo": "Morto-vivo Médio",
        "nd": "8",
        "iniciativa": "+12",
        "percepcao": "+11",
        "defesa": "34",
        "fort": "+8",
        "ref": "+21",
        "von": "+15",
        "pv": "280",
        "desl": "12m (8q), escalar 12m (8q)",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "3",
            "int": "2",
            "sab": "1",
            "car": "5"
        },
        "ataques": [
            {
                "nome": "Espada longa",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "1d8+18",
                "desc": "18, mais 2d10 de trevas."
            },
            {
                "nome": "Garra",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "1d8+18",
                "desc": "Mais 2d10 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Dominação Vampírica",
                "tipo": "Padrão",
                "desc": "Sussurra palavras de controle para um humanoide em alcance curto. A vítima fica confusa, enfeitiçada ou fascinada até o final da cena ou perde as memórias da última hora, à escolha do vampiro (Von CD 26 evita). Uma criatura só pode ser alvo desta habilidade uma vez por cena."
            },
            {
                "nome": "Drenar Sangue",
                "tipo": "Padrão",
                "desc": "Drena sangue de uma criatura viva que esteja agarrando: causa 4d6 de perfuração e recupera a mesma quantidade de PV. Uma criatura morta assim se ergue como um vampiro na próxima noite e deve vencer um teste de Vontade oposto contra o vampiro ou ficará sob o controle dele até que ele a liberte ou seja destruído."
            },
            {
                "nome": "Orgulho",
                "tipo": "Reação",
                "desc": "Uma vez por cena, ao fazer um teste de perícia, soma o dobro de seu Carisma (+10) nesse teste."
            },
            {
                "nome": "Presença Majestosa",
                "tipo": "Reação",
                "desc": "Quando uma criatura ataca o vampiro, deve passar em um teste de Vontade (CD 26) ou não conseguirá machucá-lo e perderá a ação. Quem passa não é mais afetado por esta habilidade até o fim da cena."
            },
            {
                "nome": "Sensibilidade ao Sol",
                "tipo": "Qualidade",
                "desc": "Quando exposto à luz solar direta, fica ofuscado e perde 4d6 PV por rodada."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Espada longa precisa, meia armadura reforçada, tabardo"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "cura acelerada 5, imunidade a frio, redução de dano 5/luz, redução de fogo 5",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+15"
            },
            {
                "nome": "Furtividade",
                "valor": "+13 (+15 em ártico)"
            },
            {
                "nome": "Intimidação",
                "valor": "+14"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+13"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Vampiro Caçador da Neve",
        "tipo": "Morto-vivo Médio",
        "nd": "10",
        "iniciativa": "+13",
        "percepcao": "+13",
        "defesa": "37",
        "fort": "+10",
        "ref": "+22",
        "von": "+16",
        "pv": "360",
        "desl": "12m (8q), sem redução por terreno difícil natural",
        "atributos": {
            "for": "5",
            "des": "2",
            "con": "3",
            "int": "0",
            "sab": "2",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Machado de batalha",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "1d8+18",
                "desc": "x3, mais 2d10 de trevas."
            },
            {
                "nome": "Garra",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "1d8+18",
                "desc": "Mais 2d10 de trevas."
            },
            {
                "nome": "Arco longo x2",
                "tipo": "À Distância",
                "bonus": "+29",
                "dano": "1d8+18",
                "desc": "x3, mais 2d10 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Drenar Sangue",
                "tipo": "Padrão",
                "desc": "Drena sangue de uma criatura viva que esteja agarrando: causa 4d6 de perfuração e recupera a mesma quantidade de PV. Uma criatura morta assim se ergue como um vampiro na próxima noite e deve vencer um teste de Vontade oposto contra o vampiro ou ficará sob o controle dele até que ele a liberte ou seja destruído."
            },
            {
                "nome": "Marca da Presa",
                "tipo": "Movimento",
                "desc": "Analisa uma criatura em alcance médio. Até o fim da cena, recebe +1d12 em rolagens de dano contra essa criatura."
            },
            {
                "nome": "Sensibilidade ao Sol",
                "tipo": "Qualidade",
                "desc": "Quando exposto à luz solar direta, fica ofuscado e perde 3d6 PV por rodada."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Arco longo, couro batido ajustado de gelo eterno, flechas x20, machado de batalha cruel, manto camuflado (ártico)"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "cura acelerada 10, redução de dano 10/luz",
        "pericias": [
            {
                "nome": "Diplomacia",
                "valor": "+21"
            },
            {
                "nome": "Enganação",
                "valor": "+19"
            },
            {
                "nome": "Furtividade",
                "valor": "+27"
            },
            {
                "nome": "Nobreza",
                "valor": "+15"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Vampiro Príncipe da Noite",
        "tipo": "Morto-vivo Médio",
        "nd": "16",
        "iniciativa": "+17",
        "percepcao": "+15",
        "defesa": "54",
        "fort": "+16",
        "ref": "+30",
        "von": "+24",
        "pv": "750",
        "desl": "18m (12q), escalar 18m (12q)",
        "atributos": {
            "for": "6",
            "des": "5",
            "con": "5",
            "int": "3",
            "sab": "3",
            "car": "7"
        },
        "ataques": [
            {
                "nome": "Espada longa x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+46",
                "dano": "2d8+25",
                "desc": "17, mais 2d10 de trevas."
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+46",
                "dano": "2d6+25",
                "desc": "Mais 2d10 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Dominação Vampírica",
                "tipo": "Padrão",
                "desc": "Sussurra palavras de controle para um humanoide em alcance curto. A vítima fica confusa, enfeitiçada ou fascinada até o final da cena ou perde as memórias da última hora, à escolha do vampiro (Von CD 42 evita). Uma criatura só pode ser alvo desta habilidade uma vez por cena."
            },
            {
                "nome": "Drenar Sangue",
                "tipo": "Padrão",
                "desc": "Drena sangue de uma criatura viva que esteja agarrando: causa 8d6 de perfuração e recupera a mesma quantidade de PV. Uma criatura morta assim se ergue como um vampiro na próxima noite e deve vencer um teste de Vontade oposto contra o vampiro ou ficará sob o controle dele até que ele a liberte ou seja destruído."
            },
            {
                "nome": "Forma de Morcego",
                "tipo": "Padrão",
                "desc": "Transforma-se em um morcego: torna-se Minúsculo (+5 em Furtividade e -5 em testes de manobra) e recebe deslocamento de voo 12m. O equipamento é absorvido (retornando quando volta ao normal) e as outras estatísticas não mudam. Dura o tempo que desejar, mas termina se fizer um ataque, lançar uma magia ou sofrer dano."
            },
            {
                "nome": "Orgulho",
                "tipo": "Reação",
                "desc": "Uma vez por cena, ao fazer um teste de perícia, soma o dobro de seu Carisma (+14) nesse teste."
            },
            {
                "nome": "Presença Majestosa",
                "tipo": "Reação",
                "desc": "Quando uma criatura ataca o vampiro, deve passar em um teste de Vontade (CD 42) ou não conseguirá machucá-lo e perderá a ação. Quem passa não é mais afetado por esta habilidade até o fim da cena."
            },
            {
                "nome": "Séquito Sombrio",
                "tipo": "Qualidade",
                "desc": "Está sempre acompanhado de três vampiros fidalgos, que não contam para o cálculo de XP e tesouro do encontro."
            },
            {
                "nome": "Sensibilidade ao Sol",
                "tipo": "Qualidade",
                "desc": "Quando exposto à luz solar direta, fica ofuscado e perde 8d6 PV por rodada."
            }
        ],
        "tesouro": "Dobro",
        "equipamento": "Armadura completa delicada de mitral, espada longa precisa de mitral, tabardo aprimorado"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "evasão, não pode ser flanqueado",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Varghar",
        "tipo": "Morto-vivo Médio",
        "nd": "2",
        "iniciativa": "+8",
        "percepcao": "+2",
        "defesa": "19",
        "fort": "+5",
        "ref": "+12",
        "von": "+5",
        "pv": "70",
        "desl": "voo 18m (12q)",
        "atributos": {
            "for": "-2",
            "des": "5",
            "con": "1",
            "int": "-2",
            "sab": "-1",
            "car": "-2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "2d6+11",
                "desc": "Mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Veneno Anticicatrizante",
                "tipo": "Qualidade",
                "desc": "A vítima não pode recuperar PV de nenhuma forma (incluindo efeitos mágicos e descanso) por 1d4+1 dias (Fort CD 16 reduz para 1 dia). Efeitos que curam venenos anulam esse efeito. Veneno."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "percepção às cegas, visão no escuro",
        "defesaObs": "imunidade a surpreendido",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+10"
            },
            {
                "nome": "Intuição",
                "valor": "+6"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+6"
            }
        ],
        "fonte": "Bestiário de Arton",
        "tipo": "Espírito Minúsculo",
        "nd": "1/2",
        "pv": "11",
        "desl": "6m (4q), sem redução por terreno difícil natural",
        "defesa": "12",
        "nome": "Vestígio da Encruzilhada",
        "iniciativa": "+5",
        "percepcao": "+6",
        "fort": "-1",
        "ref": "+3",
        "von": "+6",
        "atributos": {
            "for": "-2",
            "des": "3",
            "con": "1",
            "int": "0",
            "sab": "2",
            "car": "2"
        },
        "ataques": [],
        "habilidades": [
            {
                "nome": "Enxurrada de Possibilidades",
                "tipo": "Padrão",
                "desc": "Inunda de possibilidades a mente de uma criatura em alcance curto. A vítima sofre 2d6+3 de dano psíquico e fica confusa por 1 rodada (Von CD 15 reduz à metade e evita a condição). Uma criatura só pode ficar confusa por esta habilidade uma vez por cena."
            },
            {
                "nome": "Vislumbrar as Ramificações",
                "tipo": "Movimento",
                "desc": "Obtém um vislumbre do futuro próximo. Até o início do próximo turno, ao fazer um teste de perícia, pode gastar este vislumbre para rolar dois dados e usar o melhor resultado."
            },
            {
                "nome": "Familiar",
                "tipo": "Qualidade",
                "desc": "Um vestígio da encruzilhada familiar reduz em -1 PM o custo de habilidades que permitem rolar dois dados ao fazer um teste e usar o melhor resultado (como a magia Orientação)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a efeitos de metamorfose",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+3"
            },
            {
                "nome": "Furtividade",
                "valor": "+8"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+7"
            }
        ],
        "fonte": "Bestiário de Arton",
        "tipo": "Espírito Minúsculo",
        "nd": "1/2",
        "pv": "11",
        "desl": "6m (4q), sem redução por terreno difícil natural",
        "defesa": "12",
        "nome": "Vestígio da Transformação",
        "iniciativa": "+3",
        "percepcao": "+5",
        "fort": "+6",
        "ref": "-1",
        "von": "+3",
        "atributos": {
            "for": "-1",
            "des": "1",
            "con": "3",
            "int": "0",
            "sab": "3",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Chuva de petelecos x4",
                "tipo": "Corpo a Corpo",
                "bonus": "+5",
                "dano": "1d4",
                "desc": "Impacto."
            }
        ],
        "habilidades": [
            {
                "nome": "Transformação Feérica",
                "tipo": "Completa",
                "desc": "Muda de forma e aparência até o fim da cena, como no efeito básico da magia Metamorfose (Tormenta20, p. 198). Uma vez por cena."
            },
            {
                "nome": "Familiar",
                "tipo": "Qualidade",
                "desc": "Um vestígio da transformação familiar reduz em -1 PM o custo de habilidades com efeitos de metamorfose (como Forma Selvagem ou a magia Metamorfose)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "",
        "pericias": [
            {
                "nome": "Diplomacia",
                "valor": "+5"
            },
            {
                "nome": "Furtividade",
                "valor": "+9"
            },
            {
                "nome": "Intimidação",
                "valor": "+5"
            }
        ],
        "fonte": "Bestiário de Arton",
        "tipo": "Espírito Minúsculo",
        "nd": "1/2",
        "pv": "11",
        "desl": "6m (4q), sem redução por terreno difícil natural",
        "defesa": "12",
        "nome": "Vestígio do Limiar",
        "iniciativa": "+4",
        "percepcao": "+3",
        "fort": "+3",
        "ref": "+6",
        "von": "-1",
        "atributos": {
            "for": "-1",
            "des": "2",
            "con": "2",
            "int": "0",
            "sab": "1",
            "car": "3"
        },
        "ataques": [],
        "habilidades": [
            {
                "nome": "Natureza Dual",
                "tipo": "Qualidade",
                "desc": "Cada vestígio do limiar é formado por duas características do mundo natural. Escolha dois tipos de dano (Tormenta20, p. 230) para representá-las. Recebe redução 10 contra dano desses tipos e cada metade do dano de seu Raio Combinado é de um desses tipos."
            },
            {
                "nome": "Raio Combinado",
                "tipo": "Padrão",
                "desc": "Dispara um raio mágico em uma criatura em alcance curto. A vítima sofre 4d4 de dano (Ref CD 15 reduz à metade)."
            },
            {
                "nome": "Trilhar o Limiar",
                "tipo": "Movimento",
                "desc": "Tem 50% de chance de ignorar qualquer ataque ou efeito hostil usado contra ele. Este efeito acaba ao fim da cena ou após dois ataques e/ou efeitos hostis afetarem o vestígio. Recarga (movimento)."
            },
            {
                "nome": "Familiar",
                "tipo": "Qualidade",
                "desc": "Se uma de suas habilidades causar ao menos dois tipos de dano (como uma Bola de Fogo lançada com um catalisador líquen lilás), o vestígio do limiar familiar aumenta o dano de dois de seus tipos em +2 pontos cada."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "percepção às cegas (médio), visão no escuro",
        "defesaObs": "evasão, imunidade a efeitos de atordoamento, metabolismo e paralisia, redução de dano 10/prata, resistência a magia +3",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+9"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Vórtice de Mana",
        "tipo": "Espírito Grande",
        "nd": "16",
        "iniciativa": "+19",
        "percepcao": "+15",
        "defesa": "49",
        "fort": "+16",
        "ref": "+30",
        "von": "+24",
        "pv": "560",
        "desl": "voo 12m (8q)",
        "atributos": {
            "for": "4",
            "des": "5",
            "con": "3",
            "int": "-5",
            "sab": "1",
            "car": "-3"
        },
        "ataques": [
            {
                "nome": "Chicote de mana x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+44",
                "dano": "6d12+26",
                "desc": "Essência."
            }
        ],
        "habilidades": [
            {
                "nome": "Absorver Mana",
                "tipo": "Reação",
                "desc": "Toda vez que passa em um teste de resistência contra um efeito mágico, recupera 5 PV por cada PM gasto no efeito."
            },
            {
                "nome": "Redemoinho Arcano",
                "tipo": "Completa",
                "desc": "Percorre até o dobro do deslocamento, podendo passar por espaços ocupados por outras criaturas, mas sem repetir espaço. Cada criatura no caminho sofre 8d12 de essência e fica enjoada por 1 rodada (Ref CD 44 reduz à metade e evita a condição). A condição causada não é um efeito de metabolismo. Recarga (acertar 3 chicotadas de mana)."
            },
            {
                "nome": "Toque de Disjunção",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida por um chicote de mana faz um teste de Vontade (CD 44). Se falhar, deve escolher um de seus próprios itens mágicos, ou um efeito mágico que a esteja afetando, e o item ou efeito é dissipado como por Dissipar Magia."
            }
        ],
        "tesouro": "1d3 orbes de essência (CD 31 para extrair; cada orbe reduz em 1 PM o custo para fabricar um item mágico)"
    },
    {
        "pm": "87",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a frio, redução de dano 15/adamante mágico, resistência a magia +2",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+11"
            },
            {
                "nome": "Intuição",
                "valor": "+16"
            },
            {
                "nome": "Misticismo",
                "valor": "+15"
            },
            {
                "nome": "Religião",
                "valor": "+16"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Vulto Voador",
        "tipo": "Morto-vivo Enorme",
        "nd": "14",
        "iniciativa": "+13",
        "percepcao": "+15",
        "defesa": "42",
        "fort": "+14",
        "ref": "+22",
        "von": "+28",
        "pv": "525",
        "desl": "6m (4q), voo 24m (16q)",
        "atributos": {
            "for": "8",
            "des": "3",
            "con": "2",
            "int": "2",
            "sab": "3",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+37",
                "dano": "6d12+27",
                "desc": "19, mais 6d6 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Aversão ao Sol",
                "tipo": "Qualidade",
                "desc": "Enquanto exposto à luz do sol (mas não a magias ou efeitos que a simulem), fica ofuscado e vulnerável."
            },
            {
                "nome": "Aura Degradante",
                "tipo": "Qualidade",
                "desc": "Emana uma aura de 9m de raio equivalente à magia Profanar (e que se acumula com ela): nessa área, dano de trevas é maximizado e mortos-vivos recebem +2 na Defesa e em testes (já contabilizado para o vulto). Enquanto o vulto estiver em uma área sob efeito da magia Consagrar, tanto a magia quanto sua Aura Degradante são suprimidas."
            },
            {
                "nome": "Mordida Drenante",
                "tipo": "Qualidade",
                "desc": "Uma criatura viva atingida pela mordida perde 2d4 PM e fica fraca (Fort CD 40 reduz a perda à metade e evita a condição). As condições são cumulativas (fraca vira debilitada, debilitada vira inconsciente). Para cada PM que a criatura perde assim, o vulto recupera 5 PV e 1 PM."
            },
            {
                "nome": "Investida Aérea",
                "tipo": "Qualidade",
                "desc": "Ao fazer uma investida voando, causa +6d12 de dano e pode continuar se movendo após o ataque, até o limite do deslocamento."
            },
            {
                "nome": "Invocar Sombras",
                "tipo": "Completa",
                "desc": "Uma vez por cena, conjura seis sombras capangas em espaços desocupados em alcance médio. Agem a partir da próxima rodada do vulto, têm deslocamento voo 12m e gastam uma ação padrão para causar 2d10 de trevas em uma criatura adjacente (uma criatura viva atingida perde 1d4 PM; Fort CD 40 evita). São mortos-vivos incorpóreos, têm For -, Des 4, Defesa 35, 1 PV, falham automaticamente em qualquer teste oposto e deixam de ser incorpóreas enquanto expostas à luz do sol. Desaparecem quando mortas ou ao fim da cena."
            },
            {
                "nome": "Magia Acelerada",
                "tipo": "Livre",
                "desc": "Custos: +4 PM. Uma vez por rodada, ao lançar uma magia com execução de movimento, padrão ou completa, muda a execução dela para livre."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um feiticeiro de 14º nível (CD 40)."
            },
            {
                "nome": "Magia: Dissipar Magia",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado são dissipadas."
            },
            {
                "nome": "Magia: Erupção Glacial",
                "tipo": "Padrão",
                "desc": "Custos: 12 PM. Estacas de gelo irrompem do chão em uma área de 6m de lado em alcance médio. Criaturas na área sofrem 8d6 de corte e 8d6 de frio e ficam caídas (Ref evita o dano de corte e a condição). As estacas duram pela cena, tornam a área terreno difícil e dão cobertura leve a criaturas dentro ou atrás da área, mas são destruídas se sofrerem dano de fogo mágico."
            },
            {
                "nome": "Magia: Escuridão",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Até o fim da cena, um objeto em alcance curto emana escuridão total em raio de 6m, bloqueando a visão na área e através dela."
            },
            {
                "nome": "Magia: Invisibilidade",
                "tipo": "Padrão",
                "desc": "Custos: 13 PM. Fica invisível até o fim da cena (camuflagem total, +10 em Furtividade contra ouvir e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques)."
            },
            {
                "nome": "Magia: Miasma Mefítico",
                "tipo": "Padrão",
                "desc": "Custos: 14 PM. Uma nuvem de 6m de raio se forma em alcance médio. Criaturas na área sofrem 9d6 de trevas e ficam enjoadas por 1 rodada (Fort reduz à metade e evita a condição)."
            },
            {
                "nome": "Magia: Velocidade",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM, sustentada. Pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias."
            },
            {
                "nome": "Magia: Viagem Planar",
                "tipo": "Padrão",
                "desc": "Custos: 10 PM. Viaja para outro Plano."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "100",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a frio, redução de dano 15/adamante mágico, resistência a magia +2",
        "pericias": [
            {
                "nome": "Diplomacia",
                "valor": "+20"
            },
            {
                "nome": "Furtividade",
                "valor": "+13"
            },
            {
                "nome": "Intimidação",
                "valor": "+20"
            },
            {
                "nome": "Intuição",
                "valor": "+20"
            },
            {
                "nome": "Misticismo",
                "valor": "+19"
            },
            {
                "nome": "Religião",
                "valor": "+20"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Vulto Andarilho",
        "tipo": "Morto-vivo Enorme",
        "nd": "16",
        "iniciativa": "+16",
        "percepcao": "+18",
        "defesa": "48",
        "fort": "+16",
        "ref": "+24",
        "von": "+30",
        "pv": "714",
        "desl": "12m (8q)",
        "atributos": {
            "for": "9",
            "des": "2",
            "con": "3",
            "int": "3",
            "sab": "4",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Duas pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+44",
                "dano": "6d12+29",
                "desc": "x3, mais 6d6 de trevas."
            }
        ],
        "habilidades": [
            {
                "nome": "Aversão ao Sol",
                "tipo": "Qualidade",
                "desc": "Enquanto exposto à luz do sol (mas não a magias ou efeitos que a simulem), fica ofuscado e vulnerável."
            },
            {
                "nome": "Aura Degradante",
                "tipo": "Qualidade",
                "desc": "Emana uma aura de 9m de raio equivalente à magia Profanar (e que se acumula com ela): nessa área, dano de trevas é maximizado e mortos-vivos recebem +2 na Defesa e em testes (já contabilizado para o vulto). Enquanto o vulto estiver em uma área sob efeito da magia Consagrar, tanto a magia quanto sua Aura Degradante são suprimidas."
            },
            {
                "nome": "Invocar Sombras",
                "tipo": "Completa",
                "desc": "Uma vez por cena, conjura sete sombras capangas em espaços desocupados em alcance médio. Agem a partir da próxima rodada do vulto, têm deslocamento voo 12m e gastam uma ação padrão para causar 2d10 de trevas em uma criatura adjacente (uma criatura viva atingida perde 1d4 PM; Fort CD 44 evita). São mortos-vivos incorpóreos, têm For -, Des 4, Defesa 35, 1 PV, falham automaticamente em qualquer teste oposto e deixam de ser incorpóreas enquanto expostas à luz do sol. Desaparecem quando mortas ou ao fim da cena."
            },
            {
                "nome": "Magia Acelerada",
                "tipo": "Livre",
                "desc": "Custos: +4 PM. Uma vez por rodada, ao lançar uma magia com execução de movimento, padrão ou completa, muda a execução dela para livre."
            },
            {
                "nome": "Olhar Maligno",
                "tipo": "Movimento",
                "desc": "Uma criatura em alcance médio que possa ver o vulto fica paralisada por 1d4 rodadas (Von CD 44 evita e a criatura não pode mais ser paralisada por esta habilidade por 1 dia)."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um feiticeiro de 16º nível (CD 44)."
            },
            {
                "nome": "Magia: Dissipar Magia",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado são dissipadas."
            },
            {
                "nome": "Magia: Erupção Glacial",
                "tipo": "Padrão",
                "desc": "Custos: 15 PM. Estacas de gelo irrompem do chão em uma área de 6m de lado em alcance médio. Criaturas na área sofrem 10d6 de corte e 10d6 de frio e ficam caídas (Ref evita o dano de corte e a condição). As estacas duram pela cena, tornam a área terreno difícil e dão cobertura leve a criaturas dentro ou atrás da área, mas são destruídas se sofrerem dano de fogo mágico."
            },
            {
                "nome": "Magia: Escuridão",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Até o fim da cena, um objeto em alcance curto emana escuridão total em raio de 6m, bloqueando a visão na área e através dela."
            },
            {
                "nome": "Magia: Invisibilidade",
                "tipo": "Padrão",
                "desc": "Custos: 13 PM. Fica invisível até o fim da cena (camuflagem total, +10 em Furtividade contra ouvir e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques)."
            },
            {
                "nome": "Magia: Miasma Mefítico",
                "tipo": "Padrão",
                "desc": "Custos: 16 PM. Uma nuvem de 6m de raio se forma em alcance médio. Criaturas na área sofrem 10d6 de trevas e ficam enjoadas por 1 rodada (Fort reduz à metade e evita a condição)."
            },
            {
                "nome": "Magia: Toque da Morte",
                "tipo": "Padrão",
                "desc": "Custos: 15 PM. Uma criatura adjacente sofre 10d8+10 de trevas. Se estiver com menos da metade dos PV, em vez disso faz um teste de Fortitude; se passar sofre o dano normal, caso contrário seus PV são reduzidos a -10."
            },
            {
                "nome": "Magia: Velocidade",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM, sustentada. Pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias."
            },
            {
                "nome": "Magia: Viagem Planar",
                "tipo": "Padrão",
                "desc": "Custos: 10 PM. Viaja para outro Plano."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "130",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "imunidade a frio, redução de dano 15/adamante mágico, resistência a magia +2",
        "pericias": [
            {
                "nome": "Diplomacia",
                "valor": "+21"
            },
            {
                "nome": "Furtividade",
                "valor": "+7"
            },
            {
                "nome": "Intimidação",
                "valor": "+21"
            },
            {
                "nome": "Intuição",
                "valor": "+21"
            },
            {
                "nome": "Misticismo",
                "valor": "+20"
            },
            {
                "nome": "Religião",
                "valor": "+21"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Vulto Rastejante",
        "tipo": "Morto-vivo Colossal",
        "nd": "18",
        "iniciativa": "+15",
        "percepcao": "+19",
        "defesa": "52",
        "fort": "+22",
        "ref": "+22",
        "von": "+32",
        "pv": "798",
        "desl": "9m (6q), escavação 18m (12q)",
        "atributos": {
            "for": "11",
            "des": "0",
            "con": "4",
            "int": "3",
            "sab": "4",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+47",
                "dano": "6d12+30",
                "desc": "19, mais 6d6 de trevas."
            },
            {
                "nome": "Ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+47",
                "dano": "6d12+30",
                "desc": "Mais veneno."
            }
        ],
        "habilidades": [
            {
                "nome": "Aversão ao Sol",
                "tipo": "Qualidade",
                "desc": "Enquanto exposto à luz do sol (mas não a magias ou efeitos que a simulem), fica ofuscado e vulnerável."
            },
            {
                "nome": "Aura Degradante",
                "tipo": "Qualidade",
                "desc": "Emana uma aura de 9m de raio equivalente à magia Profanar (e que se acumula com ela): nessa área, dano de trevas é maximizado e mortos-vivos recebem +2 na Defesa e em testes (já contabilizado para o vulto). Enquanto o vulto estiver em uma área sob efeito da magia Consagrar, tanto a magia quanto sua Aura Degradante são suprimidas."
            },
            {
                "nome": "Agarrar Aprimorado",
                "tipo": "Livre",
                "desc": "Mordida (teste +57)."
            },
            {
                "nome": "Engolir",
                "tipo": "Padrão",
                "desc": "No início de cada turno dele, a criatura engolida sofre 4d8+15 de impacto e 4d8+15 de ácido. Escapa causando um total de 200 pontos de dano a ele (Defesa 25)."
            },
            {
                "nome": "Ferrão Varredor",
                "tipo": "Qualidade",
                "desc": "O ataque de ferrão atinge todas as criaturas em um cone de 6m (para cada ataque, faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área)."
            },
            {
                "nome": "Invocar Sombras",
                "tipo": "Completa",
                "desc": "Uma vez por cena, conjura oito sombras capangas em espaços desocupados em alcance médio. Agem a partir da próxima rodada do vulto, têm deslocamento voo 12m e gastam uma ação padrão para causar 2d10 de trevas em uma criatura adjacente (uma criatura viva atingida perde 1d4 PM; Fort CD 49 evita). São mortos-vivos incorpóreos, têm For -, Des 4, Defesa 35, 1 PV, falham automaticamente em qualquer teste oposto e deixam de ser incorpóreas enquanto expostas à luz do sol. Desaparecem quando mortas ou ao fim da cena."
            },
            {
                "nome": "Magia Acelerada",
                "tipo": "Livre",
                "desc": "Custos: +4 PM. Uma vez por rodada, ao lançar uma magia com execução de movimento, padrão ou completa, muda a execução dela para livre."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha potente (perde 2d12 PV por rodada durante 3 rodadas, Fort CD 49 reduz a duração para 1 rodada)."
            },
            {
                "nome": "Magias",
                "tipo": "Qualidade",
                "desc": "Como um feiticeiro de 18º nível (CD 49)."
            },
            {
                "nome": "Magia: Dissipar Magia",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado são dissipadas."
            },
            {
                "nome": "Magia: Erupção Glacial",
                "tipo": "Padrão",
                "desc": "Custos: 18 PM. Estacas de gelo irrompem do chão em uma área de 6m de lado em alcance médio. Criaturas na área sofrem 12d6 de corte e 12d6 de frio e ficam caídas (Ref evita o dano de corte e a condição). As estacas duram pela cena, tornam a área terreno difícil e dão cobertura leve a criaturas dentro ou atrás da área, mas são destruídas se sofrerem dano de fogo mágico."
            },
            {
                "nome": "Magia: Escuridão",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM. Até o fim da cena, um objeto em alcance curto emana escuridão total em raio de 6m, bloqueando a visão na área e através dela."
            },
            {
                "nome": "Magia: Invisibilidade",
                "tipo": "Padrão",
                "desc": "Custos: 13 PM. Fica invisível até o fim da cena (camuflagem total, +10 em Furtividade contra ouvir e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques)."
            },
            {
                "nome": "Magia: Legião",
                "tipo": "Padrão",
                "desc": "Custos: 15 PM, sustentada. Até 10 criaturas em alcance médio obedecem cegamente aos comandos do vulto, exceto ordens claramente suicidas. Uma criatura tem direito a um teste de Vontade no fim de cada um de seus turnos para se livrar do efeito. Criaturas que passem no teste ficam abaladas por 1 rodada enquanto recuperam a consciência."
            },
            {
                "nome": "Magia: Miasma Mefítico",
                "tipo": "Padrão",
                "desc": "Custos: 18 PM. Uma nuvem de 6m de raio se forma em alcance médio. Criaturas na área sofrem 11d6 de trevas e ficam enjoadas por 1 rodada (Fort reduz à metade e evita a condição)."
            },
            {
                "nome": "Magia: Toque da Morte",
                "tipo": "Padrão",
                "desc": "Custos: 17 PM. Uma criatura em alcance curto sofre 10d8+10 de trevas. Se estiver com menos da metade dos PV, em vez disso faz um teste de Fortitude; se passar sofre o dano normal, caso contrário seus PV são reduzidos a -10."
            },
            {
                "nome": "Magia: Velocidade",
                "tipo": "Padrão",
                "desc": "Custos: 3 PM, sustentada. Pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias."
            },
            {
                "nome": "Magia: Viagem Planar",
                "tipo": "Padrão",
                "desc": "Custos: 10 PM. Viaja para outro Plano."
            }
        ],
        "tesouro": "Padrão"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "redução de dano 5",
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+10"
            },
            {
                "nome": "Intimidação",
                "valor": "+8"
            }
        ],
        "fonte": "Bestiário de Arton",
        "nome": "Zumbi Fantasmagórico",
        "tipo": "Morto-vivo Médio",
        "nd": "4",
        "iniciativa": "+8",
        "percepcao": "+4",
        "defesa": "22",
        "fort": "+4",
        "ref": "+16",
        "von": "+10",
        "pv": "120",
        "desl": "9m (6q)",
        "atributos": {
            "for": "3",
            "des": "4",
            "con": "0",
            "int": "-2",
            "sab": "0",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "1d6+5",
                "desc": ""
            },
            {
                "nome": "Garra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "1d6+5",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Detectar Vida",
                "tipo": "Qualidade",
                "desc": "Detecta a presença de seres vivos em um raio de 30m como se tivesse percepção às cegas."
            },
            {
                "nome": "Lembrança Melancólica",
                "tipo": "Qualidade",
                "desc": "A energia fantasmal se manifesta como uma aura psíquica de 9m de raio. Qualquer criatura que entre na área faz um teste de Vontade (CD 18). Se passar, fica imune a esta habilidade por um dia. Se falhar, fica atordoada por 1d6 rodadas (apenas uma vez por cena), assombrada por visões de um futuro que podia ter tido. Outro personagem pode gastar uma ação completa e passar em Diplomacia (CD 20) para acordá-la do transe."
            },
            {
                "nome": "Imortalidade Fantasmagórica",
                "tipo": "Qualidade",
                "desc": "É verdadeiramente imortal. Se for reduzido a 0 PV, a forma fantasmagórica desaparece e o corpo físico se decompõe. Ambos são reformados respectivamente no próximo amanhecer e no próximo anoitecer."
            },
            {
                "nome": "Semimaterial",
                "tipo": "Qualidade",
                "desc": "Tem 25% de chance de ignorar o dano causado por uma fonte mundana e seus ataques contam como armas mágicas."
            },
            {
                "nome": "Fraqueza Zumbi",
                "tipo": "Qualidade",
                "desc": "Sofre o dobro de dano de acertos críticos ou de ataques feitos contra o cérebro (Defesa 32)."
            }
        ],
        "tesouro": "Nenhum"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Mantícora Zumbi",
        "tipo": "Morto-vivo Grande",
        "nd": "3",
        "iniciativa": "+4",
        "percepcao": "+3",
        "defesa": "20",
        "fort": "+14",
        "ref": "+4",
        "von": "+9",
        "pv": "28",
        "desl": "6m (4q), voo 9m (6q)",
        "atributos": {
            "for": "6",
            "des": "0",
            "con": "4",
            "int": "—",
            "sab": "-1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "1d8+8",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Espinhos Putrefatos",
                "tipo": "Padrão",
                "desc": "Uma vez por cena, dispara 1d4 espinhos da cauda. Cada espinho atinge uma criatura em alcance médio, causando 1d6+3 de perfuração e 1d6 de trevas (Ref CD 17 reduz à metade)."
            },
            {
                "nome": "Fraqueza Zumbi",
                "tipo": "Qualidade",
                "desc": "Sofre o dobro de dano de acertos críticos ou de ataques feitos contra o cérebro (Defesa 30)."
            }
        ],
        "tesouro": "Espinhos putrefatos (CD 18 para extrair). Os espinhos contam como T$ 45 em matéria-prima para fabricar ossos de monstro"
    },
    {
        "pm": "0",
        "percepcaoObs": "visão no escuro",
        "defesaObs": "",
        "pericias": [],
        "fonte": "Bestiário de Arton",
        "nome": "Quimera Zumbi",
        "tipo": "Morto-vivo Grande",
        "nd": "5",
        "iniciativa": "+4",
        "percepcao": "+3",
        "defesa": "23",
        "fort": "+16",
        "ref": "+6",
        "von": "+11",
        "pv": "48",
        "desl": "6m (4q), voo 9m (6q)",
        "atributos": {
            "for": "4",
            "des": "0",
            "con": "2",
            "int": "—",
            "sab": "-1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Mordida x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "3d6+10",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Três Cabeças Zumbificadas",
                "tipo": "Qualidade",
                "desc": "Tem três cabeças distintas, que concedem habilidades especiais, escolhidas entre as cabeças descritas a seguir."
            },
            {
                "nome": "Cabeça: Águia",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida por uma mordida dessa cabeça fica cega (Ref CD 20 evita)."
            },
            {
                "nome": "Cabeça: Bode",
                "tipo": "Qualidade",
                "desc": "Uma das mordidas muda para marrada e causa dano de impacto. Ao fazer uma investida com esta cabeça e acertar, arremessa a vítima 1d6 x 1,5m em uma direção à sua escolha (Fort CD 20 evita). A vítima fica caída e, se atingir um obstáculo, sofre 1d6 de impacto para cada 1,5m arremessada."
            },
            {
                "nome": "Cabeça: Dragão",
                "tipo": "Qualidade",
                "desc": "Pode gastar uma ação padrão para cuspir trevas em um cone de 6m. Criaturas na área sofrem 10d6+10 de trevas (Ref CD 20 reduz à metade). Recarga (movimento)."
            },
            {
                "nome": "Cabeça: Gorlogg",
                "tipo": "Qualidade",
                "desc": "Se acertar uma mordida com esta cabeça, pode usar a manobra derrubar como ação livre (teste +22)."
            },
            {
                "nome": "Cabeça: Hidra",
                "tipo": "Qualidade",
                "desc": "Uma das cabeças é dividida em duas cabeças de hidra. Ganha um quarto ataque de mordida, mas o bônus na margem de ameaça de Três Cérebros diminui em -1."
            },
            {
                "nome": "Cabeça: Leão",
                "tipo": "Qualidade",
                "desc": "Ao acertar uma mordida com esta cabeça, pode usar a manobra agarrar como ação livre (teste +22)."
            },
            {
                "nome": "Cabeça: Javali",
                "tipo": "Qualidade",
                "desc": "Recebe fortificação 25%."
            },
            {
                "nome": "Cabeça: Serpente",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida por uma mordida desta cabeça é exposta à doença maldição pegajosa (Tormenta20, p. 318)."
            },
            {
                "nome": "Cabeça: Tigre",
                "tipo": "Qualidade",
                "desc": "O dano dessa mordida aumenta em +1d6."
            },
            {
                "nome": "Cabeça: Tubarão",
                "tipo": "Qualidade",
                "desc": "Ganha deslocamento de natação 9m. Uma criatura atingida por uma mordida desta cabeça fica sangrando (Fort CD 20 evita)."
            },
            {
                "nome": "Fraqueza Zumbi",
                "tipo": "Qualidade",
                "desc": "Sofre o dobro de dano de acertos críticos ou de ataques feitos contra o cérebro (Defesa 33)."
            },
            {
                "nome": "Três Cérebros",
                "tipo": "Qualidade",
                "desc": "Ataques corpo a corpo contra a quimera recebem +2 na margem de ameaça."
            }
        ],
        "tesouro": "Coração ressecado de quimera (CD 20 para extrair, vale T$ 100 para fabricar uma dose de elixir quimérico)"
    }
];
