// ═══════════════════════════════════════════════════════
//  Arsenal VTT — lógica principal
// ═══════════════════════════════════════════════════════


// Alias para compatibilidade com funções do Arsenal original
function mostrarToast(msg, tipo) { toast(msg); }
// ──── Estado P2P ────
let peer = null, myName = '', myRole = '', roomId = '', roomTitle = '', amIHost = false;
let chatVisibility = 'global'; // 'global' | 'togm' | 'blind' | 'personal'
let contextShapeId = null;
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
  if (myRole === 'cego') return;
  const c = document.getElementById('chat-messages');
  const div = document.createElement('div');
  const vis = data.visibility || 'global';
  const visIcons = { global: '🌍', tog: '🕵️', togm: '🕵️', blind: '🙈', personal: '👤' };
  const visBadge = vis !== 'global' ? `<span class="msg-vis-badge">${visIcons[vis]||''}</span>` : '';
  const isMaster = myRole === 'mestre' || amIHost;
  const canReveal = vis !== 'global' && vis !== 'personal' && (isMaster || vis === 'togm');
  const revealBtn = canReveal
    ? `<button class="msg-reveal-btn" onclick="revelarMensagem(this)" title="Revelar a todos">👁️</button>`
    : '';
  const msgJson = JSON.stringify(data);

  if (data.type==='system') {
    div.className='msg-system'; div.textContent='— '+data.text+' —';
  } else if (data.type==='roll') {
    div.className='msg msg-roll';
    div.innerHTML=`<div class="msg-header">${visBadge}<span class="msg-author ${data.role==='jogador'?'jogador':''}">${escHTML(data.name)}</span><span class="msg-time">${data.time}</span>${revealBtn}</div><div class="msg-text">🎲 ${formatChatText(data.text)}</div>`;
  } else if (data.type==='combat-sync-notify') {
    div.className='msg msg-combat';
    div.innerHTML=`<div class="msg-text">⚔ ${formatChatText(data.text)}</div>`;
  } else if (data.type==='ability') {
    div.className='msg msg-ability';
    div.innerHTML=`<div class="msg-header"><span class="msg-author ${data.role==='jogador'?'jogador':''}">${escHTML(data.name)}</span><span class="msg-time">${data.time}</span></div><div class="msg-text">✨ ${formatChatText(data.text)}</div>`;
  } else if (data.type==='gif') {
    div.className='msg msg-gif';
    div.innerHTML=`<div class="msg-header">${visBadge}<span class="msg-author ${data.role==='jogador'?'jogador':''}">${escHTML(data.name)}</span><span class="msg-time">${data.time}</span>${revealBtn}</div><div class="msg-text"><img src="${escHTML(data.gifUrl)}" alt="GIF"></div>`;
  } else {
    div.className='msg';
    div.innerHTML=`<div class="msg-header">${visBadge}<span class="msg-author ${data.role==='jogador'?'jogador':''}">${escHTML(data.name)}</span><span class="msg-time">${data.time}</span>${revealBtn}</div><div class="msg-text">${formatChatText(data.text)}</div>`;
  }
  if (canReveal) div.dataset.msgData = msgJson;
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

function setChatVisibility(mode) {
  chatVisibility = mode;
  document.querySelectorAll('.vis-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.vis === mode);
  });
}
function revelarMensagem(el) {
  if (!confirm('Tem certeza que deseja revelar esta mensagem a todos?')) return;
  const div = el.closest('.msg, .msg-roll, .msg-gif');
  if (!div || !div.dataset.msgData) return;
  const msgData = JSON.parse(div.dataset.msgData);
  msgData.visibility = 'global';
  if (msgData.type === 'gif') msgData.text = '📢 GIF revelado';
  else msgData.text = '📢 ' + (msgData.text || 'mensagem');
  msgData.time = formatTime();
  if (myRole === 'mestre' || amIHost) {
    broadcast(msgData, null);
    addMsg(msgData);
  } else if (masterConn) {
    try { masterConn.send({ type: 'msg-reveal', msgData }); } catch(e) {}
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

function rotearMensagem(msgData) {
  const vis = msgData.visibility || 'global';
  const isMaster = myRole === 'mestre' || amIHost;
  if (vis === 'personal') { addMsg(msgData); return; }
  if (vis === 'togm') {
    addMsg(msgData);
    if (isMaster) { /* só o mestre vê */ }
    else if (masterConn) try { masterConn.send(msgData); } catch(e) {}
    return;
  }
  if (vis === 'blind') {
    if (isMaster) { addMsg(msgData); }
    else if (masterConn) try { masterConn.send(msgData); } catch(e) {}
    return;
  }
  addMsg(msgData);
  if (isMaster) broadcast(msgData, null);
  else if (masterConn) try { masterConn.send(msgData); } catch(e) {}
}

function enviarMsg() {
  if (myRole === 'expectador') { toast('Expectadores não podem enviar mensagens.'); return; }
  if (myRole === 'cego') return;
  const inp = document.getElementById('chat-input');
  const text = inp.value.trim(); if(!text) return; inp.value='';

  adicionarAoHistorico(text);

  const vis = chatVisibility;
  let msgData;
  if (text.toLowerCase().startsWith('/r ')) {
    const res = processarRolagem(text, vis !== 'global');
    if (res) msgData={type:'roll',name:myName,role:myRole,text:res,time:formatTime(),visibility:vis};
    else {
      if (vis !== 'blind') addMsg({type:'system',text:'Sintaxe: /r 2d6 ou /r d20+3'});
      return;
    }
  } else {
    msgData={type:'chat',name:myName,role:myRole,text,time:formatTime(),visibility:vis};
  }
  rotearMensagem(msgData);

  // ── Detect initiative rolls from chat command ──
  if (msgData.type === 'roll' && isInitiativeRoll(text)) {
    const initTotal = extractInitiativeTotal(msgData.text);
    if (initTotal !== null) {
      if (myRole === 'mestre' || amIHost) {
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

// ─────────── Dados 3D ───────────
function processarRolagem(text, skip3d) {
  const m=text.toLowerCase().match(/^\/r\s+(?:(.*?)(?::|-)\s*)?(\d*)d(\d+)([+-]\d+)?$/i);
  if(!m) return null;
  const label=m[1] ? m[1].trim() : '';
  const qtd=parseInt(m[2]||'1'),faces=parseInt(m[3]),mod=parseInt(m[4]||'0');
  if(qtd<1||qtd>20||faces<2||faces>100) return null;
  return efetuarRolagem(faces,qtd,mod,label,0,skip3d);
}

function efetuarRolagem(faces,qtd,mod,label,vantagem,skip3d) {
  let rolls=[],total=0;
  for(let i=0;i<qtd;i++){
    let r;
    if(vantagem!==0){
      const r1=Math.floor(Math.random()*faces)+1,r2=Math.floor(Math.random()*faces)+1;
      r=vantagem===1?Math.max(r1,r2):Math.min(r1,r2);
    }else r=Math.floor(Math.random()*faces)+1;
    rolls.push(r);total+=r;
  }
  total+=mod;
  const modStr=mod!==0?(mod>0?'+'+mod:mod):'';
  const det=qtd>1?` [${rolls.join(', ')}]`:'';
  const lb=label?label+': ':'';
  const adv=vantagem===1?' (vantagem)':vantagem===-1?' (desvantagem)':'';
  const textRes=`${lb}${qtd}d${faces}${modStr}${adv} → **${total}**${det}`;
  if (!skip3d) rolarDados3d(faces,qtd,rolls,total,mod,lb);
  return textRes;
}

function rolarDados3d(faces,qtd,rolls,total,mod,label) {
  const overlay=document.getElementById('diceOverlay');
  const tray=document.getElementById('diceTray');
  const resultDiv=document.getElementById('diceResult');
  tray.innerHTML=''; resultDiv.style.display='none'; resultDiv.innerHTML='';
  overlay.style.display='flex';
  overlay.onclick=function(e){if(e.target===this)fecharDados3d();};

  let revealed=0;
  for(let i=0;i<qtd;i++) criarDado3d(faces,rolls[i],tray,i,qtd,()=>{
    revealed++;
    if(revealed===qtd){
      setTimeout(()=>{
        const ms=mod!==0?(mod>0?' + '+mod:' '+mod):'';
        resultDiv.style.display='block';
        resultDiv.innerHTML='<div style="margin-bottom:4px;opacity:0.8;font-size:1rem;">'+label+qtd+'d'+faces+ms+'</div><div style="font-size:3rem;font-weight:700;color:#ffd700;text-shadow:0 0 30px rgba(255,215,0,0.4);">'+total+'</div>';
      },200);
    }
  });
}

function criarDado3d(faces,valor,tray,idx,total,onReveal) {
  const c=document.createElement('div');
  c.style.cssText='width:80px;height:80px;perspective:400px;opacity:0;transform:scale(0.5) translateY(-40px);transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);';
  c.innerHTML='<div class="d3i" style="position:relative;width:100%;height:100%;transition:transform 0.5s cubic-bezier(0.22,1,0.36,1);transform-style:preserve-3d;">'
    +'<div class="d3f" style="position:absolute;width:100%;height:100%;backface-visibility:hidden;background:linear-gradient(145deg,#f5f0e8,#e8dcc8);border:2px solid #8b6b3e;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:\'Cinzel\',serif;box-shadow:inset 0 0 15px rgba(0,0,0,0.08);">'
    +'<span class="d3n" style="font-size:2rem;font-weight:700;color:#2a1f14;">?</span>'
    +'<span style="font-size:0.65rem;color:#8b6b3e;margin-top:2px;">d'+faces+'</span></div>'
    +'<div style="position:absolute;width:100%;height:100%;backface-visibility:hidden;transform:rotateY(180deg);background:linear-gradient(145deg,#ffd700,#e8a800);border:2px solid #b8860b;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:\'Cinzel\',serif;box-shadow:0 0 25px rgba(255,215,0,0.2);">'
    +'<span style="font-size:2rem;font-weight:700;color:#2a1f14;">'+valor+'</span>'
    +'<span style="font-size:0.65rem;color:#6b4f00;">d'+faces+'</span></div></div>';
  tray.appendChild(c);

  setTimeout(()=>{c.style.opacity='1';c.style.transform='scale(1) translateY(0)';},idx*120);

  const nEl=c.querySelector('.d3n'), inner=c.querySelector('.d3i');
  const dur=400+Math.random()*200, intv=50, cyc=Math.floor(dur/intv);
  let cc=0;
  const t=setInterval(()=>{
    cc++; nEl.textContent=Math.floor(Math.random()*faces)+1;
    if(cc>=cyc){clearInterval(t);inner.style.transform='rotateY(180deg)';setTimeout(onReveal,500);}
  },intv);
}

function fecharDados3d() {
  document.getElementById('diceOverlay').style.display='none';
}

// ─────────── Atalhos de Dados ───────────
function abrirDialogDados(faces) {
  document.getElementById('ddTitle').textContent='Rolar d'+faces;
  document.getElementById('diceDialog').dataset.faces=faces;
  document.getElementById('ddQtd').value=1;
  document.getElementById('ddBonus').value=0;
  document.getElementById('ddVantagem').checked=false;
  document.getElementById('ddDesvantagem').checked=false;
  document.getElementById('diceDialog').style.display='flex';
}

function fecharDialogDados() {
  document.getElementById('diceDialog').style.display='none';
}

function rolarDoDialog() {
  if (myRole === 'expectador') { toast('Expectadores não podem rolar dados.'); fecharDialogDados(); return; }
  if (myRole === 'cego') { fecharDialogDados(); return; }
  const faces=parseInt(document.getElementById('diceDialog').dataset.faces);
  const qtd=parseInt(document.getElementById('ddQtd').value)||1;
  const bonus=parseInt(document.getElementById('ddBonus').value)||0;
  const vantagem=document.getElementById('ddVantagem').checked?1:document.getElementById('ddDesvantagem').checked?-1:0;
  fecharDialogDados();

  const res=efetuarRolagem(faces,qtd,bonus,'',vantagem, chatVisibility !== 'global');
  if(!res)return;
  const msgData={type:'roll',name:myName,role:myRole,text:res,time:formatTime(),visibility:chatVisibility};
  rotearMensagem(msgData);
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
  if (myRole === 'expectador') { toast('Expectadores não podem enviar GIFs.'); return; }
  if (myRole === 'cego') return;
  if (!gifUrl) return;
  const msgData = {
    type: 'gif',
    name: myName,
    role: myRole,
    gifUrl: gifUrl,
    time: formatTime(),
    visibility: chatVisibility
  };
  rotearMensagem(msgData);
}

// ══════════════════════════════════════════════════════
//  P2P
// ══════════════════════════════════════════════════════
function renderPlayers() {
  const topList = document.getElementById('playersTopList');
  const countEl = document.getElementById('playersTopCount');
  if (topList) {
    topList.innerHTML='';
    const entries = Object.entries(players);
    if (countEl) countEl.textContent = entries.length;
    entries.forEach(([pid,p]) => {
      const d=document.createElement('div'); d.className='player-entry';
      const isSelf = pid===myPeerId;
      const roleLabel = p.role==='mestre'?'Mestre':p.role==='expectador'?'Expectador':p.role==='cego'?'Cego':'Jogador';
      const tagClass = 'tag-'+p.role;
      d.innerHTML=`<div class="dot ${isSelf?'self':''}"></div><div class="name">${escHTML(p.name)}</div><div class="${tagClass}">${roleLabel}</div>`;
      if (amIHost && !isSelf) {
        d.classList.add('host-clickable');
        d.addEventListener('contextmenu',(e)=>{e.preventDefault();abrirPlayerContextMenu(e,pid);});
      }
      topList.appendChild(d);
    });
  }
}
function broadcast(data, excludePeer) {
  Object.entries(connections).forEach(([pid,conn]) => {
    if(pid!==excludePeer) try{conn.send(data);}catch(e){}
  });
}
function criarSala() {
  const name=document.getElementById('master-name').value.trim();
  if(!name){setLobbyStatus('create','Digite seu nome, ó Mestre.',true);return;}
  myName=name; myRole='mestre'; amIHost=true;
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
        const vis = data.visibility || 'global';
        if (vis === 'global') { addMsg(data); broadcast(data, conn.peer); }
        else if (vis === 'togm' || vis === 'blind') { addMsg(data); }
      } else if(data.type==='msg-reveal'){
        broadcast(data.msgData, null); addMsg(data.msgData);
      } else if(data.type==='player-shapes'){
        BOARD.shapes = data.shapes;
        boardSave();
        broadcast({ type: 'board-shapes', shapes: BOARD.shapes }, null);
        boardRender();
      } else if(data.type==='board-ping'){
        BOARD.pings.push({ x: data.x, y: data.y, time: data.time });
        boardRender();
        broadcast(data, conn.peer);
      } else if(data.type==='player-targets'){
        BOARD.playerTargets[data.peerId] = data.targets;
        boardRender();
        broadcast(data, conn.peer);
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
          if (players[myPeerId]) myRole = players[myPeerId].role;
          entrarNoAmbiente(); renderPlayers();
          addMsg({type:'system',text:'Você entrou em "'+roomTitle+'"'});
        } else if(data.type==='player-joined') addMsg({type:'system',text:data.name+' entrou na mesa'});
        else if(data.type==='players-update'){
          players=data.players;
          if (players[myPeerId] && players[myPeerId].role !== myRole) {
            myRole = players[myPeerId].role;
            aplicarRoleVisual();
          }
          renderPlayers();
        }
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
  aplicarRoleVisual();
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
  if(myRole!=='mestre' && !amIHost) return;
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
    if (myRole === 'jogador') {
      if (amIHost) {
        receberResumoFicha({ peerId: myPeerId, playerName: myName, resumo: resumo });
      } else if (masterConn) {
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
    if (myRole === 'expectador') { toast('Expectadores não podem enviar mensagens da ficha.'); return; }
    if (myRole === 'cego') return;
    const msgData = {
      type: e.data.msgType || 'chat',
      name: myName,
      role: myRole,
      text: e.data.text,
      time: formatTime(),
      visibility: chatVisibility
    };
    rotearMensagem(msgData);
    
    // Adiciona rolagens/comandos que vieram da ficha ao histórico
    if (e.data.command) {
      adicionarAoHistorico(e.data.command);
    }
    if (e.data.dmgCommand) {
      adicionarAoHistorico(e.data.dmgCommand);
    }

    // ── Detect initiative rolls from ficha and send to combat tracker ──
    if (isInitiativeRoll(e.data.text)) {
      const initTotal = extractInitiativeTotal(e.data.text);
      if (initTotal !== null) {
        if (myRole === 'mestre' || amIHost) {
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
    if (myRole === 'jogador') {
      if (amIHost) {
        receberResumoFicha({ peerId: myPeerId, playerName: myName, resumo: resumo });
      } else if (masterConn) {
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
    if (myRole === 'expectador') { toast('Expectadores não podem enviar mensagens da ficha.'); return; }
    if (myRole === 'cego') return;
    const msgData = {
      type: e.data.msgType || 'chat',
      name: myName,
      role: myRole,
      text: e.data.text,
      time: formatTime(),
      visibility: chatVisibility
    };
    rotearMensagem(msgData);
    
    // Adiciona rolagens/comandos que vieram da ficha ao histórico
    if (e.data.command) {
      adicionarAoHistorico(e.data.command);
    }
    if (e.data.dmgCommand) {
      adicionarAoHistorico(e.data.dmgCommand);
    }

    // ── Detect initiative rolls from ficha and send to combat tracker ──
    if (isInitiativeRoll(e.data.text)) {
      const initTotal = extractInitiativeTotal(e.data.text);
      if (initTotal !== null) {
        if (myRole === 'mestre' || amIHost) {
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
      let localImg = '';
      try {
        localImg = localStorage.getItem('charImage') || '';
      } catch (e) {}
      const imgUrl = localFichaUpdateData.charImage || localImg;
      if (amIHost) {
        adicionarTokenAutomatico({
          name: localFichaUpdateData.charName,
          hp: localFichaUpdateData.pvC || localFichaUpdateData.pvM,
          hpMax: localFichaUpdateData.pvM,
          pm: localFichaUpdateData.pmC || localFichaUpdateData.pmM || 0,
          pmMax: localFichaUpdateData.pmM || 0,
          defense: localFichaUpdateData.defenseTotal || 0,
          imageUrl: imgUrl,
          controlledBy: myPeerId
        });
      } else if (masterConn) {
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
  snapshotBoard();
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const cx = BOARD.wrap.clientWidth / 2;
  const cy = BOARD.wrap.clientHeight / 2;
  const { gx, gy } = canvasToGrid(cx, cy);

  snapshotBoard();
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
    layer: opts.controlledBy ? 'players' : (BOARD.activeLayer || 'gm'),
    z: (BOARD.activeFloor || 0) * 10,
    visionType: opts.visionType || 'normal',
    auras: opts.auras || [],
    borderType: 'solid', borderWidth: 1.5, borderColor: '#000000',
    shapeType: 'circle', auraRadius: 0,
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

function moverTokenPorSeta(key) {
  const dx = key === 'ArrowLeft' ? -1 : key === 'ArrowRight' ? 1 : 0;
  const dy = key === 'ArrowUp' ? -1 : key === 'ArrowDown' ? 1 : 0;
  if (!dx && !dy) return;

  let tokens = BOARD.tokens.filter(t =>
    BOARD.selectedTokens.has(t.id) && temControleToken(t)
  );
  if (tokens.length === 0) {
    const primeiro = BOARD.tokens.find(t => temControleToken(t));
    if (primeiro) tokens = [primeiro];
  }
  if (tokens.length === 0) return;

  snapshotBoard();
  tokens.forEach(t => {
    t.gx = Math.max(0, (t.gx || 0) + dx);
    t.gy = Math.max(0, (t.gy || 0) + dy);
  });

  if (myRole === 'mestre' || amIHost) {
    boardSave(); boardRender(); syncBoardTokensToPlayers();
  } else if (tokens.length === 1) {
    solicitarMoverToken(tokens[0].id, tokens[0].gx, tokens[0].gy);
  }
  setTimeout(atualizarSeguirToken, 50);
}

function popularControleSelect(selectedVal) {
  const sel = document.getElementById('tfControlledBy');
  if (!sel) return;
  sel.innerHTML = '<option value="">Apenas Mestre</option>';
  Object.entries(players).forEach(([pid, p]) => {
    const opt = document.createElement('option');
    opt.value = pid;
    opt.textContent = p.name + (p.role === 'mestre' ? ' (Mestre)' : '');
    if (pid === selectedVal) opt.selected = true;
    sel.appendChild(opt);
  });
}

function preencherFormAuras(auras) {
  const grupos = document.querySelectorAll('#tfAuraList .aura-group');
  grupos.forEach((g, i) => {
    const a = auras[i] || {};
    g.querySelector('.aura-name').value = a.name || '';
    g.querySelector('.aura-radius').value = a.radius || '';
    g.querySelector('.aura-color').value = a.color || '#ff8800';
    g.querySelector('.aura-opacity').value = a.opacity !== undefined ? Math.round(a.opacity * 100) : 25;
    const activeCb = g.querySelector('.aura-active');
    if (activeCb) activeCb.checked = a.active !== false;
    g.querySelector('.aura-light').checked = !!a.light;
  });
}

function lerAurasForm() {
  const auras = [];
  document.querySelectorAll('#tfAuraList .aura-group').forEach(g => {
    const name = g.querySelector('.aura-name').value.trim();
    const radius = parseInt(g.querySelector('.aura-radius').value) || 0;
    if (!name || radius <= 0) return;
    const rawOp = parseInt(g.querySelector('.aura-opacity').value);
    const opacity = isNaN(rawOp) ? 0.25 : Math.min(1, Math.max(0, rawOp / 100));
    const activeCb = g.querySelector('.aura-active');
    auras.push({
      name,
      radius,
      color: g.querySelector('.aura-color').value || '#ff8800',
      opacity,
      active: activeCb ? activeCb.checked : true,
      light: g.querySelector('.aura-light').checked
    });
  });
  return auras;
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
  if (name === 'bau') {
    if (currentBauSubtab === 'magias') {
      if (!magiasInitialized) initMagias();
    } else if (currentBauSubtab === 'bestiario') {
      initBestiario();
    } else {
      initBau();
    }
  }
};

// ── Compêndio: Sub-abas ──
let currentBauSubtab = 'equip';
let poderesInitialized = false;
let poderesSecaoAtiva = 'origens';
let poderesSubfiltro = '';

function switchBauSubtab(tab) {
  currentBauSubtab = tab;
  const equipPanel = document.getElementById('bau-panel-equip');
  const magiasPanel = document.getElementById('bau-panel-magias');
  const poderesPanel = document.getElementById('bau-panel-poderes');
  const bestiaryPanel = document.getElementById('bau-panel-bestiary');
  const equipBtn = document.getElementById('bau-subtab-equip');
  const magiasBtn = document.getElementById('bau-subtab-magias');
  const poderesBtn = document.getElementById('bau-subtab-poderes');
  const bestiaryBtn = document.getElementById('bau-subtab-bestiary');

  // Hide all
  [equipPanel, magiasPanel, poderesPanel, bestiaryPanel].forEach(p => { if (p) p.style.display = 'none'; });
  // Reset all buttons
  [equipBtn, magiasBtn, poderesBtn, bestiaryBtn].forEach(b => {
    if (b) { b.style.borderBottom = '2px solid transparent'; b.style.color = 'var(--text-muted)'; }
  });

  if (tab === 'equip') {
    if (equipPanel) { equipPanel.style.display = 'flex'; equipPanel.style.flexDirection = 'column'; }
    if (equipBtn) { equipBtn.style.borderBottom = '2px solid var(--gold)'; equipBtn.style.color = 'var(--gold)'; }
    if (!bauInitialized) initBau();
  } else if (tab === 'magias') {
    if (magiasPanel) { magiasPanel.style.display = 'flex'; magiasPanel.style.flexDirection = 'column'; }
    if (magiasBtn) { magiasBtn.style.borderBottom = '2px solid var(--gold)'; magiasBtn.style.color = 'var(--gold)'; }
    if (!magiasInitialized) initMagias();
  } else if (tab === 'poderes') {
    if (poderesPanel) { poderesPanel.style.display = 'flex'; poderesPanel.style.flexDirection = 'column'; }
    if (poderesBtn) { poderesBtn.style.borderBottom = '2px solid var(--gold)'; poderesBtn.style.color = 'var(--gold)'; }
    if (!poderesInitialized) initPoderes();
  } else if (tab === 'bestiario') {
    if (bestiaryPanel) { bestiaryPanel.style.display = 'flex'; bestiaryPanel.style.flexDirection = 'column'; }
    if (bestiaryBtn) { bestiaryBtn.style.borderBottom = '2px solid var(--gold)'; bestiaryBtn.style.color = 'var(--gold)'; }
    initBestiario();
  }
}

function recarregarCompendio() {
  bauInitialized = false;
  bauItemsCache = null;
  magiasInitialized = false;
  magiasCache = null;
  poderesInitialized = false;
  if (currentBauSubtab === 'equip') initBau();
  else if (currentBauSubtab === 'magias') initMagias();
  else if (currentBauSubtab === 'poderes') initPoderes();
  else if (currentBauSubtab === 'bestiario') { buscarBestiario(); }
}

// ── Baú de Itens: apenas Equipamentos ──
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
    toast(`📚 ${bauItemsCache.length} registros carregados no Compêndio!`);
  } catch (e) {
    console.error('Erro ao carregar compêndio:', e);
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
    resultsEl.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Carregando Compêndio...</div>';
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
  document.querySelectorAll('.bau-categorias .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buscarItemBau();
}

let collapsedBauCategories = new Set(['Equipamentos', 'Arma', 'Armadura', 'Escudo', 'Item Geral', 'Item Superior', 'Item Mágico', 'encantamento', 'Maldição']);

function toggleBauFolder(cat) {
  if (collapsedBauCategories.has(cat)) {
    collapsedBauCategories.delete(cat);
  } else {
    collapsedBauCategories.add(cat);
  }
  buscarItemBau();
}

// ── Bestiário ──
let bestiarioCache = null;
let bestiarioInitialized = false;
let bestiarioNdFiltro = '';
let collapsedBestiarioNds = new Set(['1/4','1/2','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','S','S+']);
const bestiarioNdColors = {
  '1/4':'#8a8a5a','1/2':'#8a8a5a','1':'#6a9a4a','2':'#6a9a4a','3':'#4a8a6a','4':'#4a8a6a',
  '5':'#4a6a9a','6':'#4a6a9a','7':'#6a4a8a','8':'#6a4a8a','9':'#8a4a6a','10':'#8a4a6a',
  '11':'#9a4a4a','12':'#9a4a4a','13':'#aa3a3a','14':'#aa3a3a','15':'#ba2a2a','16':'#ba2a2a',
  '17':'#ca1a1a','18':'#ca1a1a','19':'#da0a0a','20':'#da0a0a','S':'#ff0044','S+':'#ff0044'
};

function initBestiario() {
  if (bestiarioInitialized && bestiarioCache) { buscarBestiario(); return; }
  bestiarioInitialized = true;
  carregarBestiario();
}

function carregarBestiario() {
  const loadingEl = document.getElementById('bestiaryLoading');
  const resultsEl = document.getElementById('bestiaryResults');
  if (loadingEl) loadingEl.style.display = 'block';
  if (resultsEl) resultsEl.innerHTML = '';
  try {
    if (typeof AMEACAS_DB === 'undefined' || !Array.isArray(AMEACAS_DB) || AMEACAS_DB.length === 0) {
      throw new Error('Banco de ameaças não encontrado');
    }
    bestiarioCache = AMEACAS_DB;
    if (loadingEl) loadingEl.style.display = 'none';
    buscarBestiario();
  } catch (e) {
    console.error('Erro ao carregar bestiário:', e);
    if (loadingEl) loadingEl.style.display = 'none';
    if (resultsEl) {
      resultsEl.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--red-bright);font-style:italic;">Erro: ' + escHTML(e.message) + '</div>';
    }
  }
}

function setBestiarioNdFiltro(btn, nd) {
  bestiarioNdFiltro = nd;
  document.querySelectorAll('#bestiaryNdFiltros .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buscarBestiario();
}

function buscarBestiario() {
  const input = document.getElementById('bestiarySearch');
  const termo = (input?.value || '').toLowerCase().trim();
  const resultsEl = document.getElementById('bestiaryResults');
  const countEl = document.getElementById('bestiaryCount');
  if (!resultsEl) return;
  if (!bestiarioCache) {
    resultsEl.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Carregando bestiário...</div>';
    carregarBestiario();
    return;
  }
  let filtrados = bestiarioCache;
  if (bestiarioNdFiltro) {
    filtrados = filtrados.filter(c => String(c.nd) === bestiarioNdFiltro);
  }
  if (termo) {
    filtrados = filtrados.filter(c =>
      (c.nome || '').toLowerCase().includes(termo) ||
      (c.tipo || '').toLowerCase().includes(termo) ||
      (c.nd || '').toLowerCase().includes(termo)
    );
  }
  if (countEl) countEl.textContent = filtrados.length + ' registros';
  renderBestiario(filtrados);
}

function renderBestiario(criaturas) {
  const el = document.getElementById('bestiaryResults');
  if (!el) return;
  if (criaturas.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhuma criatura encontrada.</div>';
    return;
  }

  // Group by ND
  const grupos = {};
  criaturas.forEach(c => {
    const nd = String(c.nd || '?');
    if (!grupos[nd]) grupos[nd] = [];
    grupos[nd].push(c);
  });

  const ndOrder = ['1/4','1/2','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','S','S+'];
  const sortedNds = Object.keys(grupos).sort((a, b) => {
    const ia = ndOrder.indexOf(a); const ib = ndOrder.indexOf(b);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

  const ndColors = bestiarioNdColors;
  const ndLabel = nd => nd === 'S+' ? 'S+' : nd === 'S' ? 'S' : `ND ${nd}`;

  let html = '';
  sortedNds.forEach(nd => {
    const lista = grupos[nd];
    const collapsed = collapsedBestiarioNds.has(nd);
    const cor = ndColors[nd] || '#555';

    html += `
      <div onclick="toggleBestiarioFolder('${escHTML(nd)}')" style="display:flex;align-items:center;justify-content:space-between;padding:0.4rem 0.5rem;background:var(--parch2);border:1px solid var(--border);border-left:3px solid ${cor};border-radius:4px;cursor:pointer;margin-top:0.35rem;user-select:none;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.borderLeftColor='${cor}'">
        <span style="font-family:'Cinzel',serif;font-size:0.8rem;font-weight:bold;color:var(--gold);display:flex;align-items:center;gap:0.35rem;">
          <span style="background:${cor};color:#fff;padding:0.1rem 0.4rem;border-radius:3px;font-size:0.7rem;">${escHTML(ndLabel(nd))}</span>
          <span style="font-size:0.65rem;color:var(--text-muted);font-weight:normal;">(${lista.length})</span>
        </span>
        <i class="bi bi-chevron-${collapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.75rem;"></i>
      </div>
      <div style="display:${collapsed ? 'none' : 'flex'};flex-direction:column;gap:0.2rem;padding-left:0.4rem;border-left:1px dashed var(--border);margin-left:0.5rem;margin-top:0.2rem;margin-bottom:0.3rem;">
    `;

    html += lista.map(c => {
      const pv = parseInt(c.pv) || 0;
      const def = c.defesa || '—';
      const init = c.iniciativa || '—';
      return `<div onclick="mostrarDetalhesCriatura('${escHTML(c.nome)}')" draggable="true" ondragstart="arrastarBestiario(event,'${escHTML(c.nome)}')"
        style="display:flex;align-items:center;gap:0.45rem;padding:0.28rem 0.4rem;background:var(--parch3);border:1px solid var(--border);border-radius:3px;cursor:pointer;transition:all 0.12s;"
        onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'"
        title="${escHTML(c.tipo || '')} · PV ${pv} · Def ${def}">
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.72rem;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHTML(c.nome)}</div>
          <div style="font-size:0.58rem;color:var(--text-muted);">${escHTML(c.tipo || '—')} · PV ${pv} · Def ${def} · INI ${init}</div>
        </div>
      </div>`;
    }).join('');

    html += `</div>`;
  });

  el.innerHTML = html;
}

function toggleBestiarioFolder(nd) {
  if (collapsedBestiarioNds.has(nd)) {
    collapsedBestiarioNds.delete(nd);
  } else {
    collapsedBestiarioNds.add(nd);
  }
  buscarBestiario();
}

function mostrarDetalhesCriatura(nome) {
  if (!bestiarioCache) return;
  const c = bestiarioCache.find(x => x.nome === nome);
  if (!c) return;

  const titleEl = document.getElementById('itemDetailTitle');
  const contentEl = document.getElementById('itemDetailContent');
  const modalEl = document.getElementById('itemDetailModal');
  if (!titleEl || !contentEl || !modalEl) return;

  titleEl.textContent = c.nome;

  const ndCor = bestiarioNdColors[c.nd] || '#555';
  let html = '';

  // Tags
  html += `<div style="margin-bottom:0.75rem;display:flex;gap:0.4rem;flex-wrap:wrap;">`;
  html += `<span style="background:${ndCor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.8rem;font-weight:bold;">ND ${escHTML(String(c.nd))}</span>`;
  if (c.tipo) html += `<span style="background:rgba(255,255,255,0.08);border:1px solid var(--border);padding:0.15rem 0.5rem;border-radius:3px;color:var(--text-muted);font-size:0.8rem;">${escHTML(c.tipo)}</span>`;
  if (c.fonte) html += `<span style="background:rgba(212,175,55,0.1);border:1px solid var(--gold);padding:0.15rem 0.5rem;border-radius:3px;color:var(--gold);font-size:0.75rem;">${escHTML(c.fonte)}</span>`;
  html += `</div>`;

  // Stats grid
  html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.5rem;margin-bottom:0.75rem;font-size:0.9rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:0.4rem;">`;
  const nomeEnc = encodeURIComponent(c.nome);
  html += `<div><strong>PV:</strong> ${escHTML(c.pv || '—')}</div>`;
  html += `<div><strong>Defesa:</strong> ${escHTML(c.defesa || '—')}${c.defesaObs ? ' <em>(' + escHTML(c.defesaObs) + ')</em>' : ''}</div>`;
  if (c.iniciativa) html += `<div><strong>Iniciativa:</strong> <span onclick="rolarValorBestiario('${nomeEnc}','Iniciativa','${escHTML(c.iniciativa)}')" style="cursor:pointer;color:var(--text);">${escHTML(c.iniciativa)}</span></div>`;
  html += `<div><strong>Desloc.:</strong> ${escHTML(c.desl || '—')}</div>`;
  if (c.percepcao) html += `<div><strong>Percepção:</strong> <span onclick="rolarValorBestiario('${nomeEnc}','Percepção','${escHTML(c.percepcao)}')" style="cursor:pointer;color:var(--text);">${escHTML(c.percepcao)}</span>${c.percepcaoObs ? ' <em>(' + escHTML(c.percepcaoObs) + ')</em>' : ''}</div>`;
  if (c.pm !== undefined && c.pm !== '0') html += `<div><strong>PM:</strong> ${escHTML(String(c.pm))}</div>`;
  if (c.tesouro) html += `<div style="grid-column:1/-1;"><strong>Tesouro:</strong> ${escHTML(c.tesouro)}</div>`;
  html += `</div>`;

  // Resistências
  if (c.fort || c.ref || c.von) {
    html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.5rem;margin-bottom:0.75rem;font-size:0.9rem;display:flex;gap:0.6rem;flex-wrap:wrap;">`;
    if (c.fort) html += `<div><strong>Fort:</strong> <span onclick="rolarValorBestiario('${nomeEnc}','Fortitude','${escHTML(c.fort)}')" style="cursor:pointer;color:${parseInt(c.fort) >= 0 ? '#6aaa6a' : '#aa6a6a'};text-decoration:underline dotted;">${escHTML(c.fort)}</span></div>`;
    if (c.ref) html += `<div><strong>Ref:</strong> <span onclick="rolarValorBestiario('${nomeEnc}','Reflexos','${escHTML(c.ref)}')" style="cursor:pointer;color:${parseInt(c.ref) >= 0 ? '#6aaa6a' : '#aa6a6a'};text-decoration:underline dotted;">${escHTML(c.ref)}</span></div>`;
    if (c.von) html += `<div><strong>Von:</strong> <span onclick="rolarValorBestiario('${nomeEnc}','Vontade','${escHTML(c.von)}')" style="cursor:pointer;color:${parseInt(c.von) >= 0 ? '#6aaa6a' : '#aa6a6a'};text-decoration:underline dotted;">${escHTML(c.von)}</span></div>`;
    html += `</div>`;
  }

  // Atributos
  if (c.atributos) {
    html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.5rem;margin-bottom:0.75rem;font-size:0.85rem;display:flex;gap:0.5rem;flex-wrap:wrap;">`;
    const attr = c.atributos;
    const attrNomes = { for: 'Força', des: 'Destreza', con: 'Constituição', int: 'Inteligência', sab: 'Sabedoria', car: 'Carisma' };
    ['for','des','con','int','sab','car'].forEach(a => {
      const val = attr[a] !== undefined ? attr[a] : '—';
      const bonus = Math.floor((parseInt(val) - 10) / 2);
      html += `<div onclick="rolarValorBestiario('${nomeEnc}','${attrNomes[a]}','${bonus>=0?'+':''}${bonus}')" style="text-align:center;min-width:40px;cursor:pointer;"><div style="font-size:0.6rem;color:var(--text-muted);text-transform:uppercase;font-weight:bold;">${a.toUpperCase()}</div><div style="font-weight:bold;color:var(--text);">${escHTML(String(val))}</div></div>`;
    });
    html += `</div>`;
  }

  // Perícias
  if (c.pericias && c.pericias.length > 0) {
    html += `<div style="font-size:0.75rem;color:var(--text-muted);font-family:'Cinzel',serif;margin-bottom:0.3rem;">PERÍCIAS</div>`;
    html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.4rem 0.6rem;margin-bottom:0.75rem;font-size:0.85rem;display:flex;flex-wrap:wrap;gap:0.2rem 0.6rem;">`;
    c.pericias.forEach(p => {
      html += `<span onclick="rolarValorBestiario('${nomeEnc}','${escHTML(p.nome)}','${escHTML(p.valor)}')" style="cursor:pointer;"><strong>${escHTML(p.nome)}</strong> ${escHTML(p.valor)}</span>`;
    });
    html += `</div>`;
  }

  // Ataques
  if (c.ataques && c.ataques.length > 0) {
    html += `<div style="font-size:0.75rem;color:#c94040;font-family:'Cinzel',serif;margin-bottom:0.3rem;">⚔ ATAQUES</div>`;
    c.ataques.forEach((a, ai) => {
      html += `<div onclick="rolarAtaqueBestiario('${encodeURIComponent(c.nome)}', ${ai})" style="cursor:pointer;background:var(--parch3);border:1px solid var(--border);border-left:3px solid #c94040;border-radius:4px;padding:0.4rem 0.6rem;margin-bottom:0.35rem;transition:background 0.15s;" onmouseenter="this.style.background='rgba(201,64,64,0.08)'" onmouseleave="this.style.background='var(--parch3)'">`;
      html += `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;">`;
      html += `<strong style="font-size:0.85rem;">${escHTML(a.nome)}</strong>`;
      html += `<span style="font-size:0.72rem;color:var(--text-muted);">${escHTML(a.bonus || '')} · ${escHTML(a.dano || '')}</span>`;
      html += `</div>`;
      if (a.desc) html += `<div style="font-size:0.78rem;color:var(--text-dim);margin-top:0.2rem;font-style:italic;">${escHTML(a.desc)}</div>`;
      if (a.tipo) html += `<div style="font-size:0.65rem;color:var(--text-muted);margin-top:0.1rem;">${escHTML(a.tipo)}</div>`;
      html += `</div>`;
    });
  }

  // Habilidades
  if (c.habilidades && c.habilidades.length > 0) {
    html += `<div style="font-size:0.75rem;color:#c9903a;font-family:'Cinzel',serif;margin-bottom:0.3rem;margin-top:0.4rem;">✨ HABILIDADES</div>`;
    c.habilidades.forEach((h, hi) => {
      html += `<div onclick="exibirHabilidadeBestiario('${nomeEnc}', ${hi})" style="cursor:pointer;background:var(--parch3);border:1px solid var(--border);border-left:3px solid #c9903a;border-radius:4px;padding:0.4rem 0.6rem;margin-bottom:0.35rem;transition:background 0.15s;" onmouseenter="this.style.background='rgba(201,144,58,0.08)'" onmouseleave="this.style.background='var(--parch3)'">`;
      html += `<strong style="font-size:0.82rem;">${escHTML(h.nome)}</strong>`;
      if (h.tipo) html += ` <span style="font-size:0.65rem;color:var(--text-muted);">(${escHTML(h.tipo)})</span>`;
      if (h.desc) html += `<div style="font-size:0.78rem;color:var(--text-dim);margin-top:0.2rem;font-style:italic;">${escHTML(h.desc)}</div>`;
      html += `</div>`;
    });
  }

  contentEl.innerHTML = html;
  modalEl.style.display = 'flex';
  // Mostra botão "Criar Token" e guarda criatura atual
  window._bestiarioCriaturaAtual = c.nome;
  const btn = document.getElementById('btnCriarTokenBestiario');
  if (btn) btn.style.display = myRole === 'mestre' ? '' : 'none';
}

function rolarAtaqueBestiario(nomeEnc, atkIdx) {
  if (!bestiarioCache) return;
  const nome = decodeURIComponent(nomeEnc);
  const c = bestiarioCache.find(x => x.nome === nome);
  if (!c || !c.ataques || !c.ataques[atkIdx]) return;
  const a = c.ataques[atkIdx];

  const bonus = parseInt(a.bonus) || 0;
  const atkRoll = Math.floor(Math.random() * 20) + 1;
  const atkTotal = atkRoll + bonus;
  const isCrit = atkRoll === 20;

  let text = `**${escHTML(c.nome)} — ${escHTML(a.nome)}**\n`;
  text += `**Ataque:** 1d20${bonus >= 0 ? '+' : ''}${bonus} → **${atkTotal}** [${atkRoll}]${isCrit ? ' **(CRÍTICO!)**' : ''}`;

  // Rola dano se houver fórmula
  const danoFormula = (a.dano || '').trim();
  if (danoFormula) {
    const formula = isCrit ? `${escalarFormulaDados(danoFormula, 2)} (Crítico!)` : danoFormula;
    text += `\n**Dano:** ${formula} → `;
    // Processa cada dado na fórmula manualmente
    const danoPartes = formula.match(/([+-]?\s*\d*d\d+|[+-]?\s*\d+)/g);
    let danoTotal = 0;
    let det = '';
    if (danoPartes) {
      danoPartes.forEach(p => {
        const limpo = p.replace(/\s/g, '');
        const dm = limpo.match(/^([+-]?)(\d*)d(\d+)$/);
        if (dm) {
          const sinal = dm[1] === '-' ? -1 : 1;
          const qtd = parseInt(dm[2] || '1');
          const faces = parseInt(dm[3]);
          let soma = 0;
          const rl = [];
          for (let i = 0; i < qtd; i++) {
            const r = Math.floor(Math.random() * faces) + 1;
            rl.push(r); soma += r;
          }
          danoTotal += soma * sinal;
          if (det) det += ' + ';
          det += `${soma * sinal} [${rl.join(',')}]`;
        } else {
          const v = parseInt(limpo) || 0;
          danoTotal += v;
          if (det) det += ' + ';
          det += `${v}`;
        }
      });
    }
    text += `**${danoTotal}** (${det})`;
  }

  const msgData = { type: 'roll', name: myName || 'Bestiário', role: myRole, text, time: formatTime(), visibility: 'global' };
  addMsg(msgData);
  if (myRole === 'mestre' || amIHost) {
    broadcast(msgData, null);
  } else if (masterConn) {
    masterConn.send(msgData);
  }

  // Rola dados 3D
  if (typeof rolarDados3d === 'function' && atkRoll) {
    rolarDados3d(20, 1, [atkRoll], atkTotal, bonus, `⚔ ${a.nome}: `);
  }
}

function escalarFormulaDados(formula, mult) {
  return formula.replace(/(\d*)(d\d+)/g, (m, qtd, d) => {
    const n = parseInt(qtd || '1') * mult;
    return n + d;
  });
}

function rolarValorBestiario(nomeEnc, rotulo, valorStr) {
  if (!bestiarioCache) return;
  const nome = decodeURIComponent(nomeEnc);
  const bonus = parseInt(valorStr) || 0;
  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + bonus;

  let text = `**${escHTML(nome)} — ${escHTML(rotulo)}**\n`;
  text += `**Teste:** 1d20${bonus >= 0 ? '+' : ''}${bonus} → **${total}** [${roll}]${roll === 20 ? ' **(CRÍTICO!)**' : ''}`;

  const msgData = { type: 'roll', name: myName || 'Bestiário', role: myRole, text, time: formatTime(), visibility: 'global' };
  addMsg(msgData);
  if (myRole === 'mestre' || amIHost) {
    broadcast(msgData, null);
  } else if (masterConn) {
    masterConn.send(msgData);
  }
}

function exibirHabilidadeBestiario(nomeEnc, habIdx) {
  if (!bestiarioCache) return;
  const nome = decodeURIComponent(nomeEnc);
  const c = bestiarioCache.find(x => x.nome === nome);
  if (!c || !c.habilidades || !c.habilidades[habIdx]) return;
  const h = c.habilidades[habIdx];
  const nomeHab = h.nome || 'Habilidade';
  const desc = h.desc || '';

  let text = `**${escHTML(nome)} — ${escHTML(nomeHab)}**`;
  if (h.tipo) text += ` _(${escHTML(h.tipo)})_`;
  if (desc) text += `\n> ${escHTML(desc)}`;

  const msgData = { type: 'ability', name: myName || 'Bestiário', role: myRole, text, time: formatTime(), visibility: 'global' };
  addMsg(msgData);
  if (myRole === 'mestre' || amIHost) {
    broadcast(msgData, null);
  } else if (masterConn) {
    masterConn.send(msgData);
  }
}

function criarTokenDoBestiario() {
  const nome = window._bestiarioCriaturaAtual;
  if (!nome || !bestiarioCache) return;
  const c = bestiarioCache.find(x => x.nome === nome);
  if (!c) return;
  fecharDetalhesItem();
  window._bestiaryPendingName = c.nome;
  abrirFormToken(undefined, undefined, {
    name: c.nome,
    hp: parseInt(c.pv) || 0,
    imageUrl: c.img || ''
  });
}

// ── Grimório de Magias ──
let magiasCache = null;
let magiasInitialized = false;
let magiaCirculoFiltro = 0;
let magiaEscolaFiltro = '';

function initMagias() {
  if (magiasInitialized) return;
  magiasInitialized = true;
  carregarMagias();
}

function carregarMagias() {
  const resultsEl = document.getElementById('magiasResults');
  const loadingEl = document.getElementById('magiasLoading');
  if (!resultsEl) return;
  resultsEl.innerHTML = '';
  if (loadingEl) loadingEl.style.display = 'block';

  try {
    if (typeof SPELLS_DB === 'undefined' || SPELLS_DB.length === 0) {
      throw new Error('Grimório não encontrado (SPELLS_DB)');
    }
    magiasCache = SPELLS_DB.map(s => ({
      nome: s.n,
      circulo: s.c,
      escola: s.e,
      execucao: s.ex,
      alcance: s.a,
      alvo: s.al,
      duracao: s.d,
      resistencia: s.r,
      descricao: s.desc,
      aprimoramentos: s.aprimoramentos || []
    }));
    if (loadingEl) loadingEl.style.display = 'none';
    buscarMagia();
    toast(`📖 ${magiasCache.length} magias carregadas no Grimório!`);
  } catch(e) {
    if (loadingEl) loadingEl.style.display = 'none';
    if (resultsEl) resultsEl.innerHTML = `<div style="text-align:center;padding:1rem;color:var(--red-bright);font-style:italic;">Erro ao carregar grimório: ${escHTML(e.message)}</div>`;
    console.error('Erro ao carregar magias:', e);
  }
}

function setMagiaCirculo(btn, circ) {
  magiaCirculoFiltro = circ;
  document.querySelectorAll('#magiasCirculoFiltros .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buscarMagia();
}

function setMagiaEscola(btn, escola) {
  magiaEscolaFiltro = escola;
  document.querySelectorAll('#magiasEscolaFiltros .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buscarMagia();
}

function buscarMagia() {
  const resultsEl = document.getElementById('magiasResults');
  const countEl = document.getElementById('magiasCount');
  if (!resultsEl) return;
  if (!magiasCache) { carregarMagias(); return; }

  const termo = (document.getElementById('magiasSearch')?.value || '').toLowerCase().trim();
  let filtradas = magiasCache;

  if (magiaCirculoFiltro > 0) {
    filtradas = filtradas.filter(m => m.circulo == magiaCirculoFiltro);
  }
  if (magiaEscolaFiltro) {
    filtradas = filtradas.filter(m => (m.escola || '').toLowerCase() === magiaEscolaFiltro.toLowerCase());
  }
  if (termo) {
    filtradas = filtradas.filter(m =>
      (m.nome || '').toLowerCase().includes(termo) ||
      (m.escola || '').toLowerCase().includes(termo) ||
      (m.descricao || '').toLowerCase().includes(termo)
    );
  }

  if (countEl) countEl.textContent = `${filtradas.length} magia${filtradas.length !== 1 ? 's' : ''}`;
  renderMagias(filtradas.slice(0, 300));
}

// School colors
const escolaCores = {
  'Abjuração': '#4070c9',
  'Adivinhação': '#40a0a0',
  'Convocação': '#40a060',
  'Encantamento': '#c94080',
  'Evocação': '#c97040',
  'Ilusão': '#8040c9',
  'Necromancia': '#404040',
  'Transmutação': '#c9c040'
};

const circuloColors = {
  1: '#5a7a3a', 2: '#3a6a8a', 3: '#7a4a8a', 4: '#8a4a3a', 5: '#6a1a2a'
};

let collapsedMagiaCirculos = new Set([1, 2, 3, 4, 5]);

function toggleMagiaCirculo(circ) {
  if (collapsedMagiaCirculos.has(circ)) {
    collapsedMagiaCirculos.delete(circ);
  } else {
    collapsedMagiaCirculos.add(circ);
  }
  buscarMagia();
}

function renderMagias(magias) {
  const el = document.getElementById('magiasResults');
  if (!el) return;
  if (magias.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhuma magia encontrada.</div>';
    return;
  }

  // Group by circle
  const grupos = {};
  magias.forEach(m => {
    const key = m.circulo || 1;
    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(m);
  });

  const circles = Object.keys(grupos).map(Number).sort((a, b) => a - b);
  let html = '';

  circles.forEach(circ => {
    const lista = grupos[circ];
    const isCollapsed = collapsedMagiaCirculos.has(circ);
    const cor = circuloColors[circ] || '#555';
    const label = `${circ}º Círculo`;

    html += `
      <div onclick="toggleMagiaCirculo(${circ})" style="display:flex;align-items:center;justify-content:space-between;padding:0.4rem 0.5rem;background:var(--parch2);border:1px solid var(--border);border-left:3px solid ${cor};border-radius:4px;cursor:pointer;margin-top:0.35rem;user-select:none;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.borderLeftColor='${cor}'">
        <span style="font-family:'Cinzel',serif;font-size:0.8rem;font-weight:bold;color:var(--gold);display:flex;align-items:center;gap:0.35rem;">
          <span style="background:${cor};color:#fff;padding:0.1rem 0.4rem;border-radius:3px;font-size:0.7rem;">${circ}</span>
          ${escHTML(label)}
          <span style="font-size:0.65rem;color:var(--text-muted);font-weight:normal;">(${lista.length})</span>
        </span>
        <i class="bi bi-chevron-${isCollapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.75rem;"></i>
      </div>
      <div style="display:${isCollapsed ? 'none' : 'flex'};flex-direction:column;gap:0.2rem;padding-left:0.4rem;border-left:1px dashed var(--border);margin-left:0.5rem;margin-top:0.2rem;margin-bottom:0.3rem;">
    `;

    html += lista.map(m => {
      const cor2 = escolaCores[m.escola] || '#666';
      return `<div onclick="mostrarDetalhesMagia('${escHTML(m.nome)}')" style="display:flex;align-items:center;gap:0.45rem;padding:0.28rem 0.4rem;background:var(--parch3);border:1px solid var(--border);border-radius:3px;cursor:pointer;transition:all 0.12s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'"
        title="${escHTML((m.descricao || '').substring(0,120))}">
        <span style="width:18px;height:18px;border-radius:50%;background:${cor2};display:flex;align-items:center;justify-content:center;font-size:0.55rem;font-weight:700;color:#fff;flex-shrink:0;">${escHTML((m.escola||'?').substring(0,2).toUpperCase())}</span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.72rem;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHTML(m.nome)}</div>
          <div style="font-size:0.58rem;color:var(--text-muted);">${escHTML(m.escola)} · ${escHTML(m.execucao)}</div>
        </div>
      </div>`;
    }).join('');

    html += `</div>`;
  });

  el.innerHTML = html;
}

function mostrarDetalhesMagia(nome) {
  if (!magiasCache) return;
  const m = magiasCache.find(x => x.nome === nome);
  if (!m) return;

  // Reuse the item detail modal
  const titleEl = document.getElementById('itemDetailTitle');
  const contentEl = document.getElementById('itemDetailContent');
  const modalEl = document.getElementById('itemDetailModal');
  if (!titleEl || !contentEl || !modalEl) return;

  titleEl.textContent = m.nome;

  const cor = escolaCores[m.escola] || '#555';
  const cirCor = circuloColors[m.circulo] || '#555';

  let html = '';

  // Tags
  html += `<div style="margin-bottom:0.75rem;display:flex;gap:0.4rem;flex-wrap:wrap;">`;
  html += `<span style="background:${cirCor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.8rem;font-weight:bold;">✨ ${escHTML(String(m.circulo))}º Círculo</span>`;
  html += `<span style="background:${cor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.8rem;">${escHTML(m.escola)}</span>`;
  html += `</div>`;

  // Stats grid
  html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.55rem;margin-bottom:0.7rem;font-size:0.88rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:0.4rem;">`;
  html += `<div><strong>Execução:</strong> ${escHTML(m.execucao)}</div>`;
  html += `<div><strong>Alcance:</strong> ${escHTML(m.alcance)}</div>`;
  if (m.alvo) html += `<div><strong>Alvo/Área:</strong> ${escHTML(m.alvo)}</div>`;
  html += `<div><strong>Duração:</strong> ${escHTML(m.duracao)}</div>`;
  html += `<div><strong>Resistência:</strong> ${escHTML(m.resistencia)}</div>`;
  html += `</div>`;

  // Description
  if (m.descricao) {
    const desc = escHTML(m.descricao).replace(/\n/g, '<br>');
    html += `<div style="border-left:3.5px solid var(--gold);padding-left:0.65rem;font-size:0.9rem;line-height:1.5;word-break:break-word;">${desc}</div>`;
  }

  // Enhancements
  if (m.aprimoramentos && m.aprimoramentos.length > 0) {
    html += `<div style="margin-top:0.8rem;border-top:1px solid var(--border);padding-top:0.5rem;">`;
    html += `<div style="font-family:'Cinzel',serif;font-size:0.82rem;font-weight:bold;color:var(--gold);margin-bottom:0.45rem;">⬆ Aprimoramentos</div>`;
    m.aprimoramentos.forEach(ap => {
      html += `<div style="font-size:0.84rem;margin-bottom:0.4rem;line-height:1.45;padding:0.3rem 0.5rem;background:var(--parch3);border-radius:3px;border-left:2px solid ${cor};">`;
      html += `<span style="color:var(--gold);font-weight:bold;">+${ap.cost} PM</span> — ${escHTML(ap.desc)}`;
      html += `</div>`;
    });
    html += `</div>`;
  }

  contentEl.innerHTML = html;
  modalEl.style.display = 'flex';
}

function initPoderes() {
  if (poderesInitialized) return;
  poderesInitialized = true;
  setPoderesSecao(null, 'origens');
}

function setPoderesSecao(btn, sec) {
  poderesSecaoAtiva = sec;
  poderesSubfiltro = '';
  document.querySelectorAll('#poderesSecaoFiltros .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  _buildPoderesSubfiltros(sec);
  buscarPoderes();
}

function setPoderesSubfiltro(btn, val) {
  poderesSubfiltro = val;
  document.querySelectorAll('#poderesSubfiltros .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buscarPoderes();
}

function _buildPoderesSubfiltros(sec) {
  const wrap = document.getElementById('poderesSubfiltroWrap');
  const label = document.getElementById('poderesSubfiltroLabel');
  const container = document.getElementById('poderesSubfiltros');
  if (!wrap || !container) return;

  if (sec === 'poderes') {
    // Classes únicas de powersData
    const classes = [...new Set(
      (typeof powersData !== 'undefined' ? powersData : []).map(p => p.class).filter(Boolean)
    )].sort();
    label.textContent = 'CLASSE';
    container.innerHTML = `<button class="bau-cat-btn active" onclick="setPoderesSubfiltro(this,'')">Todas</button>` +
      classes.map(c => `<button class="bau-cat-btn" onclick="setPoderesSubfiltro(this,'${escHTML(c)}')">${escHTML(_nomeClasse(c))}</button>`).join('');
    wrap.style.display = 'block';
  } else if (sec === 'distincoes') {
    label.textContent = 'FONTE';
    container.innerHTML = `
      <button class="bau-cat-btn active" onclick="setPoderesSubfiltro(this,'')">Todas</button>
      <button class="bau-cat-btn" onclick="setPoderesSubfiltro(this,'herois')">Heróis de Arton</button>
      <button class="bau-cat-btn" onclick="setPoderesSubfiltro(this,'t20')">T20</button>
    `;
    wrap.style.display = 'block';
  } else {
    wrap.style.display = 'none';
  }
}

function _nomeClasse(c) {
  const nomes = {
    arcanista: 'Arcanista', barbaro: 'Bárbaro', bardo: 'Bardo',
    bucaneiro: 'Bucaneiro', cacador: 'Caçador', cavaleiro: 'Cavaleiro',
    clerigo: 'Clérigo', druida: 'Druida', guerreiro: 'Guerreiro',
    inventor: 'Inventor', ladino: 'Ladino', lutador: 'Lutador',
    nobre: 'Nobre', paladino: 'Paladino', samurai: 'Samurai',
    shaman: 'Xamã', outro: 'Outro'
  };
  return nomes[c] || c.charAt(0).toUpperCase() + c.slice(1);
}

function buscarPoderes() {
  const resultsEl = document.getElementById('poderesResults');
  const countEl = document.getElementById('poderesCount');
  if (!resultsEl) return;

  const termo = (document.getElementById('poderesSearch')?.value || '').toLowerCase().trim();
  const sec = poderesSecaoAtiva;

  let itens = [];

  if (sec === 'origens') {
    itens = typeof origensData !== 'undefined' ? origensData : [];
    if (termo) {
      itens = itens.filter(o =>
        (o.name || '').toLowerCase().includes(termo) ||
        (o.desc || '').toLowerCase().includes(termo) ||
        (o.items || '').toLowerCase().includes(termo)
      );
    }
    if (countEl) countEl.textContent = `${itens.length} origem${itens.length !== 1 ? 'ns' : ''}`;
    renderOrigens(itens);

  } else if (sec === 'poderes') {
    itens = typeof powersData !== 'undefined' ? powersData : [];
    if (poderesSubfiltro) itens = itens.filter(p => p.class === poderesSubfiltro);
    if (termo) {
      itens = itens.filter(p =>
        (p.name || '').toLowerCase().includes(termo) ||
        (p.desc || '').toLowerCase().includes(termo) ||
        (p.req || '').toLowerCase().includes(termo)
      );
    }
    if (countEl) countEl.textContent = `${itens.length} poder${itens.length !== 1 ? 'es' : ''}`;
    renderPoderes(itens);

  } else if (sec === 'distincoes') {
    itens = typeof distincoesData !== 'undefined' ? distincoesData : [];
    if (poderesSubfiltro) itens = itens.filter(d => (d.source || '').toLowerCase() === poderesSubfiltro);
    if (termo) {
      itens = itens.filter(d =>
        (d.name || '').toLowerCase().includes(termo) ||
        (d.admissao || '').toLowerCase().includes(termo) ||
        (d.poderes || []).some(p => (p.name || '').toLowerCase().includes(termo) || (p.desc || '').toLowerCase().includes(termo))
      );
    }
    if (countEl) countEl.textContent = `${itens.length} distinção${itens.length !== 1 ? 'ções' : ''}`;
    renderDistincoes(itens);
  }
}

// ── Cores de classe ──
const classeCores = {
  arcanista: '#7040a0', barbaro: '#c04040', bardo: '#c07020',
  bucaneiro: '#205090', cacador: '#406030', cavaleiro: '#809040',
  clerigo: '#a08020', druida: '#306040', guerreiro: '#904040',
  inventor: '#307070', ladino: '#505050', lutador: '#803030',
  nobre: '#706020', paladino: '#4060a0', samurai: '#802020',
  shaman: '#306060'
};

const subTypeCor = { ability: '#5a8a5a', power: '#7a5a9a', geral: '#6a7a9a' };

// ─────────────── ORIGENS ───────────────
let collapsedOrigens = new Set();

function toggleOrigemFolder(id) {
  if (collapsedOrigens.has(id)) collapsedOrigens.delete(id);
  else collapsedOrigens.add(id);
  buscarPoderes();
}

function renderOrigens(origens) {
  const el = document.getElementById('poderesResults');
  if (!el) return;
  if (origens.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhuma origem encontrada.</div>';
    return;
  }

  const html = origens.map(o => {
    const collapsed = collapsedOrigens.has(o.id);
    const benefitList = (o.benefits || []).map(b => {
      const cor = b.type === 'skill' ? '#3a7a5a' : b.type === 'power' ? '#7a5a9a' : '#6a6a9a';
      const label = b.type === 'skill' ? 'Perícia' : b.type === 'power' ? 'Poder' : 'Especial';
      return `<div style="display:flex;align-items:center;gap:0.35rem;padding:0.2rem 0.35rem;background:var(--parch3);border-radius:3px;border-left:2px solid ${cor};">
        <span style="font-size:0.58rem;background:${cor};color:#fff;padding:0.05rem 0.3rem;border-radius:2px;font-family:'Cinzel',serif;">${label}</span>
        <span style="font-size:0.7rem;color:var(--text);">${escHTML(b.name)}${b.desc ? ' — <em style="color:var(--text-muted);font-size:0.65rem;">' + escHTML(b.desc.substring(0,80)) + (b.desc.length>80?'…':'') + '</em>' : ''}</span>
      </div>`;
    }).join('');

    const sourceTag = o.source === 'T20' ? `<span style="font-size:0.58rem;background:rgba(212,175,55,0.15);border:1px solid var(--gold);color:var(--gold);padding:0.05rem 0.3rem;border-radius:2px;">T20</span>` :
      o.source === 'atlas' ? `<span style="font-size:0.58rem;background:rgba(100,150,200,0.15);border:1px solid #6a9abc;color:#6a9abc;padding:0.05rem 0.3rem;border-radius:2px;">Atlas</span>` : '';

    return `<div style="border:1px solid var(--border);border-radius:4px;overflow:hidden;margin-bottom:0.2rem;">
      <div onclick="toggleOrigemFolder('${escHTML(o.id)}')" style="display:flex;align-items:center;justify-content:space-between;padding:0.35rem 0.45rem;background:var(--parch2);cursor:pointer;user-select:none;" onmouseover="this.style.background='rgba(212,175,55,0.08)'" onmouseout="this.style.background='var(--parch2)'">
        <span style="display:flex;align-items:center;gap:0.35rem;font-family:'Cinzel',serif;font-size:0.77rem;font-weight:bold;color:var(--text);">
          🏠 ${escHTML(o.name)} ${sourceTag}
          ${o.chooseCount ? `<span style="font-size:0.6rem;color:var(--text-muted);font-weight:normal;">Escolha ${o.chooseCount}</span>` : ''}
        </span>
        <i class="bi bi-chevron-${collapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.72rem;"></i>
      </div>
      ${collapsed ? '' : `<div style="padding:0.4rem 0.45rem;display:flex;flex-direction:column;gap:0.25rem;">
        ${o.desc ? `<div style="font-size:0.72rem;color:var(--text-muted);line-height:1.4;margin-bottom:0.25rem;font-style:italic;">${escHTML(o.desc.substring(0,200))}${o.desc.length>200?'…':''}</div>` : ''}
        ${o.items ? `<div style="font-size:0.68rem;color:var(--gold);margin-bottom:0.2rem;">📦 ${escHTML(o.items)}</div>` : ''}
        <div style="font-size:0.62rem;color:var(--text-muted);font-family:'Cinzel',serif;margin-bottom:0.2rem;">BENEFÍCIOS DISPONÍVEIS</div>
        <div style="display:flex;flex-direction:column;gap:0.18rem;">${benefitList}</div>
      </div>`}
    </div>`;
  }).join('');

  el.innerHTML = html;
}

// ─────────────── PODERES DE CLASSE ───────────────
let collapsedPoderesClasse = new Set(['arcanista','barbaro','bardo','bucaneiro','cacador','cavaleiro','clerigo','druida','frade','guerreiro','inventor','ladino','lutador','nobre','paladino','treinador','origens','distincoes']);

function togglePoderesClasseFolder(cls) {
  if (collapsedPoderesClasse.has(cls)) collapsedPoderesClasse.delete(cls);
  else collapsedPoderesClasse.add(cls);
  buscarPoderes();
}

function renderPoderes(poderes) {
  const el = document.getElementById('poderesResults');
  if (!el) return;
  if (poderes.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhum poder encontrado.</div>';
    return;
  }

  // Group by class
  const grupos = {};
  poderes.forEach(p => {
    const cls = p.class || 'geral';
    if (!grupos[cls]) grupos[cls] = [];
    grupos[cls].push(p);
  });

  const classes = Object.keys(grupos).sort();
  let html = '';

  classes.forEach(cls => {
    const lista = grupos[cls];
    const collapsed = collapsedPoderesClasse.has(cls);
    const cor = classeCores[cls] || '#555';
    const nome = _nomeClasse(cls);

    // Sub-group by subType
    const habilidades = lista.filter(p => p.subType === 'ability');
    const powers = lista.filter(p => p.subType === 'power');
    const outros = lista.filter(p => !p.subType || (p.subType !== 'ability' && p.subType !== 'power'));

    html += `
      <div style="border:1px solid var(--border);border-left:3px solid ${cor};border-radius:4px;overflow:hidden;margin-bottom:0.25rem;">
        <div onclick="togglePoderesClasseFolder('${escHTML(cls)}')" style="display:flex;align-items:center;justify-content:space-between;padding:0.38rem 0.45rem;background:var(--parch2);cursor:pointer;user-select:none;" onmouseover="this.style.background='rgba(212,175,55,0.08)'" onmouseout="this.style.background='var(--parch2)'">
          <span style="display:flex;align-items:center;gap:0.4rem;font-family:'Cinzel',serif;font-size:0.8rem;font-weight:bold;color:var(--gold);">
            <span style="background:${cor};color:#fff;padding:0.08rem 0.4rem;border-radius:3px;font-size:0.65rem;">${escHTML(nome)}</span>
            <span style="font-size:0.65rem;color:var(--text-muted);font-weight:normal;">(${lista.length})</span>
          </span>
          <i class="bi bi-chevron-${collapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.72rem;"></i>
        </div>
        ${collapsed ? '' : `<div style="padding:0.3rem 0.4rem;display:flex;flex-direction:column;gap:0.18rem;">
          ${habilidades.length > 0 ? `<div style="font-size:0.6rem;color:var(--text-muted);font-family:'Cinzel',serif;margin:0.15rem 0 0.1rem;">HABILIDADES DE CLASSE</div>
          ${habilidades.map(p => _renderPoderItem(p, cor)).join('')}` : ''}
          ${powers.length > 0 ? `<div style="font-size:0.6rem;color:var(--text-muted);font-family:'Cinzel',serif;margin:0.25rem 0 0.1rem;">PODERES</div>
          ${powers.map(p => _renderPoderItem(p, cor)).join('')}` : ''}
          ${outros.length > 0 ? outros.map(p => _renderPoderItem(p, cor)).join('') : ''}
        </div>`}
      </div>`;
  });

  el.innerHTML = html;
}

function _renderPoderItem(p, cor) {
  const subCor = subTypeCor[p.subType] || cor;
  const badge = p.subType === 'ability' ? 'Hab.' : p.subType === 'power' ? 'Poder' : '';
  return `<div onclick="mostrarDetalhesPoder('${escHTML(p.name)}','${escHTML(p.class||'')}')" style="display:flex;align-items:flex-start;gap:0.4rem;padding:0.25rem 0.35rem;background:var(--parch3);border:1px solid var(--border);border-radius:3px;cursor:pointer;transition:all 0.12s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
    ${badge ? `<span style="font-size:0.55rem;background:${subCor};color:#fff;padding:0.05rem 0.28rem;border-radius:2px;margin-top:0.15rem;flex-shrink:0;font-family:'Cinzel',serif;">${badge}</span>` : ''}
    <div style="flex:1;min-width:0;">
      <div style="font-size:0.72rem;color:var(--text);font-weight:bold;">${escHTML(p.name)}</div>
      ${p.req ? `<div style="font-size:0.6rem;color:var(--text-muted);">📋 ${escHTML(p.req)}</div>` : ''}
    </div>
  </div>`;
}

function mostrarDetalhesPoder(name, cls) {
  const data = typeof powersData !== 'undefined' ? powersData : [];
  const p = data.find(x => x.name === name && (x.class || '') === cls) || data.find(x => x.name === name);
  if (!p) return;

  const titleEl = document.getElementById('itemDetailTitle');
  const contentEl = document.getElementById('itemDetailContent');
  const modalEl = document.getElementById('itemDetailModal');
  if (!titleEl || !contentEl || !modalEl) return;

  titleEl.textContent = p.name;
  const cor = classeCores[p.class] || '#555';
  const nomeCls = _nomeClasse(p.class || '');
  const subCor = subTypeCor[p.subType] || cor;
  const badge = p.subType === 'ability' ? 'Habilidade de Classe' : p.subType === 'power' ? 'Poder de Classe' : '';

  let html = `<div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:0.7rem;">`;
  if (nomeCls) html += `<span style="background:${cor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.8rem;font-weight:bold;">${escHTML(nomeCls)}</span>`;
  if (badge) html += `<span style="background:${subCor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.75rem;">${badge}</span>`;
  html += `</div>`;

  if (p.req) {
    html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.45rem 0.55rem;margin-bottom:0.6rem;font-size:0.85rem;">
      <strong>Requisito:</strong> ${escHTML(p.req)}
    </div>`;
  }

  if (p.desc) {
    html += `<div style="border-left:3.5px solid var(--gold);padding-left:0.65rem;font-size:0.9rem;line-height:1.55;word-break:break-word;">${p.desc}</div>`;
  }

  contentEl.innerHTML = html;
  modalEl.style.display = 'flex';
}

// ─────────────── DISTINÇÕES ───────────────
let collapsedDistincoes = new Set();

function toggleDistincaoFolder(id) {
  if (collapsedDistincoes.has(id)) collapsedDistincoes.delete(id);
  else collapsedDistincoes.add(id);
  buscarPoderes();
}

function renderDistincoes(distincoes) {
  const el = document.getElementById('poderesResults');
  if (!el) return;
  if (distincoes.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhuma distinção encontrada.</div>';
    return;
  }

  const html = distincoes.map(d => {
    const collapsed = collapsedDistincoes.has(d.id);
    const sourceCor = d.source === 'herois' ? '#6a4a9a' : '#4a6a9a';
    const sourceLabel = d.source === 'herois' ? 'Heróis de Arton' : 'T20';
    const exclusiva = d.exclusiva ? `<span style="font-size:0.58rem;background:rgba(180,60,60,0.2);border:1px solid #c04040;color:#c04040;padding:0.05rem 0.3rem;border-radius:2px;">Exclusiva</span>` : '';

    const poderesHTML = (d.poderes || []).map(p =>
      `<div onclick="mostrarDetalhesDistincao('${escHTML(d.id)}','${escHTML(p.name)}')" style="display:flex;align-items:flex-start;gap:0.4rem;padding:0.22rem 0.35rem;background:var(--parch3);border:1px solid var(--border);border-radius:3px;cursor:pointer;transition:all 0.12s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.71rem;color:var(--text);font-weight:bold;">${escHTML(p.name)}</div>
          ${p.req ? `<div style="font-size:0.6rem;color:var(--text-muted);">📋 ${escHTML(p.req)}</div>` : ''}
        </div>
      </div>`
    ).join('');

    return `<div style="border:1px solid var(--border);border-left:3px solid ${sourceCor};border-radius:4px;overflow:hidden;margin-bottom:0.25rem;">
      <div onclick="toggleDistincaoFolder('${escHTML(d.id)}')" style="display:flex;align-items:center;justify-content:space-between;padding:0.38rem 0.45rem;background:var(--parch2);cursor:pointer;user-select:none;" onmouseover="this.style.background='rgba(212,175,55,0.08)'" onmouseout="this.style.background='var(--parch2)'">
        <span style="display:flex;align-items:center;gap:0.35rem;flex-wrap:wrap;">
          <span style="font-family:'Cinzel',serif;font-size:0.77rem;font-weight:bold;color:var(--gold);">🏆 ${escHTML(d.name)}</span>
          <span style="font-size:0.58rem;background:${sourceCor};color:#fff;padding:0.05rem 0.3rem;border-radius:2px;">${sourceLabel}</span>
          ${exclusiva}
          <span style="font-size:0.6rem;color:var(--text-muted);">(${(d.poderes||[]).length} poderes)</span>
        </span>
        <i class="bi bi-chevron-${collapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.72rem;flex-shrink:0;"></i>
      </div>
      ${collapsed ? '' : `<div style="padding:0.4rem 0.45rem;display:flex;flex-direction:column;gap:0.25rem;">
        ${d.marca ? `<div style="background:rgba(212,175,55,0.08);border:1px solid var(--gold);border-radius:4px;padding:0.35rem 0.45rem;margin-bottom:0.15rem;">
          <div style="font-size:0.68rem;color:var(--gold);font-family:'Cinzel',serif;font-weight:bold;margin-bottom:0.15rem;">⭐ ${escHTML(d.marca.name)}</div>
          <div style="font-size:0.7rem;color:var(--text-muted);line-height:1.4;">${escHTML(d.marca.desc)}</div>
        </div>` : ''}
        ${d.admissao ? `<div style="font-size:0.68rem;color:var(--text-muted);font-style:italic;line-height:1.4;border-left:2px solid var(--border);padding-left:0.45rem;">${escHTML(d.admissao.substring(0,200))}${d.admissao.length>200?'…':''}</div>` : ''}
        ${poderesHTML ? `<div style="font-size:0.6rem;color:var(--text-muted);font-family:'Cinzel',serif;margin:0.15rem 0 0.1rem;">PODERES DA DISTINÇÃO</div>
        <div style="display:flex;flex-direction:column;gap:0.15rem;">${poderesHTML}</div>` : ''}
      </div>`}
    </div>`;
  }).join('');

  el.innerHTML = html;
}

function mostrarDetalhesDistincao(distId, poderName) {
  const data = typeof distincoesData !== 'undefined' ? distincoesData : [];
  const d = data.find(x => x.id === distId);
  if (!d) return;
  const p = (d.poderes || []).find(x => x.name === poderName);
  if (!p) return;

  const titleEl = document.getElementById('itemDetailTitle');
  const contentEl = document.getElementById('itemDetailContent');
  const modalEl = document.getElementById('itemDetailModal');
  if (!titleEl || !contentEl || !modalEl) return;

  titleEl.textContent = p.name;
  const sourceCor = d.source === 'herois' ? '#6a4a9a' : '#4a6a9a';
  const sourceLabel = d.source === 'herois' ? 'Heróis de Arton' : 'T20';

  let html = `<div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:0.7rem;">
    <span style="background:${sourceCor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.78rem;">🏆 ${escHTML(d.name)}</span>
    <span style="background:rgba(212,175,55,0.1);border:1px solid var(--gold);color:var(--gold);padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.75rem;">${sourceLabel}</span>
  </div>`;

  if (p.req) {
    html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.45rem 0.55rem;margin-bottom:0.6rem;font-size:0.85rem;">
      <strong>Requisito:</strong> ${escHTML(p.req)}
    </div>`;
  }

  if (p.desc) {
    html += `<div style="border-left:3.5px solid var(--gold);padding-left:0.65rem;font-size:0.9rem;line-height:1.55;word-break:break-word;">${p.desc}</div>`;
  }

  contentEl.innerHTML = html;
  modalEl.style.display = 'flex';
}

function renderBauItems(items) {
  const el = document.getElementById('bauResults');
  if (!el) return;
  if (items.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhum registro encontrado.</div>';
    return;
  }

  // Only equipment items (spells have their own tab)
  const equips = items.filter(i => !i.isSpell);

  let html = '';

  // ── RENDER EQUIPAMENTOS PARENT FOLDER ──
  if (equips.length > 0) {
    const groupedEquip = {};
    equips.forEach(item => {
      const cat = item.categoria || 'Outros';
      if (!groupedEquip[cat]) groupedEquip[cat] = [];
      groupedEquip[cat].push(item);
    });

    const orderedCats = [
      'Arma', 'Armadura', 'Escudo', 'Item Geral', 'Item Superior', 'Item Mágico', 'encantamento', 'Maldição'
    ];
    Object.keys(groupedEquip).forEach(cat => {
      if (!orderedCats.includes(cat)) {
        orderedCats.push(cat);
      }
    });

    const catColors = {
      'Arma': '#c94040', 'Armadura': '#4070c9', 'Escudo': '#40a060',
      'Item Geral': '#9c8a72', 'Item Superior': '#c9903a', 'Item Mágico': '#9040c9',
      'encantamento': '#40a0c9', 'Maldição': '#8a2040'
    };

    const catNames = {
      'Arma': 'Armas',
      'Armadura': 'Armaduras',
      'Escudo': 'Escudos',
      'Item Geral': 'Itens Gerais',
      'Item Superior': 'Itens Superiores',
      'Item Mágico': 'Itens Mágicos',
      'encantamento': 'Encantamentos',
      'Maldição': 'Maldições',
      'Outros': 'Outros'
    };

    const catIcons = {
      'Arma': '⚔',
      'Armadura': '🛡',
      'Escudo': '🛡',
      'Item Geral': '📦',
      'Item Superior': '⭐',
      'Item Mágico': '🔮',
      'encantamento': '✨',
      'Maldição': '☠',
      'Outros': '📂'
    };

    const isEquipamentosCollapsed = collapsedBauCategories.has('Equipamentos');

    html += `
      <div class="bau-parent-folder-header" onclick="toggleBauFolder('Equipamentos')" style="display:flex;align-items:center;justify-content:space-between;padding:0.45rem 0.55rem;background:var(--parch2);border:1px solid var(--border);border-radius:4px;cursor:pointer;margin-top:0.4rem;user-select:none;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
        <span style="font-family:'Cinzel',serif;font-size:0.85rem;font-weight:bold;color:var(--gold);display:flex;align-items:center;gap:0.35rem;">
          <span>📂</span> Equipamentos
        </span>
        <i class="bi bi-chevron-${isEquipamentosCollapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.8rem;"></i>
      </div>
      <div class="bau-parent-folder-content" style="display:${isEquipamentosCollapsed ? 'none' : 'block'};padding-left:0.5rem;border-left:1px dashed var(--border);margin-left:0.55rem;margin-top:0.25rem;">
    `;

    orderedCats.forEach(cat => {
      const catItems = groupedEquip[cat];
      if (!catItems || catItems.length === 0) return;

      const name = catNames[cat] || cat;
      const icon = catIcons[cat] || '📂';
      const isCollapsed = collapsedBauCategories.has(cat);
      const count = catItems.length;

      html += `
        <div class="bau-folder-header" onclick="toggleBauFolder('${escHTML(cat)}')" style="display:flex;align-items:center;justify-content:space-between;padding:0.35rem 0.45rem;background:var(--parch3);border:1px solid var(--border);border-radius:4px;cursor:pointer;margin-top:0.35rem;user-select:none;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
          <span style="font-family:'Cinzel',serif;font-size:0.78rem;font-weight:bold;color:var(--gold);display:flex;align-items:center;gap:0.3rem;">
            <span>${icon}</span> ${escHTML(name)} <span style="font-size:0.68rem;color:var(--text-muted);font-weight:normal;">(${count})</span>
          </span>
          <i class="bi bi-chevron-${isCollapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.75rem;"></i>
        </div>
        <div class="bau-folder-content" style="display:${isCollapsed ? 'none' : 'flex'};flex-direction:column;gap:0.25rem;padding-left:0.35rem;margin-top:0.2rem;margin-bottom:0.35rem;">
      `;

      html += catItems.map(item => {
        const cor = catColors[cat] || '#9c8a72';
        const extras = [];
        if (item.dano) extras.push('⚔ ' + escHTML(item.dano));
        if (item.bonus_defesa) extras.push('🛡 ' + escHTML(item.bonus_defesa));
        if (item.empunhadura) extras.push(escHTML(item.empunhadura));
        const extraStr = extras.length ? ' · ' + extras.join(' ') : '';
        const preco = item.preco ? ' · ' + escHTML(item.preco) : '';
        return `<div onclick="mostrarDetalhesItem('${escHTML(item.nome)}')" style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0.4rem;background:var(--parch3);border:1px solid var(--border);border-radius:3px;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'" title="${escHTML((item.descricao || '').substring(0, 120))}">
          <span style="width:18px;height:18px;border-radius:50%;background:${cor};display:flex;align-items:center;justify-content:center;font-size:0.5rem;font-weight:700;color:#fff;flex-shrink:0;">${cat === 'encantamento' ? 'E' : cat === 'Maldição' ? 'M' : cat === 'Item Mágico' ? 'IM' : cat === 'Item Superior' ? 'S' : cat === 'Item Geral' ? 'G' : cat === 'Armadura' ? 'A' : cat === 'Escudo' ? 'E' : 'W'}</span>
          <div style="flex:1;min-width:0;">
            <div style="font-size:0.72rem;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHTML(item.nome)}</div>
            <div style="font-size:0.58rem;color:var(--text-muted);">${escHTML(cat)}${item.tipo ? ' · ' + escHTML(item.tipo) : ''}${preco}${extraStr}</div>
          </div>
        </div>`;
      }).join('');

      html += `</div>`;
    });

    html += `</div>`;
  }

  el.innerHTML = html;
}


function mostrarDetalhesItem(itemName) {
  if (!itemName || !bauItemsCache) return;
  const item = bauItemsCache.find(i => i.nome === itemName);
  if (!item) return;

  const titleEl = document.getElementById('itemDetailTitle');
  const contentEl = document.getElementById('itemDetailContent');
  const modalEl = document.getElementById('itemDetailModal');

  if (titleEl) titleEl.textContent = item.nome;
  
  if (contentEl) {
    let html = '';
    
    if (item.isSpell) {
      // Tags: Circle, School
      html += `<div style="margin-bottom:0.75rem; display:flex; gap:0.4rem; flex-wrap:wrap; font-family:'Cinzel', serif; font-size:0.85rem;">`;
      html += `<span style="background:#9040c9; color:#fff; padding:0.15rem 0.4rem; border-radius:3px; font-weight:bold;">🔮 ${escHTML(item.circulo)}º Círculo</span>`;
      html += `<span style="background:rgba(255,255,255,0.08); border:1px solid var(--border); padding:0.15rem 0.4rem; border-radius:3px; color:var(--text-muted);">${escHTML(item.escola)}</span>`;
      html += `</div>`;

      // Stats Grid: Execucao, Alcance, Alvo/Área, Duracao, Resistencia
      html += `<div style="background:var(--parch3); border:1px solid var(--border); border-radius:4px; padding:0.5rem; margin-bottom:0.75rem; font-size:0.9rem; display:grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap:0.4rem;">`;
      html += `<div><strong>Execução:</strong> ${escHTML(item.execucao)}</div>`;
      html += `<div><strong>Alcance:</strong> ${escHTML(item.alcance)}</div>`;
      if (item.alvo) html += `<div><strong>Alvo/Área:</strong> ${escHTML(item.alvo)}</div>`;
      html += `<div><strong>Duração:</strong> ${escHTML(item.duracao)}</div>`;
      html += `<div><strong>Resistência:</strong> ${escHTML(item.resistencia)}</div>`;
      html += `</div>`;

      // Description
      if (item.descricao) {
        const formattedDesc = escHTML(item.descricao).replace(/\n/g, '<br>');
        html += `<div style="border-left:3.5px solid var(--gold); padding-left:0.6rem; margin-top:0.5rem; font-style:italic; white-space: pre-wrap; word-break: break-word;">${formattedDesc}</div>`;
      }

      // Enhancements
      if (item.aprimoramentos && item.aprimoramentos.length > 0) {
        html += `<div style="margin-top:0.75rem; border-top:1px solid var(--border); padding-top:0.5rem;">`;
        html += `<div style="font-family:'Cinzel', serif; font-size:0.85rem; font-weight:bold; color:var(--gold); margin-bottom:0.4rem;">Aprimoramentos:</div>`;
        item.aprimoramentos.forEach(ap => {
          html += `<div style="font-size:0.85rem; margin-bottom:0.35rem; line-height:1.4; padding-left:0.6rem; border-left:2px solid var(--border); color:var(--text-muted);">`;
          html += `<strong style="color:var(--text);">+${ap.cost} PM:</strong> ${escHTML(ap.desc)}`;
          html += `</div>`;
        });
        html += `</div>`;
      }
    } else {
      // Category, Type, Price tags
      html += `<div style="margin-bottom:0.75rem; display:flex; gap:0.4rem; flex-wrap:wrap; font-family:'Cinzel', serif; font-size:0.85rem;">`;
      if (item.categoria) {
        const catColors = {
          'Arma': '#c94040', 'Armadura': '#4070c9', 'Escudo': '#40a060',
          'Item Geral': '#9c8a72', 'Item Superior': '#c9903a', 'Item Mágico': '#9040c9',
          'encantamento': '#40a0c9', 'Maldição': '#8a2040'
        };
        const cor = catColors[item.categoria] || '#9c8a72';
        html += `<span style="background:${cor}; color:#fff; padding:0.15rem 0.4rem; border-radius:3px; font-weight:bold;">${escHTML(item.categoria)}</span>`;
      }
      if (item.tipo) {
        html += `<span style="background:rgba(255,255,255,0.08); border:1px solid var(--border); padding:0.15rem 0.4rem; border-radius:3px; color:var(--text-muted);">${escHTML(item.tipo)}</span>`;
      }
      if (item.preco) {
        html += `<span style="background:rgba(212,175,55,0.1); border:1px solid var(--gold); padding:0.15rem 0.4rem; border-radius:3px; color:var(--gold); font-weight:bold;">${escHTML(item.preco)}</span>`;
      }
      html += `</div>`;

      // Item Stats Grid
      let hasStats = false;
      let statsHtml = `<div style="background:var(--parch3); border:1px solid var(--border); border-radius:4px; padding:0.5rem; margin-bottom:0.75rem; font-size:0.9rem; display:grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap:0.4rem;">`;
      
      if (item.dano) {
        statsHtml += `<div><strong>Dano:</strong> ${escHTML(item.dano)}</div>`;
        hasStats = true;
      }
      if (item.bonus_defesa || item.defesa) {
        statsHtml += `<div><strong>Defesa:</strong> ${escHTML(item.bonus_defesa || item.defesa)}</div>`;
        hasStats = true;
      }
      if (item.empunhadura) {
        statsHtml += `<div><strong>Empunhadura:</strong> ${escHTML(item.empunhadura)}</div>`;
        hasStats = true;
      }
      if (item.espaco || item.espacos) {
        statsHtml += `<div><strong>Espaço:</strong> ${escHTML(item.espaco || item.espacos)}</div>`;
        hasStats = true;
      }
      if (item.peso) {
        statsHtml += `<div><strong>Peso:</strong> ${escHTML(item.peso)}</div>`;
        hasStats = true;
      }
      if (item.critico) {
        statsHtml += `<div><strong>Crítico:</strong> ${escHTML(item.critico)}</div>`;
        hasStats = true;
      }
      if (item.alcance) {
        statsHtml += `<div><strong>Alcance:</strong> ${escHTML(item.alcance)}</div>`;
        hasStats = true;
      }
      
      statsHtml += `</div>`;
      
      if (hasStats) {
        html += statsHtml;
      }

      // Item Description
      if (item.descricao) {
        const formattedDesc = escHTML(item.descricao).replace(/\n/g, '<br>');
        html += `<div style="border-left:3.5px solid var(--gold); padding-left:0.6rem; margin-top:0.5rem; font-style:italic; white-space: pre-wrap; word-break: break-word;">${formattedDesc}</div>`;
      } else {
        html += `<div style="color:var(--text-muted); font-style:italic;">Sem descrição adicional.</div>`;
      }
    }

    contentEl.innerHTML = html;
  }

  if (modalEl) {
    modalEl.style.display = 'flex';
  }
}

function arrastarBestiario(e, nome) {
  e.dataTransfer.setData('text/plain', nome);
  e.dataTransfer.effectAllowed = 'copy';
}

function onBestiaryDrop(e) {
  e.preventDefault();
  const nome = e.dataTransfer.getData('text/plain');
  if (!nome || !bestiarioCache) return;
  const c = bestiarioCache.find(x => x.nome === nome);
  if (!c) return;

  const rect = BOARD.wrap.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;
  const { gx, gy } = canvasToGrid(cx, cy);

  const nomeToken = c.nome || 'Token';
  const hp = parseInt(c.pv) || 0;
  const cor = bestiarioNdColors[c.nd] || '#c94040';
  const imgUrl = c.img || '';

  BOARD.tokens.push({
    id: 'tk' + Date.now() + Math.floor(Math.random()*9999),
    name: nomeToken, hp, hpMax: hp,
    size: 1, sizeX: 1, sizeY: 1,
    color: cor,
    imageUrl: imgUrl,
    controlledBy: null,
    layer: BOARD.activeLayer || 'players',
    imagePosition: '50% 50%',
    conditions: [], hideName: false,
    bestiaryName: nomeToken,
    visionType: 'normal', auras: [],
    borderType: 'solid', borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.5)',
    shapeType: 'circle', auraRadius: 0, auraColor: 'rgba(66,165,245,0.2)',
    z: 0,
    gx: Math.max(0, gx), gy: Math.max(0, gy)
  });
  boardSave(); boardRender(); syncBoardTokensToPlayers();
  toast(`Token de ${nomeToken} criado!`);
}

function fecharDetalhesItem() {
  const modalEl = document.getElementById('itemDetailModal');
  if (modalEl) {
    modalEl.style.display = 'none';
  }
}

// ── Pergaminhos (Notas do Mestre) ──
let vttNotas = [];

function syncNotasToPlayers() {
  if (myRole !== 'mestre' && !amIHost) return;
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
      } else if (data.type === 'chat' || data.type === 'roll' || data.type === 'gif') {
        const vis = data.visibility || 'global';
        if (vis === 'global') { addMsg(data); broadcast(data, conn.peer); }
        else if (vis === 'togm' || vis === 'blind') { addMsg(data); }
      } else if (data.type === 'msg-reveal') {
        broadcast(data.msgData, null); addMsg(data.msgData);
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
            verificarGatilhosToken(t);
            setTimeout(atualizarSeguirToken, 50);
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
      } else if (data.type === 'solicitar-ativar-gatilho') {
        const t = BOARD.tokens.find(tk => tk.id === data.tokenId);
        const s = BOARD.shapes.find(sk => sk.id === data.shapeId);
        if (t && s && t.controlledBy === conn.peer) {
          aplicarAcaoGatilho(t, s, data.action);
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
  activeFloor: 0,
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
  // Formas desenhadas: array de { id, kind: 'rect'|'circle', x1, y1, x2, y2, color, layer }
  shapes: [],
  // Desenho de forma em andamento
  shapeDrawing: false, shapeStartX: 0, shapeStartY: 0, shapeCurX: 0, shapeCurY: 0,
  shapeColor: '#c9903a',
  // Fog of War: Set de "gx,gy" visíveis (calculado dinamicamente)
  // null = sem fog (mestre); Set = células visíveis (jogador)
  fogVisible: null,
  // true quando mestre pintou névoa manualmente (não recalcular automaticamente)
  fogManual: false,
  // true durante pintura de névoa com mouse arrastando
  fogPainting: false,
  fogShape: 'brush', // 'brush' | 'rect'
  fogRectStart: null,
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
  // Seguir token automaticamente ao mover
  followTokenId: null,
  // Animação de GIFs (interval para redesenhar canvas com GIFs)
  animFrameId: null,
  gifInterval: null,
  // Parede selecionada para edição
  selectedWallId: null,
  // Régua (linha e círculo)
  rulerActive: false,
  rulerMode: 'line', // 'line' | 'circle'
  rulerStartX: 0, rulerStartY: 0,
  rulerEndX: 0, rulerEndY: 0,
  // Pings (múltiplos simultâneos)
  pings: [],
  pingTimer: null,
  // Targeting: peerId -> [tokenId, ...]
  playerTargets: {},
  pingStartX: 0,
  pingStartY: 0,
  // Configurações do Grid/Mapa
  gridCols: 30,
  gridRows: 30,
  gridScaleVal: 1.5,
  gridScaleUnit: 'm',
  gridType: 'square',
  lightingType: 'sunny',
};

// ══════════════════════════════════════════════════════
//  UNDO / REDO
// ══════════════════════════════════════════════════════
const HISTORY = { stack: [], index: -1, maxSize: 50 };

function snapshotBoard() {
  HISTORY.stack.length = HISTORY.index + 1;
  const state = {
    tokens: JSON.parse(JSON.stringify(BOARD.tokens.map(t => {
      const { conditions, ...rest } = t;
      return { ...rest, conditions: conditions ? [...conditions] : [] };
    }))),
    walls: JSON.parse(JSON.stringify(BOARD.walls)),
    shapes: JSON.parse(JSON.stringify(BOARD.shapes)),
    gridSize: BOARD.gridSize, gridOn: BOARD.gridOn,
    activeFloor: BOARD.activeFloor || 0,
    gridCols: BOARD.gridCols, gridRows: BOARD.gridRows,
    gridScaleVal: BOARD.gridScaleVal, gridScaleUnit: BOARD.gridScaleUnit,
    gridType: BOARD.gridType, lightingType: BOARD.lightingType,
    mapDataUrl: BOARD.mapDataUrl,
    offsetX: BOARD.offsetX, offsetY: BOARD.offsetY, zoom: BOARD.zoom
  };
  if (BOARD.fogManual && BOARD.fogVisible) {
    state.fogVisible = Array.from(BOARD.fogVisible);
    state.fogManual = true;
  }
  HISTORY.stack.push(state);
  if (HISTORY.stack.length > HISTORY.maxSize) HISTORY.stack.shift();
  else HISTORY.index++;
}

function undoBoard() {
  if (HISTORY.index <= 0) return;
  HISTORY.index--;
  _restoreBoardState(HISTORY.stack[HISTORY.index]);
}

function redoBoard() {
  if (HISTORY.index >= HISTORY.stack.length - 1) return;
  HISTORY.index++;
  _restoreBoardState(HISTORY.stack[HISTORY.index]);
}

function _restoreBoardState(state) {
  BOARD.tokens = (state.tokens || []).map(t => ({
    ...t, layer: t.layer || 'players',
    conditions: t.conditions || [], hideName: t.hideName || false
  }));
  BOARD.walls = state.walls || [];
  BOARD.shapes = state.shapes || [];
  BOARD.gridSize = state.gridSize; BOARD.gridOn = state.gridOn;
  BOARD.activeFloor = state.activeFloor || 0;
  BOARD.gridCols = state.gridCols; BOARD.gridRows = state.gridRows;
  BOARD.gridScaleVal = state.gridScaleVal; BOARD.gridScaleUnit = state.gridScaleUnit;
  BOARD.gridType = state.gridType; BOARD.lightingType = state.lightingType;
  BOARD.offsetX = state.offsetX; BOARD.offsetY = state.offsetY; BOARD.zoom = state.zoom;

  if (state.mapDataUrl) {
    BOARD.mapDataUrl = state.mapDataUrl;
    const img = new Image();
    img.onload = () => {
      BOARD.mapImg = img;
      if (isGifUrl(img.src)) getGifCanvas(img.src, img.naturalWidth, img.naturalHeight);
      boardRender();
    };
    img.src = state.mapDataUrl;
  } else { BOARD.mapDataUrl = null; BOARD.mapImg = null; }

  if (state.fogManual && state.fogVisible) {
    BOARD.fogVisible = new Set(state.fogVisible); BOARD.fogManual = true;
  } else { BOARD.fogVisible = null; BOARD.fogManual = false; }

  boardSave(); boardRender();
  if (myRole === 'mestre' || amIHost) syncBoardTokensToPlayers();
  setTimeout(atualizarSeguirToken, 50);
  toast(`↩ Desfazer/Refazer (${HISTORY.index}/${HISTORY.stack.length - 1})`);
}

function getFloorFromZ(z) {
  if (z === undefined || z === null) return 0;
  return Math.floor(z / 10);
}

function getCurrentFloor() {
  if (myRole === 'mestre') {
    return BOARD.activeFloor || 0;
  }
  let targetToken = null;
  if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
    for (const tokenId of BOARD.selectedTokens) {
      const t = BOARD.tokens.find(tk => tk.id === tokenId);
      if (t && t.controlledBy === myPeerId) {
        targetToken = t;
        break;
      }
    }
  }
  if (!targetToken) {
    targetToken = BOARD.tokens.find(t => t.controlledBy === myPeerId);
  }
  if (targetToken) {
    return getFloorFromZ(targetToken.z);
  }
  return BOARD.activeFloor || 0;
}

function updateFloorDisplay() {
  const display = document.getElementById('floorDisplay');
  if (!display) return;
  const currentFloor = getCurrentFloor();
  if (myRole === 'jogador') {
    const controlledToken = BOARD.tokens.find(t => t.controlledBy === myPeerId);
    if (controlledToken) {
      display.textContent = `Andar ${currentFloor} (🔒)`;
      display.title = `Visualização travada no andar do seu token (Z = ${controlledToken.z || 0})`;
      return;
    }
  }
  display.textContent = `Andar ${currentFloor}`;
  display.title = `Visualização do Andar ${currentFloor}`;
}

function mudarAndar(delta) {
  if (myRole === 'jogador') {
    const controlledToken = BOARD.tokens.find(t => t.controlledBy === myPeerId);
    if (controlledToken) {
      toast('Visão travada no andar do seu token!');
      return;
    }
  }
  BOARD.activeFloor = (BOARD.activeFloor || 0) + delta;
  boardSave();
  boardRender();
  if (myRole === 'mestre') {
    syncFloorToPlayers();
    setTimeout(atualizarFogJogador, 50);
  }
}

function syncFloorToPlayers() {
  if (myRole !== 'mestre') return;
  broadcast({ type: 'board-floor', activeFloor: BOARD.activeFloor || 0 }, null);
}

function hasFogVision(gx, gy, floor) {
  if (!BOARD.fogVisible) return true;
  const f = (floor !== undefined) ? floor : getCurrentFloor();
  return BOARD.fogVisible.has(`${f}:${gx},${gy}`) || (f === 0 && BOARD.fogVisible.has(`${gx},${gy}`));
}

function verificarGatilhosToken(token) {
  if (!BOARD.shapes || BOARD.shapes.length === 0) return;
  const { gridSize } = BOARD;
  const tokenFloor = getFloorFromZ(token.z);

  const sz = token.size || 1;
  const wx = token.gx * gridSize + sz * gridSize / 2;
  const wy = token.gy * gridSize + sz * gridSize / 2;

  const triggerShape = BOARD.shapes.find(s => {
    if (getFloorFromZ(s.z) !== tokenFloor) return false;
    if (!s.triggerType) return false;

    if (s.kind === 'circle') {
      const cx = (s.x1 + s.x2) / 2;
      const cy = (s.y1 + s.y2) / 2;
      const rx = Math.abs(s.x2 - s.x1) / 2;
      const ry = Math.abs(s.y2 - s.y1) / 2;
      if (rx === 0 || ry === 0) return false;
      const dx = (wx - cx) / rx;
      const dy = (wy - cy) / ry;
      return dx*dx + dy*dy <= 1;
    } else if (s.kind === 'freehand') {
      return s.points && isPointInPolygon(wx, wy, s.points);
    } else {
      const x1 = Math.min(s.x1, s.x2), x2 = Math.max(s.x1, s.x2);
      const y1 = Math.min(s.y1, s.y2), y2 = Math.max(s.y1, s.y2);
      return wx >= x1 && wx <= x2 && wy >= y1 && wy <= y2;
    }
  });

  if (!triggerShape) return;
  processarGatilho(token, triggerShape);
}

function processarGatilho(token, shape) {
  const tType = shape.triggerType;
  if (tType === 'stairs-up') {
    token.z = (token.z || 0) + 10;
    toast(`🪜 ${token.name} subiu de andar.`);
    finalizarGatilho(token);
  } else if (tType === 'stairs-down') {
    token.z = (token.z || 0) - 10;
    toast(`🕳 ${token.name} desceu de andar.`);
    finalizarGatilho(token);
  } else if (tType === 'elevator-auto') {
    const target = shape.targetFloor !== undefined ? shape.targetFloor : 0;
    token.z = target * 10;
    toast(`⚡ ${token.name} foi teletransportado para o Andar ${target}.`);
    finalizarGatilho(token);
  } else if (tType === 'stairs' || tType === 'elevator-manual') {
    if (myRole === 'mestre') {
      const ownerPeer = token.controlledBy;
      if (ownerPeer && ownerPeer !== myPeerId && connections[ownerPeer]) {
        connections[ownerPeer].send({
          type: 'trigger-prompt',
          tokenId: token.id,
          shapeId: shape.id,
          triggerType: tType,
          targetFloor: shape.targetFloor
        });
        return;
      }
    }
    abrirModalEscolhaGatilho(token, shape);
  }
}

function finalizarGatilho(token) {
  boardSave();
  boardRender();
  if (myRole === 'mestre') {
    syncBoardTokensToPlayers();
  }
}

function abrirModalEscolhaGatilho(token, shape) {
  const modal = document.getElementById('stairModal');
  if (!modal) return;

  const title = document.getElementById('stairModalTitle');
  const text = document.getElementById('stairModalText');
  const buttons = document.getElementById('stairModalButtons');

  title.textContent = shape.triggerType === 'stairs' ? 'Escada' : 'Elevador';
  text.textContent = `O token "${token.name}" pisou em um(a) ${shape.triggerType === 'stairs' ? 'escada' : 'elevador'}. O que deseja fazer?`;
  buttons.innerHTML = '';

  const currentFloor = getFloorFromZ(token.z);

  if (shape.triggerType === 'stairs') {
    const btnUp = document.createElement('button');
    btnUp.className = 'tool-btn';
    btnUp.style.padding = '0.5rem';
    btnUp.textContent = `▲ Subir para Andar ${currentFloor + 1}`;
    btnUp.onclick = () => {
      executarAcaoGatilho(token.id, shape.id, 'subir');
      fecharModalGatilho();
    };
    buttons.appendChild(btnUp);

    const btnDown = document.createElement('button');
    btnDown.className = 'tool-btn';
    btnDown.style.padding = '0.5rem';
    btnDown.textContent = `▼ Descer para Andar ${currentFloor - 1}`;
    btnDown.onclick = () => {
      executarAcaoGatilho(token.id, shape.id, 'descer');
      fecharModalGatilho();
    };
    buttons.appendChild(btnDown);
  } else if (shape.triggerType === 'elevator-manual') {
    const target = shape.targetFloor !== undefined ? shape.targetFloor : 0;
    const btnGo = document.createElement('button');
    btnGo.className = 'tool-btn';
    btnGo.style.padding = '0.5rem';
    btnGo.textContent = `🛗 Ir para Andar ${target}`;
    btnGo.onclick = () => {
      executarAcaoGatilho(token.id, shape.id, 'teleport');
      fecharModalGatilho();
    };
    buttons.appendChild(btnGo);
  }

  const btnCancel = document.createElement('button');
  btnCancel.className = 'tool-btn danger';
  btnCancel.style.padding = '0.5rem';
  btnCancel.textContent = `Cancelar`;
  btnCancel.onclick = fecharModalGatilho;
  buttons.appendChild(btnCancel);

  modal.style.display = 'flex';
}

function fecharModalGatilho() {
  const modal = document.getElementById('stairModal');
  if (modal) modal.style.display = 'none';
}

function executarAcaoGatilho(tokenId, shapeId, action) {
  if (myRole === 'jogador') {
    if (masterConn) {
      masterConn.send({
        type: 'solicitar-ativar-gatilho',
        tokenId,
        shapeId,
        action
      });
    }
  } else {
    const t = BOARD.tokens.find(tk => tk.id === tokenId);
    const s = BOARD.shapes.find(sk => sk.id === shapeId);
    if (t && s) {
      aplicarAcaoGatilho(t, s, action);
    }
  }
}

function aplicarAcaoGatilho(t, s, action) {
  if (action === 'subir') {
    t.z = (t.z || 0) + 10;
    toast(`🪜 ${t.name} subiu para o Andar ${getFloorFromZ(t.z)}.`);
  } else if (action === 'descer') {
    t.z = (t.z || 0) - 10;
    toast(`🪜 ${t.name} desceu para o Andar ${getFloorFromZ(t.z)}.`);
  } else if (action === 'teleport') {
    const target = s.targetFloor !== undefined ? s.targetFloor : 0;
    t.z = target * 10;
    toast(`🛗 ${t.name} usou o elevador para o Andar ${target}.`);
  }
  boardSave();
  boardRender();
  syncBoardTokensToPlayers();
}

function setShapeTrigger(type) {
  if (!contextShapeId) return;
  const shape = BOARD.shapes.find(s => s.id === contextShapeId);
  if (shape) {
    if (type === null) {
      delete shape.triggerType;
      delete shape.targetFloor;
      toast('Gatilho removido do desenho.');
    } else {
      shape.triggerType = type;
      if (type === 'elevator-auto' || type === 'elevator-manual') {
        const floorStr = prompt('Digite o andar de destino para o elevador (ex: 0, 1, 2, -1):', '0');
        if (floorStr === null) { fecharContextMenu(); return; }
        const floorNum = parseInt(floorStr);
        shape.targetFloor = isNaN(floorNum) ? 0 : floorNum;
      }
      toast('Gatilho configurado no desenho!');
    }
    boardSave();
    boardRender();
    syncShapesToPlayers();
  }
  fecharContextMenu();
}

function setWallTypeAction(type) {
  fecharContextMenu();
}

function contextDeleteWall() {
  if (!BOARD.selectedWallId) return;
  BOARD.walls = BOARD.walls.filter(w => w.id !== BOARD.selectedWallId);
  boardSave();
  syncWallsToPlayers();
  toast('🧱 Parede removida.');
  setTimeout(atualizarFogJogador, 50);
  fecharContextMenu();
}

function contextDeleteShape() {
  if (!contextShapeId) return;
  BOARD.shapes = BOARD.shapes.filter(s => s.id !== contextShapeId);
  boardSave();
  syncShapesToPlayers();
  boardRender();
  toast('🗑 Desenho removido.');
  fecharContextMenu();
}

function converterFormaEmParedes() {
  if (!contextShapeId) return;
  const shape = BOARD.shapes.find(s => s.id === contextShapeId);
  if (!shape) return;
  
  const floorZ = shape.z !== undefined ? shape.z : (BOARD.activeFloor || 0) * 10;
  
  if (shape.kind === 'rect') {
    const x1 = shape.x1, y1 = shape.y1, x2 = shape.x2, y2 = shape.y2;
    const segments = [
      { x1: x1, y1: y1, x2: x2, y2: y1 },
      { x1: x2, y1: y1, x2: x2, y2: y2 },
      { x1: x2, y1: y2, x2: x1, y2: y2 },
      { x1: x1, y1: y2, x2: x1, y2: y1 }
    ];
    segments.forEach(seg => {
      BOARD.walls.push({
        id: 'wl' + Date.now() + Math.floor(Math.random()*9999),
        x1: seg.x1, y1: seg.y1, x2: seg.x2, y2: seg.y2,
        z: floorZ,
        open: false
      });
    });
    toast('🧱 Desenho retangular convertido em 4 paredes!');
  } else if (shape.kind === 'circle') {
    const cx = (shape.x1 + shape.x2) / 2;
    const cy = (shape.y1 + shape.y2) / 2;
    const rx = Math.abs(shape.x2 - shape.x1) / 2;
    const ry = Math.abs(shape.y2 - shape.y1) / 2;
    const steps = 24;
    for (let i = 0; i < steps; i++) {
      const a1 = (i / steps) * Math.PI * 2;
      const a2 = ((i + 1) / steps) * Math.PI * 2;
      const sx1 = cx + rx * Math.cos(a1);
      const sy1 = cy + ry * Math.sin(a1);
      const sx2 = cx + rx * Math.cos(a2);
      const sy2 = cy + ry * Math.sin(a2);
      BOARD.walls.push({
        id: 'wl' + Date.now() + Math.floor(Math.random()*9999),
        x1: sx1, y1: sy1, x2: sx2, y2: sy2,
        z: floorZ,
        open: false
      });
    }
    toast(`🧱 Desenho circular convertido em ${steps} paredes!`);
  } else if (shape.kind === 'freehand' && shape.points && shape.points.length > 1) {
    const pts = shape.points;
    for (let i = 0; i < pts.length; i++) {
      const p1 = pts[i];
      const p2 = pts[(i + 1) % pts.length];
      BOARD.walls.push({
        id: 'wl' + Date.now() + Math.floor(Math.random()*9999),
        x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
        z: floorZ,
        open: false
      });
    }
    toast(`🧱 Desenho livre convertido em ${pts.length} paredes!`);
  }
  
  BOARD.shapes = BOARD.shapes.filter(s => s.id !== contextShapeId);
  contextShapeId = null;
  fecharContextMenu();
  boardSave();
  boardRender();
  syncWallsToPlayers();
  syncShapesToPlayers();
  setTimeout(atualizarFogJogador, 50);
}

function aplicarNevoaForma(revelar) {
  if (!contextShapeId) return;
  const shape = BOARD.shapes.find(s => s.id === contextShapeId);
  if (!shape) return;
  
  const gx1 = Math.floor(Math.min(shape.x1, shape.x2) / BOARD.gridSize);
  const gy1 = Math.floor(Math.min(shape.y1, shape.y2) / BOARD.gridSize);
  const gx2 = Math.ceil(Math.max(shape.x1, shape.x2) / BOARD.gridSize);
  const gy2 = Math.ceil(Math.max(shape.y1, shape.y2) / BOARD.gridSize);
  
  const floor = getFloorFromZ(shape.z);
  let count = 0;
  
  if (!BOARD.fogVisible) {
    BOARD.fogVisible = new Set();
  }
  
  for (let gx = gx1; gx <= gx2; gx++) {
    for (let gy = gy1; gy <= gy2; gy++) {
      const key = floor === 0 ? `${gx},${gy}` : `${floor}:${gx},${gy}`;
      if (revelar) BOARD.fogVisible.add(key);
      else BOARD.fogVisible.delete(key);
      count++;
    }
  }
  
  contextShapeId = null;
  boardSave();
  boardRender();
  syncFogToPlayers();
  toast(`Névoa ${revelar ? 'revelada' : 'aplicada'} em ${count} células.`);
}

function atualizarFogJogador() {
  if (myRole === 'mestre' && BOARD.playerViewTokenId) {
    const token = BOARD.tokens.find(t => t.id === BOARD.playerViewTokenId);
    if (!token) { exitPlayerView(); return; }
    const radius = token.visaoRange || 12;
    BOARD.fogVisible = computeVisibility(token, radius);
    boardRender();
    return;
  }
  if (myRole === 'mestre') {
    if (BOARD.fogManual && BOARD.fogVisible) { boardRender(); return; }
    BOARD.fogVisible = null; boardRender(); return;
  }
  const currentFloor = getCurrentFloor();
  const meusTokens = BOARD.tokens.filter(t => t.controlledBy === myPeerId && getFloorFromZ(t.z) === currentFloor);
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

// Desenha a borda de um token em qualquer contexto (canvas principal ou preview).
// opts: { borderType, borderWidth, borderColor, shapeType, zoom }
function renderTokenBorder(ctx, px, py, r, opts) {
  const borderType = opts.borderType || 'solid';
  if (borderType === 'none') return;
  const zoom = opts.zoom || 1;
  const borderWidth = parseFloat(opts.borderWidth) || 1.5;
  const col = opts.borderColor || '#000000';
  const shapeType = opts.shapeType || 'circle';

  ctx.save();
  const bw = borderWidth / zoom;
  ctx.lineWidth = bw;
  ctx.strokeStyle = col;
  ctx.beginPath();
  tokenShapePath(ctx, px, py, r, shapeType);

  if (borderType === 'dashed') {
    ctx.setLineDash([6 / zoom, 3 / zoom]);
    ctx.stroke();
  } else if (borderType === 'dotted') {
    ctx.setLineDash([2 / zoom, 3 / zoom]);
    ctx.stroke();
  } else if (borderType === 'double') {
    ctx.stroke();
    const innerR = r - bw * 1.8;
    if (innerR > 2) {
      ctx.beginPath();
      tokenShapePath(ctx, px, py, innerR, shapeType);
      ctx.stroke();
    }
  } else if (borderType === 'neon') {
    ctx.shadowColor = col;
    ctx.shadowBlur = 10 / zoom;
    ctx.strokeStyle = col;
    ctx.lineWidth = bw;
    ctx.stroke();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = bw * 0.4;
    ctx.stroke();
  } else if (borderType === 'runic') {
    ctx.stroke();
    ctx.save();
    ctx.translate(px, py);
    ctx.strokeStyle = col;
    ctx.lineWidth = bw * 0.7;
    const numRunas = 12;
    for (let i = 0; i < numRunas; i++) {
      ctx.rotate((Math.PI * 2) / numRunas);
      ctx.beginPath();
      ctx.moveTo(r - bw, 0);
      ctx.lineTo(r + bw * 1.5, 0);
      ctx.stroke();
    }
    ctx.restore();
  } else {
    ctx.stroke();
  }
  ctx.restore();
}

function tokenShapePath(ctx, px, py, r, shapeType) {
  switch (shapeType) {
    case 'square':
      ctx.rect(px - r, py - r, r * 2, r * 2);
      break;
    case 'rounded-square':
      if (ctx.roundRect) {
        ctx.roundRect(px - r, py - r, r * 2, r * 2, r * 0.2);
      } else {
        ctx.rect(px - r, py - r, r * 2, r * 2);
      }
      break;
    case 'hexagon':
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i - Math.PI / 6;
        const hx = px + r * Math.cos(angle);
        const hy = py + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      break;
    default:
      ctx.arc(px, py, r, 0, Math.PI * 2);
  }
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

  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i];
    const layer = t.layer || 'players';

    if ((myRole !== 'mestre' || emVisaoJogador()) && layer === 'gm') continue;
    if (myRole === 'mestre' && !emVisaoJogador() && layer !== activeLayer) continue;

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

function getHandleAt(cx, cy) {
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const wx = (cx - offsetX) / zoom;
  const wy = (cy - offsetY) / zoom;
  const hitR = 14 / zoom;

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
      const rotHX = px + rotOff * Math.sin(rotation);
      const rotHY = py - rotOff * Math.cos(rotation);
      if (Math.hypot(wx - rotHX, wy - rotHY) <= hitR) {
        return { token: t, type: 'rotate' };
      }
      const rhX = px + half * Math.cos(rotation) - half * Math.sin(rotation);
      const rhY = py + half * Math.sin(rotation) + half * Math.cos(rotation);
      if (Math.hypot(wx - rhX, wy - rhY) <= hitR) {
        return { token: t, type: 'resize' };
      }
    } else {
      const r = sz * 0.42;
      const handleDist = r + 22 / zoom;

      const rotHX = px + handleDist * Math.sin(rotation);
      const rotHY = py - handleDist * Math.cos(rotation);
      if (Math.hypot(wx - rotHX, wy - rotHY) <= hitR) {
        return { token: t, type: 'rotate' };
      }

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

// ── Zoom ──
function zoomBoardAt(cx, cy, delta) {
  const oldZoom = BOARD.zoom;
  BOARD.zoom = Math.min(4, Math.max(0.2, BOARD.zoom + delta));
  const dz = BOARD.zoom - oldZoom;
  BOARD.offsetX -= (cx - BOARD.offsetX) * (dz / oldZoom);
  BOARD.offsetY -= (cy - BOARD.offsetY) * (dz / oldZoom);
  document.getElementById('zoomDisplay').textContent = Math.round(BOARD.zoom * 100) + '%';
  boardRender();
  setTimeout(atualizarSeguirToken, 10);
}
function zoomBoard(delta) {
  const wrap = BOARD.wrap;
  zoomBoardAt(wrap.clientWidth / 2, wrap.clientHeight / 2, delta);
}
function zoomReset() {
  BOARD.zoom = 1; BOARD.offsetX = 0; BOARD.offsetY = 0;
  document.getElementById('zoomDisplay').textContent = '100%';
  boardRender();
  setTimeout(atualizarSeguirToken, 10);
}

let contextTokenId = null;

// ── Eventos mouse/touch ──
function boardBindEvents() {
  const wrap = BOARD.wrap;

  wrap.addEventListener('mousedown', onBoardMouseDown);
  wrap.addEventListener('mousemove', onBoardMouseMove);
  wrap.addEventListener('mouseup', onBoardMouseUp);
  wrap.addEventListener('mouseleave', onBoardMouseLeave);
  wrap.addEventListener('wheel', onBoardWheel, { passive: false });

  wrap.addEventListener('touchstart', onBoardTouchStart, { passive: false });
  wrap.addEventListener('touchmove', onBoardTouchMove, { passive: false });
  wrap.addEventListener('touchend', onBoardTouchEnd);

  wrap.addEventListener('dblclick', onBoardDblClick);

  wrap.addEventListener('contextmenu', onBoardContextMenu);

  wrap.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    wrap.classList.add('drag-over');
  });
  wrap.addEventListener('dragleave', () => { wrap.classList.remove('drag-over'); });
  wrap.addEventListener('drop', (e) => {
    wrap.classList.remove('drag-over');
    onBestiaryDrop(e);
  });

  wrap.addEventListener('mousedown', (e) => { if (e.button !== 2) fecharContextMenu(); });
}

function getBoardXY(e) {
  const rect = BOARD.wrap.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function onBoardMouseDown(e) {
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

  if (BOARD.tool === 'wall' && myRole === 'mestre') {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    BOARD.wallDrawing = true;
    BOARD.wallStartX = wx; BOARD.wallStartY = wy;
    BOARD.wallCurX = wx;   BOARD.wallCurY = wy;
    e.preventDefault();
    return;
  }

  if ((BOARD.tool === 'shape-rect' || BOARD.tool === 'shape-circle') && myRole === 'mestre') {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    BOARD.shapeDrawing = true;
    BOARD.shapeStartX = wx; BOARD.shapeStartY = wy;
    BOARD.shapeCurX = wx;   BOARD.shapeCurY = wy;
    e.preventDefault();
    return;
  }

  if ((BOARD.tool === 'fog' || BOARD.tool === 'reveal') && myRole === 'mestre') {
    e.preventDefault();
    if (!BOARD.fogVisible) BOARD.fogVisible = new Set();
    const gx = Math.floor((x - BOARD.offsetX) / BOARD.zoom / BOARD.gridSize);
    const gy = Math.floor((y - BOARD.offsetY) / BOARD.zoom / BOARD.gridSize);
    if (gx >= 0 && gy >= 0) {
      pintarFogCelula(gx, gy, BOARD.tool === 'reveal');
      BOARD.fogPainting = true;
      BOARD.fogManual = true;
      BOARD.lastFogCell = `${gx},${gy}`;
    }
    return;
  }

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

    const isGroupDrag = BOARD.selectedTokens.has(token.id) && BOARD.selectedTokens.size > 1;

    snapshotBoard();
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

    BOARD.dragGroup = null;
    if (isGroupDrag) {
      BOARD.dragGroup = {};
      BOARD.selectedTokens.forEach(id => {
        const t = BOARD.tokens.find(tk => tk.id === id);
        if (t) BOARD.dragGroup[id] = { gx: t.gx, gy: t.gy };
      });
    }
  } else if (BOARD.tool === 'move') {
    const clickedWall = getWallHandleAt(x, y);
    if (clickedWall) {
      toggleWallState(clickedWall.id);
      e.preventDefault();
      return;
    }

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

  if (BOARD.shapeDrawing) {
    let wx = (x - BOARD.offsetX) / BOARD.zoom;
    let wy = (y - BOARD.offsetY) / BOARD.zoom;
    if (e.shiftKey) {
      const dx = wx - BOARD.shapeStartX;
      const dy = wy - BOARD.shapeStartY;
      const side = Math.max(Math.abs(dx), Math.abs(dy));
      wx = BOARD.shapeStartX + (dx < 0 ? -side : side);
      wy = BOARD.shapeStartY + (dy < 0 ? -side : side);
    }
    BOARD.shapeCurX = wx;
    BOARD.shapeCurY = wy;
    boardRender(); return;
  }

  if (BOARD.wallDrawing) {
    BOARD.wallCurX = (x - BOARD.offsetX) / BOARD.zoom;
    BOARD.wallCurY = (y - BOARD.offsetY) / BOARD.zoom;
    boardRender(); return;
  }

  if (BOARD.fogPainting && (BOARD.tool === 'fog' || BOARD.tool === 'reveal')) {
    const gx = Math.floor((x - BOARD.offsetX) / BOARD.zoom / BOARD.gridSize);
    const gy = Math.floor((y - BOARD.offsetY) / BOARD.zoom / BOARD.gridSize);
    if (gx >= 0 && gy >= 0) {
      const key = `${gx},${gy}`;
      if (key !== BOARD.lastFogCell) {
        pintarFogCelula(gx, gy, BOARD.tool === 'reveal');
        BOARD.lastFogCell = key;
      }
    }
    return;
  }

  if (BOARD.handleDrag) {
    const hd = BOARD.handleDrag;
    const t = BOARD.tokens.find(tk => tk.id === hd.tokenId);
    if (t) {
      const wx = (x - BOARD.offsetX) / BOARD.zoom;
      const wy = (y - BOARD.offsetY) / BOARD.zoom;

      if (hd.type === 'rotate') {
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

    if (BOARD.dragGroup) {
      const dgx = BOARD.dragging.gx - BOARD.dragStartGx;
      const dgy = BOARD.dragging.gy - BOARD.dragStartGy;
      Object.keys(BOARD.dragGroup).forEach(id => {
        if (id === BOARD.dragging.id) return;
        const t = BOARD.tokens.find(tk => tk.id === id);
        if (t) {
          const start = BOARD.dragGroup[id];
          t.gx = Math.max(0, start.gx + dgx);
          t.gy = Math.max(0, start.gy + dgy);
        }
      });
    }

    boardRender();
    updateTooltip(BOARD.dragging, x, y);
    return;
  }

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

  if (BOARD.shapeDrawing) {
    BOARD.shapeDrawing = false;
    const x1 = Math.min(BOARD.shapeStartX, BOARD.shapeCurX);
    const y1 = Math.min(BOARD.shapeStartY, BOARD.shapeCurY);
    const x2 = Math.max(BOARD.shapeStartX, BOARD.shapeCurX);
    const y2 = Math.max(BOARD.shapeStartY, BOARD.shapeCurY);
    if ((x2 - x1) > 3 && (y2 - y1) > 3) {
      snapshotBoard();
      BOARD.shapes.push({
        id: 'sh' + Date.now() + Math.floor(Math.random()*9999),
        kind: BOARD.tool === 'shape-circle' ? 'circle' : 'rect',
        x1, y1, x2, y2,
        color: BOARD.shapeColor || '#c9903a'
      });
      boardSave();
      syncShapesToPlayers();
      toast(BOARD.tool === 'shape-circle' ? '⬤ Círculo adicionado.' : '▭ Retângulo adicionado.');
    }
    boardRender();
    return;
  }

  if (BOARD.wallDrawing) {
    BOARD.wallDrawing = false;
    const dx = BOARD.wallCurX - BOARD.wallStartX;
    const dy = BOARD.wallCurY - BOARD.wallStartY;
    const len = Math.sqrt(dx*dx + dy*dy);
    if (len > 5) {
      snapshotBoard();
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

  if (BOARD.fogPainting) {
    BOARD.fogPainting = false;
    BOARD.lastFogCell = null;
    boardSave();
    syncFogToPlayers();
    return;
  }

  if (BOARD.handleDrag) {
    BOARD.handleDrag = null;
    if (myRole === 'mestre' || amIHost) {
      boardSave();
      syncBoardTokensToPlayers();
    }
    boardRender();
    return;
  }

  if (BOARD.marquee) {
    finalizeMarqueeSelection(e.shiftKey);
    BOARD.marquee = null;
    hideSelectionBox();
    boardRender();
    return;
  }

  if (BOARD.dragging) {
    const token = BOARD.dragging;
    if (!BOARD.dragGroup && myRole !== 'mestre' && checkMoveBlocked(token, BOARD.dragStartGx, BOARD.dragStartGy, token.gx, token.gy)) {
      token.gx = BOARD.dragStartGx;
      token.gy = BOARD.dragStartGy;
      boardRender();
      toast('🚫 Movimento bloqueado por uma parede!');
    } else {
      if (myRole === 'mestre' || amIHost) {
        boardSave();
        syncBoardTokensToPlayers();
      } else {
        solicitarMoverToken(token.id, token.gx, token.gy);
      }
      setTimeout(atualizarFogJogador, 50);
      setTimeout(atualizarSeguirToken, 50);
    }
  }
  BOARD.dragging = null;
  BOARD.dragGroup = null;
}

function onBoardMouseLeave() {
  BOARD.wrap.classList.remove('panning');
  BOARD.panning = false;
  if (BOARD.shapeDrawing) { BOARD.shapeDrawing = false; boardRender(); return; }
  if (BOARD.wallDrawing) { BOARD.wallDrawing = false; boardRender(); return; }
  if (BOARD.handleDrag) { BOARD.handleDrag = null; boardRender(); }
  if (BOARD.marquee) { BOARD.marquee = null; hideSelectionBox(); boardRender(); }
  if (BOARD.dragging) {
    const token = BOARD.dragging;
    if (!BOARD.dragGroup && myRole !== 'mestre' && checkMoveBlocked(token, BOARD.dragStartGx, BOARD.dragStartGy, token.gx, token.gy)) {
      token.gx = BOARD.dragStartGx;
      token.gy = BOARD.dragStartGy;
      boardRender();
      toast('🚫 Movimento bloqueado por uma parede!');
    } else {
      if (myRole === 'mestre' || amIHost) {
        boardSave();
        syncBoardTokensToPlayers();
      } else {
        solicitarMoverToken(token.id, token.gx, token.gy);
      }
      setTimeout(atualizarFogJogador, 50);
      setTimeout(atualizarSeguirToken, 50);
    }
  }
  if (BOARD.fogPainting) { BOARD.fogPainting = false; BOARD.lastFogCell = null; boardRender(); }
  BOARD.dragging = null;
  BOARD.dragGroup = null;
  hideTooltip();
}

function onBoardWheel(e) {
  e.preventDefault();
  fecharContextMenu();
  const { x, y } = getBoardXY(e);
  const delta = e.deltaY > 0 ? -0.08 : 0.08;
  zoomBoardAt(x, y, delta);
}

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

  const selL = Math.min(m.startX, m.curX);
  const selT = Math.min(m.startY, m.curY);
  const selR = Math.max(m.startX, m.curX);
  const selB = Math.max(m.startY, m.curY);

  if ((selR - selL) < 5 && (selB - selT) < 5) return;

  if (!additive) {
    BOARD.selectedTokens.clear();
  }

  tokens.forEach(t => {
    const layer = t.layer || 'players';
    if ((myRole !== 'mestre' || emVisaoJogador()) && layer === 'gm') return;
    if (myRole === 'mestre' && !emVisaoJogador() && layer !== activeLayer) return;

    const sz = (t.size || 1) * gridSize;
    const cx = (t.gx * gridSize + sz / 2) * zoom + offsetX;
    const cy = (t.gy * gridSize + sz / 2) * zoom + offsetY;
    const r = sz * 0.42 * zoom;

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

function onBoardContextMenu(e) {
  e.preventDefault();
  if (myRole !== 'mestre') return;
  const { x, y } = getBoardXY(e);
  
  fecharFormToken();

  if (BOARD.tool === 'shape-rect' || BOARD.tool === 'shape-circle') {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    const nearby = shapeAt(wx, wy);
    if (nearby) {
      snapshotBoard();
      BOARD.shapes = BOARD.shapes.filter(s => s.id !== nearby.id);
      boardSave(); syncShapesToPlayers(); boardRender();
      toast('🗑 Forma removida.');
      return;
    }
  }
  if (BOARD.tool === 'wall') {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    const nearby = wallAt(wx, wy, 10 / BOARD.zoom);
    if (nearby) {
      snapshotBoard();
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

function centralizarMapa() {
  const wrap = BOARD.wrap;
  const ccx = wrap.clientWidth / 2;
  const ccy = wrap.clientHeight / 2;
  const cx = BOARD.ctxMenuBoardX ?? ccx;
  const cy = BOARD.ctxMenuBoardY ?? ccy;
  BOARD.offsetX = ccx - cx + BOARD.offsetX;
  BOARD.offsetY = ccy - cy + BOARD.offsetY;
  boardSave(); boardRender();
  fecharContextMenu();
}

function centralizarEmToken(token) {
  if (!token) return;
  const wrap = BOARD.wrap;
  const gs = BOARD.gridSize;
  const sz = (token.size || 1) * gs / 2;
  const tx = token.gx * gs + sz;
  const ty = token.gy * gs + sz;
  BOARD.offsetX = wrap.clientWidth / 2 - tx * BOARD.zoom;
  BOARD.offsetY = wrap.clientHeight / 2 - ty * BOARD.zoom;
  boardRender();
}

function toggleSeguirToken(tokenId) {
  if (BOARD.followTokenId === tokenId) {
    BOARD.followTokenId = null;
    return false;
  }
  BOARD.followTokenId = tokenId;
  const token = BOARD.tokens.find(t => t.id === tokenId);
  if (token) centralizarEmToken(token);
  return true;
}

function atualizarSeguirToken() {
  if (!BOARD.followTokenId) return;
  const token = BOARD.tokens.find(t => t.id === BOARD.followTokenId);
  if (!token) { BOARD.followTokenId = null; return; }
  centralizarEmToken(token);
}

function fecharContextMenu() {
  const menu = document.getElementById('tokenContextMenu');
  if (menu) menu.style.display = 'none';
  const bMenu = document.getElementById('boardContextMenu');
  if (bMenu) bMenu.style.display = 'none';
  contextTokenId = null;
}

function abrirConfigGrid() {
  fecharContextMenu();
  document.getElementById('gcGridCols').value = BOARD.gridCols || 30;
  document.getElementById('gcGridRows').value = BOARD.gridRows || 30;
  document.getElementById('gcScaleVal').value = BOARD.gridScaleVal ?? 1.5;
  document.getElementById('gcScaleUnit').value = BOARD.gridScaleUnit || 'm';
  document.getElementById('gcGridType').value = BOARD.gridType || 'square';
  document.getElementById('gcLightingType').value = BOARD.lightingType || 'sunny';
  document.getElementById('gridConfigModal').style.display = 'flex';
}

function fecharConfigGrid() {
  document.getElementById('gridConfigModal').style.display = 'none';
}

function salvarConfigGrid() {
  snapshotBoard();
  BOARD.gridCols = parseInt(document.getElementById('gcGridCols').value) || 30;
  BOARD.gridRows = parseInt(document.getElementById('gcGridRows').value) || 30;
  BOARD.gridScaleVal = parseFloat(document.getElementById('gcScaleVal').value) || 1.5;
  BOARD.gridScaleUnit = document.getElementById('gcScaleUnit').value.trim() || 'm';
  BOARD.gridType = document.getElementById('gcGridType').value || 'square';
  BOARD.lightingType = document.getElementById('gcLightingType').value || 'sunny';
  boardSave(); boardRender();
  if (myRole === 'mestre') syncBoardToPlayers();
  fecharConfigGrid();
  toast('Grid e mapa configurados!');
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
  snapshotBoard();
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
      snapshotBoard();
      BOARD.tokens = BOARD.tokens.filter(t => t.id !== token.id);
      if (BOARD.followTokenId === token.id) BOARD.followTokenId = null;
      if (BOARD.playerViewTokenId === token.id) exitPlayerView();
      boardSave();
      boardRender();
      syncBoardTokensToPlayers();
    }
  }
  fecharContextMenu();
}

function contextSubirToken() {
  if (!contextTokenId) return;
  snapshotBoard();
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    token.z = (token.z || 0) + 1;
    boardSave(); boardRender(); syncBoardTokensToPlayers();
  }
  fecharContextMenu();
}
function contextDescerToken() {
  if (!contextTokenId) return;
  snapshotBoard();
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    token.z = (token.z || 0) - 1;
    boardSave(); boardRender(); syncBoardTokensToPlayers();
  }
  fecharContextMenu();
}
function contextSubirAndar() {
  snapshotBoard();
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    token.z = (token.z || 0) + 10;
    boardSave(); boardRender(); syncBoardTokensToPlayers();
  }
  fecharContextMenu();
}
function contextDescerAndar() {
  snapshotBoard();
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    token.z = (token.z || 0) - 10;
    boardSave(); boardRender(); syncBoardTokensToPlayers();
  }
  fecharContextMenu();
}
function contextViewAsPlayer() {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (!token) { fecharContextMenu(); return; }
  if (BOARD.playerViewTokenId === token.id) {
    exitPlayerView();
    fecharContextMenu();
    return;
  }
  BOARD.playerViewTokenId = token.id;
  BOARD.playerViewTokenName = token.name || 'Jogador';
  fecharContextMenu();
  BOARD.followTokenId = token.id;
  centralizarEmToken(token);
  atualizarFogJogador();
  mostrarBarraVisaoJogador();
  const btn = document.getElementById('btnSeguirPlayerView');
  if (btn) { btn.textContent = '🎯 Seguindo'; btn.style.borderColor = '#4caf50'; btn.style.color = '#4caf50'; }
}

function exitPlayerView() {
  if (BOARD.followTokenId === BOARD.playerViewTokenId) {
    BOARD.followTokenId = null;
    const btn = document.getElementById('btnSeguirPlayerView');
    if (btn) { btn.textContent = '🎯 Seguir'; btn.style.borderColor = '#00bfff'; btn.style.color = '#00bfff'; }
  }
  BOARD.playerViewTokenId = null;
  BOARD.playerViewTokenName = '';
  esconderBarraVisaoJogador();
  atualizarFogJogador();
}

function emVisaoJogador() {
  return myRole === 'mestre' && BOARD.playerViewTokenId;
}

function toggleSeguirTokenUI() {
  const sel = BOARD.selectedTokens;
  if (sel.size === 0) { toast('Selecione um token primeiro.'); return; }
  const firstId = sel.values().next().value;
  const ativou = toggleSeguirToken(firstId);
  const btn = document.getElementById('btnSeguirToken');
  if (btn) btn.classList.toggle('active', ativou);
  toast(ativou ? 'Seguindo token.' : 'Seguir desativado.');
}

function toggleSeguirPlayerView() {
  if (!BOARD.playerViewTokenId) return;
  const ativou = toggleSeguirToken(BOARD.playerViewTokenId);
  const btn = document.getElementById('btnSeguirPlayerView');
  if (btn) {
    btn.textContent = ativou ? '🎯 Seguindo' : '🎯 Seguir';
    btn.style.borderColor = ativou ? '#4caf50' : '#00bfff';
    btn.style.color = ativou ? '#4caf50' : '#00bfff';
  }
  toast(ativou ? 'Seguindo jogador.' : 'Seguir desativado.');
}

function popularCtxCondicoes(token) {
  const sub = document.getElementById('ctxCondSubmenu');
  if (!sub) return;
  const ativas = token.conditions || [];
  sub.innerHTML = '';
  CONDITION_LIST.forEach(c => {
    const div = document.createElement('div');
    div.className = 'ctx-cond-item';
    const emoji = CONDITION_EMOJI[c] || '?';
    const checked = ativas.includes(c) ? '✓ ' : '  ';
    div.textContent = `${emoji} ${checked}${c}`;
    div.onclick = (e) => { e.stopPropagation(); toggleTokenCondition(contextTokenId, c); };
    if (ativas.includes(c)) div.classList.add('active');
    sub.appendChild(div);
  });
}

function toggleTokenCondition(tokenId, condition) {
  snapshotBoard();
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

// ── Render principal ──
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
  // Snapshot inicial para undo
  snapshotBoard();
}

function boardResize() {
  const wrap = BOARD.wrap;
  if (!wrap) return;
  const w = wrap.clientWidth, h = wrap.clientHeight;
  BOARD.canvas.width = w; BOARD.canvas.height = h;
  boardRender();
}

function boardRender() {
  if (myRole === 'cego') return;
  const { canvas, ctx, offsetX, offsetY, zoom, gridOn, gridSize, mapImg, tokens, dragging, hovered, gridCols, gridRows, gridType, lightingType } = BOARD;
  if (!ctx) return;

  updateFloorDisplay();

  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(zoom, zoom);

  // Mapa
  if (mapImg) {
    ctx.globalAlpha = 1;
    if (isGifUrl(mapImg.src)) {
      const frame = getGifFrame(mapImg.src, mapImg.naturalWidth, mapImg.naturalHeight);
      ctx.drawImage(frame, 0, 0, mapImg.naturalWidth, mapImg.naturalHeight);
    } else {
      ctx.drawImage(mapImg, 0, 0);
    }
  } else {
    const R = gridSize / 2;
    const hexH = Math.sqrt(3) * R;
    const gridPixelW = gridType === 'hex'
      ? (gridCols * R * 1.5 + R)
      : (gridCols * gridSize);
    const gridPixelH = gridType === 'hex'
      ? (gridRows * hexH + ((gridCols % 2) ? 0 : hexH / 2) + R)
      : (gridRows * gridSize);

    // Void background (fora do grid)
    ctx.fillStyle = '#0f0b08';
    ctx.fillRect(-offsetX/zoom, -offsetY/zoom, W/zoom, H/zoom);

    // Pergaminho dentro do grid
    ctx.fillStyle = '#1e1610';
    ctx.fillRect(0, 0, gridPixelW, gridPixelH);
  }

  // Grade
  if (gridOn) drawGrid(ctx, W, H);

  // Formas desenhadas (retângulos/círculos)
  drawShapes(ctx);

  // Preview de forma sendo desenhada
  if (BOARD.shapeDrawing) drawShapePreview(ctx);

  // Fog of War (jogadores)
  if (BOARD.fogVisible) drawFog(ctx, W, H);

  // Paredes
  drawWalls(ctx);

  // Preview de parede sendo desenhada
  if (BOARD.wallDrawing) drawWallPreview(ctx);

  // Tokens (ordenação por camadas: map < players / gm)
  const activeFloor = getCurrentFloor();
  const renderTokens = tokens.filter(t => {
    if (getFloorFromZ(t.z) !== activeFloor) return false;
    const layer = t.layer || 'players';
    if (layer === 'gm' && (myRole !== 'mestre' || emVisaoJogador())) return false;
    return true;
  });

  renderTokens.sort((a, b) => {
    const layerA = a.layer || 'players';
    const layerB = b.layer || 'players';
    if (layerA !== layerB) {
      if (layerA === 'map') return -1;
      if (layerB === 'map') return 1;
      return 0;
    }
    const zA = a.z || 0;
    const zB = b.z || 0;
    return zA - zB;
  });

  // 1. Desenhar os clones estáticos nas posições iniciais para os tokens sendo arrastados
  renderTokens.forEach(t => {
    const isMainDragging = (BOARD.dragging && t.id === BOARD.dragging.id);
    const isInDragGroup = (BOARD.dragGroup && BOARD.dragGroup[t.id] !== undefined);
    
    if (isMainDragging || isInDragGroup) {
      const startPos = BOARD.dragGroup && BOARD.dragGroup[t.id]
        ? BOARD.dragGroup[t.id]
        : { gx: BOARD.dragStartGx, gy: BOARD.dragStartGy };
        
      if (startPos && startPos.gx !== undefined && startPos.gy !== undefined) {
        const curGx = t.gx;
        const curGy = t.gy;
        t.gx = startPos.gx;
        t.gy = startPos.gy;
        
        ctx.save();
        ctx.globalAlpha = 0.7;
        drawToken(ctx, t, false, false);
        ctx.restore();
        
        t.gx = curGx;
        t.gy = curGy;
      }
    }
  });

  // 2. Desenhar os tokens nas posições atuais (com ghost opacity 0.55 se arrastando)
  renderTokens.forEach(t => {
    const isMainDragging = (BOARD.dragging && t.id === BOARD.dragging.id);
    const isInDragGroup = (BOARD.dragGroup && BOARD.dragGroup[t.id] !== undefined);
    const isDragging = isMainDragging || isInDragGroup;
    
    drawToken(ctx, t, isDragging, t.id === BOARD.hovered);
  });

  // 3. Desenhar a seta e caminho de movimento do token principal sendo arrastado
  if (BOARD.dragging) {
    drawTokenMovementPath(ctx, BOARD.dragging);
  }

  ctx.restore(); // Restaura transformações para coordenadas da tela

  // Iluminação (twilight, night, sunny - cheia apenas para jogadores; mestre vê tudo)
  if (lightingType && lightingType !== 'sunny' && (myRole !== 'mestre' || emVisaoJogador())) {
    ctx.save();
    if (lightingType === 'twilight') {
      ctx.fillStyle = 'rgba(180, 80, 50, 0.18)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(40, 10, 80, 0.1)';
      ctx.fillRect(0, 0, W, H);
    } else {
      ctx.fillStyle = getLightingColor(lightingType);
      ctx.fillRect(0, 0, W, H);
    }

    // Remove a escuridão onde há luz
    ctx.globalCompositeOperation = 'destination-out';
    tokens.forEach(t => {
      if (getFloorFromZ(t.z) !== activeFloor) return;
      const layer = t.layer || 'players';
      if (layer === 'gm' && (myRole !== 'mestre' || emVisaoJogador())) return;
      const sz = (t.size || 1);
      
      let tcx, tcy;
      if (BOARD.gridType === 'hex') {
        const R = gridSize / 2;
        const hexHeight = Math.sqrt(3) * R;
        tcx = t.gx * R * 1.5;
        tcy = t.gy * hexHeight + ((Math.abs(Math.round(t.gx)) % 2) ? hexHeight / 2 : 0);
      } else {
        tcx = t.gx * gridSize + sz * gridSize / 2;
        tcy = t.gy * gridSize + sz * gridSize / 2;
      }
      
      const sx = tcx * zoom + offsetX;
      const sy = tcy * zoom + offsetY;

      // Jogador sempre vê seus próprios tokens, de acordo com o tipo de visão e a iluminação atual
      if (t.controlledBy === myPeerId || (emVisaoJogador() && BOARD.playerViewTokenId === t.id)) {
        const visionType = t.visionType || 'normal';
        // fatorVisao = quanto do alcance próprio (visaoRange) o token consegue usar sem luz externa
        let fatorVisao = 1;
        if (lightingType === 'twilight') {
          // Penumbra ambiente: visão normal vê pior; penumbra e visão no escuro veem normalmente
          fatorVisao = (visionType === 'normal') ? 0.5 : 1;
        } else if (lightingType === 'night') {
          // Escuridão total: só a visão no escuro funciona sem fonte de luz própria
          fatorVisao = (visionType === 'escuro') ? 1 : 0;
        }
        // Sempre revela um raio mínimo em torno do próprio token (ele sabe onde está)
        const raioMinPx = Math.max(gridSize * zoom * 0.5, 25);
        const raioVisaoPx = (t.visaoRange || 4) * gridSize * zoom * fatorVisao;
        const raioPx = Math.max(raioVisaoPx, raioMinPx);
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, raioPx);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.6, 'rgba(255,255,255,0.8)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sx, sy, raioPx, 0, Math.PI * 2);
        ctx.fill();
      }

      // Luzes das auras (apenas auras marcadas como fonte de luz)
      if (t.auras && t.auras.length > 0) {
        t.auras.forEach(aura => {
          if (!aura.light) return;
          const auraRadiusPx = (aura.radius || 0) * gridSize * zoom;
          if (auraRadiusPx > 0) {
            const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, auraRadiusPx);
            grad.addColorStop(0, 'rgba(255,255,255,1)');
            grad.addColorStop(0.6, 'rgba(255,255,255,0.8)');
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(sx, sy, auraRadiusPx, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }
    });
    ctx.restore();
  }

  // Loop de animação para suporte a GIFs
  if (boardTemGif()) {
    if (!BOARD.gifInterval) {
      BOARD.gifInterval = setInterval(boardRender, 100);
    }
  } else {
    if (BOARD.gifInterval) { clearInterval(BOARD.gifInterval); BOARD.gifInterval = null; }
  }
}

function isGifUrl(url) {
  if (!url) return false;
  return /\.gif($|\?)/i.test(url) || url.startsWith('data:image/gif');
}

const _gifCanvasCache = {};

function getGifCanvas(url, naturalWidth, naturalHeight) {
  const entry = _gifCanvasCache[url];
  if (entry && entry.w === naturalWidth && entry.h === naturalHeight) return entry;
  if (entry && naturalWidth > 0) {
    entry.img.width = naturalWidth;
    entry.img.height = naturalHeight;
    entry.img.style.width = naturalWidth + 'px';
    entry.img.style.height = naturalHeight + 'px';
    entry.offCanvas.width = naturalWidth;
    entry.offCanvas.height = naturalHeight;
    entry.w = naturalWidth;
    entry.h = naturalHeight;
    return entry;
  }
  if (entry) return entry;

  const w = naturalWidth || 200;
  const h = naturalHeight || 200;

  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;left:-9999px;top:0;width:' + w + 'px;height:' + h + 'px;overflow:visible;pointer-events:none;z-index:-1;';

  let img = tokenImageCache[url];
  if (!img) {
    img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    tokenImageCache[url] = img;
  }
  img.width = w;
  img.height = h;
  img.style.cssText = 'width:' + w + 'px;height:' + h + 'px;display:block;';

  const offCanvas = document.createElement('canvas');
  offCanvas.width = w;
  offCanvas.height = h;

  container.appendChild(img);
  document.body.appendChild(container);

  const newEntry = { img, offCanvas, w, h, container };
  _gifCanvasCache[url] = newEntry;
  return newEntry;
}

function getGifFrame(url, naturalWidth, naturalHeight) {
  const w = naturalWidth || 200;
  const h = naturalHeight || 200;
  const entry = getGifCanvas(url, w, h);
  const ctx = entry.offCanvas.getContext('2d');
  try {
    ctx.clearRect(0, 0, entry.w, entry.h);
    ctx.drawImage(entry.img, 0, 0, entry.w, entry.h);
  } catch(e) {}
  return entry.offCanvas;
}

function hospedarGifNoDom(img) {
  // Mantida para compatibilidade
}

function boardTemGif() {
  if (BOARD.mapDataUrl && isGifUrl(BOARD.mapDataUrl)) return true;
  if (BOARD.mapImg && BOARD.mapImg.src && isGifUrl(BOARD.mapImg.src)) return true;
  for (const t of BOARD.tokens) {
    if (t.imageUrl && isGifUrl(t.imageUrl)) return true;
  }
  return false;
}

function drawGrid(ctx, W, H) {
  const { offsetX, offsetY, zoom, gridSize, gridType, gridCols, gridRows } = BOARD;
  const gs = gridSize;
  ctx.save();
  ctx.strokeStyle = 'rgba(107,77,42,0.35)';
  ctx.lineWidth = 0.5 / zoom;
  ctx.beginPath();

  if (gridType === 'hex') {
    const R = gs / 2;
    const hexHeight = Math.sqrt(3) * R;
    
    const startGx = Math.max(0, Math.floor((-offsetX / zoom) / (R * 1.5)) - 1);
    const endGx = Math.min(gridCols || 100, Math.ceil((W - offsetX) / zoom / (R * 1.5)) + 1);
    const startGy = Math.max(0, Math.floor((-offsetY / zoom) / hexHeight) - 1);
    const endGy = Math.min(gridRows || 100, Math.ceil((H - offsetY) / zoom / hexHeight) + 1);

    for (let gx = startGx; gx < endGx; gx++) {
      for (let gy = startGy; gy < endGy; gy++) {
        const cx = gx * R * 1.5;
        const cy = gy * hexHeight + ((Math.abs(Math.round(gx)) % 2) ? hexHeight / 2 : 0);
        
        ctx.moveTo(cx + R * Math.cos(0), cy + R * Math.sin(0));
        for (let i = 1; i <= 6; i++) {
          const angle = Math.PI / 3 * i;
          ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
        }
      }
    }
  } else {
    const startX = ((-offsetX / zoom) % gs + gs) % gs;
    const startY = ((-offsetY / zoom) % gs + gs) % gs;
    const endX = W / zoom + gs;
    const endY = H / zoom + gs;

    for (let x = startX - gs - offsetX/zoom; x < endX - offsetX/zoom; x += gs) {
      ctx.moveTo(x, -offsetY/zoom);
      ctx.lineTo(x, endY - offsetY/zoom);
    }
    for (let y = startY - gs - offsetY/zoom; y < endY - offsetY/zoom; y += gs) {
      ctx.moveTo(-offsetX/zoom, y);
      ctx.lineTo(endX - offsetX/zoom, y);
    }
  }
  ctx.stroke();
  ctx.restore();
}

function drawWalls(ctx) {
  const walls = BOARD.walls;
  if (!walls || walls.length === 0) return;
  const activeFloor = getCurrentFloor();
  ctx.save();

  walls.forEach(w => {
    if (getFloorFromZ(w.z) !== activeFloor) return;
    const type = w.type || 'normal';
    
    if (type === 'invisible') {
      if (myRole !== 'mestre' || emVisaoJogador()) return;
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

    ctx.save();
    ctx.lineCap = 'round';
    
    let baseColor = '#5a3a1a';
    let topColor = 'rgba(160,100,40,0.6)';
    let isDashed = false;
    
    if (type === 'door') {
      if (w.open) {
        baseColor = 'rgba(76, 175, 80, 0.2)';
        topColor = 'rgba(76, 175, 80, 0.5)';
        isDashed = true;
      } else {
        baseColor = '#d32f2f';
        topColor = '#ef5350';
      }
    } else if (type === 'window') {
      if (w.open) {
        baseColor = 'rgba(3, 169, 244, 0.2)';
        topColor = 'rgba(3, 169, 244, 0.5)';
        isDashed = true;
      } else {
        baseColor = '#0288d1';
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
  
  walls.forEach(w => {
    if (getFloorFromZ(w.z) !== activeFloor) return;
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
        fillColor = w.open ? '#4caf50' : '#f44336';
        strokeColor = w.open ? '#2e7d32' : '#c62828';
      } else if (type === 'window') {
        fillColor = w.open ? '#03a9f4' : '#9e9e9e';
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

function drawShapes(ctx) {
  if (!BOARD.shapes || BOARD.shapes.length === 0) return;
  const activeFloor = getCurrentFloor();
  BOARD.shapes.forEach(s => {
    if (getFloorFromZ(s.z) !== activeFloor) return;
    ctx.save();
    const fillColor = hexToRgba(s.color || '#c9903a', 0.25);
    const strokeColor = s.color || '#c9903a';
    const w = s.x2 - s.x1;
    const h = s.y2 - s.y1;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2 / BOARD.zoom;
    if (s.kind === 'circle') {
      const cx = s.x1 + w / 2;
      const cy = s.y1 + h / 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.abs(w) / 2, Math.abs(h) / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillRect(s.x1, s.y1, w, h);
      ctx.strokeRect(s.x1, s.y1, w, h);
    }
    if (BOARD.selectedShapeId === s.id) {
      ctx.setLineDash([6 / BOARD.zoom, 3 / BOARD.zoom]);
      ctx.strokeStyle = '#00bfff';
      ctx.lineWidth = 2 / BOARD.zoom;
      if (s.kind === 'circle') {
        const cx = s.x1 + w / 2;
        const cy = s.y1 + h / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(w) / 2, Math.abs(h) / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.strokeRect(s.x1, s.y1, w, h);
      }
      ctx.setLineDash([]);
    }
    ctx.restore();
  });
}

function drawShapePreview(ctx) {
  const { shapeStartX, shapeStartY, shapeCurX, shapeCurY, shapeColor, tool } = BOARD;
  ctx.save();
  const x1 = Math.min(shapeStartX, shapeCurX);
  const y1 = Math.min(shapeStartY, shapeCurY);
  const w = Math.abs(shapeCurX - shapeStartX);
  const h = Math.abs(shapeCurY - shapeStartY);
  const color = shapeColor || '#c9903a';
  ctx.fillStyle = hexToRgba(color, 0.2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2 / BOARD.zoom;
  ctx.setLineDash([8 / BOARD.zoom, 4 / BOARD.zoom]);
  if (tool === 'shape-circle') {
    ctx.beginPath();
    ctx.ellipse(x1 + w/2, y1 + h/2, w/2, h/2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillRect(x1, y1, w, h);
    ctx.strokeRect(x1, y1, w, h);
  }
  ctx.setLineDash([]);
  ctx.restore();
}

function hexToRgba(hex, alpha) {
  hex = (hex || '#c9903a').replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawWallPreview(ctx) {
  const { wallStartX, wallStartY, wallCurX, wallCurY, wallType } = BOARD;
  ctx.save();
  
  let strokeStyle = 'rgba(232,185,106,0.8)';
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

function drawFog(ctx, W, H) {
  if (!BOARD.fogVisible) return;
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const gs = gridSize;
  const f = getCurrentFloor();
  const x0 = Math.floor(-offsetX / zoom / gs) - 1;
  const y0 = Math.floor(-offsetY / zoom / gs) - 1;
  const x1 = Math.ceil((W / zoom - offsetX / zoom) / gs) + 1;
  const y1 = Math.ceil((H / zoom - offsetY / zoom) / gs) + 1;

  ctx.save();
  ctx.fillStyle = 'rgba(10,8,6,0.82)';
  for (let gx = x0; gx <= x1; gx++) {
    for (let gy = y0; gy <= y1; gy++) {
      const key = f === 0 ? `${gx},${gy}` : `${f}:${gx},${gy}`;
      if (!BOARD.fogVisible.has(key)) {
        ctx.fillRect(gx * gs, gy * gs, gs, gs);
      }
    }
  }
  ctx.restore();
}

function computeVisibility(token, radius) {
  if (radius === undefined) {
    radius = token.visaoRange || 12;
  }
  const { gridSize, walls } = BOARD;
  const gs = gridSize;
  const sz = (token.size || 1);
  const ox = token.gx * gs + sz * gs / 2;
  const oy = token.gy * gs + sz * gs / 2;

  const visible = new Set();
  const gx0 = Math.floor(ox / gs);
  const gy0 = Math.floor(oy / gs);
  const tokenFloor = getFloorFromZ(token.z);
  const relevantWalls = (walls || []).filter(w => getFloorFromZ(w.z) === tokenFloor);

  for (let dgx = -radius; dgx <= radius; dgx++) {
    for (let dgy = -radius; dgy <= radius; dgy++) {
      if (dgx * dgx + dgy * dgy > radius * radius) continue;
      const gx = gx0 + dgx;
      const gy = gy0 + dgy;
      if (gx < 0 || gy < 0) continue;
      const tx = gx * gs + gs / 2;
      const ty = gy * gs + gs / 2;
      if (!rayHitsWall(ox, oy, tx, ty, relevantWalls)) {
        const key = tokenFloor === 0 ? `${gx},${gy}` : `${tokenFloor}:${gx},${gy}`;
        visible.add(key);
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
  return true;
}

function wallBlocksMovement(w) {
  const type = w.type || 'normal';
  if (type === 'door' && w.open) return false;
  return true;
}

function checkMoveBlocked(token, fromGx, fromGy, toGx, toGy) {
  const { gridSize, walls } = BOARD;
  const sz = (token.size || 1) * gridSize;
  const startX = fromGx * gridSize + sz / 2;
  const startY = fromGy * gridSize + sz / 2;
  const endX = toGx * gridSize + sz / 2;
  const endY = toGy * gridSize + sz / 2;
  const tokenFloor = getFloorFromZ(token.z);
  const relevantWalls = (walls || []).filter(w => getFloorFromZ(w.z) === tokenFloor);

  for (const w of relevantWalls) {
    if (wallBlocksMovement(w)) {
      if (segmentsIntersect(startX, startY, endX, endY, w.x1, w.y1, w.x2, w.y2)) {
        return true;
      }
    }
  }
  return false;
}

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

function getLightingColor(type) {
  switch (type) {
    case 'night': return 'rgba(10, 8, 15, 0.9)';
    case 'twilight': return 'rgba(180, 80, 50, 0.18)';
    default: return 'transparent';
  }
}

function getTokenCenter(t, gx, gy) {
  const { gridSize, gridType } = BOARD;
  const sz = (t.size || 1);
  if (gridType === 'hex') {
    const R = gridSize / 2;
    const hexHeight = Math.sqrt(3) * R;
    return {
      x: gx * R * 1.5,
      y: gy * hexHeight + ((Math.abs(Math.round(gx)) % 2) ? hexHeight / 2 : 0)
    };
  }
  return {
    x: gx * gridSize + (sz * gridSize) / 2,
    y: gy * gridSize + (sz * gridSize) / 2
  };
}

function drawToken(ctx, t, isDragging, isHovered) {
  const layer = t.layer || 'players';
  if (layer === 'gm' && (myRole !== 'mestre' || emVisaoJogador())) return;
  const isObject = t.type === 'object';

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

  if (layer === 'gm') {
    ctx.globalAlpha = 0.5;
  }

  if (isObject) {
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
        const drawSrc = isGifUrl(t.imageUrl) ? getGifFrame(t.imageUrl, img.naturalWidth, img.naturalHeight) : img;
        ctx.drawImage(drawSrc, px - r, py - r, sz, sz);
        ctx.restore();
      } else {
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(px - r, py - r, sz, sz);
      }
    } else {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(px - r, py - r, sz, sz);
    }
    ctx.strokeStyle = isDragging ? '#e8b96a' : isHovered ? '#c9903a' : (isSelected ? '#00bfff' : 'rgba(255,255,255,0.2)');
    ctx.lineWidth = (isDragging || isSelected ? 2.5 : 1) / BOARD.zoom;
    ctx.strokeRect(px - r, py - r, sz, sz);
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

  if (isDragging || isHovered) {
    ctx.shadowColor = 'rgba(201,144,58,0.6)';
    ctx.shadowBlur = 12 / BOARD.zoom;
  }

  ctx.beginPath();
  ctx.arc(px, py, r, 0, Math.PI * 2);
  ctx.fillStyle = t.color || '#c94040';
  ctx.fill();

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
      ctx.translate(px, py);
      ctx.rotate(rotation);
      ctx.translate(-px, -py);

      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.clip();

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

      if (isGifUrl(t.imageUrl)) {
        const frame = getGifFrame(t.imageUrl, w, h);
        ctx.drawImage(frame, sx, sy, s, s, px - r, py - r, r * 2, r * 2);
      } else {
        ctx.drawImage(img, sx, sy, s, s, px - r, py - r, r * 2, r * 2);
      }
      ctx.restore();
      hasDrawnImage = true;
    }
  }

  ctx.strokeStyle = isDragging ? '#e8b96a' : isHovered ? '#c9903a' : (layer === 'gm' ? '#9040c9' : 'rgba(0,0,0,0.5)');
  ctx.lineWidth = (isDragging ? 2.5 : 1.5) / BOARD.zoom;
  if (layer === 'gm') {
    ctx.setLineDash([4 / BOARD.zoom, 2 / BOARD.zoom]);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.shadowBlur = 0;

  if (!hasDrawnImage) {
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

  const nameFontSize = Math.max(8, gs * 0.22);
  if (!t.hideName) {
    ctx.font = `${nameFontSize}px Cinzel, serif`;
    ctx.fillStyle = '#e8d9c0';
    ctx.strokeStyle = 'rgba(0,0,0,0.8)';
    ctx.lineWidth = 2.5 / BOARD.zoom;
    ctx.strokeText(t.name || '', px, py + r + nameFontSize * 0.9);
    ctx.fillText(t.name || '', px, py + r + nameFontSize * 0.9);

    if (t.conditions && t.conditions.length) {
      const emojiSize = Math.max(9, gs * 0.18);
      ctx.font = `${emojiSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      const gap = emojiSize * 0.4;
      const condStartY = py + r + nameFontSize * 0.9 + emojiSize * 0.6;
      const visibleConds = t.conditions.slice(0, 6);
      const widths = visibleConds.map(c => ctx.measureText(CONDITION_EMOJI[c] || '?').width);
      const totalW = widths.reduce((a, b) => a + b + gap, -gap);
      let cx3 = px - totalW / 2;
      visibleConds.forEach(c => {
        const emoji = CONDITION_EMOJI[c] || '?';
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

  if (isSelected) {
    const hSize = 7 / BOARD.zoom;
    const handleDist = r + 22 / BOARD.zoom;

    const rotHX = px + handleDist * Math.sin(rotation);
    const rotHY = py - handleDist * Math.cos(rotation);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(px + r * Math.sin(rotation), py - r * Math.cos(rotation));
    ctx.lineTo(rotHX, rotHY);
    ctx.strokeStyle = 'rgba(0, 191, 255, 0.6)';
    ctx.lineWidth = 1.5 / BOARD.zoom;
    ctx.stroke();

    ctx.fillStyle = '#00bfff';
    ctx.strokeStyle = '#005f7f';
    ctx.lineWidth = 1 / BOARD.zoom;
    ctx.fillRect(rotHX - hSize / 2, rotHY - hSize / 2, hSize, hSize);
    ctx.strokeRect(rotHX - hSize / 2, rotHY - hSize / 2, hSize, hSize);
    ctx.restore();

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

function drawTokenMovementPath(ctx, t) {
  if (!BOARD.dragging || t.id !== BOARD.dragging.id) return;
  const startGx = BOARD.dragStartGx;
  const startGy = BOARD.dragStartGy;
  if (startGx === undefined || startGy === undefined) return;
  
  const start = getTokenCenter(t, startGx, startGy);
  const end = getTokenCenter(t, t.gx, t.gy);
  
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.hypot(dx, dy);
  if (len < 5) return;

  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(0, 191, 255, 0.8)';
  ctx.lineWidth = 3 / BOARD.zoom;
  ctx.setLineDash([6 / BOARD.zoom, 4 / BOARD.zoom]);
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.setLineDash([]);

  const angle = Math.atan2(dy, dx);
  const arrowLen = 12 / BOARD.zoom;
  ctx.fillStyle = 'rgba(0, 191, 255, 0.9)';
  ctx.beginPath();
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(end.x - arrowLen * Math.cos(angle - Math.PI / 6), end.y - arrowLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(end.x - arrowLen * Math.cos(angle + Math.PI / 6), end.y - arrowLen * Math.sin(angle + Math.PI / 6));
  ctx.fill();
}

const UNSPLASH_ACCESS_KEY = 'etK-AkXGz5Y57XQUXkiot9ad3oN619Vq4k_oL9sxtZQ';
const PIXABAY_API_KEY = '56232677-4d3f788e61cab49986809d088';
const PEXELS_API_KEY = 'dLBE0nAJB45cRSbm65Ej1JeLNOI5JAKiR0tw0E7niNk7TMeDE6XurC4X';
let unsplashSelected = null;
let currentSearchSource = 'unsplash';

function setSearchSource(source) {
  currentSearchSource = source;
  ['search-tab-unsplash', 'search-tab-pexels', 'search-tab-pixabay'].forEach(id => {
    const tab = document.getElementById(id);
    if (tab) {
      tab.classList.remove('active');
      tab.style.borderBottomColor = 'transparent';
      tab.style.color = 'var(--text-muted)';
    }
  });

  const activeTab = document.getElementById(source === 'unsplash' ? 'search-tab-unsplash' : (source === 'pexels' ? 'search-tab-pexels' : 'search-tab-pixabay'));
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.style.borderBottomColor = 'var(--gold)';
    activeTab.style.color = 'var(--gold)';
  }

  const queryInput = document.getElementById('unsplashQuery');
  const footerSpan = document.querySelector('.unsplash-footer span');
  
  if (source === 'unsplash') {
    if (queryInput) queryInput.placeholder = 'Ex: dragon, warrior, castle...';
    if (footerSpan) footerSpan.innerHTML = 'Fotos por <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a>';
  } else if (source === 'pexels') {
    if (queryInput) queryInput.placeholder = 'Ex: fantasy, forest, orc...';
    if (footerSpan) footerSpan.innerHTML = 'Fotos por <a href="https://pexels.com" target="_blank" rel="noopener">Pexels</a>';
  } else if (source === 'pixabay') {
    if (queryInput) queryInput.placeholder = 'Ex: dwarf, elf, treasure...';
    if (footerSpan) footerSpan.innerHTML = 'Fotos por <a href="https://pixabay.com" target="_blank" rel="noopener">Pixabay</a>';
  }
}

function abrirBuscaUnsplash() {
  fecharContextMenu();
  document.getElementById('unsplashModal').style.display = 'flex';
  document.getElementById('unsplashQuery').value = '';
  document.getElementById('unsplashGrid').innerHTML = '<div class="unsplash-empty">Digite um termo e pressione Enter ou clique em Buscar</div>';
  document.getElementById('unsplashActions').style.display = 'none';
  unsplashSelected = null;
  setSearchSource(currentSearchSource);
  setTimeout(() => document.getElementById('unsplashQuery').focus(), 100);
}

function fecharBuscaUnsplash() {
  document.getElementById('unsplashModal').style.display = 'none';
  unsplashSelected = null;
}

function selecionarFotoUnsplash(foto) {
  unsplashSelected = foto;
  if (foto.links && foto.links.download_location) {
    fetch(foto.links.download_location + '&client_id=' + UNSPLASH_ACCESS_KEY, { method: 'GET' });
  }
  const preview = document.getElementById('unsplashPreview');
  preview.innerHTML = `<img src="${foto.urls.thumb}" alt="">`;
  document.getElementById('unsplashActions').style.display = 'flex';
}

function usarImgComo(tipo) {
  if (!unsplashSelected) return;
  const url = unsplashSelected.urls.regular;
  
  const formAberto = document.getElementById('tokenForm')?.classList.contains('open');
  
  if (tipo === 'token') {
    if (formAberto) {
      document.getElementById('tfImgUrl').value = url;
      previewImagemToken(url);
      fecharBuscaUnsplash();
      toast('🎯 Imagem selecionada para o token! Abra o formulário e edite.');
    } else {
      if (myRole !== 'mestre') { toast('Apenas o Mestre pode criar tokens.'); fecharBuscaUnsplash(); return; }
      fecharBuscaUnsplash();
      const { x, y } = BOARD.ctxMenuBoardX !== undefined ? { x: BOARD.ctxMenuBoardX, y: BOARD.ctxMenuBoardY } : { x: BOARD.wrap.clientWidth / 2, y: BOARD.wrap.clientHeight / 2 };
      const { gx, gy } = canvasToGrid(x, y);
      
      snapshotBoard();
      BOARD.tokens.push({
        id: 'tk' + Date.now() + Math.floor(Math.random()*9999),
        name: 'Imagem',
        hp: 0, hpMax: 0, size: 1,
        color: '#c9903a',
        imageUrl: url, controlledBy: null,
        borderType: 'solid', borderWidth: 1.5, borderColor: '#000000',
        shapeType: 'circle', auraRadius: 0,
        z: 0,
        layer: 'gm', conditions: [], hideName: false,
        gx: Math.max(0, gx), gy: Math.max(0, gy)
      });
      // Pré-carrega imagem GIF no DOM para garantir animação se for GIF
      if (isGifUrl(url)) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => { getGifCanvas(url, img.naturalWidth, img.naturalHeight); boardRender(); };
        img.src = url;
        tokenImageCache[url] = img;
      }
      boardSave(); boardRender(); syncBoardTokensToPlayers();
      toast(`🎯 Token criado (1×1)!`);
    }
  } else if (tipo === 'objeto') {
    if (myRole !== 'mestre') { toast('Apenas o Mestre pode criar objetos.'); fecharBuscaUnsplash(); return; }
    fecharBuscaUnsplash();
    const { x, y } = BOARD.ctxMenuBoardX !== undefined ? { x: BOARD.ctxMenuBoardX, y: BOARD.ctxMenuBoardY } : { x: BOARD.wrap.clientWidth / 2, y: BOARD.wrap.clientHeight / 2 };
    const { gx, gy } = canvasToGrid(x, y);
    
    snapshotBoard();
    BOARD.tokens.push({
      id: 'tk' + Date.now() + Math.floor(Math.random()*9999),
      type: 'object',
      name: 'Objeto',
      size: 2,
      imageUrl: url,
      borderType: 'solid', borderWidth: 1.5, borderColor: '#ffffff',
      layer: 'map',
      z: 0,
      conditions: [],
      hideName: true,
      gx: Math.max(0, gx), gy: Math.max(0, gy)
    });
    // Pré-carrega imagem GIF no DOM para garantir animação se for GIF
    if (isGifUrl(url)) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => { getGifCanvas(url, img.naturalWidth, img.naturalHeight); boardRender(); };
      img.src = url;
      tokenImageCache[url] = img;
    }
    setBoardLayer('map');
    BOARD.selectedTokens.clear();
    BOARD.selectedTokens.add(BOARD.tokens[BOARD.tokens.length - 1].id);
    boardSave(); boardRender(); syncBoardTokensToPlayers();
    toast(`◻ Objeto criado (2×2) na camada Mapa! Arraste para posicionar.`);
  } else if (tipo === 'mapa') {
    if (myRole !== 'mestre') { toast('Apenas o Mestre pode alterar o mapa.'); fecharBuscaUnsplash(); return; }
    const img = new Image();
    img.onload = () => {
      snapshotBoard();
      BOARD.mapImg = img;
      if (isGifUrl(url)) getGifCanvas(url, img.naturalWidth, img.naturalHeight);
      BOARD.mapDataUrl = url;
      boardRender();
      if (myRole === 'mestre' || amIHost) broadcast({ type: 'board-map', mapUrl: url }, null);
      fecharBuscaUnsplash();
      toast('🗺 Mapa atualizado!');
    };
    img.onerror = () => toast('Erro ao carregar imagem.');
    img.crossOrigin = 'anonymous';
    img.src = url;
  }
  
  BOARD.ctxMenuBoardX = undefined;
  BOARD.ctxMenuBoardY = undefined;
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
  if (myRole !== 'mestre') { toast('Apenas o Mestre pode colar imagens.'); fecharPasteImagem(); return; }
  const url = document.getElementById('pasteImgUrl').value.trim();
  if (!url) { toast('Cole uma URL primeiro.'); return; }
  fecharPasteImagem();
  const { x, y } = BOARD.ctxMenuBoardX !== undefined ? { x: BOARD.ctxMenuBoardX, y: BOARD.ctxMenuBoardY } : { x: BOARD.wrap.clientWidth / 2, y: BOARD.wrap.clientHeight / 2 };
  const { gx, gy } = canvasToGrid(x, y);
  if (tipo === 'fundo') {
    const img = new Image();
    img.onload = () => {
      snapshotBoard();
      BOARD.mapImg = img;
      if (isGifUrl(url)) getGifCanvas(url, img.naturalWidth, img.naturalHeight);
      BOARD.mapDataUrl = url;
      boardRender();
      if (myRole === 'mestre' || amIHost) broadcast({ type: 'board-map', mapUrl: url }, null);
      toast('🗺 Fundo atualizado!');
    };
    img.onerror = () => toast('Erro ao carregar imagem.');
    img.crossOrigin = 'anonymous';
    img.src = url;
  } else if (tipo === 'objeto') {
    snapshotBoard();
    const s = parseFloat(document.getElementById('pasteImgSize').value) || 2;
    const newId = 'tk' + Date.now() + Math.floor(Math.random()*9999);
    BOARD.tokens.push({
      id: newId,
      type: 'object',
      name: 'Objeto',
      size: s,
      imageUrl: url,
      borderType: 'solid', borderWidth: 1.5, borderColor: '#ffffff',
      layer: 'map',
      z: 0,
      conditions: [],
      hideName: true,
      gx: Math.max(0, gx), gy: Math.max(0, gy)
    });
    // Pré-carrega imagem GIF no DOM para garantir animação
    if (isGifUrl(url)) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => { getGifCanvas(url, img.naturalWidth, img.naturalHeight); boardRender(); };
      img.src = url;
      tokenImageCache[url] = img;
    }
    setBoardLayer('map');
    BOARD.selectedTokens.clear();
    BOARD.selectedTokens.add(newId);
    boardSave(); boardRender(); syncBoardTokensToPlayers();
    toast(`◻ Objeto criado (${s}×${s}) na camada Mapa! Arraste para posicionar.`);
  } else if (tipo === 'token') {
    snapshotBoard();
    const s = parseFloat(document.getElementById('pasteImgSize').value) || 1;
    BOARD.tokens.push({
      id: 'tk' + Date.now() + Math.floor(Math.random()*9999),
      name: 'Imagem',
      hp: 0, hpMax: 0, size: s,
      color: '#c9903a',
      imageUrl: url, controlledBy: null,
      borderType: 'solid', borderWidth: 1.5, borderColor: '#000000',
      shapeType: 'circle', auraRadius: 0,
      z: 0,
      layer: 'gm', conditions: [], hideName: false,
      gx: Math.max(0, gx), gy: Math.max(0, gy)
    });
    // Pré-carrega imagem GIF no DOM para garantir animação se for GIF
    if (isGifUrl(url)) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => { getGifCanvas(url, img.naturalWidth, img.naturalHeight); boardRender(); };
      img.src = url;
      tokenImageCache[url] = img;
    }
    boardSave(); boardRender(); syncBoardTokensToPlayers();
    toast(`🎯 Token criado (${s}×${s})!`);
  }
  BOARD.ctxMenuBoardX = undefined;
  BOARD.ctxMenuBoardY = undefined;
}

async function executarBuscaImagens() {
  const q = document.getElementById('unsplashQuery').value.trim();
  if (!q) return;
  const grid = document.getElementById('unsplashGrid');
  grid.innerHTML = '<div class="unsplash-empty">Buscando...</div>';
  document.getElementById('unsplashActions').style.display = 'none';
  unsplashSelected = null;
  
  if (currentSearchSource === 'unsplash') {
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
  } else if (currentSearchSource === 'pixabay') {
    // Busca via Pixabay
    try {
      const res = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(q)}&per_page=15`);
      if (!res.ok) { grid.innerHTML = '<div class="unsplash-empty">Erro na busca no Pixabay. Tente novamente.</div>'; return; }
      const data = await res.json();
      if (!data.hits || !data.hits.length) { grid.innerHTML = '<div class="unsplash-empty">Nenhuma imagem encontrada no Pixabay.</div>'; return; }
      grid.innerHTML = '';
      data.hits.forEach(hit => {
        const adaptedPhoto = {
          urls: {
            regular: hit.largeImageURL,
            thumb: hit.previewURL
          },
          user: {
            name: hit.user
          },
          alt_description: hit.tags || '',
          links: {
            download_location: null
          }
        };
        const div = document.createElement('div');
        div.className = 'unsplash-item';
        div.innerHTML = `<img src="${adaptedPhoto.urls.thumb}" alt="${adaptedPhoto.alt_description}" loading="lazy">
          <div class="unsplash-attr">📷 ${adaptedPhoto.user.name}</div>`;
        div.onclick = () => selecionarFotoUnsplash(adaptedPhoto);
        grid.appendChild(div);
      });
    } catch(e) {
      grid.innerHTML = '<div class="unsplash-empty">Erro de conexão com o Pixabay.</div>';
    }
  } else {
    // Busca via Pexels
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=15`, {
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      });
      if (!res.ok) { grid.innerHTML = '<div class="unsplash-empty">Erro na busca no Pexels. Tente novamente.</div>'; return; }
      const data = await res.json();
      if (!data.photos || !data.photos.length) { grid.innerHTML = '<div class="unsplash-empty">Nenhuma imagem encontrada no Pexels.</div>'; return; }
      grid.innerHTML = '';
      data.photos.forEach(photo => {
        const adaptedPhoto = {
          urls: {
            regular: photo.src.large,
            thumb: photo.src.tiny
          },
          user: {
            name: photo.photographer
          },
          alt_description: photo.alt || '',
          links: {
            download_location: null
          }
        };
        const div = document.createElement('div');
        div.className = 'unsplash-item';
        div.innerHTML = `<img src="${adaptedPhoto.urls.thumb}" alt="${adaptedPhoto.alt_description}" loading="lazy">
          <div class="unsplash-attr">📷 ${adaptedPhoto.user.name}</div>`;
        div.onclick = () => selecionarFotoUnsplash(adaptedPhoto);
        grid.appendChild(div);
      });
    } catch(e) {
      grid.innerHTML = '<div class="unsplash-empty">Erro de conexão com o Pexels.</div>';
    }
  }
}

async function buscarUnsplash() {
  return executarBuscaImagens();
}

function limparImagemToken() {
  definirImagemToken('');
}

let tfSelectedColor = '#c94040';
let tfSelectedImage = '';
let tfEditingId = null;

function abrirFormToken(cx, cy, prefillOpts) {
  tfEditingId = null;
  document.getElementById('tfTitle').textContent = 'Novo Token';
  document.getElementById('tfName').value = prefillOpts?.name || '';
  document.getElementById('tfHP').value = prefillOpts?.hp ?? '';
  document.getElementById('tfSize').value = '1';
  selectTokenColorByValue('#c94040');
  popularControleSelect('');
  definirImagemToken(prefillOpts?.imageUrl || '');

  const layerSelect = document.getElementById('tfLayer');
  if (layerSelect) {
    layerSelect.value = BOARD.activeLayer || 'players';
  }
  const zInput = document.getElementById('tfZ');
  if (zInput) zInput.value = '0';
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
  const zInput = document.getElementById('tfZ');
  if (zInput) zInput.value = token.z ?? 0;
  const hideNameCb = document.getElementById('tfHideName');
  if (hideNameCb) hideNameCb.checked = !!token.hideName;
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

let tfPreviewImg = null;
let tfPreviewDrag = null;

function _renderTokenPreviewCanvas() {
  const canvas = document.getElementById('tfImgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, R = W / 2;
  ctx.clearRect(0, 0, W, H);

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

function confirmarToken() {
  snapshotBoard();
  const name = document.getElementById('tfName').value.trim() || 'Token';
  const hp = parseInt(document.getElementById('tfHP').value) || 0;
  const size = parseInt(document.getElementById('tfSize').value) || 1;
  const controlledBy = document.getElementById('tfControlledBy').value || null;
  const imageUrl = tfSelectedImage || '';
  const layer = myRole === 'mestre' ? (document.getElementById('tfLayer')?.value || 'gm') : 'players';
  const posX = parseInt(document.getElementById('tfImgPosX').value) || 50;
  const posY = parseInt(document.getElementById('tfImgPosY').value) || 50;
  const imagePosition = `${posX}% ${posY}%`;
  const hideName = document.getElementById('tfHideName').checked;
  const z = parseInt(document.getElementById('tfZ').value) || 0;
  const visionType = document.querySelector('input[name="tfVision"]:checked')?.value || 'normal';
  const auras = lerAurasForm();
  const borderType = document.getElementById('tfBorderType')?.value || 'solid';
  const borderWidth = parseFloat(document.getElementById('tfBorderWidth')?.value) || 1.5;
  const borderColor = document.getElementById('tfBorderColor')?.value || 'rgba(0,0,0,0.5)';
  const shapeType = document.getElementById('tfShapeType')?.value || 'circle';
  const auraRadius = parseFloat(document.getElementById('tfAuraRadius')?.value) || 0;
  const auraColor = document.getElementById('tfAuraColor')?.value || 'rgba(66,165,245,0.2)';

  if (tfEditingId) {
    const t = BOARD.tokens.find(t => t.id === tfEditingId);
    if (t) {
      t.name = name;
      t.hp = hp; if (hp > t.hpMax) t.hpMax = hp;
      t.controlledBy = controlledBy;
      t.imageUrl = imageUrl;
      t.layer = layer;
      t.imagePosition = imagePosition;
      t.hideName = hideName;
      t.z = z;
      
      if (t.type === 'object') {
        const sizeX = parseFloat(document.getElementById('tfSizeX').value);
        const sizeY = parseFloat(document.getElementById('tfSizeY').value);
        t.sizeX = isNaN(sizeX) ? 1 : sizeX;
        t.sizeY = isNaN(sizeY) ? 1 : sizeY;
        t.size = Math.max(t.sizeX, t.sizeY);
      } else {
        t.size = size;
        t.sizeX = size;
        t.sizeY = size;
      }
      t.color = tfSelectedColor;
      t.visionType = visionType;
      t.auras = auras;
      t.borderType = borderType;
      t.borderWidth = borderWidth;
      t.borderColor = borderColor;
      t.shapeType = shapeType;
      t.auraRadius = auraRadius;
      t.auraColor = auraColor;
    }
  } else {
    const cx = BOARD.wrap.clientWidth / 2;
    const cy = BOARD.wrap.clientHeight / 2;
    const { gx, gy } = canvasToGrid(cx, cy);
    const bestiaryName = window._bestiaryPendingName || '';
    window._bestiaryPendingName = '';
    BOARD.tokens.push({
      id: 'tk' + Date.now() + Math.floor(Math.random()*9999),
      name, hp, hpMax: hp, size, 
      sizeX: size, sizeY: size,
      color: tfSelectedColor,
      imageUrl, controlledBy,
      layer, imagePosition,
      conditions: [], hideName,
      bestiaryName, visionType, auras,
      borderType, borderWidth, borderColor, shapeType, auraRadius, auraColor,
      z,
      gx: Math.max(0, gx), gy: Math.max(0, gy)
    });
  }

  fecharFormToken();
  boardSave(); boardRender(); syncBoardTokensToPlayers();
}

// ── Adicionar token a partir do combate ──
function tokenDosCombatentes() {
  if (!combatState?.combatants?.length) { toast('Sem combatentes no gerenciador.'); return; }
  snapshotBoard();
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
        borderType: 'solid', borderWidth: 1.5, borderColor: '#000000',
        shapeType: 'circle', auraRadius: 0,
        z: 0,
      layer: BOARD.activeLayer || 'gm',
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
  snapshotBoard();
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
    borderType: 'solid', borderWidth: 1.5, borderColor: '#000000',
    shapeType: 'circle', auraRadius: 0,
    z: 0,
    conditions: [],
    hideName: false,
    layer: 'gm',
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
    const state = {
      tokens: BOARD.tokens,
      walls: BOARD.walls,
      shapes: BOARD.shapes,
      gridSize: BOARD.gridSize,
      gridOn: BOARD.gridOn,
      activeFloor: BOARD.activeFloor || 0,
      gridCols: BOARD.gridCols,
      gridRows: BOARD.gridRows,
      gridScaleVal: BOARD.gridScaleVal,
      gridScaleUnit: BOARD.gridScaleUnit,
      gridType: BOARD.gridType,
      lightingType: BOARD.lightingType
    };
    if (BOARD.fogManual && BOARD.fogVisible) {
      state.fogVisible = Array.from(BOARD.fogVisible);
      state.fogManual = true;
    }
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
    if (s.shapes) BOARD.shapes = s.shapes;
    if (s.gridSize) BOARD.gridSize = s.gridSize;
    if (typeof s.gridOn === 'boolean') BOARD.gridOn = s.gridOn;
    if (s.activeFloor !== undefined) BOARD.activeFloor = s.activeFloor;
    if (s.gridCols !== undefined) BOARD.gridCols = s.gridCols;
    if (s.gridRows !== undefined) BOARD.gridRows = s.gridRows;
    if (s.gridScaleVal !== undefined) BOARD.gridScaleVal = s.gridScaleVal;
    if (s.gridScaleUnit !== undefined) BOARD.gridScaleUnit = s.gridScaleUnit;
    if (s.gridType !== undefined) BOARD.gridType = s.gridType;
    if (s.lightingType !== undefined) BOARD.lightingType = s.lightingType;
    if (s.fogManual && s.fogVisible) {
      BOARD.fogVisible = new Set(s.fogVisible);
      BOARD.fogManual = true;
    }
  } catch(e) {}
}

// ── Limpar ──
function limparBoard() {
  if (!confirm('Limpar todos os tokens, paredes e o mapa?')) return;
  snapshotBoard();
  BOARD.tokens = []; BOARD.walls = []; BOARD.shapes = []; BOARD.mapImg = null; BOARD.mapDataUrl = null;
  BOARD.fogVisible = null; BOARD.fogManual = false;
  if (BOARD.animFrameId) { cancelAnimationFrame(BOARD.animFrameId); BOARD.animFrameId = null; }
  if (BOARD.playerViewTokenId) exitPlayerView();
  boardSave(); boardRender(); syncBoardToPlayers();
  toast('Tabuleiro limpo.');
}

function limparParedes() {
  const activeFloor = getCurrentFloor();
  const currentFloorWalls = BOARD.walls.filter(w => getFloorFromZ(w.z) === activeFloor);
  if (currentFloorWalls.length === 0) { toast('Nenhuma parede neste andar para apagar.'); return; }
  if (!confirm(`Apagar todas as ${currentFloorWalls.length} paredes do Andar ${activeFloor}?`)) return;
  snapshotBoard();
  BOARD.walls = BOARD.walls.filter(w => getFloorFromZ(w.z) !== activeFloor);
  boardSave(); syncWallsToPlayers(); boardRender();
  toast(`🧱 Paredes do Andar ${activeFloor} apagadas.`);
}

function isPointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    
    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Encontra forma sob o ponto (wx,wy) em coords world
function shapeAt(wx, wy) {
  if (!BOARD.shapes) return null;
  const activeFloor = getCurrentFloor();
  for (let i = BOARD.shapes.length - 1; i >= 0; i--) {
    const s = BOARD.shapes[i];
    if (getFloorFromZ(s.z) !== activeFloor) continue;
    if (s.kind === 'circle') {
      const cx = (s.x1 + s.x2) / 2;
      const cy = (s.y1 + s.y2) / 2;
      const rx = Math.abs(s.x2 - s.x1) / 2;
      const ry = Math.abs(s.y2 - s.y1) / 2;
      if (rx === 0 || ry === 0) continue;
      const dx = (wx - cx) / rx;
      const dy = (wy - cy) / ry;
      if (dx*dx + dy*dy <= 1) return s;
    } else if (s.kind === 'freehand') {
      if (s.points && isPointInPolygon(wx, wy, s.points)) return s;
    } else {
      const x1 = Math.min(s.x1, s.x2), x2 = Math.max(s.x1, s.x2);
      const y1 = Math.min(s.y1, s.y2), y2 = Math.max(s.y1, s.y2);
      if (wx >= x1 && wx <= x2 && wy >= y1 && wy <= y2) return s;
    }
  }
  return null;
}

// Encontra parede mais próxima do ponto (wx,wy) em coords world
function wallAt(wx, wy, threshold) {
  let best = null, bestDist = threshold;
  const activeFloor = getCurrentFloor();
  BOARD.walls.forEach(w => {
    if (getFloorFromZ(w.z) !== activeFloor) return;
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

  const activeFloor = getCurrentFloor();

  for (const w of walls) {
    if (getFloorFromZ(w.z) !== activeFloor) continue;
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
  snapshotBoard();
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
function syncShapesToPlayers() {
  if (myRole === 'mestre') {
    broadcast({ type: 'board-shapes', shapes: BOARD.shapes }, null);
  } else if (masterConn) {
    masterConn.send({ type: 'player-shapes', shapes: BOARD.shapes });
  }
}
function syncFogToPlayers() {
  if (myRole !== 'mestre') return;
  if (BOARD.fogManual && BOARD.fogVisible) {
    broadcast({ type: 'board-fog', fog: Array.from(BOARD.fogVisible) }, null);
  } else {
    broadcast({ type: 'board-fog', fog: null }, null);
  }
}
function pintarFogCelula(gx, gy, reveal) {
  if (!BOARD.fogVisible) return;
  const f = getCurrentFloor();
  const key = f === 0 ? `${gx},${gy}` : `${f}:${gx},${gy}`;
  if (reveal) BOARD.fogVisible.add(key);
  else BOARD.fogVisible.delete(key);
  boardRender();
}
function toggleFogShape() {
  BOARD.fogShape = BOARD.fogShape === 'brush' ? 'rect' : 'brush';
  const btn = document.getElementById('btnFogShape');
  if (btn) btn.textContent = BOARD.fogShape === 'brush' ? '🖌 Pincel' : '▭ Retângulo';
  toast(`Modo névoa: ${BOARD.fogShape === 'brush' ? 'Pincel (pintar célula)' : 'Retângulo (arrastar área)'}`);
}
function pintarFogRetangulo(gx1, gy1, gx2, gy2, reveal) {
  if (!BOARD.fogVisible) return;
  const f = getCurrentFloor();
  const minX = Math.min(gx1, gx2), maxX = Math.max(gx1, gx2);
  const minY = Math.min(gy1, gy2), maxY = Math.max(gy1, gy2);
  for (let gx = minX; gx <= maxX; gx++) {
    for (let gy = minY; gy <= maxY; gy++) {
      const key = f === 0 ? `${gx},${gy}` : `${f}:${gx},${gy}`;
      if (reveal) BOARD.fogVisible.add(key);
      else BOARD.fogVisible.delete(key);
    }
  }
  boardRender();
}
function recalcularFog() {
  if (myRole !== 'mestre') return;
  if (BOARD.playerViewTokenId) {
    const token = BOARD.tokens.find(t => t.id === BOARD.playerViewTokenId);
    if (token) {
      BOARD.fogVisible = computeVisibility(token);
      BOARD.fogManual = false;
      boardSave(); syncFogToPlayers(); boardRender();
      toast('👁 Névoa recalculada para visão de jogador.');
      return;
    }
  }
  const selected = BOARD.tokens.filter(t => BOARD.selectedTokens.has(t.id));
  if (selected.length > 0) {
    const total = new Set();
    selected.forEach(t => {
      computeVisibility(t).forEach(k => total.add(k));
    });
    BOARD.fogVisible = total;
    BOARD.fogManual = false;
    boardSave(); syncFogToPlayers(); boardRender();
    toast('👁 Névoa recalculada para ' + selected.length + ' token(s).');
  } else {
    toast('👁 Selecione um token ou ative a visão de jogador.');
  }
}
function limparFog() {
  if (myRole !== 'mestre') return;
  if (!confirm('Remover toda a névoa do mapa?')) return;
  BOARD.fogVisible = null;
  BOARD.fogManual = false;
  boardSave();
  syncFogToPlayers();
  boardRender();
  toast('🌫 Névoa removida.');
}
function syncBoardToPlayers() {
  if (myRole !== 'mestre') return;
  const filtered = BOARD.tokens.filter(t => (t.layer || 'players') !== 'gm');
  const fogData = (BOARD.fogManual && BOARD.fogVisible) ? Array.from(BOARD.fogVisible) : null;
  broadcast({ type: 'board-full', tokens: filtered, walls: BOARD.walls, shapes: BOARD.shapes, mapUrl: BOARD.mapDataUrl || null, fog: fogData, activeFloor: BOARD.activeFloor || 0, gridCols: BOARD.gridCols, gridRows: BOARD.gridRows, gridScaleVal: BOARD.gridScaleVal, gridScaleUnit: BOARD.gridScaleUnit, gridType: BOARD.gridType, lightingType: BOARD.lightingType }, null);
  const notify = { type: 'combat-sync-notify', text: 'Mestre sincronizou o tabuleiro.' };
  broadcast(notify, null); addMsg(notify);
  toast('📡 Tabuleiro sincronizado!');
}

function receberBoardSync(data) {
  if (data.tokens) BOARD.tokens = data.tokens.map(t => ({ ...t, conditions: t.conditions || [], hideName: t.hideName || false }));
  if (data.walls) { BOARD.walls = data.walls; }
  else if (!data.walls) { /* manter as existentes se não vier no payload */ }
  if (data.shapes) BOARD.shapes = data.shapes;
  if (data.mapUrl) {
    const img = new Image();
    img.onload = () => { BOARD.mapImg = img; if (isGifUrl(img.src)) getGifCanvas(img.src, img.naturalWidth, img.naturalHeight); boardRender(); };
    img.src = data.mapUrl;
    BOARD.mapDataUrl = data.mapUrl;
  } else if (data.mapUrl === null) {
    BOARD.mapImg = null; BOARD.mapDataUrl = null;
  }
  if (data.fog) BOARD.fogVisible = new Set(data.fog);
  else if (data.fog === null) BOARD.fogVisible = null;
  if (data.activeFloor !== undefined) BOARD.activeFloor = data.activeFloor;
  if (data.gridCols !== undefined) BOARD.gridCols = data.gridCols;
  if (data.gridRows !== undefined) BOARD.gridRows = data.gridRows;
  if (data.gridScaleVal !== undefined) BOARD.gridScaleVal = data.gridScaleVal;
  if (data.gridScaleUnit !== undefined) BOARD.gridScaleUnit = data.gridScaleUnit;
  if (data.gridType !== undefined) BOARD.gridType = data.gridType;
  if (data.lightingType !== undefined) BOARD.lightingType = data.lightingType;
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
  const isMaster = (myRole === 'mestre');

  // Toda a toolbar fica visível para todos (jogadores podem usar formas/reguas)
  const tbSection = document.getElementById('board-toolbar-section');
  if (tbSection) tbSection.style.display = 'flex';

  // Ferramentas exclusivas do mestre
  const masterOnlyTools = ['toolWall', 'btnLimparParedes', 'wallTypeSelect', 'toolFog', 'toolReveal', 'shapeColorPicker'];
  masterOnlyTools.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = isMaster ? '' : 'none';
  });

  // Ações exclusivas do mestre
  const actionsGroup = document.getElementById('actionsGroup');
  if (actionsGroup) actionsGroup.style.display = isMaster ? '' : 'none';

  // Camadas exclusivas do mestre
  ['layerSep', 'layerLabel', 'layerPlayers', 'layerMap', 'layerGm', 'layerGroup'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = isMaster ? '' : 'none';
  });

  // Andares exclusivos do mestre
  const floorGroup = document.getElementById('floorGroup');
  if (floorGroup) floorGroup.style.display = isMaster ? '' : 'none';

  // Grade exclusiva do mestre
  const gridGroup = document.getElementById('toolGroupGrid');
  if (gridGroup) gridGroup.style.display = isMaster ? '' : 'none';
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
  if (myRole === 'jogador') {
    document.getElementById('master-panel').style.display = 'flex';
    ['encontros','combate','fichas','notas'].forEach(t => {
      const btn = document.getElementById('tab-'+t);
      if (btn) btn.style.display = 'none';
    });
    const bestBtn = document.getElementById('bau-subtab-bestiary');
    if (bestBtn) bestBtn.style.display = 'none';
    currentBauSubtab = 'equip';
    switchTab('bau');
    switchBauSubtab('equip');
  }
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
      else if (data.type === 'board-shapes') { BOARD.shapes = data.shapes; boardRender(); }
      else if (data.type === 'board-ping') { BOARD.pings.push({ x: data.x, y: data.y, time: data.time }); boardRender(); }
      else if (data.type === 'player-targets') { BOARD.playerTargets[data.peerId] = data.targets; boardRender(); }
      else if (data.type === 'board-fog') { BOARD.fogVisible = data.fog ? new Set(data.fog) : null; boardRender(); }
      else if (data.type === 'board-map') {
        const img = new Image();
        img.onload = () => { BOARD.mapImg = img; if (isGifUrl(img.src)) getGifCanvas(img.src, img.naturalWidth, img.naturalHeight); boardRender(); };
        img.src = data.mapUrl;
      }
      else if (data.type === 'board-grid-settings') {
        if (data.gridCols !== undefined) BOARD.gridCols = data.gridCols;
        if (data.gridRows !== undefined) BOARD.gridRows = data.gridRows;
        if (data.gridScaleVal !== undefined) BOARD.gridScaleVal = data.gridScaleVal;
        if (data.gridScaleUnit !== undefined) BOARD.gridScaleUnit = data.gridScaleUnit;
        if (data.gridType !== undefined) BOARD.gridType = data.gridType;
        if (data.lightingType !== undefined) BOARD.lightingType = data.lightingType;
        boardRender();
      }
      else if (data.type === 'board-floor') {
        BOARD.activeFloor = data.activeFloor;
        setTimeout(atualizarFogJogador, 50);
        boardRender();
      }
      else if (data.type === 'trigger-prompt') {
        const t = BOARD.tokens.find(tk => tk.id === data.tokenId);
        const s = BOARD.shapes.find(sk => sk.id === data.shapeId);
        if (t && s) abrirModalEscolhaGatilho(t, s);
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
          if (players[myPeerId]) myRole = players[myPeerId].role;
          entrarNoAmbiente(); renderPlayers();
          addMsg({ type: 'system', text: 'Você entrou em "' + roomTitle + '"' });
        } else if (data.type === 'player-joined') addMsg({ type: 'system', text: data.name + ' entrou na mesa' });
        else if (data.type === 'players-update') {
          players = data.players;
          if (players[myPeerId] && players[myPeerId].role !== myRole) {
            myRole = players[myPeerId].role;
            aplicarRoleVisual();
          }
          renderPlayers();
        }
        else if (data.type === 'chat' || data.type === 'roll' || data.type === 'gif') addMsg(data);
        else if (data.type === 'combat-sync') receberSyncCombate(data.state);
        else if (data.type === 'combat-sync-notify') addMsg(data);
        // BOARD
        else if (data.type === 'board-tokens') { BOARD.tokens = data.tokens.map(t => ({ ...t, conditions: t.conditions || [], hideName: t.hideName || false })); setTimeout(atualizarFogJogador, 50); boardRender(); }
        else if (data.type === 'board-walls') { BOARD.walls = data.walls; setTimeout(atualizarFogJogador, 50); boardRender(); }
      else if (data.type === 'board-shapes') { BOARD.shapes = data.shapes; boardRender(); }
        else if (data.type === 'board-ping') { BOARD.pings.push({ x: data.x, y: data.y, time: data.time }); boardRender(); }
        else if (data.type === 'player-targets') { BOARD.playerTargets[data.peerId] = data.targets; boardRender(); }
        else if (data.type === 'board-fog') { BOARD.fogVisible = data.fog ? new Set(data.fog) : null; boardRender(); }
        else if (data.type === 'board-map') {
          const img = new Image();
          img.onload = () => { BOARD.mapImg = img; if (isGifUrl(img.src)) getGifCanvas(img.src, img.naturalWidth, img.naturalHeight); boardRender(); };
          img.src = data.mapUrl;
        }
        else if (data.type === 'board-floor') {
          BOARD.activeFloor = data.activeFloor;
          setTimeout(atualizarFogJogador, 50);
          boardRender();
        }
        else if (data.type === 'trigger-prompt') {
          const t = BOARD.tokens.find(tk => tk.id === data.tokenId);
          const s = BOARD.shapes.find(sk => sk.id === data.shapeId);
          if (t && s) abrirModalEscolhaGatilho(t, s);
        }
        else if (data.type === 'board-grid-settings') {
          if (data.gridCols !== undefined) BOARD.gridCols = data.gridCols;
          if (data.gridRows !== undefined) BOARD.gridRows = data.gridRows;
          if (data.gridScaleVal !== undefined) BOARD.gridScaleVal = data.gridScaleVal;
          if (data.gridScaleUnit !== undefined) BOARD.gridScaleUnit = data.gridScaleUnit;
          if (data.gridType !== undefined) BOARD.gridType = data.gridType;
          if (data.lightingType !== undefined) BOARD.lightingType = data.lightingType;
          boardRender();
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
  if (myRole === 'expectador') { toast('Expectadores não podem executar macros.'); return; }
  if (myRole === 'cego') return;
  const text = cmd.trim(); if (!text) return;
  let msgData;
  if (text.toLowerCase().startsWith('/r ')) {
    const res = processarRolagem(text, chatVisibility !== 'global');
    if (res) msgData = { type: 'roll', name: myName, role: myRole, text: res, time: formatTime(), visibility: chatVisibility };
    else {
      if (chatVisibility !== 'blind') addMsg({ type: 'system', text: 'Sintaxe: /r 2d6 ou /r d20+3' });
      return;
    }
  } else {
    msgData = { type: 'chat', name: myName, role: myRole, text, time: formatTime(), visibility: chatVisibility };
  }
  rotearMensagem(msgData);
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

function toggleLocalRole() {
  if (!amIHost) {
    toast('Apenas o Mestre criador da sala pode alternar entre Mestre e Jogador.');
    return;
  }
  myRole = (myRole === 'mestre') ? 'jogador' : 'mestre';
  if (players[myPeerId]) players[myPeerId].role = myRole;
  broadcast({ type: 'players-update', players }, null);
  renderPlayers();
  aplicarRoleVisual();
  toast(`Visualização alterada para: ${myRole === 'mestre' ? 'Mestre' : 'Jogador'}`);
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const btnFloating = document.getElementById('btn-sidebar-expand-floating');
  if (!sidebar) return;
  sidebar.classList.toggle('collapsed');
  const isCollapsed = sidebar.classList.contains('collapsed');
  localStorage.setItem('vtt_sidebar_collapsed', isCollapsed ? '1' : '0');
  if (btnFloating) {
    btnFloating.style.display = isCollapsed ? 'flex' : 'none';
  }
  setTimeout(() => {
    if (typeof boardResize === 'function') boardResize();
  }, 260);
}

function toggleMasterPanel() {
  const panel = document.getElementById('master-panel');
  const btnFloating = document.getElementById('btn-master-expand-floating');
  if (!panel) return;
  panel.classList.toggle('collapsed');
  const isCollapsed = panel.classList.contains('collapsed');
  localStorage.setItem('vtt_master_collapsed', isCollapsed ? '1' : '0');
  if (btnFloating) {
    btnFloating.style.display = isCollapsed ? 'flex' : 'none';
  }
  setTimeout(() => {
    if (typeof boardResize === 'function') boardResize();
  }, 260);
}

function toggleChatPanel() {
  const panel = document.querySelector('.chat-panel');
  const btnFloating = document.getElementById('btn-chat-expand-floating');
  if (!panel) return;
  panel.classList.toggle('collapsed');
  const isCollapsed = panel.classList.contains('collapsed');
  localStorage.setItem('vtt_chat_collapsed', isCollapsed ? '1' : '0');
  if (btnFloating) {
    btnFloating.style.display = isCollapsed ? 'flex' : 'none';
  }
  setTimeout(() => {
    if (typeof boardResize === 'function') boardResize();
  }, 260);
}

// ── Painel colapsável de Aventureiros ──
function togglePlayersPanel() {
  const list = document.getElementById('playersTopList');
  const arrow = document.getElementById('playersTopArrow');
  if (!list) return;
  list.classList.toggle('open');
  if (arrow) arrow.classList.toggle('open');
  localStorage.setItem('vtt_players_panel_open', list.classList.contains('open') ? '1' : '0');
}

// ── Context menu do jogador (apenas host) ──
function abrirPlayerContextMenu(e, pid) {
  e.preventDefault();
  e.stopPropagation();
  const menu = document.getElementById('playerContextMenu');
  if (!menu) return;
  fecharContextMenu();
  const role = players[pid]?.role || 'jogador';
  menu.style.left = e.clientX + 'px';
  menu.style.top = e.clientY + 'px';
  menu.style.display = 'block';
  menu.dataset.pid = pid;
  // Marca a opção atual
  menu.querySelectorAll('.context-menu-item').forEach(el => {
    el.dataset.pid = pid;
    el.classList.toggle('selected', el.textContent.trim().toLowerCase() === role);
  });
  const fechar = (ev) => {
    if (!menu.contains(ev.target)) {
      menu.style.display = 'none';
      document.removeEventListener('click', fechar);
    }
  };
  setTimeout(() => document.addEventListener('click', fechar), 10);
}

function changePlayerRole(pid, role) {
  if (!amIHost) { toast('Apenas o criador da mesa pode alterar funções.'); return; }
  if (!players[pid]) return;
  if (role === players[pid].role) { fecharContextMenu(); return; }
  players[pid].role = role;
  renderPlayers();
  broadcast({ type: 'players-update', players }, null);
  // Se mudou o próprio papel (host alterou a si mesmo)
  if (pid === myPeerId) {
    myRole = role;
    // Atualiza painéis de mestre
    if (role === 'mestre') {
      document.getElementById('invite-area').style.display = 'block';
      document.getElementById('master-panel').style.display = 'flex';
      document.getElementById('btn-convidar').style.display = '';
      document.getElementById('btn-ficha').style.display = 'none';
      initBau();
    } else {
      document.getElementById('invite-area').style.display = 'none';
      document.getElementById('master-panel').style.display = 'none';
      document.getElementById('btn-convidar').style.display = 'none';
      document.getElementById('btn-ficha').style.display = 'inline-flex';
    }
    aplicarRoleVisual();
  }
  fecharContextMenu();
}

function aplicarRoleVisual() {
  const b = document.getElementById('role-badge');
  if (b) {
    const label = myRole === 'mestre' ? 'Mestre' : myRole === 'expectador' ? 'Expectador' : myRole === 'cego' ? 'Cego' : 'Jogador';
    b.textContent = label;
    b.className = 'role-badge role-' + myRole;
    b.title = amIHost ? 'Clique para alternar entre Mestre e Jogador' : 'Sua função na mesa';
  }
  // Painéis de mestre
  if (myRole === 'mestre') {
    document.getElementById('invite-area').style.display = amIHost ? 'block' : 'none';
    document.getElementById('master-panel').style.display = 'flex';
    document.getElementById('btn-convidar').style.display = amIHost ? '' : 'none';
    document.getElementById('btn-ficha').style.display = 'none';
    if (amIHost) initBau();
  } else {
    document.getElementById('invite-area').style.display = 'none';
    document.getElementById('master-panel').style.display = 'none';
    document.getElementById('btn-convidar').style.display = 'none';
    document.getElementById('btn-ficha').style.display = 'inline-flex';
  }
  boardSetupRole();
  aplicarCegoVisual();
  atualizarFogJogador();
  boardRender();
}

function aplicarCegoVisual() {
  const isCego = myRole === 'cego';
  const canvas = document.getElementById('boardCanvas');
  const wrap = document.getElementById('boardCanvasWrap');
  if (isCego) {
    if (canvas) canvas.style.display = 'none';
    if (wrap) wrap.style.display = 'none';
    // Bloqueia chat
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.querySelector('.send-btn');
    if (chatInput) { chatInput.disabled = true; chatInput.placeholder = 'Você está cego...'; }
    if (sendBtn) sendBtn.disabled = true;
    document.getElementById('chat-messages')?.classList.add('hidden');
  } else {
    if (canvas) canvas.style.display = '';
    if (wrap) wrap.style.display = '';
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.querySelector('.send-btn');
    if (chatInput) { chatInput.disabled = myRole === 'expectador'; chatInput.placeholder = myRole === 'expectador' ? 'Apenas observando...' : 'Digite sua mensagem...'; }
    if (sendBtn) sendBtn.disabled = myRole === 'expectador';
    document.getElementById('chat-messages')?.classList.remove('hidden');
  }
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
  // Inicializa o editor de imagens
  initImageEditor();

  // Inicialização do estado recolhido dos painéis
  if (localStorage.getItem('vtt_sidebar_collapsed') === '1') {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.add('collapsed');
    const btn = document.getElementById('btn-sidebar-expand-floating');
    if (btn) btn.style.display = 'flex';
  }
  if (localStorage.getItem('vtt_master_collapsed') === '1') {
    const panel = document.getElementById('master-panel');
    if (panel) panel.classList.add('collapsed');
    const btn = document.getElementById('btn-master-expand-floating');
    if (btn) btn.style.display = 'flex';
  }
  if (localStorage.getItem('vtt_chat_collapsed') === '1') {
    const panel = document.querySelector('.chat-panel');
    if (panel) panel.classList.add('collapsed');
    const btn = document.getElementById('btn-chat-expand-floating');
    if (btn) btn.style.display = 'flex';
  }
  if (localStorage.getItem('vtt_players_panel_open') === '1') {
    const list = document.getElementById('playersTopList');
    const arrow = document.getElementById('playersTopArrow');
    if (list) list.classList.add('open');
    if (arrow) arrow.classList.add('open');
  }
  setTimeout(() => {
    if (typeof boardResize === 'function') boardResize();
  }, 500);
  // Atalhos globais
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && BOARD.playerViewTokenId) {
      exitPlayerView();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) redoBoard(); else undoBoard();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
      e.preventDefault();
      redoBoard();
      return;
    }
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
      const ativo = document.activeElement;
      if (ativo && (ativo.tagName === 'INPUT' || ativo.tagName === 'TEXTAREA' || ativo.contentEditable === 'true')) return;
      e.preventDefault();
      moverTokenPorSeta(e.key);
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

// ══════════════════════════════════════════════════════
//  EDITOR DE IMAGENS
// ══════════════════════════════════════════════════════

const editorState = {
  active: false,
  target: 'general',
  imageLoaded: false,
  originalImg: null,
  canvas: null,
  ctx: null,
  overlayCanvas: null,
  overlayCtx: null,
  mode: 'crop',
  cropRatio: 'free',
  cropBox: { x: 0, y: 0, w: 0, h: 0 },
  activeHandle: null,
  cropMinSize: 20,
  brushMode: 'draw',
  brushColor: '#ff0000',
  brushSize: 10,
  isDrawing: false,
  lastX: 0,
  lastY: 0,
  brushCursorPos: null,
  undoStack: [],
  redoStack: [],
  maxStackSize: 20,
  eyedropperActive: false,
  backupCanvas: null
};

function abrirEditorImagem(url, target) {
  editorState.active = true;
  editorState.target = target;
  editorState.undoStack = [];
  editorState.redoStack = [];
  editorState.backupCanvas = null;
  
  document.getElementById('imageEditorModal').style.display = 'flex';
  document.getElementById('btnEditorApplyToken').style.display = (target === 'token') ? 'inline-block' : 'none';
  
  const applyObjectBtn = document.getElementById('btnEditorApplyObject');
  if (applyObjectBtn) {
    if (target === 'edit-object') {
      applyObjectBtn.textContent = '✓ Salvar Objeto';
      applyObjectBtn.style.display = 'inline-block';
    } else {
      applyObjectBtn.textContent = 'Usar como Objeto';
      applyObjectBtn.style.display = (target === 'token') ? 'none' : 'inline-block';
    }
  }
  
  document.getElementById('btnEditorApplyMap').style.display = (target === 'map' || target === 'general') ? 'inline-block' : 'none';
  
  resetFiltersStateAndUI();
  setEditorTab('crop');
  setEditorCropRatio('free');
  
  const welcome = document.getElementById('editorWelcome');
  const canvasContainer = document.getElementById('editorCanvasContainer');
  
  if (url) {
    welcome.style.display = 'none';
    canvasContainer.style.display = 'inline-block';
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setupEditorWithImage(img);
    };
    img.onerror = () => {
      toast('Erro ao carregar imagem no editor.');
      welcome.style.display = 'flex';
      canvasContainer.style.display = 'none';
      editorState.imageLoaded = false;
    };
    img.src = url;
  } else {
    welcome.style.display = 'flex';
    canvasContainer.style.display = 'none';
    editorState.imageLoaded = false;
  }
}

function abrirEditorImagemToken() {
  if (tfSelectedImage) {
    abrirEditorImagem(tfSelectedImage, 'token');
  } else {
    abrirEditorImagem('', 'token');
    toast('Nenhuma imagem no token. Escolha uma no editor.');
  }
}

function abrirEditorImagemGeral() {
  if (BOARD.mapDataUrl) {
    abrirEditorImagem(BOARD.mapDataUrl, 'general');
  } else {
    abrirEditorImagem('', 'general');
  }
}

function setupEditorWithImage(img) {
  const canvas = document.getElementById('editorCanvas');
  const overlay = document.getElementById('editorOverlayCanvas');
  
  editorState.canvas = canvas;
  editorState.ctx = canvas.getContext('2d');
  editorState.overlayCanvas = overlay;
  editorState.overlayCtx = overlay.getContext('2d');
  
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  
  editorState.ctx.clearRect(0, 0, canvas.width, canvas.height);
  editorState.ctx.drawImage(img, 0, 0);
  
  editorState.imageLoaded = true;
  document.getElementById('editorWelcome').style.display = 'none';
  document.getElementById('editorCanvasContainer').style.display = 'inline-block';
  
  resizeOverlayCanvas();
  resetEditorCropBox();
  
  pushToUndoStack();
  drawOverlay();
}

function resizeOverlayCanvas() {
  const canvas = document.getElementById('editorCanvas');
  const overlay = document.getElementById('editorOverlayCanvas');
  if (!canvas || !overlay) return;
  overlay.width = canvas.clientWidth;
  overlay.height = canvas.clientHeight;
  overlay.style.width = canvas.clientWidth + 'px';
  overlay.style.height = canvas.clientHeight + 'px';
}

window.addEventListener('resize', () => {
  if (editorState.active && editorState.imageLoaded) {
    const oldW = editorState.overlayCanvas.width;
    const oldH = editorState.overlayCanvas.height;
    
    resizeOverlayCanvas();
    
    if (oldW > 0 && oldH > 0) {
      const scaleX = editorState.overlayCanvas.width / oldW;
      const scaleY = editorState.overlayCanvas.height / oldH;
      editorState.cropBox.x *= scaleX;
      editorState.cropBox.w *= scaleX;
      editorState.cropBox.y *= scaleY;
      editorState.cropBox.h *= scaleY;
    }
    drawOverlay();
  }
});

function drawOverlay() {
  const overlay = editorState.overlayCanvas;
  const ctx = editorState.overlayCtx;
  if (!overlay || !ctx) return;
  
  ctx.clearRect(0, 0, overlay.width, overlay.height);
  
  if (editorState.mode === 'crop') {
    const box = editorState.cropBox;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, overlay.width, box.y);
    ctx.fillRect(0, box.y + box.h, overlay.width, overlay.height - (box.y + box.h));
    ctx.fillRect(0, box.y, box.x, box.h);
    ctx.fillRect(box.x + box.w, box.y, overlay.width - (box.x + box.w), box.h);
    
    ctx.strokeStyle = '#c9903a';
    ctx.lineWidth = 2;
    
    if (editorState.cropRatio === 'circle') {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(box.x + box.w/2, box.y + box.h/2, Math.min(box.w, box.h)/2, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
      
      ctx.beginPath();
      ctx.arc(box.x + box.w/2, box.y + box.h/2, Math.min(box.w, box.h)/2, 0, Math.PI*2);
      ctx.stroke();
      
      ctx.strokeStyle = 'rgba(201, 144, 58, 0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(box.x, box.y, box.w, box.h);
    } else {
      ctx.strokeRect(box.x, box.y, box.w, box.h);
    }
    
    const handleSize = 8;
    ctx.fillStyle = '#e8b96a';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    
    const corners = [
      { x: box.x, y: box.y },
      { x: box.x + box.w, y: box.y },
      { x: box.x + box.w, y: box.y + box.h },
      { x: box.x, y: box.y + box.h }
    ];
    
    corners.forEach(c => {
      ctx.fillRect(c.x - handleSize/2, c.y - handleSize/2, handleSize, handleSize);
      ctx.strokeRect(c.x - handleSize/2, c.y - handleSize/2, handleSize, handleSize);
    });
  } else if (editorState.mode === 'brush' && editorState.brushCursorPos) {
    const pos = editorState.brushCursorPos;
    const clientBrushRadius = editorState.brushSize * (overlay.width / editorState.canvas.width) / 2;
    
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, Math.max(1, clientBrushRadius), 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, Math.max(1, clientBrushRadius), 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
}

function setEditorCropRatio(ratio) {
  editorState.cropRatio = ratio;
  document.getElementById('btnCropFree').classList.toggle('active', ratio === 'free');
  document.getElementById('btnCrop11').classList.toggle('active', ratio === '1:1');
  document.getElementById('btnCropCircle').classList.toggle('active', ratio === 'circle');
  resetEditorCropBox();
  drawOverlay();
}

function resetEditorCropBox() {
  const overlay = editorState.overlayCanvas;
  if (!overlay) return;
  
  if (editorState.cropRatio === 'free') {
    editorState.cropBox = {
      x: overlay.width * 0.05,
      y: overlay.height * 0.05,
      w: overlay.width * 0.9,
      h: overlay.height * 0.9
    };
  } else {
    const size = Math.min(overlay.width, overlay.height) * 0.8;
    editorState.cropBox = {
      x: (overlay.width - size) / 2,
      y: (overlay.height - size) / 2,
      w: size,
      h: size
    };
  }
}

function setEditorTab(tab) {
  editorState.mode = tab;
  document.getElementById('tabEditorCrop').classList.toggle('active', tab === 'crop');
  document.getElementById('tabEditorColor').classList.toggle('active', tab === 'color');
  document.getElementById('tabEditorBrush').classList.toggle('active', tab === 'brush');
  
  document.getElementById('editorContentCrop').classList.toggle('active', tab === 'crop');
  document.getElementById('editorContentColor').classList.toggle('active', tab === 'color');
  document.getElementById('editorContentBrush').classList.toggle('active', tab === 'brush');
  
  if (tab !== 'color' && editorState.backupCanvas) {
    applyFilters();
  }
  
  if (tab !== 'brush') {
    editorState.brushCursorPos = null;
  }
  
  drawOverlay();
}

function handleCropStart(mx, my) {
  const box = editorState.cropBox;
  const handleSize = 14;
  let active = null;
  
  if (Math.hypot(mx - box.x, my - box.y) < handleSize) active = 'nw';
  else if (Math.hypot(mx - (box.x + box.w), my - box.y) < handleSize) active = 'ne';
  else if (Math.hypot(mx - (box.x + box.w), my - (box.y + box.h)) < handleSize) active = 'se';
  else if (Math.hypot(mx - box.x, my - (box.y + box.h)) < handleSize) active = 'sw';
  else if (mx >= box.x && mx <= box.x + box.w && my >= box.y && my <= box.y + box.h) active = 'move';
  
  if (active) {
    editorState.activeHandle = active;
    editorState.dragStart = { x: mx, y: my, box: { ...box } };
  }
}

function handleCropMove(mx, my) {
  if (!editorState.activeHandle) return;
  const oCanvas = editorState.overlayCanvas;
  const dx = mx - editorState.dragStart.x;
  const dy = my - editorState.dragStart.y;
  const startBox = editorState.dragStart.box;
  const handle = editorState.activeHandle;
  const minSize = editorState.cropMinSize;
  
  let newBox = { ...editorState.cropBox };
  
  if (handle === 'move') {
    newBox.x = Math.max(0, Math.min(oCanvas.width - startBox.w, startBox.x + dx));
    newBox.y = Math.max(0, Math.min(oCanvas.height - startBox.h, startBox.y + dy));
  } else {
    if (handle === 'nw') {
      newBox.x = Math.max(0, Math.min(startBox.x + startBox.w - minSize, startBox.x + dx));
      newBox.w = startBox.x + startBox.w - newBox.x;
      newBox.y = Math.max(0, Math.min(startBox.y + startBox.h - minSize, startBox.y + dy));
      newBox.h = startBox.y + startBox.h - newBox.y;
    } else if (handle === 'ne') {
      newBox.w = Math.max(minSize, Math.min(oCanvas.width - startBox.x, startBox.w + dx));
      newBox.y = Math.max(0, Math.min(startBox.y + startBox.h - minSize, startBox.y + dy));
      newBox.h = startBox.y + startBox.h - newBox.y;
    } else if (handle === 'se') {
      newBox.w = Math.max(minSize, Math.min(oCanvas.width - startBox.x, startBox.w + dx));
      newBox.h = Math.max(minSize, Math.min(oCanvas.height - startBox.y, startBox.h + dy));
    } else if (handle === 'sw') {
      newBox.x = Math.max(0, Math.min(startBox.x + startBox.w - minSize, startBox.x + dx));
      newBox.w = startBox.x + startBox.w - newBox.x;
      newBox.h = Math.max(minSize, Math.min(oCanvas.height - startBox.y, startBox.h + dy));
    }
    
    if (editorState.cropRatio === '1:1' || editorState.cropRatio === 'circle') {
      const size = Math.min(newBox.w, newBox.h);
      if (handle === 'nw') {
        newBox.x = startBox.x + startBox.w - size;
        newBox.y = startBox.y + startBox.h - size;
      } else if (handle === 'ne') {
        newBox.y = startBox.y + startBox.h - size;
      } else if (handle === 'sw') {
        newBox.x = startBox.x + startBox.w - size;
      }
      newBox.w = size;
      newBox.h = size;
    }
  }
  
  editorState.cropBox = newBox;
  drawOverlay();
}

function handleBrushStart(mx, my) {
  const scale = editorState.canvas.width / editorState.overlayCanvas.width;
  const imgX = mx * scale;
  const imgY = my * scale;
  
  editorState.isDrawing = true;
  editorState.lastX = imgX;
  editorState.lastY = imgY;
  
  pushToUndoStack();
  drawBrushStroke(imgX, imgY, imgX, imgY);
}

function handleBrushMove(mx, my) {
  const scale = editorState.canvas.width / editorState.overlayCanvas.width;
  const imgX = mx * scale;
  const imgY = my * scale;
  
  if (editorState.isDrawing) {
    drawBrushStroke(editorState.lastX, editorState.lastY, imgX, imgY);
    editorState.lastX = imgX;
    editorState.lastY = imgY;
  }
  
  editorState.brushCursorPos = { x: mx, y: my };
  drawOverlay();
}

function drawBrushStroke(x1, y1, x2, y2) {
  const ctx = editorState.ctx;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = editorState.brushSize;
  
  if (editorState.brushMode === 'erase') {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = editorState.brushColor;
  }
  ctx.stroke();
  ctx.restore();
}

function applyCrop() {
  const canvas = editorState.canvas;
  const overlay = editorState.overlayCanvas;
  if (!canvas || !overlay || !editorState.imageLoaded) return;
  
  const scale = canvas.width / overlay.width;
  const box = editorState.cropBox;
  const ix = box.x * scale;
  const iy = box.y * scale;
  const iw = box.w * scale;
  const ih = box.h * scale;
  
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = iw;
  tempCanvas.height = ih;
  const tempCtx = tempCanvas.getContext('2d');
  
  if (editorState.cropRatio === 'circle') {
    tempCtx.beginPath();
    tempCtx.arc(iw / 2, ih / 2, Math.min(iw, ih) / 2, 0, Math.PI * 2);
    tempCtx.clip();
  }
  
  tempCtx.drawImage(canvas, ix, iy, iw, ih, 0, 0, iw, ih);
  
  canvas.width = iw;
  canvas.height = ih;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, iw, ih);
  ctx.drawImage(tempCanvas, 0, 0);
  
  resizeOverlayCanvas();
  resetEditorCropBox();
  pushToUndoStack();
  drawOverlay();
  
  toast('Imagem recortada!');
}

function updateEditorFilters() {
  const canvas = editorState.canvas;
  const ctx = editorState.ctx;
  if (!canvas || !ctx || !editorState.imageLoaded) return;
  
  if (!editorState.backupCanvas) {
    editorState.backupCanvas = document.createElement('canvas');
    editorState.backupCanvas.width = canvas.width;
    editorState.backupCanvas.height = canvas.height;
    const bCtx = editorState.backupCanvas.getContext('2d');
    bCtx.drawImage(canvas, 0, 0);
  }
  
  const brightness = document.getElementById('slideBrightness').value;
  const contrast = document.getElementById('slideContrast').value;
  const saturation = document.getElementById('slideSaturation').value;
  const hue = document.getElementById('slideHue').value;
  const grayscale = document.getElementById('slideGrayscale').value;
  const invert = document.getElementById('slideInvert').value;
  
  document.getElementById('valBrightness').textContent = brightness + '%';
  document.getElementById('valContrast').textContent = contrast + '%';
  document.getElementById('valSaturation').textContent = saturation + '%';
  document.getElementById('valHue').textContent = hue + '°';
  document.getElementById('valGrayscale').textContent = grayscale + '%';
  document.getElementById('valInvert').textContent = invert + '%';
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg) grayscale(${grayscale}%) invert(${invert}%)`;
  ctx.drawImage(editorState.backupCanvas, 0, 0);
  ctx.restore();
}

function applyFilters() {
  if (!editorState.backupCanvas) return;
  editorState.backupCanvas = null;
  pushToUndoStack();
  toast('Filtros aplicados!');
}

function resetFilters() {
  document.getElementById('slideBrightness').value = 100;
  document.getElementById('slideContrast').value = 100;
  document.getElementById('slideSaturation').value = 100;
  document.getElementById('slideHue').value = 0;
  document.getElementById('slideGrayscale').value = 0;
  document.getElementById('slideInvert').value = 0;
  
  document.getElementById('valBrightness').textContent = '100%';
  document.getElementById('valContrast').textContent = '100%';
  document.getElementById('valSaturation').textContent = '100%';
  document.getElementById('valHue').textContent = '0°';
  document.getElementById('valGrayscale').textContent = '0%';
  document.getElementById('valInvert').textContent = '0%';
  
  if (editorState.backupCanvas) {
    const canvas = editorState.canvas;
    const ctx = editorState.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(editorState.backupCanvas, 0, 0);
    editorState.backupCanvas = null;
    toast('Filtros resetados.');
  }
}

function resetFiltersStateAndUI() {
  document.getElementById('slideBrightness').value = 100;
  document.getElementById('slideContrast').value = 100;
  document.getElementById('slideSaturation').value = 100;
  document.getElementById('slideHue').value = 0;
  document.getElementById('slideGrayscale').value = 0;
  document.getElementById('slideInvert').value = 0;
  
  document.getElementById('valBrightness').textContent = '100%';
  document.getElementById('valContrast').textContent = '100%';
  document.getElementById('valSaturation').textContent = '100%';
  document.getElementById('valHue').textContent = '0°';
  document.getElementById('valGrayscale').textContent = '0%';
  document.getElementById('valInvert').textContent = '0%';
  
  editorState.backupCanvas = null;
}

function updateBrushSize(val) {
  editorState.brushSize = parseInt(val);
  document.getElementById('valBrushSize').textContent = val + 'px';
  drawOverlay();
}

function setBrushMode(mode) {
  editorState.brushMode = mode;
  document.getElementById('btnBrushModeDraw').classList.toggle('active', mode === 'draw');
  document.getElementById('btnBrushModeErase').classList.toggle('active', mode === 'erase');
}

function activateEyedropper() {
  editorState.eyedropperActive = true;
  document.getElementById('editorOverlayCanvas').style.cursor = 'crosshair';
  toast('Clique na imagem para copiar a cor');
}

function sampleEyedropperColor(mx, my) {
  const scale = editorState.canvas.width / editorState.overlayCanvas.width;
  const ix = Math.floor(mx * scale);
  const iy = Math.floor(my * scale);
  
  if (ix >= 0 && ix < editorState.canvas.width && iy >= 0 && iy < editorState.canvas.height) {
    const imgData = editorState.ctx.getImageData(ix, iy, 1, 1).data;
    if (imgData[3] > 0) {
      const hexColor = rgbToHex(imgData[0], imgData[1], imgData[2]);
      editorState.brushColor = hexColor;
      document.getElementById('editorBrushColor').value = hexColor;
      toast(`Cor copiada: ${hexColor}`);
    } else {
      toast('Pixel transparente!');
    }
  }
  editorState.eyedropperActive = false;
  document.getElementById('editorOverlayCanvas').style.cursor = 'default';
}

function rgbToHex(r, g, b) {
  const toHex = x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

function promptEditorUrl() {
  const url = prompt('Cole a URL da imagem:');
  if (url && url.trim()) {
    carregarImagemEditor(url.trim());
  }
}

function handleEditorFileLoad(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    carregarImagemEditor(e.target.result);
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function handleEditorFileDrop(e) {
  const file = e.dataTransfer.files && e.dataTransfer.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    toast('Por favor, arraste apenas arquivos de imagem.');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    carregarImagemEditor(e.target.result);
  };
  reader.readAsDataURL(file);
}

function carregarImagemEditor(url) {
  const welcome = document.getElementById('editorWelcome');
  const canvasContainer = document.getElementById('editorCanvasContainer');
  welcome.style.display = 'none';
  canvasContainer.style.display = 'inline-block';
  
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    setupEditorWithImage(img);
  };
  img.onerror = () => {
    toast('Erro ao carregar imagem selecionada.');
    if (!editorState.imageLoaded) {
      welcome.style.display = 'flex';
      canvasContainer.style.display = 'none';
    }
  };
  img.src = url;
}

function pushToUndoStack() {
  const canvas = editorState.canvas;
  if (!canvas) return;
  const state = {
    width: canvas.width,
    height: canvas.height,
    dataUrl: canvas.toDataURL()
  };
  editorState.undoStack.push(state);
  if (editorState.undoStack.length > editorState.maxStackSize) {
    editorState.undoStack.shift();
  }
  editorState.redoStack = [];
  updateUndoRedoButtons();
}

function editorUndo() {
  if (editorState.undoStack.length <= 1) return;
  const current = editorState.undoStack.pop();
  editorState.redoStack.push(current);
  
  const previous = editorState.undoStack[editorState.undoStack.length - 1];
  restoreEditorState(previous);
}

function editorRedo() {
  if (editorState.redoStack.length === 0) return;
  const state = editorState.redoStack.pop();
  editorState.undoStack.push(state);
  restoreEditorState(state);
}

function restoreEditorState(state) {
  const canvas = editorState.canvas;
  const ctx = editorState.ctx;
  const img = new Image();
  img.onload = () => {
    canvas.width = state.width;
    canvas.height = state.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    resizeOverlayCanvas();
    resetEditorCropBox();
    drawOverlay();
  };
  img.src = state.dataUrl;
  updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
  const undoBtn = document.getElementById('btnEditorUndo');
  const redoBtn = document.getElementById('btnEditorRedo');
  if (undoBtn) undoBtn.disabled = (editorState.undoStack.length <= 1);
  if (redoBtn) redoBtn.disabled = (editorState.redoStack.length === 0);
}

function fecharEditorImagem() {
  if (editorState.undoStack.length > 1) {
    if (!confirm('Deseja fechar o editor? Suas alterações não salvas serão perdidas.')) {
      return;
    }
  }
  document.getElementById('imageEditorModal').style.display = 'none';
  editorState.active = false;
  editorState.imageLoaded = false;
  editorState.undoStack = [];
  editorState.redoStack = [];
  editorState.backupCanvas = null;
}

function editorExportToken() {
  if (!editorState.imageLoaded) return;
  if (editorState.backupCanvas) applyFilters();
  
  const dataUrl = editorState.canvas.toDataURL();
  definirImagemToken(dataUrl);
  
  document.getElementById('imageEditorModal').style.display = 'none';
  editorState.active = false;
  toast('Imagem editada aplicada ao Token!');
}

function editorExportMap() {
  if (!editorState.imageLoaded) return;
  if (editorState.backupCanvas) applyFilters();
  
  const dataUrl = editorState.canvas.toDataURL();
  
  const img = new Image();
  img.onload = () => {
    snapshotBoard();
    BOARD.mapImg = img;
    BOARD.mapDataUrl = dataUrl;
    boardRender();
    
    if (myRole === 'mestre' || amIHost) {
      broadcast({ type: 'board-map', mapUrl: dataUrl }, null);
    }
    
    document.getElementById('imageEditorModal').style.display = 'none';
    editorState.active = false;
    toast('Imagem editada aplicada como Mapa!');
  };
  img.src = dataUrl;
}

function editorExportDownload() {
  if (!editorState.imageLoaded) return;
  if (editorState.backupCanvas) applyFilters();
  
  const dataUrl = editorState.canvas.toDataURL();
  const link = document.createElement('a');
  link.download = 'imagem_editada_' + Date.now() + '.png';
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast('Download iniciado!');
}

function initImageEditorEvents() {
  const overlay = document.getElementById('editorOverlayCanvas');
  if (!overlay) return;
  
  function getMousePos(e) {
    const rect = overlay.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
  
  overlay.addEventListener('mousedown', (e) => {
    if (!editorState.imageLoaded) return;
    const pos = getMousePos(e);
    if (editorState.eyedropperActive) {
      sampleEyedropperColor(pos.x, pos.y);
      return;
    }
    if (editorState.mode === 'crop') {
      handleCropStart(pos.x, pos.y);
    } else if (editorState.mode === 'brush') {
      handleBrushStart(pos.x, pos.y);
    }
  });
  
  overlay.addEventListener('mousemove', (e) => {
    if (!editorState.imageLoaded) return;
    const pos = getMousePos(e);
    if (editorState.mode === 'crop') {
      handleCropMove(pos.x, pos.y);
    } else if (editorState.mode === 'brush') {
      handleBrushMove(pos.x, pos.y);
    }
  });
  
  const endHandler = () => {
    if (editorState.mode === 'crop') {
      editorState.activeHandle = null;
    } else if (editorState.mode === 'brush') {
      editorState.isDrawing = false;
    }
  };
  
  overlay.addEventListener('mouseup', endHandler);
  overlay.addEventListener('mouseleave', () => {
    endHandler();
    if (editorState.mode === 'brush') {
      editorState.brushCursorPos = null;
      drawOverlay();
    }
  });
  
  overlay.addEventListener('touchstart', (e) => {
    if (!editorState.imageLoaded) return;
    e.preventDefault();
    const pos = getMousePos(e);
    if (editorState.eyedropperActive) {
      sampleEyedropperColor(pos.x, pos.y);
    } else if (editorState.mode === 'crop') {
      handleCropStart(pos.x, pos.y);
    } else if (editorState.mode === 'brush') {
      handleBrushStart(pos.x, pos.y);
    }
  }, { passive: false });
  
  overlay.addEventListener('touchmove', (e) => {
    if (!editorState.imageLoaded) return;
    e.preventDefault();
    const pos = getMousePos(e);
    if (editorState.mode === 'crop') {
      handleCropMove(pos.x, pos.y);
    } else if (editorState.mode === 'brush') {
      handleBrushMove(pos.x, pos.y);
    }
  }, { passive: false });
  
  overlay.addEventListener('touchend', endHandler);
}

function initImageEditor() {
  initImageEditorEvents();
  document.getElementById('editorBrushColor')?.addEventListener('input', (e) => {
    editorState.brushColor = e.target.value;
  });
}

function editorExportObject() {
  if (!editorState.imageLoaded) return;
  if (editorState.backupCanvas) applyFilters();
  
  const dataUrl = editorState.canvas.toDataURL();
  
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    tokenImageCache[dataUrl] = img;
    
    if (editorState.target === 'edit-object') {
      const token = BOARD.tokens.find(t => t.id === editorState.editingObjectId);
      if (token) {
        token.imageUrl = dataUrl;
        boardSave();
        boardRender();
        syncBoardTokensToPlayers();
        toast('◻ Objeto atualizado!');
      } else {
        toast('Erro: Objeto não encontrado para edição.');
      }
      document.getElementById('imageEditorModal').style.display = 'none';
      editorState.active = false;
      return;
    }
    
    const cx = BOARD.wrap.clientWidth / 2;
    const cy = BOARD.wrap.clientHeight / 2;
    const { gx, gy } = canvasToGrid(cx, cy);
    const s = 2; // tamanho padrão em grid cells
    
    let sizeX = s, sizeY = s;
    if (img.naturalWidth && img.naturalHeight) {
      const iw = img.naturalWidth, ih = img.naturalHeight;
      if (iw > ih) {
        sizeY = s * (ih / iw);
      } else {
        sizeX = s * (iw / ih);
      }
    }
    
    const newId = 'tk' + Date.now() + Math.floor(Math.random()*9999);
    
    BOARD.tokens.push({
      id: newId,
      type: 'object',
      name: 'Objeto',
      size: s,
      sizeX: sizeX,
      sizeY: sizeY,
      imageUrl: dataUrl,
      borderType: 'solid', borderWidth: 1.5, borderColor: '#ffffff',
      layer: 'map',
      z: 0,
      conditions: [],
      hideName: true,
      gx: Math.max(0, gx), gy: Math.max(0, gy)
    });
    
    setBoardLayer('map');
    BOARD.selectedTokens.clear();
    BOARD.selectedTokens.add(newId);
    boardSave();
    boardRender();
    syncBoardTokensToPlayers();
    
    document.getElementById('imageEditorModal').style.display = 'none';
    editorState.active = false;
    toast(`◻ Objeto criado (${s}×${s}) na camada Mapa! Arraste para posicionar.`);
  };
  img.src = dataUrl;
}

function contextEditObject() {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    editorState.editingObjectId = token.id;
    abrirEditorImagem(token.imageUrl || '', 'edit-object');
  }
  fecharContextMenu();
}

