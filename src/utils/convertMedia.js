const ffmpeg = require('fluent-ffmpeg');

// Set the custom FFmpeg path
ffmpeg.setFfmpegPath('/tmp/ffmpeg/ffmpeg');

function convertMedia(inputPath, outputPath, format, callback) {
    ffmpeg(inputPath)
        .output(outputPath)
        .outputFormat(format)
        .on('end', () => callback(null, outputPath))
        .on('error', (err) => callback(err))
        .run();
}

module.exports = convertMedia;
