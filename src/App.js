import { useState, useEffect, useRef } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,300;0,9..144,400;1,9..144,200;1,9..144,300;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --cream: #F7F5F1;
  --cream2: #EFECE6;
  --navy: #080e17;
  --navy2: #0d1a2a;
  --blue: #1a5799;
  --sky: #4a90d9;
  --muted: rgba(8,14,23,0.45);
  --faint: rgba(8,14,23,0.2);
  --border: rgba(8,14,23,0.1);
  --borderblue: rgba(26,87,153,0.2);
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--cream);
  color: var(--navy);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  height: 58px; padding: 0 48px;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(247,245,241,0);
  transition: background 0.4s, border-color 0.4s;
  border-bottom: 1px solid transparent;
}
.nav.solid {
  background: rgba(247,245,241,0.96);
  backdrop-filter: blur(20px);
  border-bottom-color: var(--border);
}
.nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.nav-wm { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 800; letter-spacing: -0.3px; color: var(--navy); }
.nav-wm em { font-style: normal; color: var(--blue); }
.nav-links { display: flex; gap: 36px; list-style: none; }
.nav-links a { font-size: 13px; font-weight: 500; color: var(--muted); text-decoration: none; transition: color 0.2s; }
.nav-links a:hover { color: var(--navy); }
.nav-right { display: flex; gap: 10px; align-items: center; }
.btn { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 12px; padding: 8px 18px; border-radius: 7px; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; transition: all 0.18s; }
.btn-outline { background: transparent; color: var(--navy); border: 1.5px solid var(--border); }
.btn-outline:hover { border-color: rgba(8,14,23,0.3); }
.btn-navy { background: var(--navy); color: #fff; }
.btn-navy:hover { background: var(--navy2); box-shadow: 0 4px 20px rgba(8,14,23,0.2); transform: translateY(-1px); }
.btn-blue { background: var(--blue); color: #fff; }
.btn-blue:hover { background: #1f68b5; box-shadow: 0 4px 20px rgba(26,87,153,0.3); transform: translateY(-1px); }
.btn-lg { font-size: 14px; padding: 13px 30px; border-radius: 9px; }
.nav-burger { display: none; background: none; border: none; cursor: pointer; padding: 4px; color: var(--navy); }
.mobile-menu { display: none; position: fixed; top: 58px; left: 0; right: 0; z-index: 199; background: var(--cream); border-bottom: 1px solid var(--border); padding: 16px 24px 24px; flex-direction: column; gap: 0; }
.mobile-menu.open { display: flex; }
.mobile-menu a { display: block; padding: 14px 0; font-size: 15px; font-weight: 500; color: var(--muted); text-decoration: none; border-bottom: 1px solid var(--border); transition: color 0.2s; }
.mobile-menu a:last-child { border-bottom: none; }
.mobile-menu a:hover { color: var(--navy); }
@media(max-width:780px){ .nav{padding:0 20px;} .nav-links,.nav-right{display:none;} .nav-burger{display:flex;} }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  padding: 0 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  gap: 0;
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}
.hero-left {
  padding: 160px 80px 80px 0;
  border-right: 1px solid var(--border);
  position: relative; z-index: 1;
}
.hero-right {
  padding: 160px 0 80px 80px;
  display: flex; flex-direction: column; justify-content: flex-end;
  position: relative; z-index: 1;
}
.hero-eyebrow {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 32px;
  opacity: 0; animation: fadeUp 0.7s 0.05s cubic-bezier(0.16,1,0.3,1) forwards;
}
.eyebrow-line { width: 24px; height: 1px; background: var(--blue); flex-shrink: 0; }
.eyebrow-text { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 3px; text-transform: uppercase; color: var(--blue); }
.hero-h1 {
  font-family: 'Fraunces', serif;
  font-weight: 200;
  font-size: clamp(62px, 7.5vw, 110px);
  letter-spacing: -3.5px;
  line-height: 0.92;
  color: var(--navy);
  margin-bottom: 0;
  opacity: 0; animation: fadeUp 0.8s 0.12s cubic-bezier(0.16,1,0.3,1) forwards;
}
.hero-h1 em { font-style: italic; color: var(--blue); }
.hero-h1 .ghost { color: var(--cream2); -webkit-text-stroke: 1.5px rgba(8,14,23,0.15); }
.hero-divider {
  width: 100%; height: 1px; background: var(--border);
  margin: 40px 0;
  opacity: 0; animation: fadeUp 0.7s 0.22s cubic-bezier(0.16,1,0.3,1) forwards;
}
.hero-sub {
  font-size: 15px; font-weight: 400; line-height: 1.75;
  color: var(--muted);
  max-width: 380px;
  margin-bottom: 36px;
  opacity: 0; animation: fadeUp 0.7s 0.28s cubic-bezier(0.16,1,0.3,1) forwards;
}
.hero-ctas {
  display: flex; gap: 10px;
  opacity: 0; animation: fadeUp 0.7s 0.36s cubic-bezier(0.16,1,0.3,1) forwards;
}
.hero-arch {
  position: absolute; bottom: -80px; right: -60px;
  width: 52%;
  opacity: 1;
  pointer-events: none; z-index: 0;
}
.hero-stats-col {
  display: flex; flex-direction: column; gap: 0;
  opacity: 0; animation: fadeUp 0.7s 0.2s cubic-bezier(0.16,1,0.3,1) forwards;
}
.hero-stat-row {
  display: flex; flex-direction: column;
  padding: 36px 0;
  border-bottom: 1px solid var(--border);
}
.hero-stat-row:last-child { border-bottom: none; padding-bottom: 0; }
.stat-num {
  font-family: 'Fraunces', serif;
  font-weight: 200; font-size: 56px; letter-spacing: -2px; line-height: 1;
  color: var(--navy); margin-bottom: 8px;
}
.stat-num sup { font-size: 0.45em; color: var(--blue); vertical-align: super; letter-spacing: 0; }
.stat-label { font-size: 13px; font-weight: 600; color: var(--navy); margin-bottom: 4px; }
.stat-sub { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--faint); }
.hero-right-bottom {
  margin-top: 56px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--faint);
  opacity: 0; animation: fadeUp 0.7s 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
}
@media(max-width:900px){
  .hero { grid-template-columns: 1fr; padding: 0 20px; min-height: auto; }
  .hero-left { padding: 120px 0 40px; border-right: none; border-bottom: 1px solid var(--border); }
  .hero-right { padding: 40px 0 60px; }
  .hero-h1 { font-size: clamp(52px, 12vw, 80px); letter-spacing: -2.5px; }
  .hero-arch { display: none; }
}

/* ── MARQUEE ── */
.marquee-wrap {
  background: var(--navy); overflow: hidden;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.marquee-track {
  display: flex; gap: 0;
  animation: marquee 28s linear infinite;
  width: max-content;
}
.marquee-item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  padding: 0 48px;
  white-space: nowrap;
  display: flex; align-items: center; gap: 48px;
}
.marquee-item::after { content: '·'; color: rgba(255,255,255,0.15); }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ── SECTION COMMONS ── */
.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--blue);
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 20px;
}
.section-label::before { content: ''; display: block; width: 16px; height: 1px; background: var(--blue); }
.section-h2 {
  font-family: 'Fraunces', serif;
  font-weight: 300; letter-spacing: -0.8px; line-height: 1.08;
  color: var(--navy);
}
.section-h2 em { font-style: italic; color: var(--blue); }

/* ── ABOUT ── */
.about {
  display: grid; grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--border);
}
.about-left {
  padding: 100px 80px 100px 48px;
  border-right: 1px solid var(--border);
  background: var(--cream);
}
.about-right {
  padding: 100px 48px 100px 80px;
  background: var(--cream2);
}
.about-h2 { font-size: clamp(32px, 3.5vw, 50px); margin-bottom: 32px; }
.about-body { font-size: 15px; line-height: 1.8; color: var(--muted); margin-bottom: 28px; }
.about-point { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 18px; }
.about-point-icon {
  width: 24px; height: 24px; border-radius: 6px;
  background: rgba(26,87,153,0.1); border: 1px solid var(--borderblue);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}
.about-point-text { font-size: 13px; line-height: 1.65; color: var(--muted); }
@media(max-width:900px){
  .about { grid-template-columns: 1fr; }
  .about-left { padding: 64px 20px; border-right: none; border-bottom: 1px solid var(--border); }
  .about-right { padding: 56px 20px; }
}

/* ── CAPABILITIES ── */
.caps { border-bottom: 1px solid var(--border); }
.caps-top {
  padding: 100px 48px 64px;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: end;
  border-bottom: 1px solid var(--border);
}
.caps-top-h2 { font-size: clamp(34px, 4vw, 54px); }
.caps-top-right { font-size: 14px; line-height: 1.8; color: var(--muted); }
.caps-table { display: flex; flex-direction: column; }
.cap-row {
  display: grid;
  grid-template-columns: 64px 52px 1fr 1fr 160px;
  gap: 32px;
  align-items: start;
  padding: 36px 48px;
  border-bottom: 1px solid var(--border);
  transition: background 0.2s;
  cursor: default;
}
.cap-row:hover { background: var(--cream2); }
.cap-num { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 1px; color: var(--faint); padding-top: 2px; }
.cap-icon-box {
  width: 40px; height: 40px; border-radius: 9px;
  background: rgba(26,87,153,0.08);
  border: 1px solid var(--borderblue);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.cap-title { font-size: 14px; font-weight: 700; color: var(--navy); letter-spacing: -0.2px; line-height: 1.3; }
.cap-body { font-size: 12.5px; line-height: 1.7; color: var(--muted); margin-top: 6px; }
.cap-right { }
.cap-tag { font-family: 'JetBrains Mono', monospace; font-size: 8.5px; letter-spacing: 2px; text-transform: uppercase; color: var(--faint); margin-top: 6px; }
.cap-label { font-family: 'Fraunces', serif; font-weight: 300; font-style: italic; font-size: 14px; color: var(--muted); line-height: 1.4; }
@media(max-width:900px){
  .caps-top { grid-template-columns: 1fr; padding: 60px 20px 40px; gap: 20px; }
  .cap-row { grid-template-columns: 40px 1fr; gap: 16px; padding: 28px 20px; }
  .cap-right, .cap-label { display: none; }
}

/* ── METRICS ── */
.metrics {
  background: var(--navy);
  display: grid; grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.metric-cell {
  padding: 80px 56px;
  border-right: 1px solid rgba(255,255,255,0.06);
  position: relative; overflow: hidden;
}
.metric-cell:last-child { border-right: none; }
.metric-cell::before {
  content: ''; position: absolute;
  top: -60px; right: -60px;
  width: 200px; height: 200px; border-radius: 50%;
  background: radial-gradient(circle, rgba(74,144,217,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.metric-num {
  font-family: 'Fraunces', serif;
  font-weight: 200; font-size: 72px; letter-spacing: -3px; line-height: 1;
  color: #fff; margin-bottom: 16px;
}
.metric-num sup { font-size: 0.42em; color: var(--sky); vertical-align: super; letter-spacing: 0; font-weight: 300; }
.metric-label { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.85); margin-bottom: 10px; }
.metric-sub { font-size: 12.5px; line-height: 1.65; color: rgba(255,255,255,0.4); }
@media(max-width:780px){
  .metrics { grid-template-columns: 1fr; }
  .metric-cell { padding: 56px 20px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .metric-num { font-size: 56px; }
}

/* ── VISION ── */
.vision {
  padding: 120px 48px;
  border-bottom: 1px solid var(--border);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 100px;
  align-items: start;
}
.vision-left {}
.vision-quote {
  font-family: 'Fraunces', serif;
  font-weight: 200; font-style: italic;
  font-size: clamp(26px, 3.2vw, 46px);
  letter-spacing: -1px; line-height: 1.2;
  color: var(--navy);
  border-left: 2px solid var(--blue);
  padding-left: 32px;
  margin: 32px 0 56px;
}
.vision-pillars { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
.pillar { background: var(--cream); padding: 32px 28px; transition: background 0.2s; }
.pillar:hover { background: var(--cream2); }
.pillar-num { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--blue); margin-bottom: 14px; }
.pillar-title { font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
.pillar-body { font-size: 12px; line-height: 1.7; color: var(--muted); }
@media(max-width:900px){
  .vision { grid-template-columns: 1fr; gap: 40px; padding: 72px 20px; }
  .vision-pillars { grid-template-columns: 1fr; }
  .vision-quote { font-size: clamp(22px,6vw,34px); padding-left: 20px; }
}

/* ── CTA ── */
.cta {
  background: var(--navy2);
  padding: 140px 48px;
  text-align: center;
  position: relative; overflow: hidden;
}
.cta-arch {
  position: absolute; bottom: -100px; left: 50%; transform: translateX(-50%);
  width: 900px; opacity: 0.06; pointer-events: none;
}
.cta-inner { position: relative; z-index: 1; }
.cta-h2 {
  font-family: 'Fraunces', serif;
  font-weight: 200; font-size: clamp(48px, 7vw, 96px);
  letter-spacing: -3px; line-height: 0.93;
  color: #fff; margin-bottom: 24px;
}
.cta-h2 em { font-style: italic; color: var(--sky); }
.cta-sub { font-size: 15px; color: rgba(255,255,255,0.45); line-height: 1.75; margin-bottom: 52px; max-width: 420px; margin-left: auto; margin-right: auto; }
.cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn-cream { background: var(--cream); color: var(--navy); }
.btn-cream:hover { background: #fff; transform: translateY(-1px); }
.btn-ghost-light { background: transparent; color: rgba(255,255,255,0.5); border: 1.5px solid rgba(255,255,255,0.12); }
.btn-ghost-light:hover { color: #fff; border-color: rgba(255,255,255,0.25); }
.cta-meta { margin-top: 36px; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255,255,255,0.2); }
@media(max-width:780px){ .cta { padding: 96px 20px; } }

/* ── FOOTER ── */
.footer {
  background: var(--navy);
  padding: 64px 48px 40px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.footer-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 2fr 1fr 1fr;
  gap: 64px; margin-bottom: 56px;
}
.footer-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.footer-wm { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 800; letter-spacing: -0.3px; color: #fff; }
.footer-wm em { font-style: normal; color: var(--sky); }
.footer-tagline { font-size: 13px; color: rgba(255,255,255,0.38); line-height: 1.7; max-width: 260px; margin-bottom: 20px; }
.footer-mono { font-family: 'JetBrains Mono', monospace; font-size: 8.5px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.18); }
.footer-col-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.2); margin-bottom: 18px; }
.footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.footer-links a { font-size: 13px; color: rgba(255,255,255,0.38); text-decoration: none; transition: color 0.2s; }
.footer-links a:hover { color: #fff; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
.footer-copy { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.18); }
@media(max-width:780px){ .footer{padding:48px 20px 32px;} .footer-inner{grid-template-columns:1fr;gap:36px;} }

/* ── ANIMATIONS ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

// Icons
const Logo = ({ size = 30, dark = false }) => (
  <svg width={size} height={Math.round(size * 0.67)} viewBox="0 0 72 48" fill="none">
    <path d="M8 44 Q18 36 28 44" stroke={dark ? 'rgba(8,14,23,0.15)' : 'rgba(142,168,195,0.28)'} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <path d="M14 44 Q26 24 38 44" stroke={dark ? 'rgba(26,87,153,0.35)' : 'rgba(74,144,217,0.5)'} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M22 44 Q36 6 50 44" stroke={dark ? '#0d1a2a' : '#fff'} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    <circle cx="36" cy="8" r="3" fill="#4A90D9"/>
    <circle cx="36" cy="8" r="1.4" fill={dark ? '#F7F5F1' : '#fff'}/>
  </svg>
);

const ArchSVG = ({ light = false }) => (
  <svg viewBox="0 0 780 520" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M-20 500 Q180 30 380 500" stroke={light ? '#1a5799' : '#4a90d9'} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M80 500 Q280 -10 480 500" stroke={light ? '#1a5799' : '#4a90d9'} strokeWidth="1" strokeLinecap="round" fill="none"/>
    <path d="M180 500 Q380 50 580 500" stroke={light ? '#1a5799' : '#4a90d9'} strokeWidth="0.6" strokeLinecap="round" fill="none"/>
    <path d="M280 500 Q480 100 680 500" stroke={light ? '#1a5799' : '#4a90d9'} strokeWidth="0.4" strokeLinecap="round" fill="none"/>
    <circle cx="180" cy="30" r="5" fill={light ? '#1a5799' : '#4a90d9'}/>
    <circle cx="180" cy="30" r="2" fill={light ? '#F7F5F1' : '#fff'}/>
    <circle cx="280" cy="-10" r="3.5" fill={light ? '#1a5799' : '#4a90d9'}/>
    <circle cx="380" cy="50" r="2.5" fill={light ? '#1a5799' : '#4a90d9'}/>
  </svg>
);

const IDoc = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="11" height="15" rx="1.5" fill="rgba(26,87,153,0.15)"/><path d="M16 3L19 6H16Z" fill="#1a5799"/><line x1="8" y1="9" x2="14" y2="9" stroke="#1a5799" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/><line x1="8" y1="12" x2="14" y2="12" stroke="#1a5799" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/><line x1="8" y1="15" x2="11" y2="15" stroke="#1a5799" strokeWidth="1.2" strokeLinecap="round" opacity="0.25"/></svg>;
const IFlow = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="2.5" fill="#1a5799"/><circle cx="12" cy="12" r="2.5" fill="rgba(26,87,153,0.5)"/><circle cx="19" cy="12" r="2.5" fill="rgba(26,87,153,0.3)"/><line x1="7.5" y1="12" x2="9.5" y2="12" stroke="#1a5799" strokeWidth="1.5" strokeLinecap="round"/><line x1="14.5" y1="12" x2="16.5" y2="12" stroke="rgba(26,87,153,0.4)" strokeWidth="1.5" strokeLinecap="round"/><path d="M15.5 9L19 12L15.5 15" stroke="#1a5799" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>;
const IChart = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 18L8 12L12 15L17 8L21 10L21 18Z" fill="rgba(26,87,153,0.1)"/><polyline points="3,18 8,12 12,15 17,8 21,10" stroke="#1a5799" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="21" cy="10" r="2" fill="#1a5799"/></svg>;
const IShield = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3L20 7L20 13C20 17 16 20.5 12 21C8 20.5 4 17 4 13L4 7Z" fill="rgba(26,87,153,0.1)" stroke="#1a5799" strokeWidth="1.2" strokeLinejoin="round"/><path d="M9 12L11 14L15 10" stroke="#1a5799" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IGlobe = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(26,87,153,0.08)" stroke="#1a5799" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="4" ry="9" stroke="rgba(26,87,153,0.3)" strokeWidth="1"/><line x1="3" y1="9" x2="21" y2="9" stroke="rgba(26,87,153,0.3)" strokeWidth="1"/><line x1="3" y1="15" x2="21" y2="15" stroke="rgba(26,87,153,0.3)" strokeWidth="1"/></svg>;
const IQuote = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="1.5" fill="rgba(26,87,153,0.08)"/><rect x="3" y="4" width="18" height="5" rx="1.5" fill="#1a5799" opacity="0.7"/><line x1="7" y1="14" x2="13" y2="14" stroke="#1a5799" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/><path d="M14 13L17 11.5L17 15.5L14 14" fill="#1a5799" opacity="0.5"/></svg>;
const Burger = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const X = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="5" y1="5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="17" y1="5" x2="5" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const Check = () => <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#1a5799" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const CAPS = [
  { icon:<IDoc/>, num:'01', title:'AI Document Processing', body:'Reads inbound emails, extracts requirements, cross-references your product database, and flags discrepancies before any human sees it.', tag:'Extract · Verify · Log', label:'Inbox to structured data' },
  { icon:<IFlow/>, num:'02', title:'Agentic Deal Workflows', body:'Automated pipelines that follow up, remind, escalate, and route — with human approval gates at every critical decision point.', tag:'Automate · Approve · Audit', label:'Deals that move themselves' },
  { icon:<IChart/>, num:'03', title:'Trade Intelligence', body:'Observes deal patterns across your pipeline. Surfaces where cycles stall, which buyers convert, and which categories lose margin.', tag:'Analyse · Improve · Predict', label:'Signal from the noise' },
  { icon:<IShield/>, num:'04', title:'Evidence-First Audit Trail', body:'Every data point, decision, and approval links back to its source — email, document, or upload. Nothing without provenance.', tag:'Source · Trace · Defend', label:'Every action, traceable' },
  { icon:<IGlobe/>, num:'05', title:'Multi-Market Execution', body:'Multi-currency, multi-language, multi-brand from a single system. Built for HK, SEA, and China-origin trade flows.', tag:'HKD · USD · RMB · SGD', label:'One system, every market' },
  { icon:<IQuote/>, num:'06', title:'Quotation & Order Engine', body:'Generates structured quotations from extracted requirements, tracks versions, and links to the final order. No lost spec changes.', tag:'Generate · Version · Link', label:'RFQ to PO, automatically' },
];

const MARQUEE = ['AI Document Processing','Agentic Workflows','Trade Intelligence','Audit Trail','Multi-Market Execution','Quotation Engine','AI Document Processing','Agentic Workflows','Trade Intelligence','Audit Trail','Multi-Market Execution','Quotation Engine'];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const injected = useRef(false);

  useEffect(() => {
    if (!injected.current) {
      const el = document.createElement('style');
      el.textContent = CSS;
      document.head.insertBefore(el, document.head.firstChild);
      injected.current = true;
    }
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className={`nav${scrolled ? ' solid' : ''}`}>
        <a href="#top" className="nav-logo">
          <Logo size={28} dark />
          <div className="nav-wm">Deep<em>Bridge</em></div>
        </a>
        <ul className="nav-links">
          <li><a href="#caps">Capabilities</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#vision">Vision</a></li>
        </ul>
        <div className="nav-right">
          <a href="#" className="btn btn-outline">Login</a>
          <a href="#cta" className="btn btn-navy">Request Demo</a>
        </div>
        <button className="nav-burger" onClick={() => setMenu(o => !o)}>
          {menu ? <X/> : <Burger/>}
        </button>
      </nav>
      <div className={`mobile-menu${menu ? ' open' : ''}`}>
        <a href="#caps" onClick={() => setMenu(false)}>Capabilities</a>
        <a href="#about" onClick={() => setMenu(false)}>About</a>
        <a href="#vision" onClick={() => setMenu(false)}>Vision</a>
        <a href="#cta" onClick={() => setMenu(false)} style={{color:'var(--blue)'}}>Request Demo →</a>
      </div>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="eyebrow-line"/>
            <div className="eyebrow-text">Trade Operating System · Est. MMXXV</div>
          </div>
          <h1 className="hero-h1">
            Every<br/>
            deal.<br/>
            <em>Structured.</em>
          </h1>
          <div className="hero-divider"/>
          <p className="hero-sub">
            Deep Bridge replaces scattered emails, WhatsApp threads, and spreadsheets with a single agentic workflow layer — built for exporters who need speed, structure, and evidence at every step.
          </p>
          <div className="hero-ctas">
            <a href="#cta" className="btn btn-navy btn-lg">Request Demo →</a>
            <a href="#caps" className="btn btn-outline btn-lg">See Capabilities</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-stats-col">
            <div className="hero-stat-row">
              <div className="stat-num">95<sup>%</sup></div>
              <div className="stat-label">Less manual quoting</div>
              <div className="stat-sub">AI draft on every RFQ</div>
            </div>
            <div className="hero-stat-row">
              <div className="stat-num">20<sup>h</sup></div>
              <div className="stat-label">Saved per rep, per week</div>
              <div className="stat-sub">Email + WhatsApp offloaded</div>
            </div>
            <div className="hero-stat-row">
              <div className="stat-num">24<sup>/7</sup></div>
              <div className="stat-label">Buyer coverage</div>
              <div className="stat-sub">AI handles enquiries round the clock</div>
            </div>
          </div>
          <div className="hero-right-bottom">HK · SG · SZ · Built by exporters, for exporters</div>
        </div>
        <div className="hero-arch"><ArchSVG light /></div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {MARQUEE.map((s,i) => <div key={i} className="marquee-item">{s}</div>)}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="about-left">
          <div className="section-label">Built by exporters</div>
          <h2 className="section-h2 about-h2">The assistant we<br/><em>wished we had.</em></h2>
          <p className="about-body">We understand these challenges because we've been there — running a traditional trading business, juggling RFQs, quotations, and buyer messages across email, WhatsApp, and WeChat. Deep Bridge is the system we wished existed.</p>
        </div>
        <div className="about-right">
          {[
            'Automate frontline customer interactions with AI agents that respond, qualify, and follow up',
            'Keep quotations and follow-ups organised, versioned, and linked to every source document',
            'Get real-time visibility into every deal — status, age, and next action — without chasing your team',
          ].map((pt, i) => (
            <div key={i} className="about-point">
              <div className="about-point-icon"><Check/></div>
              <div className="about-point-text">{pt}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="caps" className="caps">
        <div className="caps-top">
          <div>
            <div className="section-label">Core Capabilities</div>
            <h2 className="section-h2 caps-top-h2">Built for the<br/><em>full trade cycle.</em></h2>
          </div>
          <div className="caps-top-right">Every stage of the deal — from first inquiry to final shipment — tracked, structured, and auditable. No bolt-ons, no complex integrations. One layer over your existing workflow.</div>
        </div>
        <div className="caps-table">
          {CAPS.map(c => (
            <div key={c.num} className="cap-row">
              <div className="cap-num">{c.num}</div>
              <div className="cap-icon-box">{c.icon}</div>
              <div>
                <div className="cap-title">{c.title}</div>
                <div className="cap-body">{c.body}</div>
              </div>
              <div className="cap-right">
                <div className="cap-tag">{c.tag}</div>
              </div>
              <div className="cap-label">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* METRICS */}
      <div className="metrics">
        <div className="metric-cell">
          <div className="metric-num">95<sup>%</sup></div>
          <div className="metric-label">Less manual quoting</div>
          <div className="metric-sub">AI prepares drafts using your products, prices, and templates. Your team reviews — not writes.</div>
        </div>
        <div className="metric-cell">
          <div className="metric-num">20<sup>h</sup></div>
          <div className="metric-label">Saved each week</div>
          <div className="metric-sub">Per rep, by offloading repetitive email and WhatsApp replies to the AI agent layer.</div>
        </div>
        <div className="metric-cell">
          <div className="metric-num">24<sup>/7</sup></div>
          <div className="metric-label">Buyer coverage</div>
          <div className="metric-sub">AI assistant handles buyer enquiries around the clock — across all time zones and languages.</div>
        </div>
      </div>

      {/* VISION */}
      <section id="vision" className="vision">
        <div className="vision-left">
          <div className="section-label">Our Vision</div>
          <blockquote className="vision-quote">
            Empowering traditional businesses with AI-driven efficiency — bridging the gap between legacy trade operations and the speed the market now demands.
          </blockquote>
        </div>
        <div>
          <div className="vision-pillars">
            {[
              { n:'01', title:'AI Without Complexity', body:'We deliver AI that requires no technical expertise — adoption is seamless for traditional trade teams.' },
              { n:'02', title:'Faster Decision-Making', body:'We optimise workflows and surface predictive insights so deal teams stay one step ahead of every cycle.' },
              { n:'03', title:'Competitive Edge', body:'Businesses on Deep Bridge operate smarter, scale faster, and close more — without adding headcount.' },
            ].map(p => (
              <div key={p.n} className="pillar">
                <div className="pillar-num">{p.n}</div>
                <div className="pillar-title">{p.title}</div>
                <div className="pillar-body">{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="cta">
        <div className="cta-arch"><ArchSVG/></div>
        <div className="cta-inner">
          <div className="section-label" style={{justifyContent:'center',marginBottom:28,color:'rgba(255,255,255,0.3)'}}>
            <span style={{width:16,height:1,background:'rgba(255,255,255,0.2)',display:'block'}}></span>
            Get started today
          </div>
          <h2 className="cta-h2">Ready to see it<br/><em>in action?</em></h2>
          <p className="cta-sub">Book a demo. We'll show you how Deep Bridge fits into your existing workflow — no migration, no complexity, no 6-month onboarding.</p>
          <div className="cta-btns">
            <a href="mailto:hello@deepbridge.io" className="btn btn-cream btn-lg">Request Demo →</a>
            <a href="#caps" className="btn btn-ghost-light btn-lg">See Capabilities</a>
          </div>
          <div className="cta-meta">Est. MMXXV · Hong Kong · Singapore · Shenzhen</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <Logo size={24}/>
              <div className="footer-wm">Deep<em>Bridge</em></div>
            </div>
            <p className="footer-tagline">A single agentic workflow layer for exporters who need speed, structure, and evidence at every step.</p>
            <div className="footer-mono">Trade Operating System</div>
          </div>
          <div>
            <div className="footer-col-label">Product</div>
            <ul className="footer-links">
              <li><a href="#caps">Capabilities</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#cta">Request Demo</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-label">Company</div>
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
