import React, { useState } from 'react';
import { Gift, Heart, Printer } from 'lucide-react';
import { InvitationConfig } from '../types/invitation';
import { FloralClosingWreath, OliveSprigDivider } from './BotanicalOrnaments';
import { RevealText } from './BotanicalEffects';

interface ThankYouSectionProps {
  config: InvitationConfig;
  guestName: string;
}

export const ThankYouSection: React.FC<ThankYouSectionProps> = ({ config, guestName }) => {
  const [showGiftPanel, setShowGiftPanel] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  return (
    <section
      id="terima-kasih"
      className="px-6 sm:px-10 py-16 sm:py-20 border-t border-[#8c7060]/18 text-center"
    >
      <RevealText variant="fade-down">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a98667]">
          Ucapan Terima Kasih
        </p>
      </RevealText>
      <RevealText variant="fade-up" delay={90}>
        <h2 className="font-display mt-2.5 text-3xl sm:text-4xl text-[#332924] text-balance">
          {config.thankYouHeading}
        </h2>
      </RevealText>
      <RevealText variant="fade-up" delay={170}>
        <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-[#5f5149]">
          {config.thankYouMessage}
        </p>
      </RevealText>

      <RevealText variant="fade-up" delay={230}>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowGiftPanel((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#8c7060] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#71584a] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Gift className="h-4 w-4" aria-hidden="true" />
            <span>{showGiftPanel ? 'Tutup Tanda Kasih' : 'Amplop Digital / Tanda Kasih'}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowCardModal(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#8c7060]/30 bg-[#fffcf8] px-5 py-2.5 text-sm font-medium text-[#71584a] hover:bg-[#f2ebe2] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            <span>Kartu Ucapan Terima Kasih</span>
          </button>
        </div>
      </RevealText>

      {showGiftPanel && config.giftAccounts.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {config.giftAccounts.map((account) => (
            <div key={account.id} className="botanical-double-frame p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a98667]">
                {account.bankName}
              </p>
              <p className="mt-2 text-sm font-medium text-[#332924]">
                a.n. {account.accountHolder}
              </p>
              <p className="mt-1.5 text-xs italic text-[#84756c]">
                Contoh amplop digital (nomor rekening dicantumkan sesuai data mempelai).
              </p>
            </div>
          ))}
        </div>
      )}

      <RevealText variant="zoom-soft" delay={60}>
        <FloralClosingWreath className="mt-10 mb-2" />
      </RevealText>

      <RevealText variant="fade-up" delay={120}>
        <p className="font-display text-[clamp(1.6rem,7vw,1.95rem)] italic text-[#332924] whitespace-nowrap">
          {config.coupleShort}
        </p>
      </RevealText>
      <RevealText variant="fade-up" delay={190}>
        <p className="mt-2 text-xs sm:text-sm text-[#5f5149]">{config.familySignature}</p>
      </RevealText>

      {/* Responsive Thank-You Card Preview Modal */}
      {showCardModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Kartu Ucapan Terima Kasih"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowCardModal(false)}
        >
          <div
            className="botanical-card relative max-w-lg w-full p-8 sm:p-10 text-center shadow-2xl bg-[#fffcf8]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a98667]">
              Kartu Terima Kasih
            </p>
            <h3 className="font-display mt-3 text-3xl sm:text-4xl text-[#332924]">
              Terima Kasih, {guestName || 'Sahabat Terkasih'}
            </h3>
            <OliveSprigDivider className="my-5" />
            <p className="text-sm leading-relaxed text-[#5f5149]">{config.thankYouMessage}</p>
            <p className="font-display mt-6 text-2xl italic text-[#71584a] whitespace-nowrap">
              {config.coupleShort}
            </p>
            <p className="mt-1 text-xs text-[#84756c]">
              {config.eventDateDisplay} · {config.venueName}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-lg bg-[#8c7060] px-4 py-2 text-xs font-medium text-white hover:bg-[#71584a] transition-colors cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Cetak / Simpan PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCardModal(false)}
                className="rounded-lg border border-[#8c7060]/30 bg-[#fffcf8] px-4 py-2 text-xs font-medium text-[#332924] hover:bg-[#f2ebe2] transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
