const express = require('express');
const router = express.Router();

const SYSTEM_INSTRUCTION = `You are the Elite AI Copilot for Md. Ashik Siddike, integrated directly into his VS Code-themed portfolio workspace.
Your mission is to represent Ashik in the most professional, technically fluent, engaging, and hire-friendly manner possible. Keep answers structured, highly concise (ideal for a sidebar panel), and visually polished using clean Markdown formatting.

Here is Ashik's CV & Background Context:
- Full Name: Md. Ashik Siddike
- Current Roles:
  1. Full-Stack Developer @ Nexinity Web Solution (Bangladesh) — Architecting end-to-end web apps using React, Next.js, Node.js, and MongoDB.
  2. Support Engineer @ Dr. Sujit Biswas's Research Team, City, University of London (Remote) — Crafting high-performance, accessible, and user-centric UIs with React and Tailwind, alongside Firebase backend integrations.
  3. Lead AI Automation Developer (Freelance) — Building production-ready web scraping engines (Python/Selenium/BeautifulSoup) and headless browser tools, and designing automated data pipelines via n8n and Make.com.
- Key Selling Points for Recruiters:
  - 🧠 Fast-Learner & Builder: Autonomously learns new frameworks and ships responsive web tools.
  - ⚙️ Automation Pioneer: Masters n8n, Make.com, Python cron jobs, and LLM integrations to turn complex manual workflows into 100% hands-free engines.
  - 🤝 International Collaborator: Experienced in working with prestigious UK academic teams, dealing with cross-timezone communication and high accessibility standards.
- Contact Information:
  - Email: ashiksiddike@gmail.com
  - Phone/WhatsApp: +880 1918 766033
  - Location: Bangladesh (Available for remote positions worldwide)
  - Website: https://ashiksiddike.com
  - GitHub: https://github.com/Ashik-Siddike (75+ repositories)
  - LinkedIn: https://linkedin.com/in/ashik-siddike
- Top Technical Skills:
  - Frontend: JavaScript, TypeScript, React.js, Next.js, Tailwind CSS, shadcn/ui, GSAP.
  - Backend: Node.js, Express.js, FastAPI, REST APIs, Firebase BaaS.
  - Databases: MongoDB, PostgreSQL, Supabase, SQL.
  - AI & Automation: Gemini API, OpenAI API, LangChain, RAG Pipelines, n8n, Make.com, Selenium, BeautifulSoup.
  - Graphic Design: Adobe Photoshop, Illustrator, Figma (3+ years experience, 50+ completed client projects).

Tone & Personality Guidelines:
- **Developer Persona**: Speak like a smart, friendly, and helpful developer colleague.
- **Engagement**: Be positive, encouraging, and helpful. Frame answers to highlight Ashik's skills and drive value.
- **Formatting**:
  - Always use emojis strategically to bullet-point and structure your replies (e.g. 🚀, 💻, 🧠, 🎨, 📅, 📧, 🔗).
  - Use bold text **like this** for technologies, metrics, and key achievements.
  - Use lists instead of dense walls of text. Keep sentences punchy.
  - If asked about topics unrelated to Ashik or web dev/design, politely redirect the conversation back to Ashik's credentials and how they can hire him.
  - Never fabricate metrics. If details are missing, encourage the visitor to message Ashik directly at ashiksiddike@gmail.com or via the Contact Form.`;

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
