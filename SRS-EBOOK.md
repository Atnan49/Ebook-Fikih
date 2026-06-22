# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## Media Pembelajaran Fikih Interaktif Berbasis UDL (Kelas 2 SD)

---

## 1. PENDAHULUAN

### 1.1 Ringkasan Produk
Produk ini adalah **Smart E-Book Digital Fikih Interaktif** yang dirancang sebagai media pembelajaran kelas 2 SD Semester 1. Aplikasi web dibangun menggunakan teknologi **HTML5, CSS3, dan Vanilla JavaScript murni (tanpa framework/proses compile)** untuk memastikan keringanan performa, kecepatan loading, portabilitas offline, dan kebebasan instalasi.

### 1.2 Konsep Universal Design for Learning (UDL)
Media pembelajaran ini mengimplementasikan prinsip UDL tingkat **Standard**, yaitu memberikan fleksibilitas bagi pengguna dengan berbagai tingkat kemampuan membaca, termasuk siswa berkesulitan membaca (seperti disleksia) maupun pembelajar bergaya auditori. 

Fitur UDL utama yang wajib tersedia:
1. **Dyslexia Mode**: Opsi untuk mengubah jenis font latin menjadi *OpenDyslexic* secara global.
2. **Text Zoom**: Skalabilitas ukuran teks dari 100% hingga 160% tanpa merusak tata letak (responsive layout).
3. **Text-to-Speech (TTS)**: Pembacaan audio otomatis/manual untuk setiap slide dengan suara berbahasa Indonesia menggunakan Web Speech API (`SpeechSynthesis`).
4. **Desain Ramah Sensorik**: Palet warna kontras tinggi namun lembut di mata (Biru & Krem), menjauhi warna gelap yang melelahkan mata anak-anak.

---

## 2. ARSITEKTUR & STRUKTUR TEKNIS

### 2.1 Teknologi Utama
* **Struktur**: HTML5 (semantik, ramah pembaca layar).
* **Gaya & Layout**: CSS3 (Flexbox, Grid, CSS Variables, Glassmorphism, CSS `@keyframes` Animations).
* **Interaktivitas**: Vanilla JavaScript (ES6+), DOM Manipulation, Web Speech API (`SpeechSynthesis`), dan `localStorage` API untuk persistensi data pengguna.

### 2.2 Struktur File Proyek
```text
Html Version/
├── README.md           # Panduan umum dan pembagian tugas tim
├── index.html          # Landing Page (Developer: Rifki)
├── ebook.html          # Halaman E-Book Flipbook (Developer: Atnan)
├── kuis.html           # Halaman Kuis Interaktif (Developer: Narendra)
├── css/
│   └── style.css       # File stylesheet global & tema warna (Developer: Rifki & Atnan)
└── js/
    ├── data.js         # Data static materi slide & kuis (Developer: Atnan & Narendra)
    ├── app.js          # Logika navigasi ebook & UDL toolbar (Developer: Atnan)
    └── quiz.js         # Logika interaktivitas kuis & evaluasi (Developer: Narendra)
```

---

## 3. SPESIFIKASI KEBUTUHAN SISTEM (FEATURES SPECIFICATION)

### 3.1 Landing Page (`index.html`) - [Developer: Rifki]
* **Hero Section**:
  * Judul: "Smart E-Book Digital - Fikih Kelas 2 SD" dengan efek gradien biru.
  * Subjudul: "Pembelajaran Fikih yang Inklusif & Interaktif".
  * Gambar ilustrasi utama (`muslim_children_reading`).
* **Menu Utama (3 Navigasi Card - Glassmorphism)**:
  1. **E-Book**: Menuju halaman `ebook.html`.
  2. **Kuis-Kuis**: Menuju halaman `kuis.html`.
  3. **Pertanyaan**: Tombol luar mengarah ke WhatsApp admin dengan parameter pesan otomatis yang ramah anak.
* **Sinopsis Section**:
  * Teks penjelasan singkat isi materi E-book (Thaharah & Ketentuan Adzan/Iqamah) bersanding dengan dekorasi ilustrasi yang relevan.
* **Hubungi Kami (Contact Person)**:
  * WhatsApp, Email (Gmail), Instagram, dan Telegram dalam bentuk tombol interaktif.
* **Footer**:
  * Quote penutup yang ramah anak dan hak cipta aplikasi.

### 3.2 Halaman E-Book & UDL Toolbar (`ebook.html`, `js/app.js`) - [Developer: Atnan]
* **Toolbar Aksesibilitas UDL (Header Halaman)**:
  * **Tombol A- & A+**: Mengubah ukuran font dasar. Rentang skala 100%, 110%, 120%, 130%, 140%, 150%, 160%.
  * **Tombol Suara (🔊 / 🔇)**: Toggle untuk menyalakan/mematikan Text-to-Speech (TTS).
  * **Tombol Font Disleksia (Standard ↔ Disleksia)**: Mengubah font secara global menjadi OpenDyslexic dengan menambahkan class `dyslexia-mode` pada tag `<body>`.
  * **Tombol Menu (☰)**: Membuka sidebar panel Daftar Isi (Table of Contents).
* **Chapter Cover Slides (Slide Awal Bab)**:
  * Di setiap awal Bab (Bab I & Bab II), terdapat slide pengantar/cover khusus dengan tampilan kartu bergradasi premium biru gelap (`from-blue-700 via-blue-600 to-blue-500`) dan teks putih berukuran besar secara statis (tanpa animasi internal yang mengganggu seperti float/shimmer) sebelum masuk ke materi pembelajaran.
* **Flipbook Card**:
  * Merender konten dari `data.js` secara dinamis sesuai indeks slide aktif.
  * Mendukung pembacaan jenis konten:
    * `text`: Teks paragraf biasa.
    * `arabic`: Teks beraksara Arab dengan font khusus (Amiri), bertulis kanan-ke-kiri (RTL), ukuran minimal 1.5em.
    * `transliteration`: Teks latin miring sebagai ejaan bacaan arab.
    * `translation`: Arti teks dalam tanda petik.
    * `list`: Elemen daftar berpoin.
    * `note`: Catatan penting dengan latar belakang kontras.
    * `image`: Gambar ilustrasi pelengkap slide (misal: tata cara wudhu, ilustrasi masjid).
* **Navigasi & Progress**:
  * Tombol **Sebelumnya (Prev)** dan **Berikutnya (Next)**.
  * Dot Indicators di bagian bawah flipbook yang aktif sesuai slide saat ini.
  * Progress Bar horizontal penunjuk persentase penyelesaian membaca.
  * Dukungan kontrol tombol keyboard (Panah Kiri untuk Prev, Panah Kanan untuk Next, Space untuk Next).
  * Dukungan swipe gesture pada layar sentuh (mobile).
* **Ajakan Kuis Akhir**:
  * Di bagian akhir e-book (slide terakhir), terdapat kartu ajakan kuis interaktif berlatar krim lembut statis dengan teks *"Sudah siap ngerjain kuis?"* dan tombol *"Mulai Kuis Sekarang! 🚀"* yang mengarah ke `kuis.html`.
  * Tombol navigasi "Berikutnya" di bilah navigasi bawah otomatis berubah menjadi tombol **Mulai Kuis ✏️** (mengarah ke `kuis.html`) saat berada di halaman terakhir.

### 3.3 Halaman Kuis (`kuis.html`, `js/quiz.js`) - [Developer: Narendra]
* **Sistem Navigasi Tab**:
  * **Tab Pilihan Ganda**:
    * Merender pertanyaan PG secara dinamis dari `data.js`.
    * Setiap soal memiliki 3 opsi pilihan (A, B, C).
    * Saat opsi diklik, berubah warna menjadi biru muda (state `.selected`).
    * Tombol **Kirim Jawaban**: Saat diklik, sistem akan mengunci opsi, mewarnai jawaban benar dengan warna hijau (`.correct`) dan jawaban salah dengan warna merah (`.wrong`), serta menghitung skor total.
    * Menampilkan ulasan skor dengan emoji feedback yang sesuai (misal: 🌟 untuk skor tinggi, 👏 untuk skor sedang, dan 💪 untuk skor rendah).
  * **Tab Soal Essay**:
    * Merender pertanyaan essay secara dinamis.
    * Menyediakan kolom input teks (`textarea`) untuk diisi mandiri oleh siswa.
    * Tombol **Lihat Kunci Jawaban**: Saat diklik, menampilkan kunci jawaban resmi di bawah kolom input untuk evaluasi mandiri.
  * **Tab Tugas Praktik**:
    * Menampilkan panduan instruksi tugas praktik wudhu/tayamum.
    * Tombol **Kirim Video via WhatsApp**: Membuat link dinamis WhatsApp yang langsung mengarah ke nomor guru dengan template pesan tugas yang otomatis ter-encode.
* **Gaya Animasi Halus & Tenang**:
  * Seluruh komponen kuis (soal, opsi, dan kunci jawaban) tetap menggunakan animasi masuk yang mulus (`animate-fade-in-up` / `animate-fade-in`), tetapi menonaktifkan seluruh efek memantul (`animate-bounce-in`) agar transisi terasa lebih halus dan tidak melelahkan mata anak-anak.

---

## 4. PERSYARATAN NON-FUNGSIONAL (NON-FUNCTIONAL REQUIREMENTS)

### 4.1 Desain Visual & Konsistensi Warna
Palet warna yang dikonfigurasi dalam `css/style.css` harus dipatuhi secara konsisten:
* **Background Utama**: `linear-gradient` bernuansa Krem Hangat (`#FFFDF7` ke `#FFF8E7`) dan Biru Muda (`#EBF5FF`).
* **Elemen Interaktif (Primary)**: Biru (`#5B9BD5` ke `#2563A0`).
* **Elemen Interaktif (Secondary)**: Krem-Emas (`#EDDBB3` ke `#E0C990`).
* **Warna Teks Utama**: Navy Gelap (`#0F2940`).
* **Warna Status**: Hijau (`#4CAF50`), Merah (`#EF5350`), Emas (`#D4A843`).
* **Efek Glassmorphism**: Gunakan `background: rgba(255, 255, 255, 0.7)` dengan kombinasi `backdrop-filter: blur(20px)` untuk seluruh panel kartu utama.

### 4.2 Kinerja & Kecepatan Akses
* Aset gambar (`.png`) harus dioptimalkan ukurannya (di bawah 100KB per gambar jika memungkinkan) untuk menghindari loading lambat pada koneksi internet HP 3G/4G sekolah.
* Bebas dari eksternal dependency besar: Semua fungsionalitas harus menggunakan API bawaan browser (Web Speech API untuk audio, LocalStorage untuk preferensi).

### 4.3 Persistensi Data (Preferences Persistence)
Preferensi pengguna berikut harus disimpan menggunakan `localStorage` agar tidak ter-reset ketika pengguna menutup tab atau me-refresh halaman:
* `dyslexiaMode` (`true` | `false`)
* `fontScale` (`100` s.d `160`)
* `ttsEnabled` (`true` | `false`)

---

## 5. DISTRIBUSI JOBS & VERIFIKASI

Setiap developer bertanggung jawab penuh atas kualitas kode, kompatibilitas mobile, serta minimnya bug di file-file tugasnya.

* **Atnan**: Bertanggung jawab penuh terhadap fungsionalitas E-Book, struktur navigasi slide, pembacaan TTS, penyimpanan preferensi pengguna, dan data terstruktur slides di `data.js`.
* **Rifki**: Bertanggung jawab penuh terhadap daya tarik visual landing page (`index.html`) dan standarisasi kerangka CSS global di `style.css` (termasuk keselarasan warna krem-biru, animasi, dan glassmorphism).
* **Narendra**: Bertanggung jawab penuh terhadap kelancaran logika kuis (scoring PG, reveal kunci jawaban essay, tab-switcher kuis, dan data terstruktur quizzes di `data.js`).
