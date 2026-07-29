document.addEventListener('DOMContentLoaded', function () {
    const contentArea = document.getElementById('content-area');

    if (typeof DATABASE === 'undefined') {
        contentArea.innerHTML = `
            <div id="sticky-text">
                Erro: <strong>database.js</strong> não encontrado.<br>
                Certifique-se de que o arquivo database.js está na mesma pasta.
            </div>
        `;
        return;
    }

    // --- RENDERIZA O HTML A PARTIR DO JSON ---
    function renderDatabase() {
        let html = '';
        let passedJda = false;
        DATABASE.forEach(edition => {
            const match = edition.id?.match(/db(\d+)/);
            const isPreJda = match && parseInt(match[1], 10) <= 182;

            if (isPreJda && !passedJda) {
                passedJda = true;
                html += `
                <div class="jda-warning">
                    <p><strong>Conteúdo anterior ao Jogo do Ano</strong></p>
                    <p>As edições abaixo são da versão anterior de <strong>Tormenta20</strong>, anteriores ao lançamento do <strong>Jogo do Ano</strong>. Com a publicação da nova edição, estas respostas podem estar desatualizadas.</p>
                </div>`;
            }

            const articles = edition.artigos.map(art => {
                const classes = ['article', 'searchable', art.sistema, ...art.tags].join(' ');
                return `
                <div class="${classes}">
                    <p><strong>${art.pergunta}</strong></p>
                    <p><em>${art.conselheiro}</em></p>
                    <p>${art.resposta}</p>
                </div>`;
            }).join('\n');

            html += `
            <div class="edition" id="${edition.id}" data-label="${edition.label}">
                <button class="edition-title">
                    <span>${edition.label}</span><span class="icon">▶</span>
                </button>
                <div class="edition-content">
                    ${articles}
                </div>
            </div>`;
        });
        return html;
    }

    contentArea.innerHTML = renderDatabase();

    // --- ACORDEÃO ---
    const editions = document.querySelectorAll('.edition');

    function openAccordion(edition) {
        const content = edition.querySelector('.edition-content');
        if (!content || edition.classList.contains('active')) return;
        edition.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "0 1.5rem";
    }

    function closeAccordion(edition) {
        const content = edition.querySelector('.edition-content');
        if (!content || !edition.classList.contains('active')) return;
        edition.classList.remove('active');
        content.style.maxHeight = null;
        content.style.padding = "0 1.5rem";
    }

    editions.forEach(edition => {
        const title = edition.querySelector('.edition-title');
        if (!title) return;
        title.addEventListener('click', () => {
            edition.classList.contains('active') ? closeAccordion(edition) : openAccordion(edition);
        });
    });

    // --- FILTROS ---
    const dbSelector   = document.getElementById('dbSelector');
    const searchInput  = document.getElementById('searchInput');
    const filterClass  = document.getElementById('filterClass');
    const filterSistema = document.getElementById('filterSistema');
    const jdaCheckbox  = document.getElementById('check');

    // Preenche seletor de DBs
    if (dbSelector) {
        dbSelector.innerHTML = '<option value="all">Todas</option>';
        DATABASE.forEach(edition => {
            const opt = document.createElement('option');
            opt.value = edition.id;
            opt.textContent = edition.label;
            dbSelector.appendChild(opt);
        });
    }

    function applyAllFilters() {
        const searchTerm  = (searchInput?.value || '').toLowerCase();
        const classValue  = filterClass?.value  || 'all';
        const systemValue = filterSistema?.value || 'all';
        const selectedDB  = dbSelector?.value   || 'all';

        const hidePreJda = jdaCheckbox?.checked || false;

        document.querySelectorAll('.edition').forEach(edition => {
            if (selectedDB !== 'all' && edition.id !== selectedDB) {
                edition.style.display = 'none';
                return;
            }
            if (hidePreJda) {
                const match = edition.id?.match(/db(\d+)/);
                if (match && parseInt(match[1], 10) <= 182) {
                    edition.style.display = 'none';
                    return;
                }
            }
            edition.style.display = 'block';

            let editionHasVisibleArticle = false;

            edition.querySelectorAll('.searchable').forEach(article => {
                const textMatch   = article.textContent.toLowerCase().includes(searchTerm);
                const classMatch  = classValue  === 'all' || article.classList.contains(classValue);
                const systemMatch = systemValue === 'all' || article.classList.contains(systemValue);

                const visible = textMatch && classMatch && systemMatch;
                article.style.display = visible ? '' : 'none';
                if (visible) editionHasVisibleArticle = true;
            });

            editionHasVisibleArticle ? openAccordion(edition) : closeAccordion(edition);
        });
    }

    dbSelector?.addEventListener('change', applyAllFilters);
    searchInput?.addEventListener('input', applyAllFilters);
    filterClass?.addEventListener('change', applyAllFilters);
    filterSistema?.addEventListener('change', applyAllFilters);

    jdaCheckbox?.addEventListener('change', function () {
        document.querySelectorAll('.edition').forEach(edition => {
            const id = edition.id;
            if (!id) return;
            const match = id.match(/db(\d+)/);
            if (!match) return;
            const num = parseInt(match[1], 10);
            if (num <= 182) {
                edition.dataset.preJda = 'true';
                edition.style.display = this.checked ? 'none' : '';
            } else {
                edition.dataset.preJda = 'false';
            }
        });
    });

    // --- BOTÃO VOLTAR AO TOPO ---
    const backToTopButton = document.getElementById("backToTop");

    window.onscroll = function () {
        if (!backToTopButton) return;
        backToTopButton.style.display =
            (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
            ? "block" : "none";
    };

    backToTopButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- TEMA ---
    (function initTheme() {
        const body = document.body;
        const key = 't20_theme';

        function applyTheme(theme) {
            body.classList.remove('theme-dark', 'theme-classic');
            if (theme === 'dark')    body.classList.add('theme-dark');
            if (theme === 'classic') body.classList.add('theme-classic');
            document.querySelectorAll('.theme-btn').forEach(btn =>
                btn.classList.toggle('active', btn.getAttribute('data-theme') === theme)
            );
            localStorage.setItem(key, theme);
        }

        let saved = localStorage.getItem(key);
        if (!saved) {
            const ref = localStorage.getItem('strTheme') || localStorage.getItem('hubTheme');
            if (ref === 'dark') saved = 'dark';
            else if (ref === 'classic' || ref === 'light') saved = 'classic';
            else saved = 'blood';
        }
        applyTheme(saved);

        document.querySelectorAll('.theme-btn').forEach(btn =>
            btn.addEventListener('click', () => applyTheme(btn.getAttribute('data-theme')))
        );
    })();

    // --- PARTÍCULAS ---
    (function initParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h;

        function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
        window.addEventListener('resize', resize);
        resize();

        const particles = Array.from({ length: 50 }, () => ({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2 + 1, alpha: Math.random() * 0.5 + 0.1,
        }));

        function draw() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.x = (p.x + p.vx + w) % w;
                p.y = (p.y + p.vy + h) % h;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 213, 79, ${p.alpha})`;
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();
    })();
});
