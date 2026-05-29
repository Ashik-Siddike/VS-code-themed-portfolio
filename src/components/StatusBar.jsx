import React, { useState, useEffect } from 'react';
import { PAGES, THEMES } from '../constants';

const StatusBar = ({ activePage, theme, cursor, openCopilot }) => {
  const page = PAGES.find(p => p.id === activePage);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  );

  // Live clock — updates every minute
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  const ext = page ? page.label.split('.').pop().toUpperCase() : 'JSX';

  return (
    <div className="status-bar">
      <div className="status-bar__left">
        {/* Copilot button */}
        <div
          className="status-bar__item"
          onClick={openCopilot}
          title="Open Ashik's Copilot"
          style={{ cursor: 'pointer', gap: '5px', color: 'var(--purple)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <span style={{ fontSize: '11px' }}>✦</span>
          <span>Ashik's Copilot</span>
        </div>
        {/* Git branch */}
        <div className="status-bar__item" title="Git branch">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
            <path d="M6 9v6M15.7 5.3l-9.4 13.4"/>
          </svg>
          <span>main</span>
        </div>
        {/* Problems */}
        <div className="status-bar__item" title="No errors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
          <span>0 problems</span>
        </div>
      </div>

      <div className="status-bar__right">
        {/* Current theme */}
        <div className="status-bar__item" title="Active color theme">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
          <span>{THEMES[theme] || 'Default Dark+'}</span>
        </div>
        {/* File type */}
        <div className="status-bar__item" title="Language mode">
          <span>{ext}</span>
        </div>
        {/* Encoding */}
        <div className="status-bar__item" title="File encoding">
          <span>UTF-8</span>
        </div>
        {/* Cursor position */}
        <div className="status-bar__item" title="Cursor position">
          <span>Ln {cursor?.ln ?? 1}, Col {cursor?.col ?? 1}</span>
        </div>
        {/* Clock */}
        <div className="status-bar__item" title="Current time">
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
