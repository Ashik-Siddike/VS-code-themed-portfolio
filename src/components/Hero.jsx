import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section container" id="home">
      <div className="flex flex-col justify-center gap-8" style={{ maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '1rem' }}>
            Hi, my name is
          </h2>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            Aahana Bobade.
          </h1>
          <h1 className="text-secondary" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            I build things for the web.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2rem' }}>
            I'm a software developer specializing in backend engineering, AI/ML, and building exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4 items-center"
        >
          <a href="#projects" className="btn btn-primary">
            Check out my work!
          </a>
          <div className="flex gap-4" style={{ marginLeft: '1rem' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}>
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}>
              <Linkedin size={24} />
            </a>
            <a href="mailto:contact@example.com" style={{ color: 'var(--text-primary)' }}>
              <Mail size={24} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
