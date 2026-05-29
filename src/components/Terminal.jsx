import React, { useState, useEffect, useRef } from 'react';
import { PAGES } from '../constants';

const Terminal = ({ activePage, setActivePage, onClose, showToast }) => {
  const [activeTab, setActiveTab] = useState('terminal');
  const [history, setHistory] = useState([
    { type: 'info', text: 'Welcome to Ashik\'s Interactive Shell! Try running some commands.' },
    { type: 'info', text: 'Commands: cat <file>, open <file>, whoami, echo <text>, date, git log, python --version, clear' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of logs on updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Auto-focus input on mount or tab switch
  useEffect(() => {
    if (activeTab === 'terminal') {
      inputRef.current?.focus();
    }
  }, [activeTab]);

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
      case 'whoami':
        output = 'ashik-siddike · Full-Stack Developer & AI Automation Builder';
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
          output = `commit b4a287dfd12ea39c148
Author: Ashik Siddike <ashiksiddike@gmail.com>
Date:   ${new Date().toDateString()}

    feat: add beautiful custom SVG file icons and interactive terminal shell

commit a827dcbe77b61a38b1f
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
    <div className="terminal-panel" onClick={() => inputRef.current?.focus()}>
      {/* Terminal tabs */}
      <div className="terminal-panel__header" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-panel__tabs">
          {['TERMINAL', 'PROBLEMS', 'OUTPUT'].map(tab => (
            <button
              key={tab}
              className={`terminal-panel__tab${activeTab === tab.toLowerCase() ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
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
