/**
 * COMPÊNDIO DE RAÇAS — Arsenal T20
 * Lê os dados estáticos de racas.js (window.RACE_DATA + tabelas auxiliares)
 * e monta um visualizador de consulta no estilo "lista + ficha" (5e.tools).
 *
 * Este script NUNCA chama createCustomUi()/calculateAttributes() das raças —
 * essas funções pertencem à Calculadora de Atributos e dependem de elementos
 * de DOM que não existem aqui. Usamos apenas os campos estáticos de dados.
 */

(function () {
  'use strict';

  // ── Metadados de fonte/livro por "type" ──────────────────────────
  var SOURCE_META = {
    base:      { label: 'Livro Básico',              short: 'Básico',  color: '#c9933a' },
    ghanor:    { label: 'A Lenda de Ghanor RPG',  short: 'Ghanor',  color: '#4f9d69' },
    ameacas:   { label: 'Ameaças de Arton',           short: 'Ameaças', color: '#b5384f' },
    DHracas:   { label: 'Heróis de Arton',            short: 'Heróis',  color: '#4a72b0' },
    dragaobrasil: { label: 'Dragão Brasil',           short: 'DB',      color: '#e07b39' },
    outraRaca: { label: 'Outras Fontes',              short: 'Outras',  color: '#8a63b5' }
  };
  var SOURCE_ORDER = ['base', 'ghanor', 'ameacas', 'DHracas', 'dragaobrasil', 'outraRaca'];
  var DEFAULT_SOURCE = { label: 'Fonte Desconhecida', short: '???', color: '#888888' };

  // ── Abreviações para a tabela resumo ──────────────────────────────
  var ATTR_ABBR = {
    forca: 'FOR', destreza: 'DES', constituicao: 'CON',
    inteligencia: 'INT', sabedoria: 'SAB', carisma: 'CAR'
  };
  var SIZE_ABBR = {
    'Minúsculo': 'Min', 'Pequeno': 'Peq', 'Médio': 'Méd', 'Medio': 'Méd',
    'Grande': 'Gde', 'Variável': 'Var'
  };

  function shortAttrs(d) {
    var parts = [];
    Object.keys(d.attributes || {}).forEach(function (k) {
      var v = d.attributes[k];
      if (v) parts.push((ATTR_ABBR[k] || k.slice(0, 3).toUpperCase()) + (v > 0 ? '+' : '') + v);
    });
    if (d.isChoice) {
      parts.push('+1×' + (d.choiceCount || 1) + (d.lockedChoiceAttributes && d.lockedChoiceAttributes.length ? '*' : ''));
    }
    if (!parts.length && d.bonusMessage) {
      return d.bonusMessage.length > 34 ? d.bonusMessage.slice(0, 32) + '…' : d.bonusMessage;
    }
    return parts.join(' ');
  }

  function shortSize(d) {
    var t = d.tamanho || 'Variável';
    return SIZE_ABBR[t] || t;
  }

  // ── Tabelas de variantes/opções especiais por raça ───────────────
  function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  var VARIANT_SPECS = {};
  if (typeof GOLEM_CHASSI !== 'undefined') {
    VARIANT_SPECS.golem = [
      { title: 'Chassis Disponíveis', source: GOLEM_CHASSI, nameField: 'label', descField: 'attrDesc', powersField: 'powers' },
      { title: 'Fontes de Energia', source: (typeof GOLEM_FONTES !== 'undefined' ? GOLEM_FONTES : {}), keyAsLabel: true, powersField: 'powers' },
      { title: 'Maravilhas Mecânicas (chassi Mashin)', source: (typeof GOLEM_MARAVILHAS !== 'undefined' ? GOLEM_MARAVILHAS : {}), nameField: 'name', descField: 'desc' }
    ];
  }
  if (typeof KOBOLD_TALENTS !== 'undefined') {
    VARIANT_SPECS.kobold = [
      { title: 'Talentos de Bando', source: KOBOLD_TALENTS, nameField: 'name', descField: 'desc' }
    ];
  }
  if (typeof SURAGEL_HERANCAS !== 'undefined') {
    var suragelSpec = [
      { title: 'Heranças de Suragel', source: SURAGEL_HERANCAS, keyAsLabel: true, htmlDescField: 'description' }
    ];
    VARIANT_SPECS.aggelus = suragelSpec;
    VARIANT_SPECS.sulfure = suragelSpec;
  }
  if (typeof DUENDE_PRESENTES !== 'undefined') {
    VARIANT_SPECS.duende = [
      { title: 'Naturezas (escolha 1)', source: {
          Animal:  { name: 'Natureza Animal', desc: 'Pode adicionar +1 em um atributo à sua escolha (Dons). Sem poder racial adicional.' },
          Vegetal: { name: 'Natureza Vegetal', desc: 'Imune a atordoamento e metamorfose.' },
          Mineral: { name: 'Natureza Mineral', desc: 'Imune a metabolismo e RD 5 (Corte, Fogo, Perfuração).' }
        }, nameField: 'name', descField: 'desc' },
      { title: 'Poderes Extras de Natureza (conforme natureza)', source: {
          florescerFeerico: { name: 'Florescer Feérico (Vegetal)', desc: 'Pode gastar PM (limite Constituição) para curar 2d8 PV por PM gasto.' }
        }, nameField: 'name', descField: 'desc' },
      { title: 'Presentes de Magia e Caos (escolha até 3)', source: DUENDE_PRESENTES, nameField: 'name', descField: 'desc' }
    ];
  }
  if (typeof FEERICO_BENCAOS !== 'undefined') {
    VARIANT_SPECS.feerico = [
      { title: 'Bênçãos das Fadas (escolha 4)', source: FEERICO_BENCAOS, nameField: 'name', descField: 'desc' }
    ];
  }
  if (typeof VAMPIRO_BENCAOS !== 'undefined') {
    VARIANT_SPECS.vampiro = [
      { title: 'Bênçãos Vampíricas (escolha 1)', source: VAMPIRO_BENCAOS, nameField: 'name', descField: 'desc' }
    ];
  }
  if (typeof KALLYANACH_BENCAOS !== 'undefined') {
    VARIANT_SPECS.kallyanach = [
      { title: 'Bênçãos de Kallyadranoch (escolha 2)', source: KALLYANACH_BENCAOS, nameField: 'name', descField: 'desc' }
    ];
  }
  if (typeof ABERRANT_MUTATIONS !== 'undefined') {
    VARIANT_SPECS.aberrant = [
      { title: 'Mutações (escolha até 4)', source: ABERRANT_MUTATIONS, nameField: 'name', descField: 'desc' }
    ];
  }
  if (typeof MOREAU_HERANCAS !== 'undefined') {
    VARIANT_SPECS.moreau = [
      { title: 'Heranças Animais (escolha 1)', source: MOREAU_HERANCAS, nameField: 'attrDesc', powersField: 'powers' }
    ];
  }

  // ── Preparação dos dados ──────────────────────────────────────────
  var RAW = (typeof RACE_DATA !== 'undefined') ? RACE_DATA : {};

  // Raças com herança de outra raça (poderes dinâmicos)
  var inheritableRaces = ['osteon', 'yidishan', 'vampiro'];
  inheritableRaces.forEach(function(raceKey) {
    if (RAW[raceKey] && !VARIANT_SPECS[raceKey]) {
      VARIANT_SPECS[raceKey] = [
        { title: 'Memória Póstuma / Resquícios (herança de raça humanoide)', source: {}, nameField: 'name', descField: 'desc' }
      ];
    }
  });
  var races = Object.keys(RAW)
    .map(function (key) { return { key: key, data: RAW[key] }; })
    .filter(function (r) { return r.data && typeof r.data === 'object' && r.data.name; });

  function stripAccents(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function buildSearchBlob(race) {
    var d = race.data;
    var parts = [d.name, d.raca, d.tamanho, d.bonusMessage];
    (d.racialPowers || []).forEach(function (p) {
      parts.push(p.name, p.desc);
    });
    return stripAccents(parts.filter(Boolean).join(' | '));
  }

  races.forEach(function (r) { r._blob = buildSearchBlob(r); });

  // ── Estado ──────────────────────────────────────────────────────
  var state = {
    query: '',
    activeSources: new Set(SOURCE_ORDER.concat(Object.keys(SOURCE_META)).filter(function (s, i, arr) {
      return arr.indexOf(s) === i;
    })),
    selectedKey: null,
    sortKey: 'source',  // padrão: agrupar por livro (base, ghanor, ameacas, DHracas, outraRaca)
    sortDir: 1
  };

  // ── Elementos ─────────────────────────────────────────────────────
  var tableBodyEl = document.getElementById('race-table-body');
  var tableHeadEl = document.querySelector('#race-table thead');
  var searchInput = document.getElementById('search-input');
  var filtersEl = document.getElementById('source-filters');
  var resultCountEl = document.getElementById('result-count');
  var clearBtn = document.getElementById('clear-filters');
  var detailEmpty = document.getElementById('detail-empty');
  var detailContent = document.getElementById('detail-content');
  var backBtn = document.getElementById('back-to-list');
  var mainEl = document.getElementById('app-main');

  // ── Filtros de fonte (chips) ───────────────────────────────────────
  function sourcesPresent() {
    var seen = {};
    races.forEach(function (r) { seen[r.data.type] = true; });
    return SOURCE_ORDER.filter(function (s) { return seen[s]; })
      .concat(Object.keys(seen).filter(function (s) { return SOURCE_ORDER.indexOf(s) === -1; }));
  }

  function renderFilters() {
    var present = sourcesPresent();
    filtersEl.innerHTML = '';
    present.forEach(function (sourceKey) {
      var meta = SOURCE_META[sourceKey] || DEFAULT_SOURCE;
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'filter-chip' + (state.activeSources.has(sourceKey) ? ' active' : '');
      chip.style.setProperty('--chip-color', meta.color);
      chip.innerHTML = '<span class="dot"></span>' + meta.short;
      chip.addEventListener('click', function () {
        if (state.activeSources.has(sourceKey)) {
          state.activeSources.delete(sourceKey);
        } else {
          state.activeSources.add(sourceKey);
        }
        renderFilters();
        renderList();
      });
      filtersEl.appendChild(chip);
    });
  }

  // ── Lista ─────────────────────────────────────────────────────────
  function getFiltered() {
    var q = stripAccents(state.query.trim());
    return races.filter(function (r) {
      if (!state.activeSources.has(r.data.type)) return false;
      if (q && r._blob.indexOf(q) === -1) return false;
      return true;
    });
  }

  function sourceIndex(type) {
    var i = SOURCE_ORDER.indexOf(type);
    return i === -1 ? 999 : i; // tipos desconhecidos vão para o fim
  }

  function sortValue(r, key) {
    if (key === 'source') {
      // Agrupa por livro (ordem SOURCE_ORDER); dentro do livro, ordem alfabética fica no tiebreak em renderList
      return sourceIndex(r.data.type);
    }
    if (key === 'attrs') return stripAccents(shortAttrs(r.data));
    if (key === 'tamanho') return stripAccents(r.data.tamanho || 'zzz'); // sem tamanho vai pro fim
    return stripAccents(r.data.name);
  }

  function renderSortIndicators() {
    tableHeadEl.querySelectorAll('th.sortable').forEach(function (th) {
      var key = th.dataset.sort;
      var arrow = th.querySelector('.sort-arrow');
      // O TH "Nome" também representa o modo "agrupar por livro" (sortKey === 'source')
      var isSorted = (state.sortKey === key) || (key === 'name' && state.sortKey === 'source');
      th.classList.toggle('sorted', isSorted);
      arrow.textContent = isSorted ? (state.sortDir === 1 ? '▲' : '▼') : '';
      if (key === 'name') {
        th.title = state.sortKey === 'source'
          ? 'Ordenado por livro (clique para A→Z)'
          : (state.sortDir === 1 ? 'A→Z' : 'Z→A') + ' (clique duplo para voltar a agrupar por livro)';
      }
    });
  }

  function renderList() {
    var filtered = getFiltered();
    resultCountEl.textContent = filtered.length + (filtered.length === 1 ? ' raça' : ' raças');
    renderSortIndicators();

    if (!filtered.length) {
      tableBodyEl.innerHTML = '<tr><td colspan="3" class="no-results">Nenhuma raça encontrada com esses filtros.</td></tr>';
      return;
    }

    filtered.sort(function (a, b) {
      var va = sortValue(a, state.sortKey);
      var vb = sortValue(b, state.sortKey);
      if (va < vb) return -1 * state.sortDir;
      if (va > vb) return 1 * state.sortDir;
      return a.data.name.localeCompare(b.data.name, 'pt-BR');
    });

    var html = filtered.map(function (r) {
      var d = r.data;
      var meta = SOURCE_META[d.type] || DEFAULT_SOURCE;
      var attrs = shortAttrs(d);
      var size = shortSize(d);
      return '' +
        '<tr class="race-row' + (state.selectedKey === r.key ? ' active' : '') + '" ' +
        'style="--source-color:' + meta.color + '" data-key="' + r.key + '" role="option" tabindex="0">' +
        '<td class="col-name" title="' + escapeHtml(meta.label) + '">' +
        '<span class="source-dot"></span>' +
        '<span class="name-text">' + escapeHtml(d.name) + '</span>' +
        '</td>' +
        '<td class="col-attrs" title="' + escapeHtml(d.bonusMessage || '') + '">' + escapeHtml(attrs) + '</td>' +
        '<td class="col-size" title="' + escapeHtml(d.tamanho || 'Variável') + '">' + escapeHtml(size) + '</td>' +
        '</tr>';
    }).join('');

    tableBodyEl.innerHTML = html;

    tableBodyEl.querySelectorAll('.race-row').forEach(function (row) {
      row.addEventListener('click', function () { selectRace(row.dataset.key); });
      row.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectRace(row.dataset.key); }
      });
    });
  }

  function escapeHtml(str) {
    return (str || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ── Ficha detalhada ────────────────────────────────────────────────
  function renderVariantBlock(spec) {
    var entries = Object.keys(spec.source || {});
    if (!entries.length) return '';

    var cards = entries.map(function (key) {
      var val = spec.source[key];
      var label = spec.nameField ? val[spec.nameField] : (spec.keyAsLabel ? cap(key) : key);
      var bodyHtml = '';

      if (spec.htmlDescField && val[spec.htmlDescField]) {
        bodyHtml += '<p class="power-desc">' + val[spec.htmlDescField] + '</p>';
      } else if (spec.descField && val[spec.descField]) {
        bodyHtml += '<p class="power-desc">' + escapeHtml(val[spec.descField]) + '</p>';
      }

      if (spec.powersField && Array.isArray(val[spec.powersField])) {
        bodyHtml += val[spec.powersField].map(function (p) {
          return '<p class="power-desc"><b>' + escapeHtml(p.name) + '.</b> ' + escapeHtml(p.desc) + '</p>';
        }).join('');
      }

      if (!bodyHtml) bodyHtml = '<p class="power-desc">—</p>';

      return '<div class="power-card"><h4 class="power-name">' + escapeHtml(label) + '</h4>' + bodyHtml + '</div>';
    }).join('');

    return '' +
      '<div class="variant-block">' +
      '<p class="variant-label">' + escapeHtml(spec.title) + '</p>' +
      '<div class="power-grid">' + cards + '</div>' +
      '</div>';
  }

  function renderDetail(key) {
    var race = RAW[key];
    if (!race) return;
    var meta = SOURCE_META[race.type] || DEFAULT_SOURCE;

    var portraitStyle = race.imageUrl
      ? ' style="background-image:url(\'' + race.imageUrl.replace(/'/g, "\\'") + '\')"'
      : '';

    var badges = '<span class="badge source" style="--source-color:' + meta.color + '">' + escapeHtml(meta.label) + '</span>';
    badges += '<span class="badge">' + escapeHtml(race.tamanho || 'Tamanho variável') + '</span>';
    if (race.raca && race.raca !== '-') {
      badges += '<span class="badge">' + escapeHtml(race.raca) + '</span>';
    }

    var powersHtml = (race.racialPowers || []).map(function (p) {
      return '' +
        '<div class="power-card">' +
        '<h4 class="power-name">' + escapeHtml(p.name) + '</h4>' +
        '<p class="power-desc">' + escapeHtml(p.desc) + '</p>' +
        '</div>';
    }).join('');

    var variantHtml = '';
    var specs = VARIANT_SPECS[key];
    if (specs) {
      variantHtml = specs.map(renderVariantBlock).join('');
    }

    var runeDivider = '<div class="rune-divider">' +
      '<svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,0 16,8 8,16 0,8" fill="currentColor"/></svg>' +
      '</div>';

    detailContent.innerHTML = '' +
      '<header class="detail-header">' +
      '<div class="detail-portrait"' + portraitStyle + '></div>' +
      '<div class="detail-heading">' +
      '<h2 class="detail-name">' + escapeHtml(race.name) + '</h2>' +
      '<div class="detail-badges">' + badges + '</div>' +
      '<a class="calc-link" href="../calculadora/index.html?raca=' + encodeURIComponent(key) + '"rel="noopener" title="Abrir esta raça na Calculadora de Atributos">' +
        '<span class="calc-link-icon" aria-hidden="true">🧮</span>' +
        '<span class="calc-link-text">Usar na Calculadora</span>' +
      '</a>' +
      '</div>' +
      '</header>' +

      '<h3 class="section-title">Modificadores de Atributo</h3>' +
      '<div class="bonus-message">' + escapeHtml(race.bonusMessage || 'Sem modificadores fixos.') + '</div>' +

      runeDivider +

      '<h3 class="section-title">Poderes Raciais</h3>' +
      '<div class="power-grid">' + (powersHtml || '<p class="power-desc">Nenhum poder racial fixo cadastrado.</p>') + '</div>' +

      (variantHtml ? runeDivider + '<h3 class="section-title">Variantes e Opções Especiais</h3>' + variantHtml : '') +

      '<p class="detail-footnote">Dados extraídos do compêndio de raças do Arsenal T20 — consulte o mestre para eventuais erratas ou regras de mesa.</p>';

    detailEmpty.classList.add('hidden');
    detailContent.classList.remove('hidden');

    state.selectedKey = key;
    mainEl.classList.add('showing-detail');
    renderList();
    detailContent.scrollTop = 0;
    document.getElementById('detail-pane').scrollTop = 0;
  }

  function selectRace(key) {
    renderDetail(key);
  }

  // ── Eventos globais ──────────────────────────────────────────────
  searchInput.addEventListener('input', function (e) {
    state.query = e.target.value;
    renderList();
  });

  clearBtn.addEventListener('click', function () {
    state.query = '';
    searchInput.value = '';
    state.activeSources = new Set(sourcesPresent());
    renderFilters();
    renderList();
  });

  backBtn.addEventListener('click', function () {
    mainEl.classList.remove('showing-detail');
  });

  tableHeadEl.querySelectorAll('th.sortable').forEach(function (th) {
    th.addEventListener('click', function () {
      var key = th.dataset.sort;
      // O TH "Nome" é especial: ele "esconde" o modo 'source' (ordem por livro).
      // source → name (asc) → name (desc) → source ...
      if (key === 'name') {
        if (state.sortKey === 'source') {
          state.sortKey = 'name';
          state.sortDir = 1;
        } else if (state.sortKey === 'name' && state.sortDir === 1) {
          state.sortDir = -1;
        } else {
          // name desc, ou qualquer outro key: volta para source (ordem por livro)
          state.sortKey = 'source';
          state.sortDir = 1;
        }
      } else if (state.sortKey === key) {
        state.sortDir *= -1;
      } else {
        state.sortKey = key;
        state.sortDir = 1;
      }
      renderList();
    });
  });

  // ── Inicialização ────────────────────────────────────────────────
  renderFilters();
  renderList();
})();
