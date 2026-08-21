const Product = require('../models/Product');
const InventoryHistory = require('../models/InventoryHistory');

exports.stockIn = async (req, res, next) => {
  try {
    const { productId, quantity, notes } = req.body;

    if (!productId || !quantity || Number(quantity) <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid product or quantity' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.stock += Number(quantity);
    await product.save();

    const history = await InventoryHistory.create({
      product: productId,
      action: 'Stock In',
      quantity: Number(quantity),
      updatedBy: req.user ? req.user.id : null,
      notes: notes || 'Manual Restock'
    });

    res.status(200).json({
      success: true,
      message: `Successfully added ${quantity} units to ${product.name}`,
      product,
      history
    });
  } catch (error) {
    next(error);
  }
};

exports.stockOut = async (req, res, next) => {
  try {
    const { productId, quantity, notes } = req.body;

    if (!productId || !quantity || Number(quantity) <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid product or quantity' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stock < Number(quantity)) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Current stock is ${product.stock}`
      });
    }

    product.stock -= Number(quantity);
    await product.save();

    const history = await InventoryHistory.create({
      product: productId,
      action: 'Stock Out',
      quantity: Number(quantity),
      updatedBy: req.user ? req.user.id : null,
      notes: notes || 'Stock Adjustment'
    });

    res.status(200).json({
      success: true,
      message: `Successfully deducted ${quantity} units from ${product.name}`,
      product,
      history
    });
  } catch (error) {
    next(error);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const history = await InventoryHistory.find()
      .populate('product', 'name sku price stock')
      .populate('updatedBy', 'fullName role')
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({ success: true, count: history.length, data: history });
  } catch (error) {
    next(error);
  }
};

exports.getLowStock = async (req, res, next) => {
  try {
    const products = await Product.find({
      $expr: { $lte: ['$stock', '$minimumStock'] }
    })
      .populate('category', 'name')
      .populate('supplier', 'supplierName phone email');

    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};
