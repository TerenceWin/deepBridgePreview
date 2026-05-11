import React, { useEffect, useRef, useState } from 'react';
import data, { handleFilesFollowUps } from '../data/heroData.js'
import FactoryFinderOutput from './heroTab/FactoryFinder.js'
import QuotationGeneratorOutput from './heroTab/QuotationGenerator.js'
import HandleFilesOutput from './heroTab/HandleFiles.js'
import CatalogGeneratorOutput from './heroTab/CatalogGenerator.js'
import { catalogUploadImages, handleFilesItems, users, guideSteps } from './heroSectionConfig.js';
import { HeroOverlay, GuideBubble } from './HeroGuide.js';
import HeroChatInput from './HeroChatInput.js';
import { useHeroSend } from './useHeroSend.js';

export default function HeroSection({ stopAnimation, handleModal, isDesktop, isLaptop, isTablet, isMobile }) {
    const tabs = ["Factory Finder", "Generate Quotation", "Handle Files", "Catalog Generator"];

    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [userTyped, setUserTyped] = useState(false);
    const tabIntervalRef = useRef(null);

    const [typingText, setTypingText] = useState('');
    const typingIntervalRef = useRef(null);
    const inputRef = useRef(null);
    const [userStages, setUserStages] = useState({});
    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);

    const messageIdCounter = useRef(0);
    const [isAiTyping, setIsAiTyping] = useState(false);
    const aiTypingTimerRef = useRef(null);
    const [saveToast, setSaveToast] = useState(null);
    const [tabDropdownOpen, setTabDropdownOpen] = useState(false);
    const [tabDropdownClosing, setTabDropdownClosing] = useState(false);
    const tabDropdownRef = useRef(null);
    const selectedUser = { name: 'Marcus Lin', color: '#1fc9ed' };
    const [uploadDropdownOpen, setUploadDropdownOpen] = useState(false);
    const [uploadDropdownClosing, setUploadDropdownClosing] = useState(false);
    const uploadDropdownRef = useRef(null);
    const [selectedHandleFile, setSelectedHandleFile] = useState(null);
    const [processedFile, setProcessedFile] = useState(null);
    const [processedFilesSet, setProcessedFilesSet] = useState(new Set());
    const [selectedCatalogImages, setSelectedCatalogImages] = useState([]);
    const [stagedCatalogImages, setStagedCatalogImages] = useState([]);
    const [catalogProcessed, setCatalogProcessed] = useState(false);
    const [stagedHandleFile, setStagedHandleFile] = useState(null);
    const [demoTriggered, setDemoTriggered] = useState(false);
    const [overlayMounted, setOverlayMounted] = useState(true);
    const [overlayFadeIn, setOverlayFadeIn] = useState(true);
    const overlayDismissedRef = useRef(false);
    const overlayTimeoutRef = useRef(null);
    const [guideStep, setGuideStep] = useState(null);
    const [guideWatchMode, setGuideWatchMode] = useState(false);
    const tabWalkthroughShownRef = useRef(new Set());
    const tabWalkthroughTimerRef = useRef(null);

    const showOverlayFn = () => {
      if (overlayDismissedRef.current) return;
      clearTimeout(overlayTimeoutRef.current);
      setOverlayMounted(true);
      setOverlayFadeIn(true);
    };
    const hideOverlayFn = () => {
      setOverlayFadeIn(false);
      overlayTimeoutRef.current = setTimeout(() => setOverlayMounted(false), 300);
    };
    const dismissOverlayFn = () => {
      overlayDismissedRef.current = true;
      hideOverlayFn();
    };

    const handleIcon = () => {
      if (currentTab === tabs[0]) return "fas fa-industry";
      if (currentTab === tabs[1]) return "fas fa-file-invoice";
      if (currentTab === tabs[2]) return "fas fa-file-upload";
      return "fas fa-list";
    };

    const startTabInterval = () => {
      clearInterval(tabIntervalRef.current);
      tabIntervalRef.current = setInterval(() => {
        setCurrentTab(prev => {
          const i = tabs.indexOf(prev);
          return tabs[(i + 1) % tabs.length];
        });
      }, 10000);
    };

    const handleSend = useHeroSend({
      typingText, userStages, selectedUser, currentTab, tabs,
      catalogProcessed, stagedHandleFile, processedFile,
      handleModal, typingIntervalRef, tabIntervalRef, aiTypingTimerRef,
      messageIdCounter, setIsAiTyping, setMessages, setTypingText, setUserTyped,
      setStagedCatalogImages, setProcessedFile, setStagedHandleFile,
      setUserStages, setCatalogProcessed, chatContainerRef, setDemoTriggered,
    });

    const handleProcessFiles = () => {
      if (currentTab === tabs[3]) {
        if (selectedCatalogImages.length !== catalogUploadImages.length) return;
        setStagedCatalogImages([...catalogUploadImages]);
        setCatalogProcessed(true);
        setUploadDropdownClosing(true);
        setTimeout(() => { setUploadDropdownOpen(false); setUploadDropdownClosing(false); }, 250);
        clearInterval(tabIntervalRef.current);
        return;
      }
      if (!selectedHandleFile) return;
      if (processedFilesSet.has(selectedHandleFile)) return;
      setStagedHandleFile(selectedHandleFile);
      setProcessedFilesSet(prev => new Set([...prev, selectedHandleFile]));
      setUploadDropdownClosing(true);
      setTimeout(() => { setUploadDropdownOpen(false); setUploadDropdownClosing(false); }, 250);
      clearInterval(tabIntervalRef.current);
    };

    const renderAIOutput = (output, tab, animate = false) => {
      if (tab === 'Factory Finder')     return <FactoryFinderOutput output={output} animate={animate} isMobile={isMobile} />;
      if (tab === 'Generate Quotation') return <QuotationGeneratorOutput output={output} animate={animate} onEmailSent={() => { handleModal(); setDemoTriggered(true); }} />;
      if (tab === 'Handle Files')       return <HandleFilesOutput output={output} users={users} userStages={userStages} onSave={(msg) => { setSaveToast(msg); setTimeout(() => setSaveToast(null), 3500); }} animate={animate} />;
      if (tab === 'Catalog Generator')  return <CatalogGeneratorOutput output={output} animate={animate} />;
    };

    useEffect(() => {
      setUserStages({});
      setMessages([]);
      setProcessedFile(null);
      setProcessedFilesSet(new Set());
      setStagedCatalogImages([]);
      setCatalogProcessed(false);
      setStagedHandleFile(null);
      setDemoTriggered(false);
      setIsAiTyping(false);
      clearTimeout(aiTypingTimerRef.current);
    }, [currentTab]);

    useEffect(() => {
      clearInterval(typingIntervalRef.current);
      setTypingText('');
      if (isAiTyping) return;
      const stage = userStages[selectedUser.name] ?? 0;
      let tabText;
      if (currentTab === tabs[3] && catalogProcessed) {
        tabText = data[currentTab]?.[selectedUser.name]?.[1]?.input;
      } else if (currentTab === tabs[2] && stagedHandleFile) {
        tabText = "Generate a Document Detail file for this file";
      } else if (currentTab === 'Handle Files' && stage > 0 && processedFile) {
        tabText = handleFilesFollowUps[processedFile]?.[selectedUser.name]?.[stage - 1]?.input;
      } else {
        tabText = data[currentTab]?.[selectedUser.name]?.[stage]?.input;
      }
      if (!tabText) return;
      let i = 0;
      typingIntervalRef.current = setInterval(() => {
        i++;
        setTypingText(tabText.slice(0, i));
        if (i === tabText.length) clearInterval(typingIntervalRef.current);
      }, 15);
      return () => clearInterval(typingIntervalRef.current);
    }, [currentTab, selectedUser.name, userStages, processedFile, catalogProcessed, stagedHandleFile, isAiTyping]);

    useEffect(() => {
      startTabInterval();
      return () => clearInterval(tabIntervalRef.current);
    }, []);

    useEffect(() => {
      if (chatContainerRef.current)
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
      if (inputRef.current) inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }, [typingText]);

    useEffect(() => {
      if (!isAiTyping) return;
      const id = setInterval(() => {
        if (chatContainerRef.current)
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }, 100);
      return () => clearInterval(id);
    }, [isAiTyping]);

    useEffect(() => {
      if (!guideWatchMode || isAiTyping || messages.length === 0) return;
      const stage = userStages[selectedUser.name] ?? 0;
      const shown = tabWalkthroughShownRef.current;
      let stepToShow = null;
      if (currentTab === 'Factory Finder' && stage >= 1 && !shown.has('Factory Finder')) {
        shown.add('Factory Finder'); stepToShow = 4;
      } else if (currentTab === 'Generate Quotation' && stage >= 1 && !shown.has('Generate Quotation')) {
        shown.add('Generate Quotation'); stepToShow = 5;
      } else if (currentTab === 'Handle Files' && processedFile !== null && !shown.has('Handle Files')) {
        shown.add('Handle Files'); stepToShow = 6;
      } else if (currentTab === 'Catalog Generator' && stage >= 2 && !shown.has('Catalog Generator')) {
        shown.add('Catalog Generator'); stepToShow = 7;
      }
      if (stepToShow === null) return;
      clearTimeout(tabWalkthroughTimerRef.current);
      tabWalkthroughTimerRef.current = setTimeout(() => setGuideStep(stepToShow), 600);
    }, [guideWatchMode, isAiTyping, currentTab, userStages, messages, processedFile]);

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
        if (uploadDropdownOpen && uploadDropdownRef.current && !uploadDropdownRef.current.contains(e.target)) {
          setUploadDropdownClosing(true);
          setTimeout(() => { setUploadDropdownOpen(false); setUploadDropdownClosing(false); }, 250);
          startTabInterval();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [uploadDropdownOpen]);

    return (
      <div>
        <style>{`
          @keyframes fadeIn      { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeOut     { from { opacity: 1; } to { opacity: 0; } }
          @keyframes scrollUp    { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes tabExpand   { from { opacity: 0; transform: scaleY(0); } to { opacity: 1; transform: scaleY(1); } }
          @keyframes tabShrink   { from { opacity: 1; transform: scaleY(1); } to { opacity: 0; transform: scaleY(0); } }
          @keyframes thinkingBounce { 0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
          @keyframes sendButtonPulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(8,37,63,0.5); } 50% { transform: scale(1.05); box-shadow: 0 0 0 6px rgba(8,37,63,0); } }
          .db-overlay-btn { transition: transform 0.2s ease; }
          .db-overlay-btn:hover { transform: translateY(-2px); }
          .db-rotating-border { overflow: hidden; }
          .db-rotating-border::before {
            content: '';
            position: absolute;
            inset: -100%;
            background: conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.95) 40deg, transparent 80deg);
            animation: spinBorder 4s linear infinite;
          }
          @keyframes spinBorder { to { transform: rotate(360deg); } }
        `}</style>

        <div
          style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 10, boxSizing: 'border-box', position: 'relative', margin: `${isTablet || isMobile ? 50 : 80}px 0 0 0` }}
          onClick={stopAnimation}
        >
          <HeroOverlay
            overlayMounted={overlayMounted}
            overlayFadeIn={overlayFadeIn}
            dismissOverlayFn={dismissOverlayFn}
            setGuideStep={setGuideStep}
            isLaptop={isLaptop}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          <GuideBubble
            guideStep={guideStep}
            guideSteps={guideSteps}
            setGuideStep={setGuideStep}
            setGuideWatchMode={setGuideWatchMode}
            isMobile={isMobile}
            isTablet={isTablet}
          />

          <div style={{ width: '100%', backgroundColor: '#08253f', borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 5, overflow: 'hidden', fontFamily: 'inherit', padding: 10, boxSizing: 'border-box' }}>

            {/* Chat Section */}
            <div style={{ width: '100%', height: isDesktop ? 600 : isLaptop ? 500 : isMobile ? 450 : 550, backgroundColor: 'white', border: '1px solid black', borderRadius: 10, position: 'relative' }}>
              <div ref={chatContainerRef} style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '30px 16px', display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'border-box' }}>
                {messages.length === 0 && (
                  <div style={{ margin: 'auto', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
                    <i className={handleIcon()} style={{ fontSize: 28, marginBottom: 8, display: 'block', color: currentTab === tabs[0] ? '#1fc9ed' : currentTab === tabs[1] ? '#fcc10a' : currentTab === tabs[2] ? '#e02f3e' : '#049669' }} />
                    {currentTab === tabs[0] ? 'Try sending a message.' :
                     currentTab === tabs[1] ? 'Try sending a message.' :
                     currentTab === tabs[2] ? 'Try uploading a file.' :
                     'Try uploading an image'}
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <div key={msg.id ?? idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 2 }}>
                    <div style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8, width: '100%' }}>
                      {msg.role === 'user' ? (
                        <div style={{ maxWidth: '70%', background: '#2563eb', color: 'white', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', fontSize: 13, lineHeight: 1.5, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          {msg.fileUpload ? (
                            <>
                              <i className="fas fa-file-powerpoint" style={{ fontSize: 13, color: '#ffb3b3', flexShrink: 0 }} />
                              <span style={{ fontSize: 11, opacity: 0.85, flexShrink: 0 }}>{msg.fileUpload}</span>
                              <span>{msg.text}</span>
                            </>
                          ) : msg.text}
                        </div>
                      ) : (
                        <div style={{ width: '100%', maxWidth: 600, background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '18px 18px 18px 4px', padding: '10px 14px', fontSize: 13, display: 'flex', flexDirection: 'column' }}>
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
                ))}
              </div>

              {saveToast && (
                <div style={{ position: 'absolute', bottom: 16, left: '10px', transform: 'translateX(-50%)', background: '#1a2e44', color: 'white', fontSize: 12, padding: '8px 16px', borderRadius: 8, whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', animation: 'scrollUp 0.3s ease forwards', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className="fas fa-check-circle" style={{ color: '#4ade80' }} />
                  {saveToast}
                </div>
              )}
            </div>

            {/* Bottom Chat Tools */}
            <HeroChatInput
              tabs={tabs}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              startTabInterval={startTabInterval}
              tabIntervalRef={tabIntervalRef}
              tabDropdownRef={tabDropdownRef}
              tabDropdownOpen={tabDropdownOpen}
              setTabDropdownOpen={setTabDropdownOpen}
              tabDropdownClosing={tabDropdownClosing}
              setTabDropdownClosing={setTabDropdownClosing}
              uploadDropdownRef={uploadDropdownRef}
              uploadDropdownOpen={uploadDropdownOpen}
              setUploadDropdownOpen={setUploadDropdownOpen}
              uploadDropdownClosing={uploadDropdownClosing}
              setUploadDropdownClosing={setUploadDropdownClosing}
              selectedHandleFile={selectedHandleFile}
              setSelectedHandleFile={setSelectedHandleFile}
              processedFilesSet={processedFilesSet}
              selectedCatalogImages={selectedCatalogImages}
              setSelectedCatalogImages={setSelectedCatalogImages}
              catalogUploadImages={catalogUploadImages}
              handleFilesItems={handleFilesItems}
              catalogProcessed={catalogProcessed}
              stagedHandleFile={stagedHandleFile}
              handleProcessFiles={handleProcessFiles}
              stagedCatalogImages={stagedCatalogImages}
              typingText={typingText}
              setTypingText={setTypingText}
              inputRef={inputRef}
              userStages={userStages}
              selectedUser={selectedUser}
              guideStep={guideStep}
              isAiTyping={isAiTyping}
              handleSend={handleSend}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    );
}
