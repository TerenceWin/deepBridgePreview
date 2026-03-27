import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

function Hero() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', minHeight: '92vh', background: '#F8F7F3', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 48px 80px', overflow: 'hidden' }}>
      <div className="db-ledger" />

      {/* Stamp watermark */}
      <div style={{ position: 'absolute', top: '72px', right: '56px', width: '140px', height: '140px', border: '2px solid rgba(42,82,152,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-10deg)', opacity: 0.5, pointerEvents: 'none' }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '7px', letterSpacing: '2px', textTransform: 'uppercase', color: '#2A5298', textAlign: 'center', lineHeight: 2.2 }}>
          DEEP BRIDGE<br />TRADE OS<br />EST. MMXXV<br />HK · SG · SZ
        </div>
      </div>

      <div className="db-section-tag" style={{ position: 'relative', zIndex: 1 }}>Trade Operating System</div>

      <h1 style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: 'clamp(40px,5vw,68px)', fontWeight: 400, lineHeight: 1.1, color: '#0D1F35', maxWidth: '680px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
        Every deal. <em style={{ color: '#2A5298' }}>Structured,</em><br />
        tracked, and traceable.
      </h1>

      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '16px', fontWeight: 300, lineHeight: 1.8, color: '#6B7A8A', maxWidth: '480px', marginBottom: '40px', position: 'relative', zIndex: 1 }}>
        Deep Bridge replaces scattered emails, WhatsApp threads, and spreadsheets with a single agentic workflow layer — built for exporters who need speed, structure, and evidence at every step.
      </p>

      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        <button className="db-btn-primary" onClick={() => {
          navigate('/contact#waitlist-form');
          setTimeout(() => { const el = document.getElementById('waitlist-form'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
        }}>Request Demo</button>
        <button className="db-btn-ghost" onClick={() => navigate('/services')}>See How It Works</button>
      </div>
    </div>
  );
}

export default Hero;
