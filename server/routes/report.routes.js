const express = require('express');
const { getMonthlySales, getInventoryReport, exportCSV } = require('../controllers/report.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/monthly-sales', protect, getMonthlySales);
router.get('/inventory', protect, getInventoryReport);
router.get('/export-csv', protect, exportCSV);

module.exports = router;
