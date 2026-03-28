import { useState, useEffect, useRef } from 'react';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,300;0,9..144,400;1,9..144,200;1,9..144,300;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --navy: #080f17;
    --navy2: #0c1520;
    --blue: #1a5799;
    --sky: #4a90d9;
    --skylight: #6aaae8;
    --slate: #8ea8c3;
    --dim: rgba(255,255,255,0.42);
    --faint: rgba(255,255,255,0.16);
    --border: rgba(255,255,255,0.06);
    --borderhover: rgba(74,144,217,0.3);
  }

  body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--navy); color: #fff; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  /* NAV */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 60px; padding: 0 48px; display: flex; align-items: center; justify-content: space-between; transition: background 0.4s, border-color 0.4s; border-bottom: 1px solid transparent; }
  .nav.solid { background: rgba(8,15,23,0.94); backdrop-filter: blur(20px); border-bottom-color: var(--border); }
  .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .nav-wm { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 800; letter-spacing: -0.3px; color: #fff; }
  .nav-wm em { font-style: normal; color: var(--sky); }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a { font-size: 13px; font-weight: 500; color: var(--dim); text-decoration: none; transition: color 0.2s; }
  .nav-links a:hover { color: #fff; }
  .nav-right { display: flex; gap: 10px; align-items: center; }
  .btn { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 12px; padding: 8px 18px; border-radius: 7px; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; letter-spacing: -0.1px; transition: all 0.2s; }
  .btn-ghost { background: transparent; color: var(--dim); border: 1px solid var(--border); }
  .btn-ghost:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
  .btn-blue { background: var(--blue); color: #fff; }
  .btn-blue:hover { background: #1f68b5; box-shadow: 0 4px 24px rgba(74,144,217,0.25); transform: translateY(-1px); }
  .btn-blue-lg { font-size: 14px; padding: 13px 32px; border-radius: 9px; }
  .nav-hamburger { display: none; background: none; border: none; cursor: pointer; color: #fff; padding: 4px; }
  .mobile-menu { display: none; position: fixed; top: 60px; left: 0; right: 0; z-index: 199; background: var(--navy2); border-bottom: 1px solid var(--border); padding: 20px 24px 28px; flex-direction: column; gap: 2px; }
  .mobile-menu.open { display: flex; }
  .mobile-menu a { display: block; padding: 13px 0; font-size: 16px; font-weight: 500; color: var(--dim); text-decoration: none; border-bottom: 1px solid var(--border); transition: color 0.2s; }
  .mobile-menu a:hover { color: #fff; }
  @media (max-width: 780px) { .nav { padding: 0 24px; } .nav-links, .nav-right { display: none; } .nav-hamburger { display: flex; } }

  /* HERO */
  .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 120px 48px 80px; position: relative; overflow: hidden; }
  .hero-noise { position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events: none; z-index: 0; }
  .hero-glow { position: absolute; top: -200px; right: -200px; width: 700px; height: 700px; border-radius: 50%; background: radial-gradient(circle, rgba(26,87,153,0.18) 0%, transparent 65%); pointer-events: none; z-index: 0; }
  .hero-glow2 { position: absolute; bottom: -100px; left: -100px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(74,144,217,0.06) 0%, transparent 65%); pointer-events: none; z-index: 0; }
  .hero-arch { position: absolute; bottom: -60px; right: -40px; width: 55vw; max-width: 780px; opacity: 0.12; pointer-events: none; z-index: 0; }
  .hero-content { position: relative; z-index: 1; max-width: 860px; }
  .hero-eyebrow { display: flex; align-items: center; gap: 14px; margin-bottom: 36px; }
  .hero-eyebrow-line { width: 32px; height: 1px; background: var(--sky); flex-shrink: 0; }
  .hero-eyebrow-text { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 3.5px; text-transform: uppercase; color: var(--sky); }
  .hero-h1 { font-family: 'Fraunces', serif; font-weight: 200; font-size: clamp(56px, 8.5vw, 118px); letter-spacing: -3px; line-height: 0.95; color: #fff; margin-bottom: 40px; }
  .hero-h1 em { font-style: italic; color: var(--sky); font-weight: 300; }
  .hero-h1 .dim { color: rgba(255,255,255,0.35); }
  .hero-body { font-size: 17px; font-weight: 400; line-height: 1.75; color: var(--dim); max-width: 500px; margin-bottom: 48px; }
  .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 80px; }
  .hero-stats { display: flex; gap: 0; border-top: 1px solid var(--border); }
  .hero-stat { padding: 32px 48px 0 0; }
  .hero-stat:first-child { padding-left: 0; }
  .hero-stat + .hero-stat { padding-left: 48px; border-left: 1px solid var(--border); }
  .stat-num { font-family: 'Fraunces', serif; font-weight: 200; font-size: 48px; letter-spacing: -1.5px; color: #fff; line-height: 1; margin-bottom: 8px; }
  .stat-num em { font-style: normal; color: var(--sky); font-size: 0.65em; vertical-align: super; }
  .stat-label { font-size: 12px; color: var(--dim); line-height: 1.5; font-weight: 500; }
  .stat-sub { font-family: 'JetBrains Mono', monospace; font-size: 8.5px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--faint); margin-top: 4px; }
  @media (max-width: 780px) { .hero { padding: 110px 24px 64px; } .hero-h1 { font-size: clamp(48px, 12vw, 72px); letter-spacing: -2px; } .hero-stat { padding: 24px 28px 0 0; } .hero-stat + .hero-stat { padding-left: 28px; } .stat-num { font-size: 38px; } }

  /* DIVIDER STRIP */
  .strip { background: var(--blue); padding: 20px 48px; display: flex; align-items: center; gap: 48px; overflow: hidden; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(0,0,0,0.2); }
  .strip-item { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.6); white-space: nowrap; }
  .strip-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.3); flex-shrink: 0; }

  /* ABOUT */
  .about { padding: 120px 48px; background: var(--navy2); border-bottom: 1px solid var(--border); }
  .about-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: start; }
  .section-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--sky); display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
  .section-label::before { content: ''; display: block; width: 16px; height: 1px; background: var(--sky); }
  .section-h2 { font-family: 'Fraunces', serif; font-weight: 300; font-size: clamp(34px, 4vw, 54px); letter-spacing: -0.8px; line-height: 1.08; color: #fff; }
  .section-h2 em { font-style: italic; color: var(--sky); }
  .about-right { padding-top: 56px; }
  .about-lead { font-size: 15px; line-height: 1.8; color: var(--dim); margin-bottom: 36px; }
  .about-points { display: flex; flex-direction: column; gap: 16px; }
  .about-point { display: flex; gap: 16px; align-items: flex-start; }
  .about-point-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sky); flex-shrink: 0; margin-top: 8px; }
  .about-point-text { font-size: 14px; line-height: 1.65; color: var(--dim); }
  @media (max-width: 780px) { .about { padding: 80px 24px; } .about-inner { grid-template-columns: 1fr; gap: 40px; } .about-right { padding-top: 0; } }

  /* CAPABILITIES */
  .caps { padding: 120px 48px; background: var(--navy); }
  .caps-inner { max-width: 1100px; margin: 0 auto; }
  .caps-header { margin-bottom: 72px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: end; }
  .caps-header-sub { font-size: 14px; line-height: 1.75; color: var(--dim); }
  .caps-list { display: flex; flex-direction: column; }
  .cap-row { display: grid; grid-template-columns: 64px 1fr 1fr auto; gap: 48px; align-items: start; padding: 40px 0; border-top: 1px solid var(--border); transition: border-color 0.25s; position: relative; }
  .cap-row:last-child { border-bottom: 1px solid var(--border); }
  .cap-row:hover { border-top-color: rgba(74,144,217,0.2); }
  .cap-row:hover .cap-num { color: var(--sky); }
  .cap-num { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 1.5px; color: var(--faint); padding-top: 4px; transition: color 0.2s; }
  .cap-icon-wrap { width: 44px; height: 44px; border-radius: 10px; background: rgba(74,144,217,0.08); border: 1px solid rgba(74,144,217,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .cap-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -0.2px; }
  .cap-body { font-size: 13px; line-height: 1.7; color: var(--dim); margin-top: 10px; }
  .cap-tag { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--faint); margin-top: 12px; }
  .cap-body-col { }
  .cap-label-col { font-size: 13px; line-height: 1.7; color: rgba(255,255,255,0.28); font-style: italic; font-family: 'Fraunces', serif; font-weight: 300; padding-top: 4px; min-width: 160px; }
  @media (max-width: 900px) { .caps { padding: 80px 24px; } .caps-header { grid-template-columns: 1fr; gap: 20px; } .cap-row { grid-template-columns: 40px 1fr; gap: 20px; } .cap-label-col { display: none; } }

  /* METRICS */
  .metrics { background: #0a1929; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 100px 48px; position: relative; overflow: hidden; }
  .metrics-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(26,87,153,0.15) 0%, transparent 65%); pointer-events: none; }
  .metrics-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
  .metrics-top { margin-bottom: 72px; max-width: 580px; }
  .metrics-h2 { font-family: 'Fraunces', serif; font-weight: 200; font-size: clamp(36px, 5vw, 62px); letter-spacing: -1.5px; line-height: 1.0; color: #fff; }
  .metrics-h2 em { font-style: italic; color: var(--sky); }
  .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
  .metric-cell { background: var(--navy); padding: 48px 40px; }
  .metric-num { font-family: 'Fraunces', serif; font-weight: 200; font-size: 64px; letter-spacing: -2px; color: #fff; line-height: 1; margin-bottom: 12px; }
  .metric-num em { font-style: normal; color: var(--sky); font-size: 0.5em; vertical-align: super; }
  .metric-label { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.8); margin-bottom: 8px; }
  .metric-sub { font-size: 12px; color: var(--dim); line-height: 1.6; }
  @media (max-width: 780px) { .metrics { padding: 72px 24px; } .metrics-grid { grid-template-columns: 1fr; } .metric-num { font-size: 52px; } }

  /* VISION */
  .vision { padding: 140px 48px; background: var(--navy2); }
  .vision-inner { max-width: 1100px; margin: 0 auto; }
  .vision-quote { font-family: 'Fraunces', serif; font-weight: 200; font-style: italic; font-size: clamp(28px, 4vw, 52px); letter-spacing: -1px; line-height: 1.15; color: rgba(255,255,255,0.75); max-width: 840px; margin: 40px 0 80px; padding-left: 32px; border-left: 2px solid var(--sky); }
  .vision-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
  .pillar { background: var(--navy); padding: 36px 32px; transition: background 0.25s; }
  .pillar:hover { background: rgba(26,87,153,0.07); }
  .pillar-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 10px; letter-spacing: -0.1px; }
  .pillar-body { font-size: 13px; line-height: 1.7; color: var(--dim); }
  @media (max-width: 780px) { .vision { padding: 80px 24px; } .vision-pillars { grid-template-columns: 1fr; } .vision-quote { font-size: clamp(22px, 6vw, 34px); padding-left: 20px; } }

  /* CTA */
  .cta { padding: 160px 48px; background: var(--navy); position: relative; overflow: hidden; text-align: center; }
  .cta-ring1 { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 500px; height: 500px; border-radius: 50%; border: 1px solid rgba(74,144,217,0.08); pointer-events: none; }
  .cta-ring2 { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 320px; height: 320px; border-radius: 50%; border: 1px solid rgba(74,144,217,0.12); pointer-events: none; }
  .cta-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 600px; height: 300px; background: radial-gradient(ellipse, rgba(26,87,153,0.14) 0%, transparent 70%); pointer-events: none; }
  .cta-inner { position: relative; z-index: 1; }
  .cta-h2 { font-family: 'Fraunces', serif; font-weight: 200; font-size: clamp(44px, 7vw, 88px); letter-spacing: -2px; line-height: 0.95; color: #fff; margin-bottom: 24px; }
  .cta-h2 em { font-style: italic; color: var(--sky); }
  .cta-sub { font-size: 16px; color: var(--dim); line-height: 1.7; margin-bottom: 52px; max-width: 440px; margin-left: auto; margin-right: auto; }
  .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .cta-meta { margin-top: 36px; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--faint); }
  @media (max-width: 780px) { .cta { padding: 100px 24px; } }

  /* FOOTER */
  .footer { background: var(--navy2); border-top: 1px solid var(--border); padding: 64px 48px 40px; }
  .footer-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 64px; margin-bottom: 64px; }
  .footer-brand-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .footer-wm { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 800; letter-spacing: -0.3px; color: #fff; }
  .footer-wm em { font-style: normal; color: var(--sky); }
  .footer-tagline { font-size: 13px; color: var(--dim); line-height: 1.7; max-width: 280px; margin-bottom: 20px; }
  .footer-mono { font-family: 'JetBrains Mono', monospace; font-size: 8.5px; letter-spacing: 2px; text-transform: uppercase; color: var(--faint); }
  .footer-col-title { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--faint); margin-bottom: 18px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .footer-links a { font-size: 13px; color: var(--dim); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: #fff; }
  .footer-bottom { border-top: 1px solid var(--border); padding-top: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .footer-copy { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--faint); }
  @media (max-width: 780px) { .footer { padding: 48px 24px 32px; } .footer-inner { grid-template-columns: 1fr; gap: 40px; } }

  /* ANIMATIONS */
  @keyframes fadeUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
  .fade-up { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.22s; }
  .delay-3 { animation-delay: 0.34s; }
  .delay-4 { animation-delay: 0.46s; }
  .delay-5 { animation-delay: 0.58s; }
`;

// ── SVG COMPONENTS ──
const LogoSVG = ({ size = 34 }) => (
  <svg width={size} height={Math.round(size * 0.67)} viewBox="0 0 72 48" fill="none">
    <path d="M8 44 Q18 36 28 44" stroke="rgba(142,168,195,0.28)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <path d="M14 44 Q26 24 38 44" stroke="rgba(74,144,217,0.5)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M22 44 Q36 6 50 44" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    <circle cx="36" cy="8" r="3" fill="#4A90D9"/>
    <circle cx="36" cy="8" r="1.4" fill="#fff"/>
  </svg>
);

const HeroArch = () => (
  <svg className="hero-arch" viewBox="0 0 780 620" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 600 Q240 60 420 600" stroke="#4A90D9" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M160 600 Q340 20 520 600" stroke="#4A90D9" strokeWidth="0.8" strokeLinecap="round" fill="none"/>
    <path d="M260 600 Q440 80 620 600" stroke="#4A90D9" strokeWidth="0.5" strokeLinecap="round" fill="none"/>
    <path d="M-40 600 Q140 100 320 600" stroke="#4A90D9" strokeWidth="0.4" strokeLinecap="round" fill="none"/>
    <circle cx="240" cy="60" r="5" fill="#4A90D9"/>
    <circle cx="240" cy="60" r="2" fill="#fff"/>
    <circle cx="340" cy="20" r="4" fill="#4A90D9"/>
    <circle cx="340" cy="20" r="1.5" fill="#fff"/>
    <circle cx="440" cy="80" r="3" fill="#4A90D9"/>
  </svg>
);

const IconDoc = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="3" width="11" height="15" rx="1.5" fill="rgba(74,144,217,0.3)"/>
    <path d="M16 3L19 6H16Z" fill="#4A90D9"/>
    <line x1="8" y1="9" x2="14" y2="9" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="8" y1="12" x2="14" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="8" y1="15" x2="11" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IconFlow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="5" cy="12" r="2.5" fill="#4A90D9"/>
    <circle cx="12" cy="12" r="2.5" fill="rgba(74,144,217,0.6)"/>
    <circle cx="19" cy="12" r="2.5" fill="rgba(142,168,195,0.5)"/>
    <line x1="7.5" y1="12" x2="9.5" y2="12" stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14.5" y1="12" x2="16.5" y2="12" stroke="rgba(142,168,195,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15.5 9L19 12L15.5 15" stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);
const IconChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 18L8 12L12 15L17 8L21 10L21 18Z" fill="rgba(74,144,217,0.2)"/>
    <polyline points="3,18 8,12 12,15 17,8 21,10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="21" cy="10" r="2" fill="#4A90D9"/>
  </svg>
);
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L20 7L20 13C20 17 16 20.5 12 21C8 20.5 4 17 4 13L4 7Z" fill="rgba(74,144,217,0.2)" stroke="#4A90D9" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="rgba(74,144,217,0.15)" stroke="#4A90D9" strokeWidth="1.2"/>
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <line x1="3" y1="9" x2="21" y2="9" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <line x1="3" y1="15" x2="21" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
  </svg>
);
const IconQuote = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="1.5" fill="rgba(74,144,217,0.15)"/>
    <rect x="3" y="4" width="18" height="5" rx="1.5" fill="#4A90D9"/>
    <line x1="7" y1="14" x2="13" y2="14" stroke="rgba(142,168,195,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M14 13L17 11.5L17 15.5L14 14" fill="rgba(255,255,255,0.6)"/>
  </svg>
);
const MenuIcon = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="3" y1="6" x2="19" y2="6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="11" x2="19" y2="11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="16" x2="19" y2="16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const CloseIcon = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="5" y1="5" x2="17" y2="17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><line x1="17" y1="5" x2="5" y2="17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>;

// ── DATA ──
const CAPS = [
  { icon: <IconDoc/>, num:'01', title:'AI Document Processing', body:'Reads inbound emails, extracts requirements, cross-references product databases, and flags discrepancies before a human touches it.', tag:'Extract · Verify · Log', label:'Inbox to structured data' },
  { icon: <IconFlow/>, num:'02', title:'Agentic Deal Workflows', body:'Automated pipelines that follow up, remind, escalate, and route — with human approval gates at every critical decision point.', tag:'Automate · Approve · Audit', label:'Deals that move themselves' },
  { icon: <IconChart/>, num:'03', title:'Trade Intelligence', body:'Observes deal patterns across your pipeline. Identifies where cycles stall, which customers convert, and which categories lose margin.', tag:'Analyse · Improve · Predict', label:'Signal from the noise' },
  { icon: <IconShield/>, num:'04', title:'Evidence-First Audit Trail', body:'Every data point, decision, and approval links back to its source — email, document, or upload. Nothing without provenance.', tag:'Source · Trace · Defend', label:'Every action, traceable' },
  { icon: <IconGlobe/>, num:'05', title:'Multi-Market Execution', body:'Multi-currency, multi-language, multi-brand operations from one system. Built for HK, SEA, and China-origin trade flows.', tag:'HKD · USD · RMB · SGD', label:'One system, every market' },
  { icon: <IconQuote/>, num:'06', title:'Quotation & Order Engine', body:'Generates structured quotations from extracted requirements, tracks versions, and links to the final order so spec changes are never lost.', tag:'Generate · Version · Link', label:'From RFQ to PO, automatically' },
];

// ── APP ──
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const styleRef = useRef(null);

  useEffect(() => {
    if (!styleRef.current) {
      const el = document.createElement('style');
      el.textContent = STYLES;
      document.head.appendChild(el);
      styleRef.current = el;
    }
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className={`nav${scrolled ? ' solid' : ''}`}>
        <a href="#top" className="nav-logo">
          <LogoSVG size={30}/>
          <div className="nav-wm">Deep<em>Bridge</em></div>
        </a>
        <ul className="nav-links">
          <li><a href="#caps">Capabilities</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#vision">Vision</a></li>
        </ul>
        <div className="nav-right">
          <a href="#" className="btn btn-ghost">Login</a>
          <a href="#cta" className="btn btn-blue">Request Demo</a>
        </div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? <CloseIcon/> : <MenuIcon/>}
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <a href="#caps" onClick={() => setMenuOpen(false)}>Capabilities</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#vision" onClick={() => setMenuOpen(false)}>Vision</a>
        <a href="#cta" onClick={() => setMenuOpen(false)} style={{color:'#4a90d9'}}>Request Demo →</a>
      </div>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="hero-noise"/>
        <div className="hero-glow"/>
        <div className="hero-glow2"/>
        <HeroArch/>
        <div className="hero-content">
          <div className="hero-eyebrow fade-up">
            <div className="hero-eyebrow-line"/>
            <div className="hero-eyebrow-text">Trade Operating System · HK · SG · SZ</div>
          </div>
          <h1 className="hero-h1 fade-up delay-1">
            Every deal.<br/>
            <em>Structured,</em><br/>
            <span className="dim">tracked, traceable.</span>
          </h1>
          <p className="hero-body fade-up delay-2">
            Deep Bridge replaces scattered emails, WhatsApp threads, and spreadsheets with a single agentic workflow layer — built for exporters who need speed, structure, and evidence at every step.
          </p>
          <div className="hero-ctas fade-up delay-3">
            <a href="#cta" className="btn btn-blue btn-blue-lg">Request Demo →</a>
            <a href="#caps" className="btn btn-ghost btn-blue-lg" style={{fontSize:14,padding:'13px 32px',borderRadius:9}}>See Capabilities</a>
          </div>
          <div className="hero-stats fade-up delay-4">
            <div className="hero-stat">
              <div className="stat-num">95<em>%</em></div>
              <div className="stat-label">Less manual quoting</div>
              <div className="stat-sub">AI draft on every RFQ</div>
            </div>
            <div className="hero-stat">
              <div className="stat-num">20<em>h</em></div>
              <div className="stat-label">Saved per rep, per week</div>
              <div className="stat-sub">Email + WhatsApp offloaded</div>
            </div>
            <div className="hero-stat">
              <div className="stat-num">24<em>/7</em></div>
              <div className="stat-label">Buyer coverage</div>
              <div className="stat-sub">AI handles enquiries round the clock</div>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <div className="strip">
        {['AI Document Processing','Agentic Workflows','Trade Intelligence','Audit Trail','Multi-Market','Quotation Engine'].map((s,i) => (
          <>
            {i>0 && <div className="strip-dot" key={'d'+i}/>}
            <div className="strip-item" key={s}>{s}</div>
          </>
        ))}
      </div>

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="about-inner">
          <div>
            <div className="section-label">Built by exporters</div>
            <h2 className="section-h2">The assistant we<br/><em>wished we had.</em></h2>
          </div>
          <div className="about-right">
            <p className="about-lead">We understand these challenges because we've been there — running a traditional trading business, juggling RFQs, quotations, and buyer messages across email, WhatsApp, and WeChat.</p>
            <div className="about-points">
              <div className="about-point"><div className="about-point-dot"/><div className="about-point-text">Automate frontline customer interactions with AI agents that respond, qualify, and follow up</div></div>
              <div className="about-point"><div className="about-point-dot"/><div className="about-point-text">Keep quotations and follow-ups organised, versioned, and linked to every source document</div></div>
              <div className="about-point"><div className="about-point-dot"/><div className="about-point-text">Get real-time visibility into every deal's status, age, and next action — without chasing your team</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="caps" className="caps">
        <div className="caps-inner">
          <div className="caps-header">
            <div>
              <div className="section-label">Core Capabilities</div>
              <h2 className="section-h2">Built for the<br/><em>full trade cycle.</em></h2>
            </div>
            <div className="caps-header-sub">Every stage of the deal — from first inquiry to final shipment — tracked, structured, and auditable in one system. No bolt-ons. No integrations. One layer.</div>
          </div>
          <div className="caps-list">
            {CAPS.map(cap => (
              <div key={cap.num} className="cap-row">
                <div className="cap-num">{cap.num}</div>
                <div className="cap-icon-wrap">{cap.icon}</div>
                <div className="cap-body-col">
                  <div className="cap-title">{cap.title}</div>
                  <div className="cap-body">{cap.body}</div>
                  <div className="cap-tag">{cap.tag}</div>
                </div>
                <div className="cap-label-col">{cap.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="metrics">
        <div className="metrics-glow"/>
        <div className="metrics-inner">
          <div className="metrics-top">
            <div className="section-label">By the numbers</div>
            <h2 className="metrics-h2">Results that<br/><em>show up</em><br/>immediately.</h2>
          </div>
          <div className="metrics-grid">
            <div className="metric-cell">
              <div className="metric-num">95<em>%</em></div>
              <div className="metric-label">Less manual quoting</div>
              <div className="metric-sub">AI prepares drafts using your products, prices, and templates. Your team reviews — not writes.</div>
            </div>
            <div className="metric-cell">
              <div className="metric-num">20<em>h</em></div>
              <div className="metric-label">Saved each week</div>
              <div className="metric-sub">Per rep, by offloading repetitive email and WhatsApp replies to the AI agent.</div>
            </div>
            <div className="metric-cell">
              <div className="metric-num">24<em>/7</em></div>
              <div className="metric-label">Buyer coverage</div>
              <div className="metric-sub">AI assistant available for buyer enquiries even outside office hours, across all time zones.</div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" className="vision">
        <div className="vision-inner">
          <div className="section-label">Our Vision</div>
          <blockquote className="vision-quote">
            Empowering traditional businesses with AI-driven efficiency — bridging the gap between legacy trade operations and the speed the market now demands.
          </blockquote>
          <div className="vision-pillars">
            <div className="pillar">
              <div className="pillar-title">AI Without Complexity</div>
              <div className="pillar-body">We deliver AI solutions that require no technical expertise, making adoption seamless for traditional trade teams.</div>
            </div>
            <div className="pillar">
              <div className="pillar-title">Faster Decision-Making</div>
              <div className="pillar-body">We optimise workflows, automate interactions, and surface predictive insights so deal teams stay ahead of every cycle.</div>
            </div>
            <div className="pillar">
              <div className="pillar-title">Competitive Edge</div>
              <div className="pillar-body">Businesses that adopt Deep Bridge operate smarter, scale faster, and close more deals — without adding headcount.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="cta">
        <div className="cta-ring1"/>
        <div className="cta-ring2"/>
        <div className="cta-glow"/>
        <div className="cta-inner">
          <div className="section-label" style={{justifyContent:'center', marginBottom:24}}>Get started</div>
          <h2 className="cta-h2">Ready to see it<br/><em>in action?</em></h2>
          <p className="cta-sub">Book a demo. We'll show you how Deep Bridge fits into your current workflow — no migration, no complexity, no 6-month onboarding.</p>
          <div className="cta-btns">
            <a href="mailto:hello@deepbridge.io" className="btn btn-blue btn-blue-lg">Request Demo →</a>
            <a href="#caps" className="btn btn-ghost btn-blue-lg">See Capabilities</a>
          </div>
          <div className="cta-meta">Est. MMXXV · Hong Kong · Singapore · Shenzhen</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand-logo">
              <LogoSVG size={26}/>
              <div className="footer-wm">Deep<em>Bridge</em></div>
            </div>
            <p className="footer-tagline">A single agentic workflow layer for exporters who need speed, structure, and evidence at every step of the deal.</p>
            <div className="footer-mono">Trade Operating System</div>
          </div>
          <div>
            <div className="footer-col-title">Product</div>
            <ul className="footer-links">
              <li><a href="#caps">Capabilities</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#cta">Request Demo</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><a href="#vision">Vision</a></li>
              <li><a href="#">Login</a></li>
              <li><a href="mailto:hello@deepbridge.io">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Deep Bridge Ltd · Hong Kong · Confidential</div>
          <div className="footer-copy">HK · SG · SZ · Est. MMXXV</div>
        </div>
      </footer>
    </>
  );
}
