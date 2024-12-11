const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const convertMedia = require('../utils/convertMedia');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Convert video to MP4
router.post('/mp4', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No video file provided.' });
    }

    const inputPath = req.file.path;
    const outputPath = path.join('uploads', `${Date.now()}.mp4`);

    convertMedia(inputPath, outputPath, 'mp4', (err) => {
        fs.unlinkSync(inputPath);
        if (err) {
            return res.status(500).json({ error: 'Video conversion failed.', details: err.message });
        }
        res.download(outputPath, () => fs.unlinkSync(outputPath));
    });
});

// Convert audio to MP3
router.post('/mp3', upload.single('audio'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No audio file provided.' });
    }

    const inputPath = req.file.path;
    const outputPath = path.join('uploads', `${Date.now()}.mp3`);

    convertMedia(inputPath, outputPath, 'mp3', (err) => {
        fs.unlinkSync(inputPath);
        if (err) {
            return res.status(500).json({ error: 'Audio conversion failed.', details: err.message });
        }
        res.download(outputPath, () => fs.unlinkSync(outputPath));
    });
});

module.exports = router;
