import React, { useState, useEffect } from 'react';

const DiagnosticsPage = () => {
  const [logs, setLogs] = useState([]);
  const [viewport, setViewport] = useState(`${window.innerWidth} x ${window.innerHeight}`);
  const [latency, setLatency] = useState('calculating...');
  const [isDone, setIsDone] = useState(false);

  // Monitor screen resizing in real time
  useEffect(() => {
    const handleResize = () => {
      setViewport(`${window.innerWidth} x ${window.innerHeight}`);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Measure latency to backend server
  useEffect(() => {
    const start = performance.now();
    fetch('/api/projects')
      .then(() => {
        const time = Math.round(performance.now() - start);
        setLatency(`${time} ms`);
      })
      .catch(() => {
        // Fallback if API offline
        const time = Math.round(Math.random() * 30) + 10;
        setLatency(`${time} ms (simulated)`);
      });
  }, []);

  // Script console simulation logs on mount
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const os = navigator.platform || 'Unknown OS';
    const threads = navigator.hardwareConcurrency || 'N/A';
    const memory = navigator.deviceMemory || 'N/A';
    
    // Parse browser
    let browserName = "Unknown Browser";
    const agent = navigator.userAgent;
    if (agent.indexOf("Chrome") > -1) browserName = "Google Chrome";
    else if (agent.indexOf("Firefox") > -1) browserName = "Mozilla Firefox";
    else if (agent.indexOf("Safari") > -1) browserName = "Apple Safari";
    else if (agent.indexOf("MSIE") > -1 || !!document.documentMode === true) browserName = "IE";

    const scriptLines = [
      { text: '🚀 Starting System Diagnostic script: diagnostics.sh v2.0.4...', color: 'var(--blue)' },
      { text: '[ OK ] Loading environment registers...', color: 'var(--green)' },
      { text: '[ OK ] Checking Node backend connection status...', color: 'var(--green)' },
      { text: `[ OK ] API Endpoint response latency: ${latency}`, color: 'var(--green)', dynamicLatency: true },
      { text: '[ OK ] Validating local database connection...', color: 'var(--green)' },
      { text: '------------------------------------------------------------', color: 'var(--dim)' },
      { text: '🖥️  CLIENT MACHINE SPECS DETECTED:', color: 'var(--yellow)', bold: true },
      { text: `   🔹 Operating System : ${os}`, color: 'var(--text)' },
      { text: `   🔹 Browser Software: ${browserName}`, color: 'var(--text)' },
      { text: `   🔹 CPU Logic Cores : ${threads} threads`, color: 'var(--text)' },
      { text: `   🔹 Estimated RAM   : ${memory} GB`, color: 'var(--text)' },
      { text: `   🔹 Device Type     : ${isMobile ? 'Mobile Phone' : 'Desktop / PC'}`, color: 'var(--text)' },
      { text: '------------------------------------------------------------', color: 'var(--dim)' },
      { text: '📊  REAL-TIME DIAGNOSTIC VIEWPORTS:', color: 'var(--yellow)', bold: true },
      { text: `   🔸 Active Screen Size: ${viewport}`, color: 'var(--text)', dynamicResolution: true },
      { text: '   🔸 Connection Protocol: HTTP/1.1 over SSL/TLS', color: 'var(--text)' },
      { text: '------------------------------------------------------------', color: 'var(--dim)' },
      { text: '⚙️  PORTFOLIO SYSTEM DEPS: [COMPLETED]', color: 'var(--green)', bold: true },
      { text: '   ✔ React (v19.2) - HEALTHY', color: 'var(--text)' },
      { text: '   ✔ Node.js API (v20) - ONLINE', color: 'var(--text)' },
      { text: '   ✔ Express Middleware - SECURE', color: 'var(--text)' },
      { text: '   ✔ MongoDB Cluster - SHARD HEALTHY', color: 'var(--text)' },
      { text: '============================================================', color: 'var(--dim)' },
      { text: '🎉 Diagnostic test execution finished. Client is certified for hiring!', color: '#22c55e', bold: true }
    ];

    let current = 0;
    setLogs([]);
    setIsDone(false);

    const interval = setInterval(() => {
      if (current < scriptLines.length) {
        const nextLine = scriptLines[current];
        setLogs(prev => [...prev, nextLine]);
        current++;
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [latency]); // rerun simulation only if latency resolves

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#0d0d0d', // terminal black background
      color: '#c5c5c5',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '12.5px',
      lineHeight: 1.6
    }}>
      {/* Script Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)',
        height: '42px',
        flexShrink: 0
      }}>
        <span style={{ color: 'var(--green)', fontSize: '15px' }}>🐚</span>
        <span style={{ fontSize: '12px', color: 'var(--dim)' }}>
          diagnostics.sh › Execution Logs
        </span>
        {isDone && (
          <button
            onClick={() => setLatency(l => l.includes('simulated') ? '12 ms' : 're-calculating...')}
            style={restartBtnStyle}
            title="Re-run Diagnostic script"
          >
            ↻ Restart Script
          </button>
        )}
      </div>

      {/* Terminal Viewport */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }} className="thin-scroll">
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          {logs.map((log, index) => {
            let logText = log.text;
            // Handle reactive updates dynamically within printed logs
            if (log.dynamicLatency) {
              logText = `[ OK ] API Endpoint response latency: ${latency}`;
            } else if (log.dynamicResolution) {
              logText = `   🔸 Active Screen Size: ${viewport}`;
            }

            return (
              <div
                key={index}
                style={{
                  color: log.color,
                  fontWeight: log.bold ? 'bold' : 'normal',
                  whiteSpace: 'pre-wrap',
                  animation: 'fadeIn 0.1s ease-out'
                }}
              >
                {logText}
              </div>
            );
          })}
          
          {!isDone && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--yellow)', marginTop: '8px' }}>
              <span className="terminal-cursor" style={{ width: '8px', height: '15px', background: 'var(--yellow)', display: 'inline-block' }} />
              <span>Running system diagnostics...</span>
            </div>
          )}
        </div>
      </div>
      
      {/* CSS blink keyframe */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .terminal-cursor {
          animation: blink 0.8s infinite;
        }
      `}</style>
    </div>
  );
};

const restartBtnStyle = {
  marginLeft: 'auto',
  background: 'var(--bg3)',
  border: '1px solid var(--border)',
  borderRadius: '4px',
  color: 'var(--text)',
  fontSize: '11px',
  padding: '4px 12px',
  cursor: 'pointer',
  fontFamily: 'JetBrains Mono, monospace',
  transition: 'border-color 0.15s'
};

export default DiagnosticsPage;
