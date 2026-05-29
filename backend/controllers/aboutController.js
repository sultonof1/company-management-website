const About = require('../models/About');

// Kompaniya haqida ma'lumot olish
exports.getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About({
        title: { uz: 'Sultonof Campaign', ru: 'Sultonof Campaign', en: 'Sultonof Campaign' },
        description: { uz: 'Kompaniyamizga xush kelibsiz!', ru: 'Добро пожаловать!', en: 'Welcome to our company!' },
        history: { uz: '', ru: '', en: '' },
        images: [],
        achievements: []
      });
      await about.save();
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kompaniya ma'lumotlarini yangilash
exports.updateAbout = async (req, res) => {
  try {
    const { title, description, history, achievements } = req.body;
    
    let about = await About.findOne();
    if (!about) {
      about = new About();
    }

    about.title = typeof title === 'string' ? JSON.parse(title) : title;
    about.description = typeof description === 'string' ? JSON.parse(description) : description;
    about.history = typeof history === 'string' ? JSON.parse(history) : history;
    about.achievements = typeof achievements === 'string' ? JSON.parse(achievements) : achievements;

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path);
      about.images = [...about.images, ...newImages];
    }

    await about.save();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Galereyadan rasm o'chirish
exports.deleteImage = async (req, res) => {
  try {
    const { imagePath } = req.body;
    const about = await About.findOne();
    if (about) {
      about.images = about.images.filter(img => img !== imagePath);
      await about.save();
    }
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
