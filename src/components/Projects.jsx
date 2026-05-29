import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ title, description, tech, github, external }) => {
  return (
    <motion.div 
      className="glass-card"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.2 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
        <div style={{ color: 'var(--secondary)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-folder" style={{ width: '40px', height: '40px' }}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <div className="flex gap-4">
          {github && <a href={github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><Github size={20} /></a>}
          {external && <a href={external} target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><ExternalLink size={20} /></a>}
        </div>
      </div>
      
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{title}</h3>
      <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', flexGrow: 1 }}>
        <p>{description}</p>
      </div>
      
      <ul className="flex flex-wrap" style={{ listStyle: 'none', gap: '1rem', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        {tech.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "AI Image Generator",
      description: "A web application that generates images from text descriptions using advanced machine learning models. Built with React and integrated with OpenAI's DALL-E API.",
      tech: ["React", "Node.js", "Express", "OpenAI API"],
      github: "#",
      external: "#"
    },
    {
      title: "E-Commerce Dashboard",
      description: "An admin dashboard for managing products, viewing analytics, and processing orders. Includes real-time data visualization using Recharts.",
      tech: ["React", "Redux", "Material UI", "Chart.js"],
      github: "#",
      external: "#"
    },
    {
      title: "Portfolio V1",
      description: "The first iteration of my personal portfolio website built with plain HTML, CSS, and vanilla JavaScript. Features custom animations and a responsive design.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "#",
      external: "#"
    }
  ];

  return (
    <section className="section container" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', display: 'inline-block', marginBottom: '2rem' }}>Some Things I've Built</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
