import React, { useRef } from 'react';

let _c = 0;
function uid() { return ++_c; }

export function LogoMark({ size = 36, bg = 'white' }) {
  const id = useRef(uid()).current;
  return (
    <svg width={size} height={size} viewBox="200 130 280 140" aria-hidden="true">
      <defs>
        <clipPath id={`lt${id}`}><rect x="0" y="0" width="680" height="200" /></clipPath>
        <clipPath id={`lb${id}`}><rect x="0" y="200" width="680" height="400" /></clipPath>
      </defs>
      <g clipPath={`url(#lt${id})`}>
        <line x1="249" y1="120" x2="249" y2="280" stroke="#29ABE2" strokeWidth="22" strokeLinecap="round" />
        <line x1="431" y1="120" x2="431" y2="280" stroke="#29ABE2" strokeWidth="22" strokeLinecap="round" />
        <circle cx="340" cy="200" r="80" fill="none" stroke="#29ABE2" strokeWidth="22" />
        <rect x="235" y="120" width="28" height="160" fill={bg} />
        <line x1="249" y1="120" x2="249" y2="280" stroke="#29ABE2" strokeWidth="22" strokeLinecap="round" />
        <rect x="417" y="120" width="28" height="160" fill={bg} />
        <line x1="431" y1="120" x2="431" y2="280" stroke="#29ABE2" strokeWidth="22" strokeLinecap="round" />
      </g>
      <g clipPath={`url(#lb${id})`}>
        <line x1="249" y1="120" x2="249" y2="280" stroke="#0F3D6E" strokeWidth="22" strokeLinecap="round" />
        <line x1="431" y1="120" x2="431" y2="280" stroke="#0F3D6E" strokeWidth="22" strokeLinecap="round" />
        <circle cx="340" cy="200" r="80" fill="none" stroke="#0F3D6E" strokeWidth="22" />
        <rect x="235" y="120" width="28" height="160" fill={bg} />
        <line x1="249" y1="120" x2="249" y2="280" stroke="#0F3D6E" strokeWidth="22" strokeLinecap="round" />
        <rect x="417" y="120" width="28" height="160" fill={bg} />
        <line x1="431" y1="120" x2="431" y2="280" stroke="#0F3D6E" strokeWidth="22" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function LogoFavicon({ size = 24 }) {
  const id = useRef(uid()).current;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <clipPath id={`ft${id}`}><rect x="0" y="0" width="24" height="12" /></clipPath>
        <clipPath id={`fb${id}`}><rect x="0" y="12" width="24" height="12" /></clipPath>
      </defs>
      <g clipPath={`url(#ft${id})`}><circle cx="12" cy="12" r="11" fill="#29ABE2" /></g>
      <g clipPath={`url(#fb${id})`}><circle cx="12" cy="12" r="11" fill="#0F3D6E" /></g>
    </svg>
  );
}
