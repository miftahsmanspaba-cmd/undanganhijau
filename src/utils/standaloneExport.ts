import { GuestbookEntry, InvitationConfig } from '../types/invitation';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildStandaloneHtml(config: InvitationConfig, entries: GuestbookEntry[]): string {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${config.venueLat},${config.venueLng}`
  )}`;

  const serializedEntries = JSON.stringify(entries).replace(/</g, '\\u003c');
  const giftsHtml = config.giftAccounts
    .map(
      (acc) => `
      <div class="double-card">
        <p class="eyebrow">${escapeHtml(acc.bankName)}</p>
        <p class="mono-num">${escapeHtml(acc.accountNumber)}</p>
        <p class="muted">a.n. ${escapeHtml(acc.accountHolder)}</p>
        <button class="btn-outline" onclick="copyText('${escapeHtml(acc.accountNumber)}', this)">Salin Rekening</button>
      </div>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Undangan Pernikahan — ${escapeHtml(config.coupleShort)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --outer: #ebe5d8;
      --bg: #f8f5ee;
      --surface: #fffdf9;
      --ink: #2b332c;
      --muted: #566157;
      --sage: #495d4c;
      --gold: #a6895b;
      --border: rgba(73, 93, 76, 0.16);
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background-color: var(--outer);
      background-image:
        radial-gradient(circle at 20% 20%, rgba(166, 137, 91, 0.14), transparent 55%),
        radial-gradient(circle at 80% 75%, rgba(73, 93, 76, 0.14), transparent 55%),
        url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23495d4c' stroke-opacity='0.14' stroke-width='1'%3E%3Cpath d='M18 90 C30 68 48 52 70 42'/%3E%3Cpath d='M36 68 C26 56 26 42 36 36 C44 46 44 60 36 68Z' fill='%23495d4c' fill-opacity='0.06'/%3E%3Cpath d='M52 54 C58 40 70 32 82 34 C76 46 66 54 52 54Z' fill='%23495d4c' fill-opacity='0.06'/%3E%3Ccircle cx='92' cy='86' r='3' stroke='%23a6895b' stroke-opacity='0.22'/%3E%3C/g%3E%3C/svg%3E");
      color: var(--ink);
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      line-height: 1.65;
    }
    h1, h2, h3, .serif { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; margin: 0; }
    .cover {
      position: fixed; inset: 0; z-index: 50;
      display: flex; align-items: center; justify-content: center;
      padding: 1rem;
      background-color: var(--outer);
      background-image: inherit;
      transition: transform 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease;
    }
    .cover.opened { transform: translateY(-100%); opacity: 0; pointer-events: none; }
    .cover-card {
      width: 100%; max-width: 520px; max-height: 92vh;
      background: linear-gradient(180deg, #fcf9f2 0%, #f5efe2 100%);
      border: 1px solid rgba(166, 137, 91, 0.45);
      border-radius: 18px; padding: 2.5rem 1.75rem; text-align: center;
      box-shadow: 0 24px 60px rgba(43, 51, 44, 0.15);
      display: flex; flex-direction: column; justify-content: space-between; gap: 1.25rem;
    }
    .sheet {
      max-width: 680px; margin: 0 auto;
      background: linear-gradient(180deg, #fbf8f0 0%, #f6f1e5 50%, #fbf8f0 100%);
      border-left: 1px solid rgba(166, 137, 91, 0.25);
      border-right: 1px solid rgba(166, 137, 91, 0.25);
      padding-bottom: 5.5rem;
      box-shadow: 0 24px 70px rgba(43, 51, 44, 0.16);
    }
    .section { padding: 3.5rem 1.75rem; border-top: 1px solid var(--border); text-align: center; }
    .section:first-child { border-top: none; }
    .eyebrow { text-transform: uppercase; letter-spacing: 0.22em; font-size: 0.7rem; color: var(--gold); font-weight: 600; margin: 0 0 0.65rem; }
    .muted { color: var(--muted); font-size: 0.9rem; }
    .guest-box {
      padding: 1rem 1.25rem; background: var(--surface);
      border: 1px solid rgba(166, 137, 91, 0.35); border-radius: 12px;
    }
    .btn {
      display: inline-block; padding: 0.85rem 1.65rem; background: var(--sage);
      color: #fff; border: none; border-radius: 8px; font-size: 0.88rem; font-weight: 500;
      cursor: pointer; text-decoration: none;
    }
    .btn-outline {
      display: inline-block; padding: 0.6rem 1.1rem; background: #fff; color: var(--sage);
      border: 1px solid var(--border); border-radius: 8px; font-size: 0.82rem; cursor: pointer; text-decoration: none;
    }
    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 1.75rem; }
    .double-card {
      background: var(--surface); border: 1px solid rgba(166, 137, 91, 0.35);
      outline: 1px solid rgba(73, 93, 76, 0.12); outline-offset: -6px;
      border-radius: 16px; padding: 1.75rem;
    }
    .countdown { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.65rem; max-width: 420px; margin: 1.75rem auto 0; }
    .cd-box { background: var(--surface); border: 1px solid rgba(166, 137, 91, 0.35); border-radius: 12px; padding: 0.85rem 0.25rem; font-variant-numeric: tabular-nums; }
    .cd-val { font-family: 'Cormorant Garamond', serif; font-size: 1.85rem; font-weight: 600; color: var(--sage); display: block; }
    .cd-lbl { font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
    .mono-num { font-size: 1.2rem; font-weight: 600; margin: 0.35rem 0; font-variant-numeric: tabular-nums; }
    input, select, textarea {
      width: 100%; padding: 0.7rem 0.85rem; border: 1px solid var(--border);
      border-radius: 8px; font: inherit; margin-bottom: 0.8rem; background: var(--bg);
    }
    .wish-item { padding: 1rem 0; border-bottom: 1px solid var(--border); text-align: left; }
    .dock {
      position: fixed; bottom: 0.85rem; left: 50%; transform: translateX(-50%); z-index: 40;
      display: flex; gap: 0.25rem; background: rgba(255, 253, 249, 0.95);
      border: 1px solid rgba(166, 137, 91, 0.4); border-radius: 999px; padding: 0.35rem 0.6rem;
      box-shadow: 0 10px 26px rgba(43, 51, 44, 0.12);
    }
    .dock a { font-size: 0.72rem; color: var(--muted); text-decoration: none; padding: 0.35rem 0.6rem; border-radius: 999px; }
    .dock a:hover { background: #f3efe6; color: var(--ink); }
    .audio-fab {
      position: fixed; right: 1rem; bottom: 0.85rem; z-index: 40;
      width: 44px; height: 44px; border-radius: 999px;
      background: var(--sage); color: #fff; border: 1px solid rgba(166, 137, 91, 0.45); cursor: pointer;
    }
    .sr-text {
      opacity: 0;
      transform: translate3d(0, 18px, 0);
      transition: opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
      will-change: opacity, transform;
    }
    .sr-text.sr-in {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    @media (prefers-reduced-motion: reduce) {
      .sr-text { opacity: 1; transform: none; transition: none; }
    }
  </style>
</head>
<body>
  <div id="cover" class="cover">
    <div class="cover-card">
      <div>
        <p class="eyebrow">The Wedding Of</p>
        <h1 style="font-size:clamp(2.4rem,6vw,3.4rem);font-style:italic;">${escapeHtml(config.coupleShort)}</h1>
        <p class="muted" style="margin-top:0.35rem;">${escapeHtml(config.eventDateDisplay)}</p>
      </div>
      <div class="guest-box">
        <p class="muted" style="margin:0 0 0.2rem;font-size:0.75rem;">Kepada Yth. Bapak/Ibu/Saudara/i</p>
        <strong id="guest-name" class="serif" style="font-size:1.5rem;">Tamu Undangan Terhormat</strong>
      </div>
      <div>
        <button class="btn" onclick="openInvitation()">Buka Undangan</button>
      </div>
    </div>
  </div>

  <main class="sheet">
    <section id="mempelai" class="section">
      <p class="eyebrow">Undangan Pernikahan</p>
      <h2 style="font-size:2.8rem;font-style:italic;">${escapeHtml(config.coupleShort)}</h2>
      <p class="muted">${escapeHtml(config.eventDateDisplay)} &middot; ${escapeHtml(config.venueName)}</p>
      <p class="serif" style="font-size:1.25rem;font-style:italic;margin:1.75rem auto 0;max-width:520px;">"${escapeHtml(config.quoteText)}"</p>
      <p class="eyebrow" style="margin-top:0.6rem;">${escapeHtml(config.quoteSource)}</p>

      <div class="grid-2">
        <div class="double-card">
          <p class="eyebrow">Mempelai Wanita</p>
          <h3 style="font-size:1.75rem;">${escapeHtml(config.brideFullName)}</h3>
          <p class="muted">${escapeHtml(config.brideParents)}</p>
        </div>
        <div class="double-card">
          <p class="eyebrow">Mempelai Pria</p>
          <h3 style="font-size:1.75rem;">${escapeHtml(config.groomFullName)}</h3>
          <p class="muted">${escapeHtml(config.groomParents)}</p>
        </div>
      </div>
    </section>

    <section id="acara" class="section">
      <p class="eyebrow">Save The Date</p>
      <h2 style="font-size:2.2rem;">Menuju Hari Bahagia</h2>
      <div class="countdown">
        <div class="cd-box"><span id="cd-d" class="cd-val">00</span><span class="cd-lbl">Hari</span></div>
        <div class="cd-box"><span id="cd-h" class="cd-val">00</span><span class="cd-lbl">Jam</span></div>
        <div class="cd-box"><span id="cd-m" class="cd-val">00</span><span class="cd-lbl">Menit</span></div>
        <div class="cd-box"><span id="cd-s" class="cd-val">00</span><span class="cd-lbl">Detik</span></div>
      </div>

      <div class="grid-2">
        <div class="double-card">
          <p class="eyebrow">${escapeHtml(config.akadTitle)}</p>
          <h3 style="font-size:1.5rem;">${escapeHtml(config.eventDateDisplay)}</h3>
          <p class="muted">${escapeHtml(config.akadTime)}<br />${escapeHtml(config.akadVenue)}</p>
        </div>
        <div class="double-card">
          <p class="eyebrow">${escapeHtml(config.resepsiTitle)}</p>
          <h3 style="font-size:1.5rem;">${escapeHtml(config.eventDateDisplay)}</h3>
          <p class="muted">${escapeHtml(config.resepsiTime)}<br />${escapeHtml(config.resepsiVenue)}</p>
        </div>
      </div>
    </section>

    <section id="lokasi" class="section">
      <p class="eyebrow">Navigasi Lokasi</p>
      <h2 style="font-size:2.1rem;">${escapeHtml(config.venueName)}</h2>
      <p class="muted" style="max-width:500px;margin:0.5rem auto 1.5rem;">${escapeHtml(config.venueAddress)}</p>
      <a class="btn" href="${escapeHtml(mapsUrl)}" target="_blank" rel="noopener noreferrer">Buka Google Maps</a>
    </section>

    <section id="buku-tamu" class="section">
      <p class="eyebrow">Buku Tamu &amp; RSVP</p>
      <h2 style="font-size:2.1rem;">Konfirmasi Kehadiran &amp; Doa Restu</h2>
      <form class="double-card" style="margin-top:1.5rem;text-align:left;" onsubmit="submitWish(event)">
        <label for="f-name" class="muted">Nama Tamu</label>
        <input id="f-name" required placeholder="Nama Anda" />
        <label for="f-status" class="muted">Kehadiran</label>
        <select id="f-status">
          <option value="hadir">Hadir</option>
          <option value="ragu">Masih Ragu</option>
          <option value="tidak_hadir">Berhalangan Hadir</option>
        </select>
        <label for="f-msg" class="muted">Ucapan &amp; Doa</label>
        <textarea id="f-msg" rows="3" required placeholder="Tuliskan doa restu Anda..."></textarea>
        <button type="submit" class="btn" style="width:100%;">Kirim Ucapan</button>
      </form>
      <div id="wishes-list" class="double-card" style="margin-top:1rem;max-height:360px;overflow-y:auto;"></div>
    </section>

    <section id="terima-kasih" class="section">
      <p class="eyebrow">Ucapan Terima Kasih</p>
      <h2 style="font-size:2.1rem;">${escapeHtml(config.thankYouHeading)}</h2>
      <p class="muted" style="max-width:520px;margin:0.75rem auto 1.5rem;">${escapeHtml(config.thankYouMessage)}</p>
      <div class="grid-2">${giftsHtml}</div>
      <p class="serif" style="font-size:1.5rem;font-style:italic;margin-top:2rem;">${escapeHtml(config.coupleShort)}</p>
      <p class="muted">${escapeHtml(config.familySignature)}</p>
    </section>
  </main>

  <nav class="dock">
    <a href="#mempelai">Mempelai</a>
    <a href="#acara">Acara</a>
    <a href="#lokasi">Lokasi</a>
    <a href="#buku-tamu">Ucapan</a>
  </nav>
  <button class="audio-fab" id="audio-btn" onclick="toggleAudio()" aria-label="Putar atau jeda musik">&#9835;</button>

  <script>
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('to');
    if (guestParam) {
      document.getElementById('guest-name').textContent = guestParam;
      document.getElementById('f-name').value = guestParam;
    }

    const targetDate = new Date('${escapeHtml(config.eventDateISO)}').getTime();
    function updateCountdown() {
      const diff = Math.max(0, targetDate - Date.now());
      document.getElementById('cd-d').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
      document.getElementById('cd-h').textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, '0');
      document.getElementById('cd-m').textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, '0');
      document.getElementById('cd-s').textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    const STORAGE_KEY = 'vintage_botanica_wishes_v1';
    const initialWishes = ${serializedEntries};
    let wishes = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || initialWishes;

    function renderWishes() {
      const list = document.getElementById('wishes-list');
      list.innerHTML = wishes.map(w => {
        const label = w.attendance === 'hadir' ? 'Hadir' : w.attendance === 'ragu' ? 'Masih Ragu' : 'Berhalangan';
        return '<div class="wish-item"><strong>' + w.name.replace(/</g, '&lt;') + '</strong> <span class="muted">&middot; ' + label + '</span><p style="margin:0.35rem 0 0;">' + w.message.replace(/</g, '&lt;') + '</p></div>';
      }).join('');
    }
    renderWishes();

    function submitWish(e) {
      e.preventDefault();
      const name = document.getElementById('f-name').value.trim();
      const attendance = document.getElementById('f-status').value;
      const message = document.getElementById('f-msg').value.trim();
      if (!name || !message) return;
      wishes.unshift({ id: String(Date.now()), name, attendance, guestsCount: 1, message, createdAt: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
      document.getElementById('f-msg').value = '';
      renderWishes();
    }

    function copyText(text, btn) {
      navigator.clipboard.writeText(text);
      const prev = btn.textContent;
      btn.textContent = 'Tersalin';
      setTimeout(() => btn.textContent = prev, 1800);
    }

    let audioCtx = null, audioTimer = null, playing = false, step = 0;
    const notes = [349.23, 440, 523.25, 659.25, 523.25, 440, 293.66, 349.23, 440, 587.33, 440, 349.23];
    function playTone(f) {
      if (!audioCtx) return;
      const now = audioCtx.currentTime, o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(f, now);
      g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(0.05, now + 0.04); g.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      o.connect(g); g.connect(audioCtx.destination); o.start(now); o.stop(now + 1.6);
    }
    function toggleAudio() {
      if (playing) {
        playing = false; clearInterval(audioTimer);
        document.getElementById('audio-btn').textContent = '▶';
      } else {
        audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        playing = true;
        playTone(notes[step++ % notes.length]);
        audioTimer = setInterval(() => playTone(notes[step++ % notes.length]), 640);
        document.getElementById('audio-btn').textContent = '❚❚';
      }
    }
    function openInvitation() {
      document.getElementById('cover').classList.add('opened');
      if (!playing) toggleAudio();
    }

    if ('IntersectionObserver' in window) {
      const targets = document.querySelectorAll('.sheet h2, .sheet h3, .sheet p, .sheet .double-card, .sheet .countdown');
      targets.forEach((el, idx) => {
        el.classList.add('sr-text');
        el.style.transitionDelay = ((idx % 4) * 70) + 'ms';
      });
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sr-in');
          } else {
            const r = entry.boundingClientRect;
            if (r.top >= window.innerHeight - 8 || r.bottom <= 8) {
              entry.target.classList.remove('sr-in');
            }
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -16px 0px' });
      targets.forEach((el) => io.observe(el));
    }
  </script>
</body>
</html>`;
}
