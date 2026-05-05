import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MAX_WIDTH, NAV_HEIGHT, SECTION_PAD, SECTION_PAD_SM } from '../components/layout';
import data, { handleFilesFollowUps } from './heroData.js'
import { handleFile1, handleFile2, handleFile3 } from './handleFilesData.js'
import FactoryFinderOutput, { FactoryFinderUpload } from './FactoryFinder.js'
import QuotationGeneratorOutput, { QuotationGeneratorUpload } from './QuotationGenerator.js'
import HandleFilesOutput, { HandleFilesUpload } from './HandleFiles.js'
import CatalogGeneratorOutput, { CatalogGeneratorUpload } from './CatalogGenerator.js'
import testProduct1 from '../images/heroSection/testProduct1.jpeg';
import testProduct2 from '../images/heroSection/testProduct2.jpeg';
import testProduct3 from '../images/heroSection/testProduct3.webp';
import testProduct4 from '../images/heroSection/testProduct4.png';
import testProduct5 from '../images/heroSection/testProduct5.jpg';
import testProduct5webp from '../images/heroSection/testProduct5.webp';
import handleFiles1 from '../images/heroSection/handleFiles/handleFiles1.pptx';
import handleFiles2 from '../images/heroSection/handleFiles/handleFiles2.pptx';
import handleFiles3 from '../images/heroSection/handleFiles/handleFiles3.pptx';

export default function HeroSection({ stopAnimation, handleModal, isDesktop }){
    const tabs = ["Factory Finder", "Generate Quotation", "Handle Files", "Catalog Generator"];

    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [userTyped, setUserTyped] = useState(false);
    const [previewHovered, setPreviewHovered] = useState(false);
    const tabIntervalRef = useRef(null);

    const [isFocused, setIsFocused] = useState(false);
    const [typingText, setTypingText] = useState('');
    const typingIntervalRef = useRef(null);
    const [userStages, setUserStages] = useState({});
    const currentStageRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);
    
    const messageIdCounter = useRef(0);
    const [isAiTyping, setIsAiTyping] = useState(false);
    const aiTypingTimerRef = useRef(null);
    const [saveToast, setSaveToast] = useState(null);
    const [showClickMe, setShowClickMe] = useState(false);
    const [tabDropdownOpen, setTabDropdownOpen] = useState(false);
    const [tabDropdownClosing, setTabDropdownClosing] = useState(false);
    const tabDropdownRef = useRef(null);
    const [selectedUser, setSelectedUser] = useState({ name: 'Marcus Lin', color: '#1fc9ed' });
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [userDropdownClosing, setUserDropdownClosing] = useState(false);
    const userDropdownRef = useRef(null);
    const [uploadDropdownOpen, setUploadDropdownOpen] = useState(false);
    const [uploadDropdownClosing, setUploadDropdownClosing] = useState(false);
    const uploadDropdownRef = useRef(null);
    const [selectedHandleFile, setSelectedHandleFile] = useState(null);
    const [processedFile, setProcessedFile] = useState(null);
    const [processedFilesSet, setProcessedFilesSet] = useState(new Set());
    const [selectedProductImage, setSelectedProductImage] = useState(null);
    const uploadImages = [testProduct1, testProduct2, testProduct3, testProduct4, testProduct5, testProduct5webp];
    const handleFilesItems = [
      { file: handleFiles1, name: 'handleFiles1.pptx' },
      { file: handleFiles2, name: 'handleFiles2.pptx' },
      { file: handleFiles3, name: 'handleFiles3.pptx' },
    ];
    const users = [
      { name: 'Marcus Lin',    color: '#1fc9ed' },
      { name: 'Priya Nair',   color: '#fcc10a' },
      { name: 'Ethan Wolfe',  color: '#e02f3e' },
      { name: 'Chloe Park',   color: '#049669' },
    ];


    //Clear & Reset Chat history + all user stages on tab switch
    useEffect(() => {
      setUserStages({});
      setMessages([]);
      setProcessedFile(null);
      setProcessedFilesSet(new Set());
    }, [currentTab]);

    //Typing Animation
    useEffect(() => {
      clearInterval(typingIntervalRef.current);
      setTypingText('');
      const stage = userStages[selectedUser.name] ?? 0;
      const tabText = (currentTab === 'Handle Files' && stage > 0 && processedFile)
        ? handleFilesFollowUps[processedFile]?.[selectedUser.name]?.[stage - 1]?.input
        : data[currentTab]?.[selectedUser.name]?.[stage]?.input;
      if (!tabText) return;
      let i = 0;
      typingIntervalRef.current = setInterval(() => {
        i++;
        setTypingText(tabText.slice(0, i));
        if (i === tabText.length) clearInterval(typingIntervalRef.current);
      }, 15);
      return () => clearInterval(typingIntervalRef.current);
    }, [currentTab, selectedUser.name, userStages, processedFile]);

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
        }, 10000);
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

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (userDropdownOpen && userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
          setUserDropdownClosing(true);
          setTimeout(() => { setUserDropdownOpen(false); setUserDropdownClosing(false); }, 250);
          startTabInterval();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [userDropdownOpen]);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (uploadDropdownOpen && uploadDropdownRef.current && !uploadDropdownRef.current.contains(e.target)) {
          setUploadDropdownClosing(true);
          setTimeout(() => { setUploadDropdownOpen(false); setUploadDropdownClosing(false); }, 250);
          startTabInterval();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [uploadDropdownOpen]);

    //Send Buttons Clicked
    // -> Stop tab switching, typing animation
    // -> Get the response data
    // -> Check if input is last, Yes? -> display 'Book a demo'
    const handleSend = () => {
      if (!typingText.trim()) return;
      clearInterval(tabIntervalRef.current);
      clearInterval(typingIntervalRef.current);
      const stage = userStages[selectedUser.name] ?? 0;
      let output;
      let isLast;
      if (currentTab === 'Handle Files' && stage > 0 && processedFile) {
        const followUps = handleFilesFollowUps[processedFile]?.[selectedUser.name] ?? [];
        output = followUps[stage - 1]?.output ?? [];
        isLast = stage >= followUps.length;
      } else {
        output = data[currentTab]?.[selectedUser.name]?.[stage]?.output ?? [];
        const totalStages = data[currentTab]?.[selectedUser.name]?.length ?? 0;
        isLast = stage >= totalStages - 1;
      }
      const thinkingId = ++messageIdCounter.current;
      setMessages(prev => [...prev,
        { role: 'user', text: typingText, user: selectedUser, id: ++messageIdCounter.current },
        { role: 'ai', isThinking: true, id: thinkingId },
      ]);
      setTypingText('');
      setUserTyped(true);
      setUserStages(prev => ({ ...prev, [selectedUser.name]: stage + 1 }));
      setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
      setTimeout(() => {
        setMessages(prev => prev.map(m =>
          m.id === thinkingId
            ? { role: 'ai', output, tab: currentTab, showThought: true, animate: true, id: thinkingId }
            : m
        ));
        startAiTyping(output, isLast ? handleModal : undefined);
        setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
      }, 1000);
    };

    const fileDataMap = {
      'handleFiles1.pptx': handleFile1,
      'handleFiles2.pptx': handleFile2,
      'handleFiles3.pptx': handleFile3,
    };

    const handleProcessFiles = () => {
      if (!selectedHandleFile) return;
      if (processedFilesSet.has(selectedHandleFile)) return;
      const fileData = fileDataMap[selectedHandleFile];
      const thinkingId = ++messageIdCounter.current;
      setMessages(prev => [
        ...prev,
        { role: 'user', text: 'Upload and Process files', user: selectedUser, fileUpload: selectedHandleFile, id: ++messageIdCounter.current },
        { role: 'ai', isThinking: true, id: thinkingId },
      ]);
      setTypingText('');
      setUserTyped(true);
      setUploadDropdownClosing(true);
      setTimeout(() => { setUploadDropdownOpen(false); setUploadDropdownClosing(false); }, 250);
      clearInterval(tabIntervalRef.current);
      setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
      setProcessedFile(selectedHandleFile);
      setProcessedFilesSet(prev => new Set([...prev, selectedHandleFile]));
      const resetStages = {};
      users.forEach(u => { resetStages[u.name] = 1; });
      setUserStages(resetStages);
      setTimeout(() => {
        const fileSuccessOutput = [{ type: 'fileSuccess', fileName: selectedHandleFile }];
        const fileFollowUpOutput = [{ type: 'fileFollowUp' }];
        setMessages(prev => {
          const idx = prev.findIndex(m => m.id === thinkingId);
          if (idx === -1) return prev;
          const next = [...prev];
          next.splice(idx, 1,
            { role: 'ai', output: fileSuccessOutput, tab: currentTab, showThought: true, animate: true, id: ++messageIdCounter.current },
            { role: 'ai', output: [{ type: 'fileDetails', fileData }], tab: currentTab, showThought: false, animate: false, id: ++messageIdCounter.current },
            { role: 'ai', output: fileFollowUpOutput, tab: currentTab, showThought: false, animate: true, id: ++messageIdCounter.current },
          );
          return next;
        });
        startAiTyping([...fileSuccessOutput, ...fileFollowUpOutput]);
        setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
      }, 1000);
    };

    const countOutputChars = (output) => {
      let n = 0;
      const walk = (v) => {
        if (typeof v === 'string') n += v.length;
        else if (Array.isArray(v)) v.forEach(walk);
        else if (v && typeof v === 'object') Object.values(v).forEach(walk);
      };
      walk(output);
      return n;
    };

    const startAiTyping = (output, onDone) => {
      clearTimeout(aiTypingTimerRef.current);
      setIsAiTyping(true);
      const duration = countOutputChars(output) * 5 + 200;
      aiTypingTimerRef.current = setTimeout(() => {
        setIsAiTyping(false);
        onDone?.();
      }, duration);
    };

    const renderAIOutput = (output, tab, animate = false) => {
      if (tab === 'Factory Finder')       return <FactoryFinderOutput output={output} animate={animate} />;
      if (tab === 'Generate Quotation')   return <QuotationGeneratorOutput output={output} animate={animate} />;
      if (tab === 'Handle Files')         return <HandleFilesOutput output={output} users={users} userStages={userStages} onSave={(msg) => { setSaveToast(msg); setTimeout(() => setSaveToast(null), 3500); }} animate={animate} />;
      if (tab === 'Catalog Generator')    return <CatalogGeneratorOutput output={output} animate={animate} />;
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
          @keyframes thinkingBounce { 0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
          @keyframes clickMePulse { 0%, 100% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.12); } }
        `}</style>

          {/*Hero Section*/}
          <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255, 0.1)', borderRadius: 12, padding: 10, boxSizing: 'border-box' }} onClick={stopAnimation}>
            <div style={{ width: '100%', backgroundColor: '#08253f', borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 5, overflow: 'hidden', fontFamily: 'inherit', padding: 10, boxSizing: 'border-box' }}>

              {/*Chat Section*/}
                <div style={{ width: '100%', height: isDesktop ? 600 : 550, backgroundColor: 'white', border: '1px solid black', borderRadius: 10, position: 'relative'}}
                  onMouseEnter={() => setPreviewHovered(true)}
                  onMouseLeave={() => setPreviewHovered(false)}>
                    {/*Preview - iMessage chat*/}
                    <div ref={chatContainerRef} style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '30px 16px', display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'border-box' }}>
                      {messages.length === 0 && (
                        <div style={{ margin: 'auto', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
                          <i className={handleIcon()} style={{ fontSize: 28, marginBottom: 8, display: 'block', color: currentTab === tabs[0] ? '#1fc9ed' : currentTab === tabs[1] ? '#fcc10a' : currentTab === tabs[2] ? '#e02f3e' : '#049669' }} />
                          {currentTab === tabs[0] ? 'Try sending a message or upload an image' :
                           currentTab === tabs[1] ? 'Try uploading a file or ask database for a specific product.' :
                           currentTab === tabs[2] ? 'Try uploading a file' :
                           'Try uploading an image'}
                        </div>
                      )}
                      {messages.map((msg, idx) => {
                        const prevUserMsg = msg.role === 'user' ? messages.slice(0, idx).filter(m => m.role === 'user').at(-1) : null;
                        const showName = msg.role === 'user' && prevUserMsg?.user?.name !== msg.user?.name;
                        return (
                        <div key={msg.id ?? idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 2 }}>
                          {showName && (
                            <span style={{ fontSize: 10, fontWeight: 600, color: msg.user.color, paddingRight: 42 }}>{msg.user.name}</span>
                          )}
                          <div style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8, width: '100%' }}>
                          {msg.role === 'user' ? (
                            <>
                              <div style={{ maxWidth: '70%', background: '#2563eb', color: 'white', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', fontSize: 13, lineHeight: 1.5, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                {msg.fileUpload ? (
                                  <>
                                    <i className="fas fa-file-powerpoint" style={{ fontSize: 13, color: '#ffb3b3', flexShrink: 0 }} />
                                    <span style={{ fontSize: 11, opacity: 0.85, flexShrink: 0 }}>{msg.fileUpload}</span>
                                    <span>{msg.text}</span>
                                  </>
                                ) : msg.text}
                              </div>
                              <div style={{ width: 30, height: 30, borderRadius: '5px', background: '#f3f4f6', border: `2px solid ${msg.user.color}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginBottom: 0, padding: 15 }}>
                                <i className="fa fa-user" style={{ fontSize: 18, color: msg.user.color }} />
                              </div>
                            </>
                          ) : (
                            <div style={{ width: 600, background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '18px 18px 18px 4px', padding: '10px 14px', fontSize: 13, display: 'flex', flexDirection: 'column' }}>
                              {msg.isThinking ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}>
                                  <span style={{ fontSize: 12, color: '#6b7280' }}>Thinking</span>
                                  <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                    {[0, 1, 2].map(i => (
                                      <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#9ca3af', animation: `thinkingBounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <>
                                  {msg.showThought && (
                                    <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                      <i className="fas fa-clock" style={{ fontSize: 9 }} />
                                      Thought for 1 second
                                    </div>
                                  )}
                                  {renderAIOutput(msg.output, msg.tab, msg.animate)}
                                </>
                              )}
                            </div>
                          )}
                          </div>
                        </div>
                        );
                      })}
                    </div>


                    {/*Save Toast*/}
                    {saveToast && (
                      <div style={{ position: 'absolute', bottom: 16, left: '10px', transform: 'translateX(-50%)', background: '#1a2e44', color: 'white', fontSize: 12, padding: '8px 16px', borderRadius: 8, whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', animation: 'scrollUp 0.3s ease forwards', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <i className="fas fa-check-circle" style={{ color: '#4ade80' }} />
                        {saveToast}
                      </div>
                    )}

                    {/*Hover Blur Background */}
                    <div style={{
                      width: '100%', height: '100%', borderRadius: 8, display: userTyped ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, position: 'absolute', top: 0, left: 0,
                      animation: previewHovered ? 'fadeIn 0.3s ease forwards' : 'fadeOut 0.3s ease forwards', opacity: previewHovered ? 1 : 0,
                      pointerEvents: previewHovered ? 'auto' : 'none', backgroundColor: 'rgba(4, 17, 28, 0.72)', backdropFilter: 'blur(6px)',
                    }}>
                      <div style={{ textAlign: 'center', padding: '0 32px' }}>
                        <p style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, color: 'white', lineHeight: 1.3, letterSpacing: '-0.3px' }}>
                          See what DeepBridge can do for your business
                        </p>
                        <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                          From sourcing to quotations — let our AI handle the heavy lifting so your team can focus on closing deals.
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleModal(); }}
                        style={{ padding: '10px 28px', fontSize: 14, fontWeight: 300, color: 'white', background: '#2cabe1', border: 'none', borderRadius: 8, cursor: 'pointer', letterSpacing: '0.2px', transition: 'background 0.2s'}}
                        onMouseEnter={e => {e.currentTarget.style.backgroundColor = "#1782b4"; }}
                        onMouseLeave={e => {e.currentTarget.style.backgroundColor = "#2cabe1"; }}>
                        Book a Demo
                      </button>
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
                                  clearInterval(tabIntervalRef.current);
                                  startTabInterval();
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
                      <div ref={userDropdownRef} style={{ position: 'relative', flexShrink: 0 }}>
                        <div
                          onClick={() => {
                            if (userDropdownOpen) {
                              setUserDropdownClosing(true);
                              setTimeout(() => { setUserDropdownOpen(false); setUserDropdownClosing(false); }, 250);
                              startTabInterval();
                            } else {
                              setUserDropdownOpen(true);
                              clearInterval(tabIntervalRef.current);
                            }
                          }}
                          style={{ width: 32, height: 32, border: '1px solid #d1d5db', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', cursor: 'pointer' }}>
                          <i className="fa fa-user" style={{ fontSize: 16, color: selectedUser.color }} />
                        </div>
                        {userDropdownOpen && (
                          <div style={{
                            position: 'absolute', bottom: '110%', left: 0, width: 160,
                            background: 'white', border: '1px solid #d1d5db', borderRadius: 6,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 50,
                            transformOrigin: 'bottom',
                            animation: `${userDropdownClosing ? 'tabShrink' : 'tabExpand'} 0.25s ease forwards`,
                          }}>
                            {users.map(u => (
                              <div key={u.name}
                                onClick={() => {
                                  setSelectedUser(u);
                                  setUserDropdownClosing(true);
                                  setTimeout(() => { setUserDropdownOpen(false); setUserDropdownClosing(false); }, 250);
                                }}
                                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', fontSize: 12, fontWeight: selectedUser?.name === u.name ? 600 : 500, color: '#111827', cursor: 'pointer', background: selectedUser?.name === u.name ? '#f0f9ff' : 'white' }}
                                onMouseEnter={e => { if (selectedUser?.name !== u.name) e.currentTarget.style.background = '#f3f4f6'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = selectedUser?.name === u.name ? '#f0f9ff' : 'white'; }}>
                                <i className="fa fa-user" style={{ fontSize: 13, color: u.color }} />
                                {u.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div ref={uploadDropdownRef} style={{ position: 'relative', flexShrink: 0 }}>
                        <div
                          onClick={() => {
                            if (uploadDropdownOpen) {
                              setUploadDropdownClosing(true);
                              setTimeout(() => { setUploadDropdownOpen(false); setUploadDropdownClosing(false); }, 250);
                              startTabInterval();
                            } else {
                              setUploadDropdownOpen(true);
                              clearInterval(tabIntervalRef.current);
                            }
                          }}
                          style={{ width: 32, height: 32, border: '1px solid #d1d5db', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#6b7280', cursor: 'pointer', background: 'white' }}>
                          <i className="fa fa-upload" style={{ fontSize: 16, color: '#1a2e44' }} />
                        </div>
                        {uploadDropdownOpen && (
                          <div style={{
                            position: 'absolute', bottom: '110%', left: 0, width: 240,
                            background: 'white', border: '1px solid #d1d5db', borderRadius: 8,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.12)', padding: 10, zIndex: 50,
                            transformOrigin: 'bottom left',
                            animation: `${uploadDropdownClosing ? 'tabShrink' : 'tabExpand'} 0.25s ease forwards`,
                          }}>
                            <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#111827' }}>Upload Files</p>
                            {currentTab === tabs[0] && <FactoryFinderUpload uploadImages={uploadImages} selectedProductImage={selectedProductImage} setSelectedProductImage={setSelectedProductImage} />}
                            {currentTab === tabs[1] && <QuotationGeneratorUpload />}
                            {currentTab === tabs[2] && <HandleFilesUpload items={handleFilesItems} selectedFile={selectedHandleFile} setSelectedFile={setSelectedHandleFile} processedSet={processedFilesSet} />}
                            {currentTab === tabs[3] && <CatalogGeneratorUpload />}
                            <button
                              onClick={handleProcessFiles}
                              style={{ width: '100%', padding: '7px 0', fontSize: 12, fontWeight: 600, background: selectedHandleFile ? '#1a2e44' : '#9ca3af', color: 'white', border: 'none', borderRadius: 6, cursor: selectedHandleFile ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
                              Process Files
                            </button>
                          </div>
                        )}
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
                      {!(currentTab === tabs[2] && (userStages[selectedUser.name] ?? 0) === 0) && (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          {/* <div style={{ position: 'absolute', bottom: '125%', left: '60%', transform: 'translateX(-50%)', background: '#08253f', color: 'white', fontSize: 14, fontWeight: 600,
                            padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap', pointerEvents: 'none', display: 'flex',
                            opacity: showClickMe && currentTab === tabs[0] && !isAiTyping ? 1 : 0, transition: 'opacity 0.6s ease',
                            animation: showClickMe && currentTab === tabs[0] && !isAiTyping ? 'clickMePulse 1.2s ease-in-out infinite' : 'none' }}>
                            Click me
                            <div style={{ position: 'absolute', top: '100%', left: '30%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #08253f' }} />
                          </div> */}
                          <button
                            style={{ fontSize: 14, fontWeight: 600, padding: '8px', background: '#08253f', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit' }}
                            onClick={() => handleSend()}>
                            Send
                          </button>
                        </div>
                      )}
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

