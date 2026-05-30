import React, { useEffect, useState } from 'react';

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

const LinkRow = ({ github, live, title, openInSimpleBrowser }) => (
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
    {live ? (
      openInSimpleBrowser ? (
        <button
          onClick={() => openInSimpleBrowser(live, title)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', transition: 'color 0.15s', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontFamily: 'inherit' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
          title="Open in Simple Browser"
        >
          <ExternalIcon /> Live
        </button>
      ) : (
        <a href={live} target="_blank" rel="noreferrer"
          style={{ color: 'inherit', transition: 'color 0.15s', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
          title="Live Demo"
        >
          <ExternalIcon /> Live
        </a>
      )
    ) : (
      openInSimpleBrowser && (
        <button
          onClick={() => openInSimpleBrowser('', title)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', transition: 'color 0.15s', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontFamily: 'inherit' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--yellow)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
          title="Run script simulation"
        >
          ⚡ Run
        </button>
      )
    )}
  </div>
);

const FALLBACK_PROJECTS = [
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
  }
];

const ProjectsPage = ({ openInSimpleBrowser }) => {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(err => {
        console.error("Error fetching projects from API, using fallback data:", err);
      });
  }, []);

  // Filter projects based on search query and selected category
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
    let matchesCategory = true;
    if (selectedCategory === 'Full Stack') {
      matchesCategory = p.tech.some(t => ['Next.js', 'React', 'TypeScript', 'Node.js', 'HTML/CSS', 'Tailwind CSS'].includes(t));
    } else if (selectedCategory === 'AI & Automation') {
      matchesCategory = p.tech.some(t => ['Gemini AI', 'n8n', 'Make.com', 'AI APIs', 'Automation'].includes(t));
    } else if (selectedCategory === 'Python Scripts') {
      matchesCategory = p.tech.some(t => ['Python'].includes(t));
    }
    
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    if (loading) return;
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [loading, filteredProjects]);

  const featured = filteredProjects.filter(p => p.featured);
  const others = filteredProjects.filter(p => !p.featured);

  if (loading) return <div style={{ color: 'var(--dim)', padding: '2.5rem' }}>Loading projects...</div>;

  return (
    <div className="content-section animate-fade-in" style={{ paddingTop: '2.5rem' }}>
      <h2 className="reveal" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bright)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--pink)' }}>#</span> Projects Portfolio
      </h2>
      <p className="reveal" style={{ color: 'var(--dim)', fontSize: '12px', marginBottom: '20px' }}>
        Real projects from my <a href="https://github.com/Ashik-Siddike" target="_blank" rel="noreferrer" style={{ color: 'var(--blue)' }}>GitHub (75+ repos)</a> — search or filter by technology below.
      </p>

      {/* Search and Filters Section */}
      <div className="reveal" style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
          <input
            type="text"
            placeholder="🔍 Search projects by name, description, or tech..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              background: 'var(--bg2)',
              color: 'var(--text)',
              fontSize: '13px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--blue)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--dim)',
                cursor: 'pointer',
                fontSize: '12px',
                padding: '4px'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', paddingBottom: '4px' }}>
          {['All', 'Full Stack', 'AI & Automation', 'Python Scripts'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                background: selectedCategory === cat ? 'rgba(79,193,255,0.15)' : 'rgba(255,255,255,0.02)',
                color: selectedCategory === cat ? 'var(--blue)' : 'var(--dim)',
                border: '1px solid ' + (selectedCategory === cat ? 'rgba(79,193,255,0.3)' : 'rgba(255,255,255,0.05)'),
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: selectedCategory === cat ? 'bold' : 'normal'
              }}
              onMouseEnter={e => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = 'rgba(79,193,255,0.2)';
                  e.currentTarget.style.color = 'var(--bright)';
                }
              }}
              onMouseLeave={e => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = 'var(--dim)';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Projects Title if featured list exists */}
      {featured.length > 0 && (
        <h2 className="reveal" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--bright)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--blue)' }}>★</span> Featured Projects
        </h2>
      )}

      {/* Featured */}
      {featured.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
          {featured.map((p) => (
            <div key={p._id || p.title} className="reveal project-card project-featured-card glass-panel tilt-card" style={{ '--card-accent': p.accent, cursor: 'pointer' }} onClick={() => setSelectedProject(p)}>
              {p.image ? (
                <div className="project-featured-img-container">
                  <img src={p.image} alt={p.title} className="project-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div className="project-featured-img-container" style={{ background: `linear-gradient(135deg, ${p.accent}0a 0%, ${p.accent}1c 100%)`, border: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: p.accent, fontSize: '36px', opacity: 0.8 }}><FolderIcon /></span>
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--dim)', background: 'rgba(255,255,255,0.04)', padding: '1px 8px', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.07)' }}>
                        ⭐ Featured
                      </span>
                      {p.live && (
                        <span style={{ fontSize: '10px', color: 'var(--green)', background: 'rgba(78,201,176,0.1)', padding: '1px 8px', borderRadius: '3px', border: '1px solid rgba(78,201,176,0.2)' }}>
                          🌐 Live
                        </span>
                      )}
                    </div>
                    <div onClick={e => e.stopPropagation()}>
                      <LinkRow github={p.github} live={p.live} title={p.title} openInSimpleBrowser={openInSimpleBrowser} />
                    </div>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--bright)', marginBottom: '10px' }}>{p.title}</h3>
                  <p style={{ color: 'var(--text)', fontSize: '12px', lineHeight: 1.8, marginBottom: '16px' }}>{p.desc}</p>
                </div>
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {p.tech.map(t => (
                      <span key={t} style={{ fontSize: '10px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.05)' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                    View Project Details <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Other projects */}
      {others.length > 0 ? (
        <>
          <h2 className="reveal" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bright)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--pink)' }}>#</span> Other Noteworthy Projects
          </h2>
          <p className="reveal" style={{ color: 'var(--dim)', fontSize: '12px', marginBottom: '20px' }}>More of my live projects on GitHub</p>
          <div className="projects-others-grid">
            {others.map(p => (
              <div key={p._id || p.title} className="reveal project-card project-other-card glass-panel tilt-card" style={{ '--card-accent': p.accent, display: 'flex', flexDirection: 'column', height: '100%', padding: '18px', cursor: 'pointer' }} onClick={() => setSelectedProject(p)}>
                {p.image ? (
                  <div style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '4px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <img src={p.image} alt={p.title} className="project-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{ width: '100%', height: '140px', background: `linear-gradient(135deg, ${p.accent}05, ${p.accent}12)`, border: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', marginBottom: '12px' }}>
                    <span style={{ color: p.accent, fontSize: '24px', opacity: 0.8 }}><FolderIcon /></span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ color: p.accent }}><FolderIcon /></span>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }} onClick={e => e.stopPropagation()}>
                    {p.live && <span style={{ fontSize: '9px', color: 'var(--green)', background: 'rgba(78,201,176,0.1)', padding: '1px 6px', borderRadius: '3px', border: '1px solid rgba(78,201,176,0.2)' }}>🌐 LIVE</span>}
                    <LinkRow github={p.github} live={p.live} title={p.title} openInSimpleBrowser={openInSimpleBrowser} />
                  </div>
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--bright)', marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ color: 'var(--text)', fontSize: '11px', lineHeight: 1.75, flexGrow: 1, marginBottom: '12px' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontSize: '10px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace' }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', marginTop: 'auto' }}>
                  View Details <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {filteredProjects.length === 0 && (
        <div className="reveal in" style={{ padding: '3rem', textAlign: 'center', background: 'var(--bg2)', border: '1px dashed var(--border)', borderRadius: '8px', color: 'var(--dim)', margin: '20px 0' }}>
          <span style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}>🔍</span>
          No projects found matching "<strong>{searchTerm}</strong>"{selectedTag !== 'All' && <span> with technology <strong>{selectedTag}</strong></span>}.
        </div>
      )}

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

      {/* Details Modal */}
      {selectedProject && (
        <div style={modalOverlayStyle} onClick={() => setSelectedProject(null)}>
          <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={modalHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: selectedProject.accent }} />
                <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--bright)', margin: 0 }}>{selectedProject.title}</h2>
              </div>
              <button className="close-modal-btn" style={closeBtnStyle} onClick={() => setSelectedProject(null)}>✕</button>
            </div>

            {/* Modal Body */}
            <div style={modalBodyStyle} className="thin-scroll">
              {/* Banner Image or Gradient */}
              {selectedProject.image ? (
                <div style={{ width: '100%', height: '220px', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px', border: '1px solid var(--border)' }}>
                  <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div style={{ width: '100%', height: '140px', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px', background: `linear-gradient(135deg, ${selectedProject.accent}10, ${selectedProject.accent}20)`, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: selectedProject.accent, fontSize: '40px' }}><FolderIcon /></span>
                </div>
              )}

              {/* Short Description */}
              <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.8, marginBottom: '20px' }}>
                {selectedProject.desc}
              </p>

              {/* Detailed Description */}
              {selectedProject.longDesc && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={sectionTitleStyle}>Description</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                    {selectedProject.longDesc}
                  </p>
                </div>
              )}

              {/* How It Works */}
              {selectedProject.howItWorks && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={sectionTitleStyle}>How It Works</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                    {selectedProject.howItWorks}
                  </p>
                </div>
              )}

              {/* How to Use */}
              {selectedProject.usage && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={sectionTitleStyle}>How to Use / Run</h3>
                  <pre style={{
                    background: 'var(--bg2)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '12px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '11px',
                    color: 'var(--yellow)',
                    whiteSpace: 'pre-wrap',
                    overflowX: 'auto',
                    lineHeight: 1.6
                  }}>{selectedProject.usage}</pre>
                </div>
              )}

              {/* Tech Stack */}
              <div style={{ marginBottom: '10px' }}>
                <h3 style={sectionTitleStyle}>Technologies Used</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedProject.tech.map(t => (
                    <span key={t} style={{
                      fontSize: '10px',
                      color: 'var(--bright)',
                      fontFamily: 'JetBrains Mono, monospace',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '4px 10px',
                      borderRadius: '4px'
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer / Actions */}
            <div style={modalFooterStyle}>
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="modal-action-btn" style={{ ...modalBtnStyle, background: 'var(--bg3)', border: '1px solid var(--border)' }}>
                    <GitHubIcon /> View Source Code
                  </a>
                )}
                {selectedProject.live ? (
                  openInSimpleBrowser ? (
                    <button 
                      onClick={() => {
                        openInSimpleBrowser(selectedProject.live, selectedProject.title);
                        setSelectedProject(null);
                      }} 
                      className="modal-action-btn" 
                      style={{ ...modalBtnStyle, background: 'var(--blue2)', color: 'white', fontWeight: 'bold', border: 'none' }}
                    >
                      <ExternalIcon /> Open in Simple Browser
                    </button>
                  ) : (
                    <a href={selectedProject.live} target="_blank" rel="noreferrer" className="modal-action-btn" style={{ ...modalBtnStyle, background: 'var(--blue2)', color: 'white', fontWeight: 'bold' }}>
                      <ExternalIcon /> Open Live Demo
                    </a>
                  )
                ) : (
                  openInSimpleBrowser && (
                    <button 
                      onClick={() => {
                        openInSimpleBrowser('', selectedProject.title);
                        setSelectedProject(null);
                      }} 
                      className="modal-action-btn" 
                      style={{ ...modalBtnStyle, background: 'var(--blue2)', color: 'white', fontWeight: 'bold', border: 'none' }}
                    >
                      ⚡ Run Script Simulation
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styled styles block */}
      <style>{`
        .project-card {
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease !important;
        }
        .project-card:hover {
          transform: translateY(-5px) scale(1.01) !important;
          border-color: var(--card-accent) !important;
          box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.7), 0 0 18px -4px var(--card-accent) !important;
        }
        .project-featured-card {
          display: flex;
          flex-direction: row;
          gap: 24px;
          align-items: stretch;
        }
        .project-featured-img-container {
          width: 280px;
          height: 180px;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 4px;
          align-self: center;
        }
        .project-card-img {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-card:hover .project-card-img {
          transform: scale(1.06);
        }
        .project-other-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .close-modal-btn {
          transition: color 0.2s, background-color 0.2s;
        }
        .close-modal-btn:hover {
          color: var(--bright) !important;
          background: rgba(255,255,255,0.08);
        }
        .modal-action-btn {
          transition: filter 0.2s, transform 0.1s;
        }
        .modal-action-btn:hover {
          filter: brightness(1.15);
        }
        .modal-action-btn:active {
          transform: scale(0.98);
        }
        @media (max-width: 768px) {
          .project-featured-card {
            flex-direction: column;
            align-items: stretch;
          }
          .project-featured-img-container {
            width: 100%;
            height: 160px;
            margin-bottom: 8px;
          }
        }
      `}</style>
    </div>
  );
};

// Modal Styles
const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.75)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '20px',
  animation: 'fadeIn 0.2s ease-out'
};

const modalContentStyle = {
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '680px',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
  animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
  borderBottom: '1px solid var(--border)',
  background: 'var(--bg2)'
};

const closeBtnStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--dim)',
  fontSize: '16px',
  cursor: 'pointer',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  width: '28px',
  height: '28px'
};

const modalBodyStyle = {
  padding: '20px',
  overflowY: 'auto',
  flex: 1
};

const sectionTitleStyle = {
  fontSize: '11px',
  fontWeight: 'bold',
  color: 'var(--bright)',
  marginBottom: '10px',
  borderBottom: '1px solid var(--border)',
  paddingBottom: '4px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const modalFooterStyle = {
  padding: '16px 20px',
  borderTop: '1px solid var(--border)',
  background: 'var(--bg2)',
  display: 'flex',
  justifyContent: 'flex-end'
};

const modalBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '10px 16px',
  borderRadius: '6px',
  fontSize: '13px',
  color: 'var(--text)',
  cursor: 'pointer',
  flex: 1,
  textDecoration: 'none'
};

export default ProjectsPage;
