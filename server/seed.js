const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

const seedProjects = [
  {
    title: 'Affiliate Automation System',
    desc: 'A full-scale affiliate marketing automation platform that automatically discovers trending keywords, generates AI-written SEO articles, creates product comparison images, and posts to social media. Built with Python, Gemini AI, and n8n/Make.com workflows.',
    tech: ['Python', 'Gemini AI', 'n8n', 'Make.com', 'HTML/CSS', 'Selenium'],
    accent: '#ff6fd8',
    github: 'https://github.com/Ashik-Siddike/Affilieate-Autometion',
    live: null,
    featured: true,
  },
  {
    title: 'Affiliate Automation — Next.js Site',
    desc: 'The public-facing Next.js website for the affiliate automation project. A modern TypeScript app with SEO-optimized product review pages, automated content delivery, and Vercel deployment.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    accent: '#4fc1ff',
    github: 'https://github.com/Ashik-Siddike/Affilieate-Automation-nextJS-site',
    live: 'https://affilieate-automation-next-js-site.vercel.app',
    featured: true,
  },
  {
    title: 'SaaS Dashboard',
    desc: 'A full-featured SaaS analytics dashboard with real-time data visualization, user management, and subscription tracking. Built with Next.js and TypeScript, deployed and live on Vercel.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel'],
    accent: '#4ec9b0',
    github: 'https://github.com/Ashik-Siddike/saas-dashboard',
    live: 'https://saas-dashboard-amber.vercel.app',
    featured: false,
  },
  {
    title: 'Aronnyo — Kids Learning Platform',
    desc: 'An interactive kids learning platform with gamified lessons, progress tracking, and engaging UI. Built with Next.js and TypeScript, designed to make learning fun for young students.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel'],
    accent: '#dcdcaa',
    github: 'https://github.com/Ashik-Siddike/aronnyo',
    live: 'https://kids-learning-platform-lilac.vercel.app',
    featured: false,
  },
  {
    title: 'Play Learn Grow Kids (247School)',
    desc: 'A comprehensive 24/7 online school platform for kids with interactive lessons, quizzes, and learning paths. Features gamification elements to keep students engaged.',
    tech: ['TypeScript', 'Next.js', 'React', 'Vercel'],
    accent: '#c586c0',
    github: 'https://github.com/Ashik-Siddike/play-learn-grow-kids',
    live: 'https://247school.vercel.app',
    featured: false,
  },
  {
    title: 'Social Media Growing Agent',
    desc: 'An AI-powered social media growth automation agent built in Python. Automates content generation, posting schedules, and engagement strategies to grow social media presence organically.',
    tech: ['Python', 'AI APIs', 'Automation', 'n8n'],
    accent: '#ce9178',
    github: 'https://github.com/Ashik-Siddike/social-media-growing-agent',
    live: null,
    featured: false,
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to DB. Seeding data...');
    await Project.deleteMany({});
    await Project.insertMany(seedProjects);
    console.log('Seed complete!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
