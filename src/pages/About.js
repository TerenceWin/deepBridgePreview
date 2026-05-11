import React from 'react';
import PageHero from '../components/PageHero';
import { useMaxWidth, SECTION_PAD, SECTION_PAD_SM } from '../components/layout';

const sky = '#29ABE2';
const navy = '#0A2540';
const slate = '#5A6E85';
const mist = '#E3F4FC';
const border = '#E2DED6';
const surface = '#F2F0EB';

const beliefs = [
  'Strong factory relationships lead to better pricing and smoother execution.',
  'Longstanding customer relationships create trust and repeat business.',
  'Human judgment still matters in negotiation, coordination, and execution.',
  'Technology should support that reality, not ignore it.',
];

const pillars = ['Operations', 'Technology', 'Research', 'Industry knowledge'];

export default function About() {
  const maxWidth = useMaxWidth();
  return (
    <div style={{ background: '#F7F5F0' }}>
      <PageHero label="About Deep Bridge" title="Built from inside the export business" subtitle="Deep Bridge began with firsthand experience inside a trading company. We saw how much of the day-to-day work was still handled manually across inboxes, spreadsheets, and disconnected files." dark />
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: maxWidth, margin: '0 auto', padding: SECTION_PAD }}>
          <div className="db-one-two" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 72 }}>
            <div><div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 18 }}>Our story</div><h2 style={{ fontSize: 28, fontWeight: 500, color: navy, lineHeight: 1.1, letterSpacing: '-0.03em' }}>We did not start by trying to build a software company</h2></div>
            <div>
              <p style={{ fontSize: 16, color: slate, lineHeight: 1.9, marginBottom: 20 }}>We started by trying to solve real operational problems from the inside. As improvements were introduced into quotation preparation, communication handling, and coordination workflows, the results became visible in speed, clarity, and operational KPIs.</p>
              <p style={{ fontSize: 16, color: slate, lineHeight: 1.9, marginBottom: 28 }}>Rather than improving these workflows for just one business, we saw the opportunity to build something scalable for exporters and manufacturers facing the same problems.</p>
              <div style={{ fontSize: 20, fontWeight: 500, color: navy, borderLeft: `3px solid ${sky}`, paddingLeft: 20, lineHeight: 1.4 }}>That became Deep Bridge.</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: surface }}>
        <div style={{ maxWidth: maxWidth, margin: '0 auto', padding: SECTION_PAD }}>
          <div className="db-one-two" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 72 }}>
            <div><div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 18 }}>Why we moved beyond trading</div><h2 style={{ fontSize: 28, fontWeight: 500, color: navy, lineHeight: 1.1, letterSpacing: '-0.03em' }}>Trade runs on trust, judgment, and relationships</h2></div>
            <div>
              <p style={{ fontSize: 16, color: slate, lineHeight: 1.9, marginBottom: 18 }}>Traditional trading taught us that trade is not just about matching buyers and suppliers. It runs on trust, judgment, timing, negotiation, and long-term relationships.</p>
              <p style={{ fontSize: 16, color: slate, lineHeight: 1.9, marginBottom: 18 }}>It also showed us how much friction still sits underneath that work. Too many teams are still relying on memory, scattered communication, and outdated tools to manage commercially important processes.</p>
              <p style={{ fontSize: 16, color: slate, lineHeight: 1.9 }}>Our goal is not to replace traders, but to equip them with better systems.</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: maxWidth, margin: '0 auto', padding: SECTION_PAD }}>
          <div className="db-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 18 }}>Who we are</div>
              <h2 style={{ fontSize: 28, fontWeight: 500, color: navy, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>Former exporters who built the tools we wished we had</h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{pillars.map(p => <span key={p} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, fontWeight: 500, background: mist, color: navy }}>{p}</span>)}</div>
            </div>
            <div>
              <p style={{ fontSize: 16, color: slate, lineHeight: 1.9 }}>What started as an internal solution for managing quotations, communication, and coordination has grown into Deep Bridge, a company focused on helping other exporters work faster and more clearly.</p>
              <p style={{ fontSize: 16, color: slate, lineHeight: 1.9, marginTop: 14 }}>Behind it is a multidisciplinary team spanning operations, technology, research, and industry knowledge.</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: navy }}>
        <div style={{ maxWidth: maxWidth, margin: '0 auto', padding: SECTION_PAD }}>
          <div className="db-one-two" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 72, alignItems: 'start' }}>
            <div><div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 18 }}>What we believe</div><h2 style={{ fontSize: 28, fontWeight: 500, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em' }}>The future of trade is not about replacing traders</h2></div>
            <div>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, marginBottom: 28 }}>We believe the future of trade is not about replacing traders. It is about equipping them better.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 36 }}>
                {beliefs.map((b, i) => (<div key={i} className="db-belief-card" style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '18px 22px', background: 'rgba(255,255,255,0.04)', borderRadius: i === 0 ? '10px 10px 0 0' : i === beliefs.length - 1 ? '0 0 10px 10px' : 0 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: sky, flexShrink: 0, marginTop: 8 }} /><span style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{b}</span></div>))}
              </div>
              <p style={{ fontSize: 16, color: 'white', fontWeight: 500 }}>Deep Bridge is built to give exporters better tools while preserving the relationships that make trade work.</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: sky, padding: '72px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: '2.5px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: 18 }}>Build with us</div>
        <h2 style={{ fontSize: 32, fontWeight: 500, color: 'white', marginBottom: 14, letterSpacing: '-0.03em' }}>Building for exporters who want stronger systems</h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.7 }}>BOOK A DEMO and see how Deep Bridge can support your workflow, from quotation preparation and risk flags to supplier search and commercial materials.</p>
        <button style={{ background: 'white', color: sky, border: 'none', borderRadius: 8, padding: '13px 32px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>BOOK A DEMO</button>
      </div>
    </div>
  );
}
