import React, { useEffect } from 'react';

const GITHUB_AVATAR = 'https://avatars.githubusercontent.com/u/174149204?v=4';

const HomePage = ({ setActivePage }) => {
  const [typed, setTyped] = React.useState('');
  const [typedTagline, setTypedTagline] = React.useState('');
  const full = 'Ashik Siddike';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= full.length) { setTyped(full.slice(0, i)); i++; }
      else clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const taglines = [
      'Full-Stack Web Developer',
      'React & Next.js Engineer',
      'AI Automation Builder',
      'Graphic Designer & Creator'
    ];
    let curIdx = 0;
    let curChar = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const fullText = taglines[curIdx];
      if (deleting) {
        setTypedTagline(fullText.substring(0, curChar - 1));
        curChar--;
      } else {
        setTypedTagline(fullText.substring(0, curChar + 1));
        curChar++;
      }

      let speed = deleting ? 45 : 85;

      if (!deleting && curChar === fullText.length) {
        speed = 2000;
        deleting = true;
      } else if (deleting && curChar === 0) {
        deleting = false;
        curIdx = (curIdx + 1) % taglines.length;
        speed = 500;
      }

      timer = setTimeout(tick, speed);
    };

    const startDelay = setTimeout(() => { tick(); }, 1500);
    return () => { clearTimeout(startDelay); clearTimeout(timer); };
  }, []);

  return (
    <div className="home-wrapper animate-fade-in">
      {/* Avatar */}
      <div className="home-avatar">
        <div className="avatar-ring" style={{ width: 190, height: 190 }}>
          <img
            src={GITHUB_AVATAR}
            alt="Ashik Siddike"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentNode.style.background = 'linear-gradient(135deg, #22c55e, #38bdf8)';
              e.target.parentNode.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;font-weight:800;color:white;font-family:Syne,sans-serif">AS</div>';
            }}
          />
        </div>
        <div className="avatar-glow" />
      </div>

      {/* Content */}
      <div className="home-content">
        <div className="animate-su-1" style={{ color: 'var(--gcm)', fontSize: '13px', marginBottom: '8px', letterSpacing: '0.12em', fontFamily: 'JetBrains Mono, monospace' }}>
          <span style={{ color: 'var(--dim)' }}>// </span>Full-Stack Developer · Nexinity Web Solution
        </div>

        <h1 className="font-display animate-su-2" style={{ fontSize: '46px', fontWeight: 800, lineHeight: 1.1, marginBottom: '6px', color: 'var(--bright)' }}>
          {typed}<span className="term-cursor" style={{ opacity: typed.length === full.length ? 0 : 1 }} />
        </h1>

        <div className="animate-su-3" style={{ fontSize: '20px', fontWeight: '700', color: 'var(--pink)', minHeight: '30px', display: 'flex', alignItems: 'center', marginBottom: '14px', fontFamily: 'JetBrains Mono, monospace' }}>
          <span style={{ color: 'var(--blue)' }}>&gt; </span>
          <span style={{ marginLeft: '6px' }}>{typedTagline}</span>
          <span className="term-cursor animate-blink" style={{ background: 'var(--pink)', width: '6px', height: '16px', marginLeft: '4px', display: 'inline-block' }} />
        </div>

        {/* Role Chips - based on actual CV */}
        <div className="animate-su-3.5" style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '20px' }}>
          {[
            { label: '💚 Full-Stack Dev', color: '#22c55e' },
            { label: '🔵 React / Next.js', color: '#38bdf8' },
            { label: '🟣 AI Automation', color: '#a855f7' },
            { label: '🟠 Graphic Design', color: '#f97316' },
          ].map(({ label, color }) => (
            <span key={label} style={{
              background: `${color}10`,
              border: `1px solid ${color}30`,
              color,
              padding: '3px 11px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 500,
            }}>{label}</span>
          ))}
        </div>

        {/* Social Links */}
        <div className="animate-su-3.8" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '26px' }}>
          {[
            { name: 'GitHub', url: 'https://github.com/Ashik-Siddike', color: '#f0f6fc', bg: 'rgba(240,246,252,0.06)', hoverBg: '#24292e', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
            { name: 'LinkedIn', url: 'https://linkedin.com/in/ashik-siddike', color: '#0a66c2', bg: 'rgba(10,102,194,0.06)', hoverBg: '#0a66c2', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
            { name: 'Facebook', url: 'https://facebook.com/ashik.siddike.01', color: '#1877f2', bg: 'rgba(24,119,242,0.06)', hoverBg: '#1877f2', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
            { name: 'Twitter', url: 'https://twitter.com/AshikSiddike', color: '#1da1f2', bg: 'rgba(29,161,242,0.06)', hoverBg: '#1da1f2', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
            { name: 'Instagram', url: 'https://instagram.com/ashik_siddike', color: '#e1306c', bg: 'rgba(225,48,108,0.06)', hoverBg: '#e1306c', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
            { name: 'YouTube', url: 'https://youtube.com/@AshikSiddike', color: '#ff0000', bg: 'rgba(255,0,0,0.06)', hoverBg: '#ff0000', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163c-.272-.98-1.04-1.748-2.02-2.02C19.616 3.65 12 3.65 12 3.65s-7.617 0-9.478.493c-.98.272-1.748 1.04-2.02 2.02C0 8.024 0 12 0 12s0 3.976.502 5.837c.272.98 1.04 1.748 2.02 2.02C4.383 20.35 12 20.35 12 20.35s7.617 0 9.478-.493c.98-.272 1.748-1.04 2.02-2.02C24 15.976 24 12 24 12s0-3.976-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
            { name: 'Email', url: 'mailto:ashiksiddike@gmail.com', color: '#ea4335', bg: 'rgba(234,67,53,0.06)', hoverBg: '#ea4335', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> }
          ].map(social => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              title={social.name}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px', borderRadius: '50%',
                background: social.bg, color: 'var(--text)',
                transition: 'all 0.2s ease',
                border: '1px solid rgba(255,255,255,0.04)',
                textDecoration: 'none'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = social.hoverBg;
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = `0 0 10px ${social.color}55`;
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = social.bg;
                e.currentTarget.style.color = 'var(--text)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Bio */}
        <p className="animate-su-4 leading-relaxed" style={{ color: 'var(--text)', fontSize: '13.5px', maxWidth: '600px', marginBottom: '28px', lineHeight: 1.85 }}>
          Motivated and passionate{' '}
          <span style={{ color: 'var(--green)', fontWeight: 600 }}>Full-Stack Developer</span> at{' '}
          <span style={{ color: '#22c55e', fontWeight: 600 }}>Nexinity Web Solution</span> — building
          end-to-end web apps with <span style={{ color: 'var(--blue)' }}>React / Next.js</span> and{' '}
          <span style={{ color: 'var(--blue)' }}>Node.js</span>. Also a{' '}
          <span style={{ color: '#f97316' }}>freelance graphic designer</span> with{' '}
          <span style={{ color: 'var(--yellow)' }}>50+ completed projects</span>, and an AI automation builder integrating LLMs into real-world products.
        </p>

        <div className="animate-su-5 flex flex-wrap gap-3">
          <button className="btn-vscode btn-vscode-primary" onClick={() => setActivePage('projects')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            View Projects
          </button>
          <a href="https://ashiksiddike.com" target="_blank" rel="noreferrer" className="btn-vscode btn-vscode-ghost">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
            </svg>
            ashiksiddike.com
          </a>
          <button className="btn-vscode btn-vscode-ghost" onClick={() => setActivePage('contact')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Hire Me
          </button>
        </div>

        {/* Stats — real CV data */}
        <div className="animate-su-6 flex flex-wrap gap-6" style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          {[
            { val: '75+', label: 'GitHub Repos', color: '#22c55e' },
            { val: '3+', label: 'Years Experience', color: '#38bdf8' },
            { val: '50+', label: 'Design Projects', color: '#f97316' },
            { val: '4+', label: 'Tech Stacks', color: '#a855f7' },
          ].map(({ val, label, color }) => (
            <div key={label}>
              <div className="font-display" style={{ fontSize: '26px', fontWeight: 800, color }}>{val}</div>
              <div style={{ fontSize: '11px', color: 'var(--dim)', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Current company badge */}
        <div className="animate-su-7" style={{ marginTop: '18px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
          <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 500 }}>Currently @ Nexinity Web Solution</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
