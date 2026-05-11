import React from 'react';

const navy = '#0A2540';
const slate = '#5A6E85';

export function HeroOverlay({ overlayMounted, overlayFadeIn, dismissOverlayFn, setGuideStep, isLaptop, isTablet, isMobile }) {
  if (!overlayMounted) return null;
  return (
    <div className="db-rotating-border" style={{ position: 'absolute', inset: 0, borderRadius: 12, zIndex: 100, animation: `${overlayFadeIn ? 'fadeIn' : 'fadeOut'} 0.3s ease forwards`, boxShadow: '0 0 30px rgba(255,255,255,0.12), 0 0 60px rgba(255,255,255,0.06)' }}>
      <div style={{ position: 'absolute', inset: isMobile ? 2 : 5, borderRadius: 10, background: 'linear-gradient(135deg, #0e304e 0%, #092540 20%, #021527 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <div style={{ color: 'white', fontSize: isLaptop ? 36 : isTablet ? 28 : isMobile ? 18 : 48, fontWeight: 500, letterSpacing: '-0.01em' }}>
          How would you like to get started?
        </div>
        <div style={{ display: 'flex', gap: 52 }}>
          <button className="db-overlay-btn" onClick={() => { dismissOverlayFn(); setGuideStep(0); }}
            style={{ padding: isTablet ? '10px 20px' : isMobile ? '5px 10px' : '15px 32px', fontSize: isLaptop ? 16 : isTablet ? 14 : isMobile ? 12 : 18, fontWeight: 600, background: 'white', color: '#092540', border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(9,37,64,0.12), 0 1px 4px rgba(9,37,64,0.08)' }}>
            Use a Guide
          </button>
          <button className="db-overlay-btn" onClick={dismissOverlayFn}
            style={{ padding: isTablet ? '10px 20px' : isMobile ? '5px 10px' : '15px 32px', fontSize: isLaptop ? 16 : isTablet ? 14 : isMobile ? 12 : 18, fontWeight: 600, background: 'transparent', color: 'white', border: '1px solid white', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}>
            Try it myself
          </button>
        </div>
      </div>
    </div>
  );
}

export function GuideBubble({ guideStep, guideSteps, setGuideStep, setGuideWatchMode, isMobile, isTablet }) {
  if (guideStep === null) return null;
  const step = guideSteps[guideStep];
  const b = step.textSizeBoost ?? 0;

  // Responsive width
  const baseWidth = step.width ?? 300;
  const width = isMobile ? Math.min(baseWidth, 210) : isTablet ? Math.min(baseWidth, 270) : baseWidth;

  // On mobile the toolbar is 2 rows tall (~145px), desktop is 1 row (~90px)
  const toolbarBottom = isMobile ? 145 : 90;
  const walkthroughBottom = isMobile ? 155 : isTablet ? 130 : 120;

  // Responsive position overrides — prevent bubbles overflowing narrow screens
  const responsiveStyle = (() => {
    if (guideStep === 0) return step.style;
    if (guideStep === 1) return { bottom: toolbarBottom, left: isMobile ? 8 : isTablet ? 20 : 40 };
    // Upload: right-align on mobile so arrow can reach the icon (which is right of center)
    if (guideStep === 2) return { bottom: toolbarBottom, ...(isMobile ? { right: 8 } : { left: isTablet ? 20 : 220 }) };
    // Textarea: center the bubble on mobile since textarea spans full width
    if (guideStep === 3) return { bottom: toolbarBottom, ...(isMobile ? { left: '50%', transform: 'translateX(-50%)' } : { right: isTablet ? 20 : 40 }) };
    return { bottom: walkthroughBottom, right: isMobile ? 8 : isTablet ? 20 : 40 };
  })();

  // Shrink fonts 1pt on mobile to fit narrower bubbles
  const f = b + (isMobile ? -1 : 0);

  // Arrow rendered with a custom left offset so it lands on the target component.
  // Estimates based on typical mobile layout (container ~340px):
  //   guideStep 1: tab switcher center ≈ 128px from left, bubble left: 8  → arrow at 120
  //   guideStep 2: upload center ≈ 239px from left, bubble right: 8
  //                bubble left edge ≈ 340-8-210=122 → arrow at 239-122=117
  //   guideStep 3: textarea center ≈ 180px, bubble centered (left edge ≈ 65) → arrow at 105 (mid-bubble)
  const arrowStyle = { position: 'absolute', bottom: -8, width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid white' };
  const renderArrow = () => {
    if (!step.arrow) return null;
    if (isMobile) {
      if (guideStep === 1) return <div style={{ ...arrowStyle, left: 100 }} />;
      if (guideStep === 2) return <div style={{ ...arrowStyle, left: 117 }} />;
      if (guideStep === 3) return <div style={{ ...arrowStyle, left: 105 }} />;
    }
    if (step.arrow === 'down-left') return <div style={{ ...arrowStyle, left: 20 }} />;
    if (step.arrow === 'down-right') return <div style={{ ...arrowStyle, right: 20 }} />;
    return null;
  };

  return (
    <div key={guideStep} style={{ position: 'absolute', ...responsiveStyle, zIndex: 99, width, background: 'white', borderRadius: 10, padding: isMobile ? '12px 14px' : '16px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', animation: 'fadeIn 0.25s ease forwards' }}>
      <div style={{ fontSize: 10 + f, color: '#29ABE2', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6 }}>{step.label} · Step {guideStep + 1} of {guideSteps.length}</div>
      <div style={{ fontSize: 13 + f, fontWeight: 600, color: navy, marginBottom: 8 }}>{step.title}</div>
      {step.prompt ? (
        <>
          <div style={{ background: '#f3f4f6', borderRadius: 6, padding: '6px 10px', fontSize: 11 + f, color: '#374151', marginBottom: 10, fontStyle: 'italic' }}>"{step.prompt}"</div>
          <div style={{ fontSize: 12 + f, color: slate, lineHeight: 1.65, marginBottom: 10 }}><span style={{ fontWeight: 600, color: navy }}>Response: </span>{step.output}</div>
          {!isMobile && (
            <div style={{ fontSize: 11 + f, color: '#8A9BB0', lineHeight: 1.6, borderTop: '1px solid #e5e7eb', paddingTop: 8 }}>
              <i className="fas fa-cog" style={{ marginRight: 5, fontSize: 10 + f }} />{step.background}
            </div>
          )}
        </>
      ) : (
        <div style={{ fontSize: 13 + f, color: slate, lineHeight: 1.7 }}>{step.text}</div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
        <button
          onClick={() => {
            if (guideStep === 3) { setGuideStep(null); setGuideWatchMode(true); }
            else if (guideStep >= 4) { setGuideStep(null); }
            else { setGuideStep(guideStep + 1); }
          }}
          style={{ padding: '7px 16px', fontSize: 12 + f, fontWeight: 600, background: navy, color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          {guideStep === 3 ? 'Start Exploring →' : guideStep >= 4 ? 'Got it' : 'Next →'}
        </button>
      </div>
      {renderArrow()}
    </div>
  );
}
