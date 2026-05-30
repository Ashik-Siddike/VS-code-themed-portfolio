const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir());
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed!'));
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Upload cover image
router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio_blogs',
      transformation: [
        { width: 1600, height: 900, crop: 'limit', quality: 'auto', fetch_format: 'auto' }
      ]
    });

    fs.unlink(req.file.path, () => {});
    res.json({ url: result.secure_url });
  } catch (error) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(500).json({ message: 'Cloudinary upload failed: ' + error.message });
  }
}, (error, req, res, next) => {
  res.status(400).json({ message: error.message });
});

// Get all blogs (sorted by date, newest first)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog article not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new blog
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, summary, category, tags, readTime, author, image } = req.body;
    
    // Automatically generate clean slug if not provided
    let slug = req.body.slug;
    if (!slug && title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    }

    // Check slug uniqueness
    const exists = await Blog.findOne({ slug });
    if (exists) {
      // Append random suffix
      slug = `${slug}-${Math.floor(100 + Math.random() * 900)}`;
    }

    const blog = new Blog({
      title,
      slug,
      content,
      summary,
      category,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      readTime: readTime || '5 min read',
      author: author || 'Md. Ashik Siddike',
      image
    });

    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a blog
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, content, summary, category, tags, readTime, author, image, slug } = req.body;
    
    const updateData = {
      title, content, summary, category, readTime, author, image
    };
    
    if (slug) updateData.slug = slug;
    if (tags) {
      updateData.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: 'Blog article not found' });
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a blog
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: 'Blog article not found' });
    res.json({ message: 'Blog article successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
