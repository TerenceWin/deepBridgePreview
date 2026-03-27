import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

function CTASection() {
  const navigate = useNavigate();
  return (
    <section style={{ background: '#EFF0F2', borderTop: '1px solid rgba(30,58,95,0.08)', padding: '88px 48px', textAlign: 'center' }}>
      <div className="db-section-tag" style={{ justifyContent: 'center' }}>Get Started</div>
      <h2 style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 400, color: '#0D1F35', maxWidth: '520px', margin: '0 auto 14px' }}>
        Trade runs better when it's <em style={{ color: '#2A5298' }}>structured.</em>
      </h2>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '15px', color: '#6B7A8A', fontWeight: 300, lineHeight: 1.8, maxWidth: '420px', margin: '0 auto 40px' }}>
        See how Deep Bridge works for export teams in Hong Kong and Southeast Asia. No setup fee. Onboarded in a week.
      </p>
      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="db-btn-primary" onClick={() => { navigate('/contact#waitlist-form'); setTimeout(() => { const el = document.getElementById('waitlist-form'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); }}>Request a Demo</button>
        <button className="db-btn-ghost" onClick={() => navigate('/contact')}>Talk to Sales</button>
      </div>
    </section>
  );
}

export default CTASection;
