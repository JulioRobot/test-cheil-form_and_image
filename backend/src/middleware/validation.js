const { body, validationResult } = require('express-validator');

// Aturan validasi untuk submission form
const submissionValidation = [
    body('name')
        .notEmpty()
        .withMessage('Nama harus diisi')
        .isLength({ min: 2, max: 100 })
        .withMessage('Nama harus antara 2-100 karakter')
        .trim(),
    body('email')
        .notEmpty()
        .withMessage('Email harus diisi')
        .isEmail()
        .withMessage('Format Email tidak valid')
        .normalizeEmail(),
    body('phone')
        .notEmpty()
        .withMessage('Nomor telepon harus diisi')
        .matches(/^[0-9+\-\s()]+$/)
        .withMessage('Format Nomor telepon tidak valid')
        .isLength({ min: 10, max: 15 })
        .withMessage('Nomor telepon harus antara 10-15 digit')
];

// Middleware untuk mengecek hasil validasi
const checkValidationResult = (req, res, next) => { 
    const errors = validationResult(req);

    if (!errors.isEmpty()) { 
        return res.status(400).json({
            success: false,
            message: 'Validasi gagal',
            errors: errors.array()
        });
    }

    next();
}; 

module.exports = { submissionValidation, checkValidationResult };