// ============================================================
//  PROFIL BALAI – satu tempat untuk mengubah isi halaman.
//  Ubah teks di sini, simpan, muat ulang halaman.
// ============================================================
var PROFIL = {
  nama: 'Balai Penegakan Hukum Lingkungan Hidup Kota Surabaya',
  singkat: 'Balai Gakkum LH Jabalnusra',
  induk: 'Kementerian Lingkungan Hidup / Badan Pengendalian Lingkungan Hidup – Deputi Bidang Penegakan Hukum Lingkungan Hidup',
  dasar: 'Peraturan Menteri LH/Kepala BPLH Nomor 10 Tahun 2025 tentang Organisasi dan Tata Kerja Balai Penegakan Hukum Lingkungan Hidup',

  // Angka ringkas di hero
  hero: [
    { n: 9,  s: 'Provinsi wilayah kerja' },
    { n: 7,  s: 'Pos Gakkum LH' },
    { n: 12, s: 'Fungsi penegakan hukum' }
  ],

  // Fakta kunci (kolom kiri "Tentang")
  fakta: [
    ['Kedudukan', 'UPT di bawah Deputi Bidang Penegakan Hukum LH, KLH/BPLH'],
    ['Kantor', 'Jl. Bandara Juanda No. 100, Sidoarjo – Jawa Timur'],
    ['Wilayah kerja', 'Banten, DKI Jakarta, Jawa Barat, Jawa Tengah, DI Yogyakarta, Jawa Timur, Bali, NTB, NTT'],
    ['Seksi Wilayah', 'Seksi Wilayah I Semarang · Seksi Wilayah II Denpasar'],
    ['Pos Gakkum LH', 'Banten, Jakarta, Bandung, Yogyakarta, Denpasar, Mataram, Labuan Bajo']
  ],

  // 12 fungsi – Pasal 4 ayat (2) Permen LH/BPLH 10/2025
  fungsi: [
    ['Perencanaan', 'Penyusunan rencana, program, dan anggaran Balai.'],
    ['Inventarisasi', 'Inventarisasi dan identifikasi potensi pencemaran dan/atau perusakan, pelanggaran hukum lingkungan hidup, serta kebakaran lahan.'],
    ['Pengaduan', 'Pengelolaan pengaduan pelanggaran hukum lingkungan hidup dari masyarakat dan pihak lain.'],
    ['Pengawasan', 'Pengawasan ketaatan pemegang perizinan berusaha/persetujuan pemerintah terhadap peraturan perundang-undangan lingkungan hidup.'],
    ['Penanganan pelanggaran', 'Penanganan pelanggaran hukum di bidang lingkungan hidup, termasuk sanksi administratif dan penyidikan.'],
    ['Sengketa', 'Fasilitasi dan penyelesaian sengketa lingkungan hidup, di dalam maupun di luar pengadilan.'],
    ['Kebakaran lahan', 'Kegiatan teknis pengendalian kebakaran lahan.'],
    ['Sosialisasi', 'Sosialisasi penegakan hukum lingkungan hidup dan pengendalian kebakaran lahan.'],
    ['Koordinasi', 'Koordinasi dengan aparat penegak hukum dan pihak terkait lainnya.'],
    ['Evaluasi teknis', 'Pemantauan, evaluasi, dan pelaporan pelaksanaan penegakan hukum LH serta pengendalian kebakaran lahan.'],
    ['Evaluasi kelembagaan', 'Pemantauan, evaluasi, dan pelaporan Balai Gakkum LH.'],
    ['Tata usaha', 'Pelaksanaan urusan ketatausahaan dan rumah tangga Balai.']
  ],

  // Struktur organisasi. Isi "nama" dengan nama pejabat (kosongkan jika belum ada).
  struktur: {
    kepala: { jabatan: 'Kepala Balai', nama: '' },
    unit: [
      { jabatan: 'Kepala Subbagian Tata Usaha', nama: '', ket: 'Perencanaan, keuangan, SDM, BMN, humas, data & informasi' },
      { jabatan: 'Kepala Seksi Wilayah I', nama: '', ket: 'Kedudukan Semarang · Banten, DKI Jakarta, Jawa Barat, Jawa Tengah' },
      { jabatan: 'Kepala Seksi Wilayah II', nama: '', ket: 'Kedudukan Denpasar · Bali, NTB, NTT' },
      { jabatan: 'Kelompok Jabatan Fungsional', nama: '', ket: 'PPLH, PPNS, Penyidik, Analis & Pelaksana' }
    ]
  },

  // Peta wilayah kerja: provinsi -> unit yang menangani
  wilayah: [
    { unit: 'Kantor Balai – Sidoarjo/Surabaya', prov: ['Jawa Timur', 'DI Yogyakarta'], pos: ['Pos Yogyakarta'] },
    { unit: 'Seksi Wilayah I – Semarang', prov: ['Banten', 'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah'], pos: ['Pos Banten', 'Pos Jakarta', 'Pos Bandung'] },
    { unit: 'Seksi Wilayah II – Denpasar', prov: ['Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur'], pos: ['Pos Denpasar', 'Pos Mataram', 'Pos Labuan Bajo'] }
  ],

  // Instrumen / layanan (kartu geser)
  layanan: [
    ['Pengaduan Masyarakat', 'Menerima, memverifikasi, dan menindaklanjuti pengaduan dugaan pencemaran/perusakan lingkungan. Pengaduan yang terbukti menjadi dasar pengawasan atau penyidikan.', 'Pasal 65 & 70 UU 32/2009'],
    ['Pengawasan Ketaatan', 'Pejabat Pengawas Lingkungan Hidup (PPLH) memeriksa ketaatan perusahaan dan pengelola TPA terhadap izin dan baku mutu; termasuk pemasangan plang dan garis PPLH.', 'Pasal 71–75 UU 32/2009'],
    ['Sanksi Administratif', 'Teguran tertulis, paksaan pemerintah, pembekuan hingga pencabutan izin bagi penanggung jawab usaha yang melanggar – instrumen utama penertiban TPA open dumping.', 'Pasal 76–83 UU 32/2009'],
    ['Penyelesaian Sengketa', 'Fasilitasi mediasi ganti kerugian dan pemulihan lingkungan di luar pengadilan, atau gugatan perdata melalui pengadilan.', 'Pasal 84–93 UU 32/2009'],
    ['Penegakan Hukum Pidana', 'PPNS Lingkungan Hidup menyidik tindak pidana lingkungan – pencemaran, dumping limbah B3, open burning – bersama Korwas PPNS Polri dan Kejaksaan.', 'Pasal 94–120 UU 32/2009'],
    ['Pengendalian Kebakaran Lahan', 'Inventarisasi, pencegahan, dan penanganan kebakaran lahan di luar kawasan hutan, termasuk kebakaran timbunan sampah di TPA.', 'Permen LH/BPLH 10/2025']
  ],

  // Angka isu TPA (sumber: pernyataan KLH & pemberitaan 2025–2026)
  kpi: [
    { n: 343, s: 'TPA open dumping yang dijatuhi sanksi administratif KLH (Maret 2025)' },
    { n: 485, s: 'TPA berstatus sanksi administratif hingga awal 2026' },
    { n: 44,  s: 'TPA dalam penyelidikan pidana (Februari 2026)' },
    { n: 12314, s: 'ton timbulan sampah per hari di Jawa Timur (data 2024)' }
  ],

  // Kontak – sesuaikan bila berubah
  kontak: {
    alamat: 'Jl. Bandara Juanda No. 100, Sidoarjo, Jawa Timur',
    email: 'gakkumjabalnusra@gmail.com',
    ig: '@gakkumjabalnusra',
    jam: 'Senin–Jumat, 08.00–16.00 WIB',
    pengaduan: 'Sampaikan pengaduan secara tertulis (surat/email) dengan identitas pelapor, lokasi kejadian, uraian dugaan pelanggaran, dan bukti pendukung (foto/video/koordinat).'
  },

  // Sumber rujukan yang ditampilkan di footer
  sumber: [
    ['Permen LH/BPLH No. 10 Tahun 2025 – Organisasi dan Tata Kerja Balai Penegakan Hukum Lingkungan Hidup', 'https://peraturan.go.id/files/permenklhbph-no-10-tahun-2025.pdf'],
    ['Laporan Kinerja 2024 BPPHLHK Wilayah Jawa Bali Nusa Tenggara', 'https://gakkum.menlhk.go.id/assets/info-publik/BALAI_GAKKUM_JABALNUSRA_compressed.pdf'],
    ['Permen LHK No. 13 Tahun 2022 – OTK Balai Pengamanan dan Penegakan Hukum LHK', 'https://peraturan.bpk.go.id/Details/268401'],
    ['Deputi Bidang Penegakan Hukum LH – KLH/BPLH', 'https://kemenlh.go.id/news/detail/deputi-bidang-gakkum-lh'],
    ['KLH hentikan open dumping di 37 TPA, 343 TPA disanksi (Kompas, 10/3/2025)', 'https://lestari.kompas.com/read/2025/03/10/142932386/klh-hentikan-open-dumping-mulai-hari-ini-dimulai-di-37-tpa'],
    ['KLH selidiki 44 TPA open dumping (Kompas, 25/2/2026)', 'https://lestari.kompas.com/read/2026/02/25/161700486/klh-selidiki-44-tpa-yang-masih-open-dumping-pemda-terancam-dipidana'],
    ['Percepatan pengelolaan sampah Jawa Timur – 12.314 ton/hari (KLH, 7/8/2025)', 'https://kemenlh.go.id/news/detail/percepatan-pencapaian-target-pengelolaan-sampah-di-jawa-timur-deputi-pslb3-gelar-rapat-di-surabaya'],
    ['DLH Jatim dukung pembentukan UPT Gakkum LH Jabalnusra (Juli 2025)', 'https://barometerbali.com/dlh-jatim-tegaskan-komitmen-dukung-balai-gakkum-lh-jangan-biarkan-masyarakat-berjuang-sendiri/']
  ]
};
