const Product = require('../models/Product');
const Sale = require('../models/Sale');
const Prediction = require('../models/Prediction');

exports.getPredictionByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate('category', 'name');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const sales = await Sale.find({ product: productId }).sort({ saleDate: -1 });

    const totalSold = sales.reduce((sum, s) => sum + s.quantity, 0);
    const avgDailyDemand = sales.length > 0 ? Math.ceil(totalSold / Math.max(sales.length, 7)) : 5;
    
    // Formula: Reorder = Predicted Demand - Current Stock + Safety Stock (10)
    const predictedDemand = Math.max(avgDailyDemand * 7, 15);
    const safetyStock = 10;
    const reorderQuantity = Math.max(predictedDemand - product.stock + safetyStock, 0);

    const forecastData = [
      { day: 'Mon', demand: Math.round(predictedDemand * 0.12) },
      { day: 'Tue', demand: Math.round(predictedDemand * 0.14) },
      { day: 'Wed', demand: Math.round(predictedDemand * 0.13) },
      { day: 'Thu', demand: Math.round(predictedDemand * 0.15) },
      { day: 'Fri', demand: Math.round(predictedDemand * 0.18) },
      { day: 'Sat', demand: Math.round(predictedDemand * 0.16) },
      { day: 'Sun', demand: Math.round(predictedDemand * 0.12) }
    ];

    const result = {
      product: product.name,
      sku: product.sku,
      currentStock: product.stock,
      predictedDemand,
      reorderQuantity,
      safetyStock,
      suggestion: reorderQuantity > 0 ? `Reorder ${reorderQuantity} units` : 'Stock Sufficient',
      forecastData
    };

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

exports.getPredictionsAll = async (req, res, next) => {
  try {
    const products = await Product.find().populate('category', 'name');
    const predictions = [];

    for (const product of products) {
      const sales = await Sale.find({ product: product._id });
      const totalSold = sales.reduce((sum, s) => sum + s.quantity, 0);
      const avgDemand = sales.length > 0 ? Math.ceil(totalSold / Math.max(sales.length, 5)) : Math.floor(Math.random() * 10) + 5;
      
      const predictedDemand = Math.max(avgDemand * 7, 20);
      const safetyStock = 10;
      const reorderQuantity = Math.max(predictedDemand - product.stock + safetyStock, 0);

      predictions.push({
        productId: product._id,
        productName: product.name,
        sku: product.sku,
        category: product.category ? product.category.name : 'General',
        currentStock: product.stock,
        minimumStock: product.minimumStock,
        predictedDemand,
        reorderQuantity,
        status: product.status,
        recommendation: reorderQuantity > 0 ? `Order ${reorderQuantity} units` : 'Sufficient Stock'
      });
    }

    res.status(200).json({ success: true, count: predictions.length, data: predictions });
  } catch (error) {
    next(error);
  }
};
