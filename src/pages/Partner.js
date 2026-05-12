import React from 'react';
import PageHero from '../components/PageHero';
import { useMaxWidth, SECTION_PAD, SECTION_PAD_SM, useIsMobile } from '../components/layout';

const sky = '#29ABE2';
const navy = '#0A2540';
const navyMid = '#0F3D6E';
const slate = '#5A6E85';
const border = '#E2DED6';
const surface = '#F2F0EB';
const mist = '#E3F4FC';

const partners = [
  {
    num: '01',
    title: 'Financial Partners',
    who: 'Banks, trade finance institutions, and credit providers',
    body: 'We work with financial partners who want better visibility into exporter workflows and a stronger base for future finance related services.',
    detail: 'Exporters who manage their operations through Deep Bridge generate structured, traceable data across quotations, supplier coordination, and commercial activity. That operational clarity is useful for financial institutions thinking about credit assessment, product fit, and client relationships in the trade space.',
    points: [
      'Visibility into exporter workflow and commercial output',
      'Stronger foundation for future finance related conversations',
      'Access to a segment that is active, growing, and underserved by current tools',
    ],
  },
  {
    num: '02',
    title: 'Trade and Ecosystem Partners',
    who: 'Trade bodies, freight forwarders, logistics platforms, and industry networks',
    body: 'We partner with organizations helping exporters modernize operations and adopt better systems across industries and trade corridors.',
    detail: 'Exporters operate within a wider ecosystem. When freight, compliance, logistics, and workflow systems work better together, the whole chain moves faster. We are open to working with organizations that are already embedded in that ecosystem and want to offer their clients stronger operational infrastructure.',
    points: [
      'Complementary capabilities that strengthen what you already offer',
      'Shared interest in helping exporters operate more effectively',
      'Potential for joint solutions across industry and trade corridor verticals',
    ],
  },
];

function PartnerCard({ partner, flipped }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: flipped ? '1fr 1.4fr' : '1.4fr 1fr',
      background: navy,
      borderRadius: 16,
      overflow: 'hidden',
      minHeight: 380,
    }}>
      {/* Left / content side */}
      {!flipped && (
        <div style={{ padding: '52px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '3px', color: sky, textTransform: 'uppercase', marginBottom: 20, fontWeight: 500 }}>{partner.num}</div>
            <h2 style={{ fontSize: 30, fontWeight: 500, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 }}>{partner.title}</h2>
            <div style={{ fontSize: 13, color: sky, lineHeight: 1.6, marginBottom: 24, fontStyle: 'italic' }}>{partner.who}</div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85 }}>{partner.body}</p>
          </div>
          <div style={{ marginTop: 40, paddingTop: 28, borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
            <a href="mailto:info@deep-bridge.com" style={{ fontSize: 13, color: sky, fontWeight: 500, letterSpacing: '0.2px' }}>Get in touch →</a>
          </div>
        </div>
      )}

      {/* Right / dark detail side */}
      <div style={{ background: navyMid, padding: '52px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, marginBottom: 36 }}>{partner.detail}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {partner.points.map((pt, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                padding: '16px 0',
                borderBottom: i < partner.points.length - 1 ? '0.5px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: sky, flexShrink: 0, marginTop: 7, opacity: 0.7 }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flipped: content on right */}
      {flipped && (
        <div style={{ padding: '52px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '3px', color: sky, textTransform: 'uppercase', marginBottom: 20, fontWeight: 500 }}>{partner.num}</div>
            <h2 style={{ fontSize: 30, fontWeight: 500, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 }}>{partner.title}</h2>
            <div style={{ fontSize: 13, color: sky, lineHeight: 1.6, marginBottom: 24, fontStyle: 'italic' }}>{partner.who}</div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85 }}>{partner.body}</p>
          </div>
          <div style={{ marginTop: 40, paddingTop: 28, borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
            <a href="mailto:info@deep-bridge.com" style={{ fontSize: 13, color: sky, fontWeight: 500, letterSpacing: '0.2px' }}>Get in touch →</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Partner() {
  const maxWidth = useMaxWidth();
  const isMobile = useIsMobile();
  return (
    <div style={{ background: '#F7F5F0' }}>
      <PageHero
        label="Partner with Deep Bridge"
        title="Working with those who are already inside the trade ecosystem"
        subtitle="We are open to partnerships with financial institutions and trade ecosystem organizations who want to help exporters operate more effectively."
        dark
      />

      {/* TWO PARTNER CARDS */}
      <div style={{ background: surface }}>
        <div className="db-section" style={{ maxWidth: maxWidth, margin: '0 auto', padding: SECTION_PAD }}>
          <div style={{ fontSize: 10, letterSpacing: '2.5px', color: slate, textTransform: 'uppercase', marginBottom: 40 }}>Partnership types</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {partners.map((p, i) => (
              <div
                key={i}
                className="db-partner-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : (i % 2 === 0 ? '1.4fr 1fr' : '1fr 1.4fr'),
                  background: navy,
                  borderRadius: 16,
                  overflow: 'hidden',
                  minHeight: isMobile ? 'unset' : 360,
                }}
              >
                {/* Main content */}
                {i % 2 === 0 && (
                  <div style={{ padding: isMobile ? '32px 24px' : '48px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: '3px', color: sky, textTransform: 'uppercase', marginBottom: 18, fontWeight: 500 }}>{p.num}</div>
                      <h2 style={{ fontSize: 28, fontWeight: 500, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 14 }}>{p.title}</h2>
                      <div style={{ fontSize: 13, color: sky, lineHeight: 1.6, marginBottom: 22, fontStyle: 'italic' }}>{p.who}</div>
                      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85 }}>{p.body}</p>
                    </div>
                    <div style={{ marginTop: 36, paddingTop: 24, borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
                      <a href="mailto:info@deep-bridge.com" style={{ fontSize: 13, color: sky, fontWeight: 500 }}>Get in touch →</a>
                    </div>
                  </div>
                )}

                {/* Detail panel */}
                <div style={{ background: navyMid, padding: isMobile ? '32px 24px' : '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, marginBottom: 32 }}>{p.detail}</p>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {p.points.map((pt, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '14px 0', borderBottom: j < p.points.length - 1 ? '0.5px solid rgba(255,255,255,0.07)' : 'none' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: sky, flexShrink: 0, marginTop: 7, opacity: 0.65 }} />
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flipped: content on right */}
                {i % 2 !== 0 && (
                  <div style={{ padding: isMobile ? '32px 24px' : '48px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', order: isMobile ? -1 : 'unset' }}>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: '3px', color: sky, textTransform: 'uppercase', marginBottom: 18, fontWeight: 500 }}>{p.num}</div>
                      <h2 style={{ fontSize: 28, fontWeight: 500, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 14 }}>{p.title}</h2>
                      <div style={{ fontSize: 13, color: sky, lineHeight: 1.6, marginBottom: 22, fontStyle: 'italic' }}>{p.who}</div>
                      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85 }}>{p.body}</p>
                    </div>
                    <div style={{ marginTop: 36, paddingTop: 24, borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
                      <a href="mailto:info@deep-bridge.com" style={{ fontSize: 13, color: sky, fontWeight: 500 }}>Get in touch →</a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div style={{ background: navy }}>
        <div style={{ maxWidth: maxWidth, margin: '0 auto', padding: '72px 48px' }}>
          <div className="db-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 16 }}>Interested in working together?</div>
              <h2 style={{ fontSize: 30, fontWeight: 500, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 }}>We would like to hear from you</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>If what we are building feels relevant to what you do, reach out. We are happy to have an early conversation with no particular agenda.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: '24px 28px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 11, letterSpacing: '1.5px', color: sky, textTransform: 'uppercase', marginBottom: 8 }}>General enquiries</div>
                <a href="mailto:info@deep-bridge.com" style={{ fontSize: 15, color: 'white', fontWeight: 500 }}>info@deep-bridge.com</a>
              </div>
              <div style={{ padding: '16px 28px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>Unit 1127, 11th Floor, Metro Centre 2· Kowloon Bay, Hong Kong</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
