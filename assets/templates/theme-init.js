/**
 * ARSENAL – INICIALIZADOR DE TEMA
 * Arquivo: assets/templates/theme-init.js
 *
 * Como usar em um novo app:
 *   No <head> do HTML (antes do </body> ou com defer):
 *     <script src="../assets/templates/theme-init.js"></script>
 *
 *   Ou copie a função initTheme() diretamente para o seu script.js
 *   e chame-a dentro do DOMContentLoaded.
 *
 * Requer no HTML:
 *   <button class="theme-btn" data-theme="blood"   title="Tema Tormenta">🩸</button>
 *   <button class="theme-btn" data-theme="dark"    title="Tema Sombras">🌑</button>
 *   <button class="theme-btn" data-theme="classic" title="Tema Clássico">📜</button>
 *
 * Temas disponíveis:
 *   'blood'   → Tema Tormenta/Sangue (padrão, sem classe no body)
 *   'dark'    → Tema Sombras         (classe .theme-dark)
 *   'classic' → Tema Clássico        (classe .theme-classic)
 *
 * Chave do localStorage: 't20_theme'
 */

(function initTheme() {
  var STORAGE_KEY = 't20_theme';
  var body = document.body;

  /**
   * Aplica o tema ao <body> e marca o botão ativo.
   * @param {string} theme  'blood' | 'dark' | 'classic'
   */
  function applyTheme(theme) {
    // Remove todas as classes de tema antes de aplicar a nova
    body.classList.remove('theme-dark', 'theme-classic');

    if (theme === 'dark')    body.classList.add('theme-dark');
    if (theme === 'classic') body.classList.add('theme-classic');
    // 'blood' é o padrão — sem classe extra necessária

    // Marca o botão correspondente como ativo
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });

    // Persiste no localStorage
    localStorage.setItem(STORAGE_KEY, theme);
  }

  /**
   * Recupera o tema salvo, com fallback para chaves legadas de outros apps
   * e para o tema padrão 'blood' caso nenhum esteja salvo.
   * @returns {string}
   */
  function getSavedTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;

    // Compatibilidade com chaves usadas em apps mais antigos do Arsenal
    var legacy = localStorage.getItem('diceTheme') || localStorage.getItem('hubTheme');
    if (legacy === 'dark')                        return 'dark';
    if (legacy === 'classic' || legacy === 'light') return 'classic';

    return 'blood'; // padrão
  }

  // --- Inicialização ---
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getSavedTheme());

    // Registra os listeners nos botões de tema
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(btn.dataset.theme);
      });
    });
  });

  // Expõe a função globalmente caso outro script precise trocar o tema
  window.arsenalApplyTheme = applyTheme;
})();
