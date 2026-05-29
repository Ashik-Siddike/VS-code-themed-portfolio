import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="section container" id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', display: 'inline-block' }}>About Me</h2>
        
        <div className="flex" style={{ gap: '4rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <p style={{ marginBottom: '1rem' }}>
              Hello! My name is Aahana and I enjoy creating things that live on the internet. My interest in web development started back in 2020 when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS taught me a lot about HTML & CSS!
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Fast-forward to today, and I've had the privilege of working at an AI startup, a student-led design studio, and a huge corporation. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
            </p>
            <p>
              Here are a few technologies I've been working with recently:
            </p>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(140px, 200px))', gap: '0 10px', padding: '0', margin: '20px 0 0 0', listStyle: 'none' }}>
              <li style={{ position: 'relative', marginBottom: '10px', paddingLeft: '20px' }}>JavaScript (ES6+)</li>
              <li style={{ position: 'relative', marginBottom: '10px', paddingLeft: '20px' }}>React</li>
              <li style={{ position: 'relative', marginBottom: '10px', paddingLeft: '20px' }}>Node.js</li>
              <li style={{ position: 'relative', marginBottom: '10px', paddingLeft: '20px' }}>Python</li>
              <li style={{ position: 'relative', marginBottom: '10px', paddingLeft: '20px' }}>TensorFlow</li>
              <li style={{ position: 'relative', marginBottom: '10px', paddingLeft: '20px' }}>SQL</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass-card animate-float" style={{ width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--primary-hover)', borderRadius: '1rem', overflow: 'hidden' }}>
                <span style={{ fontSize: '4rem', fontWeight: 'bold' }}>AB</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
