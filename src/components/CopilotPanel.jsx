import React, { useState, useRef, useEffect } from 'react';

/* ─── Knowledge Base ─── */
const KB = {
  about: {
    keywords: ['who', 'about', 'yourself', 'introduce', 'tell me about ashik', 'ashik', 'bio'],
    answer: `🚀 **Md. Ashik Siddike** is a high-performing **Full-Stack Web Developer** & **Graphic Designer** based in **Bangladesh**.\n\n💼 **Current Focus:**\n• **Full-Stack Developer** @ Nexinity Web Solution\n• **Support Engineer** @ City, University of London (Remote)\n\n🧠 Passionate about building automated systems, deploying high-performance applications, and crafting premium, pixel-perfect user experiences.`,
  },
  projects: {
    keywords: ['project', 'built', 'build', 'portfolio', 'work', 'made', 'created', 'app'],
    answer: `💻 **Ashik's Featured Projects:**\n\n⚙️ **Affiliate Automation System**\nPython automated marketing system scraping trends and generating AI review content.\n\n🎓 **Kids Gamified Platform**\nInteractive education web app using React, Tailwind, and Firebase.\n\n📈 **MERN SaaS Dashboard**\nAnalytics platform with real-time data visualisations.\n\n👉 *Select files from the explorer sidebar or open the **Projects** tab to view the live preview/simulations!*`,
  },
  experience: {
    keywords: ['experience', 'job', 'work history', 'career', 'employed', 'company', 'nexinity', 'university', 'london'],
    answer: `💼 **Professional Journey:**\n\n🟢 **Full-Stack Developer** | *Nexinity Web Solution*\nArchitecting production-ready applications with React, Next.js, Node.js, and MongoDB.\n\n🔵 **Support Engineer** | *City, University of London*\nDeveloping accessible and user-friendly web features with React/Tailwind for UK research projects.\n\n🟣 **Lead Automation Creator** | *Freelance*\nBuilding Python crawlers, Selenium scrapers, and n8n/Make automation loops.`,
  },
  skills: {
    keywords: ['skill', 'tech', 'stack', 'technology', 'language', 'framework', 'tool', 'know', 'use', 'speciali'],
    answer: `🛠 **Technical Expertise:**\n\n🔹 **Frontend:** React.js, Next.js, TypeScript, Tailwind CSS, shadcn/ui, GSAP\n🔹 **Backend:** Node.js, Express.js, FastAPI, REST APIs, Firebase\n🔹 **Databases:** MongoDB, PostgreSQL, Supabase, SQL\n🔹 **Automation:** Python, Selenium, BeautifulSoup, n8n, Make.com, Gemini/OpenAI API\n🔹 **Design:** Figma, Photoshop, Illustrator`,
  },
  contact: {
    keywords: ['contact', 'reach', 'email', 'phone', 'hire', 'message', 'connect', 'social'],
    answer: `📧 **Let's Connect!**\n\n📮 **Email:** [ashiksiddike@gmail.com](mailto:ashiksiddike@gmail.com)\n📞 **WhatsApp/Phone:** [+880 1918 766033](tel:+8801918766033)\n📍 **Location:** Bangladesh (Remote Worldwide)\n\n🔗 **Links:**\n• [GitHub](https://github.com/Ashik-Siddike)\n• [LinkedIn](https://linkedin.com/in/ashik-siddike)\n• [Portfolio](https://ashiksiddike.com)\n\n💬 Or submit a direct message in the **Contact** page!`,
  },
  certifications: {
    keywords: ['certif', 'course', 'study', 'education', 'degree', 'diploma', 'quran', 'mern', 'programming hero'],
    answer: `📜 **Certifications & Achievements:**\n\n🎓 **MERN Stack Development**\nProgramming Hero Academy — Professional certification in MongoDB, Express, React, and Node.\n\n📖 **Hafeez of the Holy Quran**\nFull Quran memorization with Tajweed and correct recitation.\n\n🧠 **AI Prompt Engineering**\nHands-on integration of LLMs, agentic workflows, and API architectures.`,
  },
  design: {
    keywords: ['design', 'graphic', 'logo', 'photoshop', 'illustrator', 'figma', 'poster', 'brand', 'creative'],
    answer: `🎨 **Creative & Graphic Design:**\n\nAshik brings **3+ years of freelance experience** with **50+ completed client branding systems**:\n\n✨ Logo & Brand Identity Systems\n✨ High-conversion UI/UX Mockups (Figma)\n✨ Social Media Visual Campaigns\n\n🛠 **Creative Tools:** Figma, Adobe Photoshop, Adobe Illustrator.`,
  },
  location: {
    keywords: ['locat', 'where', 'live', 'from', 'country', 'city', 'magura', 'bangladesh'],
    answer: `🌍 **Current Base:**\n\nAshik is based in **Bangladesh** 🇧🇩 and works fully remotely, collaborating across time zones with teams in the UK and worldwide.`,
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
  return `I'm Ashik's AI Copilot. Ask me about his:\n\n• **Background** ("Tell me about Ashik")\n• **Projects** ("What projects did he build?")\n• **Skills** ("What's his tech stack?")\n• **Experience** ("Tell me about his career")\n• **Contact** ("How can I reach him?")`;
};

/* Helper for inline markdown elements (bold, links, code) */
const parseInline = (text) => {
  if (!text) return '';
  
  const boldParts = text.split(/\*\*(.*?)\*\*/g);
  return boldParts.map((bPart, bIdx) => {
    const isBold = bIdx % 2 === 1;
    const codeParts = bPart.split(/`(.*?)`/g);
    
    const parsedCodeParts = codeParts.map((cPart, cIdx) => {
      const isCode = cIdx % 2 === 1;
      
      if (isCode) {
        return (
          <code key={cIdx} style={{
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '2px 5px',
            color: 'var(--yellow)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10.5px'
          }}>
            {cPart}
          </code>
        );
      }
      
      const linkParts = cPart.split(/\[(.*?)\]\((.*?)\)/g);
      if (linkParts.length > 1) {
        const elements = [];
        for (let i = 0; i < linkParts.length; i += 3) {
          elements.push(linkParts[i]);
          if (linkParts[i + 1] && linkParts[i + 2]) {
            elements.push(
              <a 
                key={i} 
                href={linkParts[i + 2]} 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  color: 'var(--blue)', 
                  textDecoration: 'none',
                  fontWeight: 600,
                  borderBottom: '1px dashed var(--blue)',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--bright)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--blue)'}
              >
                {linkParts[i + 1]}
              </a>
            );
          }
        }
        return elements;
      }
      
      return cPart;
    });
    
    if (isBold) {
      return (
        <strong key={bIdx} style={{ color: 'var(--bright)', fontWeight: 700 }}>
          {parsedCodeParts}
        </strong>
      );
    }
    return parsedCodeParts;
  });
};

/* Sophisticated Markdown parsing */
const renderText = (text) => {
  if (!text) return null;
  
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
      const content = line.substring(2);
      return (
        <div key={idx} style={{ display: 'flex', gap: '8px', paddingLeft: '4px', margin: '4px 0', alignItems: 'flex-start' }}>
          <span style={{ color: '#a855f7', fontSize: '10px', marginTop: '4px' }}>✦</span>
          <span style={{ flex: 1 }}>{parseInline(content)}</span>
        </div>
      );
    }
    
    if (line.startsWith('> ')) {
      return (
        <blockquote key={idx} style={{
          borderLeft: '2px solid #a855f7',
          paddingLeft: '10px',
          margin: '8px 0',
          color: 'var(--dim)',
          fontStyle: 'italic'
        }}>
          {parseInline(line.substring(2))}
        </blockquote>
      );
    }
    
    if (line.startsWith('### ')) {
      return (
        <h4 key={idx} style={{ color: 'var(--bright)', fontSize: '13px', fontWeight: 700, margin: '10px 0 4px 0' }}>
          {parseInline(line.substring(4))}
        </h4>
      );
    }
    if (line.startsWith('## ') || line.startsWith('# ')) {
      const headingText = line.startsWith('## ') ? line.substring(3) : line.substring(2);
      return (
        <h3 key={idx} style={{ color: 'var(--bright)', fontSize: '14px', fontWeight: 800, margin: '12px 0 6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px' }}>
          {parseInline(headingText)}
        </h3>
      );
    }
    
    if (line.startsWith('```')) {
      return null;
    }
    
    if (line.trim() === '') {
      return <div key={idx} style={{ height: '8px' }} />;
    }
    
    return (
      <p key={idx} style={{ margin: '0 0 6px 0', padding: 0 }}>
        {parseInline(line)}
      </p>
    );
  });
};

const Bubble = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '14px',
      gap: '8px',
      alignItems: 'flex-start',
    }}>
      {!isUser && (
        <div style={{
          width: '24px', height: '24px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c3aed, #c084fc)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', flexShrink: 0,
          boxShadow: '0 2px 8px rgba(124, 58, 237, 0.4)',
          color: 'white',
          marginTop: '2px'
        }}>✦</div>
      )}
      <div 
        className={!isUser ? "glass-panel" : ""}
        style={{
          maxWidth: '82%',
          padding: '10px 14px',
          borderRadius: isUser ? '14px 14px 2px 14px' : '2px 14px 14px 14px',
          background: isUser ? 'rgba(34,197,94,0.09)' : 'rgba(20, 20, 25, 0.35)',
          border: isUser ? '1px solid rgba(34,197,94,0.22)' : '1px solid var(--border)',
          fontSize: '12.5px', lineHeight: 1.65, color: 'var(--text)',
          boxShadow: isUser ? 'none' : '0 4px 12px -2px rgba(0, 0, 0, 0.25)',
        }}
      >
        {isUser ? msg.text : <div style={{ wordBreak: 'break-word' }}>{renderText(msg.text)}</div>}
      </div>
    </div>
  );
};

const TypingDots = () => (
  <div style={{ display: 'flex', gap: '4px', padding: '10px 14px', alignItems: 'center' }}>
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
              padding: '12px 14px 14px',
              borderTop: '1px solid var(--border)',
              background: 'var(--bg2)',
              flexShrink: 0,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '24px',
                padding: '6px 12px',
                transition: 'border-color 0.25s, box-shadow 0.25s',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
              }}
                onFocusCapture={e => {
                  e.currentTarget.style.borderColor = '#a855f7';
                  e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.3), 0 0 10px rgba(168,85,247,0.3)';
                }}
                onBlurCapture={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.3)';
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                  placeholder="Ask about Ashik's projects, skills..."
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    color: 'var(--text)', fontSize: '12.5px',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || typing}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: input.trim() && !typing ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : 'rgba(255,255,255,0.04)',
                    border: 'none',
                    cursor: input.trim() && !typing ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: input.trim() && !typing ? '#fff' : 'var(--dim)',
                    transition: 'all 0.2s',
                    boxShadow: input.trim() && !typing ? '0 2px 8px rgba(124, 58, 237, 0.4)' : 'none',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                  </svg>
                </button>
              </div>
              <div style={{ fontSize: '9px', color: 'var(--dim)', marginTop: '6px', textAlign: 'center', opacity: 0.6 }}>
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
