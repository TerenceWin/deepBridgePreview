import React, { useState, useEffect } from 'react';
import './App.css';

// ── SVG ICONS ──
const LogoArch = ({ size = 36 }) => (
  <svg width={size} height={Math.round(size * 0.67)} viewBox="0 0 72 48" fill="none">
    <path d="M8 44 Q18 36 28 44" fill="none" stroke="rgba(142,168,195,0.3)" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M14 44 Q26 24 38 44" fill="none" stroke="rgba(74,144,217,0.55)" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M22 44 Q36 6 50 44" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="36" cy="8" r="3" fill="#4A90D9"/>
    <circle cx="36" cy="8" r="1.5" fill="#fff"/>
  </svg>
);

const IconPipeline = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="5" cy="12" r="2.5" fill="#4A90D9"/>
    <circle cx="12" cy="12" r="2.5" fill="#4A90D9"/>
    <circle cx="19" cy="12" r="2.5" fill="#8EA8C3"/>
    <line x1="7.5" y1="12" x2="9.5" y2="12" stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14.5" y1="12" x2="16.5" y2="12" stroke="#8EA8C3" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15.5 9 L19 12 L15.5 15" stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const IconDoc = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="3" width="11" height="15" rx="1.5" fill="rgba(74,144,217,0.3)"/>
    <path d="M16 3 L19 6 L16 6 Z" fill="#4A90D9"/>
    <line x1="8" y1="9" x2="14" y2="9" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    <line x1="8" y1="12" x2="14" y2="12" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
    <line x1="8" y1="15" x2="11" y2="15" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.25"/>
  </svg>
);

const IconAudit = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3 L20 7 L20 13 C20 17 16 20.5 12 21 C8 20.5 4 17 4 13 L4 7 Z" fill="rgba(74,144,217,0.25)" stroke="#4A90D9" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M9 12 L11 14 L15 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconGlobe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="rgba(74,144,217,0.2)" stroke="#4A90D9" strokeWidth="1.2"/>
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <line x1="3" y1="9" x2="21" y2="9" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <line x1="3" y1="15" x2="21" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
  </svg>
);

const IconQuote = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="1.5" fill="rgba(74,144,217,0.15)"/>
    <rect x="3" y="4" width="18" height="5" rx="1.5" fill="#4A90D9"/>
    <line x1="7" y1="14" x2="13" y2="14" stroke="#8EA8C3" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M14 13 L17 11.5 L17 15.5 L14 14" fill="#fff" opacity="0.7"/>
  </svg>
);

const IconAnalytics = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 18 L8 12 L12 15 L17 8 L21 10 L21 18 Z" fill="rgba(74,144,217,0.25)"/>
    <polyline points="3,18 8,12 12,15 17,8 21,10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
    <circle cx="21" cy="10" r="2" fill="#4A90D9"/>
    <line x1="3" y1="18" x2="21" y2="18" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
  </svg>
);

const HamburgerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <line x1="3" y1="7" x2="19" y2="7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="3" y1="11" x2="19" y2="11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="3" y1="15" x2="19" y2="15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <line x1="5" y1="5" x2="17" y2="17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="17" y1="5" x2="5" y2="17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ── LARGE DECORATIVE ARCH ──
const HeroArchBg = () => (
  <svg className="db-hero-arch" width="800" height="600" viewBox="0 0 800 600" fill="none">
    <path d="M100 560 Q300 50 500 560" fill="none" stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M200 560 Q400 20 600 560" fill="none" stroke="#4A90D9" strokeWidth="1" strokeLinecap="round"/>
    <path d="M300 560 Q500 80 700 560" fill="none" stroke="#4A90D9" strokeWidth="0.5" strokeLinecap="round"/>
    <circle cx="300" cy="50" r="6" fill="#4A90D9"/>
    <circle cx="300" cy="50" r="2.5" fill="#fff"/>
    <circle cx="400" cy="20" r="5" fill="#4A90D9"/>
    <circle cx="400" cy="20" r="2" fill="#fff"/>
    <circle cx="500" cy="80" r="4" fill="#4A90D9"/>
  </svg>
);

// ── DATA ──
const capabilities = [
  {
    icon: <IconDoc />,
    title: 'AI Document Processing',
    body: 'Reads inbound emails, extracts requirements, cross-references product databases, and flags discrepancies — before a human touches it.',
    tag: 'Extract · Verify · Log'
  },
  {
    icon: <IconPipeline />,
    title: 'Agentic Deal Workflows',
    body: 'Automated pipelines that follow up, remind, escalate, and route — with human approval gates at every critical decision point.',
    tag: 'Automate · Approve · Audit'
  },
  {
    icon: <IconAnalytics />,
    title: 'Trade Intelligence',
    body: 'Observes deal patterns across the pipeline. Identifies where cycles stall, which customers convert, and which product categories lose margin.',
    tag: 'Analyse · Improve · Predict'
  },
  {
    icon: <IconAudit />,
    title: 'Evidence-First Audit Trail',
    body: 'Every extracted data point, decision, and approval links back to its source — email, document, or upload. Nothing without provenance.',
    tag: 'Source · Trace · Defend'
  },
  {
    icon: <IconGlobe />,
    title: 'Multi-Market Execution',
    body: 'Multi-currency, multi-language, multi-brand operations from one system. Built for HK, SEA, and China-origin trade flows.',
    tag: 'HKD · USD · RMB · SGD'
  },
  {
    icon: <IconQuote />,
    title: 'Quotation & Order Engine',
    body: 'Generates structured quotations from extracted requirements, tracks versions, and links to the final order so spec changes are never lost.',
    tag: 'Generate · Version · Link'
  }
];

// ── COMPONENT ──
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      {/* ── NAV ── */}
      <nav className={`db-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="db-nav-logo">
          <LogoArch size={32} />
          <div>
            <div className="db-nav-wordmark">Deep<span>Bridge</span></div>
          </div>
        </a>
        <ul className="db-nav-links">
          <li><a href="#capabilities">Capabilities</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#vision">Vision</a></li>
        </ul>
        <div className="db-nav-actions">
          <a href="#" className="btn btn-ghost btn-sm">Login</a>
          <a href="#contact" className="btn btn-primary btn-sm">Request Demo</a>
        </div>
        <button className="db-nav-toggle" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`db-nav-mobile${menuOpen ? ' open' : ''}`} style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99 }}>
        <a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#vision" onClick={() => setMenuOpen(false)}>Vision</a>
        <a href="#" onClick={() => setMenuOpen(false)} style={{ color: 'rgba(74,144,217,0.9)' }}>Login</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Request Demo →</a>
      </div>

      {/* ── HERO ── */}
      <section className="db-hero">
        <div className="db-hero-bg" />
        <div className="db-hero-grid" />
        <HeroArchBg />

        <div className="db-hero-tag">Trade Operating System · HK · SG · SZ</div>

        <h1 className="db-hero-h1">
          Every deal.<br />
          <em>Structured,</em><br />
          tracked, and traceable.
        </h1>

        <p className="db-hero-sub">
          Deep Bridge replaces scattered emails, WhatsApp threads, and spreadsheets
          with a single agentic workflow layer — built for exporters who need speed,
          structure, and evidence at every step.
        </p>

        <div className="db-hero-ctas">
          <a href="#contact" className="btn btn-primary btn-lg">Request Demo →</a>
          <a href="#capabilities" className="btn btn-ghost btn-lg">See How It Works</a>
        </div>

        <div className="db-hero-stats">
          <div>
            <div className="db-stat-val">95<span>%</span></div>
            <div className="db-stat-label">Less manual quoting</div>
          </div>
          <div>
            <div className="db-stat-val">20<span>h</span></div>
            <div className="db-stat-label">Saved per rep, per week</div>
          </div>
          <div>
            <div className="db-stat-val">24<span>/7</span></div>
            <div className="db-stat-label">AI buyer coverage</div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section id="about" className="db-intro">
        <div className="db-intro-inner">
          <div>
            <div className="db-section-tag">Built by exporters</div>
            <h2 className="db-intro-h2">
              The assistant we<br />
              <em>wished we had.</em>
            </h2>
          </div>
          <div className="db-intro-body">
            <p>
              We understand these challenges because we've been there ourselves — running a traditional
              trading and export business, juggling RFQs, quotations, and buyer messages across email,
              WhatsApp, and WeChat.
            </p>
            <div className="db-intro-point">
              <div className="db-intro-dot" />
              <span>Automate frontline customer interactions with AI</span>
            </div>
            <div className="db-intro-point">
              <div className="db-intro-dot" />
              <span>Keep quotations and follow-ups organised and on track</span>
            </div>
            <div className="db-intro-point">
              <div className="db-intro-dot" />
              <span>Get real-time visibility into deals and buyer activity</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section id="capabilities" className="db-section db-caps">
        <div className="db-caps-inner">
          <div className="db-caps-header">
            <div className="db-section-tag">Core Capabilities</div>
            <h2 className="db-section-h2">
              Built for the<br />
              <em>full trade cycle.</em>
            </h2>
            <p className="db-section-sub">
              Every stage of the deal — from first inquiry to final shipment —
              tracked, structured, and auditable in one system.
            </p>
          </div>

          <div className="db-caps-grid">
            {capabilities.map((cap, i) => (
              <div key={i} className="db-cap-cell">
                <div className="db-cap-icon">{cap.icon}</div>
                <div className="db-cap-title">{cap.title}</div>
                <div className="db-cap-body">{cap.body}</div>
                <div className="db-cap-tag">{cap.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="db-metrics">
        <div className="db-metrics-inner">
          <div className="db-metrics-lede">
            Helping manufacturers and exporters plug AI into their<br />
            <em>existing workflows.</em>
          </div>
          <div className="db-metrics-grid">
            <div>
              <div className="db-metric-num">95%</div>
              <div className="db-metric-label">Less manual quoting</div>
              <div className="db-metric-sub">AI prepares drafts using your products, prices, and templates</div>
            </div>
            <div>
              <div className="db-metric-num">20h</div>
              <div className="db-metric-label">Saved each week</div>
              <div className="db-metric-sub">Per rep, by offloading repetitive email and WhatsApp replies</div>
            </div>
            <div>
              <div className="db-metric-num">24/7</div>
              <div className="db-metric-label">Buyer coverage</div>
              <div className="db-metric-sub">AI assistant available for enquiries, even outside office hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section id="vision" className="db-section db-vision">
        <div className="db-vision-inner">
          <div>
            <div className="db-section-tag">Our Vision</div>
            <h2 className="db-section-h2">Looking<br /><em>Forward</em></h2>
            <blockquote className="db-vision-quote">
              Empowering traditional businesses with AI-driven efficiency — bridging the gap between legacy trade operations and the speed the market demands.
            </blockquote>
            <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.75 }}>
              We aim to bridge the gap between traditional industries and the power of AI,
              enabling businesses to stay competitive in an evolving digital landscape.
              We deliver solutions that require no technical expertise, making adoption seamless.
            </p>
          </div>
          <div className="db-vision-pillars">
            <div className="db-pillar">
              <div className="db-pillar-title">AI Without Complexity</div>
              <div className="db-pillar-body">We deliver AI solutions that require no technical expertise, making adoption seamless for traditional trade teams.</div>
            </div>
            <div className="db-pillar">
              <div className="db-pillar-title">Faster Decision-Making</div>
              <div className="db-pillar-body">We optimise workflows, automate interactions, and surface predictive insights so deal teams stay ahead.</div>
            </div>
            <div className="db-pillar">
              <div className="db-pillar-title">Competitive Edge</div>
              <div className="db-pillar-body">Businesses that adopt Deep Bridge operate smarter, scale faster, and close more deals — without adding headcount.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="db-cta-banner">
        <h2 className="db-cta-h2">
          Ready to see it<br />
          <em>in action?</em>
        </h2>
        <p className="db-cta-sub">
          Book a demo. We'll show you how Deep Bridge fits into your current workflow —
          no migration, no complexity.
        </p>
        <div className="db-cta-actions">
          <a href="mailto:hello@deepbridge.io" className="btn btn-primary btn-lg">Request Demo →</a>
          <a href="#capabilities" className="btn btn-ghost btn-lg">See Capabilities</a>
        </div>
        <div className="db-cta-meta">Est. MMXXV · Hong Kong · Singapore · Shenzhen</div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="db-footer">
        <div className="db-footer-inner">
          <div className="db-footer-brand">
            <div className="db-footer-wordmark">
              <LogoArch size={28} />
              <div className="db-footer-wm">Deep<span>Bridge</span></div>
            </div>
            <p className="db-footer-tagline">
              A single agentic workflow layer for exporters who need speed, structure,
              and evidence at every step of the deal.
            </p>
            <div className="db-footer-tag">Trade Operating System</div>
          </div>
          <div>
            <div className="db-footer-col-title">Product</div>
            <ul className="db-footer-links">
              <li><a href="#capabilities">Capabilities</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Request Demo</a></li>
            </ul>
          </div>
          <div>
            <div className="db-footer-col-title">Company</div>
            <ul className="db-footer-links">
              <li><a href="#vision">Our Vision</a></li>
              <li><a href="#">Login</a></li>
              <li><a href="mailto:hello@deepbridge.io">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="db-footer-bottom">
          <div className="db-footer-copy">© 2026 Deep Bridge Ltd · Hong Kong · Confidential</div>
          <div className="db-footer-copy">HK · SG · SZ</div>
        </div>
      </footer>
    </div>
  );
}

export default App;