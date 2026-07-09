/* ==========================================================================
   [JOB: NARENDRA] Logika Kuis Interaktif (PG, Essay, & Praktik WA)
   ========================================================================== */

   /**
 * Narendra, silakan buat logika JavaScript di file ini untuk:
 * 
 * 1. Manajemen Tab Halaman Kuis:
 *    - Ketika tombol tab (Pilihan Ganda / Essay / Praktik) diklik:
 *      * Hapus kelas `active` dari semua tombol tab & sembunyikan semua section konten tab.
 *      * Tambahkan kelas `active` ke tombol tab yang diklik & tampilkan section konten tab yang sesuai (menggunakan inline style `display: block` / `display: none` atau class Tailwind/CSS).
 * 
 * 2. Logika Pilihan Ganda:
 *    - Ambil data soal dari variabel global `quizPG` (dari data.js).
 *    - Render 10 pertanyaan PG secara dinamis. Setiap pertanyaan memiliki kontainer kartu yang rapi.
 *    - Sediakan opsi A, B, C. Buat event listener click pada opsi:
 *      * Simpan jawaban yang dipilih oleh user ke dalam array/state lokal (misal: `userAnswers = []`).
 *      * Tambahkan class `.selected` pada opsi yang sedang diklik agar warnanya berubah (biru muda).
 *    - Buat tombol "Kirim Jawaban" di bawah daftar soal PG:
 *      * Saat diklik, cocokkan `userAnswers` dengan `correctIndex` dari setiap soal.
 *      * Tampilkan penanda jawaban yang benar (class `.correct` - hijau) dan salah (class `.wrong` - merah) secara visual pada setiap pilihan.
 *      * Hitung total skor (misal: (jawabanBenar / totalSoal) * 100).
 *      * Tampilkan modal atau kotak nilai di bagian bawah lengkap dengan feedback emoji apresiasi yang lucu (misal: Skor 100 🌟, Skor >= 70 👏, Skor < 70 💪).
 * 
 * 3. Logika Soal Essay:
 *    - Ambil data soal dari variabel global `quizEssay`.
 *    - Render 5 pertanyaan essay secara dinamis.
 *    - Di bawah tiap pertanyaan, sediakan `<textarea placeholder="Ketik jawabanmu di sini..."></textarea>`.
 *    - Sediakan tombol "Lihat Kunci Jawaban". Jika diklik, tampilkan kotak teks kunci jawaban (`quizEssay[i].answer`) tepat di bawah textarea tersebut sehingga siswa bisa mencocokkan mandiri.
 * 
 * 4. Logika Tugas Praktik:
 *    - Ambil info dari variabel global `praktikInfo`.
 *    - Tampilkan judul praktik, instruksi detail, dan tombol kirim WhatsApp.
 *    - Hubungkan tombol kirim WhatsApp ke tautan dinamis:
 *      `https://wa.me/6288989320145?text=...` (dengan isi teks pesan otomatis yang disandi menggunakan `encodeURIComponent`).
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== UDL Accessibility Support =====
    // Load and apply Dyslexia Mode if active in localStorage
    const storedDyslexia = localStorage.getItem('dyslexiaMode');
    if (storedDyslexia === 'true') {
        document.body.classList.add('dyslexia-mode');
    }

    // ===== DOM Elements =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabPg = document.getElementById('tab-pg');
    const tabEssay = document.getElementById('tab-essay');
    const tabPraktik = document.getElementById('tab-praktik');

    // ===== 1. Tab Switcher Logic =====
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Deactivate all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            // Activate clicked button
            button.classList.add('active');
            // Show corresponding content
            const activeContent = document.getElementById(`tab-${targetTab}`);
            if (activeContent) {
                activeContent.classList.add('active');
                activeContent.style.display = 'block';
            }

            // ponytail: update sticky footer content based on active tab
            const stickyNav = document.getElementById('quiz-sticky-nav');
            if (targetTab === 'pg') {
                renderQuizPG();
            } else if (targetTab === 'essay') {
                renderQuizEssay();
            } else {
                if (stickyNav) {
                    stickyNav.innerHTML = '';
                    stickyNav.style.display = 'none';
                }
            }
        });
    });

    // ===== 2. Logika Pilihan Ganda (PG) =====
    let isPgSubmitted = false;
    let userAnswers = Array(quizPG.length).fill(null);
    let currentQuestionIndex = 0;

    // ===== 3. Logika Soal Essay (State) =====
    let essayAnswers = Array(quizEssay.length).fill('');
    let currentEssayIndex = 0;
    let isEssayAnswerVisible = Array(quizEssay.length).fill(false);

    function renderQuizPG() {
        tabPg.innerHTML = ''; // Clear previous content

        // Title and description helper for children
        const infoTitle = document.createElement('h3');
        infoTitle.style.textAlign = 'center';
        infoTitle.style.marginBottom = '1rem';
        infoTitle.style.color = 'var(--color-blue-900)';
        infoTitle.textContent = 'Pilihlah Jawaban yang Paling Benar!';
        tabPg.appendChild(infoTitle);

        // A. Question Navigation Grid (1 - 10)
        const gridContainer = document.createElement('div');
        gridContainer.className = 'quiz-nav-grid';

        for (let i = 0; i < quizPG.length; i++) {
            const btn = document.createElement('button');
            btn.className = 'nav-grid-item';
            btn.textContent = i + 1;

            // Apply states
            if (i === currentQuestionIndex) {
                btn.classList.add('active');
            }

            // Highlighting status
            if (userAnswers[i] !== null) {
                if (isPgSubmitted) {
                    const isCorrect = userAnswers[i] === quizPG[i].correctIndex;
                    btn.classList.add(isCorrect ? 'correct' : 'wrong');
                } else {
                    btn.classList.add('answered');
                }
            } else if (isPgSubmitted) {
                // If submitted but not answered, count as wrong
                btn.classList.add('wrong');
            }

            // Click navigation
            btn.addEventListener('click', () => {
                currentQuestionIndex = i;
                renderQuizPG();
            });

            gridContainer.appendChild(btn);
        }
        tabPg.appendChild(gridContainer);

        // B. Active Question Card
        const question = quizPG[currentQuestionIndex];
        const card = document.createElement('div');
        card.className = 'question-card animate-fade-in'; // Using smooth fade-in

        const num = document.createElement('div');
        num.className = 'question-num';
        num.textContent = `Soal ${currentQuestionIndex + 1} dari ${quizPG.length}`;

        const text = document.createElement('div');
        text.className = 'question-text';
        text.textContent = question.question;

        const optionsList = document.createElement('ul');
        optionsList.className = 'options-list';

        const optionLetters = ['A', 'B', 'C'];
        question.options.forEach((optionText, optIndex) => {
            const item = document.createElement('li');
            item.className = 'option-item';
            item.setAttribute('data-option', optIndex);

            const badge = document.createElement('span');
            badge.className = 'option-badge';
            badge.textContent = optionLetters[optIndex];

            const textSpan = document.createElement('span');
            textSpan.className = 'option-text-content';
            textSpan.textContent = optionText;

            item.appendChild(badge);
            item.appendChild(textSpan);

            // Set state class
            if (isPgSubmitted) {
                const correctOptIndex = question.correctIndex;
                if (optIndex === correctOptIndex) {
                    item.classList.add('correct');
                }
                if (userAnswers[currentQuestionIndex] === optIndex && optIndex !== correctOptIndex) {
                    item.classList.add('wrong');
                }
            } else {
                if (userAnswers[currentQuestionIndex] === optIndex) {
                    item.classList.add('selected');
                }
            }

            // Add click event for selection
            item.addEventListener('click', () => {
                if (isPgSubmitted) return;

                userAnswers[currentQuestionIndex] = optIndex;
                renderQuizPG(); // Refresh UI to update grid and list status
            });

            optionsList.appendChild(item);
        });

        card.appendChild(num);
        card.appendChild(text);
        
        if (question.image) {
            const img = document.createElement('img');
            img.src = question.image;
            img.className = 'question-img';
            img.style.maxWidth = '100%';
            img.style.borderRadius = '0.5rem';
            img.style.margin = '1rem auto';
            img.style.display = 'block';
            card.appendChild(img);
        }

        card.appendChild(optionsList);
        tabPg.appendChild(card);

        // C. Unified Control Bar (Sebelumnya, Kirim/Ulangi, Berikutnya)
        const controlBar = document.createElement('div');
        controlBar.className = 'quiz-nav-buttons';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'btn-nav-prev';
        prevBtn.disabled = currentQuestionIndex === 0;
        prevBtn.innerHTML = `
            <svg class="nav-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span class="hidden-xs">Sebelumnya</span>
        `;
        prevBtn.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                renderQuizPG();
            }
        });

        const submitBtn = document.createElement('button');
        submitBtn.id = 'btn-submit-pg';
        submitBtn.className = 'btn-quiz-action';
        if (isPgSubmitted) {
            submitBtn.innerHTML = `
                <svg class="action-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 4v6h-6"></path>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
                <span class="hidden-xs">Ulangi Kuis</span>
                <span class="visible-xs">Ulangi</span>
            `;
        } else {
            submitBtn.innerHTML = `
                <svg class="action-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span class="hidden-xs">Kirim Jawaban</span>
                <span class="visible-xs">Kirim</span>
            `;
        }
        submitBtn.addEventListener('click', handlePgSubmit);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn-nav-next';
        nextBtn.disabled = currentQuestionIndex === quizPG.length - 1;
        nextBtn.innerHTML = `
            <span class="hidden-xs">Berikutnya</span>
            <svg class="nav-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        `;
        nextBtn.addEventListener('click', () => {
            if (currentQuestionIndex < quizPG.length - 1) {
                currentQuestionIndex++;
                renderQuizPG();
            }
        });

        // ponytail: render controls into the sticky footer navigation bar if active
        controlBar.appendChild(prevBtn);
        controlBar.appendChild(submitBtn);
        controlBar.appendChild(nextBtn);

        const isPgActive = document.querySelector('.tab-btn[data-tab="pg"]').classList.contains('active');
        if (isPgActive) {
            const stickyNav = document.getElementById('quiz-sticky-nav');
            if (stickyNav) {
                stickyNav.innerHTML = '';
                stickyNav.appendChild(controlBar);
                stickyNav.style.display = 'block';
            }
        }

        // E. Score display if submitted
        if (isPgSubmitted) {
            renderScoreCard();
        }
    }

    function handlePgSubmit() {
        if (isPgSubmitted) {
            // Reset state
            isPgSubmitted = false;
            userAnswers = Array(quizPG.length).fill(null);
            currentQuestionIndex = 0;
            renderQuizPG();
            // Scroll back to top
            tabPg.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        // Check if there are unanswered questions
        const unansweredNumbers = [];
        userAnswers.forEach((ans, idx) => {
            if (ans === null) {
                unansweredNumbers.push(idx + 1);
            }
        });

        if (unansweredNumbers.length > 0) {
            alert(`Ada soal yang belum kamu isi nih! Silakan periksa nomor: ${unansweredNumbers.join(', ')} ya. 😊`);
            return;
        }

        // Submit the quiz
        isPgSubmitted = true;
        renderQuizPG();

        // Scroll to the score card
        const scoreCard = tabPg.querySelector('.quiz-score-card');
        if (scoreCard) {
            scoreCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function renderScoreCard() {
        let correctCount = 0;
        quizPG.forEach((q, idx) => {
            if (userAnswers[idx] === q.correctIndex) {
                correctCount++;
            }
        });

        const score = Math.round((correctCount / quizPG.length) * 100);

        let emoji = '💪';
        let feedback = '';

        if (score === 100) {
            emoji = '🌟';
            feedback = 'Luar Biasa! Semua jawabanmu benar. Pertahankan prestasimu! 🎉';
        } else if (score >= 70) {
            emoji = '👏';
            feedback = 'Bagus Sekali! Kamu sudah memahami materi dengan baik. 👍';
        } else {
            emoji = '💪';
            feedback = 'Ayo Semangat! Belajar lagi E-book nya dan coba kuis ini kembali ya! ❤️';
        }

        const scoreCard = document.createElement('div');
        scoreCard.className = 'quiz-score-card';
        scoreCard.innerHTML = `
            <div class="score-emoji">${emoji}</div>
            <h3 class="score-title">Nilai Kamu:</h3>
            <div class="score-value">${score}</div>
            <p class="score-feedback">${feedback}</p>
        `;
        tabPg.appendChild(scoreCard);
    }

    // ===== 3. Logika Soal Essay =====
    function renderQuizEssay() {
        tabEssay.innerHTML = ''; // Clear previous content

        // Title and description helper for children
        const infoTitle = document.createElement('h3');
        infoTitle.style.textAlign = 'center';
        infoTitle.style.marginBottom = '1rem';
        infoTitle.style.color = 'var(--color-blue-900)';
        infoTitle.textContent = 'Jawablah Pertanyaan Essay Berikut!';
        tabEssay.appendChild(infoTitle);

        // A. Question Navigation Grid (1 - 5)
        const gridContainer = document.createElement('div');
        gridContainer.className = 'quiz-nav-grid';

        for (let i = 0; i < quizEssay.length; i++) {
            const btn = document.createElement('button');
            btn.className = 'nav-grid-item';
            btn.textContent = i + 1;

            // Apply states
            if (i === currentEssayIndex) {
                btn.classList.add('active');
            }

            // Highlighting status: if answered
            if (essayAnswers[i] && essayAnswers[i].trim() !== '') {
                btn.classList.add('answered');
            }

            // Click navigation
            btn.addEventListener('click', () => {
                // Save current textarea value first
                const currentTextarea = tabEssay.querySelector('.essay-input');
                if (currentTextarea) {
                    essayAnswers[currentEssayIndex] = currentTextarea.value;
                }
                currentEssayIndex = i;
                renderQuizEssay();
            });

            gridContainer.appendChild(btn);
        }
        tabEssay.appendChild(gridContainer);

        // B. Active Question Card
        const question = quizEssay[currentEssayIndex];
        const card = document.createElement('div');
        card.className = 'question-card animate-fade-in';

        const num = document.createElement('div');
        num.className = 'question-num';
        num.textContent = `Pertanyaan ${currentEssayIndex + 1} dari ${quizEssay.length}`;

        const text = document.createElement('div');
        text.className = 'question-text';
        text.textContent = question.question;

        // Textarea input
        const textarea = document.createElement('textarea');
        textarea.className = 'essay-input';
        textarea.placeholder = 'Ketik jawabanmu di sini...';
        textarea.value = essayAnswers[currentEssayIndex];

        // Update answer when typing
        textarea.addEventListener('input', () => {
            essayAnswers[currentEssayIndex] = textarea.value;
            
            // Dynamically update the active button class on the grid
            const gridItems = gridContainer.querySelectorAll('.nav-grid-item');
            if (gridItems[currentEssayIndex]) {
                if (textarea.value.trim() !== '') {
                    gridItems[currentEssayIndex].classList.add('answered');
                } else {
                    gridItems[currentEssayIndex].classList.remove('answered');
                }
            }
        });

        // Action row for "Lihat Kunci Jawaban"
        const actionRow = document.createElement('div');
        actionRow.className = 'essay-action-row';

        const showAnswerBtn = document.createElement('button');
        showAnswerBtn.className = 'btn-show-answer';
        showAnswerBtn.textContent = isEssayAnswerVisible[currentEssayIndex] 
            ? 'Sembunyikan Kunci Jawaban' 
            : 'Lihat Kunci Jawaban';

        // Key answer box
        const keyBox = document.createElement('div');
        keyBox.className = 'key-answer-box';
        if (isEssayAnswerVisible[currentEssayIndex]) {
            keyBox.classList.add('visible');
        }
        
        const keyTitle = document.createElement('div');
        keyTitle.className = 'key-answer-title';
        keyTitle.textContent = 'Kunci Jawaban Resmi';

        const keyContent = document.createElement('div');
        keyContent.className = 'key-answer-content';
        keyContent.textContent = question.answer;

        keyBox.appendChild(keyTitle);
        keyBox.appendChild(keyContent);

        // Toggle show answer event
        showAnswerBtn.addEventListener('click', () => {
            const isVisible = keyBox.classList.toggle('visible');
            isEssayAnswerVisible[currentEssayIndex] = isVisible;
            showAnswerBtn.textContent = isVisible 
                ? 'Sembunyikan Kunci Jawaban' 
                : 'Lihat Kunci Jawaban';
        });

        actionRow.appendChild(showAnswerBtn);
        card.appendChild(num);
        card.appendChild(text);
        card.appendChild(textarea);
        card.appendChild(actionRow);
        card.appendChild(keyBox);
        tabEssay.appendChild(card);

        // C. Bottom Pagination Navigation
        const navRow = document.createElement('div');
        navRow.className = 'quiz-nav-buttons';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'btn-nav-prev';
        prevBtn.disabled = currentEssayIndex === 0;
        prevBtn.innerHTML = `
            <svg class="nav-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span class="hidden-xs">Sebelumnya</span>
        `;
        prevBtn.addEventListener('click', () => {
            essayAnswers[currentEssayIndex] = textarea.value;
            if (currentEssayIndex > 0) {
                currentEssayIndex--;
                renderQuizEssay();
            }
        });

        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn-nav-next';
        nextBtn.disabled = currentEssayIndex === quizEssay.length - 1;
        nextBtn.innerHTML = `
            <span class="hidden-xs">Berikutnya</span>
            <svg class="nav-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        `;
        nextBtn.addEventListener('click', () => {
            essayAnswers[currentEssayIndex] = textarea.value;
            if (currentEssayIndex < quizEssay.length - 1) {
                currentEssayIndex++;
                renderQuizEssay();
            }
        });

        // ponytail: render controls into the sticky footer navigation bar if active
        navRow.appendChild(prevBtn);
        navRow.appendChild(nextBtn);

        const isEssayActive = document.querySelector('.tab-btn[data-tab="essay"]').classList.contains('active');
        if (isEssayActive) {
            const stickyNav = document.getElementById('quiz-sticky-nav');
            if (stickyNav) {
                stickyNav.innerHTML = '';
                stickyNav.appendChild(navRow);
                stickyNav.style.display = 'block';
            }
        }
    }

    // ===== 4. Logika Tugas Praktik =====
    function renderQuizPraktik() {
        tabPraktik.innerHTML = ''; // Clear previous content

        const card = document.createElement('div');
        card.className = 'praktik-card animate-fade-in-up';

        const icon = document.createElement('img');
        icon.className = 'praktik-icon';
        icon.src = "images/wudhu-illustration.webp";
        icon.alt = "Ilustrasi Wudhu";

        const title = document.createElement('h2');
        title.className = 'praktik-title';
        title.textContent = praktikInfo.title;

        const instruction = document.createElement('p');
        instruction.className = 'praktik-instruction';
        instruction.textContent = praktikInfo.instruction;

        // Clean & format WhatsApp URL
        const phone = praktikInfo.whatsappNumber.startsWith('0') 
            ? '62' + praktikInfo.whatsappNumber.slice(1) 
            : praktikInfo.whatsappNumber;
        const encodedMessage = encodeURIComponent(praktikInfo.whatsappMessage);
        const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

        const waBtn = document.createElement('a');
        waBtn.className = 'btn-wa-praktik';
        waBtn.href = waUrl;
        waBtn.target = '_blank';
        waBtn.rel = 'noopener noreferrer';
        waBtn.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.016-5.08-2.868-6.932C16.357 2.022 13.896 1 11.278 1 5.877 1 1.477 5.4 1.474 10.803c-.001 1.545.426 3.05 1.237 4.4l-.409 1.492 1.528-.4 1.319.782c1.472-.876 2.923-1.323 4.417-1.323zm10.745-6.55c-.296-.148-1.748-.863-2.018-.962-.27-.099-.467-.148-.663.148-.197.297-.762.962-.934 1.16-.172.198-.344.223-.64.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.662-1.597-.908-2.193-.24-.578-.48-.5-.662-.51-.172-.008-.37-.01-.568-.01-.197 0-.52.074-.79.37-.27.296-1.03 1.012-1.03 2.47 0 1.458 1.06 2.867 1.208 3.065.148.198 2.086 3.186 5.055 4.47.706.305 1.257.487 1.687.625.71.226 1.357.194 1.868.118.57-.085 1.748-.714 1.994-1.402.245-.687.245-1.275.172-1.402-.073-.125-.27-.199-.567-.348z" />
            </svg>
            <span>Kirim Video ke WhatsApp</span>
        `;

        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(instruction);
        card.appendChild(waBtn);
        tabPraktik.appendChild(card);
    }

    // ===== Initialize App Data Rendering =====
    renderQuizPG();
    renderQuizEssay();
    renderQuizPraktik();
});
