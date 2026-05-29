import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <header className="nav-header">
      <div className="container flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="logo"
        >
          <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Aahana Bobade
          </a>
        </motion.div>
        
        <nav>
          <motion.ul 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            className="nav-links"
          >
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </motion.ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
