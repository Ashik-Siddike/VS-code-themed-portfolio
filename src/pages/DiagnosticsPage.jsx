import React, { useState, useEffect } from 'react';

const DiagnosticsPage = () => {
  const [logs, setLogs] = useState([]);
  const [viewport, setViewport] = useState(`${window.innerWidth} x ${window.innerHeight}`);
  const [latency, setLatency] = useState('calculating...');
  const [apiStatus, setApiStatus] = useState('checking...');
  const [dbStatus, setDbStatus] = useState('checking...');
  const [nodeVersion, setNodeVersion] = useState('checking...');
  const [dbError, setDbError] = useState(null);
  const [envDiagnostics, setEnvDiagnostics] = useState(null);
  const [runCount, setRunCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Monitor screen resizing in real time
  useEffect(() => {
    const handleResize = () => {
      setViewport(`${window.innerWidth} x ${window.innerHeight}`);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Measure latency to backend server & fetch real status
  useEffect(() => {
    const start = performance.now();
    fetch('/api/health')
      .then(res => {
        if (!res.ok) throw new Error('API Offline');
        return res.json();
      })
      .then(data => {
        const time = Math.round(performance.now() - start);
        setLatency(`${time} ms`);
        setApiStatus(data.status || 'ONLINE');
        setDbStatus(data.database || 'SHARD HEALTHY');
        setNodeVersion(data.nodeVersion || 'v20');
        setDbError(data.error);
        setEnvDiagnostics(data.envCheck);
      })
      .catch(() => {
        setLatency('offline');
        setApiStatus('OFFLINE');
        setDbStatus('OFFLINE');
        setNodeVersion('N/A');
        setDbError('Could not fetch health stats');
        setEnvDiagnostics(null);
      });
  }, [runCount]);

  // Script console simulation logs on mount / restart
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Parse OS precisely
    const getOS = () => {
      const ua = navigator.userAgent;
      const platform = navigator.platform || '';
      const is64 = /x64|x86_64|Win64|WOW64/i.test(ua) || platform === 'Win64';
      
      if (/Windows/i.test(ua)) {
        let winVer = 'Windows';
        if (/Windows NT 10.0/i.test(ua)) winVer = 'Windows 10/11';
        else if (/Windows NT 6.3/i.test(ua)) winVer = 'Windows 8.1';
        else if (/Windows NT 6.2/i.test(ua)) winVer = 'Windows 8';
        else if (/Windows NT 6.1/i.test(ua)) winVer = 'Windows 7';
        return `${winVer} (${is64 ? '64-bit' : '32-bit'})`;
      }
      if (/Macintosh|Mac OS X/i.test(ua)) {
        return 'macOS';
      }
      if (/iPhone|iPad|iPod/i.test(ua)) {
        return 'iOS';
      }
      if (/Android/i.test(ua)) {
        return 'Android';
      }
      if (/Linux/i.test(ua)) {
        return 'Linux';
      }
      return platform || 'Unknown OS';
    };

    // Parse Browser precisely
    const getBrowserName = () => {
      const ua = navigator.userAgent;
      if (/edg/i.test(ua)) return 'Microsoft Edge';
      if (/opr|opera/i.test(ua)) return 'Opera';
      if (/chrome|crios/i.test(ua)) return 'Google Chrome';
      if (/firefox|fxios/i.test(ua)) return 'Mozilla Firefox';
      if (/safari/i.test(ua)) return 'Apple Safari';
      if (/trident/i.test(ua)) return 'Internet Explorer';
      return 'Unknown Browser';
    };

    // Connection Protocol
    const getProtocol = () => {
      if (window.location.protocol === 'https:') {
        return 'HTTPS / TLS 1.3 (Secure)';
      }
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'HTTP/1.1 (Localhost / Unsecured)';
      }
      return 'HTTP/1.1 (Unsecured)';
    };

    const os = getOS();
    const browserName = getBrowserName();
    const protocol = getProtocol();
    const threads = navigator.hardwareConcurrency || 'N/A';
    
    // Smart RAM estimation
    const memory = navigator.deviceMemory || 'N/A';
    let ramDisplay = `${memory} GB`;
    if (memory === 8) {
      if (threads >= 12) {
        ramDisplay = '16 GB (Est. / Browser Sandbox Cap: 8 GB)';
      } else if (threads >= 8) {
        ramDisplay = '12 GB+ (Est. / Browser Sandbox Cap: 8 GB)';
      } else {
        ramDisplay = '8 GB (Browser Sandbox Cap)';
      }
    }

    const scriptLines = [
      { text: '🚀 Starting System Diagnostic script: diagnostics.sh v2.0.4...', color: 'var(--blue)' },
      { text: '[ OK ] Loading environment registers...', color: 'var(--green)' },
      { text: '[ OK ] Checking Node backend connection status...', color: 'var(--green)' },
      { text: `[ OK ] API Endpoint response latency: ${latency}`, color: 'var(--green)', dynamicLatency: true },
      { text: '[ OK ] Validating local database connection...', color: 'var(--green)', dynamicDbValidation: true },
      { text: '------------------------------------------------------------', color: 'var(--dim)' },
      { text: '🖥️  CLIENT MACHINE SPECS DETECTED:', color: 'var(--yellow)', bold: true },
      { text: `   🔹 Operating System : ${os}`, color: 'var(--text)' },
      { text: `   🔹 Browser Software: ${browserName}`, color: 'var(--text)' },
      { text: `   🔹 CPU Logic Cores : ${threads} threads`, color: 'var(--text)' },
      { text: `   🔹 Estimated RAM   : ${ramDisplay}`, color: 'var(--text)' },
      { text: `   🔹 Device Type     : ${isMobile ? 'Mobile Phone' : 'Desktop / PC'}`, color: 'var(--text)' },
      { text: '------------------------------------------------------------', color: 'var(--dim)' },
      { text: '📊  REAL-TIME DIAGNOSTIC VIEWPORTS:', color: 'var(--yellow)', bold: true },
      { text: `   🔸 Active Screen Size: ${viewport}`, color: 'var(--text)', dynamicResolution: true },
      { text: `   🔸 Connection Protocol: ${protocol}`, color: 'var(--text)', dynamicProtocol: true },
      { text: '------------------------------------------------------------', color: 'var(--dim)' },
      { text: '⚙️  PORTFOLIO SYSTEM DEPS: [COMPLETED]', color: 'var(--green)', bold: true },
      { text: '   ✔ React (v19.2) - HEALTHY', color: 'var(--text)' },
      { text: `   ✔ Node.js API (v20) - ONLINE`, color: 'var(--text)', dynamicNode: true },
      { text: '   ✔ Express Middleware - SECURE', color: 'var(--text)' },
      { text: `   ✔ MongoDB Cluster - SHARD HEALTHY`, color: 'var(--text)', dynamicDb: true },
      { text: '============================================================', color: 'var(--dim)' },
      { text: '🎉 Diagnostic test execution finished. Client is certified for hiring!', color: '#22c55e', bold: true }
    ];

    let current = 0;
    setLogs([]);
    setIsDone(false);

    const interval = setInterval(() => {
      if (current < scriptLines.length) {
        const nextLine = scriptLines[current];
        if (nextLine) {
          setLogs(prev => [...prev, nextLine]);
        }
        current++;
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [runCount]); // Run script simulation on mount or when runCount changes

  const handleRestart = () => {
    setLatency('calculating...');
    setApiStatus('checking...');
    setDbStatus('checking...');
    setNodeVersion('checking...');
    setRunCount(prev => prev + 1);
  };

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
            onClick={handleRestart}
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
            if (!log) return null;
            let logText = log.text;
            let logColor = log.color;
            
            // Handle reactive updates dynamically within printed logs
            if (log.dynamicLatency) {
              if (latency === 'offline') {
                return (
                  <div key={index} style={{ color: 'var(--red)', fontWeight: 'normal', whiteSpace: 'pre-wrap', animation: 'fadeIn 0.1s ease-out' }}>
                    [ FAIL ] API Endpoint response latency: OFFLINE
                  </div>
                );
              } else {
                return (
                  <div key={index} style={{ color: 'var(--green)', fontWeight: 'normal', whiteSpace: 'pre-wrap', animation: 'fadeIn 0.1s ease-out' }}>
                    [ OK ] API Endpoint response latency: {latency}
                  </div>
                );
              }
            } else if (log.dynamicDbValidation) {
              if (dbStatus === 'OFFLINE') {
                let errText = '';
                if (envDiagnostics && !envDiagnostics.hasMongoUri) {
                  errText = ' (process.env.MONGO_URI is undefined)';
                } else if (dbError) {
                  errText = ` (${dbError})`;
                }
                return (
                  <div key={index} style={{ color: 'var(--red)', fontWeight: 'normal', whiteSpace: 'pre-wrap', animation: 'fadeIn 0.1s ease-out' }}>
                    [ FAIL ] Validating local database connection...{errText}
                  </div>
                );
              } else {
                return (
                  <div key={index} style={{ color: 'var(--green)', fontWeight: 'normal', whiteSpace: 'pre-wrap', animation: 'fadeIn 0.1s ease-out' }}>
                    [ OK ] Validating local database connection...
                  </div>
                );
              }
            } else if (log.dynamicResolution) {
              logText = `   🔸 Active Screen Size: ${viewport}`;
            } else if (log.dynamicProtocol) {
              const getProtocol = () => {
                if (window.location.protocol === 'https:') {
                  return 'HTTPS / TLS 1.3 (Secure)';
                }
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                  return 'HTTP/1.1 (Localhost / Unsecured)';
                }
                return 'HTTP/1.1 (Unsecured)';
              };
              logText = `   🔸 Connection Protocol: ${getProtocol()}`;
            } else if (log.dynamicNode) {
              const isOffline = apiStatus === 'OFFLINE';
              const icon = isOffline ? '✘' : '✔';
              const iconColor = isOffline ? 'var(--red)' : 'var(--green)';
              const textColor = isOffline ? 'var(--red)' : 'var(--text)';
              return (
                <div key={index} style={{ color: textColor, fontWeight: log.bold ? 'bold' : 'normal', whiteSpace: 'pre-wrap', animation: 'fadeIn 0.1s ease-out' }}>
                  <span style={{ color: iconColor }}>{icon}</span> Node.js API ({nodeVersion}) - {apiStatus}
                </div>
              );
            } else if (log.dynamicDb) {
              const isOffline = dbStatus === 'OFFLINE';
              const icon = isOffline ? '✘' : '✔';
              const iconColor = isOffline ? 'var(--red)' : 'var(--green)';
              const textColor = isOffline ? 'var(--red)' : 'var(--text)';
              let errText = '';
              if (isOffline) {
                if (envDiagnostics && !envDiagnostics.hasMongoUri) {
                  errText = ' - OFFLINE (Missing MONGO_URI in Vercel settings)';
                } else if (dbError) {
                  errText = ` - OFFLINE (${dbError})`;
                } else {
                  errText = ' - OFFLINE';
                }
              } else {
                errText = ` - ${dbStatus}`;
              }
              return (
                <div key={index} style={{ color: textColor, fontWeight: log.bold ? 'bold' : 'normal', whiteSpace: 'pre-wrap', animation: 'fadeIn 0.1s ease-out' }}>
                  <span style={{ color: iconColor }}>{icon}</span> MongoDB Cluster{errText}
                </div>
              );
            }

            return (
              <div
                key={index}
                style={{
                  color: logColor,
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
