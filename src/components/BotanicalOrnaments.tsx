import React, { useState } from 'react';
import CORNER_BOUQUET_SRC from '../assets/images/floral_corner_bouquet.png';
import GARLAND_SPRAY_SRC from '../assets/images/floral_garland_spray.png';
import CLOSING_WREATH_SRC from '../assets/images/floral_closing_wreath.png';

/**
 * Architectural etching of the Victorian botanical glasshouse dome & classical fountain
 * matching the Vintage Botanica reference aesthetic.
 */
export const GlasshouseConservatoryBackdrop: React.FC<{
  tone?: 'sepia' | 'ivory';
  className?: string;
}> = ({ tone = 'sepia', className = '' }) => {
  const strokeColor = tone === 'ivory' ? '#faf6f0' : '#8c7060';
  const softFill = tone === 'ivory' ? 'rgba(250, 246, 240, 0.08)' : 'rgba(140, 112, 96, 0.07)';

  return (
    <div
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        {/* Soft misty foliage clouds flanking left & right */}
        <path
          d="M-20 430 Q60 360 130 410 Q175 340 230 395 L230 720 L-20 720 Z"
          fill={softFill}
        />
        <path
          d="M620 430 Q540 360 470 410 Q425 340 370 395 L370 720 L620 720 Z"
          fill={softFill}
        />

        {/* Glasshouse Cupola Finial & Upper Dome */}
        <g stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round">
          <line x1="300" y1="95" x2="300" y2="132" strokeWidth="1.4" opacity="0.45" />
          <circle cx="300" cy="110" r="4" strokeWidth="1.2" opacity="0.45" />
          <path
            d="M262 175 C262 145 279 130 300 130 C321 130 338 145 338 175"
            strokeWidth="1.3"
            opacity="0.42"
          />
          <path
            d="M277 175 C277 148 287 132 300 130 C313 132 323 148 323 175"
            strokeWidth="0.9"
            opacity="0.32"
          />
          <rect x="256" y="175" width="88" height="24" strokeWidth="1.2" opacity="0.4" />

          {/* Main Central Glass Dome */}
          <path
            d="M175 295 C175 215 230 198 300 198 C370 198 425 215 425 295"
            strokeWidth="1.5"
            opacity="0.42"
          />
          <path
            d="M210 295 C210 225 248 200 300 198 C352 200 390 225 390 295"
            strokeWidth="1"
            opacity="0.32"
          />
          <path
            d="M255 295 C255 232 273 202 300 198 C327 202 345 232 345 295"
            strokeWidth="0.9"
            opacity="0.28"
          />
          <line x1="300" y1="198" x2="300" y2="295" strokeWidth="0.9" opacity="0.28" />
          <line x1="168" y1="295" x2="432" y2="295" strokeWidth="1.4" opacity="0.42" />
          <line x1="176" y1="262" x2="424" y2="262" strokeWidth="0.85" opacity="0.25" />

          {/* Central Conservatory Arch & Glass Windows */}
          <rect x="172" y="295" width="256" height="275" strokeWidth="1.2" opacity="0.32" />
          <path
            d="M235 570 L235 375 C235 335 264 312 300 312 C336 312 365 335 365 375 L365 570"
            strokeWidth="1.4"
            opacity="0.38"
          />
          <path
            d="M250 570 L250 380 C250 348 272 328 300 328 C328 328 350 348 350 380 L350 570"
            strokeWidth="0.9"
            opacity="0.28"
          />

          {/* Side Conservatory Wings */}
          <path d="M55 340 L172 315 L172 570 L55 570 Z" strokeWidth="1.1" opacity="0.28" />
          <path d="M545 340 L428 315 L428 570 L545 570 Z" strokeWidth="1.1" opacity="0.28" />
          {[88, 122, 152, 195, 215, 275, 300, 325, 385, 405, 448, 478, 512].map((x) => (
            <line key={x} x1={x} y1="335" x2={x} y2="570" strokeWidth="0.75" opacity="0.2" />
          ))}
          {[375, 425, 475, 520].map((y) => (
            <line key={y} x1="55" y1={y} x2="545" y2={y} strokeWidth="0.75" opacity="0.18" />
          ))}

          {/* Classical Tiered Water Fountain in Foreground Center */}
          <path d="M278 525 C285 510 315 510 322 525" strokeWidth="1.3" opacity="0.52" />
          <path d="M262 548 C275 562 325 562 338 548 Z" fill={softFill} strokeWidth="1.3" opacity="0.52" />
          <line x1="300" y1="560" x2="300" y2="620" strokeWidth="3" opacity="0.46" />
          <path d="M225 602 C250 632 350 632 375 602 Z" fill={softFill} strokeWidth="1.5" opacity="0.56" />
          {/* Cascading water droplets */}
          <path d="M236 608 C232 632 232 658 236 680" strokeWidth="0.9" strokeDasharray="3 4" opacity="0.4" />
          <path d="M258 618 C255 642 255 664 258 682" strokeWidth="0.9" strokeDasharray="3 4" opacity="0.4" />
          <path d="M342 618 C345 642 345 664 342 682" strokeWidth="0.9" strokeDasharray="3 4" opacity="0.4" />
          <path d="M364 608 C368 632 368 658 364 680" strokeWidth="0.9" strokeDasharray="3 4" opacity="0.4" />
          {/* Fountain Pedestal & Basin */}
          <path d="M276 626 L324 626 L334 678 L266 678 Z" fill={softFill} strokeWidth="1.4" opacity="0.52" />
          <path d="M180 680 L420 680 L432 710 L168 710 Z" fill={softFill} strokeWidth="1.5" opacity="0.55" />
          {/* Flanking Classical Urns */}
          <path d="M135 642 L165 642 L158 672 L142 672 Z" fill={softFill} strokeWidth="1.1" opacity="0.42" />
          <path d="M435 642 L465 642 L458 672 L442 672 Z" fill={softFill} strokeWidth="1.1" opacity="0.42" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Ornate scalloped vintage cartouche border inspired by Screenshot 2.
 */
export const ScallopedCartoucheFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`relative mx-auto px-7 py-12 sm:px-12 sm:py-16 ${className}`}>
    <svg
      viewBox="0 0 400 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M52 24 Q125 22 155 48 Q200 10 245 48 Q275 22 348 24 Q376 26 378 58 L378 502 Q376 534 348 536 Q275 538 245 512 Q200 550 155 512 Q125 538 52 536 Q24 534 22 502 L22 58 Q24 26 52 24 Z"
        fill="rgba(255, 252, 247, 0.84)"
        stroke="#8c7060"
        strokeWidth="2.2"
      />
      <path
        d="M58 32 Q126 30 155 54 Q200 19 245 54 Q274 30 342 32 Q367 34 369 62 L369 498 Q367 526 342 528 Q274 530 245 506 Q200 541 155 506 Q126 530 58 528 Q33 526 31 498 L31 62 Q33 34 58 32 Z"
        stroke="rgba(140, 112, 96, 0.35)"
        strokeWidth="1"
      />
    </svg>
    <div className="relative z-10">{children}</div>
  </div>
);

export const DamaskCornerWatermark: React.FC<{
  position: 'top-left' | 'top-right';
  tone?: 'ivory' | 'sepia';
}> = ({ position, tone = 'ivory' }) => {
  const color = tone === 'ivory' ? '#faf6f0' : '#8c7060';
  const flip = position === 'top-right' ? 'scale-x-[-1]' : '';
  const align = position === 'top-right' ? 'right-0' : 'left-0';

  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none select-none absolute top-0 ${align} w-36 h-36 sm:w-44 sm:h-44 opacity-18 ${flip}`}
    >
      <g stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.18">
        <path d="M12 10 C45 14 76 32 98 62" fill="none" />
        <path d="M22 24 C16 54 24 84 44 106" fill="none" />
        <ellipse cx="48" cy="24" rx="18" ry="8" transform="rotate(-18 48 24)" />
        <ellipse cx="76" cy="40" rx="16" ry="7" transform="rotate(22 76 40)" />
        <ellipse cx="26" cy="58" rx="15" ry="7" transform="rotate(64 26 58)" />
        <circle cx="96" cy="60" r="8" />
        <circle cx="114" cy="44" r="5" />
      </g>
    </svg>
  );
};

export const OliveSprigDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`botanical-divider ${className}`} aria-hidden="true">
    <svg
      width="48"
      height="22"
      viewBox="0 0 56 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-[#8c7060]"
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
        fill="rgba(140,112,96,0.14)"
      />
      <path
        d="M28 9.5C26.5 5 28.5 1.5 32 1.2C33.2 4.8 31.2 8.2 28 9.5Z"
        stroke="currentColor"
        strokeWidth="1.05"
        fill="rgba(140,112,96,0.14)"
      />
      <path
        d="M22.5 12C25.5 15.5 30 16.5 32.5 13.8C30 11 25.5 10.5 22.5 12Z"
        stroke="currentColor"
        strokeWidth="1.05"
        fill="rgba(169,134,103,0.18)"
      />
      <circle cx="12" cy="16.2" r="1.5" fill="#a98667" />
      <circle cx="40.5" cy="4.2" r="1.4" fill="#a98667" />
    </svg>
  </div>
);

export const FloralCornerBouquet: React.FC<{
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ corner, className = '' }) => {
  const [failed, setFailed] = useState(false);

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
        className={`h-full w-full object-contain sepia-[0.22] saturate-[0.95] ${mirrorTransform}`}
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
      className={`pointer-events-none select-none mx-auto w-56 sm:w-72 object-contain sepia-[0.22] saturate-[0.95] floral-float ${className}`}
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
      className={`pointer-events-none select-none mx-auto w-64 sm:w-80 object-contain sepia-[0.22] saturate-[0.95] floral-float ${className}`}
    />
  );
};

export const MonogramSeal: React.FC<{ initials: string }> = ({ initials }) => (
  <div
    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#a98667]/55 bg-[#fffcf8] shadow-xs"
    aria-hidden="true"
  >
    <div className="flex h-13 w-13 items-center justify-center rounded-full border border-[#8c7060]/30">
      <span className="font-display text-lg font-semibold tracking-widest text-[#8c7060]">
        {initials}
      </span>
    </div>
  </div>
);
