import React, { useState, useEffect, useRef } from 'react';
import data from '../../data/heroData.js';
import CatalogGeneratorOutput, { CatalogGeneratorUpload } from '../heroTab/CatalogGenerator.js';
import { DemoChatShell, DemoChatInputBar } from '../../components/DemoChat.js';
import bugZapper9  from '../../images/catalogGenerator/bugZapper9.jpeg';
import bugZapper10 from '../../images/catalogGenerator/bugZapper10.jpeg';
import bugZapper11 from '../../images/catalogGenerator/bugZapper11.jpeg';
import bugZapper12 from '../../images/catalogGenerator/bugZapper12.jpeg';
import bugZapper13 from '../../images/catalogGenerator/bugZapper13.jpeg';
import bugZapper14 from '../../images/catalogGenerator/bugZapper14.jpeg';

const cgData = data['Catalog Generator']['Marcus Lin'];
const catalogUploadImages = [bugZapper9, bugZapper10, bugZapper11, bugZapper12, bugZapper13, bugZapper14];

const IMAGE_KEYS = new Set(['image', 'productImages', 'src', 'fileData']);
function countOutputChars(output) {
  let n = 0;
  const walk = (v, key) => {
    if (IMAGE_KEYS.has(key)) return;
    if (typeof v === 'string') n += v.length;
    else if (Array.isArray(v)) v.forEach(item => walk(item, null));
    else if (v && typeof v === 'object') Object.entries(v).forEach(([k, val]) => walk(val, k));
  };
  walk(output, null);
  return n;
}

export default function CatalogGeneratorDemo({ handleModal }) {
  const [messages, setMessages] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [stage, setStage] = useState(0);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [catalogProcessed, setCatalogProcessed] = useState(false);
  const [stagedCatalogImages, setStagedCatalogImages] = useState([]);
  const [selectedCatalogImages, setSelectedCatalogImages] = useState([]);
  const [uploadDropdownOpen, setUploadDropdownOpen] = useState(false);
  const [uploadDropdownClosing, setUploadDropdownClosing] = useState(false);

  const typingIntervalRef = useRef(null);
  const aiTypingTimerRef = useRef(null);
  const messageIdCounter = useRef(0);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const uploadDropdownRef = useRef(null);

  // Typing animation — when catalogProcessed use stage[1].input, otherwise use current stage
  useEffect(() => {
    clearInterval(typingIntervalRef.current);
    setTypingText('');
    if (isAiTyping) return;
    const text = catalogProcessed ? cgData[1]?.input : cgData[stage]?.input;
    if (!text) return;
    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      i++;
      setTypingText(text.slice(0, i));
      if (i === text.length) clearInterval(typingIntervalRef.current);
    }, 15);
    return () => clearInterval(typingIntervalRef.current);
  }, [stage, isAiTyping, catalogProcessed]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!isAiTyping) return;
    const id = setInterval(() => {
      if (chatContainerRef.current)
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, 100);
    return () => clearInterval(id);
  }, [isAiTyping]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.scrollLeft = inputRef.current.scrollWidth;
  }, [typingText]);

  // Close upload dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (uploadDropdownOpen && uploadDropdownRef.current && !uploadDropdownRef.current.contains(e.target)) {
        setUploadDropdownClosing(true);
        setTimeout(() => { setUploadDropdownOpen(false); setUploadDropdownClosing(false); }, 250);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [uploadDropdownOpen]);

  const startAiTyping = (output, onDone) => {
    clearTimeout(aiTypingTimerRef.current);
    setIsAiTyping(true);
    const duration = countOutputChars(output) * 5 + 400;
    aiTypingTimerRef.current = setTimeout(() => {
      setIsAiTyping(false);
      onDone?.();
    }, duration);
  };

  const handleProcessFiles = () => {
    if (catalogProcessed) return;
    if (selectedCatalogImages.length !== catalogUploadImages.length) return;
    setStagedCatalogImages([...catalogUploadImages]);
    setCatalogProcessed(true);
    setUploadDropdownClosing(true);
    setTimeout(() => { setUploadDropdownOpen(false); setUploadDropdownClosing(false); }, 250);
  };

  const handleSend = () => {
    if (!typingText.trim() || isAiTyping) return;

    let output, isLast, nextStage;

    if (catalogProcessed) {
      output = cgData[1]?.output ?? [];
      const totalStages = cgData.length;
      isLast = 1 >= totalStages - 1;
      nextStage = 2;
      setCatalogProcessed(false);
    } else {
      const stageText = cgData[stage]?.input ?? '';
      if (typingText.trim() !== stageText.trim()) {
        handleModal();
        let i = 0;
        clearInterval(typingIntervalRef.current);
        setTypingText('');
        typingIntervalRef.current = setInterval(() => {
          i++;
          setTypingText(stageText.slice(0, i));
          if (i >= stageText.length) clearInterval(typingIntervalRef.current);
        }, 15);
        return;
      }
      output = cgData[stage]?.output ?? [];
      isLast = stage >= cgData.length - 1;
      nextStage = stage + 1;
    }

    const thinkingId = ++messageIdCounter.current;
    setMessages(prev => [...prev,
      {
        role: 'user',
        text: typingText,
        images: stagedCatalogImages.length > 0 ? [...stagedCatalogImages] : null,
        id: ++messageIdCounter.current,
      },
      { role: 'ai', isThinking: true, id: thinkingId },
    ]);
    setTypingText('');
    setStagedCatalogImages([]);
    setStage(nextStage);

    setTimeout(() => {
      setMessages(prev => prev.map(m =>
        m.id === thinkingId
          ? { role: 'ai', output, showThought: true, animate: true, id: thinkingId }
          : m
      ));
      startAiTyping(output, isLast ? () => setTimeout(() => handleModal(), 1000) : undefined);
    }, 1000);
  };

  const canProcess = !catalogProcessed && selectedCatalogImages.length === catalogUploadImages.length;
  const showSend = catalogProcessed || stage > 1;

  const uploadSlot = (
    <div ref={uploadDropdownRef} style={{ position: 'relative', flexShrink: 0 }}>
      <div
        onClick={() => {
          if (uploadDropdownOpen) {
            setUploadDropdownClosing(true);
            setTimeout(() => { setUploadDropdownOpen(false); setUploadDropdownClosing(false); }, 250);
          } else {
            setSelectedCatalogImages(catalogUploadImages.map((_, i) => i));
            setUploadDropdownOpen(true);
          }
        }}
        style={{ width: 32, height: 32, border: '1px solid #d1d5db', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'white' }}
      >
        <i className="fa fa-upload" style={{ fontSize: 16, color: '#1a2e44' }} />
      </div>
      {uploadDropdownOpen && (
        <div style={{
          position: 'absolute', bottom: '110%', left: 0, width: 240,
          background: 'white', border: '1px solid #d1d5db', borderRadius: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)', padding: 10, zIndex: 50,
          transformOrigin: 'bottom left',
          animation: `${uploadDropdownClosing ? 'demoDropdownShrink' : 'demoDropdownExpand'} 0.25s ease forwards`,
        }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#111827' }}>Upload Files</p>
          <CatalogGeneratorUpload
            uploadImages={catalogUploadImages}
            selectedImages={selectedCatalogImages}
            setSelectedImages={setSelectedCatalogImages}
          />
          <button
            onClick={handleProcessFiles}
            style={{ width: '100%', padding: '7px 0', fontSize: 12, fontWeight: 600, background: canProcess ? '#1a2e44' : '#9ca3af', color: 'white', border: 'none', borderRadius: 6, cursor: canProcess ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}
          >
            Process Files
          </button>
        </div>
      )}
    </div>
  );

  return (
    <DemoChatShell
      chatContainerRef={chatContainerRef}
      messages={messages}
      emptyIcon={{ className: 'fas fa-list', color: '#049669' }}
      emptyText="Try uploading an image."
      renderUserBubble={msg => (
        <div style={{ maxWidth: '70%', background: '#2563eb', color: 'white', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', fontSize: 13, lineHeight: 1.5 }}>
          {msg.images && (
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
              {msg.images.map((src, i) => (
                <img key={i} src={src} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4, border: '1px solid rgba(255,255,255,0.3)' }} />
              ))}
            </div>
          )}
          {msg.text}
        </div>
      )}
      renderAiContent={msg => <CatalogGeneratorOutput output={msg.output} animate={msg.animate} />}
      inputBar={
        <DemoChatInputBar
          inputRef={inputRef}
          typingText={typingText}
          onChange={e => setTypingText(e.target.value)}
          onSend={handleSend}
          isAiTyping={isAiTyping}
          hideSend={!showSend}
          pulsing={!isAiTyping}
          uploadSlot={uploadSlot}
          stagedContent={stagedCatalogImages.length > 0 && (
            <div style={{ padding: '8px 12px 4px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {stagedCatalogImages.map((src, i) => (
                <img key={i} src={src} alt="" style={{ width: 56, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb' }} />
              ))}
            </div>
          )}
        />
      }
    />
  );
}
