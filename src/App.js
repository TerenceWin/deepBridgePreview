import { useState, useEffect } from 'react';
import './App.css';

const Logo = ({ size = 30, light = false }) => (
  <svg width={size} height={Math.round(size * .65)} viewBox="0 0 72 48" fill="none">
    <path d="M8 44 Q18 36 28 44"  stroke={light?'rgba(255,255,255,.2)':'rgba(11,24,41,.14)'} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <path d="M14 44 Q26 24 38 44" stroke={light?'rgba(255,255,255,.38)':'rgba(26,95,166,.38)'} strokeWidth="2.6" strokeLinecap="round" fill="none"/>
    <path d="M22 44 Q36 6 50 44"  stroke={light?'#ffffff':'#0B1829'}                       strokeWidth="3.6" strokeLinecap="round" fill="none"/>
    <circle cx="36" cy="8" r="3.2" fill="#4A90D9"/>
    <circle cx="36" cy="8" r="1.4" fill={light?'#fff':'#F2F0EC'}/>
  </svg>
);

const Arch = ({ light = false }) => {
  const c = light ? 'rgba(26,95,166,.85)' : 'rgba(74,144,217,.85)';
  const d = light ? '#1A5FA6' : '#4A90D9';
  const f = light ? '#F2F0EC' : '#fff';
  return (
    <svg viewBox="0 0 800 560" fill="none">
      <path d="M-40 540 Q160 20 360 540"  stroke={c} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <path d="M60 540 Q260 -20 460 540"  stroke={c} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity=".6"/>
      <path d="M160 540 Q360 40 560 540"  stroke={c} strokeWidth=".7"  strokeLinecap="round" fill="none" opacity=".35"/>
      <path d="M260 540 Q460 80 660 540"  stroke={c} strokeWidth=".45" strokeLinecap="round" fill="none" opacity=".2"/>
      <circle cx="160" cy="20"  r="5"   fill={d}/><circle cx="160" cy="20"  r="2"   fill={f}/>
      <circle cx="260" cy="-20" r="3.5" fill={d} opacity=".7"/>
      <circle cx="360" cy="40"  r="2.5" fill={d} opacity=".5"/>
    </svg>
  );
};

const IDoc    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="11" height="15" rx="1.5" fill="rgba(26,95,166,.14)"/><path d="M16 3l3 3h-3z" fill="#1A5FA6"/><line x1="8" y1="9"  x2="14" y2="9"  stroke="#1A5FA6" strokeWidth="1.2" strokeLinecap="round" opacity=".7"/><line x1="8" y1="12" x2="14" y2="12" stroke="#1A5FA6" strokeWidth="1.2" strokeLinecap="round" opacity=".45"/><line x1="8" y1="15" x2="11" y2="15" stroke="#1A5FA6" strokeWidth="1.2" strokeLinecap="round" opacity=".25"/></svg>;
const IFlow   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="2.5" fill="#1A5FA6"/><circle cx="12" cy="12" r="2.5" fill="rgba(26,95,166,.5)"/><circle cx="19" cy="12" r="2.5" fill="rgba(26,95,166,.25)"/><line x1="7.5" y1="12" x2="9.5" y2="12" stroke="#1A5FA6" strokeWidth="1.5" strokeLinecap="round"/><line x1="14.5" y1="12" x2="16.5" y2="12" stroke="rgba(26,95,166,.4)" strokeWidth="1.5" strokeLinecap="round"/><path d="M15.5 9L19 12l-3.5 3" stroke="#1A5FA6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>;
const IChart  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 18l5-6 4 3 5-7 4 2v8z" fill="rgba(26,95,166,.1)"/><polyline points="3,18 8,12 12,15 17,8 21,10" stroke="#1A5FA6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="21" cy="10" r="2" fill="#1A5FA6"/></svg>;
const IShield = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v6c0 4-4 7.5-8 8-4-.5-8-4-8-8V7z" fill="rgba(26,95,166,.1)" stroke="#1A5FA6" strokeWidth="1.2" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#1A5FA6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IGlobe  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(26,95,166,.08)" stroke="#1A5FA6" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="4" ry="9" stroke="rgba(26,95,166,.3)" strokeWidth="1"/><line x1="3" y1="9" x2="21" y2="9" stroke="rgba(26,95,166,.3)" strokeWidth="1"/><line x1="3" y1="15" x2="21" y2="15" stroke="rgba(26,95,166,.3)" strokeWidth="1"/></svg>;
const IQuote  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="1.5" fill="rgba(26,95,166,.08)"/><rect x="3" y="4" width="18" height="5" rx="1.5" fill="rgba(26,95,166,.6)"/><line x1="7" y1="14" x2="13" y2="14" stroke="rgba(26,95,166,.5)" strokeWidth="1.2" strokeLinecap="round"/><path d="M14 13l3-1.5v4L14 14" fill="rgba(26,95,166,.5)"/></svg>;
const Burger  = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="3" y1="6"  x2="19" y2="6"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const Close   = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="5" y1="5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="17" y1="5" x2="5" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const Check   = () => <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#1A5FA6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const CAPS = [
  { n:'01', icon:<IDoc/>,    title:'AI Document Processing',     body:'Reads inbound emails, extracts requirements, cross-references your product database, and flags discrepancies before any human sees it.',         tag:'Extract · Verify · Log',        aside:'Inbox to structured data'  },
  { n:'02', icon:<IFlow/>,   title:'Agentic Deal Workflows',     body:'Automated pipelines that follow up, remind, escalate, and route — with human approval gates at every critical decision point.',               tag:'Automate · Approve · Audit',    aside:'Deals that move themselves' },
  { n:'03', icon:<IChart/>,  title:'Trade Intelligence',         body:'Observes deal patterns across your pipeline. Surfaces where cycles stall, which buyers convert, and which categories lose margin.',             tag:'Analyse · Improve · Predict',   aside:'Signal from the noise'      },
  { n:'04', icon:<IShield/>, title:'Evidence-First Audit Trail', body:'Every data point, decision, and approval links back to its source — email, document, or upload. Nothing without provenance.',                   tag:'Source · Trace · Defend',       aside:'Every action, traceable'    },
  { n:'05', icon:<IGlobe/>,  title:'Multi-Market Execution',     body:'Multi-currency, multi-language, multi-brand from a single system. Built natively for HK, SEA, and China-origin trade flows.',                  tag:'HKD · USD · RMB · SGD',         aside:'One system, every market'   },
  { n:'06', icon:<IQuote/>,  title:'Quotation & Order Engine',   body:'Generates structured quotations from extracted requirements, tracks versions, and links to the final order so spec changes are never lost.',     tag:'Generate · Version · Link',     aside:'RFQ to PO, automatically'   },
];

const TICKER = ['AI Document Processing','Agentic Deal Workflows','Trade Intelligence','Audit Trail','Multi-Market Execution','Quotation Engine'];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const close = () => setMenu(false);

  return (
    <>
      {/* NAV */}
      <nav className={`nav${scrolled?' solid':''}`}>
        <a href="#top" className="logo"><Logo size={28}/><div className="logo-wm">Deep<em>Bridge</em></div></a>
        <ul className="nav-links">
          <li><a href="#caps">Capabilities</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#vision">Vision</a></li>
        </ul>
        <div className="nav-right">
          <a href="#" className="btn btn-sm btn-outline">Login</a>
          <a href="#cta" className="btn btn-sm btn-navy">Request Demo</a>
        </div>
        <button className="nav-burger" onClick={() => setMenu(o => !o)}>{menu?<Close/>:<Burger/>}</button>
      </nav>
      <div className={`mobile-menu${menu?' open':''}`}>
        <a href="#caps" onClick={close}>Capabilities</a>
        <a href="#about" onClick={close}>About</a>
        <a href="#vision" onClick={close}>Vision</a>
        <a href="#cta" onClick={close}>Request Demo →</a>
      </div>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="hero-arch"><Arch light/></div>

        <div className="hero-left">
          <div className="eyebrow">
            <div className="eyebrow-rule"/>
            <span className="eyebrow-txt">Trade Operating System · Est. MMXXV</span>
          </div>
          <h1 className="hero-h1">
            Every<br/>deal.<br/><em>Structured.</em>
          </h1>
          <div className="hero-rule"/>
          <p className="hero-body">
            Deep Bridge replaces scattered emails, WhatsApp threads, and spreadsheets
            with a single agentic workflow layer — built for exporters who need speed,
            structure, and evidence at every step.
          </p>
          <div className="hero-ctas">
            <a href="#cta"  className="btn btn-lg btn-navy">Request Demo →</a>
            <a href="#caps" className="btn btn-lg btn-outline">See Capabilities</a>
          </div>
        </div>

        <div className="hero-right">
          <div className="stats">
            <div className="stat"><div className="stat-n">95<b>%</b></div><div className="stat-title">Less manual quoting</div><div className="stat-sub">AI draft on every RFQ</div></div>
            <div className="stat"><div className="stat-n">20<b>h</b></div><div className="stat-title">Saved per rep, per week</div><div className="stat-sub">Email + WhatsApp offloaded</div></div>
            <div className="stat"><div className="stat-n">24<b>/7</b></div><div className="stat-title">Buyer coverage</div><div className="stat-sub">AI handles enquiries round the clock</div></div>
          </div>
          <div className="hero-origin">HK · SG · SZ · Built by exporters, for exporters</div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER,...TICKER].map((s,i) => <div key={i} className="ticker-item">{s}</div>)}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="about-l">
          <div className="sec-tag">Built by exporters</div>
          <h2 className="sec-h2 about-h2">The assistant we<br/><em>wished we had.</em></h2>
          <p className="about-body">We've been there — running a traditional trading business, juggling RFQs, quotations, and buyer messages across email, WhatsApp, and WeChat. Deep Bridge is the system we wished existed.</p>
        </div>
        <div className="about-r">
          <p className="about-r-hed">Plug in. Start moving faster.</p>
          <div className="points">
            {['Automate frontline customer interactions with AI agents that respond, qualify, and follow up','Keep quotations and follow-ups organised, versioned, and linked to every source document','Get real-time visibility into every deal — status, age, next action — without chasing your team'].map((t,i) => (
              <div key={i} className="point"><div className="pt-check"><Check/></div><div className="pt-text">{t}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPS */}
      <section id="caps">
        <div className="caps-head">
          <div>
            <div className="sec-tag">Core Capabilities</div>
            <h2 className="sec-h2 caps-h2">Built for the<br/><em>full trade cycle.</em></h2>
          </div>
          <p className="caps-sub">Every stage of the deal — from first inquiry to final shipment — tracked, structured, and auditable. One layer over your existing workflow. No migrations, no rip-and-replace.</p>
        </div>
        <div className="caps-list">
          {CAPS.map(c => (
            <div key={c.n} className="cap">
              <div className="cap-num">{c.n}</div>
              <div className="cap-ic">{c.icon}</div>
              <div>
                <div className="cap-title">{c.title}</div>
                <div className="cap-body">{c.body}</div>
                <div className="cap-tag">{c.tag}</div>
              </div>
              <div className="cap-aside">{c.aside}</div>
            </div>
          ))}
        </div>
      </section>

      {/* METRICS */}
      <div className="metrics">
        {[{n:'95',u:'%',title:'Less manual quoting',sub:'AI prepares drafts using your products, prices, and templates. Your team reviews — not writes.'},{n:'20',u:'h',title:'Saved each week',sub:'Per rep, by offloading repetitive email and WhatsApp replies to the AI agent layer.'},{n:'24',u:'/7',title:'Buyer coverage',sub:'AI handles buyer enquiries around the clock — across all time zones and languages.'}].map(m => (
          <div key={m.n} className="metric">
            <div className="m-num">{m.n}<b>{m.u}</b></div>
            <div className="m-title">{m.title}</div>
            <div className="m-sub">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* VISION */}
      <section id="vision" className="vision">
        <div className="vision-l">
          <div className="sec-tag">Our Vision</div>
          <blockquote className="vision-q">Empowering traditional businesses with AI-driven efficiency — bridging the gap between legacy trade operations and the speed the market demands.</blockquote>
        </div>
        <div className="vision-r">
          <div className="pillars">
            {[{n:'01',title:'AI Without Complexity',body:'We deliver AI that requires no technical expertise — adoption is seamless for traditional trade teams with no disruption to existing tools.'},{n:'02',title:'Faster Decision-Making',body:'We optimise workflows, automate interactions, and surface predictive insights so deal teams stay one step ahead of every cycle.'},{n:'03',title:'Competitive Edge',body:'Businesses on Deep Bridge operate smarter, scale faster, and close more deals — without adding headcount or complexity.'}].map(p => (
              <div key={p.n} className="pillar">
                <div className="p-num">{p.n}</div>
                <div className="p-title">{p.title}</div>
                <div className="p-body">{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="cta">
        <div className="cta-arch"><Arch/></div>
        <div className="cta-in">
          <div className="cta-tag">Get started today</div>
          <h2 className="cta-h2">Ready to see it<br/><em>in action?</em></h2>
          <p className="cta-sub">Book a demo. We'll show you how Deep Bridge fits into your existing workflow — no migration, no complexity, no 6-month onboarding.</p>
          <div className="cta-btns">
            <a href="mailto:hello@deepbridge.io" className="btn btn-lg btn-white">Request Demo →</a>
            <a href="#caps" className="btn btn-lg btn-ghost-inv">See Capabilities</a>
          </div>
          <div className="cta-note">Est. MMXXV · Hong Kong · Singapore · Shenzhen</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-g">
          <div>
            <div className="f-logo"><Logo size={24} light/><div className="f-wm">Deep<em>Bridge</em></div></div>
            <p className="f-blurb">A single agentic workflow layer for exporters who need speed, structure, and evidence at every step of the deal.</p>
            <div className="f-mono">Trade Operating System</div>
          </div>
          <div>
            <div className="f-col-lbl">Product</div>
            <ul className="f-links">
              <li><a href="#caps">Capabilities</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#cta">Request Demo</a></li>
            </ul>
          </div>
          <div>
            <div className="f-col-lbl">Company</div>
            <ul className="f-links">
              <li><a href="#vision">Vision</a></li>
              <li><a href="#">Login</a></li>
              <li><a href="mailto:hello@deepbridge.io">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="f-bar">
          <div className="f-copy">© 2026 Deep Bridge Ltd · Hong Kong · Confidential</div>
          <div className="f-copy">HK · SG · SZ · Est. MMXXV</div>
        </div>
      </footer>
    </>
  );
}
