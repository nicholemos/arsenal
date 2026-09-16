document.addEventListener('DOMContentLoaded', () => {

  // =================================================================
  // TEMA (SANGUE / SOMBRAS / CLÁSSICO)
  // =================================================================
  (function () {
    var body = document.body;
    var key = 't20_theme';
    
    function applyTheme(theme) {
      body.classList.remove('theme-dark', 'theme-classic');
      document.documentElement.classList.remove('theme-dark', 'theme-classic');
      if (theme === 'dark') {
        body.classList.add('theme-dark');
        document.documentElement.classList.add('theme-dark');
      } else if (theme === 'classic') {
        body.classList.add('theme-classic');
        document.documentElement.classList.add('theme-classic');
      }
      
      document.querySelectorAll('.theme-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
      });
      localStorage.setItem(key, theme);
    }
    
    var saved = localStorage.getItem(key);
    if (!saved) {
      var oldTheme = localStorage.getItem('liberTheme') || localStorage.getItem('hubTheme');
      if (oldTheme === 'dark') saved = 'dark';
      else if (oldTheme === 'classic' || oldTheme === 'light') saved = 'classic';
      else saved = 'blood';
    }
    applyTheme(saved);
    
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(btn.getAttribute('data-theme'));
      });
    });
  })();

  // =================================================================
  // NÍVEIS DE AFINIDADE (Feature 1)
  // =================================================================
  const niveisAfinidade = [
    { min: 0, max: 0, label: 'Inimigo', cor: '#C3073F' },
    { min: 1, max: 2, label: 'Hostil', cor: '#e67e22' },
    { min: 3, max: 3, label: 'Neutro', cor: '#95a5a6' },
    { min: 4, max: 5, label: 'Amigável', cor: '#2ecc71' },
    { min: 6, max: 6, label: 'Aliado', cor: '#3498db' },
    { min: 7, max: 7, label: 'Íntimo', cor: '#9b59b6' },
  ];

  function getNivelAfinidade(hearts) {
    return niveisAfinidade.find(n => hearts >= n.min && hearts <= n.max) || niveisAfinidade[0];
  }

  // =================================================================
  // FICHA RÁPIDA DE NPC (Feature 2)
  // =================================================================
  function showNpcModal(npcData, playerName) {
    const modal = document.getElementById('npc-modal');
    if (!modal) return;
    document.getElementById('npc-modal-name').textContent = npcData.nome || npcData.name || 'NPC';
    document.getElementById('npc-modal-player').textContent = playerName || '-';
    document.getElementById('npc-modal-hearts').textContent = `${npcData.hearts}/7`;
    const nivel = getNivelAfinidade(npcData.hearts);
    document.getElementById('npc-modal-nivel').textContent = nivel.label;
    document.getElementById('npc-modal-nivel').style.color = nivel.cor;
    document.getElementById('npc-modal-notes').textContent = npcData.affinityText || 'Sem anotações.';
    const imgDiv = document.getElementById('npc-modal-image');
    if (npcData.image) {
      imgDiv.style.backgroundImage = `url(${npcData.image})`;
    } else {
      imgDiv.style.backgroundImage = 'none';
      imgDiv.style.backgroundColor = '#333';
    }
    modal.style.display = 'flex';
  }

  // =================================================================
  // MÓDULO DE PROGRESSO COM NPCS
  // =================================================================
  const npcModule = (() => {
    let playerCount = 0;
    let selectedPlayer = null;
    const playerList = document.getElementById('player-list');
    const addPlayerBtn = document.getElementById('addPlayer');
    const playerNameInput = document.getElementById('playerName');
    const removePlayerBtn = document.getElementById('removePlayer');

    function createNpc(container, npcData = { name: '', hearts: 0, image: '', affinityText: '' }) {
      const npcContainer = document.createElement('div');
      npcContainer.classList.add('npc-item');
      if (npcData.image) npcContainer.style.backgroundImage = `url(${npcData.image})`;
      npcContainer.dataset.affinityText = npcData.affinityText || '';

      const nameContainer = document.createElement('div');
      nameContainer.className = 'npc-name-container';

      const getPlayerName = () => {
        const p = container.closest('.player-container');
        return p ? p.querySelector('h3').textContent.replace(' ▼', '') : '';
      };

      if (npcData.name) {
        const nameDisplay = document.createElement('h4');
        nameDisplay.className = 'npc-name-display';
        nameDisplay.textContent = npcData.name;
        nameDisplay.style.cursor = 'pointer';
        nameDisplay.title = 'Clique para ver ficha rápida';
        nameDisplay.onclick = (e) => {
          e.stopPropagation();
          showNpcModal({
            nome: npcData.name,
            hearts: currentHearts !== undefined ? currentHearts : (npcData.hearts || 0),
            affinityText: npcData.affinityText || '',
            image: npcData.image || ''
          }, getPlayerName());
        };
        nameContainer.appendChild(nameDisplay);
      } else {
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Nome do NPC';
        nameInput.className = 'npc-name-input';
        nameInput.onclick = e => e.stopPropagation();

        const saveNameBtn = document.createElement('button');
        saveNameBtn.innerText = 'Salvar Nome';
        saveNameBtn.className = 'btn-save-name';
        saveNameBtn.onclick = (e) => {
          e.stopPropagation();
          const nameValue = nameInput.value.trim();
          if (nameValue) {
            const nameDisplay = document.createElement('h4');
            nameDisplay.className = 'npc-name-display';
            nameDisplay.textContent = nameValue;
            nameDisplay.style.cursor = 'pointer';
            nameDisplay.title = 'Clique para ver ficha rápida';
            nameDisplay.onclick = (ev) => {
              ev.stopPropagation();
              showNpcModal({
                nome: nameValue,
                hearts: currentHearts !== undefined ? currentHearts : 0,
                affinityText: npcContainer.dataset.affinityText || '',
                image: npcContainer.style.backgroundImage ? npcContainer.style.backgroundImage.slice(5, -2) : ''
              }, getPlayerName());
            };
            nameContainer.innerHTML = '';
            nameContainer.appendChild(nameDisplay);
            npcContainer.closest('.npc-entry').querySelector('.npc-trigger .npc-name').textContent = nameValue;
            autoSaveToCache();
          }
        };
        nameContainer.appendChild(nameInput);
        nameContainer.appendChild(saveNameBtn);
      }
      npcContainer.appendChild(nameContainer);

      const heartsContainer = document.createElement('div');
      heartsContainer.classList.add('hearts');
      const hearts = [];
      for (let i = 0; i < 7; i++) {
        const heart = document.createElement('span');
        heart.classList.add('heart');
        heart.innerText = '❤️';
        hearts.push(heart);
        heartsContainer.appendChild(heart);
      }
      npcContainer.appendChild(heartsContainer);

      const nivelLabel = document.createElement('div');
      nivelLabel.className = 'npc-nivel-label';
      npcContainer.appendChild(nivelLabel);

      const controlDiv = document.createElement('div');
      controlDiv.classList.add('npc-controls');
      const minusButton = document.createElement('button');
      minusButton.innerText = '-';
      const plusButton = document.createElement('button');
      plusButton.innerText = '+';
      controlDiv.appendChild(minusButton);
      controlDiv.appendChild(plusButton);
      npcContainer.appendChild(controlDiv);

      let currentHearts = npcData.hearts;
      const updateHearts = () => {
        hearts.forEach((heart, index) => {
          heart.classList.toggle('active', index < currentHearts);
        });
        const nivel = getNivelAfinidade(currentHearts);
        nivelLabel.textContent = nivel.label;
        nivelLabel.style.color = nivel.cor;
        nivelLabel.style.borderColor = nivel.cor;
        const trigger = container.previousElementSibling;
        if (trigger && trigger.classList.contains('npc-trigger')) {
          const heartCountSpan = trigger.querySelector('.heart-count');
          if (heartCountSpan) heartCountSpan.textContent = `(❤️ ${currentHearts}/7)`;
        }
      };

      minusButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentHearts > 0) currentHearts--;
        updateHearts();
        autoSaveToCache();
      });
      plusButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentHearts < hearts.length) currentHearts++;
        updateHearts();
        autoSaveToCache();
      });

      const affinityTextDisplay = document.createElement('p');
      affinityTextDisplay.className = 'npc-affinity-text';
      affinityTextDisplay.textContent = npcContainer.dataset.affinityText;
      npcContainer.appendChild(affinityTextDisplay);

      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('npc-actions');

      const affinityBtn = document.createElement('button');
      affinityBtn.innerText = 'Anotações';
      affinityBtn.onclick = (e) => {
        e.stopPropagation();
        const currentText = npcContainer.dataset.affinityText;
        const newText = prompt("Digite as anotações:", currentText);
        if (newText !== null) {
          npcContainer.dataset.affinityText = newText;
          affinityTextDisplay.textContent = newText;
          autoSaveToCache();
        }
      };

       const imageButton = document.createElement('button');
       imageButton.innerText = 'Adicionar Imagem';
       imageButton.addEventListener('click', (e) => {
         e.stopPropagation();
         const url = prompt("Cole o link da imagem ou clique em Cancelar para escolher um arquivo local:");
         if (url !== null && url.trim() !== '') {
           npcContainer.style.backgroundImage = `url(${url.trim()})`;
           autoSaveToCache();
         } else if (url === null) {
           const fileInput = document.createElement('input');
           fileInput.type = 'file';
           fileInput.accept = 'image/*';
           fileInput.style.display = 'none';
           fileInput.onchange = (event) => {
             const file = event.target.files[0];
             if (!file) return;
             const reader = new FileReader();
             reader.onload = (readEvent) => {
               npcContainer.style.backgroundImage = `url(${readEvent.target.result})`;
               autoSaveToCache();
             };
             reader.readAsDataURL(file);
           };
           document.body.appendChild(fileInput);
           fileInput.click();
           document.body.removeChild(fileInput);
         }
       });

      const removeNpcButton = document.createElement('button');
      removeNpcButton.innerText = 'Remover NPC';
      removeNpcButton.addEventListener('click', (e) => {
        e.stopPropagation();
        container.parentElement.remove();
        autoSaveToCache();
      });

      actionsDiv.appendChild(affinityBtn);
      actionsDiv.appendChild(imageButton);
      actionsDiv.appendChild(removeNpcButton);
      npcContainer.appendChild(actionsDiv);

      container.appendChild(npcContainer);
      updateHearts();
    }

    function createPlayer(playerData) {
      const playerContainer = document.createElement('div');
      playerContainer.classList.add('player-container', 'collapsed');
      playerContainer.id = `player${playerCount}`;

      const playerHeader = document.createElement('div');
      playerHeader.className = 'player-header';

      const playerImgDiv = document.createElement('div');
      playerImgDiv.className = 'player-image';
      if (playerData.image) {
        playerImgDiv.style.backgroundImage = `url(${playerData.image})`;
      } else {
        playerImgDiv.innerHTML = '<span class="player-img-placeholder">+</span>';
      }
       playerImgDiv.title = 'Clique para adicionar imagem do jogador';
       playerImgDiv.onclick = (e) => {
         e.stopPropagation();
         const url = prompt("Cole o link da imagem do jogador ou clique em Cancelar para escolher um arquivo local:");
         if (url !== null && url.trim() !== '') {
           playerImgDiv.style.backgroundImage = `url(${url.trim()})`;
           playerImgDiv.innerHTML = '';
           autoSaveToCache();
         } else if (url === null) {
           const input = document.createElement('input');
           input.type = 'file';
           input.accept = 'image/*';
           input.onchange = (ev) => {
             const file = ev.target.files[0];
             if (!file) return;
             const reader = new FileReader();
             reader.onload = (re) => {
               playerImgDiv.style.backgroundImage = `url(${re.target.result})`;
               playerImgDiv.innerHTML = '';
               autoSaveToCache();
             };
             reader.readAsDataURL(file);
           };
           input.click();
         }
       };

      const playerTitle = document.createElement('h3');
      playerTitle.innerHTML = `${playerData.name} <span class="toggle-arrow">▼</span>`;

      playerTitle.addEventListener('click', () => {
        playerContainer.classList.toggle('collapsed');
      });

      playerHeader.appendChild(playerImgDiv);
      playerHeader.appendChild(playerTitle);
      playerContainer.appendChild(playerHeader);

      const collapsibleContent = document.createElement('div');
      collapsibleContent.className = 'collapsible-content';

      const npcListContainer = document.createElement('div');
      npcListContainer.className = 'npc-list';

      if (playerData.npcs) {
        playerData.npcs.forEach(npcData => {
          const npcEntry = document.createElement('div');
          npcEntry.className = 'npc-entry';

          const npcTrigger = document.createElement('h5');
          npcTrigger.className = 'npc-trigger';
          const heartCount = npcData.hearts || 0;
          npcTrigger.innerHTML = `<span class="npc-name">${npcData.name || 'Novo NPC'}</span><span class="heart-count">(❤️ ${heartCount}/7)</span>`;

          const npcCardContainer = document.createElement('div');
          npcCardContainer.className = 'npc-card-container collapsed';

          npcTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (npcCardContainer.innerHTML === '') {
              createNpc(npcCardContainer, npcData);
            }
            npcCardContainer.classList.toggle('collapsed');
          });

          npcEntry.appendChild(npcTrigger);
          npcEntry.appendChild(npcCardContainer);
          npcListContainer.appendChild(npcEntry);
        });
      }
      collapsibleContent.appendChild(npcListContainer);

      const addNpcButton = document.createElement('button');
      addNpcButton.innerText = 'Adicionar NPC';
      addNpcButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const npcData = { name: '', hearts: 0, image: '', affinityText: '' };
        const npcEntry = document.createElement('div');
        npcEntry.className = 'npc-entry';

        const npcTrigger = document.createElement('h5');
        npcTrigger.className = 'npc-trigger';
        npcTrigger.innerHTML = `<span class="npc-name">Novo NPC</span> <span class="heart-count">(❤️ 0/7)</span>`;

        const npcCardContainer = document.createElement('div');
        npcCardContainer.className = 'npc-card-container collapsed';

        npcTrigger.addEventListener('click', (ev) => {
          ev.stopPropagation();
          if (npcCardContainer.innerHTML === '') {
            createNpc(npcCardContainer, npcData);
          }
          npcCardContainer.classList.toggle('collapsed');
        });

        npcEntry.appendChild(npcTrigger);
        npcEntry.appendChild(npcCardContainer);
        npcListContainer.appendChild(npcEntry);
        autoSaveToCache();
      });

      collapsibleContent.appendChild(addNpcButton);

      // Botão para adicionar NPC a partir de NPCs Aliados
      const addFromAllyBtn = document.createElement('button');
      addFromAllyBtn.innerText = 'Adicionar NPC Aliado';
      addFromAllyBtn.style.marginTop = '5px';
      addFromAllyBtn.style.backgroundColor = 'var(--success-color)';
      addFromAllyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const allyCards = document.querySelectorAll('#ally-npc-list .solicitante-card');
        if (allyCards.length === 0) {
          alert('Nenhum NPC aliado disponível. Crie aliados primeiro.');
          return;
        }
        const allyNames = Array.from(allyCards).map(c => c.querySelector('h5').textContent);
        const msg = allyNames.map((n, i) => `${i+1}. ${n}`).join('\n');
        const choice = prompt(`Escolha um aliado:\n${msg}\n\nDigite o número ou nome:`);
        if (!choice) return;
        const idx = parseInt(choice) - 1;
        let matched = null;
        if (!isNaN(idx) && idx >= 0 && idx < allyCards.length) {
          matched = allyCards[idx];
        } else {
          matched = Array.from(allyCards).find(c =>
            c.querySelector('h5').textContent.toLowerCase() === choice.toLowerCase()
          );
        }
        if (!matched) { alert('Aliado não encontrado.'); return; }

        const allyName = matched.querySelector('h5').textContent;
        const allyDesc = matched.querySelector('.npc-desc-text').textContent;
        const allyBonus = matched.querySelector('.npc-bonus-text').textContent;
        const allyImage = matched.querySelector('img').src;
        const isPlaceholder = allyImage === 'https://via.placeholder.com/150';

        const npcData = {
          name: allyName,
          hearts: 3,
          image: isPlaceholder ? '' : allyImage,
          affinityText: `${allyDesc}\nBônus: ${allyBonus}`
        };

        const npcEntry = document.createElement('div');
        npcEntry.className = 'npc-entry';
        const npcTrigger = document.createElement('h5');
        npcTrigger.className = 'npc-trigger';
        npcTrigger.innerHTML = `<span class="npc-name">${npcData.name}</span> <span class="heart-count">(❤️ ${npcData.hearts}/7)</span>`;
        const npcCardContainer = document.createElement('div');
        npcCardContainer.className = 'npc-card-container collapsed';
        npcTrigger.addEventListener('click', (ev) => {
          ev.stopPropagation();
          if (npcCardContainer.innerHTML === '') {
            createNpc(npcCardContainer, npcData);
          }
          npcCardContainer.classList.toggle('collapsed');
        });
        npcEntry.appendChild(npcTrigger);
        npcEntry.appendChild(npcCardContainer);
        npcListContainer.appendChild(npcEntry);
        autoSaveToCache();
      });
      collapsibleContent.appendChild(addFromAllyBtn);
      playerContainer.appendChild(collapsibleContent);

      playerContainer.addEventListener('click', (e) => {
        if (e.target === playerContainer || e.target === playerTitle || e.target.classList.contains('toggle-arrow')) {
          document.querySelectorAll('.player-container').forEach(p => p.classList.remove('selected'));
          playerContainer.classList.add('selected');
          selectedPlayer = playerContainer;
        }
      });

      playerList.appendChild(playerContainer);
      playerCount++;
    }

    addPlayerBtn.addEventListener('click', () => {
      const playerName = playerNameInput.value.trim();
      if (playerName) {
        createPlayer({ name: playerName, npcs: [] });
        playerNameInput.value = '';
        autoSaveToCache();
      }
    });

    removePlayerBtn.addEventListener('click', () => {
      if (!selectedPlayer) {
        alert("Selecione um jogador.");
        return;
      }
      const playerName = selectedPlayer.querySelector('h3').innerText;
      if (confirm(`Remover "${playerName}"?`)) {
        selectedPlayer.remove();
        selectedPlayer = null;
        autoSaveToCache();
      }
    });

    function getSaveData() {
      const data = [];
      document.querySelectorAll('.player-container').forEach(player => {
        const playerName = player.querySelector('h3').innerText.replace(' ▼', '');
        const npcs = [];
        player.querySelectorAll('.npc-item').forEach(npc => {
          let npcName = '';
          const nameDisplay = npc.querySelector('.npc-name-display');
          if (nameDisplay) npcName = nameDisplay.textContent;
          const npcHearts = npc.querySelectorAll('.heart.active').length;
          let imageUrl = npc.style.backgroundImage;
          imageUrl = (imageUrl && imageUrl !== 'none') ? imageUrl.slice(5, -2) : '';
          const affinityText = npc.dataset.affinityText || '';
          npcs.push({ name: npcName, hearts: npcHearts, image: imageUrl, affinityText: affinityText });
        });
        const imgDiv = player.querySelector('.player-image');
        let playerImage = '';
        if (imgDiv && imgDiv.style.backgroundImage && imgDiv.style.backgroundImage !== 'none') {
          playerImage = imgDiv.style.backgroundImage.slice(5, -2);
        }
        data.push({ name: playerName, npcs, image: playerImage });
      });
      return data;
    }

    function loadSaveData(data) {
      playerList.innerHTML = '';
      playerCount = 0;
      selectedPlayer = null;
      data.forEach(playerData => createPlayer(playerData));
    }

    return { getSaveData, loadSaveData };
  })();

  // =================================================================
  // MÓDULO DE ESTABELECIMENTOS EDITÁVEIS
  // =================================================================
  const estabelecimentosModule = (() => {
    const list = document.getElementById('solicitantes-container');
    const filtroSelect = document.getElementById('filtroSolicitante');
    let estabelecimentosList = [];

    function init() {
      if (filtroSelect) {
        filtroSelect.addEventListener('change', applyFilter);
      }
      
      const addBtn = document.getElementById('addEstab');
      if (addBtn) {
        addBtn.addEventListener('click', () => {
          const nameInput = document.getElementById('newEstabName');
          const descInput = document.getElementById('newEstabDesc');
          const servicesInput = document.getElementById('newEstabServices');
          const honorsInput = document.getElementById('newEstabHonors');

          const nome = nameInput.value.trim();
          const descricao = descInput.value.trim();
          const servicos = servicesInput.value.trim();
          const honrarias = honorsInput.value.trim();

          if (!nome) {
            alert('Preencha o nome do estabelecimento.');
            return;
          }

          addEstabData({ nome, descricao, servicos, honrarias, imagem: '', honrariasReveladas: false });

          nameInput.value = '';
          descInput.value = '';
          servicesInput.value = '';
          honorsInput.value = '';
        });
      }
    }

    // Adiciona um estabelecimento a partir de dados estruturados (form manual ou catálogo de Candeh'ssa)
    function addEstabData(newEstab) {
      estabelecimentosList.push(newEstab);
      createEstabCard(newEstab);
      updateFiltroSelect();
      autoSaveToCache();
    }

    function jaExisteEstab(nome) {
      return estabelecimentosList.some(e => e.nome.toLowerCase() === nome.toLowerCase());
    }

    function updateFiltroSelect() {
      if (!filtroSelect) return;
      const currentVal = filtroSelect.value;
      filtroSelect.innerHTML = '<option value="Todos">Todos</option>';
      estabelecimentosList.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.nome;
        opt.textContent = s.nome;
        filtroSelect.appendChild(opt);
      });
      filtroSelect.value = currentVal;
      if (!filtroSelect.value) filtroSelect.value = 'Todos';
      applyFilter();
    }

    function applyFilter() {
      if (!filtroSelect) return;
      const sel = filtroSelect.value;
      list.querySelectorAll('.solicitante-card').forEach(card => {
        card.style.display = (sel === 'Todos' || card.dataset.solicitanteNome === sel) ? '' : 'none';
      });
    }

    function createEstabCard(estabData) {
      if (!list) return;
      const card = document.createElement('div');
      card.className = 'solicitante-card collapsed';
      card.dataset.solicitanteNome = estabData.nome;

      card.innerHTML = `
        <div class="solicitante-visible-content">
          <img src="${estabData.imagem || 'https://via.placeholder.com/150'}" alt="${estabData.nome}" style="cursor: pointer;">
          <h5>${estabData.nome}</h5>
        </div>
        <div class="solicitante-collapsible-content" style="padding: 15px;">
          <p><strong>Descrição:</strong> <span class="estab-desc-text">${estabData.descricao || 'Sem descrição.'}</span></p>
          <p><strong>Serviços:</strong> <span class="estab-services-text">${estabData.servicos || 'Sem serviços.'}</span></p>
          <div class="honrarias ${estabData.honrariasReveladas ? 'revealed' : ''}">
            <p><strong>Honrarias:</strong> <span class="estab-honors-text">${estabData.honrarias || 'Nenhuma honraria.'}</span></p>
          </div>
          <div class="estab-actions" style="margin-top: 15px; display: flex; gap: 5px; flex-wrap: wrap;">
            <button class="btn-toggle-honors" style="font-size: 0.7rem; flex: 1 1 auto;">${estabData.honrariasReveladas ? 'Ocultar Honraria' : 'Revelar Honraria'}</button>
            <button class="btn-edit-estab" style="font-size: 0.7rem; flex: 1 1 auto;">Editar</button>
            <button class="btn-img-estab" style="font-size: 0.7rem; flex: 1 1 auto;">Imagem</button>
            <button class="btn-remove-estab" style="font-size: 0.7rem; flex: 1 1 auto; background-color: var(--fail-color); color: #fff;">Remover</button>
          </div>
        </div>
      `;

      card.querySelector('img').onclick = () => card.classList.toggle('collapsed');

      const honorsDiv = card.querySelector('.honrarias');
      const toggleHonorsBtn = card.querySelector('.btn-toggle-honors');
      toggleHonorsBtn.onclick = (e) => {
        e.stopPropagation();
        const isRevealed = honorsDiv.classList.toggle('revealed');
        estabData.honrariasReveladas = isRevealed;
        toggleHonorsBtn.textContent = isRevealed ? 'Ocultar Honraria' : 'Revelar Honraria';
        autoSaveToCache();
      };

      card.querySelector('.btn-edit-estab').onclick = (e) => {
        e.stopPropagation();
        const nName = prompt("Nome do Estabelecimento:", estabData.nome);
        const nDesc = prompt("Descrição:", estabData.descricao);
        const nServices = prompt("Serviços:", estabData.servicos);
        const nHonors = prompt("Honrarias:", estabData.honrarias);
        
        if (nName !== null && nName.trim()) {
          estabData.nome = nName.trim();
          card.querySelector('h5').textContent = nName.trim();
          card.dataset.solicitanteNome = nName.trim();
          updateFiltroSelect();
        }
        if (nDesc !== null) {
          estabData.descricao = nDesc;
          card.querySelector('.estab-desc-text').textContent = nDesc || 'Sem descrição.';
        }
        if (nServices !== null) {
          estabData.servicos = nServices;
          card.querySelector('.estab-services-text').textContent = nServices || 'Sem serviços.';
        }
        if (nHonors !== null) {
          estabData.honrarias = nHonors;
          card.querySelector('.estab-honors-text').textContent = nHonors || 'Nenhuma honraria.';
        }
        autoSaveToCache();
      };

       card.querySelector('.btn-img-estab').onclick = (e) => {
         e.stopPropagation();
         const url = prompt("Cole o link da imagem do estabelecimento ou clique em Cancelar para escolher um arquivo local:");
         if (url !== null && url.trim() !== '') {
           card.querySelector('img').src = url.trim();
           estabData.imagem = url.trim();
           autoSaveToCache();
         } else if (url === null) {
           const input = document.createElement('input');
           input.type = 'file';
           input.accept = 'image/*';
           input.onchange = ev => {
             const file = ev.target.files[0];
             if (!file) return;
             const reader = new FileReader();
             reader.onload = readEv => {
               card.querySelector('img').src = readEv.target.result;
               estabData.imagem = readEv.target.result;
               autoSaveToCache();
             };
             reader.readAsDataURL(file);
           };
           input.click();
         }
       };

      card.querySelector('.btn-remove-estab').onclick = (e) => {
        e.stopPropagation();
        if (confirm(`Remover estabelecimento "${estabData.nome}"?`)) {
          card.remove();
          const index = estabelecimentosList.indexOf(estabData);
          if (index > -1) {
            estabelecimentosList.splice(index, 1);
          }
          updateFiltroSelect();
          autoSaveToCache();
        }
      };

      list.appendChild(card);
    }

    function getSaveData() {
      return estabelecimentosList;
    }

    function loadSaveData(data) {
      estabelecimentosList = data || [];
      if (list) list.innerHTML = '';
      estabelecimentosList.forEach(estab => createEstabCard(estab));
      updateFiltroSelect();
    }

    init();
    return { getSaveData, loadSaveData, addEstabData, jaExisteEstab };
  })();

  // =================================================================


  // =================================================================
  // MÓDULO DE MISSÕES CUSTOMIZÁVEIS (Feature 4)
  // =================================================================
  const missoesCustomModule = (() => {
    const missionList = document.getElementById('custom-mission-list');
    let missaoIdCounter = 0;

    function createCustomMissionCard(data) {
      const card = document.createElement('div');
      card.className = 'custom-mission-card';
      card.dataset.missionId = data.id || ++missaoIdCounter;
      if (data.completa) card.classList.add('mission-completa');

      const header = document.createElement('div');
      header.className = 'custom-mission-header';
      header.innerHTML = `<strong>${data.nome || 'Nova Missão'}</strong>`;
      card.appendChild(header);

      const desc = document.createElement('p');
      desc.className = 'custom-mission-desc';
      desc.textContent = data.descricao || 'Sem descrição.';
      card.appendChild(desc);

      const reward = document.createElement('p');
      reward.className = 'custom-mission-reward';
      reward.innerHTML = `<strong>Recompensa:</strong> ${data.recompensa || '—'}`;
      card.appendChild(reward);

      const actions = document.createElement('div');
      actions.className = 'custom-mission-actions';

      const toggleBtn = document.createElement('button');
      toggleBtn.textContent = data.completa ? 'Reabrir' : 'Concluir';
      toggleBtn.className = data.completa ? 'btn-fail' : 'btn-success';
      toggleBtn.onclick = () => {
        card.classList.toggle('mission-completa');
        data.completa = !data.completa;
        toggleBtn.textContent = data.completa ? 'Reabrir' : 'Concluir';
        toggleBtn.className = data.completa ? 'btn-fail' : 'btn-success';
        autoSaveToCache();
      };

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.onclick = () => {
        const nNome = prompt('Nome:', data.nome || '');
        const nDesc = prompt('Descrição / Objetivo:', data.descricao || '');
        const nReward = prompt('Recompensa:', data.recompensa || '');
        if (nNome !== null) { data.nome = nNome; header.querySelector('strong').textContent = nNome; }
        if (nDesc !== null) { data.descricao = nDesc; desc.textContent = nDesc || 'Sem descrição.'; }
        if (nReward !== null) { data.recompensa = nReward; reward.innerHTML = `<strong>Recompensa:</strong> ${nReward || '—'}`; }
        autoSaveToCache();
      };

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Remover';
      delBtn.className = 'btn-remove';
      delBtn.onclick = () => {
        if (confirm(`Remover missão "${data.nome || 'sem nome'}"?`)) {
          card.remove();
          autoSaveToCache();
        }
      };

      actions.appendChild(toggleBtn);
      actions.appendChild(editBtn);
      actions.appendChild(delBtn);
      card.appendChild(actions);

      missionList.appendChild(card);
    }

    document.getElementById('addCustomMission').addEventListener('click', () => {
      const nome = document.getElementById('customMissionName').value.trim();
      const descricao = document.getElementById('customMissionDesc').value.trim();
      const recompensa = document.getElementById('customMissionReward').value.trim();
      if (!nome && !descricao && !recompensa) {
        alert('Preencha ao menos um campo.');
        return;
      }
      createCustomMissionCard({ id: ++missaoIdCounter, nome, descricao, recompensa, completa: false });
      document.getElementById('customMissionName').value = '';
      document.getElementById('customMissionDesc').value = '';
      document.getElementById('customMissionReward').value = '';
      autoSaveToCache();
    });

    function addMissionData(nome, descricao, recompensa) {
      createCustomMissionCard({ id: ++missaoIdCounter, nome, descricao, recompensa, completa: false });
      autoSaveToCache();
    }

    function getSaveData() {
      const data = [];
      missionList.querySelectorAll('.custom-mission-card').forEach(card => {
        data.push({
          nome: card.querySelector('.custom-mission-header strong').textContent,
          descricao: card.querySelector('.custom-mission-desc').textContent,
          recompensa: card.querySelector('.custom-mission-reward').innerHTML.replace('<strong>Recompensa:</strong> ', ''),
          completa: card.classList.contains('mission-completa')
        });
      });
      return data;
    }

    function loadSaveData(data) {
      missionList.innerHTML = '';
      (data || []).forEach(d => createCustomMissionCard({ nome: d.nome, descricao: d.descricao, recompensa: d.recompensa, completa: d.completa }));
    }

    return { getSaveData, loadSaveData, addMissionData };
  })();

  // =================================================================
  // CONTROLES DE DADOS (SAVE / LOAD / AUTOSAVE)
  // =================================================================
  const saveData = () => {
    const data = {
      npcProgress: npcModule.getSaveData(),
      allyProgress: getAllyNpcData(),
      estabelecimentos: estabelecimentosModule.getSaveData(),
      missoesCustom: missoesCustomModule.getSaveData()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'painel_mestre_rpg.json';
    a.click();
  };

  const loadData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);

        if (data.npcProgress) npcModule.loadSaveData(data.npcProgress);

        if (data.allyProgress) {
          const list = document.getElementById('ally-npc-list');
          if (list) {
            list.innerHTML = '';
            data.allyProgress.forEach(ally => createAllyNpc(ally));
          }
        }

        if (data.estabelecimentos) estabelecimentosModule.loadSaveData(data.estabelecimentos);
        if (data.missoesCustom) missoesCustomModule.loadSaveData(data.missoesCustom);

        console.log('Dados carregados com sucesso.');
      } catch (error) {
        alert('Erro ao carregar o arquivo. Verifique o formato JSON.');
        console.error("Load error:", error);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };
  
  const autoSaveToCache = () => {
    if (typeof npcModule !== 'undefined' && typeof estabelecimentosModule !== 'undefined') {
      const data = {
        npcProgress: npcModule.getSaveData(),
        allyProgress: getAllyNpcData(),
        estabelecimentos: estabelecimentosModule.getSaveData(),
        missoesCustom: missoesCustomModule.getSaveData()
      };
      localStorage.setItem('rpg_panel_autosave', JSON.stringify(data));
    }
  };

  const loadFromCache = () => {
    const saved = localStorage.getItem('rpg_panel_autosave');
    if (saved) {
      try {
        const data = JSON.parse(saved);

        if (data.npcProgress) npcModule.loadSaveData(data.npcProgress);

        if (data.allyProgress) {
          const list = document.getElementById('ally-npc-list');
          if (list) {
            list.innerHTML = '';
            data.allyProgress.forEach(ally => createAllyNpc(ally));
          }
        }

        if (data.estabelecimentos) estabelecimentosModule.loadSaveData(data.estabelecimentos);
        if (data.missoesCustom) missoesCustomModule.loadSaveData(data.missoesCustom);
      } catch (e) {
        console.error("Erro ao carregar o cache:", e);
      }
    }
  };


  function createAllyNpc(npcData = { name: '', desc: '', bonus: '', image: '' }) {
    const list = document.getElementById('ally-npc-list');
    const card = document.createElement('div');
    card.className = 'solicitante-card collapsed'; // Reutilizando o estilo visual dos estabelecimentos

    card.innerHTML = `
        <div class="solicitante-visible-content">
            <img src="${npcData.image || 'https://via.placeholder.com/150'}" alt="${npcData.name}" style="cursor: pointer;">
            <h5 style="pointer-events: none;">${npcData.name || 'Novo Aliado'}</h5>
        </div>
        <div class="solicitante-collapsible-content" style="padding: 10px;">
            <p><strong>Descrição:</strong> <span class="npc-desc-text">${npcData.desc || 'Clique para editar'}</span></p>
            <div class="honrarias revealed" style="background-color: rgba(76, 175, 80, 0.1); border-left-color: var(--success-color);">
                <p><strong>Bônus:</strong> <span class="npc-bonus-text">${npcData.bonus || 'Clique para editar'}</span></p>
            </div>
            <div class="npc-actions" style="margin-top: 10px; display: flex; gap: 5px;">
                <button class="btn-edit-ally" style="font-size: 0.7rem;">Editar</button>
                <button class="btn-img-ally" style="font-size: 0.7rem;">Imagem</button>
                <button class="btn-remove-ally" style="font-size: 0.7rem; background-color: var(--fail-color);">Remover</button>
            </div>
        </div>
    `;

    // Evento para expandir/recolher ao clicar na imagem
    card.querySelector('img').onclick = () => card.classList.toggle('collapsed');

    // Lógica de Edição
    card.querySelector('.btn-edit-ally').onclick = () => {
      const nName = prompt("Nome:", npcData.name);
      const nDesc = prompt("Descrição:", npcData.desc);
      const nBonus = prompt("Bônus:", npcData.bonus);
      if (nName) card.querySelector('h5').textContent = nName;
      if (nDesc) card.querySelector('.npc-desc-text').textContent = nDesc;
      if (nBonus) card.querySelector('.npc-bonus-text').textContent = nBonus;
      autoSaveToCache();
    };

     // Lógica de Imagem (Aceita link ou arquivo local)
     card.querySelector('.btn-img-ally').onclick = () => {
       const url = prompt("Cole o link da imagem do aliado ou clique em Cancelar para escolher um arquivo local:");
       if (url !== null && url.trim() !== '') {
         card.querySelector('img').src = url.trim();
         autoSaveToCache();
       } else if (url === null) {
         const input = document.createElement('input');
         input.type = 'file';
         input.accept = 'image/*';
         input.onchange = e => {
           const reader = new FileReader();
           reader.onload = ev => {
             card.querySelector('img').src = ev.target.result;
             autoSaveToCache();
           };
           reader.readAsDataURL(e.target.files[0]);
         };
         input.click();
       }
     };

    card.querySelector('.btn-remove-ally').onclick = () => {
      if (confirm("Remover aliado?")) { card.remove(); autoSaveToCache(); }
    };

    list.appendChild(card);
  }

  document.getElementById('addAllyNpc').addEventListener('click', () => {
    const nameInput = document.getElementById('allyNpcName');
    if (nameInput.value.trim()) {
      createAllyNpc({ name: nameInput.value.trim(), desc: '', bonus: '', image: '' });
      nameInput.value = '';
      autoSaveToCache();
    }
  });

  // Função para extrair os dados dos aliados da interface
  const getAllyNpcData = () => {
    const allies = [];
    document.querySelectorAll('#ally-npc-list .solicitante-card').forEach(card => {
      allies.push({
        name: card.querySelector('h5').textContent,
        desc: card.querySelector('.npc-desc-text').textContent,
        bonus: card.querySelector('.npc-bonus-text').textContent,
        image: card.querySelector('img').src
      });
    });
    return allies;
  };

  const clearAllData = () => {
    if (confirm("ATENÇÃO: Isso apagará todos os jogadores, missões, aliados, estabelecimentos e o cache do navegador. Deseja continuar?")) {
        localStorage.removeItem('rpg_panel_autosave');
        
        const safeClear = (id) => {
          const el = document.getElementById(id);
          if (el) el.innerHTML = '';
        };

        safeClear('player-list');
        safeClear('resultados-missoes');
        safeClear('lista-missoes-completadas');
        safeClear('ally-npc-list');
        safeClear('solicitantes-container');
        safeClear('custom-mission-list');

        const honorsList = document.getElementById('honrarias-conquistadas-list');
        if (honorsList) {
            honorsList.innerHTML = '<p class="empty-list-message">Nenhuma honraria conquistada.</p>';
        }
        document.querySelectorAll('.honrarias').forEach(h => {
            h.classList.remove('revealed');
        });

        window.location.reload();
    }
  };

  // =================================================================
  // BANCO DE DADOS E GERADOR ALEATÓRIO DE CANDEH'SSA
  // =================================================================
  const candehssaModule = (() => {
    const db = window.CANDEHSSA_DB || { estabelecimentos: [], npcs: [] };

    function jaExisteAlly(nome) {
      return Array.from(document.querySelectorAll('#ally-npc-list .solicitante-card h5'))
        .some(h5 => h5.textContent.trim().toLowerCase() === nome.toLowerCase());
    }

    function addNpcFromCatalogo(npcData) {
      if (jaExisteAlly(npcData.nome)) {
        alert(`${npcData.nome} já está na lista de aliados.`);
        return false;
      }
      const desc = `${npcData.descricao}\nGosta de: ${npcData.gostos}\nNão gosta de: ${npcData.desgostos}\nLocal: ${npcData.estabelecimento}`;
      const bonus = `Última Demanda: ${npcData.ultimaDemanda}\n${npcData.beneficios}`;
      createAllyNpc({ name: npcData.nome, desc, bonus, image: '' });
      autoSaveToCache();
      return true;
    }

    function addEstabFromCatalogo(estabData) {
      if (estabelecimentosModule.jaExisteEstab(estabData.nome)) {
        alert(`${estabData.nome} já está na lista de estabelecimentos.`);
        return false;
      }
      estabelecimentosModule.addEstabData({
        nome: estabData.nome,
        descricao: estabData.descricao,
        servicos: estabData.servicos,
        honrarias: estabData.honrarias,
        imagem: '',
        honrariasReveladas: false
      });
      return true;
    }

    function sortearNpc() {
      const disponiveis = db.npcs.filter(n => !jaExisteAlly(n.nome));
      if (disponiveis.length === 0) {
        alert('Todos os NPCs de Candeh\'ssa já foram adicionados!');
        return;
      }
      const escolhido = disponiveis[Math.floor(Math.random() * disponiveis.length)];
      addNpcFromCatalogo(escolhido);
    }

    function sortearEstab() {
      const disponiveis = db.estabelecimentos.filter(e => !estabelecimentosModule.jaExisteEstab(e.nome));
      if (disponiveis.length === 0) {
        alert('Todos os estabelecimentos de Candeh\'ssa já foram adicionados!');
        return;
      }
      const escolhido = disponiveis[Math.floor(Math.random() * disponiveis.length)];
      addEstabFromCatalogo(escolhido);
    }

    function rolarDado(lados) {
      return Math.floor(Math.random() * lados) + 1;
    }

    function sortearMissao() {
      const tabela = db.missoesAleatorias;
      if (!tabela) return;

      const rolagemSolicitante = rolarDado(8) + rolarDado(8); // 2d8 => 2 a 16
      const rolagemObjetivo = rolarDado(8); // 1d8
      const rolagemRecompensa = rolarDado(6); // 1d6

      const solicitante = tabela.solicitantePorRolagem[rolagemSolicitante];
      const objetivo = tabela.objetivos[rolagemObjetivo];
      const recompensa = tabela.recompensas[rolagemRecompensa];

      const nome = `${objetivo.nome} — ${solicitante}`;
      const descricao = `Solicitante: ${solicitante}. ${objetivo.descricao}`;
      const recompensaTexto = `${recompensa.nome}. ${recompensa.descricao}`;

      missoesCustomModule.addMissionData(nome, descricao, recompensaTexto);
    }

    // ------- Modal de Catálogo (busca/navegação manual) -------
    const modal = document.getElementById('catalogo-modal');
    const modalTitle = document.getElementById('catalogo-modal-title');
    const modalList = document.getElementById('catalogo-modal-list');
    const searchInput = document.getElementById('catalogo-search');
    let catalogoAtual = null; // 'npcs' ou 'estabelecimentos'

    function renderCatalogoList(filtro = '') {
      modalList.innerHTML = '';
      const itens = catalogoAtual === 'npcs' ? db.npcs : db.estabelecimentos;
      const filtroLower = filtro.trim().toLowerCase();
      const filtrados = itens.filter(i => i.nome.toLowerCase().includes(filtroLower));

      if (filtrados.length === 0) {
        modalList.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
      }

      filtrados.forEach(item => {
        const jaAdicionado = catalogoAtual === 'npcs' ? jaExisteAlly(item.nome) : estabelecimentosModule.jaExisteEstab(item.nome);
        const row = document.createElement('div');
        row.className = 'solicitante-card';
        row.style.cursor = 'default';
        row.style.padding = '12px';

const linhaSub = catalogoAtual === 'npcs'
	  ? `<p style="margin:4px 0; word-break:break-word; overflow-wrap:break-word;"><strong>Local:</strong> ${item.estabelecimento}</p>
	     <p style="margin:4px 0; font-size:0.9rem; word-break:break-word; overflow-wrap:break-word;">${item.descricao}</p>`
	   : `<p style="margin:4px 0; word-break:break-word; overflow-wrap:break-word;"><strong>Serviços:</strong> ${item.resumo}</p>
	     <p style="margin:4px 0; font-size:0.9rem; word-break:break-word; overflow-wrap:break-word;">${item.descricao}</p>`;

        row.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; flex-wrap:wrap;">
            <div style="min-width:0; overflow-wrap:break-word; word-break:break-word; flex:1;">
              <h5 style="margin:0 0 5px 0; word-break:break-word; overflow-wrap:break-word; white-space:normal;">${item.nome}</h5>
              ${linhaSub}
            </div>
            <button class="btn-add-catalogo" style="flex-shrink:0; ${jaAdicionado ? 'background-color: var(--border-color); cursor: not-allowed;' : ''}" ${jaAdicionado ? 'disabled' : ''}>
              ${jaAdicionado ? 'Adicionado' : 'Adicionar'}
            </button>
          </div>
        `;

        row.querySelector('.btn-add-catalogo').onclick = () => {
          const sucesso = catalogoAtual === 'npcs' ? addNpcFromCatalogo(item) : addEstabFromCatalogo(item);
          if (sucesso) renderCatalogoList(searchInput.value);
        };

        modalList.appendChild(row);
      });
    }

    function abrirCatalogo(tipo) {
      catalogoAtual = tipo;
      modalTitle.textContent = tipo === 'npcs' ? "Catálogo de NPCs de Candeh'ssa" : "Catálogo de Estabelecimentos de Candeh'ssa";
      searchInput.value = '';
      renderCatalogoList();
      modal.style.display = 'flex';
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => renderCatalogoList(searchInput.value));
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }

    const btnSortearNpc = document.getElementById('sortearNpcCandehssa');
    if (btnSortearNpc) btnSortearNpc.addEventListener('click', sortearNpc);

    const btnSortearEstab = document.getElementById('sortearEstabCandehssa');
    if (btnSortearEstab) btnSortearEstab.addEventListener('click', sortearEstab);

    const btnSortearMissao = document.getElementById('sortearMissaoCandehssa');
    if (btnSortearMissao) btnSortearMissao.addEventListener('click', sortearMissao);

    const btnCatalogoNpcs = document.getElementById('abrirCatalogoNpcs');
    if (btnCatalogoNpcs) btnCatalogoNpcs.addEventListener('click', () => abrirCatalogo('npcs'));

    const btnCatalogoEstabs = document.getElementById('abrirCatalogoEstabs');
    if (btnCatalogoEstabs) btnCatalogoEstabs.addEventListener('click', () => abrirCatalogo('estabelecimentos'));

    return {};
  })();

  // Listeners
  document.getElementById('saveData').addEventListener('click', saveData);
  document.getElementById('loadData').addEventListener('change', loadData);
  document.getElementById('clearAllData').addEventListener('click', clearAllData);
  window.addEventListener('beforeunload', autoSaveToCache);

  // Monitorar Cliques para Autosave
  const container = document.querySelector('.main-container');
  if (container) {
    container.addEventListener('click', () => setTimeout(autoSaveToCache, 500));
  }

  // Carregamento inicial
  loadFromCache();

  // Modal overlay click to close
  const npcModal = document.getElementById('npc-modal');
  if (npcModal) {
    npcModal.addEventListener('click', (e) => {
      if (e.target === npcModal) npcModal.style.display = 'none';
    });
  }
});
