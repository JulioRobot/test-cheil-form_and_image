const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Gunakan environment variables dengan fallback
const baseUploadDir = process.env.UPLOAD_DIR || './uploads';
const uploadDir = path.join(baseUploadDir, 'images');

// Pastikan folder uploads ada
if (!fs.existsSync(uploadDir)) { 
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Fungsi untuk sanitize filename (mencegah path traversal)
const sanitizeFilename = (filename) => {
    // Hapus karakter berbahaya dan ganti dengan underscore
    const sanitized = filename
        .replace(/[^a-zA-Z0-9._-]/g, '_') // Hanya izinkan alphanumeric, dot, underscore, dash
        .replace(/\.{2,}/g, '_') // Ganti multiple dots dengan underscore (mencegah ../)
        .replace(/^\.+/, '') // Hapus dots di awal filename
        .slice(0, 100); // Limit panjang nama file max 100 karakter
    
    return sanitized;
};

// Konfigurasi storage (tempat penyimpanan file)
const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => { 
        // Sanitize original filename
        const sanitizedOriginalName = sanitizeFilename(file.originalname);
        
        // Generate unique suffix
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        
        // Get extension dari sanitized filename
        const ext = path.extname(sanitizedOriginalName);
        const basename = path.basename(sanitizedOriginalName, ext);
        
        // Format: fieldname-timestamp-random-originalname.ext
        const finalFilename = `${file.fieldname}-${uniqueSuffix}-${basename}${ext}`;
        
        cb(null, finalFilename);
    }
});

// Filter file (hanya menerima gambar)
const fileFilter = (req, file, cb) => {
    // Whitelist MIME types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    // Whitelist extensions (double check)
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
        cb(null, true); // File diterima
    } else {
        cb(new Error('Hanya file gambar (JPG, PNG, GIF, WEBP) yang diperbolehkan!'), false);
    }
};

// Konfigurasi multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880, // Default 5MB (5 * 1024 * 1024)
        files: 1, // Maksimal 1 file per request
        fields: 10 // Maksimal 10 fields (form data)
    },
    fileFilter: fileFilter
});

module.exports = upload;
