const express = require('express');
const {
  getOverview,
  getSalesChart,
  getTopProducts,
  getRecentActivities
} = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/overview', protect, getOverview);
router.get('/sales-chart', protect, getSalesChart);
router.get('/top-products', protect, getTopProducts);
router.get('/recent-activities', protect, getRecentActivities);

module.exports = router;
