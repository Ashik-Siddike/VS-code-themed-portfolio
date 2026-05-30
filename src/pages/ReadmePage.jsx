import React from 'react';

const ReadmePage = () => {
  const stack = [
    ["Frontend",          ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "shadcn/ui"]],
    ["Backend & APIs",    ["Node.js", "Express.js", "REST APIs", "FastAPI", "Firebase BaaS"]],
    ["Databases",         ["MongoDB", "PostgreSQL", "Supabase", "SQL"]],
    ["AI & Automation",   ["Gemini API", "OpenAI API", "LangChain", "n8n", "Make.com", "Prompt Engineering", "RAG Pipelines"]],
    ["Graphic Design",    ["Adobe Photoshop", "Illustrator", "Figma", "UI/UX Design", "Branding"]],
    ["Tools & DevOps",    ["Git & GitHub", "Docker", "Vercel", "Cloudinary", "Chrome DevTools", "VS Code"]],
  ];

  const badges = [
    ["⚛", "React / Next.js",  "#38bdf8"],
    ["🟢", "Full-Stack Dev",   "#22c55e"],
    ["🔷", "TypeScript",       "#4fc1ff"],
    ["🤖", "AI Automation",   "#a855f7"],
    ["🎨", "Graphic Design",   "#f97316"],
    ["🛠", "n8n / Make.com",   "#ff6fd8"],
  ];

  const highlights = [
    ["🏢", "Currently at",     "Full-Stack Developer @ Nexinity Web Solution"],
    ["🔬", "Also",             "Support Engineer for Dr. Sujit Biswas · City, University of London (Remote)"],
    ["🤖", "Building",         "AI automations, affiliate pipelines, and LLM-powered web apps"],
    ["🎨", "3+ Years",         "Freelance graphic design — 50+ completed client projects"],
    ["📜", "Certified in",     "MERN Stack (Programming Hero), AI Prompt Engineering"],
    ["✨", "Passionate about", "Shipping clean code, learning fast, and building in public"],
  ];

  return (
    <div className="readme-container animate-fade-in" style={{
      color: 'var(--text)',
      lineHeight: 1.9,
      maxWidth: '800px',
      margin: '0 auto',
      padding: '3rem 2rem 5rem 2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* File header bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <span style={{ fontSize: '18px' }}>📖</span>
        <span style={{ fontSize: '12px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace' }}>README.md › Preview</span>
        <span style={{ marginLeft: 'auto', fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e' }}>● Live</span>
      </div>

      {/* Heading */}
      <h1 className="font-display" style={{
        fontSize: '42px', fontWeight: 800,
        color: 'var(--bright)', letterSpacing: '-0.02em',
        marginBottom: '4px', lineHeight: 1.1
      }}>
        Ashik Siddike 👋
      </h1>

      <p style={{ fontSize: '14px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace', marginBottom: '20px' }}>
        Full-Stack Developer & AI Automation Builder
      </p>

      {/* Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
        {badges.map(([icon, label, color]) => (
          <span key={label} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
            background: `${color}10`, border: `1px solid ${color}30`, color,
            fontWeight: 600,
          }}>
            {icon} {label}
          </span>
        ))}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />

      {/* About Section */}
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--bright)', letterSpacing: '-0.01em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>💜</span> About Me
      </h2>
      <p style={{ fontSize: '14px', marginBottom: '20px', color: 'var(--text)', lineHeight: 1.85 }}>
        Hey! I'm <strong style={{ color: 'var(--bright)' }}>Md. Ashik Siddike</strong> — a motivated and passionate full-stack web developer and graphic designer. Currently working as a <strong style={{ color: '#22c55e' }}>Full-Stack Developer at Nexinity Web Solution</strong> and as a <strong style={{ color: '#38bdf8' }}>Support Engineer for Dr. Sujit Biswas's team at City, University of London</strong>. With 75+ GitHub repos, I love shipping products fast, building AI-powered tools, and delivering clean, accessible UIs.
      </p>

      {/* Highlights list */}
      <ul style={{ listStyleType: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
        {highlights.map(([icon, prefix, text], idx) => (
          <li key={idx} style={{ fontSize: '13.5px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
            <span>
              <strong style={{ color: 'var(--bright)', fontWeight: 600 }}>{prefix}:</strong>{' '}
              <span style={{ color: 'var(--text)', opacity: 0.85 }}>{text}</span>
            </span>
          </li>
        ))}
      </ul>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '28px 0' }} />

      {/* Stack Table */}
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--bright)', letterSpacing: '-0.01em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🛠️</span> Stack & Technologies
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {stack.map(([category, items]) => (
          <div key={category} style={{
            display: 'flex', flexWrap: 'wrap', gap: '6px',
            alignItems: 'baseline', padding: '10px 14px',
            borderRadius: '6px', background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            <span style={{
              color: '#facc15', fontWeight: 700, minWidth: '150px',
              fontSize: '11px', display: 'inline-block',
              fontFamily: 'JetBrains Mono, monospace',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>{category}</span>
            <span style={{ color: 'var(--dim)', marginRight: '4px', fontFamily: 'JetBrains Mono' }}>›</span>
            <span style={{ color: 'var(--text)', fontSize: '13px', opacity: 0.85 }}>{items.join(' · ')}</span>
          </div>
        ))}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '28px 0' }} />

      {/* Quick Stats */}
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--bright)', letterSpacing: '-0.01em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>📊</span> Quick Stats
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {[
          { val: '75+', label: 'GitHub Repos', color: '#22c55e' },
          { val: '3+',  label: 'Years Experience', color: '#38bdf8' },
          { val: '50+', label: 'Design Projects', color: '#f97316' },
          { val: '2',   label: 'Current Roles', color: '#a855f7' },
          { val: '3',   label: 'Certifications', color: '#facc15' },
        ].map(({ val, label, color }) => (
          <div key={label} style={{ padding: '12px 18px', borderRadius: '8px', background: `${color}0a`, border: `1px solid ${color}25`, textAlign: 'center', minWidth: '90px' }}>
            <div style={{ fontSize: '22px', fontWeight: 800, color, fontFamily: 'Syne, sans-serif' }}>{val}</div>
            <div style={{ fontSize: '10px', color: 'var(--dim)', marginTop: '2px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Contact row */}
      <div style={{ marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        {[
          { href: 'mailto:ashiksiddike@gmail.com', label: '📧 ashiksiddike@gmail.com', color: '#ea4335' },
          { href: 'https://github.com/Ashik-Siddike', label: '🐙 Ashik-Siddike', color: '#f0f6fc' },
          { href: 'https://linkedin.com/in/ashik-siddike', label: '💼 ashik-siddike', color: '#0a66c2' },
          { href: 'https://ashiksiddike.com', label: '🌐 ashiksiddike.com', color: '#22c55e' },
        ].map(({ href, label, color }) => (
          <a key={href} href={href} target="_blank" rel="noreferrer" style={{
            fontSize: '12px', padding: '4px 12px', borderRadius: '5px',
            background: `${color}0d`, border: `1px solid ${color}25`, color,
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px',
            transition: 'all 0.15s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = `${color}1a`; e.currentTarget.style.borderColor = `${color}50`; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${color}0d`; e.currentTarget.style.borderColor = `${color}25`; }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ReadmePage;
