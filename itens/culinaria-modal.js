/* ============================================================
   CULINÁRIA — PAINEL DO MODAL
   Carregue DEPOIS de script.js e de data/culinaria.js:

     <script src="data/culinaria.js"></script>
     <script src="script.js"></script>
     <script src="culinaria-modal.js"></script>

   Não exige alteração no index.html nem no script.js: o painel é
   injetado no .modal-body e o openModal original é envelopado.
   ============================================================ */

(function () {
  'use strict';

  const CAT = 'Culinária';

  // ===== ESTILOS =====
  const css = `
    #culinariaPanel { display: none; }
    #culinariaPanel.active { display: block; }
    .cul-benefit {
      background: var(--surface);
      border: 1px solid var(--border-solid);
      border-radius: 10px;
      padding: 10px 12px;
      margin-bottom: 10px;
    }
    .cul-benefit .cul-benefit-label {
      font-family: "Cinzel", serif;
      font-size: .72rem;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: var(--muted);
      margin: 0 0 2px;
    }
    .cul-benefit .cul-benefit-value {
      font-family: 'EB Garamond', Georgia, serif;
      font-size: 1.15rem;
      color: var(--gold-light);
      margin: 0;
    }
    .cul-chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 4px 0 10px; }
    .cul-chip {
      background: var(--bg-input);
      border: 1px solid var(--border-input);
      border-radius: 999px;
      padding: 4px 10px;
      font-size: .85rem;
      color: var(--text-main);
      cursor: default;
    }
    .cul-chip.clickable { cursor: pointer; }
    .cul-chip.clickable:hover { border-color: var(--border-solid); color: var(--gold-light); }
    .cul-chip .cul-chip-price { color: var(--muted); font-size: .78rem; margin-left: 4px; }
    .cul-toggles { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
    .cul-toggle { display: flex; align-items: center; gap: 8px; font-size: .9rem; color: var(--text-main); }
    .cul-toggle input[type="checkbox"] { accent-color: var(--accent); width: 16px; height: 16px; }
    .cul-toggle small { color: var(--muted); }
    .cul-combo { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .cul-combo select { flex: 1; min-width: 180px; }
    .cul-note {
      font-family: 'EB Garamond', Georgia, serif;
      font-size: .95rem;
      color: var(--muted);
      margin-top: 10px;
      line-height: 1.45;
    }
  `;
  const styleTag = document.createElement('style');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  // ===== HELPERS =====
  function culData() {
    return (typeof culinariaData !== 'undefined') ? culinariaData : null;
  }

  function precoNum(str) {
    if (!str) return 0;
    return parseFloat(String(str).replace('T$', '').replace(/\./g, '').replace(',', '.').trim()) || 0;
  }

  function fmtPreco(n) {
    const s = Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');
    return 'T$ ' + s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function norm(s) {
    return String(s || '').toLowerCase().trim();
  }

  function findIngrediente(nome) {
    const d = culData();
    if (!d) return null;
    const alvo = norm(nome);
    return d.item.find(i => i.tipo === 'Ingredientes' && norm(i.nome) === alvo) || null;
  }

  function pratos() {
    const d = culData();
    return d ? d.item.filter(i => i.tipo === 'Pratos Especiais') : [];
  }

  // Abre outro item do painel, se ele estiver na lista filtrada atual
  function abrirSeVisivel(nome) {
    if (typeof filteredItems === 'undefined') return;
    const idx = filteredItems.findIndex(i => i.nome === nome && i.categoria === CAT);
    if (idx >= 0) openModal(idx);
  }

  // ===== PAINEL =====
  function getPanel() {
    let panel = document.getElementById('culinariaPanel');
    if (panel) return panel;

    panel = document.createElement('div');
    panel.id = 'culinariaPanel';
    panel.className = 'modal-section';

    const customizer = document.getElementById('itemCustomizer');
    if (customizer && customizer.parentElement) {
      customizer.parentElement.insertBefore(panel, customizer);
    } else {
      document.querySelector('.modal-body').appendChild(panel);
    }
    return panel;
  }

  function renderPrato(item, panel) {
    const outros = pratos().filter(p => p.nome !== item.nome);

    panel.innerHTML = `
      <h3>Culinária Avançada</h3>

      <div class="cul-benefit">
        <p class="cul-benefit-label">Benefício</p>
        <p class="cul-benefit-value" id="culBeneficio">${item.beneficio || '—'}</p>
      </div>

      <div class="modal-stats">
        <div class="stat-box">
          <p class="stat-label">Comprar (porção)</p>
          <p class="stat-value">${item.preco || '—'}</p>
        </div>
        <div class="stat-box">
          <p class="stat-label">Cozinhar (insumos)</p>
          <p class="stat-value" id="culCusto">${item.custo_ingredientes || '—'}</p>
        </div>
        <div class="stat-box">
          <p class="stat-label">CD do Teste</p>
          <p class="stat-value" id="culCD">${item.cd ?? '—'}</p>
        </div>
      </div>

      <h3 style="margin-top:12px;">Ingredientes</h3>
      <div class="cul-chips" id="culIngredientes"></div>

      <div class="cul-toggles">
        <label class="cul-toggle">
          <input type="checkbox" id="culTempero">
          <span>Tempero Especial <small>(+1 porção de especiarias, CD +5)</small></span>
        </label>
        <div class="cul-toggle cul-combo">
          <input type="checkbox" id="culAsCozinha">
          <span>Ás da Cozinha:</span>
          <select id="culSegundoPrato" class="quantity-select" disabled>
            <option value="">--- Segundo prato ---</option>
            ${outros.map(p => `<option value="${p.nome}">${p.nome} (CD ${p.cd})</option>`).join('')}
          </select>
        </div>
      </div>

      <p class="cul-note">
        Preparar exige 1 hora de trabalho, o gasto dos ingredientes e um teste de Ofício (cozinheiro).
        Passando, rende comida para o grupo inteiro (cerca de 5 pessoas). O efeito dura 1 dia e você só
        recebe um bônus de alimentação por dia (veja o poder Bom de Garfo).
      </p>
    `;

    // Chips de ingredientes
    const chips = panel.querySelector('#culIngredientes');
    (item.ingredientes || []).forEach(nome => {
      const ing = findIngrediente(nome);
      const chip = document.createElement('span');
      chip.className = 'cul-chip' + (ing ? ' clickable' : '');
      chip.innerHTML = `${nome}${ing ? `<span class="cul-chip-price">${ing.preco}</span>` : ''}`;
      if (ing) chip.addEventListener('click', () => abrirSeVisivel(ing.nome));
      chips.appendChild(chip);
    });

    // Recalcular CD / custo / benefício
    const chkTempero = panel.querySelector('#culTempero');
    const chkAs = panel.querySelector('#culAsCozinha');
    const selSegundo = panel.querySelector('#culSegundoPrato');

    function recalcular() {
      const temperado = chkTempero.checked;
      const segundo = chkAs.checked && selSegundo.value
        ? pratos().find(p => p.nome === selSegundo.value)
        : null;

      // CD: maior CD entre os pratos (+5 por combo, +5 por tempero)
      let cd = item.cd || 0;
      if (segundo) cd = Math.max(cd, segundo.cd || 0) + 5;
      if (temperado) cd += 5;

      // Custo: insumos dos dois pratos + especiarias
      let custo = precoNum(item.custo_ingredientes);
      if (segundo) custo += precoNum(segundo.custo_ingredientes);
      if (temperado) {
        const esp = findIngrediente('Especiarias');
        custo += esp ? precoNum(esp.preco) : 100;
      }

      // Benefício
      const benef = b => (temperado ? (b.beneficio_temperado || b.beneficio) : b.beneficio) || '—';
      let texto = benef(item);
      if (segundo) texto += ' <span style="color:var(--muted)">&amp;</span> ' + benef(segundo);

      panel.querySelector('#culCD').textContent = cd || '—';
      panel.querySelector('#culCusto').textContent = fmtPreco(custo);
      panel.querySelector('#culBeneficio').innerHTML = texto;
    }

    chkTempero.addEventListener('change', recalcular);
    chkAs.addEventListener('change', () => {
      selSegundo.disabled = !chkAs.checked;
      if (!chkAs.checked) selSegundo.value = '';
      recalcular();
    });
    selSegundo.addEventListener('change', recalcular);

    recalcular();
  }

  function renderIngrediente(item, panel) {
    const usos = pratos().filter(p =>
      (p.ingredientes || []).some(n => norm(n) === norm(item.nome))
    );

    panel.innerHTML = `
      <h3>Culinária Avançada</h3>
      <div class="modal-stats">
        <div class="stat-box">
          <p class="stat-label">Preço</p>
          <p class="stat-value">${item.preco || '—'}</p>
        </div>
        <div class="stat-box">
          <p class="stat-label">Espaço</p>
          <p class="stat-value">${item.espacos || '—'}</p>
        </div>
        <div class="stat-box">
          <p class="stat-label">Usado em</p>
          <p class="stat-value">${usos.length} prato${usos.length === 1 ? '' : 's'}</p>
        </div>
      </div>

      ${usos.length ? `
        <h3 style="margin-top:12px;">Pratos que usam</h3>
        <div class="cul-chips" id="culUsos"></div>
      ` : ''}

      <p class="cul-note">
        O preço considera insumo de ótima qualidade, necessário para pratos especiais. Insumos comuns,
        para refeições cotidianas, podem ser mais baratos, mas não têm efeito em jogo.
        ${item.nome.startsWith('Especiarias') ? '<br>Uma porção extra permite usar o Tempero Especial: CD +5, bônus numéricos +1 e PV/PM temporários +50%.' : ''}
      </p>
    `;

    const chips = panel.querySelector('#culUsos');
    if (chips) {
      usos.forEach(p => {
        const chip = document.createElement('span');
        chip.className = 'cul-chip clickable';
        chip.innerHTML = `${p.nome}<span class="cul-chip-price">CD ${p.cd}</span>`;
        chip.addEventListener('click', () => abrirSeVisivel(p.nome));
        chips.appendChild(chip);
      });
    }
  }

  function renderCulinariaPanel(item) {
    const panel = getPanel();

    if (!item || item.categoria !== CAT) {
      panel.classList.remove('active');
      panel.innerHTML = '';
      return;
    }

    panel.classList.add('active');
    if (item.tipo === 'Ingredientes') renderIngrediente(item, panel);
    else renderPrato(item, panel);
  }

  // ===== HOOK NO openModal =====
  const openModalOriginal = window.openModal;
  if (typeof openModalOriginal === 'function') {
    window.openModal = function (index) {
      openModalOriginal(index);
      const item = (typeof filteredItems !== 'undefined') ? filteredItems[index] : null;
      renderCulinariaPanel(item);
    };
  } else {
    console.warn('[culinaria-modal] openModal não encontrado — carregue este arquivo depois de script.js.');
  }

  // Expõe para uso manual, se precisar
  window.renderCulinariaPanel = renderCulinariaPanel;
})();
