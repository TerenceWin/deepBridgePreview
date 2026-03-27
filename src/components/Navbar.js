import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiLogIn, FiMenu, FiX } from 'react-icons/fi';
import '../styles/theme.css';

const DBLogo = () => (
  <svg width="30" height="30" viewBox="0 0 52 52" fill="none">
    <rect x="8" y="14" width="6" height="28" rx="1" fill="#2A5298"/>
    <rect x="38" y="14" width="6" height="28" rx="1" fill="#2A5298"/>
    <rect x="6" y="12" width="40" height="5" rx="1.5" fill="#1E3A5F"/>
    <path d="M14 17 Q26 30 38 17" stroke="#2A5298" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
    <line x1="14" y1="27" x2="38" y2="27" stroke="rgba(42,82,152,0.25)" strokeWidth="1" strokeDasharray="3 2"/>
    <line x1="14" y1="31" x2="38" y2="31" stroke="rgba(42,82,152,0.15)" strokeWidth="1" strokeDasharray="3 2"/>
  </svg>
);

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
    setIsOpen(false);
  };

  const linkStyle = {
    fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400,
    color: '#6B7A8A', textDecoration: 'none', padding: '6px 14px', borderRadius: '2px',
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: 'rgba(248,247,243,0.94)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid rgba(30,58,95,0.12)' : '1px solid transparent',
      boxShadow: scrolled ? '0 2px 16px rgba(13,31,53,0.06)' : 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      padding: '0 48px', height: '68px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      width: '100%',
    }}>

      <Link to="/" onClick={() => setIsOpen(false)}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <DBLogo />
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: '14px', letterSpacing: '0.5px', color: '#0D1F35', lineHeight: 1 }}>
            DEEP<span style={{ color: '#2A5298' }}>BRIDGE</span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#9AABB8', marginTop: '2px' }}>
            Trade Operating System
          </div>
        </div>
      </Link>

      <ul className="db-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }}>
        {[['/', 'Home'], ['/services', 'Services'], ['/contact', 'About']].map(([to, label]) => (
          <li key={to}>
            <Link to={to} onClick={() => setIsOpen(false)} style={linkStyle}
              onMouseEnter={e => e.target.style.color = '#0D1F35'}
              onMouseLeave={e => e.target.style.color = '#6B7A8A'}>
              {label}
            </Link>
          </li>
        ))}
        {isAuthenticated ? (
          <>
            <li><Link to="/crm/home" style={linkStyle}>Records</Link></li>
            <li>
              <button onClick={handleLogout} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', background: 'transparent', color: '#6B7A8A', border: '1px solid rgba(30,58,95,0.15)', padding: '8px 16px', borderRadius: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiLogOut size={11} /> Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/crm/login" className="db-btn-primary" style={{ fontSize: '10px', padding: '9px 18px' }} onClick={() => setIsOpen(false)}>
              <FiLogIn size={11} style={{ marginRight: '5px' }} />Login
            </Link>
          </li>
        )}
        <li>
          <Link to="/contact#waitlist-form" className="db-btn-primary" style={{ fontSize: '10px', padding: '9px 18px', marginLeft: '4px' }} onClick={() => setIsOpen(false)}>
            Request Demo
          </Link>
        </li>
      </ul>

      <button onClick={() => setIsOpen(!isOpen)} className="db-nav-toggle"
        style={{ display: 'none', background: 'none', border: 'none', color: '#0D1F35', cursor: 'pointer', padding: '4px' }}>
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {isOpen && (
        <div style={{ position: 'absolute', top: '68px', left: 0, right: 0, background: '#F8F7F3', borderBottom: '1px solid rgba(30,58,95,0.1)', padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 999 }}>
          {[['/', 'Home'], ['/services', 'Services'], ['/contact', 'About']].map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setIsOpen(false)} style={{ fontFamily: "'Inter',sans-serif", fontSize: '14px', color: '#0D1F35', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid rgba(30,58,95,0.06)' }}>
              {label}
            </Link>
          ))}
          <div style={{ marginTop: '12px' }}>
            <Link to="/contact#waitlist-form" className="db-btn-primary" onClick={() => setIsOpen(false)} style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>Request Demo</Link>
          </div>
        </div>
      )}

      <style>{`@media(max-width:768px){.db-nav-desktop{display:none!important}.db-nav-toggle{display:block!important}}`}</style>
    </nav>
  );
};

export default Navbar;
