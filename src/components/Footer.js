import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/theme.css';

const DBLogo = () => (
  <svg width="26" height="26" viewBox="0 0 52 52" fill="none">
    <rect x="8" y="14" width="6" height="28" rx="1" fill="#2A5298"/>
    <rect x="38" y="14" width="6" height="28" rx="1" fill="#2A5298"/>
    <rect x="6" y="12" width="40" height="5" rx="1.5" fill="#1E3A5F"/>
    <path d="M14 17 Q26 30 38 17" stroke="#2A5298" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
  </svg>
);

function Footer() {
  return (
    <footer style={{ background: '#F8F7F3', borderTop: '1px solid rgba(30,58,95,0.1)', padding: '34px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <DBLogo />
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '13px', fontWeight: 500, letterSpacing: '0.5px', color: '#0D1F35' }}>
          DEEP<span style={{ color: '#2A5298' }}>BRIDGE</span>
        </span>
      </div>
      <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', margin: 0, padding: 0 }}>
        {[['/', 'Home'], ['/services', 'Services'], ['/contact', 'About'], ['/crm/login', 'Login']].map(([to, label]) => (
          <li key={to}><Link to={to} style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', color: '#9AABB8', textDecoration: 'none' }}>{label}</Link></li>
        ))}
      </ul>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '1px', color: '#9AABB8' }}>© 2026 Deep Bridge Ltd · Hong Kong</span>
    </footer>
  );
}

export default Footer;
