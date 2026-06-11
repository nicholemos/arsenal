// ═══════════════════════════════════════════════════════
//  Arsenal VTT — lógica principal
// ═══════════════════════════════════════════════════════


// Alias para compatibilidade com funções do Arsenal original
function mostrarToast(msg, tipo) { toast(msg); }
// ──── Estado P2P ────
let peer = null, myName = '', myRole = '', roomId = '', roomTitle = '';
let connections = {}, masterConn = null, players = {}, myPeerId = '';
let localFichaUpdateData = null;
const tokenImageCache = {};
let giphyApiKey = localStorage.getItem('giphy_api_key') || 'TlBoc67SNv0OTVPkfjUofJzuaiQ04MQ2';

const STORAGE_KEY = 't20_combat_app_v1';
let t20ThreatImagesCache = {};
let isBoardInitialized = false;

function reloadThreatImagesCache() {
  try {
    t20ThreatImagesCache = JSON.parse(localStorage.getItem('t20_threat_images')) || {};
  } catch (e) {
    t20ThreatImagesCache = {};
  }
  if (isBoardInitialized && typeof boardRender === 'function') {
    boardRender();
  }
}
window.addEventListener('focus', reloadThreatImagesCache);
window.addEventListener('DOMContentLoaded', reloadThreatImagesCache);
reloadThreatImagesCache();


// ──── Estado Encontros ────
let encDiasSemEncontro = 0;
let encPatamarAjuste = 0;
let encCurrentThreats = [];

// ──── Estado Combate ────
let currentThreatData = null;

// ══════════════════════════════════════════════════════
//  UTILITÁRIOS
// ══════════════════════════════════════════════════════
function toast(msg, dur=2500) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
}
function formatTime() {
  const d = new Date();
  return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0');
}
function escHTML(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function gerarRoomId() {
  const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let id='';
  for(let i=0;i<8;i++) id+=c[Math.floor(Math.random()*c.length)];
  return id;
}
function formatTime2() {
  const d=new Date();
  return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')+':'+String(d.getSeconds()).padStart(2,'0');
}

// ══════════════════════════════════════════════════════
//  TABS DO PAINEL MESTRE
// ══════════════════════════════════════════════════════
function switchTab(name) {
  ['encontros','combate'].forEach(t => {
    document.getElementById('tab-'+t)?.classList.toggle('active', t===name);
    document.getElementById('content-'+t)?.classList.toggle('active', t===name);
  });
}

// ══════════════════════════════════════════════════════
//  CHAT
// ══════════════════════════════════════════════════════
function formatChatText(s) {
  let escaped = escHTML(s);
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  escaped = escaped.replace(/_(.*?)_/g, '<em>$1</em>');
  escaped = escaped.replace(/\n/g, '<br>');
  return escaped;
}

function addMsg(data) {
  const c = document.getElementById('chat-messages');
  const div = document.createElement('div');
  if (data.type==='system') {
    div.className='msg-system'; div.textContent='— '+data.text+' —';
  } else if (data.type==='roll') {
    div.className='msg msg-roll';
    div.innerHTML=`<div class="msg-header"><span class="msg-author ${data.role==='jogador'?'jogador':''}">${escHTML(data.name)}</span><span class="msg-time">${data.time}</span></div><div class="msg-text">🎲 ${formatChatText(data.text)}</div>`;
  } else if (data.type==='combat-sync-notify') {
    div.className='msg msg-combat';
    div.innerHTML=`<div class="msg-text">⚔ ${formatChatText(data.text)}</div>`;
  } else if (data.type==='gif') {
    div.className='msg msg-gif';
    div.innerHTML=`<div class="msg-header"><span class="msg-author ${data.role==='jogador'?'jogador':''}">${escHTML(data.name)}</span><span class="msg-time">${data.time}</span></div><div class="msg-text"><img src="${escHTML(data.gifUrl)}" alt="GIF"></div>`;
  } else {
    div.className='msg';
    div.innerHTML=`<div class="msg-header"><span class="msg-author ${data.role==='jogador'?'jogador':''}">${escHTML(data.name)}</span><span class="msg-time">${data.time}</span></div><div class="msg-text">${formatChatText(data.text)}</div>`;
  }
  c.appendChild(div); c.scrollTop=c.scrollHeight;
}
// ──── Histórico de Comandos do Chat ────
let commandHistory = [];
let historyIndex = -1;
let currentDraft = '';

function adicionarAoHistorico(cmd) {
  const text = cmd.trim(); if (!text) return;
  if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== text) {
    commandHistory.push(text);
    if (commandHistory.length > 50) commandHistory.shift();
  }
  historyIndex = -1;
  currentDraft = '';
}

function navegarHistorico(dir) {
  if (commandHistory.length === 0) return;
  const inp = document.getElementById('chat-input');
  if (!inp) return;

  // Se não começou a navegar, salva o rascunho atual
  if (historyIndex === -1) {
    currentDraft = inp.value;
    historyIndex = commandHistory.length;
  }

  if (dir === -1) { // Para cima (anterior)
    if (historyIndex > 0) {
      historyIndex--;
      inp.value = commandHistory[historyIndex];
    }
  } else if (dir === 1) { // Para baixo (próximo)
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      inp.value = commandHistory[historyIndex];
    } else if (historyIndex === commandHistory.length - 1) {
      historyIndex = -1; // Volta ao draft
      inp.value = currentDraft;
    }
  }
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    enviarMsg();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    navegarHistorico(-1);
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    navegarHistorico(1);
  }
}

function enviarMsg() {
  const inp = document.getElementById('chat-input');
  const text = inp.value.trim(); if(!text) return; inp.value='';

  adicionarAoHistorico(text);

  let msgData;
  if (text.toLowerCase().startsWith('/r ')) {
    const res = parseRoll(text.toLowerCase());
    if (res) msgData={type:'roll',name:myName,role:myRole,text:res,time:formatTime()};
    else { addMsg({type:'system',text:'Sintaxe: /r 2d6 ou /r d20+3'}); return; }
  } else {
    msgData={type:'chat',name:myName,role:myRole,text,time:formatTime()};
  }
  addMsg(msgData);
  if(myRole==='mestre') broadcast(msgData,null);
  else if(masterConn) try{masterConn.send(msgData);}catch(e){}

  // ── Detect initiative rolls from chat command ──
  if (msgData.type === 'roll' && isInitiativeRoll(text)) {
    const initTotal = extractInitiativeTotal(msgData.text);
    if (initTotal !== null) {
      if (myRole === 'mestre') {
        processarIniciativaRoll(myName, initTotal, myPeerId);
      } else if (masterConn) {
        const selToken = getSelectedTokenForInit();
        if (!selToken) {
          toast('Selecione seu token no mapa para rolar iniciativa.');
        } else {
          try {
            masterConn.send({
              type: 'solicitar-iniciativa',
              name: selToken.tokenName,
              initTotal: initTotal,
              tokenId: selToken.tokenId
            });
          } catch(err) {}
        }
      }
    }
  }
}
function parseRoll(cmd) {
  const m=cmd.match(/^\/r\s+(?:(.*?)(?::|-)\s*)?(\d*)d(\d+)([+-]\d+)?$/i); if(!m) return null;
  const label=m[1] ? m[1].trim() + ': ' : '';
  const qtd=parseInt(m[2]||'1'),faces=parseInt(m[3]),mod=parseInt(m[4]||'0');
  if(qtd<1||qtd>20||faces<2||faces>100) return null;
  let rolls=[],total=0;
  for(let i=0;i<qtd;i++){const r=Math.floor(Math.random()*faces)+1;rolls.push(r);total+=r;}
  total+=mod;
  const ms=mod!==0?(mod>0?'+'+mod:mod):'';
  const det=qtd>1?` [${rolls.join(', ')}]`:'';
  return `${label}${qtd}d${faces}${ms} → **${total}**${det}`;
}

// ══════════════════════════════════════════════════════
//  GIPHY GIF SEARCH & SENDING
// ══════════════════════════════════════════════════════
function abrirGifPicker() {
  const picker = document.getElementById('gifPicker');
  if (!picker) return;
  const isOpen = picker.classList.contains('open');
  if (isOpen) {
    fecharGifPicker();
    return;
  }
  picker.classList.add('open');
  const keyInput = document.getElementById('gifApiKey');
  if (keyInput) {
    keyInput.value = giphyApiKey;
  }
  const searchInput = document.getElementById('gifSearchInput');
  if (searchInput) {
    searchInput.focus();
  }
}
function fecharGifPicker() {
  const picker = document.getElementById('gifPicker');
  if (picker) picker.classList.remove('open');
}
function salvarGiphyKey(val) {
  const key = val.trim();
  giphyApiKey = key || 'TlBoc67SNv0OTVPkfjUofJzuaiQ04MQ2';
  localStorage.setItem('giphy_api_key', key);
  toast('Chave Giphy atualizada!');
}
function gifSearchKey(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    buscarGifs();
  }
}
async function buscarGifs() {
  const searchInput = document.getElementById('gifSearchInput');
  const term = searchInput ? searchInput.value.trim() : '';
  if (!term) return;
  const grid = document.getElementById('gifGrid');
  const loading = document.getElementById('gifLoading');
  if (grid) grid.innerHTML = '';
  if (loading) loading.style.display = 'block';
  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${encodeURIComponent(giphyApiKey)}&q=${encodeURIComponent(term)}&limit=15&rating=g&lang=pt`;
    const response = await fetch(url);
    const data = await response.json();
    if (loading) loading.style.display = 'none';
    if (!grid) return;
    if (data.data && data.data.length > 0) {
      data.data.forEach(gif => {
        const gifUrl = gif.images.fixed_height_small?.url || gif.images.fixed_height?.url || gif.images.original?.url;
        const chatGifUrl = gif.images.fixed_height?.url || gif.images.original?.url;
        if (gifUrl) {
          const img = document.createElement('img');
          img.className = 'gif-item';
          img.src = gifUrl;
          img.alt = gif.title || 'GIF';
          img.onclick = () => {
            enviarGif(chatGifUrl);
            fecharGifPicker();
          };
          grid.appendChild(img);
        }
      });
    } else {
      grid.innerHTML = '<div class="gif-empty">Nenhum GIF encontrado</div>';
    }
  } catch (e) {
    console.error('Erro ao buscar GIFs:', e);
    if (loading) loading.style.display = 'none';
    if (grid) {
      grid.innerHTML = '<div class="gif-empty" style="color: #ff6b6b;">Erro de conexão ou chave inválida.</div>';
    }
  }
}
function enviarGif(gifUrl) {
  if (!gifUrl) return;
  const msgData = {
    type: 'gif',
    name: myName,
    role: myRole,
    gifUrl: gifUrl,
    time: formatTime()
  };
  addMsg(msgData);
  if (myRole === 'mestre') {
    broadcast(msgData, null);
  } else if (masterConn) {
    try {
      masterConn.send(msgData);
    } catch (e) {
      console.error('Erro ao enviar GIF para o mestre:', e);
    }
  }
}

// ══════════════════════════════════════════════════════
//  P2P
// ══════════════════════════════════════════════════════
function renderPlayers() {
  const list = document.getElementById('players-list'); list.innerHTML='';
  Object.entries(players).forEach(([pid,p]) => {
    const d=document.createElement('div'); d.className='player-entry';
    d.innerHTML=`<div class="dot ${pid===myPeerId?'self':''}"></div><div class="name">${escHTML(p.name)}</div><div class="tag">${p.role==='mestre'?'M':'J'}</div>`;
    list.appendChild(d);
  });
}
function broadcast(data, excludePeer) {
  Object.entries(connections).forEach(([pid,conn]) => {
    if(pid!==excludePeer) try{conn.send(data);}catch(e){}
  });
}
function criarSala() {
  const name=document.getElementById('master-name').value.trim();
  if(!name){setLobbyStatus('create','Digite seu nome, ó Mestre.',true);return;}
  myName=name; myRole='mestre';
  roomTitle=document.getElementById('room-name').value.trim()||'Mesa de '+name;
  roomId=gerarRoomId();
  setLobbyStatus('create','Abrindo a mesa...');
  peer=new Peer('vtt-room-'+roomId,{debug:0});
  peer.on('open',(id)=>{
    myPeerId=id; players[myPeerId]={name:myName,role:'mestre'};
    entrarNoAmbiente(); renderPlayers();
    addMsg({type:'system',text:'Mesa aberta. Aguardando aventureiros...'});
  });
  peer.on('connection',(conn)=>configurarConexaoMestre(conn));
  peer.on('error',(err)=>{
    if(err.type==='unavailable-id'){roomId=gerarRoomId();peer.destroy();criarSala();}
    else setLobbyStatus('create','Erro: '+err.message,true);
  });
}
function configurarConexaoMestre(conn) {
  conn.on('open',()=>{
    connections[conn.peer]=conn;
    conn.on('data',(data)=>{
      if(data.type==='join'){
        players[conn.peer]={name:data.name,role:'jogador'}; renderPlayers();
        conn.send({type:'room-info',roomTitle,players});
        broadcast({type:'player-joined',peerId:conn.peer,name:data.name},conn.peer);
        const jm={type:'system',text:data.name+' entrou na mesa'};
        addMsg(jm); broadcast({type:'chat',...jm},null);
        broadcast({type:'players-update',players},null);
      } else if(data.type==='chat'||data.type==='roll'||data.type==='gif'){
        addMsg(data); broadcast(data,conn.peer);
      } else if(data.type==='leave'){
        const n=players[conn.peer]?.name||'Alguém';
        delete players[conn.peer]; delete connections[conn.peer]; renderPlayers();
        const lm={type:'system',text:n+' saiu da mesa'};
        addMsg(lm); broadcast({type:'chat',...lm},null);
        broadcast({type:'players-update',players},null);
      }
    });
    conn.on('close',()=>{
      if(players[conn.peer]){
        const n=players[conn.peer].name;
        delete players[conn.peer]; delete connections[conn.peer]; renderPlayers();
        const lm={type:'system',text:n+' desconectou'};
        addMsg(lm); broadcast({type:'chat',...lm},null);
        broadcast({type:'players-update',players},null);
      }
    });
  });
}
function entrarSala() {
  const name=document.getElementById('player-name').value.trim();
  let code=document.getElementById('room-code').value.trim();
  if(!name){setLobbyStatus('join','Como você se chama?',true);return;}
  const match=code.match(/[?&]sala=([A-Z0-9]{8})/);
  if(match) code=match[1];
  code=code.replace(/[^A-Z0-9]/gi,'').toUpperCase().slice(0,8);
  if(code.length!==8){setLobbyStatus('join','Código inválido.',true);return;}
  myName=name; myRole='jogador'; roomId=code;
  setLobbyStatus('join','Buscando a mesa...');
  peer=new Peer(undefined,{debug:0});
  peer.on('open',(id)=>{
    myPeerId=id;
    masterConn=peer.connect('vtt-room-'+roomId,{reliable:true,metadata:{name}});
    masterConn.on('open',()=>{
      masterConn.send({type:'join',name});
      masterConn.on('data',(data)=>{
        if(data.type==='room-info'){
          roomTitle=data.roomTitle; players=data.players;
          entrarNoAmbiente(); renderPlayers();
          addMsg({type:'system',text:'Você entrou em "'+roomTitle+'"'});
        } else if(data.type==='player-joined') addMsg({type:'system',text:data.name+' entrou na mesa'});
        else if(data.type==='players-update'){players=data.players;renderPlayers();}
        else if(data.type==='chat'||data.type==='roll'||data.type==='gif') addMsg(data);
        else if(data.type==='combat-sync') { receberSyncCombate(data.state); }
        else if(data.type==='combat-sync-notify') addMsg(data);
      });
      masterConn.on('close',()=>addMsg({type:'system',text:'Conexão com o Mestre perdida.'}));
    });
    masterConn.on('error',()=>setLobbyStatus('join','Não foi possível conectar.',true));
  });
  peer.on('error',(e)=>setLobbyStatus('join','Erro: '+(e.type||e.message),true));
}
function entrarNoAmbiente() {
  document.getElementById('lobby').style.display='none';
  document.getElementById('room').classList.add('active');
  document.getElementById('room-title-text').textContent=roomTitle||'Mesa Virtual';
  document.getElementById('display-room-id').textContent=roomId;
  const b=document.getElementById('role-badge');
  b.textContent=myRole==='mestre'?'Mestre':'Jogador';
  b.className='role-badge role-'+myRole;
  if(myRole==='mestre'){
    document.getElementById('invite-area').style.display='block';
    document.getElementById('invite-link-box').textContent=gerarLinkConvite();
    document.getElementById('master-panel').style.display='flex';
    initMasterTools();
  } else {
    document.getElementById('btn-convidar').style.display='none';
    document.getElementById('master-panel').style.display='none';
  }
}
function gerarLinkConvite(){return window.location.href.split('?')[0].split('#')[0]+'?sala='+roomId;}
function copiarConvite(){navigator.clipboard.writeText(gerarLinkConvite()).then(()=>toast('Link copiado!'));}
function copiarCodigo(){navigator.clipboard.writeText(roomId).then(()=>toast('Código copiado!'));}
function convidarJogador(){
  const link=gerarLinkConvite();
  const text='Você foi convidado para "'+roomTitle+'"!\n\nEntre em: '+link+'\n\nOu use o código: '+roomId;
  if(navigator.share) navigator.share({title:'Arsenal VTT',text,url:link}).catch(()=>{});
  else navigator.clipboard.writeText(text).then(()=>toast('Convite copiado!'));
}
function sairSala(){
  if(myRole==='jogador'&&masterConn) try{masterConn.send({type:'leave',name:myName});}catch(e){}
  if(peer) peer.destroy(); location.reload();
}
function setLobbyStatus(panel,msg,isError=false){
  const el=document.getElementById(panel+'-status');
  if(el){el.textContent=msg;el.className='status-msg'+(isError?' error':'');}
}

// ══════════════════════════════════════════════════════
//  SINCRONIZAÇÃO DE COMBATE P2P
// ══════════════════════════════════════════════════════
function syncCombatToPlayers() {
  if(myRole!=='mestre') return;
  const payload={type:'combat-sync',state:JSON.parse(JSON.stringify(combatState))};
  broadcast(payload,null);
  const notify={type:'combat-sync-notify',text:'Mestre sincronizou o combate com a mesa.'};
  broadcast(notify,null);
  addMsg(notify);
  showInitTracker();
  document.getElementById('sync-badge').textContent='✓ Sync';
  document.getElementById('sync-badge').classList.add('synced');
  setTimeout(()=>{document.getElementById('sync-badge').classList.remove('synced');document.getElementById('sync-badge').textContent='—';},3000);
  toast('⚔ Combate sincronizado com os jogadores!');
}
function receberSyncCombate(state) {
  combatState=state;
  showInitTracker();
  addMsg({type:'combat-sync-notify',text:'Combate atualizado pelo Mestre — Rodada '+state.round+', vez de '+getCombatActiveName(state)});
  renderInitTracker();
}
function getCombatActiveName(state){
  const c=(state.combatants||[]).find(x=>x.id===state.activeId);
  return c?c.name:'—';
}

// ══════════════════════════════════════════════════════
//  FLOATING INITIATIVE TRACKER
// ══════════════════════════════════════════════════════
function showInitTracker() {
  const el = document.getElementById('initTracker');
  if (!el) return;
  el.classList.remove('hidden');
  delete el.dataset.userCollapsed;
}
function hideInitTracker() {
  const el = document.getElementById('initTracker');
  if (!el) return;
  el.classList.add('hidden');
}
function toggleInitTracker() {
  const el = document.getElementById('initTracker');
  if (!el) return;
  el.classList.toggle('collapsed');
  // Track manual collapse so auto-expand won't override the user's choice
  if (el.classList.contains('collapsed')) {
    el.dataset.userCollapsed = '1';
  } else {
    delete el.dataset.userCollapsed;
  }
}

function renderInitTracker() {
  const tracker = document.getElementById('initTracker');
  if (!tracker) return;
  const list = document.getElementById('initTrackerList');
  const empty = document.getElementById('initTrackerEmpty');
  const roundEl = document.getElementById('initTrackerRound');
  if (!list || !empty) return;

  if (!combatState || !combatState.combatants || combatState.combatants.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
    if (roundEl) roundEl.textContent = '';
    return;
  }

  empty.style.display = 'none';
  if (roundEl) roundEl.textContent = 'R' + (combatState.round || 1);

  const isMestre = (typeof myRole !== 'undefined' && myRole === 'mestre');

  list.innerHTML = combatState.combatants.map(c => {
    const isActive = c.id === combatState.activeId;
    const isDead = (parseInt(c.hpCur) || 0) <= 0;
    const init = parseInt(c.init) || 0;
    const hpCur = parseInt(c.hpCur) || 0;
    const hpMax = parseInt(c.hpMax) || 0;
    const classes = [''];
    if (isActive) classes.push('active-init');
    if (isDead) classes.push('init-dead');
    const hpText = isMestre ? `${hpCur}/${hpMax}` : '';
    return `<li class="${classes.join(' ').trim()}">`
      + `<span class="init-val">${init}</span>`
      + `<span class="init-name" title="${escHTML(c.name)}">${escHTML(c.name)}</span>`
      + (hpText ? `<span class="init-hp">${hpText}</span>` : '')
      + `</li>`;
  }).join('');

  // Auto-expand when there are combatants
  if (tracker.classList.contains('collapsed') && combatState.combatants.length > 0) {
    // Keep collapsed if user collapsed it manually — only auto-open on first data
    if (!tracker.dataset.userCollapsed) {
      tracker.classList.remove('collapsed');
    }
  }
}

// ══════════════════════════════════════════════════════
//  INITIATIVE ROLL DETECTION & COMBAT INTEGRATION
// ══════════════════════════════════════════════════════

// Extract total from roll text patterns like "→ **15**" or "→ 15"
function extractInitiativeTotal(text) {
  // Pattern from parseRoll: "Rola Iniciativa: 1d20+3 → **15**"
  // Pattern from ficha: "Rola Iniciativa: 1d20+3 → **15** [12]"
  const m = text.match(/→\s*\*?\*?(\d+)\*?\*?/);
  return m ? parseInt(m[1]) : null;
}

// Check if a roll text is an initiative roll
function isInitiativeRoll(text) {
  if (!text) return false;
  const lower = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return lower.includes('iniciativa');
}

// Get the player's selected token (for initiative binding)
// Returns { tokenId, tokenName } or null if no token selected
function getSelectedTokenForInit() {
  if (typeof BOARD === 'undefined' || !BOARD.selectedTokens || BOARD.selectedTokens.size === 0) return null;
  // Use the first selected token
  const tokenId = BOARD.selectedTokens.values().next().value;
  const token = BOARD.tokens.find(t => t.id === tokenId);
  if (!token) return null;
  return { tokenId: token.id, tokenName: token.name || 'Token' };
}

// Process an initiative roll — adds or updates the combatant in combatState
// Called on the MASTER side only
function processarIniciativaRoll(playerName, initTotal, peerId) {
  if (!combatState) combatState = combatDefaultState();

  // Check if this player already has a combatant entry
  let existing = combatState.combatants.find(c => c.controlledBy === peerId);
  if (existing) {
    existing.init = initTotal;
    existing.name = playerName; // update name in case it changed
    combatLogAdd(`🎲 ${playerName} atualizou iniciativa: ${initTotal}`);
  } else {
    // Look for HP info from fichasJogadores
    let hp = 0;
    let imgUrl = '';
    const entry = fichasJogadores[peerId];
    if (entry && entry.resumo) {
      hp = entry.resumo.pvM || 0;
      imgUrl = entry.resumo.charImage || '';
    }
    const id = 'c' + Date.now() + Math.floor(Math.random() * 99999);
    combatState.combatants.push({
      id,
      name: playerName,
      init: initTotal,
      hpCur: parseInt(hp) || 0,
      hpMax: parseInt(hp) || 0,
      mpCur: 0,
      mpMax: 0,
      notes: '',
      conditions: [],
      stats: { def: '', res: '', cd: '' },
      open: false,
      imageUrl: imgUrl,
      controlledBy: peerId
    });
    if (!combatState.activeId) combatState.activeId = id;
    combatLogAdd(`🎲 ${playerName} entrou no combate com iniciativa ${initTotal}`);
  }

  // Sort by initiative if autoSort is on
  if (combatState.autoSort) {
    combatState.combatants.sort((a, b) => (parseInt(b.init) || 0) - (parseInt(a.init) || 0));
  }

  combatSave();
  combatRender();
  toast(`⚔ ${playerName} rolou iniciativa: ${initTotal}`);

  // Auto-sync to players
  syncCombatToPlayers();
}

// ══════════════════════════════════════════════════════
//  ENCONTROS ALEATÓRIOS
// ══════════════════════════════════════════════════════
function initMasterTools() {
  // Popula select de terrenos
  const sel = document.getElementById('enc-terreno');
  sel.innerHTML = '';
  Object.keys(terrenos).forEach(t => {
    const opt=document.createElement('option'); opt.value=t; opt.textContent=t; sel.appendChild(opt);
  });
  // Init combate
  combatInit();
  // Datalist bestiário
  initDbAutocomplete();
  // Renderiza fichas do mestre (se houver)
  renderMasterFichas();
}
function avancarDia(){
  encDiasSemEncontro++;
  updateViagemUI();
  addMsg({type:'system',text:'☀ Viagem avança. Dia '+encDiasSemEncontro+' — Chance: '+(5+encDiasSemEncontro*5)+'%'});
}
function resetarViagem(){
  if(!confirm('Resetar diário de viagem para o Dia 0?')) return;
  encDiasSemEncontro=0; updateViagemUI();
  addMsg({type:'system',text:'⟳ Diário reiniciado para o Dia 0.'});
}
function updateViagemUI(){
  document.getElementById('viagem-dia').textContent=encDiasSemEncontro;
  document.getElementById('viagem-chance').textContent=(5+encDiasSemEncontro*5)+'%';
}
function testarSorte(){
  const chance=5+encDiasSemEncontro*5;
  const roll=Math.floor(Math.random()*100)+1;
  if(roll<=chance){
    encDiasSemEncontro=0; updateViagemUI();
    addMsg({type:'system',text:'⚠ Perigo! Rolou '+roll+' contra '+chance+'% — encontro!'});
    gerarEncontro();
  } else {
    encDiasSemEncontro++; updateViagemUI();
    addMsg({type:'system',text:'☀ Dia pacífico ('+roll+' vs '+chance+'%). Dia '+encDiasSemEncontro+' acumulado.'});
  }
}
function selecionarPatamar(el, ajuste) {
  document.querySelectorAll('.patamar-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active'); encPatamarAjuste=ajuste;
}
function encontrarResultadoTerreno(terreno, rolagem) {
  if(!terrenos||!terrenos[terreno]) return null;
  for(const e of terrenos[terreno]) { if(rolagem<=e.porcentagem) return e; }
  const list=terrenos[terreno]; return list[list.length-1];
}
function gerarEncontro() {
  let rnd=Math.floor(Math.random()*100)+1;
  if(rnd===100&&Math.floor(Math.random()*100)+1<=25){
    mostrarResultadoEncontro(100,{descricao:'O Rhandomm',pag:'Ameaças, pag. 113'});
    toast('👹 Evento Lendário: O Rhandomm!');return;
  }
  const final=rnd+encPatamarAjuste;
  const terreno=document.getElementById('enc-terreno').value;
  const res=encontrarResultadoTerreno(terreno,final);
  mostrarResultadoEncontro(final,res,terreno);
}
function mostrarResultadoEncontro(roll, res, terreno) {
  const box=document.getElementById('enc-result-box');
  if(!res){box.innerHTML='<div style="font-size:0.82rem;color:var(--text-muted);font-style:italic;text-align:center;">Sem resultado para esta rolagem.</div>';return;}
  box.innerHTML=`
    <div class="enc-result-roll">Rolagem: ${roll} ${terreno?'| '+terreno:''}</div>
    <div class="enc-result-desc">${escHTML(res.descricao)}</div>
    ${res.pag?`<div class="enc-result-pag">📖 ${escHTML(res.pag)}</div>`:''}
  `;
  // Detectar ameaças
  const threats=findThreatsInDescription(res.descricao);
  encCurrentThreats=threats;
  renderThreatMiniCards(threats);
  // Notificar chat
  addMsg({type:'system',text:'🗺 ['+roll+'] '+res.descricao.substring(0,60)+(res.descricao.length>60?'...':'')});
}
function findThreatsInDescription(desc) {
  if(!desc||typeof AMEACAS_DB==='undefined') return [];
  const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\*/g,'').replace(/[''']/g,'').replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,' ');
  const STOP=new Set(['das','dos','com','sob','uma','uns','para','pelo','pela','pelos','pelas','como','sob']);
  const fixes={defeitusos:'defeituosos',defeituso:'defeituoso',namasquall:'namasqall'};
  const stem=w=>{let s=w;if(s.endsWith('oes'))s=s.slice(0,-3)+'ao';else if(s.endsWith('ais'))s=s.slice(0,-3)+'al';else if(s.endsWith('eis'))s=s.slice(0,-3)+'el';else if(s.endsWith('nns'))s=s.slice(0,-1);else if(s.endsWith('ens'))s=s.slice(0,-3)+'em';else if(s.endsWith('ins'))s=s.slice(0,-3)+'im';else if(s.endsWith('uns'))s=s.slice(0,-3)+'um';else if(s.endsWith('ons'))s=s.slice(0,-1);else if(s.endsWith('ans'))s=s.slice(0,-1);else if(s.endsWith('res')||s.endsWith('ses')||s.endsWith('zes'))s=s.slice(0,-2);else if(s.endsWith('is')&&!s.endsWith('lis')&&!s.endsWith('mis')&&!s.endsWith('ris'))s=s.slice(0,-1);else if(s.endsWith('s'))s=s.slice(0,-1);if(s==='cae')s='cao';return s;};
  const words=norm(desc).split(/\s+/).filter(w=>w.length>2&&!STOP.has(w)).map(w=>fixes[w]||w);
  const stemsD=words.map(stem);
  return AMEACAS_DB.filter(t=>{
    const tw=norm(t.nome||'').split(/\s+/).filter(w=>w.length>2&&!STOP.has(w)).map(w=>fixes[w]||w);
    return tw.length>0&&tw.every(w=>stemsD.some(d=>d===stem(w)));
  }).sort((a,b)=>b.nome.length-a.nome.length);
}
function renderThreatMiniCards(threats) {
  const c=document.getElementById('enc-threats'); c.innerHTML='';
  if(!threats||threats.length===0) return;
  threats.forEach((t,i)=>{
    const card=document.createElement('div'); card.className='threat-mini';
    const hasPM=parseInt(t.pm)>0;
    card.innerHTML=`
      <div class="threat-mini-header">
        <div class="threat-mini-name">${escHTML(t.nome)}</div>
        <div class="threat-mini-nd">ND ${t.nd||'—'}</div>
      </div>
      <div class="threat-mini-stats">
        <span>PV ${t.pv||'—'}</span>${hasPM?`<span>PM ${t.pm}</span>`:''}
        <span>Def ${t.defesa||'—'}</span>
      </div>
      <div class="threat-mini-actions">
        <button class="btn btn-sm" onclick="enviarAoCombate(${i},1)">⚔ Ao Combate</button>
        <input type="number" id="enc-qty-${i}" value="1" min="1" max="20" style="width:45px;padding:0.2rem 0.3rem;font-size:0.8rem;">
      </div>
    `;
    card.querySelector('button').onclick=()=>{
      const qty=parseInt(document.getElementById('enc-qty-'+i).value)||1;
      enviarAoCombate(i,qty);
    };
    c.appendChild(card);
  });
}
function enviarAoCombate(threatIdx, qty) {
  const threat=encCurrentThreats[threatIdx]; if(!threat) return;
  for(let i=1;i<=qty;i++){
    const id=`c${Date.now()}${Math.floor(Math.random()*99999)}`;
    const nome=qty>1?`${threat.nome} ${i}`:threat.nome;
    const initText=threat.iniciativa||'+0';
    const initMod=parseInt(initText.replace('+',''))||0;
    const roll=Math.floor(Math.random()*20)+1;
    const totalInit=roll+initMod;
    const def=threat.defesa+(threat.defesaObs?` (${threat.defesaObs})`:'');
    const res=`Fort ${threat.fort||'+0'}, Ref ${threat.ref||'+0'}, Von ${threat.von||'+0'}`;
    let notes=`Tipo: ${threat.tipo||'—'} | ND: ${threat.nd||'—'}\nDeslocamento: ${threat.desl||'—'}\n`;
    if(threat.atributos){const a=threat.atributos;notes+=`FOR ${a.for||'—'}, DES ${a.des||'—'}, CON ${a.con||'—'}, INT ${a.int||'—'}, SAB ${a.sab||'—'}, CAR ${a.car||'—'}\n`;}
    notes+='\n--- ATAQUES ---\n';
    if(Array.isArray(threat.ataques)) threat.ataques.forEach(a=>{notes+=`• ${a.nome}: ${a.tipo||''} ${a.bonus||''} (${a.dano||''})${a.desc?' - '+a.desc:''}\n`;});
    notes+='\n--- HABILIDADES ---\n';
    if(Array.isArray(threat.habilidades)) threat.habilidades.forEach(h=>{notes+=`• ${h.nome} (${h.tipo||''}): ${h.desc||''}\n`;});
    combatState.combatants.push({id,name:nome,init:totalInit,hpCur:parseInt(threat.pv)||0,hpMax:parseInt(threat.pv)||0,mpCur:parseInt(threat.pm)||0,mpMax:parseInt(threat.pm)||0,notes,conditions:[],stats:{def,res,cd:''},open:false,imageUrl:threat.img||''});
    if(!combatState.activeId) combatState.activeId=id;
  }
  combatSave(); combatRender();
  switchTab('combate');
  toast(`⚔ ${qty}x ${threat.nome} adicionados ao combate! (INI auto-rolada)`);
  addMsg({type:'system',text:`⚔ ${qty}x ${threat.nome} entrou no combate.`});
}

// ══════════════════════════════════════════════════════
//  COMBATE — adaptação do arsenal original
// ══════════════════════════════════════════════════════
// STORAGE_KEY is declared at the top of the file
let combatState=null;

function combatDefaultState() {
  return {
    round: 1,
    activeId: null,
    combatants: [],
    log: [],
    logOpen: false,
    autoSort: false
  };
}

function combatInit() {
  combatState = combatLoad() || combatDefaultState();

  // Normalizações defensivas
  if (!combatState || typeof combatState !== "object") combatState = combatDefaultState();
  if (!Array.isArray(combatState.combatants)) combatState.combatants = [];
  // Migração: garante que máximos existam e nunca aumentem automaticamente
  combatState.combatants.forEach(c => {
    if (!Number.isFinite(parseInt(c.hpCur))) c.hpCur = 0;
    if (!Number.isFinite(parseInt(c.mpCur))) c.mpCur = 0;
    if (!Number.isFinite(parseInt(c.hpMax))) c.hpMax = Math.max(0, parseInt(c.hpCur) || 0);
    if (!Number.isFinite(parseInt(c.mpMax))) c.mpMax = Math.max(0, parseInt(c.mpCur) || 0);
  });

  if (!Array.isArray(combatState.log)) combatState.log = [];
  combatState.round = clampInt(combatState.round, 1, 9999, 1);
  combatState.autoSort = !!combatState.autoSort;

  const auto = document.getElementById("combatAutoSort");
  if (auto) auto.checked = combatState.autoSort;

  // Enter no nome adiciona
  const nameInp = document.getElementById("combatNewName");
  if (nameInp) {
    nameInp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        combatAddFromForm();
      }
    });
  }

  combatRender();
  // Validação do formulário de adicionar (nome + iniciativa obrigatórios)
  combatBindAddFormValidation();
  combatEnableDrag();
  combatLogRender();
  
  // Inicialização dos Autocompletes
  combatInitDbAutocomplete();
  combatInitFichaAutocomplete();
}

function combatSetAutoSort(on) {
  combatState.autoSort = !!on;
  combatSave();
}

function combatSave() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combatState));
  } catch (e) {
    console.warn("Falha ao salvar no localStorage", e);
  }
}

function combatLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Falha ao ler localStorage", e);
    return null;
  }
}

// Sistema de Notificações Toast
function mostrarToast(mensagem, tipo = 'info') {
  toast(mensagem);
}

// Inicializa Autocomplete do Bestiário Oficial
function combatInitDbAutocomplete() {
  const datalist = document.getElementById("combatDbDatalist");
  const searchInput = document.getElementById("combatDbSearch");
  if (!datalist || !searchInput) return;

  if (typeof AMEACAS_DB !== "undefined" && Array.isArray(AMEACAS_DB)) {
    const sortedAmeacas = [...AMEACAS_DB].sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
    datalist.innerHTML = sortedAmeacas.map(a => 
      `<option value="${escapeHtml(a.nome)}">${escapeHtml(a.tipo || "Criatura")} · ND ${escapeHtml(a.nd || "?")}</option>`
    ).join("");

    searchInput.addEventListener("input", () => {
      const val = (searchInput.value || "").trim();
      const match = AMEACAS_DB.find(a => (a.nome || "").toLowerCase() === val.toLowerCase());
      if (match) {
        currentThreatData = match;
        
        const nameInp = document.getElementById("combatNewName");
        const hpInp = document.getElementById("combatNewHP");
        const mpInp = document.getElementById("combatNewMP");
        const initInp = document.getElementById("combatNewInit");
        const fichaSearch = document.getElementById("combatFichaSearch");
        
        if (nameInp) nameInp.value = match.nome;
        if (hpInp) hpInp.value = parseInt(match.pv) || 0;
        if (mpInp) mpInp.value = parseInt(match.pm) || 0;
        if (fichaSearch) fichaSearch.value = "";
        
        // Auto rola iniciativa
        const initText = match.iniciativa || "+0";
        const initMod = parseInt(initText.replace("+", "")) || 0;
        const roll = Math.floor(Math.random() * 20) + 1;
        const totalInit = roll + initMod;
        
        if (initInp) initInp.value = totalInit;
        
        combatLogAdd(`🎲 Iniciativa auto-rolada para ${match.nome}: 1d20 (${roll}) + ${initMod} = ${totalInit}`);
        mostrarToast(`🎲 ${match.nome} iniciativa: ${totalInit} (1d20 [${roll}] + ${initMod})`, "sucesso");
        
        // Revalida formulário
        combatBindAddFormValidation();
      }
    });
  } else {
    console.warn("AMEACAS_DB não está disponível para o autocomplete.");
  }
}

// ── Autocomplete de Fichas (personagens do mestre + jogadores conectados) ──
function getFichasDisponiveis() {
  const fichas = [];
  // Ficha local do mestre (se houver)
  try {
    const raw = localStorage.getItem('t20SheetData');
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.charName) {
        fichas.push({
          source: 'local',
          label: `${data.charName} (sua ficha)`,
          charName: data.charName,
          pvM: data.pvM || data.status?.pvM || 0,
          pvC: data.pvC || data.status?.pvC || 0,
          pmM: data.pmM || data.status?.pmM || 0,
          pmC: data.pmC || data.status?.pmC || 0,
          imageUrl: data.charImage || ''
        });
      }
    }
  } catch(e) {}
  // Fichas dos jogadores conectados
  if (typeof fichasJogadores !== 'undefined') {
    Object.entries(fichasJogadores).forEach(([pid, entry]) => {
      const r = entry.resumo;
      if (r && r.charName) {
        fichas.push({
          source: 'player',
          peerId: pid,
          playerName: entry.playerName,
          label: `${r.charName} (${entry.playerName})`,
          charName: r.charName,
          pvM: parseInt(r.pvM) || 0,
          pvC: parseInt(r.pvC) || 0,
          pmM: parseInt(r.pmM) || 0,
          pmC: parseInt(r.pmC) || 0,
          imageUrl: r.charImage || ''
        });
      }
    });
  }
  // Fichas importadas pelo mestre
  try {
    const raw = localStorage.getItem(MASTER_FICHAS_KEY);
    if (raw) {
      const masterFichas = JSON.parse(raw);
      if (Array.isArray(masterFichas)) {
        masterFichas.forEach(f => {
          if (f && f.name) {
            fichas.push({
              source: 'master',
              id: f.id,
              label: `${f.name} (ficha do mestre)`,
              charName: f.name,
              pvM: f.pvM || 0,
              pvC: f.pvC || 0,
              pmM: f.pmM || 0,
              pmC: f.pmC || 0,
              imageUrl: f.imageUrl || ''
            });
          }
        });
      }
    }
  } catch(e) {}
  return fichas;
}

function combatInitFichaAutocomplete() {
  const datalist = document.getElementById("combatFichaDatalist");
  const searchInput = document.getElementById("combatFichaSearch");
  if (!datalist || !searchInput) return;

  const fichas = getFichasDisponiveis();
  datalist.innerHTML = fichas.map(f =>
    `<option value="${escapeHtml(f.charName)}">${escapeHtml(f.label)}</option>`
  ).join("");
}

function onFichaSearchInput() {
  const searchInput = document.getElementById("combatFichaSearch");
  if (!searchInput) return;
  const val = (searchInput.value || "").trim();
  if (!val) return;

  const fichas = getFichasDisponiveis();
  const match = fichas.find(f => f.charName.toLowerCase() === val.toLowerCase());
  if (match) {
    const nameInp = document.getElementById("combatNewName");
    const hpInp = document.getElementById("combatNewHP");
    const mpInp = document.getElementById("combatNewMP");
    const initInp = document.getElementById("combatNewInit");
    const dbSearch = document.getElementById("combatDbSearch");

    if (nameInp) nameInp.value = match.charName;
    if (hpInp) hpInp.value = match.pvM;
    if (mpInp) mpInp.value = match.pmM;
    // Limpa bestiário para não conflitar
    if (dbSearch) dbSearch.value = "";
    currentThreatData = null;

    // Se não tiver iniciativa, sugere uma baseada em DES (padrão Tormenta)
    if (initInp && !initInp.value) {
      initInp.value = Math.floor(Math.random() * 20) + 1;
    }

    mostrarToast(`📋 Ficha "${match.charName}" selecionada`, "sucesso");
    combatBindAddFormValidation();
  }
}

// Limpa busca e reinicia dados de ameaça
function combatClearSearch() {
  const searchInput = document.getElementById("combatDbSearch");
  if (searchInput) searchInput.value = "";
  currentThreatData = null;
}

// Rolar iniciativa rápida no formulário
function combatRollNewInit() {
  const initInp = document.getElementById("combatNewInit");
  if (!initInp) return;
  const mod = parseInt(initInp.value) || 0;
  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + mod;
  initInp.value = total;
  
  combatLogAdd(`🎲 Iniciativa rolada: 1d20 (${roll}) + ${mod} = ${total}`);
  mostrarToast(`🎲 Rolado: ${total} (1d20 [${roll}] + ${mod})`);
  
  combatBindAddFormValidation();
}

function combatBindAddFormValidation() {
  const initEl = document.getElementById("combatNewInit");
  const nameEl = document.getElementById("combatNewName");
  const btn = document.getElementById("combatAddBtn");
  const hint = document.getElementById("combatAddHint");
  if (!initEl || !nameEl || !btn) return;

  const validate = () => {
    const nameOk = (nameEl.value || "").trim().length > 0;
    const initOk = (initEl.value !== "" && initEl.value !== null && initEl.value !== undefined);
    btn.disabled = !(nameOk && initOk);
    btn.classList.toggle("is-disabled", btn.disabled);
    if (hint) hint.classList.toggle("show", btn.disabled);
  };

  if (!initEl.dataset.boundValidation) {
    initEl.dataset.boundValidation = "1";
    initEl.addEventListener("input", validate);
    nameEl.addEventListener("input", validate);
    nameEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        validate();
        if (!btn.disabled) {
          e.preventDefault();
          combatAddFromForm();
        }
      }
    });
  }

  validate();
}

function combatAddFromForm() {
  const init = parseInt(document.getElementById("combatNewInit")?.value) || 0;
  const name = (document.getElementById("combatNewName")?.value || "").trim();
  const hpCur = parseInt(document.getElementById("combatNewHP")?.value) || 0;
  const mpCur = parseInt(document.getElementById("combatNewMP")?.value) || 0;

  if (!name || (document.getElementById("combatNewInit")?.value === "")) {
    alert("Preencha Iniciativa e Nome para adicionar.");
    return;
  }

  let def = "";
  let res = "";
  let cd = "";
  let notesStr = "";
  
  // Se houver dados de criatura no banco e o nome inserido iniciar com o nome da criatura (ex: Goblin 1 começa com Goblin)
  if (currentThreatData && name.toLowerCase().startsWith(currentThreatData.nome.toLowerCase())) {
    def = currentThreatData.defesa + (currentThreatData.defesaObs ? ` (${currentThreatData.defesaObs})` : "");
    res = `Fort ${currentThreatData.fort || "+0"}, Ref ${currentThreatData.ref || "+0"}, Von ${currentThreatData.von || "+0"}`;
    
    // Tenta encontrar uma CD nas descrições de ataques ou habilidades
    const descTexts = [];
    if (Array.isArray(currentThreatData.ataques)) currentThreatData.ataques.forEach(a => descTexts.push(a.desc || ""));
    if (Array.isArray(currentThreatData.habilidades)) currentThreatData.habilidades.forEach(h => descTexts.push(h.desc || ""));
    const joinedText = descTexts.join(" ");
    const cdMatch = joinedText.match(/CD\s*(\d+)/i);
    if (cdMatch) cd = cdMatch[1];
    
    // Formata o resumo da criatura nas notas
    notesStr += `Tipo: ${currentThreatData.tipo || "—"} | ND: ${currentThreatData.nd || "—"}\n`;
    notesStr += `Deslocamento: ${currentThreatData.desl || "—"}\n`;
    if (currentThreatData.atributos) {
      const atr = currentThreatData.atributos;
      notesStr += `Atributos: FOR ${atr.for || "—"}, DES ${atr.des || "—"}, CON ${atr.con || "—"}, INT ${atr.int || "—"}, SAB ${atr.sab || "—"}, CAR ${atr.car || "—"}\n`;
    }
    if (currentThreatData.percepcao) {
      notesStr += `Percepção: ${currentThreatData.percepcao} ${currentThreatData.percepcaoObs ? `(${currentThreatData.percepcaoObs})` : ""}\n`;
    }
    if (currentThreatData.tesouro) {
      notesStr += `Tesouro: ${currentThreatData.tesouro}\n`;
    }
    notesStr += `\n--- ATAQUES ---\n`;
    if (Array.isArray(currentThreatData.ataques) && currentThreatData.ataques.length > 0) {
      currentThreatData.ataques.forEach(atk => {
        notesStr += `• ${atk.nome}: ${atk.tipo || ""} ${atk.bonus || ""} (${atk.dano || ""})${atk.desc ? ` - ${atk.desc}` : ""}\n`;
      });
    } else {
      notesStr += `Nenhum ataque registrado.\n`;
    }
    notesStr += `\n--- HABILIDADES ---\n`;
    if (Array.isArray(currentThreatData.habilidades) && currentThreatData.habilidades.length > 0) {
      currentThreatData.habilidades.forEach(hab => {
        notesStr += `• ${hab.nome} (${hab.tipo || ""}): ${hab.desc || ""}\n`;
      });
    } else {
      notesStr += `Nenhuma habilidade registrada.\n`;
    }
  }

  const id = `c${Date.now()}${Math.floor(Math.random() * 9999)}`;

  combatState.combatants.push({
    id,
    name,
    init,
    hpCur: clampInt(hpCur, -999999, 999999, 0),
    hpMax: clampInt(hpCur, 0, 999999, 0),
    mpCur: clampInt(mpCur, 0, 999999, 0),
    mpMax: clampInt(mpCur, 0, 999999, 0),
    notes: notesStr,
    conditions: [],
    stats: { def, res, cd },
    open: false,
    imageUrl: (currentThreatData?.img) || ''
  });

  if (!combatState.activeId) combatState.activeId = id;

  // Limpa nome e busca
  document.getElementById("combatNewName").value = "";
  const dbSearchInput = document.getElementById("combatDbSearch");
  if (dbSearchInput) dbSearchInput.value = "";
  
  // Reseta estado temporário da ameaça para não auto-aplicar na próxima criação genérica
  currentThreatData = null;
  
  combatBindAddFormValidation();

  combatLogAdd(`+ ${name} (INI ${init})`);
  mostrarToast(`⚔️ "${name}" adicionado ao combate!`, "sucesso");
  combatRender();
  combatEnableDrag();
  combatSave();
}

function combatFind(id) {
  return combatState.combatants.find(x => x.id === id);
}

function combatIndexOfActive() {
  return combatState.combatants.findIndex(x => x.id === combatState.activeId);
}

function combatGetActiveName() {
  const c = combatFind(combatState.activeId);
  return c ? (c.name || "—") : "—";
}

function combatSetActive(id) {
  combatState.activeId = id;
  combatLogAdd(`Vez: ${combatGetActiveName()}`);
  mostrarToast(` Vez de: ${combatGetActiveName()}`);
  combatRender();
  combatSave();
}

function combatToggleDetails(id) {
  const c = combatFind(id);
  if (!c) return;
  c.open = !c.open;
  combatRender();
  combatSave();
}

function combatRowClick(id, ev) {
  // Clique em inputs/textareas/selects/botões não abre/fecha
  const tag = (ev.target && ev.target.tagName) ? ev.target.tagName.toUpperCase() : "";
  if (["INPUT", "TEXTAREA", "SELECT", "BUTTON", "I"].includes(tag)) return;
  combatToggleDetails(id);
}

function combatUpdateInit(id, value) {
  const c = combatFind(id);
  if (!c) return;
  c.init = parseInt(value) || 0;
  if (combatState.autoSort) combatSort();
  combatSave();
}

function combatUpdateNumber(id, field, value) {
  const c = combatFind(id);
  if (!c) return;
  const n = parseInt(value);
  c[field] = Number.isFinite(n) ? n : 0;

  // Máximos só mudam manualmente
  if (field === "hpMax") c.hpMax = clampInt(c.hpMax, 0, 999999, 0);
  if (field === "mpMax") c.mpMax = clampInt(c.mpMax, 0, 999999, 0);

  // Permite PV negativo
  if (field === "hpCur") c.hpCur = clampInt(c.hpCur, -999999, 999999, 0);
  if (field === "mpCur") c.mpCur = clampInt(c.mpCur, 0, 999999, 0);

  combatRefreshBadges(id);
  combatSave();
}

function combatDelta(id, field, delta) {
  const c = combatFind(id);
  if (!c) return;

  const before = parseInt(c[field]) || 0;
  let next = before + delta;
  if (field === "mpCur" && next < 0) next = 0;
  c[field] = next;

  combatRefreshBadges(id);
  combatRenderMiniFieldsIfOpen(id);

  // Log amigável
  const who = c.name || "—";
  const label = field === "hpCur" ? "PV" : field === "mpCur" ? "PM" : field;
  const sign = delta > 0 ? `+${delta}` : `${delta}`;
  combatLogAdd(`${who}: ${label} ${sign} → ${next}`);

  combatSave();
}

function combatRenderMiniFieldsIfOpen(id) {
  const c = combatFind(id);
  if (!c) return;
  const wrap = document.getElementById(`combatDetails-${id}`);
  if (!wrap) return;

  const map = {
    hpCur: `combatHPcur-${id}`,
    hpMax: `combatHPmax-${id}`,
    mpCur: `combatMPcur-${id}`,
    mpMax: `combatMPmax-${id}`,
  };

  Object.entries(map).forEach(([field, elId]) => {
    const el = document.getElementById(elId);
    if (el) el.value = parseInt(c[field]) || 0;
  });
}

function combatUpdateNotes(id, value) {
  const c = combatFind(id);
  if (!c) return;
  c.notes = value;

  combatSave();
  combatRenderNoteIndicator(id);
}

// Exibe seletor de anotação
function combatRenderNoteIndicator(id) {
  const c = combatFind(id);
  if (!c) return;
  const ind = document.getElementById(`combatNoteIndicator-${id}`);
  if (!ind) return;
  const has = (c.notes || "").trim().length > 0;
  ind.classList.toggle("has-notes", has);
}

function combatUpdateStats(id, field, value) {
  const c = combatFind(id);
  if (!c) return;
  if (!c.stats) c.stats = { def: "", res: "", cd: "" };
  c.stats[field] = value;
  combatSave();
}

function combatRefreshBadges(id) {
  const c = combatFind(id);
  if (!c) return;

  const hpTxt = document.getElementById(`combatHPText-${id}`);
  const mpTxt = document.getElementById(`combatMPText-${id}`);
  const hpFill = document.getElementById(`combatHPFill-${id}`);
  const mpFill = document.getElementById(`combatMPFill-${id}`);

  const hpCur = clampInt(c.hpCur, -999999, 999999, 0);
  const hpMax = clampInt(c.hpMax, 0, 999999, 0);
  const mpCur = clampInt(c.mpCur, 0, 999999, 0);
  const mpMax = clampInt(c.mpMax, 0, 999999, 0);

  const hpDisplay = hpCur > hpMax ? `+${hpCur}` : `${hpCur}`;
  const mpDisplay = mpCur > mpMax ? `+${mpCur}` : `${mpCur}`;

  const hpPct = hpMax > 0 ? clampNum((Math.max(0, Math.min(hpCur, hpMax)) / hpMax) * 100, 0, 100) : 0;
  const mpPct = mpMax > 0 ? clampNum((Math.max(0, Math.min(mpCur, mpMax)) / mpMax) * 100, 0, 100) : 0;

  if (hpTxt) hpTxt.textContent = `PV ${hpDisplay}/${hpMax}`;
  if (mpTxt) mpTxt.textContent = `PM ${mpDisplay}/${mpMax}`;
  if (hpFill) hpFill.style.width = `${hpPct}%`;
  if (mpFill) mpFill.style.width = `${mpPct}%`;

  combatRenderNoteIndicator(id);
  combatRenderNameState(id);
}

function combatRenderNameState(id) {
  const c = combatFind(id);
  if (!c) return;
  const nameEl = document.getElementById(`combatName-${id}`);
  if (!nameEl) return;

  const hpCur = parseInt(c.hpCur) || 0;
  const hpMax = parseInt(c.hpMax) || 0;
  const low = hpMax > 0 && hpCur >= 0 && (hpCur / hpMax) < 0.25;
  const dead = hpCur < 0;

  nameEl.classList.toggle("hp-low", low);
  nameEl.classList.toggle("hp-dead", dead);
}

function combatRemove(id) {
  const c = combatFind(id);
  if (!c) return;
  if (!confirm(`Remover "${c.name}"?`)) return;

  const idx = combatState.combatants.findIndex(x => x.id === id);
  if (idx >= 0) combatState.combatants.splice(idx, 1);

  if (combatState.activeId === id) {
    combatState.activeId = combatState.combatants[0]?.id || null;
  }

  combatLogAdd(`- ${c.name}`);
  mostrarToast(`🗑️ ${c.name} removido.`, "aviso");
  combatRender();
  combatEnableDrag();
  combatSave();
}

function combatDuplicate(id) {
  const src = combatFind(id);
  if (!src) return;

  const copy = deepClone(src);
  copy.id = `c${Date.now()}${Math.floor(Math.random() * 9999)}`;
  copy.name = incrementName(src.name || "Cópia");
  copy.open = false;

  const idx = combatState.combatants.findIndex(x => x.id === id);
  if (idx >= 0) combatState.combatants.splice(idx + 1, 0, copy);
  else combatState.combatants.push(copy);

  combatLogAdd(`⎘ ${src.name} → ${copy.name}`);
  mostrarToast(`📋 Criada cópia de ${src.name}!`);
  combatRender();
  combatEnableDrag();
  combatSave();
}

/** Condições **/
const CONDITION_INFO = {
  "Abalado": "O personagem sofre -2 em testes de perícia. Se ficar abalado novamente, em vez disso fica apavorado. (Medo)",
  "Agarrado": "O personagem fica desprevenido e imóvel, sofre -2 em testes de ataque e só pode atacar com armas leves. Ataques à distância contra um alvo envolvido em uma manobra de agarrar têm 50% de chance de acertar o alvo errado. (Movimento)",
  "Alquebrado": "O custo em pontos de mana das habilidades do personagem aumenta em +1. (Mental)",
  "Apavorado": "O personagem sofre -5 em testes de perícia e não pode se aproximar voluntariamente da fonte do medo. (Medo)",
  "Atordoado": "O personagem fica desprevenido e não pode fazer ações. (Mental)",
  "Caído": "O personagem sofre –5 na Defesa contra ataques corpo a corpo e recebe +5 na Defesa contra ataques à distância (cumulativos com outras condições). Além disso, sofre –5 em ataques corpo a corpo e seu deslocamento é reduzido a 1,5m.",
  "Cego": "O personagem fica desprevenido e lento, não pode fazer testes de Percepção para observar e sofre -5 em testes de perícias baseadas em Força ou Destreza. Todos os alvos de seus ataques recebem camuflagem total. Você é considerado cego enquanto estiver em uma área de escuridão total, a menos que algo lhe permita perceber no escuro. (Sentidos)",
  "Confuso": "O personagem comporta-se de modo aleatório. Role 1d6 no início de seus turnos. 1) Movimenta-se em uma direção escolhida por uma rolagem de 1d8; 2-3) Não pode fazer ações, e fica balbuciando incoerentemente; 4-5) Usa a arma que estiver empunhando para atacar a criatura mais próxima, ou a si mesmo se estiver sozinho (nesse caso, apenas role o dano); 6) A condição termina e pode agir normalmente. (Mental)",
  "Debilitado": "O personagem sofre -5 em testes de Força, Destreza e Constituição e em testes de perícias baseadas nesses atributos. Se o personagem ficar debilitado novamente, em vez disso fica inconsciente.",
  "Desprevenido": "O personagem sofre -5 na Defesa e em Reflexos. Você fica desprevenido contra inimigos que não possa perceber.",
  "Doente": "Sob efeito de uma doença. (Metabolismo)",
  "Em Chamas": "O personagem está pegando fogo. No início de seus turnos, sofre 1d6 pontos de dano de fogo. O personagem pode gastar uma ação padrão para apagar o fogo com as mãos. Imersão em água também apaga as chamas.",
  "Enfeitiçado": "O personagem se torna prestativo em relação à fonte da condição. Ele não fica sob controle da fonte, mas percebe suas palavras e ações da maneira mais favorável possível. A fonte da condição recebe +10 em testes de Diplomacia com o personagem. (Mental)",
  "Enjoado": "O personagem só pode realizar uma ação padrão ou de movimento (não ambas) por rodada. Ele pode gastar uma ação padrão para fazer uma investida, mas pode avançar no máximo seu deslocamento (e não o dobro). (Metabolismo)",
  "Enredado": "O personagem fica lento, vulnerável e sofre -2 em testes de ataque. (Movimento)",
  "Envenenado": "O efeito desta condição varia de acordo com o veneno. Pode ser perda de vida recorrente ou outra condição (como fraco ou enjoado). Perda de vida recorrente por venenos é cumulativa. (Veneno)",
  "Esmorecido": "O personagem sofre -5 em testes de Inteligência, Sabedoria e Carisma e em testes de perícias baseadas nesses atributos. (Mental)",
  "Exausto": "O personagem fica debilitado, lento e vulnerável. Se ficar exausto novamente, em vez disso fica inconsciente. (Cansaço)",
  "Fascinado": "Com a atenção presa em alguma coisa. O personagem sofre -5 em Percepção e não pode fazer ações, exceto observar aquilo que o fascinou. Esta condição é anulada por ações hostis contra o personagem ou se o que o fascinou não estiver mais visível. Balançar uma criatura fascinada para tirá-la desse estado gasta uma ação padrão. (Mental).",
  "Fatigado": "O personagem fica fraco e vulnerável. Se ficar fatigado novamente, em vez disso fica exausto. (Cansaço)",
  "Fraco": "O personagem sofre -2 em testes de Força, Destreza e Constituição e em testes de perícias baseadas nesses atributos. Se ficar fraco novamente, em vez disso fica debilitado.",
  "Frustrado": "O personagem sofre -2 em testes de Inteligência, Sabedoria e Carisma e em testes de perícias baseadas nesses atributos. Se ficar frustrado novamente, em vez disso fica esmorecido. (Mental)",
  "Imóvel": "Todas as formas de deslocamento do personagem são reduzidas a 0 metros. (Movimento)",
  "Inconsciente": "O personagem fica indefeso e não pode fazer ações, incluindo reações (mas ainda pode fazer testes que sejam naturalmente feitos quando se está inconsciente, como testes de Constituição para estabilizar sangramento). Balançar uma criatura para acordá-la gasta uma ação padrão.",
  "Indefeso": "O personagem fica desprevenido, mas sofre -10 na Defesa, falha automaticamente em testes de Reflexos e pode sofrer golpes de misericórdia.",
  "Lento": "Todas as formas de deslocamento do personagem são reduzidas à metade (arredonde para baixo para o primeiro incremento de 1,5 metros) e ele não pode correr ou fazer investidas. (Movimento)",
  "Ofuscado": "O personagem sofre -2 em testes de ataque e de Percepção. (Sentidos)",
  "Paralisado": "Fica imóvel e indefeso e só pode realizar ações puramente mentais. (Movimento)",
  "Pasmo": "Não pode fazer ações. (Mental)",
  "Petrificado": "O personagem fica inconsciente e recebe redução de dano 8. (Metamorfose)",
  "Sangrando": "No início de seu turno, o personagem deve fazer um teste de Constituição (CD 15). Se falhar, perde 1d6 pontos de vida e continua sangrando. Se passar, remove essa condição. (Metabolismo)",
  "Sobrecarregado": "O personagem sofre penalidade de armadura -5 e seu deslocamento é reduzido em -3 metros. (Movimento)",
  "Surdo": "O personagem não pode fazer testes de Percepção para ouvir e sofre -5 em testes de Iniciativa. Além disso, é considerado em condição ruim para lançar magias. (Sentidos)",
  "Surpreendido": "O personagem fica desprevenido e não pode fazer ações.",
  "Vulnerável": "O personagem sofre -2 na Defesa.",
};
const CONDITION_LIST = Object.keys(CONDITION_INFO).sort((a,b)=>a.localeCompare(b, "pt-BR"));

const CONDITION_EMOJI = {
  "Abalado":"😰","Agarrado":"🤝","Alquebrado":"😩","Apavorado":"😱",
  "Atordoado":"💫","Caído":"🦶","Cego":"🦯","Confuso":"🌀",
  "Debilitado":"😵","Desprevenido":"⚡","Doente":"🤒","Em Chamas":"🔥",
  "Enfeitiçado":"🫦","Enjoado":"🤢","Enredado":"🕸️","Envenenado":"☠️",
  "Esmorecido":"🥀","Exausto":"😫","Fascinado":"✨","Fatigado":"😮‍💨",
  "Fraco":"🪫","Frustrado":"😤","Imóvel":"🗿","Inconsciente":"💤",
  "Indefeso":"🛐","Lento":"🐌","Ofuscado":"🌟","Paralisado":"🧊",
  "Pasmo":"😶","Petrificado":"🪨","Sangrando":"🩸","Sobrecarregado":"🎒",
  "Surdo":"🦻","Surpreendido":"😮","Vulnerável":"🎯",
};

function combatAddCondition(id) {
  const c = combatFind(id);
  if (!c) return;

  const sel = document.getElementById(`condSel-${id}`);
  const durInp = document.getElementById(`condDur-${id}`);
  if (!sel) return;

  const name = (sel.value || "").trim();
  const dur = clampInt(parseInt(durInp?.value), 0, 999, 1);

  if (!name) return;

  if (!Array.isArray(c.conditions)) c.conditions = [];
  c.conditions.push({ name, remaining: dur });

  combatLogAdd(`${c.name}: + condição "${name}" (${dur}r)`);
  mostrarToast(`✨ ${c.name}: + Condição "${name}" (${dur}r)`);
  combatRender();
  combatSave();
}

function combatSyncCondControls(id) {
  const sel = document.getElementById(`condSel-${id}`);
  const infoBtn = document.getElementById(`condInfoBtn-${id}`);
  const addBtn = document.getElementById(`condAddBtn-${id}`);
  const has = !!(sel && (sel.value || "").trim());
  if (infoBtn) infoBtn.disabled = !has;
  if (addBtn) addBtn.disabled = !has;
  if (!has) {
    const pop = document.getElementById(`condPop-${id}`);
    if (pop) pop.classList.add("d-none");
  }
}

function combatCondBump(id, idx, delta) {
  const c = combatFind(id);
  if (!c || !Array.isArray(c.conditions)) return;
  const cond = c.conditions[idx];
  if (!cond) return;

  cond.remaining = clampInt((parseInt(cond.remaining) || 0) + delta, 0, 999, 0);
  combatLogAdd(`${c.name}: ${cond.name} → ${cond.remaining}r`);
  if (cond.remaining <= 0) {
    c.conditions.splice(idx, 1);
    combatLogAdd(`${c.name}: condição "${cond.name}" acabou`);
    mostrarToast(`⌛ ${c.name}: Condição "${cond.name}" expirou.`);
  }
  combatRender();
  combatSave();
}

function combatCondRemove(id, idx) {
  const c = combatFind(id);
  if (!c || !Array.isArray(c.conditions)) return;
  const cond = c.conditions[idx];
  if (!cond) return;
  c.conditions.splice(idx, 1);
  combatLogAdd(`${c.name}: - condição "${cond.name}"`);
  combatRender();
  combatSave();
}

function combatTickConditionsOnLeaveCurrentTurn() {
  const cur = combatFind(combatState.activeId);
  if (!cur || !Array.isArray(cur.conditions) || cur.conditions.length === 0) return;

  const before = cur.conditions.map(x => ({...x}));
  cur.conditions.forEach(x => {
    if (Number.isFinite(parseInt(x.remaining)) && parseInt(x.remaining) > 0) {
      x.remaining = parseInt(x.remaining) - 1;
    }
  });
  
  // Remove as que zeraram
  cur.conditions = cur.conditions.filter(x => (parseInt(x.remaining) || 0) > 0);

  // Log mudanças
  before.forEach((b) => {
    const after = cur.conditions.find(x => x.name === b.name);
    if (!after && (parseInt(b.remaining) || 0) > 0) {
      combatLogAdd(`${cur.name}: condição "${b.name}" acabou`);
      mostrarToast(`⌛ ${cur.name}: Condição "${b.name}" expirou.`, "aviso");
    }
  });
}

/** Turnos / Rodadas **/
function combatNextTurn() {
  if (combatState.combatants.length === 0) return;

  combatTickConditionsOnLeaveCurrentTurn();

  let idx = combatIndexOfActive();
  if (idx < 0) idx = 0;

  idx += 1;
  if (idx >= combatState.combatants.length) {
    idx = 0;
    combatState.round = clampInt((parseInt(combatState.round) || 1) + 1, 1, 9999, 1);
    combatLogAdd(`— Rodada ${combatState.round} —`);
    mostrarToast(`🔔 Nova Rodada: ${combatState.round}!`, "aviso");
  }

  combatState.activeId = combatState.combatants[idx].id;
  combatLogAdd(`Vez: ${combatGetActiveName()}`);
  mostrarToast(` Vez de: ${combatGetActiveName()}`);
  combatRender();
  combatSave();
}

function combatPrevTurn() {
  if (combatState.combatants.length === 0) return;

  let idx = combatIndexOfActive();
  if (idx < 0) idx = 0;

  idx -= 1;
  if (idx < 0) {
    idx = combatState.combatants.length - 1;
    combatState.round = clampInt((parseInt(combatState.round) || 1) - 1, 1, 9999, 1);
    combatLogAdd(`↩ volta (Rodada ${combatState.round})`);
  }

  combatState.activeId = combatState.combatants[idx].id;
  combatLogAdd(`Vez: ${combatGetActiveName()}`);
  combatRender();
  combatSave();
}

function combatResetRound() {
  combatState.round = 1;
  combatLogAdd(`⟳ Rodada resetada para 1`);
  mostrarToast(`⟳ Rodada resetada para 1`);
  combatRender();
  combatSave();
}

function combatNew() {
  if (!confirm("Novo combate: limpar lista, rodada, vez e log?")) return;
  combatState = combatDefaultState();
  combatSave();
  combatRender();
  combatEnableDrag();
  combatLogRender();
  mostrarToast("⚔️ Combate reiniciado!");
}

/** Ordenação / Drag **/
function combatSort() {
  combatState.combatants.sort((a, b) => {
    const ia = parseInt(a.init) || 0;
    const ib = parseInt(b.init) || 0;
    if (ib !== ia) return ib - ia;
    return (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase());
  });

  if (combatState.combatants.length > 0 && !combatFind(combatState.activeId)) {
    combatState.activeId = combatState.combatants[0].id;
  }

  combatLogAdd("⇅ Ordenado por iniciativa");
  mostrarToast("⇅ Lista ordenada por Iniciativa!");
  combatRender();
  combatEnableDrag();
  combatSave();
}

function combatEnableDrag() {
  const list = document.getElementById("combatList");
  if (!list || typeof Sortable === "undefined") return;

  if (list._sortableCombat) return;

  list._sortableCombat = new Sortable(list, {
    animation: 150,
    handle: ".drag-handle",
    onEnd: () => {
      const ids = Array.from(list.querySelectorAll(".combat-row")).map(el => el.getAttribute("data-id"));
      combatState.combatants.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
      combatLogAdd("↕ desempate manual (arraste)");
      combatSave();
    }
  });
}

/** Export/Import **/
function combatExport() {
  const blob = new Blob([JSON.stringify(combatState, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "combate_t20.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  mostrarToast("💾 Dados de combate exportados!");
}

function combatImport(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || typeof data !== "object") throw new Error("JSON inválido");

      const next = combatDefaultState();
      next.round = clampInt(data.round, 1, 9999, 1);
      next.activeId = data.activeId || null;
      next.log = Array.isArray(data.log) ? data.log : [];
      next.logOpen = !!data.logOpen;

      next.combatants = Array.isArray(data.combatants) ? data.combatants : [];
      next.combatants = next.combatants.map((c, i) => ({
        id: c.id || (`c${Date.now()}${i}`),
        name: c.name || "—",
        init: parseInt(c.init) || 0,
        hpCur: clampInt(c.hpCur, -999999, 999999, 0),
        hpMax: clampInt(c.hpMax, 0, 999999, clampInt(c.hpCur,0,999999,0)),
        mpCur: clampInt(c.mpCur, 0, 999999, 0),
        mpMax: clampInt(c.mpMax, 0, 999999, clampInt(c.mpCur,0,999999,0)),
        notes: c.notes || "",
        conditions: Array.isArray(c.conditions) ? c.conditions.map(x => ({
          name: (x.name || "").toString(),
          remaining: clampInt(x.remaining, 0, 999, 1)
        })) : [],
        stats: c.stats && typeof c.stats === "object" ? {
          def: c.stats.def ?? "",
          res: c.stats.res ?? "",
          cd: c.stats.cd ?? ""
        } : { def:"", res:"", cd:"" },
        open: false
      }));

      if (next.combatants.length > 0 && !next.activeId) next.activeId = next.combatants[0].id;

      combatState = next;
      combatLogAdd("⬆ combate carregado");
      mostrarToast("⬆ Combate importado com sucesso!", "sucesso");
      combatSave();
      combatRender();
      combatEnableDrag();
      combatLogRender();
    } catch (err) {
      alert("Erro ao carregar combate. Certifique-se de que é um JSON válido.");
      console.error(err);
    }
  };

  reader.readAsText(file);
  input.value = "";
}

/** Log **/
function combatLogAdd(text) {
  const entry = `${stamp()} [R${combatState.round}] ${text}`;
  combatState.log.push(entry);
  if (combatState.log.length > 200) combatState.log.shift();
  combatLogRender();
}

function combatToggleLog() {
  combatState.logOpen = !combatState.logOpen;
  combatLogRender();
  combatSave();
}

function combatClearLog() {
  if (!confirm("Limpar o log?")) return;
  combatState.log = [];
  combatLogRender();
  combatSave();
  mostrarToast("Log limpo.");
}

function combatLogRender() {
  // No VTT, o log do combate é mostrado no chat
  // Os elementos combatLogWrap/combatLog não existem — log fica em combatState.log apenas
}

/** Render **/
function combatRender() {
  const list = document.getElementById("combatList");
  if (!list) return;

  if (!combatState.activeId && combatState.combatants.length > 0) {
    combatState.activeId = combatState.combatants[0].id;
  }

  // Mini topo
  const roundMini = document.getElementById("combatRoundMini");
  if (roundMini) roundMini.innerText = combatState.round;

  const activeMini = document.getElementById("combatActiveMini");
  if (activeMini) activeMini.innerText = combatGetActiveName();

  list.innerHTML = combatState.combatants.map(c => combatRowHTML(c)).join("");

  // Marca ativo e configurações específicas
  combatState.combatants.forEach(c => {
    const row = document.getElementById(`combatRow-${c.id}`);
    if (!row) return;
    row.classList.toggle("active-turn", c.id === combatState.activeId);
    row.classList.toggle("open", !!c.open);
    combatRenderNoteIndicator(c.id);

    // Clique numa condição
    row.querySelectorAll(".cond-chip").forEach(ch => {
      if (ch.dataset.bound) return;
      ch.dataset.bound = "1";
      ch.addEventListener("click", (ev) => {
        const nm = ch.getAttribute("data-cond") || "";
        combatSetCondHelp(c.id, nm);
        ev.stopPropagation();
      });
    });
  });

  // Aplica presets no select de condições
  combatState.combatants.forEach(c => {
    const sel = document.getElementById(`condSel-${c.id}`);
    if (!sel) return;
    if (sel.options.length === 0) {
      const opt0 = document.createElement("option");
      opt0.value = "";
      opt0.textContent = "—";
      sel.appendChild(opt0);

      CONDITION_LIST.forEach(n => {
        const opt = document.createElement("option");
        opt.value = n;
        opt.textContent = n;
        sel.appendChild(opt);
      });
    }

    if (!sel.dataset.bound) {
      sel.dataset.bound = "1";
      sel.addEventListener("change", () => {
        combatSetCondHelp(c.id, sel.value);
        combatSyncCondControls(c.id);
      });
    }
    combatSyncCondControls(c.id);
    if (sel.value) combatSetCondHelp(c.id, sel.value);
  });

  // Update floating initiative tracker
  renderInitTracker();
}

function combatRowHTML(c) {
  const init = parseInt(c.init) || 0;
  const hpCur = clampInt(c.hpCur, -999999, 999999, 0);
  const hpMax = clampInt(c.hpMax, 0, 999999, 0);
  const mpCur = clampInt(c.mpCur, 0, 999999, 0);
  const mpMax = clampInt(c.mpMax, 0, 999999, 0);
  const hasNotes = (c.notes || "").trim().length > 0;
  const open = !!c.open;

  const noteClass = hasNotes ? "has-notes" : "";
  const detailsClass = open ? "" : "d-none";

  const condHTML = (Array.isArray(c.conditions) && c.conditions.length)
    ? `<div class="chip-row mt-2">${c.conditions.map((x, i) => `
        <span class="cond-chip" data-cond="${escapeAttr(x.name)}" title="${escapeAttr(combatCondDesc(x.name))}">
          ${escapeHtml(x.name)} <span class="n">${clampInt(x.remaining,0,999,1)}r</span>
          <button title="-1" onclick="combatCondBump('${c.id}',${i},-1); event.stopPropagation();">-</button>
          <button title="+1" onclick="combatCondBump('${c.id}',${i},+1); event.stopPropagation();">+</button>
          <button title="Remover" onclick="combatCondRemove('${c.id}',${i}); event.stopPropagation();">×</button>
        </span>
      `).join("")}</div>`
    : `<div class="text-muted" style="font-size: 0.78rem; font-style: italic; margin-top: 6px;">Sem condições ativas.</div>`;

  const hpDisplay = hpCur > hpMax ? `+${hpCur}` : `${hpCur}`;
  const mpDisplay = mpCur > mpMax ? `+${mpCur}` : `${mpCur}`;
  const hpPct = hpMax > 0 ? clampNum((Math.max(0, Math.min(hpCur, hpMax)) / hpMax) * 100, 0, 100) : 0;
  const mpPct = mpMax > 0 ? clampNum((Math.max(0, Math.min(mpCur, mpMax)) / mpMax) * 100, 0, 100) : 0;

  // Nome em estado (PV baixo/negativo)
  const low = hpMax > 0 && hpCur >= 0 && (hpCur / hpMax) < 0.25;
  const dead = hpCur < 0;
  const nameStateClass = dead ? "hp-dead" : low ? "hp-low" : "";

  return `
  <div class="combat-row" id="combatRow-${c.id}" data-id="${c.id}">
    <div class="combat-summary" onclick="combatRowClick('${c.id}', event)">
      <div class="cs-ini">
        <i class="bi bi-grip-vertical drag-handle" title="Arrastar"></i>
        <input class="combat-init-input" type="number" inputmode="numeric" value="${init}"
          title="Editar iniciativa"
          onclick="event.stopPropagation()"
          oninput="combatUpdateInit('${c.id}', this.value)">
      </div>

      <div class="cs-name text-start">
        <span id="combatName-${c.id}" class="combat-name ${nameStateClass}">${escapeHtml(c.name || "—")}</span>
        <span id="combatNoteIndicator-${c.id}" class="combat-note-indicator ${noteClass}" title="Anotações">📝</span>
      </div>

      <div class="cs-right" onclick="event.stopPropagation()">
        <div class="combat-badges">
          <div class="bar-mini hp" title="PV atual / máximo">
            <div id="combatHPFill-${c.id}" class="fill" style="width:${hpPct}%"></div>
            <div id="combatHPText-${c.id}" class="txt">PV ${hpDisplay}/${hpMax}</div>
          </div>
          <div class="bar-mini mp" title="PM atual / máximo">
            <div id="combatMPFill-${c.id}" class="fill" style="width:${mpPct}%"></div>
            <div id="combatMPText-${c.id}" class="txt">PM ${mpDisplay}/${mpMax}</div>
          </div>
        </div>

        <div class="combat-actions-inline" onclick="event.stopPropagation()">
          <button class="btn btn-sm btn-icon-only" onclick="adicionarTokenDoCombatente('${c.id}'); event.stopPropagation();" title="Adicionar Token ao Mapa" style="color: var(--gold);">
            <i class="bi bi-person-plus-fill"></i>
          </button>
          <button class="btn btn-sm btn-icon-only" onclick="combatDuplicate('${c.id}'); event.stopPropagation();" title="Duplicar">
            <i class="bi bi-files"></i>
          </button>
          <button class="btn btn-sm btn-icon-only text-danger" onclick="combatRemove('${c.id}'); event.stopPropagation();" title="Remover">
            <i class="bi bi-trash"></i>
          </button>
        </div>

        <span class="combat-chev" aria-hidden="true">${open ? "▴" : "▾"}</span>
      </div>
    </div>

    <div id="combatDetails-${c.id}" class="combat-details ${detailsClass}">
      <div class="combat-details-grid">
        
        <!-- Bloco de PV -->
        <div class="combat-subbox">
          <div class="subbox-header">
            <span class="subbox-title hp-title">PV</span>
            <div class="combat-quick-btn-group">
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','hpCur',-5); event.stopPropagation();">-5</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','hpCur',-1); event.stopPropagation();">-1</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','hpCur',+1); event.stopPropagation();">+1</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','hpCur',+5); event.stopPropagation();">+5</button>
            </div>
          </div>
          <div class="combat-inline-fields">
            <div class="form-group">
              <label class="t20-label">Atual</label>
              <input id="combatHPcur-${c.id}" class="form-control t20-input text-center" type="number" inputmode="numeric" value="${hpCur}" oninput="combatUpdateNumber('${c.id}','hpCur',this.value)">
            </div>
            <div class="form-group">
              <label class="t20-label">Máx</label>
              <input id="combatHPmax-${c.id}" class="form-control t20-input text-center" type="number" inputmode="numeric" value="${hpMax}" oninput="combatUpdateNumber('${c.id}','hpMax',this.value)">
            </div>
          </div>
        </div>

        <!-- Bloco de PM -->
        <div class="combat-subbox">
          <div class="subbox-header">
            <span class="subbox-title mp-title">PM</span>
            <div class="combat-quick-btn-group">
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','mpCur',-5); event.stopPropagation();">-5</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','mpCur',-1); event.stopPropagation();">-1</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','mpCur',+1); event.stopPropagation();">+1</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','mpCur',+5); event.stopPropagation();">+5</button>
            </div>
          </div>
          <div class="combat-inline-fields">
            <div class="form-group">
              <label class="t20-label">Atual</label>
              <input id="combatMPcur-${c.id}" class="form-control t20-input text-center" type="number" inputmode="numeric" value="${mpCur}" oninput="combatUpdateNumber('${c.id}','mpCur',this.value)">
            </div>
            <div class="form-group">
              <label class="t20-label">Máx</label>
              <input id="combatMPmax-${c.id}" class="form-control t20-input text-center" type="number" inputmode="numeric" value="${mpMax}" oninput="combatUpdateNumber('${c.id}','mpMax',this.value)">
            </div>
          </div>
        </div>

        <!-- Estatísticas Defesa/Resistência/CD -->
        <div class="combat-subbox details-span-all">
          <div class="stats-inputs-row">
            <div class="form-group">
              <label class="t20-label">Defesa</label>
              <input class="form-control t20-input" value="${escapeHtml(c.stats?.def ?? "")}" oninput="combatUpdateStats('${c.id}','def', this.value)">
            </div>
            <div class="form-group">
              <label class="t20-label">Resistências</label>
              <input class="form-control t20-input" value="${escapeHtml(c.stats?.res ?? "")}" placeholder="Ex: Fort +8, Ref +4, Von +2" oninput="combatUpdateStats('${c.id}','res', this.value)">
            </div>
            <div class="form-group">
              <label class="t20-label">CD</label>
              <input class="form-control t20-input" value="${escapeHtml(c.stats?.cd ?? "")}" placeholder="Ex: 16" oninput="combatUpdateStats('${c.id}','cd', this.value)">
            </div>
          </div>
        </div>

        <!-- Condições -->
        <div class="combat-subbox details-span-all">
          <div class="cond-header-bar">
            <span class="t20-label" style="font-size: 0.85rem;"><i class="bi bi-shield-exclamation"></i> Condições</span>
            <div class="cond-selector-group">
              <select id="condSel-${c.id}" class="inline-mini" onclick="event.stopPropagation()"></select>
              <input id="condDur-${c.id}" class="inline-mini" type="number" inputmode="numeric" value="1" min="0" max="999" title="Duração em rodadas" onclick="event.stopPropagation()">
              <button id="condInfoBtn-${c.id}" class="btn btn-icon-only btn-sm" onclick="combatToggleCondInfo('${c.id}'); event.stopPropagation();" title="O que esta condição faz?" disabled>
                <i class="bi bi-info-circle"></i>
              </button>
              <button id="condAddBtn-${c.id}" class="btn btn-icon-only btn-sm" onclick="combatAddCondition('${c.id}'); event.stopPropagation();" title="Adicionar condição" disabled>
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
          </div>
          
          <div class="cond-popover d-none" id="condPop-${c.id}">
            <div class="cond-popover-inner">
              <div class="cond-popover-title">Condição</div>
              <div class="cond-popover-body" id="condPopBody-${c.id}"></div>
            </div>
          </div>

          ${condHTML}
          <div class="small-help mt-2" style="font-size: 0.72rem; color: var(--text-muted);">
            Duração diminui em 1 rodada automaticamente ao avançar o turno (ao sair da vez deste combatente).
          </div>
        </div>

        <!-- Anotações -->
        <div class="form-group details-span-all">
          <label class="t20-label">Anotações da Criatura / Ataques / Habilidades</label>
          <textarea class="notes-textarea" rows="4" placeholder="Reação preparada, efeitos, lembretes, itens usados ou ficha..." oninput="combatUpdateNotes('${c.id}', this.value)" onclick="event.stopPropagation()">${escapeHtml(c.notes || "")}</textarea>
        </div>

        <!-- Rodapé do Card -->
        <div class="details-footer-actions details-span-all">
          <button class="btn btn-secondary btn-sm" onclick="combatSetActive('${c.id}'); event.stopPropagation();" title="Definir como a vez atual">
            <i class="bi bi-person-check"></i> Definir Vez
          </button>
          <span class="text-muted" style="font-size: 0.75rem;">Dica: use "Duplicar" (<i class="bi bi-files"></i>) para múltiplos inimigos.</span>
        </div>

      </div>
    </div>
  </div>
  `;
}

/** Util **/
function clampInt(v, min, max, fallback) {
  const n = parseInt(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

function clampNum(v, min, max) {
  const n = Number(v);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(str) { return escapeHtml(str); }

function combatCondDesc(name) {
  return CONDITION_INFO && CONDITION_INFO[name] ? CONDITION_INFO[name] : "";
}

function combatSetCondHelp(id, name) {
  const nm = (name || "").trim();
  const desc = nm ? combatCondDesc(nm) : "";
  const pop = document.getElementById(`condPop-${id}`);
  const popBody = document.getElementById(`condPopBody-${id}`);
  const popTitle = pop ? pop.querySelector(".cond-popover-title") : null;
  if (!nm) {
    if (pop) pop.classList.add("d-none");
    return;
  }
  if (popTitle) popTitle.textContent = nm;
  if (popBody) popBody.textContent = desc || "";
  if (pop) pop.classList.remove("d-none");
}

function combatToggleCondInfo(id) {
  const pop = document.getElementById(`condPop-${id}`);
  if (!pop) return;
  const willOpen = pop.classList.contains("d-none");
  pop.classList.toggle("d-none");
  if (willOpen) {
    const sel = document.getElementById(`condSel-${id}`);
    const name = sel ? sel.value : "";
    if (!String(name || "").trim()) {
      pop.classList.add("d-none");
      return;
    }
    combatSetCondHelp(id, name);
  }
}

function stamp() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function incrementName(name) {
  const s = (name || "").trim();
  const m = s.match(/^(.*?)(\s+)(\d+)$/);
  if (m) {
    const base = m[1];
    const num = parseInt(m[3]) || 1;
    return `${base}${m[2]}${num + 1}`;
  }
  const m2 = s.match(/^(.*?)(#)(\d+)$/);
  if (m2) {
    const base = m2[1].trim();
    const num = parseInt(m2[3]) || 1;
    return `${base} #${num + 1}`;
  }
  return `${s} 2`;
}


// ──── Sobreposição: combatInit para VTT ────
function combatInit() {
  combatState = combatLoad() || combatDefaultState();
  if(!combatState||typeof combatState!=='object') combatState=combatDefaultState();
  if(!Array.isArray(combatState.combatants)) combatState.combatants=[];
  combatState.combatants.forEach(c=>{
    if(!Number.isFinite(parseInt(c.hpCur))) c.hpCur=0;
    if(!Number.isFinite(parseInt(c.mpCur))) c.mpCur=0;
    if(!Number.isFinite(parseInt(c.hpMax))) c.hpMax=Math.max(0,parseInt(c.hpCur)||0);
    if(!Number.isFinite(parseInt(c.mpMax))) c.mpMax=Math.max(0,parseInt(c.mpCur)||0);
  });
  if(!Array.isArray(combatState.log)) combatState.log=[];
  combatState.round=clampInt(combatState.round,1,9999,1);
  combatState.autoSort=!!combatState.autoSort;

  // Enter no nome adiciona
  const nameInp = document.getElementById("combatNewName");
  if (nameInp && !nameInp.dataset.boundEnter) {
    nameInp.dataset.boundEnter = "1";
    nameInp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        combatAddFromForm();
      }
    });
  }

  combatRender();
  combatBindAddFormValidation();
  combatEnableDrag();
  combatLogRender();
}

function initDbAutocomplete() {
  const datalist=document.getElementById('combatDbDatalist');
  const searchInput=document.getElementById('combatDbSearch');
  if(!datalist||!searchInput) return;
  if(typeof AMEACAS_DB!=='undefined'&&Array.isArray(AMEACAS_DB)){
    const sorted=[...AMEACAS_DB].sort((a,b)=>(a.nome||'').localeCompare(b.nome||''));
    datalist.innerHTML=sorted.map(a=>`<option value="${escHTML(a.nome)}">${escHTML(a.tipo||'Criatura')} · ND ${escHTML(a.nd||'?')}</option>`).join('');
  }
}

function onDbSearchInput() {
  const inp=document.getElementById('combatDbSearch');
  const val=(inp?.value||'').trim();
  const match=AMEACAS_DB.find(a=>(a.nome||'').toLowerCase()===val.toLowerCase());
  if(match){
    currentThreatData=match;
    const nameInp=document.getElementById('combatNewName');
    const hpInp=document.getElementById('combatNewHP');
    const mpInp=document.getElementById('combatNewMP');
    const initInp=document.getElementById('combatNewInit');
    if(nameInp) {
      nameInp.value=match.nome;
      nameInp.dispatchEvent(new Event('input'));
    }
    if(hpInp) hpInp.value=parseInt(match.pv)||0;
    if(mpInp) mpInp.value=parseInt(match.pm)||0;
    const initMod=parseInt((match.iniciativa||'+0').replace('+',''))||0;
    const roll=Math.floor(Math.random()*20)+1;
    if(initInp) {
      initInp.value=roll+initMod;
      initInp.dispatchEvent(new Event('input'));
    }
    toast(`🎲 ${match.nome} — Iniciativa: ${roll+initMod}`);
    combatBindAddFormValidation();
  }
}

// Sobreposição de combatRender para usar IDs do VTT e fazer auto-sync visual
const _origCombatRender = combatRender;
combatRender = function() {
  _origCombatRender();
  // Atualiza barra de rodada no painel VTT
  const roundEl=document.getElementById('c-round');
  const nameEl=document.getElementById('c-active-name');
  if(roundEl) roundEl.textContent=combatState?.round||1;
  if(nameEl){
    const act=(combatState?.combatants||[]).find(x=>x.id===combatState?.activeId);
    nameEl.textContent=act?act.name:'—';
  }
};

// Sobreposição para redirecionar log para o chat do VTT também
const _origCombatLogAdd = combatLogAdd;
combatLogAdd = function(text) {
  _origCombatLogAdd(text);
};

// ══════════════════════════════════════════════════════
//  INTEGRAÇÃO DA FICHA
// ══════════════════════════════════════════════════════

let fichaAberta = false;
let currentViewingPeerId = null; // PeerId do jogador cuja ficha o mestre está lendo no painel
let currentMasterFichaId = null; // Id da ficha do mestre aberta no painel
let fichasJogadores = {}; // peerId -> resumo da ficha

// Caminho para a ficha-vtt.html (deve estar no mesmo diretório)
const FICHA_URL = 'ficha-vtt.html';
const MASTER_FICHAS_KEY = 't20_mestre_fichas';

function toggleFichaPanel() {
  fichaAberta = !fichaAberta;
  const panel = document.getElementById('ficha-panel');
  const board = document.querySelector('.board');
  const btn = document.getElementById('btn-ficha');
  const iframe = document.getElementById('ficha-iframe');

  if (fichaAberta) {
    panel.classList.add('active');
    if (board) board.style.display = 'none';
    btn.textContent = '🗺 Mapa';
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-gold');
    // Carregar a ficha no iframe se ainda não carregou
    if (!iframe.src || iframe.src === window.location.href) {
      iframe.src = FICHA_URL;
    }
    // Pedir resumo imediatamente
    setTimeout(() => iframe.contentWindow?.postMessage({ type: 'vtt-request-resume' }, '*'), 1000);
  } else {
    panel.classList.remove('active');
    if (board) board.style.display = 'flex';
    btn.textContent = '📋 Ficha';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-gold');
    
    // Se for o mestre, ele oculta o botão ao fechar a ficha e limpa a visualização ativa
    if (myRole === 'mestre') {
      btn.style.display = 'none';
      currentViewingPeerId = null;
      currentMasterFichaId = null;
    }
    // Restaurar título original
    const titleEl = document.querySelector('.ficha-panel-title');
    if (titleEl) {
      titleEl.textContent = '📋 Ficha do Personagem';
    }
  }
}

// Receber mensagens da ficha (iframe postMessage)
window.addEventListener('message', (e) => {
  if (e.data?.type === 'ficha-update') {
    const resumo = e.data;
    localFichaUpdateData = resumo;
    // Atualizar status de sync se for jogador
    const statusEl = document.getElementById('ficha-sync-status');
    if (statusEl && myRole === 'jogador') {
      statusEl.textContent = '✓ ' + (resumo.charName || '—');
      statusEl.style.color = '#80c080';
    }
    // Atualizar token local do jogador para feedback imediato
    if (myRole === 'jogador') {
      let tokenChanged = false;
      BOARD.tokens.forEach(t => {
        if (t.controlledBy === myPeerId) {
          t.hp = resumo.pvC;
          t.hpMax = resumo.pvM;
          tokenChanged = true;
        }
      });
      if (tokenChanged) {
        boardRender();
      }
    }
    // Enviar resumo ao Mestre via P2P
    if (myRole === 'jogador' && masterConn) {
      try {
        masterConn.send({
          type: 'ficha-resumo',
          peerId: myPeerId,
          playerName: myName,
          resumo: resumo
        });
      } catch(err) {}
    }
  }
  if (e.data?.type === 'ficha-ready') {
    const statusEl = document.getElementById('ficha-sync-status');
    if (statusEl && myRole === 'jogador') { 
      statusEl.textContent = '✓ pronta'; 
      statusEl.style.color = '#80c080'; 
    }
    
    // Se for o mestre visualizando a ficha de um jogador, envia os dados assim que estiver pronta
    if (myRole === 'mestre' && currentViewingPeerId) {
      const entry = fichasJogadores[currentViewingPeerId];
      if (entry && entry.resumo && entry.resumo.fullData) {
        const iframe = document.getElementById('ficha-iframe');
        iframe.contentWindow?.postMessage({
          type: 'vtt-load-sheet-data',
          data: entry.resumo.fullData,
          readOnly: true
        }, '*');
      }
    }
  }
  if (e.data?.type === 'vtt-send-chat-message') {
    const msgData = {
      type: e.data.msgType || 'chat',
      name: myName,
      role: myRole,
      text: e.data.text,
      time: formatTime()
    };
    addMsg(msgData);
    
    // Adiciona rolagens/comandos que vieram da ficha ao histórico
    if (e.data.command) {
      adicionarAoHistorico(e.data.command);
    }
    if (e.data.dmgCommand) {
      adicionarAoHistorico(e.data.dmgCommand);
    }

    if (myRole === 'mestre') broadcast(msgData, null);
    else if (masterConn) {
      try { masterConn.send(msgData); } catch(err) {}
    }

    // ── Detect initiative rolls from ficha and send to combat tracker ──
    if (isInitiativeRoll(e.data.text)) {
      const initTotal = extractInitiativeTotal(e.data.text);
      if (initTotal !== null) {
        if (myRole === 'mestre') {
          // Master rolled initiative for themselves
          processarIniciativaRoll(myName, initTotal, myPeerId);
        } else if (masterConn) {
          const selToken = getSelectedTokenForInit();
          if (!selToken) {
            toast('Selecione seu token no mapa para rolar iniciativa.');
          } else {
            try {
              masterConn.send({
                type: 'solicitar-iniciativa',
                name: selToken.tokenName,
                initTotal: initTotal,
                tokenId: selToken.tokenId
              });
            } catch(err) {}
          }
        }
      }
    }
  }
});

// Mestre abre a ficha de outro jogador para ler
function abrirFichaJogador(peerId) {
  const entry = fichasJogadores[peerId];
  if (!entry || !entry.resumo || !entry.resumo.fullData) {
    alert("Dados completos da ficha ainda não foram recebidos deste jogador.");
    return;
  }

  const panel = document.getElementById('ficha-panel');
  const board = document.querySelector('.board');
  const btn = document.getElementById('btn-ficha');
  const iframe = document.getElementById('ficha-iframe');
  
  // Mudar título do painel para o nome do jogador/personagem
  const titleEl = document.querySelector('.ficha-panel-title');
  if (titleEl) {
    titleEl.textContent = `📋 Lendo Ficha: ${entry.resumo.charName || '(sem nome)'} (${entry.playerName})`;
  }

  // Atualizar status de sync
  const statusEl = document.getElementById('ficha-sync-status');
  if (statusEl) {
    statusEl.textContent = '👁️ Apenas Leitura';
    statusEl.style.color = '#c9903a';
  }

  panel.classList.add('active');
  if (board) board.style.display = 'none';

  // Exibir botão para que o mestre possa fechar / voltar ao mapa
  if (btn) {
    btn.textContent = '🗺 Mapa';
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-gold');
    btn.style.display = 'inline-flex';
  }
  
  fichaAberta = true;
  currentViewingPeerId = peerId;
  currentMasterFichaId = null;

  // Carregar a ficha no iframe se ainda não carregou
  if (!iframe.src || iframe.src === window.location.href) {
    iframe.src = FICHA_URL;
  }

  const sendData = () => {
    iframe.contentWindow?.postMessage({
      type: 'vtt-load-sheet-data',
      data: entry.resumo.fullData,
      readOnly: true
    }, '*');
  };

  // Envia os dados logo, e em caso de recarga, o 'ficha-ready' acima cuidará de enviar novamente
  setTimeout(sendData, 300);
}

function criarTokenDaFicha() {
  if (myRole === 'mestre') {
    if (currentMasterFichaId) {
      const fichas = getMasterFichas();
      const ficha = fichas.find(f => f.id === currentMasterFichaId);
      if (ficha) {
        adicionarTokenAutomatico({
          name: ficha.name,
          hp: ficha.pvC || ficha.pvM,
          hpMax: ficha.pvM,
          pm: ficha.pmC || ficha.pmM,
          pmMax: ficha.pmM,
          defense: ficha.defenseTotal,
          imageUrl: ficha.imageUrl || ficha.fullData?.charImage || '',
          controlledBy: null
        });
      } else {
        toast('Ficha do mestre não encontrada.');
      }
    } else if (currentViewingPeerId) {
      const entry = fichasJogadores[currentViewingPeerId];
      if (entry && entry.resumo) {
        adicionarTokenAutomatico({
          name: entry.resumo.charName,
          hp: entry.resumo.pvC || entry.resumo.pvM,
          hpMax: entry.resumo.pvM,
          pm: entry.resumo.pmC || entry.resumo.pmM,
          pmMax: entry.resumo.pmM,
          defense: entry.resumo.defenseTotal,
          imageUrl: entry.resumo.charImage,
          controlledBy: currentViewingPeerId
        });
      } else {
        toast('Ficha ativa sem resumo de dados.');
      }
    } else {
      toast('Nenhuma ficha aberta no momento.');
    }
  } else if (myRole === 'jogador') {
    if (localFichaUpdateData) {
      if (masterConn) {
        let localImg = '';
        try {
          localImg = localStorage.getItem('charImage') || '';
        } catch (e) {}
        const imgUrl = localFichaUpdateData.charImage || localImg;
        masterConn.send({
          type: 'solicitar-criar-token',
          name: localFichaUpdateData.charName,
          hp: localFichaUpdateData.pvC || localFichaUpdateData.pvM,
          hpMax: localFichaUpdateData.pvM,
          pm: localFichaUpdateData.pmC || localFichaUpdateData.pmM || 0,
          pmMax: localFichaUpdateData.pmM || 0,
          defense: localFichaUpdateData.defenseTotal || 0,
          imageUrl: imgUrl
        });
        toast('Solicitação de token enviada ao Mestre!');
      } else {
        toast('Sem conexão com o Mestre.');
      }
    } else {
      toast('Ficha ainda não sincronizou dados.');
    }
  }
}

function adicionarTokenAutomatico(opts) {
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const cx = BOARD.wrap.clientWidth / 2;
  const cy = BOARD.wrap.clientHeight / 2;
  const { gx, gy } = canvasToGrid(cx, cy);

  BOARD.tokens.push({
    id: 'tk' + Date.now() + Math.floor(Math.random()*9999),
    name: opts.name || 'Token',
    hp: opts.hp || 0,
    hpMax: opts.hpMax || opts.hp || 0,
    pm: opts.pm || 0,
    pmMax: opts.pmMax || opts.pm || 0,
    defense: opts.defense || 0,
    size: 1,
    color: '#c9903a',
    imageUrl: opts.imageUrl || '',
    controlledBy: opts.controlledBy || null,
    layer: 'players',
    conditions: [],
    hideName: false,
    gx: Math.max(0, gx),
    gy: Math.max(0, gy)
  });

  boardSave();
  boardRender();
  syncBoardTokensToPlayers();
  toast(`Token de ${opts.name} criado no mapa!`);
}

function temControleToken(t) {
  if (myRole === 'mestre') return true;
  return t && t.controlledBy === myPeerId;
}

function solicitarMoverToken(tokenId, gx, gy) {
  if (masterConn) {
    masterConn.send({
      type: 'solicitar-mover-token',
      tokenId,
      gx,
      gy
    });
  }
}

function popularControleSelect(selectedVal) {
  const sel = document.getElementById('tfControlledBy');
  if (!sel) return;
  sel.innerHTML = '<option value="">Apenas Mestre</option>';
  Object.entries(players).forEach(([pid, p]) => {
    if (p.role === 'jogador') {
      const opt = document.createElement('option');
      opt.value = pid;
      opt.textContent = p.name;
      if (pid === selectedVal) opt.selected = true;
      sel.appendChild(opt);
    }
  });
}

// Mestre recebe resumo de ficha de um jogador
function receberResumoFicha(data) {
  fichasJogadores[data.peerId] = { playerName: data.playerName, resumo: data.resumo, ts: Date.now() };
  renderFichasJogadores();
  combatInitFichaAutocomplete();
  
  // Sincronizar HP do token correspondente no tabuleiro do mestre
  let tokenChanged = false;
  BOARD.tokens.forEach(t => {
    if (t.controlledBy === data.peerId) {
      t.hp = data.resumo.pvC;
      t.hpMax = data.resumo.pvM;
      tokenChanged = true;
    }
  });
  if (tokenChanged) {
    boardSave();
    boardRender();
    syncBoardTokensToPlayers();
  }
  
  // Se o mestre estiver lendo essa ficha no momento, atualiza em tempo real
  if (myRole === 'mestre' && currentViewingPeerId === data.peerId) {
    const iframe = document.getElementById('ficha-iframe');
    iframe.contentWindow?.postMessage({
      type: 'vtt-load-sheet-data',
      data: data.resumo.fullData,
      readOnly: true
    }, '*');
  }
}

function renderFichasJogadores() {
  const container = document.getElementById('fichas-jogadores-list');
  if (!container) return;
  const entries = Object.entries(fichasJogadores);
  if (entries.length === 0) {
    container.innerHTML = '<div class="ficha-sem-dados">Nenhuma ficha recebida ainda.<br>Peça aos jogadores clicarem em "📋 Ficha".</div>';
    return;
  }
  container.innerHTML = '';
  entries.forEach(([pid, entry]) => {
    const r = entry.resumo;
    const pvPct = r.pvM > 0 ? Math.min(100, Math.round((r.pvC / r.pvM) * 100)) : 0;
    const pmPct = r.pmM > 0 ? Math.min(100, Math.round((r.pmC / r.pmM) * 100)) : 0;
    const hpColor = pvPct > 50 ? '#3a7a42' : pvPct > 25 ? '#8a7a1a' : '#8a2a1a';
    const card = document.createElement('div');
    card.className = 'ficha-jogador-card';
    card.onclick = () => abrirFichaJogador(pid); // Adicionado clique para abrir
    card.innerHTML = `
      <div class="ficha-jogador-nome">${escHTML(r.charName || '(sem nome)')}</div>
      <div class="ficha-jogador-classe">${escHTML(entry.playerName)} · ${escHTML(r.charClass || '—')} Nv${r.charLevel || '?'} · ${escHTML(r.charRace || '—')}</div>
      <div class="ficha-resumo-bars" style="margin-top:0.3rem;">
        <div class="ficha-resumo-bar">
          <span style="color:var(--text-muted);font-size:0.65rem;">PV</span>
          <div class="ficha-bar-track"><div class="ficha-bar-hp" style="width:${pvPct}%;background:${hpColor};"></div></div>
          <span>${r.pvC}/${r.pvM}</span>
        </div>
        ${r.pmM > 0 ? `<div class="ficha-resumo-bar">
          <span style="color:var(--text-muted);font-size:0.65rem;">PM</span>
          <div class="ficha-bar-track"><div class="ficha-bar-mp" style="width:${pmPct}%;"></div></div>
          <span>${r.pmC}/${r.pmM}</span>
        </div>` : ''}
        <div class="ficha-resumo-bar" style="margin-left:auto;">
          <span style="color:var(--text-muted);font-size:0.65rem;">Def</span>
          <span style="color:var(--gold-light);font-weight:600;">${escHTML(String(r.defenseTotal || '—'))}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ══════════════════════════════════════════════════════
//  FICHAS DO MESTRE (upload / import)
// ══════════════════════════════════════════════════════
function getMasterFichas() {
  try {
    const raw = localStorage.getItem(MASTER_FICHAS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}

function saveMasterFichas(fichas) {
  localStorage.setItem(MASTER_FICHAS_KEY, JSON.stringify(fichas));
}

function uploadFichaMestre(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      const fichas = getMasterFichas();
      const id = 'mf' + Date.now() + Math.floor(Math.random()*9999);
      const name = data.charName || data.name || 'Personagem';
      const status = data.status || {};
      fichas.push({
        id, name,
        class: data.charClass || data.class || '',
        level: data.charLevel || data.level || '1',
        race: data.charRace || data.race || '',
        pvM: status.pvM || data.pvM || 0,
        pvC: status.pvC || data.pvC || 0,
        pmM: status.pmM || data.pmM || 0,
        pmC: status.pmC || data.pmC || 0,
        defenseTotal: (data.defenseTotal && parseInt(data.defenseTotal)) || (() => {
          const d = data.defense || {};
          return 10 + (parseInt(d.armor?.bonus) || 0) + (parseInt(d.shield?.bonus) || 0);
        })(),
        imageUrl: data.charImage || data.imageUrl || '',
        fullData: data,
        importedAt: Date.now()
      });
      saveMasterFichas(fichas);
      renderMasterFichas();
      combatInitFichaAutocomplete();
      toast('📋 Ficha importada com sucesso!');
    } catch(error) {
      alert('Erro ao carregar ficha. Verifique se é um arquivo JSON de ficha válido.');
      console.error(error);
    }
  };
  reader.readAsText(file);
  input.value = '';
}

function deleteMasterFicha(id) {
  let fichas = getMasterFichas();
  fichas = fichas.filter(f => f.id !== id);
  saveMasterFichas(fichas);
  renderMasterFichas();
  combatInitFichaAutocomplete();
}

function abrirFichaMestre(id) {
  const fichas = getMasterFichas();
  const ficha = fichas.find(f => f.id === id);
  if (!ficha || !ficha.fullData) {
    alert('Dados completos da ficha não encontrados.');
    return;
  }

  const panel = document.getElementById('ficha-panel');
  const board = document.querySelector('.board');
  const btn = document.getElementById('btn-ficha');
  const iframe = document.getElementById('ficha-iframe');

  const titleEl = document.querySelector('.ficha-panel-title');
  if (titleEl) titleEl.textContent = `📋 ${ficha.name}`;

  const statusEl = document.getElementById('ficha-sync-status');
  if (statusEl) {
    statusEl.textContent = '📂 Ficha do Mestre';
    statusEl.style.color = '#c9903a';
  }

  panel.classList.add('active');
  if (board) board.style.display = 'none';

  if (btn) {
    btn.textContent = '🗺 Mapa';
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-gold');
    btn.style.display = 'inline-flex';
  }

  fichaAberta = true;
  currentViewingPeerId = null;
  currentMasterFichaId = id;

  if (!iframe.src || iframe.src === window.location.href) {
    iframe.src = FICHA_URL;
  }

  const sendData = () => {
    iframe.contentWindow?.postMessage({
      type: 'vtt-load-sheet-data',
      data: ficha.fullData,
      readOnly: true
    }, '*');
  };

  setTimeout(sendData, 300);
}

function renderMasterFichas() {
  const container = document.getElementById('fichas-mestre-list');
  if (!container) return;
  const fichas = getMasterFichas();
  if (fichas.length === 0) {
    container.innerHTML = '<div class="ficha-sem-dados">Nenhuma ficha importada ainda.<br>Use o botão acima para importar fichas do Mestre.</div>';
    return;
  }
  container.innerHTML = '';
  fichas.forEach(f => {
    const pvPct = f.pvM > 0 ? Math.min(100, Math.round((f.pvC / f.pvM) * 100)) : 0;
    const pmPct = f.pmM > 0 ? Math.min(100, Math.round((f.pmC / f.pmM) * 100)) : 0;
    const hpColor = pvPct > 50 ? '#3a7a42' : pvPct > 25 ? '#8a7a1a' : '#8a2a1a';
    const card = document.createElement('div');
    card.className = 'ficha-jogador-card';
    card.onclick = () => abrirFichaMestre(f.id);
    const safeName = escHTML(f.name);
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div class="ficha-jogador-nome">${safeName}</div>
          <div class="ficha-jogador-classe">${escHTML(f.class || '—')} Nv${f.level || '?'} · ${escHTML(f.race || '—')}</div>
        </div>
        <button class="btn btn-sm delete-ficha-btn" onclick="event.stopPropagation(); if(confirm('Excluir ${safeName}?')) deleteMasterFicha('${f.id}')">✕</button>
      </div>
      <div class="ficha-resumo-bars" style="margin-top:0.3rem;">
        <div class="ficha-resumo-bar">
          <span style="color:var(--text-muted);font-size:0.65rem;">PV</span>
          <div class="ficha-bar-track"><div class="ficha-bar-hp" style="width:${pvPct}%;background:${hpColor};"></div></div>
          <span>${f.pvC}/${f.pvM}</span>
        </div>
        ${f.pmM > 0 ? `<div class="ficha-resumo-bar">
          <span style="color:var(--text-muted);font-size:0.65rem;">PM</span>
          <div class="ficha-bar-track"><div class="ficha-bar-mp" style="width:${pmPct}%;"></div></div>
          <span>${f.pmC}/${f.pmM}</span>
        </div>` : ''}
        <div class="ficha-resumo-bar" style="margin-left:auto;">
          <span style="color:var(--text-muted);font-size:0.65rem;">Def</span>
          <span style="color:var(--gold-light);font-weight:600;">${escHTML(String(f.defenseTotal || '—'))}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ── Adaptar switchTab para fichas ──
const _origSwitchTab = switchTab;
switchTab = function(name) {
  ['encontros','combate','fichas','bau','notas'].forEach(t => {
    document.getElementById('tab-'+t)?.classList.toggle('active', t===name);
    document.getElementById('content-'+t)?.classList.toggle('active', t===name);
  });
  if (name === 'bau') initBau();
};

// ── Baú de Itens (biblioteca local T20) ──
let bauItemsCache = null;
let bauInitialized = false;
let bauCategoriaFiltro = '';

function initBau() {
  if (bauInitialized) return;
  bauInitialized = true;
  carregarBau();
}

function carregarBau() {
  const resultsEl = document.getElementById('bauResults');
  const loadingEl = document.getElementById('bauLoading');
  const errorEl = document.getElementById('bauError');
  if (!resultsEl) return;
  resultsEl.innerHTML = '';
  errorEl.style.display = 'none';
  loadingEl.style.display = 'block';
  try {
    const combined = [
      ...(typeof armasData !== 'undefined' ? (armasData.arma || []) : []),
      ...(typeof armadurasData !== 'undefined' ? (armadurasData.armadura || []) : []),
      ...(typeof itensData !== 'undefined' ? (itensData.item || []) : []),
      ...(typeof itensMagicosData !== 'undefined' ? (itensMagicosData.item || []) : []),
      ...(typeof modificacoesData !== 'undefined' ? (modificacoesData.modificacao || []) : []),
      ...(typeof enchantmentosData !== 'undefined' ? (enchantmentosData.encantamento || []) : []),
      ...(typeof maldicaoData !== 'undefined' ? (maldicaoData.maldicao || []) : [])
    ];
    if (combined.length === 0) throw new Error('Nenhum dado encontrado');
    bauItemsCache = combined;
    loadingEl.style.display = 'none';
    buscarItemBau();
    toast(`🎒 ${bauItemsCache.length} itens carregados!`);
  } catch (e) {
    console.error('Erro ao carregar baú:', e);
    loadingEl.style.display = 'none';
    errorEl.textContent = 'Erro ao carregar itens: ' + e.message;
    errorEl.style.display = 'block';
    if (!bauItemsCache) {
      resultsEl.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Clique em "⟳" para tentar novamente.</div>';
    }
  }
}

function buscarItemBau() {
  const input = document.getElementById('bauSearch');
  const termo = (input?.value || '').toLowerCase().trim();
  const resultsEl = document.getElementById('bauResults');
  if (!resultsEl) return;
  if (!bauItemsCache) {
    resultsEl.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Carregando itens...</div>';
    carregarBau();
    return;
  }
  let filtrados = bauItemsCache;
  if (bauCategoriaFiltro) {
    filtrados = filtrados.filter(i => i.categoria === bauCategoriaFiltro);
  }
  if (termo) {
    filtrados = filtrados.filter(i =>
      (i.nome || '').toLowerCase().includes(termo) ||
      (i.categoria || '').toLowerCase().includes(termo) ||
      (i.tipo || '').toLowerCase().includes(termo) ||
      (i.descricao || '').toLowerCase().includes(termo)
    );
  }
  renderBauItems(filtrados.slice(0, 200));
}

function setBauCategoria(btn, cat) {
  bauCategoriaFiltro = cat;
  document.querySelectorAll('.bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buscarItemBau();
}

function renderBauItems(items) {
  const el = document.getElementById('bauResults');
  if (!el) return;
  if (items.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhum item encontrado.</div>';
    return;
  }
  const catColors = {
    'Arma': '#c94040', 'Armadura': '#4070c9', 'Escudo': '#40a060',
    'Item Geral': '#9c8a72', 'Item Superior': '#c9903a', 'Item Mágico': '#9040c9',
    'encantamento': '#40a0c9', 'Maldição': '#8a2040'
  };
  el.innerHTML = items.map(item => {
    const cat = item.categoria || '';
    const cor = catColors[cat] || '#9c8a72';
    const extras = [];
    if (item.dano) extras.push('⚔ ' + escHTML(item.dano));
    if (item.bonus_defesa) extras.push('🛡 ' + escHTML(item.bonus_defesa));
    if (item.empunhadura) extras.push(escHTML(item.empunhadura));
    const extraStr = extras.length ? ' · ' + extras.join(' ') : '';
    const preco = item.preco ? ' · ' + escHTML(item.preco) : '';
    return `<div onclick="criarTokenDoBau('${escHTML(item.nome)}')" style="display:flex;align-items:center;gap:0.5rem;padding:0.35rem 0.5rem;background:var(--parch3);border:1px solid var(--border);border-radius:3px;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'" title="${escHTML((item.descricao || '').substring(0, 120))}">
      <span style="width:20px;height:20px;border-radius:50%;background:${cor};display:flex;align-items:center;justify-content:center;font-size:0.55rem;font-weight:700;color:#fff;flex-shrink:0;">${cat === 'encantamento' ? 'E' : cat === 'Maldição' ? 'M' : cat === 'Item Mágico' ? 'IM' : cat === 'Item Superior' ? 'S' : cat === 'Item Geral' ? 'G' : cat === 'Armadura' ? 'A' : cat === 'Escudo' ? 'E' : 'W'}</span>
      <div style="flex:1;min-width:0;">
        <div style="font-size:0.75rem;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHTML(item.nome)}</div>
        <div style="font-size:0.6rem;color:var(--text-muted);">${escHTML(cat)}${item.tipo ? ' · ' + escHTML(item.tipo) : ''}${preco}${extraStr}</div>
      </div>
    </div>`;
  }).join('');
}

function criarTokenDoBau(itemName) {
  if (!itemName) return;
  adicionarTokenAutomatico({
    name: itemName,
    hp: 1, hpMax: 1,
    color: '#c9903a',
    imageUrl: '',
    controlledBy: null
  });
  toast(`🎒 Token de "${itemName}" criado no mapa!`);
}

// ── Pergaminhos (Notas do Mestre) ──
let vttNotas = [];

function syncNotasToPlayers() {
  if (myRole !== 'mestre') return;
  const visiveis = vttNotas.filter(n => n.visible);
  broadcast({ type: 'pergaminhos', notas: visiveis }, null);
}

function renderNotas() {
  const list = document.getElementById('notasList');
  const empty = document.getElementById('notasEmpty');
  if (!list) return;
  if (vttNotas.length === 0) {
    list.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  list.innerHTML = vttNotas.map(n => {
    const preview = (n.content || '').substring(0, 80).replace(/\n/g, ' ');
    return `<div style="background:var(--parch3);border:1px solid ${n.visible ? 'var(--gold)' : 'var(--border)'};border-radius:4px;padding:0.4rem 0.5rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:0.3rem;">
        <span style="font-size:0.75rem;color:var(--text);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:'Cinzel',serif;">${escHTML(n.title || 'Sem título')}</span>
        <div style="display:flex;gap:0.25rem;flex-shrink:0;">
          <button onclick="toggleNotaVisivel('${n.id}')" style="background:none;border:none;cursor:pointer;font-size:0.85rem;${n.visible ? 'color:var(--gold);' : 'color:var(--text-muted);'}" title="${n.visible ? 'Visível aos jogadores' : 'Oculto'}">👁</button>
          <button onclick="editarPergaminho('${n.id}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:0.75rem;" title="Editar">✎</button>
          <button onclick="deletarPergaminho('${n.id}')" style="background:none;border:none;cursor:pointer;color:var(--red-bright);font-size:0.75rem;" title="Excluir">✕</button>
        </div>
      </div>
      ${preview ? `<div style="font-size:0.6rem;color:var(--text-muted);margin-top:0.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHTML(preview)}</div>` : ''}
    </div>`;
  }).join('');
}

function criarPergaminho() {
  const title = prompt('Título do pergaminho:');
  if (!title) return;
  const content = prompt('Conteúdo do pergaminho:');
  if (content === null) return;
  const id = 'nt' + Date.now() + Math.floor(Math.random() * 9999);
  vttNotas.push({ id, title, content: content || '', visible: false });
  renderNotas();
  toast(`📜 Pergaminho "${title}" criado!`);
}

function editarPergaminho(id) {
  const nota = vttNotas.find(n => n.id === id);
  if (!nota) return;
  const title = prompt('Título:', nota.title);
  if (!title) return;
  const content = prompt('Conteúdo:', nota.content);
  if (content === null) return;
  nota.title = title;
  nota.content = content || '';
  renderNotas();
  if (nota.visible) syncNotasToPlayers();
  toast(`📜 Pergaminho "${title}" atualizado.`);
}

function deletarPergaminho(id) {
  const nota = vttNotas.find(n => n.id === id);
  if (!nota) return;
  if (!confirm(`Excluir pergaminho "${nota.title}"?`)) return;
  const wasVisible = nota.visible;
  vttNotas = vttNotas.filter(n => n.id !== id);
  renderNotas();
  if (wasVisible) syncNotasToPlayers();
  toast('Pergaminho excluído.');
}

function toggleNotaVisivel(id) {
  const nota = vttNotas.find(n => n.id === id);
  if (!nota) return;
  nota.visible = !nota.visible;
  renderNotas();
  syncNotasToPlayers();
  toast(nota.visible ? `📜 "${nota.title}" agora visível aos jogadores.` : `📜 "${nota.title}" ocultado.`);
}

// ── Jogadores: receber pergaminhos ──
function receberPergaminhos(notas) {
  const btn = document.getElementById('notasPlayerBtn');
  const panelContent = document.getElementById('notasPlayerContent');
  const panelWrap = document.getElementById('notasPlayerPanel');
  if (!panelContent) return;
  if (!notas || notas.length === 0) {
    if (btn) btn.style.display = 'none';
    if (panelWrap) panelWrap.style.display = 'none';
    panelContent.innerHTML = '';
    return;
  }
  if (btn) btn.style.display = 'block';
  panelContent.innerHTML = notas.map(n => `
    <div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.5rem;">
      <div style="font-family:'Cinzel',serif;font-size:0.7rem;color:var(--gold);margin-bottom:0.3rem;">${escHTML(n.title)}</div>
      <div style="font-size:0.75rem;color:var(--text);white-space:pre-wrap;word-wrap:break-word;line-height:1.4;">${escHTML(n.content)}</div>
    </div>
  `).join('');
}

function toggleNotasPlayer() {
  const panel = document.getElementById('notasPlayerPanel');
  if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// ── Adaptar entrarNoAmbiente para jogadores verem o botão ficha ──
const _origEntrarNoAmbiente = entrarNoAmbiente;
entrarNoAmbiente = function() {
  _origEntrarNoAmbiente();
  if (myRole === 'mestre') {
    initBau();
  }
  if (myRole === 'jogador') {
    document.getElementById('btn-ficha').style.display = 'inline-flex';
  }
};

// ── Adaptar configurarConexaoMestre para receber resumos de ficha ──
const _origConfigMestre = configurarConexaoMestre;
configurarConexaoMestre = function(conn) {
  _origConfigMestre(conn);
  // Patch: conn.on('data') já está configurado, mas precisamos adicionar handler
  // O original já tem um switch; vamos usar a recepção no broadcast geral
};

// ── Patch no handler de dados do mestre para receber ficha-resumo ──
// (sobrescrever o handler de data nas conexões)
const _origBroadcast = broadcast;
// Patch na função de recepção P2P do mestre: adicionar case 'ficha-resumo'
// Isso é feito interceptando o configurarConexaoMestre
const _origConfigMestreReal = configurarConexaoMestre;
configurarConexaoMestre = function(conn) {
  conn.on('open', () => {
    connections[conn.peer] = conn;
    conn.on('data', (data) => {
      if (data.type === 'join') {
        players[conn.peer] = { name: data.name, role: 'jogador' }; renderPlayers();
        conn.send({ type: 'room-info', roomTitle, players });
        broadcast({ type: 'player-joined', peerId: conn.peer, name: data.name }, conn.peer);
        const jm = { type: 'system', text: data.name + ' entrou na mesa' };
        addMsg(jm); broadcast({ type: 'chat', ...jm }, null);
        broadcast({ type: 'players-update', players }, null);
      } else if (data.type === 'chat' || data.type === 'roll') {
        addMsg(data); broadcast(data, conn.peer);
      } else if (data.type === 'solicitar-iniciativa') {
        // Player explicitly requests to set their initiative
        processarIniciativaRoll(data.name || players[conn.peer]?.name || 'Jogador', data.initTotal, conn.peer);
      } else if (data.type === 'leave') {
        const n = players[conn.peer]?.name || 'Alguém';
        delete players[conn.peer]; delete connections[conn.peer]; renderPlayers();
        const lm = { type: 'system', text: n + ' saiu da mesa' };
        addMsg(lm); broadcast({ type: 'chat', ...lm }, null);
        broadcast({ type: 'players-update', players }, null);
      } else if (data.type === 'ficha-resumo') {
        receberResumoFicha(data);
        // Notificar no chat discretamente (apenas uma vez)
        const key = 'ficha_notif_' + data.peerId;
        if (!window[key]) {
          window[key] = true;
          addMsg({ type: 'system', text: '📋 Ficha de ' + data.playerName + ' recebida.' });
        }
      } else if (data.type === 'solicitar-criar-token') {
        const entry = fichasJogadores[conn.peer];
        const r = entry?.resumo;
        adicionarTokenAutomatico({
          name: data.name,
          hp: data.hp ?? r?.pvC ?? r?.pvM ?? 0,
          hpMax: data.hpMax ?? r?.pvM ?? data.hp ?? 0,
          pm: data.pm ?? r?.pmC ?? r?.pmM ?? 0,
          pmMax: data.pmMax ?? r?.pmM ?? data.pm ?? 0,
          defense: data.defense ?? r?.defenseTotal ?? 0,
          imageUrl: data.imageUrl || r?.charImage || '',
          controlledBy: conn.peer
        });
      } else if (data.type === 'solicitar-mover-token') {
        const t = BOARD.tokens.find(tk => tk.id === data.tokenId);
        if (t && t.controlledBy === conn.peer) {
          if (checkMoveBlocked(t, t.gx, t.gy, data.gx, data.gy)) {
            // Rejeitar movimento. Enviar atualização de sync para forçar o revert no cliente do jogador.
            syncBoardTokensToPlayers();
          } else {
            t.gx = data.gx;
            t.gy = data.gy;
            boardSave();
            boardRender();
            syncBoardTokensToPlayers();
          }
        }
      } else if (data.type === 'solicitar-alternar-parede') {
        const w = BOARD.walls.find(wall => wall.id === data.wallId);
        if (w) {
          w.open = !w.open;
          boardSave();
          boardRender();
          syncWallsToPlayers();
          setTimeout(atualizarFogJogador, 50);
        }
      }
    });
    conn.on('close', () => {
      if (players[conn.peer]) {
        const n = players[conn.peer].name;
        delete players[conn.peer]; delete connections[conn.peer]; renderPlayers();
        const lm = { type: 'system', text: n + ' desconectou' };
        addMsg(lm); broadcast({ type: 'chat', ...lm }, null);
        broadcast({ type: 'players-update', players }, null);
      }
    });
  });
};


// ══════════════════════════════════════════════════════
//  TABULEIRO — Arsenal VTT
// ══════════════════════════════════════════════════════

const BOARD = {
  canvas: null, ctx: null, wrap: null,
  activeLayer: 'players',
  // Viewport
  offsetX: 0, offsetY: 0, zoom: 1,
  // Grade
  gridOn: true, gridSize: 50,
  // Mapa
  mapImg: null, mapDataUrl: null,
  // Tokens: array de { id, name, hp, hpMax, color, size, gx, gy }
  tokens: [],
  // Paredes: array de { id, x1, y1, x2, y2 } em coords world
  walls: [],
  // Fog of War: Set de "gx,gy" visíveis (calculado dinamicamente)
  // null = sem fog (mestre); Set = células visíveis (jogador)
  fogVisible: null,
  // Drag
  dragging: null, dragOffX: 0, dragOffY: 0,
  // Pan
  panning: false, panStartX: 0, panStartY: 0,
  // Tool
  tool: 'move',
  // Tipo de parede selecionado para desenhar ('normal', 'invisible', 'door', 'window')
  wallType: 'normal',
  // Desenho de parede em andamento
  wallDrawing: false, wallStartX: 0, wallStartY: 0, wallCurX: 0, wallCurY: 0,
  // Hover
  hovered: null,
  // Edit
  editingTokenId: null,
  // Pinch
  lastPinchDist: 0,
  // Seleção de tokens (marquee)
  selectedTokens: new Set(),
  marquee: null, // { startX, startY, curX, curY } em coords do wrap
  // Handle drag (rotação/redimensionamento)
  handleDrag: null, // { tokenId, type: 'rotate'|'resize', startAngle, startSize }
  // Visão como jogador (mestre vê através do token de um jogador)
  playerViewTokenId: null,
  playerViewTokenName: '',
};

function boardInit() {
  BOARD.canvas = document.getElementById('boardCanvas');
  BOARD.ctx = BOARD.canvas.getContext('2d');
  BOARD.wrap = document.getElementById('canvasWrap');
  if (!BOARD.canvas) return;
  isBoardInitialized = true;
  boardResize();
  window.addEventListener('resize', boardResize);
  boardBindEvents();
  boardRender();
}

function boardResize() {
  const wrap = BOARD.wrap;
  if (!wrap) return;
  const w = wrap.clientWidth, h = wrap.clientHeight;
  BOARD.canvas.width = w; BOARD.canvas.height = h;
  boardRender();
}

// ── Render principal ──
function boardRender() {
  const { canvas, ctx, offsetX, offsetY, zoom, gridOn, gridSize, mapImg, tokens, dragging, hovered } = BOARD;
  if (!ctx) return;
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(zoom, zoom);

  // Mapa
  if (mapImg) {
    ctx.globalAlpha = 1;
    ctx.drawImage(mapImg, 0, 0);
  } else {
    // Fundo escuro (pergaminho)
    ctx.fillStyle = '#1a1410';
    ctx.fillRect(-offsetX/zoom, -offsetY/zoom, W/zoom, H/zoom);
  }

  // Grade
  if (gridOn) drawGrid(ctx, W, H);

  // Fog of War (jogadores)
  if (BOARD.fogVisible) drawFog(ctx, W, H);

  // Paredes
  drawWalls(ctx);

  // Preview de parede sendo desenhada
  if (BOARD.wallDrawing) drawWallPreview(ctx);

  // Tokens (ordenação por camadas: map < players / gm)
  const renderTokens = tokens.filter(t => {
    const layer = t.layer || 'players';
    if (layer === 'gm' && myRole !== 'mestre') return false;
    return true;
  });

  renderTokens.sort((a, b) => {
    const layerA = a.layer || 'players';
    const layerB = b.layer || 'players';
    if (layerA === layerB) return 0;
    if (layerA === 'map') return -1;
    if (layerB === 'map') return 1;
    return 0;
  });

  renderTokens.forEach(t => drawToken(ctx, t, t.id === (BOARD.dragging?.id), t.id === BOARD.hovered));

  ctx.restore();
}

function drawGrid(ctx, W, H) {
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const gs = gridSize;
  const startX = ((-offsetX / zoom) % gs + gs) % gs;
  const startY = ((-offsetY / zoom) % gs + gs) % gs;
  const endX = W / zoom + gs;
  const endY = H / zoom + gs;

  ctx.beginPath();
  ctx.strokeStyle = 'rgba(107,77,42,0.35)';
  ctx.lineWidth = 0.5 / zoom;

  for (let x = startX - gs - offsetX/zoom; x < endX - offsetX/zoom; x += gs) {
    ctx.moveTo(x, -offsetY/zoom);
    ctx.lineTo(x, endY - offsetY/zoom);
  }
  for (let y = startY - gs - offsetY/zoom; y < endY - offsetY/zoom; y += gs) {
    ctx.moveTo(-offsetX/zoom, y);
    ctx.lineTo(endX - offsetX/zoom, y);
  }
  ctx.stroke();
}

// ══════════════════════════════════════════════════════
//  PAREDES — render
// ══════════════════════════════════════════════════════
function drawWalls(ctx) {
  const walls = BOARD.walls;
  if (!walls || walls.length === 0) return;
  ctx.save();

  walls.forEach(w => {
    const type = w.type || 'normal';
    
    // Paredes invisíveis: desenhar apenas para o mestre (pontilhado azul-celeste)
    if (type === 'invisible') {
      if (myRole !== 'mestre') return;
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.5)';
      ctx.lineWidth = 3 / BOARD.zoom;
      ctx.setLineDash([6 / BOARD.zoom, 6 / BOARD.zoom]);
      ctx.beginPath();
      ctx.moveTo(w.x1, w.y1);
      ctx.lineTo(w.x2, w.y2);
      ctx.stroke();
      ctx.restore();
      return;
    }

    // Paredes normais
    if (type === 'normal') {
      ctx.save();
      ctx.strokeStyle = '#5a3a1a';
      ctx.lineWidth = 4 / BOARD.zoom;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4 / BOARD.zoom;
      ctx.beginPath();
      ctx.moveTo(w.x1, w.y1);
      ctx.lineTo(w.x2, w.y2);
      ctx.stroke();
      
      // Contorno brilhante por cima
      ctx.strokeStyle = 'rgba(160,100,40,0.6)';
      ctx.lineWidth = 1.5 / BOARD.zoom;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(w.x1, w.y1);
      ctx.lineTo(w.x2, w.y2);
      ctx.stroke();
      ctx.restore();
      return;
    }

    // Portas e Janelas
    ctx.save();
    ctx.lineCap = 'round';
    
    let baseColor = '#5a3a1a';
    let topColor = 'rgba(160,100,40,0.6)';
    let isDashed = false;
    
    if (type === 'door') {
      if (w.open) {
        baseColor = 'rgba(76, 175, 80, 0.2)'; // verde translúcido quando aberta
        topColor = 'rgba(76, 175, 80, 0.5)';
        isDashed = true;
      } else {
        baseColor = '#d32f2f'; // vermelho quando fechada
        topColor = '#ef5350';
      }
    } else if (type === 'window') {
      if (w.open) {
        baseColor = 'rgba(3, 169, 244, 0.2)'; // azul translúcido quando aberta
        topColor = 'rgba(3, 169, 244, 0.5)';
        isDashed = true;
      } else {
        baseColor = '#0288d1'; // azul quando fechada
        topColor = '#29b6f6';
      }
    }
    
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = 5 / BOARD.zoom;
    if (isDashed) {
      ctx.setLineDash([4 / BOARD.zoom, 4 / BOARD.zoom]);
    }
    ctx.beginPath();
    ctx.moveTo(w.x1, w.y1);
    ctx.lineTo(w.x2, w.y2);
    ctx.stroke();
    
    ctx.strokeStyle = topColor;
    ctx.lineWidth = 2 / BOARD.zoom;
    ctx.beginPath();
    ctx.moveTo(w.x1, w.y1);
    ctx.lineTo(w.x2, w.y2);
    ctx.stroke();
    
    ctx.restore();
  });
  
  // Desenhar os handles interativos (A/F) por cima
  walls.forEach(w => {
    const type = w.type || 'normal';
    if (type === 'door' || type === 'window') {
      const mx = (w.x1 + w.x2) / 2;
      const my = (w.y1 + w.y2) / 2;
      const r = 9 / BOARD.zoom;
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(mx, my, r, 0, Math.PI * 2);
      
      let fillColor = '#ffffff';
      let strokeColor = '#333333';
      
      if (type === 'door') {
        fillColor = w.open ? '#4caf50' : '#f44336'; // Verde se aberta, Vermelho se fechada
        strokeColor = w.open ? '#2e7d32' : '#c62828';
      } else if (type === 'window') {
        fillColor = w.open ? '#03a9f4' : '#9e9e9e'; // Azul se aberta (visão livre), Cinza se fechada
        strokeColor = w.open ? '#0277bd' : '#757575';
      }
      
      ctx.fillStyle = fillColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2 / BOARD.zoom;
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 4 / BOARD.zoom;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.stroke();
      
      // Letra central: A (Aberta), F (Fechada)
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.max(6, 9 / BOARD.zoom)}px Cinzel, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const label = w.open ? 'A' : 'F';
      ctx.fillText(label, mx, my + 0.5 / BOARD.zoom);
      
      ctx.restore();
    }
  });

  ctx.restore();
}

function drawWallPreview(ctx) {
  const { wallStartX, wallStartY, wallCurX, wallCurY, wallType } = BOARD;
  ctx.save();
  
  let strokeStyle = 'rgba(232,185,106,0.8)'; // normal (brownish)
  if (wallType === 'invisible') strokeStyle = 'rgba(0, 191, 255, 0.6)';
  else if (wallType === 'door') strokeStyle = 'rgba(211, 47, 47, 0.8)';
  else if (wallType === 'window') strokeStyle = 'rgba(2, 136, 209, 0.8)';
  
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 3 / BOARD.zoom;
  ctx.lineCap = 'round';
  ctx.setLineDash([8 / BOARD.zoom, 4 / BOARD.zoom]);
  ctx.beginPath();
  ctx.moveTo(wallStartX, wallStartY);
  ctx.lineTo(wallCurX, wallCurY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

// ══════════════════════════════════════════════════════
//  FOG OF WAR — render e cálculo
// ══════════════════════════════════════════════════════
function drawFog(ctx, W, H) {
  if (!BOARD.fogVisible) return;
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const gs = gridSize;
  // Colunas/linhas visíveis na tela
  const x0 = Math.floor(-offsetX / zoom / gs) - 1;
  const y0 = Math.floor(-offsetY / zoom / gs) - 1;
  const x1 = Math.ceil((W / zoom - offsetX / zoom) / gs) + 1;
  const y1 = Math.ceil((H / zoom - offsetY / zoom) / gs) + 1;

  ctx.save();
  ctx.fillStyle = 'rgba(10,8,6,0.82)';
  for (let gx = x0; gx <= x1; gx++) {
    for (let gy = y0; gy <= y1; gy++) {
      if (!BOARD.fogVisible.has(`${gx},${gy}`)) {
        ctx.fillRect(gx * gs, gy * gs, gs, gs);
      }
    }
  }
  ctx.restore();
}

// Computa as células visíveis a partir de um token (raycasting simples)
// Retorna um Set de "gx,gy"
function computeVisibility(token, radius = 12) {
  const { gridSize, walls } = BOARD;
  const gs = gridSize;
  const sz = (token.size || 1);
  const ox = token.gx * gs + sz * gs / 2;
  const oy = token.gy * gs + sz * gs / 2;

  const visible = new Set();
  const gx0 = Math.floor(ox / gs);
  const gy0 = Math.floor(oy / gs);

  for (let dgx = -radius; dgx <= radius; dgx++) {
    for (let dgy = -radius; dgy <= radius; dgy++) {
      if (dgx * dgx + dgy * dgy > radius * radius) continue;
      const gx = gx0 + dgx;
      const gy = gy0 + dgy;
      if (gx < 0 || gy < 0) continue;
      // Centro da célula destino
      const tx = gx * gs + gs / 2;
      const ty = gy * gs + gs / 2;
      if (!rayHitsWall(ox, oy, tx, ty, walls)) {
        visible.add(`${gx},${gy}`);
      }
    }
  }
  return visible;
}

function wallBlocksVision(w) {
  const type = w.type || 'normal';
  if (type === 'invisible') return false;
  if (type === 'door' && w.open) return false;
  if (type === 'window' && w.open) return false;
  return true; // normal wall, closed door, closed window
}

function wallBlocksMovement(w) {
  const type = w.type || 'normal';
  if (type === 'door' && w.open) return false;
  return true; // normal wall, invisible wall, closed door, open/closed window
}

function checkMoveBlocked(token, fromGx, fromGy, toGx, toGy) {
  const { gridSize, walls } = BOARD;
  const sz = (token.size || 1) * gridSize;
  const startX = fromGx * gridSize + sz / 2;
  const startY = fromGy * gridSize + sz / 2;
  const endX = toGx * gridSize + sz / 2;
  const endY = toGy * gridSize + sz / 2;

  for (const w of walls) {
    if (wallBlocksMovement(w)) {
      if (segmentsIntersect(startX, startY, endX, endY, w.x1, w.y1, w.x2, w.y2)) {
        return true;
      }
    }
  }
  return false;
}

// Interseção de segmentos (retorna true se há bloqueio)
function rayHitsWall(ax, ay, bx, by, walls) {
  for (const w of walls) {
    if (wallBlocksVision(w)) {
      if (segmentsIntersect(ax, ay, bx, by, w.x1, w.y1, w.x2, w.y2)) return true;
    }
  }
  return false;
}

function segmentsIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
  const d1x = bx - ax, d1y = by - ay;
  const d2x = dx - cx, d2y = dy - cy;
  const cross = d1x * d2y - d1y * d2x;
  if (Math.abs(cross) < 1e-10) return false;
  const dx2 = cx - ax, dy2 = cy - ay;
  const t = (dx2 * d2y - dy2 * d2x) / cross;
  const u = (dx2 * d1y - dy2 * d1x) / cross;
  return t > 0.001 && t < 0.999 && u > 0.001 && u < 0.999;
}

// Atualiza o fog para jogadores com base nos tokens que controlam
function atualizarFogJogador() {
  // Mestre com visão de jogador ativa
  if (myRole === 'mestre' && BOARD.playerViewTokenId) {
    const token = BOARD.tokens.find(t => t.id === BOARD.playerViewTokenId);
    if (!token) { exitPlayerView(); return; }
    const radius = token.visaoRange || 12;
    BOARD.fogVisible = computeVisibility(token, radius);
    boardRender();
    return;
  }
  if (myRole === 'mestre') { BOARD.fogVisible = null; boardRender(); return; }
  const meusTokens = BOARD.tokens.filter(t => t.controlledBy === myPeerId);
  if (meusTokens.length === 0) {
    BOARD.fogVisible = new Set();
    boardRender(); return;
  }
  const total = new Set();
  meusTokens.forEach(t => {
    const radius = t.visaoRange || 12;
    computeVisibility(t, radius).forEach(k => total.add(k));
  });
  BOARD.fogVisible = total;
  boardRender();
}

function drawToken(ctx, t, isDragging, isHovered) {
  const layer = t.layer || 'players';
  if (layer === 'gm' && myRole !== 'mestre') return;
  const isObject = t.type === 'object';

  // Fog visibility check — oculta tokens em células não visíveis
  if (BOARD.fogVisible && !isObject) {
    const sz = (t.size || 1);
    const cx = t.gx * BOARD.gridSize + sz * BOARD.gridSize / 2;
    const cy = t.gy * BOARD.gridSize + sz * BOARD.gridSize / 2;
    const tgx = Math.floor(cx / BOARD.gridSize);
    const tgy = Math.floor(cy / BOARD.gridSize);
    if (!BOARD.fogVisible.has(`${tgx},${tgy}`)) return;
  }

  const isSelected = BOARD.selectedTokens.has(t.id);
  const rotation = t.rotation || 0;
  const { gridSize } = BOARD;
  const gs = gridSize;
  const sz = (t.size || 1) * gs;
  const px = t.gx * gs + sz / 2;
  const py = t.gy * gs + sz / 2;
  const r = isObject ? sz / 2 : sz * 0.42;

  ctx.save();

  // Se for camada GM, desenha semi-transparente para o mestre
  if (layer === 'gm') {
    ctx.globalAlpha = 0.5;
  }

  if (isObject) {
    // ── Objeto de cena (imagem quadrada, sem stats) ──
    if (t.imageUrl) {
      let img = tokenImageCache[t.imageUrl];
      if (!img) {
        img = new Image();
        img.src = t.imageUrl;
        img.onload = () => boardRender();
        tokenImageCache[t.imageUrl] = img;
      }
      if (img.complete && img.naturalWidth !== 0) {
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(rotation);
        ctx.translate(-px, -py);
        ctx.drawImage(img, px - r, py - r, sz, sz);
        ctx.restore();
      } else {
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(px - r, py - r, sz, sz);
      }
    } else {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(px - r, py - r, sz, sz);
    }
    // Borda quadrada
    ctx.strokeStyle = isDragging ? '#e8b96a' : isHovered ? '#c9903a' : (isSelected ? '#00bfff' : 'rgba(255,255,255,0.2)');
    ctx.lineWidth = (isDragging || isSelected ? 2.5 : 1) / BOARD.zoom;
    ctx.strokeRect(px - r, py - r, sz, sz);
    // Handles para objetos
    if (isSelected) {
      const hSize = 7 / BOARD.zoom;
      const half = sz / 2;
      const rotOff = half + 14 / BOARD.zoom;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(px + half * 0.7 * Math.sin(rotation), py - half * 0.7 * Math.cos(rotation));
      ctx.lineTo(px + rotOff * Math.sin(rotation), py - rotOff * Math.cos(rotation));
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.6)';
      ctx.lineWidth = 1.5 / BOARD.zoom;
      ctx.stroke();
      const rotHX2 = px + rotOff * Math.sin(rotation);
      const rotHY2 = py - rotOff * Math.cos(rotation);
      ctx.fillStyle = '#00bfff';
      ctx.strokeStyle = '#005f7f';
      ctx.lineWidth = 1 / BOARD.zoom;
      ctx.fillRect(rotHX2 - hSize / 2, rotHY2 - hSize / 2, hSize, hSize);
      ctx.strokeRect(rotHX2 - hSize / 2, rotHY2 - hSize / 2, hSize, hSize);
      ctx.restore();
      const rhX2 = px + half * Math.cos(rotation) - half * Math.sin(rotation);
      const rhY2 = py + half * Math.sin(rotation) + half * Math.cos(rotation);
      ctx.save();
      ctx.fillStyle = '#00ff88';
      ctx.strokeStyle = '#007744';
      ctx.lineWidth = 1 / BOARD.zoom;
      ctx.fillRect(rhX2 - hSize / 2, rhY2 - hSize / 2, hSize, hSize);
      ctx.strokeRect(rhX2 - hSize / 2, rhY2 - hSize / 2, hSize, hSize);
      ctx.restore();
    }
    ctx.restore();
    return;
  }

  // Glow de seleção (anel cyan)
  if (isSelected) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, r + 4 / BOARD.zoom, 0, Math.PI * 2);
    ctx.strokeStyle = '#00bfff';
    ctx.lineWidth = 2.5 / BOARD.zoom;
    ctx.shadowColor = 'rgba(0, 191, 255, 0.7)';
    ctx.shadowBlur = 10 / BOARD.zoom;
    ctx.stroke();
    ctx.restore();
  }

  // Sombra
  if (isDragging || isHovered) {
    ctx.shadowColor = 'rgba(201,144,58,0.6)';
    ctx.shadowBlur = 12 / BOARD.zoom;
  }

  // Círculo base
  ctx.beginPath();
  ctx.arc(px, py, r, 0, Math.PI * 2);
  ctx.fillStyle = t.color || '#c94040';
  ctx.fill();

  // Desenhar retrato se houver (com rotação)
  let hasDrawnImage = false;
  if (t.imageUrl) {
    let img = tokenImageCache[t.imageUrl];
    if (!img) {
      img = new Image();
      img.src = t.imageUrl;
      img.onload = () => boardRender();
      tokenImageCache[t.imageUrl] = img;
    }
    if (img.complete && img.naturalWidth !== 0) {
      ctx.save();
      // Aplicar rotação ao retrato
      ctx.translate(px, py);
      ctx.rotate(rotation);
      ctx.translate(-px, -py);

      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.clip();

      // Resolve custom image position (default, database, or local override)
      let imagePosition = t.imagePosition || '50% 50%';
      if (t.name) {
        const cleanName = t.name.replace(/\s+\d+$/, '').trim();
        const customEntry = t20ThreatImagesCache[cleanName];
        if (customEntry && typeof customEntry === 'object' && customEntry.position) {
          imagePosition = customEntry.position;
        }
      }

      let posX = 50;
      let posY = 50;
      const m = imagePosition.match(/(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%/);
      if (m) {
        posX = parseFloat(m[1]);
        posY = parseFloat(m[2]);
      }

      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const s = Math.min(w, h);
      
      let sx = 0;
      let sy = 0;
      
      if (w > h) {
        sx = (w - h) * posX / 100;
      } else {
        sy = (h - w) * posY / 100;
      }

      ctx.drawImage(img, sx, sy, s, s, px - r, py - r, r * 2, r * 2);
      ctx.restore();
      hasDrawnImage = true;
    }
  }

  // Borda (Roxa tracejada para GM)
  ctx.strokeStyle = isDragging ? '#e8b96a' : isHovered ? '#c9903a' : (layer === 'gm' ? '#9040c9' : 'rgba(0,0,0,0.5)');
  ctx.lineWidth = (isDragging ? 2.5 : 1.5) / BOARD.zoom;
  if (layer === 'gm') {
    ctx.setLineDash([4 / BOARD.zoom, 2 / BOARD.zoom]);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.shadowBlur = 0;

  if (!hasDrawnImage) {
    // Inicial do nome (com rotação)
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(rotation);
    const initial = (t.name || '?')[0].toUpperCase();
    const fontSize = Math.max(10, r * 0.9);
    ctx.font = `bold ${fontSize}px Cinzel, serif`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initial, 0, 0);
    ctx.restore();
  }

  // Nome abaixo (sem rotação — sempre horizontal)
  const nameFontSize = Math.max(8, gs * 0.22);
  if (!t.hideName) {
    ctx.font = `${nameFontSize}px Cinzel, serif`;
    ctx.fillStyle = '#e8d9c0';
    ctx.strokeStyle = 'rgba(0,0,0,0.8)';
    ctx.lineWidth = 2.5 / BOARD.zoom;
    ctx.strokeText(t.name || '', px, py + r + nameFontSize * 0.9);
    ctx.fillText(t.name || '', px, py + r + nameFontSize * 0.9);

    // Condições (emoji badges abaixo do nome)
    if (t.conditions && t.conditions.length) {
      const emojiSize = Math.max(9, gs * 0.18);
      ctx.font = `${emojiSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      const gap = emojiSize * 0.4;
      const condStartY = py + r + nameFontSize * 0.9 + emojiSize * 0.6;
      const visibleConds = t.conditions.slice(0, 6);
      const widths = visibleConds.map(c => ctx.measureText(CONDITION_EMOJI[c] || '❓').width);
      const totalW = widths.reduce((a, b) => a + b + gap, -gap);
      let cx3 = px - totalW / 2;
      visibleConds.forEach(c => {
        const emoji = CONDITION_EMOJI[c] || '❓';
        const w = ctx.measureText(emoji).width;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillText(emoji, cx3 + w / 2 + 0.5, condStartY + 0.5);
        ctx.fillStyle = '#fff';
        ctx.fillText(emoji, cx3 + w / 2, condStartY);
        cx3 += w + gap;
      });
      if (t.conditions.length > 6) {
        ctx.font = `bold ${emojiSize * 0.7}px sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText(`+${t.conditions.length - 6}`, cx3 + gap * 0.3, condStartY);
      }
    }
  }

  // Barra de HP (se tiver) — desenhada primeiro para ficar atrás dos stats
  if (t.hpMax > 0) {
    const barW = sz * 0.7;
    const barH = Math.max(4, gs * 0.1);
    const barX = px - barW / 2;
    const barY = py - r - barH - 3 / BOARD.zoom;
    const pct = Math.max(0, Math.min(1, t.hp / t.hpMax));
    const hpColor = pct > 0.5 ? '#3a7a42' : pct > 0.25 ? '#8a7a1a' : '#8a2a1a';

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = hpColor;
    ctx.fillRect(barX, barY, barW * pct, barH);
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 0.5 / BOARD.zoom;
    ctx.strokeRect(barX, barY, barW, barH);
  }

  // ═══ 3 bolinhas de status (PV, PM, DEF) acima da barra de HP ═══
  if (t.pmMax !== undefined || t.defense !== undefined) {
    const circleR = Math.max(5, gs * 0.09);
    const gap = circleR * 0.6;
    const stats = [
      { v: t.hp ?? 0, m: t.hpMax, label: 'PV', color: t.hpMax > 0 ? (t.hp / t.hpMax > 0.5 ? '#3a7a42' : t.hp / t.hpMax > 0.25 ? '#8a7a1a' : '#8a2a1a') : '#3a7a42' },
      { v: t.pm ?? 0, m: t.pmMax, label: 'PM', color: '#2a5a8a' },
      { v: parseInt(String(t.defense ?? 0)) || 0, label: 'DEF', color: '#c9903a' }
    ];
    const totalW = stats.length * (circleR * 2) + (stats.length - 1) * gap;
    const startX = px - totalW / 2 + circleR;
    const topY = t.hpMax > 0 ? (py - r - Math.max(4, gs * 0.1) - 3 / BOARD.zoom) : py - r;
    const circleY = topY - circleR - gs * 0.1;
    const zoom = BOARD.zoom;

    stats.forEach((s, i) => {
      const cx2 = startX + i * (circleR * 2 + gap);
      ctx.beginPath();
      ctx.arc(cx2, circleY, circleR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.65)';
      ctx.fill();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 1.2 / zoom;
      ctx.stroke();
      const fSize = Math.max(6, circleR * 1.1);
      ctx.font = `bold ${fSize}px sans-serif`;
      ctx.fillStyle = s.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.v, cx2, circleY);
    });
  }

  // ═══ Handles de rotação e redimensionamento (apenas tokens selecionados) ═══
  if (isSelected) {
    const hSize = 7 / BOARD.zoom; // tamanho do quadradinho
    const handleDist = r + 22 / BOARD.zoom; // distância do handle de rotação

    // ── Handle de Rotação (topo, com linha conectora) ──
    // Ponto local (0, -handleDist) rotacionado por `rotation`:
    const rotHX = px + handleDist * Math.sin(rotation);
    const rotHY = py - handleDist * Math.cos(rotation);

    // Linha conectora
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(px + r * Math.sin(rotation), py - r * Math.cos(rotation));
    ctx.lineTo(rotHX, rotHY);
    ctx.strokeStyle = 'rgba(0, 191, 255, 0.6)';
    ctx.lineWidth = 1.5 / BOARD.zoom;
    ctx.stroke();

    // Quadrado de rotação
    ctx.fillStyle = '#00bfff';
    ctx.strokeStyle = '#005f7f';
    ctx.lineWidth = 1 / BOARD.zoom;
    ctx.fillRect(rotHX - hSize / 2, rotHY - hSize / 2, hSize, hSize);
    ctx.strokeRect(rotHX - hSize / 2, rotHY - hSize / 2, hSize, hSize);
    ctx.restore();

    // ── Handle de Redimensionamento (canto inferior-direito, rotacionado) ──
    // Ponto local (r*0.8, r*0.8) rotacionado
    const resLocalX = r * 0.85;
    const resLocalY = r * 0.85;
    const resHX = px + resLocalX * Math.cos(rotation) - resLocalY * Math.sin(rotation);
    const resHY = py + resLocalX * Math.sin(rotation) + resLocalY * Math.cos(rotation);

    ctx.save();
    ctx.fillStyle = '#00ff88';
    ctx.strokeStyle = '#007744';
    ctx.lineWidth = 1 / BOARD.zoom;
    ctx.fillRect(resHX - hSize / 2, resHY - hSize / 2, hSize, hSize);
    ctx.strokeRect(resHX - hSize / 2, resHY - hSize / 2, hSize, hSize);
    ctx.restore();
  }

  ctx.restore();
}

// ── Hit-test para handles de tokens selecionados ──
function getHandleAt(cx, cy) {
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const wx = (cx - offsetX) / zoom;
  const wy = (cy - offsetY) / zoom;
  const hitR = 14 / zoom; // raio de clique

  for (const tokenId of BOARD.selectedTokens) {
    const t = BOARD.tokens.find(tk => tk.id === tokenId);
    if (!t) continue;

    const rotation = t.rotation || 0;
    const sz = (t.size || 1) * gridSize;
    const px = t.gx * gridSize + sz / 2;
    const py = t.gy * gridSize + sz / 2;

    if (t.type === 'object') {
      const half = sz / 2;
      const rotOff = half + 14 / zoom;
      // Handle de rotação (topo)
      const rotHX = px + rotOff * Math.sin(rotation);
      const rotHY = py - rotOff * Math.cos(rotation);
      if (Math.hypot(wx - rotHX, wy - rotHY) <= hitR) {
        return { token: t, type: 'rotate' };
      }
      // Handle de redimensionamento (canto inferior-direito)
      const rhX = px + half * Math.cos(rotation) - half * Math.sin(rotation);
      const rhY = py + half * Math.sin(rotation) + half * Math.cos(rotation);
      if (Math.hypot(wx - rhX, wy - rhY) <= hitR) {
        return { token: t, type: 'resize' };
      }
    } else {
      const r = sz * 0.42;
      const handleDist = r + 22 / zoom;

      // Handle de rotação (topo rotacionado)
      const rotHX = px + handleDist * Math.sin(rotation);
      const rotHY = py - handleDist * Math.cos(rotation);
      if (Math.hypot(wx - rotHX, wy - rotHY) <= hitR) {
        return { token: t, type: 'rotate' };
      }

      // Handle de redimensionamento (canto inferior-direito rotacionado)
      const resLocalX = r * 0.85;
      const resLocalY = r * 0.85;
      const resHX = px + resLocalX * Math.cos(rotation) - resLocalY * Math.sin(rotation);
      const resHY = py + resLocalX * Math.sin(rotation) + resLocalY * Math.cos(rotation);
      if (Math.hypot(wx - resHX, wy - resHY) <= hitR) {
        return { token: t, type: 'resize' };
      }
    }
  }
  return null;
}

// ── Coordenadas canvas → grade ──
function canvasToGrid(cx, cy) {
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const wx = (cx - offsetX) / zoom;
  const wy = (cy - offsetY) / zoom;
  return { gx: Math.floor(wx / gridSize), gy: Math.floor(wy / gridSize) };
}

function gridToCanvas(gx, gy) {
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  return {
    cx: gx * gridSize * zoom + offsetX,
    cy: gy * gridSize * zoom + offsetY
  };
}

function getTokenAt(cx, cy) {
  const { offsetX, offsetY, zoom, gridSize, tokens } = BOARD;
  const wx = (cx - offsetX) / zoom;
  const wy = (cy - offsetY) / zoom;

  const activeLayer = (myRole === 'mestre') ? (BOARD.activeLayer || 'players') : 'players';

  // Iterar de trás pra frente (último token fica por cima)
  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i];
    const layer = t.layer || 'players';

    if (myRole !== 'mestre' && layer === 'gm') continue;
    if (myRole === 'mestre' && layer !== activeLayer) continue;

    const sz = (t.size || 1) * gridSize;
    const px = t.gx * gridSize + sz / 2;
    const py = t.gy * gridSize + sz / 2;
    if (t.type === 'object') {
      if (wx >= px - sz / 2 && wx <= px + sz / 2 && wy >= py - sz / 2 && wy <= py + sz / 2) return t;
      continue;
    }
    const r = sz * 0.42;
    const dist = Math.sqrt((wx - px) ** 2 + (wy - py) ** 2);
    if (dist <= r) return t;
  }
  return null;
}

// ── Eventos mouse/touch ──
function boardBindEvents() {
  const wrap = BOARD.wrap;

  // Mouse
  wrap.addEventListener('mousedown', onBoardMouseDown);
  wrap.addEventListener('mousemove', onBoardMouseMove);
  wrap.addEventListener('mouseup', onBoardMouseUp);
  wrap.addEventListener('mouseleave', onBoardMouseLeave);
  wrap.addEventListener('wheel', onBoardWheel, { passive: false });

  // Touch
  wrap.addEventListener('touchstart', onBoardTouchStart, { passive: false });
  wrap.addEventListener('touchmove', onBoardTouchMove, { passive: false });
  wrap.addEventListener('touchend', onBoardTouchEnd);

  // Double click no token para editar
  wrap.addEventListener('dblclick', onBoardDblClick);

  // Clique direito para menu de token
  wrap.addEventListener('contextmenu', onBoardContextMenu);

  // Fecha menus ao clicar fora
  wrap.addEventListener('mousedown', (e) => { if (e.button !== 2) fecharContextMenu(); });
}

function getBoardXY(e) {
  const rect = BOARD.wrap.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function onBoardMouseDown(e) {
  // Botão do meio (scroll) sempre ativa navegação
  if (e.button === 1) {
    e.preventDefault();
    const { x, y } = getBoardXY(e);
    BOARD.panning = true;
    BOARD.panStartX = x - BOARD.offsetX;
    BOARD.panStartY = y - BOARD.offsetY;
    BOARD.wrap.classList.add('panning');
    return;
  }
  if (e.button !== 0) return;
  const { x, y } = getBoardXY(e);
  fecharFormToken();
  fecharContextMenu();

  if (BOARD.tool === 'pan') {
    BOARD.panning = true;
    BOARD.panStartX = x - BOARD.offsetX;
    BOARD.panStartY = y - BOARD.offsetY;
    BOARD.wrap.classList.add('panning');
    return;
  }

  // Ferramenta parede: inicia segmento
  if (BOARD.tool === 'wall' && myRole === 'mestre') {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    BOARD.wallDrawing = true;
    BOARD.wallStartX = wx; BOARD.wallStartY = wy;
    BOARD.wallCurX = wx;   BOARD.wallCurY = wy;
    e.preventDefault();
    return;
  }

  // Verificar se clicou em um handle de token selecionado
  if (BOARD.tool === 'move' && BOARD.selectedTokens.size > 0) {
    const handle = getHandleAt(x, y);
    if (handle) {
      const ht = handle.token;
      const sz = (ht.size || 1) * BOARD.gridSize;
      const pcx = ht.gx * BOARD.gridSize + sz / 2;
      const pcy = ht.gy * BOARD.gridSize + sz / 2;
      BOARD.handleDrag = {
        tokenId: ht.id,
        type: handle.type,
        startAngle: ht.rotation || 0,
        startSize: ht.size || 1,
        centerX: pcx,
        centerY: pcy
      };
      e.preventDefault();
      return;
    }
  }

  const token = getTokenAt(x, y);
  if (token) {
    // Shift+clique: alterna seleção individual
    if (e.shiftKey) {
      if (BOARD.selectedTokens.has(token.id)) {
        BOARD.selectedTokens.delete(token.id);
      } else {
        BOARD.selectedTokens.add(token.id);
      }
      boardRender();
      e.preventDefault();
      return;
    }
    if (!temControleToken(token)) return;
    BOARD.dragging = token;
    BOARD.dragStartGx = token.gx;
    BOARD.dragStartGy = token.gy;
    const { offsetX, offsetY, zoom, gridSize } = BOARD;
    const sz = (token.size || 1) * gridSize;
    const px = token.gx * gridSize * zoom + offsetX;
    const py = token.gy * gridSize * zoom + offsetY;
    BOARD.dragOffX = x - px;
    BOARD.dragOffY = y - py;
    e.preventDefault();
  } else if (BOARD.tool === 'move') {
    // Verificar se clicou no handle de uma porta ou janela
    const clickedWall = getWallHandleAt(x, y);
    if (clickedWall) {
      toggleWallState(clickedWall.id);
      e.preventDefault();
      return;
    }

    // Clique em área vazia: iniciar marquee ou limpar seleção
    if (!e.shiftKey) {
      BOARD.selectedTokens.clear();
      boardRender();
    }
    BOARD.marquee = { startX: x, startY: y, curX: x, curY: y };
    e.preventDefault();
  }
}

function onBoardMouseMove(e) {
  const { x, y } = getBoardXY(e);

  if (BOARD.panning) {
    BOARD.offsetX = x - BOARD.panStartX;
    BOARD.offsetY = y - BOARD.panStartY;
    boardRender(); return;
  }

  // Preview de parede
  if (BOARD.wallDrawing) {
    BOARD.wallCurX = (x - BOARD.offsetX) / BOARD.zoom;
    BOARD.wallCurY = (y - BOARD.offsetY) / BOARD.zoom;
    boardRender(); return;
  }

  // Handle drag (rotação ou redimensionamento)
  if (BOARD.handleDrag) {
    const hd = BOARD.handleDrag;
    const t = BOARD.tokens.find(tk => tk.id === hd.tokenId);
    if (t) {
      const wx = (x - BOARD.offsetX) / BOARD.zoom;
      const wy = (y - BOARD.offsetY) / BOARD.zoom;

      if (hd.type === 'rotate') {
        // Calcular ângulo do mouse em relação ao centro do token
        const angle = Math.atan2(wx - hd.centerX, -(wy - hd.centerY));
        t.rotation = angle;
      } else if (hd.type === 'resize') {
        const dist = Math.hypot(wx - hd.centerX, wy - hd.centerY);
        let newSize;
        if (t.type === 'object') {
          newSize = Math.max(0.25, (dist / BOARD.gridSize) * 2 / Math.SQRT2);
        } else {
          newSize = Math.max(0.5, (dist / BOARD.gridSize) * 2);
        }
        t.size = Math.round(newSize * 4) / 4;
      }
      boardRender();
    }
    return;
  }

  // Marquee de seleção
  if (BOARD.marquee) {
    BOARD.marquee.curX = x;
    BOARD.marquee.curY = y;
    updateSelectionBox();
    return;
  }

  if (BOARD.dragging) {
    const { zoom, gridSize } = BOARD;
    if (e.altKey) {
      const sz = (BOARD.dragging.size||1);
      const cx = x - BOARD.dragOffX + sz * gridSize * zoom / 2;
      const cy = y - BOARD.dragOffY + sz * gridSize * zoom / 2;
      const wx = (cx - BOARD.offsetX) / zoom;
      const wy = (cy - BOARD.offsetY) / zoom;
      BOARD.dragging.gx = Math.max(0, wx / gridSize - sz / 2);
      BOARD.dragging.gy = Math.max(0, wy / gridSize - sz / 2);
    } else {
      const { gx, gy } = canvasToGrid(x - BOARD.dragOffX + (BOARD.dragging.size||1)*gridSize*zoom/2, y - BOARD.dragOffY + (BOARD.dragging.size||1)*gridSize*zoom/2);
      BOARD.dragging.gx = Math.max(0, gx);
      BOARD.dragging.gy = Math.max(0, gy);
    }
    boardRender();
    updateTooltip(BOARD.dragging, x, y);
    return;
  }

  // Hover
  const token = getTokenAt(x, y);
  const prevHov = BOARD.hovered;
  BOARD.hovered = token ? token.id : null;
  if (BOARD.hovered !== prevHov) boardRender();
  if (token) {
    updateTooltip(token, x, y);
  } else {
    hideTooltip();
  }
}

function onBoardMouseUp(e) {
  BOARD.wrap.classList.remove('panning');
  if (BOARD.panning) { BOARD.panning = false; return; }

  // Finaliza parede
  if (BOARD.wallDrawing) {
    BOARD.wallDrawing = false;
    const dx = BOARD.wallCurX - BOARD.wallStartX;
    const dy = BOARD.wallCurY - BOARD.wallStartY;
    const len = Math.sqrt(dx*dx + dy*dy);
    if (len > 5) { // ignora cliques sem arrastar
      const wType = BOARD.wallType || 'normal';
      BOARD.walls.push({
        id: 'w' + Date.now() + Math.floor(Math.random()*9999),
        x1: BOARD.wallStartX, y1: BOARD.wallStartY,
        x2: BOARD.wallCurX,   y2: BOARD.wallCurY,
        type: wType,
        open: false
      });
      boardSave();
      syncWallsToPlayers();
      
      if (wType === 'normal') toast('🧱 Parede adicionada. Clique direito para remover.');
      else if (wType === 'invisible') toast('👻 Parede invisível adicionada. Clique direito para remover.');
      else if (wType === 'door') toast('🚪 Porta adicionada (fechada). Clique nela para abrir/fechar.');
      else if (wType === 'window') toast('🪟 Janela adicionada (fechada). Clique nela para abrir/fechar.');
    }
    boardRender();
    return;
  }

  // Finaliza handle drag
  if (BOARD.handleDrag) {
    BOARD.handleDrag = null;
    if (myRole === 'mestre') {
      boardSave();
      syncBoardTokensToPlayers();
    }
    boardRender();
    return;
  }

  // Finaliza marquee de seleção
  if (BOARD.marquee) {
    finalizeMarqueeSelection(e.shiftKey);
    BOARD.marquee = null;
    hideSelectionBox();
    boardRender();
    return;
  }

  if (BOARD.dragging) {
    const token = BOARD.dragging;
    if (myRole !== 'mestre' && checkMoveBlocked(token, BOARD.dragStartGx, BOARD.dragStartGy, token.gx, token.gy)) {
      token.gx = BOARD.dragStartGx;
      token.gy = BOARD.dragStartGy;
      boardRender();
      toast('🚫 Movimento bloqueado por uma parede!');
    } else {
      if (myRole === 'mestre') {
        boardSave();
        syncBoardTokensToPlayers();
      } else {
        solicitarMoverToken(token.id, token.gx, token.gy);
      }
      setTimeout(atualizarFogJogador, 50);
    }
  }
  BOARD.dragging = null;
}

function onBoardMouseLeave() {
  BOARD.wrap.classList.remove('panning');
  BOARD.panning = false;
  // Cancela parede em andamento
  if (BOARD.wallDrawing) { BOARD.wallDrawing = false; boardRender(); return; }
  // Cancela handle drag e marquee em andamento
  if (BOARD.handleDrag) { BOARD.handleDrag = null; boardRender(); }
  if (BOARD.marquee) { BOARD.marquee = null; hideSelectionBox(); boardRender(); }
  if (BOARD.dragging) {
    const token = BOARD.dragging;
    if (myRole !== 'mestre' && checkMoveBlocked(token, BOARD.dragStartGx, BOARD.dragStartGy, token.gx, token.gy)) {
      token.gx = BOARD.dragStartGx;
      token.gy = BOARD.dragStartGy;
      boardRender();
      toast('🚫 Movimento bloqueado por uma parede!');
    } else {
      if (myRole === 'mestre') {
        boardSave();
        syncBoardTokensToPlayers();
      } else {
        solicitarMoverToken(token.id, token.gx, token.gy);
      }
      setTimeout(atualizarFogJogador, 50);
    }
  }
  BOARD.dragging = null;
  hideTooltip();
}

function onBoardWheel(e) {
  e.preventDefault();
  fecharContextMenu();
  const { x, y } = getBoardXY(e);
  const delta = e.deltaY > 0 ? -0.08 : 0.08;
  zoomBoardAt(x, y, delta);
}

// ══════════════════════════════════════════════════════
//  MARQUEE SELECTION — helpers
// ══════════════════════════════════════════════════════
function updateSelectionBox() {
  const m = BOARD.marquee;
  if (!m) return;
  const box = document.getElementById('selectionBox');
  if (!box) return;
  const left = Math.min(m.startX, m.curX);
  const top = Math.min(m.startY, m.curY);
  const w = Math.abs(m.curX - m.startX);
  const h = Math.abs(m.curY - m.startY);
  box.style.left = left + 'px';
  box.style.top = top + 'px';
  box.style.width = w + 'px';
  box.style.height = h + 'px';
  box.style.display = (w > 3 || h > 3) ? 'block' : 'none';
}

function hideSelectionBox() {
  const box = document.getElementById('selectionBox');
  if (box) box.style.display = 'none';
}

function finalizeMarqueeSelection(additive) {
  const m = BOARD.marquee;
  if (!m) return;
  const { offsetX, offsetY, zoom, gridSize, tokens } = BOARD;
  const activeLayer = (myRole === 'mestre') ? (BOARD.activeLayer || 'players') : 'players';

  // Retângulo do marquee em coordenadas do wrap (px)
  const selL = Math.min(m.startX, m.curX);
  const selT = Math.min(m.startY, m.curY);
  const selR = Math.max(m.startX, m.curX);
  const selB = Math.max(m.startY, m.curY);

  // Se arrastou muito pouco, não seleciona nada (era apenas um clique)
  if ((selR - selL) < 5 && (selB - selT) < 5) return;

  if (!additive) {
    BOARD.selectedTokens.clear();
  }

  tokens.forEach(t => {
    const layer = t.layer || 'players';
    if (myRole !== 'mestre' && layer === 'gm') return;
    if (myRole === 'mestre' && layer !== activeLayer) return;

    const sz = (t.size || 1) * gridSize;
    // Centro do token em coordenadas do wrap (px)
    const cx = (t.gx * gridSize + sz / 2) * zoom + offsetX;
    const cy = (t.gy * gridSize + sz / 2) * zoom + offsetY;
    const r = sz * 0.42 * zoom;

    // Verifica se o bounding box do token intersecta o marquee
    const tokL = cx - r;
    const tokR = cx + r;
    const tokT = cy - r;
    const tokB = cy + r;

    if (tokR >= selL && tokL <= selR && tokB >= selT && tokT <= selB) {
      BOARD.selectedTokens.add(t.id);
    }
  });
}

function onBoardDblClick(e) {
  const { x, y } = getBoardXY(e);
  const token = getTokenAt(x, y);
  if (token) {
    if (myRole === 'mestre') {
      abrirFormTokenEdit(token, x, y);
    } else if (temControleToken(token)) {
      toggleFichaPanel();
    }
  }
}

let contextTokenId = null;

function onBoardContextMenu(e) {
  e.preventDefault();
  if (myRole !== 'mestre') return;
  const { x, y } = getBoardXY(e);
  
  fecharFormToken();

  // Remover parede próxima ao clique
  if (BOARD.tool === 'wall') {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    const nearby = wallAt(wx, wy, 10 / BOARD.zoom);
    if (nearby) {
      BOARD.walls = BOARD.walls.filter(w => w.id !== nearby.id);
      boardSave(); syncWallsToPlayers(); boardRender();
      toast('🧱 Parede removida.');
      return;
    }
  }
  const token = getTokenAt(x, y);
  if (token) {
    contextTokenId = token.id;
    const isObject = token.type === 'object';
    // Mostra/esconde opções específicas de token para objetos
    document.getElementById('ctxCondMenu').style.display = isObject ? 'none' : '';
    document.getElementById('ctxViewPlayer').style.display = isObject ? 'none' : '';
    if (!isObject) {
      popularCtxCondicoes(token);
    }
    const menu = document.getElementById('tokenContextMenu');
    if (menu) {
      menu.style.left = Math.min(e.clientX + 5, window.innerWidth - 260) + 'px';
      menu.style.top = Math.min(e.clientY + 5, window.innerHeight - 180) + 'px';
      menu.style.display = 'block';
    }
  } else {
    // Menu de contexto do grid vazio
    const menu = document.getElementById('boardContextMenu');
    if (menu) {
      BOARD.ctxMenuBoardX = x;
      BOARD.ctxMenuBoardY = y;
      menu.style.left = Math.min(e.clientX + 5, window.innerWidth - 200) + 'px';
      menu.style.top = Math.min(e.clientY + 5, window.innerHeight - 100) + 'px';
      menu.style.display = 'block';
    }
  }
}

function fecharContextMenu() {
  const menu = document.getElementById('tokenContextMenu');
  if (menu) menu.style.display = 'none';
  const bMenu = document.getElementById('boardContextMenu');
  if (bMenu) bMenu.style.display = 'none';
  contextTokenId = null;
}

function contextEditToken() {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    const { cx, cy } = gridToCanvas(token.gx, token.gy);
    abrirFormTokenEdit(token, cx, cy);
  }
  fecharContextMenu();
}

function contextChangeLayer(layer) {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    token.layer = layer;
    boardSave();
    boardRender();
    syncBoardTokensToPlayers();
    toast(`Camada do token "${token.name}" alterada para ${layer === 'players' ? 'Jogadores' : (layer === 'map' ? 'Mapa' : 'GM (Oculto)')}`);
  }
  fecharContextMenu();
}

function contextDeleteToken() {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    if (confirm(`Remover token "${token.name}"?`)) {
      BOARD.tokens = BOARD.tokens.filter(t => t.id !== token.id);
      boardSave();
      boardRender();
      syncBoardTokensToPlayers();
    }
  }
  fecharContextMenu();
}

function contextViewAsPlayer() {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (!token) { fecharContextMenu(); return; }
  // Se já está vendo este token, sai do modo visão
  if (BOARD.playerViewTokenId === token.id) {
    exitPlayerView();
    fecharContextMenu();
    return;
  }
  BOARD.playerViewTokenId = token.id;
  BOARD.playerViewTokenName = token.name || 'Jogador';
  fecharContextMenu();
  atualizarFogJogador();
  mostrarBarraVisaoJogador();
}

function exitPlayerView() {
  BOARD.playerViewTokenId = null;
  BOARD.playerViewTokenName = '';
  esconderBarraVisaoJogador();
  atualizarFogJogador();
}

// ── Condições no contexto ──
function popularCtxCondicoes(token) {
  const sub = document.getElementById('ctxCondSubmenu');
  if (!sub) return;
  const ativas = token.conditions || [];
  sub.innerHTML = '';
  CONDITION_LIST.forEach(c => {
    const div = document.createElement('div');
    div.className = 'ctx-cond-item';
    const emoji = CONDITION_EMOJI[c] || '❓';
    const checked = ativas.includes(c) ? '✓ ' : '  ';
    div.textContent = `${emoji} ${checked}${c}`;
    div.onclick = (e) => { e.stopPropagation(); toggleTokenCondition(contextTokenId, c); };
    if (ativas.includes(c)) div.classList.add('active');
    sub.appendChild(div);
  });
}

function toggleTokenCondition(tokenId, condition) {
  const t = BOARD.tokens.find(tk => tk.id === tokenId);
  if (!t) return;
  if (!t.conditions) t.conditions = [];
  const idx = t.conditions.indexOf(condition);
  if (idx >= 0) {
    t.conditions.splice(idx, 1);
  } else {
    t.conditions.push(condition);
  }
  boardSave();
  boardRender();
  syncBoardTokensToPlayers();
  popularCtxCondicoes(t);
}

// Touch
function onBoardTouchStart(e) {
  if (e.touches.length === 2) {
    BOARD.lastPinchDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    return;
  }
  if (e.touches.length === 1) {
    const t = e.touches[0];
    const fake = { button: 0, clientX: t.clientX, clientY: t.clientY, preventDefault: () => e.preventDefault() };
    onBoardMouseDown(fake);
  }
}
function onBoardTouchMove(e) {
  e.preventDefault();
  if (e.touches.length === 2) {
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    const rect = BOARD.wrap.getBoundingClientRect();
    const delta = (dist - BOARD.lastPinchDist) * 0.005;
    zoomBoardAt(midX - rect.left, midY - rect.top, delta);
    BOARD.lastPinchDist = dist;
    return;
  }
  if (e.touches.length === 1) {
    const t = e.touches[0];
    onBoardMouseMove({ clientX: t.clientX, clientY: t.clientY });
  }
}
function onBoardTouchEnd(e) {
  onBoardMouseUp({ button: 0 });
}

// ── Zoom ──
function zoomBoardAt(cx, cy, delta) {
  const oldZoom = BOARD.zoom;
  BOARD.zoom = Math.min(4, Math.max(0.2, BOARD.zoom + delta));
  const dz = BOARD.zoom - oldZoom;
  BOARD.offsetX -= (cx - BOARD.offsetX) * (dz / oldZoom);
  BOARD.offsetY -= (cy - BOARD.offsetY) * (dz / oldZoom);
  document.getElementById('zoomDisplay').textContent = Math.round(BOARD.zoom * 100) + '%';
  boardRender();
}
function zoomBoard(delta) {
  const wrap = BOARD.wrap;
  zoomBoardAt(wrap.clientWidth / 2, wrap.clientHeight / 2, delta);
}
function zoomReset() {
  BOARD.zoom = 1; BOARD.offsetX = 0; BOARD.offsetY = 0;
  document.getElementById('zoomDisplay').textContent = '100%';
  boardRender();
}

// ── Ferramentas ──
function setTool(t) {
  BOARD.tool = t;
  document.getElementById('toolMove')?.classList.toggle('active', t === 'move');
  document.getElementById('toolPan')?.classList.toggle('active', t === 'pan');
  document.getElementById('toolWall')?.classList.toggle('active', t === 'wall');
  
  // Exibir/ocultar seletor de tipo de parede
  const wallSelect = document.getElementById('wallTypeSelect');
  if (wallSelect) {
    wallSelect.style.display = t === 'wall' ? 'inline-block' : 'none';
  }
  
  BOARD.wrap.className = `board-canvas-wrap tool-${t}`;
  // Cursor especial para parede
  if (t === 'wall') BOARD.wrap.style.cursor = 'crosshair';
  else BOARD.wrap.style.cursor = '';
}

function setWallType(type) {
  BOARD.wallType = type;
}

function toggleGrid(on) { BOARD.gridOn = on; boardRender(); }
function setGridSize(px) { BOARD.gridSize = px; boardRender(); }

// ── Mapa ──
function carregarMapa() {
  if (myRole !== 'mestre') return;
  document.getElementById('mapaFileInput').click();
}
function onMapaFileChange(input) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      BOARD.mapImg = img;
      BOARD.mapDataUrl = e.target.result;
      boardRender();
      syncBoardMapToPlayers();
      toast('🗺 Mapa carregado!');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  input.value = '';
}

// ── UVTT / Dungeondraft Importer ──
function importarUVTT() {
  if (myRole !== 'mestre') return;
  document.getElementById('uvttFileInput').click();
}

function onUVTTFile(input) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const zip = await JSZip.loadAsync(e.target.result);
      let dataFile = zip.file('data.json') || zip.file('metadata.json');
      if (!dataFile) {
        const allFiles = Object.keys(zip.files);
        const jsonFile = allFiles.find(f => f.endsWith('.json'));
        if (jsonFile) dataFile = zip.file(jsonFile);
      }
      if (!dataFile) { toast('Arquivo UVTT inválido: JSON não encontrado.'); return; }
      const dataText = await dataFile.async('string');
      const data = JSON.parse(dataText);

      const res = data.resolution || data.map || {};
      const ppg = res.pixels_per_grid || res.grid_size || 128;
      const originX = res.map_origin?.x || 0;
      const originY = res.map_origin?.y || 0;

      BOARD.gridSize = ppg;

      const allFiles = Object.keys(zip.files);
      const imgFile = allFiles.find(f => /\.(png|jpg|jpeg|webp)$/i.test(f) && !f.startsWith('__'));
      if (imgFile) {
        const blob = await zip.file(imgFile).async('blob');
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          BOARD.mapImg = img;
          BOARD.mapDataUrl = url;
          boardRender();
          syncBoardMapToPlayers();
        };
        img.src = url;
      }

      const wallsUVTT = data.walls || [];
      const portals = data.portals || [];
      const converted = [];

      wallsUVTT.forEach((w, i) => {
        const dx = (w.x2 || w.x) - w.x;
        const dy = (w.y2 || w.y) - w.y;
        if (Math.sqrt(dx*dx + dy*dy) < 2) return;
        converted.push({
          id: 'uvtt_w' + i,
          x1: w.x - originX, y1: w.y - originY,
          x2: (w.x2 || w.x) - originX, y2: (w.y2 || w.y) - originY,
          type: 'normal', open: false
        });
      });
      portals.forEach((p, i) => {
        const dx = (p.x2 || p.x) - p.x;
        const dy = (p.y2 || p.y) - p.y;
        if (Math.sqrt(dx*dx + dy*dy) < 2) return;
        converted.push({
          id: 'uvtt_p' + i,
          x1: p.x - originX, y1: p.y - originY,
          x2: (p.x2 || p.x) - originX, y2: (p.y2 || p.y) - originY,
          type: 'door', open: !p.closed
        });
      });

      if (converted.length > 0) {
        BOARD.walls = converted;
        boardSave();
        syncWallsToPlayers();
      }

      toast(`📦 Mapa UVTT importado! ${converted.length} parede(s), grid ${ppg}px.`);
      boardRender();
    } catch(e) {
      toast('Erro ao importar UVTT: ' + e.message);
    }
  };
  reader.readAsArrayBuffer(file);
  input.value = '';
}

// ── Tooltip ──
function updateTooltip(token, cx, cy) {
  const el = document.getElementById('tokenTooltip');
  if (!el) return;
  const rect = BOARD.wrap.getBoundingClientRect();
  let txt = token.name;
  if (token.hpMax > 0) txt += `  PV ${token.hp}/${token.hpMax}`;
  if (token.controlledBy) {
    const owner = players[token.controlledBy];
    if (owner) {
      txt += ` (${owner.name})`;
    }
  }
  el.textContent = txt;
  el.style.display = 'block';
  el.style.left = (rect.left + cx + 12) + 'px';
  el.style.top = (rect.top + cy - 12) + 'px';
}
function hideTooltip() {
  const el = document.getElementById('tokenTooltip');
  if (el) el.style.display = 'none';
}

// ── Token Form ──
let tfSelectedColor = '#c94040';
let tfSelectedImage = '';  // URL ou dataURL da imagem do token em edição
let tfEditingId = null;

function abrirFormToken(cx, cy) {
  tfEditingId = null;
  document.getElementById('tfTitle').textContent = 'Novo Token';
  document.getElementById('tfName').value = '';
  document.getElementById('tfHP').value = '';
  document.getElementById('tfSize').value = '1';
  selectTokenColorByValue('#c94040');
  popularControleSelect('');
  definirImagemToken('');

  const layerSelect = document.getElementById('tfLayer');
  if (layerSelect) {
    layerSelect.value = BOARD.activeLayer || 'players';
  }
  // Set default image position inputs
  const posXInput = document.getElementById('tfImgPosX');
  const posYInput = document.getElementById('tfImgPosY');
  if (posXInput) posXInput.value = 50;
  if (posYInput) posYInput.value = 50;

  posicionarForm(cx, cy);
  document.getElementById('tokenForm').classList.add('open');
  document.getElementById('tfName').focus();
}

function abrirFormTokenEdit(token, cx, cy) {
  tfEditingId = token.id;
  document.getElementById('tfTitle').textContent = 'Editar Token';
  document.getElementById('tfName').value = token.name;
  document.getElementById('tfHP').value = token.hp || '';
  document.getElementById('tfSize').value = String(token.size || 1);
  selectTokenColorByValue(token.color || '#c94040');
  popularControleSelect(token.controlledBy || '');
  definirImagemToken(token.imageUrl || '');

  const layerSelect = document.getElementById('tfLayer');
  if (layerSelect) {
    layerSelect.value = token.layer || 'players';
  }
  const hideNameCb = document.getElementById('tfHideName');
  if (hideNameCb) hideNameCb.checked = !!token.hideName;
  // Set image position inputs for editing
  const posXInput = document.getElementById('tfImgPosX');
  const posYInput = document.getElementById('tfImgPosY');
  let posX = 50, posY = 50;
  if (token.imagePosition) {
    const m = token.imagePosition.match(/(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%/);
    if (m) { posX = parseFloat(m[1]); posY = parseFloat(m[2]); }
  }
  if (posXInput) posXInput.value = posX;
  if (posYInput) posYInput.value = posY;

  posicionarForm(cx, cy);
  document.getElementById('tokenForm').classList.add('open');
  document.getElementById('tfName').focus();
  // recarregar canvas preview com a posição salva
  _initTokenPreviewDrag();
  _loadTokenPreviewImage(token.imageUrl || '');
}

function posicionarForm(cx, cy) {
  const form = document.getElementById('tokenForm');
  if (cx === undefined) {
    const rect = BOARD.wrap.getBoundingClientRect();
    cx = rect.left + rect.width / 2;
    cy = rect.top + rect.height / 2;
  } else {
    const rect = BOARD.wrap.getBoundingClientRect();
    cx = rect.left + cx;
    cy = rect.top + cy;
  }
  form.style.left = Math.min(cx + 10, window.innerWidth - 240) + 'px';
  form.style.top = Math.min(cy - 20, window.innerHeight - 200) + 'px';
}

function fecharFormToken() {
  document.getElementById('tokenForm')?.classList.remove('open');
  tfEditingId = null;
}

// Alias para compatibilidade com funções do Arsenal original
// (Apenas mantido se necessário)

function selectTokenColor(el) {
  document.querySelectorAll('.token-color-swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  tfSelectedColor = el.dataset.color;
}

function selectTokenColorByValue(color) {
  document.querySelectorAll('.token-color-swatch').forEach(s => {
    s.classList.toggle('selected', s.dataset.color === color);
  });
  tfSelectedColor = color;
}

// ── Imagem do token — canvas preview interativo ──
let tfPreviewImg = null;        // Image object para o canvas preview
let tfPreviewDrag = null;       // estado do drag { startX, startY, startPosX, startPosY }

function _renderTokenPreviewCanvas() {
  const canvas = document.getElementById('tfImgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, R = W / 2;
  ctx.clearRect(0, 0, W, H);

  // fundo
  ctx.save();
  ctx.beginPath();
  ctx.arc(R, R, R - 1, 0, Math.PI * 2);
  ctx.fillStyle = '#2e251c';
  ctx.fill();
  ctx.restore();

  if (tfPreviewImg && tfPreviewImg.complete && tfPreviewImg.naturalWidth > 0) {
    const posX = parseFloat(document.getElementById('tfImgPosX')?.value ?? 50);
    const posY = parseFloat(document.getElementById('tfImgPosY')?.value ?? 50);
    const iw = tfPreviewImg.naturalWidth, ih = tfPreviewImg.naturalHeight;
    // fit maior dimensão ao diâmetro, depois offset via posX/posY
    const scale = (W * 1.0) / Math.min(iw, ih);
    const dw = iw * scale, dh = ih * scale;
    const dx = -(dw - W) * posX / 100;
    const dy = -(dh - H) * posY / 100;
    ctx.save();
    ctx.beginPath();
    ctx.arc(R, R, R - 1, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(tfPreviewImg, dx, dy, dw, dh);
    ctx.restore();
  }

  // anel
  ctx.save();
  ctx.beginPath();
  ctx.arc(R, R, R - 1, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(107,77,42,0.8)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function _initTokenPreviewDrag() {
  const canvas = document.getElementById('tfImgCanvas');
  if (!canvas || canvas._dragInited) return;
  canvas._dragInited = true;

  function getPos(e) {
    if (e.touches) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }
  function onStart(e) {
    if (!tfPreviewImg) return;
    e.preventDefault();
    const p = getPos(e);
    tfPreviewDrag = {
      startX: p.x, startY: p.y,
      startPosX: parseFloat(document.getElementById('tfImgPosX')?.value ?? 50),
      startPosY: parseFloat(document.getElementById('tfImgPosY')?.value ?? 50)
    };
    canvas.style.cursor = 'grabbing';
  }
  function onMove(e) {
    if (!tfPreviewDrag) return;
    e.preventDefault();
    const p = getPos(e);
    const iw = tfPreviewImg.naturalWidth, ih = tfPreviewImg.naturalHeight;
    const scale = (canvas.width) / Math.min(iw, ih);
    const dw = iw * scale, dh = ih * scale;
    const rangeX = dw - canvas.width;
    const rangeY = dh - canvas.height;
    const dx = p.x - tfPreviewDrag.startX;
    const dy = p.y - tfPreviewDrag.startY;
    let nx = tfPreviewDrag.startPosX - (rangeX > 0 ? dx / rangeX * 100 : 0);
    let ny = tfPreviewDrag.startPosY - (rangeY > 0 ? dy / rangeY * 100 : 0);
    nx = Math.max(0, Math.min(100, nx));
    ny = Math.max(0, Math.min(100, ny));
    const px = document.getElementById('tfImgPosX');
    const py = document.getElementById('tfImgPosY');
    if (px) px.value = nx.toFixed(1);
    if (py) py.value = ny.toFixed(1);
    _renderTokenPreviewCanvas();
  }
  function onEnd() {
    tfPreviewDrag = null;
    canvas.style.cursor = 'grab';
  }

  canvas.addEventListener('mousedown', onStart);
  canvas.addEventListener('touchstart', onStart, { passive: false });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);
}

function _loadTokenPreviewImage(url, cb) {
  if (!url) { tfPreviewImg = null; _renderTokenPreviewCanvas(); if (cb) cb(); return; }
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => { tfPreviewImg = img; _renderTokenPreviewCanvas(); if (cb) cb(); };
  img.onerror = () => { tfPreviewImg = null; _renderTokenPreviewCanvas(); if (cb) cb(); };
  img.src = url;
}

function definirImagemToken(url) {
  tfSelectedImage = url || '';
  const urlInput = document.getElementById('tfImgUrl');
  const placeholder = document.getElementById('tfImgPlaceholder');
  const clearBtn = document.getElementById('tfImgClear');
  if (urlInput) urlInput.value = tfSelectedImage;
  if (placeholder) placeholder.style.display = tfSelectedImage ? 'none' : '';
  if (clearBtn) clearBtn.style.display = tfSelectedImage ? 'flex' : 'none';
  _initTokenPreviewDrag();
  _loadTokenPreviewImage(tfSelectedImage);
}

function previewImagemToken(url) {
  tfSelectedImage = (url || '').trim();
  const placeholder = document.getElementById('tfImgPlaceholder');
  const clearBtn = document.getElementById('tfImgClear');
  if (placeholder) placeholder.style.display = tfSelectedImage ? 'none' : '';
  if (clearBtn) clearBtn.style.display = tfSelectedImage ? 'flex' : 'none';
  _initTokenPreviewDrag();
  _loadTokenPreviewImage(tfSelectedImage);
}

function carregarImagemArquivo(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    definirImagemToken(e.target.result);
  };
  reader.readAsDataURL(file);
  input.value = '';
}

// ── Unsplash Image Search ──
const UNSPLASH_ACCESS_KEY = 'etK-AkXGz5Y57XQUXkiot9ad3oN619Vq4k_oL9sxtZQ';
let unsplashSelected = null;

function abrirBuscaUnsplash() {
  document.getElementById('unsplashModal').style.display = 'flex';
  document.getElementById('unsplashQuery').value = '';
  document.getElementById('unsplashGrid').innerHTML = '<div class="unsplash-empty">Digite um termo e pressione Enter ou clique em Buscar</div>';
  document.getElementById('unsplashActions').style.display = 'none';
  unsplashSelected = null;
  setTimeout(() => document.getElementById('unsplashQuery').focus(), 100);
}

function fecharBuscaUnsplash() {
  document.getElementById('unsplashModal').style.display = 'none';
  unsplashSelected = null;
}

function selecionarFotoUnsplash(foto) {
  unsplashSelected = foto;
  fetch(foto.links.download_location + '&client_id=' + UNSPLASH_ACCESS_KEY, { method: 'GET' });
  const preview = document.getElementById('unsplashPreview');
  preview.innerHTML = `<img src="${foto.urls.thumb}" alt="">`;
  document.getElementById('unsplashActions').style.display = 'flex';
}

function usarImgComo(tipo) {
  if (!unsplashSelected) return;
  const url = unsplashSelected.urls.regular;
  if (tipo === 'token') {
    document.getElementById('tfImgUrl').value = url;
    previewImagemToken(url);
    fecharBuscaUnsplash();
    toast('🎯 Imagem selecionada para o token! Abra o formulário e edite.');
  } else if (tipo === 'mapa') {
    const img = new Image();
    img.onload = () => {
      BOARD.mapImg = img;
      BOARD.mapDataUrl = url;
      boardRender();
      if (myRole === 'mestre') broadcast({ type: 'board-map', mapUrl: url }, null);
      fecharBuscaUnsplash();
      toast('🗺 Mapa atualizado!');
    };
    img.onerror = () => toast('Erro ao carregar imagem.');
    img.src = url;
  }
}

// ── Colar URL da Imagem no grid ──
function abrirPasteImagem() {
  fecharContextMenu();
  document.getElementById('pasteImgModal').style.display = 'flex';
  document.getElementById('pasteImgUrl').value = '';
  setTimeout(() => document.getElementById('pasteImgUrl').focus(), 100);
}

function fecharPasteImagem() {
  document.getElementById('pasteImgModal').style.display = 'none';
}

function usarPasteImg(tipo) {
  const url = document.getElementById('pasteImgUrl').value.trim();
  if (!url) { toast('Cole uma URL primeiro.'); return; }
  fecharPasteImagem();
  const { x, y } = BOARD.ctxMenuBoardX !== undefined ? { x: BOARD.ctxMenuBoardX, y: BOARD.ctxMenuBoardY } : { x: BOARD.wrap.clientWidth / 2, y: BOARD.wrap.clientHeight / 2 };
  const { gx, gy } = canvasToGrid(x, y);
  if (tipo === 'fundo') {
    const img = new Image();
    img.onload = () => {
      BOARD.mapImg = img;
      BOARD.mapDataUrl = url;
      boardRender();
      if (myRole === 'mestre') broadcast({ type: 'board-map', mapUrl: url }, null);
      toast('🗺 Fundo atualizado!');
    };
    img.onerror = () => toast('Erro ao carregar imagem.');
    img.src = url;
  } else if (tipo === 'objeto') {
    const s = parseFloat(document.getElementById('pasteImgSize').value) || 2;
    const newId = 'tk' + Date.now() + Math.floor(Math.random()*9999);
    BOARD.tokens.push({
      id: newId,
      type: 'object',
      name: 'Objeto',
      size: s,
      imageUrl: url,
      layer: 'map',
      conditions: [],
      hideName: true,
      gx: Math.max(0, gx), gy: Math.max(0, gy)
    });
    setBoardLayer('map');
    BOARD.selectedTokens.clear();
    BOARD.selectedTokens.add(newId);
    boardSave(); boardRender(); syncBoardTokensToPlayers();
    toast(`◻ Objeto criado (${s}×${s}) na camada Mapa! Arraste para posicionar.`);
  } else if (tipo === 'token') {
    const s = parseFloat(document.getElementById('pasteImgSize').value) || 1;
    BOARD.tokens.push({
      id: 'tk' + Date.now() + Math.floor(Math.random()*9999),
      name: 'Imagem',
      hp: 0, hpMax: 0, size: s,
      color: '#c9903a',
      imageUrl: url, controlledBy: null,
      layer: 'players', conditions: [], hideName: false,
      gx: Math.max(0, gx), gy: Math.max(0, gy)
    });
    boardSave(); boardRender(); syncBoardTokensToPlayers();
    toast(`🎯 Token criado (${s}×${s})!`);
  }
  BOARD.ctxMenuBoardX = undefined;
  BOARD.ctxMenuBoardY = undefined;
}

async function buscarUnsplash() {
  const q = document.getElementById('unsplashQuery').value.trim();
  if (!q) return;
  const grid = document.getElementById('unsplashGrid');
  grid.innerHTML = '<div class="unsplash-empty">Buscando...</div>';
  document.getElementById('unsplashActions').style.display = 'none';
  unsplashSelected = null;
  try {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=15&client_id=${UNSPLASH_ACCESS_KEY}`);
    if (!res.ok) { grid.innerHTML = '<div class="unsplash-empty">Erro na busca. Tente novamente.</div>'; return; }
    const data = await res.json();
    if (!data.results || !data.results.length) { grid.innerHTML = '<div class="unsplash-empty">Nenhuma imagem encontrada.</div>'; return; }
    grid.innerHTML = '';
    data.results.forEach(foto => {
      const div = document.createElement('div');
      div.className = 'unsplash-item';
      div.innerHTML = `<img src="${foto.urls.thumb}" alt="${foto.alt_description || ''}" loading="lazy">
        <div class="unsplash-attr">📷 ${foto.user.name}</div>`;
      div.onclick = () => selecionarFotoUnsplash(foto);
      grid.appendChild(div);
    });
  } catch(e) {
    grid.innerHTML = '<div class="unsplash-empty">Erro de conexão.</div>';
  }
}

function limparImagemToken() {
  definirImagemToken('');
}

function confirmarToken() {
  const name = document.getElementById('tfName').value.trim() || 'Token';
  const hp = parseInt(document.getElementById('tfHP').value) || 0;
  const size = parseInt(document.getElementById('tfSize').value) || 1;
  const controlledBy = document.getElementById('tfControlledBy').value || null;
  const imageUrl = tfSelectedImage || '';
  const layer = document.getElementById('tfLayer')?.value || 'players';
const posX = parseInt(document.getElementById('tfImgPosX').value) || 50;
const posY = parseInt(document.getElementById('tfImgPosY').value) || 50;
const imagePosition = `${posX}% ${posY}%`;
const hideName = document.getElementById('tfHideName').checked;

  if (tfEditingId) {
    const t = BOARD.tokens.find(t => t.id === tfEditingId);
    if (t) {
      t.name = name;
      t.hp = hp; if (hp > t.hpMax) t.hpMax = hp;
      t.size = size; t.color = tfSelectedColor;
      t.controlledBy = controlledBy;
      t.imageUrl = imageUrl;
      t.layer = layer;
    t.imagePosition = imagePosition;
    t.hideName = hideName;
    }
  } else {
    const cx = BOARD.wrap.clientWidth / 2;
    const cy = BOARD.wrap.clientHeight / 2;
    const { gx, gy } = canvasToGrid(cx, cy);
    BOARD.tokens.push({
      id: 'tk' + Date.now() + Math.floor(Math.random()*9999),
      name, hp, hpMax: hp, size, color: tfSelectedColor,
      imageUrl, controlledBy,
      layer, imagePosition,
      conditions: [],
      hideName,
      gx: Math.max(0, gx), gy: Math.max(0, gy)
    });
  }

  fecharFormToken();
  boardSave(); boardRender(); syncBoardTokensToPlayers();
}

// ── Adicionar token a partir do combate ──
function tokenDosCombatentes() {
  if (!combatState?.combatants?.length) { toast('Sem combatentes no gerenciador.'); return; }
  const CORES = ['#c94040','#4080c9','#40a050','#c9903a','#9040c9','#c0c0c0','#40b0b0','#c940a0'];
  let adicionados = 0;
  combatState.combatants.forEach((c, i) => {
    const jaExiste = BOARD.tokens.find(t => t.combatId === c.id);
    if (!jaExiste) {
      const { offsetX, offsetY, zoom, gridSize } = BOARD;
      const col = i % 8; const row = Math.floor(i / 8);
      const startGx = Math.max(0, Math.floor((-offsetX/zoom) / gridSize) + 1 + col * 2);
      const startGy = Math.max(0, Math.floor((-offsetY/zoom) / gridSize) + 1 + row * 2);

      // Busca enquadramento customizado se houver
      let threatImg = c.imageUrl || '';
      let threatImgPosition = '50% 50%';
      try {
        const customImages = JSON.parse(localStorage.getItem('t20_threat_images')) || {};
        const cleanName = c.name.replace(/\s+\d+$/, '').trim();
        if (customImages[cleanName]) {
          if (typeof customImages[cleanName] === 'object') {
            threatImg = customImages[cleanName].url || threatImg;
            threatImgPosition = customImages[cleanName].position || '50% 50%';
          }
        }
      } catch(e) {}

      BOARD.tokens.push({
        id: 'tk' + Date.now() + Math.floor(Math.random()*9999),
        combatId: c.id,
        name: c.name, hp: c.hpCur, hpMax: c.hpMax,
        pm: c.mpCur || 0, pmMax: c.mpMax || 0,
        defense: c.stats?.def || 0,
        color: CORES[i % CORES.length], size: 1,
        imageUrl: threatImg || '',
        imagePosition: threatImgPosition,
        controlledBy: null,
        layer: 'players',
        conditions: [],
        hideName: false,
        gx: startGx, gy: startGy
      });
      adicionados++;
    }
  });
  boardSave(); boardRender(); syncBoardTokensToPlayers();
  toast(`⚔ ${adicionados} token(s) do combate adicionados ao tabuleiro!`);
}

// ── Adicionar um único token a partir do combate ──
function adicionarTokenDoCombatente(combatantId) {
  if (!combatState?.combatants) return;
  const c = combatState.combatants.find(x => x.id === combatantId);
  if (!c) return;

  // Busca imagem e enquadramento customizado se houver
  let threatImg = c.imageUrl || '';
  let threatImgPosition = '50% 50%';
  
  if (!threatImg && typeof AMEACAS_DB !== 'undefined') {
    const cleanName = c.name.replace(/\s+\d+$/, '').trim().toLowerCase();
    const threatMatch = AMEACAS_DB.find(t => (t.nome || '').toLowerCase() === cleanName);
    if (threatMatch && threatMatch.img) {
      threatImg = threatMatch.img;
    }
  }

  try {
    const customImages = JSON.parse(localStorage.getItem('t20_threat_images')) || {};
    const cleanName = c.name.replace(/\s+\d+$/, '').trim();
    if (customImages[cleanName]) {
      if (typeof customImages[cleanName] === 'object') {
        threatImg = customImages[cleanName].url || threatImg;
        threatImgPosition = customImages[cleanName].position || '50% 50%';
      } else {
        threatImg = customImages[cleanName];
      }
    }
  } catch(e) {}

  // Centraliza na tela
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const cx = BOARD.wrap.clientWidth / 2;
  const cy = BOARD.wrap.clientHeight / 2;
  const { gx, gy } = canvasToGrid(cx, cy);

  BOARD.tokens.push({
    id: 'tk' + Date.now() + Math.floor(Math.random()*9999),
    combatId: c.id,
    name: c.name,
    hp: c.hpCur,
    hpMax: c.hpMax,
    pm: c.mpCur || 0,
    pmMax: c.mpMax || 0,
    defense: c.stats?.def || 0,
    color: '#c94040',
    size: 1,
    imageUrl: threatImg || '',
    imagePosition: threatImgPosition,
    controlledBy: null,
    conditions: [],
    hideName: false,
    layer: 'players',
    gx: Math.max(0, gx),
    gy: Math.max(0, gy)
  });

  boardSave();
  boardRender();
  syncBoardTokensToPlayers();
  toast(`Token de ${c.name} adicionado ao mapa!`);
}

// Atualizar tokens quando combate muda de HP/MP/Def
function atualizarTokensDoCombate() {
  if (!combatState?.combatants) return;
  let changed = false;
  BOARD.tokens.forEach(t => {
    if (t.combatId) {
      const c = combatState.combatants.find(c => c.id === t.combatId);
      if (c) {
        if (t.hp !== c.hpCur || t.hpMax !== c.hpMax ||
            t.pm !== (c.mpCur || 0) || t.pmMax !== (c.mpMax || 0) ||
            t.defense !== (c.stats?.def || '')) {
          t.hp = c.hpCur; t.hpMax = c.hpMax;
          t.pm = c.mpCur || 0; t.pmMax = c.mpMax || 0;
          t.defense = c.stats?.def || 0;
          changed = true;
        }
      }
    }
  });
  if (changed) { boardRender(); syncBoardTokensToPlayers(); }
}

// ── Salvar/Carregar ──
function boardSave() {
  try {
    const state = { tokens: BOARD.tokens, walls: BOARD.walls, gridSize: BOARD.gridSize, gridOn: BOARD.gridOn };
    localStorage.setItem('vtt_board_state', JSON.stringify(state));
  } catch(e) {}
}
function boardLoad() {
  try {
    const raw = localStorage.getItem('vtt_board_state');
    if (!raw) return;
    const s = JSON.parse(raw);
    if (s.tokens) {
      BOARD.tokens = s.tokens.map(t => ({
        ...t,
        layer: t.layer || 'players',
        conditions: t.conditions || [],
        hideName: t.hideName || false
      }));
    }
    if (s.walls) BOARD.walls = s.walls;
    if (s.gridSize) BOARD.gridSize = s.gridSize;
    if (typeof s.gridOn === 'boolean') BOARD.gridOn = s.gridOn;
  } catch(e) {}
}

// ── Limpar ──
function limparBoard() {
  if (!confirm('Limpar todos os tokens, paredes e o mapa?')) return;
  BOARD.tokens = []; BOARD.walls = []; BOARD.mapImg = null; BOARD.mapDataUrl = null;
  if (BOARD.playerViewTokenId) exitPlayerView();
  boardSave(); boardRender(); syncBoardToPlayers();
  toast('Tabuleiro limpo.');
}

function limparParedes() {
  if (BOARD.walls.length === 0) { toast('Nenhuma parede para apagar.'); return; }
  if (!confirm(`Apagar todas as ${BOARD.walls.length} paredes?`)) return;
  BOARD.walls = [];
  boardSave(); syncWallsToPlayers(); boardRender();
  toast('🧱 Paredes apagadas.');
}

// Encontra parede mais próxima do ponto (wx,wy) em coords world
function wallAt(wx, wy, threshold) {
  let best = null, bestDist = threshold;
  BOARD.walls.forEach(w => {
    const d = distPointSegment(wx, wy, w.x1, w.y1, w.x2, w.y2);
    if (d < bestDist) { bestDist = d; best = w; }
  });
  return best;
}

function distPointSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const len2 = dx*dx + dy*dy;
  if (len2 === 0) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px-ax)*dx + (py-ay)*dy) / len2));
  return Math.hypot(px - (ax + t*dx), py - (ay + t*dy));
}

function getWallHandleAt(cx, cy) {
  const { offsetX, offsetY, zoom, walls } = BOARD;
  const wx = (cx - offsetX) / zoom;
  const wy = (cy - offsetY) / zoom;
  const hitR = 12 / zoom; // clique de tolerância

  for (const w of walls) {
    if (w.type === 'door' || w.type === 'window') {
      const mx = (w.x1 + w.x2) / 2;
      const my = (w.y1 + w.y2) / 2;
      if (Math.hypot(wx - mx, wy - my) <= hitR) {
        return w;
      }
    }
  }
  return null;
}

function toggleWallState(wallId) {
  const w = BOARD.walls.find(wall => wall.id === wallId);
  if (!w) return;
  w.open = !w.open;
  
  boardSave();
  boardRender();
  
  if (myRole === 'mestre') {
    syncWallsToPlayers();
    setTimeout(atualizarFogJogador, 50);
  } else {
    solicitarAlternarParede(wallId);
  }
  
  const stateStr = w.open ? 'aberta' : 'fechada';
  const name = w.type === 'door' ? 'Porta' : 'Janela';
  toast(`${name === 'Porta' ? '🚪' : '🪟'} ${name} agora está ${stateStr}.`);
}

function solicitarAlternarParede(wallId) {
  if (masterConn) {
    masterConn.send({
      type: 'solicitar-alternar-parede',
      wallId: wallId
    });
  }
}

// ── Sincronização P2P ──
function syncBoardTokensToPlayers() {
  if (myRole !== 'mestre') return;
  const filtered = BOARD.tokens.filter(t => (t.layer || 'players') !== 'gm');
  broadcast({ type: 'board-tokens', tokens: filtered }, null);
}
function syncBoardMapToPlayers() {
  if (myRole !== 'mestre' || !BOARD.mapDataUrl) return;
  broadcast({ type: 'board-map', mapUrl: BOARD.mapDataUrl }, null);
}
function syncWallsToPlayers() {
  if (myRole !== 'mestre') return;
  broadcast({ type: 'board-walls', walls: BOARD.walls }, null);
}
function syncBoardToPlayers() {
  if (myRole !== 'mestre') return;
  const filtered = BOARD.tokens.filter(t => (t.layer || 'players') !== 'gm');
  broadcast({ type: 'board-full', tokens: filtered, walls: BOARD.walls, mapUrl: BOARD.mapDataUrl || null }, null);
  const notify = { type: 'combat-sync-notify', text: 'Mestre sincronizou o tabuleiro.' };
  broadcast(notify, null); addMsg(notify);
  toast('📡 Tabuleiro sincronizado!');
}

function receberBoardSync(data) {
  if (data.tokens) BOARD.tokens = data.tokens.map(t => ({ ...t, conditions: t.conditions || [], hideName: t.hideName || false }));
  if (data.walls) { BOARD.walls = data.walls; }
  else if (!data.walls) { /* manter as existentes se não vier no payload */ }
  if (data.mapUrl) {
    const img = new Image();
    img.onload = () => { BOARD.mapImg = img; boardRender(); };
    img.src = data.mapUrl;
    BOARD.mapDataUrl = data.mapUrl;
  } else if (data.mapUrl === null) {
    BOARD.mapImg = null; BOARD.mapDataUrl = null;
  }
  setTimeout(atualizarFogJogador, 50);
  boardRender();
}

// ── Botão do combate "→ Tabuleiro" ──
// Adicionar botão na barra de combate para enviar tokens
function initBoardCombatButton() {
  const bar = document.querySelector('.combat-round-bar .combat-nav');
  if (!bar) return;
  const btn = document.createElement('button');
  btn.className = 'btn btn-sm';
  btn.title = 'Criar tokens no tabuleiro a partir dos combatentes';
  btn.textContent = '🗺';
  btn.onclick = tokenDosCombatentes;
  bar.appendChild(btn);
}

// ── Ocultar toolbar para jogadores ──
function boardSetupRole() {
  const toolbar = document.getElementById('boardToolbar');
  if (toolbar) toolbar.classList.toggle('hidden', myRole !== 'mestre');

  const isMaster = (myRole === 'mestre');
  ['layerSep', 'layerLabel', 'layerPlayers', 'layerMap', 'layerGm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = isMaster ? '' : 'none';
  });
}

function setBoardLayer(layer) {
  if (myRole !== 'mestre') return;
  BOARD.activeLayer = layer;
  ['layerPlayers', 'layerMap', 'layerGm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  const activeBtnId = layer === 'players' ? 'layerPlayers' : (layer === 'map' ? 'layerMap' : 'layerGm');
  const activeBtn = document.getElementById(activeBtnId);
  if (activeBtn) activeBtn.classList.add('active');

  // Refresh the board
  boardRender();
  toast(`Camada ativa: ${layer === 'players' ? 'Jogadores' : (layer === 'map' ? 'Mapa' : 'GM (Oculto)')}`);
}


// ── Sync tokens ao avançar turno ──
const _origCombatNextTurn = combatNextTurn;
combatNextTurn = function() {
  _origCombatNextTurn();
  if (myRole === 'mestre') setTimeout(atualizarTokensDoCombate, 50);
};
const _origCombatPrevTurn = combatPrevTurn;
combatPrevTurn = function() {
  _origCombatPrevTurn();
  if (myRole === 'mestre') setTimeout(atualizarTokensDoCombate, 50);
};

// ── Init ──
// Chamar boardInit quando a sala for aberta
const _origEntrarNoAmbienteBoard = entrarNoAmbiente;
entrarNoAmbiente = function() {
  _origEntrarNoAmbienteBoard();
  boardLoad();
  boardInit();
  boardSetupRole();
  if (myRole === 'mestre') initBoardCombatButton();
  // Calcula fog inicial para jogadores
  setTimeout(atualizarFogJogador, 300);
};

// Patch P2P: receber dados de tabuleiro nos jogadores
const _origMasterConnData = null; // já foi sobrescrito — patch direto no handler do masterConn
// Interceptar mensagens P2P recebidas (jogador)
const _origEntrarSala = entrarSala;
entrarSala = function() {
  _origEntrarSala();
  // O patch do masterConn.on('data') é feito via closure abaixo
};

// Patch global de recepção para jogador — adicionar board-* ao handler
// Usamos uma abordagem de queue de patches
const _boardPatchQueue = [];
function applyBoardPatches() {
  if (!masterConn) { setTimeout(applyBoardPatches, 500); return; }
  const origOnData = masterConn._events?.data?.[0] || masterConn._events?.data;
  if (!origOnData) {
    masterConn.on('data', (data) => {
      if (data.type === 'board-tokens') { BOARD.tokens = data.tokens.map(t => ({ ...t, conditions: t.conditions || [], hideName: t.hideName || false })); setTimeout(atualizarFogJogador, 50); boardRender(); }
      else if (data.type === 'board-walls') { BOARD.walls = data.walls; setTimeout(atualizarFogJogador, 50); boardRender(); }
      else if (data.type === 'board-map') {
        const img = new Image();
        img.onload = () => { BOARD.mapImg = img; boardRender(); };
        img.src = data.mapUrl;
      }
      else if (data.type === 'board-full') receberBoardSync(data);
    });
  }
}

// Hack limpo: interceptar broadcast para também tratar board no lado do jogador
// via o handler já existente no masterConn
// Abordagem mais limpa: embutir no handler do masterConn dentro do entrarSala
// Patch feito diretamente na closure do masterConn.on('data') existente:
// Como esse handler já está definido hardcoded no entrarSala original,
// vamos sobrescrever entrarSala completamente com suporte a board

const _entrarSalaOrigFull = entrarSala;
entrarSala = function() {
  const name = document.getElementById('player-name').value.trim();
  let code = document.getElementById('room-code').value.trim();
  if (!name) { setLobbyStatus('join','Como você se chama?',true); return; }
  const match = code.match(/[?&]sala=([A-Z0-9]{8})/);
  if (match) code = match[1];
  code = code.replace(/[^A-Z0-9]/gi,'').toUpperCase().slice(0,8);
  if (code.length !== 8) { setLobbyStatus('join','Código inválido.',true); return; }
  myName = name; myRole = 'jogador'; roomId = code;
  setLobbyStatus('join','Buscando a mesa...');
  peer = new Peer(undefined, { debug: 0 });
  peer.on('open', (id) => {
    myPeerId = id;
    masterConn = peer.connect('vtt-room-' + roomId, { reliable: true, metadata: { name } });
    masterConn.on('open', () => {
      masterConn.send({ type: 'join', name });
      masterConn.on('data', (data) => {
        if (data.type === 'room-info') {
          roomTitle = data.roomTitle; players = data.players;
          entrarNoAmbiente(); renderPlayers();
          addMsg({ type: 'system', text: 'Você entrou em "' + roomTitle + '"' });
        } else if (data.type === 'player-joined') addMsg({ type: 'system', text: data.name + ' entrou na mesa' });
        else if (data.type === 'players-update') { players = data.players; renderPlayers(); }
        else if (data.type === 'chat' || data.type === 'roll' || data.type === 'gif') addMsg(data);
        else if (data.type === 'combat-sync') receberSyncCombate(data.state);
        else if (data.type === 'combat-sync-notify') addMsg(data);
        // BOARD
        else if (data.type === 'board-tokens') { BOARD.tokens = data.tokens.map(t => ({ ...t, conditions: t.conditions || [], hideName: t.hideName || false })); setTimeout(atualizarFogJogador, 50); boardRender(); }
        else if (data.type === 'board-walls') { BOARD.walls = data.walls; setTimeout(atualizarFogJogador, 50); boardRender(); }
        else if (data.type === 'board-map') {
          const img = new Image();
          img.onload = () => { BOARD.mapImg = img; boardRender(); };
          img.src = data.mapUrl;
        }
        else if (data.type === 'board-full') receberBoardSync(data);
        // FICHA
        else if (data.type === 'ficha-resumo-request') {
          document.getElementById('ficha-iframe')?.contentWindow?.postMessage({ type: 'vtt-request-resume' }, '*');
        }
        // PERGAMINHOS
        else if (data.type === 'pergaminhos') {
          receberPergaminhos(data.notas);
        }
      });
      masterConn.on('close', () => addMsg({ type: 'system', text: 'Conexão com o Mestre perdida.' }));
    });
    masterConn.on('error', () => setLobbyStatus('join','Não foi possível conectar.',true));
  });
  peer.on('error', (e) => setLobbyStatus('join','Erro: '+(e.type||e.message),true));
};


// ──── Estado das Macros ────
let vttMacros = [];

function carregarMacros() {
  const raw = localStorage.getItem('t20_vtt_macros');
  if (raw) {
    try {
      vttMacros = JSON.parse(raw);
    } catch (e) {
      vttMacros = [];
    }
  } else {
    vttMacros = [];
  }
  renderizarMacros();
}

function salvarMacros() {
  localStorage.setItem('t20_vtt_macros', JSON.stringify(vttMacros));
  renderizarMacros();
}

function renderizarMacros() {
  const btnList = document.getElementById('macro-buttons-list');
  const modalList = document.getElementById('macro-list-container');
  if (!btnList) return;

  // 1. Barra Flutuante
  btnList.innerHTML = '';
  vttMacros.forEach(m => {
    const btn = document.createElement('button');
    btn.className = 'macro-btn';
    btn.innerHTML = `<i class="bi bi-play-fill"></i> ${escHTML(m.name)}`;
    btn.title = `Executar: ${m.command}`;
    btn.onclick = () => executarMacro(m.command);
    btnList.appendChild(btn);
  });

  // 2. Lista no Modal
  if (modalList) {
    if (vttMacros.length === 0) {
      modalList.innerHTML = '<div style="font-size:0.8rem;color:var(--text-muted);font-style:italic;padding:0.5rem;text-align:center;">Nenhuma macro configurada.</div>';
    } else {
      modalList.innerHTML = vttMacros.map((m, i) => `
        <div class="macro-item-row">
          <div class="macro-item-info">
            <span class="macro-item-name">${escHTML(m.name)}</span>
            <span class="macro-item-cmd" title="${escHTML(m.command)}">${escHTML(m.command)}</span>
          </div>
          <button class="btn btn-sm btn-outline-danger" onclick="removerMacro(${i})" style="padding:0.1rem 0.4rem;font-size:0.7rem;"><i class="bi bi-trash"></i></button>
        </div>
      `).join('');
    }
  }
}

function executarMacro(cmd) {
  const text = cmd.trim(); if (!text) return;
  let msgData;
  if (text.toLowerCase().startsWith('/r ')) {
    const res = parseRoll(text.toLowerCase());
    if (res) msgData = { type: 'roll', name: myName, role: myRole, text: res, time: formatTime() };
    else { addMsg({ type: 'system', text: 'Sintaxe: /r 2d6 ou /r d20+3' }); return; }
  } else {
    msgData = { type: 'chat', name: myName, role: myRole, text, time: formatTime() };
  }
  addMsg(msgData);
  if (myRole === 'mestre') broadcast(msgData, null);
  else if (masterConn) {
    try { masterConn.send(msgData); } catch (e) {}
  }
}

function abrirConfigMacros() {
  const modal = document.getElementById('macroConfigModal');
  if (modal) {
    modal.classList.add('open');
    renderizarMacros();
  }
}

function fecharConfigMacros() {
  const modal = document.getElementById('macroConfigModal');
  if (modal) modal.classList.remove('open');
}

function adicionarMacro() {
  const nameInp = document.getElementById('macro-new-name');
  const cmdInp = document.getElementById('macro-new-command');
  if (!nameInp || !cmdInp) return;

  const name = nameInp.value.trim();
  const command = cmdInp.value.trim();

  if (!name) { alert('Digite um nome para a macro.'); return; }
  if (!command) { alert('Digite um comando ou mensagem para a macro.'); return; }

  vttMacros.push({ name, command });
  salvarMacros();

  // Limpa inputs
  nameInp.value = '';
  cmdInp.value = '';
  mostrarToast('Macro adicionada!', 'sucesso');
}

function removerMacro(index) {
  if (confirm('Deseja excluir esta macro?')) {
    vttMacros.splice(index, 1);
    salvarMacros();
  }
}


// ── Visão do Jogador (mestre) ──

function mostrarBarraVisaoJogador() {
  const bar = document.getElementById('playerViewBar');
  const nameEl = document.getElementById('playerViewName');
  if (bar) bar.style.display = 'flex';
  if (nameEl) nameEl.textContent = BOARD.playerViewTokenName;
}

function esconderBarraVisaoJogador() {
  const bar = document.getElementById('playerViewBar');
  if (bar) bar.style.display = 'none';
}

// Auto-preencher código da URL + inicializações

(function() {
  const params=new URLSearchParams(window.location.search);
  const sala=params.get('sala');
  if(sala){
    document.getElementById('room-code').value=sala;
    document.getElementById('player-name').focus();
    // Mostrar toast após curto delay
    setTimeout(()=>toast('Código preenchido! Digite seu nome e entre.', 3500),500);
  }
  // Inicializa as macros
  carregarMacros();
  // Tecla Escape para sair da visão do jogador
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && BOARD.playerViewTokenId) {
      exitPlayerView();
    }
  });

  // Mobile: arrastar lobby para cima
  const lobbySheet = document.getElementById('lobbySheet');
  const lobbyHandle = document.getElementById('lobbyHandle');
  if (lobbySheet && lobbyHandle && window.innerWidth <= 500 && window.innerHeight >= 601) {
    let startY = 0, currentY = 0, isDragging = false;
    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
      currentY = startY;
      isDragging = true;
      lobbySheet.style.transition = 'none';
    };
    const onTouchMove = (e) => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const diff = startY - currentY;
      if (diff > 0) {
        const sheetH = lobbySheet.scrollHeight;
        const maxTranslate = sheetH - 80;
        const newTranslate = Math.max(0, maxTranslate - diff);
        lobbySheet.style.transform = `translateY(${newTranslate}px)`;
      }
    };
    const onTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      lobbySheet.style.transition = 'transform 0.35s ease';
      const diff = startY - currentY;
      if (diff > 60) {
        lobbySheet.classList.add('open');
        lobbySheet.style.transform = '';
      } else {
        lobbySheet.classList.remove('open');
        lobbySheet.style.transform = '';
      }
    };
    lobbyHandle.addEventListener('touchstart', onTouchStart, { passive: true });
    lobbyHandle.addEventListener('touchmove', onTouchMove, { passive: false });
    lobbyHandle.addEventListener('touchend', onTouchEnd);
  }
})();

