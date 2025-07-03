const express = require('express');
const { getDashboardData } = require('../controllers/getDashboardData');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getDashboardData);

module.exports = router;