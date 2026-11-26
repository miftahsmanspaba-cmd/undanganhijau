(function () {
  if (window.__BOTANICA_MOUNTED__) return;
  window.__BOTANICA_MOUNTED__ = true;

  var DATA = {
    coupleShort: 'Bismi & Rendi',
    initials: 'B & R',
    hashtag: '#BismiRendiMenikah',
    dateDots: '22 . 12 . 2026',
    dateDisplay: 'Selasa, 22 Desember 2026',
    eventDateISO: '2026-12-22T11:00:00+07:00',
    locationShort: 'Pakembaran · Kec. Slawi · Kab. Tegal',
    brideFull: 'Bismi Gaviar Putri, A.Md.Komp.',
    brideParents: 'Putri dari Bpk. Gatot Prianggodo, S.Pd & Ibu Defi Apriyanti · Pakembaran',
    groomFull: 'Rendi Candra Maulana, A.Md.Komp.',
    groomParents: 'Putra dari Bpk. Tobari & Ibu Sutriah · Selapura',
    quoteText:
      'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram di sisinya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
    quoteSource: 'QS. Ar-Rum : 21',
    akadTitle: 'Akad Nikah',
    akadDate: 'Senin, 21 Desember 2026',
    akadTime: '09.00 WIB s/d selesai',
    resepsiTitle: 'Resepsi',
    resepsiDate: 'Selasa, 22 Desember 2026',
    resepsiTime: '11.00 WIB s/d selesai',
    venueName: 'Kediaman Mempelai Wanita (Pakembaran)',
    venueAddress: 'Gg. Semboja 12 RT. 02/06 Cergomas - Pakembaran, Kec. Slawi, Kab. Tegal',
    venueLat: -6.97944,
    venueLng: 109.13111,
    dressCode: 'Busana Batik / Rapi & Sopan',
    musicTitle: 'Janji Suci — Yovie & Nuno',
    thankYouHeading: 'Terima Kasih Atas Doa & Kehadiran Anda',
    thankYouMessage:
      'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua putra-putri kami.',
    familySignature:
      'Kel. Bpk. Gatot Prianggodo, S.Pd & Ibu Defi Apriyanti · Kel. Bpk. Tobari & Ibu Sutriah',
    printerCredit: 'Percetakan 2R Harjosari Kidul',
    gifts: [
      { bank: 'Bank Central Asia (BCA)', holder: 'Bismi Gaviar Putri' },
      { bank: 'Bank Mandiri', holder: 'Rendi Candra Maulana' },
    ],
    story: [
      {
        year: '2022',
        title: 'Pertemuan Pertama',
        body: 'Berawal dari bangku perkuliahan hingga saling mengenal di Slawi, percakapan sederhana yang hangat perlahan menumbuhkan rasa nyaman dan kebersamaan.',
      },
      {
        year: '2024',
        title: 'Menjalin Keseriusan',
        body: 'Waktu mengajarkan kami arti saling mengerti, menjaga kepercayaan, dan menyatukan niat baik antara keluarga Pakembaran dan Selapura.',
      },
      {
        year: '2026',
        title: 'Ikatan Suci Pernikahan',
        body: 'Dengan memohon rahmat dan ridho Allah SWT, kami melangkah menuju ikatan suci pernikahan untuk membangun rumah tangga yang sakinah, mawaddah, warahmah.',
      },
    ],
    photos: [
      {
        src: './public/assets/aistudio/2_189173bc.jpeg',
        caption: 'Bismi & Rendi · Busana Adat Jawa',
      },
      {
        src: './public/assets/aistudio/1_b2ef2998.jpeg',
        caption: 'Bismi Gaviar Putri, A.Md.Komp.',
      },
      {
        src: './public/assets/aistudio/foto_mempelai_pria_f49441b6.jpg',
        caption: 'Rendi Candra Maulana, A.Md.Komp.',
      },
      {
        src: './public/assets/aistudio/3_bde0a069.jpeg',
        caption: 'Kebersamaan di Depan Gunungan',
      },
      {
        src: './public/assets/aistudio/17c6e6c9-7895-48f9-917e-2c48e45402b6_7b7c4827.jpg',
        caption: 'Genggaman Janji Suci',
      },
      {
        src: './public/assets/aistudio/4_99cfcbd1.jpg',
        caption: 'Potret Penuh Busana Bludru Hitam',
      },
      {
        src: './public/assets/aistudio/dbea5894-b3c4-47cf-a8ae-311352537e7d_faa8b159.jpg',
        caption: 'Melangkah Menuju Hari Bahagia',
      },
    ],
    defaultWishes: [
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
    ],
  };

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function readGuestName() {
    try {
      var p = new URLSearchParams(window.location.search);
      var raw = p.get('to');
      return raw ? raw.replace(/\+/g, ' ').trim() : '';
    } catch (e) {
      return '';
    }
  }

  function glasshouseSvg(tone) {
    var stroke = tone === 'ivory' ? '#faf6f0' : '#8c7060';
    var fill = tone === 'ivory' ? 'rgba(250,246,240,0.08)' : 'rgba(140,112,96,0.07)';
    var xs = [88, 122, 152, 195, 215, 275, 300, 325, 385, 405, 448, 478, 512];
    var ys = [375, 425, 475, 520];
    var lines = '';
    for (var i = 0; i < xs.length; i++) {
      lines += '<line x1="' + xs[i] + '" y1="335" x2="' + xs[i] + '" y2="570" stroke-width="0.75" opacity="0.2" />';
    }
    for (var j = 0; j < ys.length; j++) {
      lines += '<line x1="55" y1="' + ys[j] + '" x2="545" y2="' + ys[j] + '" stroke-width="0.75" opacity="0.18" />';
    }
    return (
      '<svg viewBox="0 0 600 720" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice" style="width:100%;height:100%;display:block;">' +
      '<path d="M-20 430 Q60 360 130 410 Q175 340 230 395 L230 720 L-20 720 Z" fill="' + fill + '" />' +
      '<path d="M620 430 Q540 360 470 410 Q425 340 370 395 L370 720 L620 720 Z" fill="' + fill + '" />' +
      '<g stroke="' + stroke + '" stroke-linecap="round" stroke-linejoin="round">' +
      '<line x1="300" y1="95" x2="300" y2="132" stroke-width="1.4" opacity="0.45" />' +
      '<circle cx="300" cy="110" r="4" stroke-width="1.2" opacity="0.45" />' +
      '<path d="M262 175 C262 145 279 130 300 130 C321 130 338 145 338 175" stroke-width="1.3" opacity="0.42" />' +
      '<rect x="256" y="175" width="88" height="24" stroke-width="1.2" opacity="0.4" />' +
      '<path d="M175 295 C175 215 230 198 300 198 C370 198 425 215 425 295" stroke-width="1.5" opacity="0.42" />' +
      '<path d="M210 295 C210 225 248 200 300 198 C352 200 390 225 390 295" stroke-width="1" opacity="0.32" />' +
      '<line x1="300" y1="198" x2="300" y2="295" stroke-width="0.9" opacity="0.28" />' +
      '<line x1="168" y1="295" x2="432" y2="295" stroke-width="1.4" opacity="0.42" />' +
      '<rect x="172" y="295" width="256" height="275" stroke-width="1.2" opacity="0.32" />' +
      '<path d="M235 570 L235 375 C235 335 264 312 300 312 C336 312 365 335 365 375 L365 570" stroke-width="1.4" opacity="0.38" />' +
      '<path d="M55 340 L172 315 L172 570 L55 570 Z" stroke-width="1.1" opacity="0.28" />' +
      '<path d="M545 340 L428 315 L428 570 L545 570 Z" stroke-width="1.1" opacity="0.28" />' +
      lines +
      '<path d="M278 525 C285 510 315 510 322 525" stroke-width="1.3" opacity="0.52" />' +
      '<path d="M262 548 C275 562 325 562 338 548 Z" fill="' + fill + '" stroke-width="1.3" opacity="0.52" />' +
      '<line x1="300" y1="560" x2="300" y2="620" stroke-width="3" opacity="0.46" />' +
      '<path d="M225 602 C250 632 350 632 375 602 Z" fill="' + fill + '" stroke-width="1.5" opacity="0.56" />' +
      '<path d="M276 626 L324 626 L334 678 L266 678 Z" fill="' + fill + '" stroke-width="1.4" opacity="0.52" />' +
      '<path d="M180 680 L420 680 L432 710 L168 710 Z" fill="' + fill + '" stroke-width="1.5" opacity="0.55" />' +
      '</g></svg>'
    );
  }

  function damaskSvg(pos) {
    return (
      '<svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="vb-damask vb-damask--' + pos + '">' +
      '<g stroke="#faf6f0" stroke-width="1.2" fill="#faf6f0" fill-opacity="0.18">' +
      '<path d="M12 10 C45 14 76 32 98 62" fill="none" />' +
      '<path d="M22 24 C16 54 24 84 44 106" fill="none" />' +
      '<ellipse cx="48" cy="24" rx="18" ry="8" transform="rotate(-18 48 24)" />' +
      '<ellipse cx="76" cy="40" rx="16" ry="7" transform="rotate(22 76 40)" />' +
      '<ellipse cx="26" cy="58" rx="15" ry="7" transform="rotate(64 26 58)" />' +
      '<circle cx="96" cy="60" r="8" /><circle cx="114" cy="44" r="5" />' +
      '</g></svg>'
    );
  }

  function cornerFloral(corner, extraClass) {
    return (
      '<div class="vb-corner vb-corner--' + corner + ' ' + (extraClass || '') + '" aria-hidden="true">' +
      '<img src="./src/assets/images/floral_corner_bouquet.png" alt="" class="vb-corner-img" />' +
      '</div>'
    );
  }

  var style = document.createElement('style');
  style.textContent =
    '*,*::before,*::after{box-sizing:border-box}' +
    'html{scroll-behavior:smooth;background:#d8cec3;color:#332924;font-family:"Plus Jakarta Sans",system-ui,-apple-system,sans-serif}' +
    'body{margin:0;min-height:100vh;background:#d8cec3;color:#332924;overflow-x:hidden;-webkit-font-smoothing:antialiased}' +
    '.vb-font-display{font-family:"Cormorant Garamond",Georgia,serif}' +
    '.vb-backdrop{min-height:100vh;background-color:#cfc4b8;background-image:radial-gradient(circle at 50% 25%,rgba(246,239,231,.55),rgba(190,174,160,.65)),url("./src/assets/images/botanical_backdrop_garden_1795659465193.jpg");background-size:cover,640px auto;background-repeat:no-repeat,repeat;background-position:center top,center top}' +
    '.vb-sheet{max-width:680px;margin:0 auto;min-height:100vh;position:relative;border-left:1px solid rgba(140,112,96,.25);border-right:1px solid rgba(140,112,96,.25);padding-bottom:6rem;background-color:#f7f2eb;background-image:radial-gradient(ellipse at 50% 0%,rgba(255,252,247,.85),rgba(243,235,225,.65)),url("./src/assets/images/botanical_cream_parchment_1795659478917.jpg");background-size:auto,100% auto;background-repeat:no-repeat,repeat-y;box-shadow:0 24px 70px rgba(51,41,36,.22)}' +
    '.vb-cover{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;padding:12px;transition:transform 620ms cubic-bezier(.22,1,.36,1),opacity 480ms ease;will-change:transform,opacity}' +
    '.vb-cover.is-opened{transform:translate3d(0,-100%,0);opacity:0;pointer-events:none}' +
    '.vb-cover-card{position:relative;width:100%;max-width:540px;height:100%;max-height:860px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;overflow:hidden;border-radius:18px;border:1px solid rgba(140,112,96,.45);padding:2rem 1.5rem;text-align:center;background:radial-gradient(circle at 50% 45%,rgba(255,253,250,.92) 0%,rgba(242,235,226,.88) 65%,rgba(226,215,203,.92) 100%);box-shadow:0 24px 60px rgba(51,41,36,.24)}' +
    '.vb-glass{position:absolute;inset:0;pointer-events:none;overflow:hidden}' +
    '.vb-corner{position:absolute;width:145px;height:145px;pointer-events:none;user-select:none;z-index:2}' +
    '@media(min-width:640px){.vb-corner{width:176px;height:176px}}' +
    '.vb-corner-img{width:100%;height:100%;object-fit:contain;filter:sepia(.22) saturate(.95)}' +
    '.vb-corner--top-left{top:0;left:0;transform-origin:top left;animation:vbSwayA 4.8s ease-in-out infinite}.vb-corner--top-left img{transform:scaleX(-1)}' +
    '.vb-corner--top-right{top:0;right:0;transform-origin:top right;animation:vbSwayB 5.2s ease-in-out infinite}' +
    '.vb-corner--bottom-left{bottom:0;left:0;transform-origin:bottom left;animation:vbSwayB 5.4s ease-in-out infinite}.vb-corner--bottom-left img{transform:scale(-1)}' +
    '.vb-corner--bottom-right{bottom:0;right:0;transform-origin:bottom right;animation:vbSwayA 5s ease-in-out infinite}.vb-corner--bottom-right img{transform:scaleY(-1)}' +
    '.vb-corner--sm{width:116px;height:116px;opacity:.65}@media(min-width:640px){.vb-corner--sm{width:144px;height:144px}}' +
    '@keyframes vbSwayA{0%,100%{transform:translate3d(0,0,0) rotate(0deg) scale(1)}50%{transform:translate3d(3px,-4px,0) rotate(2.6deg) scale(1.03)}}' +
    '@keyframes vbSwayB{0%,100%{transform:translate3d(0,0,0) rotate(0deg) scale(1)}50%{transform:translate3d(-3px,-4px,0) rotate(-2.6deg) scale(1.03)}}' +
    '@keyframes vbFloat{0%,100%{transform:translate3d(0,0,0) rotate(0deg) scale(1)}50%{transform:translate3d(0,-5px,0) rotate(1.1deg) scale(1.025)}}' +
    '.vb-float{animation:vbFloat 5.2s ease-in-out infinite;filter:sepia(.22) saturate(.95)}' +
    '.vb-oval-wrap{position:relative;z-index:10;width:176px;margin-top:6px}@media(min-width:640px){.vb-oval-wrap{width:206px}}' +
    '.vb-oval{border-radius:9999px;border:2px solid rgba(140,112,96,.7);background:#fffcf8;padding:6px;box-shadow:0 10px 25px rgba(51,41,36,.15)}' +
    '.vb-oval-inner{aspect-ratio:3/4;overflow:hidden;border-radius:9999px;background:#ebe3d8}' +
    '.vb-oval-inner img,.vb-arch-inner img,.vb-quote-photo img,.vb-tile img{width:100%;height:100%;object-fit:cover;object-position:top;display:block}' +
    '.vb-guest-box{border-radius:14px;border:1px solid rgba(140,112,96,.35);background:rgba(255,252,248,.92);padding:14px 18px;box-shadow:0 2px 8px rgba(51,41,36,.06)}' +
    '.vb-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:9999px;background:#a68674;color:#fff;padding:12px 28px;font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;text-decoration:none;box-shadow:0 6px 16px rgba(51,41,36,.16)}' +
    '.vb-btn:hover{background:#8c7060}' +
    '.vb-btn-rect{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:10px;background:#8c7060;color:#fff;padding:10px 18px;font-size:13px;font-weight:500;cursor:pointer;text-decoration:none}' +
    '.vb-btn-rect:hover{background:#71584a}' +
    '.vb-btn-outline{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid rgba(140,112,96,.32);border-radius:10px;background:#fffcf8;color:#71584a;padding:10px 18px;font-size:13px;font-weight:500;cursor:pointer;text-decoration:none}' +
    '.vb-btn-outline:hover{background:#f2ebe2}' +
    '.vb-sec{position:relative;overflow:hidden;padding:3.8rem 1.5rem;text-align:center;border-top:1px solid rgba(140,112,96,.16)}' +
    '@media(min-width:640px){.vb-sec{padding:4.5rem 2.5rem}}' +
    '.vb-cartouche{position:relative;max-width:430px;margin:0 auto;padding:3rem 1.75rem}' +
    '@media(min-width:640px){.vb-cartouche{padding:3.8rem 2.75rem}}' +
    '.vb-seal{margin:0 auto;width:64px;height:64px;border-radius:9999px;border:1px solid rgba(169,134,103,.55);background:#fffcf8;display:flex;align-items:center;justify-content:center}' +
    '.vb-seal-inner{width:52px;height:52px;border-radius:9999px;border:1px solid rgba(140,112,96,.3);display:flex;align-items:center;justify-content:center;color:#8c7060;font-weight:600;letter-spacing:.12em}' +
    '.vb-cocoa{background:linear-gradient(180deg,#977a6a 0%,#866a5a 100%);color:#faf6f0;border-top:none}' +
    '.vb-damask{position:absolute;top:0;width:144px;height:144px;opacity:.18;pointer-events:none}' +
    '.vb-damask--top-left{left:0}.vb-damask--top-right{right:0;transform:scaleX(-1)}' +
    '.vb-quote-photo{max-width:300px;margin:0 auto;border-radius:18px;border:2px solid rgba(255,252,248,.9);background:rgba(255,252,248,.15);padding:6px;box-shadow:0 18px 36px rgba(51,41,36,.25)}' +
    '.vb-quote-photo-inner{aspect-ratio:3/4;overflow:hidden;border-radius:12px;background:#745a4c}' +
    '.vb-eyebrow{margin:0;font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#a98667}' +
    '.vb-grid-2{display:grid;grid-template-columns:1fr;gap:1.5rem;margin-top:2.25rem}' +
    '@media(min-width:640px){.vb-grid-2{grid-template-columns:1fr 1fr}}' +
    '.vb-arch{width:196px;border-radius:9999px 9999px 18px 18px;border:1.5px solid rgba(140,112,96,.48);padding:6px;background:#fffcf8;margin:0 auto}' +
    '.vb-arch-inner{aspect-ratio:3/4;border-radius:9999px 9999px 12px 12px;overflow:hidden;background:#ebe3d8}' +
    '.vb-card{background:#fffcf8;border:1px solid rgba(140,112,96,.22);border-radius:18px}' +
    '.vb-double{background:#fffcf8;border:1px solid rgba(169,134,103,.42);outline:1px solid rgba(140,112,96,.16);outline-offset:-6px;border-radius:18px;padding:1.5rem}' +
    '.vb-cd-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;max-width:420px;margin:2rem auto 0}' +
    '.vb-cd-num{font-size:clamp(1.7rem,6vw,2.25rem);font-weight:600;color:#8c7060;line-height:1;font-variant-numeric:tabular-nums}' +
    '.vb-gallery{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:2rem}' +
    '.vb-tile{position:relative;overflow:hidden;border-radius:12px;border:1px solid rgba(169,134,103,.4);background:#ebe3d8;padding:0;cursor:pointer;aspect-ratio:3/4}' +
    '.vb-tile--wide{grid-column:span 2;aspect-ratio:4/5}@media(min-width:640px){.vb-tile--wide{aspect-ratio:4/4}}' +
    '.vb-tile-cap{position:absolute;inset:auto 0 0 0;background:linear-gradient(to top,rgba(0,0,0,.75),transparent);padding:12px;color:#fff;font-size:11px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.vb-input{width:100%;border:1px solid rgba(140,112,96,.25);background:#faf6f0;border-radius:8px;padding:10px 14px;font:inherit;font-size:14px;color:#332924;margin-top:6px}' +
    '.vb-dock{position:fixed;bottom:12px;left:50%;transform:translateX(-50%);z-index:40;display:none;align-items:center;gap:4px;border-radius:9999px;border:1px solid rgba(169,134,103,.45);background:#fffcf8;padding:6px 10px;box-shadow:0 10px 25px rgba(51,41,36,.16)}' +
    '.vb-dock.is-visible{display:flex}' +
    '.vb-dock a{text-decoration:none;color:#5f5149;font-size:11px;font-weight:500;padding:6px 10px;border-radius:9999px;white-space:nowrap}' +
    '.vb-dock a:hover{background:#f2ebe2;color:#332924}' +
    '.vb-fab{position:fixed;bottom:14px;right:14px;z-index:40;display:none;align-items:center;gap:8px}' +
    '.vb-fab.is-visible{display:flex}' +
    '.vb-fab-btn{width:44px;height:44px;border-radius:9999px;border:1px solid rgba(169,134,103,.45);background:#8c7060;color:#fff;cursor:pointer;box-shadow:0 8px 20px rgba(51,41,36,.22);font-size:16px}' +
    '.vb-reveal{opacity:0;transform:translate3d(0,18px,0);transition:opacity 600ms cubic-bezier(.22,1,.36,1),transform 620ms cubic-bezier(.22,1,.36,1)}' +
    '.vb-reveal.in{opacity:1;transform:translate3d(0,0,0)}' +
    '.vb-modal{position:fixed;inset:0;z-index:60;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.85);padding:16px}' +
    '.vb-modal.open{display:flex}';
  document.head.appendChild(style);

  var guest = readGuestName();
  var displayGuest = guest || 'Tamu Undangan Terhormat';
  var WISHES_KEY = 'vintage_botanica_wishes_bismi_rendi_v1';
  var wishes = DATA.defaultWishes.slice();
  try {
    var savedW = localStorage.getItem(WISHES_KEY);
    if (savedW) {
      var parsedW = JSON.parse(savedW);
      if (Array.isArray(parsedW)) wishes = parsedW;
    }
  } catch (e) {}

  var storyHtml = DATA.story
    .map(function (s) {
      return (
        '<div class="vb-card vb-reveal" style="padding:1.35rem;text-align:left;margin-top:14px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;">' +
        '<h3 class="vb-font-display" style="margin:0;font-size:1.55rem;font-weight:500;color:#332924;">' + esc(s.title) + '</h3>' +
        '<span style="font-size:12px;font-weight:600;letter-spacing:.14em;color:#a98667;">' + esc(s.year) + '</span>' +
        '</div>' +
        '<p style="margin:8px 0 0;font-size:14px;line-height:1.65;color:#5f5149;">' + esc(s.body) + '</p>' +
        '</div>'
      );
    })
    .join('');

  var galleryHtml = DATA.photos
    .map(function (p, i) {
      return (
        '<button type="button" class="vb-tile ' + (i === 0 ? 'vb-tile--wide' : '') + ' vb-reveal" data-idx="' + i + '">' +
        '<img src="' + esc(p.src) + '" alt="' + esc(p.caption) + '" loading="lazy" />' +
        '<div class="vb-tile-cap">' + esc(p.caption) + '</div>' +
        '</button>'
      );
    })
    .join('');

  var giftsHtml = DATA.gifts
    .map(function (g) {
      return (
        '<div class="vb-double" style="text-align:left;">' +
        '<p class="vb-eyebrow">' + esc(g.bank) + '</p>' +
        '<p style="margin:8px 0 0;font-size:14px;font-weight:600;color:#332924;">a.n. ' + esc(g.holder) + '</p>' +
        '<p style="margin:6px 0 0;font-size:12px;font-style:italic;color:#84756c;">Contoh amplop digital (nomor rekening dicantumkan sesuai data mempelai).</p>' +
        '</div>'
      );
    })
    .join('');

  var mapsEmbed =
    'https://maps.google.com/maps?q=' + DATA.venueLat + ',' + DATA.venueLng + '&z=16&output=embed';
  var mapsDir =
    'https://www.google.com/maps/dir/?api=1&destination=' + DATA.venueLat + ',' + DATA.venueLng;

  var root = document.getElementById('root');
  root.innerHTML =
    '<div class="vb-backdrop">' +
    // Cover Curtain
    '<div id="vb-cover" class="vb-cover vb-backdrop">' +
      '<div class="vb-cover-card">' +
        '<div class="vb-glass" style="opacity:.85;">' + glasshouseSvg('sepia') + '</div>' +
        cornerFloral('top-left') + cornerFloral('top-right') +
        cornerFloral('bottom-left') + cornerFloral('bottom-right') +
        '<div class="vb-oval-wrap"><div class="vb-oval"><div class="vb-oval-inner">' +
          '<img src="' + esc(DATA.photos[0].src) + '" alt="' + esc(DATA.coupleShort) + '" />' +
        '</div></div></div>' +
        '<div style="position:relative;z-index:10;margin:8px 0;">' +
          '<p style="margin:0;font-size:11px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:#4a3b34;">The Wedding Of</p>' +
          '<h1 class="vb-font-display" style="margin:6px 0 0;font-size:clamp(2rem,8.5vw,3rem);font-style:italic;font-weight:500;color:#8c7060;white-space:nowrap;">' + esc(DATA.coupleShort) + '</h1>' +
          '<p style="margin:4px 0 0;font-size:12px;letter-spacing:.2em;color:#5f5149;">' + esc(DATA.dateDots) + '</p>' +
        '</div>' +
        '<div style="position:relative;z-index:10;width:100%;max-width:320px;">' +
          '<div class="vb-guest-box">' +
            '<p style="margin:0;font-size:11px;color:#5f5149;font-weight:500;">Kepada Yth. Bapak/Ibu/Saudara/i</p>' +
            '<p class="vb-font-display" style="margin:4px 0 0;font-size:1.5rem;font-weight:600;color:#332924;">' + esc(displayGuest) + '</p>' +
          '</div>' +
          '<button id="vb-open-btn" type="button" class="vb-btn" style="margin-top:14px;">Buka Undangan</button>' +
        '</div>' +
      '</div>' +
    '</div>' +

    // Main Sheet
    '<main class="vb-sheet">' +
      // Hero Cartouche
      '<section id="sampul" class="vb-sec" style="border-top:none;">' +
        '<div class="vb-glass" style="opacity:.85;">' + glasshouseSvg('sepia') + '</div>' +
        cornerFloral('top-left') + cornerFloral('top-right') +
        cornerFloral('bottom-left') + cornerFloral('bottom-right') +
        '<div class="vb-cartouche" style="z-index:10;">' +
          '<svg viewBox="0 0 400 560" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">' +
            '<path d="M52 24 Q125 22 155 48 Q200 10 245 48 Q275 22 348 24 Q376 26 378 58 L378 502 Q376 534 348 536 Q275 538 245 512 Q200 550 155 512 Q125 538 52 536 Q24 534 22 502 L22 58 Q24 26 52 24 Z" fill="rgba(255,252,247,0.84)" stroke="#8c7060" stroke-width="2.2" />' +
            '<path d="M58 32 Q126 30 155 54 Q200 19 245 54 Q274 30 342 32 Q367 34 369 62 L369 498 Q367 526 342 528 Q274 530 245 506 Q200 541 155 506 Q126 530 58 528 Q33 526 31 498 L31 62 Q33 34 58 32 Z" stroke="rgba(140,112,96,0.35)" stroke-width="1" />' +
          '</svg>' +
          '<div style="position:relative;z-index:10;">' +
            '<div class="vb-seal vb-reveal"><div class="vb-seal-inner vb-font-display">' + esc(DATA.initials) + '</div></div>' +
            '<p class="vb-reveal" style="margin:20px 0 0;font-size:11px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:#4a3b34;">The Wedding Of</p>' +
            '<h2 class="vb-font-display vb-reveal" style="margin:12px 0 0;font-size:clamp(2.25rem,9.5vw,3.4rem);font-style:italic;font-weight:500;color:#8c7060;white-space:nowrap;">' + esc(DATA.coupleShort) + '</h2>' +
            '<p class="vb-reveal" style="margin:16px 0 0;font-size:12px;letter-spacing:.18em;color:#5f5149;">' + esc(DATA.hashtag) + '</p>' +
            '<p class="vb-reveal" style="margin:8px 0 0;font-size:14px;font-weight:600;letter-spacing:.26em;color:#332924;">' + esc(DATA.dateDots) + '</p>' +
            '<p class="vb-reveal" style="margin:8px 0 0;font-size:12px;color:#84756c;">' + esc(DATA.locationShort) + '</p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      // We Found Love Cocoa Band
      '<section class="vb-sec vb-cocoa">' +
        damaskSvg('top-left') + damaskSvg('top-right') +
        '<div class="vb-glass" style="opacity:.22;">' + glasshouseSvg('ivory') + '</div>' +
        '<div style="position:relative;z-index:10;">' +
          '<div class="vb-quote-photo vb-reveal"><div class="vb-quote-photo-inner"><img src="' + esc(DATA.photos[0].src) + '" alt="' + esc(DATA.coupleShort) + '" /></div></div>' +
          '<div style="max-width:500px;margin:2rem auto 0;">' +
            '<h3 class="vb-font-display vb-reveal" style="margin:0;font-size:clamp(2.4rem,8vw,3rem);font-style:italic;font-weight:400;color:#fff;">We Found Love</h3>' +
            '<blockquote class="vb-reveal" style="margin:16px 0 0;font-size:15px;font-style:italic;line-height:1.7;color:rgba(250,246,240,.95);">“' + esc(DATA.quoteText) + '”</blockquote>' +
            '<p class="vb-reveal" style="margin:12px 0 0;font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#f0dfd1;">' + esc(DATA.quoteSource) + '</p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      // Mempelai
      '<section id="mempelai" class="vb-sec">' +
        '<div class="vb-glass" style="opacity:.3;">' + glasshouseSvg('sepia') + '</div>' +
        cornerFloral('top-left', 'vb-corner--sm') + cornerFloral('top-right', 'vb-corner--sm') +
        '<div style="position:relative;z-index:10;">' +
          '<p class="vb-eyebrow vb-reveal">Assalamu’alaikum Warahmatullahi Wabarakatuh</p>' +
          '<p class="vb-reveal" style="margin:12px auto 0;max-width:440px;font-size:14px;line-height:1.65;color:#5f5149;">Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan putra-putri kami:</p>' +
          '<div class="vb-grid-2">' +
            '<article class="vb-reveal">' +
              '<div class="vb-arch"><div class="vb-arch-inner"><img src="' + esc(DATA.photos[1].src) + '" alt="' + esc(DATA.brideFull) + '" /></div></div>' +
              '<p class="vb-eyebrow" style="margin-top:20px;">Mempelai Wanita</p>' +
              '<h3 class="vb-font-display" style="margin:6px 0 0;font-size:clamp(1.1rem,4.4vw,1.35rem);font-weight:500;color:#332924;white-space:nowrap;">' + esc(DATA.brideFull) + '</h3>' +
              '<p style="margin:8px auto 0;font-size:13px;line-height:1.6;color:#5f5149;max-width:300px;">' + esc(DATA.brideParents) + '</p>' +
            '</article>' +
            '<article class="vb-reveal">' +
              '<div class="vb-arch"><div class="vb-arch-inner"><img src="' + esc(DATA.photos[2].src) + '" alt="' + esc(DATA.groomFull) + '" /></div></div>' +
              '<p class="vb-eyebrow" style="margin-top:20px;">Mempelai Pria</p>' +
              '<h3 class="vb-font-display" style="margin:6px 0 0;font-size:clamp(1.1rem,4.4vw,1.35rem);font-weight:500;color:#332924;white-space:nowrap;">' + esc(DATA.groomFull) + '</h3>' +
              '<p style="margin:8px auto 0;font-size:13px;line-height:1.6;color:#5f5149;max-width:300px;">' + esc(DATA.groomParents) + '</p>' +
            '</article>' +
          '</div>' +
        '</div>' +
      '</section>' +

      // Perjalanan Cinta
      '<section class="vb-sec" style="background:rgba(140,112,96,.07);">' +
        cornerFloral('bottom-right', 'vb-corner--sm') +
        '<div style="position:relative;z-index:10;">' +
          '<p class="vb-eyebrow vb-reveal">Kisah Kami</p>' +
          '<h2 class="vb-font-display vb-reveal" style="margin:10px 0 18px;font-size:2.1rem;font-weight:500;color:#332924;">Perjalanan Cinta</h2>' +
          storyHtml +
        '</div>' +
      '</section>' +

      // Countdown
      '<section id="acara" class="vb-sec">' +
        cornerFloral('top-left', 'vb-corner--sm') +
        '<div style="position:relative;z-index:10;">' +
          '<p class="vb-eyebrow vb-reveal">Save The Date</p>' +
          '<h2 class="vb-font-display vb-reveal" style="margin:10px 0 0;font-size:2.15rem;font-weight:500;color:#332924;">Menuju Hari Bahagia</h2>' +
          '<p class="vb-reveal" style="margin:8px 0 0;font-size:14px;color:#5f5149;">' + esc(DATA.dateDisplay) + ' · ' + esc(DATA.venueName) + '</p>' +
          '<div class="vb-cd-grid vb-reveal">' +
            '<div class="vb-double" style="padding:16px 6px;"><div id="cd-d" class="vb-font-display vb-cd-num">00</div><div style="margin-top:6px;font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:#84756c;">Hari</div></div>' +
            '<div class="vb-double" style="padding:16px 6px;"><div id="cd-h" class="vb-font-display vb-cd-num">00</div><div style="margin-top:6px;font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:#84756c;">Jam</div></div>' +
            '<div class="vb-double" style="padding:16px 6px;"><div id="cd-m" class="vb-font-display vb-cd-num">00</div><div style="margin-top:6px;font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:#84756c;">Menit</div></div>' +
            '<div class="vb-double" style="padding:16px 6px;"><div id="cd-s" class="vb-font-display vb-cd-num">00</div><div style="margin-top:6px;font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:#84756c;">Detik</div></div>' +
          '</div>' +
          '<div style="margin-top:24px;display:flex;flex-wrap:wrap;justify-content:center;gap:10px;">' +
            '<button id="vb-ics-btn" type="button" class="vb-btn-rect">Unduh Pengingat (.ics)</button>' +
          '</div>' +
        '</div>' +
      '</section>' +

      // Lokasi & Jadwal
      '<section id="lokasi" class="vb-sec">' +
        '<p class="vb-eyebrow vb-reveal">Rangkaian Acara &amp; Lokasi</p>' +
        '<h2 class="vb-font-display vb-reveal" style="margin:10px 0 0;font-size:2.15rem;font-weight:500;color:#332924;">Jadwal &amp; Petunjuk Arah</h2>' +
        '<p class="vb-reveal" style="margin:8px 0 0;font-size:14px;color:#5f5149;">Dress Code: ' + esc(DATA.dressCode) + '</p>' +
        '<div class="vb-grid-2">' +
          '<article class="vb-double vb-reveal">' +
            '<p class="vb-eyebrow">Prosesi Suci</p>' +
            '<h3 class="vb-font-display" style="margin:6px 0 0;font-size:1.8rem;font-weight:500;color:#332924;">' + esc(DATA.akadTitle) + '</h3>' +
            '<p style="margin:14px 0 4px;font-size:14px;font-weight:600;color:#332924;">' + esc(DATA.akadDate) + '</p>' +
            '<p style="margin:0 0 8px;font-size:14px;font-weight:500;color:#8c7060;">' + esc(DATA.akadTime) + '</p>' +
            '<p style="margin:0;font-size:12px;line-height:1.6;color:#5f5149;">' + esc(DATA.venueAddress) + '</p>' +
          '</article>' +
          '<article class="vb-double vb-reveal">' +
            '<p class="vb-eyebrow">Ramah Tamah</p>' +
            '<h3 class="vb-font-display" style="margin:6px 0 0;font-size:1.8rem;font-weight:500;color:#332924;">' + esc(DATA.resepsiTitle) + '</h3>' +
            '<p style="margin:14px 0 4px;font-size:14px;font-weight:600;color:#332924;">' + esc(DATA.resepsiDate) + '</p>' +
            '<p style="margin:0 0 8px;font-size:14px;font-weight:500;color:#8c7060;">' + esc(DATA.resepsiTime) + '</p>' +
            '<p style="margin:0;font-size:12px;line-height:1.6;color:#5f5149;">' + esc(DATA.venueAddress) + '</p>' +
          '</article>' +
        '</div>' +
        '<div class="vb-card vb-reveal" style="margin-top:24px;overflow:hidden;text-align:left;">' +
          '<div style="height:300px;background:#ebe3d8;"><iframe title="Lokasi Acara" src="' + esc(mapsEmbed) + '" style="width:100%;height:100%;border:0;" loading="lazy"></iframe></div>' +
          '<div style="padding:20px 24px;">' +
            '<h3 class="vb-font-display" style="margin:0;font-size:1.5rem;font-weight:500;color:#332924;">' + esc(DATA.venueName) + '</h3>' +
            '<p style="margin:6px 0 0;font-size:14px;line-height:1.6;color:#5f5149;">' + esc(DATA.venueAddress) + '</p>' +
            '<div style="margin-top:16px;display:flex;flex-wrap:wrap;gap:10px;">' +
              '<a class="vb-btn-rect" href="' + esc(mapsDir) + '" target="_blank" rel="noopener noreferrer">Buka Google Maps</a>' +
              '<button id="vb-copy-addr" type="button" class="vb-btn-outline">Salin Alamat</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      // Galeri
      '<section id="galeri" class="vb-sec">' +
        '<p class="vb-eyebrow vb-reveal">Galeri Foto</p>' +
        '<h2 class="vb-font-display vb-reveal" style="margin:10px 0 0;font-size:2.15rem;font-weight:500;color:#332924;">Momen Kebersamaan Kami</h2>' +
        '<p class="vb-reveal" style="margin:8px 0 0;font-size:14px;color:#5f5149;">Ketuk setiap potret untuk melihat dalam tampilan layar penuh.</p>' +
        '<div class="vb-gallery">' + galleryHtml + '</div>' +
      '</section>' +

      // Buku Tamu
      '<section id="buku-tamu" class="vb-sec">' +
        '<p class="vb-eyebrow vb-reveal">Buku Tamu &amp; RSVP</p>' +
        '<h2 class="vb-font-display vb-reveal" style="margin:10px 0 0;font-size:2.15rem;font-weight:500;color:#332924;">Konfirmasi Kehadiran &amp; Doa Restu</h2>' +
        '<form id="vb-wish-form" class="vb-double vb-reveal" style="margin-top:2rem;text-align:left;">' +
          '<label style="font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#5f5149;">Nama Lengkap / Keluarga' +
            '<input id="vb-w-name" class="vb-input" required maxlength="80" value="' + esc(guest) + '" placeholder="Contoh: Budi Santoso & Keluarga" />' +
          '</label>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">' +
            '<label style="font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#5f5149;">Kehadiran' +
              '<select id="vb-w-status" class="vb-input"><option value="hadir">InsyaAllah Hadir</option><option value="ragu">Masih Ragu</option><option value="tidak_hadir">Berhalangan</option></select>' +
            '</label>' +
            '<label style="font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#5f5149;">Jumlah Tamu' +
              '<select id="vb-w-count" class="vb-input"><option value="1">1 Orang</option><option value="2">2 Orang</option><option value="3">3 Orang</option><option value="4">4 Orang</option></select>' +
            '</label>' +
          '</div>' +
          '<label style="display:block;margin-top:12px;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#5f5149;">Ucapan &amp; Doa' +
            '<textarea id="vb-w-msg" class="vb-input" rows="3" required maxlength="400" placeholder="Tuliskan doa restu Anda..."></textarea>' +
          '</label>' +
          '<button type="submit" class="vb-btn-rect" style="width:100%;margin-top:14px;">Kirim Ucapan &amp; Konfirmasi</button>' +
        '</form>' +
        '<div id="vb-wishes-card" class="vb-card vb-reveal" style="margin-top:20px;padding:20px;text-align:left;max-height:380px;overflow-y:auto;"></div>' +
      '</section>' +

      // Terima Kasih
      '<section id="terima-kasih" class="vb-sec">' +
        '<p class="vb-eyebrow vb-reveal">Ucapan Terima Kasih</p>' +
        '<h2 class="vb-font-display vb-reveal" style="margin:10px 0 0;font-size:2.15rem;font-weight:500;color:#332924;">' + esc(DATA.thankYouHeading) + '</h2>' +
        '<p class="vb-reveal" style="margin:14px auto 0;max-width:520px;font-size:14px;line-height:1.65;color:#5f5149;">' + esc(DATA.thankYouMessage) + '</p>' +
        '<div style="margin-top:24px;display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">' +
          '<button id="vb-gift-toggle" type="button" class="vb-btn-rect">Amplop Digital / Tanda Kasih</button>' +
          '<button id="vb-card-open" type="button" class="vb-btn-outline">Kartu Ucapan Terima Kasih</button>' +
        '</div>' +
        '<div id="vb-gift-panel" class="vb-grid-2" style="display:none;">' + giftsHtml + '</div>' +
        '<img src="./src/assets/images/floral_closing_wreath.png" alt="" class="vb-float vb-reveal" style="display:block;margin:36px auto 8px;width:260px;max-width:85%;object-fit:contain;" />' +
        '<p class="vb-font-display vb-reveal" style="margin:8px 0 0;font-size:clamp(1.6rem,7vw,1.95rem);font-style:italic;color:#332924;white-space:nowrap;">' + esc(DATA.coupleShort) + '</p>' +
        '<p class="vb-reveal" style="margin:8px 0 0;font-size:13px;color:#5f5149;">' + esc(DATA.familySignature) + '</p>' +
      '</section>' +

      // Footer
      '<footer class="vb-sec vb-cocoa" style="padding:2.4rem 1.5rem;">' +
        damaskSvg('top-left') + damaskSvg('top-right') +
        '<div style="position:relative;z-index:10;">' +
          '<p style="margin:0;font-size:12px;color:rgba(250,246,240,.85);">' + esc(DATA.coupleShort) + ' · ' + esc(DATA.dateDisplay) + ' · ' + esc(DATA.venueName) + '</p>' +
          '<p class="vb-font-display" style="margin:8px 0 0;font-size:1.25rem;font-weight:500;letter-spacing:.04em;color:#fff;">' + esc(DATA.printerCredit) + '</p>' +
        '</div>' +
      '</footer>' +
    '</main>' +

    // Dock & Audio
    '<nav id="vb-dock" class="vb-dock" aria-label="Navigasi">' +
      '<a href="#mempelai">Mempelai</a><a href="#acara">Acara</a><a href="#lokasi">Lokasi</a><a href="#galeri">Galeri</a><a href="#buku-tamu">Ucapan</a>' +
    '</nav>' +
    '<div id="vb-fab" class="vb-fab">' +
      '<span id="vb-music-lbl" style="display:none;background:rgba(255,252,248,.95);border:1px solid rgba(169,134,103,.4);border-radius:9999px;padding:6px 12px;font-size:11px;font-weight:500;color:#8c7060;">' + esc(DATA.musicTitle) + '</span>' +
      '<button id="vb-audio-btn" type="button" class="vb-fab-btn" aria-label="Putar atau jeda musik">▶</button>' +
    '</div>' +

    // Lightbox & Card Modals
    '<div id="vb-lightbox" class="vb-modal"><div style="max-width:780px;width:100%;text-align:center;color:#fff;">' +
      '<img id="vb-lb-img" src="" alt="" style="max-height:76vh;max-width:100%;border-radius:12px;object-fit:contain;" />' +
      '<p id="vb-lb-cap" class="vb-font-display" style="margin:12px 0 0;font-size:1.3rem;"></p>' +
    '</div></div>' +
    '<div id="vb-card-modal" class="vb-modal" style="background:rgba(0,0,0,.72);"><div class="vb-card" style="max-width:480px;width:100%;padding:32px;text-align:center;">' +
      '<p class="vb-eyebrow">Kartu Terima Kasih</p>' +
      '<h3 class="vb-font-display" style="margin:10px 0 0;font-size:1.9rem;color:#332924;">Terima Kasih, ' + esc(guest || 'Sahabat Terkasih') + '</h3>' +
      '<p style="margin:14px 0 0;font-size:14px;line-height:1.65;color:#5f5149;">' + esc(DATA.thankYouMessage) + '</p>' +
      '<p class="vb-font-display" style="margin:18px 0 0;font-size:1.5rem;font-style:italic;color:#71584a;">' + esc(DATA.coupleShort) + '</p>' +
      '<div style="margin-top:22px;display:flex;justify-content:center;gap:10px;">' +
        '<button type="button" class="vb-btn-rect" onclick="window.print()">Cetak / Simpan PDF</button>' +
        '<button id="vb-card-close" type="button" class="vb-btn-outline">Tutup</button>' +
      '</div>' +
    '</div></div>' +
    '</div>';

  // Web Audio Janji Suci piano engine
  var audioCtx = null, master = null, timer = null, playing = false, step = 0;
  var score = [
    [659.25, [261.63, 329.63, 392], 130.81], [783.99, [], 0], [880, [493.88], 0], [783.99, [329.63], 0],
    [659.25, [392], 0], [587.33, [], 0], [659.25, [329.63], 0], [0, [], 0],
    [587.33, [246.94, 329.63, 392], 164.81], [659.25, [], 0], [783.99, [493.88], 0], [659.25, [392], 0],
    [587.33, [329.63], 0], [493.88, [], 0], [523.25, [293.66], 0], [0, [], 0],
    [523.25, [220, 261.63, 329.63], 174.61], [587.33, [], 0], [659.25, [349.23], 0], [587.33, [329.63], 0],
    [523.25, [261.63], 0], [440, [], 0], [523.25, [329.63], 0], [0, [], 0],
    [587.33, [246.94, 293.66, 392], 196], [659.25, [], 0], [587.33, [349.23], 0], [523.25, [293.66], 0],
    [493.88, [246.94], 0], [440, [], 0], [392, [293.66], 0], [0, [], 0],
  ];
  function strike(f, peak, dur) {
    if (!audioCtx || !master || audioCtx.state !== 'running') return;
    var now = audioCtx.currentTime, o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = 'triangle'; o.frequency.setValueAtTime(f, now);
    g.gain.setValueAtTime(0.0001, now); g.gain.linearRampToValueAtTime(peak, now + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    o.connect(g); g.connect(master); o.start(now); o.stop(now + dur + 0.05);
  }
  function tickNote() {
    var s = score[step % score.length]; step++;
    if (s[2]) strike(s[2], 0.14, 2.0);
    for (var i = 0; i < s[1].length; i++) strike(s[1][i], 0.06, 1.4);
    if (s[0]) strike(s[0], 0.12, 1.5);
  }
  function toggleAudio(forcePlay) {
    var btn = document.getElementById('vb-audio-btn');
    var lbl = document.getElementById('vb-music-lbl');
    if (playing && !forcePlay) {
      playing = false; clearInterval(timer);
      btn.textContent = '▶'; lbl.style.display = 'none';
      return;
    }
    if (playing) return;
    try {
      if (!audioCtx) {
        var C = window.AudioContext || window.webkitAudioContext;
        audioCtx = new C();
        master = audioCtx.createGain();
        master.gain.setValueAtTime(0.6, audioCtx.currentTime);
        master.connect(audioCtx.destination);
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();
      playing = true; tickNote();
      timer = setInterval(tickNote, 390);
      btn.textContent = '❚❚';
      if (window.innerWidth >= 768) lbl.style.display = 'inline-block';
    } catch (e) {}
  }

  document.body.style.overflow = 'hidden';
  document.getElementById('vb-open-btn').addEventListener('click', function () {
    document.getElementById('vb-cover').classList.add('is-opened');
    document.body.style.overflow = '';
    document.getElementById('vb-dock').classList.add('is-visible');
    document.getElementById('vb-fab').classList.add('is-visible');
    window.scrollTo({ top: 0, behavior: 'auto' });
    toggleAudio(true);
  });
  document.getElementById('vb-audio-btn').addEventListener('click', function () { toggleAudio(false); });

  // Countdown
  var targetMs = new Date(DATA.eventDateISO).getTime();
  function updateCd() {
    var diff = Math.max(0, targetMs - Date.now());
    document.getElementById('cd-d').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    document.getElementById('cd-h').textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, '0');
    document.getElementById('cd-m').textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, '0');
    document.getElementById('cd-s').textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
  }
  updateCd(); setInterval(updateCd, 1000);

  // ICS & Copy
  document.getElementById('vb-ics-btn').addEventListener('click', function () {
    var ics = ['BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT','DTSTART:20261222T040000Z','DTEND:20261222T090000Z','SUMMARY:Pernikahan Bismi & Rendi','LOCATION:' + DATA.venueAddress,'END:VEVENT','END:VCALENDAR'].join('\r\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    a.download = 'Pernikahan-Bismi-Rendi.ics';
    a.click();
  });
  document.getElementById('vb-copy-addr').addEventListener('click', function () {
    var b = this;
    navigator.clipboard.writeText(DATA.venueName + ', ' + DATA.venueAddress);
    b.textContent = 'Alamat Tersalin';
    setTimeout(function () { b.textContent = 'Salin Alamat'; }, 2000);
  });

  // Wishes
  function renderWishes() {
    var card = document.getElementById('vb-wishes-card');
    card.innerHTML = wishes
      .map(function (w) {
        var lbl = w.attendance === 'hadir' ? 'Hadir' : w.attendance === 'ragu' ? 'Masih Ragu' : 'Berhalangan';
        return (
          '<article style="padding:12px 0;border-bottom:1px solid rgba(140,112,96,.12);">' +
          '<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px;">' +
          '<strong class="vb-font-display" style="font-size:1.2rem;color:#332924;">' + esc(w.name) + '</strong>' +
          '<span style="font-size:12px;color:#84756c;">' + lbl + '</span></div>' +
          '<p style="margin:6px 0 0;font-size:14px;line-height:1.6;color:#5f5149;">' + esc(w.message) + '</p></article>'
        );
      })
      .join('');
  }
  renderWishes();
  document.getElementById('vb-wish-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var n = document.getElementById('vb-w-name').value.trim();
    var st = document.getElementById('vb-w-status').value;
    var c = Number(document.getElementById('vb-w-count').value) || 1;
    var m = document.getElementById('vb-w-msg').value.trim();
    if (!n || !m) return;
    wishes.unshift({ id: 'w-' + Date.now(), name: n, attendance: st, guestsCount: c, message: m });
    try { localStorage.setItem(WISHES_KEY, JSON.stringify(wishes)); } catch (err) {}
    document.getElementById('vb-w-msg').value = '';
    renderWishes();
  });

  // Gallery Lightbox & Modals
  var lb = document.getElementById('vb-lightbox');
  var tiles = document.querySelectorAll('.vb-tile');
  for (var t = 0; t < tiles.length; t++) {
    tiles[t].addEventListener('click', function () {
      var p = DATA.photos[Number(this.getAttribute('data-idx'))];
      document.getElementById('vb-lb-img').src = p.src;
      document.getElementById('vb-lb-cap').textContent = p.caption;
      lb.classList.add('open');
    });
  }
  lb.addEventListener('click', function () { lb.classList.remove('open'); });
  document.getElementById('vb-gift-toggle').addEventListener('click', function () {
    var gp = document.getElementById('vb-gift-panel');
    var shown = gp.style.display === 'grid';
    gp.style.display = shown ? 'none' : 'grid';
    this.textContent = shown ? 'Amplop Digital / Tanda Kasih' : 'Tutup Tanda Kasih';
  });
  var cm = document.getElementById('vb-card-modal');
  document.getElementById('vb-card-open').addEventListener('click', function () { cm.classList.add('open'); });
  document.getElementById('vb-card-close').addEventListener('click', function () { cm.classList.remove('open'); });
  cm.addEventListener('click', function (e) { if (e.target === cm) cm.classList.remove('open'); });

  // Scroll Reveal
  if ('IntersectionObserver' in window) {
    var els = document.querySelectorAll('.vb-reveal');
    var io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) entries[i].target.classList.add('in');
          else {
            var r = entries[i].boundingClientRect;
            if (r.top >= window.innerHeight - 8 || r.bottom <= 8) entries[i].target.classList.remove('in');
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -16px 0px' }
    );
    for (var k = 0; k < els.length; k++) io.observe(els[k]);
  }
})();
