import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Disc3,
  Flower2,
  Heart,
  Image as ImageIcon,
  MailOpen,
  MapPin,
  MessageSquareHeart,
  Pause,
  Play,
} from 'lucide-react';
import {
  FloralCornerBouquet,
  FloralGarlandSpray,
  MonogramSeal,
} from './components/BotanicalOrnaments';
import { RevealText } from './components/BotanicalEffects';
import { CountdownSection } from './components/CountdownSection';
import { GallerySection } from './components/GallerySection';
import { GuestbookSection } from './components/GuestbookSection';
import { ThankYouSection } from './components/ThankYouSection';
import { VenueMapSection } from './components/VenueMapSection';
import { DEFAULT_GUESTBOOK_ENTRIES, DEFAULT_INVITATION } from './data/defaultInvitation';
import { GuestbookEntry, InvitationConfig } from './types/invitation';
import { botanicalAudio } from './utils/botanicalAudio';

const WISHES_STORAGE_KEY = 'vintage_botanica_wishes_bismi_rendi_v1';

function readGuestNameFromQuery(): string {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('to');
  if (!raw) return '';
  return raw.replace(/\+/g, ' ').trim();
}

function computeInitials(coupleShort: string): string {
  const parts = coupleShort
    .split('&')
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? 'B'} & ${parts[1][0] ?? 'R'}`.toUpperCase();
  }
  return 'B & R';
}

const LOVE_STORY = [
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
];

export default function App() {
  const [config] = useState<InvitationConfig>(DEFAULT_INVITATION);

  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    try {
      const saved = localStorage.getItem(WISHES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return DEFAULT_GUESTBOOK_ENTRIES;
  });

  const [guestName] = useState<string>(() => readGuestNameFromQuery());
  const [isOpened, setIsOpened] = useState(false);
  const [coverDismissed, setCoverDismissed] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [brokenPortraits, setBrokenPortraits] = useState<{
    hero?: boolean;
    bride?: boolean;
    groom?: boolean;
  }>({});

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timer = window.setTimeout(() => setCoverDismissed(true), 660);
      return () => window.clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpened]);

  const handleOpenInvitation = async () => {
    setIsOpened(true);
    window.dispatchEvent(new CustomEvent('botanica-opened'));
    const ok = await botanicalAudio.start(config.customMusicUrl);
    if (ok) setIsMusicPlaying(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleToggleMusic = async () => {
    if (isMusicPlaying) {
      botanicalAudio.pause();
      setIsMusicPlaying(false);
    } else {
      const ok = await botanicalAudio.start(config.customMusicUrl);
      if (ok) setIsMusicPlaying(true);
    }
  };

  const handleAddWish = (entry: Omit<GuestbookEntry, 'id' | 'createdAt'>) => {
    const newEntry: GuestbookEntry = {
      ...entry,
      id: `wish-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const next = [newEntry, ...entries];
    setEntries(next);
    try {
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const displayGuestName = useMemo(() => guestName || 'Tamu Undangan Terhormat', [guestName]);
  const initials = useMemo(() => computeInitials(config.coupleShort), [config.coupleShort]);

  const heroImage = config.gallery[0]?.src ?? '/assets/aistudio/2_189173bc.jpeg';
  const brideImage = config.gallery[1]?.src ?? '/assets/aistudio/1_b2ef2998.jpeg';
  const groomImage = config.gallery[2]?.src ?? '/assets/aistudio/foto_mempelai_pria_f49441b6.jpg';

  return (
    <div className="botanica-backdrop min-h-screen text-[#2b332c]">
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-[60] shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* VINTAGE BOTANICA OPENING COVER CURTAIN */}
      {!coverDismissed && (
        <div
          aria-hidden={isOpened}
          className={`cover-curtain botanica-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 ${
            isOpened ? 'cover-curtain--opened' : ''
          }`}
        >
          <div className="botanica-cover-card relative flex h-full max-h-[860px] w-full max-w-[560px] flex-col items-center justify-between overflow-hidden rounded-2xl border border-[#a6895b]/50 px-6 py-8 sm:py-10 text-center shadow-2xl">
            <div
              className="pointer-events-none absolute inset-3 rounded-xl border border-[#495d4c]/22"
              aria-hidden="true"
            />

            <FloralCornerBouquet corner="top-left" className="absolute top-0 left-0 w-36 h-36 sm:w-44 sm:h-44" />
            <FloralCornerBouquet corner="top-right" className="absolute top-0 right-0 w-36 h-36 sm:w-44 sm:h-44" />
            <FloralCornerBouquet corner="bottom-left" className="absolute bottom-0 left-0 w-36 h-36 sm:w-44 sm:h-44" />
            <FloralCornerBouquet corner="bottom-right" className="absolute bottom-0 right-0 w-36 h-36 sm:w-44 sm:h-44" />

            <div className="relative z-10 mt-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#a6895b]">
                The Wedding Of
              </p>
              <h1 className="font-display mt-2 text-[clamp(2rem,8.5vw,3rem)] leading-tight italic font-medium text-[#2b332c] whitespace-nowrap">
                {config.coupleShort}
              </h1>
              <p className="mt-1.5 text-xs tracking-[0.18em] text-[#566157] uppercase">
                {config.eventDateDisplay}
              </p>
            </div>

            <div className="relative z-10 my-4 w-44 sm:w-52">
              <div className="botanica-arch">
                <div className="botanica-arch-inner aspect-[3/4]">
                  {brokenPortraits.hero ? (
                    <div className="flex h-full w-full flex-col items-center justify-center p-4">
                      <Flower2 className="h-8 w-8 text-[#495d4c]/50" aria-hidden="true" />
                    </div>
                  ) : (
                    <img
                      src={heroImage}
                      alt={`Potret ${config.coupleShort}`}
                      referrerPolicy="no-referrer"
                      onError={() => setBrokenPortraits((prev) => ({ ...prev, hero: true }))}
                      className="h-full w-full object-cover object-top"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="relative z-10 w-full max-w-xs space-y-4 mb-1">
              <div className="rounded-xl border border-[#a6895b]/35 bg-[#fffdf9]/95 px-5 py-4">
                <p className="text-[11px] tracking-[0.12em] text-[#7c877d]">
                  Kepada Yth. Bapak/Ibu/Saudara/i
                </p>
                <p className="font-display mt-1 text-2xl font-semibold text-[#2b332c]">
                  {displayGuestName}
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenInvitation}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#495d4c] px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-[#364739] transition-colors cursor-pointer whitespace-nowrap"
              >
                <MailOpen className="h-4 w-4" aria-hidden="true" />
                <span>Buka Undangan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CENTRAL ARCHIVAL INVITATION SHEET */}
      <div className="mx-auto max-w-[680px] min-h-screen botanica-sheet relative border-x border-[#a6895b]/25 pb-24">
        {/* Top Hero Arch Section */}
        <section id="sampul" className="relative overflow-hidden px-6 sm:px-10 pt-14 pb-16 text-center">
          <FloralCornerBouquet corner="top-left" className="absolute top-0 left-0 w-40 h-40 sm:w-48 sm:h-48 opacity-95" />
          <FloralCornerBouquet corner="top-right" className="absolute top-0 right-0 w-40 h-40 sm:w-48 sm:h-48 opacity-95" />

          <div className="relative z-10">
            <RevealText variant="zoom-soft" delay={40}>
              <MonogramSeal initials={initials} />
            </RevealText>
            <RevealText variant="fade-down" delay={120}>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#a6895b]">
                Undangan Pernikahan
              </p>
            </RevealText>
            <RevealText variant="fade-up" delay={200}>
              <h2 className="font-display mt-2 text-[clamp(2.25rem,9.5vw,3.75rem)] leading-tight italic font-medium text-[#2b332c] whitespace-nowrap">
                {config.coupleShort}
              </h2>
            </RevealText>
            <RevealText variant="fade-up" delay={280}>
              <p className="mt-2.5 text-xs sm:text-sm tracking-[0.12em] text-[#566157]">
                {config.eventDateDisplay} · {config.venueName}
              </p>
            </RevealText>

            <RevealText variant="zoom-soft" delay={340}>
              <div className="mx-auto mt-8 max-w-xs botanica-arch">
                <div className="botanica-arch-inner aspect-[3/4]">
                  {brokenPortraits.hero ? (
                    <div className="flex h-full w-full flex-col items-center justify-center p-8">
                      <Flower2 className="h-8 w-8 text-[#495d4c]/45" aria-hidden="true" />
                      <p className="font-display mt-2 text-xl">{config.coupleShort}</p>
                    </div>
                  ) : (
                    <img
                      src={heroImage}
                      alt={`Potret pernikahan ${config.coupleShort}`}
                      referrerPolicy="no-referrer"
                      onError={() => setBrokenPortraits((prev) => ({ ...prev, hero: true }))}
                      className="h-full w-full object-cover object-top"
                    />
                  )}
                </div>
              </div>
            </RevealText>

            <div className="mt-8 mx-auto max-w-lg">
              <RevealText variant="zoom-soft" delay={40}>
                <FloralGarlandSpray className="mb-3" />
              </RevealText>
              <RevealText variant="fade-up" delay={120}>
                <blockquote className="font-display text-xl sm:text-2xl italic leading-relaxed text-[#2b332c]">
                  “{config.quoteText}”
                </blockquote>
              </RevealText>
              <RevealText variant="fade-up" delay={210}>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a6895b]">
                  {config.quoteSource}
                </p>
              </RevealText>
            </div>
          </div>
        </section>

        {/* Bride & Groom Arch Profiles */}
        <section id="mempelai" className="relative overflow-hidden px-6 sm:px-10 py-16 sm:py-20 border-t border-[#495d4c]/14 text-center">
          <FloralCornerBouquet corner="top-left" className="absolute top-0 left-0 w-28 h-28 sm:w-36 sm:h-36 opacity-60" />
          <FloralCornerBouquet corner="top-right" className="absolute top-0 right-0 w-28 h-28 sm:w-36 sm:h-36 opacity-60" />
          <div className="relative z-10">
          <RevealText variant="fade-down">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a6895b]">
              Assalamu’alaikum Warahmatullahi Wabarakatuh
            </p>
          </RevealText>
          <RevealText variant="fade-up" delay={90}>
            <p className="mt-3 mx-auto max-w-md text-sm leading-relaxed text-[#566157]">
              Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan putra-putri kami:
            </p>
          </RevealText>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 items-start">
            <article className="flex flex-col items-center">
              <RevealText variant="slide-left" delay={60}>
                <div className="w-48 sm:w-52 botanica-arch">
                  <div className="botanica-arch-inner aspect-[3/4]">
                    {brokenPortraits.bride ? (
                      <div className="flex h-full w-full flex-col items-center justify-center p-6">
                        <Flower2 className="h-7 w-7 text-[#495d4c]/45" aria-hidden="true" />
                        <p className="font-display mt-2 text-lg">{config.brideName}</p>
                      </div>
                    ) : (
                      <img
                        src={brideImage}
                        alt={config.brideFullName}
                        referrerPolicy="no-referrer"
                        onError={() => setBrokenPortraits((prev) => ({ ...prev, bride: true }))}
                        className="h-full w-full object-cover object-top"
                      />
                    )}
                  </div>
                </div>
              </RevealText>
              <RevealText variant="fade-up" delay={140}>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a6895b]">
                  Mempelai Wanita
                </p>
                <h3 className="font-display mt-1.5 text-[clamp(1.1rem,4.4vw,1.45rem)] sm:text-[1.18rem] font-medium text-[#2b332c] whitespace-nowrap">
                  {config.brideFullName}
                </h3>
                <p className="mt-2 mx-auto text-xs sm:text-sm leading-relaxed text-[#566157] max-w-sm">
                  {config.brideParents}
                </p>
                {config.brideInstagram && (
                  <p className="mt-2 text-xs font-medium text-[#495d4c]">{config.brideInstagram}</p>
                )}
              </RevealText>
            </article>

            <article className="flex flex-col items-center">
              <RevealText variant="slide-right" delay={80}>
                <div className="w-48 sm:w-52 botanica-arch">
                  <div className="botanica-arch-inner aspect-[3/4]">
                    {brokenPortraits.groom ? (
                      <div className="flex h-full w-full flex-col items-center justify-center p-6">
                        <Flower2 className="h-7 w-7 text-[#495d4c]/45" aria-hidden="true" />
                        <p className="font-display mt-2 text-lg">{config.groomName}</p>
                      </div>
                    ) : (
                      <img
                        src={groomImage}
                        alt={config.groomFullName}
                        referrerPolicy="no-referrer"
                        onError={() => setBrokenPortraits((prev) => ({ ...prev, groom: true }))}
                        className="h-full w-full object-cover object-top"
                      />
                    )}
                  </div>
                </div>
              </RevealText>
              <RevealText variant="fade-up" delay={160}>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a6895b]">
                  Mempelai Pria
                </p>
                <h3 className="font-display mt-1.5 text-[clamp(1.1rem,4.4vw,1.45rem)] sm:text-[1.18rem] font-medium text-[#2b332c] whitespace-nowrap">
                  {config.groomFullName}
                </h3>
                <p className="mt-2 mx-auto text-xs sm:text-sm leading-relaxed text-[#566157] max-w-sm">
                  {config.groomParents}
                </p>
                {config.groomInstagram && (
                  <p className="mt-2 text-xs font-medium text-[#495d4c]">{config.groomInstagram}</p>
                )}
              </RevealText>
            </article>
          </div>
          </div>
        </section>

        {/* Love Story Timeline */}
        <section className="relative overflow-hidden px-6 sm:px-10 py-16 sm:py-20 border-t border-[#495d4c]/14 bg-[#495d4c]/[0.045]">
          <FloralCornerBouquet corner="bottom-right" className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 opacity-50" />
          <div className="text-center">
            <RevealText variant="fade-down">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a6895b]">
                Kisah Kami
              </p>
            </RevealText>
            <RevealText variant="fade-up" delay={90}>
              <h2 className="font-display mt-2.5 text-3xl sm:text-4xl text-[#2b332c]">
                Perjalanan Cinta
              </h2>
            </RevealText>
          </div>

          <div className="mt-9 space-y-4">
            {LOVE_STORY.map((item, idx) => (
              <RevealText key={item.year} variant="fade-up" delay={idx * 90}>
                <div className="botanical-card p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl text-[#2b332c]">{item.title}</h3>
                    <span className="text-xs font-semibold tracking-[0.14em] text-[#a6895b] tabular-nums">
                      {item.year}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#566157]">{item.body}</p>
                </div>
              </RevealText>
            ))}
          </div>
        </section>

        {/* Live Countdown */}
        <section id="acara" className="relative overflow-hidden px-6 sm:px-10 py-16 sm:py-20 border-t border-[#495d4c]/14">
          <FloralCornerBouquet corner="top-left" className="absolute top-0 left-0 w-28 h-28 sm:w-36 sm:h-36 opacity-55" />
          <div className="relative z-10">
            <CountdownSection config={config} />
          </div>
        </section>

        {/* Schedule & Integrated Google Maps Navigation */}
        <VenueMapSection config={config} quotaExceeded={quotaExceeded} />

        {/* Elegant Photo Gallery */}
        <GallerySection photos={config.gallery} />

        {/* Interactive Digital Guestbook */}
        <GuestbookSection
          guestNameFromUrl={guestName}
          entries={entries}
          onAddEntry={handleAddWish}
        />

        {/* Responsive Thank-You Section */}
        <ThankYouSection config={config} guestName={guestName} />

        {/* Quiet Footer */}
        <footer className="relative overflow-hidden border-t border-[#495d4c]/14 bg-[#495d4c]/[0.055] px-6 sm:px-10 py-10 text-center">
          <div className="relative z-10 space-y-2">
            <RevealText variant="fade-up" delay={60}>
              <p className="text-xs text-[#566157]">
                {config.coupleShort} · {config.eventDateDisplay} · {config.venueName}
              </p>
            </RevealText>
            <RevealText variant="fade-up" delay={140}>
              <p className="font-display text-lg sm:text-xl font-medium tracking-wide text-[#495d4c]">
                Percetakan 2R Harjosari Kidul
              </p>
            </RevealText>
          </div>
        </footer>
      </div>

      {/* Compact Bottom Navigation Dock */}
      {isOpened && (
        <nav
          aria-label="Navigasi bagian undangan"
          className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 rounded-full border border-[#a6895b]/40 bg-[#fffdf9] px-2.5 py-1.5 shadow-lg print:hidden"
        >
          <a
            href="#mempelai"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-[#566157] hover:bg-[#f3efe6] hover:text-[#2b332c] whitespace-nowrap shrink-0"
          >
            <Heart className="h-3.5 w-3.5 text-[#495d4c]" aria-hidden="true" />
            <span className="hidden sm:inline">Mempelai</span>
          </a>
          <a
            href="#acara"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-[#566157] hover:bg-[#f3efe6] hover:text-[#2b332c] whitespace-nowrap shrink-0"
          >
            <Calendar className="h-3.5 w-3.5 text-[#495d4c]" aria-hidden="true" />
            <span className="hidden sm:inline">Acara</span>
          </a>
          <a
            href="#lokasi"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-[#566157] hover:bg-[#f3efe6] hover:text-[#2b332c] whitespace-nowrap shrink-0"
          >
            <MapPin className="h-3.5 w-3.5 text-[#495d4c]" aria-hidden="true" />
            <span className="hidden sm:inline">Lokasi</span>
          </a>
          <a
            href="#galeri"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-[#566157] hover:bg-[#f3efe6] hover:text-[#2b332c] whitespace-nowrap shrink-0"
          >
            <ImageIcon className="h-3.5 w-3.5 text-[#495d4c]" aria-hidden="true" />
            <span className="hidden sm:inline">Galeri</span>
          </a>
          <a
            href="#buku-tamu"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-[#566157] hover:bg-[#f3efe6] hover:text-[#2b332c] whitespace-nowrap shrink-0"
          >
            <MessageSquareHeart className="h-3.5 w-3.5 text-[#495d4c]" aria-hidden="true" />
            <span className="hidden sm:inline">Ucapan</span>
          </a>
        </nav>
      )}

      {/* Floating Music Control + Now Playing Label */}
      {isOpened && (
        <div className="fixed bottom-3.5 right-3.5 sm:right-5 z-40 flex items-center gap-2 print:hidden">
          {isMusicPlaying && (
            <span className="hidden md:inline-block max-w-[200px] truncate rounded-full border border-[#a6895b]/35 bg-[#fffdf9]/95 px-3 py-1.5 text-[11px] font-medium text-[#495d4c] shadow-sm">
              {config.musicTitle}
            </span>
          )}
          <button
            type="button"
            onClick={handleToggleMusic}
            aria-label={isMusicPlaying ? 'Jeda musik latar' : 'Putar musik latar'}
            title={`${isMusicPlaying ? 'Jeda' : 'Putar'}: ${config.musicTitle}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#a6895b]/45 bg-[#495d4c] text-white shadow-lg hover:bg-[#364739] transition-colors cursor-pointer"
          >
            {isMusicPlaying ? (
              <span className="relative flex items-center justify-center">
                <Disc3 className="h-5 w-5 disc-spin opacity-35 absolute" aria-hidden="true" />
                <Pause className="h-4 w-4 relative" aria-hidden="true" />
              </span>
            ) : (
              <Play className="h-4 w-4 ml-0.5" aria-hidden="true" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
