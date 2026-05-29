import React, { useState } from 'react';

const GithubActivityPage = ({ theme = 'default' }) => {
  const [previewMode, setPreviewMode] = useState(true);

  // Map portfolio theme to GitHub stats card theme names
  const getGithubTheme = (currentTheme) => {
    switch (currentTheme) {
      case 'rose-pine':
        return 'rose_pine';
      case 'tokyo-night':
        return 'tokyonight';
      case 'catppuccin':
        return 'catppuccin_mocha';
      case 'nord':
        return 'nord';
      case 'gruvbox':
        return 'gruvbox';
      case 'default':
      default:
        return 'dark'; // fallback
    }
  };

  const ghTheme = getGithubTheme(theme);
  const username = 'Ashik-Siddike';

  // SVG dynamic widgets urls
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${ghTheme}&hide_border=true&bg_color=1e1e1e00`;
  const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${ghTheme}&hide_border=true&bg_color=1e1e1e00`;
  const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${ghTheme}&hide_border=true&background=1e1e1e00`;

  // Raw markdown equivalent text for source code mode
  const rawMarkdown = `# GitHub Activity Profile - MD. Ashik Siddike

实时更新的开发者状态面板。

---

## 📊 个人主页统计 (GitHub Profile Stats)
![Ashik's GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${ghTheme})

## 🔥 提交签到记录 (GitHub Streak Stats)
![Ashik's Streak Stats](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${ghTheme})

## 💻 语言占比分析 (Top Languages)
![Ashik's Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${ghTheme})

---

*✨ Auto-generated dynamically using GitHub Readme Stats API. Visit profile directly at [github.com/Ashik-Siddike](https://github.com/Ashik-Siddike).*
`;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* 📁 Header Address Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)',
        height: '42px',
        flexShrink: 0
      }}>
        <span style={{ fontSize: '16px' }}>📊</span>
        <span style={{ fontSize: '12px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace' }}>
          github_activity.md › {previewMode ? 'Preview' : 'Raw Markdown'}
        </span>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          style={toggleBtnStyle}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          {previewMode ? '📄 Show Source' : '📖 Show Preview'}
        </button>
      </div>

      {/* 🖥️ Body Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }} className="thin-scroll">
        {previewMode ? (
          /* Visual Cards Panel */
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <span style={{ fontSize: '20px' }}>🐙</span>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--bright)', margin: 0 }}>
                GitHub Live Status Dashboard
              </h2>
              <span style={{ marginLeft: 'auto', fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e', fontFamily: 'JetBrains Mono, monospace' }}>
                ● Real-time Connection
              </span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--dim)', marginBottom: '24px', lineHeight: 1.6 }}>
              Direct live feed from MD. Ashik Siddike's GitHub account (<strong style={{ color: 'var(--bright)' }}>75+ repositories</strong>). Tracking commit metrics, activity cycles, and language ratios:
            </p>

            {/* Grid layout for stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
              {/* Row 1: Profile stats and Streak stats side-by-side */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <div style={widgetCardStyle}>
                  <div style={cardHeaderStyle}>📈 Profile Stats Summary</div>
                  <div style={cardBodyStyle}>
                    <img 
                      src={statsUrl} 
                      alt="Ashik's GitHub Stats" 
                      style={{ width: '100%', maxWidth: '450px', display: 'block', borderRadius: '6px' }} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/450x180/1a1a1a/cccccc?text=Live+GitHub+Stats+Loading...";
                      }}
                    />
                  </div>
                </div>

                <div style={widgetCardStyle}>
                  <div style={cardHeaderStyle}>🔥 Contribution Streak</div>
                  <div style={cardBodyStyle}>
                    <img 
                      src={streakUrl} 
                      alt="Ashik's Streak Stats" 
                      style={{ width: '100%', maxWidth: '450px', display: 'block', borderRadius: '6px' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/450x180/1a1a1a/cccccc?text=Streak+Stats+Loading...";
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Top languages */}
              <div style={widgetCardStyle}>
                <div style={cardHeaderStyle}>💻 Top Languages Breakdown</div>
                <div style={{ ...cardBodyStyle, display: 'flex', justifyContent: 'center' }}>
                  <img 
                    src={langsUrl} 
                    alt="Ashik's Top Languages" 
                    style={{ width: '100%', maxWidth: '380px', display: 'block', borderRadius: '6px' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/380x180/1a1a1a/cccccc?text=Top+Languages+Loading...";
                    }}
                  />
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '28px 0' }} />

            {/* View Full Profile link */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <a 
                href="https://github.com/Ashik-Siddike" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--blue2)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0, 122, 204, 0.25)',
                  transition: 'transform 0.1s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                🐙 Open Full Profile on GitHub <span>↗</span>
              </a>
            </div>
          </div>
        ) : (
          /* Raw Markdown Editor */
          <div style={{ display: 'flex', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', lineHeight: 1.7, color: 'var(--text)' }}>
            {/* Line Numbers */}
            <div style={{ color: 'var(--dim)', textAlign: 'right', paddingRight: '16px', userSelect: 'none', borderRight: '1px solid var(--border)', marginRight: '16px', minWidth: '24px' }}>
              {rawMarkdown.split('\n').map((_, index) => (
                <div key={index}>{index + 1}</div>
              ))}
            </div>
            {/* Raw code content */}
            <pre style={{ margin: 0, padding: 0, overflow: 'auto', color: 'var(--dim)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', flex: 1 }}>
              {rawMarkdown}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const widgetCardStyle = {
  flex: 1,
  minWidth: '280px',
  background: 'var(--bg2)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
};

const cardHeaderStyle = {
  fontSize: '11px',
  fontWeight: 'bold',
  color: 'var(--dim)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  padding: '8px 16px',
  borderBottom: '1px solid var(--border)',
  background: 'rgba(255,255,255,0.02)'
};

const cardBodyStyle = {
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const toggleBtnStyle = {
  marginLeft: 'auto',
  background: 'var(--bg3)',
  border: '1px solid var(--border)',
  borderRadius: '4px',
  color: 'var(--text)',
  fontSize: '11px',
  padding: '4px 12px',
  cursor: 'pointer',
  fontFamily: 'JetBrains Mono, monospace',
  display: 'flex',
  alignItems: 'center',
  transition: 'border-color 0.15s'
};

export default GithubActivityPage;
