import React, { useState, useEffect } from 'react';

const ArticlesPage = ({ activePage, setActivePage }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
        <div style={{ 
          background: 'rgba(238,109,109,0.1)', 
          border: '1px solid rgba(238,109,109,0.2)', 
          borderRadius: '12px', 
          width: '60px', 
          height: '60px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: '28px' }}>📖</span>
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <h1 style={{ margin: 0, fontSize: '32px', color: 'var(--bright)', letterSpacing: '-0.5px' }}>
                Articles
              </h1>
              <div style={{ display: 'flex', gap: '12px', color: 'var(--dim)', fontSize: '13px', fontFamily: 'JetBrains Mono, monospace' }}>
                <span>🌐 {blogs.length} posts</span>
                <span>•</span>
                <span>0 views</span>
              </div>
            </div>
            
            <a href="https://dev.to/yourusername" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '6px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
              color: 'var(--bright)', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            >
              DEV.to <span>↗</span>
            </a>
          </div>
          <p style={{ color: 'var(--dim)', fontSize: '15px', lineHeight: 1.6, maxWidth: '600px', margin: 0 }}>
            Technical writing on web development, automation, and AI. Sharing insights, tutorials, and lessons learned from building real-world applications.
          </p>
        </div>
      </div>

      {/* Articles List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--dim)' }}>
          <div className="spinner" style={{ width: '24px', height: '24px', margin: '0 auto 12px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          Loading articles...
        </div>
      ) : blogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--dim)', background: 'var(--bg2)', borderRadius: '8px', border: '1px dashed var(--border)' }}>
          <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>📭</span>
          No articles published yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {blogs.map(blog => (
            <div key={blog._id} 
              onClick={() => setActivePage(`blog_${blog.slug}`)}
              style={{
                padding: '1.5rem',
                borderRadius: '12px',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'var(--blue)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span style={{ fontSize: '12px', background: 'rgba(79,193,255,0.1)', color: 'var(--blue)', padding: '2px 8px', borderRadius: '12px' }}>
                  {blog.category || 'Article'}
                </span>
              </div>
              <h2 style={{ fontSize: '20px', color: 'var(--bright)', margin: '0 0 8px 0' }}>
                {blog.title}
              </h2>
              <p style={{ color: 'var(--dim)', fontSize: '14px', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                {blog.summary}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: 'var(--dim)' }}>
                  ⏱️ {blog.readTime || '5 min read'}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--blue)', fontWeight: 'bold' }}>
                  Read Article →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default ArticlesPage;
