const express = require('express');
const router = express.Router();
const {
    createCompany,
    getCompanies,
    updateCompany,
    deleteCompany
} = require('../controllers/companyController');

const { protect, restrictTo } = require('../middleware/authMiddleware');

// All routes protected and admin-only
router.post('/', protect, restrictTo('Admin'), createCompany);
router.get('/', protect, restrictTo('Admin'), getCompanies);
router.put('/:id', protect, restrictTo('Admin'), updateCompany);
router.delete('/:id', protect, restrictTo('Admin'), deleteCompany);

module.exports = router;
