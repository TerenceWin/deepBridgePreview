import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoMark } from './LogoMark';
import DemoModal from './DemoModal';

const links = [
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Partners', to: '/partner' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
];

export default function Nav() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const navBg = scrolled || menuOpen ? 'rgba(255,255,255,0.97)' : 'transparent';
  const textCol = scrolled || menuOpen ? '#0A2540' : 'white';
  const mutedCol = scrolled || menuOpen ? '#5A6E85' : 'rgba(255,255,255,0.7)';

  return (
    <>
      <DemoModal isOpen={modal} onClose={() => setModal(false)} />
      <nav className="db-nav" style={{
        background: navBg,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: (scrolled || menuOpen) ? '0.5px solid #E2DED6' : '0.5px solid transparent',
        padding: '0 72px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <LogoMark size={40} bg={scrolled || menuOpen ? 'white' : '#0A2540'} />
          <span style={{ fontSize: 17, fontWeight: 500, color: textCol, letterSpacing: '-0.3px', transition: 'color 0.3s' }}>Deep Bridge</span>
        </Link>
        <div className="db-nav-links" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {links.map(link => (
            <Link key={link.to} to={link.to} style={{
              fontSize: 14, textDecoration: 'none',
              color: location.pathname === link.to ? textCol : mutedCol,
              fontWeight: location.pathname === link.to ? 500 : 400,
              transition: 'color 0.3s',
            }}>{link.label}</Link>
          ))}
          <button onClick={() => setModal(true)} style={{ background: '#29ABE2', color: 'white', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>BOOK A DEMO</button>
        </div>
        <button className="db-nav-mobile-btn" onClick={() => setMenuOpen(o => !o)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5 }}
          aria-label="Toggle menu">
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: 22, height: 2, borderRadius: 2, background: textCol, transition: 'all 0.2s',
              transform: menuOpen ? (i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'scaleX(0)') : 'none' }} />
          ))}
        </button>
      </nav>
      {menuOpen && (
        <div style={{ position: 'fixed', top: 60, left: 0, right: 0, zIndex: 199, background: 'white', borderBottom: '0.5px solid #E2DED6', padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(link => (
            <Link key={link.to} to={link.to} style={{ fontSize: 16, fontWeight: location.pathname === link.to ? 500 : 400, color: location.pathname === link.to ? '#0A2540' : '#5A6E85', textDecoration: 'none', padding: '12px 0', borderBottom: '0.5px solid #F2F0EB' }}>{link.label}</Link>
          ))}
          <button onClick={() => { setMenuOpen(false); setModal(true); }} style={{ marginTop: 16, background: '#29ABE2', color: 'white', border: 'none', borderRadius: 8, padding: '13px', fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>BOOK A DEMO</button>
        </div>
      )}
    </>
  );
}
