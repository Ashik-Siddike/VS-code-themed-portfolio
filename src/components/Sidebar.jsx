import React from 'react';
import { PAGES } from '../constants';

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const Sidebar = ({ activePage, setActivePage, openTabs = [], sidebarOpen = true }) => {
  const [open, setOpen] = React.useState({ PORTFOLIO: true, 'OPEN EDITORS': true });

  const openFiles = PAGES.filter(p => openTabs.includes(p.id) && !p.download);

  const SIDEBAR_SECTIONS = [
    {
      label: 'PORTFOLIO',
      files: PAGES,
    },
    {
      label: 'OPEN EDITORS',
      files: openFiles.length ? openFiles : [PAGES[0]],
    },
  ];

  const toggle = (label) => setOpen(o => ({ ...o, [label]: !o[label] }));

  return (
    <div className="sidebar" style={{ display: sidebarOpen ? 'flex' : 'none' }}>
      <div className="sidebar__header">Explorer</div>
      {SIDEBAR_SECTIONS.map(({ label, files }) => (
        <div key={label} className="sidebar__section">
          <div className="sidebar__section-title" onClick={() => toggle(label)}>
            <span style={{ transform: open[label] ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.15s', display: 'inline-flex' }}>
              <ChevronDown />
            </span>
            {label}
          </div>

          {open[label] && files.map((page) => {
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
      ))}

      {/* Git Section */}
      <div className="sidebar__section" style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
        <div className="sidebar__section-title" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>
          OUTLINE
        </div>
        {['name', 'role', 'skills', 'contact'].map(item => (
          <div key={item} className="sidebar__file" style={{ paddingLeft: '28px', fontSize: '11px' }}>
            <span style={{ color: 'var(--purple)' }}>◆</span>
            <span className="truncate">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
