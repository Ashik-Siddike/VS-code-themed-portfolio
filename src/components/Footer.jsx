import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
      <div className="container flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <a href="https://github.com/Ashik-Siddike" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }}>
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/ashik-siddike" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }}>
            <Linkedin size={20} />
          </a>
        </div>
        <div style={{ fontSize: '0.875rem' }}>
          <p>Designed & Built by Ashik Siddike</p>
          <p style={{ marginTop: '0.5rem' }}>&copy; {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
