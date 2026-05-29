import React, { useEffect } from 'react';

const CAREER = [
  {
    date: '2025 - PRESENT',
    current: true,
    badge: 'CURRENT',
    role: 'Full-Stack Developer',
    company: 'Nexinity Web Solution',
    accentColor: '#22c55e',
    desc: 'Building and shipping full-stack web applications end-to-end — from crafting pixel-perfect UIs with React and Next.js to architecting robust REST APIs with Node.js, Express, and MongoDB. Collaborating on client projects, taking ownership of features, and pushing production-ready code.',
    tags: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Full-Stack']
  },
  {
    date: 'MAY 2025 - CURRENT',
    current: true,
    badge: 'REMOTE',
    role: 'Support Engineer (Web Development & Research)',
    company: "Dr. Sujit Biswas's Team · City, University of London",
    accentColor: '#38bdf8',
    desc: 'Developed and maintained responsive, accessible, and intuitive user interfaces using React JS and Tailwind CSS for educational platforms. Assisted with backend integration tasks including API integrations and Firebase BaaS data handling. Collaborated effectively across international time zones.',
    tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'Firebase', 'APIs', 'Collaboration']
  },
  {
    date: '2025 - PRESENT',
    current: true,
    badge: 'FREELANCE',
    role: 'Lead AI Automation Developer',
    company: 'Indie / Freelance Projects',
    accentColor: '#a855f7',
    desc: 'Designing and building scalable AI web automation systems, affiliate marketing pipelines, and web scrapers. Integrating advanced LLM agents (Google Gemini, OpenAI) and workflows via n8n and Make.com.',
    tags: ['Python', 'FastAPI', 'n8n', 'Make.com', 'PostgreSQL', 'Docker', 'Gemini API']
  },
  {
    date: '2022 - PRESENT · 3+ Years',
    current: false,
    badge: 'SELF-EMPLOYED',
    role: 'Freelance Graphic Designer & Web Creator',
    company: 'International Freelance Platforms',
    accentColor: '#f97316',
    desc: 'Delivered 50+ successful client design projects including logos, posters, banners, and digital marketing creatives. High proficiency in Photoshop, Illustrator, and Figma to craft user-centric layouts and social media assets.',
    tags: ['Photoshop', 'Illustrator', 'Figma', 'UI/UX Design', 'Branding', 'Vector Graphics']
  }
];

const WorkHistoryPage = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.05 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="experience-container animate-fade-in" style={{
      color: 'var(--text)',
      lineHeight: 1.9,
      maxWidth: '780px',
      margin: '0 auto',
      padding: '3rem 2rem 5rem 2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* File info and header */}
      <p style={{ color: 'var(--gcm)', fontSize: '13px', fontStyle: 'italic', marginBottom: '8px', fontFamily: 'JetBrains Mono, monospace' }}>
        // experience.ts — professional journey
      </p>
      
      <h1 className="font-display" style={{
        fontSize: '44px',
        fontWeight: 800,
        color: 'var(--bright)',
        letterSpacing: '-0.02em',
        marginBottom: '6px',
        lineHeight: 1.1
      }}>
        Experience
      </h1>

      <p style={{
        fontSize: '13px',
        color: 'var(--dim)',
        fontFamily: 'JetBrains Mono, monospace',
        marginBottom: '32px'
      }}>
        interface Career extends Timeline {'{}'}
      </p>

      {/* Vertical Timeline */}
      <div style={{
        borderLeft: '2px solid rgba(255,255,255,0.06)',
        paddingLeft: '6px',
        marginLeft: '4px'
      }}>
        {CAREER.map((item, index) => (
          <div
            key={index}
            className="reveal"
            style={{ position: 'relative', paddingLeft: '28px', marginBottom: '48px' }}
          >
            {/* Timeline Dot with glow */}
            <span style={{
              position: 'absolute',
              left: '-7px',
              top: '10px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: item.accentColor || (item.current ? '#38bdf8' : '#444'),
              boxShadow: item.current ? `0 0 14px ${item.accentColor || '#38bdf8'}` : 'none',
              border: `2px solid ${item.current ? item.accentColor || '#38bdf8' : '#333'}`,
              zIndex: 2
            }} />

            {/* Date + Badge Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '11px',
                color: 'var(--dim)',
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                {item.date}
              </span>
              {item.badge && (
                <span style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background: `${item.accentColor || '#38bdf8'}18`,
                  border: `1px solid ${item.accentColor || '#38bdf8'}44`,
                  color: item.accentColor || '#38bdf8',
                  textTransform: 'uppercase',
                }}>
                  {item.badge}
                </span>
              )}
            </div>

            {/* Role */}
            <div style={{
              fontSize: '21px',
              fontWeight: 800,
              color: 'var(--bright)',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              marginBottom: '4px'
            }}>
              {item.role}
            </div>

            {/* Company with accent color */}
            <div style={{
              fontSize: '13.5px',
              color: item.accentColor || 'var(--blue)',
              fontWeight: 600,
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span style={{
                display: 'inline-block',
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: item.accentColor || 'var(--blue)',
                flexShrink: 0
              }} />
              {item.company}
            </div>

            {/* Description */}
            <p style={{
              fontSize: '13.5px',
              color: 'var(--text)',
              marginBottom: '14px',
              lineHeight: 1.75,
              opacity: 0.85
            }}>
              {item.desc}
            </p>

            {/* Tech tags — colored per item */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {item.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: '10.5px',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    background: `${item.accentColor || '#38bdf8'}12`,
                    border: `1px solid ${item.accentColor || '#38bdf8'}30`,
                    color: item.accentColor || '#38bdf8',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkHistoryPage;
