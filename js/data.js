/* ==========================================================================
   [JOB: Atnan & Narend] Data File - E-Book Slides & Quiz Questions
   ========================================================================== */

/**
 * Atnan:
 * Gunakan variabel `slides` dan `babInfo` di bawah ini untuk menampilkan flipbook di ebook.html.
 * Anda dapat memodifikasi isi text jika diperlukan, namun kerangkanya sudah lengkap.
 */
const slides = [
  // ========== BAB I: THAHARAH ==========
  {
    id: 1,
    bab: 1,
    subBab: "Pendahuluan",
    title: "BAB I: THAHARAH (BERSUCI)",
    image: "images/wudhu-illustration.webp",
    isCover: true,
    content: [
      {
        type: "heading",
        content: "Mari Belajar Bersuci ✨"
      },
      {
        type: "text",
        content: "Pada bab ini, kita akan belajar cara bersuci dari hadas dan najis agar badan kita selalu bersih, sehat, dan ibadah kita diterima oleh Allah SWT."
      }
    ]
  },
  // Sub-Bab 1: Pengertian Thaharah
  {
    id: 2,
    bab: 1,
    subBab: "Pengertian Thaharah",
    title: "Yuk Cuci Tangan!",
    image: "images/wudhu-illustration.webp",
    content: [
      { type: "heading", content: "Kenapa Kita Harus Cuci Tangan?" },
      {
        type: "text",
        content: "Karena cuci tangan dapat membuat badan bersih, Allah SWT menyukai orang yang bersih, dan bersih itu sebagian dari iman."
      }
    ]
  },
  {
    id: 3,
    bab: 1,
    subBab: "Pengertian Thaharah",
    title: "Apa Itu Thaharah?",
    content: [
      {
        type: "text",
        content: "Thaharah artinya bersuci. Bersuci artinya membersihkan hati, dan sebelum shalat badan harus bersih dan suci."
      },
      {
        type: "note",
        content: "Tidak sah ibadah orang muslim jika tidak bersuci."
      }
    ]
  },
  {
    id: 4,
    bab: 1,
    subBab: "Pengertian Thaharah",
    title: "Dalil Perintah Thaharah dari Al-Qur'an",
    content: [
      { type: "heading", content: "1. Surah Al-Muddasir Ayat 4-5" },
      {
        type: "arabic",
        content: "وَثِيَابَكَ فَطَهِّرْ ﴿٤﴾ وَالرُّجْزَ فَاهْجُرْ ﴿٥﴾",
        surah: 74,
        ayahs: [4, 5]
      },
      { type: "transliteration", content: "Wa ṡiyābaka faṭahhir. War-rujza fahjur." },
      {
        type: "translation",
        content: "Pakaianmu, bersihkanlah! (4) Segala (perbuatan) yang keji, tinggalkanlah! (5) — QS. Al-Muddassir."
      },
      { type: "heading", content: "2. Surah Al-Baqarah Ayat 222 (Sebagian)" },
      {
        type: "arabic",
        content: "إِنَّ اللهَ يُحِبُّ التَّوَّابِيْنَ وَيُحِبُّ الْمُتَطَهِّرِيْنَ",
        surah: 2,
        ayahs: [222],
        audioStart: 25.08,
        audioEnd: 33.4
      },
      {
        type: "transliteration",
        content: "Innallāha yuḥibbut-tawwābīna wa yuḥibbul-mutaṭahhirīn."
      },
      {
        type: "translation",
        content: "Sungguh, Allah menyukai orang yang bertobat dan menyukai orang yang menyucikan diri."
      }
    ]
  },
  {
    id: 5,
    bab: 1,
    subBab: "Pengertian Thaharah",
    title: "Dalil Perintah Thaharah dari Hadis",
    content: [
      { type: "arabic", content: "لاَ يَقْبَلُ اللهُ صَلاَةَ أَحَدِكُمْ إِذَا أَحْدَثَ حَتَّى يَتَوَضَّأَ" },
      { type: "transliteration", content: "Lā yaqbalullāhu ṣalāta aḥadikum iżā aḥdaṡa ḥattā yatawaddā'." },
      {
        type: "translation",
        content: '"Allah tidak menerima shalat salah seseorang di antara kalian jika berhadas hingga ia berwudhu." (H.R. Al-Bukhari)'
      },
      { type: "arabic", content: "الطَّهُوْرُ شَطْرُ الْإِيْمَانِ" }, { type: "transliteration", content: "Aṭ-ṭahūru syaṭrul-īmān." },
      { type: "translation", content: "Kesucian sebagian dari iman. (H.R. Imam Muslim)" },
      {
        type: "text",
        content: "Dalil-dalil tersebut mengajarkan kepada umat Islam untuk bersuci. Karena kesucian sebagian dari iman."
      }
    ]
  },
  {
    id: 6,
    bab: 1,
    subBab: "Pengertian Thaharah",
    title: "Alat untuk Thaharah (Air)",
    content: [
      { type: "text", content: "Thaharah dilakukan untuk membersihkan diri dari hadas dan najis." },
      { type: "heading", content: "A. Air — Alat Bersuci yang Utama" },
      { type: "text", content: "Menurut hukum syar'i, air dikelompokkan menjadi empat:" },
      {
        type: "list",
        content: "Jenis-jenis Air",
        items: [
          "Air Mutlak — Air yang masih murni, tidak tercampur najis. Contoh: air sumur, air hujan, air laut, air salju, air danau, air embun, air sungai.",
          "Air Suci Tidak Menyucikan — Air suci tapi tidak boleh untuk menyucikan diri dari hadas dan najis. Contoh: air kopi, air sirup, air teh, air susu, air mustaʿmal, air muqayyad (air tebu, air kelapa).",
          "Air Musyammas — Air suci dan dapat menyucikan, tapi makruh digunakan. Contoh: air yang dijemur di bawah matahari.",
          "Air Mutanajis — Air suci yang kurang dari 216 liter dan terkena najis (berubah warna, bau, dan rasanya)."
        ]
      }
    ]
  },
  {
    id: 7,
    bab: 1,
    subBab: "Pengertian Thaharah",
    title: "Alat untuk Thaharah (Tanah & Batu)",
    content: [
      { type: "heading", content: "B. Tanah atau Debu" },
      { type: "text", content: "Debu dapat dipakai untuk bersuci sebagai pengganti air. Hal ini disebut dengan tayamum: bersuci dengan debu." },
      { type: "heading", content: "C. Batu" },
      { type: "text", content: "Batu dapat digunakan untuk istinjak. Istinjak adalah bersuci dari buang air. Boleh dilakukan apabila tidak ada air sama sekali." },
      { type: "text", content: "Istinjak juga boleh menggunakan benda lain seperti kayu, daun kering, dan tisu. Syaratnya: suci, bersifat padat, dan menghilangkan najis." },
      { type: "note", content: "Istinjak menggunakan batu disebut istijmar." }
    ]
  },
  {
    id: 8,
    bab: 1,
    subBab: "Pengertian Thaharah",
    title: "Manfaat Thaharah",
    content: [
      {
        type: "list",
        content: "Manfaat Thaharah",
        items: [
          "Mendidik berakhlak mulia",
          "Terbiasa hidup bersih",
          "Lingkungan menjadi nyaman",
          "Mendapatkan pahala",
          "Dicintai Allah dan Rasulullah"
        ]
      }
    ]
  },
  {
    id: 9,
    bab: 1,
    subBab: "Bersuci dari Najis",
    title: "Bersuci dari Najis",
    content: [
      { type: "text", content: "Najis adalah kotoran. Najis membuat ibadah kita tidak sah. Najis harus dibersihkan terlebih dahulu sebelum beribadah." },
      { type: "text", content: "Menyucikan najis dengan cara mencuci. Sifat najis: bau, berwarna, dan rasanya." },
      {
        type: "note",
        content: "Contoh najis: air kencing, darah, muntah, bangkai hewan, air liur anjing, hewan babi, kotoran manusia dan hewan."
      }
    ]
  },
  {
    id: 10,
    bab: 1,
    subBab: "Bersuci dari Najis",
    title: "Jenis-Jenis Najis",
    content: [
      {
        type: "list",
        content: "Tiga Jenis Najis",
        items: [
          "Najis Ringan (Mukhaffafah) — Contoh: air kencing bayi laki-laki, belum berusia 2 tahun, dan hanya minum ASI. Cara membersihkan: percikkan air ke tempat najis.",
          "Najis Sedang (Mutawassitah) — Contoh: kotoran manusia dan darah. Cara membersihkan: cuci dengan air.",
          "Najis Berat (Mughalazah) — Contoh: air liur anjing dan babi. Cara membersihkan: cuci 7 kali dengan air, salah satunya dicampur tanah."
        ]
      }
    ]
  },
  {
    id: 11,
    bab: 1,
    subBab: "Bersuci dari Hadas",
    title: "Bersuci dari Hadas",
    content: [
      { type: "text", content: "Hadas adalah keadaan tidak suci pada badan. Hadas membuat kita tidak boleh shalat." },
      { type: "heading", content: "Hadas dibagi menjadi 2:" },
      {
        type: "list",
        content: "Jenis Hadas",
        items: [
          "Hadas Kecil — Contoh: buang air kecil/besar, tidur, pingsan, mabuk, gila, bersentuhan dengan lawan jenis. Cara membersihkan: berwudhu atau tayamum.",
          "Hadas Besar — Contoh: haid dan nifas. Cara membersihkan: mandi wajib."
        ]
      }
    ]
  },
  {
    id: 12,
    bab: 1,
    subBab: "Bersuci dari Hadas",
    title: "Tata Cara Berwudhu",
    image: "images/wudhu-steps.webp",
    content: [
      { type: "heading", content: "Membersihkan Hadas Kecil" },
      {
        type: "list",
        content: "Rukun Wudhu",
        items: [
          "Niat wudhu",
          "Membasuh muka",
          "Membasuh kedua tangan sampai siku",
          "Mengusap sebagian kepala",
          "Membasuh kedua kaki sampai mata kaki",
          "Tertib (berurutan)"
        ]
      }
    ]
  },
  {
    id: 13,
    bab: 1,
    subBab: "Bersuci dari Hadas",
    title: "Tata Cara Tayamum",
    image: "images/tayamum-steps.webp",
    content: [
      { type: "heading", content: "Membersihkan Hadas Kecil (Pengganti Wudhu)" },
      {
        type: "list",
        content: "Rukun Tayamum",
        items: [
          "Niat tayamum",
          "Mengusap muka",
          "Mengusap kedua tangan",
          "Tertib (berurutan)"
        ]
      }
    ]
  },
  {
    id: 14,
    bab: 1,
    subBab: "Bersuci dari Hadas",
    title: "Mandi Wajib",
    content: [
      { type: "heading", content: "Membersihkan Hadas Besar" },
      {
        type: "list",
        content: "Tata Cara Mandi Wajib",
        items: [
          "Membersihkan bagian bawah",
          "Mengucap basmalah dan niat",
          "Mencuci pergelangan tangan",
          "Berwudhu",
          "Menyiramkan air ke atas kepala",
          "Menyiramkan air ke tubuh hingga rata",
          "Dahulukan anggota bagian kanan"
        ]
      }
    ]
  },
  {
    id: 15,
    bab: 1,
    subBab: "Istinja'",
    title: "Istinja'",
    content: [
      { type: "text", content: "Istinja' artinya bersuci sesudah buang air. Bertujuan untuk membersihkan kotoran dan najis." },
      { type: "heading", content: "Alat untuk Istinja'" },
      { type: "text", content: "Air yang bersih, batu, dan tisu." },
      { type: "heading", content: "Cara Istinja' yang Benar" },
      {
        type: "list",
        content: "Langkah-langkah",
        items: [
          "Menggunakan tangan kiri",
          "Bersihkan sampai bersih",
          "Setelah itu cuci tangan dengan sabun"
        ]
      }
    ]
  },
  // ========== BAB II: KETENTUAN ADZAN DAN IQAMAH ==========
  {
    id: 16,
    bab: 2,
    subBab: "Pendahuluan",
    title: "BAB II: KETENTUAN ADZAN DAN IQAMAH",
    image: "images/mosque-illustration.webp",
    isCover: true,
    content: [
      {
        type: "heading",
        content: "Panggilan Shalat yang Mulia 🕌"
      },
      {
        type: "text",
        content: "Pada bab ini, kita akan belajar tentang adzan dan iqamah sebagai penanda masuknya waktu shalat dan seruan untuk mendirikannya."
      }
    ]
  },
  {
    id: 17,
    bab: 2,
    subBab: "Adzan",
    title: "Apakah Kamu Mendengar Adzan?",
    image: "images/mosque-illustration.webp",
    content: [
      { type: "heading", content: "Kapan kamu mendengar adzan?" },
      { type: "text", content: "Ketika masuk waktu shalat." },
      { type: "text", content: "Selain adzan, ada pula iqamah yang dikumandangkan sebelum shalat dimulai." }
    ]
  },
  {
    id: 18,
    bab: 2,
    subBab: "Adzan",
    title: "Adzan",
    content: [
      { type: "text", content: "Adzan berarti pemberitahuan. Jika adzan dikumandangkan berarti sudah masuk waktu shalat." },
      { type: "note", content: "Hukum melakukan adzan: Sunah Muakad" },
      { type: "text", content: "Yang mengumandangkan adzan disebut muadzin. Yang mendengar adzan disebut mustamik." },
      { type: "heading", content: "Perintah Adzan dalam Hadis" },
      { type: "arabic", content: "وَإِذَا حَضَرَتِ الصَّلاَةُ، فَلْيُؤَذِّنْ لَكُمْ أَحَدُكُمْ، وَلِيُؤَمَّكُمْ أَكْبَرُكُمْ" },
      { type: "transliteration", content: "Wa iżā ḥaḍaratiṣ-ṣalātu, falyuażżin lakum aḥadukum, waliyuammakum akbarukum." },
      {
        type: "translation",
        content: '"Bila waktu shalat telah tiba, maka hendaklah seseorang di antara kamu menyeru azan untukmu sekalian. Dan hendaklah orang yang paling tua di antara kalian mengimami kalian." (H.R. Muttafaqun Alaihi)'
      }
    ]
  },
  {
    id: 19,
    bab: 2,
    subBab: "Adzan",
    title: "Asal Mula Adzan",
    content: [
      { type: "text", content: "Zaman dahulu belum ada adzan, kemudian umat Islam bermusyawarah tentang pelaksanaan shalat agar lebih terkesan ketika hendak melaksanakan shalat." },
      { type: "text", content: "Kemudian Umar bin Khatab mengusulkan seruan shalat, dengan mengumandangkan panggilan shalat." },
      { type: "note", content: 'Rasulullah SAW. bersabda, "Wahai Bilal, bangkit dan serukanlah panggilan shalat."' }
    ]
  },
  {
    id: 20,
    bab: 2,
    subBab: "Adzan",
    title: "Syarat Sah Adzan & Muadzin",
    content: [
      {
        type: "list",
        content: "Syarat Sah Adzan",
        items: [
          "Sudah masuk waktu shalat",
          "Berniat azan dan perbuatan",
          "Diucapkan dengan bahasa Arab",
          "Diucapkan sesuai urutan lafaznya",
          "Mengeraskan suara adzan"
        ]
      },
      {
        type: "list",
        content: "Syarat Muadzin",
        items: [
          "Beragama Islam",
          "Laki-laki mumayiz",
          "Meniatkan azan dengan ikhlas",
          "Adil dan amanah",
          "Mengetahui waktu shalat"
        ]
      }
    ]
  },
  {
    id: 21,
    bab: 2,
    subBab: "Adzan",
    title: "Adab Ketika Azan",
    content: [
      {
        type: "list",
        content: "Adab Ketika Mengumandangkan Azan",
        items: [
          "Keadaan suci",
          "Berdiri",
          "Menghadap kiblat",
          "Memasukkan jari ke telinga",
          "Menyambung tiap dua takbir",
          "Menolehkan kepala",
          "Menambah kalimat pada adzan subuh"
        ]
      }
    ]
  },
  {
    id: 22,
    bab: 2,
    subBab: "Adzan",
    title: "Lafaz Adzan",
    content: [
      {
        type: "list",
        content: "Lafaz Adzan",
        items: [
          "<div class=\"lafaz-row\"><span class=\"lafaz-arabic\" dir=\"rtl\" lang=\"ar\">اللهُ أَكْبَرُ اللهُ أَكْبَرُ</span><span class=\"lafaz-latin\">Allāhu Akbar Allāhu Akbar (2x)</span></div>",
          "<div class=\"lafaz-row\"><span class=\"lafaz-arabic\" dir=\"rtl\" lang=\"ar\">أَشْهَدُ أَنْ لاَ إِلٰهَ إِلَّا اللهُ</span><span class=\"lafaz-latin\">Asyhadu an lā ilāha illallāh (2x)</span></div>",
          "<div class=\"lafaz-row\"><span class=\"lafaz-arabic\" dir=\"rtl\" lang=\"ar\">أَشْهَدُ أَنَّ مُحَمَّدًا رَسُوْلُ اللهِ</span><span class=\"lafaz-latin\">Asyhadu anna Muḥammadan rasūlullāh (2x)</span></div>",
          "<div class=\"lafaz-row\"><span class=\"lafaz-arabic\" dir=\"rtl\" lang=\"ar\">حَيَّ عَلَى الصَّلاَةِ</span><span class=\"lafaz-latin\">Ḥayya 'alaṣ-ṣalāh (2x)</span></div>",
          "<div class=\"lafaz-row\"><span class=\"lafaz-arabic\" dir=\"rtl\" lang=\"ar\">حَيَّ عَلَى الْفَلَاحِ</span><span class=\"lafaz-latin\">Ḥayya 'alal-falāḥ (2x)</span></div>",
          "<div class=\"lafaz-row\"><span class=\"lafaz-arabic\" dir=\"rtl\" lang=\"ar\">اللهُ أَكْبَرُ اللهُ أَكْبَرُ</span><span class=\"lafaz-latin\">Allāhu Akbar Allāhu Akbar</span></div>",
          "<div class=\"lafaz-row\"><span class=\"lafaz-arabic\" dir=\"rtl\" lang=\"ar\">لاَ إِلٰهَ إِلَّا اللهُ</span><span class=\"lafaz-latin\">Lā ilāha illallāh</span></div>"
        ]
      }
    ]
  },
  {
    id: 23,
    bab: 2,
    subBab: "Adzan",
    title: "Menjawab Kumandang Adzan",
    content: [
      { type: "text", content: "Ketika mendengar adzan, seorang muslim disunahkan untuk menjawab setiap lafaz adzan dengan mengikuti apa yang diucapkan muadzin." },
      { type: "note", content: 'Kecuali pada lafaz "Ḥayya \'alaṣ-ṣalāh" dan "Ḥayya \'alal-falāḥ", dijawab dengan "Lā ḥawla wa lā quwwata illā billāh."' },
      { type: "text", content: "Setelah adzan selesai, disunahkan membaca shalawat dan doa sesudah adzan." }
    ]
  },
  {
    id: 24,
    bab: 2,
    subBab: "Iqamah",
    title: "Mengenal Iqamah",
    content: [
      { type: "text", content: "Iqamah artinya menegakkan, yaitu tanda segera mendirikan shalat. Iqamah dikumandangkan setelah adzan, saat imam and jamaah sudah siap berdiri untuk shalat." },
      { type: "heading", content: "Perbedaan Lafaz Iqamah dengan Adzan" },
      {
        type: "list",
        content: "Perbedaan",
        items: [
          "Lafaz iqamah dibaca lebih cepat dan ringkas.",
          'Lafaz iqamah dibaca satu kali, kecuali takbir di awal dan kalimat "Qad Qāmatiṣ-ṣalāh" dibaca dua kali.'
        ]
      }
    ]
  },
  {
    id: 25,
    bab: 2,
    subBab: "Iqamah",
    title: "Keutamaan Azan & Iqamah",
    content: [
      {
        type: "text",
        content: "Azan dan iqamah memiliki keutamaan besar dalam Islam. Rasulullah SAW. bersabda bahwa orang yang mengumandangkan azan akan mendapatkan ampunan sepanjang suaranya terdengar, dan mereka yang mendengarnya akan menjadi saksi di hari kiamat nanti."
      }
    ]
  }
];

const babInfo = [
  {
    bab: 1,
    title: "Thaharah",
    description: "Bersuci — Pengertian, Dalil, Alat, Wudhu, Tayamum, Mandi Wajib, Istinja'",
    slideRange: [1, 15]
  },
  {
    bab: 2,
    title: "Ketentuan Adzan dan Iqamah",
    description: "Pengertian, Sejarah, Syarat, Adab, Lafaz, Iqamah",
    slideRange: [16, 25]
  }
];


/**
 * NARENDRA:
 * Gunakan variabel `quizPG`, `quizEssay`, dan `praktikInfo` di bawah ini untuk merender kuis di kuis.html.
 */
const quizPG = [
  {
    id: 1,
    question: "Apa itu thaharah menurut istilah?",
    options: ["Bersuci", "Berdoa", "Bersedekah"],
    correctIndex: 0
  },
  {
    id: 2,
    question: "Air yang masih murni dan tidak tercampur najis disebut…",
    options: ["Air Mutanajis", "Air Mutlak", "Air Musyammas"],
    correctIndex: 1
  },
  {
    id: 3,
    question: "Bersuci dengan debu sebagai pengganti air disebut…",
    options: ["Wudhu", "Mandi Wajib", "Tayamum"],
    correctIndex: 2
  },
  {
    id: 4,
    question: "Air kencing bayi laki-laki yang belum berusia 2 tahun dan hanya minum ASI termasuk najis…",
    options: ["Mutawassitah", "Mukhaffafah", "Mutanajis"],
    correctIndex: 1
  },
  {
    id: 5,
    question: "Cara membersihkan najis berat adalah dengan…",
    options: [
      "Diperciki air",
      "Dicuci dengan air biasa",
      "Dicuci 7 kali, salah satunya dicampur tanah"
    ],
    correctIndex: 2
  },
  {
    id: 6,
    question: "Hadas besar seperti haid dan nifas dibersihkan dengan cara…",
    options: ["Berwudhu", "Mandi Wajib", "Tayamum"],
    correctIndex: 1
  },
  {
    id: 7,
    question: "Adzan secara bahasa berarti…",
    options: ["Seruan keras", "Pemberitahuan", "Doa bersama"],
    correctIndex: 1
  },
  {
    id: 8,
    question: "Hukum melaksanakan adzan adalah…",
    options: ["Wajib", "Sunah Muakkad", "Makruh"],
    correctIndex: 1
  },
  {
    id: 9,
    question: "Sahabat Nabi yang diperintahkan mengumandangkan adzan pertama kali adalah…",
    options: ["Abu Bakar As-Siddiq", "Bilal bin Rabbah", "Ali bin Abi Thalib"],
    correctIndex: 1
  },
  {
    id: 10,
    question: "Perbedaan utama lafaz iqamah dibanding adzan adalah…",
    options: [
      "Iqamah dibaca lebih cepat dan ringkas",
      "Iqamah tanpa kalimat takbir",
      "Iqamah diulang dua kali semua"
    ],
    correctIndex: 0
  }
];

const quizEssay = [
  {
    id: 1,
    question: "Mengapa thaharah penting dilakukan sebelum shalat?",
    answer: "Karena untuk ibadah dan harus bersuci."
  },
  {
    id: 2,
    question: "Sebutkan macam-macam air mutlak (air untuk bersuci)!",
    answer: "Air sumur, air hujan, air salju, air sungai, air danau, air laut, air embun."
  },
  {
    id: 3,
    question: "Hadas kecil dapat dibersihkan dengan cara…",
    answer: "Berwudhu. Jika tidak ada air, dengan tayamum."
  },
  {
    id: 4,
    question: "Siapa yang disebut muadzin?",
    answer: "Yang mengumandangkan azan."
  },
  {
    id: 5,
    question: "Kapan iqamah dikumandangkan?",
    answer: "Saat imam dan jamaah sudah siap berdiri untuk melaksanakan shalat berjamaah."
  }
];

const praktikInfo = {
  title: "Praktik Wudhu",
  instruction: "Kirimkan video kalian berupa praktik berwudhu!",
  whatsappNumber: "088989320145",
  whatsappMessage: "Assalamu'alaikum, saya ingin mengirimkan video praktik wudhu untuk tugas Fikih."
};
