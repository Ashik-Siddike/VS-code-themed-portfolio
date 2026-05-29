import React, { useEffect } from 'react';

const CAREER = [
  {
    date: '2025 - Present',
    current: true,
    role: 'Lead AI Automation Developer',
    company: 'Freelance & Indie Projects',
    desc: 'Designing and building scalable AI web automation systems, affiliate marketing pipelines, and web scrapers. Integrating advanced LLM agents (Google Gemini, OpenAI) and workflows via n8n and Make.com.',
    tags: ['Python', 'FastAPI', 'Next.js', 'n8n', 'Make.com', 'PostgreSQL', 'Docker', 'Gemini API']
  },
  {
    date: '2024 - 2025',
    current: false,
    role: 'Full-Stack Developer Intern',
    company: 'Tech Solutions Ltd',
    desc: 'Developed responsive user interfaces using Next.js and Tailwind CSS. Implemented backend REST APIs in Node.js, managing database interactions through Prisma ORM with PostgreSQL.',
    tags: ['TypeScript', 'Next.js', 'React', 'Node.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Git']
  },
  {
    date: '2023 - 2024',
    current: false,
    role: 'Web Developer',
    company: 'IndieLabs Agency',
    desc: 'Built custom modern landing pages and interface components using vanilla HTML, CSS, and JavaScript. Assisted in SEO optimization, performance audits, and Git repository management.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'SEO', 'Responsive Design', 'Bootstrap', 'Git']
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
        borderLeft: '1px solid var(--border)',
        paddingLeft: '6px',
        marginLeft: '4px'
      }}>
        {CAREER.map((item, index) => (
          <div
            key={index}
            className={`reveal relative pl-6 mb-10 ${item.current ? 'tl-dot' : 'tl-dot-dim'}`}
            style={{ position: 'relative' }}
          >
            {/* Timeline Dot */}
            <span style={{
              position: 'absolute',
              left: '-10px',
              top: '8px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: item.current ? 'var(--blue)' : 'var(--border)',
              boxShadow: item.current ? '0 0 10px var(--blue)' : 'none',
              zIndex: 2
            }} />

            {/* Date */}
            <div style={{
              fontSize: '13px',
              color: 'var(--dim)',
              fontFamily: 'JetBrains Mono, monospace',
              marginBottom: '4px'
            }}>
              {item.date}
            </div>

            {/* Role */}
            <div style={{
              fontSize: '20px',
              fontWeight: 800,
              color: 'var(--bright)',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              marginBottom: '2px'
            }}>
              {item.role}
            </div>

            {/* Company */}
            <div style={{
              fontSize: '14px',
              color: 'var(--blue)',
              fontWeight: 500,
              marginBottom: '10px'
            }}>
              @ {item.company}
            </div>

            {/* Description */}
            <p style={{
              fontSize: '13.5px',
              color: 'var(--text)',
              marginBottom: '12px'
            }}>
              {item.desc}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-sm border"
                  style={{
                    background: 'rgba(0, 122, 204, 0.08)',
                    borderColor: 'rgba(0, 122, 204, 0.25)',
                    color: 'var(--blue)'
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
