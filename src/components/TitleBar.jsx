import React, { useRef, useEffect } from 'react';
import { THEMES } from '../constants';

// Theme color swatches for visual preview
const THEME_SWATCHES = {
  'default':     { bg: '#1e1e1e', accent: '#007acc' },
  'rose-pine':   { bg: '#191724', accent: '#eb6f92' },
  'tokyo-night': { bg: '#1a1b26', accent: '#7aa2f7' },
  'catppuccin':  { bg: '#1e1e2e', accent: '#cba6f7' },
  'nord':        { bg: '#2e3440', accent: '#5e81ac' },
  'gruvbox':     { bg: '#282828', accent: '#fabd2f' },
};

const TitleBar = ({ theme, setTheme, openPalette, openSettings }) => {
  const [showThemes, setShowThemes] = React.useState(false);
  const dropRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showThemes) return;
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setShowThemes(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showThemes]);

  return (
    <div className="title-bar">
      {/* Left: traffic lights */}
      <div className="title-bar__left">
        <div className="title-bar__dots">
          <div className="title-bar__dot title-bar__dot--red" title="Close" />
          <div className="title-bar__dot title-bar__dot--yellow" title="Minimize" />
          <div className="title-bar__dot title-bar__dot--green" title="Fullscreen" />
        </div>
      </div>

      {/* Center: clickable search / command palette trigger */}
      <div
        className="title-bar__center"
        onClick={() => openPalette?.()}
        style={{
          cursor: 'pointer',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '5px',
          padding: '2px 12px 2px 8px',
          gap: '8px',
          minWidth: '220px',
          maxWidth: '340px',
          justifyContent: 'space-between',
        }}
        title="Command Palette (Ctrl+P)"
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontFamily: 'system-ui, sans-serif' }}>Ashik-Siddike : portfolio</span>
        </span>
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
          <kbd style={{
            fontSize: '9px', color: 'rgba(255,255,255,0.4)',
            background: 'rgba(255,255,255,0.06)', padding: '1px 5px',
            borderRadius: '3px', border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'system-ui, sans-serif'
          }}>Ctrl</kbd>
          <kbd style={{
            fontSize: '9px', color: 'rgba(255,255,255,0.4)',
            background: 'rgba(255,255,255,0.06)', padding: '1px 5px',
            borderRadius: '3px', border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'system-ui, sans-serif'
          }}>P</kbd>
        </div>
      </div>

      {/* Right: GitHub link + theme picker */}
      <div className="title-bar__right">
        {/* GitHub */}
        <a
          href="https://github.com/Ashik-Siddike"
          target="_blank"
          rel="noreferrer"
          className="title-bar__btn"
          title="GitHub Profile"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>

        {/* Theme picker button */}
        <div ref={dropRef} style={{ position: 'relative' }}>
          <div
            className="title-bar__btn"
            onClick={() => setShowThemes(v => !v)}
            title="Change color theme (all 6 themes)"
            style={{ gap: '5px' }}
          >
            {/* Color swatch preview */}
            <span style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: THEME_SWATCHES[theme]?.accent || '#007acc',
              display: 'inline-block', flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.2)',
            }} />
            <span style={{ fontSize: '10px' }}>
              {THEMES[theme] || 'Default Dark+'}
            </span>
            <svg
              width="8" height="8" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              style={{ transition: 'transform 0.2s', transform: showThemes ? 'rotate(180deg)' : 'none', opacity: 0.6 }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>

          {/* Dropdown */}
          {showThemes && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 4px)', right: 0,
              background: 'var(--bg3)', border: '1px solid var(--border)',
              borderRadius: '6px', zIndex: 9999, minWidth: '200px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
              animation: 'fadeIn 0.12s ease',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '6px 12px 4px',
                fontSize: '10px', color: 'var(--dim)',
                textTransform: 'uppercase', letterSpacing: '0.12em',
                borderBottom: '1px solid var(--border)',
              }}>
                Color Theme
              </div>
              {Object.entries(THEMES).map(([key, label]) => {
                const swatch = THEME_SWATCHES[key];
                const active = key === theme;
                return (
                  <div
                    key={key}
                    onClick={() => { setTheme(key); setShowThemes(false); }}
                    style={{
                      padding: '7px 12px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: active ? 'var(--bright)' : 'var(--text)',
                      background: active ? 'rgba(255,255,255,0.07)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                  >
                    {/* Swatch */}
                    <span style={{
                      width: '28px', height: '18px', borderRadius: '3px',
                      background: swatch.bg, border: '1px solid rgba(255,255,255,0.1)',
                      display: 'inline-block', flexShrink: 0, position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <span style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        height: '5px', background: swatch.accent, opacity: 0.9,
                      }} />
                    </span>
                    <span style={{ flex: 1 }}>{label}</span>
                    {active && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
