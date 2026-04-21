import React from 'react';
import PageHero from '../components/PageHero';
import { MAX_WIDTH, SECTION_PAD, SECTION_PAD_SM } from '../components/layout';

const sky = '#29ABE2';
const navy = '#0A2540';
const slate = '#5A6E85';
const border = '#E2DED6';
const surface = '#F2F0EB';

const partnerTypes = [
  { num: '01', title: 'Financial Partners', text: 'Support exporters with better workflow visibility, stronger commercial operations, and a foundation for future trade finance opportunities.', example: 'Banks, trade finance institutions, credit providers' },
  { num: '02', title: 'Trade and Ecosystem Partners', text: 'Work with us to help exporters adopt better systems and modernize commercial operations across trade corridors and industry associations.', example: 'Trade bodies, freight forwarders, logistics platforms' },
  { num: '03', title: 'Implementation Partners', text: 'Help bring Deep Bridge into businesses that need operational setup, data cleanup, and workflow support as part of a broader engagement.', example: 'Consultancies, operational advisors, system integrators' },
  { num: '04', title: 'Data and Network Partners', text: 'Expand the intelligence layer behind Deep Bridge through supplier, product, compliance, or market data that helps exporters make better decisions.', example: 'Supplier databases, compliance providers, market intelligence' },
];

const reasons = [
  'Built around real exporter workflows, not theoretical use cases',
  'Designed from inside the trade ecosystem with firsthand operational knowledge',
  'Strong relevance to operational and commercial pain points',
  'Room to expand into finance, supplier intelligence, and ecosystem services',
];

export default function Partner() {
  return (
    <div style={{ background: '#F7F5F0' }}>
      <PageHero label="Partner with Deep Bridge" title="Building stronger infrastructure around the way trade works" subtitle="We are open to partnerships with financial institutions, trade ecosystem organizations, implementation partners, and data providers who want to help exporters operate more effectively." dark />
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto', padding: SECTION_PAD }}>
          <div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 16 }}>Who we work with</div>
          <h2 style={{ fontSize: 32, fontWeight: 500, color: navy, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 44 }}>Four partnership categories</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: border, borderRadius: 12, overflow: 'hidden' }}>
            {partnerTypes.map((p, i) => (
              <div key={i} className="db-partner-row" style={{ background: 'white', padding: '28px 32px', display: 'grid', gridTemplateColumns: '72px 1fr 1fr', gap: 32, alignItems: 'start' }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: sky, textTransform: 'uppercase', fontWeight: 500, paddingTop: 3 }}>{p.num}</div>
                <div><div style={{ fontSize: 16, fontWeight: 500, color: navy, marginBottom: 8 }}>{p.title}</div><div style={{ fontSize: 13, color: sky, fontStyle: 'italic', lineHeight: 1.6 }}>{p.example}</div></div>
                <div style={{ fontSize: 14, color: slate, lineHeight: 1.8 }}>{p.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: surface }}>
        <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto', padding: SECTION_PAD }}>
          <div className="db-one-two" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 72, alignItems: 'start' }}>
            <div><div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 18 }}>Why partner with us</div><h2 style={{ fontSize: 28, fontWeight: 500, color: navy, lineHeight: 1.1, letterSpacing: '-0.03em' }}>Built from inside the trade ecosystem</h2></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {reasons.map((r, i) => (<div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '20px 24px', background: 'white', borderRadius: i === 0 ? '10px 10px 0 0' : i === reasons.length - 1 ? '0 0 10px 10px' : 0 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: sky, flexShrink: 0, marginTop: 8 }} /><span style={{ fontSize: 15, color: slate, lineHeight: 1.7 }}>{r}</span></div>))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: navy, padding: '72px 48px' }}>
        <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 16 }}>Get in touch</div>
            <h2 style={{ fontSize: 28, fontWeight: 500, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 10 }}>Interested in working together?</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>Get in touch to explore partnership opportunities with Deep Bridge.</p>
          </div>
          <button style={{ background: sky, color: 'white', border: 'none', borderRadius: 8, padding: '14px 28px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Contact us</button>
        </div>
      </div>
    </div>
  );
}
