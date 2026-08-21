const express = require('express');
const { createSale, getSales, getSaleByInvoice } = require('../controllers/sales.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, createSale);
router.get('/', protect, getSales);
router.get('/invoice/:invoiceId', protect, getSaleByInvoice);

module.exports = router;
