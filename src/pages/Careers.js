import React from 'react';
import PageHero from '../components/PageHero';
import { MAX_WIDTH, SECTION_PAD, SECTION_PAD_SM } from '../components/layout';

const sky = '#29ABE2';
const navy = '#0A2540';
const slate = '#5A6E85';
const mist = '#E3F4FC';
const border = '#E2DED6';
const surface = '#F2F0EB';

const openRoles = [{
  title: 'Senior Software Developer', type: 'Full Time', location: 'Hong Kong', mode: 'Hybrid', status: 'open',
  summary: 'Help build the core systems behind Deep Bridge, from backend workflows and integrations to the tools that power quotation, supplier search, and operational visibility.',
  workOn: ['Backend systems for quotation and workflow automation', 'Integrations across email, messaging, and commercial tools', 'Product architecture and internal platform improvements', 'Features for search, supplier memory, and risk flagging'],
  background: ['Strong software engineering fundamentals', 'Experience building production systems', 'Comfort working across product, backend, and integrations', 'Ability to work in a fast-moving environment with real business constraints'],
}];

const closedRoles = [{
  title: 'Machine Learning Expert', type: 'Full Time', location: 'Hong Kong', mode: 'Hybrid', status: 'closed',
  summary: 'Worked on applied AI and machine learning systems for exporter workflows, including extraction, search, ranking, and workflow intelligence.',
  workOn: ['Machine learning systems for commercial workflows', 'Search and retrieval across supplier and product information', 'AI-assisted automation for quotation and document handling', 'Applied models for risk detection and opportunity prioritization'],
  background: [],
}];

function Tag({ label, variant = 'default' }) {
  const styles = { open: { background: mist, color: sky, border: `0.5px solid ${sky}` }, closed: { background: '#f0f0ec', color: '#999', border: '0.5px solid #ddd' }, default: { background: '#f0f0ec', color: slate, border: `0.5px solid ${border}` } };
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 12px', borderRadius: 20, letterSpacing: '0.3px', ...styles[variant] }}>{label}</span>;
}

function RoleCard({ role }) {
  const isOpen = role.status === 'open';
  return (
    <div style={{ background: 'white', border: isOpen ? `0.5px solid ${border}` : '0.5px solid #eee', borderRadius: 12, overflow: 'hidden', opacity: isOpen ? 1 : 0.7 }}>
      <div style={{ padding: '24px 28px 18px', borderBottom: `0.5px solid ${border}`, background: isOpen ? 'white' : '#fafaf8' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: 20, fontWeight: 500, color: navy, lineHeight: 1.2 }}>{role.title}</h3>
          <Tag label={isOpen ? 'Open' : 'Closed'} variant={isOpen ? 'open' : 'closed'} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}><Tag label={role.type} /><Tag label={role.location} /><Tag label={role.mode} /></div>
        <p style={{ fontSize: 14, color: slate, lineHeight: 1.8 }}>{role.summary}</p>
      </div>
      <div style={{ padding: '20px 28px' }}>
        {role.workOn.length > 0 && (<div style={{ marginBottom: role.background.length > 0 ? 20 : 0 }}><div style={{ fontSize: 10, letterSpacing: '2px', color: sky, textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>What you may work on</div><div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{role.workOn.map((item, i) => (<div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: sky, flexShrink: 0, marginTop: 8, opacity: isOpen ? 1 : 0.4 }} /><span style={{ fontSize: 13, color: slate, lineHeight: 1.7 }}>{item}</span></div>))}</div></div>)}
        {role.background.length > 0 && (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, letterSpacing: '2px', color: sky, textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>Ideal background</div><div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{role.background.map((item, i) => (<div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}><span style={{ width: 4, height: 4, borderRadius: 1, background: navy, flexShrink: 0, marginTop: 9 }} /><span style={{ fontSize: 13, color: slate, lineHeight: 1.7 }}>{item}</span></div>))}</div></div>)}
        <div style={{ padding: '12px 16px', background: isOpen ? mist : '#f5f5f2', borderRadius: 8, fontSize: 13, color: isOpen ? navy : '#999', lineHeight: 1.6 }}>
          {isOpen ? <span>To apply, email <a href="mailto:careers@deep-bridge.com" style={{ color: sky, fontWeight: 500 }}>careers@deep-bridge.com</a></span> : <span>Role filled. Send your profile to <a href="mailto:careers@deep-bridge.com" style={{ color: '#888' }}>careers@deep-bridge.com</a> for future opportunities.</span>}
        </div>
      </div>
    </div>
  );
}

export default function Careers() {
  return (
    <div style={{ background: '#F7F5F0' }}>
      <PageHero label="Careers at Deep Bridge" title="Work on practical systems that improve real trade" subtitle="We are a small team building serious tools. If you want to see the direct impact of your work, this is the right environment." dark />
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto', padding: SECTION_PAD }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
            <div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', fontWeight: 500 }}>Open positions</div>
            <span style={{ fontSize: 11, fontWeight: 500, background: sky, color: 'white', borderRadius: 20, padding: '2px 10px' }}>{openRoles.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{openRoles.map((role, i) => <RoleCard key={i} role={role} />)}</div>
        </div>
      </div>
      <div style={{ background: surface }}>
        <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto', padding: SECTION_PAD_SM }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
            <div style={{ fontSize: 10, letterSpacing: '2.5px', color: slate, textTransform: 'uppercase', fontWeight: 500 }}>Closed positions</div>
            <span style={{ fontSize: 11, fontWeight: 500, background: '#ddd', color: '#888', borderRadius: 20, padding: '2px 10px' }}>{closedRoles.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{closedRoles.map((role, i) => <RoleCard key={i} role={role} />)}</div>
        </div>
      </div>
      <div style={{ background: navy, padding: '56px 48px' }}>
        <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 14 }}>Don't see the right role?</div>
          <h2 style={{ fontSize: 24, fontWeight: 500, color: 'white', lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: 10 }}>We are always open to strong candidates</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>Send your profile to <a href="mailto:careers@deep-bridge.com" style={{ color: sky }}>careers@deep-bridge.com</a> and we will be in touch.</p>
        </div>
      </div>
    </div>
  );
}
