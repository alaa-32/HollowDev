const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: String,
    size: Number,
    description: String,
    mime_type: String,
    path: String,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
