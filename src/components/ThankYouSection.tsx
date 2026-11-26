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
      className="px-6 sm:px-10 py-16 sm:py-20 border-t border-[#495d4c]/14 text-center"
    >
      <RevealText variant="fade-down">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a6895b]">
          Ucapan Terima Kasih
        </p>
      </RevealText>
      <RevealText variant="fade-up" delay={90}>
        <h2 className="font-display mt-2.5 text-3xl sm:text-4xl text-[#2b332c] text-balance">
          {config.thankYouHeading}
        </h2>
      </RevealText>
      <RevealText variant="fade-up" delay={170}>
        <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-[#566157]">
          {config.thankYouMessage}
        </p>
      </RevealText>

      <RevealText variant="fade-up" delay={230}>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowGiftPanel((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#495d4c] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#364739] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Gift className="h-4 w-4" aria-hidden="true" />
            <span>{showGiftPanel ? 'Tutup Tanda Kasih' : 'Amplop Digital / Tanda Kasih'}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowCardModal(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#495d4c]/25 bg-white px-5 py-2.5 text-sm font-medium text-[#495d4c] hover:bg-[#f3efe6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a6895b]">
                {account.bankName}
              </p>
              <p className="mt-2 text-sm font-medium text-[#2b332c]">
                a.n. {account.accountHolder}
              </p>
              <p className="mt-1.5 text-xs italic text-[#7c877d]">
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
        <p className="font-display text-[clamp(1.6rem,7vw,1.95rem)] italic text-[#2b332c] whitespace-nowrap">
          {config.coupleShort}
        </p>
      </RevealText>
      <RevealText variant="fade-up" delay={190}>
        <p className="mt-2 text-xs sm:text-sm text-[#566157]">{config.familySignature}</p>
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
            className="botanical-card relative max-w-lg w-full p-8 sm:p-10 text-center shadow-2xl bg-[#faf8f4]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e7e4b]">
              Kartu Terima Kasih
            </p>
            <h3 className="font-display mt-3 text-3xl sm:text-4xl text-[#232b25]">
              Terima Kasih, {guestName || 'Sahabat Terkasih'}
            </h3>
            <OliveSprigDivider className="my-5" />
            <p className="text-sm leading-relaxed text-[#525f56]">{config.thankYouMessage}</p>
            <p className="font-display mt-6 text-2xl italic text-[#3a5240] whitespace-nowrap">
              {config.coupleShort}
            </p>
            <p className="mt-1 text-xs text-[#768279]">
              {config.eventDateDisplay} · {config.venueName}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-lg bg-[#3a5240] px-4 py-2 text-xs font-medium text-white hover:bg-[#2d4032] transition-colors cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Cetak / Simpan PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCardModal(false)}
                className="rounded-lg border border-[#3a5240]/25 bg-white px-4 py-2 text-xs font-medium text-[#232b25] hover:bg-[#f3efe6] transition-colors cursor-pointer"
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
