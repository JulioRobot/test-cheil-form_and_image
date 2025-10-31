const { prisma } = require('../config/database');
const path = require('path');


const createSubmission = async (req, res, next) => {
    try {
        // ambil data dari request body (form data)
        const { name, email, phone } = req.body;

        // VALIDASI MANUAL
        const errors = [];

        // Validasi name
        if (!name || name.trim().length === 0) {
            errors.push({ field: 'name', message: 'Nama harus diisi' });
        } else if (name.trim().length < 2 || name.trim().length > 100) {
            errors.push({ field: 'name', message: 'Nama harus antara 2-100 karakter' });
        }

        // Validasi email
        if (!email || email.trim().length === 0) {
            errors.push({ field: 'email', message: 'Email harus diisi' });
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push({ field: 'email', message: 'Format Email tidak valid' });
            }
        }

        // Validasi phone
        if (!phone || phone.trim().length === 0) {
            errors.push({ field: 'phone', message: 'Nomor telepon harus diisi' });
        } else {
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(phone)) {
                errors.push({ field: 'phone', message: 'Format Nomor telepon tidak valid' });
            } else if (phone.trim().length < 10 || phone.trim().length > 15) {
                errors.push({ field: 'phone', message: 'Nomor telepon harus antara 10-15 digit' });
            }
        }

        // ambil informasi file yang diupload
        // req.file berasal dari multer middleware
        const imagePath = req.file ? req.file.filename : null;

        // validasi: pastikan image ada
        if (!imagePath) {
            errors.push({ field: 'image', message: 'Gambar wajib diupload' });
        }

        // Jika ada error, return error response
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validasi gagal',
                errors: errors
            });
        }

        // Simpan data ke database menggunakan Prisma
        const submission = await prisma.submission.create({
            data: {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                phone: phone.trim(),
                imagePath: imagePath
            }
        });

        // Tambahkan imageUrl untuk response (tidak disimpan di DB)
        const responseData = {
            ...submission,
            imageUrl: `/uploads/${imagePath}`
        };

        // kirim response sukses ke client
        res.status(201).json({
            success: true,
            message: 'Submission berhasil dibuat',
            data: responseData
        });

    } catch (error) {
         // Jika terjadi error, lempar ke error handler middleware
         console.error('Error in createSubmission:', error);
         next(error);
    }
};


const getAllSubmissions = async (req, res, next) => {
    try {
        // 1. Ambil query parameters untuk pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // 2. Hitung total data
        const totalSubmissions = await prisma.submission.count();

        // 3. Ambil data dari database dengan pagination
        const submissions = await prisma.submission.findMany({
            skip: skip,
            take: limit,
            orderBy: {
                createdAt: 'desc' // Urutkan dari yang terbaru
            }
        });

        // Tambahkan imageUrl ke setiap submission
        const submissionsWithUrl = submissions.map(sub => ({
            ...sub,
            imageUrl: `/uploads/${sub.imagePath}`
        }));

        // 4. Kirim response
        res.status(200).json({
            success: true,
            message: 'Data submissions berhasil diambil',
            data: submissionsWithUrl,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalSubmissions / limit),
                totalItems: totalSubmissions,
                itemsPerPage: limit
            }
        });

    } catch (error) {
        console.error('Error in getAllSubmissions:', error);
        next(error);
    }
};


const getSubmissionById = async (req, res, next) => { 
    try {
        // ambil id dari params
        const { id } = req.params;
        
        // ambil data dari database dengan id (gunakan string karena CUID)
        const submission = await prisma.submission.findUnique({
            where: {
                id: id
            }
        });

        // jika submission tidak ditemukan, kirim response error
        if (!submission) { 
            return res.status(404).json({
                success: false,
                message: 'Submission tidak ditemukan'
            });
        }

        // Tambahkan imageUrl untuk response
        const responseData = {
            ...submission,
            imageUrl: `/uploads/${submission.imagePath}`
        };

        // kirim response sukses ke client
        res.status(200).json({
            success: true,
            message: 'Submission berhasil diambil',
            data: responseData
        });

    } catch (error) {
        console.error('Error in getSubmissionById:', error);
        next(error);
    }
};

// Export semua function agar bisa dipakai di file lain
module.exports = {
    createSubmission,
    getAllSubmissions,
    getSubmissionById
};