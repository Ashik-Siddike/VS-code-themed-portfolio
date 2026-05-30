import React, { useState, useRef, useEffect } from 'react';

/* ─── Knowledge Base ─── */
const KB = {
  about: {
    keywords: ['who', 'about', 'yourself', 'introduce', 'tell me about ashik', 'ashik', 'bio'],
    answer: `I'm **Md. Ashik Siddike** — a motivated Full-Stack Web Developer and Graphic Designer based in **Bangladesh**.\n\nCurrently working as a **Full-Stack Developer at Nexinity Web Solution** and also as a **Support Engineer** for Dr. Sujit Biswas's team at City, University of London (remote).\n\nPassionate about building real-world applications, mastering modern tech stacks, and adapting quickly in a fast-paced environment. 🚀`,
  },
  projects: {
    keywords: ['project', 'built', 'build', 'portfolio', 'work', 'made', 'created', 'app'],
    answer: `Here are some of Ashik's notable projects:\n\n🌐 **Affiliate Automation System** — AI pipeline using Python, n8n & Gemini API\n\n📚 **Kids Learning Platform** — EdTech app with React.js & Firebase (City UoL team)\n\n🛍 **MERN E-Commerce App** — Full-stack with Node.js, Express, MongoDB & React\n\n🤖 **AI Web Scraper** — Python + Selenium + BeautifulSoup automation\n\n🎨 **50+ Graphic Design Projects** — Logos, branding, posters for international clients\n\n👉 Check the **Projects** tab for full details!`,
  },
  experience: {
    keywords: ['experience', 'job', 'work history', 'career', 'employed', 'company', 'nexinity', 'university', 'london'],
    answer: `Ashik's professional journey:\n\n🟢 **Full-Stack Developer** @ Nexinity Web Solution *(2025 – Present)*\nBuilding end-to-end web apps with React, Next.js, Node.js & MongoDB.\n\n🔵 **Support Engineer** @ Dr. Sujit Biswas's Team · City, University of London *(May 2025 – Present · Remote)*\nBuilding accessible UIs with React & Tailwind for educational platforms.\n\n🟣 **Lead AI Automation Developer** @ Freelance *(2025 – Present)*\nAI pipelines, web scrapers, LLM agent integrations.\n\n🟠 **Freelance Graphic Designer** *(2022 – Present · 3+ Years)*\n50+ completed design projects for international clients.`,
  },
  skills: {
    keywords: ['skill', 'tech', 'stack', 'technology', 'language', 'framework', 'tool', 'know', 'use', 'speciali'],
    answer: `Ashik's tech stack:\n\n**Frontend:** React.js, Next.js, TypeScript, Tailwind CSS, shadcn/ui, HTML5, CSS3\n\n**Backend:** Node.js, Express.js, FastAPI, REST APIs, Firebase\n\n**Databases:** MongoDB, PostgreSQL, Supabase, SQL\n\n**AI & Automation:** Gemini API, OpenAI API, n8n, Make.com, LangChain, RAG Pipelines\n\n**Design:** Adobe Photoshop, Illustrator, Figma\n\n**Tools:** Git, Docker, Vercel, Cloudinary, VS Code\n\n📊 Check the **Skills** tab for proficiency bars!`,
  },
  contact: {
    keywords: ['contact', 'reach', 'email', 'phone', 'hire', 'message', 'connect', 'social'],
    answer: `You can reach Ashik through:\n\n📧 **Email:** ashiksiddike@gmail.com\n📞 **Phone:** +880 1918 766033\n📍 **Location:** Bangladesh\n\n🔗 **Profiles:**\n• GitHub: github.com/Ashik-Siddike\n• LinkedIn: linkedin.com/in/ashik-siddike\n• Portfolio: ashiksiddike.com\n\n💬 Or use the **Contact** tab to send a direct message!`,
  },
  certifications: {
    keywords: ['certif', 'course', 'study', 'education', 'degree', 'diploma', 'quran', 'mern', 'programming hero'],
    answer: `Ashik's certifications:\n\n📜 **MERN Stack Development** — Programming Hero Academy\n\n📖 **Hafeez of the Holy Quran** — Full Quran memorization with Tajweed\n\n🤖 **AI Prompt Engineering** — Hands-on AI workflows & LLM prompting\n\nCurrently expanding skills in AI Agents, System Design, DevOps & Vector Databases.`,
  },
  design: {
    keywords: ['design', 'graphic', 'logo', 'photoshop', 'illustrator', 'figma', 'poster', 'brand', 'creative'],
    answer: `Ashik is also an experienced **Freelance Graphic Designer** with 3+ years and **50+ completed client projects**!\n\n🎨 **Services include:**\n• Logo & Brand Identity Design\n• Social Media Creatives & Banners\n• Poster & Flyer Design\n• Digital Marketing Visuals\n• Figma UI/UX Mockups\n\n🛠 **Tools:** Adobe Photoshop, Illustrator, Figma`,
  },
  location: {
    keywords: ['locat', 'where', 'live', 'from', 'country', 'city', 'magura', 'bangladesh'],
    answer: `Ashik is based in **Bangladesh** 🇧🇩\n\nWorks fully remotely as a Support Engineer for City, University of London and collaborates across time zones. Open to remote opportunities globally! 🌍`,
  },
};

const QUICK = [
  { label: 'Tell me about Ashik?' },
  { label: 'What projects has Ashik built?' },
  { label: 'Tell me about his work experience' },
  { label: "What's his tech stack?" },
  { label: 'How can I contact Ashik?' },
  { label: 'His certifications?' },
];

const getAnswer = (input) => {
  const low = input.toLowerCase();
  for (const key of Object.keys(KB)) {
    if (KB[key].keywords.some(kw => low.includes(kw))) return KB[key].answer;
  }
  return `I'm Ashik's Copilot. Try asking:\n\n• "Tell me about Ashik"\n• "What projects has he built?"\n• "What's his tech stack?"\n• "How can I contact him?"`;
};

/* Markdown-like bold + newline renderer */
const renderText = (text) =>
  text.split('\n').map((line, li) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={li}>
        {parts.map((p, pi) =>
          pi % 2 === 1
            ? <strong key={pi} style={{ color: 'var(--bright)', fontWeight: 700 }}>{p}</strong>
            : <span key={pi}>{p}</span>
        )}
        <br />
      </span>
    );
  });

const Bubble = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '10px',
      gap: '7px',
      alignItems: 'flex-end',
    }}>
      {!isUser && (
        <div style={{
          width: '22px', height: '22px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #6d28d9, #a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', flexShrink: 0,
        }}>✦</div>
      )}
      <div style={{
        maxWidth: '84%',
        padding: '8px 11px',
        borderRadius: isUser ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
        background: isUser ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)',
        border: isUser ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(255,255,255,0.06)',
        fontSize: '12px', lineHeight: 1.7, color: 'var(--text)',
      }}>
        {isUser ? msg.text : renderText(msg.text)}
      </div>
    </div>
  );
};

const TypingDots = () => (
  <div style={{ display: 'flex', gap: '4px', padding: '8px 12px', alignItems: 'center' }}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        width: '5px', height: '5px', borderRadius: '50%',
        background: '#a855f7', display: 'inline-block',
        animation: `cp-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
      }} />
    ))}
  </div>
);

/* ─── Main Panel — renders as part of the layout grid ─── */
const CopilotPanel = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const send = async (text) => {
    const userText = text.trim();
    if (!userText) return;

    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');
    setShowQuick(false);
    setTyping(true);

    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      setTyping(false);
      if (data.success && data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: getAnswer(userText) }]);
      }
    } catch (err) {
      setTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', text: getAnswer(userText) }]);
    }
  };

  return (
    <>
      <style>{`
        @keyframes cp-bounce {
          0%,80%,100% { transform:translateY(0); opacity:.4; }
          40% { transform:translateY(-5px); opacity:1; }
        }
        .cp-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          background: var(--bg2);
          border-left: 1px solid var(--border);
          width: ${open ? '320px' : '0'};
          min-width: ${open ? '320px' : '0'};
          max-width: ${open ? '320px' : '0'};
          transition: width 0.25s cubic-bezier(0.4,0,0.2,1),
                      min-width 0.25s cubic-bezier(0.4,0,0.2,1),
                      max-width 0.25s cubic-bezier(0.4,0,0.2,1);
          overflow: hidden;
          flex-shrink: 0;
        }
        .cp-panel-inner {
          width: 320px;
          height: 100%;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }
      `}</style>

      <div className="cp-panel">
        {open && (
          <div className="cp-panel-inner">

            {/* ── VS Code style tab header ── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '35px',
              borderBottom: '1px solid var(--border)',
              background: 'var(--bg2)',
              flexShrink: 0,
              paddingRight: '8px',
            }}>
              {/* Tab label — looks like a VS Code tab */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '0 14px',
                  height: '100%',
                  borderRight: '1px solid var(--border)',
                  borderBottom: '1px solid var(--blue2, #007acc)',
                  background: 'var(--bg)',
                  fontSize: '12px',
                  color: 'var(--text)',
                  cursor: 'default',
                  userSelect: 'none',
                  position: 'relative',
                }}>
                  {/* Active tab bottom accent */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '1px',
                    background: '#a855f7',
                  }} />
                  <span style={{
                    width: '16px', height: '16px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6d28d9, #a855f7)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9px',
                    flexShrink: 0,
                    boxShadow: '0 0 6px #a855f755',
                  }}>✦</span>
                  <span style={{ whiteSpace: 'nowrap' }}>Ashik's AI Assistant</span>
                </div>
              </div>

              {/* Icon buttons — edit + close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <button
                  onClick={() => { setMessages([]); setShowQuick(true); }}
                  title="New chat"
                  style={{
                    width: '22px', height: '22px', borderRadius: '4px',
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', color: 'var(--dim)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.12s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'var(--text)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--dim)'; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  title="Close"
                  style={{
                    width: '22px', height: '22px', borderRadius: '4px',
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', color: 'var(--dim)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', transition: 'all 0.12s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'var(--text)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--dim)'; }}
                >✕</button>
              </div>
            </div>

            {/* ── Workspace badge ── */}
            <div style={{
              padding: '7px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span style={{
                fontSize: '9.5px',
                color: 'var(--dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontFamily: 'system-ui',
              }}>WORKSPACE</span>
              <span style={{
                fontSize: '10px',
                padding: '1px 8px',
                borderRadius: '20px',
                background: 'rgba(34,197,94,0.07)',
                border: '1px solid rgba(34,197,94,0.18)',
                color: '#22c55e',
                fontFamily: 'JetBrains Mono, monospace',
                display: 'inline-flex', alignItems: 'center', gap: '4px',
              }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                portfolio · ashik-siddike
              </span>
            </div>

            {/* ── Chat messages ── */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '16px 12px',
              display: 'flex', flexDirection: 'column',
            }}>
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px 10px 12px' }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '50%', margin: '0 auto 12px',
                    background: 'linear-gradient(135deg, #6d28d9, #a855f7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px',
                    boxShadow: '0 0 24px #a855f740',
                  }}>✦</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--bright)', marginBottom: '6px' }}>
                    Hi! I'm Ashik's Copilot 👋
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--dim)', lineHeight: 1.65 }}>
                    Ask me anything about his projects, skills, experience, or achievements.
                  </div>
                </div>
              )}

              {/* Quick chips */}
              {showQuick && messages.length === 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px', marginTop: '6px' }}>
                  {QUICK.map(q => (
                    <button key={q.label} onClick={() => send(q.label)} style={{
                      padding: '8px 10px', borderRadius: '6px', textAlign: 'left',
                      background: 'rgba(168,85,247,0.04)',
                      border: '1px solid rgba(168,85,247,0.16)',
                      color: 'var(--text)', fontSize: '11px', lineHeight: 1.4,
                      cursor: 'pointer', transition: 'all 0.14s ease',
                      display: 'flex', gap: '5px',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.1)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.32)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.04)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.16)'; }}
                    >
                      <span style={{ color: '#a855f7', fontSize: '9px', marginTop: '1px', flexShrink: 0 }}>✦</span>
                      {q.label}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => <Bubble key={i} msg={msg} />)}

              {typing && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '7px', marginBottom: '10px' }}>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6d28d9, #a855f7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0,
                  }}>✦</div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px 12px 12px 3px' }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* ── Input ── */}
            <div style={{
              padding: '10px 12px 12px',
              borderTop: '1px solid var(--border)',
              background: 'var(--bg2)',
              flexShrink: 0,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                background: 'var(--bg)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px', padding: '5px 8px',
              }}
                onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'}
                onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                  placeholder="Ask about Ashik's projects, skills..."
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    color: 'var(--text)', fontSize: '12px',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || typing}
                  style={{
                    width: '26px', height: '26px', borderRadius: '6px', flexShrink: 0,
                    background: input.trim() && !typing ? '#a855f7' : 'rgba(255,255,255,0.04)',
                    border: 'none',
                    cursor: input.trim() && !typing ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: input.trim() && !typing ? '#fff' : 'var(--dim)',
                    transition: 'all 0.14s',
                    boxShadow: input.trim() && !typing ? '0 0 8px #a855f755' : 'none',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                  </svg>
                </button>
              </div>
              <div style={{ fontSize: '9px', color: 'var(--dim)', marginTop: '5px', textAlign: 'center', opacity: 0.6 }}>
                AI can make mistakes · Contact Ashik directly for important info
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default CopilotPanel;
