import React from 'react';
import {
  ExplorerIcon,
  SearchIcon,
  SourceControlIcon,
  ResumeIcon,
  CopilotIcon,
  SettingsIcon
} from './Icons';

const ActivityBar = ({ active, setActive, openSettings, openPalette, showToast }) => {
  const icons = [
    {
      id: 'explorer',
      title: 'Explorer',
      svg: <ExplorerIcon />,
      action: 'explorer'
    },
    {
      id: 'search',
      title: 'Search (Ctrl+P)',
      svg: <SearchIcon />,
      action: 'palette'
    },
    {
      id: 'git',
      title: 'Source Control',
      svg: <SourceControlIcon />,
      action: 'git'
    },
    {
      id: 'resume',
      title: 'Download Resume',
      svg: <ResumeIcon />,
      action: 'download'
    },
    {
      id: 'copilot',
      title: "Ashik's Copilot Chat",
      svg: <CopilotIcon />,
      action: 'copilot'
    }
  ];

  const handleAction = (item) => {
    if (item.action === 'palette') {
      openPalette?.();
    } else if (item.action === 'download') {
      const link = document.createElement("a");
      link.href = "/Ashik_Siddike_Resume.pdf";
      link.download = "Ashik_Siddike_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast?.("Downloading Ashik's Resume...", "📄");
    } else if (item.action === 'copilot') {
      showToast?.("Ashik's Copilot is currently offline. Feel free to contact via Email!", "🤖");
    } else {
      setActive(item.id === active ? null : item.id);
    }
  };

  return (
    <div className="activity-bar">
      {icons.map((item) => (
        <div
          key={item.id}
          className={`activity-bar__icon${active === item.id ? ' active' : ''}`}
          title={item.title}
          onClick={() => handleAction(item)}
        >
          {item.svg}
        </div>
      ))}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Settings — opens settings panel */}
      <div
        className="activity-bar__icon"
        title="Settings (Ctrl+,)"
        onClick={() => openSettings?.()}
      >
        <SettingsIcon />
      </div>
    </div>
  );
};

export default ActivityBar;
