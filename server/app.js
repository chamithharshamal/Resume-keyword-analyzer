const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const atsRoutes = require('./routes/atsRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/analyze', atsRoutes);

module.exports = app;
