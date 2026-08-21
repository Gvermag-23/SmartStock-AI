const express = require('express');
const { stockIn, stockOut, getHistory, getLowStock } = require('../controllers/inventory.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

const router = express.Router();

router.post('/stock-in', protect, authorize('admin', 'manager', 'staff'), stockIn);
router.post('/stock-out', protect, authorize('admin', 'manager', 'staff'), stockOut);
router.get('/history', protect, getHistory);
router.get('/low-stock', protect, getLowStock);

module.exports = router;
