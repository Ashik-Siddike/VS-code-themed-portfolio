import React, { useState, useEffect, useCallback } from 'react';
import './index.css';

import TitleBar    from './components/TitleBar';
import MenuBar     from './components/MenuBar';
import ActivityBar from './components/ActivityBar';
import Sidebar     from './components/Sidebar';
import TabBar      from './components/TabBar';
import StatusBar   from './components/StatusBar';
import CommandPalette from './components/CommandPalette';
import SettingsPanel  from './components/SettingsPanel';
import Terminal       from './components/Terminal';

import HomePage      from './pages/HomePage';
import AboutPage     from './pages/AboutPage';
import ProjectsPage  from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage   from './pages/ContactPage';
import ReadmePage    from './pages/ReadmePage';
import WorkHistoryPage from './pages/WorkHistoryPage';

import { PAGES } from './constants';

const BREADCRUMBS = {
  home:       ['portfolio', 'src', 'home.tsx'],
  about:      ['portfolio', 'src', 'about.html'],
  projects:   ['portfolio', 'src', 'projects.js'],
  skills:     ['portfolio', 'data', 'skills.json'],
  experience: ['portfolio', 'src', 'experience.ts'],
  contact:    ['portfolio', 'src', 'contact.css'],
  readme:     ['portfolio', 'src', 'README.md'],
};
const PAGE_COMPONENTS = {
  home: HomePage, about: AboutPage, projects: ProjectsPage,
  skills: ExperiencePage, experience: WorkHistoryPage,
  contact: ContactPage, readme: ReadmePage,
};

function App() {
  const [activePage, setActivePage]         = useState('home');
  const [openTabs, setOpenTabs]             = useState(['home']);
  const [showTerminal, setShowTerminal]     = useState(false);
  const [sidebarOpen, setSidebarOpen]       = useState(true);
  const [activityActive, setActivityActive] = useState('explorer');
  const [theme, setTheme]                   = useState(() => localStorage.getItem('aahana-portfolio-theme') || 'default');
  const [pageKey, setPageKey]               = useState(0);
  const [showPalette, setShowPalette]       = useState(false);
  const [showSettings, setShowSettings]     = useState(false);
  const [toast, setToast]                   = useState(null);
  const [cursor, setCursor]                 = useState({ ln: 1, col: 1 });
  const [terminalTab, setTerminalTab]       = useState('terminal');

  /* ── Apply theme ── */
  useEffect(() => {
    const root = document.documentElement;
    root.removeAttribute('data-theme');
    if (theme !== 'default') root.setAttribute('data-theme', theme);
  }, [theme]);

  /* ── Toast ── */
  const showToast = useCallback((msg, icon = '💡') => {
    setToast({ msg, icon });
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, []);

  /* ── Theme change ── */
  const handleThemeChange = useCallback((newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('aahana-portfolio-theme', newTheme);
    const labels = {
      default: 'Default Dark+', 'rose-pine': 'Rosé Pine',
      'tokyo-night': 'Tokyo Night', catppuccin: 'Catppuccin Mocha',
      nord: 'Nord', gruvbox: 'Gruvbox Dark',
    };
    showToast(`Theme: ${labels[newTheme]}`, '🎨');
  }, [showToast]);

  /* ── Navigation ── */
  const navigate = useCallback((pageId) => {
    if (pageId === 'resume') {
      const link = document.createElement("a");
      link.href = "/Ashik_Siddike_Resume.pdf";
      link.download = "Ashik_Siddike_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    setActivePage(pageId);
    setPageKey(k => k + 1);
    setOpenTabs(prev => prev.includes(pageId) ? prev : [...prev, pageId]);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  /* ── Close tab ── */
  const closeTab = useCallback((pageId, e) => {
    e?.stopPropagation();
    const remaining = openTabs.filter(t => t !== pageId);
    setOpenTabs(remaining.length ? remaining : ['home']);
    if (activePage === pageId) {
      const idx = openTabs.indexOf(pageId);
      navigate(remaining[Math.max(0, idx - 1)] || remaining[0] || 'home');
    }
  }, [openTabs, activePage, navigate]);

  /* ── Handle Activity Bar Change ── */
  const handleActivityChange = useCallback((actId) => {
    if (actId === null) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
      setActivityActive(actId);
    }
  }, []);

  /* ── Open Copilot Chat ── */
  const openCopilotChat = useCallback(() => {
    setShowTerminal(true);
    setTerminalTab('copilot');
    showToast("Opening Ashik's Copilot Chat...", "🤖");
  }, [showToast]);

  /* ── Global keyboard shortcuts ── */
  useEffect(() => {
    const handler = (e) => {
      // Ctrl+P → Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault(); setShowPalette(true); return;
      }
      // Ctrl+, → Settings
      if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault(); setShowSettings(true); return;
      }
      // Ctrl+` → Toggle Terminal
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault(); setShowTerminal(prev => !prev); return;
      }
      // Ctrl+B → Toggle Sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarOpen(prev => {
          const next = !prev;
          if (next) {
            setActivityActive(curr => curr || 'explorer');
          }
          return next;
        });
        return;
      }
      // Escape → close overlays
      if (e.key === 'Escape') {
        setShowPalette(false); setShowSettings(false); return;
      }
      // Ctrl+1-5 → navigate pages
      if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const idx = parseInt(e.key) - 1;
        if (PAGES[idx]) navigate(PAGES[idx].id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  /* ── Simulated cursor position on clicks ── */
  useEffect(() => {
    const h = () => setCursor({ ln: Math.floor(Math.random() * 80) + 1, col: Math.floor(Math.random() * 40) + 1 });
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  const ActivePage = PAGE_COMPONENTS[activePage] || HomePage;
  const crumbs = BREADCRUMBS[activePage] || ['portfolio'];

  return (
    <div className="app-grid" style={{ gridTemplateColumns: sidebarOpen ? '48px 220px 1fr' : '48px 0px 1fr' }}>
      {/* Title Bar */}
      <TitleBar
        theme={theme}
        setTheme={handleThemeChange}
        openPalette={() => setShowPalette(true)}
        openSettings={() => setShowSettings(true)}
      />

      {/* Menu Bar */}
      <MenuBar activePage={activePage} navigate={navigate} openPalette={() => setShowPalette(true)} />

      {/* Mobile Top Header (compact-topbar) */}
      <div className="compact-topbar">
        {/* Left Side: Hamburger & Current File Path */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            className="compact-topbar-hamburger"
            title="Toggle Sidebar"
          >
            ☰
          </button>
          <div style={{ fontSize: '13px', color: 'var(--text)', fontFamily: 'JetBrains Mono, monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--dim)' }}>~/</span>
            <span style={{ fontWeight: 500, color: 'var(--bright)' }}>{activePage}</span>
          </div>
        </div>

        {/* Right Side: Copilot Sparkle & Command Palette Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Copilot Sparkle Button */}
          <button
            onClick={openCopilotChat}
            className="compact-topbar-btn"
            title="Open Copilot"
          >
            <span style={{ color: 'var(--purple)', fontSize: '13px', display: 'inline-flex' }}>
              ✦
            </span>
            <span className="copilot-pulse-dot" />
          </button>

          {/* Search/Palette Button */}
          <button
            onClick={() => setShowPalette(true)}
            className="compact-topbar-btn"
            title="Search Files"
          >
            <span style={{ fontSize: '12px' }}>🔍</span>
          </button>
        </div>
      </div>

      {/* Activity Bar */}
      <ActivityBar
        active={sidebarOpen ? activityActive : null}
        setActive={handleActivityChange}
        openSettings={() => setShowSettings(true)}
        openPalette={() => setShowPalette(true)}
        showToast={showToast}
        openCopilotChat={openCopilotChat}
      />

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={navigate}
        openTabs={openTabs}
        sidebarOpen={sidebarOpen}
        openCopilotChat={openCopilotChat}
        activityActive={activityActive}
      />

      {/* Editor Area */}
      <div className="editor-area" onClick={() => {
        if (window.innerWidth < 1024 && sidebarOpen) {
          setSidebarOpen(false);
        }
      }}>
        <TabBar
          activePage={activePage}
          setActivePage={navigate}
          openTabs={openTabs}
          closeTab={closeTab}
        />

        {/* Breadcrumb */}
        <div className="breadcrumb">
          {crumbs.map((crumb, i) => (
            <React.Fragment key={crumb + i}>
              {i > 0 && <span className="breadcrumb__sep">›</span>}
              <span className={`breadcrumb__item${i === crumbs.length - 1 ? ' current' : ''}`}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Page content with pane-enter animation */}
        <div className="editor-content">
          <div key={pageKey} className="pane-enter">
            <ActivePage setActivePage={navigate} />
          </div>
        </div>

        {/* Terminal panel */}
        {showTerminal && (
          <Terminal
            activePage={activePage}
            setActivePage={navigate}
            onClose={() => setShowTerminal(false)}
            showToast={showToast}
            activeTab={terminalTab}
            setActiveTab={setTerminalTab}
          />
        )}
      </div>

      {/* Status Bar */}
      <StatusBar activePage={activePage} theme={theme} cursor={cursor} />

      {/* Overlays */}
      {showPalette && (
        <CommandPalette
          onClose={() => setShowPalette(false)}
          navigate={navigate}
          openSettings={() => { setShowSettings(true); setShowPalette(false); }}
        />
      )}
      {showSettings && (
        <SettingsPanel
          theme={theme}
          setTheme={handleThemeChange}
          onClose={() => setShowSettings(false)}
          openPalette={() => { setShowPalette(true); setShowSettings(false); }}
          navigate={navigate}
          onToggleTerminal={() => setShowTerminal(v => !v)}
          onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="toast animate-toast-in">
          <span>{toast.icon}</span>
          <span>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}

export default App;
