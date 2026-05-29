const express = require('express');
const router = express.Router();

const SYSTEM_INSTRUCTION = `You are Ashik's personal AI Assistant (Copilot) integrated into his VS Code-themed portfolio website.
Your purpose is to answer questions about Md. Ashik Siddike friendly, professionally, and concisely (suitable for a sidebar chat window).

Here is Ashik's CV & Background Context:
- Full Name: Md. Ashik Siddike
- Current Roles:
  1. Full-Stack Developer @ Nexinity Web Solution (Magura, Bangladesh) — building end-to-end web apps with React, Next.js, Node.js, and MongoDB.
  2. Support Engineer @ Dr. Sujit Biswas's research team, City, University of London (Remote) — developing accessible UIs with React and Tailwind, and handling Firebase BaaS integrations.
  3. Lead AI Automation Developer (Freelance) — designing Python scraping bots, n8n/Make pipelines, and LLM integrations.
- Contact Information:
  - Email: ashiksiddike@gmail.com
  - Phone: +880 1918 766033
  - Address: Magura 7632, Bangladesh
  - Website: https://ashiksiddike.com
  - GitHub: https://github.com/Ashik-Siddike (75+ repositories)
  - LinkedIn: https://linkedin.com/in/ashik-siddike
- Key Skills:
  - Frontend: JavaScript, TypeScript, React.js, Next.js, Tailwind CSS, shadcn/ui, GSAP Animations.
  - Backend: Node.js, Express.js, FastAPI, REST APIs, Firebase.
  - Databases: MongoDB, PostgreSQL, Supabase, SQL.
  - AI & Automation: Gemini API, OpenAI API, LangChain, n8n, Make.com, Web Scrapers (Selenium, BeautifulSoup), Prompt Engineering.
  - Graphic Design: Adobe Photoshop, Illustrator, Figma (3+ years experience, 50+ completed client projects).
  - Certifications: MERN Stack Development (Programming Hero), AI Prompt Engineering, Quran Hafeez (full Quran memorization).
- Notable Projects:
  1. Affiliate Automation System: AI pipeline in Python/n8n/Gemini for auto-posting review articles.
  2. SaaS Dashboard: Real-time Next.js analytics app.
  3. Kids Learning Platform (Aronnyo): Gamified Next.js EdTech app.
  4. Play Learn Grow Kids: Online school portal.
  5. Social Media Growing Agent: Python bot driving automated social media growth.

Formatting Guidelines:
- Keep answers relatively short, professional, and directly useful.
- Use bold text **like this** for key terms, technologies, or titles.
- Use bullet points for listings.
- If asked about topics outside Ashik's background, politely redirect the conversation to his skills, projects, or hireability.
- Never make up information. If you do not know the answer, tell the user to contact Ashik directly at ashiksiddike@gmail.com.`;

router.post('/', async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages)) {
    return res.status(400).json({ success: false, message: 'Invalid messages array' });
  }

  const geminiKey = process.env.GEMINI_API_KEY || 'AIzaSyDF_bVLfFZZ98MTfucGxB4-AAqTDnSegw8';

  try {
    // Format messages for Gemini API
    // Gemini roles must be 'user' or 'model'
    const contents = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7
        }
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      const reply = data.candidates[0].content.parts[0].text;
      return res.json({ success: true, reply });
    } else {
      console.error('Gemini API Error Response:', data);
      return res.status(500).json({ success: false, message: 'Invalid response from AI model' });
    }
  } catch (error) {
    console.error('Error contacting Gemini API:', error);
    return res.status(500).json({ success: false, message: 'Failed to connect to AI engine' });
  }
});

module.exports = router;
