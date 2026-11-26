import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { AttendanceStatus, GuestbookEntry } from '../types/invitation';
import { RevealText } from './BotanicalEffects';

interface GuestbookSectionProps {
  guestNameFromUrl: string;
  entries: GuestbookEntry[];
  onAddEntry: (entry: Omit<GuestbookEntry, 'id' | 'createdAt'>) => void;
}

const ATTENDANCE_LABELS: Record<AttendanceStatus, string> = {
  hadir: 'Hadir',
  ragu: 'Masih Ragu',
  tidak_hadir: 'Berhalangan',
};

function formatDateIndo(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Baru saja';
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  guestNameFromUrl,
  entries,
  onAddEntry,
}) => {
  const [name, setName] = useState(guestNameFromUrl || '');
  const [attendance, setAttendance] = useState<AttendanceStatus>('hadir');
  const [guestsCount, setGuestsCount] = useState(1);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState<'all' | AttendanceStatus>('all');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  useEffect(() => {
    if (guestNameFromUrl && !name) {
      setName(guestNameFromUrl);
    }
  }, [guestNameFromUrl, name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMsg = message.trim();
    if (!trimmedName || !trimmedMsg) return;

    onAddEntry({
      name: trimmedName,
      attendance,
      guestsCount: attendance === 'tidak_hadir' ? 0 : guestsCount,
      message: trimmedMsg,
    });
    setMessage('');
    setSubmittedNotice(true);
    window.setTimeout(() => setSubmittedNotice(false), 3500);
  };

  const totalHadir = entries.filter((e) => e.attendance === 'hadir').length;
  const totalGuests = entries
    .filter((e) => e.attendance === 'hadir')
    .reduce((sum, e) => sum + e.guestsCount, 0);

  const filteredEntries =
    filter === 'all' ? entries : entries.filter((item) => item.attendance === filter);

  return (
    <section
      id="buku-tamu"
      className="px-6 sm:px-10 py-16 sm:py-20 border-t border-[#495d4c]/14"
    >
      <div className="text-center">
        <RevealText variant="fade-down">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a6895b]">
            Buku Tamu &amp; RSVP
          </p>
        </RevealText>
        <RevealText variant="fade-up" delay={90}>
          <h2 className="font-display mt-2.5 text-3xl sm:text-4xl text-[#2b332c] text-balance">
            Konfirmasi Kehadiran &amp; Doa Restu
          </h2>
        </RevealText>
        <RevealText variant="fade-up" delay={160}>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-[#566157] tabular-nums">
            <span>{entries.length} Ucapan</span>
            <span aria-hidden="true">·</span>
            <span>{totalHadir} Hadir</span>
            <span aria-hidden="true">·</span>
            <span>{totalGuests} Estimasi Tamu</span>
          </div>
        </RevealText>
      </div>

      <div className="mt-9 space-y-6">
        {/* Form */}
        <RevealText variant="fade-up" delay={100}>
          <form onSubmit={handleSubmit} className="botanical-double-frame p-6 sm:p-7 space-y-4">
          <div>
            <label htmlFor="guest-name-input" className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#566157]">
              Nama Lengkap / Keluarga
            </label>
            <input
              id="guest-name-input"
              type="text"
              required
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Santoso & Keluarga"
              className="mt-1.5 w-full rounded-lg border border-[#495d4c]/20 bg-[#f8f5ee] px-4 py-2.5 text-sm text-[#2b332c] placeholder:text-[#7c877d] focus:border-[#495d4c] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="guest-attendance" className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#566157]">
                Konfirmasi Kehadiran
              </label>
              <select
                id="guest-attendance"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value as AttendanceStatus)}
                className="mt-1.5 w-full rounded-lg border border-[#495d4c]/20 bg-[#f8f5ee] px-3.5 py-2.5 text-sm text-[#2b332c] focus:border-[#495d4c] focus:outline-none"
              >
                <option value="hadir">InsyaAllah Hadir</option>
                <option value="ragu">Masih Ragu</option>
                <option value="tidak_hadir">Berhalangan Hadir</option>
              </select>
            </div>

            <div>
              <label htmlFor="guest-count" className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#566157]">
                Jumlah Tamu
              </label>
              <select
                id="guest-count"
                disabled={attendance === 'tidak_hadir'}
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="mt-1.5 w-full rounded-lg border border-[#495d4c]/20 bg-[#f8f5ee] px-3.5 py-2.5 text-sm text-[#2b332c] disabled:opacity-50 focus:border-[#495d4c] focus:outline-none"
              >
                <option value={1}>1 Orang</option>
                <option value={2}>2 Orang</option>
                <option value={3}>3 Orang</option>
                <option value={4}>4 Orang</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="guest-message" className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#566157]">
              Ucapan &amp; Doa untuk Mempelai
            </label>
            <textarea
              id="guest-message"
              required
              rows={3}
              maxLength={400}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan hangat serta doa restu Anda..."
              className="mt-1.5 w-full rounded-lg border border-[#495d4c]/20 bg-[#f8f5ee] px-4 py-2.5 text-sm text-[#2b332c] placeholder:text-[#7c877d] focus:border-[#495d4c] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#495d4c] px-5 py-3 text-sm font-medium text-white hover:bg-[#364739] transition-colors cursor-pointer"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            <span>Kirim Ucapan &amp; Konfirmasi</span>
          </button>

          {submittedNotice && (
            <p role="status" className="text-xs font-medium text-[#495d4c] text-center">
              Terima kasih, ucapan dan konfirmasi kehadiran Anda telah tersimpan.
            </p>
          )}
          </form>
        </RevealText>

        {/* Wishes Feed */}
        <RevealText variant="fade-up" delay={140}>
          <div className="botanical-card p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#495d4c]/12">
            <h3 className="font-display text-2xl text-[#2b332c]">Untaian Doa Tamu</h3>
            <div className="flex items-center gap-1 rounded-lg bg-[#f3efe6] p-1" role="tablist" aria-label="Filter ucapan tamu">
              {(
                [
                  { id: 'all', label: 'Semua' },
                  { id: 'hadir', label: 'Hadir' },
                  { id: 'ragu', label: 'Ragu' },
                  { id: 'tidak_hadir', label: 'Berhalangan' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    filter === tab.id
                      ? 'bg-white text-[#2b332c] shadow-xs'
                      : 'text-[#566157] hover:text-[#2b332c]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 max-h-[380px] overflow-y-auto divide-y divide-[#495d4c]/10 pr-1">
            {filteredEntries.length === 0 ? (
              <p className="py-10 text-center text-sm text-[#7c877d]">
                Belum ada ucapan pada kategori ini. Jadilah yang pertama menulis doa restu.
              </p>
            ) : (
              filteredEntries.map((item) => (
                <article key={item.id} className="py-4 first:pt-2 last:pb-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display text-xl font-semibold text-[#2b332c]">{item.name}</h4>
                    <div className="text-xs text-[#7c877d] tabular-nums">
                      <span>{ATTENDANCE_LABELS[item.attendance]}</span>
                      {item.attendance !== 'tidak_hadir' && (
                        <>
                          <span aria-hidden="true"> · </span>
                          <span>{item.guestsCount} Tamu</span>
                        </>
                      )}
                      <span aria-hidden="true"> · </span>
                      <span>{formatDateIndo(item.createdAt)}</span>
                    </div>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#566157]">{item.message}</p>
                </article>
              ))
            )}
          </div>
        </div>
        </RevealText>
      </div>
    </section>
  );
};
