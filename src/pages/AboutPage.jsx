import React, { useEffect } from 'react';

const SKILLS = [
  { name: 'HTML5',        color: '#f97316', level: 95 },
  { name: 'CSS3',         color: '#38bdf8', level: 90 },
  { name: 'JavaScript',   color: '#facc15', level: 95 },
  { name: 'TypeScript',   color: '#38bdf8', level: 85 },
  { name: 'React.js',     color: '#4fc1ff', level: 95 },
  { name: 'Next.js',      color: '#cccccc', level: 90 },
  { name: 'Tailwind CSS', color: '#34d399', level: 95 },
  { name: 'Node.js',      color: '#22c55e', level: 90 },
  { name: 'Express.js',   color: '#6366f1', level: 85 },
  { name: 'Firebase',     color: '#f97316', level: 80 },
  { name: 'MongoDB',      color: '#22c55e', level: 90 },
  { name: 'PostgreSQL',   color: '#38bdf8', level: 75 },
  { name: 'Supabase',     color: '#34d399', level: 85 },
  { name: 'Photoshop',    color: '#4fc1ff', level: 90 },
  { name: 'Illustrator',  color: '#f97316', level: 80 },
  { name: 'Figma',        color: '#ff6fd8', level: 90 },
  { name: 'AI Workflows', color: '#ff6fd8', level: 95 },
  { name: 'Prompt Eng.',  color: '#a855f7', level: 95 },
  { name: 'n8n',          color: '#ff6fd8', level: 90 },
  { name: 'Git & GitHub', color: '#f97316', level: 90 },
  { name: 'Vercel',       color: '#cccccc', level: 85 },
  { name: 'Cloudinary',   color: '#38bdf8', level: 80 },
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
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', lineHeight: 1.85, background: 'var(--bg)', padding: '20px 0', overflowX: 'auto', display: 'flex' }}>
          {/* Gutter Column (Line Numbers) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: '12px', paddingLeft: '16px', color: 'var(--dim)', borderRight: '1px solid rgba(255, 255, 255, 0.03)', userSelect: 'none', width: '38px', flexShrink: 0 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => <div key={n}>{n}</div>)}
          </div>

          {/* Git Change Indicators Gutter */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '4px', flexShrink: 0, marginRight: '12px' }}>
            <div style={{ height: '22px' }} /> {/* line 1 */}
            <div style={{ height: '22px' }} /> {/* line 2 */}
            <div style={{ height: '22px', borderLeft: '3px solid var(--green)' }} /> {/* line 3 */}
            <div style={{ height: '22px', borderLeft: '3px solid var(--green)' }} /> {/* line 4 */}
            <div style={{ height: '22px' }} /> {/* line 5 */}
            <div style={{ height: '22px', borderLeft: '3px solid var(--red)' }} /> {/* line 6 */}
            <div style={{ height: '22px' }} /> {/* line 7 */}
            <div style={{ height: '22px' }} /> {/* line 8 */}
            <div style={{ height: '22px' }} /> {/* line 9 */}
            <div style={{ height: '22px', borderLeft: '3px solid var(--blue)' }} /> {/* line 10 */}
            <div style={{ height: '22px' }} /> {/* line 11 */}
            <div style={{ height: '22px' }} /> {/* line 12 */}
          </div>

          {/* Code lines */}
          <div style={{ flex: 1, paddingRight: '24px' }}>
            <div style={{ color: 'var(--gcm)', marginBottom: '8px' }}>{'// about_me.js — Md. Ashik Siddike'}</div>
            <div><span style={{ color: 'var(--purple)' }}>const</span> <span style={{ color: '#4fc1ff' }}>developer</span> <span style={{ color: 'var(--text)' }}>=</span> {'{'}</div>
            <div style={{ paddingLeft: '1.2rem' }}>
              <div><span style={{ color: '#facc15' }}>name</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#ce9178' }}>"Md. Ashik Siddike"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
              <div><span style={{ color: '#facc15' }}>role</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#ce9178' }}>"Full-Stack Developer & Graphic Designer"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
              <div><span style={{ color: '#facc15' }}>company</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#22c55e' }}>"Nexinity Web Solution"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
              <div><span style={{ color: '#facc15' }}>also</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#ce9178' }}>"Support Engineer @ City, University of London"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
              <div><span style={{ color: '#facc15' }}>email</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#ce9178' }}>"ashiksiddike@gmail.com"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
              <div><span style={{ color: '#facc15' }}>location</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#ce9178' }}>"Bangladesh"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
              <div><span style={{ color: '#facc15' }}>phone</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#ce9178' }}>"+880 1918 766033"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
              <div><span style={{ color: '#facc15' }}>portfolio</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#38bdf8' }}>"ashiksiddike.com"</span><span style={{ color: 'var(--dim)' }}>,</span></div>
              <div><span style={{ color: '#facc15' }}>openToWork</span><span style={{ color: 'var(--dim)' }}>:</span> <span style={{ color: '#22c55e' }}>true</span></div>
            </div>
            <div>{'}'}<span style={{ color: 'var(--dim)' }}>;</span></div>
          </div>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))', gap: '12px', maxWidth: '760px' }}>
          {SKILLS.map(({ name, color, level }) => (
            <div key={name} className="glass-panel tilt-card" style={{
              '--card-accent': color,
              padding: '12px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              cursor: 'default'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--bright)', fontFamily: 'JetBrains Mono, monospace' }}>{name}</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
                <div style={{ width: `${level}%`, height: '100%', background: color, borderRadius: '2px' }} />
              </div>
              <div style={{ fontSize: '9px', color: 'var(--dim)', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>{level}% Confidence</div>
            </div>
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

      {/* Credentials Grid */}
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem', maxWidth: '760px' }}>
        {/* Education */}
        <div style={{ padding: '18px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--bright)', marginBottom: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🎓 Education
          </h3>
          <ul style={{ paddingLeft: '0', margin: 0, listStyle: 'none', fontSize: '12.5px', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '12px', lineHeight: 1.6 }}>
            <li style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>Diploma in CST</span>
              <span style={{ fontSize: '11px', color: 'var(--bright)' }}>Jessore Polytechnic Institute</span>
              <span style={{ fontSize: '10.5px', color: 'var(--dim)' }}>2023 – 2027 (7th Sem)</span>
            </li>
            <li style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ color: '#22c55e', fontWeight: 700 }}>SSC (Vocational)</span>
              <span style={{ fontSize: '11px', color: 'var(--bright)' }}>Satkhira Govt. Tech. School</span>
              <span style={{ fontSize: '10.5px', color: 'var(--dim)' }}>2022 | GPA: 4.86</span>
            </li>
          </ul>
        </div>

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
                { lang: 'English', level: 'Conversational', color: '#38bdf8' },
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
