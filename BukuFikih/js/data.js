/* ==========================================================================
   [JOB: Atnan & Narend] Data File - E-Book Slides & Quiz Questions
   ========================================================================== */

/**
 * Atnan:
 * Gunakan variabel `slides` dan `babInfo` di bawah ini untuk menampilkan flipbook di ebook.html.
 * Anda dapat memodifikasi isi text jika diperlukan, namun kerangkanya sudah lengkap.
 */
const slides = [
  // BAB I: Memahami Ketentuan Shalat fardhu
  {
    id: 1, bab: 1, subBab: "Pendahuluan", title: "BAB I: Memahami Ketentuan Shalat fardhu", image: "images/Picture1.jpg", isCover: true,
    content: [
      { type: "heading", content: "Mari kita belajar tentang shalat fardhu" },
      { type: "text", content: "Tahukah kalian ibadah pokok umat Islam? Apakah kalian mengerjakan? Ibadah pokok umat Islam adalah shalat." },
      { type: "text", content: "Umat Islam wajib mengerjakan shalat. Karena shalat sebagai tiang agama dan rukun Islam kedua." }
    ]
  },
  {
    id: 2, bab: 1, subBab: "Pengertian Shalat Fardhu", title: "Fakta Penting Tentang Salat", image: "images/Picture2.jpg",
    content: [
      { type: "list", content: "Fakta Penting:", items: [
        "Salat artinya doa.",
        "Salat adalah ibadah pokok umat Islam.",
        "Salat terdiri atas bacaan dan gerakan.",
        "Salat diawali dengan takbiratulihram. Allahu Akbar.",
        "Salat diakhiri dengan salam. Assalamu'alaikum warahmatullah.",
        "Gerakan dan bacaan salat harus tertib. Tidak boleh diacak sesuka hati."
      ]},
      { type: "note", content: "Kata kunci: Salat = doa. Allahu Akbar. Assalamu'alaikum warahmatullah. Salat dimulai dengan takbir. Salat diakhiri dengan salam." }
    ]
  },
  {
    id: 3, bab: 1, subBab: "Pengertian Shalat Fardhu", title: "Perintah Shalat", image: "images/Picture3.jpg",
    content: [
      { type: "text", content: "Perintah salat berasal dari Allah Swt. Perintah itu ada di dalam Al-Qur'an." },
      { type: "heading", content: "Surah Al-Baqarah Ayat 43" },
      { type: "arabic", content: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ" },
      { type: "translation", content: '"Tegakkanlah salat, tunaikanlah zakat, dan rukuklah beserta orang-orang yang rukuk."' },
      { type: "heading", content: "Hadis Nabi Muhammad saw." },
      { type: "arabic", content: "صَلُّوْا كَمَا رَأَيْتُمُوْنِي أُصَلِّي" },
      { type: "translation", content: '"Salatlah kamu sebagaimana kamu melihat aku salat." (H.R. al-Bukhari)' },
      { type: "note", content: "Kata kunci: Salat itu perintah Allah Swt. Kita mengerjakan salat mencontoh cara Nabi Muhammad saw." }
    ]
  },
  {
    id: 4, bab: 1, subBab: "Ketentuan Shalat Fardhu", title: "Syarat Wajib Salat", image: "images/Picture4.jpg",
    content: [
      { type: "text", content: "Syarat sebelum wajib mengerjakan salat." },
      { type: "list", content: "Syarat Wajib:", items: [
        "Beragama Islam, laki-laki maupun perempuan.",
        "Sudah balig atau cukup umur. Anak-anak tetap dilatih salat.",
        "Berakal sehat, tidak hilang akal.",
        "Suci dari haid dan nifas, untuk perempuan.",
        "Telah sampai dakwah Islam kepadanya."
      ]}
    ]
  },
  {
    id: 5, bab: 1, subBab: "Ketentuan Shalat Fardhu", title: "Syarat Sah Salat", image: "images/Picture5.jpg",
    content: [
      { type: "text", content: "Syarat agar salat kita sah." },
      { type: "list", content: "Syarat Sah:", items: [
        "Suci dari hadas kecil dan hadas besar.",
        "Suci badan, pakaian, dan tempat dari najis.",
        "Menutup aurat.",
        "Sudah masuk waktu salat.",
        "Menghadap kiblat, yaitu Ka'bah di Makkah.",
        "Mengetahui tata cara salat."
      ]}
    ]
  },
  {
    id: 6, bab: 1, subBab: "Ketentuan Shalat Fardhu", title: "Rukun Salat", image: "images/Picture6.jpg",
    content: [
      { type: "text", content: "Gerakan dan bacaan yang wajib dikerjakan." },
      { type: "list", content: "Rukun Salat (a-g):", items: [
        "Niat. Dilakukan dalam hati, dibaca bersamaan dengan takbiratulihram.",
        "Berdiri Tegak Menghadap Kiblat. (Jika mampu)",
        "Takbiratulihram. Mengucap Allahu Akbar.",
        "Bersedekap. Tangan kanan di atas tangan kiri.",
        "Membaca Doa Iftitah.",
        "Membaca Surah Al-Fatihah. Wajib dibaca setiap rakaat.",
        "Membaca Ayat Al-Qur'an. Setelah Al-Fatihah, sunah."
      ]},
      { type: "list", content: "Rukun Salat (h-n):", items: [
        "Rukuk dengan Tumakninah.",
        "Iktidal dengan Tumakninah.",
        "Sujud dengan Tumakninah, dua kali.",
        "Duduk di antara Dua Sujud, Duduk Iftirasy.",
        "Duduk Tasyahud Akhir dan Membaca Tasyahud.",
        "Salam. Salat diakhiri dengan salam.",
        "Tertib. Semua gerakan dan bacaan berurutan."
      ]}
    ]
  },
  {
    id: 7, bab: 1, subBab: "Ketentuan Shalat Fardhu", title: "Sunah Kauli dan Fikli", image: "images/Picture7.jpg",
    content: [
      { type: "list", content: "A. Sunah Kauli (Bacaan):", items: [
        "Membaca doa iftitah.",
        "Membaca taawuz: A'udzubillahi minasy-syaitanir-rajim.",
        "Membaca ayat Al-Qur'an.",
        "Membaca takbir intiqal: Allahu Akbar.",
        "Membaca doa kunut.",
        "Membaca salam kedua: Assalamu'alaikum warahmatullah."
      ]},
      { type: "list", content: "B. Sunah Fikli (Gerakan):", items: [
        "Mengangkat tangan saat takbiratulihram dan takbir intiqal.",
        "Bersedekap.",
        "Meletakkan tangan di paha saat duduk.",
        "Duduk iftirasy dan duduk tawaruk.",
        "Menoleh ke kanan dan ke kiri saat salam."
      ]},
      { type: "note", content: "Sunah dilakukan agar salat lebih sempurna dan berpahala." }
    ]
  },
  {
    id: 8, bab: 1, subBab: "Ketentuan Shalat Fardhu", title: "Salat Menjadi Batal", image: "images/Picture8.jpg",
    content: [
      { type: "text", content: "Salat menjadi batal (tidak sah) jika terjadi hal berikut:" },
      { type: "list", content: "Hal-hal yang membatalkan salat:", items: [
        "Syarat salat tidak terpenuhi.",
        "Tidak mengerjakan rukun salat.",
        "Mengucapkan kata selain bacaan salat.",
        "Melakukan gerakan selain gerakan salat.",
        "Makan dan minum.",
        "Berhadas kecil atau berhadas besar.",
        "Tertawa terbahak-bahak.",
        "Lupa yang fatal, misalnya lupa jumlah rakaat.",
        "Terkena najis.",
        "Tidak tertib atau tidak berurutan."
      ]},
      { type: "note", content: "Jika salat batal, maka harus mengulang salat dari awal." }
    ]
  },
  {
    id: 9, bab: 1, subBab: "Waktu dan bilangan", title: "Salat Fardu", image: "images/Picture9.jpg",
    content: [
      { type: "text", content: "Ada lima waktu dalam sehari semalam." },
      { type: "list", content: "Waktu dan Bilangan:", items: [
        "Salat Subuh, 2 rakaat. Waktu: mulai terbit fajar sampai sebelum matahari terbit.",
        "Salat Zuhur, 4 rakaat. Waktu: mulai matahari condong ke barat sampai bayangan benda sama panjang dengan bendanya.",
        "Salat Asar, 4 rakaat. Waktu: awal sore, selama matahari belum menguning.",
        "Salat Magrib, 3 rakaat. Waktu: mulai matahari terbenam sampai sinar merah di langit barat hilang.",
        "Salat Isya, 4 rakaat. Waktu: setelah awan merah di langit hilang sampai menjelang terbit fajar."
      ]},
      { type: "note", content: "Semua gerakan dan bacaan dilakukan berurutan, tidak boleh diacak." }
    ]
  },
  {
    id: 10, bab: 1, subBab: "Hikmah Mengerjakan", title: "Hikmah Mengerjakan Salat dengan Tertib", image: "images/Picture10.jpg",
    content: [
      { type: "text", content: "Salat yang dilakukan dengan tertib membawa banyak kebaikan dalam kehidupan." },
      { type: "list", content: "Hikmah Salat:", items: [
        "Menunjukkan rasa syukur kepada Allah Swt.",
        "Membuat hati tenteram dan tenang.",
        "Gerakan salat menyehatkan badan.",
        "Mendapat rahmat Allah Swt.",
        "Doa lebih mudah dikabulkan.",
        "Memberatkan timbangan amal kebaikan.",
        "Membiasakan sikap disiplin dan taat."
      ]}
    ]
  },
  // BAB II: Mendirikan Salat Berjamaah
  {
    id: 11, bab: 2, subBab: "Pendahuluan", title: "BAB II: Mendirikan Salat Berjamaah", image: "images/Picture11.jpg", isCover: true,
    content: [
      { type: "heading", content: "Apa itu Salat Berjamaah?" },
      { type: "list", content: "Pengertian:", items: [
        "Salat berjemaah adalah salat yang dikerjakan bersama-sama.",
        "Salat berjemaah ada imam dan makmum.",
        "Imam memimpin salat di depan. Makmum mengikuti imam di belakang.",
        "Salat sendiri disebut salat munfarid.",
        "Salat berjemaah lebih utama daripada salat sendiri. Pahalanya 27 derajat lebih tinggi.",
        "Hukumnya sunah muakadah (sangat dianjurkan)."
      ]}
    ]
  },
  {
    id: 12, bab: 2, subBab: "Dasar Hukum", title: "Dalil Tentang Salat Berjamaah", image: "images/Picture12.jpg",
    content: [
      { type: "heading", content: "Surah Al-Baqarah Ayat 43" },
      { type: "arabic", content: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ" },
      { type: "translation", content: '"Tegakkanlah salat, tunaikanlah zakat, dan rukuklah beserta orang-orang yang rukuk."' },
      { type: "heading", content: "Hadis Nabi Muhammad saw." },
      { type: "translation", content: '"Tidak ada salat yang lebih berat bagi orang munafik daripada salat Subuh dan Isya. Seandainya mereka tahu keutamaannya, mereka pasti akan mendatanginya meskipun dengan merangkak." (H.R. al-Bukhari dan Muslim)' },
      { type: "note", content: "Kata kunci: Salat berjemaah dianjurkan Allah Swt. Pahalanya 27 kali lebih besar." }
    ]
  },
  {
    id: 13, bab: 2, subBab: "Tata Cara", title: "Tata Cara Salat Berjamaah", image: "images/Picture13.jpg",
    content: [
      { type: "list", content: "Tata Cara Sebelum Berjamaah:", items: [
        "Sebelum ke masjid, kita berwudu dan memakai pakaian yang sopan dan suci.",
        "Berjalan ke masjid dengan tenang, tidak tergesa-gesa.",
        "Imam masjid harus laki-laki muslim.",
        "Makmum boleh laki-laki dan perempuan.",
        "Perempuan lebih baik salat di rumah, namun boleh ikut berjemaah ke masjid."
      ]},
      { type: "note", content: "Salat berjemaah membuat kita lebih disiplin, mendapat pahala lebih banyak, dan dicintai Allah." }
    ]
  },
  {
    id: 14, bab: 2, subBab: "Tata Cara", title: "Susunan Saf (Barisan Salat)", image: "images/Picture14.jpg",
    content: [
      { type: "list", content: "Aturan Barisan Salat:", items: [
        "Saf harus lurus dan rapat, tidak boleh ada yang kosong.",
        "Jika berjemaah 2 orang, makmum berdiri di kanan imam, sedikit ke belakang.",
        "Jika berjemaah 3 orang laki-laki, makmum berdiri di belakang imam.",
        "Jika ada makmum laki-laki dan perempuan, saf laki-laki di depan, saf perempuan di belakang.",
        "Susunan lengkap: laki-laki dewasa, anak laki-laki, anak perempuan, perempuan dewasa paling belakang."
      ]},
      { type: "text", content: "Saf yang lurus dan tertib membuat salat kita lebih sempurna dan mencerminkan persatuan umat Islam." }
    ]
  },
  {
    id: 15, bab: 2, subBab: "Tata Cara", title: "Gerakan dan Bacaan", image: "images/Picture15.jpg",
    content: [
      { type: "list", content: "Pelaksanaan:", items: [
        "Imam dan makmum berniat salat dalam hati.",
        "Imam mengucap takbiratulihram, makmum mengikuti.",
        "Pada salat Subuh, Magrib, dan Isya, imam membaca surah dengan suara keras (jahar).",
        "Pada salat Zuhur dan Asar, imam membaca dengan suara pelan (sirr).",
        "Jika imam lupa, makmum mengingatkan. Makmum laki-laki membaca Subhanallah. Perempuan menepuk tangan.",
        "Jika ada makmum yang datang terlambat (masbuk), ia tetap ikut salat. Setelah imam salam, ia menambah rakaat yang tertinggal."
      ]}
    ]
  },
  {
    id: 16, bab: 2, subBab: "Ketentuan Imam dan Makmum", title: "Syarat Imam dan Makmum", image: "images/Picture16.jpg",
    content: [
      { type: "list", content: "Syarat Imam:", items: [
        "Memenuhi syarat sah salat.",
        "Fasih dan paham bacaan Al-Qur'an.",
        "Berpengetahuan luas tentang Islam.",
        "Laki-laki. Perempuan hanya untuk sesama perempuan.",
        "Berniat menjadi imam & Dapat dilihat oleh makmum."
      ]},
      { type: "list", content: "Syarat Makmum:", items: [
        "Berniat mengikuti imam & Mengikuti setiap gerakan imam.",
        "Berada di tempat yang sama dengan imam & Berdiri di belakang imam.",
        "Laki-laki tidak boleh menjadi makmum dari imam perempuan.",
        "Tidak mendahului gerakan imam."
      ]}
    ]
  },
  {
    id: 17, bab: 2, subBab: "Ketentuan Imam dan Makmum", title: "Dua Macam Makmum", image: "images/Picture17.jpg",
    content: [
      { type: "heading", content: "1. Makmum Muwafik" },
      { type: "text", content: "Makmum yang mengikuti imam sejak awal sampai selesai. Dari awal takbir sampai salam." },
      { type: "heading", content: "2. Makmum Masbuk" },
      { type: "text", content: "Makmum yang datang terlambat." },
      { type: "list", content: "Ketentuan Masbuk:", items: [
        "Jika sempat rukuk bersama imam, rakaat itu dihitung.",
        "Jika tidak sempat rukuk bersama imam, rakaat itu tidak dihitung.",
        "Makmum masbuk menambah kekurangan rakaatnya setelah imam salam."
      ]}
    ]
  },
  {
    id: 18, bab: 2, subBab: "Adab dan Hikmah", title: "Adab dalam Salat Berjamaah", image: "images/Picture18.jpg",
    content: [
      { type: "list", content: "Adab Berjamaah:", items: [
        "Menuju masjid dengan tenang, tidak tergesa-gesa.",
        "Segera mengisi saf yang masih kosong, merapatkan dan meluruskan saf.",
        "Tidak berdiri di antara tiang-tiang masjid, karena membuat saf terputus.",
        "Membenarkan bacaan imam jika salah, dengan mengucap Subhanallah.",
        "Hanya mengucapkan bacaan salat, tidak berbicara atau bermain.",
        "Mengerjakan salat dengan khusyuk (tenang dan sungguh-sungguh)."
      ]}
    ]
  },
  {
    id: 19, bab: 2, subBab: "Adab dan Hikmah", title: "Hikmah dan Keutamaan Salat Berjamaah", image: "images/Picture19.jpg",
    content: [
      { type: "list", content: "Keutamaan:", items: [
        "Mendapat pahala besar (27 derajat lebih tinggi).",
        "Mempersatukan umat Islam.",
        "Mensyukuri nikmat Allah.",
        "Syiar Islam dan memakmurkan masjid.",
        "Melatih kedisiplinan dan mempererat silaturahmi.",
        "Mengajarkan menghargai perbedaan.",
        "Menumbuhkan rasa tanggung jawab sosial."
      ]}
    ]
  },
  {
    id: 20, bab: 2, subBab: "Uzur Salat Berjamaah", title: "Kapan Boleh Tidak Salat Berjamaah", image: "images/Picture20.jpg",
    content: [
      { type: "text", content: "Ada beberapa alasan (uzur) yang membolehkan tidak salat berjemaah:" },
      { type: "list", content: "Uzur:", items: [
        "Hujan deras atau sedang sakit keras.",
        "Sedang lapar dan makanan sudah tersedia.",
        "Sedang ingin buang air besar atau kecil."
      ]},
      { type: "heading", content: "Perempuan dan Salat Berjamaah" },
      { type: "text", content: "Perempuan boleh salat berjemaah di masjid, tetapi lebih utama salat di rumah." }
    ]
  }
];

const babInfo = [
  {
    bab: 1,
    title: "Memahami Ketentuan Shalat fardhu",
    description: "Pengertian, Syarat, Rukun, Sunah, Batal, Waktu, dan Hikmah",
    slideRange: [1, 10]
  },
  {
    bab: 2,
    title: "Mendirikan Shalat Berjamaah",
    description: "Pengertian, Tata Cara, Saf, Syarat Imam Makmum, Hikmah, dan Uzur",
    slideRange: [11, 20]
  }
];

/**
 * NARENDRA:
 * Gunakan variabel `quizPG`, `quizEssay`, dan `praktikInfo` di bawah ini untuk merender kuis di kuis.html.
 */
const quizPG = [
  // BAB 1
  { id: 1, question: "Kata salat menurut bahasa adalah…", options: ["Zakat", "Puasa", "Doa"], correctIndex: 2 },
  { id: 2, question: "Salat merupakan Ibadah yang diperintahkan oleh…", options: ["Orang tua", "Allah", "Guru"], correctIndex: 1 },
  { id: 3, question: "Orang yang menjaga salat fardhu tepat waktu bersikap…", options: ["Jujur", "Disiplin", "Kerjasama"], correctIndex: 1 },
  { id: 4, question: "Gerakan apa yang sedang dilakukan laki-laki tersebut? (Berdasarkan gambar duduk tahiyat akhir)", options: ["Duduk tahiyat akhir", "Sujud", "Rukuk"], correctIndex: 0 },
  { id: 5, question: "Gerakan terakhir dalam ibadah salat adalah…", options: ["Salam", "Rukuk", "Sujud"], correctIndex: 0 },
  { id: 6, question: "Hukum mengerjakan salat fardhu 5 waktu adalah…", options: ["Sunah", "Wajib", "Mubah"], correctIndex: 1 },
  { id: 7, question: "Gerakan apa yang sedang dilakukan laki-laki tersebut? (Berdasarkan gambar takbiratul ikhram)", options: ["Takbiratul ikhram", "Sujud", "Rukuk"], correctIndex: 0 },
  { id: 8, question: "Meninggalkan shalat isya' hukumnya…", options: ["Wajib", "Sunah", "Haram"], correctIndex: 2 },
  { id: 9, question: "Gerakan apa yang sedang dilakukan laki-laki tersebut? (Berdasarkan gambar bersedekap)", options: ["Duduk tahiyatul awal", "Salam", "Bersedekap"], correctIndex: 2 },
  { id: 10, question: "Jika tidak mampu berdiri dapat melakukan salat dengan posisi…", options: ["Duduk", "Jongkok", "Bersandar"], correctIndex: 0 },
  
  // BAB 2
  { id: 11, question: "Orang yang memimpin salat berjamaah di masjid dari golongan?", options: ["Perempuan", "Anak-anak", "Laki-laki"], correctIndex: 2 },
  { id: 12, question: "Barisan makmum di belakang imam, lurus dan rapat disebut…", options: ["Muwafik", "Masbuk", "Saf"], correctIndex: 2 },
  { id: 13, question: "Saf paling utama bagi makmum laki-laki dewasa adalah…", options: ["Paling depan", "Tengah", "Paling belakang"], correctIndex: 0 },
  { id: 14, question: "Muadzin mengumandangkan… saat imam telah siap", options: ["Doa", "Ikamah", "Shalawat"], correctIndex: 1 },
  { id: 15, question: "Imam dan makmum salat berjamaah berada di…", options: ["Tempat berbeda", "Satu tempat", "Tempat terbuka"], correctIndex: 1 },
  { id: 16, question: "Orang yang meninggalkan salat berjamaah termasuk…", options: ["Beruntung", "Bahagia", "Merugi"], correctIndex: 2 },
  { id: 17, question: "Makmum anak Perempuan berdiri di… Makmum Perempuan dewasa", options: ["Depan", "Belakang", "Samping"], correctIndex: 0 },
  { id: 18, question: "Perhatikan gambar barisan salat berikut. Siapakah sebutan untuk orang yang berada di posisi paling depan dan memimpin salat berjamaah?", options: ["Muazin", "Imam", "Khatib"], correctIndex: 1 },
  { id: 19, question: "Perhatikan gambar berikut. Yang baru datang biasanya disebut apa?", options: ["Muwafiq", "Munfarid", "Masbuq"], correctIndex: 2 },
  { id: 20, question: "Pahala orang yang melaksanakan salat berjamaah berapa darajat…", options: ["17", "27", "37"], correctIndex: 1 },
  { id: 21, question: "Saf yang terputus dalam salat berjamaah akan diisi oleh…", options: ["Malaikat", "Setan", "Hewan"], correctIndex: 1 }
];

const quizEssay = [
  // BAB 1
  { id: 1, question: "Ada berapakah salat fardhu yang wajib dilakukan?", answer: "5 salat fardhu" },
  { id: 2, question: "Jumlah rakat salat subuh berapa rakaat?", answer: "2 rakaat" },
  { id: 3, question: "Bagaimana gerakan takbiratulihram yang benar?", answer: "mengangkat kedua tangan sejajar dengan Pundak" },
  // BAB 2
  { id: 4, question: "Kapan kita dapat melakukan salat berjamaah?", answer: "ketika terdapat Imam dan makmum" },
  { id: 5, question: "Salat berjamaah mencontoh perbuatan Nabi…", answer: "Nabi Muhammad" },
  { id: 6, question: "Jika imam batal maka tugas makmum harus…", answer: "menggantinya" }
];

const praktikInfo = {
  title: "Praktik Salat Fardhu",
  instruction: "KIRIMKAN VIDEO KALIAN BERUPA PRAKTIK SALAT FARDHU!",
  whatsappNumber: "088989320145",
  whatsappMessage: "Assalamu'alaikum, saya ingin mengirimkan video praktik shalat fardhu untuk tugas Fikih."
};
