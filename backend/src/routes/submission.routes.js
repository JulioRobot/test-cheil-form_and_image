const express = require('express');
const router = express.Router();

// Import controllers
const {
    createSubmission,
    getAllSubmissions,
    getSubmissionById
} = require('../controllers/submission.controller');

// Import middleware
const { handleImageUpload } = require('../middleware/upload');


// Upload dulu, baru validasi di controller
router.post(
    '/',
    handleImageUpload,           
    createSubmission             
);


router.get('/', getAllSubmissions);


router.get('/:id', getSubmissionById);


module.exports = router;