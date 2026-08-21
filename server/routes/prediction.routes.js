const express = require('express');
const { getPredictionByProduct, getPredictionsAll } = require('../controllers/prediction.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/all', protect, getPredictionsAll);
router.get('/product/:productId', protect, getPredictionByProduct);

module.exports = router;
