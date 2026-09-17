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
  // FUNÇÃO REUTILIZÁVEL DE SELEÇÃO DE IMAGEM (Upload ou URL)
  // =================================================================
  function openImageSourceDialog(callback) {
    const modal = document.getElementById('image-source-modal');
    const urlInput = document.getElementById('image-source-url');
    const fileInput = document.getElementById('image-source-file');

    urlInput.value = '';
    modal.style.display = 'flex';

    const cleanup = () => {
      modal.style.display = 'none';
      document.getElementById('image-source-upload-btn').onclick = null;
      document.getElementById('image-source-url-btn').onclick = null;
    };

    // Criar input de file dinamicamente
    document.getElementById('image-source-upload-btn').onclick = () => {
      const inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = 'image/*';
      inp.style.display = 'none';
      inp.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (re) => {
          cleanup();
          callback(re.target.result);
        };
        reader.readAsDataURL(file);
      };
      document.body.appendChild(inp);
      inp.click();
      document.body.removeChild(inp);
    };

    document.getElementById('image-source-url-btn').onclick = () => {
      const url = urlInput.value.trim();
      if (!url) { alert('Digite uma URL válida.'); return; }
      cleanup();
      callback(url);
    };

    modal.addEventListener('click', (e) => {
      if (e.target === modal) { cleanup(); }
    });
  }

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

  // Tiers oficiais de Pontos de Afinidade da aventura (Cordial 1-3, Leal 4-6, Íntimo 7),
  // usados para os NPCs Aliados de Candeh'ssa, cujos corações representam PA.
  function getTierCandehssa(hearts) {
    if (hearts >= 7) return 'intimo';
    if (hearts >= 4) return 'leal';
    if (hearts >= 1) return 'cordial';
    return null;
  }

  const TIER_LABELS = { cordial: 'Cordial (1-3 PA)', leal: 'Leal (4-6 PA)', intimo: 'Íntimo (7 PA)' };

  function getBonusAtualTexto(beneficios, hearts) {
    if (!beneficios) return null;
    const tier = getTierCandehssa(hearts);
    if (!tier || !beneficios[tier]) return 'Ainda sem bônus ativo (0 corações).';
    return `${TIER_LABELS[tier]}: ${beneficios[tier]}`;
  }

  // Extrai os trechos Cordial/Leal/Íntimo de um texto de bônus vindo do catálogo de Candeh'ssa.
  // Retorna null se o texto não seguir esse formato (bônus genérico, sem tiers).
  function parseBeneficiosPorTier(bonusTexto) {
    if (!bonusTexto) return null;
    const cordial = bonusTexto.match(/Cordial:\s*([\s\S]*?)(?=\s*Leal:|$)/);
    const leal = bonusTexto.match(/Leal:\s*([\s\S]*?)(?=\s*Íntimo:|$)/);
    const intimo = bonusTexto.match(/Íntimo:\s*([\s\S]*)$/);
    if (!cordial || !leal || !intimo) return null;
    return {
      cordial: cordial[1].trim(),
      leal: leal[1].trim(),
      intimo: intimo[1].trim()
    };
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

    const bonusRow = document.getElementById('npc-modal-bonus-row');
    const bonusSpan = document.getElementById('npc-modal-bonus');
    const bonusTexto = getBonusAtualTexto(npcData.beneficios, npcData.hearts);
    if (bonusTexto) {
      bonusRow.style.display = '';
      bonusSpan.textContent = bonusTexto;
    } else {
      bonusRow.style.display = 'none';
    }

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
    const playerList = document.getElementById('player-list');
    const addPlayerBtn = document.getElementById('addPlayer');
    const playerNameInput = document.getElementById('playerName');

    function createNpc(container, npcData = { name: '', hearts: 0, image: '', affinityText: '', beneficios: null }) {
      const npcContainer = document.createElement('div');
      npcContainer.classList.add('npc-item');
      if (npcData.image) npcContainer.style.backgroundImage = `url(${npcData.image})`;
      npcContainer.dataset.affinityText = npcData.affinityText || '';
      npcContainer.dataset.beneficios = npcData.beneficios ? JSON.stringify(npcData.beneficios) : '';

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
            image: npcData.image || '',
            beneficios: npcData.beneficios || null
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
                image: npcContainer.style.backgroundImage ? npcContainer.style.backgroundImage.slice(5, -2) : '',
                beneficios: npcContainer.dataset.beneficios ? JSON.parse(npcContainer.dataset.beneficios) : null
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

      const bonusAtualDisplay = document.createElement('p');
      bonusAtualDisplay.className = 'npc-bonus-atual';
      npcContainer.appendChild(bonusAtualDisplay);

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

        const beneficios = npcContainer.dataset.beneficios ? JSON.parse(npcContainer.dataset.beneficios) : null;
        const bonusTexto = getBonusAtualTexto(beneficios, currentHearts);
        if (bonusTexto) {
          bonusAtualDisplay.textContent = `🎁 ${bonusTexto}`;
          bonusAtualDisplay.style.display = '';
        } else {
          bonusAtualDisplay.style.display = 'none';
        }

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
        openImageSourceDialog((imgUrl) => {
          npcContainer.style.backgroundImage = `url(${imgUrl})`;
          autoSaveToCache();
        });
      });

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
      if (playerData.imagePos) {
        playerImgDiv.style.backgroundPosition = playerData.imagePos;
      }
      playerImgDiv.title = 'Clique para trocar imagem | Clique com botão direito para remover';
      playerImgDiv.onclick = (e) => {
        e.stopPropagation();
        if (playerImgDiv.style.backgroundImage && playerImgDiv.style.backgroundImage !== 'none') {
          const action = confirm('Imagem já definida. Deseja trocar?');
          if (!action) return;
        }
        openImageSourceDialog((imgUrl) => {
          playerImgDiv.style.backgroundImage = `url(${imgUrl})`;
          playerImgDiv.innerHTML = '';
          autoSaveToCache();
        });
      };
      playerImgDiv.oncontextmenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (playerImgDiv.style.backgroundImage && playerImgDiv.style.backgroundImage !== 'none') {
          if (confirm('Remover imagem do jogador?')) {
            playerImgDiv.style.backgroundImage = 'none';
            playerImgDiv.innerHTML = '<span class="player-img-placeholder">+</span>';
            playerImgDiv.style.backgroundPosition = 'center';
            autoSaveToCache();
          }
        }
      };

      const posControls = document.createElement('div');
      posControls.className = 'img-pos-controls';
      posControls.innerHTML = `
        <div style="display:flex; justify-content:center; gap:2px;">
          <button class="pos-btn" data-dir="up" title="Mover para cima">▲</button>
        </div>
        <div style="display:flex; justify-content:center; gap:2px;">
          <button class="pos-btn" data-dir="left" title="Mover para a esquerda">◀</button>
          <button class="pos-btn" data-dir="center" title="Centralizar">●</button>
          <button class="pos-btn" data-dir="right" title="Mover para a direita">▶</button>
        </div>
        <div style="display:flex; justify-content:center; gap:2px;">
          <button class="pos-btn" data-dir="down" title="Mover para baixo">▼</button>
        </div>
      `;
      posControls.style.display = 'none';
      playerImgDiv.appendChild(posControls);

      let posX = 50, posY = 50;
      if (playerData.imagePos) {
        const parts = playerData.imagePos.split(' ');
        posX = parseInt(parts[0]) || 50;
        posY = parseInt(parts[1]) || 50;
      }
      playerImgDiv.style.backgroundPosition = `${posX}% ${posY}%`;
      if (playerData.imagePos) {
        const parts = playerData.imagePos.split(' ');
        posX = parseInt(parts[0]) || 50;
        posY = parseInt(parts[1]) || 50;
      }

      playerImgDiv.addEventListener('mouseenter', () => {
        if (playerImgDiv.style.backgroundImage && playerImgDiv.style.backgroundImage !== 'none') {
          posControls.style.display = 'block';
        }
      });
      playerImgDiv.addEventListener('mouseleave', () => {
        posControls.style.display = 'none';
      });

      const updatePos = () => {
        playerImgDiv.style.backgroundPosition = `${posX}% ${posY}%`;
      };

      posControls.querySelectorAll('.pos-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const dir = btn.dataset.dir;
          if (dir === 'up') posY = Math.max(0, posY - 10);
          else if (dir === 'down') posY = Math.min(100, posY + 10);
          else if (dir === 'left') posX = Math.max(0, posX - 10);
          else if (dir === 'right') posX = Math.min(100, posX + 10);
          else if (dir === 'center') { posX = 50; posY = 50; }
          updatePos();
          autoSaveToCache();
        });
      });

      const playerTitle = document.createElement('h3');
      playerTitle.innerHTML = `${playerData.name} <span class="toggle-arrow">▼</span>`;

      playerTitle.addEventListener('click', () => {
        playerContainer.classList.toggle('collapsed');
      });

       playerHeader.appendChild(playerImgDiv);
      playerHeader.appendChild(playerTitle);

      const removePlayerBtn = document.createElement('button');
      removePlayerBtn.className = 'btn-remove-player';
      removePlayerBtn.innerText = '✕';
      removePlayerBtn.title = 'Remover jogador';
      removePlayerBtn.onclick = (e) => {
        e.stopPropagation();
        if (confirm(`Remover "${playerData.name}"?`)) {
          playerContainer.remove();
          autoSaveToCache();
        }
      };
      playerHeader.appendChild(removePlayerBtn);

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

          const removeNpcButton = document.createElement('button');
          removeNpcButton.className = 'btn-remove-npc';
          removeNpcButton.innerText = '✕';
          removeNpcButton.title = 'Remover NPC';
          removeNpcButton.onclick = (e) => {
            e.stopPropagation();
            if (confirm('Remover este NPC?')) {
              npcEntry.remove();
              autoSaveToCache();
            }
          };
          npcTrigger.appendChild(removeNpcButton);

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

        const removeNpcButton = document.createElement('button');
        removeNpcButton.className = 'btn-remove-npc';
        removeNpcButton.innerText = '✕';
        removeNpcButton.title = 'Remover NPC';
        removeNpcButton.onclick = (e) => {
          e.stopPropagation();
          if (confirm('Remover este NPC?')) {
            npcEntry.remove();
            autoSaveToCache();
          }
        };
        npcTrigger.appendChild(removeNpcButton);

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
        const allyDescFull = matched.querySelector('.npc-desc-text').textContent;
        const allyDescLines = allyDescFull.split('\n');
        const allyDesc = `${allyDescLines[0]}\n${allyDescLines.filter(l => l.startsWith('Local:')).join('\n')}`;
        const allyBonus = matched.querySelector('.npc-bonus-text').textContent;
        const allyImage = matched.querySelector('img').src;
        const isPlaceholder = allyImage === 'https://via.placeholder.com/150';

        const npcData = {
          name: allyName,
          hearts: 0,
          image: isPlaceholder ? '' : allyImage,
          affinityText: allyDesc,
          beneficios: parseBeneficiosPorTier(allyBonus)
        };

        const npcEntry = document.createElement('div');
        npcEntry.className = 'npc-entry';
        const npcTrigger = document.createElement('h5');
        npcTrigger.className = 'npc-trigger';
        npcTrigger.innerHTML = `<span class="npc-name">${npcData.name}</span> <span class="heart-count">(❤️ ${npcData.hearts}/7)</span>`;

        const removeNpcButton = document.createElement('button');
        removeNpcButton.className = 'btn-remove-npc';
        removeNpcButton.innerText = '✕';
        removeNpcButton.title = 'Remover NPC';
        removeNpcButton.onclick = (e) => {
          e.stopPropagation();
          if (confirm('Remover este NPC?')) {
            npcEntry.remove();
            autoSaveToCache();
          }
        };
        npcTrigger.appendChild(removeNpcButton);

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
          const beneficios = npc.dataset.beneficios ? JSON.parse(npc.dataset.beneficios) : null;
          npcs.push({ name: npcName, hearts: npcHearts, image: imageUrl, affinityText: affinityText, beneficios: beneficios });
        });
        const imgDiv = player.querySelector('.player-image');
        let playerImage = '';
        let playerImagePos = 'center';
        if (imgDiv && imgDiv.style.backgroundImage && imgDiv.style.backgroundImage !== 'none') {
          playerImage = imgDiv.style.backgroundImage.slice(5, -2);
          playerImagePos = imgDiv.style.backgroundPosition || 'center';
        }
        data.push({ name: playerName, npcs, image: playerImage, imagePos: playerImagePos });
      });
      return data;
    }

     function loadSaveData(data) {
       playerList.innerHTML = '';
       playerCount = 0;
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
          <button class="btn-img-estab-x" title="Adicionar Imagem">🖼️</button>
          <button class="btn-remove-estab-x" title="Remover">✕</button>
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
          </div>
        </div>
      `;

      card.querySelector('img').onclick = () => card.classList.toggle('collapsed');

      // Botão de imagem no canto superior esquerdo
      card.querySelector('.btn-img-estab-x').onclick = (e) => {
        e.stopPropagation();
        openImageSourceDialog((imgUrl) => {
          card.querySelector('img').src = imgUrl;
          estabData.imagem = imgUrl;
          autoSaveToCache();
        });
      };

      // Botão de remoção no canto superior direito
      card.querySelector('.btn-remove-estab-x').onclick = (e) => {
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
            <button class="btn-img-ally-x" title="Adicionar Imagem">🖼️</button>
            <h5 style="pointer-events: none;">${npcData.name || 'Novo Aliado'}</h5>
            <button class="btn-remove-ally-x" title="Remover aliado">✕</button>
        </div>
        <div class="solicitante-collapsible-content" style="padding: 10px;">
            <p><strong>Descrição:</strong> <span class="npc-desc-text">${npcData.desc || 'Clique para editar'}</span></p>
            <div class="honrarias revealed" style="background-color: rgba(76, 175, 80, 0.1); border-left-color: var(--success-color);">
                <p><strong>Bônus:</strong> <span class="npc-bonus-text">${npcData.bonus || 'Clique para editar'}</span></p>
            </div>
            <div class="npc-actions" style="margin-top: 10px; display: flex; gap: 5px;">
                <button class="btn-edit-ally" style="font-size: 0.7rem;">Editar</button>
            </div>
        </div>
    `;

    // Evento para expandir/recolher ao clicar na imagem
    card.querySelector('img').onclick = () => card.classList.toggle('collapsed');
    // Botão de imagem no canto superior esquerdo
    card.querySelector('.btn-img-ally-x').onclick = (e) => {
      e.stopPropagation();
      openImageSourceDialog((imgUrl) => {
        card.querySelector('img').src = imgUrl;
        autoSaveToCache();
      });
    };

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

    card.querySelector('.btn-remove-ally-x').onclick = (e) => {
      e.stopPropagation();
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
        row.className = 'catalogo-item';
        row.style.cursor = 'default';

        const linhaSub = catalogoAtual === 'npcs'
          ? `<p style="margin:4px 0;"><strong>Local:</strong> ${item.estabelecimento}</p>
             <p style="margin:4px 0; font-size:0.9rem;">${item.descricao}</p>`
          : `<p style="margin:4px 0;"><strong>Serviços:</strong> ${item.resumo}</p>
             <p style="margin:4px 0; font-size:0.9rem;">${item.descricao}</p>`;

        row.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px;">
            <div>
              <h5 style="margin:0 0 5px 0;">${item.nome}</h5>
              ${linhaSub}
            </div>
            <button class="btn-add-catalogo" ${jaAdicionado ? 'disabled' : ''}>
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

  // =================================================================
  // DADOS DE EXEMPLO (seed inicial)
  // =================================================================
  function seedDefaultData() {
    // NPCs de Jogadores de exemplo
    const npcSeed = [
      {
        name: "Triunvirato",
        image: "https://cdn.creazilla.com/cliparts/7937698/minotaur-clipart-xl.png",
        npcs: [
          { name: "Ash, o Caçador", hearts: 4, image: "", affinityText: "Caçador elfo, especialista em rastreio e armadilhas." },
          { name: "Kira, a Maga", hearts: 3, image: "", affinityText: "Maga humana, estudiosa de runas antigas." },
          { name: "Thorn, o Guerreiro", hearts: 5, image: "", affinityText: "Guerreiro anão, escudeiro implacável." }
        ]
      },
      {
        name: "Solitários",
        image: "",
        npcs: [
          { name: "Lira, a Bardana", hearts: 2, image: "", affinityText: "Barda elfa, sempre coletando histórias na taverna." }
        ]
      }
    ];
    npcModule.loadSaveData(npcSeed);

    // NPCs Aliados de exemplo
    const alliesSeed = [
      { name: "Mestre Aurélio", desc: "Sábio ancião que conhece os segredos de Candeh'ssa.", bonus: "+2 em testes de Conhecimento", image: "https://preview.redd.it/hohenheim-as-the-archetype-of-the-wise-old-man-v0-o5udiiestt391.jpg" },
      { name: "Irmãs do Destino", desc: "Duas irmãs gêmeas que operam a casa de banho.", bonus: "Cura +1d6 por descanso", image: "" },
      { name: "Corvo Noturno", desc: "Informante misterioso que frequenta a taverna.", bonus: "+1 dado em testes de Investigação", image: "" }
    ];
    alliesSeed.forEach(ally => createAllyNpc(ally));

    // Estabelecimentos de exemplo
    const estabSeed = [
      {
        nome: "Casa de Banho",
        imagem: "images/casa_de_banho.png",
        descricao: "Um local sereno de águas termais mágicas para purificação e cura dos heróis.",
        servicos: "Recuperação completa de PV e PM por descanso.",
        honrarias: "Banho Abençoado (Cura extra e bônus em testes de Vontade)",
        honrariasReveladas: false
      },
      {
        nome: "Taverna do Corvo",
        imagem: "images/taverna_corvo.png",
        descricao: "A taverna local, ponto central de boatos, fofocas e contratação de mercenários.",
        servicos: "Obtenção de boatos sobre as masmorras e contratação de aliados temporários.",
        honrarias: "Cliente VIP (Desconto em serviços e aliados)",
        honrariasReveladas: false
      },
      {
        nome: "Templo de Valkaria",
        imagem: "images/templo_valkaria.png",
        descricao: "Um suntuoso templo erguido em devoção à Deusa da Ambição e da Humanidade.",
        servicos: "Remoção de condições negativas, maldições e ressurreição.",
        honrarias: "Bênção da Ambição (+1 em testes de ataque e Defesa)",
        honrariasReveladas: false
      },
      {
        nome: "Laboratório Alquímico",
        imagem: "images/laboratorio_alquimico.png",
        descricao: "Oficina repleta de frascos borbulhantes controlada por alquimistas excêntricos.",
        servicos: "Compra e identificação de poções, elixires e itens alquímicos.",
        honrarias: "Desconto em Alquímicos (20% de desconto em poções)",
        honrariasReveladas: false
      }
    ];
    estabelecimentosModule.loadSaveData(estabSeed);

    // Missões customizáveis de exemplo
    const missionSeed = [
      { nome: "O Ritual Perdido", descricao: "Encontrar os 3 fragmentos do antigo ritual nas masmorras ao norte.", recompensa: "Poção da Vitalidade + 200 PE", completa: false },
      { nome: "A Coroa de Gelo", descricao: "Recuperar a coroa do Rei de Gelo na câmara 13 da Masmorra Glacial.", recompensa: "Arma Mágica Menor + 500 PE", completa: false },
      { nome: "O Sumiço de Bartholomeu", descricao: "O ferreiro Bartholomeu desapareceu há 3 dias. Investigar a mina abandonada.", recompensa: "Armadura Reforçada + Favor da Guilda", completa: true }
    ];
    missoesCustomModule.loadSaveData(missionSeed);

    autoSaveToCache();
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
