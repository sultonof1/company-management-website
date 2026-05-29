const Project = require('../models/Project');

// Barcha loyihalarni olish
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yangi loyiha qo'shish
exports.createProject = async (req, res) => {
  try {
    const { name, description, category, status, startDate, endDate } = req.body;

    const project = new Project({
      name: typeof name === 'string' ? JSON.parse(name) : name,
      description: typeof description === 'string' ? JSON.parse(description) : description,
      category: typeof category === 'string' ? JSON.parse(category) : category,
      status: typeof status === 'string' ? JSON.parse(status) : status,
      startDate,
      endDate,
      images: req.files ? req.files.map(file => file.path) : []
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Loyihani tahrirlash
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, status, startDate, endDate } = req.body;

    const updateData = {
      name: typeof name === 'string' ? JSON.parse(name) : name,
      description: typeof description === 'string' ? JSON.parse(description) : description,
      category: typeof category === 'string' ? JSON.parse(category) : category,
      status: typeof status === 'string' ? JSON.parse(status) : status,
      startDate,
      endDate
    };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.path);
    }

    const project = await Project.findByIdAndUpdate(id, updateData, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Loyihani o'chirish
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
