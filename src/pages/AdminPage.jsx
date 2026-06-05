import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginLoading, setLoginLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '', desc: '', tech: '', accent: '#4fc1ff', github: '', live: '', featured: false,
    image: '', longDesc: '', usage: '', howItWorks: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Inbox/Messages States
  const [activeSubTab, setActiveSubTab] = useState('projects'); // 'projects' or 'inbox', 'blogs'
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Blog Management States
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: '', content: '', summary: '', category: '', tags: '', readTime: '', author: 'Md. Ashik Siddike', image: '', slug: ''
  });
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [uploadingBlogImage, setUploadingBlogImage] = useState(false);
  const [blogUploadError, setBlogUploadError] = useState('');

  // Bot Management States
  const [botSources, setBotSources] = useState([]);
  const [botSourcesLoading, setBotSourcesLoading] = useState(false);
  const [botFormData, setBotFormData] = useState({ twitter_handle: '', niche: '' });
  const [botConfig, setBotConfig] = useState({ interval: '6', max_articles: '5', run_mode: 'autopilot' });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds 5MB limit.');
      return;
    }

    setUploading(true);
    setUploadError('');

    const token = getToken();
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await fetch('/api/projects/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadData
      });
      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, image: data.url }));
        showSuccess('📸 Image uploaded successfully!');
      } else {
        setUploadError(data.message || 'Upload failed');
      }
    } catch (err) {
      setUploadError('Failed to connect to upload server');
    } finally {
      setUploading(false);
    }
  };

  // Check existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      fetch('/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.valid) {
            setIsAuthenticated(true);
            fetchProjects(token);
            fetchMessages(token);
            fetchBlogs();
          } else {
            localStorage.removeItem('admin_token');
          }
          setLoginLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('admin_token');
          setLoginLoading(false);
        });
    } else {
      setLoginLoading(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        fetchProjects(data.token);
        fetchMessages(data.token);
        fetchBlogs();
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (err) {
      setLoginError('Server unreachable. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setProjects([]);
    setMessages([]);
    setBlogs([]);
    setEmail('');
    setPassword('');
  };

  const getToken = () => localStorage.getItem('admin_token');

  const fetchProjects = async (token) => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchMessages = async (token) => {
    setMessagesLoading(true);
    try {
      const activeToken = token || getToken();
      const res = await fetch('/api/messages', {
        headers: { 'Authorization': `Bearer ${activeToken}` }
      });
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const token = getToken();
      const res = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('📥 Message deleted successfully!');
        fetchMessages(token);
      } else {
        throw new Error('Deletion failed');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Failed to delete message.');
    }
  };

  const fetchBlogs = async () => {
    setBlogsLoading(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setBlogsLoading(false);
    }
  };

  const handleBlogFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setBlogUploadError('File size exceeds 5MB limit.');
      return;
    }

    setUploadingBlogImage(true);
    setBlogUploadError('');

    const token = getToken();
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await fetch('/api/blogs/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadData
      });
      const data = await res.json();
      if (res.ok) {
        setBlogFormData(prev => ({ ...prev, image: data.url }));
        showSuccess('📸 Blog cover uploaded successfully!');
      } else {
        setBlogUploadError(data.message || 'Upload failed');
      }
    } catch (err) {
      setBlogUploadError('Failed to connect to upload server');
    } finally {
      setUploadingBlogImage(false);
    }
  };

  const handleBlogInputChange = (e) => {
    const { name, value } = e.target;
    setBlogFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    try {
      if (editingBlogId) {
        const res = await fetch(`/api/blogs/${editingBlogId}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(blogFormData)
        });
        if (!res.ok) throw new Error('Update failed');
        showSuccess('✅ Blog article updated successfully!');
      } else {
        const res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(blogFormData)
        });
        if (!res.ok) throw new Error('Create failed');
        showSuccess('✅ Blog article published successfully!');
      }
      setBlogFormData({
        title: '', content: '', summary: '', category: '', tags: '', readTime: '', author: 'Md. Ashik Siddike', image: '', slug: ''
      });
      setEditingBlogId(null);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      setLoginError('Action failed. Your session may have expired.');
    }
  };

  const handleBlogEdit = (blog) => {
    setBlogFormData({
      title: blog.title || '',
      content: blog.content || '',
      summary: blog.summary || '',
      category: blog.category || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
      readTime: blog.readTime || '',
      author: blog.author || 'Md. Ashik Siddike',
      image: blog.image || '',
      slug: blog.slug || ''
    });
    setEditingBlogId(blog._id);
  };

  const handleBlogDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const token = getToken();
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      showSuccess('🗑️ Blog post deleted!');
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  // Bot Management Functions
  const fetchBotSources = async () => {
    setBotSourcesLoading(true);
    try {
      const res = await fetch('/api/bots/sources', {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setBotSources(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching bot sources:", err);
    } finally {
      setBotSourcesLoading(false);
    }
  };

  const handleBotSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/bots/sources', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify(botFormData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add source');
      showSuccess('🤖 Bot source added successfully!');
      setBotFormData({ twitter_handle: '', niche: '' });
      fetchBotSources();
    } catch (err) {
      console.error(err);
      setLoginError(err.message);
    }
  };

  const handleBotToggle = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/bots/sources/${id}/toggle`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify({ is_active: !currentStatus })
      });
      if (!res.ok) throw new Error('Toggle failed');
      showSuccess('🤖 Bot status updated!');
      fetchBotSources();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBotDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bot source?")) return;
    try {
      const res = await fetch(`/api/bots/sources/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      showSuccess('🗑️ Bot source deleted!');
      fetchBotSources();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBotConfig = async () => {
    try {
      const res = await fetch('/api/bots/config', {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        const configObj = { interval: '6', max_articles: '5', run_mode: 'autopilot' };
        data.forEach(item => {
          if (configObj[item.key] !== undefined) configObj[item.key] = item.value;
        });
        setBotConfig(configObj);
      }
    } catch (err) {
      console.error("Error fetching bot config:", err);
    }
  };

  const saveBotConfig = async (key, value) => {
    try {
      const res = await fetch('/api/bots/config', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify({ key, value })
      });
      if (!res.ok) throw new Error('Failed to save config');
      showSuccess(`⚙️ Bot ${key} updated!`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeSubTab === 'inbox') {
        fetchMessages();
      } else if (activeSubTab === 'blogs') {
        fetchBlogs();
      } else if (activeSubTab === 'bots') {
        fetchBotSources();
        fetchBotConfig();
      }
    }
  }, [activeSubTab, isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      const token = getToken();
      if (editingId) {
        const res = await fetch(`/api/projects/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Update failed');
        showSuccess('✅ Project updated successfully!');
      } else {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Create failed');
        showSuccess('✅ Project created successfully!');
      }
      setFormData({ title: '', desc: '', tech: '', accent: '#4fc1ff', github: '', live: '', featured: false, image: '', longDesc: '', usage: '', howItWorks: '' });
      setEditingId(null);
      fetchProjects(token);
    } catch (err) {
      console.error(err);
      setLoginError('Action failed. Your session may have expired.');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      desc: project.desc,
      tech: project.tech.join(', '),
      accent: project.accent,
      github: project.github || '',
      live: project.live || '',
      featured: project.featured,
      image: project.image || '',
      longDesc: project.longDesc || '',
      usage: project.usage || '',
      howItWorks: project.howItWorks || ''
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = getToken();
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      showSuccess('🗑️ Project deleted!');
      fetchProjects(token);
    } catch (err) {
      console.error(err);
    }
  };

  // ─── Loading state ───
  if (loginLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--dim)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ width: '32px', height: '32px', border: '3px solid var(--border)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
          <p>Verifying session...</p>
        </div>
      </div>
    );
  }

  // ─── LOGIN SCREEN ───
  if (!isAuthenticated) {
    return (
      <div className="content-section animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{
          width: '100%', maxWidth: '400px', padding: '2.5rem',
          background: 'var(--bg2)', borderRadius: '12px',
          border: '1px solid var(--border)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}>
          {/* Lock Icon */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '56px', height: '56px', margin: '0 auto 12px',
              background: 'linear-gradient(135deg, rgba(79,193,255,0.15), rgba(198,134,192,0.15))',
              borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(79,193,255,0.2)'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--bright)', margin: '0 0 4px' }}>Admin Access</h2>
            <p style={{ fontSize: '12px', color: 'var(--dim)', margin: 0 }}>Sign in to manage your portfolio</p>
          </div>

          {loginError && (
            <div style={{
              padding: '10px 14px', marginBottom: '1rem', borderRadius: '6px',
              background: 'rgba(244,67,54,0.1)', border: '1px solid rgba(244,67,54,0.3)',
              color: '#f44336', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--dim)', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="admin@example.com"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--dim)', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: '40px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--dim)', cursor: 'pointer', padding: '4px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPassword
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>
            <button type="submit" style={{
              width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
              background: 'linear-gradient(135deg, var(--blue), #c586c0)',
              color: 'white', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer',
              marginTop: '0.5rem', transition: 'opacity 0.2s, transform 0.1s'
            }}
              onMouseEnter={e => e.target.style.opacity = '0.9'}
              onMouseLeave={e => e.target.style.opacity = '1'}
              onMouseDown={e => e.target.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.target.style.transform = 'scale(1)'}
            >
              Sign In
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'var(--dim)', fontSize: '11px', marginTop: '1.5rem' }}>
            🔒 Protected admin area
          </p>
        </div>
      </div>
    );
  }

  // ─── ADMIN DASHBOARD ───
  return (
    <div className="content-section animate-fade-in" style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--bright)', margin: '0 0 4px' }}>
            ⚙️ Admin Dashboard
          </h2>
          <p style={{ color: 'var(--dim)', fontSize: '12px', margin: 0 }}>
            Manage your portfolio projects. Changes reflect instantly on the live site.
          </p>
        </div>
        <button onClick={handleLogout} style={{
          padding: '8px 16px', borderRadius: '6px', border: '1px solid rgba(244,67,54,0.3)',
          background: 'rgba(244,67,54,0.1)', color: '#f44336', fontSize: '12px',
          cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s'
        }}
          onMouseEnter={e => { e.target.style.background = 'rgba(244,67,54,0.2)'; }}
          onMouseLeave={e => { e.target.style.background = 'rgba(244,67,54,0.1)'; }}
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem', paddingBottom: '1px' }}>
        <button
          onClick={() => setActiveSubTab('projects')}
          style={{
            padding: '8px 16px',
            background: activeSubTab === 'projects' ? 'var(--bg2)' : 'none',
            border: '1px solid ' + (activeSubTab === 'projects' ? 'var(--border)' : 'transparent'),
            borderBottom: activeSubTab === 'projects' ? '2px solid var(--blue)' : '1px solid transparent',
            color: activeSubTab === 'projects' ? 'var(--bright)' : 'var(--dim)',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0',
            transition: 'all 0.15s'
          }}
        >
          📂 Manage Projects
        </button>
        <button
          onClick={() => setActiveSubTab('inbox')}
          style={{
            padding: '8px 16px',
            background: activeSubTab === 'inbox' ? 'var(--bg2)' : 'none',
            border: '1px solid ' + (activeSubTab === 'inbox' ? 'var(--border)' : 'transparent'),
            borderBottom: activeSubTab === 'inbox' ? '2px solid var(--blue)' : '1px solid transparent',
            color: activeSubTab === 'inbox' ? 'var(--bright)' : 'var(--dim)',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          📥 Inbox
          {messages.length > 0 && (
            <span style={{
              background: 'var(--red)',
              color: 'white',
              fontSize: '10px',
              fontWeight: '800',
              padding: '2px 7px',
              borderRadius: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {messages.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('blogs')}
          style={{
            padding: '8px 16px',
            background: activeSubTab === 'blogs' ? 'var(--bg2)' : 'none',
            border: '1px solid ' + (activeSubTab === 'blogs' ? 'var(--border)' : 'transparent'),
            borderBottom: activeSubTab === 'blogs' ? '2px solid var(--blue)' : '1px solid transparent',
            color: activeSubTab === 'blogs' ? 'var(--bright)' : 'var(--dim)',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          📖 Manage Blogs
          {blogs.length > 0 && (
            <span style={{
              background: 'var(--blue)',
              color: 'white',
              fontSize: '10px',
              fontWeight: '800',
              padding: '2px 7px',
              borderRadius: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {blogs.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('bots')}
          style={{
            padding: '8px 16px',
            background: activeSubTab === 'bots' ? 'var(--bg2)' : 'none',
            border: '1px solid ' + (activeSubTab === 'bots' ? 'var(--border)' : 'transparent'),
            borderBottom: activeSubTab === 'bots' ? '2px solid var(--blue)' : '1px solid transparent',
            color: activeSubTab === 'bots' ? 'var(--bright)' : 'var(--dim)',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          🤖 Bot Controls
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div style={{
          padding: '10px 16px', marginBottom: '1rem', borderRadius: '6px',
          background: 'rgba(78,201,176,0.1)', border: '1px solid rgba(78,201,176,0.3)',
          color: '#4ec9b0', fontSize: '13px'
        }}>
          {successMsg}
        </div>
      )}

      {activeSubTab === 'projects' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Form Section */}
          <div style={{ background: 'var(--bg2)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <h3 style={{ color: 'var(--bright)', marginBottom: '1rem', fontSize: '14px' }}>
              {editingId ? '✏️ Edit Project' : '➕ Add New Project'}
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea name="desc" value={formData.desc} onChange={handleInputChange} required style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
              <div>
                <label style={labelStyle}>Tech Stack (comma separated)</label>
                <input type="text" name="tech" value={formData.tech} onChange={handleInputChange} style={inputStyle} placeholder="React, Node.js, MongoDB"
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Accent Color</label>
                  <input type="color" name="accent" value={formData.accent} onChange={handleInputChange} style={{ width: '100%', height: '36px', cursor: 'pointer', background: 'none', border: '1px solid var(--border)', borderRadius: '4px' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingTop: '18px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--bright)', fontSize: '12px', cursor: 'pointer' }}>
                    <input type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange} style={{ cursor: 'pointer', width: '15px', height: '15px' }} />
                    ⭐ Featured Project
                  </label>
                </div>
              </div>

              {/* Image upload dynamic box */}
              <div>
                <label style={labelStyle}>Project Cover Image</label>
                <div
                  style={{
                    border: '1px dashed var(--border)',
                    borderRadius: '6px',
                    padding: '16px',
                    textAlign: 'center',
                    background: 'var(--bg)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  onClick={() => document.getElementById('image-upload-input').click()}
                >
                  <input id="image-upload-input" type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                  {uploading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                      <span style={{ fontSize: '11px', color: 'var(--dim)' }}>Uploading image...</span>
                    </div>
                  ) : formData.image ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <img src={formData.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '110px', objectFit: 'contain', borderRadius: '4px', border: '1px solid var(--border)' }} />
                      <span style={{ fontSize: '11px', color: 'var(--green)' }}>✓ Image ready</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '18px' }}>📸</span>
                      <span style={{ fontSize: '12px', color: 'var(--dim)' }}>Click to upload image from device</span>
                    </div>
                  )}
                </div>

                {/* Optional manual URL entry */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                  <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="Or enter manual image URL..." style={{ ...inputStyle, flex: 1, fontSize: '11px' }} onClick={e => e.stopPropagation()} />
                  {formData.image && (
                    <button type="button" onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, image: '' })); }} style={{ padding: '6px 12px', background: 'rgba(244,67,54,0.1)', border: '1px solid rgba(244,67,54,0.2)', color: '#f44336', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>
                      Remove
                    </button>
                  )}
                </div>

                {uploadError && (
                  <div style={{ fontSize: '11px', color: 'var(--red)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ⚠️ {uploadError}
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>GitHub Repo URL</label>
                <input type="url" name="github" value={formData.github} onChange={handleInputChange} style={inputStyle} placeholder="https://github.com/..."
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
              <div>
                <label style={labelStyle}>Live Site URL</label>
                <input type="url" name="live" value={formData.live} onChange={handleInputChange} style={inputStyle} placeholder="https://..."
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>

              {/* Collapsible detail specifications */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '4px' }}>
                <h4 style={{ fontSize: '11px', color: 'var(--bright)', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🖥️ Full Project Specs (For Details Modal)</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ ...labelStyle, fontSize: '10px' }}>Detailed Description (longDesc)</label>
                    <textarea name="longDesc" value={formData.longDesc} onChange={handleInputChange} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Explain the full details of this project, goals achieved, challenges overcome..." />
                  </div>
                  
                  <div>
                    <label style={{ ...labelStyle, fontSize: '10px' }}>How It Works (howItWorks)</label>
                    <textarea name="howItWorks" value={formData.howItWorks} onChange={handleInputChange} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Explain how the system works behind the scenes (workflows, database structures, AI engines...)" />
                  </div>

                  <div>
                    <label style={{ ...labelStyle, fontSize: '10px' }}>How to Use / Run (usage)</label>
                    <textarea name="usage" value={formData.usage} onChange={handleInputChange} style={{ ...inputStyle, minHeight: '60px', resize: 'vertical', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--yellow)' }} placeholder="e.g. npm install \nnpm run dev" />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
                <button type="submit" style={btnPrimary}>
                  {editingId ? 'Update Project' : 'Add Project'}
                </button>
                {editingId && (
                  <button type="button" onClick={() => {
                    setEditingId(null);
                    setFormData({ title: '', desc: '', tech: '', accent: '#4fc1ff', github: '', live: '', featured: false, image: '', longDesc: '', usage: '', howItWorks: '' });
                  }} style={btnSecondary}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Section */}
          <div>
            <h3 style={{ color: 'var(--bright)', marginBottom: '1rem', fontSize: '14px' }}>
              📁 Existing Projects ({projects.length})
            </h3>
            {loading ? (
              <div style={{ color: 'var(--dim)', padding: '2rem' }}>Loading projects...</div>
            ) : projects.length === 0 ? (
              <div style={{ color: 'var(--dim)', padding: '2rem', textAlign: 'center', background: 'var(--bg2)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                No projects found. Add one on the left!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '720px', overflowY: 'auto', paddingRight: '6px' }} className="thin-scroll">
                {projects.map((p) => (
                  <div key={p._id} style={{
                    padding: '14px', borderRadius: '8px', border: '1px solid var(--border)',
                    background: 'var(--bg)', transition: 'border-color 0.2s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = p.accent}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.accent }} />
                        <h4 style={{ fontWeight: 'bold', color: 'var(--bright)', margin: 0, fontSize: '13px' }}>{p.title}</h4>
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={() => handleEdit(p)} style={actionBtn}
                          onMouseEnter={e => { e.target.style.background = 'rgba(79,193,255,0.15)'; }}
                          onMouseLeave={e => { e.target.style.background = 'transparent'; }}
                        >✏️</button>
                        <button onClick={() => handleDelete(p._id)} style={actionBtn}
                          onMouseEnter={e => { e.target.style.background = 'rgba(244,67,54,0.15)'; }}
                          onMouseLeave={e => { e.target.style.background = 'transparent'; }}
                        >🗑️</button>
                      </div>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--text)', margin: '0 0 8px 0', lineHeight: 1.5 }}>
                      {p.desc.length > 120 ? p.desc.substring(0, 120) + '...' : p.desc}
                    </p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {p.featured && <span style={{ fontSize: '10px', background: 'rgba(255,215,0,0.15)', color: '#dcdcaa', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(255,215,0,0.2)' }}>⭐ Featured</span>}
                      {p.tech.slice(0, 3).map((t, i) => (
                        <span key={i} style={{ fontSize: '10px', background: 'rgba(79,193,255,0.1)', color: 'var(--blue)', padding: '2px 8px', borderRadius: '4px' }}>{t}</span>
                      ))}
                      {p.tech.length > 3 && <span style={{ fontSize: '10px', color: 'var(--dim)' }}>+{p.tech.length - 3}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : activeSubTab === 'blogs' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Form Column */}
          <div style={{ background: 'var(--bg2)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <h3 style={{ color: 'var(--bright)', marginBottom: '1rem', fontSize: '14px' }}>
              {editingBlogId ? '✏️ Edit Blog Post' : '✍️ Write New Blog Post'}
            </h3>
            <form onSubmit={handleBlogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Title</label>
                <input type="text" name="title" value={blogFormData.title} onChange={handleBlogInputChange} required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
              
              <div>
                <label style={labelStyle}>Slug (Optional, auto-generated if blank)</label>
                <input type="text" name="slug" value={blogFormData.slug} onChange={handleBlogInputChange} placeholder="e.g. automating-affiliate-crawlers" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Category</label>
                  <input type="text" name="category" value={blogFormData.category} onChange={handleBlogInputChange} placeholder="AI & Automation" required style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Read Time</label>
                  <input type="text" name="readTime" value={blogFormData.readTime} onChange={handleBlogInputChange} placeholder="5 min read" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Tags (comma separated)</label>
                <input type="text" name="tags" value={blogFormData.tags} onChange={handleBlogInputChange} placeholder="Python, Gemini, n8n" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>

              {/* Cover Image upload */}
              <div>
                <label style={labelStyle}>Blog Cover Image</label>
                <div
                  style={{
                    border: '1px dashed var(--border)',
                    borderRadius: '6px',
                    padding: '16px',
                    textAlign: 'center',
                    background: 'var(--bg)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  onClick={() => document.getElementById('blog-image-upload-input').click()}
                >
                  <input id="blog-image-upload-input" type="file" accept="image/*" onChange={handleBlogFileUpload} style={{ display: 'none' }} />
                  {uploadingBlogImage ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                      <span style={{ fontSize: '11px', color: 'var(--dim)' }}>Uploading cover image...</span>
                    </div>
                  ) : blogFormData.image ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <img src={blogFormData.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '110px', objectFit: 'contain', borderRadius: '4px', border: '1px solid var(--border)' }} />
                      <span style={{ fontSize: '11px', color: 'var(--green)' }}>✓ Image ready</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '18px' }}>📸</span>
                      <span style={{ fontSize: '12px', color: 'var(--dim)' }}>Click to upload cover image from device</span>
                    </div>
                  )}
                </div>

                {/* Optional manual URL entry */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                  <input type="text" name="image" value={blogFormData.image} onChange={handleBlogInputChange} placeholder="Or enter manual image URL..." style={{ ...inputStyle, flex: 1, fontSize: '11px' }} onClick={e => e.stopPropagation()} />
                  {blogFormData.image && (
                    <button type="button" onClick={(e) => { e.stopPropagation(); setBlogFormData(prev => ({ ...prev, image: '' })); }} style={{ padding: '6px 12px', background: 'rgba(244,67,54,0.1)', border: '1px solid rgba(244,67,54,0.2)', color: '#f44336', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>
                      Remove
                    </button>
                  )}
                </div>

                {blogUploadError && (
                  <div style={{ fontSize: '11px', color: 'var(--red)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ⚠️ {blogUploadError}
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>Summary (For Card/Meta Preview)</label>
                <textarea name="summary" value={blogFormData.summary} onChange={handleBlogInputChange} style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} placeholder="Provide a brief summary of this article..."
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>

              <div>
                <label style={labelStyle}>Content (Markdown Supported)</label>
                <textarea name="content" value={blogFormData.content} onChange={handleBlogInputChange} required style={{ ...inputStyle, minHeight: '300px', resize: 'vertical', fontFamily: 'JetBrains Mono, Courier New, monospace', fontSize: '12px' }} placeholder="# My Article Title&#10;&#10;Use markdown headers, lists, and code fences.&#10;&#10;```python&#10;print('Hello World')&#10;```"
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
                <button type="submit" style={btnPrimary}>
                  {editingBlogId ? 'Update Post' : 'Publish Post'}
                </button>
                {editingBlogId && (
                  <button type="button" onClick={() => {
                    setEditingBlogId(null);
                    setBlogFormData({ title: '', content: '', summary: '', category: '', tags: '', readTime: '', author: 'Md. Ashik Siddike', image: '', slug: '' });
                  }} style={btnSecondary}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Column */}
          <div>
            <h3 style={{ color: 'var(--bright)', marginBottom: '1rem', fontSize: '14px' }}>
              📖 Dynamic Database Blogs ({blogs.length})
            </h3>
            {blogsLoading ? (
              <div style={{ color: 'var(--dim)', padding: '2rem' }}>Loading dynamic blogs...</div>
            ) : blogs.length === 0 ? (
              <div style={{ color: 'var(--dim)', padding: '2rem', textAlign: 'center', background: 'var(--bg2)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                No database blogs found. Publish your first one on the left!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '720px', overflowY: 'auto', paddingRight: '6px' }} className="thin-scroll">
                {blogs.map((b) => (
                  <div key={b._id} style={{
                    padding: '14px', borderRadius: '8px', border: '1px solid var(--border)',
                    background: 'var(--bg)', transition: 'border-color 0.2s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--purple)' }} />
                        <h4 style={{ fontWeight: 'bold', color: 'var(--bright)', margin: 0, fontSize: '13px' }}>{b.title}</h4>
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={() => handleBlogEdit(b)} style={actionBtn}
                          onMouseEnter={e => { e.target.style.background = 'rgba(79,193,255,0.15)'; }}
                          onMouseLeave={e => { e.target.style.background = 'transparent'; }}
                        >✏️</button>
                        <button onClick={() => handleBlogDelete(b._id)} style={actionBtn}
                          onMouseEnter={e => { e.target.style.background = 'rgba(244,67,54,0.15)'; }}
                          onMouseLeave={e => { e.target.style.background = 'transparent'; }}
                        >🗑️</button>
                      </div>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--text)', margin: '0 0 8px 0', lineHeight: 1.5 }}>
                      {b.summary || (b.content && b.content.substring(0, 120)) || 'No summary provided.'}
                    </p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', background: 'rgba(168,85,247,0.15)', color: '#dcdcaa', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(168,85,247,0.2)' }}>
                        {b.category || 'AI & Automation'}
                      </span>
                      {b.tags && b.tags.slice(0, 3).map((t, i) => (
                        <span key={i} style={{ fontSize: '10px', background: 'rgba(79,193,255,0.1)', color: 'var(--blue)', padding: '2px 8px', borderRadius: '4px' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : activeSubTab === 'inbox' ? (
        /* Inbox tab render content */
        <div style={{ background: 'var(--bg2)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--bright)', marginBottom: '1.2rem', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📥 Client Messages ({messages.length})
          </h3>
          
          {messagesLoading ? (
            <div style={{ color: 'var(--dim)', padding: '3rem', textAlign: 'center' }}>
              <div className="spinner" style={{ width: '24px', height: '24px', margin: '0 auto 12px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div style={{ color: 'var(--dim)', padding: '3rem', textAlign: 'center', background: 'var(--bg)', borderRadius: '8px', border: '1px dashed var(--border)' }}>
              <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>✉️</span>
              No messages found. Submissions from your contact page will appear here immediately!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {messages.map((msg) => (
                <div key={msg._id} style={{
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  position: 'relative'
                }}>
                  {/* Delete button top right */}
                  <button
                    onClick={() => handleDeleteMessage(msg._id)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '12px',
                      background: 'rgba(244,67,54,0.08)',
                      border: '1px solid rgba(244,67,54,0.15)',
                      color: '#f44336',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => { e.target.style.background = 'rgba(244,67,54,0.15)'; }}
                    onMouseLeave={e => { e.target.style.background = 'rgba(244,67,54,0.08)'; }}
                  >
                    Delete
                  </button>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px', paddingRight: '60px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--bright)' }}>{msg.name}</span>
                      <a href={`mailto:${msg.email}`} style={{ fontSize: '11px', color: 'var(--blue)', textDecoration: 'none' }}>
                        &lt;{msg.email}&gt;
                      </a>
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--dim)' }}>
                      📅 {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--yellow)', fontWeight: 'bold', marginBottom: '6px', fontFamily: 'JetBrains Mono, monospace' }}>
                      Subject: {msg.subject}
                    </div>
                    <p style={{
                      fontSize: '12px',
                      color: 'var(--text)',
                      lineHeight: 1.6,
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                      background: 'var(--bg2)',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid rgba(255,255,255,0.02)'
                    }}>
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Bots tab render content */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Add Bot Form */}
            <div style={{ background: 'var(--bg2)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--bright)', marginBottom: '1rem', fontSize: '14px' }}>
                ➕ Add New Twitter Target
              </h3>
              <form onSubmit={handleBotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Twitter Handle (e.g. @elonmusk)</label>
                  <input type="text" name="twitter_handle" value={botFormData.twitter_handle} 
                    onChange={(e) => setBotFormData({...botFormData, twitter_handle: e.target.value})} 
                    required style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
                <div>
                  <label style={labelStyle}>Niche / Category</label>
                  <input type="text" name="niche" value={botFormData.niche} 
                    onChange={(e) => setBotFormData({...botFormData, niche: e.target.value})} 
                    required style={inputStyle} placeholder="e.g. Technology, Crypto, AI"
                    onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
                <button type="submit" style={{...btnPrimary, marginTop: '0.5rem'}}>
                  Add Target
                </button>
              </form>
            </div>

            {/* Global Bot Config */}
            <div style={{ background: 'var(--bg2)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--bright)', marginBottom: '1rem', fontSize: '14px' }}>
                ⚙️ Global Bot Settings
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Posting Interval (Hours)</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="number" min="1" max="72" value={botConfig.interval} 
                      onChange={(e) => setBotConfig({...botConfig, interval: e.target.value})} 
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    <button onClick={() => saveBotConfig('interval', botConfig.interval)} style={{...btnSecondary, flex: '0 0 auto'}}>Save</button>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Max Articles Per Cycle</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="number" min="1" max="20" value={botConfig.max_articles} 
                      onChange={(e) => setBotConfig({...botConfig, max_articles: e.target.value})} 
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    <button onClick={() => saveBotConfig('max_articles', botConfig.max_articles)} style={{...btnSecondary, flex: '0 0 auto'}}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bot Sources List */}
          <div>
            <h3 style={{ color: 'var(--bright)', marginBottom: '1rem', fontSize: '14px' }}>
              🎯 Active Targets ({botSources.length})
            </h3>
            {botSourcesLoading ? (
              <div style={{ color: 'var(--dim)', padding: '2rem' }}>Loading targets...</div>
            ) : botSources.length === 0 ? (
              <div style={{ color: 'var(--dim)', padding: '2rem', textAlign: 'center', background: 'var(--bg2)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                No targets found. Add a Twitter handle to start auto-blogging!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '720px', overflowY: 'auto', paddingRight: '6px' }} className="thin-scroll">
                {botSources.map((source) => (
                  <div key={source.id} style={{
                    padding: '14px', borderRadius: '8px', border: '1px solid var(--border)',
                    background: 'var(--bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ fontWeight: 'bold', color: 'var(--bright)', margin: '0 0 4px 0', fontSize: '13px' }}>
                        @{source.twitter_handle}
                      </h4>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', background: 'rgba(79,193,255,0.1)', color: 'var(--blue)', padding: '2px 6px', borderRadius: '4px' }}>
                          {source.niche}
                        </span>
                        <span style={{ fontSize: '10px', color: 'var(--dim)' }}>
                          Errors: <span style={{ color: source.error_count > 0 ? 'var(--red)' : 'var(--green)' }}>{source.error_count}</span>
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button onClick={() => handleBotToggle(source.id, source.is_active)} 
                        style={{
                          padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer',
                          fontSize: '11px', fontWeight: 'bold',
                          background: source.is_active ? 'rgba(78,201,176,0.15)' : 'rgba(244,67,54,0.15)',
                          color: source.is_active ? 'var(--green)' : 'var(--red)'
                        }}>
                        {source.is_active ? 'Active' : 'Paused'}
                      </button>
                      <button onClick={() => handleBotDelete(source.id)} style={actionBtn}
                        onMouseEnter={e => { e.target.style.background = 'rgba(244,67,54,0.15)'; }}
                        onMouseLeave={e => { e.target.style.background = 'transparent'; }}
                      >🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}


      {/* Inline keyframe for spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ─── Shared Styles ───
const inputStyle = {
  width: '100%', padding: '10px 12px', borderRadius: '6px',
  border: '1px solid var(--border)', background: 'var(--bg)',
  color: 'var(--text)', outline: 'none', fontFamily: 'inherit', fontSize: '13px',
  transition: 'border-color 0.2s'
};

const labelStyle = {
  display: 'block', color: 'var(--dim)', fontSize: '11px',
  marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px'
};

const btnPrimary = {
  flex: 1, padding: '10px', borderRadius: '6px', border: 'none',
  background: 'linear-gradient(135deg, var(--blue), #c586c0)',
  color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px'
};

const btnSecondary = {
  flex: 1, padding: '10px', borderRadius: '6px',
  border: '1px solid var(--border)', background: 'var(--bg)',
  color: 'var(--text)', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px'
};

const actionBtn = {
  background: 'transparent', border: 'none', cursor: 'pointer',
  fontSize: '14px', padding: '4px 8px', borderRadius: '4px', transition: 'background 0.2s'
};

export default AdminPage;
