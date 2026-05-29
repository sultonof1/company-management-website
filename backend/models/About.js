const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: { uz: String, ru: String, en: String },
  description: { uz: String, ru: String, en: String },
  history: { uz: String, ru: String, en: String },
  images: [String],
  achievements: [{
    title: { uz: String, ru: String, en: String },
    description: { uz: String, ru: String, en: String }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('About', aboutSchema);
