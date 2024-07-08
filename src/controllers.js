const multer = require('multer');
const File = require('./models');
const path = require('path');
const fs = require('fs');

// Setup storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Controller to handle file upload
const uploadFile = async (req, res) => {
    const { description } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const newFile = new File({
        name: file.originalname,
        size: file.size,
        description,
        mime_type: file.mimetype,
        path: file.path,
    });

    await newFile.save();

    res.status(201).send(newFile);
};

// Controller to retrieve file information
const getFileById = async (req, res) => {
    const { id } = req.params;
    const file = await File.findById(id);

    if (!file) {
        return res.status(404).send('File not found.');
    }

    res.status(200).send(file);
};

// Controller to retrieve the actual file
const downloadFile = async (req, res) => {
    const { id } = req.params;
    const file = await File.findById(id);

    if (!file) {
        return res.status(404).send('File not found.');
    }

    res.download(file.path, file.name);
};

// Controller to update file information
const updateFile = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const file = await File.findByIdAndUpdate(id, updates, { new: true });

    if (!file) {
        return res.status(404).send('File not found.');
    }

    res.status(200).send(file);
};

// Controller to delete file by id
const deleteFile = async (req, res) => {
    const { id } = req.params;
    const file = await File.findByIdAndDelete(id);

    if (!file) {
        return res.status(404).send('File not found.');
    }

    fs.unlinkSync(file.path);  // Delete the file from the server

    res.status(204).send();
};

module.exports = {
    uploadFile,
    getFileById,
    downloadFile,
    updateFile,
    deleteFile,
    upload,
};
