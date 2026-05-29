import React, { useState } from 'react';

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

const BlogPage = ({ setActivePage, ...props }) => {
  // We can identify which blog to show by looking at the page URL/id via props
  const isMern = props.activePage === 'blog_mern';
  const filename = isMern ? 'mern_tips.md' : 'automation_guide.md';
  const mdContent = isMern ? MERN_TIPS_MD : AUTOMATION_GUIDE_MD;

  const [previewMode, setPreviewMode] = useState(true);

  // Helper to quickly render Markdown preview styling
  const renderMarkdownPreview = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return <h1 key={i} style={{ color: 'var(--bright)', fontSize: '28px', fontWeight: 800, marginTop: '24px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} style={{ color: 'var(--bright)', fontSize: '20px', fontWeight: 700, marginTop: '20px', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} style={{ color: 'var(--dim)', fontSize: '13px', fontWeight: 500, fontStyle: 'italic', marginBottom: '16px' }}>{line.substring(4)}</h3>;
      }
      if (line.startsWith('---')) {
        return <hr key={i} style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} style={{ marginLeft: '20px', color: 'var(--text)', fontSize: '13.5px', marginBottom: '8px' }}>
            <strong>{line.substring(2).split(':')[0]}:</strong>{line.substring(2).split(':')[1] || ''}
          </li>
        );
      }
      if (line.startsWith('`') && line.endsWith('`')) {
        return <pre key={i} style={codeBlockStyle}><code>{line.replace(/\`/g, '')}</code></pre>;
      }
      if (line.startsWith('- [x]')) {
        return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green)', fontSize: '13px', margin: '4px 0' }}>✅ {line.substring(5)}</div>;
      }
      
      // Inline formatting (bold)
      let content = line;
      if (content.includes('**')) {
        const parts = content.split('**');
        return (
          <p key={i} style={paragraphStyle}>
            {parts.map((p, idx) => idx % 2 === 1 ? <strong key={idx} style={{ color: 'var(--bright)' }}>{p}</strong> : p)}
          </p>
        );
      }

      // Check if it's within a code block (simple block check for presentation)
      if (line.startsWith('import ') || line.startsWith('const ') || line.startsWith('app.use(') || line.startsWith('def ') || line.startsWith('userSchema.')) {
        return <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--yellow)', fontSize: '11px', background: 'var(--bg2)', padding: '2px 8px', borderRadius: '3px' }}>{line}</div>;
      }

      if (line.trim() === '') return <div key={i} style={{ height: '12px' }} />;

      return <p key={i} style={paragraphStyle}>{line}</p>;
    });
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
        flexShrink: 0
      }}>
        <span style={{ fontSize: '16px' }}>📖</span>
        <span style={{ fontSize: '12px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace' }}>
          blog/{filename} › {previewMode ? 'Preview' : 'Raw Markdown'}
        </span>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          style={toggleBtnStyle}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          {previewMode ? '📄 Show Source' : '📖 Show Preview'}
        </button>
      </div>

      {/* 📖 Body Section */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }} className="thin-scroll">
        {previewMode ? (
          /* Styled Markdown Preview */
          <div style={{ maxWidth: '780px', margin: '0 auto', lineHeight: 1.85 }}>
            {renderMarkdownPreview(mdContent)}
          </div>
        ) : (
          /* Raw Markdown Editor with Line Numbers */
          <div style={{ display: 'flex', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', lineHeight: 1.7, color: 'var(--text)' }}>
            {/* Line Numbers */}
            <div style={{ color: 'var(--dim)', textAlign: 'right', paddingRight: '16px', userSelect: 'none', borderRight: '1px solid var(--border)', marginRight: '16px', minWidth: '24px' }}>
              {mdContent.split('\n').map((_, index) => (
                <div key={index}>{index + 1}</div>
              ))}
            </div>
            {/* Raw code content */}
            <pre style={{ margin: 0, padding: 0, overflow: 'auto', color: 'var(--dim)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', flex: 1 }}>
              {mdContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const paragraphStyle = {
  fontSize: '14px',
  color: 'var(--text)',
  marginBottom: '16px',
  lineHeight: '1.8'
};

const codeBlockStyle = {
  background: 'var(--bg2)',
  border: '1px solid var(--border)',
  borderRadius: '6px',
  padding: '14px',
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: '12px',
  color: 'var(--yellow)',
  overflowX: 'auto',
  margin: '16px 0',
  lineHeight: 1.6
};

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
