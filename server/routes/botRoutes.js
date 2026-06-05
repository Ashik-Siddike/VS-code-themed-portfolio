const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Check if Supabase is configured
const checkSupabase = (req, res, next) => {
  if (!supabase) {
    return res.status(500).json({ message: 'Supabase credentials are not configured in the server.' });
  }
  next();
};

// 1. Get all bot sources
router.get('/sources', authMiddleware, checkSupabase, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blog_sources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Supabase fetch error:', error);
    res.status(500).json({ message: error.message });
  }
});

// 2. Add a new bot source
router.post('/sources', authMiddleware, checkSupabase, async (req, res) => {
  const { twitter_handle, niche } = req.body;
  if (!twitter_handle || !niche) {
    return res.status(400).json({ message: 'Twitter handle and Niche are required' });
  }

  // clean handle (remove @ and whitespace)
  const cleanHandle = twitter_handle.replace('@', '').trim();

  try {
    const { data, error } = await supabase
      .from('blog_sources')
      .insert([{ twitter_handle: cleanHandle, niche, is_active: true }])
      .select();

    if (error) {
      if (error.code === '23505') {
        return res.status(400).json({ message: 'This Twitter handle is already added.' });
      }
      throw error;
    }
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Supabase insert error:', error);
    res.status(500).json({ message: error.message });
  }
});

// 3. Toggle source status
router.put('/sources/:id/toggle', authMiddleware, checkSupabase, async (req, res) => {
  const { is_active } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('blog_sources')
      .update({ is_active })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ message: 'Source not found' });
    
    res.json(data[0]);
  } catch (error) {
    console.error('Supabase update error:', error);
    res.status(500).json({ message: error.message });
  }
});

// 4. Delete a source
router.delete('/sources/:id', authMiddleware, checkSupabase, async (req, res) => {
  try {
    const { error } = await supabase
      .from('blog_sources')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Source deleted successfully' });
  } catch (error) {
    console.error('Supabase delete error:', error);
    res.status(500).json({ message: error.message });
  }
});

// 5. Get Bot Config
router.get('/config', authMiddleware, checkSupabase, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bot_config')
      .select('key, value');

    if (error) {
      if (error.code === '42P01') {
        return res.json([]); // Table doesn't exist yet
      }
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.error('Supabase fetch config error:', error);
    res.status(500).json({ message: error.message });
  }
});

// 6. Update Bot Config
router.post('/config', authMiddleware, checkSupabase, async (req, res) => {
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ message: 'Config key is required' });

  try {
    const { data, error } = await supabase
      .from('bot_config')
      .upsert({ key, value, updated_at: new Date() }, { onConflict: 'key' })
      .select();

    if (error) throw error;
    res.json(data[0] || { key, value });
  } catch (error) {
    console.error('Supabase update config error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
