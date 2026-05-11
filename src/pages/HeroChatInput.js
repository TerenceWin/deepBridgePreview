import React, { useEffect } from 'react';
import { FactoryFinderUpload } from './heroTab/FactoryFinder.js';
import { QuotationGeneratorUpload } from './heroTab/QuotationGenerator.js';
import { HandleFilesUpload } from './heroTab/HandleFiles.js';
import { CatalogGeneratorUpload } from './heroTab/CatalogGenerator.js';

export default function HeroChatInput({
  tabs, currentTab, setCurrentTab, startTabInterval, tabIntervalRef,
  tabDropdownRef, tabDropdownOpen, setTabDropdownOpen, tabDropdownClosing, setTabDropdownClosing,
  uploadDropdownRef, uploadDropdownOpen, setUploadDropdownOpen, uploadDropdownClosing, setUploadDropdownClosing,
  selectedHandleFile, setSelectedHandleFile, processedFilesSet,
  selectedCatalogImages, setSelectedCatalogImages, catalogUploadImages, handleFilesItems,
  catalogProcessed, stagedHandleFile, handleProcessFiles, stagedCatalogImages,
  typingText, setTypingText, inputRef, userStages, selectedUser,
  guideStep, isAiTyping, handleSend, isMobile,
}) {
  const handleIcon = () => {
    if (currentTab === tabs[0]) return 'fas fa-industry';
    if (currentTab === tabs[1]) return 'fas fa-file-invoice';
    if (currentTab === tabs[2]) return 'fas fa-file-upload';
    return 'fas fa-list';
  };
  const handleTabIcon = (tab) => {
    if (tab === tabs[0]) return 'fas fa-industry';
    if (tab === tabs[1]) return 'fas fa-file-invoice';
    if (tab === tabs[2]) return 'fas fa-file-upload';
    return 'fas fa-list';
  };

  const stage = userStages[selectedUser.name] ?? 0;
  const hideSend = !(catalogProcessed || stagedHandleFile) && stage === 0 && (currentTab === tabs[2] || currentTab === tabs[3]);
  const inUIGuide = guideStep !== null && guideStep <= 3;
  const canProcess = currentTab === tabs[3]
    ? !catalogProcessed && selectedCatalogImages.length === catalogUploadImages.length
    : !stagedHandleFile && !!selectedHandleFile;

  // Auto-resize textarea whenever text changes (including programmatic typing animation)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [typingText]);

  return (
    <div style={{ width: '100%', backgroundColor: 'white', border: '1px solid #8e8e8e', borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 8, gap: 8 }}>
      <div style={{ width: '100%', border: '1px solid #8e8e8e', borderRadius: 8, display: 'flex', flexDirection: 'column', padding: '8px 0px' }}>
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
        {/* Row 1: Tab Switcher + Upload + Send (Send moves here on mobile) */}
        <div style={{ padding: '0px 14px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Tab Switcher */}
          <div ref={tabDropdownRef} style={{ position: 'relative', flex: 1, maxWidth: 170, minWidth: 0 }}>
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
              <i className={handleIcon()} style={{ fontSize: 16, marginRight: 10, animation: 'scrollUp 0.5s ease forwards', color: currentTab === tabs[0] ? '#1fc9ed' : currentTab === tabs[1] ? '#fcc10a' : currentTab === tabs[2] ? '#e02f3e' : '#049669' }} />
              <span key={currentTab} style={{ display: 'inline-block', animation: 'scrollUp 0.5s ease forwards' }}>{currentTab}</span>
            </button>
            {tabDropdownOpen && (
              <div style={{ position: 'absolute', bottom: '110%', left: 0, width: '100%', background: 'white', border: '1px solid #d1d5db', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 50, transformOrigin: 'bottom', animation: `${tabDropdownClosing ? 'tabShrink' : 'tabExpand'} 0.25s ease forwards` }}>
                {tabs.map(tab => (
                  <div key={tab}
                    onClick={() => {
                      setCurrentTab(tab);
                      clearInterval(tabIntervalRef.current);
                      startTabInterval();
                      setTabDropdownClosing(true);
                      setTimeout(() => { setTabDropdownOpen(false); setTabDropdownClosing(false); }, 250);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', fontSize: 12, fontWeight: tab === currentTab ? 600 : 400, cursor: 'pointer', background: tab === currentTab ? '#f0f9ff' : 'white', color: '#111827' }}
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

          {/* Upload */}
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
              style={{ width: 32, height: 32, border: '1px solid #d1d5db', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'white', animation: hideSend && !isAiTyping ? 'sendButtonPulse 1.5s ease-in-out infinite' : 'none' }}>
              <i className="fa fa-upload" style={{ fontSize: 16, color: '#1a2e44' }} />
            </div>
            {uploadDropdownOpen && (
              <div style={{ position: 'absolute', bottom: '110%', left: 0, width: 240, background: 'white', border: '1px solid #d1d5db', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', padding: 10, zIndex: 50, transformOrigin: 'bottom left', animation: `${uploadDropdownClosing ? 'tabShrink' : 'tabExpand'} 0.25s ease forwards` }}>
                <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#111827' }}>Upload Files</p>
                {currentTab === tabs[0] && <FactoryFinderUpload />}
                {currentTab === tabs[1] && <QuotationGeneratorUpload />}
                {currentTab === tabs[2] && <HandleFilesUpload items={handleFilesItems} selectedFile={selectedHandleFile} setSelectedFile={setSelectedHandleFile} processedSet={processedFilesSet} />}
                {currentTab === tabs[3] && <CatalogGeneratorUpload uploadImages={catalogUploadImages} selectedImages={selectedCatalogImages} setSelectedImages={setSelectedCatalogImages} />}
                <button onClick={handleProcessFiles} style={{ width: '100%', padding: '7px 0', fontSize: 12, fontWeight: 600, background: canProcess ? '#1a2e44' : '#9ca3af', color: 'white', border: 'none', borderRadius: 6, cursor: canProcess ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
                  Process Files
                </button>
              </div>
            )}
          </div>

          {/* Desktop: textarea lives here in row 1 */}
          {!isMobile && (
            <textarea ref={inputRef}
              onFocus={() => { clearInterval(tabIntervalRef.current); }}
              onBlur={() => { startTabInterval(); }}
              onChange={e => setTypingText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!hideSend && !inUIGuide) handleSend(); } }}
              style={{ flex: 1, fontSize: 13, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, color: 'black', background: 'white', fontFamily: 'inherit', resize: 'none', overflow: 'hidden', lineHeight: 1.5, minHeight: 36, boxSizing: 'border-box' }}
              value={typingText}
              rows={1}
            />
          )}

          {/* Send */}
          {!hideSend && (
            <button disabled={inUIGuide} onClick={() => !inUIGuide && handleSend()}
              style={{ fontSize: 14, fontWeight: 600, padding: '8px', background: inUIGuide ? '#9ca3af' : '#08253f', color: 'white', border: 'none', borderRadius: 6, cursor: inUIGuide ? 'not-allowed' : 'pointer', fontFamily: 'inherit', flexShrink: 0, animation: !isAiTyping && !inUIGuide ? 'sendButtonPulse 1.5s ease-in-out infinite' : 'none' }}>
              Send
            </button>
          )}
        </div>

        {/* Row 2 on mobile: Textarea */}
        {isMobile && (
          <div style={{ padding: '8px 14px 0px' }}>
            <textarea ref={inputRef}
              onFocus={() => { clearInterval(tabIntervalRef.current); }}
              onBlur={() => { startTabInterval(); }}
              onChange={e => setTypingText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!hideSend && !inUIGuide) handleSend(); } }}
              style={{ width: '100%', fontSize: 13, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, color: 'black', background: 'white', fontFamily: 'inherit', resize: 'none', overflow: 'hidden', lineHeight: 1.5, minHeight: 30, boxSizing: 'border-box' }}
              value={typingText}
              rows={1}
            />
          </div>
        )}
      </div>
    </div>
  );
}
