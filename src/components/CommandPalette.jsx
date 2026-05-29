import React, { useState, useEffect, useRef } from 'react';
import { PAGES } from '../constants';

const FILE_COLORS = {
  jsx:  '#4fc1ff', html: '#f44747', js: '#dcdcaa',
  json: '#ce9178', ts:  '#4fc1ff', css: '#4fc1ff', md: '#cccccc',
};
const FILE_BG = {
  jsx: '#007acc22', html: '#f4474722', js:   '#dcdcaa22',
  json:'#ce917822', ts:  '#007acc22', css:   '#4fc1ff22', md: '#cccccc22',
};

const COMMANDS = [
  { id: 'palette-home',   label: 'Go to Home',        shortcut: 'Ctrl+1', action: 'nav:home' },
  { id: 'palette-about',  label: 'Go to About',        shortcut: 'Ctrl+2', action: 'nav:about' },
  { id: 'palette-projects', label: 'Go to Projects',  shortcut: 'Ctrl+3', action: 'nav:projects' },
  { id: 'palette-exp',    label: 'Go to Experience',   shortcut: 'Ctrl+4', action: 'nav:experience' },
  { id: 'palette-contact', label: 'Go to Contact',     shortcut: 'Ctrl+5', action: 'nav:contact' },
  { id: 'palette-github', label: 'Open GitHub Profile', shortcut: '',      action: 'url:https://github.com/Ashik-Siddike' },
  { id: 'palette-theme',  label: 'Open Settings',      shortcut: 'Ctrl+,', action: 'settings' },
];

const CommandPalette = ({ onClose, navigate, openSettings }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const ext = (label) => label.split('.').pop();

  const filteredFiles = query
    ? PAGES.filter(p => p.label.toLowerCase().includes(query.toLowerCase()))
    : PAGES;

  const filteredCmds = query
    ? COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : COMMANDS;

  const allItems = [
    ...filteredCmds.map(c => ({ type: 'cmd', ...c })),
    ...filteredFiles.map(p => ({ type: 'file', ...p })),
  ];

  const runItem = (item) => {
    if (item.type === 'file') { navigate(item.id); onClose(); return; }
    if (item.action?.startsWith('nav:')) { navigate(item.action.slice(4)); onClose(); return; }
    if (item.action?.startsWith('url:')) { window.open(item.action.slice(4), '_blank'); onClose(); return; }
    if (item.action === 'settings') { openSettings(); onClose(); return; }
  };

  const handleKey = (e) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { setSelected(s => Math.min(s + 1, allItems.length - 1)); e.preventDefault(); return; }
    if (e.key === 'ArrowUp') { setSelected(s => Math.max(s - 1, 0)); e.preventDefault(); return; }
    if (e.key === 'Enter' && allItems[selected]) { runItem(allItems[selected]); return; }
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '15vh',
        backdropFilter: 'blur(2px)',
        animation: 'fadeIn 0.12s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '560px', maxWidth: '92vw',
          background: '#2d2d2d',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '8px',
          boxShadow: '0 24px 70px rgba(0,0,0,0.7)',
          overflow: 'hidden',
          animation: 'fadeUp 0.15s ease',
        }}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKey}
      >
        {/* Search input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" style={{ flexShrink: 0 }}>
            <path d="M15 15l6 6"/><circle cx="11" cy="11" r="8"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0); }}
            placeholder="Go to file or run command..."
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              color: '#e0e0e0', fontSize: '13px', fontFamily: 'JetBrains Mono, monospace',
            }}
          />
          <kbd style={{
            fontSize: '10px', color: '#666', background: 'rgba(255,255,255,0.06)',
            padding: '1px 6px', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.1)',
          }}>Esc</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
          {/* Commands */}
          {filteredCmds.length > 0 && (
            <>
              <div style={{ padding: '6px 14px 2px', fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Commands
              </div>
              {filteredCmds.map((cmd, i) => {
                const idx = i;
                const isSelected = idx === selected;
                return (
                  <div
                    key={cmd.id}
                    onMouseEnter={() => setSelected(idx)}
                    onClick={() => runItem({ type: 'cmd', ...cmd })}
                    style={{
                      padding: '7px 14px',
                      display: 'flex', alignItems: 'center', gap: '10px',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(255,255,255,0.07)' : 'transparent',
                      borderLeft: isSelected ? '2px solid #007acc' : '2px solid transparent',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c586c0" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    <span style={{ flex: 1, fontSize: '12px', color: '#ccc' }}>{cmd.label}</span>
                    {cmd.shortcut && (
                      <kbd style={{ fontSize: '10px', color: '#888', background: 'rgba(255,255,255,0.05)', padding: '1px 6px', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {cmd.shortcut}
                      </kbd>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* Files */}
          {filteredFiles.length > 0 && (
            <>
              <div style={{ padding: '8px 14px 2px', fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Files
              </div>
              {filteredFiles.map((page, i) => {
                const idx = filteredCmds.length + i;
                const isSelected = idx === selected;
                const ex = ext(page.label);
                return (
                  <div
                    key={page.id}
                    onMouseEnter={() => setSelected(idx)}
                    onClick={() => runItem({ type: 'file', ...page })}
                    style={{
                      padding: '7px 14px',
                      display: 'flex', alignItems: 'center', gap: '10px',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(255,255,255,0.07)' : 'transparent',
                      borderLeft: isSelected ? '2px solid #007acc' : '2px solid transparent',
                    }}
                  >
                    {/* File icon badge */}
                    <span style={{
                      width: '22px', height: '22px', borderRadius: '4px',
                      background: FILE_BG[ex] || '#ffffff11',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, fontSize: '9px', fontWeight: 700,
                      color: FILE_COLORS[ex] || '#ccc',
                      border: `1px solid ${FILE_COLORS[ex] || '#ccc'}33`,
                    }}>
                      {ex.toUpperCase().slice(0, 3)}
                    </span>
                    <span style={{ flex: 1, fontSize: '12px', color: '#ccc' }}>{page.label}</span>
                    <span style={{ fontSize: '10px', color: '#666' }}>src/</span>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer hints */}
        <div style={{
          display: 'flex', gap: '16px', padding: '6px 14px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: '10px', color: '#555',
        }}>
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>Esc close</span>
          <span style={{ marginLeft: 'auto' }}>Tip: type "settings" for theme options</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
