const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const stockRoutes = require('./routes/stock');
require('dotenv').config();

const app = express();

// Middleware'ler
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Statik dosyalar için
app.use('/uploads', express.static('uploads')); // Yüklenen dosyalar için

// Rotalar
app.use('/api/auth', authRoutes);
app.use('/api/stock', stockRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));