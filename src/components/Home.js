import React from 'react';
import Hero from './Hero';
import ProofBar from './ProofBar';
import WorkflowSection from './WorkflowSection';
import Features from './Features';
import EvidenceSection from './EvidenceSection';
import CTASection from './CTASection';
import '../styles/theme.css';

function Home() {
  return (
    <div style={{ background: '#F8F7F3' }}>
      <Hero />
      <ProofBar />
      <WorkflowSection />
      <Features />
      <EvidenceSection />
      <CTASection />
    </div>
  );
}

export default Home;
