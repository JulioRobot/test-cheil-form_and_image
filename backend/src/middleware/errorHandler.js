const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    console.error(err); // Log error untuk debugging

    // Error dari Multer (file upload)
    if (err.code === 'LIMIT_FILE_SIZE') {
        const message = 'File terlalu besar. Maksimal 5MB';
        error = { message, statusCode: 400 };
    }

    // Error dari Multer (file type)
    if (err.message === 'Hanya file gambar yang diperbolehkan!') {
        error = { message: err.message, statusCode: 400 };
    }

    // Error dari Prisma (database)
    if (err.code === 'P2002') {
        const message = 'Data sudah ada';
        error = { message, statusCode: 400 };
    }

    // Error validasi
    if (err.name === 'ValidationError') {
        const message = 'Data tidak valid';
        error = { message, statusCode: 400 };
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// Middleware untuk menangani route yang tidak ditemukan
const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} tidak ditemukan`);
    res.status(404);
    next(error);
};

module.exports = {
    errorHandler,
    notFound
};