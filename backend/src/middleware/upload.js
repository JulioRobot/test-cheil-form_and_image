const upload = require('../config/multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const handleImageUpload = (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return next(err);
        }

        // Jika tidak ada file yang diupload
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Gambar tidak boleh kosong'
            });
        }


        try { 
            const processedImagePath = await processImage(req.file);

            fs.unlinkSync(req.file.path);

            req.file.path = processedImagePath;
            req.file.filename = path.basename(processedImagePath);
            next();
        } catch (error) { 
            if (req.file && fs.existsSync(req.file.path)) { 
                fs.unlinkSync(req.file.path);
            }
            next(error);
        }

    });
};

const processImage = async (file) => {
    const outputPath = file.path.replace(path.extname(file.path), '_processed.jpg');

    await sharp(file.path)
        .resize(800, 600, { 
            fit: 'inside', // Menjaga aspect ratio
            withoutEnlargement: true // Tidak memperbesar gambar kecil
        })
        .jpeg({ quality: 85 }) // Compress dengan kualitas 85%
        .toFile(outputPath);
    
    return outputPath;
    
};

module.exports = {
    handleImageUpload
};