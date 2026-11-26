import { GuestbookEntry, InvitationConfig } from '../types/invitation';

export const DEFAULT_INVITATION: InvitationConfig = {
  coupleShort: 'Bismi & Rendi',
  brideName: 'Bismi Gaviar Putri',
  brideFullName: 'Bismi Gaviar Putri, A.Md.Komp.',
  brideParents: 'Putri dari Bpk. Gatot Prianggodo, S.Pd & Ibu Defi Apriyanti · Pakembaran',
  brideInstagram: '',
  groomName: 'Rendi Candra Maulana',
  groomFullName: 'Rendi Candra Maulana, A.Md.Komp.',
  groomParents: 'Putra dari Bpk. Tobari & Ibu Sutriah · Selapura',
  groomInstagram: '',
  quoteText:
    'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram di sisinya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
  quoteSource: 'QS. Ar-Rum : 21',
  eventDateISO: '2026-12-22T11:00:00+07:00',
  eventDateDisplay: 'Selasa, 22 Desember 2026',
  akadDateDisplay: 'Senin, 21 Desember 2026',
  akadTitle: 'Akad Nikah',
  akadTime: '09.00 WIB s/d selesai',
  akadVenue: 'Gg. Semboja 12 RT. 02/06 Cergomas - Pakembaran, Kec. Slawi - Kab. Tegal',
  resepsiDateDisplay: 'Selasa, 22 Desember 2026',
  resepsiTitle: 'Resepsi',
  resepsiTime: '11.00 WIB s/d selesai',
  resepsiVenue: 'Gg. Semboja 12 RT. 02/06 Cergomas - Pakembaran, Kec. Slawi - Kab. Tegal',
  dressCode: 'Busana Batik / Rapi & Sopan',
  venueName: 'Kediaman Mempelai Wanita (Pakembaran)',
  venueAddress: 'Gg. Semboja 12 RT. 02/06 Cergomas - Pakembaran, Kec. Slawi, Kab. Tegal',
  venueLat: -6.97944,
  venueLng: 109.13111,
  musicTitle: 'Janji Suci — Yovie & Nuno',
  customMusicUrl: '',
  thankYouHeading: 'Terima Kasih Atas Doa & Kehadiran Anda',
  thankYouMessage:
    'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua putra-putri kami.',
  familySignature:
    'Kel. Bpk. Gatot Prianggodo, S.Pd & Ibu Defi Apriyanti · Kel. Bpk. Tobari & Ibu Sutriah',
  giftAccounts: [
    {
      id: 'bca-1',
      bankName: 'Bank Central Asia (BCA)',
      accountNumber: '',
      accountHolder: 'Bismi Gaviar Putri',
    },
    {
      id: 'mandiri-1',
      bankName: 'Bank Mandiri',
      accountNumber: '',
      accountHolder: 'Rendi Candra Maulana',
    },
  ],
  gallery: [
    {
      id: 'photo-1',
      src: './assets/aistudio/2_189173bc.jpeg',
      alt: 'Potret Bismi dan Rendi dalam busana adat Jawa bludru hitam dengan latar gunungan ukir',
      caption: 'Bismi & Rendi · Busana Adat Jawa',
      span: 'wide',
    },
    {
      id: 'photo-2',
      src: './assets/aistudio/1_b2ef2998.jpeg',
      alt: 'Potret Bismi Gaviar Putri mengenakan kebaya bludru hitam berhias sulaman emas',
      caption: 'Bismi Gaviar Putri, A.Md.Komp.',
      span: 'tall',
    },
    {
      id: 'photo-3',
      src: './assets/aistudio/foto_mempelai_pria_f49441b6.jpg',
      alt: 'Potret Rendi Candra Maulana mengenakan beskap hitam dan blangkon batik',
      caption: 'Rendi Candra Maulana, A.Md.Komp.',
      span: 'tall',
    },
    {
      id: 'photo-4',
      src: './assets/aistudio/3_bde0a069.jpeg',
      alt: 'Bismi dan Rendi berdiri berdampingan di depan ukiran gunungan',
      caption: 'Kebersamaan di Depan Gunungan',
      span: 'standard',
    },
    {
      id: 'photo-5',
      src: './assets/aistudio/17c6e6c9-7895-48f9-917e-2c48e45402b6_7b7c4827.jpg',
      alt: 'Bismi dan Rendi saling menggenggam tangan dalam potret studio',
      caption: 'Genggaman Janji Suci',
      span: 'standard',
    },
    {
      id: 'photo-6',
      src: './assets/aistudio/4_99cfcbd1.jpg',
      alt: 'Potret penuh Bismi dan Rendi berdiri berdampingan dikelilingi rangkaian bunga merah putih',
      caption: 'Potret Penuh Busana Bludru Hitam',
      span: 'standard',
    },
    {
      id: 'photo-7',
      src: './assets/aistudio/dbea5894-b3c4-47cf-a8ae-311352537e7d_faa8b159.jpg',
      alt: 'Potret lengkap Bismi dan Rendi berpose serasi untuk hari bahagia',
      caption: 'Melangkah Menuju Hari Bahagia',
      span: 'standard',
    },
  ],
};

export const DEFAULT_GUESTBOOK_ENTRIES: GuestbookEntry[] = [
  {
    id: 'wish-1',
    name: 'Keluarga Besar Pakembaran',
    attendance: 'hadir',
    guestsCount: 2,
    message:
      'Selamat menempuh hidup baru untuk Bismi dan Rendi. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah serta penuh keberkahan.',
    createdAt: '2026-11-22T10:15:00Z',
  },
  {
    id: 'wish-2',
    name: 'Rekan Kuliah A.Md.Komp.',
    attendance: 'hadir',
    guestsCount: 2,
    message:
      'Alhamdulillah akhirnya sampai ke pelaminan! Lancar akad dan resepsinya di Slawi nanti ya Bismi & Rendi, insyaAllah hadir.',
    createdAt: '2026-11-23T14:40:00Z',
  },
  {
    id: 'wish-3',
    name: 'Keluarga & Sahabat Selapura',
    attendance: 'hadir',
    guestsCount: 3,
    message:
      'Turut berbahagia sedalam-dalamnya. Doa terbaik menyertai Bismi dan Rendi dalam membangun rumah tangga yang rukun dan bahagia selalu.',
    createdAt: '2026-11-24T08:20:00Z',
  },
];
