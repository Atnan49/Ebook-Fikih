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
    // 1. Inisialisasi Tab Switcher
    // 2. Render Kuis PG & Essay
    // 3. Pasang Event Listeners untuk interaksi kuis
    console.log("Quiz App initialized! Siap dikodekan oleh Narendra.");
});
