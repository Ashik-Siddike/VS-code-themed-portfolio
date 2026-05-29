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
    color: '#0a66c2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/ashik.siddike.01',
    detail: 'Connect on Facebook',
    color: '#1877f2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter (X)',
    url: 'https://twitter.com/AshikSiddike',
    detail: 'Follow @AshikSiddike',
    color: '#1da1f2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@ashiksiddike',
    detail: 'Read technical writeups',
    color: '#00ab6c',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm12.75 3.7c.074.073.084.186.024.27a.23.23 0 0 1-.22.1h-.03l-2.61-.83-.02-.01-2.14.67h-.03a.23.23 0 0 1-.22-.1.21.21 0 0 1 .02-.27l1.7-1.62-1.7-5.06c-.03-.09 0-.19.07-.25a.23.23 0 0 1 .25-.01l2.4 1.25 1.9-1.25c.08-.05.18-.05.25.01.07.06.1.16.07.25l-1.67 5.06 1.97 1.86zm1.1-5.16a.22.22 0 0 1 .22.04l2.43 2.3c.08.08.09.21.02.29a.23.23 0 0 1-.21.09h-.03l-2.45-.78v-1.94zm2.4 3.74v1.23c0 .12-.1.22-.22.22h-.03l-2.15-.68v-.77l2.4.23z"/>
      </svg>
    ),
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/Ashik-Siddike',
    detail: 'Solve algorithms',
    color: '#ffa116',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.102 17.93l-2.69 2.607c-.466.451-1.211.451-1.677 0l-4.51-4.37c-.466-.451-.466-1.174 0-1.625l2.69-2.607 6.187 5.995zm4.253-4.12l-6.702-6.495 1.623-1.572c.466-.451 1.211-.451 1.677 0l4.51 4.37c.466.452.466 1.174 0 1.626l-1.108 1.071zm-9.988-2.651L3.665 4.664c-.466-.451-1.211-.451-1.677 0L.31 6.236c-.466.451-.466 1.174 0 1.625l6.702 6.495-1.623 1.572c-.466.451-1.211.451-1.677 0l-2.256-2.186L0 15.116l3.095 3.002c.932.903 2.423.903 3.355 0l6.702-6.495-2.65-2.564z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/ashik_siddike',
    detail: '@ashik_siddike',
    color: '#e1306c',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@AshikSiddike',
    detail: 'Tech & Dev content',
    color: '#ff0000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.163c-.272-.98-1.04-1.748-2.02-2.02C19.616 3.65 12 3.65 12 3.65s-7.617 0-9.478.493c-.98.272-1.748 1.04-2.02 2.02C0 8.024 0 12 0 12s0 3.976.502 5.837c.272.98 1.04 1.748 2.02 2.02C4.383 20.35 12 20.35 12 20.35s7.617 0 9.478-.493c.98-.272 1.748-1.04 2.02-2.02C24 15.976 24 12 24 12s0-3.976-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:ashiksiddike@gmail.com',
    detail: 'ashiksiddike@gmail.com',
    color: '#ea4335',
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
    <div className="content-section animate-fade-in" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--bright)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--pink)' }}>#</span> Get In Touch
      </h2>
      <p style={{ color: 'var(--text)', fontSize: '13.5px', maxWidth: '580px', lineHeight: 1.8, marginBottom: '32px' }}>
        Have a project idea? Want to collaborate? Or just want to say hi? I'm always open to interesting conversations and new opportunities. Drop a message!
      </p>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Contact Form */}
        <div style={{ flex: '1 1 380px', minWidth: 0 }}>
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

        {/* Contact Info Grid */}
        <div style={{ flex: '1 1 300px', minWidth: '260px' }}>
          <div style={{ fontSize: '11.5px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '14px', fontWeight: 'bold' }}>Find Me Online</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
            {SOCIALS.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--dim)', textDecoration: 'none', transition: 'all 0.2s ease', padding: '8px 12px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.02)', background: 'rgba(255,255,255,0.01)' }}
                onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = `${s.color}33`; e.currentTarget.style.background = `${s.color}08`; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.02)'; e.currentTarget.style.background = 'rgba(255,255,255,0.01)'; e.currentTarget.style.transform = 'none'; }}
              >
                <span style={{ flexShrink: 0 }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '1px' }}>{s.detail}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Availability */}
          <div style={{ padding: '14px', background: 'rgba(78,201,176,0.04)', border: '1px solid rgba(78,201,176,0.15)', borderRadius: '6px', marginTop: '18px' }}>
            <div style={{ fontSize: '11px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Availability</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ec9b0', boxShadow: '0 0 6px #4ec9b0', flexShrink: 0, animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '12.5px', color: 'var(--green)', fontWeight: 600 }}>Open to Work</span>
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
