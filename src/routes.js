const express = require('express');
const {
    uploadFile,
    getFileById,
    downloadFile,
    updateFile,
    deleteFile,
    upload,
} = require('./controllers');

const router = express.Router();

router.post('/files', upload.single('file'), uploadFile);
router.get('/files/:id', getFileById);
router.get('/files/download/:id', downloadFile);
router.put('/files/:id', updateFile);
router.delete('/files/:id', deleteFile);

module.exports = router;
