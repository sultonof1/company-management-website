require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database (Ma'lumotlar bazasi) ulanishi
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sultonof-campaign', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err));

// Marshrutlar (Routes)
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/employees'));
app.use('/api', require('./routes/about'));
app.use('/api', require('./routes/projects'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
