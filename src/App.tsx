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
  DamaskCornerWatermark,
  FloralCornerBouquet,
  GlasshouseConservatoryBackdrop,
  MonogramSeal,
  ScallopedCartoucheFrame,
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
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
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

  const heroImage = config.gallery[0]?.src ?? './assets/aistudio/2_189173bc.jpeg';
  const brideImage = config.gallery[1]?.src ?? './assets/aistudio/1_b2ef2998.jpeg';
  const groomImage = config.gallery[2]?.src ?? './assets/aistudio/foto_mempelai_pria_f49441b6.jpg';

  return (
    <div className="botanica-backdrop min-h-screen text-[#332924]">
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

      {/* VINTAGE BOTANICA GLASSHOUSE OPENING COVER CURTAIN */}
      {!coverDismissed && (
        <div
          aria-hidden={isOpened}
          className={`cover-curtain botanica-backdrop fixed inset-0 z-50 flex h-[100dvh] items-start justify-center overflow-y-auto p-2.5 sm:items-center sm:p-6 ${
            isOpened ? 'cover-curtain--opened' : ''
          }`}
        >
          <div className="botanica-cover-card relative my-auto flex min-h-full w-full max-w-[540px] flex-col items-center justify-evenly gap-2.5 overflow-hidden rounded-2xl border border-[#8c7060]/45 px-5 py-5 text-center shadow-2xl sm:h-full sm:max-h-[860px] sm:justify-between sm:gap-4 sm:px-6 sm:py-10">
            <GlasshouseConservatoryBackdrop
              tone="sepia"
              className="absolute inset-0 opacity-85"
            />
            <div
              className="pointer-events-none absolute inset-3 rounded-xl border border-[#8c7060]/20"
              aria-hidden="true"
            />

            <FloralCornerBouquet corner="top-left" className="absolute top-0 left-0 w-28 h-28 sm:w-44 sm:h-44" />
            <FloralCornerBouquet corner="top-right" className="absolute top-0 right-0 w-28 h-28 sm:w-44 sm:h-44" />
            <FloralCornerBouquet corner="bottom-left" className="absolute bottom-0 left-0 w-28 h-28 sm:w-44 sm:h-44 opacity-95" />
            <FloralCornerBouquet corner="bottom-right" className="absolute bottom-0 right-0 w-28 h-28 sm:w-44 sm:h-44 opacity-95" />

            {/* Oval Portrait Frame matching Screenshot 1 */}
            <div className="relative z-10 mt-1 w-[clamp(118px,22dvh,172px)] sm:mt-2 sm:w-52">
              <div className="rounded-full border-2 border-[#8c7060]/70 bg-[#fffcf8] p-1.5 shadow-lg">
                <div className="aspect-[3/4] overflow-hidden rounded-full bg-[#ebe3d8]">
                  {brokenPortraits.hero ? (
                    <div className="flex h-full w-full flex-col items-center justify-center p-4">
                      <Flower2 className="h-8 w-8 text-[#8c7060]/50" aria-hidden="true" />
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

            <div className="relative z-10 my-0.5 sm:my-2">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.26em] text-[#4a3b34]">
                The Wedding Of
              </p>
              <h1 className="font-display mt-1 text-[clamp(1.85rem,8vw,3rem)] leading-tight italic font-medium text-[#8c7060] whitespace-nowrap">
                {config.coupleShort}
              </h1>
              <p className="mt-0.5 text-[11px] sm:text-xs tracking-[0.2em] text-[#5f5149] uppercase">
                22 . 12 . 2026
              </p>
            </div>

            <div className="relative z-10 w-full max-w-xs space-y-2.5 sm:space-y-4 mb-0.5 sm:mb-1">
              <div className="rounded-xl border border-[#8c7060]/35 bg-[#fffcf8]/92 px-4 py-2.5 sm:px-5 sm:py-3.5 shadow-xs">
                <p className="text-[10px] sm:text-[11px] tracking-[0.1em] text-[#5f5149] font-medium">
                  Kepada Yth. Bapak/Ibu/Saudara/i
                </p>
                <p className="font-display mt-0.5 text-[clamp(1.2rem,5vw,1.5rem)] leading-snug font-semibold text-[#332924]">
                  {displayGuestName}
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenInvitation}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#a68674] px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-md hover:bg-[#8c7060] transition-colors cursor-pointer whitespace-nowrap"
              >
                <MailOpen className="h-4 w-4" aria-hidden="true" />
                <span>Buka Undangan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CENTRAL ARCHIVAL INVITATION SHEET */}
      <div className="mx-auto max-w-[680px] min-h-screen botanica-sheet relative border-x border-[#8c7060]/25 pb-24">
        {/* Top Scalloped Cartouche Section (matching Screenshot 2) */}
        <section id="sampul" className="relative overflow-hidden px-5 sm:px-10 pt-14 pb-16 text-center">
          <GlasshouseConservatoryBackdrop
            tone="sepia"
            className="absolute inset-0 opacity-85"
          />
          <FloralCornerBouquet corner="top-left" className="absolute top-0 left-0 w-36 h-36 sm:w-44 sm:h-44 opacity-95" />
          <FloralCornerBouquet corner="top-right" className="absolute top-0 right-0 w-36 h-36 sm:w-44 sm:h-44 opacity-95" />
          <FloralCornerBouquet corner="bottom-left" className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 opacity-85" />
          <FloralCornerBouquet corner="bottom-right" className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 opacity-85" />

          <div className="relative z-10">
            <ScallopedCartoucheFrame className="max-w-md">
              <RevealText variant="zoom-soft" delay={40}>
                <MonogramSeal initials={initials} />
              </RevealText>
              <RevealText variant="fade-down" delay={120}>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4a3b34]">
                  The Wedding Of
                </p>
              </RevealText>
              <RevealText variant="fade-up" delay={200}>
                <h2 className="font-display mt-3 text-[clamp(2.25rem,9.5vw,3.5rem)] leading-tight italic font-medium text-[#8c7060] whitespace-nowrap">
                  {config.coupleShort}
                </h2>
              </RevealText>
              <RevealText variant="fade-up" delay={280}>
                <p className="mt-4 text-xs font-medium tracking-[0.18em] text-[#5f5149]">
                  #BismiRendiMenikah
                </p>
                <p className="mt-2 text-sm font-semibold tracking-[0.26em] text-[#332924] tabular-nums">
                  22 . 12 . 2026
                </p>
                <p className="mt-2 text-xs text-[#84756c]">
                  Pakembaran · Kec. Slawi · Kab. Tegal
                </p>
              </RevealText>
            </ScallopedCartoucheFrame>
          </div>
        </section>

        {/* Warm Cocoa "We Found Love" Quote Section (matching Screenshot 3) */}
        <section className="botanica-cocoa-band relative overflow-hidden px-6 sm:px-10 py-16 sm:py-20 text-center">
          <DamaskCornerWatermark position="top-left" tone="ivory" />
          <DamaskCornerWatermark position="top-right" tone="ivory" />
          <GlasshouseConservatoryBackdrop
            tone="ivory"
            className="absolute inset-0 opacity-22"
          />

          <div className="relative z-10">
            <RevealText variant="zoom-soft" delay={60}>
              <div className="mx-auto max-w-xs rounded-2xl border-2 border-[#fffcf8]/90 bg-[#fffcf8]/15 p-1.5 shadow-xl">
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-[#745a4c]">
                  {brokenPortraits.hero ? (
                    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-white">
                      <Flower2 className="h-8 w-8 opacity-60" aria-hidden="true" />
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

            <div className="mt-9 mx-auto max-w-lg">
              <RevealText variant="fade-down" delay={80}>
                <h3 className="font-display text-4xl sm:text-5xl italic font-normal text-white">
                  We Found Love
                </h3>
              </RevealText>
              <RevealText variant="fade-up" delay={160}>
                <blockquote className="mt-4 text-sm sm:text-base italic leading-relaxed text-[#faf6f0]/95">
                  “{config.quoteText}”
                </blockquote>
              </RevealText>
              <RevealText variant="fade-up" delay={240}>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f0dfd1]">
                  {config.quoteSource}
                </p>
              </RevealText>
            </div>
          </div>
        </section>

        {/* Bride & Groom Arch Profiles */}
        <section id="mempelai" className="relative overflow-hidden px-6 sm:px-10 py-16 sm:py-20 border-t border-[#8c7060]/15 text-center">
          <GlasshouseConservatoryBackdrop
            tone="sepia"
            className="absolute inset-0 opacity-30"
          />
          <FloralCornerBouquet corner="top-left" className="absolute top-0 left-0 w-28 h-28 sm:w-36 sm:h-36 opacity-65" />
          <FloralCornerBouquet corner="top-right" className="absolute top-0 right-0 w-28 h-28 sm:w-36 sm:h-36 opacity-65" />
          <div className="relative z-10">
            <RevealText variant="fade-down">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a98667]">
                Assalamu’alaikum Warahmatullahi Wabarakatuh
              </p>
            </RevealText>
            <RevealText variant="fade-up" delay={90}>
              <p className="mt-3 mx-auto max-w-md text-sm leading-relaxed text-[#5f5149]">
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
                          <Flower2 className="h-7 w-7 text-[#8c7060]/45" aria-hidden="true" />
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
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a98667]">
                    Mempelai Wanita
                  </p>
                  <h3 className="font-display mt-1.5 text-[clamp(1.1rem,4.4vw,1.45rem)] sm:text-[1.18rem] font-medium text-[#332924] whitespace-nowrap">
                    {config.brideFullName}
                  </h3>
                  <p className="mt-2 mx-auto text-xs sm:text-sm leading-relaxed text-[#5f5149] max-w-sm">
                    {config.brideParents}
                  </p>
                  {config.brideInstagram && (
                    <p className="mt-2 text-xs font-medium text-[#8c7060]">{config.brideInstagram}</p>
                  )}
                </RevealText>
              </article>

              <article className="flex flex-col items-center">
                <RevealText variant="slide-right" delay={80}>
                  <div className="w-48 sm:w-52 botanica-arch">
                    <div className="botanica-arch-inner aspect-[3/4]">
                      {brokenPortraits.groom ? (
                        <div className="flex h-full w-full flex-col items-center justify-center p-6">
                          <Flower2 className="h-7 w-7 text-[#8c7060]/45" aria-hidden="true" />
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
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a98667]">
                    Mempelai Pria
                  </p>
                  <h3 className="font-display mt-1.5 text-[clamp(1.1rem,4.4vw,1.45rem)] sm:text-[1.18rem] font-medium text-[#332924] whitespace-nowrap">
                    {config.groomFullName}
                  </h3>
                  <p className="mt-2 mx-auto text-xs sm:text-sm leading-relaxed text-[#5f5149] max-w-sm">
                    {config.groomParents}
                  </p>
                  {config.groomInstagram && (
                    <p className="mt-2 text-xs font-medium text-[#8c7060]">{config.groomInstagram}</p>
                  )}
                </RevealText>
              </article>
            </div>
          </div>
        </section>

        {/* Love Story Timeline */}
        <section className="relative overflow-hidden px-6 sm:px-10 py-16 sm:py-20 border-t border-[#8c7060]/15 bg-[#8c7060]/[0.07]">
          <FloralCornerBouquet corner="bottom-right" className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 opacity-55" />
          <div className="relative z-10 text-center">
            <RevealText variant="fade-down">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a98667]">
                Kisah Kami
              </p>
            </RevealText>
            <RevealText variant="fade-up" delay={90}>
              <h2 className="font-display mt-2.5 text-3xl sm:text-4xl text-[#332924]">
                Perjalanan Cinta
              </h2>
            </RevealText>
          </div>

          <div className="relative z-10 mt-9 space-y-4">
            {LOVE_STORY.map((item, idx) => (
              <RevealText key={item.year} variant="fade-up" delay={idx * 90}>
                <div className="botanical-card p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl text-[#332924]">{item.title}</h3>
                    <span className="text-xs font-semibold tracking-[0.14em] text-[#a98667] tabular-nums">
                      {item.year}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f5149]">{item.body}</p>
                </div>
              </RevealText>
            ))}
          </div>
        </section>

        {/* Live Countdown */}
        <section id="acara" className="relative overflow-hidden px-6 sm:px-10 py-16 sm:py-20 border-t border-[#8c7060]/15">
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
        <footer className="botanica-cocoa-band relative overflow-hidden px-6 sm:px-10 py-10 text-center">
          <DamaskCornerWatermark position="top-left" tone="ivory" />
          <DamaskCornerWatermark position="top-right" tone="ivory" />
          <div className="relative z-10 space-y-2">
            <RevealText variant="fade-up" delay={60}>
              <p className="text-xs text-[#faf6f0]/85">
                {config.coupleShort} · {config.eventDateDisplay} · {config.venueName}
              </p>
            </RevealText>
            <RevealText variant="fade-up" delay={140}>
              <p className="font-display text-lg sm:text-xl font-medium tracking-wide text-white">
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
          className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 rounded-full border border-[#a98667]/45 bg-[#fffcf8] px-2.5 py-1.5 shadow-lg print:hidden"
        >
          <a
            href="#mempelai"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-[#5f5149] hover:bg-[#f2ebe2] hover:text-[#332924] whitespace-nowrap shrink-0"
          >
            <Heart className="h-3.5 w-3.5 text-[#8c7060]" aria-hidden="true" />
            <span className="hidden sm:inline">Mempelai</span>
          </a>
          <a
            href="#acara"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-[#5f5149] hover:bg-[#f2ebe2] hover:text-[#332924] whitespace-nowrap shrink-0"
          >
            <Calendar className="h-3.5 w-3.5 text-[#8c7060]" aria-hidden="true" />
            <span className="hidden sm:inline">Acara</span>
          </a>
          <a
            href="#lokasi"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-[#5f5149] hover:bg-[#f2ebe2] hover:text-[#332924] whitespace-nowrap shrink-0"
          >
            <MapPin className="h-3.5 w-3.5 text-[#8c7060]" aria-hidden="true" />
            <span className="hidden sm:inline">Lokasi</span>
          </a>
          <a
            href="#galeri"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-[#5f5149] hover:bg-[#f2ebe2] hover:text-[#332924] whitespace-nowrap shrink-0"
          >
            <ImageIcon className="h-3.5 w-3.5 text-[#8c7060]" aria-hidden="true" />
            <span className="hidden sm:inline">Galeri</span>
          </a>
          <a
            href="#buku-tamu"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-[#5f5149] hover:bg-[#f2ebe2] hover:text-[#332924] whitespace-nowrap shrink-0"
          >
            <MessageSquareHeart className="h-3.5 w-3.5 text-[#8c7060]" aria-hidden="true" />
            <span className="hidden sm:inline">Ucapan</span>
          </a>
        </nav>
      )}

      {/* Floating Music Control + Now Playing Label */}
      {isOpened && (
        <div className="fixed bottom-3.5 right-3.5 sm:right-5 z-40 flex items-center gap-2 print:hidden">
          {isMusicPlaying && (
            <span className="hidden md:inline-block max-w-[200px] truncate rounded-full border border-[#a98667]/40 bg-[#fffcf8]/95 px-3 py-1.5 text-[11px] font-medium text-[#8c7060] shadow-sm">
              {config.musicTitle}
            </span>
          )}
          <button
            type="button"
            onClick={handleToggleMusic}
            aria-label={isMusicPlaying ? 'Jeda musik latar' : 'Putar musik latar'}
            title={`${isMusicPlaying ? 'Jeda' : 'Putar'}: ${config.musicTitle}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#a98667]/45 bg-[#8c7060] text-white shadow-lg hover:bg-[#71584a] transition-colors cursor-pointer"
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
