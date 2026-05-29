import React, { useEffect } from 'react';

const SKILLS = [
  { name: 'Python',       color: '#4ec9b0' },
  { name: 'TypeScript',   color: '#4fc1ff' },
  { name: 'JavaScript',   color: '#dcdcaa' },
  { name: 'Next.js',      color: '#cccccc' },
  { name: 'React',        color: '#4fc1ff' },
  { name: 'HTML/CSS',     color: '#ce9178' },
  { name: 'Java',         color: '#f44747' },
  { name: 'Node.js',      color: '#4ec9b0' },
  { name: 'FastAPI',      color: '#4ec9b0' },
  { name: 'n8n',          color: '#ff6fd8' },
  { name: 'Make.com',     color: '#c586c0' },
  { name: 'AI Automation',color: '#ff6fd8' },
  { name: 'Tailwind CSS', color: '#4fc1ff' },
  { name: 'Prisma',       color: '#4ec9b0' },
  { name: 'PostgreSQL',   color: '#4fc1ff' },
  { name: 'MongoDB',      color: '#4ec9b0' },
  { name: 'Git',          color: '#ce9178' },
  { name: 'Vercel',       color: '#cccccc' },
  { name: 'Gemini AI',    color: '#4fc1ff' },
  { name: 'OpenAI API',   color: '#4ec9b0' },
];

const AboutPage = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="content-section animate-fade-in" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>

      {/* Mini VS Code Editor Block Mockup */}
      <div className="reveal" style={{
        marginBottom: '2.5rem',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        background: 'var(--bg2)',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        maxWidth: '760px'
      }}>
        {/* Window Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: 'var(--title)',
          borderBottom: '1px solid var(--border)',
          userSelect: 'none'
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
          </div>
          <div style={{ fontSize: '11px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: '#dcdcaa' }}>📄</span>
            <span>about_me.js</span>
          </div>
          <div style={{ width: '38px' }} />
        </div>

        {/* Window Content */}
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px',
          lineHeight: 1.8,
          background: 'var(--bg)',
          padding: '20px',
          overflowX: 'auto',
          margin: 0
        }}>
          <div style={{ color: 'var(--gcm)', marginBottom: '6px' }}>{'// about_me.js — Ashik Siddike profile'}</div>
          <div><span style={{ color: 'var(--purple)' }}>const</span> <span style={{ color: 'var(--blue)' }}>developer</span> <span style={{ color: 'var(--text)' }}>=</span> {'{'}</div>
          <div style={{ paddingLeft: '1.5rem' }}>
            <div><span style={{ color: 'var(--yellow)' }}>name</span><span style={{ color: 'var(--text)' }}>:</span> <span style={{ color: 'var(--orange)' }}>"Ashik Siddike"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: 'var(--yellow)' }}>username</span><span style={{ color: 'var(--text)' }}>:</span> <span style={{ color: 'var(--orange)' }}>"@Ashik-Siddike"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: 'var(--yellow)' }}>focus</span><span style={{ color: 'var(--text)' }}>:</span> <span style={{ color: 'var(--orange)' }}>"Full-Stack Dev + AI Automation"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: 'var(--yellow)' }}>primaryStack</span><span style={{ color: 'var(--text)' }}>:</span> <span style={{ color: 'var(--text)' }}>[</span><span style={{ color: 'var(--orange)' }}>"Next.js"</span><span style={{ color: 'var(--dim)' }}>, </span><span style={{ color: 'var(--orange)' }}>"Python"</span><span style={{ color: 'var(--dim)' }}>, </span><span style={{ color: 'var(--orange)' }}>"TypeScript"</span><span style={{ color: 'var(--text)' }}>]</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: 'var(--yellow)' }}>repos</span><span style={{ color: 'var(--text)' }}>:</span> <span style={{ color: 'var(--blue)' }}>75</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: 'var(--yellow)' }}>openToWork</span><span style={{ color: 'var(--text)' }}>:</span> <span style={{ color: 'var(--blue)' }}>true</span><span style={{ color: 'var(--dim)' }}>,</span></div>
          </div>
          <div>{'}'}<span style={{ color: 'var(--dim)' }}>;</span></div>
        </div>
      </div>

      {/* Bio */}
      <div className="reveal" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bright)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--pink)' }}>#</span> About Me
        </h2>
        <div style={{ color: 'var(--text)', lineHeight: 1.9, fontSize: '13.5px', maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p>
            Hey! I'm <span style={{ color: 'var(--bright)', fontWeight: 600 }}>Ashik Siddike</span> — a full-stack developer and AI automation builder passionate about creating tools that actually work in the real world. With <span style={{ color: 'var(--yellow)' }}>75+ GitHub repositories</span>, I love shipping products fast and iterating.
          </p>
          <p>
            My main focus is building <span style={{ color: 'var(--blue)' }}>Next.js / TypeScript</span> web applications and <span style={{ color: 'var(--pink)' }}>Python-powered AI automation</span> systems. I've built everything from affiliate marketing automation tools to SaaS dashboards to kids learning platforms — all deployed and live on Vercel.
          </p>
          <p>
            I'm also fascinated by <span style={{ color: 'var(--green)' }}>no-code/low-code automation</span> with tools like n8n and Make.com, and integrating AI APIs (Gemini, OpenAI) into real-world products. I believe in <span style={{ color: 'var(--orange)' }}>building in public</span> and learning through shipping.
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="reveal" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bright)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--pink)' }}>#</span> Tech Stack
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '760px' }}>
          {SKILLS.map(({ name, color }) => (
            <span key={name} className="skill-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '12px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* What I Build */}
      <div className="reveal">
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bright)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--pink)' }}>#</span> What I Build
        </h2>
        <div className="about-build-grid" style={{ maxWidth: '760px' }}>
          {[
            { icon: '🤖', title: 'AI Automation', desc: 'Python bots, n8n workflows, affiliate marketing automation' },
            { icon: '⚡', title: 'Full-Stack Apps', desc: 'Next.js + TypeScript SaaS products deployed on Vercel' },
            { icon: '🎓', title: 'EdTech Platforms', desc: 'Kids learning apps and interactive educational tools' },
            { icon: '📊', title: 'SaaS Dashboards', desc: 'Analytics, tracking, and management interfaces' },
          ].map(({ icon, title, desc }) => (
            <div key={title}
              style={{ padding: '16px 18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', transition: 'all 0.2s ease', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--bright)', marginBottom: '5px' }}>{title}</div>
              <div style={{ fontSize: '11.5px', color: 'var(--dim)', lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
