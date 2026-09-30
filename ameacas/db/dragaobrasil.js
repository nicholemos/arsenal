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
    }



];

if (typeof module !== "undefined") module.exports = dragaobrasil_db;
