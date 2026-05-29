const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  tech: [{ type: String }],
  accent: { type: String, default: '#4fc1ff' },
  github: { type: String },
  live: { type: String },
  featured: { type: Boolean, default: false },
  image: { type: String, default: '' },
  longDesc: { type: String, default: '' },
  usage: { type: String, default: '' },
  howItWorks: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
