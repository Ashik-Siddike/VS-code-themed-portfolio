import React from 'react';

const ReadmePage = () => {
  const stack = [
    ["Languages", ["Python", "TypeScript", "JavaScript", "SQL", "HTML/CSS", "Java"]],
    ["Frameworks & Libraries", ["Next.js", "React", "Node.js", "FastAPI", "Express"]],
    ["Automation", ["n8n", "Make.com", "Python bots", "Scraping"]],
    ["AI / APIs", ["Gemini AI", "OpenAI API", "LangChain"]],
    ["Databases & DevOps", ["PostgreSQL", "MongoDB", "Prisma", "Git", "Docker", "Vercel"]]
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
      {/* Title */}
      <h1 className="font-display" style={{
        fontSize: '44px',
        fontWeight: 800,
        color: 'var(--bright)',
        letterSpacing: '-0.02em',
        marginBottom: '8px',
        lineHeight: 1.1
      }}>
        Ashik Siddike
      </h1>
      
      {/* Subtitle */}
      <p style={{
        fontSize: '14px',
        color: 'var(--dim)',
        fontFamily: 'JetBrains Mono, monospace',
        marginBottom: '20px'
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
              background: `${color}14`,
              borderColor: `${color}44`,
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
      <h2 className="text-[18px] font-bold mt-6 mb-3" style={{ color: 'var(--bright)', letterSpacing: '-0.01em' }}>
        💜 About Me
      </h2>
      <p style={{ fontSize: '14px', marginBottom: '20px', color: 'var(--text)' }}>
        Hey! I'm Ashik Siddike — a full-stack developer and AI automation builder passionate about creating tools that solve real-world problems. With 75+ GitHub repositories, I love shipping products fast, optimizing workflows, and building in public.
      </p>

      <ul className="pl-4 mb-6 space-y-3" style={{ listStyleType: 'none' }}>
        {[
          ["🔭", "Currently building", "scalable AI automations & affiliate software"],
          ["🤖", "Integrating APIs", "like Google Gemini and OpenAI for production applications"],
          ["⚡", "Specializing in", "Next.js / TypeScript web apps and Python-powered scraping bots"],
          ["✨", "Believer in", "shipping quickly and learning through building"]
        ].map(([icon, prefix, text], idx) => (
          <li key={idx} className="text-[13px] flex items-start gap-2.5">
            <span style={{ fontSize: '15px' }}>{icon}</span>
            <span>
              <strong style={{ color: 'var(--bright)', fontWeight: 600 }}>{prefix}</strong> {text}
            </span>
          </li>
        ))}
      </ul>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '32px 0' }} />

      {/* Stack */}
      <h2 className="text-[18px] font-bold mt-6 mb-4" style={{ color: 'var(--bright)', letterSpacing: '-0.01em' }}>
        🛠 Stack &amp; Technologies
      </h2>
      
      <div className="space-y-4">
        {stack.map(([category, items]) => (
          <div key={category} style={{ fontSize: '13px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'baseline' }}>
            <span style={{ color: 'var(--yellow)', fontWeight: 600, minWidth: '160px', display: 'inline-block' }}>{category}:</span>
            <span style={{ color: 'var(--dim)', flex: 1 }}>{items.join(" · ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadmePage;
