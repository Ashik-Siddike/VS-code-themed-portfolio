import React, { useState, useEffect } from 'react';

const BrowserPage = ({ browserUrl, browserTitle, setActivePage }) => {
  const [iframeSrc, setIframeSrc] = useState(browserUrl);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [runProgress, setRunProgress] = useState(0);

  useEffect(() => {
    setIframeSrc(browserUrl);
    setConsoleLogs([]);
    setIsRunning(false);
    setRunProgress(0);
  }, [browserUrl]);

  const handleRefresh = () => {
    const original = iframeSrc;
    setIframeSrc('');
    setTimeout(() => setIframeSrc(original), 50);
  };

  const simulateAutomation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setConsoleLogs([]);
    setRunProgress(0);

    const logs = [
      '🚀 [INFO] Starting Affiliate Automation Pipeline v4.2.1...',
      '📡 [INFO] Checking system configuration & API keys status...',
      '✅ [SUCCESS] Google Gemini API Key verified (Free Tier Rotation active).',
      '✅ [SUCCESS] ScrapingAnt API Key verified (5 proxy keys ready).',
      '🔍 [PROCESS] Discovering trending keywords in niche: "Smart Home Devices"...',
      '📈 [FOUND] Target keyword found: "best smart plugs for home assistant 2026"',
      '🌐 [SCRAPING] Launching ScrapingAnt headless browser instances...',
      '📥 [DATA] Fetched product details for 3 top-rated Amazon smart plugs.',
      '🤖 [AI] Formatting context & feeding raw HTML to Google Gemini 1.5 Flash...',
      '📝 [AI] Generating SEO-optimized product review article (1,200 words)...',
      '🎨 [GRAPHIC] Generating comparison feature matrix card via Canvas compositor...',
      '💾 [DB] Saving generated article details to MongoDB Atlas cluster...',
      '🔌 [WEBHOOK] Triggering n8n webhook workflow for social sharing...',
      '📲 [SOCIAL] Auto-posted review article to Facebook Page via n8n integration.',
      '🔗 [AFFILIATE] Tagging links with Associate Tag: ashiksiddike-20',
      '✨ [SUCCESS] Pipeline iteration finished successfully in 4.5 seconds!'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setConsoleLogs(prev => [...prev, logs[currentLogIndex]]);
        setRunProgress(Math.round(((currentLogIndex + 1) / logs.length) * 100));
        currentLogIndex++;
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 350);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* 🌐 Browser Header Address Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 16px',
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        height: '42px',
        flexShrink: 0
      }}>
        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setActivePage('projects')}
            title="Back to Projects"
            style={navBtnStyle}
          >
            ←
          </button>
          <button style={{ ...navBtnStyle, opacity: 0.3, cursor: 'default' }}>→</button>
          <button
            onClick={handleRefresh}
            title="Refresh Page"
            style={navBtnStyle}
          >
            ↻
          </button>
        </div>

        {/* Address bar input */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: '5px',
          padding: '4px 12px',
          fontSize: '12px',
          color: 'var(--dim)',
          fontFamily: 'JetBrains Mono, monospace'
        }}>
          <span style={{ color: 'var(--green)' }}>🔒 Secure</span>
          <span>|</span>
          <span style={{ color: 'var(--text)' }}>
            {iframeSrc || 'localhost:3000/affiliate-automation-cli'}
          </span>
        </div>

        {/* Open in external tab button */}
        {browserUrl && (
          <button
            onClick={() => window.open(browserUrl, '_blank')}
            title="Open in new window"
            style={{
              background: 'var(--blue2)',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              fontSize: '11px',
              fontWeight: 'bold',
              padding: '4px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Open Live <span>↗</span>
          </button>
        )}
      </div>

      {/* 🖥️ Browser Body */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {browserUrl ? (
          iframeSrc ? (
            <iframe
              src={iframeSrc}
              title={browserTitle}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'white'
              }}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          ) : (
            <div style={centerMsgStyle}>Refreshing Simple Browser...</div>
          )
        ) : (
          /* 🤖 Non-UI Python Scraper / Automation Simulation Console */
          <div style={{ display: 'flex', height: '100%', flexDirection: 'row', overflow: 'hidden' }}>
            {/* Left: Code Viewer */}
            <div style={{
              flex: 1,
              borderRight: '1px solid var(--border)',
              background: 'var(--bg)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <div style={panelHeaderStyle}>💻 Python Automation Code</div>
              <pre style={{
                margin: 0,
                padding: '16px',
                overflow: 'auto',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11.5px',
                lineHeight: 1.65,
                color: '#d4d4d4',
                flex: 1
              }}>
                <code>
                  {`import os
import requests
from bs4 import BeautifulSoup
from scrapingant import ScrapingAntClient
from google.generativeai import GenerativeModel

class AffiliateAutomation:
    def __init__(self):
        self.api_keys = os.getenv("GEMINI_API_KEYS").split(",")
        self.ant_client = ScrapingAntClient(token=os.getenv("SCRAPINGANT_KEY"))
        
    def fetch_products(self, keyword):
        print(f"[PROCESS] Scraping products for: {keyword}")
        url = f"https://www.amazon.com/s?k={keyword}"
        response = self.ant_client.general_request(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        return self.parse_results(soup)
        
    def generate_seo_article(self, products):
        print("[AI] Sending parsed HTML content to Gemini Flash...")
        model = GenerativeModel('gemini-1.5-flash')
        prompt = f"Create an SEO review article using: {products}"
        response = model.generate_content(prompt)
        return response.text
        
    def share_on_socials(self, article_title):
        print("[WEBHOOK] Triggering social poster workflows...")
        requests.post("https://hook.make.com/post", json={"title": article_title})
        print("✅ Posted review update to Facebook Page successfully.")`}
                </code>
              </pre>
            </div>

            {/* Right: Simulated Script Runner */}
            <div style={{
              flex: 1.2,
              background: '#0c0c0c',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <div style={{
                ...panelHeaderStyle,
                background: '#141414',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>🖥️ Execution Terminal Simulation</span>
                <button
                  onClick={simulateAutomation}
                  disabled={isRunning}
                  style={{
                    background: isRunning ? '#333' : '#22c55e',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    padding: '3px 10px',
                    cursor: isRunning ? 'default' : 'pointer'
                  }}
                >
                  {isRunning ? `Running (${runProgress}%)` : 'Run Pipeline Script'}
                </button>
              </div>

              {/* Logs area */}
              <div style={{
                flex: 1,
                padding: '16px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11.5px',
                color: '#a9b7c6',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {consoleLogs.length === 0 && !isRunning && (
                  <div style={{ color: 'var(--dim)', fontStyle: 'italic', padding: '10px' }}>
                    Click the 'Run Pipeline Script' button above to simulate the AI scraping & automation workflow execution.
                  </div>
                )}
                {consoleLogs.map((log, i) => (
                  <div
                    key={i}
                    style={{
                      color: log.includes('SUCCESS') ? '#22c55e' : log.includes('PROCESS') || log.includes('SCRAPING') || log.includes('AI') ? '#38bdf8' : '#a9b7c6',
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.5
                    }}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const navBtnStyle = {
  background: 'transparent',
  border: 'none',
  borderRadius: '4px',
  color: 'var(--text)',
  fontSize: '14px',
  width: '24px',
  height: '24px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.1s'
};

const panelHeaderStyle = {
  fontSize: '11px',
  fontWeight: 'bold',
  color: 'var(--dim)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  padding: '6px 16px',
  borderBottom: '1px solid var(--border)',
  background: 'var(--bg2)',
  height: '28px',
  flexShrink: 0
};

const centerMsgStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: 'var(--dim)',
  fontSize: '14px',
  background: 'var(--bg)'
};

export default BrowserPage;
