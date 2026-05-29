import React, { useEffect } from 'react';

const SKILLS = [
  { name: 'HTML5',        color: '#f97316' },
  { name: 'CSS3',         color: '#38bdf8' },
  { name: 'JavaScript',   color: '#facc15' },
  { name: 'TypeScript',   color: '#38bdf8' },
  { name: 'React.js',     color: '#4fc1ff' },
  { name: 'Next.js',      color: '#cccccc' },
  { name: 'Tailwind CSS', color: '#34d399' },
  { name: 'Node.js',      color: '#22c55e' },
  { name: 'Express.js',   color: '#6366f1' },
  { name: 'Firebase',     color: '#f97316' },
  { name: 'MongoDB',      color: '#22c55e' },
  { name: 'PostgreSQL',   color: '#38bdf8' },
  { name: 'Supabase',     color: '#34d399' },
  { name: 'Photoshop',    color: '#4fc1ff' },
  { name: 'Illustrator',  color: '#f97316' },
  { name: 'Figma',        color: '#ff6fd8' },
  { name: 'AI Workflows', color: '#ff6fd8' },
  { name: 'Prompt Eng.',  color: '#a855f7' },
  { name: 'n8n',          color: '#ff6fd8' },
  { name: 'Git & GitHub', color: '#f97316' },
  { name: 'Vercel',       color: '#cccccc' },
  { name: 'Cloudinary',   color: '#38bdf8' },
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

      {/* Code block — about_me.js */}
      <div className="reveal" style={{
        marginBottom: '2.5rem',
        borderRadius: '10px',
        border: '1px solid var(--border)',
        background: 'var(--bg2)',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
        maxWidth: '760px'
      }}>
        {/* Window chrome */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 16px', background: 'var(--title)',
          borderBottom: '1px solid var(--border)', userSelect: 'none'
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
          </div>
          <div style={{ fontSize: '11px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: '#facc15' }}>📄</span>
            <span>about_me.js</span>
          </div>
          <div style={{ width: '38px' }} />
        </div>

        {/* Code content */}
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', lineHeight: 1.85, background: 'var(--bg)', padding: '20px 24px', overflowX: 'auto' }}>
          <div style={{ color: 'var(--gcm)', marginBottom: '8px' }}>{'// about_me.js — Md. Ashik Siddike'}</div>
          <div><span style={{ color: 'var(--purple)' }}>const</span> <span style={{ color: '#4fc1ff' }}>developer</span> <span style={{ color: 'var(--text)' }}>=</span> {'{'}</div>
          <div style={{ paddingLeft: '1.5rem' }}>
            <div><span style={{ color: '#facc15' }}>name</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#ce9178' }}>"Md. Ashik Siddike"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: '#facc15' }}>role</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#ce9178' }}>"Full-Stack Developer & Graphic Designer"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: '#facc15' }}>company</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#22c55e' }}>"Nexinity Web Solution"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: '#facc15' }}>also</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#ce9178' }}>"Support Engineer @ City, University of London"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: '#facc15' }}>email</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#ce9178' }}>"ashiksiddike@gmail.com"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: '#facc15' }}>location</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#ce9178' }}>"Magura 7632, Bangladesh"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: '#facc15' }}>phone</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#ce9178' }}>"+880 1918 766033"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: '#facc15' }}>portfolio</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#38bdf8' }}>"ashiksiddike.com"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
            <div><span style={{ color: '#facc15' }}>openToWork</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#22c55e' }}>true</span></div>
          </div>
          <div>{'}'}<span style={{ color: 'var(--dim)' }}>;</span></div>
        </div>
      </div>

      {/* Bio */}
      <div className="reveal" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bright)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#ff6fd8' }}>#</span> About Me
        </h2>
        <div style={{ color: 'var(--text)', lineHeight: 1.9, fontSize: '13.5px', maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p>
            Hey! I'm <span style={{ color: 'var(--bright)', fontWeight: 600 }}>Md. Ashik Siddike</span> — a motivated and passionate <span style={{ color: '#22c55e', fontWeight: 600 }}>Full-Stack Developer</span> currently working at <span style={{ color: '#22c55e', fontWeight: 600 }}>Nexinity Web Solution</span>, and also serving as a <span style={{ color: '#38bdf8', fontWeight: 600 }}>Support Engineer</span> for <span style={{ color: '#38bdf8' }}>Dr. Sujit Biswas's research team at City, University of London</span>. I have a strong foundation in both frontend and backend technologies, and I bridge the gap between creative visual design and powerful technical implementation.
          </p>
          <p>
            I specialize in crafting rich user experiences using <span style={{ color: '#4fc1ff' }}>React.js</span>, <span style={{ color: '#4fc1ff' }}>TypeScript</span>, and <span style={{ color: '#34d399' }}>Tailwind CSS</span>, integrated with robust backends like <span style={{ color: '#22c55e' }}>Node.js / Express</span> and databases like <span style={{ color: '#22c55e' }}>MongoDB</span>. I'm eager to explore advanced tools including AI-integrated workflows and dedicated to building real-world applications.
          </p>
          <p>
            Parallelly, I have over <span style={{ color: '#facc15' }}>3+ years of freelance experience in graphic design</span>, delivering 50+ logos, flyers, banners, and branding systems. I love prompt engineering and leveraging AI to ship products in record time.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="reveal" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bright)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#ff6fd8' }}>#</span> Tech Stack
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '760px' }}>
          {SKILLS.map(({ name, color }) => (
            <span key={name} style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '5px 12px',
              background: `${color}0e`,
              border: `1px solid ${color}28`,
              borderRadius: '5px', fontSize: '12px', color,
              fontFamily: 'JetBrains Mono, monospace',
              transition: 'all 0.15s ease',
              cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `${color}20`; e.currentTarget.style.borderColor = `${color}50`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${color}0e`; e.currentTarget.style.borderColor = `${color}28`; }}
            >
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* What I Build */}
      <div className="reveal" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bright)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#ff6fd8' }}>#</span> What I Build
        </h2>
        <div className="about-build-grid" style={{ maxWidth: '760px' }}>
          {[
            { icon: '🌐', title: 'Full-Stack Web Apps', desc: 'React / Next.js frontends with Node.js APIs and MongoDB backends', color: '#22c55e' },
            { icon: '🤖', title: 'AI Automation', desc: 'Python bots, n8n workflows, affiliate pipelines, LLM agent integration', color: '#a855f7' },
            { icon: '🎓', title: 'EdTech Platforms', desc: 'Kids learning apps and interactive educational tools (City UoL team)', color: '#38bdf8' },
            { icon: '🎨', title: 'Graphic Design', desc: 'Logos, branding, social media creatives — 50+ client projects delivered', color: '#f97316' },
          ].map(({ icon, title, desc, color }) => (
            <div key={title}
              style={{ padding: '16px 18px', background: `${color}06`, border: `1px solid ${color}20`, borderRadius: '8px', transition: 'all 0.2s ease', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}45`; e.currentTarget.style.background = `${color}10`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}20`; e.currentTarget.style.background = `${color}06`; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color, marginBottom: '5px' }}>{title}</div>
              <div style={{ fontSize: '11.5px', color: 'var(--dim)', lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Languages */}
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: '760px' }}>
        {/* Certifications */}
        <div style={{ padding: '18px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--bright)', marginBottom: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            📜 Certifications
          </h3>
          <ul style={{ paddingLeft: '0', margin: 0, listStyle: 'none', fontSize: '12.5px', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '12px', lineHeight: 1.6 }}>
            <li style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>MERN Stack Development</span>
              <span style={{ fontSize: '11px', color: 'var(--dim)' }}>Programming Hero Academy</span>
            </li>
            <li style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ color: '#facc15', fontWeight: 700 }}>Hafeez of the Holy Quran</span>
              <span style={{ fontSize: '11px', color: 'var(--dim)' }}>Full Quran memorization & Tajweed</span>
            </li>
            <li style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ color: '#ff6fd8', fontWeight: 700 }}>AI Prompt Engineering</span>
              <span style={{ fontSize: '11px', color: 'var(--dim)' }}>Hands-on AI workflows & LLM prompting</span>
            </li>
          </ul>
        </div>

        {/* Languages & Soft Skills */}
        <div style={{ padding: '18px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--bright)', marginBottom: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🗣️ Languages & Skills
          </h3>

          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '7px' }}>Languages</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { lang: 'Bengali', level: 'Native', color: '#22c55e' },
                { lang: 'Arabic', level: 'Quranic', color: '#facc15' },
                { lang: 'English', level: 'Basic', color: '#38bdf8' },
              ].map(({ lang, level, color }) => (
                <span key={lang} style={{ fontSize: '10.5px', padding: '3px 9px', borderRadius: '20px', background: `${color}10`, border: `1px solid ${color}30`, color }}>
                  {lang} <span style={{ opacity: 0.6 }}>({level})</span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '7px' }}>Soft Skills</div>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {['Communication', 'Teamwork', 'Problem Solving', 'Time Management', 'Self-Learning'].map(s => (
                <span key={s} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '3px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--dim)' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
