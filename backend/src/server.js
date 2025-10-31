const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// import database connection
const { connectDB, disconnectDB } = require('./config/database');

// import error handler
const { errorHandler, notFound } = require('./middleware/errorHandler');

const submissionRoutes = require('./routes/submission.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Rate limiting middleware (membatasi jumlah request)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Terlalu banyak request. Silakan coba lagi nanti.'
    }
});

//Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: false, // Untuk mengakses gambar dari frontend
}));

// CORS configuration - Fixed untuk support file upload
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Default Vite port
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin'
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 86400 // 24 hours
}));

// Apply rate limiting
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (untuk mengakses gambar yang diupload)
app.use('/uploads', express.static('uploads'));

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Cheil Backend API is running',
        timestamp: new Date().toISOString()
    });
});


app.use('/api/submissions', submissionRoutes);

// Error handling middleware (harus di bagian akhir)
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('👋 SIGTERM received, shutting down gracefully');
    await disconnectDB();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('👋 SIGINT received, shutting down gracefully');
    await disconnectDB();
    process.exit(0);
});