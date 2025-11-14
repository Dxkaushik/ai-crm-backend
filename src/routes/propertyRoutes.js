const express = require('express');
const router = express.Router();
const {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty
} = require('../controllers/propertyController');

const { protect, restrictTo } = require('../middleware/authMiddleware');

// 🧱 Admin Routes
router.post(
    '/create',
    protect,
    restrictTo('Admin', 'Director', 'Manager'),
    createProperty
);

router.put(
    '/update/:id',
    protect,
    restrictTo('Admin', 'Director', 'Manager'),
    updateProperty
);

router.delete(
    '/delete/:id',
    protect,
    restrictTo('Admin', 'Director', 'Manager'),
    deleteProperty
);

// 👀 Public Routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

module.exports = router;
