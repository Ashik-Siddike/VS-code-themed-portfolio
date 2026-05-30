import React, { useState } from 'react';

const COMMITS_DATA = [
  {
    hash: 'b8c9030',
    msg: 'feat: add real-time system diagnostics & interactive git graph',
    author: 'Ashik Siddike <ashiksiddike@gmail.com>',
    date: 'Sat May 30 04:56:11 2026 +0600',
    branch: 'main',
    additions: 194,
    deletions: 36,
    files: [
      { name: 'src/pages/DiagnosticsPage.jsx', status: 'added', diff: '+ 132' },
      { name: 'src/pages/GitGraphPage.jsx', status: 'added', diff: '+ 285' },
      { name: 'src/constants.jsx', status: 'modified', diff: '+ 18, - 2' },
      { name: 'src/App.jsx', status: 'modified', diff: '+ 8, - 1' }
    ]
  },
  {
    hash: '3877ac3',
    msg: 'style: close blog folder by default in explorer sidebar',
    author: 'Ashik Siddike <ashiksiddike@gmail.com>',
    date: 'Sat May 30 04:45:01 2026 +0600',
    branch: 'main',
    additions: 1,
    deletions: 1,
    files: [
      { name: 'src/components/Sidebar.jsx', status: 'modified', diff: '+ 1, - 1' }
    ]
  },
  {
    hash: 'e474068',
    msg: 'feat: implement markdown dev blog, live github widgets, and JSON-LD schema SEO',
    author: 'Ashik Siddike <ashiksiddike@gmail.com>',
    date: 'Sat May 30 04:33:16 2026 +0600',
    branch: 'main',
    additions: 655,
    deletions: 39,
    files: [
      { name: 'src/pages/BlogPage.jsx', status: 'added', diff: '+ 265' },
      { name: 'src/pages/GithubActivityPage.jsx', status: 'added', diff: '+ 253' },
      { name: 'index.html', status: 'modified', diff: '+ 50, - 2' },
      { name: 'src/components/Sidebar.jsx', status: 'modified', diff: '+ 42, - 32' },
      { name: 'src/constants.jsx', status: 'modified', diff: '+ 3, - 0' }
    ]
  },
  {
    hash: '2883d6c',
    msg: 'feat: implement simulated simple browser and code execution runner for projects preview',
    author: 'Ashik Siddike <ashiksiddike@gmail.com>',
    date: 'Fri May 29 22:29:50 2026 +0600',
    branch: 'main',
    additions: 421,
    deletions: 19,
    files: [
      { name: 'src/pages/BrowserPage.jsx', status: 'added', diff: '+ 330' },
      { name: 'src/pages/ProjectsPage.jsx', status: 'modified', diff: '+ 91, - 19' }
    ]
  },
  {
    hash: '5d92e1f',
    msg: 'Merge branch \'feature/guestbook\' into main',
    author: 'Ashik Siddike <ashiksiddike@gmail.com>',
    date: 'Fri May 29 20:30:12 2026 +0600',
    branch: 'main',
    additions: 2,
    deletions: 0,
    files: [
      { name: 'src/components/Terminal.jsx', status: 'modified', diff: '+ 2, - 0' }
    ]
  },
  {
    hash: '9f2a08c',
    msg: 'feat: add MongoDB collection & guestbook console commands',
    author: 'Ashik Siddike <ashiksiddike@gmail.com>',
    date: 'Fri May 29 19:42:33 2026 +0600',
    branch: 'feature/guestbook',
    additions: 156,
    deletions: 22,
    files: [
      { name: 'server/routes/guestbookRoutes.js', status: 'added', diff: '+ 48' },
      { name: 'server/models/Guestbook.js', status: 'added', diff: '+ 15' },
      { name: 'src/components/Terminal.jsx', status: 'modified', diff: '+ 93, - 22' }
    ]
  },
  {
    hash: 'a98b2c4',
    msg: 'Merge branch \'feature/copilot\' into main',
    author: 'Ashik Siddike <ashiksiddike@gmail.com>',
    date: 'Fri May 29 17:35:10 2026 +0600',
    branch: 'main',
    additions: 3,
    deletions: 1,
    files: [
      { name: 'src/App.jsx', status: 'modified', diff: '+ 3, - 1' }
    ]
  },
  {
    hash: '8f7d9a1',
    msg: 'feat: connect Conversational AI Copilot to Gemini 1.5 Flash API proxy route',
    author: 'Ashik Siddike <ashiksiddike@gmail.com>',
    date: 'Fri May 29 17:05:42 2026 +0600',
    branch: 'feature/copilot',
    additions: 198,
    deletions: 48,
    files: [
      { name: 'server/routes/copilotRoutes.js', status: 'added', diff: ' +124' },
      { name: 'src/components/CopilotPanel.jsx', status: 'modified', diff: '+ 74, - 48' }
    ]
  },
  {
    hash: '1c4b78f',
    msg: 'feat: connect live email submissions via Web3Forms API access key',
    author: 'Ashik Siddike <ashiksiddike@gmail.com>',
    date: 'Fri May 29 15:20:11 2026 +0600',
    branch: 'main',
    additions: 48,
    deletions: 12,
    files: [
      { name: 'src/pages/ContactPage.jsx', status: 'modified', diff: '+ 48, - 12' }
    ]
  },
  {
    hash: '6e2d98a',
    msg: 'feat: integrate CV experience timeline, Bio descriptions, and phone coordinate',
    author: 'Ashik Siddike <ashiksiddike@gmail.com>',
    date: 'Fri May 29 14:10:02 2026 +0600',
    branch: 'main',
    additions: 380,
    deletions: 54,
    files: [
      { name: 'src/pages/AboutPage.jsx', status: 'modified', diff: '+ 120, - 24' },
      { name: 'src/pages/ExperiencePage.jsx', status: 'modified', diff: '+ 110, - 20' },
      { name: 'src/pages/WorkHistoryPage.jsx', status: 'modified', diff: '+ 150, - 10' }
    ]
  },
  {
    hash: 'd3d0b7d',
    msg: 'Initial commit: Build workspace skeleton and VS Code folder structure',
    author: 'Ashik Siddike <ashiksiddike@gmail.com>',
    date: 'Wed May 27 22:15:33 2026 +0600',
    branch: 'main',
    additions: 1240,
    deletions: 0,
    files: [
      { name: 'src/App.jsx', status: 'added', diff: '+ 385' },
      { name: 'package.json', status: 'added', diff: '+ 37' },
      { name: 'src/index.css', status: 'added', diff: '+ 818' }
    ]
  }
];

const GitGraphPage = ({ setActivePage }) => {
  const [selectedCommit, setSelectedCommit] = useState(COMMITS_DATA[0]);
  const [hoveredHash, setHoveredHash] = useState(null);

  // SVG grid config
  const rowHeight = 52;
  const mainColX = 30;
  const branchColX = 70;

  // Render path curves for git branching lines in SVG
  const renderGitPaths = () => {
    return (
      <svg style={{ width: '110px', height: `${COMMITS_DATA.length * rowHeight}px`, overflow: 'visible' }}>
        <defs>
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--blue)" />
            <stop offset="50%" stopColor="var(--purple)" />
            <stop offset="100%" stopColor="var(--pink)" />
          </linearGradient>
          <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--blue)" />
            <stop offset="100%" stopColor="var(--yellow)" />
          </linearGradient>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--blue)" />
            <stop offset="100%" stopColor="var(--pink)" />
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Main Line path */}
        <line x1={mainColX} y1={rowHeight / 2} x2={mainColX} y2={(COMMITS_DATA.length - 0.5) * rowHeight} stroke="url(#mainGradient)" strokeWidth="3" filter="url(#glow)" />
        
        {/* Branch Lines: Feature Guestbook */}
        <path d={`M ${mainColX} ${4.5 * rowHeight} C ${mainColX} ${4.8 * rowHeight}, ${branchColX} ${4.8 * rowHeight}, ${branchColX} ${5.5 * rowHeight}`} fill="none" stroke="url(#yellowGradient)" strokeWidth="2.2" filter="url(#glow)" />
        <line x1={branchColX} y1={5.5 * rowHeight} x2={branchColX} y2={5.5 * rowHeight} stroke="var(--yellow)" strokeWidth="2.2" filter="url(#glow)" />
        <path d={`M ${branchColX} ${5.5 * rowHeight} C ${branchColX} ${6.2 * rowHeight}, ${mainColX} ${6.2 * rowHeight}, ${mainColX} ${6.5 * rowHeight}`} fill="none" stroke="url(#yellowGradient)" strokeWidth="2.2" filter="url(#glow)" />

        {/* Branch Lines: Feature Copilot */}
        <path d={`M ${mainColX} ${6.5 * rowHeight} C ${mainColX} ${6.8 * rowHeight}, ${branchColX} ${6.8 * rowHeight}, ${branchColX} ${7.5 * rowHeight}`} fill="none" stroke="url(#pinkGradient)" strokeWidth="2.2" filter="url(#glow)" />
        <line x1={branchColX} y1={7.5 * rowHeight} x2={branchColX} y2={7.5 * rowHeight} stroke="var(--pink)" strokeWidth="2.2" filter="url(#glow)" />
        <path d={`M ${branchColX} ${7.5 * rowHeight} C ${branchColX} ${8.2 * rowHeight}, ${mainColX} ${8.2 * rowHeight}, ${mainColX} ${8.5 * rowHeight}`} fill="none" stroke="url(#pinkGradient)" strokeWidth="2.2" filter="url(#glow)" />
      </svg>
    );
  };

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <style>{`
        @keyframes pulseRing {
          0% {
            transform: scale(0.4);
            opacity: 0.8;
          }
          80%, 100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
      {/* LEFT PANEL: Git Timeline */}
      <div style={{
        flex: 1.3,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border)',
        overflowY: 'auto'
      }} className="thin-scroll">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 'bold', fontSize: '13px', color: 'var(--bright)' }}>📂 REPOSITORY HISTORY (Git Graph)</span>
          <span style={{ fontSize: '11px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace' }}>branch: main</span>
        </div>

        {/* Nodes and commits container */}
        <div style={{ position: 'relative', display: 'flex', flex: 1 }}>
          
          {/* Node lines (Absolute background) */}
          <div style={{ position: 'absolute', top: 0, left: 16, zIndex: 1, pointerEvents: 'none' }}>
            {renderGitPaths()}
          </div>

          {/* Commit Rows */}
          <div style={{ width: '100%', zIndex: 2 }}>
            {COMMITS_DATA.map((commit, idx) => {
              const isSelected = selectedCommit.hash === commit.hash;
              const isHovered = hoveredHash === commit.hash;
              
              // Define node coordinate dynamically
              const isBranched = commit.branch.startsWith('feature/');
              const nodeX = isBranched ? branchColX : mainColX;
              const nodeColor = commit.branch === 'feature/guestbook' ? 'var(--yellow)' : commit.branch === 'feature/copilot' ? 'var(--pink)' : 'var(--blue)';

              return (
                <div
                  key={commit.hash}
                  onClick={() => setSelectedCommit(commit)}
                  onMouseEnter={() => setHoveredHash(commit.hash)}
                  onMouseLeave={() => setHoveredHash(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: `${rowHeight}px`,
                    paddingLeft: '110px', // Offset to make space for graph lines
                    paddingRight: '16px',
                    borderBottom: '1px solid rgba(255,255,255,0.015)',
                    background: isSelected ? 'rgba(79,193,255,0.06)' : isHovered ? 'rgba(255,255,255,0.01)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.1s'
                  }}
                >
                  {/* Commits visual details */}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <span className="truncate" style={{ fontSize: '12.5px', color: isSelected ? 'var(--bright)' : 'var(--text)', fontWeight: isSelected ? 'bold' : 'normal' }}>
                      {commit.msg}
                    </span>
                    <span style={{ fontSize: '10.5px', color: 'var(--dim)', display: 'flex', gap: '8px', marginTop: '2px' }}>
                      <span style={{ color: 'var(--yellow)', fontFamily: 'JetBrains Mono, monospace' }}>{commit.hash}</span>
                      <span>by ashik-siddike</span>
                    </span>
                  </div>

                  {/* Branch tag indicator */}
                  {commit.msg.startsWith('Merge') ? (
                    <span style={{ fontSize: '9px', background: 'rgba(255,255,255,0.04)', padding: '1px 6px', borderRadius: '3px', border: '1px solid var(--border)', color: 'var(--dim)' }}>MERGE</span>
                  ) : (
                    <span style={{ fontSize: '9px', background: `${nodeColor}10`, padding: '1px 6px', borderRadius: '3px', border: `1px solid ${nodeColor}25`, color: nodeColor, fontFamily: 'JetBrains Mono, monospace' }}>
                      {commit.branch}
                    </span>
                  )}

                  {/* Absolute SVG overlay node circle for hover effect */}
                  <div style={{
                    position: 'absolute',
                    left: `${16 + nodeX - 6}px`, // Offset left (base + node x coordinate - radius offset)
                    top: `${idx * rowHeight + (rowHeight / 2) - 6}px`,
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: isSelected ? 'white' : nodeColor,
                    border: '2px solid var(--bg)',
                    boxShadow: isSelected || isHovered ? `0 0 8px ${nodeColor}` : 'none',
                    transform: isSelected || isHovered ? 'scale(1.3)' : 'scale(1)',
                    transition: 'transform 0.15s, background-color 0.15s',
                    zIndex: 3
                  }} />

                  {/* Glowing Pulse Ring for Selected Nodes */}
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      left: `${16 + nodeX - 14}px`,
                      top: `${idx * rowHeight + (rowHeight / 2) - 14}px`,
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'transparent',
                      border: `2px solid ${nodeColor}`,
                      animation: 'pulseRing 1.8s cubic-bezier(0.215, 0.610, 0.355, 1) infinite',
                      pointerEvents: 'none',
                      zIndex: 2
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Commit Details Sidebar */}
      <div style={{
        flex: 1,
        background: 'var(--bg2)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }} className="thin-scroll">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontWeight: 'bold', fontSize: '13px', color: 'var(--dim)' }}>⚙️ COMMIT DETAILS</span>
        </div>

        {selectedCommit ? (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Hash & Date */}
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--dim)', fontWeight: 'bold', letterSpacing: '0.05em' }}>Commit Reference</div>
              <div style={{ fontSize: '16px', color: 'var(--yellow)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 'bold', marginTop: '4px' }}>
                {selectedCommit.hash}
              </div>
            </div>

            {/* Message */}
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--dim)', fontWeight: 'bold', letterSpacing: '0.05em' }}>Message</div>
              <div style={{ fontSize: '13.5px', color: 'var(--bright)', lineHeight: 1.5, marginTop: '4px', fontWeight: 600 }}>
                {selectedCommit.msg}
              </div>
            </div>

            {/* Metadata (Author, Date) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--border)' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--dim)', fontWeight: 'bold' }}>Author:</span>
                <span style={{ fontSize: '11.5px', color: 'var(--text)', marginLeft: '6px', fontFamily: 'JetBrains Mono, monospace' }}>
                  {selectedCommit.author.split(' <')[0]}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--dim)', fontWeight: 'bold' }}>Date:</span>
                <span style={{ fontSize: '11.5px', color: 'var(--text)', marginLeft: '6px' }}>
                  {selectedCommit.date}
                </span>
              </div>
            </div>

            {/* Files Modified list */}
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--dim)', fontWeight: 'bold', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Files Modified ({selectedCommit.files.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedCommit.files.map(file => {
                  const isAdd = file.status === 'added';
                  const isMod = file.status === 'modified';
                  const color = isAdd ? 'var(--green)' : isMod ? 'var(--yellow)' : 'var(--red)';
                  const tag = isAdd ? 'A' : isMod ? 'M' : 'D';

                  return (
                    <div
                      key={file.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        background: 'rgba(255,255,255,0.01)',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}
                    >
                      <span className="truncate" style={{ flex: 1, color: 'var(--text)', fontFamily: 'JetBrains Mono, monospace', marginRight: '10px' }}>
                        {file.name.split('/').pop()}
                      </span>
                      <span style={{ fontSize: '10.5px', color: 'var(--dim)', marginRight: '12px' }}>{file.diff}</span>
                      <span style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '3px',
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                        color: color,
                        fontSize: '10px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual Indicators */}
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px', borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '10px' }}>
              <span style={{ color: 'var(--green)' }}>🟢 {selectedCommit.additions} additions</span>
              <span style={{ color: 'var(--red)' }}>🔴 {selectedCommit.deletions} deletions</span>
            </div>
          </div>
        ) : (
          <div style={{ padding: '24px', color: 'var(--dim)', fontStyle: 'italic', fontSize: '13px' }}>
            Select a commit node from the timeline to view its changes.
          </div>
        )}
      </div>
    </div>
  );
};

export default GitGraphPage;
