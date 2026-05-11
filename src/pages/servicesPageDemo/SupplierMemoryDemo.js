import React, { useState, useEffect, useRef } from 'react';
import { handleFilesFollowUps } from '../../data/heroData.js';
import { handleFile1 } from '../../data/handleFilesData.js';
import HandleFilesOutput, { HandleFilesUpload, computeFileDetailsDuration } from '../heroTab/HandleFiles.js';
import { DemoChatShell, DemoChatInputBar } from '../../components/DemoChat.js';

const STAGED_TEXT = 'Generate a Document Detail file for this file';

const FILE_NAME = 'Product #12345.pptx';
const handleFilesItems = [{ name: FILE_NAME }];
const fileDataMap = { [FILE_NAME]: handleFile1 };

const users = [
  { name: 'Marcus Lin', color: '#1fc9ed' },
  { name: 'Priya Nair', color: '#fcc10a' },
  { name: 'Ethan Wolfe', color: '#e02f3e' },
  { name: 'Chloe Park', color: '#049669' },
];

export default function SupplierMemoryDemo({ handleModal }) {
  const [messages, setMessages] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [stage, setStage] = useState(0);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [stagedHandleFile, setStagedHandleFile] = useState(null);
  const [selectedHandleFile, setSelectedHandleFile] = useState(null);
  const [processedFilesSet, setProcessedFilesSet] = useState(new Set());
  const [uploadDropdownOpen, setUploadDropdownOpen] = useState(false);
  const [uploadDropdownClosing, setUploadDropdownClosing] = useState(false);
  const [saveToast, setSaveToast] = useState(null);

  const typingIntervalRef = useRef(null);
  const aiTypingTimerRef = useRef(null);
  const messageIdCounter = useRef(0);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const uploadDropdownRef = useRef(null);

  // Typing animation
  useEffect(() => {
    clearInterval(typingIntervalRef.current);
    setTypingText('');
    if (isAiTyping) return;

    let text;
    if (stagedHandleFile) {
      text = STAGED_TEXT;
    } else if (processedFile && stage > 0) {
      text = handleFilesFollowUps[processedFile]?.['Marcus Lin']?.[stage - 1]?.input;
    } else {
      text = 'Please select a file';
    }
    if (!text) return;

    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      i++;
      setTypingText(text.slice(0, i));
      if (i === text.length) clearInterval(typingIntervalRef.current);
    }, 15);
    return () => clearInterval(typingIntervalRef.current);
  }, [stage, isAiTyping, stagedHandleFile, processedFile]);

  // Auto-scroll
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

  const startAiTyping = (output, onDone, overrideDuration) => {
    clearTimeout(aiTypingTimerRef.current);
    setIsAiTyping(true);
    const duration = overrideDuration ?? (JSON.stringify(output).length * 5 + 200);
    aiTypingTimerRef.current = setTimeout(() => {
      setIsAiTyping(false);
      onDone?.();
    }, duration);
  };

  const handleProcessFiles = () => {
    if (!selectedHandleFile || processedFilesSet.has(selectedHandleFile)) return;
    setStagedHandleFile(selectedHandleFile);
    setProcessedFilesSet(prev => new Set([...prev, selectedHandleFile]));
    setUploadDropdownClosing(true);
    setTimeout(() => { setUploadDropdownOpen(false); setUploadDropdownClosing(false); }, 250);
  };

  const handleSend = () => {
    if (!typingText.trim() || isAiTyping) return;

    // ── File upload flow ──
    if (stagedHandleFile) {
      const fileNameToProcess = stagedHandleFile;
      const fileData = fileDataMap[fileNameToProcess];
      const thinkingId = ++messageIdCounter.current;

      setMessages(prev => [...prev,
        { role: 'user', text: typingText, fileUpload: fileNameToProcess, id: ++messageIdCounter.current },
        { role: 'ai', isThinking: true, id: thinkingId },
      ]);
      setTypingText('');
      setStagedHandleFile(null);
      setProcessedFile(fileNameToProcess);
      setStage(1);

      setTimeout(() => {
        const fileSuccessOutput = [{ type: 'fileSuccess', fileName: fileNameToProcess }];
        const fileDetailsOutput = [{ type: 'fileDetails', fileData }];
        const fileFollowUpOutput = [{ type: 'fileFollowUp' }];

        setMessages(prev => {
          const idx = prev.findIndex(m => m.id === thinkingId);
          if (idx === -1) return prev;
          const next = [...prev];
          next.splice(idx, 1,
            { role: 'ai', output: fileSuccessOutput, showThought: true, animate: true, id: ++messageIdCounter.current },
            { role: 'ai', output: fileDetailsOutput, showThought: false, animate: true, id: ++messageIdCounter.current },
          );
          return next;
        });

        const followUpText = 'You can now ask follow-up questions about these files or reference their document IDs.';
        startAiTyping([...fileSuccessOutput, ...fileDetailsOutput], () => {
          setIsAiTyping(true);
          setMessages(prev => [...prev,
            { role: 'ai', output: fileFollowUpOutput, showThought: false, animate: true, id: ++messageIdCounter.current },
          ]);
          clearTimeout(aiTypingTimerRef.current);
          aiTypingTimerRef.current = setTimeout(() => setIsAiTyping(false), followUpText.length * 5 + 400);
        }, computeFileDetailsDuration(fileData, users.length));
      }, 1000);
      return;
    }

    // ── Follow-up flow ──
    const followUps = handleFilesFollowUps[processedFile]?.['Marcus Lin'] ?? [];
    const stageText = followUps[stage - 1]?.input ?? '';

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

    const output = followUps[stage - 1]?.output ?? [];
    const isLast = stage >= followUps.length;
    const nextStage = stage + 1;

    const thinkingId = ++messageIdCounter.current;
    setMessages(prev => [...prev,
      { role: 'user', text: typingText, id: ++messageIdCounter.current },
      { role: 'ai', isThinking: true, id: thinkingId },
    ]);
    setTypingText('');
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

  const hideSend = !stagedHandleFile && stage === 0;
  const canProcess = !!selectedHandleFile && !processedFilesSet.has(selectedHandleFile);

  const uploadSlot = (
    <div ref={uploadDropdownRef} style={{ position: 'relative', flexShrink: 0 }}>
      <div
        onClick={() => {
          if (uploadDropdownOpen) {
            setUploadDropdownClosing(true);
            setTimeout(() => { setUploadDropdownOpen(false); setUploadDropdownClosing(false); }, 250);
          } else {
            setUploadDropdownOpen(true);
          }
        }}
        style={{ width: 32, height: 32, border: '1px solid #d1d5db', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'white', animation: hideSend && !isAiTyping ? 'demoSendPulse 1.5s ease-in-out infinite' : 'none' }}
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
          <HandleFilesUpload
            items={handleFilesItems}
            selectedFile={selectedHandleFile}
            setSelectedFile={setSelectedHandleFile}
            processedSet={processedFilesSet}
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
      emptyIcon={{ className: 'fas fa-file-upload', color: '#e02f3e' }}
      emptyText="Try uploading a file."
      renderUserBubble={msg => (
        <div style={{ maxWidth: '70%', background: '#2563eb', color: 'white', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', fontSize: 13, lineHeight: 1.5, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {msg.fileUpload && (
            <>
              <i className="fas fa-file-powerpoint" style={{ fontSize: 13, color: '#ffb3b3', flexShrink: 0 }} />
              <span style={{ fontSize: 11, opacity: 0.85, flexShrink: 0 }}>{msg.fileUpload}</span>
            </>
          )}
          <span>{msg.text}</span>
        </div>
      )}
      renderAiContent={msg => (
        <HandleFilesOutput
          output={msg.output}
          users={users}
          userStages={{}}
          animate={msg.animate}
          onSave={toastMsg => { setSaveToast(toastMsg); setTimeout(() => setSaveToast(null), 3500); }}
        />
      )}
      chatOverlay={saveToast && (
        <div style={{ position: 'absolute', bottom: 16, left: 16, background: '#1a2e44', color: 'white', fontSize: 12, padding: '8px 16px', borderRadius: 8, whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', animation: 'demoScrollUp 0.3s ease forwards', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fas fa-check-circle" style={{ color: '#4ade80' }} />
          {saveToast}
        </div>
      )}
      inputBar={
        <DemoChatInputBar
          inputRef={inputRef}
          typingText={typingText}
          onChange={e => setTypingText(e.target.value)}
          onSend={handleSend}
          isAiTyping={isAiTyping}
          hideSend={hideSend}
          pulsing={!isAiTyping}
          uploadSlot={uploadSlot}
          stagedContent={stagedHandleFile && (
            <div style={{ padding: '8px 12px 4px', display: 'flex', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 8px', background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 6 }}>
                <i className="fas fa-file-powerpoint" style={{ fontSize: 12, color: '#e02f3e' }} />
                <span style={{ fontSize: 10, color: '#e02f3e', fontWeight: 600 }}>{stagedHandleFile}</span>
              </div>
            </div>
          )}
        />
      }
    />
  );
}
