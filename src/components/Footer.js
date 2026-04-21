import React from 'react';
import { Link } from 'react-router-dom';
import { LogoFavicon } from './LogoMark';

const nav = [
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Partners', to: '/partner' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0A2540', color: 'white' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 48px 40px' }}>
        <div className="db-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <LogoFavicon size={28} />
              <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.3px' }}>Deep Bridge</span>
            </div>
            <div style={{ fontSize: 11, letterSpacing: '2px', color: '#29ABE2', textTransform: 'uppercase', marginBottom: 16 }}>Trade Operating System</div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 240 }}>Building tools for exporters and trading teams who want stronger systems behind the way they already work.</p>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 20 }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {nav.map(l => (<Link key={l.to} to={l.to} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>{l.label}</Link>))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 20 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="mailto:info@deep-bridge.com" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>info@deep-bridge.com</a>
              <a href="mailto:careers@deep-bridge.com" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>careers@deep-bridge.com</a>
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>Unit 1127, 11th Floor</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>Metro Centre 2</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>Kowloon Bay, Hong Kong</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>© 2025 Deep Bridge Limited. All rights reserved.</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Kowloon Bay, Hong Kong</span>
        </div>
      </div>
    </footer>
  );
}
