import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MAX_WIDTH, NAV_HEIGHT, SECTION_PAD, SECTION_PAD_SM } from '../components/layout';
import data from './heroData.js'

export default function HeroSection({ stopAnimation, handleModal, isDesktop }){
    const tabs = ["Factory Finder", "Generate Quotation", "Handle Files", "Catalog Generator"];

    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [userTyped, setUserTyped] = useState(false);
    const [previewHovered, setPreviewHovered] = useState(false);
    const tabIntervalRef = useRef(null);

    const [isFocused, setIsFocused] = useState(false);
    const [typingText, setTypingText] = useState('');
    const typingIntervalRef = useRef(null);
    const [stage, setStage] = useState(0);
    const currentStageRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);
    
    const [showClickMe, setShowClickMe] = useState(false);
    const [tabDropdownOpen, setTabDropdownOpen] = useState(false);
    const [tabDropdownClosing, setTabDropdownClosing] = useState(false);
    const tabDropdownRef = useRef(null);


    //Clear & Reset Chat history
    useEffect(() => {
      setStage(0);
      setMessages([]);
    }, [currentTab]);

    //Typing Animation
    useEffect(() => {
      clearInterval(typingIntervalRef.current);
      setTypingText('');
      const tabText = data[currentTab]?.[stage]?.input;
      if (!tabText) return;
      let i = 0;
      typingIntervalRef.current = setInterval(() => {
        i++;
        setTypingText(tabText.slice(0, i));
        if (i === tabText.length) clearInterval(typingIntervalRef.current);
      }, 15);
      return () => clearInterval(typingIntervalRef.current);
    }, [currentTab, stage]);

    const handleTabIcon = (tab) => {
      if (tab === tabs[0]) return "fas fa-industry";
      if (tab === tabs[1]) return "fas fa-file-invoice";
      if (tab === tabs[2]) return "fas fa-file-upload";
      return "fas fa-list";
    }

    const handleIcon = () => {
        if (currentTab === tabs[0]) return "fas fa-industry";
        if (currentTab === tabs[1]) return "fas fa-file-invoice";
        if (currentTab === tabs[2]) return "fas fa-file-upload";
        return "fas fa-list";
    }
    
    //10 second intervals tab switching
    const startTabInterval = () => {
        clearInterval(tabIntervalRef.current);
        tabIntervalRef.current = setInterval(() => {
            setCurrentTab(prev => {
                const i = tabs.indexOf(prev);
                return tabs[(i + 1) % tabs.length];
            });
        }, 4000);
    };

    //Reset 10 second tab switching timer when page loads 
    useEffect(() => {
        startTabInterval();
        return () => clearInterval(tabIntervalRef.current);
    }, []);

    useEffect(() => {
      const t = setTimeout(() => setShowClickMe(true), 3000);
      return () => clearTimeout(t);
    }, []);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (tabDropdownOpen && tabDropdownRef.current && !tabDropdownRef.current.contains(e.target)) {
          setTabDropdownClosing(true);
          setTimeout(() => { setTabDropdownOpen(false); setTabDropdownClosing(false); }, 250);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [tabDropdownOpen]);

    //Send Buttons Clicked 
    // -> Stop tab switching, typing animation
    // -> Get the response data
    // -> Check if input is last, Yes? -> display 'Book a demo' 
    const handleSend = () => {
      if (!typingText.trim()) return;
      clearInterval(tabIntervalRef.current);
      clearInterval(typingIntervalRef.current);
      const output = data[currentTab]?.[stage]?.output ?? [];
      setMessages(prev => [...prev, { role: 'user', text: typingText }, { role: 'ai', output, tab: currentTab }]);
      setTypingText('');
      setUserTyped(true);
      setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
      const totalStages = data[currentTab]?.length ?? 0;
      if (stage < totalStages - 1) {
        setStage(prev => prev + 1);
      } else {
        handleModal();
      }
    };

    

    const renderAIOutput = (output, tab) => {
      if (!output || output.length === 0) return <span style={{ color: '#6b7280', fontSize: 12 }}>No output available yet.</span>;

      if (tab === 'Factory Finder') {
        const summary = typeof output[0] === 'string' ? output[0] : null;
        const suppliers = output.slice(summary ? 1 : 0);
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {summary && <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{summary}</p>}
            {suppliers.map((s, idx) => {
              const name = s.find?.(x => x.name)?.name;
              const url = s.find?.(x => x.url)?.url;
              const desc = s.find?.(x => x.description)?.description;
              const images = s.find?.(x => x.productImages)?.productImages ?? [];
              return (
                <div key={idx} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: 10 }}>
                  <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 12, color: '#111827' }}>{name}</p>
                  <p style={{ margin: '0 0 6px', fontSize: 11, color: '#6b7280', lineHeight: 1.4 }}>{desc}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {images.map((img, i) => (
                      <img key={i} src={img} alt="" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb' }} />
                    ))}
                  </div>
                  {url && <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: '#2563eb', wordBreak: 'break-all' }}>{url}</a>}
                </div>
              );
            })}
          </div>
        );
      }

      const desc = output[0]?.description;
      if (desc) return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{desc}</p>;
      return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{JSON.stringify(output)}</p>;
    };
    
    return(
        <div>
        <style>{`
          @keyframes fadeIn      { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeOut     { from { opacity: 1; } to { opacity: 0; } }
          @keyframes tabFadeIn   { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          @keyframes scrollUp    { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes tabExpand   { from { opacity: 0; transform: scaleY(0); } to { opacity: 1; transform: scaleY(1); } }
          @keyframes tabShrink   { from { opacity: 1; transform: scaleY(1); } to { opacity: 0; transform: scaleY(0); } }
        `}</style>

          {/*Hero Section*/}
          <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255, 0.1)', borderRadius: 12, padding: 10, boxSizing: 'border-box' }} onClick={stopAnimation}>
            <div style={{ width: '100%', backgroundColor: '#08253f', borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 5, overflow: 'hidden', fontFamily: 'inherit', padding: 10, boxSizing: 'border-box' }}>

              {/*Chat Section*/}
                <div style={{ width: '100%', height: isDesktop ? 500 :410, backgroundColor: 'white', border: '1px solid black', borderRadius: 10, position: 'relative'}}
                  onMouseEnter={() => setPreviewHovered(true)}
                  onMouseLeave={() => setPreviewHovered(false)}>
                    {/*Preview - iMessage chat*/}
                    <div ref={chatContainerRef} style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'border-box' }}>
                      {messages.length === 0 && (
                        <div style={{ margin: 'auto', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
                          <i className={handleIcon()} style={{ fontSize: 28, marginBottom: 8, display: 'block', color: currentTab === tabs[0] ? '#1fc9ed' : currentTab === tabs[1] ? '#fcc10a' : currentTab === tabs[2] ? '#e02f3e' : '#049669' }} />
                          Try sending a message
                        </div>
                      )}
                      {messages.map((msg, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                          {msg.role === 'user' ? (
                            <div style={{ maxWidth: '70%', background: '#2563eb', color: 'white', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', fontSize: 13, lineHeight: 1.5 }}>
                              {msg.text}
                            </div>
                          ) : (
                            <div style={{ maxWidth: '85%', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '18px 18px 18px 4px', padding: '10px 14px', fontSize: 13 }}>
                              {renderAIOutput(msg.output, msg.tab)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>


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
                      <div ref={tabDropdownRef} style={{ position: 'relative', width: 180 }}>
                        <button
                          onClick={() => {
                            if (tabDropdownOpen) {
                              setTabDropdownClosing(true);
                              setTimeout(() => { setTabDropdownOpen(false); setTabDropdownClosing(false); }, 250);
                            } else {
                              setTabDropdownOpen(true);
                            }
                          }}
                          style={{ width: '100%', fontSize: 12, fontWeight: 600, padding: '8px 14px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                          <i className={handleIcon()} style={{ fontSize: 16, marginRight: 10, display: 'inline-block', animation: 'scrollUp 0.5s ease forwards',
                              color: currentTab === tabs[0] ? '#1fc9ed' : currentTab === tabs[1] ? '#fcc10a' : currentTab === tabs[2] ? '#e02f3e' : '#049669'
                          }}></i>
                          <span key={currentTab} style={{ display: 'inline-block', animation: 'scrollUp 0.5s ease forwards' }}>
                            {currentTab}
                          </span>
                        </button>
                        {tabDropdownOpen && (
                          <div style={{
                            position: 'absolute', bottom: '110%', left: 0, width: '100%',
                            background: 'white', border: '1px solid #d1d5db', borderRadius: 6,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 50,
                            transformOrigin: 'bottom',
                            animation: `${tabDropdownClosing ? 'tabShrink' : 'tabExpand'} 0.25s ease forwards`,
                          }}>
                            {tabs.map(tab => (
                              <div
                                key={tab}
                                onClick={() => {
                                  setCurrentTab(tab);
                                  setTabDropdownClosing(true);
                                  setTimeout(() => { setTabDropdownOpen(false); setTabDropdownClosing(false); }, 250);
                                }}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
                                  fontSize: 12, fontWeight: tab === currentTab ? 600 : 400,
                                  cursor: 'pointer', background: tab === currentTab ? '#f0f9ff' : 'white',
                                  color: '#111827',
                                }}
                                onMouseEnter={e => { if (tab !== currentTab) e.currentTarget.style.background = '#f3f4f6'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = tab === currentTab ? '#f0f9ff' : 'white'; }}
                              >
                                <i className={handleTabIcon(tab)} style={{ fontSize: 13, color: tab === tabs[0] ? '#1fc9ed' : tab === tabs[1] ? '#fcc10a' : tab === tabs[2] ? '#e02f3e' : '#049669' }} />
                                {tab}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div style={{ width: 32, height: 32, border: '1px solid #d1d5db', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#6b7280', cursor: 'pointer' }}>
                        <i className="fa fa-upload" style={{ fontSize: 16, color: '#1a2e44' }}/>
                      </div>
                      <div style={{ width: 32, height: 32, border: '1px solid #d1d5db', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', cursor: 'pointer', flexShrink: 0 }}>
                        <i className="fas fa-info-circle" style={{ fontSize: 16, color: '#1a2e44' }} />
                      </div>
                      <input type='text'
                        onFocus={() => { setIsFocused(true); clearInterval(tabIntervalRef.current); }}
                        onBlur={() => { setIsFocused(false); startTabInterval(); }}
                        onChange={e => {
                          setTypingText(e.target.value);
                          handleModal();
                        }}
                        onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                        style={{ flex: 1, fontSize: 13, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, color: 'black', background: 'white', fontFamily: 'inherit'}}
                        value={typingText}
                      />
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <div style={{ position: 'absolute', bottom: '130%', left: '100%', transform: 'translateX(-50%)', background: '#1fc9ed', color: 'white', fontSize: 11, fontWeight: 600,
                          padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap', pointerEvents: 'none', display: 'flex',
                          opacity: showClickMe ? 1 : 0, transition: 'opacity 0.6s ease' }}>
                          Click me
                          <div style={{ position: 'absolute', top: '100%', left: '30%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #1fc9ed' }} />
                        </div>
                        <button style={{ fontSize: 12, fontWeight: 600, padding: '10px', background: '#1fc9ed', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit' }}
                        onClick={() => handleSend()}>
                          Send</button>
                      </div>
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

