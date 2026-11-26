import React, { useState } from 'react';
import { Check, Copy, Download, RotateCcw, Share2, Trash2, X } from 'lucide-react';
import { GuestbookEntry, InvitationConfig } from '../types/invitation';
import { buildStandaloneHtml } from '../utils/standaloneExport';

interface OwnerManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: InvitationConfig;
  onSaveConfig: (next: InvitationConfig) => void;
  onResetConfig: () => void;
  entries: GuestbookEntry[];
  onDeleteEntry: (id: string) => void;
}

type ManagerTab = 'event' | 'thankyou' | 'links' | 'export';

export const OwnerManagerModal: React.FC<OwnerManagerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetConfig,
  entries,
  onDeleteEntry,
}) => {
  const [tab, setTab] = useState<ManagerTab>('event');
  const [draft, setDraft] = useState<InvitationConfig>(config);
  const [guestDraftName, setGuestDraftName] = useState('Budi Santoso & Keluarga');
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedFlag, setSavedFlag] = useState(false);

  if (!isOpen) return null;

  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const generatedLink = `${baseUrl}?to=${encodeURIComponent(guestDraftName.trim() || 'Tamu Undangan')}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Dengan penuh kebahagiaan kami mengundang ${guestDraftName.trim() || 'Bapak/Ibu/Saudara/i'} untuk hadir di pernikahan ${draft.coupleShort} pada ${draft.eventDateDisplay}. Buka undangan di sini: ${generatedLink}`
  )}`;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(draft);
    setSavedFlag(true);
    window.setTimeout(() => setSavedFlag(false), 2500);
  };

  const handleDownloadStandaloneHtml = () => {
    const html = buildStandaloneHtml(draft, entries);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyGuestLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Kelola Undangan Pemilik Acara"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4"
      onClick={onClose}
    >
      <div
        className="botanical-card flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden bg-[#faf8f4] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#3a5240]/12 bg-white px-6 py-4">
          <div>
            <h2 className="font-display text-2xl text-[#232b25]">Kelola Undangan</h2>
            <p className="text-xs text-[#768279]">
              Ubah data acara, ucapan terima kasih, buat tautan tamu, atau ekspor HTML bersih.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup panel pengelola"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#525f56] hover:bg-[#f3efe6] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-[#3a5240]/12 bg-[#f3efe6] px-6 py-2.5">
          {(
            [
              { id: 'event', label: 'Mempelai & Acara' },
              { id: 'thankyou', label: 'Ucapan Terima Kasih' },
              { id: 'links', label: 'Generator Link Tamu' },
              { id: 'export', label: 'Buku Tamu & Ekspor HTML' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                tab === item.id
                  ? 'bg-white text-[#232b25] shadow-xs'
                  : 'text-[#525f56] hover:text-[#232b25]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'event' && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#525f56]">Nama Singkat Pasangan</label>
                  <input
                    type="text"
                    value={draft.coupleShort}
                    onChange={(e) => setDraft({ ...draft, coupleShort: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#525f56]">Tampilan Tanggal Acara</label>
                  <input
                    type="text"
                    value={draft.eventDateDisplay}
                    onChange={(e) => setDraft({ ...draft, eventDateDisplay: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#525f56]">Nama Lengkap Mempelai Wanita</label>
                  <input
                    type="text"
                    value={draft.brideFullName}
                    onChange={(e) => setDraft({ ...draft, brideFullName: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#525f56]">Nama Lengkap Mempelai Pria</label>
                  <input
                    type="text"
                    value={draft.groomFullName}
                    onChange={(e) => setDraft({ ...draft, groomFullName: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#525f56]">Tanggal Hitung Mundur (ISO)</label>
                  <input
                    type="text"
                    value={draft.eventDateISO}
                    onChange={(e) => setDraft({ ...draft, eventDateISO: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#525f56]">Nama Lokasi Venue</label>
                  <input
                    type="text"
                    value={draft.venueName}
                    onChange={(e) => setDraft({ ...draft, venueName: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#525f56]">Alamat Lengkap Venue</label>
                <input
                  type="text"
                  value={draft.venueAddress}
                  onChange={(e) => setDraft({ ...draft, venueAddress: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#525f56]">Latitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={draft.venueLat}
                    onChange={(e) => setDraft({ ...draft, venueLat: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#525f56]">Longitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={draft.venueLng}
                    onChange={(e) => setDraft({ ...draft, venueLng: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm tabular-nums"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[#3a5240]/15 bg-white p-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9e7e4b]">
                  Musik Latar Undangan
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#525f56]">Judul &amp; Penyanyi Lagu</label>
                    <input
                      type="text"
                      value={draft.musicTitle}
                      onChange={(e) => setDraft({ ...draft, musicTitle: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-[#faf8f4] px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#525f56]">URL Audio MP3 (Opsional)</label>
                    <input
                      type="url"
                      placeholder="https://.../janji-suci.mp3"
                      value={draft.customMusicUrl.startsWith('data:') ? '' : draft.customMusicUrl}
                      onChange={(e) => setDraft({ ...draft, customMusicUrl: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-[#faf8f4] px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <label className="inline-flex items-center gap-2 rounded-lg border border-[#3a5240]/25 bg-[#faf8f4] px-3 py-1.5 text-xs font-medium text-[#3a5240] hover:bg-[#f3efe6] cursor-pointer">
                    <span>Unggah File MP3 Lokal</span>
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            setDraft({ ...draft, customMusicUrl: reader.result });
                          }
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                  {draft.customMusicUrl && (
                    <button
                      type="button"
                      onClick={() => setDraft({ ...draft, customMusicUrl: '' })}
                      className="text-xs text-[#9e473a] hover:underline cursor-pointer"
                    >
                      Hapus Audio Kustom (Gunakan Instrumental Bawaan)
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    onResetConfig();
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#3a5240]/25 bg-white px-4 py-2 text-xs font-medium text-[#525f56] hover:text-[#232b25] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset Data Default</span>
                </button>
                <div className="flex items-center gap-3">
                  {savedFlag && <span className="text-xs font-medium text-[#3a5240]">Perubahan tersimpan</span>}
                  <button
                    type="submit"
                    className="rounded-lg bg-[#3a5240] px-5 py-2 text-xs font-medium text-white hover:bg-[#2d4032] cursor-pointer"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </form>
          )}

          {tab === 'thankyou' && (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#525f56]">Judul Ucapan Terima Kasih</label>
                <input
                  type="text"
                  value={draft.thankYouHeading}
                  onChange={(e) => setDraft({ ...draft, thankYouHeading: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#525f56]">Isi Pesan Terima Kasih</label>
                <textarea
                  rows={4}
                  value={draft.thankYouMessage}
                  onChange={(e) => setDraft({ ...draft, thankYouMessage: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#525f56]">Tanda Tangan Keluarga</label>
                <input
                  type="text"
                  value={draft.familySignature}
                  onChange={(e) => setDraft({ ...draft, familySignature: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm"
                />
              </div>

              <div className="border-t border-[#3a5240]/12 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9e7e4b]">
                  Rekening Tanda Kasih
                </p>
                <div className="mt-3 space-y-3">
                  {draft.giftAccounts.map((acc, idx) => (
                    <div key={acc.id} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={acc.bankName}
                        onChange={(e) => {
                          const next = [...draft.giftAccounts];
                          next[idx] = { ...acc, bankName: e.target.value };
                          setDraft({ ...draft, giftAccounts: next });
                        }}
                        placeholder="Nama Bank"
                        className="rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={acc.accountNumber}
                        onChange={(e) => {
                          const next = [...draft.giftAccounts];
                          next[idx] = { ...acc, accountNumber: e.target.value };
                          setDraft({ ...draft, giftAccounts: next });
                        }}
                        placeholder="No. Rekening"
                        className="rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm tabular-nums"
                      />
                      <input
                        type="text"
                        value={acc.accountHolder}
                        onChange={(e) => {
                          const next = [...draft.giftAccounts];
                          next[idx] = { ...acc, accountHolder: e.target.value };
                          setDraft({ ...draft, giftAccounts: next });
                        }}
                        placeholder="Atas Nama"
                        className="rounded-lg border border-[#3a5240]/20 bg-white px-3 py-2 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                {savedFlag && <span className="text-xs font-medium text-[#3a5240]">Perubahan tersimpan</span>}
                <button
                  type="submit"
                  className="rounded-lg bg-[#3a5240] px-5 py-2 text-xs font-medium text-white hover:bg-[#2d4032] cursor-pointer"
                >
                  Simpan Ucapan Terima Kasih
                </button>
              </div>
            </form>
          )}

          {tab === 'links' && (
            <div className="space-y-4">
              <p className="text-sm text-[#525f56]">
                Ketik nama tamu untuk membuat tautan undangan personal seperti format{' '}
                <code className="rounded bg-white px-1.5 py-0.5 text-xs">?to=Nama+Tamu</code>.
              </p>
              <div>
                <label className="block text-xs font-medium text-[#525f56]">Nama Tamu Undangan</label>
                <input
                  type="text"
                  value={guestDraftName}
                  onChange={(e) => setGuestDraftName(e.target.value)}
                  placeholder="Contoh: Ibu Kartini & Keluarga"
                  className="mt-1 w-full rounded-lg border border-[#3a5240]/20 bg-white px-3.5 py-2.5 text-sm"
                />
              </div>
              <div className="rounded-xl border border-[#3a5240]/15 bg-white p-4">
                <p className="text-xs text-[#768279]">Tautan Undangan Personal</p>
                <p className="mt-1 break-all text-xs sm:text-sm font-medium text-[#232b25]">{generatedLink}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopyGuestLink}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#3a5240] px-4 py-2 text-xs font-medium text-white hover:bg-[#2d4032] cursor-pointer"
                >
                  {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedLink ? 'Tautan Tersalin' : 'Salin Tautan'}</span>
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#3a5240]/25 bg-white px-4 py-2 text-xs font-medium text-[#3a5240] hover:bg-[#f3efe6]"
                >
                  <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Bagikan via WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {tab === 'export' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-[#3a5240]/15 bg-white p-5">
                <h3 className="font-display text-2xl text-[#232b25]">Ekspor HTML Mandiri (GitHub / Vercel / Netlify)</h3>
                <p className="mt-1.5 text-sm text-[#525f56]">
                  Unduh file <code className="text-xs font-semibold">index.html</code> tunggal tanpa library pihak ketiga yang berat, lengkap dengan CSS bersih, hitung mundur, musik latar, buku tamu, dan tombol navigasi Google Maps untuk diunggah langsung ke GitHub Pages, Netlify Drop, atau Vercel.
                </p>
                <button
                  type="button"
                  onClick={handleDownloadStandaloneHtml}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#3a5240] px-4 py-2.5 text-xs font-medium text-white hover:bg-[#2d4032] cursor-pointer"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Unduh index.html Mandiri</span>
                </button>
              </div>

              <div>
                <h3 className="font-display text-xl text-[#232b25]">Moderasi Buku Tamu ({entries.length})</h3>
                <div className="mt-3 max-h-60 overflow-y-auto divide-y divide-[#3a5240]/10 rounded-xl border border-[#3a5240]/15 bg-white px-4">
                  {entries.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-[#232b25]">{item.name}</p>
                        <p className="mt-0.5 text-xs text-[#525f56]">{item.message}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDeleteEntry(item.id)}
                        aria-label={`Hapus ucapan dari ${item.name}`}
                        className="shrink-0 rounded-md p-1.5 text-[#9e473a] hover:bg-[#faf0ee] cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
