# 📚 Smart E-Book Digital Fikih - HTML Version (Pembagian Tugas)

Repositori ini adalah versi mandiri (standalone) dari Smart E-Book Fikih Kelas 2 SD yang dibangun menggunakan **HTML5, CSS3, dan Vanilla JavaScript murni**.

---

## 👥 Pembagian Tugas & Tanggung Jawab

Aplikasi ini dibagi menjadi 3 bagian utama yang dikerjakan oleh masing-masing personil:

### 1. Atnan (Lead Developer & UI Designer)
* **File Utama**:
  * [index.html](file:///d:/Projek-web/Ebook/Html%20Version/index.html) (Landing Page)
  * [css/style.css](file:///d:/Projek-web/Ebook/Html%20Version/css/style.css) (Global Stylesheet)
* **Tanggung Jawab**:
  * Mengintegrasikan layout dasar dan menyusun kerangka HTML semua halaman.
  * Membangun sistem desain di `css/style.css` menggunakan CSS Variables (warna Biru + Krem, font, bayangan, border-radius, dan transisi).
  * Mengimplementasikan efek **glassmorphism** dan **animasi interaktif** (fade-in, slide, float, pulse) agar tampilan premium.
  * Mendesain halaman Landing Page yang menarik lengkap dengan sinopsis, logo/ilustrasi utama, contact person, dan footer.

### 2. Rifki (Content & E-Book Specialist)
* **File Utama**:
  * [ebook.html](file:///d:/Projek-web/Ebook/Html%20Version/ebook.html) (Halaman Flipbook E-Book)
  * [js/data.js](file:///d:/Projek-web/Ebook/Html%20Version/js/data.js) (Data Slides & Materi)
  * [js/app.js](file:///d:/Projek-web/Ebook/Html%20Version/js/app.js) (Logika E-Book & Fitur UDL)
* **Tanggung Jawab**:
  * Memasukkan data materi 23 slide (Bab 1 Thaharah & Bab 2 Adzan/Iqamah) lengkap dengan teks Arab (font Amiri), transliterasi, terjemahan, dan ilustrasi di `js/data.js`.
  * Membangun sistem flipbook slider di `ebook.html` (tombol prev/next, dot indicators, progress bar, keyboard navigation arrow keys, dan swipe gesture untuk mobile).
  * Membuat fitur aksesibilitas **Universal Design for Learning (UDL)** di `js/app.js`:
    * Pengubah ukuran font (A- / A+) dengan menyimpan preferensi ke `localStorage`.
    * Pengubah jenis font disleksia (OpenDyslexic toggle).
    * Fitur **Text-to-Speech (TTS)** menggunakan Web Speech API untuk membaca teks per slide otomatis atau manual.
    * Daftar Isi (Table of Contents) sidebar panel slide-in.

### 3. Narendra (Quiz & Interactive System Developer)
* **File Utama**:
  * [kuis.html](file:///d:/Projek-web/Ebook/Html%20Version/kuis.html) (Sistem Kuis Interaktif)
  * [js/quiz.js](file:///d:/Projek-web/Ebook/Html%20Version/js/quiz.js) (Logika Kuis)
* **Tanggung Jawab**:
  * Menyusun bank soal kuis (10 Pilihan Ganda, 5 Soal Essay, dan 1 Tugas Praktik) di `js/data.js` atau di dalam file kuis.
  * Membangun halaman `kuis.html` yang terbagi atas 3 tab interaktif: **Pilihan Ganda**, **Essay**, dan **Praktik**.
  * Membuat logika kuis di `js/quiz.js`:
    * **Pilihan Ganda**: Memilih opsi jawaban, melacak jawaban benar/salah secara langsung, menampilkan skor akhir dengan feedback emoji apresiasi dinamis.
    * **Essay**: Menampilkan textarea untuk input jawaban pengguna dan tombol "Lihat Kunci Jawaban" untuk melakukan koreksi mandiri secara interaktif.
    * **Praktik**: Tombol kirim video wudhu/tayamum otomatis terarah ke link WhatsApp pengoreksi (Nomor: 088989320145).

---

## 📂 Struktur Folder Proyek

```text
Html Version/
├── README.md           # File dokumentasi pembagian tugas
├── index.html          # Halaman Utama (Dikerjakan oleh: Atnan)
├── ebook.html          # Halaman Baca Buku (Dikerjakan oleh: Rifki)
├── kuis.html           # Halaman Evaluasi Kuis (Dikerjakan oleh: Narendra)
├── css/
│   └── style.css       # CSS utama & variabel (Dikerjakan oleh: Atnan)
└── js/
    ├── data.js         # Data slide & kuis (Dikerjakan oleh: Atnan)
    ├── app.js          # Logika Ebook & UDL (Dikerjakan oleh: Atnan)
    └── quiz.js         # Logika kuis interaktif (Dikerjakan oleh: Narendra)
```

*Catatan: Pastikan untuk menempatkan file font `OpenDyslexic` di dalam folder `/public/fonts/` dan gambar ilustrasi di `/public/images/` agar dapat diakses dengan mudah.*
