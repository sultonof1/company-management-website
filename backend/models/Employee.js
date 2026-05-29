const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { uz: String, ru: String, en: String },
  position: { uz: String, ru: String, en: String },
  image: String,
  statistics: { projects: Number, experience: Number, satisfaction: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);
