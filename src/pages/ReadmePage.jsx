import React from 'react';

const ReadmePage = () => {
  const stack = [
    ["Languages", ["Python", "TypeScript", "JavaScript", "SQL", "HTML/CSS", "Java"]],
    ["Frameworks & Libraries", ["Next.js", "React", "Node.js", "FastAPI", "Express"]],
    ["Automation", ["n8n", "Make.com", "Python bots", "Scraping", "Playwright", "Selenium"]],
    ["AI / APIs", ["Gemini AI", "OpenAI API", "LangChain", "Vector Databases", "RAG"]],
    ["Databases & DevOps", ["PostgreSQL", "MongoDB", "Prisma", "Git", "Docker", "Vercel", "Supabase"]]
  ];

  const badges = [
    ["🐍", "Python", "#4ec9b0"],
    ["⚛", "React / Next.js", "#4fc1ff"],
    ["🔷", "TypeScript", "#3178c6"],
    ["⚡", "AI Automation", "#ff6fd8"],
    ["🛠", "n8n / Make", "#c586c0"]
  ];

  return (
    <div className="readme-container animate-fade-in" style={{
      color: 'var(--text)',
      lineHeight: 1.9,
      maxWidth: '780px',
      margin: '0 auto',
      padding: '3rem 2rem 5rem 2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Markdown Document Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
        <span style={{ fontSize: '20px', color: 'var(--blue)' }}>📖</span>
        <span style={{ fontSize: '13px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace' }}>README.md &gt; Preview</span>
      </div>

      <h1 className="font-display" style={{
        fontSize: '44px',
        fontWeight: 800,
        color: 'var(--bright)',
        letterSpacing: '-0.02em',
        marginBottom: '6px',
        lineHeight: 1.1
      }}>
        Ashik Siddike 👋
      </h1>
      
      <p style={{
        fontSize: '14.5px',
        color: 'var(--dim)',
        fontFamily: 'JetBrains Mono, monospace',
        marginBottom: '22px'
      }}>
        Full-Stack Developer &amp; AI Automation Builder · Dhaka, Bangladesh
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        {badges.map(([icon, label, color]) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[12px] border"
            style={{
              background: `${color}10`,
              borderColor: `${color}33`,
              color: color,
              fontWeight: 500
            }}
          >
            {icon} {label}
          </span>
        ))}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />

      {/* About */}
      <h2 className="text-[19px] font-bold mt-6 mb-3" style={{ color: 'var(--bright)', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>💜</span> About Me
      </h2>
      <p style={{ fontSize: '14px', marginBottom: '22px', color: 'var(--text)', lineHeight: 1.8 }}>
        Hey! I'm Ashik Siddike — a full-stack developer and AI automation builder passionate about creating tools that solve real-world problems. With 75+ GitHub repositories, I love shipping products fast, optimizing workflows, and building in public.
      </p>

      <ul className="space-y-3.5" style={{ listStyleType: 'none', paddingLeft: '4px' }}>
        {[
          ["🔭", "Currently building", "scalable AI automations, affiliate software, and SaaS products"],
          ["🤖", "Integrating APIs", "like Google Gemini and OpenAI for production applications and AI agents"],
          ["⚡", "Specializing in", "Next.js / TypeScript web apps and Python-powered scraping bots"],
          ["✨", "Believer in", "shipping quickly, writing clean code, and learning through building"]
        ].map(([icon, prefix, text], idx) => (
          <li key={idx} className="text-[13.5px] flex items-start gap-2.5">
            <span style={{ fontSize: '16px', marginTop: '1px' }}>{icon}</span>
            <span>
              <strong style={{ color: 'var(--bright)', fontWeight: 600 }}>{prefix}:</strong> {text}
            </span>
          </li>
        ))}
      </ul>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '32px 0' }} />

      {/* Stack */}
      <h2 className="text-[19px] font-bold mt-6 mb-4" style={{ color: 'var(--bright)', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🛠️</span> Stack &amp; Technologies
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {stack.map(([category, items]) => (
          <div key={category} style={{ fontSize: '13.5px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'baseline', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '8px' }}>
            <span style={{ color: 'var(--yellow)', fontWeight: 600, minWidth: '180px', display: 'inline-block', fontFamily: 'JetBrains Mono, monospace' }}>{category}:</span>
            <span style={{ color: 'var(--text)', flex: 1 }}>{items.join(" · ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadmePage;
