const express = require('express');
const router = express.Router();
const Guestbook = require('../models/Guestbook');

// GET all guestbook entries
router.get('/', async (req, res) => {
  try {
    const entries = await Guestbook.find().sort({ createdAt: -1 }).limit(100);
    return res.json({ success: true, entries });
  } catch (error) {
    console.error('Error fetching guestbook entries:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve guestbook entries' });
  }
});

// POST a new guestbook entry
router.post('/', async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ success: false, message: 'Name and message are required' });
  }

  try {
    const newEntry = new Guestbook({
      name: name.trim(),
      message: message.trim()
    });
    await newEntry.save();
    return res.status(201).json({ success: true, entry: newEntry });
  } catch (error) {
    console.error('Error saving guestbook entry:', error);
    return res.status(500).json({ success: false, message: 'Failed to save guestbook entry' });
  }
});

module.exports = router;
