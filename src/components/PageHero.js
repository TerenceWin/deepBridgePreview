import React from 'react';
import { useMaxWidth, useIsMobile, NAV_HEIGHT, SECTION_PAD } from './layout';

export default function PageHero({ label, title, subtitle, dark = false }) {
  const maxWidth = useMaxWidth();
  const isMobile = useIsMobile();
  const bg = dark ? '#0A2540' : 'white';
  const textColor = dark ? 'white' : '#0A2540';
  const subColor = dark ? 'rgba(255,255,255,0.6)' : '#5A6E85';
  const hPad = isMobile ? '10px' : SECTION_PAD.split(' ')[1];
  return (
    <div className="db-page-hero" style={{ background: bg, borderBottom: dark ? 'none' : '0.5px solid #E2DED6' }}>
      <div style={{ maxWidth: maxWidth, margin: '0 auto', padding: `${NAV_HEIGHT + (isMobile ? 120 : 64)}px ${hPad} ${isMobile ? 110 : 72}px` }}>
        <div style={{ fontSize: 11, letterSpacing: '2.5px', color: '#29ABE2', textTransform: 'uppercase', marginBottom: 20 }}>{label}</div>
        <h1 style={{ fontSize: 48, fontWeight: 500, color: textColor, lineHeight: 1.05, letterSpacing: '-0.04em', maxWidth: 600, marginBottom: subtitle ? 24 : 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 17, color: subColor, lineHeight: 1.8, maxWidth: 520 }}>{subtitle}</p>}
      </div>
    </div>
  );
}
