import React, { useState, useEffect, useRef } from 'react';
import { PAGES } from '../constants';

const Terminal = ({ activePage, setActivePage, onClose, showToast, activeTab, setActiveTab }) => {
  const [history, setHistory] = useState([
    { type: 'info', text: 'Welcome to Ashik\'s Interactive Shell! Try running some commands.' },
    { type: 'info', text: 'Commands: cat <file>, open <file>, whoami, echo <text>, date, git log, python --version, clear' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Copilot Chat States
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: "Hi! I am Ashik's AI Copilot. Ask me anything about Ashik's skills, projects, work experience, or contact details! Try typing 'tell me about his skills' or 'what projects did he build?'"
    }
  ]);
  const [chatInputVal, setChatInputVal] = useState('');
  const chatEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Auto-scroll to bottom of logs on updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Auto-focus input on mount or tab switch
  useEffect(() => {
    if (activeTab === 'terminal') {
      inputRef.current?.focus();
    } else if (activeTab === 'copilot') {
      chatInputRef.current?.focus();
    }
  }, [activeTab]);

  const getFallbackChatMessage = (trimmed) => {
    const q = trimmed.toLowerCase();
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('languages') || q.includes('learn')) {
      return "Ashik is highly skilled in: Python (FastAPI, web scraping), TypeScript, JavaScript, Next.js, React, n8n, Make.com, PostgreSQL, MongoDB, and Gemini/OpenAI API integrations. He loves building intelligent automation pipelines and scalable SaaS solutions!";
    } else if (q.includes('project') || q.includes('build') || q.includes('repo') || q.includes('work')) {
      return "Ashik has built several noteworthy projects:\n\n✦ **Affiliate Automation System** (Python, Gemini AI, n8n)\n✦ **Affiliate Automation Next.js Site** (TypeScript, Next.js, Vercel)\n✦ **SaaS Dashboard** (Next.js, TypeScript)\n✦ **Aronnyo — Kids Learning Platform** (TypeScript, Next.js)\n✦ **Play Learn Grow Kids (247School)** (React, Next.js)\n✦ **Social Media Growing Agent** (Python, n8n)\n\nYou can click on these files in the file explorer to view details!";
    } else if (q.includes('experience') || q.includes('job') || q.includes('career') || q.includes('history')) {
      return "Ashik's professional journey:\n\n🟢 **Full-Stack Developer** @ Nexinity Web Solution (2025 – Present)\n🔵 **Support Engineer** @ Dr. Sujit Biswas's Team, City, University of London (May 2025 – Present · Remote)\n🟣 **Lead AI Automation Developer** (2025 – Present)\n🟠 **Freelance Graphic Designer** (2022 – Present · 3+ Years)";
    } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('facebook') || q.includes('linkedin')) {
      return "You can contact Ashik via:\n\n✉️ Email: ashiksiddike@gmail.com\n🔗 GitHub: github.com/Ashik-Siddike\n🔗 LinkedIn: linkedin.com/in/ashik-siddike\n\nHe is currently open to new work and freelance collaborations!";
    }
    return "Interesting question! Ashik is a passionate full-stack developer who loves combining AI APIs and modern web frameworks to create automation systems. You can check his homepage (home.tsx) or read his README.md for more info!";
  };

  const handleSendChatMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // 1. Add user message
    const updatedMessages = [...chatMessages, { sender: 'user', text: trimmed }];
    setChatMessages(updatedMessages);

    // Format chat messages into Gemini API input structure
    const apiMessages = updatedMessages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      text: m.text
    }));

    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setChatMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setChatMessages(prev => [...prev, { sender: 'ai', text: getFallbackChatMessage(trimmed) }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: 'ai', text: getFallbackChatMessage(trimmed) }]);
    }
  };

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Save to history list
    const newCmdHistory = [trimmed, ...commandHistory.filter(c => c !== trimmed)];
    setCommandHistory(newCmdHistory);
    setHistoryIndex(-1);

    // Print command line
    setHistory(prev => [...prev, { type: 'prompt', text: `ashik @portfolio : ~ $ ${trimmed}` }]);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    let output = '';
    let outType = 'output';

    switch (mainCmd) {
      case 'clear':
        setHistory([]);
        return;
      case 'help':
        output = 'Available commands: ls, cat <file>, open <file>, whoami, echo <text>, date, git log, python --version, clear';
        break;
      case 'ls':
      case 'dir':
        output = PAGES.map(p => p.label).join('    ');
        break;
      case 'whoami':
        output = 'ashik-siddike · Full-Stack Developer & AI Automation Developer';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'python':
        if (arg === '--version' || arg === '-V') {
          output = 'Python 3.12.3';
        } else {
          output = "Use 'python --version' to check version.";
        }
        break;
      case 'echo':
        output = arg || '';
        break;
      case 'git':
        if (arg === 'log') {
          output = `commit b8c86be2e4dfa6a
Author: Ashik Siddike <ashiksiddike@gmail.com>
Date:   ${new Date().toDateString()}

    feat: integrate CV data, add side-by-side VS Code Copilot panel, interactive menus, perfect JSON icon alignment, and map portfolio links to ashiksiddike.com

commit d3d0b7d0392eb13
Author: Ashik Siddike <ashiksiddike@gmail.com>
Date:   Wed May 27 22:15:33 2026

    style: increase CSS theme variables selector specificity and fix settings panel depth`;
        } else {
          output = "git command not found. Try 'git log'.";
        }
        break;
      case 'cat':
      case 'open':
        if (!arg) {
          output = `Usage: ${mainCmd} <filename> (e.g. cat home.tsx)`;
        } else {
          const match = PAGES.find(p => p.label.toLowerCase() === arg.toLowerCase());
          if (match) {
            if (match.download) {
              const link = document.createElement("a");
              link.href = "/Ashik_Siddike_Resume.pdf";
              link.download = "Ashik_Siddike_Resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              output = `Downloading ${match.label}...`;
            } else {
              setActivePage(match.id);
              output = `Opening ${match.label} in editor...`;
            }
          } else {
            output = `cat: ${arg}: No such file or directory`;
            outType = 'error';
          }
        }
        break;
      default:
        output = `bash: ${mainCmd}: command not found`;
        outType = 'error';
    }

    if (output) {
      setHistory(prev => [...prev, { type: outType, text: output }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = historyIndex - 1;
      setHistoryIndex(nextIdx);
      if (nextIdx >= 0) {
        setInputVal(commandHistory[nextIdx]);
      } else {
        setInputVal('');
      }
    }
  };

  return (
    <div className="terminal-panel" onClick={() => {
      if (activeTab === 'terminal') inputRef.current?.focus();
      else if (activeTab === 'copilot') chatInputRef.current?.focus();
    }}>
      {/* Terminal tabs */}
      <div className="terminal-panel__header" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-panel__tabs">
          {[
            { id: 'terminal', label: 'TERMINAL' },
            { id: 'copilot', label: '✦ COPILOT CHAT' },
            { id: 'problems', label: 'PROBLEMS' },
            { id: 'output', label: 'OUTPUT' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`terminal-panel__tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button className="terminal-panel__close" title="Close Panel" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Terminal Content area */}
      <div className="terminal-panel__body">
        {activeTab === 'terminal' && (
          <div className="terminal-shell">
            {history.map((log, index) => (
              <div key={index} className={`terminal-line terminal-line--${log.type}`}>
                {log.type === 'error' ? (
                  <span style={{ color: 'var(--red)' }}>{log.text}</span>
                ) : log.type === 'info' ? (
                  <span style={{ color: 'var(--gcm)', fontStyle: 'italic' }}>{log.text}</span>
                ) : (
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{log.text}</pre>
                )}
              </div>
            ))}
            <div className="terminal-input-line">
              <span className="terminal-prompt">ashik @portfolio : ~ $</span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
            <div ref={terminalEndRef} />
          </div>
        )}

        {activeTab === 'copilot' && (
          <div className="terminal-copilot-chat" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '10px' }} onClick={(e) => e.stopPropagation()}>
            <div className="copilot-messages thin-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '10px', paddingRight: '4px' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? 'rgba(0, 122, 204, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: msg.sender === 'user' ? '1px solid rgba(0, 122, 204, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  maxWidth: '85%',
                  fontSize: '12px',
                  lineHeight: 1.55,
                  color: 'var(--text)'
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '9px', color: msg.sender === 'user' ? 'var(--blue)' : 'var(--purple)', marginBottom: '3px', letterSpacing: '0.05em' }}>
                    {msg.sender === 'user' ? 'YOU' : '✦ COPILOT AI'}
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="copilot-input-line" style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '4px' }}>
              <input
                ref={chatInputRef}
                type="text"
                className="terminal-input"
                placeholder="Ask Copilot about Ashik's skills, experience, projects..."
                value={chatInputVal}
                onChange={(e) => setChatInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendChatMessage(chatInputVal);
                    setChatInputVal('');
                  }
                }}
                style={{ flex: 1, padding: '5px 10px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', outline: 'none' }}
              />
              <button
                onClick={() => {
                  handleSendChatMessage(chatInputVal);
                  setChatInputVal('');
                }}
                style={{ padding: '5px 14px', borderRadius: '4px', background: 'var(--blue2)', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px', transition: 'filter 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.15)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'none'}
              >
                Send
              </button>
            </div>
          </div>
        )}

        {activeTab === 'problems' && (
          <div className="terminal-pane-text" style={{ color: 'var(--dim)', padding: '12px' }}>
            No problems have been detected in the workspace.
          </div>
        )}

        {activeTab === 'output' && (
          <div className="terminal-pane-text" style={{ color: 'var(--text)', padding: '12px', fontFamily: 'JetBrains Mono, monospace' }}>
            [info] Vite v8.0.14 HMR ready.
            <br />
            [info] Client environment successfully loaded with custom themes.
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
