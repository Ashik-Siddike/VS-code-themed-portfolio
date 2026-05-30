import React, { useState, useEffect, useRef } from 'react';

const AUTOMATION_GUIDE_MD = `# Automating Affiliate Content Generation with Python, Gemini AI, and n8n

### Published: May 2026 | Category: AI & Automation | Author: Md. Ashik Siddike

Over the past year, I have focused on automating affiliate marketing systems to remove the manual effort of niche discovery, article writing, and social media posting. By integrating Python, Gemini AI, and automation pipelines like n8n and Make.com, I created a hands-free content generation machine.

---

## 🛠️ The Pipeline Architecture

Below is a breakdown of how the automated scraper and posting engine works under the hood:

- **Niche Keyword Discovery**: A Python script queries trends and search volumes to find keywords with low competition.
- **Headless Scraper (ScrapingAnt)**: Pulls details, ratings, and pricing for Amazon products in real-time.
- **AI Generation (Gemini 1.5 Flash)**: Feeds product details into the model to draft structured, SEO-optimized reviews.
- **Visual Generation (Canvas Composer)**: Custom Python image engine creates visual cards comparing features.
- **n8n / Make Webhooks**: Dispatches metadata to social channels, publishing reviews directly.

---

## 💻 Python Core Snippet

Here is a simplified code snippet of the scraper utilizing custom rotation and ScrapingAnt headless calls:

\`\`\`python
import os
from scrapingant import ScrapingAntClient

client = ScrapingAntClient(token=os.getenv("SCRAPINGANT_KEY"))

def fetch_competitor_data(url):
    print(f"[*] Crawling target: {url}")
    # Rotate proxy geography to bypass Cloudflare
    result = client.general_request(
        url,
        proxy_country="us",
        browser=True
    )
    return result.content
\`\`\`

## 📈 Real-world Impact
By setting this up as a cron loop, the system posts automated reviews daily, driving organic search traffic and earning passive commissions without direct content management.
`;

const MERN_TIPS_MD = `# Production MERN Stack Performance & Security Optimization Guide

### Published: April 2026 | Category: Web Development | Author: Md. Ashik Siddike

Deploying a MERN (MongoDB, Express, React, Node) stack application to production requires more than setting \`NODE_ENV=production\`. Below are the essential optimization steps I implement across all client builds.

---

## 🚀 Backend & Database Optimizations

### 1. MongoDB Database Indexing
Queries without indexes trigger slow, resource-heavy collection scans. In mongoose, compile index paths:

\`\`\`javascript
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, index: true },
  createdAt: { type: Date, default: Date.now }
});

// Compound index for query matching
userSchema.index({ email: 1, createdAt: -1 });
\`\`\`

### 2. Rate Limiting and Security Headers
Protect API routes from brute-force requests and secure response headers using \`express-rate-limit\` and \`helmet\`:

\`\`\`javascript
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

app.use(helmet()); // Sets secure HTTP headers
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.'
}));
\`\`\`

---

## ⚡ Frontend Compilations

- **Vite Bundler**: Ensure lazy-loaded code-splitting for large route bundles using \`React.lazy()\` and \`Suspense\`.
- **API Proxy Routing**: Run clean relative requests \`/api/projects\` in dev proxy setups to ensure simple route configurations and eliminate CORS conflicts.
- **Client Cache Controls**: Utilize persistent React query caching or local storage validation to save redundant API roundtrips.

---

## 🔐 Production Readiness Checklist
- [x] Configure DB connection pool sizes
- [x] Rotate keys via cloud environment variables (never hardcoded)
- [x] Enable Gzip/Brotli compression in production servers
`;

// Helper component for Mac-like Code blocks with syntax highlights
const CarbonCodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: 'rgba(15, 15, 20, 0.65)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      overflow: 'hidden',
      margin: '20px 0',
      boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
    }} className="glass-panel">
      {/* Window Controls Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(255,255,255,0.015)'
      }}>
        {/* Apple macOS style Dots */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
        </div>
        <div style={{ fontSize: '11px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace' }}>
          {language || 'code'}
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '4px',
            color: 'var(--text)',
            fontSize: '10px',
            padding: '3px 8px',
            cursor: 'pointer',
            fontFamily: 'JetBrains Mono, monospace',
            transition: 'all 0.15s'
          }}
          onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.color = 'var(--bright)'; }}
          onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.color = 'var(--text)'; }}
        >
          {copied ? '✓ Copied' : '📄 Copy'}
        </button>
      </div>

      {/* Code window */}
      <pre style={{
        margin: 0,
        padding: '16px',
        overflowX: 'auto',
        fontSize: '12px',
        lineHeight: '1.65',
        fontFamily: 'JetBrains Mono, monospace',
        color: '#b5cea8'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const BlogPage = ({ activePage }) => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headings, setHeadings] = useState([]);
  
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  // Monitor viewport scrolling to calculate reading progress bar width
  const handleScroll = (e) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    setScrollProgress(0);
    if (activePage === 'blog_automation') {
      setBlogData({
        title: 'Automating Affiliate Content Generation with Python, Gemini AI, and n8n',
        content: AUTOMATION_GUIDE_MD,
        category: 'AI & Automation',
        readTime: '6 min read',
        createdAt: '2026-05-30T04:33:16Z',
        author: 'Md. Ashik Siddike'
      });
      setLoading(false);
    } else if (activePage === 'blog_mern') {
      setBlogData({
        title: 'Production MERN Stack Performance & Security Optimization Guide',
        content: MERN_TIPS_MD,
        category: 'Web Development',
        readTime: '8 min read',
        createdAt: '2026-04-20T12:00:00Z',
        author: 'Md. Ashik Siddike'
      });
      setLoading(false);
    } else if (activePage.startsWith('blog_')) {
      const slug = activePage.replace('blog_', '');
      setLoading(true);
      fetch(`/api/blogs/${slug}`)
        .then(res => {
          if (!res.ok) throw new Error('Blog not found');
          return res.json();
        })
        .then(data => {
          setBlogData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error loading blog details:", err);
          setBlogData({
            title: 'Article Not Found',
            content: `# ⚠️ Article Not Found\n\nWe couldn't retrieve the requested blog post. It might have been deleted or the database might be down.`,
            category: 'Error',
            readTime: '0 min read',
            createdAt: new Date().toISOString(),
            author: 'System'
          });
          setLoading(false);
        });
    }
  }, [activePage]);

  // Set document title and parse headings dynamically for Table of Contents outline sidebar
  useEffect(() => {
    if (blogData) {
      document.title = `${blogData.title} | Ashik Siddike`;
      
      // Parse markdown to extract h2 elements
      const parsedHeadings = [];
      const lines = blogData.content.split('\n');
      lines.forEach((line) => {
        if (line.startsWith('## ') && !line.startsWith('### ')) {
          const text = line.substring(3);
          const anchor = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
          parsedHeadings.push({ text, anchor });
        }
      });
      setHeadings(parsedHeadings);
    }
  }, [blogData]);

  // Scroll smoothly to Outline anchors
  const scrollToAnchor = (anchorId) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Inline markdown formatter helper
  const parseInlineMarkdown = (text) => {
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
              background: 'rgba(255,255,255,0.06)',
              padding: '2px 6px',
              borderRadius: '4px',
              color: 'var(--yellow)',
              fontSize: '11.5px',
              fontFamily: 'JetBrains Mono, monospace'
            }}>{cPart}</code>
          );
        }
        return cPart;
      });

      if (isBold) {
        return <strong key={bIdx} style={{ color: 'var(--bright)', fontWeight: 700 }}>{parsedCodeParts}</strong>;
      }
      return parsedCodeParts;
    });
  };

  // Render markdown parser into premium React elements
  const renderPremiumMarkdown = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let insideCodeBlock = false;
    let codeBlockContent = [];
    let codeBlockLanguage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle Code Block Fences
      if (line.startsWith('```')) {
        if (insideCodeBlock) {
          // close block
          const codeString = codeBlockContent.join('\n');
          elements.push(
            <CarbonCodeBlock 
              key={`code-${i}`} 
              code={codeString} 
              language={codeBlockLanguage} 
            />
          );
          codeBlockContent = [];
          insideCodeBlock = false;
        } else {
          // open block
          codeBlockLanguage = line.substring(3).trim();
          insideCodeBlock = true;
        }
        continue;
      }

      if (insideCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Title header (H1) -> Omit if it matches main blog title to prevent duplicates
      if (line.startsWith('# ')) {
        const text = line.substring(2);
        if (text.toLowerCase() === blogData.title.toLowerCase()) continue;
        elements.push(
          <h1 key={i} style={{ color: 'var(--bright)', fontSize: '32px', fontWeight: 800, marginTop: '28px', marginBottom: '18px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            {parseInlineMarkdown(text)}
          </h1>
        );
        continue;
      }

      // Section header (H2) -> Anchor added for outline navigation
      if (line.startsWith('## ')) {
        const text = line.substring(3);
        const anchor = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
        elements.push(
          <h2 id={anchor} key={i} style={{ color: 'var(--bright)', fontSize: '22px', fontWeight: 700, marginTop: '36px', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '6px', scrollMarginTop: '50px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#a855f7', fontSize: '16px' }}>#</span>
            {parseInlineMarkdown(text)}
          </h2>
        );
        continue;
      }

      // Subheading (H3)
      if (line.startsWith('### ')) {
        const text = line.substring(4);
        // Omit metadata lines containing "Published" or "Author" as they render in our custom header card
        if (text.includes('Published:') && text.includes('Author:')) continue;
        elements.push(
          <h3 key={i} style={{ color: 'var(--bright)', fontSize: '17px', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>
            {parseInlineMarkdown(text)}
          </h3>
        );
        continue;
      }

      // Horizontal Rule
      if (line.startsWith('---')) {
        elements.push(<hr key={i} style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '32px 0' }} />);
        continue;
      }

      // Callout box / Blockquote
      if (line.startsWith('> ')) {
        elements.push(
          <div key={i} className="glass-panel" style={{
            borderLeft: '4px solid var(--blue)',
            background: 'rgba(79, 193, 255, 0.03)',
            padding: '14px 20px',
            borderRadius: '6px',
            margin: '18px 0',
            fontSize: '13.5px',
            lineHeight: 1.7,
            color: 'var(--text)',
            opacity: 0.95
          }}>
            {parseInlineMarkdown(line.substring(2))}
          </div>
        );
        continue;
      }

      // List Items (Bullet Lists)
      if (line.startsWith('- ')) {
        elements.push(
          <div key={i} className="blog-list-item" style={{ display: 'flex', gap: '10px', paddingLeft: '8px', margin: '8px 0', fontSize: '14.5px', lineHeight: 1.8 }}>
            <span style={{ color: 'var(--blue)', fontSize: '11px', marginTop: '4px', flexShrink: 0 }}>✦</span>
            <span style={{ color: 'var(--text)' }}>{parseInlineMarkdown(line.substring(2))}</span>
          </div>
        );
        continue;
      }

      // Checked checklists
      if (line.startsWith('- [x]')) {
        elements.push(
          <div key={i} style={{ display: 'flex', gap: '10px', paddingLeft: '8px', margin: '8px 0', fontSize: '14px', color: 'var(--green)' }}>
            <span style={{ flexShrink: 0 }}>✓</span>
            <span>{parseInlineMarkdown(line.substring(5))}</span>
          </div>
        );
        continue;
      }

      // Empty Lines
      if (line.trim() === '') {
        elements.push(<div key={i} style={{ height: '14px' }} />);
        continue;
      }

      // Normal Paragraphs
      elements.push(
        <p key={i} style={{ margin: '0 0 16px 0', fontSize: '14.5px', lineHeight: 1.85, color: 'var(--text)', textAlign: 'justify' }}>
          {parseInlineMarkdown(line)}
        </p>
      );
    }
    return elements;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* 📁 Toolbar Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)',
        height: '42px',
        flexShrink: 0,
        zIndex: 10
      }}>
        <span style={{ fontSize: '16px' }}>📖</span>
        <span style={{ fontSize: '12px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace' }}>
          blog/{blogData ? (activePage.startsWith('blog_') && activePage !== 'blog_automation' && activePage !== 'blog_mern' ? `${activePage.replace('blog_', '')}.md` : activePage === 'blog_mern' ? 'mern_tips.md' : 'automation_guide.md') : 'loading...'} › {previewMode ? 'Preview' : 'Raw Markdown'}
        </span>
        
        {blogData && (
          <button
            onClick={() => setPreviewMode(!previewMode)}
            style={toggleBtnStyle}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            {previewMode ? '📄 Show Source' : '📖 Show Preview'}
          </button>
        )}
      </div>

      {/* 📊 Reading Progress Indicator (glowing gradient bar) */}
      {previewMode && blogData && (
        <div style={{
          width: '100%',
          height: '3px',
          background: 'rgba(255,255,255,0.03)',
          zIndex: 10,
          flexShrink: 0
        }}>
          <div style={{
            width: `${scrollProgress}%`,
            height: '100%',
            background: 'linear-gradient(to right, var(--blue), var(--purple), var(--pink))',
            boxShadow: '0 0 10px rgba(79, 193, 255, 0.4)',
            transition: 'width 0.1s ease-out'
          }} />
        </div>
      )}

      {/* 📖 Content Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
        className="thin-scroll"
      >
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--dim)' }}>
            <div className="loading-spinner" style={{ width: '32px', height: '32px', border: '3px solid var(--border)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '12px' }} />
            <span>Parsing workspace assets...</span>
          </div>
        ) : blogData ? (
          previewMode ? (
            /* 🚀 HIGH-FI PREVIEW WRAPPER */
            <div style={{ display: 'flex', width: '100%', maxWidth: '1080px', margin: '0 auto', padding: '40px 24px 80px 24px', gap: '40px', position: 'relative' }}>
              
              {/* Glowing Background Radial Effects */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '10%',
                width: '500px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.07) 0%, rgba(79, 193, 255, 0.03) 60%, rgba(0, 0, 0, 0) 100%)',
                zIndex: 0,
                pointerEvents: 'none',
                filter: 'blur(70px)'
              }} />

              {/* Left Column (Main Article Panel) */}
              <article ref={contentRef} style={{ flex: 1.5, minWidth: 0, zIndex: 1 }}>
                {/* Category badge */}
                <span className="blog-category-badge" style={{
                  display: 'inline-block',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--blue)',
                  background: 'rgba(79,193,255,0.06)',
                  border: '1px solid rgba(79,193,255,0.18)',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 0 15px rgba(79,193,255,0.05)',
                  transition: 'all 0.3s ease'
                }}>
                  {blogData.category || 'AI & Automation'}
                </span>

                {/* Main Article Title */}
                <h1 style={{
                  fontSize: '42px',
                  fontWeight: 850,
                  lineHeight: 1.25,
                  letterSpacing: '-0.03em',
                  margin: '0 0 24px 0',
                  fontFamily: 'Outfit, system-ui, sans-serif',
                  background: 'linear-gradient(135deg, var(--bright) 30%, rgba(255,255,255,0.65) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {blogData.title}
                </h1>

                {/* Author Metadata Header Card */}
                <div className="glass-panel" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 20px',
                  borderRadius: '10px',
                  background: 'rgba(20,20,25,0.4)',
                  border: '1px solid var(--border)',
                  marginBottom: '36px',
                  fontSize: '12.5px',
                  color: 'var(--dim)',
                  flexWrap: 'wrap',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--blue), var(--pink))',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                    }}>
                      AS
                    </div>
                    <strong style={{ color: 'var(--bright)' }}>{blogData.author || 'Md. Ashik Siddike'}</strong>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.08)' }}>|</span>
                  <div>📅 {new Date(blogData.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  <span style={{ color: 'rgba(255,255,255,0.08)' }}>|</span>
                  <div>⏱️ {blogData.readTime || '6 min read'}</div>
                </div>

                {/* Cover Image (optional) */}
                {blogData.image && (
                  <div className="blog-cover-container" style={{
                    width: '100%',
                    maxHeight: '400px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '40px',
                    border: '1px solid var(--border)',
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.7)',
                    transition: 'all 0.4s ease-in-out'
                  }}>
                    <img src={blogData.image} alt={blogData.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                  </div>
                )}

                {/* Rendered markdown body */}
                <div style={{ fontFamily: 'Georgia, serif', color: 'var(--text)' }}>
                  {renderPremiumMarkdown(blogData.content)}
                </div>

                {/* Signature Author Badge */}
                <div className="glass-panel" style={{
                  marginTop: '60px',
                  padding: '24px',
                  borderRadius: '12px',
                  background: 'rgba(20,20,25,0.3)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--blue), var(--pink))',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 14px rgba(79, 193, 255, 0.4)',
                    flexShrink: 0
                  }}>
                    AS
                  </div>
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--bright)', marginBottom: '4px' }}>
                      Written by Md. Ashik Siddike
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--dim)', margin: 0, lineHeight: 1.6 }}>
                      Full-Stack Developer @ Nexinity Web Solution & Support Engineer for City, University of London. Passionate about automating systems and building high-performance, accessible web products.
                    </p>
                  </div>
                </div>
              </article>

              {/* Right Column (Sticky Outline & Quick Stats) */}
              {headings.length > 0 && (
                <aside style={{
                  width: '240px',
                  flexShrink: 0,
                  position: 'sticky',
                  top: '20px',
                  height: 'fit-content',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }} className="outline-aside">
                  
                  {/* Table of Contents List */}
                  <div className="glass-panel" style={{
                    padding: '18px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--dim)',
                      marginBottom: '14px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}>
                      📋 Outline Index
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {headings.map((h, hidx) => (
                        <div
                          key={hidx}
                          onClick={() => scrollToAnchor(h.anchor)}
                          style={{
                            fontSize: '12px',
                            color: 'var(--text)',
                            cursor: 'pointer',
                            transition: 'color 0.15s, padding-left 0.15s',
                            lineHeight: 1.45,
                            borderLeft: '1px solid rgba(255,255,255,0.05)',
                            paddingLeft: '10px'
                          }}
                          onMouseEnter={e => { e.target.style.color = 'var(--blue)'; e.target.style.paddingLeft = '14px'; e.target.style.borderLeftColor = 'var(--blue)'; }}
                          onMouseLeave={e => { e.target.style.color = 'var(--text)'; e.target.style.paddingLeft = '10px'; e.target.style.borderLeftColor = 'rgba(255,255,255,0.05)'; }}
                        >
                          {h.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              )}
            </div>
          ) : (
            /* 📝 RAW MARKDOWN VIEW with VS Code style lines */
            <div style={{ display: 'flex', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', lineHeight: 1.7, color: 'var(--text)', padding: '24px' }}>
              <div style={{ color: 'var(--dim)', textAlign: 'right', paddingRight: '16px', userSelect: 'none', borderRight: '1px solid var(--border)', marginRight: '16px', minWidth: '24px' }}>
                {blogData.content.split('\n').map((_, index) => (
                  <div key={index}>{index + 1}</div>
                ))}
              </div>
              <pre style={{ margin: 0, padding: 0, overflow: 'auto', color: 'var(--dim)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', flex: 1 }}>
                {blogData.content}
              </pre>
            </div>
          )
        ) : (
          <div style={{ padding: '40px', color: 'var(--red)', textAlign: 'center' }}>
            Failed to parse article parameters.
          </div>
        )}
      </div>

      {/* Styled styles for transitions */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-spinner {
          animation: spin 0.8s linear infinite;
        }
        @media (max-width: 900px) {
          .outline-aside {
            display: none !important;
          }
        }
        .blog-category-badge:hover {
          background: rgba(79,193,255,0.12) !important;
          border-color: var(--blue) !important;
          box-shadow: 0 0 20px rgba(79,193,255,0.2) !important;
          transform: translateY(-1px);
        }
        .blog-cover-container:hover img {
          transform: scale(1.025) rotate(0.5deg);
        }
        .blog-list-item {
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.2s;
        }
        .blog-list-item:hover {
          transform: translateX(6px);
        }
        .blog-list-item:hover span {
          color: var(--bright) !important;
        }
      `}</style>
    </div>
  );
};

// Styles
const toggleBtnStyle = {
  marginLeft: 'auto',
  background: 'var(--bg3)',
  border: '1px solid var(--border)',
  borderRadius: '4px',
  color: 'var(--text)',
  fontSize: '11px',
  padding: '4px 12px',
  cursor: 'pointer',
  fontFamily: 'JetBrains Mono, monospace',
  display: 'flex',
  alignItems: 'center',
  transition: 'border-color 0.15s'
};

export default BlogPage;
