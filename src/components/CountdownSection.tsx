import React, { useEffect, useState } from 'react';
import { CalendarPlus } from 'lucide-react';
import { InvitationConfig } from '../types/invitation';
import { RevealText } from './BotanicalEffects';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeTimeLeft(targetIso: string): TimeLeft {
  const targetMs = new Date(targetIso).getTime();
  if (Number.isNaN(targetMs)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };
  }
  const diff = targetMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

interface CountdownSectionProps {
  config: InvitationConfig;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft(config.eventDateISO));

  useEffect(() => {
    setTimeLeft(computeTimeLeft(config.eventDateISO));
    const timer = window.setInterval(() => {
      setTimeLeft(computeTimeLeft(config.eventDateISO));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [config.eventDateISO]);

  const pad = (n: number) => String(n).padStart(2, '0');

  const handleDownloadIcs = () => {
    const start = new Date(config.eventDateISO);
    const end = new Date(start.getTime() + 5 * 3600 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Vintage Botanica//Wedding Invitation//ID',
      'BEGIN:VEVENT',
      `UID:wedding-${start.getTime()}@vintagebotanica`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:Pernikahan ${config.coupleShort}`,
      `DESCRIPTION:${config.akadTitle} (${config.akadTime}) & ${config.resepsiTitle} (${config.resepsiTime})`,
      `LOCATION:${config.venueName}, ${config.venueAddress}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pernikahan-${config.coupleShort.replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const googleCalendarUrl = (() => {
    const start = new Date(config.eventDateISO);
    const end = new Date(start.getTime() + 5 * 3600 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Pernikahan ${config.coupleShort}`,
      dates: `${fmt(start)}/${fmt(end)}`,
      details: `${config.akadTitle}: ${config.akadTime} | ${config.resepsiTitle}: ${config.resepsiTime}`,
      location: `${config.venueName}, ${config.venueAddress}`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  })();

  const blocks = [
    { label: 'Hari', value: pad(timeLeft.days) },
    { label: 'Jam', value: pad(timeLeft.hours) },
    { label: 'Menit', value: pad(timeLeft.minutes) },
    { label: 'Detik', value: pad(timeLeft.seconds) },
  ];

  return (
    <div className="text-center">
      <RevealText variant="fade-down">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a98667]">
          Save The Date
        </p>
      </RevealText>
      <RevealText variant="fade-up" delay={90}>
        <h2 className="font-display mt-2.5 text-3xl sm:text-4xl text-[#332924] text-balance">
          {timeLeft.isPast ? 'Hari Bahagia Telah Tiba' : 'Menuju Hari Bahagia'}
        </h2>
      </RevealText>
      <RevealText variant="fade-up" delay={160}>
        <p className="mt-2 text-sm text-[#5f5149]">
          {config.eventDateDisplay} · {config.venueName}
        </p>
      </RevealText>

      <RevealText variant="zoom-soft" delay={210}>
        <div
          className="mt-8 grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto"
          aria-live="polite"
          aria-label="Hitung mundur menuju acara"
        >
          {blocks.map((block) => (
            <div
              key={block.label}
              className="botanical-double-frame px-2 py-4 sm:py-5 flex flex-col items-center justify-center"
            >
              <span className="font-display tabular-nums text-3xl sm:text-4xl font-semibold text-[#8c7060] leading-none">
                {block.value}
              </span>
              <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.14em] text-[#84756c]">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </RevealText>

      <RevealText variant="fade-up" delay={260}>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#8c7060] px-4 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-[#71584a] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c7060]"
          >
            <CalendarPlus className="h-4 w-4" aria-hidden="true" />
            <span>Simpan di Google Calendar</span>
          </a>
          <button
            type="button"
            onClick={handleDownloadIcs}
            className="inline-flex items-center gap-2 rounded-lg border border-[#8c7060]/30 bg-[#fffcf8] px-4 py-2.5 text-xs sm:text-sm font-medium text-[#71584a] hover:bg-[#f2ebe2] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c7060]"
          >
            <span>Unduh Pengingat (.ics)</span>
          </button>
        </div>
      </RevealText>
    </div>
  );
};
