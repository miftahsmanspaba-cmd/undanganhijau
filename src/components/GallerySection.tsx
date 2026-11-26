import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Flower2, X } from 'lucide-react';
import { GalleryPhoto } from '../types/invitation';
import { RevealText } from './BotanicalEffects';

interface GallerySectionProps {
  photos: GalleryPhoto[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [brokenIds, setBrokenIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === null ? null : (prev + 1) % photos.length));
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev === null ? null : (prev - 1 + photos.length) % photos.length));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, photos.length]);

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <section id="galeri" className="px-6 sm:px-10 py-16 sm:py-20 border-t border-[#8c7060]/18">
      <div className="text-center">
        <RevealText variant="fade-down">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a98667]">
            Galeri Foto
          </p>
        </RevealText>
        <RevealText variant="fade-up" delay={90}>
          <h2 className="font-display mt-2.5 text-3xl sm:text-4xl text-[#332924] text-balance">
            Momen Kebersamaan Kami
          </h2>
        </RevealText>
        <RevealText variant="fade-up" delay={160}>
          <p className="mt-2.5 text-sm text-[#5f5149]">
            Ketuk setiap potret untuk melihat dalam tampilan layar penuh.
          </p>
        </RevealText>
      </div>

      <div className="mt-9 grid grid-cols-2 gap-3.5 sm:gap-4">
        {photos.map((photo, index) => {
          const isWide = index === 0;
          const colClass = isWide ? 'col-span-2' : 'col-span-1';
          const aspectClass = isWide ? 'aspect-[4/5] sm:aspect-[4/4]' : 'aspect-[3/4]';

          const isBroken = Boolean(brokenIds[photo.id]);

          return (
            <RevealText
              key={photo.id}
              variant="zoom-soft"
              delay={(index % 2) * 100}
              className={colClass}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`gallery-tile group relative w-full overflow-hidden rounded-xl border border-[#a98667]/40 bg-[#ebe3d8] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c7060] ${aspectClass}`}
              >
                {isBroken ? (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#f2ebe2] to-[#e6dcd0] p-5 text-center">
                    <Flower2 className="h-7 w-7 text-[#8c7060]/55" aria-hidden="true" />
                    <p className="font-display mt-2 text-base text-[#332924]">{photo.caption}</p>
                  </div>
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={() => setBrokenIds((prev) => ({ ...prev, [photo.id]: true }))}
                    className="gallery-img h-full w-full object-cover object-top"
                  />
                )}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 py-3"
                  aria-hidden="true"
                >
                  <p className="text-[11px] font-medium tracking-wide text-white/95 truncate">{photo.caption}</p>
                </div>
              </button>
            </RevealText>
          );
        })}
      </div>

      {activePhoto && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-4 sm:p-8"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Tutup pratinjau foto"
              className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative w-full overflow-hidden rounded-2xl bg-[#1f1916]">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-full object-contain mx-auto"
              />
            </div>

            <div className="mt-4 flex w-full items-center justify-between gap-4 text-white">
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex - 1 + photos.length) % photos.length)}
                aria-label="Foto sebelumnya"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/12 hover:bg-white/25 transition-colors cursor-pointer shrink-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="text-center">
                <p className="font-display text-xl text-white">{activePhoto.caption}</p>
                <p className="text-xs text-white/70 tabular-nums mt-0.5">
                  {activeIndex + 1} / {photos.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % photos.length)}
                aria-label="Foto berikutnya"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/12 hover:bg-white/25 transition-colors cursor-pointer shrink-0"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
