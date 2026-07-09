/* ==========================================================================
   [JOB: Atnan] Logika E-Book, Navigasi Flipbook, & Fitur Aksesibilitas UDL
   ========================================================================== */

// ponytail: surahVerseCounts + getGlobalAyahNumber removed — replaced by verses.quran.foundation URL pattern

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
    let currentUtterances = [];
    let ttsAudioElement = null;
    let currentTtsSessionId = 0;

    // Inisialisasi Audio Element untuk bypass autoplay policy
    if (typeof window !== 'undefined') {
        ttsAudioElement = document.createElement('audio');
        ttsAudioElement.referrerPolicy = "no-referrer";
        document.body.appendChild(ttsAudioElement);
    }

    // Pre-warm the TTS voices cache for faster language matching
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
    }

    // ===== Read from localStorage =====
    function loadPreferences() {
        const storedSlide = localStorage.getItem('currentSlideIndex');
        const storedFontScale = localStorage.getItem('fontScale');
        const storedDyslexia = localStorage.getItem('dyslexiaMode');
        const storedTts = localStorage.getItem('ttsEnabled');

        if (storedSlide !== null) {
            currentSlideIndex = parseInt(storedSlide, 10);
            if (currentSlideIndex >= slides.length) {
                currentSlideIndex = 0;
            }
        }
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

            const cleanTitle = slide.title.replace(/^BAB [IVXLCDM\d]+:\s*/i, '');

            // Generate HTML cover slide
            let coverHTML = `
                <div class="cover-content relative z-10 animate-fade-in">
                    <div class="bab-pill-container" style="margin-bottom: 0.5rem;">
                        <span class="bab-pill">📖 BAB ${slide.bab}</span>
                    </div>
                    <h2 class="cover-main-title">${cleanTitle}</h2>
                    <div class="cover-divider" style="margin: 1.25rem auto;"></div>
            `;

            if (slide.image) {
                coverHTML += `
                    <div class="slide-image-wrapper animate-fade-in-up" style="animation-delay: 0.1s; margin-bottom: 1.25rem;">
                        <div class="relative-wrap">
                            <img src="${slide.image}" alt="${slide.title}" class="slide-img" />
                        </div>
                    </div>
                `;
            }

            // Loop through content and only display non-duplicated content (e.g. description text)
            coverHTML += `<div class="cover-body" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem;">`;
            slide.content.forEach(block => {
                if (block.type !== 'heading') {
                    coverHTML += `<p class="cover-description">${block.content}</p>`;
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
                    <div class="slide-image-wrapper animate-fade-in-up" style="animation-delay: 0.1s;">
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

    // ── TTS Normalizer — Tambahkan di app.js sebelum speakCurrentSlide ──────
    function stripArabicChars(text) {
        // Hapus karakter Arab Unicode dari string manapun
        return text.replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+/g, '')
            .replace(/\s*—\s*/g, '. ') // "اللهُ — Allahu" → ". Allahu"
            .replace(/\s{2,}/g, ' ').trim();
    }

    function stripDiacritics(text) {
        // Hapus diakritik transliterasi Arab (ā→a, ī→i, ū→u, ṭ→t, ḥ→h, dll)
        return text
            .replace(/[āÃ]/g, 'a').replace(/[īÄ«]/g, 'i').replace(/[ūÅ«]/g, 'u')
            .replace(/[ṭṬ]/g, 't').replace(/[ḥḤ]/g, 'h').replace(/[ṡṠ]/g, 's')
            .replace(/[ṣṢ]/g, 's').replace(/[ḍḌ]/g, 'd').replace(/[żŻ]/g, 'z')
            .replace(/ż/g, 'z');
    }

    function normalizeIslamicText(text) {
        const cleanText = text
            // Hapus tag HTML agar tidak dibaca oleh TTS
            .replace(/<[^>]*>/g, '')
            // Hapus Arabic chars dulu (fix bug slide 22)
            .replace(/[\u0600-\u06FF\u0750-\u077F]+/g, '')
            .replace(/\s*—\s*/g, '. ')
            // Expand H.R. references
            .replace(/H\.R\.\s*/gi, 'Hadis Riwayat ')
            .replace(/Hadist\s/gi, 'Hadis ')
            .replace(/Muttafaqun\s*Alaihi/gi, 'Bukhari dan Muslim')
            // Expand QS. references
            .replace(/Q\.?S\.\s*/gi, 'Quran Surah ')
            // Expand singkatan Islami
            .replace(/\bSAW\.?\b/gi, 'shallallahu alaihi wasallam')
            .replace(/\bSWT\.?\b/gi, 'subhanahu wataala')
            .replace(/\bRA\.?\b/gi, 'radhiyallahu anhu');

        // ponytail: use existing stripDiacritics helper to clean transliterations
        return stripDiacritics(cleanText)
            .replace(/\s{2,}/g, ' ')
            .trim();
    }

    function getVoiceForLang(langCode) {
        if (!('speechSynthesis' in window)) return null;
        const voices = window.speechSynthesis.getVoices();
        const lc = langCode.toLowerCase();

        // 1. Exact match (e.g. 'ar-SA' -> 'ar-SA')
        let matched = voices.find(v => {
            if (!v.lang) return false;
            const vLang = v.lang.toLowerCase();
            return vLang === lc || vLang.replace('_', '-') === lc;
        });
        if (matched) return matched;

        // 2. Prefix match (e.g. 'ar-SA' -> 'ar')
        const langPrefix = lc.split('-')[0];
        matched = voices.find(v => {
            if (!v.lang) return false;
            const vLang = v.lang.toLowerCase();
            return vLang.startsWith(langPrefix) || vLang.replace('_', '-').startsWith(langPrefix);
        });
        if (matched) return matched;

        // 3. Fallback search by name
        matched = voices.find(v => {
            const name = (v.name || '').toLowerCase();
            const lang = (v.lang || '').toLowerCase();
            if (langPrefix === 'ar') {
                return name.includes('arabic') || lang.includes('ar');
            } else if (langPrefix === 'id') {
                return name.includes('indonesia') || lang.includes('id');
            }
            return false;
        });
        return matched || null;
    }

    function speakCurrentSlide() {
        stopSpeaking();
        const sessionId = currentTtsSessionId;
        if (!('speechSynthesis' in window)) return;

        // Coba pre-unlock audio element dalam konteks user gesture (misal saat klik tombol ini)
        if (ttsAudioElement) {
            try {
                ttsAudioElement.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAAA';
                const playPromise = ttsAudioElement.play();
                if (playPromise !== undefined && typeof playPromise.then === 'function') {
                    playPromise.then(() => ttsAudioElement.pause()).catch(e => console.warn("Audio pre-unlock note:", e));
                } else {
                    ttsAudioElement.pause();
                }
            } catch (e) {
                console.warn("Audio pre-unlock failed synchronously:", e);
            }
        }

        const slide = slides[currentSlideIndex];
        const segments = [];

        // 1. Slide Intro
        segments.push({
            type: 'intro',
            text: `Slide ${currentSlideIndex + 1} dari ${slides.length}. ${slide.title}.`,
            lang: 'id-ID'
        });

        // 2. Content Blocks
        slide.content.forEach(block => {
            switch (block.type) {
                case 'arabic':
                    // Jika ada pre-rendered audio lokal (misal untuk Hadis offline), putar langsung
                    if (block.audio) {
                        segments.push({
                            type: 'arabic-quran',
                            text: block.audio,
                            lang: 'ar-SA',
                            audioStart: block.audioStart,
                            audioEnd: block.audioEnd
                        });
                    } else if (block.surah && block.ayahs) {
                        // Jika ini adalah ayat Quran (memiliki metadata block.surah & block.ayahs)
                        block.ayahs.forEach(ayah => {
                            const pad = (num, size) => ('000' + num).slice(-size);
                            const quranAudioUrl = `https://verses.quran.foundation/Alafasy/mp3/${pad(block.surah, 3)}${pad(ayah, 3)}.mp3`;
                            segments.push({
                                type: 'arabic-quran',
                                text: quranAudioUrl,
                                lang: 'ar-SA',
                                audioStart: block.audioStart,
                                audioEnd: block.audioEnd
                            });
                        });
                    } else {
                        // Teks Arab Hadis / lainnya (tetap gunakan Google Translate TTS fallback)
                        const cleanArabic = block.content.replace(/[﴿﴾\d()\u0660-\u0669\u06F0-\u06F9]/g, '').trim();
                        if (cleanArabic) {
                            segments.push({
                                type: 'arabic',
                                text: cleanArabic,
                                lang: 'ar-SA'
                            });
                        }
                    }
                    break;
                case 'transliteration':
                    segments.push({
                        type: 'transliteration',
                        text: 'Bacaan Arabnya: ' + normalizeIslamicText(block.content),
                        lang: 'id-ID'
                    });
                    break;
                case 'translation':
                    segments.push({
                        type: 'translation',
                        text: 'Artinya: ' + normalizeIslamicText(block.content),
                        lang: 'id-ID'
                    });
                    break;
                case 'list':
                    // ponytail: handle list items with custom lafaz-arabic and lafaz-latin HTML for TTS
                    if (block.content) {
                        segments.push({
                            type: 'text',
                            text: normalizeIslamicText(block.content),
                            lang: 'id-ID'
                        });
                    }
                    (block.items || []).forEach(item => {
                        if (item.includes('lafaz-arabic')) {
                            const arMatch = item.match(/class=["']lafaz-arabic["'][^>]*>([^<]+)<\/span>/);
                            const latMatch = item.match(/class=["']lafaz-latin["'][^>]*>([^<]+)<\/span>/);

                            if (arMatch && arMatch[1]) {
                                let arText = arMatch[1].trim();
                                // ponytail: repeat the Arabic text twice if (2x) is present in the Latin transliteration
                                if (latMatch && latMatch[1] && /\(\d+[xX]\)/.test(latMatch[1])) {
                                    arText = `${arText}. ${arText}.`;
                                }
                                segments.push({
                                    type: 'arabic',
                                    text: arText,
                                    lang: 'ar-SA'
                                });
                            }
                        } else {
                            segments.push({
                                type: 'text',
                                text: normalizeIslamicText(item),
                                lang: 'id-ID'
                            });
                        }
                    });
                    break;
                default:
                    segments.push({
                        type: 'text',
                        text: normalizeIslamicText(block.content || ''),
                        lang: 'id-ID'
                    });
            }
        });

        let currentIndex = 0;
        let arabicPlayedSuccessfully = false;
        ttsActiveBar.style.display = 'flex';

        function playNext() {
            if (sessionId !== currentTtsSessionId) return;
            if (currentIndex >= segments.length) {
                ttsActiveBar.style.display = 'none';
                return;
            }

            const seg = segments[currentIndex];
            currentIndex++;

            // Jika segment ini adalah transliterasi dan kita sudah sukses membaca teks arab sebelumnya, lewati (skip) transliterasi agar tidak bosan/duplikasi
            if (seg.type === 'transliteration' && arabicPlayedSuccessfully) {
                arabicPlayedSuccessfully = false; // reset untuk pair berikutnya jika ada
                playNext();
                return;
            }

            let txt = seg.text.replace(/\((\d+)[xX]\)/g, ', dibaca $1 kali');
            if (seg.type !== 'arabic-quran' && !txt.trim()) {
                playNext();
                return;
            }

            if (seg.type === 'arabic-quran') {
                console.log("Playing Quran recitation from CDN:", seg.text);
                if (ttsAudioElement) {
                    let hasSetStart = false;

                    // ponytail: store reference for external cleanup
                    ttsAudioElement._onTimeUpdate = () => {
                        if (seg.audioStart && !hasSetStart && ttsAudioElement.currentTime < seg.audioStart) {
                            ttsAudioElement.currentTime = seg.audioStart;
                            hasSetStart = true;
                        }
                        if (seg.audioEnd && ttsAudioElement.currentTime >= seg.audioEnd) {
                            cleanup();
                            ttsAudioElement.pause();
                            arabicPlayedSuccessfully = true;
                            playNext();
                        }
                    };

                    const cleanup = () => {
                        if (ttsAudioElement._onTimeUpdate) {
                            ttsAudioElement.removeEventListener('timeupdate', ttsAudioElement._onTimeUpdate);
                            ttsAudioElement._onTimeUpdate = null;
                        }
                        ttsAudioElement.onended = null;
                        ttsAudioElement.onerror = null;
                    };

                    ttsAudioElement.addEventListener('timeupdate', ttsAudioElement._onTimeUpdate);
                    ttsAudioElement.src = seg.text;

                    ttsAudioElement.onended = () => {
                        cleanup();
                        arabicPlayedSuccessfully = true;
                        playNext();
                    };
                    ttsAudioElement.onerror = (e) => {
                        console.warn("Failed to play Quran audio from CDN:", e);
                        cleanup();
                        arabicPlayedSuccessfully = false;
                        playNext();
                    };
                    ttsAudioElement.play().catch(err => {
                        console.warn("Autoplay blocked Quran audio play:", err);
                        cleanup();
                        arabicPlayedSuccessfully = false;
                        playNext();
                    });
                } else {
                    arabicPlayedSuccessfully = false;
                    playNext();
                }
            } else if (seg.type === 'arabic') {
                // Selalu utamakan Google Translate TTS API (sangat stabil & natural)
                console.log("Playing Arabic block via Google Translate TTS API...");
                const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&tl=ar&client=gtx&q=${encodeURIComponent(txt)}`;

                if (ttsAudioElement) {
                    let fallbackTriggered = false;

                    const triggerHadisFallback = (reason) => {
                        if (sessionId !== currentTtsSessionId) return;
                        if (fallbackTriggered) return;
                        fallbackTriggered = true;
                        console.warn("Hadis Arabic fallback triggered due to:", reason);

                        const arabicVoice = getVoiceForLang('ar-SA');
                        if (arabicVoice) {
                            const utterance = new SpeechSynthesisUtterance(txt);
                            utterance.voice = arabicVoice;
                            utterance.lang = 'ar-SA';
                            utterance.rate = 0.70;
                            utterance.onend = () => {
                                arabicPlayedSuccessfully = true;
                                playNext();
                            };
                            utterance.onerror = () => {
                                arabicPlayedSuccessfully = false;
                                playNext();
                            };
                            currentUtterances = [utterance];
                            window.speechSynthesis.speak(utterance);
                        } else {
                            // Jika perangkat tidak mendukung suara Arab, langsung lompat ke terjemahan Bahasa Indonesia instan
                            console.log("Arabic voice (ar-SA) not supported. Skipping directly to Indonesian translation.");
                            arabicPlayedSuccessfully = false;
                            playNext();
                        }
                    };

                    const cleanup = () => {
                        ttsAudioElement.onended = null;
                        ttsAudioElement.onerror = null;
                    };

                    ttsAudioElement.onended = () => {
                        if (fallbackTriggered) return;
                        cleanup();
                        arabicPlayedSuccessfully = true;
                        playNext();
                    };
                    ttsAudioElement.onerror = () => {
                        cleanup();
                        const err = ttsAudioElement.error;
                        const errMsg = err ? `Code ${err.code}: ${err.message}` : "unknown";
                        triggerHadisFallback("audio element error event - details: " + errMsg);
                    };

                    ttsAudioElement.src = url;
                    ttsAudioElement.play().catch(err => {
                        cleanup();
                        triggerHadisFallback("play promise catch: " + err.message);
                    });
                } else {
                    // Fallback langsung jika tidak ada ttsAudioElement
                    const arabicVoice = getVoiceForLang('ar-SA');
                    if (arabicVoice) {
                        const utterance = new SpeechSynthesisUtterance(txt);
                        utterance.voice = arabicVoice;
                        utterance.lang = 'ar-SA';
                        utterance.rate = 0.70;
                        utterance.onend = () => {
                            arabicPlayedSuccessfully = true;
                            playNext();
                        };
                        utterance.onerror = () => {
                            arabicPlayedSuccessfully = false;
                            playNext();
                        };
                        currentUtterances = [utterance];
                        window.speechSynthesis.speak(utterance);
                    } else {
                        console.log("No audio element and Arabic voice not supported. Skipping directly to Indonesian translation.");
                        arabicPlayedSuccessfully = false;
                        playNext();
                    }
                }
            } else {
                // Untuk selain arab (intro, translation, dll), reset flag arabicPlayedSuccessfully
                if (seg.type !== 'transliteration') {
                    arabicPlayedSuccessfully = false;
                }

                const utterance = new SpeechSynthesisUtterance(txt);
                utterance.lang = seg.lang;
                const idVoice = getVoiceForLang(seg.lang);
                if (idVoice) utterance.voice = idVoice;
                utterance.rate = slide.isCover ? 0.80 : 0.85;
                utterance.pitch = 1.1;
                utterance.onend = playNext;
                utterance.onerror = () => {
                    console.warn("Native ID TTS error, skipping to next segment.");
                    playNext();
                };
                currentUtterances = [utterance];
                window.speechSynthesis.speak(utterance);
            }
        }

        // Start the queue with 300ms delay to feel smooth
        ttsTimeout = setTimeout(() => {
            playNext();
        }, 300);
    }

    function stopSpeaking() {
        currentTtsSessionId++;
        if (ttsTimeout) {
            clearTimeout(ttsTimeout);
            ttsTimeout = null;
        }
        if (currentUtterances && currentUtterances.length > 0) {
            currentUtterances.forEach(u => {
                u.onend = null;
                u.onerror = null;
            });
            currentUtterances = [];
        }
        if (ttsAudioElement) {
            ttsAudioElement.pause();
            // ponytail: clean up temporal listeners
            if (ttsAudioElement._onTimeUpdate) {
                ttsAudioElement.removeEventListener('timeupdate', ttsAudioElement._onTimeUpdate);
                ttsAudioElement._onTimeUpdate = null;
            }
            ttsAudioElement.onended = null;
            ttsAudioElement.onerror = null;
            ttsAudioElement.src = 'about:blank';
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
    // ponytail: next button action is handled dynamically via .onclick in updateProgress() to support kuis redirect on last page.

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
        ttsEnabled = false;
        applyTtsState();
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
