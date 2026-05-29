const Employee = require('../models/Employee');

// Barcha xodimlarni olish
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yangi xodim qo'shish
exports.createEmployee = async (req, res) => {
  try {
    const { name, position, statistics } = req.body;
    
    const employee = new Employee({
      name: typeof name === 'string' ? JSON.parse(name) : name,
      position: typeof position === 'string' ? JSON.parse(position) : position,
      image: req.file ? req.file.path : null,
      statistics: typeof statistics === 'string' ? JSON.parse(statistics) : statistics
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xodimni tahrirlash
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, statistics } = req.body;

    const updateData = {
      name: typeof name === 'string' ? JSON.parse(name) : name,
      position: typeof position === 'string' ? JSON.parse(position) : position,
      statistics: typeof statistics === 'string' ? JSON.parse(statistics) : statistics
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const employee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xodimni o'chirish
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
