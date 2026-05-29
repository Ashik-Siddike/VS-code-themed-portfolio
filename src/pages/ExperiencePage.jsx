import React, { useEffect, useRef } from 'react';

// Skill bar component with animated fill
const SkillBar = ({ name, pct, color }) => {
  const barRef = useRef(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.width = `${pct}%`;
        io.disconnect();
      }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [pct]);

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text)', fontFamily: 'JetBrains Mono, monospace' }}>{name}</span>
        <span style={{ fontSize: '10px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace' }}>{pct}%</span>
      </div>
      <div style={{ height: '2px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
        <div
          ref={barRef}
          style={{
            height: '100%', width: '0%', borderRadius: '2px',
            background: `linear-gradient(to right, ${color}cc, ${color})`,
            transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>
    </div>
  );
};

const SKILL_GROUPS = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', pct: 85, color: '#facc15' }, // Yellow
      { name: 'TypeScript', pct: 78, color: '#38bdf8' }, // Sky Blue
      { name: 'Python',     pct: 82, color: '#ff6fd8' }, // Pink
      { name: 'HTML5',      pct: 90, color: '#f97316' }, // Orange
      { name: 'CSS3',       pct: 88, color: '#38bdf8' }, // Sky Blue
    ],
  },
  {
    title: 'Frontend Frameworks',
    skills: [
      { name: 'React.js',      pct: 85, color: '#38bdf8' }, // Sky Blue
      { name: 'Next.js',       pct: 82, color: '#a855f7' }, // Purple
      { name: 'Tailwind CSS',  pct: 92, color: '#34d399' }, // Mint Green
      { name: 'shadcn/ui',     pct: 80, color: '#facc15' }, // Yellow
      { name: 'GSAP Animations',pct: 70, color: '#ff6fd8' }, // Pink
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Node.js',       pct: 78, color: '#22c55e' }, // Green
      { name: 'Express.js',    pct: 80, color: '#6366f1' }, // Indigo
      { name: 'Firebase BaaS', pct: 84, color: '#f97316' }, // Orange
      { name: 'REST APIs',     pct: 85, color: '#38bdf8' }, // Sky Blue
      { name: 'FastAPI',       pct: 70, color: '#34d399' }, // Mint Green
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB',      pct: 75, color: '#22c55e' }, // Green
      { name: 'Supabase',     pct: 74, color: '#34d399' }, // Mint Green
      { name: 'PostgreSQL',   pct: 68, color: '#38bdf8' }, // Sky Blue
      { name: 'SQL Databases',pct: 70, color: '#a855f7' }, // Purple
    ],
  },
  {
    title: 'Graphic Design',
    skills: [
      { name: 'Adobe Photoshop',  pct: 92, color: '#38bdf8' }, // Sky Blue
      { name: 'Adobe Illustrator',pct: 88, color: '#f97316' }, // Orange
      { name: 'Figma UI/UX',      pct: 85, color: '#a855f7' }, // Purple
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub',        pct: 86, color: '#f97316' }, // Orange
      { name: 'Chrome DevTools',     pct: 85, color: '#38bdf8' }, // Sky Blue
      { name: 'AI Tools & Prompts',  pct: 90, color: '#ff6fd8' }, // Pink
      { name: 'VS Code',             pct: 95, color: '#38bdf8' }, // Sky Blue
    ],
  },
];

const ALSO_FAMILIAR = [
  'Selenium', 'BeautifulSoup', 'Pandas', 'NumPy', 'Docker',
  'Firebase', 'Cloudinary', 'Stripe', 'Webhooks', 'Socket.io',
  'LangGraph', 'Vector DBs', 'RAG Pipelines', 'Prompt Engineering',
];

const ExperiencePage = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.05 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="content-section animate-fade-in" style={{ paddingTop: '2rem', maxWidth: '960px' }}>

      {/* Header */}
      <div className="reveal" style={{ marginBottom: '8px' }}>
        <div style={{ color: 'var(--gcm)', fontSize: '12px', marginBottom: '6px', fontFamily: 'JetBrains Mono, monospace' }}>
          // skills.json — tech stack & tools I actually use
        </div>
        <h1 className="font-display" style={{ fontSize: '36px', fontWeight: 800, color: 'var(--bright)', marginBottom: '6px' }}>
          Skills
        </h1>
        <div style={{ fontSize: '12px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace' }}>
          {'{ "status": "always_learning", "passion": "immeasurable" }'}
        </div>
      </div>

      <div className="reveal skills-groups-grid">
        {SKILL_GROUPS.map(({ title, skills }) => (
          <div key={title}>
            <div style={{
              fontSize: '11px', fontWeight: 700,
              color: 'var(--dim)', textTransform: 'uppercase',
              letterSpacing: '0.15em', marginBottom: '14px',
            }}>
              {title}
            </div>
            {skills.map(s => <SkillBar key={s.name} {...s} />)}
          </div>
        ))}
      </div>

      {/* Also Familiar With */}
      <div className="reveal" style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
        <div style={{
          fontSize: '11px', fontWeight: 700,
          color: 'var(--dim)', textTransform: 'uppercase',
          letterSpacing: '0.15em', marginBottom: '14px',
        }}>
          Also Familiar With
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {ALSO_FAMILIAR.map(name => (
            <span key={name} style={{
              fontSize: '11px', color: 'var(--text)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '3px 10px', borderRadius: '5px',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Currently Learning */}
      <div className="reveal" style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>
          Currently Learning
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { name: 'LangGraph / AI Agents', color: '#4ec9b0' },
            { name: 'System Design',         color: '#4fc1ff' },
            { name: 'DevOps / CI-CD',        color: '#dcdcaa' },
            { name: 'Vector Databases',      color: '#ff6fd8' },
            { name: 'RAG Pipelines',         color: '#c586c0' },
          ].map(({ name, color }) => (
            <span key={name} style={{
              fontSize: '11px', color,
              background: `${color}0f`,
              border: `1px solid ${color}33`,
              padding: '4px 12px', borderRadius: '20px',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              📚 {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
