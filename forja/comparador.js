// ─── COMPARADOR DE FICHAS — Forja de Heróis (Tormenta20) ──────────────────
// Permite abrir várias fichas (resumo somente leitura) em abas e comparar
// duas delas lado a lado, destacando as diferenças.

const CHAVE_ABAS = "forja_comparador_abas";
const CHAVE_PERSONAGENS_SALVOS = "forja_personagens_salvos";

const NOMES_ATR = { FOR: "Força", DES: "Destreza", CON: "Constituição", INT: "Inteligência", SAB: "Sabedoria", CAR: "Carisma" };

let abas = [];
let abaAtivaId = null;
let selecionadas = new Set();
let dropdownWrapperEl = null; // referência ao <div class="dropdown"> fixo na barra de abas

document.addEventListener("DOMContentLoaded", () => {
    inicializarTema();
    dropdownWrapperEl = document.getElementById("btnAddAbaDropdown").closest(".dropdown");

    carregarAbasPersistidas();
    renderizarTudo();
    montarListaSlots();

    document.querySelectorAll(".theme-btn").forEach(btn => {
        btn.addEventListener("click", () => aplicarTema(btn.dataset.theme));
    });

    document.getElementById("itemFichaAtual").addEventListener("click", (e) => {
        e.preventDefault();
        adicionarFichaAtualDaForja();
    });

    document.getElementById("itemImportarJson").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("inputImportarJson").click();
    });

    document.getElementById("inputImportarJson").addEventListener("change", importarArquivoJson);

    document.getElementById("btnCompararSelecionadas").addEventListener("click", compararSelecionadas);
});

// ─── TEMA (reaproveitado do padrão da Forja) ───────────────────────────────

function inicializarTema() {
    const salvo = localStorage.getItem("forja_theme") || "escuro";
    aplicarTema(salvo);
}

function aplicarTema(tema) {
    document.body.classList.remove("theme-escuro", "theme-padrao", "theme-vermelho");
    document.body.classList.add(`theme-${tema}`);
    document.querySelectorAll(".theme-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.theme === tema));
    localStorage.setItem("forja_theme", tema);
}

function mostrarToast(msg, tipo = "info") {
    const toastEl = document.getElementById("toastNotification");
    const msgEl = document.getElementById("toastMessage");
    msgEl.textContent = msg;
    toastEl.className = `toast align-items-center text-white bg-${tipo === "success" ? "success" : (tipo === "danger" ? "danger" : "dark")} border-0 shadow`;
    new bootstrap.Toast(toastEl).show();
}

// ─── PERSISTÊNCIA DAS ABAS ABERTAS ─────────────────────────────────────────

function carregarAbasPersistidas() {
    try {
        abas = JSON.parse(localStorage.getItem(CHAVE_ABAS) || "[]");
    } catch (e) {
        abas = [];
    }
    if (abas.length) abaAtivaId = abas[0].id;
}

function persistirAbas() {
    localStorage.setItem(CHAVE_ABAS, JSON.stringify(abas));
}

function obterPersonagensSalvos() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE_PERSONAGENS_SALVOS) || "[]");
    } catch (e) {
        return [];
    }
}

// ─── ADICIONAR FICHAS ───────────────────────────────────────────────────────

function gerarIdAba() {
    return `aba_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function adicionarAba(nome, data, origem) {
    const id = gerarIdAba();
    abas.push({ id, nome: nome || "Sem nome", origem: origem || "manual", data });
    abaAtivaId = id;
    persistirAbas();
    renderizarTudo();
    mostrarToast(`"${nome}" adicionado(a) ao Comparador.`, "success");
}

function adicionarFichaAtualDaForja() {
    const raw = localStorage.getItem("t20SheetData");
    if (!raw) {
        mostrarToast("Não há dados salvos na Forja/Ficha ainda.", "danger");
        return;
    }
    let data;
    try {
        data = JSON.parse(raw);
    } catch (e) {
        mostrarToast("Não foi possível ler os dados atuais da Forja.", "danger");
        return;
    }
    adicionarAba(data.charName || "Ficha Atual", data, "Ficha Atual");
}

function importarArquivoJson(evento) {
    const arquivo = evento.target.files[0];
    if (!arquivo) return;
    const leitor = new FileReader();
    leitor.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            adicionarAba(data.charName || arquivo.name.replace(/\.json$/i, ""), data, "Arquivo JSON");
        } catch (err) {
            mostrarToast("Arquivo JSON inválido.", "danger");
        }
    };
    leitor.readAsText(arquivo);
    evento.target.value = "";
}

function adicionarPersonagemSalvo(idSlot) {
    const lista = obterPersonagensSalvos();
    const slot = lista.find(s => s.id === idSlot);
    if (!slot) return;
    adicionarAba(slot.nome, slot.data, "Personagem Salvo");
}

function excluirSlot(idSlot, evento) {
    evento.stopPropagation();
    evento.preventDefault();
    if (!confirm("Excluir este personagem salvo? Isso não afeta fichas já abertas em abas.")) return;
    const lista = obterPersonagensSalvos().filter(s => s.id !== idSlot);
    localStorage.setItem(CHAVE_PERSONAGENS_SALVOS, JSON.stringify(lista));
    montarListaSlots();
    mostrarToast("Personagem salvo removido.");
}

function montarListaSlots() {
    const menu = document.getElementById("menuAdicionarFicha");
    menu.querySelectorAll(".slot-salvo-item").forEach(el => el.remove());
    const vazio = document.getElementById("listaSlotsVazia");
    const lista = obterPersonagensSalvos();
    vazio.style.display = lista.length ? "none" : "block";

    lista.slice().reverse().forEach(slot => {
        const li = document.createElement("li");
        li.className = "slot-salvo-item";
        li.innerHTML = `
            <a class="dropdown-item d-flex justify-content-between align-items-center" href="#">
                <span><i class="bi bi-bookmark-star me-2"></i>${escapeHtml(slot.nome)}</span>
                <button type="button" class="btn btn-sm btn-link text-danger p-0 ms-2" title="Excluir personagem salvo"><i class="bi bi-trash"></i></button>
            </a>`;
        li.querySelector("a").addEventListener("click", (e) => {
            e.preventDefault();
            adicionarPersonagemSalvo(slot.id);
        });
        li.querySelector("button").addEventListener("click", (e) => excluirSlot(slot.id, e));
        menu.appendChild(li);
    });
}

// ─── REMOÇÃO / SELEÇÃO DE ABAS ──────────────────────────────────────────────

function removerAba(id, evento) {
    if (evento) evento.stopPropagation();
    abas = abas.filter(a => a.id !== id);
    selecionadas.delete(id);
    if (abaAtivaId === id) abaAtivaId = abas.length ? abas[0].id : null;
    persistirAbas();
    renderizarTudo();
}

function ativarAba(id) {
    abaAtivaId = id;
    renderizarTudo();
}

function alternarSelecao(id, evento) {
    if (evento) evento.stopPropagation();
    if (selecionadas.has(id)) {
        selecionadas.delete(id);
    } else {
        selecionadas.add(id);
    }
    renderizarBarraAbas();
    atualizarBotaoComparar();
}

function atualizarBotaoComparar() {
    const btn = document.getElementById("btnCompararSelecionadas");
    document.getElementById("countSelecionadas").textContent = selecionadas.size;
    btn.disabled = selecionadas.size < 2;
}

// ─── RENDERIZAÇÃO ───────────────────────────────────────────────────────────

function renderizarTudo() {
    renderizarBarraAbas();
    renderizarConteudoAtivo();
    atualizarBotaoComparar();
    document.getElementById("estadoVazio").style.display = abas.length ? "none" : "block";
    document.getElementById("conteudoAbaAtiva").style.display = abas.length ? "block" : "none";
}

function renderizarBarraAbas() {
    const container = document.getElementById("barraAbas");
    container.querySelectorAll(".aba-personagem").forEach(el => el.remove());

    abas.forEach(aba => {
        const el = document.createElement("div");
        el.className = `aba-personagem ${aba.id === abaAtivaId ? "ativa" : ""}`;
        el.innerHTML = `
            <input type="checkbox" class="form-check-input mt-0" ${selecionadas.has(aba.id) ? "checked" : ""} title="Selecionar para comparar">
            <div class="flex-grow-1 overflow-hidden">
                <div class="aba-nome">${escapeHtml(aba.nome)}</div>
                <div class="aba-origem">${escapeHtml(aba.origem || "")}</div>
            </div>
            <button type="button" class="aba-fechar" title="Fechar aba"><i class="bi bi-x-lg"></i></button>
        `;
        el.addEventListener("click", () => ativarAba(aba.id));
        el.querySelector("input").addEventListener("click", (e) => alternarSelecao(aba.id, e));
        el.querySelector(".aba-fechar").addEventListener("click", (e) => removerAba(aba.id, e));
        container.insertBefore(el, dropdownWrapperEl);
    });
}

function renderizarConteudoAtivo() {
    const el = document.getElementById("conteudoAbaAtiva");
    const aba = abas.find(a => a.id === abaAtivaId);
    if (!aba) {
        el.innerHTML = "";
        return;
    }
    el.innerHTML = renderResumoHTML(aba.data);
}

// ─── CÁLCULOS AUXILIARES ────────────────────────────────────────────────────

function calcDefesaTotal(data) {
    if (typeof data.defTotal === "number") return data.defTotal;
    const def = data.defense || {};
    let total = 10;
    if (def.config && def.config.apply) {
        const attrRef = def.config.attr || "DES";
        total += (data.attrs && data.attrs[attrRef]) || 0;
    }
    total += (def.armor && def.armor.bonus) || 0;
    total += (def.shield && def.shield.bonus) || 0;
    total += def.outros || 0;
    return total;
}

function periciasTreinadas(data) {
    return (data.skills || []).filter(s => s.trained).map(s => s.n);
}

function nivelTotalDe(data) {
    if (typeof data.charLevel === "number") return data.charLevel;
    if (data.classes && data.classes.length) return data.classes.reduce((soma, c) => soma + (c.nivel || 0), 0);
    return 0;
}

function bonusTreinoPara(nivelTotal) {
    if (nivelTotal >= 15) return 6;
    if (nivelTotal >= 7) return 4;
    return 2;
}

// Recalcula o valor total de uma perícia (½ Nível + Atributo + Treino + Outros),
// igual à fórmula usada na Forja — necessário pois o snapshot só guarda os
// componentes (treinada?, outros, atributo), não o total já pronto.
function valorPericia(data, skillEntry) {
    if (!skillEntry) return null;
    const meioNivel = Math.floor(nivelTotalDe(data) / 2);
    const bonusTreino = skillEntry.trained ? bonusTreinoPara(nivelTotalDe(data)) : 0;
    const attrMod = (data.attrs && data.attrs[skillEntry.a]) || 0;
    const outros = skillEntry.other || 0;
    return meioNivel + attrMod + bonusTreino + outros;
}

function mapaPericiasPorNome(data) {
    const mapa = new Map();
    (data.skills || []).forEach(s => mapa.set(s.n, s));
    return mapa;
}

function nomesPoderes(data) {
    return (data.powers || []).map(p => p.name);
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str ?? "";
    return div.innerHTML;
}

// ─── RESUMO SOMENTE LEITURA (CONTEÚDO DE UMA ABA) ──────────────────────────

function renderResumoHTML(data) {
    const attrs = data.attrs || {};
    const status = data.status || {};
    const extras = data.extras || {};
    const classes = (data.classes && data.classes.length) ? data.classes.map(c => `${c.nome} ${c.nivel}`).join(" / ") : (data.charClass || "—");
    const skillsTreinadas = (data.skills || []).filter(s => s.trained);
    const poderes = nomesPoderes(data);

    return `
    <div class="card-secao mb-4">
        <div class="card-header-t20"><span><i class="bi bi-person-badge me-1"></i> ${escapeHtml(data.charName || "Sem nome")}</span>
            <span class="fw-normal">${escapeHtml(data.playerName || "")}</span>
        </div>
        <div class="p-3">
            <div class="row g-2 mb-3">
                <div class="col-6 col-md-3"><span class="t20-label d-block">Raça</span>${escapeHtml(data.charRace || "—")}</div>
                <div class="col-6 col-md-3"><span class="t20-label d-block">Origem</span>${escapeHtml(data.charOrigin || "—")}</div>
                <div class="col-6 col-md-3"><span class="t20-label d-block">Divindade</span>${escapeHtml(data.charDeity || "—")}</div>
                <div class="col-6 col-md-3"><span class="t20-label d-block">Classe(s) / Nível</span>${escapeHtml(classes)} <span class="text-muted">(Nv. ${data.charLevel ?? "—"})</span></div>
            </div>

            <div class="attr-grid mb-3">
                ${["FOR", "DES", "CON", "INT", "SAB", "CAR"].map(a => `
                    <div class="resumo-attr-box">
                        <span class="resumo-attr-label">${a}</span>
                        <span class="resumo-attr-val">${attrs[a] >= 0 ? "+" : ""}${attrs[a] ?? 0}</span>
                    </div>`).join("")}
            </div>

            <div class="row g-2 mb-3">
                <div class="col-6 col-md-3">
                    <div class="stat-card"><span class="t20-label d-block">PV</span><span class="stat-val-calc">${status.pvC ?? "—"} / ${status.pvM ?? "—"}</span></div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="stat-card"><span class="t20-label d-block">PM</span><span class="stat-val-calc">${status.pmC ?? "—"} / ${status.pmM ?? "—"}</span></div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="stat-card"><span class="t20-label d-block">Defesa</span><span class="stat-val-calc">${calcDefesaTotal(data)}</span></div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="stat-card"><span class="t20-label d-block">Desloc. / Tam.</span><span class="stat-val-calc" style="font-size:1rem">${escapeHtml(extras.speed || "—")} / ${escapeHtml(extras.size || "—")}</span></div>
                </div>
            </div>

            <div class="mb-3">
                <span class="t20-label d-block mb-1">Perícias Treinadas (${skillsTreinadas.length})</span>
                ${skillsTreinadas.length ? skillsTreinadas.map(s => `<span class="badge-pericia">${escapeHtml(s.n)} <strong>${valorPericia(data, s) >= 0 ? "+" : ""}${valorPericia(data, s)}</strong></span>`).join("") : '<span class="text-muted small">Nenhuma perícia treinada registrada.</span>'}
            </div>

            <div>
                <span class="t20-label d-block mb-1">Poderes (${poderes.length})</span>
                ${poderes.length ? poderes.map(n => `<span class="badge-poder">${escapeHtml(n)}</span>`).join("") : '<span class="text-muted small">Nenhum poder registrado nesta ficha.</span>'}
            </div>
        </div>
    </div>`;
}

// ─── MODAL DE COMPARAÇÃO ────────────────────────────────────────────────────

function compararSelecionadas() {
    if (selecionadas.size < 2) return;
    const abasSelecionadas = Array.from(selecionadas).map(id => abas.find(a => a.id === id)).filter(Boolean);
    if (abasSelecionadas.length < 2) return;

    document.getElementById("modalCompararTitulo").innerHTML =
        `<i class="bi bi-arrow-left-right me-2"></i>${abasSelecionadas.map(a => escapeHtml(a.nome)).join(" <span class='text-muted'>vs</span> ")}`;
    document.getElementById("modalCompararBody").innerHTML = renderModalDiffHTML(abasSelecionadas);

    new bootstrap.Modal(document.getElementById("modalComparar")).show();
}

// Uma linha de tabela com N colunas (uma por ficha selecionada). Marca a
// linha como "diferente" quando nem todos os valores são iguais entre si.
function linhaDiffMulti(label, valores) {
    const normalizados = valores.map(v => (v === undefined || v === null || v === "") ? "—" : String(v));
    const diff = new Set(normalizados).size > 1;
    return `<tr class="${diff ? "linha-diff" : "linha-igual"}">
        <td>${label}</td>${normalizados.map(v => `<td class="text-center">${v}</td>`).join("")}
    </tr>`;
}

function renderModalDiffHTML(abasSelecionadas) {
    const nomes = abasSelecionadas.map(a => escapeHtml(a.nome));
    const dados = abasSelecionadas.map(a => a.data);

    let tabelaGeral = `
    <div class="table-responsive">
    <table class="table table-sm tabela-diff">
        <thead><tr><th style="width:20%">Campo</th>${nomes.map(n => `<th class="text-center">${n}</th>`).join("")}</tr></thead>
        <tbody>
            ${linhaDiffMulti("Raça", dados.map(d => d.charRace))}
            ${linhaDiffMulti("Origem", dados.map(d => d.charOrigin))}
            ${linhaDiffMulti("Divindade", dados.map(d => d.charDeity))}
            ${linhaDiffMulti("Classe(s)", dados.map(d => (d.classes && d.classes.length) ? d.classes.map(c => `${c.nome} ${c.nivel}`).join(" / ") : (d.charClass || "—")))}
            ${linhaDiffMulti("Nível Total", dados.map(d => d.charLevel))}
            ${["FOR", "DES", "CON", "INT", "SAB", "CAR"].map(a => linhaDiffMulti(NOMES_ATR[a], dados.map(d => (d.attrs && d.attrs[a]) ?? 0))).join("")}
            ${linhaDiffMulti("PV Máximo", dados.map(d => d.status && d.status.pvM))}
            ${linhaDiffMulti("PV Atual", dados.map(d => d.status && d.status.pvC))}
            ${linhaDiffMulti("PM Máximo", dados.map(d => d.status && d.status.pmM))}
            ${linhaDiffMulti("PM Atual", dados.map(d => d.status && d.status.pmC))}
            ${linhaDiffMulti("Defesa Total", dados.map(d => calcDefesaTotal(d)))}
            ${linhaDiffMulti("Deslocamento", dados.map(d => d.extras && d.extras.speed))}
            ${linhaDiffMulti("Tamanho", dados.map(d => d.extras && d.extras.size))}
        </tbody>
    </table>
    </div>`;

    // Perícias: mostra o valor calculado (½ Nível + Atr + Treino + Outros) de cada ficha,
    // não apenas se é treinada ou não.
    const mapasPericias = dados.map(d => mapaPericiasPorNome(d));
    const todasPericias = Array.from(new Set(dados.flatMap(d => (d.skills || []).map(s => s.n)))).sort();

    let tabelaPericias = `
    <div class="table-responsive">
    <table class="table table-sm tabela-diff">
        <thead><tr><th style="width:30%">Perícia</th>${nomes.map(n => `<th class="text-center">${n}</th>`).join("")}</tr></thead>
        <tbody>
            ${todasPericias.length ? todasPericias.map(nomePericia => {
                const valores = mapasPericias.map((mapa, i) => {
                    const entry = mapa.get(nomePericia);
                    if (!entry) return null;
                    const total = valorPericia(dados[i], entry);
                    return entry.trained ? `<strong class="text-warning">${total >= 0 ? "+" : ""}${total}</strong>` : `<span class="text-muted">${total >= 0 ? "+" : ""}${total}</span>`;
                });
                const brutos = mapasPericias.map((mapa, i) => {
                    const entry = mapa.get(nomePericia);
                    return entry ? valorPericia(dados[i], entry) : null;
                });
                const diff = new Set(brutos.map(v => v === null ? "—" : String(v))).size > 1;
                return `<tr class="${diff ? "linha-diff" : "linha-igual"}">
                    <td>${escapeHtml(nomePericia)}</td>
                    ${valores.map(v => `<td class="text-center">${v ?? '<span class="icone-nao-tem">—</span>'}</td>`).join("")}
                </tr>`;
            }).join("") : `<tr><td colspan="${nomes.length + 1}" class="text-muted small">Nenhuma perícia registrada nas fichas selecionadas.</td></tr>`}
        </tbody>
    </table>
    </div>`;

    const poderesPorFicha = dados.map(d => new Set(nomesPoderes(d)));

    let tabelaPoderes = `
    <div class="row g-3">
        ${dados.map((d, i) => {
            const poderesDaFicha = nomesPoderes(d).sort();
            return `
            <div class="col-12 col-md-${Math.max(3, Math.floor(12 / dados.length))}">
                <div class="poderes-coluna">
                    <h6>${nomes[i]}</h6>
                    ${poderesDaFicha.length ? poderesDaFicha.map(p => {
                        const comumATodas = poderesPorFicha.every(set => set.has(p));
                        return `<span class="${comumATodas ? "badge-poder-comum" : "badge-poder-exclusivo"}" title="${comumATodas ? "Presente em todas as fichas comparadas" : "Não está em todas as fichas comparadas"}">${escapeHtml(p)}</span>`;
                    }).join("") : '<span class="text-muted small">Nenhum poder registrado.</span>'}
                </div>
            </div>`;
        }).join("")}
    </div>
    <p class="small text-muted mt-3 mb-0"><span class="badge-poder-exclusivo" style="padding:2px 8px;">exemplo</span> = poder que não está em todas as fichas comparadas.</p>`;

    return `
    <ul class="nav nav-tabs mb-3" role="tablist">
        <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#diffGeral">Geral</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#diffPericias">Perícias</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#diffPoderes">Poderes</button></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="diffGeral">${tabelaGeral}</div>
        <div class="tab-pane fade" id="diffPericias">${tabelaPericias}</div>
        <div class="tab-pane fade" id="diffPoderes">${tabelaPoderes}</div>
    </div>
    <p class="small text-muted mt-2 mb-0"><span class="badge-status" style="background:var(--t20-red-glow)">■</span> linhas destacadas indicam diferença entre as fichas. Perícias treinadas aparecem em destaque (dourado).</p>
    `;
}
