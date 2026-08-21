const Sale = require('../models/Sale');
const Product = require('../models/Product');

exports.getMonthlySales = async (req, res, next) => {
  try {
    const monthlyReport = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$saleDate' },
            month: { $month: '$saleDate' }
          },
          totalRevenue: { $sum: '$totalAmount' },
          totalItemsSold: { $sum: '$quantity' },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    res.status(200).json({ success: true, data: monthlyReport });
  } catch (error) {
    next(error);
  }
};

exports.getInventoryReport = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .populate('supplier', 'supplierName');

    const totalStockValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    const totalItemsCount = products.reduce((sum, p) => sum + p.stock, 0);

    res.status(200).json({
      success: true,
      summary: {
        totalProducts: products.length,
        totalItemsCount,
        totalStockValue
      },
      data: products
    });
  } catch (error) {
    next(error);
  }
};

exports.exportCSV = async (req, res, next) => {
  try {
    const sales = await Sale.find().populate('product', 'name sku price').sort({ saleDate: -1 });

    let csvContent = 'Invoice Number,Date,Customer Name,Product,Quantity,Total Amount,Payment Method\n';
    sales.forEach((s) => {
      const productName = s.product ? s.product.name.replace(/,/g, '') : 'Unknown';
      const date = new Date(s.saleDate).toISOString().split('T')[0];
      csvContent += `${s.invoiceNumber},${date},"${s.customerName}",${productName},${s.quantity},${s.totalAmount},${s.paymentMethod}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=SmartStock_Sales_Report.csv');
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};
