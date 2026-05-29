import React, { useState } from 'react';

const SOCIALS = [
  {
    name: 'GitHub',
    url: 'https://github.com/Ashik-Siddike',
    detail: '@Ashik-Siddike • 75+ repos',
    color: '#cccccc',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/ashik-siddike',
    detail: 'Connect professionally',
    color: '#4fc1ff',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:ashiksiddike@gmail.com',
    detail: 'ashiksiddike@gmail.com',
    color: '#4ec9b0',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="content-section animate-fade-in" style={{ paddingTop: '2.5rem' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bright)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--pink)' }}>#</span> Get In Touch
      </h2>
      <p style={{ color: 'var(--dim)', fontSize: '12px', maxWidth: '540px', lineHeight: 1.8, marginBottom: '32px' }}>
        Have a project idea? Want to collaborate? Or just want to say hi? I'm always open to interesting conversations and new opportunities. Drop a message!
      </p>

      <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
        {/* Contact Form */}
        <div style={{ flex: '1 1 360px', minWidth: 0 }}>
          {sent ? (
            <div style={{
              padding: '28px', background: 'rgba(78,201,176,0.06)',
              border: '1px solid rgba(78,201,176,0.2)', borderRadius: '8px',
              textAlign: 'center', animation: 'fadeIn 0.3s ease',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>✅</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--green)', marginBottom: '6px' }}>Message Sent!</div>
              <div style={{ fontSize: '12px', color: 'var(--dim)' }}>Thanks for reaching out, Ashik will get back to you soon.</div>
              <button className="btn-vscode btn-vscode-ghost" style={{ marginTop: '18px' }} onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--dim)', display: 'block', marginBottom: '5px' }}>
                    <span style={{ color: 'var(--pink)' }}>name</span>: string
                  </label>
                  <input className="contact-input" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--dim)', display: 'block', marginBottom: '5px' }}>
                    <span style={{ color: 'var(--pink)' }}>email</span>: string
                  </label>
                  <input className="contact-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--dim)', display: 'block', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--pink)' }}>subject</span>: string
                </label>
                <input className="contact-input" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" required />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--dim)', display: 'block', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--pink)' }}>message</span>: string
                </label>
                <textarea className="contact-input" name="message" value={form.message} onChange={handleChange} placeholder="Your message here..." rows={6} style={{ resize: 'none' }} required />
              </div>
              <button type="submit" className="btn-vscode btn-vscode-primary" disabled={loading}
                style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s' }}
              >
                {loading ? (
                  <><span className="animate-blink">_</span> Sending...</>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div style={{ flex: '0 0 220px', minWidth: '180px' }}>
          {/* Quick links */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '11px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '14px' }}>Find Me Online</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SOCIALS.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--dim)', textDecoration: 'none', transition: 'color 0.15s', padding: '8px 12px', borderRadius: '5px', border: '1px solid transparent', background: 'rgba(255,255,255,0.02)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = `${s.color}33`; e.currentTarget.style.background = `${s.color}0d`; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                >
                  <span style={{ flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>{s.name}</div>
                    <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '1px' }}>{s.detail}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div style={{ padding: '14px', background: 'rgba(78,201,176,0.06)', border: '1px solid rgba(78,201,176,0.2)', borderRadius: '5px' }}>
            <div style={{ fontSize: '11px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Availability</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ec9b0', boxShadow: '0 0 6px #4ec9b0', flexShrink: 0, animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '12px', color: 'var(--green)', fontWeight: 600 }}>Open to Work</span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--dim)', lineHeight: 1.6, margin: 0 }}>
              Available for freelance projects, collaborations, and full-time opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
