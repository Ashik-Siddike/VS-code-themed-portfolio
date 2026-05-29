import React from 'react';
import { THEMES } from '../constants';

const THEME_INFO = {
  'default':     { emoji: '💜', label: 'Ashik Dark', color: '#007acc' },
  'rose-pine':   { emoji: '🌸', label: 'Rosé Pine', color: '#eb6f92' },
  'tokyo-night': { emoji: '🌌', label: 'Tokyo Night', color: '#7aa2f7' },
  'catppuccin':  { emoji: '🐱', label: 'Catppuccin', color: '#cba6f7' },
  'nord':        { emoji: '🧊', label: 'Nord', color: '#88c0d0' },
  'gruvbox':     { emoji: '🔥', label: 'Gruvbox', color: '#fabd2f' },
};

const SettingsPanel = ({
  theme,
  setTheme,
  onClose,
  openPalette,
  onToggleTerminal,
  onToggleSidebar
}) => {

  const handleQuickAction = (action) => {
    if (action === 'palette') {
      openPalette?.();
      onClose();
    } else if (action === 'terminal') {
      onToggleTerminal?.();
      onClose();
    } else if (action === 'sidebar') {
      onToggleSidebar?.();
      onClose();
    } else if (action === 'resume') {
      const link = document.createElement("a");
      link.href = "/Ashik_Siddike_Resume.pdf";
      link.download = "Ashik_Siddike_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onClose();
    } else if (action === 'fullscreen') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div className="backdrop-overlay animate-fade-in" onClick={onClose} />

      {/* Settings Panel Drawer */}
      <div className="settings-panel animate-slide-in-right">
        {/* Header */}
        <div className="settings-panel__header">
          <span>SETTINGS</span>
          <button className="settings-panel__close-btn" onClick={onClose} title="Close Settings">
            ✕
          </button>
        </div>

        {/* Color Theme Selector */}
        <div className="settings-section">
          <div className="settings-section__title">
            <span style={{ fontSize: '13px' }}>🎨</span> COLOR THEME
          </div>
          <div className="settings-themes-list">
            {Object.entries(THEMES).map(([key, label]) => {
              const active = key === theme;
              const info = THEME_INFO[key] || { emoji: '🎨', label: label, color: '#007acc' };
              return (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`settings-theme-btn${active ? ' active' : ''}`}
                  style={{
                    borderLeft: active ? `3px solid ${info.color}` : '3px solid transparent'
                  }}
                >
                  <span
                    className="settings-theme-swatch"
                    style={{ background: active ? info.color : 'rgba(255,255,255,0.06)' }}
                  />
                  <span className="settings-theme-emoji">{info.emoji}</span>
                  <span className="settings-theme-label">{info.label}</span>
                  {active && (
                    <span className="settings-theme-check" style={{ color: info.color }}>✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="settings-divider" />

        {/* Quick Actions */}
        <div className="settings-section">
          <div className="settings-section__title">
            <span style={{ fontSize: '13px' }}>⚡</span> QUICK ACTIONS
          </div>
          <div className="settings-actions-list">
            {[
              { label: 'Command Palette', shortcut: 'Ctrl+P', action: 'palette', icon: '🔍' },
              { label: 'Toggle Terminal', shortcut: 'Ctrl+`', action: 'terminal', icon: '📟' },
              { label: 'Toggle Sidebar', shortcut: 'Ctrl+B', action: 'sidebar', icon: '📁' },
              { label: 'Download Resume', shortcut: '', action: 'resume', icon: '📄' },
              { label: 'Toggle Fullscreen', shortcut: 'F11', action: 'fullscreen', icon: '🖥️' }
            ].map(item => (
              <button
                key={item.action}
                onClick={() => handleQuickAction(item.action)}
                className="settings-action-btn"
              >
                <span className="settings-action-icon">{item.icon}</span>
                <span className="settings-action-label">{item.label}</span>
                {item.shortcut && (
                  <kbd className="settings-shortcut-badge">{item.shortcut}</kbd>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-divider" />

        {/* Keyboard Shortcuts */}
        <div className="settings-section">
          <div className="settings-section__title">
            <span style={{ fontSize: '13px' }}>⌨</span> KEYBOARD SHORTCUTS
          </div>
          <div className="settings-shortcuts-list">
            {[
              { keys: 'Ctrl P', desc: 'Go to file (command palette)' },
              { keys: 'Ctrl `', desc: 'Toggle terminal' },
              { keys: 'Ctrl B', desc: 'Toggle sidebar' },
              { keys: 'Esc', desc: 'Close overlay' },
              { keys: '↑ / ↓', desc: 'Terminal history' }
            ].map((ks, i) => (
              <div key={i} className="settings-shortcut-row">
                <kbd className="settings-shortcut-key">{ks.keys}</kbd>
                <span className="settings-shortcut-desc">{ks.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="settings-panel__footer">
          Portfolio v3.0 · React + Vite + Vanilla CSS
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;
