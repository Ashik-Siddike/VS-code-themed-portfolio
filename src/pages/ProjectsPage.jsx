import React, { useEffect } from 'react';

const PROJECTS = [
  {
    title: 'Affiliate Automation System',
    desc: 'A full-scale affiliate marketing automation platform that automatically discovers trending keywords, generates AI-written SEO articles, creates product comparison images, and posts to social media. Built with Python, Gemini AI, and n8n/Make.com workflows.',
    tech: ['Python', 'Gemini AI', 'n8n', 'Make.com', 'HTML/CSS', 'Selenium'],
    accent: '#ff6fd8',
    github: 'https://github.com/Ashik-Siddike/Affilieate-Autometion',
    live: null,
    featured: true,
  },
  {
    title: 'Affiliate Automation — Next.js Site',
    desc: 'The public-facing Next.js website for the affiliate automation project. A modern TypeScript app with SEO-optimized product review pages, automated content delivery, and Vercel deployment.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    accent: '#4fc1ff',
    github: 'https://github.com/Ashik-Siddike/Affilieate-Automation-nextJS-site',
    live: 'https://affilieate-automation-next-js-site.vercel.app',
    featured: true,
  },
  {
    title: 'SaaS Dashboard',
    desc: 'A full-featured SaaS analytics dashboard with real-time data visualization, user management, and subscription tracking. Built with Next.js and TypeScript, deployed and live on Vercel.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel'],
    accent: '#4ec9b0',
    github: 'https://github.com/Ashik-Siddike/saas-dashboard',
    live: 'https://saas-dashboard-amber.vercel.app',
    featured: false,
  },
  {
    title: 'Aronnyo — Kids Learning Platform',
    desc: 'An interactive kids learning platform with gamified lessons, progress tracking, and engaging UI. Built with Next.js and TypeScript, designed to make learning fun for young students.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel'],
    accent: '#dcdcaa',
    github: 'https://github.com/Ashik-Siddike/aronnyo',
    live: 'https://kids-learning-platform-lilac.vercel.app',
    featured: false,
  },
  {
    title: 'Play Learn Grow Kids (247School)',
    desc: 'A comprehensive 24/7 online school platform for kids with interactive lessons, quizzes, and learning paths. Features gamification elements to keep students engaged.',
    tech: ['TypeScript', 'Next.js', 'React', 'Vercel'],
    accent: '#c586c0',
    github: 'https://github.com/Ashik-Siddike/play-learn-grow-kids',
    live: 'https://247school.vercel.app',
    featured: false,
  },
  {
    title: 'Social Media Growing Agent',
    desc: 'An AI-powered social media growth automation agent built in Python. Automates content generation, posting schedules, and engagement strategies to grow social media presence organically.',
    tech: ['Python', 'AI APIs', 'Automation', 'n8n'],
    accent: '#ce9178',
    github: 'https://github.com/Ashik-Siddike/social-media-growing-agent',
    live: null,
    featured: false,
  },
];

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const LinkRow = ({ github, live }) => (
  <div style={{ display: 'flex', gap: '12px', color: 'var(--dim)' }}>
    {github && (
      <a href={github} target="_blank" rel="noreferrer"
        style={{ color: 'inherit', transition: 'color 0.15s', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--bright)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
        title="Source Code"
      >
        <GitHubIcon /> Code
      </a>
    )}
    {live && (
      <a href={live} target="_blank" rel="noreferrer"
        style={{ color: 'inherit', transition: 'color 0.15s', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
        title="Live Demo"
      >
        <ExternalIcon /> Live
      </a>
    )}
  </div>
);

const ProjectsPage = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const featured = PROJECTS.filter(p => p.featured);
  const others = PROJECTS.filter(p => !p.featured);

  return (
    <div className="content-section animate-fade-in" style={{ paddingTop: '2.5rem' }}>
      <h2 className="reveal" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bright)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--pink)' }}>#</span> Featured Projects
      </h2>
      <p className="reveal" style={{ color: 'var(--dim)', fontSize: '12px', marginBottom: '24px' }}>
        Real projects from my <a href="https://github.com/Ashik-Siddike" target="_blank" rel="noreferrer" style={{ color: 'var(--blue)' }}>GitHub (75+ repos)</a> — click to explore
      </p>

      {/* Featured */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
        {featured.map((p) => (
          <div key={p.title} className="reveal project-card" style={{ '--card-accent': p.accent }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: p.accent }}><FolderIcon /></span>
                <span style={{ fontSize: '10px', color: 'var(--dim)', background: 'rgba(255,255,255,0.04)', padding: '1px 8px', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  ⭐ Featured
                </span>
                {p.live && (
                  <span style={{ fontSize: '10px', color: 'var(--green)', background: 'rgba(78,201,176,0.1)', padding: '1px 8px', borderRadius: '3px', border: '1px solid rgba(78,201,176,0.2)' }}>
                    🌐 Live
                  </span>
                )}
              </div>
              <LinkRow github={p.github} live={p.live} />
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--bright)', marginBottom: '10px' }}>{p.title}</h3>
            <p style={{ color: 'var(--text)', fontSize: '12px', lineHeight: 1.8, marginBottom: '16px', maxWidth: '680px' }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {p.tech.map(t => (
                <span key={t} style={{ fontSize: '10px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.05)' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Other projects */}
      <h2 className="reveal" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bright)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--pink)' }}>#</span> Other Noteworthy Projects
      </h2>
      <p className="reveal" style={{ color: 'var(--dim)', fontSize: '12px', marginBottom: '20px' }}>More of my live projects on GitHub</p>
      <div className="projects-others-grid">
        {others.map(p => (
          <div key={p.title} className="reveal project-card" style={{ '--card-accent': p.accent, display: 'flex', flexDirection: 'column', height: '100%', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <span style={{ color: p.accent }}><FolderIcon /></span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                {p.live && <span style={{ fontSize: '9px', color: 'var(--green)', background: 'rgba(78,201,176,0.1)', padding: '1px 6px', borderRadius: '3px', border: '1px solid rgba(78,201,176,0.2)' }}>🌐 LIVE</span>}
                <LinkRow github={p.github} live={p.live} />
              </div>
            </div>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--bright)', marginBottom: '8px' }}>{p.title}</h3>
            <p style={{ color: 'var(--text)', fontSize: '11px', lineHeight: 1.75, flexGrow: 1 }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
              {p.tech.map(t => (
                <span key={t} style={{ fontSize: '10px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* View all repos link */}
      <div className="reveal" style={{ marginTop: '32px', textAlign: 'center' }}>
        <a href="https://github.com/Ashik-Siddike?tab=repositories" target="_blank" rel="noreferrer"
          className="btn-vscode btn-vscode-ghost"
          style={{ display: 'inline-flex' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View all 75+ repositories on GitHub
        </a>
      </div>
    </div>
  );
};

export default ProjectsPage;
