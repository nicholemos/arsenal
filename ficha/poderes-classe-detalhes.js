// ============================================================
//  poderes-classe-detalhes.js — Bônus automáticos de HABILIDADES e PODERES DE CLASSE
//  Carregue DEPOIS de poderes-detalhes.js e ANTES de script.js.
//  Usa o mesmo formato e o mesmo motor de poderes-detalhes.js (veja os campos lá).
//
//  Níveis: ctx.nivelClasse('barbaro') é o nível NA CLASSE (se a classe não estiver
//  na lista de classes da ficha, usa o nível total).
//  ctx.escala('barbaro', 3, 6) = 1 no nível 3, +1 a cada 6 níveis seguintes (0 antes do 3).
//
//  Somas de ATRIBUTO em PM/PV/Defesa (ex.: Totem, Sarado, Casca Grossa) ficam em
//  classes-detalhes.js, que aplica a regra de nunca repetir o mesmo atributo.
//
//  Ficam de fora de propósito (o jogador lança à mão): bônus de dano/ataque,
//  RD, habilidades ativadas (gastam PM) e bônus situacionais.
// ============================================================
const VIRTUDES_PALADINO = [
    'Virtude: Caridade', 'Virtude: Castidade', 'Virtude: Compaixão',
    'Virtude: Humildade', 'Virtude: Paciência', 'Virtude: Temperança'
];
const _RESISTENCIAS = ['Fortitude', 'Reflexos', 'Vontade'];

const CLASS_POWER_SHEET_DETAILS = {
    // ───────────── ARCANISTA ─────────────
    'Poder Mágico': {                       // +1 PM por nível de arcanista
        pm: ctx => ctx.nivelClasse('arcanista')
    },
    'Necrologia': {                         // +2 em Cura e Fortitude (nível 3), +1 a cada 5 níveis
        pericias: [{ pericias: ['Cura', 'Fortitude'], valor: ctx => (ctx.nivelClasse('arcanista') >= 3 ? 2 + Math.floor(ctx.nivelClasse('arcanista') / 5) : 0) }]
    },

    // ───────────── BÁRBARO ─────────────
    'Instinto Selvagem': {                  // +1 (nível 3), +1 a cada 6 níveis; o dano é lançado à mão
        pericias: [{ pericias: ['Percepção', 'Reflexos'], valor: ctx => ctx.escala('barbaro', 3, 6) }]
    },
    'Tanga de Peles': {                     // Con na Defesa fica em classes-detalhes.js
        condicao: 'semArmadura',
        defesa: ctx => ctx.escala('barbaro', 3, 4)
    },
    'Pele de Ferro': {
        condicao: 'semArmaduraPesada',
        defesa: ctx => (ctx.tem('Pele de Aço') ? 8 : 4)
    },
    'Fúria da Savana': { deslocamento: 3 },
    'Espiritualista': {                     // +1 PM por nível ímpar
        pm: ctx => Math.ceil(ctx.nivelClasse('barbaro') / 2)
    },

    // ───────────── BUCANEIRO ─────────────
    'Esquiva Sagaz': {                      // +1 Defesa e Reflexos (nível 3), +1 a cada 4 níveis
        condicao: 'semArmaduraPesada',
        defesa: ctx => ctx.escala('bucaneiro', 3, 4),
        pericias: [{ pericias: ['Reflexos'], valor: ctx => ctx.escala('bucaneiro', 3, 4) }]
    },
    'Pernas do Mar': {
        pericias: [{ pericias: ['Acrobacia', 'Atletismo'], valor: 2 }]
    },
    'Presença Paralisante': {
        periciasAtributo: [{ pericias: ['Iniciativa'], atributo: 'CAR' }]
    },

    // ───────────── CAÇADOR ─────────────
    'Rastreador': {
        pericias: [{ pericias: ['Sobrevivência'], valor: 2 }]
    },
    'Herói do Povo': {
        defesa: 2,
        pericias: [{ pericias: _RESISTENCIAS, valor: 2 }]
    },

    // ───────────── CAVALEIRO ─────────────
    'Etiqueta': {
        pericias: [{ pericias: ['Diplomacia', 'Nobreza'], valor: 2 }]
    },
    'Pajem': {
        pericias: [{ pericias: ['Diplomacia'], valor: 2 }]
    },
    'Grão-Mestre': {
        pericias: [{ pericias: ['Diplomacia', 'Nobreza'], valor: 5 }]
    },
    'Solidez': {                            // bônus de Defesa do escudo também nas resistências
        condicao: 'escudo',
        pericias: [{ pericias: _RESISTENCIAS, valor: ctx => ctx.escudoBonus }]
    },

    // ───────────── CLÉRIGO ─────────────
    'Discrição Divina': {                   // +1 em Furtividade e resistências (nível 3), +1 a cada 6 níveis
        pericias: [{ pericias: ['Furtividade'].concat(_RESISTENCIAS), valor: ctx => ctx.escala('clerigo', 3, 6) }]
    },
    'Acólito Escudeiro': {
        pericias: [{ pericias: ['Religião'], valor: 2 }]
    },

    // ───────────── DRUIDA ─────────────
    'Xamã Místico': {                       // +1 PM por nível
        pm: ctx => ctx.nivelClasse('druida')
    },
    'Força dos Penhascos': { pericias: [{ pericias: ['Fortitude'], valor: 2 }] },
    'Liberdade da Pradaria': { pericias: [{ pericias: ['Reflexos'], valor: 2 }] },
    'Tranquilidade dos Lagos': { pericias: [{ pericias: ['Vontade'], valor: 2 }] },

    // ───────────── GUERREIRO ─────────────
    'Análise Tática': {
        pericias: [{ pericias: ['Guerra'], valor: 2 }]
    },
    'Determinação Inabalável': {            // com metade dos PV ou menos
        condicao: 'pvMetade',
        pericias: [{ pericias: _RESISTENCIAS, valor: 2 }]
    },
    'Soldado de Infantaria': {
        deslocamento: 3,
        carga: 6
    },
    'Velho de Guerra': {
        pericias: [{ pericias: ['Intimidação'], valor: 5 }]
    },

    // ───────────── LADINO ─────────────
    'Gatuno': { pericias: [{ pericias: ['Atletismo'], valor: 2 }] },
    'Sombra': { pericias: [{ pericias: ['Furtividade'], valor: 2 }] },
    'Mente Criminosa': {
        periciasAtributo: [{ pericias: ['Ladinagem', 'Furtividade'], atributo: 'INT' }]
    },
    'Senhor do Submundo': {
        pericias: [{ pericias: ['Intimidação'], valor: 5 }]
    },

    // ───────────── LUTADOR ─────────────
    'Casca Grossa': {                       // Con na Defesa fica em classes-detalhes.js
        condicao: 'semArmaduraPesada',
        defesa: ctx => (ctx.nivelClasse('lutador') >= 7 ? Math.floor((ctx.nivelClasse('lutador') - 3) / 4) : 0)
    },
    'Sarado': {                             // Força nos PV fica em classes-detalhes.js
        periciasAtributo: [{ pericias: ['Fortitude'], atributo: 'FOR' }]
    },
    'Mais Alto e Mais Rápido': { deslocamento: 3 },

    // ───────────── NOBRE ─────────────
    'Voz Poderosa': {
        pericias: [{ pericias: ['Diplomacia', 'Intimidação'], valor: 2 }]
    },
    'Líder Enérgico': {
        periciasAtributo: [{ pericias: ['Iniciativa'], atributo: 'CAR' }]
    },

    // ───────────── PALADINO ─────────────
    // Regra das Virtudes: +1 PM no total por virtude (+1, +3, +6...) = a n-ésima virtude dá +n
    'Virtude: Caridade':   { pm: ctx => ctx.ordem(VIRTUDES_PALADINO) },
    'Virtude: Castidade':  { pm: ctx => ctx.ordem(VIRTUDES_PALADINO) },
    'Virtude: Compaixão':  { pm: ctx => ctx.ordem(VIRTUDES_PALADINO) },
    'Virtude: Humildade':  { pm: ctx => ctx.ordem(VIRTUDES_PALADINO) },
    'Virtude: Paciência':  { pm: ctx => ctx.ordem(VIRTUDES_PALADINO) },
    'Virtude: Temperança': { pm: ctx => ctx.ordem(VIRTUDES_PALADINO) }
};

// soma na tabela geral (o motor reconstrói o índice sozinho)
Object.assign(POWER_SHEET_DETAILS, CLASS_POWER_SHEET_DETAILS);
if (typeof window !== 'undefined') window.CLASS_POWER_SHEET_DETAILS = CLASS_POWER_SHEET_DETAILS;
