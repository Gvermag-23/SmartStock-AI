const Sale = require('../models/Sale');
const Product = require('../models/Product');
const InventoryHistory = require('../models/InventoryHistory');

exports.createSale = async (req, res, next) => {
  try {
    const { productId, customerName, quantity, paymentMethod } = req.body;

    if (!productId || !quantity || Number(quantity) <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid sale details' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stock < Number(quantity)) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for sale. Current stock: ${product.stock}`
      });
    }

    const totalAmount = product.price * Number(quantity);
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    product.stock -= Number(quantity);
    await product.save();

    const sale = await Sale.create({
      product: productId,
      customerName: customerName || 'Walk-in Customer',
      quantity: Number(quantity),
      totalAmount,
      paymentMethod: paymentMethod || 'Cash',
      invoiceNumber,
      soldBy: req.user ? req.user.id : null,
      saleDate: new Date()
    });

    await InventoryHistory.create({
      product: productId,
      action: 'Sale',
      quantity: Number(quantity),
      updatedBy: req.user ? req.user.id : null,
      notes: `Sale recorded. Invoice #${invoiceNumber}`
    });

    res.status(201).json({
      success: true,
      message: 'Sale recorded successfully',
      data: sale
    });
  } catch (error) {
    next(error);
  }
};

exports.getSales = async (req, res, next) => {
  try {
    const sales = await Sale.find()
      .populate('product', 'name sku price')
      .populate('soldBy', 'fullName')
      .sort({ saleDate: -1 });

    res.status(200).json({ success: true, count: sales.length, data: sales });
  } catch (error) {
    next(error);
  }
};

exports.getSaleByInvoice = async (req, res, next) => {
  try {
    const sale = await Sale.findOne({ invoiceNumber: req.params.invoiceId })
      .populate('product', 'name sku price category')
      .populate('soldBy', 'fullName email');

    if (!sale) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    res.status(200).json({ success: true, data: sale });
  } catch (error) {
    next(error);
  }
};
