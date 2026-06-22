/* ==========================================================================
   [JOB: NARENDRA] Logika Kuis Interaktif (PG, Essay, & Praktik WA)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ===== UDL Preferences Sync =====
    const syncUDLPreferences = () => {
        const savedDyslexia = localStorage.getItem('dyslexiaMode');
        if (savedDyslexia === 'true') {
            document.body.classList.add('dyslexia-mode');
        } else {
            document.body.classList.remove('dyslexia-mode');
        }

        const savedFontScale = localStorage.getItem('fontScale');
        if (savedFontScale) {
            // Remove any existing font scale classes from html/body
            document.documentElement.className = document.documentElement.className
                .split(' ')
                .filter(c => !c.startsWith('font-scale-'))
                .join(' ');
            document.documentElement.classList.add(`font-scale-${savedFontScale}`);
        }
    };
    syncUDLPreferences();

    // ===== DOM Elements =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPG = document.getElementById('tab-pg');
    const tabEssay = document.getElementById('tab-essay');
    const tabPraktik = document.getElementById('tab-praktik');
    const tabSections = {
        pg: tabPG,
        essay: tabEssay,
        praktik: tabPraktik
    };

    // ===== 1. Tab Switching Logic =====
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            // Hide all tab sections
            Object.values(tabSections).forEach(sec => {
                sec.style.display = 'none';
                sec.classList.remove('active');
            });

            // Set current button active
            btn.classList.add('active');
            // Show corresponding section
            const selectedTab = btn.getAttribute('data-tab');
            const targetSection = tabSections[selectedTab];
            if (targetSection) {
                targetSection.style.display = 'block';
                targetSection.classList.add('active');
            }
        });
    });

    // ===== 2. Pilihan Ganda Logic =====
    let userAnswers = {}; // Format: { questionId: selectedOptionIndex }

    const renderPGQuiz = () => {
        if (typeof quizPG === 'undefined') return;

        let html = '';
        quizPG.forEach((q, index) => {
            html += `
                <div class="question-card" id="pg-card-${q.id}">
                    <div class="question-num">Pertanyaan ${index + 1}</div>
                    <div class="question-text">${q.question}</div>
                    <ul class="options-list">
            `;
            q.options.forEach((opt, optIdx) => {
                const label = String.fromCharCode(65 + optIdx); // A, B, C...
                html += `
                    <li class="option-item" data-q-id="${q.id}" data-opt-idx="${optIdx}">
                        <span class="option-badge">${label}</span>
                        <span>${opt}</span>
                    </li>
                `;
            });
            html += `
                    </ul>
                </div>
            `;
        });

        // Add Submit Button
        html += `
            <div class="action-container">
                <button id="btn-submit-pg" class="btn-quiz-action">Kirim Jawaban 🚀</button>
            </div>
            <div id="score-container"></div>
        `;

        tabPG.innerHTML = html;

        // Add Event Listeners for options
        const optionItems = tabPG.querySelectorAll('.option-item');
        optionItems.forEach(item => {
            item.addEventListener('click', () => {
                const qId = item.getAttribute('data-q-id');
                const optIdx = parseInt(item.getAttribute('data-opt-idx'), 10);

                // If already submitted, prevent change
                if (tabPG.querySelector('.option-item.correct')) return;

                // Update state
                userAnswers[qId] = optIdx;

                // Visual updates: remove selected from siblings
                tabPG.querySelectorAll(`.option-item[data-q-id="${qId}"]`).forEach(sibling => {
                    sibling.classList.remove('selected');
                });
                // Add selected class to current option
                item.classList.add('selected');
            });
        });

        // Add Submit event listener
        const btnSubmit = document.getElementById('btn-submit-pg');
        btnSubmit.addEventListener('click', () => {
            // Check if all answered
            const answeredCount = Object.keys(userAnswers).length;
            if (answeredCount < quizPG.length) {
                alert(`Kamu baru menjawab ${answeredCount} dari ${quizPG.length} soal. Jawab semua dulu ya!`);
                return;
            }

            // Calculate Score & Add classes
            let correctCount = 0;
            quizPG.forEach(q => {
                const selectedIdx = userAnswers[q.id];
                const correctIdx = q.correctIndex;

                const options = tabPG.querySelectorAll(`.option-item[data-q-id="${q.id}"]`);
                options.forEach(opt => {
                    const optIdx = parseInt(opt.getAttribute('data-opt-idx'), 10);
                    opt.classList.remove('selected');

                    // If it is the correct answer, show green
                    if (optIdx === correctIdx) {
                        opt.classList.add('correct');
                    }
                    // If it is the selected but wrong answer, show red
                    if (optIdx === selectedIdx && selectedIdx !== correctIdx) {
                        opt.classList.add('wrong');
                    }
                });

                if (selectedIdx === correctIdx) {
                    correctCount++;
                }
            });

            // Display Score Card
            const score = Math.round((correctCount / quizPG.length) * 100);
            let feedbackEmoji = '💪';
            let feedbackText = 'Ayo belajar lagi! Kamu pasti bisa lebih baik.';

            if (score === 100) {
                feedbackEmoji = '🌟';
                feedbackText = 'Luar biasa! Kamu menjawab semua pertanyaan dengan benar!';
            } else if (score >= 70) {
                feedbackEmoji = '👏';
                feedbackText = 'Bagus sekali! Pemahamanmu tentang materi sudah sangat baik.';
            }

            const scoreContainer = document.getElementById('score-container');
            scoreContainer.innerHTML = `
                <div class="quiz-score-card">
                    <div class="score-emoji">${feedbackEmoji}</div>
                    <h3 class="score-title">Hasil Kuis Pilihan Ganda</h3>
                    <div class="score-value">${score}</div>
                    <p class="score-feedback">${feedbackText} (${correctCount} dari ${quizPG.length} benar)</p>
                    <button id="btn-reset-pg" class="btn-cream" style="margin-top: 1.5rem;">Coba Lagi 🔄</button>
                </div>
            `;

            // Disable submit button
            btnSubmit.style.display = 'none';

            // Reset quiz listener
            document.getElementById('btn-reset-pg').addEventListener('click', () => {
                userAnswers = {};
                renderPGQuiz();
            });
        });
    };

    // ===== 3. Soal Essay Logic =====
    const renderEssayQuiz = () => {
        if (typeof quizEssay === 'undefined') return;

        let html = '';
        quizEssay.forEach((q, index) => {
            html += `
                <div class="question-card">
                    <div class="question-num">Essay ${index + 1}</div>
                    <div class="question-text">${q.question}</div>
                    <textarea class="essay-input" id="essay-input-${q.id}" placeholder="Ketik jawabanmu di sini..."></textarea>
                    
                    <div class="essay-action-row">
                        <button class="btn-show-answer" data-id="${q.id}">Lihat Kunci Jawaban 🔑</button>
                    </div>
                    
                    <div class="key-answer-box" id="key-answer-${q.id}">
                        <div class="key-answer-title">Kunci Jawaban Mandiri</div>
                        <div>${q.answer}</div>
                    </div>
                </div>
            `;
        });

        tabEssay.innerHTML = html;

        // Toggle Key Answers
        const toggleButtons = tabEssay.querySelectorAll('.btn-show-answer');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const keyBox = document.getElementById(`key-answer-${id}`);
                const isVisible = keyBox.classList.contains('visible');

                if (isVisible) {
                    keyBox.classList.remove('visible');
                    btn.textContent = 'Lihat Kunci Jawaban 🔑';
                } else {
                    keyBox.classList.add('visible');
                    btn.textContent = 'Sembunyikan Kunci Jawaban 🙈';
                }
            });
        });
    };

    // ===== 4. Tugas Praktik Logic =====
    const renderPraktikTab = () => {
        if (typeof praktikInfo === 'undefined') return;

        const waTextEncoded = encodeURIComponent(praktikInfo.whatsappMessage);
        const waLink = `https://wa.me/${praktikInfo.whatsappNumber}?text=${waTextEncoded}`;

        tabPraktik.innerHTML = `
            <div class="praktik-card">
                <div class="praktik-icon">💧</div>
                <h3 class="praktik-title">${praktikInfo.title}</h3>
                <p class="praktik-instruction">${praktikInfo.instruction}</p>
                <a href="${waLink}" target="_blank" class="btn-wa-praktik">
                    <!-- WhatsApp SVG Icon -->
                    <svg viewBox="0 0 24 24">
                        <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.457 3.48 1.328 5L2 22l5.176-1.356c1.47.8 3.12 1.22 4.82 1.22h.004c5.505 0 9.986-4.482 9.986-9.988C22 6.482 17.518 2 12.012 2zm6.36 14.184c-.26.732-1.31 1.344-1.8 1.4-1.22.148-2.73-.294-4.88-1.206-2.766-1.164-4.526-3.956-4.66-4.14-.14-.186-1.12-1.494-1.12-2.85 0-1.356.706-2.02.96-2.29.26-.272.58-.342.78-.342h.56c.18 0 .42.068.66.626.24.58.82 2.02.9 2.18.08.16.14.34.02.56-.12.22-.24.364-.38.528-.14.164-.294.346-.12.646.3.52.926 1.54 1.746 2.27.84.75 1.548 1.05 1.888 1.19.34.14.54.116.74-.11.2-.23.86-1.002.98-1.344.12-.34.24-.29.42-.22.18.07 1.14.54 1.34.64.2.1.34.15.39.23.05.08.05.47-.21 1.202z"/>
                    </svg>
                    <span>Kirim Video ke WhatsApp</span>
                </a>
            </div>
        `;
    };

    // ===== Initialize All Sections =====
    renderPGQuiz();
    renderEssayQuiz();
    renderPraktikTab();
});
