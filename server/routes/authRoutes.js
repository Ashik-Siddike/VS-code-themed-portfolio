const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid email or password' });
});

// Verify token
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ valid: false });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, email: decoded.email });
  } catch {
    res.status(401).json({ valid: false });
  }
});

module.exports = router;
