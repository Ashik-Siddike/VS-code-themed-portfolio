import React, { useEffect, useRef } from 'react';

const GITHUB_AVATAR = 'https://avatars.githubusercontent.com/u/174149204?v=4';

const HomePage = ({ setActivePage }) => {
  const [typed, setTyped] = React.useState('');
  const full = 'Ashik Siddike';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= full.length) { setTyped(full.slice(0, i)); i++; }
      else clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-wrapper animate-fade-in">
      {/* Avatar */}
      <div className="home-avatar">
        <div className="avatar-ring" style={{ width: 180, height: 180 }}>
          <img
            src={GITHUB_AVATAR}
            alt="Ashik Siddike"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentNode.style.background = 'linear-gradient(135deg, #007acc, #ff6fd8)';
              e.target.parentNode.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;font-weight:800;color:white;font-family:Syne,sans-serif">AS</div>';
            }}
          />
        </div>
        <div className="avatar-glow" />
      </div>

      {/* Content */}
      <div className="home-content">
        <div className="animate-su-1" style={{ color: 'var(--gcm)', fontSize: '12px', marginBottom: '8px', letterSpacing: '0.12em' }}>
          <span style={{ color: 'var(--dim)' }}>// </span>Full-Stack Developer &amp; AI Automation Builder
        </div>

        <h1 className="font-display animate-su-2" style={{ fontSize: '40px', fontWeight: 800, lineHeight: 1.1, marginBottom: '12px', color: 'var(--bright)' }}>
          {typed}<span className="term-cursor" style={{ opacity: typed.length === full.length ? 0 : 1 }} />
        </h1>

        <div className="animate-su-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {['Next.js Developer', 'Python Automation', 'AI/ML Engineer', 'SaaS Builder'].map(role => (
            <span key={role} style={{
              background: 'rgba(255,111,216,0.1)',
              border: '1px solid rgba(255,111,216,0.2)',
              color: 'var(--pink)', padding: '2px 10px',
              borderRadius: '5px', fontSize: '11px',
            }}>{role}</span>
          ))}
        </div>

        <p className="animate-su-4 leading-relaxed" style={{ color: 'var(--text)', fontSize: '13px', maxWidth: '560px', marginBottom: '28px' }}>
          I build <span style={{ color: 'var(--yellow)' }}>full-stack web applications</span> with Next.js & TypeScript and <span style={{ color: 'var(--pink)' }}>AI-powered automation tools</span> with Python. From affiliate marketing automation to kids learning platforms — I turn ideas into working products.
        </p>

        <div className="animate-su-5 flex flex-wrap gap-3">
          <button className="btn-vscode btn-vscode-primary" onClick={() => setActivePage('projects')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            View Projects
          </button>
          <a href="https://github.com/Ashik-Siddike" target="_blank" rel="noreferrer" className="btn-vscode btn-vscode-ghost">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub (75+ repos)
          </a>
          <button className="btn-vscode btn-vscode-ghost" onClick={() => setActivePage('contact')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Hire Me
          </button>
        </div>

        {/* Stats */}
        <div className="animate-su-6 flex flex-wrap gap-6" style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          {[
            { val: '75+', label: 'Repositories', color: 'var(--blue)' },
            { val: '1.5+', label: 'Years Coding', color: 'var(--green)' },
            { val: '6+', label: 'Live Projects', color: 'var(--pink)' },
            { val: '4+', label: 'Languages', color: 'var(--yellow)' },
          ].map(({ val, label, color }) => (
            <div key={label}>
              <div className="font-display" style={{ fontSize: '22px', fontWeight: 800, color }}>{val}</div>
              <div style={{ fontSize: '11px', color: 'var(--dim)', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* GitHub avatar credit line */}
        <div className="animate-su-7" style={{ marginTop: '16px', fontSize: '10px', color: 'var(--dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <a href="https://github.com/Ashik-Siddike" target="_blank" rel="noreferrer" style={{ color: 'var(--dim)', textDecoration: 'none' }}>
            @Ashik-Siddike on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
