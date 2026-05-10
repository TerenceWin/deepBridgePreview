import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MAX_WIDTH, NAV_HEIGHT, SECTION_PAD, SECTION_PAD_SM } from '../components/layout';
import data, { handleFilesFollowUps } from '../data/heroData.js'
import { handleFile1 } from '../data/handleFilesData.js'
import FactoryFinderOutput, { FactoryFinderUpload } from './heroTab/FactoryFinder.js'
import QuotationGeneratorOutput, { QuotationGeneratorUpload } from './heroTab/QuotationGenerator.js'
import HandleFilesOutput, { HandleFilesUpload, computeFileDetailsDuration } from './heroTab/HandleFiles.js'
import CatalogGeneratorOutput, { CatalogGeneratorUpload } from './heroTab/CatalogGenerator.js'
import handleFiles1 from '../images/heroSection/handleFiles/handleFiles1.pptx';
import bugZapper9  from '../images/catalogGenerator/bugZapper9.jpeg';
import bugZapper10 from '../images/catalogGenerator/bugZapper10.jpeg';
import bugZapper11 from '../images/catalogGenerator/bugZapper11.jpeg';
import bugZapper12 from '../images/catalogGenerator/bugZapper12.jpeg';
import bugZapper13 from '../images/catalogGenerator/bugZapper13.jpeg';
import bugZapper14 from '../images/catalogGenerator/bugZapper14.jpeg';

const navy = '#0A2540';
const slate = '#5A6E85';

export default function HeroSection({ stopAnimation, handleModal, isDesktop }){
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

    const guideSteps = [
      {
        label: 'UI Guide',
        title: 'Chat Section',
        text: "This is your main workspace. Messages from you and Deep Bridge's AI appear here as you interact with the demo in real time.",
        style: { top: '43%', left: '50%', transform: 'translate(-50%, -50%)' },
        width: 520,
        textSizeBoost: 2,
        arrow: null,
      },
      {
        label: 'UI Guide',
        title: 'Tool Switcher',
        text: 'Switch between workflows — Factory Finder, Generate Quotation, Handle Files, and Catalog Generator — to explore each capability.',
        style: { bottom: 90, left: 40 },
        width: 260,
        arrow: 'down-left',
      },
      {
        label: 'UI Guide',
        title: 'Upload',
        text: 'Attach files or images here. Handle Files expects a PowerPoint; Catalog Generator uses product photos.',
        style: { bottom: 90, left: 220 },
        width: 260,
        arrow: 'down-left',
      },
      {
        label: 'UI Guide',
        title: 'Textarea & Send',
        text: 'A prompt is pre-filled for each tool. Hit Send to submit it, or edit the text first to try your own inputs.',
        style: { bottom: 90, right: 40 },
        width: 260,
        arrow: 'down-right',
      },
      {
        label: 'Tab Walkthrough',
        title: 'Factory Finder',
        prompt: 'The user provided a product type, OEM requirement, minimum order quantity constraint, and a sourcing region — giving the AI enough context to filter suppliers with precision.',
        output: 'The AI identified matching suppliers and returned each with their company name, product images, a capability summary, and a direct link to their website for immediate follow-up.',
        background: 'Queried an online supplier index and internal database simultaneously, applied filters for product category, region, and MOQ threshold, then ranked results by relevance.',
        style: { bottom: 120, right: 40 },
        width: 320,
        arrow: null,
      },
      {
        label: 'Tab Walkthrough',
        title: 'Generate Quotation',
        prompt: 'The user asked a conversational product availability question — no product code or structured query needed. This shows the AI can interpret intent and search the catalogue naturally.',
        output: 'The AI located a recently added matching product and returned a full commercial card — unit price, MOQ, technical specifications, and compliance certifications — ready to quote directly to a customer.',
        background: 'Scanned the product catalogue for recently added items, matched against the product category from the natural language query, and surfaced structured commercial data for immediate use.',
        style: { bottom: 120, right: 40  },
        width: 320,
        arrow: null,
      },
      {
        label: 'Tab Walkthrough',
        title: 'Handle Files',
        prompt: 'The user uploaded a supplier PowerPoint — the kind of unstructured file that would typically require manual reading. The AI is instructed to extract and organise its contents.',
        output: 'The AI parsed the file and returned a structured document summary, pulling product name, specifications, certifications, pricing, and MOQ into a searchable record with a document ID for follow-up queries.',
        background: 'Read and structured slide content from the uploaded PPTX, identified key commercial fields across slides, and stored the result so follow-up questions can reference any extracted detail.',
        style: { bottom: 120, right: 40  },
        width: 320,
        arrow: null,
      },
      {
        label: 'Tab Walkthrough',
        title: 'Catalog Generator',
        prompt: 'The user described the desired visual context in plain language — outdoor usage — rather than specifying image parameters. The AI interprets the creative intent and generates accordingly.',
        output: 'The AI produced commercial-grade lifestyle images placing the product in realistic outdoor environments, ready for use in marketing materials or customer-facing catalogues.',
        background: 'Analysed the uploaded product photos to understand the subject, then applied AI image generation to match the described environment, lighting, and usage context.',
        style: {  bottom: 120, right: 40 },
        width: 320,
        arrow: null,
      },
    ];

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
    const catalogUploadImages = [bugZapper9, bugZapper10, bugZapper11, bugZapper12, bugZapper13, bugZapper14];
    const handleFilesItems = [
      { file: handleFiles1, name: 'handleFiles1.pptx' },
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
      setStagedCatalogImages([]);
      setCatalogProcessed(false);
      setStagedHandleFile(null);
      setDemoTriggered(false);
      setIsAiTyping(false);
      clearTimeout(aiTypingTimerRef.current);
    }, [currentTab]);

    //Typing Animation — only starts after AI response animation completes
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

    // Auto-show tab walkthrough bubbles after each tab's stage 0 animation completes
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
      // Store timer in a ref so effect re-runs don't cancel it via cleanup
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

    //Send Buttons Clicked
    // -> Stop tab switching, typing animation
    // -> Get the response data
    // -> Check if input is last, Yes? -> display 'Book a demo'
    const handleSend = () => {
      if (!typingText.trim()) return;

      // Resolve the current stage's original text
      const stage = userStages[selectedUser.name] ?? 0;
      let stageText;
      if (currentTab === tabs[3] && catalogProcessed) {
        stageText = data[currentTab]?.[selectedUser.name]?.[1]?.input;
      } else if (currentTab === tabs[2] && stagedHandleFile) {
        stageText = "Generate a Document Detail file for this file";
      } else if (currentTab === 'Handle Files' && stage > 0 && processedFile) {
        stageText = handleFilesFollowUps[processedFile]?.[selectedUser.name]?.[stage - 1]?.input;
      } else {
        stageText = data[currentTab]?.[selectedUser.name]?.[stage]?.input;
      }

      // If textarea differs from stage text → Book a Demo + re-animate stage text
      if (typingText.trim() !== (stageText ?? '').trim()) {
        handleModal();
        setDemoTriggered(true);
        const textToRetype = stageText ?? '';
        let i = 0;
        clearInterval(typingIntervalRef.current);
        setTypingText('');
        typingIntervalRef.current = setInterval(() => {
          i++;
          setTypingText(textToRetype.slice(0, i));
          if (i >= textToRetype.length) clearInterval(typingIntervalRef.current);
        }, 15);
        return;
      }

      // Normal flow — send message and show AI response
      clearInterval(tabIntervalRef.current);
      clearInterval(typingIntervalRef.current);
      setIsAiTyping(true);
      let output;
      let isLast;
      let nextStage;
      if (currentTab === tabs[2] && stagedHandleFile) {
        const fileNameToProcess = stagedHandleFile;
        const fileData = fileDataMap[fileNameToProcess];
        const thinkingId = ++messageIdCounter.current;
        setMessages(prev => [...prev,
          { role: 'user', text: typingText, user: selectedUser, fileUpload: fileNameToProcess, id: ++messageIdCounter.current },
          { role: 'ai', isThinking: true, id: thinkingId },
        ]);
        setTypingText('');
        setUserTyped(true);
        setProcessedFile(fileNameToProcess);
        setStagedHandleFile(null);
        const resetStages = {};
        users.forEach(u => { resetStages[u.name] = 1; });
        setUserStages(resetStages);
        setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
        setTimeout(() => {
          const fileSuccessOutput = [{ type: 'fileSuccess', fileName: fileNameToProcess }];
          const fileFollowUpOutput = [{ type: 'fileFollowUp' }];
          setMessages(prev => {
            const idx = prev.findIndex(m => m.id === thinkingId);
            if (idx === -1) return prev;
            const next = [...prev];
            next.splice(idx, 1,
              { role: 'ai', output: fileSuccessOutput, tab: currentTab, showThought: true, animate: true, id: ++messageIdCounter.current },
              { role: 'ai', output: [{ type: 'fileDetails', fileData }], tab: currentTab, showThought: false, animate: true, id: ++messageIdCounter.current },
            );
            return next;
          });
          const followUpText = 'You can now ask follow-up questions about these files or reference their document IDs.';
          startAiTyping([...fileSuccessOutput, { type: 'fileDetails', fileData }], () => {
            setIsAiTyping(true);
            setMessages(prev => [...prev,
              { role: 'ai', output: fileFollowUpOutput, tab: currentTab, showThought: false, animate: true, id: ++messageIdCounter.current },
            ]);
            clearTimeout(aiTypingTimerRef.current);
            aiTypingTimerRef.current = setTimeout(() => setIsAiTyping(false), followUpText.length * 5 + 400);
          }, computeFileDetailsDuration(fileData, users.length));
          setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
        }, 1000);
        return;
      } else if (currentTab === tabs[3] && catalogProcessed) {
        output = data[currentTab]?.[selectedUser.name]?.[1]?.output ?? [];
        const totalStages = data[currentTab]?.[selectedUser.name]?.length ?? 0;
        isLast = 1 >= totalStages - 1;
        nextStage = 2;
        setCatalogProcessed(false);
      } else if (currentTab === 'Handle Files' && stage > 0 && processedFile) {
        const followUps = handleFilesFollowUps[processedFile]?.[selectedUser.name] ?? [];
        output = followUps[stage - 1]?.output ?? [];
        isLast = stage >= followUps.length;
        nextStage = stage + 1;
      } else {
        output = data[currentTab]?.[selectedUser.name]?.[stage]?.output ?? [];
        const totalStages = data[currentTab]?.[selectedUser.name]?.length ?? 0;
        isLast = stage >= totalStages - 1;
        nextStage = stage + 1;
      }
      const thinkingId = ++messageIdCounter.current;
      setMessages(prev => [...prev,
        { role: 'user', text: typingText, user: selectedUser, id: ++messageIdCounter.current },
        { role: 'ai', isThinking: true, id: thinkingId },
      ]);
      setTypingText('');
      setUserTyped(true);
      setStagedCatalogImages([]);
      setUserStages(prev => ({ ...prev, [selectedUser.name]: nextStage }));
      setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
      setTimeout(() => {
        setMessages(prev => prev.map(m =>
          m.id === thinkingId
            ? { role: 'ai', output, tab: currentTab, showThought: true, animate: true, id: thinkingId }
            : m
        ));
        const isEmailDraft = output[0]?.type === 'emailDraft';
        startAiTyping(output, (isLast && !isEmailDraft) ? () => setTimeout(() => { handleModal(); setDemoTriggered(true); }, 1000) : undefined);
        setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
      }, 1000);
    };

    const fileDataMap = {
      'handleFiles1.pptx': handleFile1,
    };

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

    const IMAGE_KEYS = new Set(['image', 'productImages', 'src', 'fileData']);
    const countOutputChars = (output) => {
      let n = 0;
      const walk = (v, key) => {
        if (IMAGE_KEYS.has(key)) return;
        if (typeof v === 'string') n += v.length;
        else if (Array.isArray(v)) v.forEach(item => walk(item, null));
        else if (v && typeof v === 'object') Object.entries(v).forEach(([k, val]) => walk(val, k));
      };
      walk(output, null);
      return n;
    };

    const startAiTyping = (output, onDone, overrideDuration) => {
      clearTimeout(aiTypingTimerRef.current);
      setIsAiTyping(true);
      const hasFileDetails = Array.isArray(output) && output.some(o => o?.type === 'fileDetails');
      const duration = overrideDuration ?? (countOutputChars(output) * 5 + (hasFileDetails ? 8000 : 200));
      aiTypingTimerRef.current = setTimeout(() => {
        setIsAiTyping(false);
        onDone?.();
      }, duration);
    };

    const renderAIOutput = (output, tab, animate = false) => {
      if (tab === 'Factory Finder')       return <FactoryFinderOutput output={output} animate={animate} />;
      if (tab === 'Generate Quotation')   return <QuotationGeneratorOutput output={output} animate={animate} onEmailSent={() => { handleModal(); setDemoTriggered(true); }} />;
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

          {/*Hero Section*/}
          <div
            style={{ width: '100%', backgroundColor: 'rgba(255,255,255, 0.1)', borderRadius: 12, padding: 10, boxSizing: 'border-box', position: 'relative' }}
            onClick={stopAnimation}
          >
            {overlayMounted && (
              <div className="db-rotating-border" style={{ position: 'absolute', inset: 0, borderRadius: 12, zIndex: 100, animation: `${overlayFadeIn ? 'fadeIn' : 'fadeOut'} 0.3s ease forwards`, boxShadow: '0 0 30px rgba(255,255,255,0.12), 0 0 60px rgba(255,255,255,0.06)' }}>
                <div style={{ position: 'absolute', inset: 5, borderRadius: 10, background: 'linear-gradient(135deg, #0e304e 0%, #092540 20%, #021527 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                  <p style={{ color: 'white', fontSize: 48, fontWeight: 500, margin: 0, letterSpacing: '-0.01em' }}>How would you like to get started?</p>
                  <div style={{ display: 'flex', gap: 52 }}>
                    <button className="db-overlay-btn" onClick={() => { dismissOverlayFn(); setGuideStep(0); }} style={{ padding: '15px 32px', fontSize: 18, fontWeight: 600, background: 'white', color: '#092540', border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(9,37,64,0.12), 0 1px 4px rgba(9,37,64,0.08)' }}>
                      Use a Guide
                    </button>
                    <button className="db-overlay-btn" onClick={dismissOverlayFn} style={{ padding: '15px 32px', fontSize: 18, fontWeight: 600, background: 'transparent', color: 'white', border: '1px solid white', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Demo myself
                    </button>
                  </div>
                </div>
              </div>
            )}
            {guideStep !== null && (() => {
              const step = guideSteps[guideStep];
              const b = step.textSizeBoost ?? 0;
              return (
                <div key={guideStep} style={{ position: 'absolute', ...step.style, zIndex: 99, width: step.width ?? 300, background: 'white', borderRadius: 10, padding: '16px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', animation: 'fadeIn 0.25s ease forwards' }}>
                  <div style={{ fontSize: 10 + b, color: '#29ABE2', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6 }}>{step.label} · Step {guideStep + 1} of {guideSteps.length}</div>
                  <div style={{ fontSize: 13 + b, fontWeight: 600, color: navy, marginBottom: 8 }}>{step.title}</div>
                  {step.prompt ? (
                    <>
                      <div style={{ background: '#f3f4f6', borderRadius: 6, padding: '6px 10px', fontSize: 11 + b, color: '#374151', marginBottom: 10, fontStyle: 'italic' }}>"{step.prompt}"</div>
                      <div style={{ fontSize: 12 + b, color: slate, lineHeight: 1.65, marginBottom: 10 }}><span style={{ fontWeight: 600, color: navy }}>Response: </span>{step.output}</div>
                      <div style={{ fontSize: 11 + b, color: '#8A9BB0', lineHeight: 1.6, borderTop: '1px solid #e5e7eb', paddingTop: 8 }}>
                        <i className="fas fa-cog" style={{ marginRight: 5, fontSize: 10 + b }} />{step.background}
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: 13 + b, color: slate, lineHeight: 1.7 }}>{step.text}</div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
                    <button
                      onClick={() => {
                        if (guideStep === 3) {
                          setGuideStep(null);
                          setGuideWatchMode(true);
                        } else if (guideStep >= 4) {
                          setGuideStep(null);
                        } else {
                          setGuideStep(guideStep + 1);
                        }
                      }}
                      style={{ padding: '7px 16px', fontSize: 12 + b, fontWeight: 600, background: navy, color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      {guideStep === 3 ? 'Start Exploring →' : guideStep >= 4 ? 'Got it' : 'Next →'}
                    </button>
                  </div>
                  {step.arrow === 'down-left' && (
                    <div style={{ position: 'absolute', bottom: -8, left: 20, width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid white' }} />
                  )}
                  {step.arrow === 'down-right' && (
                    <div style={{ position: 'absolute', bottom: -8, right: 20, width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid white' }} />
                  )}
                </div>
              );
            })()}
            <div style={{ width: '100%', backgroundColor: '#08253f', borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 5, overflow: 'hidden', fontFamily: 'inherit', padding: 10, boxSizing: 'border-box' }}>

              {/*Chat Section*/}
                <div style={{ width: '100%', height: isDesktop ? 600 : 550, backgroundColor: 'white', border: '1px solid black', borderRadius: 10, position: 'relative'}}>
                    {/*Preview - iMessage chat*/}
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
                      {messages.map((msg, idx) => {
                        return (
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

                </div>
                {/*Bottom Chat tools*/}
                <div style={{ width: '100%', backgroundColor: 'white', border: '1px solid #8e8e8e', borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 8, gap: 8 }}>
                {/*Chat input*/}
                  <div style={{ width: '100%', border: '1px solid #8e8e8e', borderRadius: 8, display: 'flex', flexDirection: 'column' }}>
                    {stagedCatalogImages.length > 0 && (
                      <div style={{ padding: '8px 12px 4px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {stagedCatalogImages.map((src, i) => (
                          <img key={i} src={src} alt="" style={{ width: 56, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb' }} />
                        ))}
                      </div>
                    )}
                    {stagedHandleFile && (
                      <div style={{ padding: '8px 12px 4px', display: 'flex', gap: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 8px', background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 6 }}>
                          <i className="fas fa-file-powerpoint" style={{ fontSize: 12, color: '#e02f3e' }} />
                          <span style={{ fontSize: 10, color: '#e02f3e', fontWeight: 600 }}>{stagedHandleFile}</span>
                        </div>
                      </div>
                    )}
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
                              if (currentTab === tabs[3]) setSelectedCatalogImages(catalogUploadImages.map((_, i) => i));
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
                            {currentTab === tabs[0] && <FactoryFinderUpload />}
                            {currentTab === tabs[1] && <QuotationGeneratorUpload />}
                            {currentTab === tabs[2] && <HandleFilesUpload items={handleFilesItems} selectedFile={selectedHandleFile} setSelectedFile={setSelectedHandleFile} processedSet={processedFilesSet} />}
                            {currentTab === tabs[3] && <CatalogGeneratorUpload uploadImages={catalogUploadImages} selectedImages={selectedCatalogImages} setSelectedImages={setSelectedCatalogImages} />}
                            {(() => {
                              const canProcess = currentTab === tabs[3]
                                ? !catalogProcessed && selectedCatalogImages.length === catalogUploadImages.length
                                : !stagedHandleFile && !!selectedHandleFile;
                              return (
                                <button
                                  onClick={handleProcessFiles}
                                  style={{ width: '100%', padding: '7px 0', fontSize: 12, fontWeight: 600, background: canProcess ? '#1a2e44' : '#9ca3af', color: 'white', border: 'none', borderRadius: 6, cursor: canProcess ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
                                  Process Files
                                </button>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                      <input type='text'
                        ref={inputRef}
                        onFocus={() => { clearInterval(tabIntervalRef.current); }}
                        onBlur={() => { startTabInterval(); }}
                        onChange={e => {
                          setTypingText(e.target.value);
                        }}
                        onKeyDown={e => {
                          const stage = userStages[selectedUser.name] ?? 0;
                          const hideSend = !(catalogProcessed || stagedHandleFile) && stage === 0 && (currentTab === tabs[2] || currentTab === tabs[3]);
                          if (e.key === 'Enter' && !hideSend && !(guideStep !== null && guideStep <= 3)) handleSend();
                        }}
                        style={{ flex: 1, fontSize: 13, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, color: 'black', background: 'white', fontFamily: 'inherit'}}
                        value={typingText}
                      />
                      {!((!(catalogProcessed || stagedHandleFile) && (userStages[selectedUser.name] ?? 0) === 0) && (currentTab === tabs[2] || currentTab === tabs[3])) && (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          {(() => {
                            const inUIGuide = guideStep !== null && guideStep <= 3;
                            return (
                              <button
                                disabled={inUIGuide}
                                style={{ fontSize: 14, fontWeight: 600, padding: '8px', background: inUIGuide ? '#9ca3af' : '#08253f', color: 'white', border: 'none', borderRadius: 6, cursor: inUIGuide ? 'not-allowed' : 'pointer', fontFamily: 'inherit', animation: !isAiTyping && !inUIGuide ? 'sendButtonPulse 1.5s ease-in-out infinite' : 'none' }}
                                onClick={() => !inUIGuide && handleSend()}>
                                Send
                              </button>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>{/*Bottom Chat tools*/}
            </div>
          </div>
        </div> 
    )
}

