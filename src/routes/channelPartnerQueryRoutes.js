const express = require('express');
const router = express.Router();
const {
    createQuery,
    getAllQueries,
    deleteQuery
} = require('../controllers/channelPartnerQueryController');

const { protect, restrictTo } = require('../middleware/authMiddleware');

router.post('/', createQuery);

router.get('/', protect, restrictTo('Admin'), getAllQueries);
router.delete('/:id', protect, restrictTo('Admin'), deleteQuery);

module.exports = router;
