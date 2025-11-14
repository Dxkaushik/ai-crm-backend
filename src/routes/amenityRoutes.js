const express = require('express');
const router = express.Router();

const {
  createAmenity,
  getAllAmenities,
  updateAmenity,
  deleteAmenity
} = require('../controllers/amenityController');

const { protect, restrictTo } = require('../middleware/authMiddleware');

// 🧱 Admin Routes
router.post(
  '/create',
  protect,
  restrictTo('Admin', 'Director', 'Manager'),
  createAmenity
);

router.put(
  '/update/:id',
  protect,
  restrictTo('Admin', 'Director', 'Manager'),
  updateAmenity
);

router.delete(
  '/delete/:id',
  protect,
  restrictTo('Admin', 'Director', 'Manager'),
  deleteAmenity
);

router.get('/', getAllAmenities);

module.exports = router;
