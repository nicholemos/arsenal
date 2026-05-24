/* Ameaças de Arton - Application Logic */

// Global State
let allThreats = [];
let filteredThreats = [];
let encounterList = [];
let activeFilters = {
    search: '',
    nd: '',
    types: []
};

// XP Values per ND in Tormenta 20
const ND_XP = {
    "1/4": 100,
    "1/2": 150,
    "1": 300,
    "2": 450,
    "3": 600,
    "4": 900,
    "5": 1200,
    "6": 1800,
    "7": 2400,
    "8": 3600,
    "9": 4800,
    "10": 7200,
    "11": 9600,
    "12": 14400,
    "13": 19200,
    "14": 28800,
    "15": 38400,
    "16": 57600,
    "17": 76800,
    "18": 115200,
    "19": 153600,
    "20": 230400,
    "S": 230400,
    "S+": 230400
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    initCanvas();
    loadThreats();
    setupEventListeners();
    updateThreatsGrid();
    checkEncounterLocalStorage();
});

// 1. Background Fire Embers Canvas Simulation
function initCanvas() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor() {
            this.reset();
            // Start at random heights initially
            this.y = Math.random() * canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 50;
            this.size = Math.random() * 2.5 + 1;
            this.speedY = Math.random() * 1.2 + 0.4;
            this.speedX = Math.random() * 0.8 - 0.4;
            // Orange/Red ember hues
            const r = 255;
            const g = Math.floor(Math.random() * 90) + 40;
            const b = 0;
            this.color = `rgba(${r}, ${g}, ${b}, ${Math.random() * 0.4 + 0.15})`;
            this.alpha = 1;
            this.fade = Math.random() * 0.004 + 0.001;
        }
        
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.alpha -= this.fade;
            if (this.alpha <= 0 || this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    const count = 70;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 2. Load and Prepare Threat Data
function loadThreats() {
    // AMEACAS_DB is loaded from global scope (loaded via script tag)
    const dbData = typeof AMEACAS_DB !== 'undefined' ? AMEACAS_DB : [];
    
    // Load homebrews
    const homebrews = JSON.parse(localStorage.getItem('t20_homebrew_threats')) || [];
    
    // Combine
    allThreats = [...homebrews, ...dbData];
    
    // Populate stats in header
    document.getElementById("stat-total-threats").textContent = allThreats.length;
    
    // Populate dynamic Type list
    populateTypeFilters();
}

function getBaseType(tipoStr) {
    if (!tipoStr) return "Monstro";
    const types = ["Animal", "Construto", "Humanoide", "Monstro", "Morto-vivo", "Espírito", "Elemental", "Limo", "Planta"];
    for (let t of types) {
        if (tipoStr.toLowerCase().includes(t.toLowerCase())) {
            return t;
        }
    }
    // Fallback: take the first word before parentheses/spaces
    const match = tipoStr.match(/^([^\s\(]+)/);
    return match ? match[1] : tipoStr;
}

function populateTypeFilters() {
    const typesSet = new Set();
    allThreats.forEach(t => {
        typesSet.add(getBaseType(t.tipo));
    });
    
    const sortedTypes = Array.from(typesSet).sort();
    const container = document.getElementById("types-list-container");
    if (!container) return;
    
    container.innerHTML = "";
    sortedTypes.forEach(type => {
        const label = document.createElement("label");
        label.className = "checkbox-container";
        label.innerHTML = `
            ${type}
            <input type="checkbox" value="${type}" class="type-filter-checkbox">
            <span class="checkmark"></span>
        `;
        
        // Listen to checkbox changes
        const checkbox = label.querySelector("input");
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                activeFilters.types.push(type);
            } else {
                activeFilters.types = activeFilters.types.filter(t => t !== type);
            }
            updateThreatsGrid();
            renderActiveFilterBadges();
        });
        
        container.appendChild(label);
    });
}

// 3. Filtering and Searching
function parseND(ndStr) {
    if (!ndStr) return 0;
    ndStr = ndStr.toString().trim().toUpperCase();
    if (ndStr === "1/4") return 0.25;
    if (ndStr === "1/2") return 0.5;
    if (ndStr === "S") return 21;
    if (ndStr === "S+") return 22;
    const clean = parseFloat(ndStr.replace("+", ""));
    return isNaN(clean) ? 0 : clean;
}

function filterAndSortThreats() {
    // 1. Filter
    filteredThreats = allThreats.filter(threat => {
        // Search filter
        if (activeFilters.search) {
            const q = activeFilters.search.toLowerCase();
            const nameMatch = threat.nome.toLowerCase().includes(q);
            const typeMatch = threat.tipo.toLowerCase().includes(q);
            const sourceMatch = (threat.fonte || "").toLowerCase().includes(q);
            
            const attackMatch = (threat.ataques || []).some(a => 
                a.nome.toLowerCase().includes(q) || 
                (a.desc || "").toLowerCase().includes(q) ||
                (a.dano || "").toLowerCase().includes(q)
            );
            
            const abilityMatch = (threat.habilidades || []).some(h => 
                h.nome.toLowerCase().includes(q) || 
                (h.desc || "").toLowerCase().includes(q)
            );
            
            if (!nameMatch && !typeMatch && !sourceMatch && !attackMatch && !abilityMatch) {
                return false;
            }
        }
        
        // ND filter
        if (activeFilters.nd) {
            if (activeFilters.nd === "Épico") {
                if (parseND(threat.nd) <= 20) return false;
            } else {
                if (threat.nd !== activeFilters.nd) return false;
            }
        }
        
        // Type filter
        if (activeFilters.types.length > 0) {
            const baseType = getBaseType(threat.tipo);
            if (!activeFilters.types.includes(baseType)) return false;
        }
        
        return true;
    });
    
    // 2. Sort
    const sortVal = document.getElementById("sort-select").value;
    filteredThreats.sort((a, b) => {
        if (sortVal === "name-asc") {
            return a.nome.localeCompare(b.nome, 'pt-BR');
        } else if (sortVal === "name-desc") {
            return b.nome.localeCompare(a.nome, 'pt-BR');
        } else if (sortVal === "nd-asc") {
            return parseND(a.nd) - parseND(b.nd) || a.nome.localeCompare(b.nome, 'pt-BR');
        } else if (sortVal === "nd-desc") {
            return parseND(b.nd) - parseND(a.nd) || a.nome.localeCompare(b.nome, 'pt-BR');
        } else if (sortVal === "pv-desc") {
            return (parseInt(b.pv) || 0) - (parseInt(a.pv) || 0) || a.nome.localeCompare(b.nome, 'pt-BR');
        }
        return 0;
    });
}

// 4. Rendering Grid & Badges
function updateThreatsGrid() {
    filterAndSortThreats();
    
    const grid = document.getElementById("threats-grid");
    const emptyState = document.getElementById("empty-state");
    
    grid.innerHTML = "";
    
    if (filteredThreats.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }
    
    emptyState.classList.add("hidden");
    
    filteredThreats.forEach(threat => {
        // Check if added to encounter (at least once)
        const inEncounterCount = encounterList.filter(item => item.nome === threat.nome).length;
        const isAdded = inEncounterCount > 0;
        
        const card = document.createElement("div");
        card.className = `threat-card ${threat.isHomebrew ? 'homebrew-card' : ''}`;
        
        card.innerHTML = `
            <div>
                <div class="card-header-row">
                    <span class="card-name">${threat.nome}</span>
                    <span class="nd-badge" title="Nível de Desafio">ND ${threat.nd}</span>
                </div>
                <div class="card-type-row">
                    <span>${threat.tipo}</span>
                    ${threat.isHomebrew ? '<span class="homebrew-tag">Homebrew</span>' : ''}
                </div>
                <div class="card-stats-grid">
                    <div class="card-stat-item">
                        <span class="label"><i class="fa-solid fa-shield"></i> Def:</span>
                        <span class="val">${threat.defesa}</span>
                    </div>
                    <div class="card-stat-item">
                        <span class="label"><i class="fa-solid fa-heart"></i> PV:</span>
                        <span class="val">${threat.pv}</span>
                    </div>
                    <div class="card-stat-item">
                        <span class="label"><i class="fa-solid fa-bolt"></i> Ini:</span>
                        <span class="val">${threat.iniciativa}</span>
                    </div>
                    <div class="card-stat-item">
                        <span class="label"><i class="fa-solid fa-eye"></i> Perc:</span>
                        <span class="val">${threat.percepcao}</span>
                    </div>
                </div>
            </div>
            <div class="card-actions">
                <button class="action-btn-blood" onclick="showDetail('${escapeStr(threat.nome)}')">
                    <i class="fa-solid fa-scroll"></i> Ficha
                </button>
                <button class="action-btn-secondary ${isAdded ? 'added' : ''}" onclick="addToEncounter('${escapeStr(threat.nome)}')">
                    <i class="fa-solid ${isAdded ? 'fa-check' : 'fa-plus'}"></i>
                    <span>${isAdded ? `Encontro (${inEncounterCount})` : 'Encontro'}</span>
                </button>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function renderActiveFilterBadges() {
    const container = document.getElementById("active-filters-badges");
    if (!container) return;
    container.innerHTML = "";
    
    // Search badge
    if (activeFilters.search) {
        createBadge(`Busca: "${activeFilters.search}"`, () => {
            activeFilters.search = '';
            document.getElementById("search-input").value = '';
            document.getElementById("clear-search").classList.add("hidden");
            updateThreatsGrid();
            renderActiveFilterBadges();
        });
    }
    
    // ND badge
    if (activeFilters.nd) {
        createBadge(`ND: ${activeFilters.nd}`, () => {
            activeFilters.nd = '';
            document.getElementById("filter-nd-select").value = '';
            updateThreatsGrid();
            renderActiveFilterBadges();
        });
    }
    
    // Types badges
    activeFilters.types.forEach(type => {
        createBadge(type, () => {
            activeFilters.types = activeFilters.types.filter(t => t !== type);
            // Uncheck in sidebar
            const checkboxes = document.querySelectorAll(".type-filter-checkbox");
            checkboxes.forEach(cb => {
                if (cb.value === type) cb.checked = false;
            });
            updateThreatsGrid();
            renderActiveFilterBadges();
        });
    });
    
    function createBadge(text, onRemove) {
        const badge = document.createElement("div");
        badge.className = "filter-badge";
        badge.innerHTML = `
            <span>${text}</span>
            <i class="fa-solid fa-xmark"></i>
        `;
        badge.querySelector("i").addEventListener("click", onRemove);
        container.appendChild(badge);
    }
}

function resetFilters() {
    activeFilters.search = '';
    activeFilters.nd = '';
    activeFilters.types = [];
    
    document.getElementById("search-input").value = '';
    document.getElementById("filter-nd-select").value = '';
    document.getElementById("clear-search").classList.add("hidden");
    
    const checkboxes = document.querySelectorAll(".type-filter-checkbox");
    checkboxes.forEach(cb => cb.checked = false);
    
    updateThreatsGrid();
    renderActiveFilterBadges();
}

// 5. Details Sidebar (Ficha do Monstro)
function showDetail(threatNome) {
    const threat = allThreats.find(t => t.nome === threatNome);
    if (!threat) return;
    
    const sidebar = document.getElementById("detail-sidebar");
    const content = document.getElementById("detail-content");
    
    // Build Attributes
    const attrs = threat.atributos || { for: "0", des: "0", con: "0", int: "0", sab: "0", car: "0" };
    
    // Rule highlighting for attacks and abilities
    function highlightRules(text) {
        if (!text) return "";
        const cdRegex = /\b(Fortitude|Reflexos|Vontade|Fort|Ref|Von)\s+CD\s+\d+\b/gi;
        const pmPvRegex = /\b\d+\s*(PM|PV)\b/g;
        const conditions = ["enredado", "enredada", "caído", "caída", "pasmo", "pasma", "atordoado", "atordoada", "debilitado", "debilitada", "fatigado", "fatigada", "fraco", "fraca", "apavorado", "apavorada", "abismado", "abismada", "sangrando", "cego", "cega", "surdo", "surda", "imobilizado", "imobilizada", "paralisado", "paralisada", "indefeso", "indefesa", "inconsciente"];
        
        let highlighted = text;
        highlighted = highlighted.replace(cdRegex, match => `<span class="rule-highlight">${match}</span>`);
        highlighted = highlighted.replace(pmPvRegex, match => `<span class="rule-highlight">${match}</span>`);
        
        conditions.forEach(cond => {
            const condRegex = new RegExp(`\\b(${cond})\\b`, 'gi');
            highlighted = highlighted.replace(condRegex, match => `<span class="rule-highlight">${match}</span>`);
        });
        
        return highlighted;
    }
    
    // Format attacks list
    let attacksHtml = "";
    if (threat.ataques && threat.ataques.length > 0) {
        threat.ataques.forEach(a => {
            attacksHtml += `
                <div class="attack-block">
                    <div class="attack-header">
                        <div class="attack-name-wrapper">
                            <span class="attack-name">${a.nome}</span>
                            <span class="attack-type">${a.tipo}</span>
                        </div>
                        ${(a.bonus || a.dano) ? `
                        <button class="roll-btn-small" onclick="rollAttack('${escapeStr(threat.nome)}', '${escapeStr(a.nome)}', '${escapeStr(a.bonus)}', '${escapeStr(a.dano)}')">
                            <i class="fa-solid fa-dice-d20"></i> Rolar
                        </button>
                        ` : ''}
                    </div>
                    ${a.bonus ? `<div class="attack-formula-row">Ataque: <strong>${a.bonus}</strong> ${a.dano ? `| Dano: <strong>${a.dano}</strong>` : ''}</div>` : (a.dano ? `<div class="attack-formula-row">Dano: <strong>${a.dano}</strong></div>` : '')}
                    ${a.desc ? `<div class="attack-desc">${highlightRules(a.desc)}</div>` : ''}
                </div>
            `;
        });
    } else {
        attacksHtml = "<p style='font-size: 0.85rem; color: var(--text-muted);'>Nenhum ataque cadastrado.</p>";
    }
    
    // Format abilities list
    let abilitiesHtml = "";
    if (threat.habilidades && threat.habilidades.length > 0) {
        threat.habilidades.forEach(h => {
            abilitiesHtml += `
                <div class="ability-block">
                    <div class="ability-name">${h.nome} ${h.tipo ? `<span style="font-size: 0.7rem; color: var(--gold-accent); text-transform: uppercase; font-family: var(--font-body); font-weight: normal; margin-left: 0.4rem;">(${h.tipo})</span>` : ''}</div>
                    <div class="ability-desc">${highlightRules(h.desc)}</div>
                </div>
            `;
        });
    } else {
        abilitiesHtml = "<p style='font-size: 0.85rem; color: var(--text-muted);'>Nenhuma habilidade especial.</p>";
    }
    
    // Format skills list
    let skillsHtml = "";
    if (threat.pericias && threat.pericias.length > 0) {
        skillsHtml = threat.pericias.map(p => `<strong>${p.nome}</strong> ${p.valor}`).join(", ");
    } else {
        skillsHtml = "Nenhuma";
    }
    
    content.innerHTML = `
        <div class="t20-stat-block">
            <div class="t20-header">
                <h2 class="t20-title">${threat.nome}</h2>
                <div class="t20-subtitle">ND ${threat.nd} &bull; ${threat.tipo}</div>
            </div>
            
            <div class="t20-vitals-row">
                <div class="vital-box pv-box">
                    <span class="label">Pontos de Vida</span>
                    <span class="val">${threat.pv} PV</span>
                </div>
                <div class="vital-box pm-box">
                    <span class="label">Pontos de Mana</span>
                    <span class="val">${threat.pm || 0} PM</span>
                </div>
            </div>
            
            <div class="t20-attributes-grid">
                <div class="t20-attribute-cell"><span class="abbr">FOR</span><span class="val">${formatAttr(attrs.for)}</span></div>
                <div class="t20-attribute-cell"><span class="abbr">DES</span><span class="val">${formatAttr(attrs.des)}</span></div>
                <div class="t20-attribute-cell"><span class="abbr">CON</span><span class="val">${formatAttr(attrs.con)}</span></div>
                <div class="t20-attribute-cell"><span class="abbr">INT</span><span class="val">${formatAttr(attrs.int)}</span></div>
                <div class="t20-attribute-cell"><span class="abbr">SAB</span><span class="val">${formatAttr(attrs.sab)}</span></div>
                <div class="t20-attribute-cell"><span class="abbr">CAR</span><span class="val">${formatAttr(attrs.car)}</span></div>
            </div>
            
            <div class="t20-basic-stats">
                <div class="basic-stat-line">
                    <span class="lbl"><i class="fa-solid fa-shield-halved"></i> Defesa:</span>
                    <span class="val">${threat.defesa} ${threat.defesaObs ? `(${threat.defesaObs})` : ''}</span>
                </div>
                <div class="basic-stat-line">
                    <span class="lbl"><i class="fa-solid fa-shoe-prints"></i> Deslocamento:</span>
                    <span class="val">${threat.desl}</span>
                </div>
                <div class="basic-stat-line">
                    <span class="lbl"><i class="fa-solid fa-bolt"></i> Iniciativa:</span>
                    <span class="val">${threat.iniciativa}</span>
                </div>
                <div class="basic-stat-line">
                    <span class="lbl"><i class="fa-solid fa-eye"></i> Percepção:</span>
                    <span class="val">${threat.percepcao} ${threat.percepcaoObs ? `(${threat.percepcaoObs})` : ''}</span>
                </div>
            </div>
            
            <div class="t20-saves-row">
                <div class="save-badge">
                    <span class="abbr">FOR</span>
                    <span class="val">${threat.fort}</span>
                </div>
                <div class="save-badge">
                    <span class="abbr">REF</span>
                    <span class="val">${threat.ref}</span>
                </div>
                <div class="save-badge">
                    <span class="abbr">VON</span>
                    <span class="val">${threat.von}</span>
                </div>
            </div>
            
            <h3 class="t20-section-title">Ataques</h3>
            <div class="t20-attacks-list">${attacksHtml}</div>
            
            <h3 class="t20-section-title">Habilidades</h3>
            <div class="t20-abilities-list">${abilitiesHtml}</div>
            
            <h3 class="t20-section-title">Outros</h3>
            <div class="t20-basic-stats" style="font-size: 0.85rem;">
                <div><strong>Perícias:</strong> ${skillsHtml}</div>
                <div style="margin-top: 0.4rem;"><strong>Tesouro:</strong> ${threat.tesouro || 'Nenhum'}</div>
            </div>
            
            <div class="t20-footer-meta">
                <div><span>Fonte:</span> <span>${threat.fonte || 'Desconhecida'}</span></div>
            </div>
        </div>
    `;
    
    // Add active class for mobile views
    sidebar.classList.add("active");
}

function formatAttr(val) {
    if (val === undefined || val === null || val === "—") return "—";
    const num = parseInt(val);
    if (isNaN(num)) return val;
    return num >= 0 ? `+${num}` : num.toString();
}

function closeDetail() {
    const sidebar = document.getElementById("detail-sidebar");
    sidebar.classList.remove("active");
    
    // Reset to placeholder
    document.getElementById("detail-content").innerHTML = `
        <div class="detail-placeholder">
            <i class="fa-solid fa-dragon"></i>
            <p>Selecione uma criatura no bestiário para abrir sua ficha de Tormenta 20 e simular rolagens de ataque.</p>
        </div>
    `;
}

// 6. Dice Roll Simulator
function rollAttack(threatName, attackName, bonusStr, damageStr) {
    const bonus = parseBonus(bonusStr);
    
    // Roll attack d20
    const d20Roll = Math.floor(Math.random() * 20) + 1;
    const attackTotal = d20Roll + bonus;
    
    // Crit check
    let critText = "ROLAGEM";
    let critClass = "";
    if (d20Roll === 20) {
        critText = "CRÍTICO NATURAL! ⚔️";
        critClass = "crit-success";
    } else if (d20Roll === 1) {
        critText = "FALHA CRÍTICA! ☠️";
        critClass = "crit-fail";
    } else {
        critText = "SUCESSO?";
    }
    
    // Update attack elements
    document.getElementById("roll-d20-number").textContent = d20Roll;
    const critStatusEl = document.getElementById("roll-crit-status");
    critStatusEl.textContent = critText;
    critStatusEl.className = critClass;
    
    document.getElementById("roll-attack-math").textContent = `${d20Roll} (d20) ${bonus >= 0 ? '+' : ''}${bonus} = ${attackTotal}`;
    
    // Handle damage roll
    const damageContainer = document.getElementById("roll-damage-container");
    
    if (damageStr && damageStr !== "—" && damageStr !== "") {
        damageContainer.classList.remove("hidden");
        
        // Parse dice formula
        const rollResult = rollDiceFormula(damageStr);
        if (rollResult) {
            document.getElementById("roll-damage-math").textContent = `${rollResult.formula} (${rollResult.damageType})`;
            // Show individual die rolls sum
            const diceDetails = rollResult.rolls.join(" + ");
            const modText = rollResult.modifier !== 0 ? ` ${rollResult.modifier >= 0 ? '+' : ''}${rollResult.modifier}` : "";
            
            document.getElementById("roll-damage-math").title = `Dados: (${diceDetails})${modText} = ${rollResult.total}`;
            
            document.getElementById("roll-total-damage").innerHTML = `
                ${rollResult.total} DANO <span style="font-size: 0.85rem; font-weight: normal; text-transform: uppercase;">(${rollResult.damageType})</span>
            `;
        } else {
            // Cannot parse, show original as-is
            document.getElementById("roll-damage-math").textContent = damageStr;
            document.getElementById("roll-damage-math").title = "";
            document.getElementById("roll-total-damage").textContent = damageStr;
        }
    } else {
        damageContainer.classList.add("hidden");
    }
    
    // Shake screen slightly on crit
    if (d20Roll === 20) {
        document.body.style.animation = "none";
        document.body.offsetHeight; // trigger reflow
        document.body.style.animation = "pulseGlow 0.3s 2 ease-in-out";
    }
    
    // Dice rotation animation reset
    const d20Vis = document.getElementById("d20-visualizer");
    d20Vis.style.animation = "none";
    d20Vis.offsetHeight; // trigger reflow
    d20Vis.style.animation = null;
    
    // Open roll modal
    document.getElementById("roll-modal").classList.remove("hidden");
}

function parseBonus(bonusStr) {
    if (!bonusStr) return 0;
    const num = parseInt(bonusStr.toString().replace("+", "").trim());
    return isNaN(num) ? 0 : num;
}

function rollDiceFormula(formulaStr) {
    // Regex for standard rolls: e.g. 2d6+8, 1d12-2, 3d8
    const diceRegex = /(\d+)d(\d+)([\+\-]\d+)?/i;
    const match = formulaStr.match(diceRegex);
    if (!match) {
        return null;
    }
    
    const numDice = parseInt(match[1]);
    const diceSides = parseInt(match[2]);
    const modifier = match[3] ? parseInt(match[3]) : 0;
    
    const rolls = [];
    let sum = 0;
    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * diceSides) + 1;
        rolls.push(roll);
        sum += roll;
    }
    const total = sum + modifier;
    
    // Extract everything else as damage type
    const formulaPart = match[0];
    let damageType = formulaStr.replace(formulaPart, "").trim();
    // Clean up connecting words
    damageType = damageType.replace(/^mais\s+/i, "");
    
    return {
        formula: formulaPart,
        numDice,
        diceSides,
        modifier,
        rolls,
        sum,
        total,
        damageType: damageType || "dano"
    };
}

// 7. Encounter Tracker (Encounter Builder)
function addToEncounter(threatNome) {
    const threat = allThreats.find(t => t.nome === threatNome);
    if (!threat) return;
    
    // Generate unique instance ID
    const instanceId = 'em-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    
    // Get initiative modifier
    const initBonus = parseBonus(threat.iniciativa);
    
    // Calculate XP
    const xpVal = ND_XP[threat.nd] || 0;
    
    // Push new creature instance
    encounterList.push({
        id: instanceId,
        nome: threat.nome,
        nd: threat.nd,
        pvMax: parseInt(threat.pv) || 10,
        pvCurrent: parseInt(threat.pv) || 10,
        iniciativaBonus: initBonus,
        iniciativaRoll: 0,
        xp: xpVal
    });
    
    saveEncounterLocalStorage();
    updateEncounterSidebar();
    updateThreatsGrid(); // Refresh cards to show counter badge
    
    // Flash header counter
    const countBox = document.getElementById("stat-box-encounter");
    countBox.style.transform = "scale(1.15)";
    setTimeout(() => countBox.style.transform = null, 200);
}

function removeFromEncounter(instanceId) {
    encounterList = encounterList.filter(item => item.id !== instanceId);
    saveEncounterLocalStorage();
    updateEncounterSidebar();
    updateThreatsGrid();
}

function adjustItemHP(instanceId, isDamage) {
    const item = encounterList.find(i => i.id === instanceId);
    if (!item) return;
    
    const input = document.getElementById(`emc-hp-val-${instanceId}`);
    const amount = Math.abs(parseInt(input.value)) || 0;
    
    if (amount <= 0) return;
    
    if (isDamage) {
        item.pvCurrent = Math.max(0, item.pvCurrent - amount);
    } else {
        item.pvCurrent = Math.min(item.pvMax, item.pvCurrent + amount);
    }
    
    input.value = ""; // Clear input
    saveEncounterLocalStorage();
    updateEncounterSidebar();
}

function rollItemInitiative(instanceId) {
    const item = encounterList.find(i => i.id === instanceId);
    if (!item) return;
    
    const roll = Math.floor(Math.random() * 20) + 1;
    item.iniciativaRoll = roll + item.iniciativaBonus;
    
    saveEncounterLocalStorage();
    updateEncounterSidebar();
}

function updateItemInitiative(instanceId, val) {
    const item = encounterList.find(i => i.id === instanceId);
    if (!item) return;
    
    item.iniciativaRoll = parseInt(val) || 0;
    saveEncounterLocalStorage();
}

function rollAllInitiatives() {
    encounterList.forEach(item => {
        const roll = Math.floor(Math.random() * 20) + 1;
        item.iniciativaRoll = roll + item.iniciativaBonus;
    });
    
    // Sort encounter list by initiative descending
    encounterList.sort((a, b) => b.iniciativaRoll - a.iniciativaRoll);
    
    saveEncounterLocalStorage();
    updateEncounterSidebar();
}

function updateEncounterSidebar() {
    const container = document.getElementById("encounter-list-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    // Set summary totals
    let totalXP = 0;
    encounterList.forEach(item => totalXP += item.xp);
    
    document.getElementById("encounter-xp-total").textContent = `${totalXP.toLocaleString('pt-BR')} XP`;
    document.getElementById("encounter-threats-total").textContent = encounterList.length;
    
    // Update Header indicators
    document.getElementById("stat-encounter-count").textContent = encounterList.length;
    const statBox = document.getElementById("stat-box-encounter");
    if (encounterList.length > 0) {
        statBox.classList.add("active");
    } else {
        statBox.classList.remove("active");
    }
    
    if (encounterList.length === 0) {
        container.innerHTML = `
            <div class="detail-placeholder" style="height: auto; padding: 3rem 1rem;">
                <i class="fa-solid fa-circle-info"></i>
                <p>Nenhuma criatura adicionada. Adicione monstros pelo bestiário para gerenciar combates e iniciativas.</p>
            </div>
        `;
        return;
    }
    
    // Render each item
    encounterList.forEach(item => {
        const hpPercent = Math.max(0, Math.min(100, (item.pvCurrent / item.pvMax) * 100));
        let hpColor = "linear-gradient(90deg, #7d0a0a 0%, #d41c1c 100%)"; // Red
        if (hpPercent >= 50) {
            hpColor = "linear-gradient(90deg, #1b7a19 0%, #39d41c 100%)"; // Green
        } else if (hpPercent >= 25) {
            hpColor = "linear-gradient(90deg, #bfa01d 0%, #d4bf1c 100%)"; // Yellow
        }
        
        const card = document.createElement("div");
        card.className = "encounter-monster-card";
        card.innerHTML = `
            <div class="emc-header">
                <div class="emc-name-nd">
                    <span class="emc-name">${item.nome}</span>
                    <span class="emc-nd">ND ${item.nd} (${item.xp} XP)</span>
                </div>
                <div class="emc-actions">
                    <div class="emc-init-wrapper">
                        <span class="label">Ini:</span>
                        <input type="number" class="emc-init-input" value="${item.iniciativaRoll || 0}" onchange="updateItemInitiative('${item.id}', this.value)">
                        <button class="emc-roll-init-btn" onclick="rollItemInitiative('${item.id}')" title="Rolar Iniciativa (d20${item.iniciativaBonus >= 0 ? '+' : ''}${item.iniciativaBonus})">
                            <i class="fa-solid fa-dice-d20"></i>
                        </button>
                    </div>
                    <button class="emc-remove-btn" onclick="removeFromEncounter('${item.id}')" title="Remover do Encontro">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="emc-hp-controls">
                <div class="emc-hp-status-row">
                    <span>PV:</span>
                    <span class="emc-hp-values">${item.pvCurrent}/${item.pvMax}</span>
                </div>
                <div class="emc-hp-bar-bg">
                    <div class="emc-hp-bar-fill" style="width: ${hpPercent}%; background: ${hpColor};"></div>
                </div>
                <div class="emc-hp-adjust-row">
                    <input type="number" class="emc-hp-input" id="emc-hp-val-${item.id}" placeholder="Valor" min="1">
                    <button class="emc-hp-btn" onclick="adjustItemHP('${item.id}', true)" title="Causar Dano">- Dano</button>
                    <button class="emc-hp-btn" style="background: #1b5e20; border-color: #2e7d32;" onclick="adjustItemHP('${item.id}', false)" title="Curar">+ Cura</button>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function saveEncounterLocalStorage() {
    localStorage.setItem('t20_encounter_list', JSON.stringify(encounterList));
}

function checkEncounterLocalStorage() {
    encounterList = JSON.parse(localStorage.getItem('t20_encounter_list')) || [];
    updateEncounterSidebar();
}

function toggleEncounterSidebar(show) {
    const sidebar = document.getElementById("encounter-sidebar");
    if (show === undefined) {
        sidebar.classList.toggle("hidden");
    } else if (show) {
        sidebar.classList.remove("hidden");
    } else {
        sidebar.classList.add("hidden");
    }
}

// 8. Homebrew Threat Creation Modal Form
let hbAttackCount = 0;
let hbAbilityCount = 0;

function openHomebrewModal() {
    // Reset forms & counters
    document.getElementById("homebrew-form").reset();
    document.getElementById("hb-attacks-container").innerHTML = "";
    document.getElementById("hb-abilities-container").innerHTML = "";
    hbAttackCount = 0;
    hbAbilityCount = 0;
    
    // Add 1 attack default
    addHomebrewAttackRow();
    
    document.getElementById("homebrew-modal").classList.remove("hidden");
}

function closeHomebrewModal() {
    document.getElementById("homebrew-modal").classList.add("hidden");
}

function addHomebrewAttackRow() {
    const container = document.getElementById("hb-attacks-container");
    const rowId = `hb-att-${hbAttackCount++}`;
    
    const row = document.createElement("div");
    row.className = "attack-form-row";
    row.id = rowId;
    row.innerHTML = `
        <button type="button" class="btn-remove-row" onclick="document.getElementById('${rowId}').remove()" title="Remover Ataque"><i class="fa-solid fa-xmark"></i></button>
        <div class="form-row-3">
            <div class="form-group-input">
                <label>Nome do Ataque</label>
                <input type="text" class="hb-attack-nome" placeholder="ex: Garra" required autocomplete="off">
            </div>
            <div class="form-group-input">
                <label>Bônus de Ataque</label>
                <input type="text" class="hb-attack-bonus" placeholder="ex: +12" required autocomplete="off">
            </div>
            <div class="form-group-input">
                <label>Fórmula de Dano</label>
                <input type="text" class="hb-attack-dano" placeholder="ex: 2d6+8 cortante" required autocomplete="off">
            </div>
        </div>
        <div class="form-group-input" style="margin-top: 0.4rem;">
            <label>Efeitos Especiais / Descrição</label>
            <input type="text" class="hb-attack-desc" placeholder="ex: Derruba o alvo (Ref CD 18 evita)" autocomplete="off">
        </div>
    `;
    
    container.appendChild(row);
}

function addHomebrewAbilityRow() {
    const container = document.getElementById("hb-abilities-container");
    const rowId = `hb-abl-${hbAbilityCount++}`;
    
    const row = document.createElement("div");
    row.className = "ability-form-row";
    row.id = rowId;
    row.innerHTML = `
        <button type="button" class="btn-remove-row" onclick="document.getElementById('${rowId}').remove()" title="Remover Habilidade"><i class="fa-solid fa-xmark"></i></button>
        <div class="form-group-input">
            <label>Nome da Habilidade</label>
            <input type="text" class="hb-ability-nome" placeholder="ex: Faro" required autocomplete="off">
        </div>
        <div class="form-group-input" style="margin-top: 0.4rem;">
            <label>Descrição</label>
            <textarea class="hb-ability-desc" rows="2" placeholder="ex: A aranha gigante percebe criaturas..." required></textarea>
        </div>
    `;
    
    container.appendChild(row);
}

function saveHomebrewThreat() {
    const nome = document.getElementById("hb-nome").value.trim();
    const nd = document.getElementById("hb-nd").value;
    const tipo = document.getElementById("hb-tipo").value.trim();
    const pv = document.getElementById("hb-pv").value.trim();
    const pm = document.getElementById("hb-pm").value.trim();
    const defesa = document.getElementById("hb-defesa").value.trim();
    const defesaObs = document.getElementById("hb-defesa-obs").value.trim();
    const iniciativa = document.getElementById("hb-iniciativa").value.trim();
    const percepcao = document.getElementById("hb-percepcao").value.trim();
    const percepcaoObs = document.getElementById("hb-percepcao-obs").value.trim();
    const fort = document.getElementById("hb-fort").value.trim();
    const ref = document.getElementById("hb-ref").value.trim();
    const von = document.getElementById("hb-von").value.trim();
    const desl = document.getElementById("hb-desl").value.trim();
    
    // Read Attributes
    const atributos = {
        for: document.getElementById("hb-attr-for").value.trim() || "0",
        des: document.getElementById("hb-attr-des").value.trim() || "0",
        con: document.getElementById("hb-attr-con").value.trim() || "0",
        int: document.getElementById("hb-attr-int").value.trim() || "0",
        sab: document.getElementById("hb-attr-sab").value.trim() || "0",
        car: document.getElementById("hb-attr-car").value.trim() || "0"
    };
    
    // Read Attacks
    const ataques = [];
    const attackRows = document.querySelectorAll(".attack-form-row");
    attackRows.forEach(row => {
        const aNome = row.querySelector(".hb-attack-nome").value.trim();
        const aBonus = row.querySelector(".hb-attack-bonus").value.trim();
        const aDano = row.querySelector(".hb-attack-dano").value.trim();
        const aDesc = row.querySelector(".hb-attack-desc").value.trim();
        
        if (aNome) {
            ataques.push({
                nome: aNome,
                tipo: "Homebrew",
                bonus: aBonus,
                dano: aDano,
                desc: aDesc
            });
        }
    });
    
    // Read Abilities
    const habilidades = [];
    const abilityRows = document.querySelectorAll(".ability-form-row");
    abilityRows.forEach(row => {
        const hNome = row.querySelector(".hb-ability-nome").value.trim();
        const hDesc = row.querySelector(".hb-ability-desc").value.trim();
        
        if (hNome && hDesc) {
            habilidades.push({
                nome: hNome,
                tipo: "Qualidade",
                desc: hDesc
            });
        }
    });
    
    const newThreat = {
        nome,
        tipo,
        nd,
        pv,
        pm,
        defesa,
        defesaObs,
        iniciativa,
        percepcao,
        percepcaoObs,
        fort,
        ref,
        von,
        desl,
        atributos,
        ataques,
        habilidades,
        pericias: [],
        tesouro: "Nenhum",
        fonte: "Homebrew",
        isHomebrew: true
    };
    
    // Save to LocalStorage
    const homebrews = JSON.parse(localStorage.getItem('t20_homebrew_threats')) || [];
    homebrews.unshift(newThreat); // Put new homebrews first
    localStorage.setItem('t20_homebrew_threats', JSON.stringify(homebrews));
    
    // Reload
    loadThreats();
    updateThreatsGrid();
    closeHomebrewModal();
    
    // Auto-open detailed view for the newly created threat
    setTimeout(() => {
        showDetail(nome);
    }, 200);
}

// 9. Setup Event Listeners
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById("search-input");
    const clearSearch = document.getElementById("clear-search");
    
    searchInput.addEventListener("input", () => {
        activeFilters.search = searchInput.value;
        if (activeFilters.search) {
            clearSearch.classList.remove("hidden");
        } else {
            clearSearch.classList.add("hidden");
        }
        updateThreatsGrid();
        renderActiveFilterBadges();
    });
    
    clearSearch.addEventListener("click", () => {
        searchInput.value = "";
        activeFilters.search = "";
        clearSearch.classList.add("hidden");
        updateThreatsGrid();
        renderActiveFilterBadges();
    });
    
    // ND Select
    const ndSelect = document.getElementById("filter-nd-select");
    ndSelect.addEventListener("change", () => {
        activeFilters.nd = ndSelect.value;
        updateThreatsGrid();
        renderActiveFilterBadges();
    });
    
    // Sorting Select
    document.getElementById("sort-select").addEventListener("change", () => {
        updateThreatsGrid();
    });
    
    // Collapsible Type Panel Toggle
    const typeHeader = document.getElementById("type-filters-header");
    const typeContent = document.getElementById("type-filters-content");
    typeHeader.addEventListener("click", () => {
        typeHeader.classList.toggle("collapsed");
        typeContent.classList.toggle("collapsed");
    });
    
    // Reset Filters Button
    document.getElementById("btn-reset-filters").addEventListener("click", resetFilters);
    
    // Toggle Encounter View (Header & Sidebar Button)
    document.getElementById("btn-toggle-encounter-view").addEventListener("click", () => {
        toggleEncounterSidebar();
    });
    document.getElementById("stat-box-encounter").addEventListener("click", () => {
        toggleEncounterSidebar(true);
    });
    document.getElementById("btn-close-encounter-sidebar").addEventListener("click", () => {
        toggleEncounterSidebar(false);
    });
    
    // Detail Close
    document.getElementById("btn-close-detail").addEventListener("click", closeDetail);
    
    // Modals Close
    document.getElementById("btn-close-roll-modal").addEventListener("click", () => {
        document.getElementById("roll-modal").classList.add("hidden");
    });
    document.getElementById("btn-close-homebrew-modal").addEventListener("click", closeHomebrewModal);
    document.getElementById("btn-cancel-homebrew").addEventListener("click", closeHomebrewModal);
    
    // Homebrew trigger
    document.getElementById("btn-create-threat-trigger").addEventListener("click", openHomebrewModal);
    
    // Homebrew dynamic row triggers
    document.getElementById("btn-add-hb-attack").addEventListener("click", addHomebrewAttackRow);
    document.getElementById("btn-add-hb-ability").addEventListener("click", addHomebrewAbilityRow);
    
    // Homebrew Form submit
    document.getElementById("homebrew-form").addEventListener("submit", (e) => {
        e.preventDefault();
        saveHomebrewThreat();
    });
    
    // Roll party initiative
    document.getElementById("btn-roll-party-initiative").addEventListener("click", rollAllInitiatives);
    
    // Scroll to Top behavior
    const gridArea = document.querySelector(".threats-content-area");
    const scrollTopBtn = document.getElementById("btn-scroll-top");
    
    gridArea.addEventListener("scroll", () => {
        if (gridArea.scrollTop > 300) {
            scrollTopBtn.classList.remove("hidden");
        } else {
            scrollTopBtn.classList.add("hidden");
        }
    });
    
    scrollTopBtn.addEventListener("click", () => {
        gridArea.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// 10. Global Window Hooks (Needed for HTML Event Listeners)
window.showDetail = showDetail;
window.addToEncounter = addToEncounter;
window.removeFromEncounter = removeFromEncounter;
window.adjustItemHP = adjustItemHP;
window.rollItemInitiative = rollItemInitiative;
window.updateItemInitiative = updateItemInitiative;
window.rollAttack = rollAttack;

// Helper to escape strings for HTML attributes safely
function escapeStr(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "\\'"); // escape single quotes for string arguments in JS calls
}
