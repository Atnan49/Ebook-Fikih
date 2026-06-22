/* ==========================================================================
   [JOB: Atnan] Logika E-Book, Navigasi Flipbook, & Fitur Aksesibilitas UDL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ===== DOM Elements =====
    const slideCard = document.getElementById('slide-card');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const dotsContainer = document.getElementById('dots-container');
    const mobilePagePill = document.getElementById('mobile-page-pill');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    // Toolbar elements
    const btnDecFont = document.getElementById('btn-dec-font');
    const btnIncFont = document.getElementById('btn-inc-font');
    const fontScaleText = document.getElementById('font-scale-text');
    const btnToggleDyslexia = document.getElementById('btn-toggle-dyslexia');
    const btnToggleAudio = document.getElementById('btn-toggle-audio');
    const btnOpenSidebar = document.getElementById('btn-open-sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebarToc = document.getElementById('sidebar-toc');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const tocContainer = document.getElementById('toc-container');

    // Mobile specific settings controls
    const btnSettingsMobile = document.getElementById('btn-settings-mobile');
    const settingsDropdown = document.getElementById('settings-dropdown');
    const settingsBackdrop = document.getElementById('settings-backdrop');
    const btnDecFontMobile = document.getElementById('btn-dec-font-mobile');
    const btnIncFontMobile = document.getElementById('btn-inc-font-mobile');
    const fontScaleTextMobile = document.getElementById('font-scale-text-mobile');
    const btnToggleDyslexiaMobile = document.getElementById('btn-toggle-dyslexia-mobile');
    
    // TTS elements
    const ttsActiveBar = document.getElementById('tts-active-bar');
    const btnTtsStop = document.getElementById('btn-tts-stop');

    // ===== Application State =====
    let currentSlideIndex = 0;
    let fontScale = 100; // range: 100 - 160
    let dyslexiaMode = false;
    let ttsEnabled = false;
    let currentUtterance = null;

    // ===== Read from localStorage =====
    function loadPreferences() {
        const storedSlide = localStorage.getItem('currentSlideIndex');
        const storedFontScale = localStorage.getItem('fontScale');
        const storedDyslexia = localStorage.getItem('dyslexiaMode');
        const storedTts = localStorage.getItem('ttsEnabled');

        if (storedSlide !== null) currentSlideIndex = parseInt(storedSlide, 10);
        if (storedFontScale !== null) fontScale = parseInt(storedFontScale, 10);
        if (storedDyslexia !== null) dyslexiaMode = storedDyslexia === 'true';
        if (storedTts !== null) ttsEnabled = storedTts === 'true';

        // Apply loaded preferences to DOM
        applyFontScale();
        applyDyslexiaMode();
        applyTtsState();
    }

    // ===== Apply Styles / Classes based on State =====
    function applyFontScale() {
        // Remove existing font scale classes
        for (let i = 100; i <= 160; i += 10) {
            document.documentElement.classList.remove(`font-scale-${i}`);
        }
        // Add current font scale class
        document.documentElement.classList.add(`font-scale-${fontScale}`);
        if (fontScaleText) fontScaleText.textContent = `${fontScale}%`;
        if (fontScaleTextMobile) fontScaleTextMobile.textContent = `${fontScale}%`;
        localStorage.setItem('fontScale', fontScale);
    }

    function applyDyslexiaMode() {
        if (dyslexiaMode) {
            document.body.classList.add('dyslexia-mode');
            if (btnToggleDyslexia) {
                btnToggleDyslexia.classList.add('active');
                btnToggleDyslexia.innerHTML = 'Disleksia ✓';
            }
            if (btnToggleDyslexiaMobile) {
                btnToggleDyslexiaMobile.classList.add('active');
            }
        } else {
            document.body.classList.remove('dyslexia-mode');
            if (btnToggleDyslexia) {
                btnToggleDyslexia.classList.remove('active');
                btnToggleDyslexia.innerHTML = 'Disleksia';
            }
            if (btnToggleDyslexiaMobile) {
                btnToggleDyslexiaMobile.classList.remove('active');
            }
        }
        localStorage.setItem('dyslexiaMode', dyslexiaMode);
    }

    function applyTtsState() {
        if (ttsEnabled) {
            btnToggleAudio.classList.add('active');
            btnToggleAudio.innerHTML = '🔊';
        } else {
            btnToggleAudio.classList.remove('active');
            btnToggleAudio.innerHTML = '🔇';
            stopSpeaking();
        }
        localStorage.setItem('ttsEnabled', ttsEnabled);
    }

    // ===== Navigation Logic =====
    function goToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        
        // Handle transitions direction class
        const directionClass = index > currentSlideIndex ? 'animate-slide-right' : 'animate-slide-left';
        
        currentSlideIndex = index;
        localStorage.setItem('currentSlideIndex', currentSlideIndex);
        
        // Stop current speech before navigating
        stopSpeaking();
        
        // Render & animate slide
        renderSlide(currentSlideIndex, directionClass);
        updateProgress();
        
        // Trigger TTS if enabled
        if (ttsEnabled) {
            speakCurrentSlide();
        }
    }

    function nextSlide() {
        if (currentSlideIndex < slides.length - 1) {
            goToSlide(currentSlideIndex + 1);
        }
    }

    function prevSlide() {
        if (currentSlideIndex > 0) {
            goToSlide(currentSlideIndex - 1);
        }
    }

    // ===== Update Progress Indicator & Nav Buttons =====
    function updateProgress() {
        // Update Progress Bar
        const percent = ((currentSlideIndex + 1) / slides.length) * 100;
        progressFill.style.width = `${percent}%`;
        
        // Update Progress Indicator text
        const pageText = `${currentSlideIndex + 1} / ${slides.length}`;
        progressText.textContent = pageText;
        mobilePagePill.textContent = pageText;

        // Update dot indicators
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            if (idx === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update Prev Button
        btnPrev.disabled = currentSlideIndex === 0;

        // Update Next Button
        if (currentSlideIndex === slides.length - 1) {
            btnNext.innerHTML = `
                <span class="hidden-xs">Mulai Kuis</span>
                <span class="visible-xs">Kuis</span>
                <span style="margin-left: 0.25rem;">✏️</span>
                <svg style="width: 1rem; height: 1rem; flex-shrink: 0;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            `;
            btnNext.className = 'btn-primary';
            btnNext.onclick = () => window.location.href = 'kuis.html';
        } else {
            btnNext.innerHTML = `
                <span class="hidden-xs">Berikutnya</span>
                <span class="visible-xs">Lanjut</span>
                <svg style="width: 1rem; height: 1rem; flex-shrink: 0;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            `;
            btnNext.className = 'btn-primary';
            btnNext.onclick = nextSlide;
        }
    }

    // ===== Build Dot Indicators =====
    function buildDots() {
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.setAttribute('aria-label', `Slide ${idx + 1}`);
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });
    }

    // ===== Render Slide Content =====
    function renderSlide(index, animationClass = 'animate-fade-in') {
        const slide = slides[index];
        const currentBab = babInfo.find(b => b.bab === slide.bab);
        
        // Clear card content and classes
        slideCard.innerHTML = '';
        slideCard.className = `slide-card-container ${animationClass}`;
        
        if (slide.isCover) {
            // Apply cover slide theme
            slideCard.classList.add('cover-slide');
            
            // Generate HTML cover slide
            let coverHTML = `
                <div class="space-y-6 py-4 relative z-10" style="display: flex; flex-direction: column; gap: 1.25rem; align-items: center; justify-content: center; width: 100%; min-height: 100%;">
                    <div class="bab-pill-container">
                        <span class="bab-pill">📖 BAB ${slide.bab}</span>
                    </div>
                    <h2 class="slide-title" style="border: none; margin: 0; padding: 0;">${slide.title.replace(/^BAB [IVXLCDM\d]+:\s*/i, '')}</h2>
                    <div style="width: 5rem; height: 3px; background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent); margin: 0 auto;"></div>
            `;
            
            if (slide.image) {
                coverHTML += `
                    <div class="slide-image-wrapper">
                        <div class="relative-wrap">
                            <img src="${slide.image}" alt="${slide.title}" class="slide-img" />
                        </div>
                    </div>
                `;
            }
            
            coverHTML += `<div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">`;
            slide.content.forEach(block => {
                if (block.type === 'heading') {
                    coverHTML += `<h3 class="block-heading" style="color: white; margin: 0;">${block.content}</h3>`;
                } else {
                    coverHTML += `<p class="block-text" style="color: rgba(255,255,255,0.95); margin: 0;">${block.content}</p>`;
                }
            });
            coverHTML += `</div>`;
            
            coverHTML += `
                    <div class="cover-footer-text">
                        Tekan tombol "Lanjut" untuk mulai belajar 👉
                    </div>
                </div>
            `;
            slideCard.innerHTML = coverHTML;
        } else {
            // Apply standard slide theme
            slideCard.classList.add('glass-card-strong');
            
            // Build standard headers
            let slideHTML = `
                <div class="bab-pill-container">
                    <span class="bab-pill">BAB ${slide.bab}: ${currentBab ? currentBab.title.toUpperCase() : ''} • ${slide.subBab}</span>
                </div>
                <h2 class="slide-title">${slide.title}</h2>
            `;
            
            if (slide.image) {
                slideHTML += `
                    <div class="slide-image-wrapper">
                        <img src="${slide.image}" alt="${slide.title}" class="slide-img" />
                    </div>
                `;
            }
            
            // Render blocks
            slideHTML += `<div style="display: flex; flex-direction: column; gap: 0.5rem;">`;
            slide.content.forEach((block, idx) => {
                slideHTML += renderBlock(block, idx);
            });
            slideHTML += `</div>`;
            
            slideCard.innerHTML = slideHTML;
        }

        // Dynamically add/remove quiz cta below card
        const existingCta = document.getElementById('quiz-cta');
        if (existingCta) existingCta.remove();

        if (index === slides.length - 1) {
            const quizCta = document.createElement('div');
            quizCta.id = 'quiz-cta';
            quizCta.className = 'quiz-cta-card';
            quizCta.innerHTML = `
                <div class="quiz-cta-icon">✏️</div>
                <h3 class="quiz-cta-title">Sudah siap ngerjain kuis?</h3>
                <p class="quiz-cta-description">
                    Hebat! Kamu sudah membaca seluruh materi e-book. Yuk, uji pemahamanmu dengan kuis interaktif yang seru!
                </p>
                <a href="kuis.html" class="btn-primary" id="btn-quiz-cta">Mulai Kuis Sekarang! 🚀</a>
            `;
            slideCard.parentNode.insertBefore(quizCta, slideCard.nextSibling);
        }
    }

    // Helper function to render a single block
    function renderBlock(block, idx) {
        const delayStyle = `style="animation-delay: ${idx * 0.05}s"`;
        
        switch (block.type) {
            case 'heading':
                return `<h3 class="block-heading animate-fade-in" ${delayStyle}>${block.content}</h3>`;
            case 'text':
                return `<p class="block-text animate-fade-in" ${delayStyle}>${block.content}</p>`;
            case 'arabic':
                return `<p class="block-arabic animate-fade-in" ${delayStyle} dir="rtl" lang="ar">${block.content}</p>`;
            case 'transliteration':
                return `<p class="block-transliteration animate-fade-in" ${delayStyle}>${block.content}</p>`;
            case 'translation':
                return `<p class="block-translation animate-fade-in" ${delayStyle}>${block.content}</p>`;
            case 'note':
                return `<div class="block-note animate-fade-in" ${delayStyle}>💡 ${block.content}</div>`;
            case 'list':
                let listHTML = `<div class="block-list-container animate-fade-in" ${delayStyle}>`;
                if (block.content) {
                    listHTML += `<p class="block-list-title">${block.content}</p>`;
                }
                listHTML += `<ul class="block-list">`;
                block.items.forEach((item, i) => {
                    listHTML += `
                        <li class="block-list-item">
                            <span class="list-badge">${i + 1}</span>
                            <span>${item}</span>
                        </li>
                    `;
                });
                listHTML += `</ul></div>`;
                return listHTML;
            default:
                return '';
        }
    }

    // ===== Sidebar TOC Logic =====
    function buildSidebarTOC() {
        tocContainer.innerHTML = '';
        
        babInfo.forEach(bab => {
            const section = document.createElement('div');
            section.className = 'toc-bab-section';
            section.innerHTML = `<h4 class="toc-bab-title">BAB ${bab.bab}: ${bab.title}</h4>`;
            
            const list = document.createElement('ul');
            list.className = 'toc-list';
            
            const babSlides = slides.filter(s => s.bab === bab.bab);
            babSlides.forEach(slide => {
                const item = document.createElement('li');
                const btn = document.createElement('button');
                btn.className = `toc-btn ${currentSlideIndex === slide.id - 1 ? 'active' : ''}`;
                btn.innerHTML = `<span class="toc-num">${slide.id}.</span> ${slide.title}`;
                btn.addEventListener('click', () => {
                    goToSlide(slide.id - 1);
                    closeTOC();
                });
                item.appendChild(btn);
                list.appendChild(item);
            });
            
            section.appendChild(list);
            tocContainer.appendChild(section);
        });
    }

    function openTOC() {
        buildSidebarTOC();
        sidebarToc.classList.add('open');
        sidebarOverlay.classList.add('active');
    }

    function closeTOC() {
        sidebarToc.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }

    // ===== Text-to-Speech (TTS) Logic =====
    let ttsTimeout = null;

    function speakCurrentSlide() {
        stopSpeaking(); // Cancel any active TTS
        
        if (!('speechSynthesis' in window)) return;

        const slide = slides[currentSlideIndex];
        
        // Filter out arabic text to read in Indonesian voice
        const contentTexts = slide.content
            .filter(block => block.type !== 'arabic')
            .map(block => {
                if (block.type === 'list' && block.items) {
                    return block.content + ". " + block.items.join(". ");
                }
                return block.content;
            })
            .join(". ");
            
        const textToSpeak = `${slide.title}. ${contentTexts}`;
        
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'id-ID';
        utterance.rate = 0.85;
        utterance.pitch = 1.1;
        
        // Show TTS Active bar when speech starts
        utterance.onstart = () => {
            ttsActiveBar.style.display = 'flex';
        };
        
        // Hide TTS Active bar when speech ends
        utterance.onend = () => {
            ttsActiveBar.style.display = 'none';
        };
        
        utterance.onerror = () => {
            ttsActiveBar.style.display = 'none';
        };

        currentUtterance = utterance;
        // Introduce 300ms delay to feel exactly like the Next.js prototype transition
        ttsTimeout = setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 300);
    }

    function stopSpeaking() {
        if (ttsTimeout) {
            clearTimeout(ttsTimeout);
            ttsTimeout = null;
        }
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        ttsActiveBar.style.display = 'none';
    }

    // ===== Keyboard Navigation Support =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (currentSlideIndex < slides.length - 1) {
                e.preventDefault();
                nextSlide();
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentSlideIndex > 0) {
                e.preventDefault();
                prevSlide();
            }
        }
    });

    // ===== Swipe Touch Navigation Support =====
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const threshold = 50;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide(); // Swiped left -> Next
            } else {
                prevSlide(); // Swiped right -> Prev
            }
        }
    }

    // ===== Event Listeners setup =====
    btnPrev.addEventListener('click', prevSlide);
    btnNext.addEventListener('click', nextSlide);
    
    // Zoom Teks (Desktop)
    btnDecFont.addEventListener('click', () => {
        if (fontScale > 100) {
            fontScale -= 10;
            applyFontScale();
        }
    });
    
    btnIncFont.addEventListener('click', () => {
        if (fontScale < 160) {
            fontScale += 10;
            applyFontScale();
        }
    });

    // Zoom Teks (Mobile)
    if (btnDecFontMobile) {
        btnDecFontMobile.addEventListener('click', () => {
            if (fontScale > 100) {
                fontScale -= 10;
                applyFontScale();
            }
        });
    }
    if (btnIncFontMobile) {
        btnIncFontMobile.addEventListener('click', () => {
            if (fontScale < 160) {
                fontScale += 10;
                applyFontScale();
            }
        });
    }

    // Dyslexia Mode (Desktop)
    btnToggleDyslexia.addEventListener('click', () => {
        dyslexiaMode = !dyslexiaMode;
        applyDyslexiaMode();
    });

    // Dyslexia Mode (Mobile)
    if (btnToggleDyslexiaMobile) {
        btnToggleDyslexiaMobile.addEventListener('click', () => {
            dyslexiaMode = !dyslexiaMode;
            applyDyslexiaMode();
        });
    }

    // Mobile Gear Settings popover toggle
    if (btnSettingsMobile) {
        btnSettingsMobile.addEventListener('click', () => {
            const isActive = settingsDropdown.classList.contains('active');
            if (isActive) {
                settingsDropdown.classList.remove('active');
                settingsBackdrop.classList.remove('active');
                btnSettingsMobile.classList.remove('active');
            } else {
                // Close sidebar TOC first
                closeTOC();
                settingsDropdown.classList.add('active');
                settingsBackdrop.classList.add('active');
                btnSettingsMobile.classList.add('active');
            }
        });
    }

    // Backdrop click on mobile settings to close
    if (settingsBackdrop) {
        settingsBackdrop.addEventListener('click', () => {
            settingsDropdown.classList.remove('active');
            settingsBackdrop.classList.remove('active');
            if (btnSettingsMobile) {
                btnSettingsMobile.classList.remove('active');
            }
        });
    }

    // TTS Toggle
    btnToggleAudio.addEventListener('click', () => {
        ttsEnabled = !ttsEnabled;
        applyTtsState();
        if (ttsEnabled) {
            speakCurrentSlide();
        }
    });

    btnTtsStop.addEventListener('click', () => {
        stopSpeaking();
    });

    // TOC Sidebar open/close
    btnOpenSidebar.addEventListener('click', () => {
        // Close mobile settings popup first
        if (settingsDropdown) {
            settingsDropdown.classList.remove('active');
            settingsBackdrop.classList.remove('active');
            if (btnSettingsMobile) btnSettingsMobile.classList.remove('active');
        }
        openTOC();
    });
    closeSidebar.addEventListener('click', closeTOC);
    sidebarOverlay.addEventListener('click', closeTOC);

    // ===== Initial Setup =====
    loadPreferences();
    buildDots();
    goToSlide(currentSlideIndex);
});
