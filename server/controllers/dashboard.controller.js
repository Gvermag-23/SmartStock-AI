const Product = require('../models/Product');
const Sale = require('../models/Sale');
const InventoryHistory = require('../models/InventoryHistory');

exports.getOverview = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const lowStockCount = await Product.countDocuments({
      $expr: { $lte: ['$stock', '$minimumStock'] }
    });

    const salesStats = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalSalesCount: { $sum: 1 }
        }
      }
    ]);

    const totalRevenue = salesStats.length > 0 ? salesStats[0].totalRevenue : 0;
    const totalSalesCount = salesStats.length > 0 ? salesStats[0].totalSalesCount : 0;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayStats = await Sale.aggregate([
      { $match: { saleDate: { $gte: startOfToday } } },
      {
        $group: {
          _id: null,
          todayRevenue: { $sum: '$totalAmount' },
          todayOrders: { $sum: 1 }
        }
      }
    ]);

    const todayRevenue = todayStats.length > 0 ? todayStats[0].todayRevenue : 0;
    const todayOrders = todayStats.length > 0 ? todayStats[0].todayOrders : 0;

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalRevenue,
        totalSalesCount,
        lowStockCount,
        todayRevenue,
        todayOrders
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getSalesChart = async (req, res, next) => {
  try {
    const salesByDay = await Sale.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$saleDate' } },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 },
          quantity: { $sum: '$quantity' }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 30 }
    ]);

    res.status(200).json({ success: true, data: salesByDay });
  } catch (error) {
    next(error);
  }
};

exports.getTopProducts = async (req, res, next) => {
  try {
    const topProducts = await Sale.aggregate([
      {
        $group: {
          _id: '$product',
          totalQuantitySold: { $sum: '$quantity' },
          totalRevenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' }
    ]);

    res.status(200).json({ success: true, data: topProducts });
  } catch (error) {
    next(error);
  }
};

exports.getRecentActivities = async (req, res, next) => {
  try {
    const activities = await InventoryHistory.find()
      .populate('product', 'name sku')
      .populate('updatedBy', 'fullName')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    next(error);
  }
};
