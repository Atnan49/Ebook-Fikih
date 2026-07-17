# 📚 Smart E-Book Digital Fikih - Kelas 2 SD (Berbasis UDL)

Repositori ini berisi kode sumber aplikasi **Smart E-Book Digital Fikih Kelas 2 SD Semester 1**. Media pembelajaran ini dibangun menggunakan teknologi **HTML5, CSS3, dan Vanilla JavaScript murni** tanpa framework ataupun proses compile untuk memastikan aplikasi tetap ringan, portabel, dan dapat dijalankan secara offline.

---

## 🌟 Konsep Universal Design for Learning (UDL)
Media pembelajaran ini mengimplementasikan prinsip UDL tingkat **Standard** untuk memberikan aksesibilitas yang inklusif bagi anak-anak dengan beragam gaya belajar maupun kebutuhan khusus (seperti disleksia):

1. **Dyslexia Mode**: Pilihan untuk mengubah jenis font latin menjadi *OpenDyslexic* secara global di seluruh halaman.
2. **Text Zoom**: Kemampuan untuk menyesuaikan ukuran teks dasar dari **100% hingga 160%** secara responsif tanpa merusak tata letak visual.
3. **Text-to-Speech (TTS)**: Sistem pembacaan audio otomatis dan manual berbahasa Indonesia per slide materi menggunakan Web Speech API (`SpeechSynthesis`).
4. **Desain Ramah Sensorik**: Palet warna kontras tinggi namun lembut (Krem & Biru) yang nyaman di mata anak-anak dan menghindari kelelahan visual.

---

## 👥 Pembagian Peran & Tanggung Jawab Tim

Aplikasi ini dibagi menjadi beberapa modul utama yang dikerjakan oleh masing-masing pengembang sesuai dengan [SRS-EBOOK.md](file:///d:/Projek-web/Ebook/SRS-EBOOK.md):

### 1. Atnan (Developer E-Book & UDL)
* **Berkas Utama**: 
  * [ebook.html](file:///d:/Projek-web/Ebook/ebook.html) (Halaman Flipbook)
  * [js/app.js](file:///d:/Projek-web/Ebook/js/app.js) (Logika navigasi & UDL)
  * [css/ebook.css](file:///d:/Projek-web/Ebook/css/ebook.css) (Gaya visual E-Book)
  * [js/data.js](file:///d:/Projek-web/Ebook/js/data.js) (Materi Pembelajaran - *Shared*)
* **Tanggung Jawab**:
  * Membangun halaman bacaan e-book flipbook yang responsif dan interaktif ([ebook.html](file:///d:/Projek-web/Ebook/ebook.html)).
  * Mengimplementasikan panel **UDL Toolbar** (tombol Zoom Font, toggle TTS suara, toggle font OpenDyslexic, dan panel slide-in Daftar Isi).
  * Menyusun logika interaktivitas flipbook (prev/next, dot indicators, progress bar, keyboard navigation, dan swipe gesture untuk mobile) di [js/app.js](file:///d:/Projek-web/Ebook/js/app.js).
  * Membuat tampilan kartu bab pengantar khusus (Chapter Cover Slides) dengan gradasi warna biru tua statis.
  * Mengintegrasikan data materi 22 slide (Bab I Ketentuan Shalat Fardhu & Bab II Salat Berjamaah) lengkap dengan teks Arab (font Amiri), transliterasi, terjemahan, dan ilustrasi di [js/data.js](file:///d:/Projek-web/Ebook/js/data.js).
  * Membuat visual kartu ajakan kuis interaktif di akhir slide e-book yang mengarahkan pengguna ke halaman kuis.

### 2. Rifki (Developer Landing Page & Visual/CSS)
* **Berkas Utama**: 
  * [index.html](file:///d:/Projek-web/Ebook/index.html) (Landing Page)
  * [css/index.css](file:///d:/Projek-web/Ebook/css/index.css) (Gaya visual Landing Page)
  * [css/common.css](file:///d:/Projek-web/Ebook/css/common.css) (Gaya global & tema - *Shared*)
* **Tanggung Jawab**:
  * Merancang dan menyusun tata letak visual Landing Page ([index.html](file:///d:/Projek-web/Ebook/index.html)) agar menarik bagi anak-anak.
  * Membangun **Hero Section** dengan gradasi biru, subjudul dinamis, dan ilustrasi utama.
  * Membuat **Menu Utama** berupa 3 navigasi card interaktif dengan efek glassmorphism (E-Book, Kuis, Tanya Admin via WhatsApp).
  * Mendesain bagian Sinopsis Materi dan Hubungi Kami (Contact Person interaktif).
  * Menyusun sistem desain terstandarisasi di [css/common.css](file:///d:/Projek-web/Ebook/css/common.css) menggunakan CSS Variables (palet krem-biru), efek glassmorphism, serta transisi animasi halus (`@keyframes`).

### 3. Narendra (Developer Kuis Interaktif)
* **Berkas Utama**: 
  * [kuis.html](file:///d:/Projek-web/Ebook/kuis.html) (Halaman Kuis)
  * [js/quiz.js](file:///d:/Projek-web/Ebook/js/quiz.js) (Logika Kuis)
  * [css/kuis.css](file:///d:/Projek-web/Ebook/css/kuis.css) (Gaya visual Kuis)
  * [js/data.js](file:///d:/Projek-web/Ebook/js/data.js) (Data Bank Soal - *Shared*)
* **Tanggung Jawab**:
  * Menyusun halaman evaluasi kuis terintegrasi dengan sistem navigasi tab ([kuis.html](file:///d:/Projek-web/Ebook/kuis.html)).
  * Membangun logika evaluasi dan interaktivitas kuis di [js/quiz.js](file:///d:/Projek-web/Ebook/js/quiz.js):
    * **Tab Pilihan Ganda**: Pilihan opsi 3 alternatif (A, B, C), koreksi langsung (jawaban benar hijau/salah merah), skor akhir, dan feedback emoji apresiatif yang dinamis dengan navigasi grid soal berkelompok per bab dan sticky footer navigation.
    * **Tab Soal Essay**: Kolom input `textarea` untuk latihan mengetik mandiri serta tombol reveal kunci jawaban resmi untuk koreksi diri.
    * **Tab Tugas Praktik**: Panduan instruksi tugas praktik salat fardhu disertai tombol kirim video yang mengarah ke link WhatsApp pengoreksi secara otomatis.
  * Menyusun bank soal kuis (21 Pilihan Ganda, 6 Essay, dan 1 Tugas Praktik) di [js/data.js](file:///d:/Projek-web/Ebook/js/data.js).
  * Memastikan pergerakan antarmuka kuis menggunakan transisi yang halus dan tenang (`animate-fade-in` / `animate-fade-in-up`), serta menonaktifkan animasi yang memantul secara berlebihan agar ramah bagi sensorik siswa.

---

## 📂 Struktur Folder Proyek

Kondisi riil struktur berkas dalam proyek ini disusun sebagai berikut:

```text
.
├── index.html                          # Landing Page (Developer: Rifki)
├── ebook.html                          # Halaman Baca E-Book Flipbook (Developer: Atnan)
├── kuis.html                           # Halaman Kuis Interaktif (Developer: Narendra)
├── README.md                           # Dokumentasi proyek & pembagian tugas
├── SRS-EBOOK.md                        # Spesifikasi kebutuhan perangkat lunak (SRS)
├── TECHNICAL-HANDOVER-USER-MANUAL.md   # Dokumen handover teknis & manual pengguna
├── vercel.json                         # Konfigurasi deployment Vercel
├── css/                                # Folder Stylesheets (CSS)
│   ├── common.css                      # Gaya dasar global & tema warna (Developer: Rifki & Atnan)
│   ├── index.css                       # Gaya visual khusus Landing Page (Developer: Rifki)
│   ├── ebook.css                       # Gaya visual khusus E-Book (Developer: Atnan)
│   └── kuis.css                        # Gaya visual khusus Kuis (Developer: Narendra)
├── js/                                 # Folder Logika (JavaScript)
│   ├── data.js                         # Data static materi & bank soal kuis (Developer: Atnan & Narendra)
│   ├── app.js                          # Logika navigasi ebook & toolbar UDL (Developer: Atnan)
│   └── quiz.js                         # Logika interaksi & penilaian kuis (Developer: Narendra)
├── public/                             # Folder aset publik tambahan (font OpenDyslexic, dll.)
├── images/                             # Folder aset gambar ilustrasi pendukung
├── audio/                              # Folder rekaman audio lokal/offline
└── video/                              # Folder rekaman video instruksi/praktik
```

---

## 🚀 Cara Menjalankan Aplikasi Secara Lokal

Aplikasi ini dapat langsung dijalankan tanpa memerlukan proses *build* atau *compile*:

1. **Membuka File HTML Secara Langsung (Double-Click)**:
   * Buka berkas [index.html](file:///d:/Projek-web/Ebook/index.html) menggunakan peramban web (browser) favorit Anda seperti Google Chrome, Mozilla Firefox, atau Microsoft Edge.
2. **Menggunakan Local Development Server (Direkomendasikan)**:
   * Buka folder proyek menggunakan Visual Studio Code, lalu aktifkan ekstensi **Live Server**.
   * Alternatifnya, jalankan server Python sederhana dari terminal di direktori proyek:
     ```bash
     python -m http.server 8000
     ```
     Setelah itu, buka peramban web Anda dan akses alamat `http://localhost:8000`.
   * *Catatan: Menggunakan server lokal direkomendasikan agar seluruh fungsionalitas browser (seperti penyimpanan state di `localStorage` dan pemutaran audio/TTS) berjalan lebih optimal.*
