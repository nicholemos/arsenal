// Popula o datalist de criaturas e configura o auto-preenchimento do ND
function populateCreaturesDatalist(selectedND) {
	var datalist = document.getElementById("ameacasList");
	if (!datalist || typeof AMEACAS_DB === "undefined") return;

	// Limpa o datalist
	datalist.innerHTML = "";

	AMEACAS_DB.forEach(function (creature) {
		// Se selectedND estiver definido e não for vazio, filtra por ele
		if (selectedND) {
			var creatureNDVal = creature.nd;
			var selectVal = "";
			if (creatureNDVal === "1/4") selectVal = "0.25";
			else if (creatureNDVal === "1/2") selectVal = "0.5";
			else if (creatureNDVal === "S") selectVal = "21";
			else if (creatureNDVal === "S+") selectVal = "22";
			else selectVal = creatureNDVal.toString();

			if (selectVal !== selectedND) {
				return; // pula se não corresponder ao ND selecionado
			}
		}

		var option = document.createElement("option");
		option.value = creature.nome;
		datalist.appendChild(option);
	});
}

document.addEventListener("DOMContentLoaded", function () {
	// Popula inicialmente com todas as criaturas (ND em branco)
	populateCreaturesDatalist("");

	var nameInput = document.getElementById("creatureName");
	var ndSelect = document.getElementById("creatureND");

	if (ndSelect) {
		// Filtra as criaturas ao alterar o ND manualmente
		ndSelect.addEventListener("change", function () {
			populateCreaturesDatalist(ndSelect.value);
		});
	}

	if (nameInput && ndSelect && typeof AMEACAS_DB !== "undefined") {
		nameInput.addEventListener("input", function () {
			var val = nameInput.value.trim();
			var match = AMEACAS_DB.find(function (creature) {
				return creature.nome.toLowerCase() === val.toLowerCase();
			});
			if (match) {
				var ndVal = match.nd;
				var selectVal = "";
				if (ndVal === "1/4") selectVal = "0.25";
				else if (ndVal === "1/2") selectVal = "0.5";
				else if (ndVal === "S") selectVal = "21";
				else if (ndVal === "S+") selectVal = "22";
				else selectVal = ndVal.toString();

				for (var i = 0; i < ndSelect.options.length; i++) {
					if (ndSelect.options[i].value === selectVal) {
						ndSelect.value = selectVal;
						// Filtra o datalist para o ND da criatura encontrada
						populateCreaturesDatalist(selectVal);
						break;
					}
				}
			}
		});
	}
});

// Formata o ND para exibição amigável (ex: 0.25 -> 1/4, 21 -> S)
function formatND(val) {
	var num = parseFloat(val);
	if (isNaN(num)) return val;
	if (num === 0.25) return "1/4";
	if (num === 0.5) return "1/2";
	if (num === 21) return "S";
	if (num === 22) return "S+";
	if (num % 1 === 0) return num.toString();
	return num.toFixed(2);
}

function addCreature() {
	var creatureName = document.getElementById("creatureName").value.trim();
	var creatureND = parseFloat(document.getElementById("creatureND").value);
	var creatureQuantity = parseInt(document.getElementById("creatureQuantity").value);
	var creatureList = document.getElementById("creatureList");

	if (isNaN(creatureND) || creatureND <= 0) {
		alert("Por favor, insira um valor válido para o ND da Criatura antes de adicionar.");
		return;
	}

	if (isNaN(creatureQuantity) || creatureQuantity <= 0) {
		creatureQuantity = 1;
	}

	var creatureRow = document.createElement("tr");
	var nameCell = document.createElement("td");
	var ndCell = document.createElement("td");
	var quantityCell = document.createElement("td");
	var minusCell = document.createElement("td");
	var plusCell = document.createElement("td");
	var difficultyCell = document.createElement("td");
	var removeCell = document.createElement("td");
	var testeCell = document.createElement("td");

	nameCell.innerHTML = creatureName || "Criatura Sem Nome";
	
	ndCell.innerHTML = formatND(creatureND);
	ndCell.dataset.value = creatureND;
	
	quantityCell.innerHTML = creatureQuantity;

	var minusButton = document.createElement("button");
	minusButton.innerHTML = '<i class="fa-solid fa-minus"></i>';
	minusButton.className = "table-btn table-btn-icon";
	minusButton.onclick = function () {
		var currentQuantity = parseInt(quantityCell.innerHTML);
		if (currentQuantity > 1) {
			quantityCell.innerHTML = currentQuantity - 1;
			updateDifficultyAndND(creatureRow);
			updateTotalND();
			sortTableByND();
		}
	};

	var plusButton = document.createElement("button");
	plusButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
	plusButton.className = "table-btn table-btn-icon";
	plusButton.onclick = function () {
		var currentQuantity = parseInt(quantityCell.innerHTML);
		quantityCell.innerHTML = currentQuantity + 1;
		updateDifficultyAndND(creatureRow);
		updateTotalND();
		sortTableByND();
	};

	minusCell.appendChild(minusButton);
	plusCell.appendChild(plusButton);

	var difficulty = calculateDifficulty(creatureND, creatureQuantity);
	difficultyCell.innerHTML = formatND(difficulty);
	difficultyCell.dataset.value = difficulty;

	var removeButton = document.createElement("button");
	removeButton.innerHTML = '<i class="fa-solid fa-trash-can" style="margin-right: 4px;"></i><span class="table-btn-text"> Remover</span>';
	removeButton.className = "table-btn table-btn-danger";
	removeButton.onclick = function () {
		creatureList.removeChild(creatureRow);
		updateTotalND();
	};

	removeCell.appendChild(removeButton);

	var testeButton = document.createElement("button");
	testeButton.innerHTML = '<i class="fa-solid fa-dice-d20" style="margin-right: 4px;"></i><span class="table-btn-text"> Rolar</span>';
	testeButton.className = "table-btn table-btn-accent";
	testeButton.onclick = function () {
		rollCreatureTreasure(creatureName, creatureND);
	};

	testeCell.appendChild(testeButton);

	creatureRow.appendChild(nameCell);
	creatureRow.appendChild(ndCell);
	creatureRow.appendChild(quantityCell);
	creatureRow.appendChild(minusCell);
	creatureRow.appendChild(plusCell);
	creatureRow.appendChild(difficultyCell);
	creatureRow.appendChild(removeCell);
	creatureRow.appendChild(testeCell);

	creatureList.appendChild(creatureRow);
	sortTableByND();
	updateTotalND();

	document.getElementById("creatureName").value = "";
	document.getElementById("creatureND").value = ""; // default to empty
	populateCreaturesDatalist(""); // reset list to all creatures
	document.getElementById("creatureQuantity").value = "1";
}

function resetCreatureQuantity() {
	var creatureQuantityInput = document.getElementById("creatureQuantity");
	if (creatureQuantityInput) {
		creatureQuantityInput.value = 1;
	}
}

function increaseQuantity(row) {
	var quantityCell = row.cells[2];
	var quantity = parseInt(quantityCell.innerHTML);
	quantityCell.innerHTML = quantity + 1;
	updateDifficultyAndND(row);
}

function decreaseQuantity(row) {
	var quantityCell = row.cells[2];
	var quantity = parseInt(quantityCell.innerHTML);
	if (quantity > 1) {
		quantityCell.innerHTML = quantity - 1;
		updateDifficultyAndND(row);
	}
}

function updateDifficultyAndND(row) {
	var ndCell = row.cells[1];
	var quantityCell = row.cells[2];
	var difficultyCell = row.cells[5];

	var creatureND = parseFloat(ndCell.dataset.value || ndCell.innerHTML);
	var creatureQuantity = parseInt(quantityCell.innerHTML);

	var difficulty = calculateDifficulty(creatureND, creatureQuantity);
	difficultyCell.innerHTML = formatND(difficulty);
	difficultyCell.dataset.value = difficulty;

	updateTotalND();
}

function calculateDifficulty(creatureND, creatureQuantity) {
	var difficulty = creatureND;
	var fala = "";

	if (creatureND < 1) {
		if (creatureQuantity === 1) {
			difficulty = creatureND;
		} else {
			difficulty = creatureND * creatureQuantity;
		}
	} else {
		if (creatureQuantity === 1) {
			difficulty = creatureND;
		} else if (creatureQuantity === 2 || creatureQuantity === 3) {
			difficulty = creatureND + 2;
		} else if (creatureQuantity >= 4 && creatureQuantity <= 7) {
			difficulty = creatureND + 4;
			fala = "Se você quiser rolar menos dados, troque por um bando desse bicho. A luta provavelmente será mais letal.";
		} else if (creatureQuantity >= 8 && creatureQuantity <= 15) {
			difficulty = creatureND + 6;
			fala = "Tanto minion é mesmo necessário?";
		} else if (creatureQuantity >= 16 && creatureQuantity <= 31) {
			difficulty = creatureND + 8;
			fala = "Tá doido? Diminui a quantidade de bicho aí, meu! Ninguém merece turno de duas horas!!";
		} else if (creatureQuantity >= 32 && creatureQuantity <= 63) {
			difficulty = creatureND + 10;
			fala = "Eu SEI que você não pretende usar isso. Só quer testar a calculadora";
		} else if (creatureQuantity >= 64 && creatureQuantity <= 127) {
			difficulty = creatureND + 12;
			fala = "Está tentando ver até onde eu fui nesse cálculo?";
		} else if (creatureQuantity >= 128 && creatureQuantity <= 255) {
			difficulty = creatureND + 14;
			fala = "Esse é o último, eu juro!";
		} else if (creatureQuantity >= 256 && creatureQuantity <= 511) {
			difficulty = creatureND + 16;
			fala = "Insira o meme dos Simpsons aqui: Pare, ele já está morto!";
		} else if (creatureQuantity >= 512 && creatureQuantity <= 1023) {
			difficulty = creatureND + 18;
			fala = "Vírus instalado com sucesso. Seu computador se formatará em 5,4,3,2...";
		} else if (creatureQuantity >= 1024) {
			difficulty = creatureND + 20;
			fala = "Parabéns, você chegou a +20 no ND. Sabe o que significa? NADA. O sistema não reconhece ameaças ac ND 20 então todo seu esforço foi inútil. Está feliz agora?";
		}
	}

	if (difficulty < 1 && creatureND !== 0.25 && creatureND !== 0.5) {
		difficulty = Math.floor(difficulty);
	}

	if (difficulty > 22) {
		difficulty = 22;
	}

	var falaElement = document.getElementById("mensagemCriatura");
	if (falaElement) {
		falaElement.innerHTML = fala;
	}

	return difficulty;
}

function updateTotalND() {
	var highestDifficulty = 0;
	var rows = document.getElementById("creatureList").rows;

	var totalND = 0;

	for (var i = 1; i < rows.length; i++) {
		var difficultyCell = rows[i].cells[5];
		var difficulty = parseFloat(difficultyCell.dataset.value || difficultyCell.innerHTML);
		if (isNaN(difficulty)) continue;

		var difference = highestDifficulty - difficulty;

		if (difficulty > highestDifficulty) {
			highestDifficulty = difficulty;
		}

		if (difference >= 4) {
			totalND += 0;
		} else if (difference == 3) {
			totalND += 0.25;
		} else if (difference == 2) {
			totalND += 0.5;
		} else if (difference == 1) {
			totalND += 1;
		} else if (difference == 0) {
			totalND += 2;
		}
	}

	totalND += highestDifficulty;

	if (totalND > 22) {
		totalND = 22;
	}

	document.getElementById("totalND").innerHTML = formatND(totalND);
	
	var headerBadge = document.getElementById("headerTotalND");
	if (headerBadge) {
		headerBadge.innerHTML = formatND(totalND);
	}
}

function doisDados(funcaoExistente) {
	var resultado1 = funcaoExistente();
	var resultado2 = funcaoExistente();

	var mensagem = "Escolha entre: " + resultado1 + " ou " + resultado2 + "."; // Substitua os "..." pelos exemplos correspondentes aos resultados

	return mensagem;
}


function adicionar20Porcento(funcao) {
	return function () {
		var resultado = funcao.apply(this, arguments);
		resultado.porcentagem += 20;
		return resultado;
	};
}



function getDiverso() {
	var itens = [
		{ item: "Ácido", porcentagem: 2 },
		{ item: "Água benta", porcentagem: 2 },
		{ item: "Alaúde élfico", porcentagem: 1 },
		{ item: "Algemas", porcentagem: 1 },
		{ item: "Baga-de-fogo", porcentagem: 2 },
		{ item: "Bálsamo restaurador", porcentagem: 23 },
		{ item: "Bandana", porcentagem: 1 },
		{ item: "Bandoleira de poções", porcentagem: 1 },
		{ item: "Bomba", porcentagem: 5 },
		{ item: "Botas reforçadas", porcentagem: 1 },
		{ item: "Camisa bufante", porcentagem: 1 },
		{ item: "Capa esvoaçante", porcentagem: 1 },
		{ item: "Capa pesada", porcentagem: 1 },
		{ item: "Casaco longo", porcentagem: 1 },
		{ item: "Chapéu arcano", porcentagem: 1 },
		{ item: "Coleção de livros", porcentagem: 2 },
		{ item: "Cosmético", porcentagem: 2 },
		{ item: "Dente-de-dragão", porcentagem: 2 },
		{ item: "Enfeite de elmo", porcentagem: 1 },
		{ item: "Elixir do amor", porcentagem: 1 },
		{ item: "Equipamento de viagem", porcentagem: 2 },
		{ item: "Essência de mana", porcentagem: 10 },
		{ item: "Estojo de disfarces", porcentagem: 1 },
		{ item: "Farrapos de ermitão", porcentagem: 1 },
		{ item: "Flauta mística", porcentagem: 1 },
		{ item: "Fogo alquímico", porcentagem: 7 },
		{ item: "Gorro de ervas", porcentagem: 1 },
		{ item: "Líquen lilás", porcentagem: 2 },
		{ item: "Luneta", porcentagem: 1 },
		{ item: "Luva de pelica", porcentagem: 1 },
		{ item: "Maleta de medicamentos", porcentagem: 2 },
		{ item: "Manopla", porcentagem: 1 },
		{ item: "Manto eclesiástico", porcentagem: 1 },
		{ item: "Mochila de aventureiro", porcentagem: 3 },
		{ item: "Musgo púrpura", porcentagem: 2 },
		{ item: "Organizador de pergaminhos", porcentagem: 1 },
		{ item: "Ossos de monstro", porcentagem: 2 },
		{ item: "Pó de cristal", porcentagem: 2 },
		{ item: "Pó de giz", porcentagem: 2 },
		{ item: "Pó do desaparecimento", porcentagem: 1 },
		{ item: "Robe místico", porcentagem: 2 },
		{ item: "Saco de sal", porcentagem: 2 },
		{ item: "Sapatos de camurça", porcentagem: 1 },
		{ item: "Seixo de âmbar", porcentagem: 2 },
		{ item: "Sela", porcentagem: 1 },
		{ item: "Tabardo", porcentagem: 1 },
		{ item: "Traje da corte", porcentagem: 1 },
		{ item: "Terra de cemitério", porcentagem: 2 },
		{ item: "Veste de seda", porcentagem: 1 }
	];

	var totalPorcentagem = 0;
	for (var i = 0; i < itens.length; i++) {
		totalPorcentagem += itens[i].porcentagem;
	}

	// Normalizar as porcentagens
	for (var j = 0; j < itens.length; j++) {
		itens[j].porcentagem /= totalPorcentagem;
	}

	var randomIndex = Math.random();
	var cumulativePorcentagem = 0;
	for (var k = 0; k < itens.length; k++) {
		cumulativePorcentagem += itens[k].porcentagem;
		if (randomIndex <= cumulativePorcentagem) {
			return itens[k].item;
		}
	}
}

function getMagicoMenor() {
	var randomNum = Math.random();

	if (randomNum < 1 / 6) {
		return getArma() + " " + getArmaMagica();
	} else if (randomNum < 3 / 6) {
		return getArmadura() + " " + getEncantoArmadura();
	} else {
		return getItemMenor();
	}
}

function getMagicoMedio() {
	var randomNum = Math.random();

	if (randomNum < 1 / 6) {
		return getArma() + " " + getArmaMagica() + " " + getArmaMagica();
	} else if (randomNum < 3 / 6) {
		return getArmadura() + " " + getEncantoArmadura() + " " + getEncantoArmadura();
	} else {
		return getItemMedio();
	}
}

function getMagicoMaior() {
	var randomNum = Math.random();

	if (randomNum < 1 / 6) {
		return getArma() + " " + getArmaMagica() + " " + getArmaMagica() + " " + getArmaMagica();
	} else if (randomNum < 3 / 6) {
		return getArmadura() + " " + getEncantoArmadura() + " " + getEncantoArmadura() + " " + getEncantoArmadura();
	} else {
		return getItemMaior();
	}
}


function getArma() {
	var equipamentos = [
		{ item: "Adaga", porcentagem: 3 },
		{ item: "Alabarda", porcentagem: 2 },
		{ item: "Alfange", porcentagem: 2 },
		{ item: "Arco curto", porcentagem: 3 },
		{ item: "Arco longo", porcentagem: 3 },
		{ item: "Azagaia", porcentagem: 2 },
		{ item: "Balas (20)", porcentagem: 1 },
		{ item: "Besta leve", porcentagem: 2 },
		{ item: "Besta pesada", porcentagem: 2 },
		{ item: "Bordão", porcentagem: 3 },
		{ item: "Chicote", porcentagem: 1 },
		{ item: "Cimitarra", porcentagem: 3 },
		{ item: "Clava", porcentagem: 3 },
		{ item: "Corrente de espinhos", porcentagem: 2 },
		{ item: "Espada bastarda", porcentagem: 2 },
		{ item: "Espada curta", porcentagem: 5 },
		{ item: "Espada longa", porcentagem: 5 },
		{ item: "Flechas (20)", porcentagem: 3 },
		{ item: "Florete", porcentagem: 3 },
		{ item: "Foice", porcentagem: 2 },
		{ item: "Funda", porcentagem: 2 },
		{ item: "Gadanho", porcentagem: 2 },
		{ item: "Katana", porcentagem: 1 },
		{ item: "Lança", porcentagem: 3 },
		{ item: "Lança montada", porcentagem: 1 },
		{ item: "Maça", porcentagem: 3 },
		{ item: "Machadinha", porcentagem: 3 },
		{ item: "Machado anão", porcentagem: 1 },
		{ item: "Machado de batalha", porcentagem: 3 },
		{ item: "Machado de guerra", porcentagem: 3 },
		{ item: "Machado táurico", porcentagem: 1 },
		{ item: "Mangual", porcentagem: 2 },
		{ item: "Marreta", porcentagem: 1 },
		{ item: "Martelo de guerra", porcentagem: 3 },
		{ item: "Montante", porcentagem: 3 },
		{ item: "Mosquete", porcentagem: 1 },
		{ item: "Pedras (20)", porcentagem: 1 },
		{ item: "Picareta", porcentagem: 3 },
		{ item: "Pique", porcentagem: 2 },
		{ item: "Pistola", porcentagem: 2 },
		{ item: "Rede", porcentagem: 1 },
		{ item: "Tacape", porcentagem: 3 },
		{ item: "Tridente", porcentagem: 2 },
		{ item: "Virotes (20)", porcentagem: 2 },
	];

	var random = Math.random() * 100;
	var somaPorcentagens = 0;

	for (var i = 0; i < equipamentos.length; i++) {
		somaPorcentagens += equipamentos[i].porcentagem;

		if (random <= somaPorcentagens) {
			return equipamentos[i].item;
		}
	}

	return "Nenhum equipamento";
}


function getPocao() {
	var pocoes = [
		{ item: "Abençoar Alimentos (óleo)", porcentagem: 4, preco: "T$ 30" },
		{ item: "Área Escorregadia (granada)", porcentagem: 4, preco: "T$ 30" },
		{ item: "Arma Mágica (óleo)", porcentagem: 4, preco: "T$ 30" },
		{ item: "Poção de Compreensão", porcentagem: 4, preco: "T$ 30" },
		{ item: "Poção de Curar Ferimentos (2d8+2 PV)", porcentagem: 4, preco: "T$ 30" },
		{ item: "Poção de Disfarce Ilusório", porcentagem: 4, preco: "T$ 30" },
		{ item: "Escuridão (óleo)", porcentagem: 4, preco: "T$ 30" },
		{ item: "Luz (óleo)", porcentagem: 4, preco: "T$ 30" },
		{ item: "Névoa (granada)", porcentagem: 4, preco: "T$ 30" },
		{ item: "Poção de Primor Atlético", porcentagem: 4, preco: "T$ 30" },
		{ item: "Poção de Proteção Divina", porcentagem: 4, preco: "T$ 30" },
		{ item: "Poção de Resistência a Energia", porcentagem: 4, preco: "T$ 30" },
		{ item: "Poção de Sono", porcentagem: 4, preco: "T$ 30" },
		{ item: "Poção de Suporte Ambiental", porcentagem: 4, preco: "T$ 30" },
		{ item: "Tranca Arcana (óleo)", porcentagem: 4, preco: "T$ 30" },
		{ item: "Poção de Visão Mística", porcentagem: 4, preco: "T$ 30" },
		{ item: "Poção de Vitalidade Fantasma", porcentagem: 4, preco: "T$ 30" },
		{ item: "Poção de Escudo da Fé (aprimoramento para duração cena)", porcentagem: 4, preco: "T$ 120" },
		{ item: "Poção de Alterar Tamanho", porcentagem: 4, preco: "T$ 270" },
		{ item: "Poção de Aparência Perfeita", porcentagem: 4, preco: "T$ 270" },
		{ item: "Armamento da Natureza (óleo)", porcentagem: 4, preco: "T$ 270" },
		{ item: "Bola de Fogo (granada)", porcentagem: 4, preco: "T$ 270" },
		{ item: "Poção de Camuflagem Ilusória", porcentagem: 4, preco: "T$ 270" },
		{ item: "Poção de Concentração de Combate (aprimoramento para duração cena)", porcentagem: 4, preco: "T$ 270" },
		{ item: "Poção de Curar Ferimentos (4d8+4 PV)", porcentagem: 4, preco: "T$ 270" },
		{ item: "Poção de Físico Divino", porcentagem: 4, preco: "T$ 270" },
		{ item: "Poção de Mente Divina", porcentagem: 4, preco: "T$ 270" },
		{ item: "Poção de Metamorfose", porcentagem: 4, preco: "T$" },
		{ item: "Poção de Purificação", porcentagem: 4, preco: "T$ 270" },
		{ item: "Poção de Velocidade", porcentagem: 4, preco: "T$ 270" },
		{ item: "Vestimenta da Fé (óleo)", porcentagem: 4, preco: "T$ 270" },
		{ item: "Poção de Voz Divina", porcentagem: 4, preco: "T$ 270" },
		{ item: "Arma Mágica (óleo; aprimoramento para bônus +3)", porcentagem: 4, preco: "T$ 750" },
		{ item: "Poção de Curar Ferimentos (7d8+7 PV)", porcentagem: 4, preco: "T$ 1.080" },
		{ item: "Poção de Físico Divino (aprimoramento para três atributos)", porcentagem: 4, preco: "T$ 1.080" },
		{ item: "Poção de Invisibilidade (aprimoramento para duração cena)", porcentagem: 4, preco: "T$ 1.080" },
		{ item: "Bola de Fogo (granada; aprimoramento para 10d6 de dano)", porcentagem: 4, preco: "T$ 1.470" },
		{ item: "Poção de Curar Ferimentos (11d8+11 PV)", porcentagem: 4, preco: "T$ 3.000" }
	];

	var random = Math.random() * 100;
	var somaPorcentagens = 0;

	for (var i = 0; i < pocoes.length; i++) {
		somaPorcentagens += pocoes[i].porcentagem;

		if (random <= somaPorcentagens) {
			return `${pocoes[i].item} (Preço: ${pocoes[i].preco})`;
		}
	}

	return "Nenhuma poção disponível";
}

var getPocaoCom20Porcento = adicionar20Porcento(getPocao);
var resultadoPocao = getPocaoCom20Porcento();
console.log(resultadoPocao);


function getItemMenor() {
	var itens = [
		{ item: "Anel do sustento", porcentagem: 2, preco: "T$ 3.000" },
		{ item: "Bainha mágica", porcentagem: 5, preco: "T$ 3.000" },
		{ item: "Corda da escalada", porcentagem: 5, preco: "T$ 3.000" },
		{ item: "Ferraduras da velocidade", porcentagem: 2, preco: "T$ 3.000" },
		{ item: "Garrafa da fumaça eterna", porcentagem: 5, preco: "T$ 3.000" },
		{ item: "Gema da luminosidade", porcentagem: 5, preco: "T$ 3.000" },
		{ item: "Manto élfico", porcentagem: 5, preco: "T$ 3.000" },
		{ item: "Mochila de carga", porcentagem: 5, preco: "T$ 3.000" },
		{ item: "Brincos da sagacidade", porcentagem: 6, preco: "T$ 4.500" },
		{ item: "Luvas da delicadeza", porcentagem: 6, preco: "T$ 4.500" },
		{ item: "Manoplas da força do ogro", porcentagem: 6, preco: "T$ 4.500" },
		{ item: "Manto da resistência", porcentagem: 7, preco: "T$ 4.500" },
		{ item: "Manto do fascínio", porcentagem: 6, preco: "T$ 4.500" },
		{ item: "Pingente da sensatez", porcentagem: 6, preco: "T$ 4.500" },
		{ item: "Torque do vigor", porcentagem: 6, preco: "T$ 4.500" },
		{ item: "Chapéu do disfarce", porcentagem: 5, preco: "T$ 6.000" },
		{ item: "Flauta fantasma", porcentagem: 2, preco: "T$ 6.000" },
		{ item: "Lanterna da revelação", porcentagem: 5, preco: "T$ 6.000" },
		{ item: "Anel da proteção", porcentagem: 7, preco: "T$ 9.000" },
		{ item: "Anel do escudo mental", porcentagem: 2, preco: "T$ 9.000" },
		{ item: "Pingente da saúde", porcentagem: 2, preco: "T$ 9.000" }
	];

	var random = Math.floor(Math.random() * 100) + 1;
	var itemMenor = null;

	for (var i = 0; i < itens.length; i++) {
		var chances = itens[i].porcentagem;

		if (random <= chances) {
			itemMenor = itens[i].item;
			break;
		}

		random -= chances;
	}

	return itemMenor || "Nenhum item";
}

function getItemMedio() {
	var itens = [
		{ item: "Anel de telecinesia", porcentagem: 4, preco: "T$ 10.500" },
		{ item: "Bola de cristal", porcentagem: 4, preco: "T$ 10.500" },
		{ item: "Caveira maldita", porcentagem: 2, preco: "T$ 10.500" },
		{ item: "Botas aladas", porcentagem: 4, preco: "T$ 15.000" },
		{ item: "Braceletes de bronze", porcentagem: 4, preco: "T$ 16.500" },
		{ item: "Anel da energia", porcentagem: 6, preco: "T$ 21.000" },
		{ item: "Anel da vitalidade", porcentagem: 6, preco: "T$ 21.000" },
		{ item: "Anel de invisibilidade", porcentagem: 4, preco: "T$ 21.000" },
		{ item: "Braçadeiras do arqueiro", porcentagem: 4, preco: "T$ 21.000" },
		{ item: "Brincos de Marah", porcentagem: 4, preco: "T$ 21.000" },
		{ item: "Faixas do pugilista", porcentagem: 4, preco: "T$ 21.000" },
		{ item: "Manto da aranha", porcentagem: 4, preco: "T$ 21.000" },
		{ item: "Vassoura voadora", porcentagem: 4, preco: "T$ 21.000" },
		{ item: "Símbolo abençoado", porcentagem: 4, preco: "T$ 21.000" },
		{ item: "Amuleto da robustez", porcentagem: 6, preco: "T$ 25.500" },
		{ item: "Botas velozes", porcentagem: 4, preco: "T$ 25.500" },
		{ item: "Cinto da força do gigante", porcentagem: 6, preco: "T$ 25.500" },
		{ item: "Coroa majestosa", porcentagem: 6, preco: "T$ 25.500" },
		{ item: "Estola da serenidade", porcentagem: 6, preco: "T$ 25.500" },
		{ item: "Manto do morcego", porcentagem: 2, preco: "T$ 25.500" },
		{ item: "Pulseiras da celeridade", porcentagem: 6, preco: "T$ 25.500" },
		{ item: "Tiara da sapiência", porcentagem: 6, preco: "T$ 25.500" }
	];

	var random = Math.floor(Math.random() * 100) + 1;
	var itemMedio = null;

	for (var i = 0; i < itens.length; i++) {
		var chances = itens[i].porcentagem;

		if (random <= chances) {
			itemMedio = itens[i].item;
			break;
		}

		random -= chances;
	}

	return itemMedio || "Nenhum item";
}

function getItemMaior() {
	var itens = [
		{ item: "Elmo do teletransporte", porcentagem: 2, preco: "T$ 30.000" },
		{ item: "Gema da telepatia", porcentagem: 2, preco: "T$ 30.000" },
		{ item: "Gema elemental", porcentagem: 5, preco: "T$ 30.000" },
		{ item: "Manual da saúde corporal", porcentagem: 6, preco: "T$ 30.000" },
		{ item: "Manual do bom exercício", porcentagem: 6, preco: "T$ 30.000" },
		{ item: "Manual dos movimentos precisos", porcentagem: 6, preco: "T$ 30.000" },
		{ item: "Medalhão de Lena", porcentagem: 7, preco: "T$ 30.000" },
		{ item: "Tomo da compreensão", porcentagem: 6, preco: "T$ 30.000" },
		{ item: "Tomo da liderança e influência", porcentagem: 6, preco: "T$ 30.000" },
		{ item: "Tomo dos grandes pensamentos", porcentagem: 6, preco: "T$ 30.000" },
		{ item: "Anel refletor", porcentagem: 5, preco: "T$ 51.000" },
		{ item: "Cinto do campeão", porcentagem: 3, preco: "T$ 51.000" },
		{ item: "Colar guardião", porcentagem: 7, preco: "T$ 51.000" },
		{ item: "Estatueta animista", porcentagem: 5, preco: "T$ 51.000" },
		{ item: "Anel da liberdade", porcentagem: 5, preco: "T$ 60.000" },
		{ item: "Tapete voador", porcentagem: 5, preco: "T$ 60.000" },
		{ item: "Braceletes de ouro", porcentagem: 5, preco: "T$ 64.500" },
		{ item: "Espelho da oposição", porcentagem: 2, preco: "T$ 75.000" },
		{ item: "Robe do arquimago", porcentagem: 5, preco: "T$ 90.000" },
		{ item: "Orbe das tempestades", porcentagem: 2, preco: "T$ 97.500" },
		{ item: "Anel da regeneração", porcentagem: 2, preco: "T$ 150.000" },
		{ item: "Espelho do aprisionamento", porcentagem: 2, preco: "T$ 150.000" }
	];

	var random = Math.floor(Math.random() * 100) + 1;
	var itemMaior = null;

	for (var i = 0; i < itens.length; i++) {
		var chances = itens[i].porcentagem;

		if (random <= chances) {
			itemMaior = itens[i].item;
			break;
		}

		random -= chances;
	}

	return itemMaior || "Nenhum item";
}

function getArmaMagica() {
	var armasMagicas = [
		{ item: "Ameaçadora", porcentagem: 5, descricao: "Duplica margem de ameaça" },
		{ item: "Anticriatura", porcentagem: 5, descricao: "Bônus contra tipo de criatura" },
		{ item: "Arremesso", porcentagem: 2, descricao: "Pode ser arremessada" },
		{ item: "Assassina", porcentagem: 2, descricao: "Aumenta ataque furtivo" },
		{ item: "Caçadora", porcentagem: 2, descricao: "Ignora camuflagem leve e total e cobertura leve" },
		{ item: "Congelante", porcentagem: 5, descricao: "+1d6 de dano de frio" },
		{ item: "Conjuradora", porcentagem: 2, descricao: "Pode guardar e lançar magias" },
		{ item: "Corrosiva", porcentagem: 5, descricao: "+1d6 de dano de ácido" },
		{ item: "Dançarina", porcentagem: 2, descricao: "Ataca sozinha" },
		{ item: "Defensora", porcentagem: 4, descricao: "Defesa +2" },
		{ item: "Destruidora", porcentagem: 2, descricao: "Bônus contra construtos" },
		{ item: "Dilacerante", porcentagem: 2, descricao: "+10 de dano em acertos críticos" },
		{ item: "Drenante", porcentagem: 2, descricao: "Crítico drena vítima" },
		{ item: "Elétrica", porcentagem: 5, descricao: "+1d6 de dano de eletricidade" },
		{ item: "Energética*", porcentagem: 1, descricao: "Bônus em ataque" },
		{ item: "Excruciante", porcentagem: 2, descricao: "Causa fraqueza" },
		{ item: "Flamejante", porcentagem: 5, descricao: "+1d6 de dano de fogo" },
		{ item: "Formidável", porcentagem: 10, descricao: "Ataque e dano +2" },
		{ item: "Lancinante*", porcentagem: 1, descricao: "Causa crítico terrível" },
		{ item: "Magnífica*", porcentagem: 8, descricao: "Ataque e dano +4" },
		{ item: "Piedosa", porcentagem: 2, descricao: "Dano não letal" },
		{ item: "Profana", porcentagem: 2, descricao: "Bônus contra devotos do Bem" },
		{ item: "Sagrada", porcentagem: 2, descricao: "Bônus contra devotos do Mal" },
		{ item: "Sanguinária", porcentagem: 2, descricao: "Causa sangramento" },
		{ item: "Trovejante", porcentagem: 2, descricao: "Causa atordoamento" },
		{ item: "Tumular", porcentagem: 2, descricao: "+1d8 de dano de trevas" },
		{ item: "Veloz", porcentagem: 4, descricao: "Fornece ataque extra" },
		{ item: "Venenosa", porcentagem: 2, descricao: "Causa envenenamento" },
		{ item: "Arma específica", porcentagem: 10, descricao: "Veja a Tabela 8-9" }
	];

	var totalPorcentagem = 0;
	for (var i = 0; i < armasMagicas.length; i++) {
		totalPorcentagem += armasMagicas[i].porcentagem;
	}

	var randomNum = Math.floor(Math.random() * totalPorcentagem) + 1;
	var cumulativePorcentagem = 0;

	for (var j = 0; j < armasMagicas.length; j++) {
		cumulativePorcentagem += armasMagicas[j].porcentagem;
		if (randomNum <= cumulativePorcentagem) {
			if (armasMagicas[j].item === "Energética*" || armasMagicas[j].item === "Lancinante*" || armasMagicas[j].item === "Magnífica*") {
				console.log("*Conta como dois encantos. Para itens menores, role novamente");
			}
			return armasMagicas[j].item;
		}
	}
}



function getArmaEspecifica() {
	var armasEspecificas = [
		{ item: "Azagaia dos relâmpagos", porcentagem: 5, descricao: "T$ 30.000" },
		{ item: "Espada baronial", porcentagem: 10, descricao: "T$ 30.000" },
		{ item: "Lâmina da luz", porcentagem: 10, descricao: "T$ 45.000" },
		{ item: "Lança animalesca", porcentagem: 5, descricao: "T$ 45.000" },
		{ item: "Maça do terror", porcentagem: 5, descricao: "T$ 45.000" },
		{ item: "Florete fugaz", porcentagem: 5, descricao: "T$ 50.000" },
		{ item: "Cajado da destruição", porcentagem: 5, descricao: "T$ 60.000" },
		{ item: "Cajado da vida", porcentagem: 5, descricao: "T$ 60.000" },
		{ item: "Machado silvestre", porcentagem: 5, descricao: "T$ 70.000" },
		{ item: "Martelo de Doherimm", porcentagem: 5, descricao: "T$ 70.000" },
		{ item: "Arco do poder", porcentagem: 7, descricao: "T$ 90.000" },
		{ item: "Língua do deserto", porcentagem: 5, descricao: "T$ 90.000" },
		{ item: "Besta explosiva", porcentagem: 5, descricao: "T$ 100.000" },
		{ item: "Punhal sszzaazita", porcentagem: 5, descricao: "T$ 100.000" },
		{ item: "Espada sortuda", porcentagem: 5, descricao: "T$ 110.000" },
		{ item: "Avalanche", porcentagem: 5, descricao: "T$ 140.000" },
		{ item: "Cajado do poder", porcentagem: 3, descricao: "T$ 180.000" },
		{ item: "Vingadora sagrada", porcentagem: 5, descricao: "T$ 200.000" }
	];

	var totalPorcentagem = 0;
	for (var i = 0; i < armasEspecificas.length; i++) {
		totalPorcentagem += armasEspecificas[i].porcentagem;
	}

	var randomNum = Math.floor(Math.random() * totalPorcentagem) + 1;
	var cumulativePorcentagem = 0;

	for (var j = 0; j < armasEspecificas.length; j++) {
		cumulativePorcentagem += armasEspecificas[j].porcentagem;
		if (randomNum <= cumulativePorcentagem) {
			return armasEspecificas[j];
		}
	}
}

function getEncantoArmadura() {
	var armaduras = [
		{ item: "Abascanto", porcentagem: 6, descricao: "Resistência contra magia" },
		{ item: "Abençoado", porcentagem: 4, descricao: "Resistência contra trevas" },
		{ item: "Acrobático", porcentagem: 1, descricao: "Bônus em Acrobacia" },
		{ item: "Alado", porcentagem: 2, descricao: "Deslocamento de voo 12m" },
		{ item: "Animado", porcentagem: 2, descricao: "Escudo defende sozinho" },
		{ item: "Assustador", porcentagem: 2, descricao: "Causa efeito de medo" },
		{ item: "Cáustica", porcentagem: 4, descricao: "Resistência contra ácido" },
		{ item: "Defensor", porcentagem: 10, descricao: "Defesa +2" },
		{ item: "Escorregadio", porcentagem: 2, descricao: "Bônus para escapar" },
		{ item: "Esmagador", porcentagem: 2, descricao: "Escudo causa mais dano" },
		{ item: "Fantasmagórico", porcentagem: 2, descricao: "Lança Manto de Sombras" },
		{ item: "Fortificado", porcentagem: 2, descricao: "Chance de ignorar crítico" },
		{ item: "Gélido", porcentagem: 10, descricao: "Resistência contra frio" },
		{ item: "Guardião", porcentagem: 6, descricao: "Defesa +4" },
		{ item: "Hipnótico", porcentagem: 2, descricao: "Fascina inimigos" },
		{ item: "Ilusório", porcentagem: 2, descricao: "Camufla-se como item comum" },
		{ item: "Incandescente", porcentagem: 4, descricao: "Resistência contra fogo" },
		{ item: "Invulnerável", porcentagem: 4, descricao: "Redução de dano" },
		{ item: "Opaco", porcentagem: 2, descricao: "Redução de energia" },
		{ item: "Protetor", porcentagem: 6, descricao: "Resistência +2" },
		{ item: "Refletor", porcentagem: 2, descricao: "Reflete magia" },
		{ item: "Relampejante", porcentagem: 2, descricao: "Resistência contra eletricidade" },
		{ item: "Reluzente", porcentagem: 2, descricao: "Causa efeito de cegueira" },
		{ item: "Sombrio", porcentagem: 2, descricao: "Bônus em Furtividade" },
		{ item: "Zeloso", porcentagem: 2, descricao: "Atrai ataques em aliados" },
		{ item: "Item específico", porcentagem: 10, descricao: "Veja a Tabela 8-11" }
	];

	var totalPorcentagem = 0;
	for (var i = 0; i < armaduras.length; i++) {
		totalPorcentagem += armaduras[i].porcentagem;
	}

	var randomNum = Math.floor(Math.random() * totalPorcentagem) + 1;
	var cumulativePorcentagem = 0;

	for (var j = 0; j < armaduras.length; j++) {
		cumulativePorcentagem += armaduras[j].porcentagem;
		if (randomNum <= cumulativePorcentagem) {
			if (armaduras[j].item === "Animado¹" || armaduras[j].item === "Esmagador¹") {
				console.log("¹ Apenas Escudos");
			} else if (armaduras[j].item === "Guardião²") {
				console.log("² Conta como dois encantos. Para itens menores, role novamente");
			}
			return armaduras[j].item;
		}
	}
}



function getArmaduraEspecifica() {
	var armadurasEspecificas = [
		{ item: "Cota élfica", porcentagem: 10, descricao: "T$ 30.000" },
		{ item: "Couro de monstro", porcentagem: 10, descricao: "T$ 36.000" },
		{ item: "Escudo do conjurador", porcentagem: 5, descricao: "T$ 45.000" },
		{ item: "Loriga do centurião", porcentagem: 7, descricao: "T$ 45.000" },
		{ item: "Manto da noite", porcentagem: 10, descricao: "T$ 45.000" },
		{ item: "Couraça do comando", porcentagem: 7, descricao: "T$ 45.000" },
		{ item: "Baluarte anão", porcentagem: 10, descricao: "T$ 50.000" },
		{ item: "Escudo espinhoso", porcentagem: 7, descricao: "T$ 50.000" },
		{ item: "Escudo do leão", porcentagem: 10, descricao: "T$ 50.000" },
		{ item: "Carapaça demoníaca", porcentagem: 7, descricao: "T$ 63.000" },
		{ item: "Escudo do eclipse", porcentagem: 5, descricao: "T$ 70.000" },
		{ item: "Escudo de Azgher", porcentagem: 5, descricao: "T$ 140.000" },
		{ item: "Armadura da luz", porcentagem: 7, descricao: "T$ 150.000" }
	];

	var totalPorcentagem = 0;
	for (var i = 0; i < armadurasEspecificas.length; i++) {
		totalPorcentagem += armadurasEspecificas[i].porcentagem;
	}

	var randomNum = Math.floor(Math.random() * totalPorcentagem) + 1;
	var cumulativePorcentagem = 0;

	for (var j = 0; j < armadurasEspecificas.length; j++) {
		cumulativePorcentagem += armadurasEspecificas[j].porcentagem;
		if (randomNum <= cumulativePorcentagem) {
			return armadurasEspecificas[j];
		}
	}
}

function getRiquezaMenor() {
	var riquezasMenores = [
		{ item: "Riqueza Menor: 4d4 (10). Exemplos: Ágata ou hematita (1/2); barril de farinha ou gaiola com galinhas (5)", porcentagem: 25 },
		{ item: "Riqueza Menor: 1d4x10 (25). Exemplos: Quartzo rosa ou topázio (1/2); caixa de tabaco ou rolo de linho (1); jarro de especiarias, como canela, gorad, pimenta ou sal (2)", porcentagem: 15 },
		{ item: "Riqueza Menor: 2d4x10 (50). Exemplos: Bracelete de ouro finamente trabalhado (1/2); estatueta de osso ou marfim entalhado ou rolo de seda (1); vaso de prata (2)", porcentagem: 15 },
		{ item: "Riqueza Menor: 4d6x10 (140). Exemplos: Ametista ou pérola branca (1/2); lingote de prata ou cálice de prata com gemas de lápis-lazúli (1); tapeçaria grande e bem-feita de lã (5)", porcentagem: 15 },
		{ item: "Riqueza Menor: 1d6x100 (350). Exemplos: Alexandrita ou pérola negra (1/2); espada cerimonial ornada com prata e gema negra no cabo ou pente de prata com pedras preciosas (1)", porcentagem: 15 },
		{ item: "Riqueza Menor: 2d6x100 (700). Exemplos: Pente em forma de dragão com olhos de gema vermelha (1); harpa de madeira exótica com ornamentos de zircão e marfim (5)", porcentagem: 10 },
		{ item: "Riqueza Menor: 2d8x100 (900). Exemplos: Opala negra ou tapa-olho com um olho falso de safira (1/2); luva bordada e adornada com gemas ou pingente de opala vermelha com corrente de ouro (1); lingote de ouro ou pintura antiga (2)", porcentagem: 4 },
		{ item: "Riqueza Menor: 4d10x100 (2.200). Exemplos: Esmeralda verde ou pingente de safira (1/2); caixinha de música de ouro ou tornozeleira com gemas (1); manto bordado em veludo e seda com inúmeras pedras preciosas (2)", porcentagem: 1 }
	];

	var totalPorcentagem = 0;
	for (var i = 0; i < riquezasMenores.length; i++) {
		totalPorcentagem += riquezasMenores[i].porcentagem;
	}

	var randomNum = Math.floor(Math.random() * totalPorcentagem) + 1;
	var cumulativePorcentagem = 0;

	for (var j = 0; j < riquezasMenores.length; j++) {
		cumulativePorcentagem += riquezasMenores[j].porcentagem;
		if (randomNum <= cumulativePorcentagem) {
			return riquezasMenores[j].item;
		}
	}
}

var getRiquezaMenorCom20Porcento = adicionar20Porcento(getRiquezaMenor);
var resultadoRiquezaMenor = getRiquezaMenorCom20Porcento();
console.log(resultadoRiquezaMenor);


function getRiquezaMedia() {
	var riquezasMedias = [
		{ item: "Riqueza Média: 2d4x10 (50). Exemplos: Bracelete de ouro finamente trabalhado (1/2); estatueta de osso ou marfim entalhado ou rolo de seda (1); vaso de prata (2)", porcentagem: 10 },
		{ item: "Riqueza Média: 4d6x10 (140). Exemplos: Ametista ou pérola branca (1/2); lingote de prata ou cálice de prata com gemas de lápis-lazúli (1); tapeçaria grande e bem-feita de lã (5)", porcentagem: 20 },
		{ item: "Riqueza Média: 1d6x100 (350). Exemplos: Alexandrita ou pérola negra (1/2); espada cerimonial ornada com prata e gema negra no cabo ou pente de prata com pedras preciosas (1)", porcentagem: 20 },
		{ item: "Riqueza Média: 2d6x100 (700). Exemplos: Pente em forma de dragão com olhos de gema vermelha (1); harpa de madeira exótica com ornamentos de zircão e marfim (5)", porcentagem: 15 },
		{ item: "Riqueza Média: 2d8x100 (900). Exemplos: Opala negra ou tapa-olho com um olho falso de safira (1/2); luva bordada e adornada com gemas ou pingente de opala vermelha com corrente de ouro (1); lingote de ouro ou pintura antiga (2)", porcentagem: 15 },
		{ item: "Riqueza Média: 4d10x100 (2.200). Exemplos: Esmeralda verde ou pingente de safira (1/2); caixinha de música de ouro ou tornozeleira com gemas (1); manto bordado em veludo e seda com inúmeras pedras preciosas (2)", porcentagem: 10 },
		{ item: "Riqueza Média: 6d12x100 (3.900). Exemplos: Anel de prata e safira ou correntinha com pequenas pérolas rosas, diamante branco (1/2); ídolo de ouro puro maciço (5)", porcentagem: 5 },
		{ item: "Riqueza Média: 2d10x1.000 (11.000). Exemplos: Anel de ouro e rubi ou diamante vermelho (1/2); conjunto de taças de ouro decoradas com esmeraldas (2)", porcentagem: 4 },
		{ item: "Riqueza Média: 6d8x1.000 (27.000). Exemplos: Coroa de ouro adornada com centenas de gemas, pertencente a um antigo monarca (1); baú de mitral com coleção de diamantes (2)", porcentagem: 1 }
	];

	var totalPorcentagem = 0;
	for (var i = 0; i < riquezasMedias.length; i++) {
		totalPorcentagem += riquezasMedias[i].porcentagem;
	}

	var randomNum = Math.floor(Math.random() * totalPorcentagem) + 1;
	var cumulativePorcentagem = 0;

	for (var j = 0; j < riquezasMedias.length; j++) {
		cumulativePorcentagem += riquezasMedias[j].porcentagem;
		if (randomNum <= cumulativePorcentagem) {
			return riquezasMedias[j].item;
		}
	}
}

var getRiquezaMediaCom20Porcento = adicionar20Porcento(getRiquezaMedia);
var resultadoRiquezaMedia = getRiquezaMediaCom20Porcento();
console.log(resultadoRiquezaMedia);

function getRiquezaMaior() {
	var riquezasMaiores = [
		{ item: "Riqueza Maior: 1d6x100 (350). Exemplos: Alexandrita ou pérola negra (1/2); espada cerimonial ornada com prata e gema negra no cabo ou pente de prata com pedras preciosas (1)", porcentagem: 5 },
		{ item: "Riqueza Maior: 2d6x100 (700). Exemplos: Pente em forma de dragão com olhos de gema vermelha (1); harpa de madeira exótica com ornamentos de zircão e marfim (5)", porcentagem: 10 },
		{ item: "Riqueza Maior: 2d8x100 (900). Exemplos: Opala negra ou tapa-olho com um olho falso de safira (1/2); luva bordada e adornada com gemas ou pingente de opala vermelha com corrente de ouro (1); lingote de ouro ou pintura antiga (2)", porcentagem: 10 },
		{ item: "Riqueza Maior: 4d10x100 (2.200). Exemplos: Esmeralda verde ou pingente de safira (1/2); caixinha de música de ouro ou tornozeleira com gemas (1); manto bordado em veludo e seda com inúmeras pedras preciosas (2)", porcentagem: 15 },
		{ item: "Riqueza Maior: 6d12x100 (3.900). Exemplos: Anel de prata e safira ou correntinha com pequenas pérolas rosas, diamante branco (1/2); ídolo de ouro puro maciço (5)", porcentagem: 20 },
		{ item: "Riqueza Maior: 2d10x1.000 (11.000). Exemplos: Anel de ouro e rubi ou diamante vermelho (1/2); conjunto de taças de ouro decoradas com esmeraldas (2)", porcentagem: 15 },
		{ item: "Riqueza Maior: 6d8x1.000 (27.000). Exemplos: Coroa de ouro adornada com centenas de gemas, pertencente a um antigo monarca (1); baú de mitral com coleção de diamantes (2)", porcentagem: 10 },
		{ item: "Riqueza Maior: 1d10x10.000 (55.000). Exemplos: Arca de madeira reforçada repleta de lingotes de prata e ouro, além de pedras preciosas de vários tipos (20)", porcentagem: 10 },
		{ item: "Riqueza Maior: 4d12x10.000 (260.000) Uma sala forrada de moedas! Mover todo esse dinheiro exige trabalhadores e carroças (ou outra ideia por parte dos jogadores), além de atrair a atenção de bandidos, coletores de impostos e aproveitadores de vários tipos...", porcentagem: 5 }
	];

	var totalPorcentagem = 0;
	for (var i = 0; i < riquezasMaiores.length; i++) {
		totalPorcentagem += riquezasMaiores[i].porcentagem;
	}

	var randomNum = Math.floor(Math.random() * totalPorcentagem) + 1;
	var cumulativePorcentagem = 0;

	for (var j = 0; j < riquezasMaiores.length; j++) {
		cumulativePorcentagem += riquezasMaiores[j].porcentagem;
		if (randomNum <= cumulativePorcentagem) {
			return riquezasMaiores[j].item;
		}
	}
}

var getRiquezaMaiorCom20Porcento = adicionar20Porcento(getRiquezaMaior);
var resultadoRiquezaMaior = getRiquezaMaiorCom20Porcento();
console.log(resultadoRiquezaMaior);


function getArmadura() {
	var armaduras = [
		{ item: "Armadura de Couro", porcentagem: 5 },
		{ item: "Brunea", porcentagem: 5 },
		{ item: "Armadura Completa", porcentagem: 15 },
		{ item: "Cota de malha", porcentagem: 5 },
		{ item: "Couraça", porcentagem: 15 },
		{ item: "Armadura de Couro batido", porcentagem: 10 },
		{ item: "Escudo leve", porcentagem: 10 },
		{ item: "Escudo pesado", porcentagem: 15 },
		{ item: "Gibão de peles", porcentagem: 5 },
		{ item: "Loriga segmentada", porcentagem: 5 },
		{ item: "Meia armadura", porcentagem: 10 }
	];

	var totalPorcentagem = 0;
	for (var i = 0; i < armaduras.length; i++) {
		totalPorcentagem += armaduras[i].porcentagem;
	}

	var randomNum = Math.floor(Math.random() * totalPorcentagem) + 1;
	var cumulativePorcentagem = 0;

	for (var j = 0; j < armaduras.length; j++) {
		cumulativePorcentagem += armaduras[j].porcentagem;
		if (randomNum <= cumulativePorcentagem) {
			return armaduras[j].item; // Retorna apenas o nome da armadura
		}
	}

	return null;
}


function getEsoterico() {
	var esotericos = [
		{ item: "Bolsa de pó", porcentagem: 10 },
		{ item: "Cajado arcano", porcentagem: 15 },
		{ item: "Cetro elemental", porcentagem: 10 },
		{ item: "Costela de lich", porcentagem: 7 },
		{ item: "Dedo de ente", porcentagem: 8 },
		{ item: "Luva de ferro", porcentagem: 5 },
		{ item: "Medalhão de prata", porcentagem: 10 },
		{ item: "Orbe cristalina", porcentagem: 10 },
		{ item: "Tomo hermético", porcentagem: 10 },
		{ item: "Varinha arcana", porcentagem: 15 }
	];

	var totalPorcentagem = 0;
	for (var i = 0; i < esotericos.length; i++) {
		totalPorcentagem += esotericos[i].porcentagem;
	}

	var randomNum = Math.floor(Math.random() * totalPorcentagem) + 1;
	var cumulativePorcentagem = 0;

	for (var j = 0; j < esotericos.length; j++) {
		cumulativePorcentagem += esotericos[j].porcentagem;
		if (randomNum <= cumulativePorcentagem) {
			return esotericos[j].item; // Retorna apenas o nome do item
		}
	}

	return null;
}


function getEquipamento() {
	var randomNum = Math.random();

	if (randomNum < 0.5) {
		return getArma();
	} else if (randomNum < 0.875) {
		return getArmadura();
	} else {
		return getEsoterico();
	}
}

function getMelhoria() {
	var randomNum = Math.random();

	if (randomNum < 0.5) {
		return getArma() + " " + getMelhoriaArma();
	} else if (randomNum < 0.875) {
		return getArmadura() + " " + getMelhoriaArmadura();
	} else {
		return getEsoterico() + " " + getMelhoriaEsoterico();
	}
}

function getMelhoria2() {
	var randomNum = Math.random();

	if (randomNum < 0.5) {
		var melhoria1 = getMelhoriaArma();
		var melhoria2 = getMelhoriaArma();

		// Verifica se as duas melhorias são iguais ou se é a combinação "Precisa" com "Maciça"
		while (melhoria2 === melhoria1 || (melhoria1 === "Precisa" && melhoria2 === "Maciça") || (melhoria1 === "Maciça" && melhoria2 === "Precisa")) {
			melhoria2 = getMelhoriaArma();
		}

		return getArma() + " " + melhoria1 + " e " + melhoria2;
	} else if (randomNum < 0.875) {
		var melhoria1 = getMelhoriaArmadura();
		var melhoria2 = getMelhoriaArmadura();

		while (melhoria2 === melhoria1) {
			melhoria2 = getMelhoriaArmadura();
		}

		return getArmadura() + " " + melhoria1 + " e " + melhoria2;
	} else {
		var melhoria1 = getMelhoriaEsoterico();
		var melhoria2 = getMelhoriaEsoterico();

		while (melhoria2 === melhoria1) {
			melhoria2 = getMelhoriaEsoterico();
		}

		// Verifica se a primeira melhoria é "Material Especial" e, caso seja, não atribui uma segunda melhoria
		if (melhoria1 === "Material Especial") {
			return getEsoterico() + " " + melhoria1;
		}

		return getEsoterico() + " " + melhoria1 + " e " + melhoria2;
	}
}


function getMelhoria3() {
	var randomNum = Math.random();

	if (randomNum < 0.5) {
		var melhoria1 = getMelhoriaArma();
		var melhoria2 = getMelhoriaArma();
		var melhoria3 = getMelhoriaArma();

		// Verifica se há alguma combinação inválida entre as melhorias e se as três melhorias são iguais
		while (
			melhoria2 === melhoria1 ||
			melhoria3 === melhoria1 ||
			melhoria3 === melhoria2 ||
			(melhoria1 === "Precisa" && melhoria2 === "Maciça") ||
			(melhoria1 === "Maciça" && melhoria2 === "Precisa") ||
			(melhoria1 === "Precisa" && melhoria3 === "Maciça") ||
			(melhoria1 === "Maciça" && melhoria3 === "Precisa") ||
			(melhoria2 === "Precisa" && melhoria3 === "Maciça") ||
			(melhoria2 === "Maciça" && melhoria3 === "Precisa") ||
			(melhoria1 === melhoria2 && melhoria2 === melhoria3)
		) {
			melhoria2 = getMelhoriaArma();
			melhoria3 = getMelhoriaArma();
		}

		return getArma() + " " + melhoria1 + ", " + melhoria2 + " e " + melhoria3;
	} else if (randomNum < 0.875) {
		var melhoria1 = getMelhoriaArmadura();
		var melhoria2 = getMelhoriaArmadura();
		var melhoria3 = getMelhoriaArmadura();

		while (melhoria2 === melhoria1 || melhoria3 === melhoria1 || melhoria3 === melhoria2) {
			melhoria2 = getMelhoriaArmadura();
			melhoria3 = getMelhoriaArmadura();
		}

		return getArmadura() + " " + melhoria1 + ", " + melhoria2 + " e " + melhoria3;
	} else {
		var melhoria1 = getMelhoriaEsoterico();
		var melhoria2 = getMelhoriaEsoterico();
		var melhoria3 = getMelhoriaEsoterico();

		while (melhoria2 === melhoria1 || melhoria3 === melhoria1 || melhoria3 === melhoria2) {
			melhoria2 = getMelhoriaEsoterico();
			melhoria3 = getMelhoriaEsoterico();
		}

		if (melhoria1 === "Material Especial") {
			return getEsoterico() + " " + melhoria1;
		}

		return getEsoterico() + " " + melhoria1 + ", " + melhoria2 + " e " + melhoria3;
	}
}

function getMelhoria4() {
	var randomNum = Math.random();

	if (randomNum < 0.5) {
		var melhoria1 = getMelhoriaArma();
		var melhoria2 = getMelhoriaArma();
		var melhoria3 = getMelhoriaArma();
		var melhoria4 = getMelhoriaArma();

		// Verifica se há alguma combinação inválida entre as melhorias e se as quatro melhorias são iguais
		while (
			melhoria2 === melhoria1 ||
			melhoria3 === melhoria1 ||
			melhoria3 === melhoria2 ||
			melhoria4 === melhoria1 ||
			melhoria4 === melhoria2 ||
			melhoria4 === melhoria3 ||
			(melhoria1 === "Precisa" && melhoria2 === "Maciça") ||
			(melhoria1 === "Maciça" && melhoria2 === "Precisa") ||
			(melhoria1 === "Precisa" && melhoria3 === "Maciça") ||
			(melhoria1 === "Maciça" && melhoria3 === "Precisa") ||
			(melhoria1 === "Precisa" && melhoria4 === "Maciça") ||
			(melhoria1 === "Maciça" && melhoria4 === "Precisa") ||
			(melhoria2 === "Precisa" && melhoria3 === "Maciça") ||
			(melhoria2 === "Maciça" && melhoria3 === "Precisa") ||
			(melhoria2 === "Precisa" && melhoria4 === "Maciça") ||
			(melhoria2 === "Maciça" && melhoria4 === "Precisa") ||
			(melhoria3 === "Precisa" && melhoria4 === "Maciça") ||
			(melhoria3 === "Maciça" && melhoria4 === "Precisa") ||
			(melhoria1 === melhoria2 && melhoria2 === melhoria3 && melhoria3 === melhoria4)
		) {
			melhoria2 = getMelhoriaArma();
			melhoria3 = getMelhoriaArma();
			melhoria4 = getMelhoriaArma();
		}

		return getArma() + " " + melhoria1 + ", " + melhoria2 + ", " + melhoria3 + " e " + melhoria4;
	} else if (randomNum < 0.875) {
		var melhoria1 = getMelhoriaArmadura();
		var melhoria2 = getMelhoriaArmadura();
		var melhoria3 = getMelhoriaArmadura();
		var melhoria4 = getMelhoriaArmadura();

		while (
			melhoria2 === melhoria1 ||
			melhoria3 === melhoria1 ||
			melhoria3 === melhoria2 ||
			melhoria4 === melhoria1 ||
			melhoria4 === melhoria2 ||
			melhoria4 === melhoria3
		) {
			melhoria2 = getMelhoriaArmadura();
			melhoria3 = getMelhoriaArmadura();
			melhoria4 = getMelhoriaArmadura();
		}

		return getArmadura() + " " + melhoria1 + ", " + melhoria2 + ", " + melhoria3 + " e " + melhoria4;
	} else {
		var melhoria1 = getMelhoriaEsoterico();
		var melhoria2 = getMelhoriaEsoterico();
		var melhoria3 = getMelhoriaEsoterico();
		var melhoria4 = getMelhoriaEsoterico();

		while (
			melhoria2 === melhoria1 ||
			melhoria3 === melhoria1 ||
			melhoria3 === melhoria2 ||
			melhoria4 === melhoria1 ||
			melhoria4 === melhoria2 ||
			melhoria4 === melhoria3
		) {
			melhoria2 = getMelhoriaEsoterico();
			melhoria3 = getMelhoriaEsoterico();
			melhoria4 = getMelhoriaEsoterico();
		}

		if (melhoria1 === "Material Especial") {
			return getEsoterico() + " " + melhoria1;
		}

		return getEsoterico() + " " + melhoria1 + ", " + melhoria2 + ", " + melhoria3 + " e " + melhoria4;
	}
}



function getMaterialEspecial() {
	var materiais = [
		"aço-rubi",
		"adamante",
		"gelo eterno",
		"madeira Tollon",
		"matéria vermelha",
		"mitral"
	];

	var roll = Math.floor(Math.random() * 6);
	return materiais[roll];
}

function getMelhoriaArma() {
	var melhorias = [
		{ item: "Atroz¹", porcentagem: 10 },
		{ item: "Banhada a ouro", porcentagem: 3 },
		{ item: "Certeira", porcentagem: 1 },
		{ item: "Cravejada de gemas", porcentagem: 3 },
		{ item: "Cruel", porcentagem: 9 },
		{ item: "Discreta", porcentagem: 3 },
		{ item: "Equilibrada", porcentagem: 5 },
		{ item: "Harmonizada", porcentagem: 4 },
		{ item: "Injeção alquímica", porcentagem: 5 },
		{ item: "Macabra", porcentagem: 2 },
		{ item: "Maciça", porcentagem: 10 },
		{ item: "Material especial", porcentagem: 10 },
		{ item: "Mira telescópica", porcentagem: 5 },
		{ item: "Precisa", porcentagem: 10 },
		{ item: "Pungente¹", porcentagem: 10 }
	];

	var totalPorcentagem = 0;
	for (var i = 0; i < melhorias.length; i++) {
		totalPorcentagem += melhorias[i].porcentagem;
	}

	var random = Math.random() * totalPorcentagem;
	var accumulatedPercentage = 0;
	for (var j = 0; j < melhorias.length; j++) {
		accumulatedPercentage += melhorias[j].porcentagem;
		if (random <= accumulatedPercentage) {
			if ((melhorias[j].item === "Atroz¹" || melhorias[j].item === "Pungente¹") && random > accumulatedPercentage - melhorias[j].porcentagem) {
				return (
					melhorias[j].item +
					": ¹ Conta como duas melhorias. Se o item só possuir uma, role novamente."
				);
			} else if (melhorias[j].item === "Material especial") {
				return melhorias[j].item + ": " + getMaterialEspecial();
			} else {
				return melhorias[j].item;
			}
		}
	}


	// Caso nenhuma melhoria seja selecionada, retornar uma melhoria padrão
	return "Melhoria Padrão";
}

function getMelhoriaArmadura() {
	var melhorias = [
		{ item: "Ajustada", porcentagem: 15 },
		{ item: "Banhada a ouro", porcentagem: 4 },
		{ item: "Cravejada de gemas", porcentagem: 4 },
		{ item: "Delicada", porcentagem: 5 },
		{ item: "Discreta", porcentagem: 4 },
		{ item: "Espinhos", porcentagem: 5 },
		{ item: "Macabra", porcentagem: 3 },
		{ item: "Material especial", porcentagem: 10 },
		{ item: "Polida", porcentagem: 5 },
		{ item: "Reforçada", porcentagem: 25 },
		{ item: "Selada", porcentagem: 10 },
		{ item: "Sob medida¹", porcentagem: 10 }
	];

	var totalPorcentagem = 0;
	for (var i = 0; i < melhorias.length; i++) {
		totalPorcentagem += melhorias[i].porcentagem;
	}

	var random = Math.random() * totalPorcentagem;
	var accumulatedPercentage = 0;
	for (var j = 0; j < melhorias.length; j++) {
		accumulatedPercentage += melhorias[j].porcentagem;
		if (random <= accumulatedPercentage) {
			if (melhorias[j].item === "Sob medida¹" && random > accumulatedPercentage - melhorias[j].porcentagem) {
				return (
					melhorias[j].item +
					": ¹ Conta como duas melhorias. Se o item só possuir uma, role novamente."
				);
			} else if (melhorias[j].item === "Material especial") {
				return melhorias[j].item + ": " + getMaterialEspecial();
			} else {
				return melhorias[j].item;
			}
		}
	}

	function getMelhoriaEsoterico() {
		var melhorias = [
			{ item: "Banhada a ouro", porcentagem: 4 },
			{ item: "Cravejada de gemas", porcentagem: 4 },
			{ item: "Discreto", porcentagem: 4 },
			{ item: "Energético", porcentagem: 15 },
			{ item: "Harmonizado", porcentagem: 15 },
			{ item: "Macabra", porcentagem: 3 },
			{ item: "Material especial", porcentagem: 9 },
			{ item: "Poderoso", porcentagem: 16 },
			{ item: "Potencializador", porcentagem: 15 },
			{ item: "Vigilante", porcentagem: 15 }
		];

		var totalPorcentagem = 0;
		for (var i = 0; i < melhorias.length; i++) {
			totalPorcentagem += melhorias[i].porcentagem;
		}

		var random = Math.random() * totalPorcentagem;
		var accumulatedPercentage = 0;
		for (var j = 0; j < melhorias.length; j++) {
			accumulatedPercentage += melhorias[j].porcentagem;
			if (random <= accumulatedPercentage) {
				if (melhorias[j].item === "Material especial") {
					return melhorias[j].item + ": " + getMaterialEspecial();
				} else {
					return melhorias[j].item;
				}
			}
		}

		// Caso nenhuma melhoria seja selecionada, retornar uma melhoria padrão
		return "Melhoria Padrão";
	}
}




// Engine de rolagens unificada
function rollTreasureForND(nd) {
	var tesouro = "";
	var dinheiro = "";
	var outras_coisas = "";
	var mensagem = "";
	
	var parsedND = parseFloat(nd);
	if (isNaN(parsedND)) {
		parsedND = 0;
	}
	
	var ndKey = parsedND;
	if (ndKey < 0.25) {
		ndKey = 0.25;
	} else if (ndKey > 0.25 && ndKey < 0.5) {
		ndKey = 0.5;
	} else if (ndKey > 0.5 && ndKey < 1.0) {
		ndKey = 1.0;
	} else if (ndKey > 1.0) {
		ndKey = Math.floor(ndKey);
	}
	
	if (ndKey > 22) {
		ndKey = 22;
	}

	if (ndKey === 0.25) {
		var random = Math.random();
		if (random <= 0.3) {
			tesouro = "Nenhum tesouro";
			mensagem = "Nada, o bicho era pobre";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;
			mensagem = "Tesouro menor";

			if (dinheiro_porcentagem >= 31 && dinheiro_porcentagem <= 70) {
				dinheiro = (Math.floor(Math.random() * 6) + 1) * 10 + " TC";
			} else if (dinheiro_porcentagem >= 71 && dinheiro_porcentagem <= 95) {
				dinheiro = (Math.floor(Math.random() * 4) + 1) * 100 + " TC";
			} else if (dinheiro_porcentagem >= 96 && dinheiro_porcentagem <= 100) {
				dinheiro = (Math.floor(Math.random() * 6) + 1) * 10 + " T$";
			}

			if (outras_coisas_porcentagem >= 51 && outras_coisas_porcentagem <= 75) {
				outras_coisas = getDiverso();
			} else if (outras_coisas_porcentagem >= 76 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getEquipamento();
			}
		}
	} else if (ndKey === 0.5) {
		var random = Math.random();
		if (random <= 0.25) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 26 && dinheiro_porcentagem <= 70) {
				dinheiro = (2 * (Math.floor(Math.random() * 6) + 1) * 10) + " TC";
			} else if (dinheiro_porcentagem >= 71 && dinheiro_porcentagem <= 95) {
				dinheiro = (2 * (Math.floor(Math.random() * 8) + 1) * 10) + " T$";
			} else if (dinheiro_porcentagem >= 96 && dinheiro_porcentagem <= 100) {
				dinheiro = (Math.floor(Math.random() * 4) + 1) * 100 + " T$";
			}

			if (outras_coisas_porcentagem >= 46 && outras_coisas_porcentagem <= 70) {
				outras_coisas = getDiverso();
			} else if (outras_coisas_porcentagem >= 71 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getEquipamento();
			}
		}
	} else if (ndKey === 1) {
		var random = Math.random();
		if (random <= 0.2) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 21 && dinheiro_porcentagem <= 70) {
				dinheiro = (3 * (Math.floor(Math.random() * 8) + 1) * 10) + " T$";
			} else if (dinheiro_porcentagem >= 71 && dinheiro_porcentagem <= 95) {
				dinheiro = (4 * (Math.floor(Math.random() * 12) + 1) * 10) + " T$";
			} else if (dinheiro_porcentagem >= 96 && dinheiro_porcentagem <= 100) {
				dinheiro = getRiquezaMenor();
			}

			if (outras_coisas_porcentagem >= 41 && outras_coisas_porcentagem <= 65) {
				outras_coisas = getDiverso();
			} else if (outras_coisas_porcentagem >= 66 && outras_coisas_porcentagem <= 90) {
				outras_coisas = getEquipamento();
			} else if (outras_coisas_porcentagem >= 91 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getPocao();
			}
		}
	} else if (ndKey === 2) {
		var random = Math.random();
		if (random <= 0.15) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 16 && dinheiro_porcentagem <= 55) {
				dinheiro = (3 * (Math.floor(Math.random() * 10) + 1) * 10) + " T$";
			} else if (dinheiro_porcentagem >= 56 && dinheiro_porcentagem <= 85) {
				dinheiro = (2 * (Math.floor(Math.random() * 4) + 1) * 100) + " T$";
			} else if (dinheiro_porcentagem >= 86 && dinheiro_porcentagem <= 95) {
				dinheiro = ((2 * (Math.floor(Math.random() * 6) + 1) + 1) * 100) + " T$";
			} else if (dinheiro_porcentagem >= 96 && dinheiro_porcentagem <= 100) {
				dinheiro = getRiquezaMenor();
			}

			if (outras_coisas_porcentagem >= 31 && outras_coisas_porcentagem <= 40) {
				outras_coisas = getDiverso();
			} else if (outras_coisas_porcentagem >= 41 && outras_coisas_porcentagem <= 70) {
				outras_coisas = getEquipamento();
			} else if (outras_coisas_porcentagem >= 71 && outras_coisas_porcentagem <= 90) {
				outras_coisas = getPocao();
			} else if (outras_coisas_porcentagem >= 91 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMelhoria();
			}
		}
	} else if (ndKey === 3) {
		var random = Math.random();
		if (random <= 0.1) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 11 && dinheiro_porcentagem <= 20) {
				dinheiro = (4 * (Math.floor(Math.random() * 12) + 1) * 10) + " T$";
			} else if (dinheiro_porcentagem >= 21 && dinheiro_porcentagem <= 60) {
				dinheiro = (Math.floor(Math.random() * 4) + 1) * 100 + " T$";
			} else if (dinheiro_porcentagem >= 61 && dinheiro_porcentagem <= 90) {
				dinheiro = (Math.floor(Math.random() * 8) + 1) * 10 + " TO";
			} else if (dinheiro_porcentagem >= 91 && dinheiro_porcentagem <= 100) {
				var quantidadeRiquezasMenores = Math.floor(Math.random() * 3) + 1;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMenores; i++) {
					dinheiro += getRiquezaMenor() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 25) {
				outras_coisas = "Nada";
			} else if (outras_coisas_porcentagem >= 26 && outras_coisas_porcentagem <= 35) {
				outras_coisas = getDiverso();
			} else if (outras_coisas_porcentagem >= 36 && outras_coisas_porcentagem <= 60) {
				outras_coisas = getEquipamento();
			} else if (outras_coisas_porcentagem >= 61 && outras_coisas_porcentagem <= 85) {
				outras_coisas = getPocao();
			} else if (outras_coisas_porcentagem >= 86 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMelhoria();
			}
		}
	} else if (ndKey === 4) {
		var random = Math.random();
		if (random <= 0.1) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 11 && dinheiro_porcentagem <= 50) {
				dinheiro = (Math.floor(Math.random() * 6) + 1) * 100 + " T$";
			} else if (dinheiro_porcentagem >= 51 && dinheiro_porcentagem <= 80) {
				dinheiro = (Math.floor(Math.random() * 12) + 1) * 100 + " T$";
			} else if (dinheiro_porcentagem >= 81 && dinheiro_porcentagem <= 90) {
				dinheiro = adicionar20Porcento(getRiquezaMenor)();
			} else if (dinheiro_porcentagem >= 91 && dinheiro_porcentagem <= 100) {
				var quantidadeRiquezasMenores = Math.floor(Math.random() * 3) + 1;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMenores; i++) {
					dinheiro += adicionar20Porcento(getRiquezaMenor)() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 21 && outras_coisas_porcentagem <= 30) {
				outras_coisas = getDiverso();
			} else if (outras_coisas_porcentagem >= 31 && outras_coisas_porcentagem <= 55) {
				outras_coisas = doisDados(getEquipamento);
			} else if (outras_coisas_porcentagem >= 56 && outras_coisas_porcentagem <= 80) {
				outras_coisas = adicionar20Porcento(getPocao)();
			} else if (outras_coisas_porcentagem >= 81 && outras_coisas_porcentagem <= 100) {
				outras_coisas = doisDados(getMelhoria);
			}
		}
	} else if (ndKey === 5) {
		var random = Math.random();
		if (random <= 0.1) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 16 && dinheiro_porcentagem <= 65) {
				dinheiro = (Math.floor(Math.random() * 8) + 1) * 100 + " T$";
			} else if (dinheiro_porcentagem >= 66 && dinheiro_porcentagem <= 95) {
				dinheiro = (Math.floor(Math.random() * 3) + 1) * 40 + " TO";
			} else if (dinheiro_porcentagem >= 96 && dinheiro_porcentagem <= 100) {
				dinheiro = getRiquezaMedia();
			}

			if (outras_coisas_porcentagem >= 21 && outras_coisas_porcentagem <= 70) {
				outras_coisas = getPocao();
			} else if (outras_coisas_porcentagem >= 71 && outras_coisas_porcentagem <= 90) {
				outras_coisas = getMelhoria();
			} else if (outras_coisas_porcentagem >= 91 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMelhoria2();
			}
		}
	} else if (ndKey === 6) {
		var random = Math.random();
		if (random <= 0.15) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 16 && dinheiro_porcentagem <= 60) {
				dinheiro = (Math.floor(Math.random() * 6) + 1) * 100 + " T$";
			} else if (dinheiro_porcentagem >= 61 && dinheiro_porcentagem <= 90) {
				dinheiro = (Math.floor(Math.random() * 12) + 1) * 100 + " T$";
			} else if (dinheiro_porcentagem >= 91 && dinheiro_porcentagem <= 100) {
				var quantidadeRiquezasMenores = Math.floor(Math.random() * 3) + 2;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMenores; i++) {
					dinheiro += getRiquezaMenor() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 21 && outras_coisas_porcentagem <= 65) {
				outras_coisas = adicionar20Porcento(getPocao)();
			} else if (outras_coisas_porcentagem >= 66 && outras_coisas_porcentagem <= 95) {
				outras_coisas = getMelhoria();
			} else if (outras_coisas_porcentagem >= 96 && outras_coisas_porcentagem <= 100) {
				outras_coisas = doisDados(getMelhoria2);
			}
		}
	} else if (ndKey === 7) {
		var random = Math.random();
		if (random <= 0.15) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 11 && dinheiro_porcentagem <= 60) {
				dinheiro = (4 * (Math.floor(Math.random() * 8) + 1) * 100) + " T$";
			} else if (dinheiro_porcentagem >= 61 && dinheiro_porcentagem <= 90) {
				dinheiro = (4 * (Math.floor(Math.random() * 12) + 1) * 10) + " TO";
			} else if (dinheiro_porcentagem >= 91 && dinheiro_porcentagem <= 100) {
				var quantidadeRiquezasMenores = Math.floor(Math.random() * 4) + 2;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMenores; i++) {
					dinheiro += getRiquezaMenor() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 21 && outras_coisas_porcentagem <= 60) {
				var quantidadePocoes = Math.floor(Math.random() * 3) + 1;
				outras_coisas = "";
				for (var i = 0; i < quantidadePocoes; i++) {
					outras_coisas += getPocao() + "<br>";
				}
			} else if (outras_coisas_porcentagem >= 61 && outras_coisas_porcentagem <= 90) {
				outras_coisas = getMelhoria2();
			} else if (outras_coisas_porcentagem >= 91 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMelhoria3();
			}
		}
	} else if (ndKey === 8) {
		var random = Math.random();
		if (random <= 0.15) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 11 && dinheiro_porcentagem <= 55) {
				dinheiro = (2 * (Math.floor(Math.random() * 10) + 1) * 100) + " T$";
			} else if (dinheiro_porcentagem >= 56 && dinheiro_porcentagem <= 95) {
				var quantidadeRiquezasMenores = Math.floor(Math.random() * 4) + 2;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMenores; i++) {
					dinheiro += getRiquezaMenor() + "<br>";
				}
			} else if (dinheiro_porcentagem >= 96 && dinheiro_porcentagem <= 100) {
				dinheiro = adicionar20Porcento(getRiquezaMedia)();
			}

			if (outras_coisas_porcentagem >= 21 && outras_coisas_porcentagem <= 75) {
				var quantidadePocoes = Math.floor(Math.random() * 3) + 1;
				outras_coisas = "";
				for (var i = 0; i < quantidadePocoes; i++) {
					outras_coisas += getPocao() + "<br>";
				}
			} else if (outras_coisas_porcentagem >= 76 && outras_coisas_porcentagem <= 95) {
				outras_coisas = getMelhoria2();
			} else if (outras_coisas_porcentagem >= 96 && outras_coisas_porcentagem <= 100) {
				outras_coisas = doisDados(getMelhoria3);
			}
		}
	} else if (ndKey === 9) {
		var random = Math.random();
		if (random <= 0.1) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 11 && dinheiro_porcentagem <= 35) {
				dinheiro = "";
			} else if (dinheiro_porcentagem >= 36 && dinheiro_porcentagem <= 85) {
				dinheiro = (Math.floor(Math.random() * 4) + 1) * 100 + " T$";
			} else if (dinheiro_porcentagem >= 86 && dinheiro_porcentagem <= 100) {
				var quantidadeRiquezasMedias = Math.floor(Math.random() * 3) + 1;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMedias; i++) {
					dinheiro += getRiquezaMedia() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 21 && outras_coisas_porcentagem <= 70) {
				outras_coisas = adicionar20Porcento(getPocao)();
			} else if (outras_coisas_porcentagem >= 71 && outras_coisas_porcentagem <= 95) {
				outras_coisas = getMelhoria3();
			} else if (outras_coisas_porcentagem >= 96 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMagicoMenor();
			}
		}
	} else if (ndKey === 10) {
		var random = Math.random();
		if (random <= 0.1) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 11 && dinheiro_porcentagem <= 30) {
				dinheiro = (Math.floor(Math.random() * 4) + 1) * 100 + " T$";
			} else if (dinheiro_porcentagem >= 31 && dinheiro_porcentagem <= 85) {
				dinheiro = (Math.floor(Math.random() * 4) + 1) * 10 + " TO";
			} else if (dinheiro_porcentagem >= 86 && dinheiro_porcentagem <= 100) {
				var quantidadeRiquezasMedias = Math.floor(Math.random() * 3) + 2;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMedias; i++) {
					dinheiro += getRiquezaMedia() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 50) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 51 && outras_coisas_porcentagem <= 75) {
				var quantidadePocoes = Math.floor(Math.random() * 3) + 2;
				outras_coisas = "";
				for (var i = 0; i < quantidadePocoes; i++) {
					outras_coisas += getPocao() + "<br>";
				}
			} else if (outras_coisas_porcentagem >= 76 && outras_coisas_porcentagem <= 90) {
				outras_coisas = getMelhoria3();
			} else if (outras_coisas_porcentagem >= 91 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMagicoMenor();
			}
		}
	} else if (ndKey === 11) {
		var random = Math.random();
		if (random <= 0.1) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 11 && dinheiro_porcentagem <= 45) {
				dinheiro = (Math.floor(Math.random() * 2) + 1) * 1000 + " T$";
			} else if (dinheiro_porcentagem >= 46 && dinheiro_porcentagem <= 85) {
				var quantidadeRiquezasMedias = Math.floor(Math.random() * 3) + 1;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMedias; i++) {
					dinheiro += getRiquezaMedia() + "<br>";
				}
			} else if (dinheiro_porcentagem >= 86 && dinheiro_porcentagem <= 100) {
				dinheiro = (Math.floor(Math.random() * 2) + 1) * 100 + " TO";
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 45) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 46 && outras_coisas_porcentagem <= 70) {
				var quantidadePocoes = Math.floor(Math.random() * 4) + 2;
				outras_coisas = "";
				for (var i = 0; i < quantidadePocoes; i++) {
					outras_coisas += getPocao() + "<br>";
				}
			} else if (outras_coisas_porcentagem >= 71 && outras_coisas_porcentagem <= 90) {
				outras_coisas = getMelhoria3();
			} else if (outras_coisas_porcentagem >= 91 && outras_coisas_porcentagem <= 100) {
				outras_coisas = doisDados(getMagicoMenor);
			}
		}
	} else if (ndKey === 12) {
		var random = Math.random();
		if (random <= 0.1) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 11 && dinheiro_porcentagem <= 45) {
				dinheiro = adicionar20Porcento(getRiquezaMedia)();
			} else if (dinheiro_porcentagem >= 46 && dinheiro_porcentagem <= 80) {
				dinheiro = (Math.floor(Math.random() * 2) + 1) * 1000 + " T$";
			} else if (dinheiro_porcentagem >= 81 && dinheiro_porcentagem <= 100) {
				var quantidadeRiquezasMedias = Math.floor(Math.random() * 4) + 2;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMedias; i++) {
					dinheiro += getRiquezaMedia() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 45) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 46 && outras_coisas_porcentagem <= 70) {
				var quantidadePocoes = Math.floor(Math.random() * 3) + 2;
				outras_coisas = "";
				for (var i = 0; i < quantidadePocoes; i++) {
					outras_coisas += getPocao() + "<br>";
				}
			} else if (outras_coisas_porcentagem >= 71 && outras_coisas_porcentagem <= 85) {
				outras_coisas = getMelhoria4();
			} else if (outras_coisas_porcentagem >= 86 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMagicoMenor();
			}
		}
	} else if (ndKey === 13) {
		var random = Math.random();
		if (random <= 0.1) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 11 && dinheiro_porcentagem <= 45) {
				dinheiro = (Math.floor(Math.random() * 4) + 1) * 1000 + " T$";
			} else if (dinheiro_porcentagem >= 46 && dinheiro_porcentagem <= 80) {
				var quantidadeRiquezasMedias = Math.floor(Math.random() * 3) + 1;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMedias; i++) {
					dinheiro += getRiquezaMedia() + "<br>";
				}
			} else if (dinheiro_porcentagem >= 81 && dinheiro_porcentagem <= 100) {
				dinheiro = (Math.floor(Math.random() * 4) + 1) * 100 + " TO";
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 40) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 41 && outras_coisas_porcentagem <= 65) {
				var quantidadePocoes = Math.floor(Math.random() * 4) + 2;
				outras_coisas = "";
				for (var i = 0; i < quantidadePocoes; i++) {
					outras_coisas += adicionar20Porcento(getPocao)() + "<br>";
				}
			} else if (outras_coisas_porcentagem >= 66 && outras_coisas_porcentagem <= 95) {
				outras_coisas = getMelhoria4();
			} else if (outras_coisas_porcentagem >= 96 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMagicoMedio();
			}
		}
	} else if (ndKey === 14) {
		var random = Math.random();
		if (random <= 0.1) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 11 && dinheiro_porcentagem <= 45) {
				var quantidadeRiquezasMedias = Math.floor(Math.random() * 3) + 1;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMedias; i++) {
					dinheiro += getRiquezaMedia() + "<br>";
				}
			} else if (dinheiro_porcentagem >= 46 && dinheiro_porcentagem <= 80) {
				dinheiro = (Math.floor(Math.random() * 3) + 1) * 1000 + " T$";
			} else if (dinheiro_porcentagem >= 81 && dinheiro_porcentagem <= 100) {
				dinheiro = getRiquezaMaior();
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 40) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 41 && outras_coisas_porcentagem <= 65) {
				var quantidadePocoes = Math.floor(Math.random() * 4) + 2;
				outras_coisas = "";
				for (var i = 0; i < quantidadePocoes; i++) {
					outras_coisas += adicionar20Porcento(getPocao)() + "<br>";
				}
			} else if (outras_coisas_porcentagem >= 66 && outras_coisas_porcentagem <= 90) {
				outras_coisas = getMelhoria4();
			} else if (outras_coisas_porcentagem >= 91 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMagicoMedio();
			}
		}
	} else if (ndKey === 15) {
		var random = Math.random();
		if (random <= 0.1) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 11 && dinheiro_porcentagem <= 45) {
				var quantidadeRiquezasMedias = Math.floor(Math.random() * 3) + 1;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMedias; i++) {
					dinheiro += getRiquezaMedia() + "<br>";
				}
			} else if (dinheiro_porcentagem >= 46 && dinheiro_porcentagem <= 80) {
				dinheiro = (Math.floor(Math.random() * 3) + 1) * 1000 + " T$";
			} else if (dinheiro_porcentagem >= 81 && dinheiro_porcentagem <= 100) {
				dinheiro = getRiquezaMaior();
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 40) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 41 && outras_coisas_porcentagem <= 65) {
				var quantidadePocoes = Math.floor(Math.random() * 4) + 2;
				outras_coisas = "";
				for (var i = 0; i < quantidadePocoes; i++) {
					outras_coisas += adicionar20Porcento(getPocao)() + "<br>";
				}
			} else if (outras_coisas_porcentagem >= 66 && outras_coisas_porcentagem <= 90) {
				outras_coisas = getMelhoria4();
			} else if (outras_coisas_porcentagem >= 91 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMagicoMedio();
			}
		}
	} else if (ndKey === 16) {
		var random = Math.random();
		if (random <= 0.1) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 11 && dinheiro_porcentagem <= 40) {
				dinheiro = (Math.floor(Math.random() * 3) + 3) * 1000 + " T$";
			} else if (dinheiro_porcentagem >= 41 && dinheiro_porcentagem <= 75) {
				dinheiro = (Math.floor(Math.random() * 3) + 3) * 100 + " TO";
			} else if (dinheiro_porcentagem >= 76 && dinheiro_porcentagem <= 100) {
				var quantidadeRiquezasMaior = Math.floor(Math.random() * 3) + 1;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMaior; i++) {
					dinheiro += getRiquezaMaior() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 35) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 36 && outras_coisas_porcentagem <= 45) {
				var quantidadePocoes = Math.floor(Math.random() * 6) + 2;
				outras_coisas = "";
				for (var i = 0; i < quantidadePocoes; i++) {
					outras_coisas += adicionar20Porcento(getPocao)() + "<br>";
				}
			} else if (outras_coisas_porcentagem >= 46 && outras_coisas_porcentagem <= 80) {
				outras_coisas = doisDados(getMelhoria4);
			} else if (outras_coisas_porcentagem >= 81 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMagicoMedio();
			}
		}
	} else if (ndKey === 17) {
		var random = Math.random();
		if (random <= 0.05) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 6 && dinheiro_porcentagem <= 40) {
				dinheiro = (Math.floor(Math.random() * 4) + 1) * 1000 + " T$";
			} else if (dinheiro_porcentagem >= 41 && dinheiro_porcentagem <= 75) {
				dinheiro = (Math.floor(Math.random() * 2) + 2) * 1000 + " TO";
			} else if (dinheiro_porcentagem >= 76 && dinheiro_porcentagem <= 100) {
				var quantidadeRiquezasMedia = Math.floor(Math.random() * 3) + 1;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMedia; i++) {
					dinheiro += getRiquezaMedia() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 20) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 21 && outras_coisas_porcentagem <= 40) {
				outras_coisas = getMagicoMenor();
			} else if (outras_coisas_porcentagem >= 41 && outras_coisas_porcentagem <= 80) {
				outras_coisas = getMagicoMedio();
			} else if (outras_coisas_porcentagem >= 81 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMagicoMaior();
			}
		}
	} else if (ndKey === 18) {
		var random = Math.random();
		if (random <= 0.05) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 6 && dinheiro_porcentagem <= 40) {
				dinheiro = (Math.floor(Math.random() * 4) + 1) * 1000 + " T$";
			} else if (dinheiro_porcentagem >= 41 && dinheiro_porcentagem <= 75) {
				dinheiro = getRiquezaMaior();
			} else if (dinheiro_porcentagem >= 76 && dinheiro_porcentagem <= 100) {
				var quantidadeRiquezasMaior = Math.floor(Math.random() * 3) + 2;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMaior; i++) {
					dinheiro += getRiquezaMaior() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 15) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 16 && outras_coisas_porcentagem <= 40) {
				outras_coisas = doisDados(getMagicoMenor);
			} else if (outras_coisas_porcentagem >= 41 && outras_coisas_porcentagem <= 70) {
				outras_coisas = getMagicoMedio();
			} else if (outras_coisas_porcentagem >= 71 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMagicoMaior();
			}
		}
	} else if (ndKey === 19) {
		var random = Math.random();
		if (random <= 0.05) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 6 && dinheiro_porcentagem <= 40) {
				dinheiro = (Math.floor(Math.random() * 4) + 1) * 1000 + " T$";
			} else if (dinheiro_porcentagem >= 41 && dinheiro_porcentagem <= 75) {
				dinheiro = adicionar20Porcento(getRiquezaMaior)();
			} else if (dinheiro_porcentagem >= 76 && dinheiro_porcentagem <= 100) {
				dinheiro = (Math.floor(Math.random() * 1) + 1) * 1000 + " TO";
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 10) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 11 && outras_coisas_porcentagem <= 40) {
				outras_coisas = doisDados(getMagicoMenor);
			} else if (outras_coisas_porcentagem >= 41 && outras_coisas_porcentagem <= 60) {
				outras_coisas = doisDados(getMagicoMedio);
			} else if (outras_coisas_porcentagem >= 61 && outras_coisas_porcentagem <= 100) {
				outras_coisas = getMagicoMaior();
			}
		}
	} else if (ndKey === 20) {
		var random = Math.random();
		if (random <= 0.05) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 1 && dinheiro_porcentagem <= 5) {
				dinheiro = "";
			} else if (dinheiro_porcentagem >= 6 && dinheiro_porcentagem <= 40) {
				dinheiro = (Math.floor(Math.random() * 2) + 1) * 1000 + " TO";
			} else if (dinheiro_porcentagem >= 41 && dinheiro_porcentagem <= 50) {
				var quantidadeRiquezasMaior = Math.floor(Math.random() * 3) + 1;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMaior; i++) {
					dinheiro += getRiquezaMaior() + "<br>";
				}
			} else if (dinheiro_porcentagem >= 51 && dinheiro_porcentagem <= 100) {
				var quantidadeRiquezasMaior = Math.floor(Math.random() * 3) + 2;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMaior; i++) {
					dinheiro += getRiquezaMaior() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 5) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 6 && outras_coisas_porcentagem <= 40) {
				outras_coisas = doisDados(getMagicoMenor);
			} else if (outras_coisas_porcentagem >= 41 && outras_coisas_porcentagem <= 50) {
				outras_coisas = doisDados(getMagicoMedio);
			} else if (outras_coisas_porcentagem >= 51 && outras_coisas_porcentagem <= 100) {
				outras_coisas = doisDados(getMagicoMaior);
			}
		}
	} else if (ndKey === 21) {
		var random = Math.random();
		if (random <= 0.02) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 1 && dinheiro_porcentagem <= 3) {
				dinheiro = "";
			} else if (dinheiro_porcentagem >= 4 && dinheiro_porcentagem <= 30) {
				dinheiro = (Math.floor(Math.random() * 3) + 2) * 1000 + " TO";
			} else {
				var quantidadeRiquezasMaior = Math.floor(Math.random() * 4) + 2;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMaior; i++) {
					dinheiro += getRiquezaMaior() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 3) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 4 && outras_coisas_porcentagem <= 35) {
				outras_coisas = doisDados(getMagicoMedio);
			} else {
				outras_coisas = doisDados(getMagicoMaior);
			}
		}
	} else if (ndKey === 22) {
		var random = Math.random();
		if (random <= 0.01) {
			tesouro = "Nenhum tesouro";
		} else {
			var dinheiro_porcentagem = Math.floor(Math.random() * 100) + 1;
			var outras_coisas_porcentagem = Math.floor(Math.random() * 100) + 1;

			if (dinheiro_porcentagem >= 1 && dinheiro_porcentagem <= 2) {
				dinheiro = "";
			} else if (dinheiro_porcentagem >= 3 && dinheiro_porcentagem <= 20) {
				dinheiro = (Math.floor(Math.random() * 4) + 3) * 1000 + " TO";
			} else {
				var quantidadeRiquezasMaior = Math.floor(Math.random() * 5) + 3;
				dinheiro = "";
				for (var i = 0; i < quantidadeRiquezasMaior; i++) {
					dinheiro += getRiquezaMaior() + "<br>";
				}
			}

			if (outras_coisas_porcentagem >= 1 && outras_coisas_porcentagem <= 2) {
				outras_coisas = "";
			} else if (outras_coisas_porcentagem >= 3 && outras_coisas_porcentagem <= 20) {
				outras_coisas = doisDados(getMagicoMedio) + " e " + getMagicoMaior();
			} else {
				outras_coisas = doisDados(getMagicoMaior) + " e " + getMagicoMaior();
			}
		}
	}

	if (dinheiro === "") dinheiro = "Nenhum dinheiro";
	if (outras_coisas === "") outras_coisas = "Nenhum item especial";

	return {
		tesouro: tesouro,
		dinheiro: dinheiro,
		outrasCoisas: outras_coisas,
		mensagem: mensagem
	};
}

function calcTesouro() {
	var totalND = parseFloat(document.getElementById("totalND").innerHTML);

	if (totalND <= 0 || isNaN(totalND)) {
		alert("O valor de totalND não é válido para calcular o tesouro.");
		return;
	}

	var tesouroElement = document.getElementById("tesouro");
	var mensagem1Element = document.getElementById("mensagem1Tesouro");
	
	tesouroElement.innerHTML = "";
	mensagem1Element.innerHTML = "";

	var rolled = rollTreasureForND(totalND);
	var tesouroTexto = "<big><strong>Dinheiro:</big></strong> " + rolled.dinheiro + "<br><br><strong><big>Outras coisas:</big></strong> " + rolled.outrasCoisas;

	if (rolled.tesouro === "Nenhum tesouro") {
		tesouroTexto = "<b><big><i><span style='color: var(--rubi-primary);'>" + rolled.tesouro + "</span></i></big></b>";
	}

	tesouroElement.innerHTML = tesouroTexto;
	mensagem1Element.innerHTML = rolled.mensagem ? "<b><i>" + rolled.mensagem + "</b></i>" : "";
}

function rollCreatureTreasure(name, nd) {
	var tesouroElement = document.getElementById("resultadoTesouro");
	if (!tesouroElement) return;
	
	var rolled = rollTreasureForND(nd);
	var container = document.createElement("div");
	container.className = "treasure-item-box";
	container.style.border = "1px solid var(--border-color)";
	container.style.borderRadius = "var(--radius-md)";
	container.style.padding = "16px";
	container.style.marginBottom = "16px";
	container.style.background = "var(--bg-dark-panel)";
	container.style.position = "relative";
	
	var nameText = name ? " para <strong>" + name + "</strong>" : "";
	var content = "<p style='margin-bottom: 8px;'><b style='color: var(--gold-primary);'>Tesouro" + nameText + " (ND " + formatND(nd) + "):</b></p>";
	
	if (rolled.tesouro === "Nenhum tesouro") {
		content += "<p><b><big><i><span style='color: var(--rubi-primary);'>Nenhum tesouro</span></i></big></b></p>";
	} else {
		content += "<p style='margin-bottom: 8px;'><strong>Dinheiro:</strong> " + rolled.dinheiro + "</p>" +
		           "<p style='margin-bottom: 8px;'><strong>Outras coisas:</strong> " + rolled.outrasCoisas + "</p>";
		if (rolled.mensagem) {
			content += "<p style='color: var(--text-secondary); font-style: italic; margin-bottom: 8px;'>" + rolled.mensagem + "</p>";
		}
	}
	
	content += "<button class='btn btn-outline btn-sm' style='height: 32px; padding: 0 12px; font-size: 0.85rem;' onclick='this.parentElement.remove()'><i class='fa-solid fa-trash-can' style='margin-right: 4px;'></i>Apagar</button>";
	
	container.innerHTML = content;
	
	// Remove the initial span helper if it exists
	var testeSpan = document.getElementById("teste");
	if (testeSpan) {
		testeSpan.style.display = "none";
	}
	
	tesouroElement.appendChild(container);
}

function calcTesouroInd() {
	var creatureList = document.getElementById("creatureList");
	var rows = creatureList.getElementsByTagName("tr");
	for (var i = 1; i < rows.length; i++) {
		var name = rows[i].cells[0].innerHTML;
		var nd = parseFloat(rows[i].cells[1].dataset.value || rows[i].cells[1].innerHTML);
		rollCreatureTreasure(name, nd);
	}
}

function apagarTesouro(criatura) {
	// Mantido para compatibilidade retrospectiva, mas agora a deleção é direta via DOM
	var tesouroElement = document.getElementById("resultadoTesouro");
	if (tesouroElement && tesouroElement.childNodes[criatura - 1]) {
		tesouroElement.removeChild(tesouroElement.childNodes[criatura - 1]);
	}
}

function sortTableByND() {
	var creatureList = document.getElementById("creatureList");
	var rows = creatureList.getElementsByTagName("tr");
	if (rows.length <= 1) return;
	
	var headerRow = rows[0];
	var sortedRows = Array.from(rows).slice(1);

	sortedRows.sort(function (a, b) {
		var valA = parseFloat(a.getElementsByTagName("td")[1].dataset.value || a.getElementsByTagName("td")[1].innerText);
		var valB = parseFloat(b.getElementsByTagName("td")[1].dataset.value || b.getElementsByTagName("td")[1].innerText);
		if (isNaN(valA)) valA = 0;
		if (isNaN(valB)) valB = 0;

		return valA - valB;
	});

	while (creatureList.firstChild) {
		creatureList.removeChild(creatureList.firstChild);
	}

	creatureList.appendChild(headerRow);
	for (var i = 0; i < sortedRows.length; i++) {
		creatureList.appendChild(sortedRows[i]);
	}
}
