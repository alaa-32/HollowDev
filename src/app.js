const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/file_upload', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use the routes defined in routes.js
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
