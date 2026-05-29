const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { uz: String, ru: String, en: String },
  description: { uz: String, ru: String, en: String },
  category: { uz: String, ru: String, en: String },
  images: [String],
  startDate: Date,
  endDate: Date,
  status: { uz: String, ru: String, en: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
