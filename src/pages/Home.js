import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from '../components/LogoMark';
import DemoModal from '../components/DemoModal';
import { MAX_WIDTH, NAV_HEIGHT, SECTION_PAD, SECTION_PAD_SM } from '../components/layout';
import Hero from './HeroSection.js'


const sky = '#29ABE2';
const navy = '#0A2540';
const navyMid = '#0F3D6E';
const slate = '#5A6E85';
const warmWhite = '#F7F5F0';
const surface = '#F2F0EB';
const border = '#E2DED6';

function StatCounter({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = end / (1800 / 16);
        const timer = setInterval(() => { start += step; if (start >= end) { setCount(end); clearInterval(timer); } else setCount(Math.floor(start)); }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const serviceHighlights = [
  { num: '01', title: 'Quotation Workflow', text: 'From buyer enquiry to customer-ready quotation with less manual work.' },
  { num: '02', title: 'Risk Flags', text: 'Catch certificate and documentation gaps before they slow down deals.' },
  { num: '03', title: 'Supplier Memory', text: 'Search past supplier emails and product offers instantly.' },
  { num: '04', title: 'Factory Finder', text: 'Identify relevant factories from old emails, descriptions, or images.' },
  { num: '05', title: 'Catalog Generation', text: 'Turn product information into customer-facing materials faster.' },
  // { num: '06', title: 'Opportunity Visibility', text: 'See which enquiries and accounts deserve attention first.' },
];

const stats = [
  { value: 20000, suffix: '+', label: 'Supplier records organised and searchable' },
  { value: 3000, suffix: '+', label: 'Quotations structured and accessible' },
  { value: 11000, suffix: '+', label: 'Products indexed in one customer environment' },
];

const whyUs = [
  { title: 'Less manual work', text: 'Reduce time spent on quotations, supplier search, and document handling.', icon: '01' },
  { title: 'Earlier risk visibility', text: 'Catch certificate and documentation gaps before they become costly.', icon: '02' },
  { title: 'Faster commercial response', text: 'Move from enquiry to quotation with fewer delays.', icon: '03' },
  { title: 'More output from the same team', text: 'Help teams handle more work without the same increase in headcount.', icon: '04' },
]

export default function Home() {

  const getBreakpoint = () => {
    if (window.innerWidth <= 420) return 'mobile';
    if (window.innerWidth <= 768) return 'tablet';
    if (window.innerWidth <= 1480) return 'laptop';
    return 'desktop';
  };

  const [breakpoint, setBreakpoint] = useState(getBreakpoint());
  const isMobile  = breakpoint === 'mobile';
  const isTablet  = breakpoint === 'tablet';
  const isLaptop  = breakpoint === 'laptop';
  const isDesktop = breakpoint === 'desktop';

  const heroText = 'Built from firsthand export experience';
  const [typedText, setTypedText] = useState('');
  const typeIntervalRef = useRef(null);
  const loopRef = useRef(null);
  const [modal, setModal] = useState(false);

  {/*Title Animation*/}
  function runTyping() {
    setTypedText('');
    let i = 0;
    typeIntervalRef.current = setInterval(() => {
      i++;
      setTypedText(heroText.slice(0, i));
      if (i === heroText.length) clearInterval(typeIntervalRef.current);
    }, 40);
  }

  function stopAnimation() {
    clearInterval(typeIntervalRef.current);
    clearInterval(loopRef.current);
    setTypedText(heroText);
  }

  useEffect(() => {
    runTyping();
    loopRef.current = setInterval(() => {
      clearInterval(typeIntervalRef.current);
      runTyping();
    }, 10000);
    return () => { clearInterval(typeIntervalRef.current); clearInterval(loopRef.current); };
  }, []);

  {/*Screen Responsive*/}
  useEffect(() => {
    const handle = () => setBreakpoint(getBreakpoint());
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const handleModal = () => {
    setModal(true)
  }

  return (
    <div style={{ background: warmWhite }}>
      <DemoModal isOpen={modal} onClose={() => setModal(false)} />
      <div className="db-hero" style={{ background: navy, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: `${NAV_HEIGHT + 80}px 48px 100px`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: sky }} />
        
        {/* backgroundColor: 'rgba(255,255,255,0.04)' */}
        {/* Hero Section- ORIGINAL */}
        {/* <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto', width: '100%', position: 'relative' }}>
          <div style={{ fontSize: 11, letterSpacing: '3px', color: sky, textTransform: 'uppercase', marginBottom: 28, opacity: 0.9 }}>Trade Operating System</div>
          <h1 style={{ fontSize: 68, fontWeight: 500, color: 'white', lineHeight: 1.02, letterSpacing: '-0.04em', maxWidth: 700, marginBottom: 28 }}>Built from firsthand export experience</h1>
          <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 520, marginBottom: 44 }}>Deep Bridge grew out of real export operations and is designed around the work that keeps trade moving, including buyer enquiries, quotations, supplier coordination, and document checks.</p>
          <div className="db-hero-btns" style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setModal(true)} style={{ background: sky, color: 'white', border: 'none', borderRadius: 8, padding: '13px 28px', fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>See it with your data</button>
            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '13px 24px', fontSize: 15, textDecoration: 'none' }}>View services →</Link>
          </div>
        </div> */}

        {/* Hero Section- HERO Section with DEMO*/}
        {/* <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto', width: '100%', position: 'relative' }}>
          <div style={{ fontSize: 11, letterSpacing: '3px', color: sky, textTransform: 'uppercase', marginBottom: 28, opacity: 0.9 }}>Trade Operating System</div>
          <h1 style={{ fontSize: 68, fontWeight: 500, color: 'white', lineHeight: 1.02, letterSpacing: '-0.04em', maxWidth: 700, marginBottom: 28 }}>Built from firsthand export experience</h1>
          <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 520, marginBottom: 44 }}>Deep Bridge grew out of real export operations and is designed around the work that keeps trade moving, including buyer enquiries, quotations, supplier coordination, and document checks.</p>
          <div className="db-hero-btns" style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setModal(true)} style={{ background: sky, color: 'white', border: 'none', borderRadius: 8, padding: '13px 28px', fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>See it with your data</button>
            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '13px 24px', fontSize: 15, textDecoration: 'none' }}>View services →</Link>
          </div>
        </div> */}

        {/* Hero Section- HERO Section with DEMO [MAX_WIDTH]*/} 
        <div style={{ maxWidth: isDesktop ? 1200 : isLaptop ? MAX_WIDTH : isTablet ? 700 : 300, margin: '0 auto', marginTop: isLaptop ? -80 : 0, width: '100%', position: 'relative', padding: '0 48px', boxSizing: 'border-box'}}> 
          <div style={{ fontSize: 11, letterSpacing: '3px', color: sky, textTransform: 'uppercase', marginBottom: isLaptop ? 10: 28, opacity: 0.9 }}>
            Trade Operating System
          </div>
          <h1 style={{ height: 150, fontSize: 68, fontWeight: 500, 
            color: 'white', lineHeight: 1.02, letterSpacing: '-0.04em', maxWidth: 700, marginBottom: 28 }}>
            {typedText}
          </h1>
          <div className="db-hero-btns" style={{ display: 'flex', gap: 12, marginBottom: isLaptop ? 30 : 50}}>
            <button onClick={() => setModal(true)}
              style={{ background: sky, color: 'white', border: 'none', borderRadius: 8, padding: '13px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#1e95ccd3'}
              onMouseLeave={e => e.currentTarget.style.background = sky}>
              See it with your data
            </button>
            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 8, 
            padding: '13px 24px', fontSize: 15, textDecoration: 'none', fontWeight: 700, transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
            View services →
            </Link>
          </div>
            <Hero stopAnimation={stopAnimation} handleModal={handleModal} isDesktop={isDesktop} />
          </div>

               

          {/*SCROLL*/}
        {/* <div style={{ position: 'absolute', bottom: 36, left: 48, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 0.5, background: 'rgba(255,255,255,0.2)' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
        </div> */}
      </div>
      <div style={{ background: navyMid }}>
        <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ padding: '28px 0 10px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 10, letterSpacing: '2.5px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Built on real exporter data — in one customer environment, Deep Bridge was used to organise and search across:</div>
          </div>
          <div className="db-stat-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: '32px 0', borderRight: i < 2 ? '0.5px solid rgba(255,255,255,0.08)' : 'none', paddingLeft: i > 0 ? 44 : 0, paddingRight: i < 2 ? 44 : 0 }}>
                <div style={{ fontSize: 40, fontWeight: 300, color: 'white', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}><StatCounter end={s.value} suffix={s.suffix} /></div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: 'white' }}>
        <div className="db-section" style={{ maxWidth: MAX_WIDTH, margin: '0 auto', padding: SECTION_PAD }}>
          <div className="db-two-col" style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 72, alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 18 }}>Why it matters</div>
              <h2 style={{ fontSize: 36, fontWeight: 500, color: navy, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>Relationships are the product.</h2>
              <p style={{ fontSize: 19, fontStyle: 'italic', color: slate, fontFamily: 'Georgia, serif', lineHeight: 1.6, borderLeft: `2px solid ${sky}`, paddingLeft: 18 }}>Systems should support them, not replace them.</p>
            </div>
            <div>
              <p style={{ fontSize: 16, color: slate, lineHeight: 1.9, marginBottom: 18 }}>Many tools in the market are built around the idea of removing intermediaries. We believe that misses how trade actually works. Strong relationships with factories lead to better pricing, smoother coordination, and more reliable execution.</p>
              <p style={{ fontSize: 16, color: slate, lineHeight: 1.9 }}>Longstanding customer relationships build trust and make business easier to win and retain. Deep Bridge is designed to empower traders and exporters with better systems, not replace the human relationships that make trade work.</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: surface }}>
        <div className="db-section" style={{ maxWidth: MAX_WIDTH, margin: '0 auto', padding: SECTION_PAD }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 14 }}>Services</div>
              <h2 style={{ fontSize: 36, fontWeight: 500, color: navy, lineHeight: 1.1, letterSpacing: '-0.03em' }}>Tools built around how export teams actually work</h2>
            </div>
            <Link to="/services" style={{ fontSize: 13, color: sky, textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}>All services →</Link>
          </div>
          <div className="db-three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: border, borderRadius: 12, overflow: 'hidden' }}>
            {serviceHighlights.map((s, i) => (
              <div key={i} style={{ background: 'white', padding: '24px 20px', paddingBottom: '100px'}}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: sky, textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>{s.num}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: navy, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: slate, lineHeight: 1.7 }}>{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: navy }}>
        <div className="db-section" style={{ maxWidth: MAX_WIDTH, margin: '0 auto', padding: SECTION_PAD }}>
          <div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 16 }}>Why teams use Deep Bridge</div>
          <h2 style={{ fontSize: 36, fontWeight: 500, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 48, maxWidth: 480 }}>Practical improvements to how export teams operate</h2>
          <div className="db-why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
            {whyUs.map((item, i) => (
              <div key={i} style={{ padding: '36px 32px', background: 'rgba(255,255,255,0.03)', borderBottom: i < 2 ? '0.5px solid rgba(255,255,255,0.06)' : 'none', borderRight: i % 2 === 0 ? '0.5px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ fontSize: 11, letterSpacing: '2px', color: sky, textTransform: 'uppercase', fontWeight: 500, marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontSize: 19, fontWeight: 500, color: 'white', marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: surface, margin: '0 0 50px 0' }}>
        <div className="db-section-sm" style={{ maxWidth: MAX_WIDTH, margin: '0 auto', padding: SECTION_PAD_SM }}>
          <div className="db-cta-card" style={{ background: navy, borderRadius: 16, padding: '60px 64px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 16 }}>Book a demo</div>
              <h2 style={{ fontSize: 36, fontWeight: 500, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 }}>See it with your workflow</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 400 }}>See how Deep Bridge can flag certificate risks, speed up quotation prep, and draft customer follow-ups from one assistant.</p>
            </div>
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => setModal(true)} style={{ background: sky, color: 'white', border: 'none', borderRadius: 8, padding: '14px 28px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Book a demo</button>
              <Link to="/pricing" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', textAlign: 'center' }}>View pricing →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
