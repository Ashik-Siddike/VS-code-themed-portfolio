import React from 'react';
import { PAGES } from '../constants';

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const GitBranchIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ opacity: 0.85 }}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="12" r="3" />
    <path d="M6 9v6M9 12h6" />
  </svg>
);

const Sidebar = ({ activePage, setActivePage, openTabs = [], sidebarOpen = true, openCopilotChat, activityActive = 'explorer' }) => {
  const [open, setOpen] = React.useState({ PORTFOLIO: true, 'OPEN EDITORS': false, OUTLINE: false });

  const openFiles = PAGES.filter(p => openTabs.includes(p.id) && !p.download);

  const toggle = (label) => setOpen(o => ({ ...o, [label]: !o[label] }));

  return (
    <div className="sidebar" style={{ display: sidebarOpen ? 'flex' : 'none' }}>
      
      {/* EXPLORER PANEL */}
      {activityActive === 'explorer' && (
        <>
          <div className="sidebar__header">Explorer</div>

          {/* Top File Explorer Section */}
          <div className="sidebar__section" style={{ flex: 1, overflowY: 'auto' }}>
            <div className="sidebar__section-title" onClick={() => toggle('PORTFOLIO')}>
              <span style={{ transform: open['PORTFOLIO'] ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.15s', display: 'inline-flex' }}>
                <ChevronDown />
              </span>
              PORTFOLIO
            </div>

            {open['PORTFOLIO'] && PAGES.filter(p => !p.hidden).map((page) => {
              const isActive = activePage === page.id && !page.download;
              const isDownload = !!page.download;
              return (
                <div
                  key={page.id}
                  className={`sidebar__file${isActive ? ' active' : ''}${isDownload ? ' download-file' : ''}`}
                  onClick={() => {
                    if (isDownload) {
                      const link = document.createElement("a");
                      link.href = "/Ashik_Siddike_Resume.pdf";
                      link.download = "Ashik_Siddike_Resume.pdf";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      return;
                    }
                    setActivePage(page.id);
                  }}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span className="sidebar__file-icon" style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                    {page.icon}
                  </span>
                  <span className="truncate" style={{ flex: 1 }}>{page.label}</span>
                  {isDownload && (
                    <span className="download-arrow-indicator" style={{ fontSize: '11px', transition: 'opacity 0.15s' }}>↓</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Dropdowns and Copilot Panel */}
          <div className="sidebar__bottom-container" style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
            
            {/* OPEN EDITORS Dropdown removed as requested */}
            <div className="sidebar__section" style={{ borderBottom: '1px solid var(--border)', padding: '2px 0' }}>
              <div className="sidebar__section-title" onClick={() => toggle('OUTLINE')}>
                <span style={{ transform: open['OUTLINE'] ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.15s', display: 'inline-flex' }}>
                  <ChevronDown />
                </span>
                OUTLINE
              </div>

              {open['OUTLINE'] && [
                { name: 'name', pageId: 'home' },
                { name: 'role', pageId: 'about' },
                { name: 'skills', pageId: 'skills' },
                { name: 'experience', pageId: 'experience' },
                { name: 'contact', pageId: 'contact' }
              ].map((item) => (
                <div
                  key={item.name}
                  className="sidebar__file"
                  style={{ paddingLeft: '28px', fontSize: '11px', cursor: 'pointer' }}
                  onClick={() => setActivePage(item.pageId)}
                >
                  <span style={{ color: 'var(--purple)', marginRight: '6px' }}>◆</span>
                  <span className="truncate">{item.name}</span>
                </div>
              ))}
            </div>

            {/* Copilot Option */}
            <div className="sidebar__copilot-wrapper" style={{ padding: '8px 12px' }}>
              <div
                className="sidebar__copilot-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(197, 134, 192, 0.3)',
                  background: 'rgba(197, 134, 192, 0.06)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: 'var(--text)',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
                onClick={openCopilotChat}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ position: 'relative', display: 'inline-flex' }}>
                    <span className="copilot-sparkle" style={{ color: 'var(--purple)', fontSize: '12px', fontWeight: 'bold' }}>✦</span>
                    <span className="copilot-pulse-dot" style={{
                      position: 'absolute',
                      top: '-1px',
                      right: '-1px',
                      width: '5px',
                      height: '5px',
                      background: '#a953b0',
                      borderRadius: '50%',
                      boxShadow: '0 0 4px #a953b0'
                    }} />
                  </span>
                  <span style={{ fontWeight: 500 }}>Ashik's Copilot</span>
                </div>
                <span style={{ fontSize: '9px', color: 'var(--dim)', opacity: 0.8, fontWeight: 'bold' }}>AI</span>
              </div>
            </div>

          </div>
        </>
      )}

      {/* SOURCE CONTROL PANEL */}
      {activityActive === 'git' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
          <div className="sidebar__header" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Source Control
          </div>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Branch Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--text)', display: 'inline-flex' }}>
                  <GitBranchIcon />
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--bright)', fontFamily: 'JetBrains Mono, monospace' }}>
                  main
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--green)', fontSize: '11px', fontWeight: 500, fontFamily: 'JetBrains Mono, monospace' }}>
                <span style={{ fontSize: '12px' }}>↑</span>
                <span>1 commit ahead</span>
              </div>
            </div>

            {/* Changes Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              padding: '16px 0',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--orange)', marginBottom: '4px' }}>3</div>
                <div style={{ fontSize: '10px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Modified</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--green)', marginBottom: '4px' }}>1</div>
                <div style={{ fontSize: '10px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Added</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--red)', marginBottom: '4px' }}>0</div>
                <div style={{ fontSize: '10px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deleted</div>
              </div>
            </div>

            {/* View on GitHub Link */}
            <a
              href="https://github.com/Ashik-Siddike/VS-code-themed-portfolio"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--blue)',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--blue2)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--blue)'}
            >
              View on GitHub <span>↗</span>
            </a>

          </div>
        </div>
      )}

    </div>
  );
};

export default Sidebar;
