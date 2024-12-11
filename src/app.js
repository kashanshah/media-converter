const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');

const apiKeyValidation = require('./middlewares/apiKey');
const rateLimiter = require('./middlewares/rateLimiter');
const convertRoutes = require('./routes/convert');

const app = express();
const PORT = process.env.PORT || 3000;

// Security and CORS
app.use(cors());
app.use(helmet());

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/v1/convert', apiKeyValidation, rateLimiter, convertRoutes);

// Ensure directories exist
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
if (!fs.existsSync(path.join(__dirname, '../public'))) fs.mkdirSync(path.join(__dirname, '../public'));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
