import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MAX_WIDTH, NAV_HEIGHT, SECTION_PAD, SECTION_PAD_SM } from '../components/layout';

export default function Hero({ stopAnimation, handleModal }){
    const tabs = ["Factory Finder", "Generate Quotation", "Handle Files", "Catalog Generator"];

    const [currentTool, setCurrentTool] = useState(tabs[0]);
    const [userTyped, setUserTyped] = useState(false);
    const [previewHovered, setPreviewHovered] = useState(false);

    
    return(
        <div>
        <style>{`
          @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        `}</style>
          {/*Hero Section*/}
          <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255, 0.1)', borderRadius: 12, padding: 10, boxSizing: 'border-box' }} onClick={stopAnimation}>
            <div style={{ width: '100%', backgroundColor: '#08253f', borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 5, overflow: 'hidden', fontFamily: 'inherit', padding: 10, boxSizing: 'border-box' }}>
              {/*Chat Tabs*/}
              <div style={{ width: '100%', height: 40, display: 'flex', backgroundColor: 'white', borderRadius: 7, justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', margin: '0 auto'}}>
                {tabs.map((tab) => (
                  <div key={tab} style={{ fontSize: 12, fontWeight: 600, color: currentTool === tab ? 'white' : '#08253f', backgroundColor: currentTool === tab ? '#08253f' : 'white', border: '1.5px solid #08253f', 
                    borderRadius: 8, padding: '0 10px', textAlign: 'center', cursor: 'pointer', transition: 'filter 0.2s'}} 
                  onClick={() => setCurrentTool(tab)}
                  onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.9)'}
                  onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                  >
                    {tab}
                  </div>
                ))}
                <div>{/*5th Empty Tab for clean look*/}</div>
              </div>
              {/*Chat Section*/}
                {/*Preview*/}
                <div style={{ width: '100%', height: 410, backgroundColor: 'white', border: '1px solid black', borderRadius: 10, position: 'relative'}}
                  onMouseEnter={() => setPreviewHovered(true)}
                  onMouseLeave={() => setPreviewHovered(false)}>
                    <div>Text</div>
                    {/*Hover Blur Background */}
                    <div style={{
                      width: '100%', height: '100%', borderRadius: 8, display: userTyped ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0,
                      animation: previewHovered ? 'fadeIn 0.3s ease forwards' : 'fadeOut 0.3s ease forwards', opacity: previewHovered ? 1 : 0,
                      pointerEvents: previewHovered ? 'auto' : 'none', backgroundColor: 'rgba(4, 17, 28, 0.6)', backdropFilter: 'blur(6px)',
                    }}>
                        <p > Text</p>
                        <button style={{width: 100, height: 30}} onClick={(e) => { e.stopPropagation(); handleModal(); }}>Book a demo</button>
                    </div>

                </div>
                {/*Bottom Chat tools*/}
                <div style={{ width: '100%', height: 120, backgroundColor: 'white',border: '1px solid #8e8e8e', borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent:'space-between', padding: 8}}>
                {/*Chat input*/}
                  <div style={{width: '100%', height: 60, border: '1px solid #8e8e8e', borderRadius: 8}}>
                    <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <button style={{ fontSize: 12, fontWeight: 600, padding: '8px 14px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                        <i className="fas fa-file-invoice text-warning" style={{ fontSize: 16, color: '#fcc10a', marginRight: 10}}></i>Generate Quotation
                      </button>
                      <div style={{ width: 32, height: 32, border: '1px solid #d1d5db', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#6b7280', cursor: 'pointer' }}>
                        <i className="fas fa-file-upload" style={{ fontSize: 16, color: '#1a2e44' }}/>
                      </div>
                      <div style={{ width: 32, height: 32, border: '1px solid #d1d5db', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', cursor: 'pointer', flexShrink: 0 }}>
                        <i className="fas fa-info-circle" style={{ fontSize: 16, color: '#1a2e44' }} />
                      </div>
                      <input type='textarea' placeholder="Ask the assistant to..." onInput={() => setUserTyped(true)}
                      style={{ flex: 1, fontSize: 13, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, color: '#9ca3af', background: 'white', fontFamily: 'inherit' }}>
                      </input>
                      <button style={{ fontSize: 12, fontWeight: 600, padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
                    </div>
                  </div>

                  {/*Chat History*/}
                  <div style={{width: '100%', height: 30, display: 'flex', alignItems: 'center', gap: 20, padding: '0px 10px', boxSizing: 'border-box'}}>
                    {[
                      { label: 'TS_50001', time: 'Apr 27, 09:40 PM' },
                      { label: 'build a quotation...', time: 'Apr 27, 09:38 PM' },
                      { label: 'give me an examp...', time: 'Apr 27, 09:05 PM' },
                      ].map(chip => (
                        <div key={chip.label} style={{ fontSize: 11, color: '#6b7280', cursor: 'pointer', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 20, padding: '0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ color: '#374151', fontWeight: 500 }}>{chip.label}</span> {chip.time}
                        </div>
                      ))
                    }
                  </div>{/*Chat History*/}
                </div>{/*Bottom Chat tools*/}
            </div>
          </div>
        </div> 
    )
}

