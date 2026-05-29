import React, { useState, useEffect, useRef } from 'react';

const MenuBar = ({
  activePage,
  navigate,
  openPalette,
  openSettings,
  showCopilot,
  setShowCopilot,
  showTerminal,
  setShowTerminal,
  sidebarOpen,
  setSidebarOpen,
  openTabs,
  setOpenTabs,
  closeTab,
  showToast,
  zoom,
  setZoom,
}) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const containerRef = useRef(null);

  // Close menus on clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMenu = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuName);
    }
  };

  const handleMouseEnter = (menuName) => {
    if (activeMenu !== null) {
      setActiveMenu(menuName);
    }
  };

  const handleAction = (action) => {
    setActiveMenu(null); // close menu
    if (typeof action === 'function') {
      action();
    }
  };

  // Actions Mapping
  const handleNewTab = () => {
    navigate('home');
    showToast?.('Opened home tab! (Ctrl+T)', '📄');
  };

  const handleCloseActiveTab = () => {
    if (activePage) {
      const remaining = openTabs.filter(t => t !== activePage);
      setOpenTabs(remaining.length ? remaining : ['home']);
      const nextActive = remaining[Math.max(0, remaining.length - 1)] || 'home';
      navigate(nextActive);
      showToast?.('Closed active tab! (Ctrl+W)', '🗑️');
    }
  };

  const handleCloseAllTabs = () => {
    setOpenTabs(['home']);
    navigate('home');
    showToast?.('Closed all tabs!', '🗑️');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("Md. Ashik Siddike — Full-Stack Web Developer & Graphic Designer · ashiksiddike.com");
    showToast?.("Copied credentials to clipboard!", "📋");
  };

  const handleSelectAll = () => {
    showToast?.("Select All triggered (Ctrl+A)", "💡");
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      showToast?.("Entered Fullscreen", "🖥️");
    } else {
      document.exitFullscreen().catch(() => {});
      showToast?.("Exited Fullscreen", "🖥️");
    }
  };

  const handleZoomIn = () => {
    setZoom(z => {
      const next = Math.min(1.5, z + 0.1);
      showToast?.(`Zoom: ${Math.round(next * 100)}%`, '🔍');
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoom(z => {
      const next = Math.max(0.7, z - 0.1);
      showToast?.(`Zoom: ${Math.round(next * 100)}%`, '🔍');
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    showToast?.('Zoom reset to 100%', '🔍');
  };

  const handleRunFile = () => {
    showToast?.(`Running ${activePage}...`, '⚡');
    setShowTerminal(true);
  };

  const handleDebugFile = () => {
    showToast?.(`Debugging ${activePage}...`, '🪲');
    setShowTerminal(true);
  };

  const handleHelpDoc = () => {
    showToast?.('Documentation coming soon!', '📘');
  };

  const handleClearCopilot = () => {
    showToast?.('Chat history cleared!', '🧹');
  };

  // Dropdown Configurations
  const MENUS = {
    File: [
      { label: 'New Tab', shortcut: 'Ctrl+T', action: handleNewTab },
      { label: 'Open File...', shortcut: 'Ctrl+P', action: openPalette },
      { label: 'Close Tab', shortcut: 'Ctrl+W', action: handleCloseActiveTab },
      { label: 'Close All Tabs', action: handleCloseAllTabs },
      { type: 'separator' },
      { label: 'OPEN RECENT', type: 'header' },
      { label: 'home.tsx', action: () => navigate('home') },
      { label: 'about.html', action: () => navigate('about') },
      { label: 'projects.js', action: () => navigate('projects') },
      { label: 'skills.json', action: () => navigate('skills') },
      { type: 'separator' },
      { label: 'Download Resume', action: () => navigate('resume') },
    ],
    Edit: [
      { label: 'Find...', shortcut: 'Ctrl+P', action: openPalette },
      { type: 'separator' },
      { label: 'Select All', shortcut: 'Ctrl+A', action: handleSelectAll },
      { label: 'Copy', shortcut: 'Ctrl+C', action: handleCopy },
    ],
    View: [
      { label: 'Command Palette', shortcut: 'Ctrl+P', action: openPalette },
      { type: 'separator' },
      { label: 'Toggle Sidebar', shortcut: 'Ctrl+B', action: () => setSidebarOpen(s => !s) },
      { label: 'Toggle Terminal', shortcut: 'Ctrl+`', action: () => setShowTerminal(t => !t) },
      { label: '✦ Ashik\'s Copilot', shortcut: 'Ctrl+Shift+C', action: () => setShowCopilot(c => !c), highlight: true },
      { type: 'separator' },
      { label: 'Enter Full Screen', shortcut: 'F11', action: toggleFullScreen },
      { label: 'Zoom In', shortcut: 'Ctrl++', action: handleZoomIn },
      { label: 'Zoom Out', shortcut: 'Ctrl+-', action: handleZoomOut },
      { label: 'Reset Zoom', action: handleResetZoom },
    ],
    Go: [
      { label: 'Go to File...', shortcut: 'Ctrl+P', action: openPalette },
      { type: 'separator' },
      { label: 'FILES', type: 'header' },
      { label: 'home.tsx', action: () => navigate('home') },
      { label: 'about.html', action: () => navigate('about') },
      { label: 'projects.js', action: () => navigate('projects') },
      { label: 'skills.json', action: () => navigate('skills') },
      { label: 'experience.ts', action: () => navigate('skills') }, // mapped to Skills group page
      { label: 'contact.css', action: () => navigate('contact') },
      { label: 'README.md', action: () => navigate('readme') },
      { label: 'Ashik_Siddike_Resume.pdf', action: () => navigate('resume') },
    ],
    Run: [
      { label: 'Run Active File', shortcut: 'Ctrl+F5', action: handleRunFile },
      { label: 'Debug Active File', shortcut: 'F5', action: handleDebugFile },
    ],
    Terminal: [
      { label: 'Start Terminal', shortcut: 'Ctrl+`', action: () => setShowTerminal(true) },
      { label: 'Run Last Command', action: () => showToast?.('Running: npm run dev', '⚙️') },
    ],
    Help: [
      { label: 'Documentation', action: handleHelpDoc },
      { label: 'Interactive Tutorial', action: openPalette },
      { type: 'separator' },
      { label: 'About VS Code Clone', action: () => showToast?.('VS Code Portfolio Clone v2.1.0', '⚛️') },
    ],
    Copilot: [
      { label: 'Toggle Chat', shortcut: 'Ctrl+Shift+C', action: () => setShowCopilot(c => !c) },
      { label: 'Clear Chat History', action: handleClearCopilot },
    ]
  };

  return (
    <div className="menu-bar" ref={containerRef} style={{ position: 'relative', zIndex: 999 }}>
      {Object.keys(MENUS).map((menuName) => {
        const isOpen = activeMenu === menuName;
        return (
          <div
            key={menuName}
            style={{ position: 'relative' }}
          >
            <div
              className={`menu-bar__item${isOpen ? ' active' : ''}`}
              onClick={() => toggleMenu(menuName)}
              onMouseEnter={() => handleMouseEnter(menuName)}
              style={{
                background: isOpen ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: '#ffffff',
              }}
            >
              {menuName}
            </div>

            {/* Dropdown Container */}
            {isOpen && (
              <div className="menu-dropdown">
                {MENUS[menuName].map((item, idx) => {
                  if (item.type === 'separator') {
                    return (
                      <div
                        key={idx}
                        className="menu-dropdown__separator"
                      />
                    );
                  }
                  if (item.type === 'header') {
                    return (
                      <div
                        key={idx}
                        className="menu-dropdown__header"
                      >
                        {item.label}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={idx}
                      className={`menu-dropdown__item${item.highlight ? ' highlight' : ''}`}
                      onClick={() => handleAction(item.action)}
                    >
                      <span className="menu-dropdown__label">
                        {item.highlight && <span style={{ color: 'var(--purple)', marginRight: '4px' }}>✦</span>}
                        {item.label}
                      </span>
                      {item.shortcut && (
                        <span className="menu-dropdown__shortcut">
                          {item.shortcut}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MenuBar;
