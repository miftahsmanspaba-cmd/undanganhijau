import React, { useState } from 'react';

const CORNER_BOUQUET_SRC = '/src/assets/images/floral_corner_bouquet.png';
const GARLAND_SPRAY_SRC = '/src/assets/images/floral_garland_spray.png';
const CLOSING_WREATH_SRC = '/src/assets/images/floral_closing_wreath.png';

export const OliveSprigDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`botanical-divider ${className}`} aria-hidden="true">
    <svg
      width="48"
      height="22"
      viewBox="0 0 56 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-[#495d4c]"
    >
      <path
        d="M6 17C16 15 24 12 31 8.5C37 5.5 44 4 50 4.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M17 14C15 9.5 17 5 20.5 4C22.5 7.5 20.5 12 17 14Z"
        stroke="currentColor"
        strokeWidth="1.05"
        fill="rgba(73,93,76,0.14)"
      />
      <path
        d="M28 9.5C26.5 5 28.5 1.5 32 1.2C33.2 4.8 31.2 8.2 28 9.5Z"
        stroke="currentColor"
        strokeWidth="1.05"
        fill="rgba(73,93,76,0.14)"
      />
      <path
        d="M22.5 12C25.5 15.5 30 16.5 32.5 13.8C30 11 25.5 10.5 22.5 12Z"
        stroke="currentColor"
        strokeWidth="1.05"
        fill="rgba(166,137,91,0.18)"
      />
      <circle cx="12" cy="16.2" r="1.5" fill="#a6895b" />
      <circle cx="40.5" cy="4.2" r="1.4" fill="#a6895b" />
    </svg>
  </div>
);

export const FloralCornerBouquet: React.FC<{
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ corner, className = '' }) => {
  const [failed, setFailed] = useState(false);

  // Source image has the bouquet anchored in the top-right corner
  const mirrorTransform =
    corner === 'top-right'
      ? ''
      : corner === 'top-left'
      ? 'scale-x-[-1]'
      : corner === 'bottom-right'
      ? 'scale-y-[-1]'
      : 'scale-[-1]';

  const swayClass = `floral-sway-${corner}`;

  if (failed) {
    return null;
  }

  return (
    <div className={`pointer-events-none select-none ${swayClass} ${className}`} aria-hidden="true">
      <img
        src={CORNER_BOUQUET_SRC}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`h-full w-full object-contain ${mirrorTransform}`}
      />
    </div>
  );
};

export const FloralGarlandSpray: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <OliveSprigDivider className={className} />;
  }

  return (
    <img
      src={GARLAND_SPRAY_SRC}
      alt=""
      aria-hidden="true"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`pointer-events-none select-none mx-auto w-56 sm:w-72 object-contain floral-float ${className}`}
    />
  );
};

export const FloralClosingWreath: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <OliveSprigDivider className={className} />;
  }

  return (
    <img
      src={CLOSING_WREATH_SRC}
      alt=""
      aria-hidden="true"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`pointer-events-none select-none mx-auto w-64 sm:w-80 object-contain floral-float ${className}`}
    />
  );
};

export const MonogramSeal: React.FC<{ initials: string }> = ({ initials }) => (
  <div
    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#a6895b]/55 bg-[#fffdf9] shadow-xs"
    aria-hidden="true"
  >
    <div className="flex h-13 w-13 items-center justify-center rounded-full border border-[#495d4c]/25">
      <span className="font-display text-lg font-semibold tracking-widest text-[#495d4c]">
        {initials}
      </span>
    </div>
  </div>
);
