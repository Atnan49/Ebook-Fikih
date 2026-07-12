# 📚 Technical Handover & User Manual
## Smart E-Book Digital Fikih Kelas 2 SD (Berbasis UDL)

Dokumen ini berisi informasi teknis (**Technical Handover**) untuk pengembang yang akan memelihara aplikasi dan panduan operasional (**User Manual**) untuk pengguna akhir (guru, siswa, dan administrator).

---

## BAGIAN 1: DOKUMEN SERAH TERIMA TEKNIS (TECHNICAL HANDOVER)

### 1. Deskripsi Proyek & Arsitektur Sistem
Aplikasi **Smart E-Book Digital Fikih Kelas 2 SD Semester 1** dirancang sebagai media pembelajaran interaktif yang mandiri, portabel, dan sangat ringan. 
- **Arsitektur**: Aplikasi ini berbasis **Client-Side Static Web Application**. Tidak memerlukan backend database aktif, runtime server khusus, atau proses kompilasi (compiler/bundler).
- **Offline-First**: Seluruh logika navigasi, rendering konten, dan sistem kuis berjalan langsung di peramban (browser) pengguna secara lokal.
- **UDL Compliance**: Mengimplementasikan prinsip *Universal Design for Learning* tingkat Standard untuk mengakomodasi kebutuhan belajar siswa yang beragam, termasuk siswa dengan disleksia dan gaya belajar auditori.

### 2. Teknologi Utama (Tech Stack)
1. **Struktur Konten**: HTML5 Semantik untuk memastikan aksesibilitas pembaca layar (screen readers).
2. **Desain & Gaya**: 
   - CSS3 murni dengan variabel CSS ([css/common.css](file:///d:/Projek-web/Ebook/BukuFikih/css/common.css)) untuk kustomisasi tema terpusat.
   - Layout modern berbasis Flexbox dan Grid.
   - Efek visual Glassmorphism (`backdrop-filter`) untuk antarmuka yang premium.
   - Animasi CSS `@keyframes` yang halus untuk transisi slide.
3. **Logika & Interaktivitas**: 
   - Vanilla JavaScript (ES6+) murni tanpa pustaka eksternal (frameworkless).
   - Web Speech API (`SpeechSynthesis`) untuk pengucapan teks (TTS).
   - Web Audio (`HTMLAudioElement`) untuk pemutaran audio murattal Al-Qur'an dari CDN.
   - `localStorage` API untuk penyimpanan persistensi preferensi aksesibilitas siswa secara lokal.

---

### 3. Struktur Direktori Proyek
Berikut adalah struktur berkas dalam repositori dan pembagian tanggung jawab modul:

```text
BukuFikih/
├── index.html                          # Landing Page utama (Developer: Rifki)
├── ebook.html                          # Viewer E-Book Flipbook (Developer: Atnan)
├── kuis.html                           # Halaman Kuis 3 Tab (Developer: Narendra)
├── README.md                           # Panduan cepat developer & tim
├── SRS-EBOOK.md                        # Dokumen spesifikasi kebutuhan sistem
├── TECHNICAL-HANDOVER-USER-MANUAL.md   # Dokumen serah terima teknis & panduan pengguna
├── vercel.json                         # Konfigurasi deploy otomatis ke Vercel
├── css/
│   ├── common.css                      # Variabel warna global, tema, & font (Shared)
│   ├── index.css                       # Gaya visual khusus Landing Page
│   ├── ebook.css                       # Gaya visual khusus Flipbook & Toolbar UDL
│   └── kuis.css                        # Gaya visual khusus Kuis & Tab Switcher
├── js/
│   ├── data.js                         # Database statis materi & soal kuis (Shared)
│   ├── app.js                          # Logika viewer flipbook, UDL toolbar, & TTS (Atnan)
│   └── quiz.js                         # Logika kuis PG, Essay, & Integrasi WA (Narendra)
├── public/                             # Folder font OpenDyslexic & aset publik
├── images/                             # Folder ilustrasi grafis (Wudhu, Tayamum, dll.)
├── audio/                              # Aset audio offline (Murattal, Hadis, dsb.)
└── video/                              # Aset video lokal (Praktik shalat)
```

---

### 4. Detail Implementasi Fitur Aksesibilitas UDL

Fitur UDL dirancang untuk memberikan alternatif representasi informasi bagi siswa.

#### A. Dyslexia Mode (Font Ramah Disleksia)
- **Logika**: Tombol toggle di Toolbar UDL akan menambahkan kelas `dyslexia-mode` ke elemen `<body>`.
- **CSS**: Kelas ini memaksa perubahan keluarga font latin secara global menjadi *OpenDyslexic* (font yang dirancang khusus untuk meminimalkan rotasi huruf oleh penderita disleksia).
- **Persistensi**: Disimpan dalam `localStorage` dengan nama key `dyslexiaMode` (`"true"` / `"false"`), disinkronkan secara otomatis ketika berpindah halaman (misalnya dari E-Book kembali ke Landing Page).

#### B. Text Zoom (Skalabilitas Teks)
- **Logika**: Tombol `A-` dan `A+` menyesuaikan tingkat ukuran font dasar dari **100% hingga 160%** (dengan kenaikan 10% setiap klik).
- **Implementasi**: JavaScript mengubah kelas pada elemen `<html>` menjadi `font-scale-100` hingga `font-scale-160`. Unit CSS diatur menggunakan `rem` dan `em` agar seluruh tata letak membesar secara proporsional dan responsif.
- **Persistensi**: Disimpan dalam `localStorage` (`fontScale`).

#### C. Smart Text-to-Speech (TTS) Engine
Logika TTS pada [js/app.js](file:///d:/Projek-web/Ebook/BukuFikih/js/app.js) memiliki kompleksitas khusus untuk menangani penggabungan bahasa Indonesia dan Arab:
1. **Segmentasi Konten**: Slide dipecah menjadi beberapa segmen pembacaan (Intro slide, heading, teks utama, lafaz Arab, transliterasi, terjemahan).
2. **Audio Murattal Al-Qur'an & Hadis**:
   - Jika suatu blok materi memiliki properti `audio` lokal (misalnya `audio/quran_2_43.mp3`), sistem langsung memutar berkas lokal tersebut.
   - Jika berupa ayat Al-Qur'an online (memiliki metadata `surah` dan `ayahs`), sistem memutar audio rekaman Syekh Mishary Rasyid Al-Afasy dari CDN Al-Qur'an (`verses.quran.foundation/Alafasy/mp3/...`).
3. **Hadis / Arab Non-Al-Qur'an (Google TTS Fallback)**: Lafaz Arab yang bukan Al-Qur'an akan dibacakan menggunakan API Google Translate TTS (`https://translate.googleapis.com/translate_tts?ie=UTF-8&tl=ar&client=gtx&q=...`). Jika gagal atau diblokir, sistem menggunakan suara native Arab (`ar-SA`) Web Speech API, atau melompati lafaz jika tidak didukung.
4. **Normalisasi Teks Islami**: Sebelum teks dibacakan oleh suara Indonesia (`id-ID`), teks dibersihkan dari karakter Arab, dan singkatan seperti *SAW.* dibaca *"shallallahu alaihi wasallam"*, *SWT.* dibaca *"subhanahu wata'ala"*, dan *H.R.* dibaca *"Hadis Riwayat"*. Teks transliterasi dilewati jika audio Arab sudah berhasil diputar untuk mencegah pengulangan verbal yang membosankan. Fitur ini didukung fungsi utilitas `stripArabicChars`, `stripDiacritics`, dan `normalizeIslamicText`.

---

### 5. Detail Modul Kuis Interaktif
Diimplementasikan dalam [js/quiz.js](file:///d:/Projek-web/Ebook/BukuFikih/js/quiz.js):
- **Sistem Navigasi Grid Soal**: Kuis Pilihan Ganda (PG) dan Essay menampilkan nomor soal yang dikelompokkan berdasarkan bab pelajaran secara visual (Bab 1: Salat Fardhu, Bab 2: Mendirikan Salat Berjamaah). Siswa dapat melompat antar soal menggunakan tombol navigasi grid atau tombol pagination ("Sebelumnya" / "Berikutnya").
- **Sticky Footer Navigation**: Menampilkan panel kontrol navigasi tetap (sticky) di bagian bawah layar saat mengerjakan kuis agar ramah terhadap layar gawai (mobile) anak-anak.
- **Tab Pilihan Ganda**: Merender 21 soal dari bank soal secara dinamis. Mendukung visual state aktif `.selected`, koreksi visual instan `.correct` (hijau) dan `.wrong` (merah) setelah pengiriman, serta kalkulasi nilai akhir instan dengan feedback emoji apresiatif (🌟 untuk nilai 100, 👏 untuk nilai >= 70, 💪 untuk nilai < 70).
- **Tab Soal Essay**: Merender 6 soal latihan menulis untuk melatih ketikan siswa secara mandiri. Evaluasi dilakukan secara mandiri menggunakan tombol toggle "Lihat Kunci Jawaban" untuk mencocokkan hasil ketikan dengan kunci jawaban resmi.
- **Tab Tugas Praktik**: Mengarahkan siswa langsung ke tautan WhatsApp guru/admin dengan template pesan dinamis menggunakan fungsi `encodeURIComponent()` untuk menyerahkan bukti rekaman video praktik salat fardhu.

---

### 6. Panduan Pemeliharaan & Kustomisasi Konten (Developer Guide)

Seluruh konfigurasi konten berada di [js/data.js](file:///d:/Projek-web/Ebook/BukuFikih/js/data.js). Anda tidak perlu mengubah berkas HTML atau logika JS utama untuk menambah/mengubah materi.

#### A. Menambahkan Slide E-Book Baru
Tambahkan objek slide baru di dalam array `slides` di [js/data.js](file:///d:/Projek-web/Ebook/BukuFikih/js/data.js):

```javascript
{
  id: 23, // Lanjutkan ID berikutnya
  bab: 2,  // Bab terkait (1 atau 2)
  subBab: "Sub Bab Baru",
  title: "Judul Slide Baru",
  image: "images/nama_gambar.png", // Opsional, hapus baris ini jika tanpa gambar
  content: [
    { type: "heading", content: "Sub Judul Dalam Slide" },
    { type: "text", content: "Teks penjelasan materi baru." },
    { type: "note", content: "Catatan penting di dalam kotak." }
  ]
}
```

*Jika slide berisi teks Arab dan ayat Al-Qur'an/Hadis dengan audio:*
```javascript
{
  type: "arabic",
  content: "وَأَقِيمُوا الصَّلَاةَ", // Lafaz Arab
  surah: 2,                       // Nomor surah Al-Qur'an (Opsional)
  ayahs: [43],                    // Array nomor ayat (Opsional)
  audio: "audio/quran_2_43.mp3"   // Sumber audio lokal (Sangat disarankan untuk hadis/ayat)
}
```

#### B. Mengubah Soal Kuis Pilihan Ganda (PG)
Ubah array `quizPG` pada [js/data.js](file:///d:/Projek-web/Ebook/BukuFikih/js/data.js):
```javascript
{
  id: 1,
  bab: 1,
  question: "Pertanyaan baru di sini?",
  options: ["Opsi A (Benar)", "Opsi B", "Opsi C"], // Kelas 2 SD disarankan 3 opsi
  correctIndex: 0 // Index jawaban yang benar (0 untuk Opsi A, 1 untuk B, 2 untuk C)
}
```

#### C. Mengubah Kontak WhatsApp Pengumpulan Tugas Praktik
Cari objek `praktikInfo` di bagian paling bawah [js/data.js](file:///d:/Projek-web/Ebook/BukuFikih/js/data.js):
```javascript
const praktikInfo = {
  title: "Praktik Salat Fardhu",
  instruction: "KIRIMKAN VIDEO KALIAN BERUPA PRAKTIK SALAT FARDHU!",
  whatsappNumber: "088989320145", // Nomor tujuan guru (format lokal atau internasional)
  whatsappMessage: "Assalamu'alaikum, saya ingin mengirimkan video praktik shalat fardhu untuk tugas Fikih." // Pesan template otomatis
};
```

---

### 7. Deployment & Eksekusi Lokal
Aplikasi ini tidak memiliki dependensi Node.js yang wajib untuk dijalankan.
- **Menjalankan di Lokal**:
  1. Buka folder ini di Visual Studio Code, klik kanan `index.html` dan pilih **Open with Live Server**.
  2. Atau jalankan server sederhana dengan Python di terminal:
     ```bash
     python -m http.server 8000
     ```
     Akses `http://localhost:8000` di browser Anda.
- **Deployment**:
  Repositori ini sudah siap dideploy ke **Vercel** / **Netlify** / **GitHub Pages**. Cukup hubungkan repositori Git ke layanan tersebut, sistem akan langsung mengenali `index.html` sebagai entry point utama tanpa memerlukan build command.

---

## BAGIAN 2: PANDUAN PENGGUNA (USER MANUAL)

Panduan ini ditujukan bagi Guru atau Wali Murid untuk membimbing siswa kelas 2 SD dalam menggunakan media pembelajaran ini.

### 1. Membuka Aplikasi
1. Buka peramban web (seperti Google Chrome / Microsoft Edge) pada Laptop, Tablet, atau HP Android.
2. Akses alamat web e-book yang sudah dibagikan oleh guru, atau klik dua kali berkas `index.html` jika dijalankan secara luring (offline) dari flashdisk.

---

### 2. Menu Utama (Landing Page)
Saat pertama kali membuka aplikasi, Anda akan disambut oleh halaman utama yang interaktif:
- **Judul Utama**: "Smart E-Book Digital Fikih Kelas 2 SD".
- **Menu Navigasi Utama**:
  1. **📖 E-Book**: Klik tombol ini untuk masuk ke halaman bacaan flipbook interaktif.
  2. **✏️ Kuis-Kuis**: Klik tombol ini untuk langsung menuju halaman kuis.
  3. **? Pertanyaan**: Klik tombol ini untuk langsung menghubungi guru/admin melalui WhatsApp jika ada kendala belajar.
- **Sinopsis**: Berisi ulasan singkat mengenai dasar pengembangan media pembelajaran ini berbasis UDL.
- **Contact Person**: Tombol cepat untuk menghubungi pengembang atau guru via WhatsApp, Email, Instagram, dan Telegram.

---

### 3. Cara Menggunakan Viewer E-Book (`ebook.html`)

Halaman membaca e-book dirancang menyerupai buku saku digital yang inklusif.

![Toolbar UDL](https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400) *(Ilustrasi visual membaca)*

#### A. Menggunakan UDL Accessibility Toolbar (Bagian Atas)
Di bagian atas halaman, terdapat bilah peralatan khusus untuk menyesuaikan tampilan demi kenyamanan belajar anak:
- **Pengaturan Ukuran Huruf (A- & A+)**: 
  - Jika tulisan terasa terlalu kecil, tekan tombol **`A+`**. 
  - Jika terlalu besar, tekan tombol **`A-`**. 
  - Ukuran akan berubah dari 100% sampai 160% secara proporsional.
- **Mode Disleksia (Tombol "Disleksia")**:
  - Klik tombol **`Disleksia`** untuk mengubah huruf menjadi jenis *OpenDyslexic*. Huruf ini memiliki bagian bawah yang lebih tebal sehingga membantu siswa dengan disleksia agar lebih mudah membedakan huruf seperti 'b' dan 'd'.
- **Bantuan Suara / Text-to-Speech (🔊 / 🔇)**:
  - Klik tombol speaker **`🔊/🔇`** untuk mengaktifkan pembacaan suara.
  - Saat aktif, sistem secara otomatis akan membacakan judul slide, materi teks, lafaz Arab, hingga terjemahannya saat Anda membuka halaman tersebut.
  - Untuk menghentikan sementara suara yang sedang berbicara, tekan tombol **`Berhenti`** di bilah status merah yang muncul di bawah header.
- **Daftar Isi (Tombol ☰)**:
  - Klik tombol menu **`☰`** untuk membuka laci daftar isi dari samping. Anda dapat langsung melompat ke slide atau bab tertentu hanya dengan sekali klik.

#### B. Navigasi Membalik Halaman
Anda dapat membalik halaman buku (slide) dengan beberapa cara:
1. **Tombol Navigasi Bawah**: Klik tombol **`Sebelumnya`** (kiri) atau **`Berikutnya`** (kanan).
2. **Indikator Bulat (Dots)**: Klik titik-titik kecil di bagian bawah layar untuk melompat ke halaman spesifik.
3. **Keyboard**: Tekan tombol **Panah Kanan** atau **Spasi** untuk maju ke halaman berikutnya, dan **Panah Kiri** untuk kembali ke halaman sebelumnya.
4. **Geser Layar (Swipe Gesture)**: Pada perangkat HP atau tablet, Anda cukup mengusap (swipe) layar ke kiri atau ke kanan dengan jari untuk membalik halaman.

---

### 4. Menggunakan Halaman Kuis (`kuis.html`)
Evaluasi dibagi menjadi 3 kategori utama menggunakan sistem tab di bagian atas halaman:

#### A. Tab Pilihan Ganda (PG)
1. Baca soal yang tampil di layar. Anda dapat melompat ke soal lain dengan mengeklik nomor di bagian atas soal.
2. Klik salah satu opsi **A**, **B**, atau **C** yang Anda anggap paling benar. Kotak pilihan yang terpilih akan berwarna biru muda.
3. Setelah semua soal terisi, tekan tombol **`Kirim Jawaban`** di bilah bawah.
4. Hasil evaluasi akan langsung keluar secara otomatis:
   - Jawaban benar akan berwarna **Hijau**.
   - Jawaban salah akan berwarna **Merah**.
   - Kartu nilai akan muncul di bagian paling bawah lengkap dengan emoji bintang (🌟), tepuk tangan (👏), atau ikon semangat (💪) sesuai dengan pencapaian nilai Anda.
5. Untuk mencoba lagi, klik tombol **`Ulangi Kuis`**.

#### B. Tab Soal Essay
1. Jawab pertanyaan tertulis dengan cara mengetik langsung jawaban Anda pada kolom teks yang disediakan di bawah pertanyaan.
2. Untuk mencocokkan apakah jawaban Anda sudah benar secara konsep, klik tombol **`Lihat Kunci Jawaban`** di bawah kolom jawaban.
3. Kotak kunci jawaban resmi akan muncul untuk dijadikan bahan evaluasi mandiri oleh siswa atau wali murid.

#### C. Tab Tugas Praktik
1. Bacalah instruksi tugas praktik salat fardhu yang diberikan.
2. Rekam video anak saat mempraktikkan gerakan salat fardhu dengan durasi singkat.
3. Klik tombol hijau besar **`Kirim Video ke WhatsApp`**. Anda akan diarahkan ke aplikasi WhatsApp Guru secara otomatis dengan teks pengantar tugas yang sudah terisi. Lampirkan berkas video rekaman Anda lalu kirimkan.

---
*Dokumen ini diserahterimakan untuk pemeliharaan berkelanjutan.*
*Semoga media pembelajaran Smart E-Book Digital Fikih ini bermanfaat bagi guru, wali murid, dan seluruh siswa.*
