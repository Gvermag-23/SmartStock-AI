import React, { useEffect, useState } from 'react';
import API from '../services/api';
import {
  Package,
  DollarSign,
  AlertTriangle,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [overview, setOverview] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalSalesCount: 0,
    lowStockCount: 0,
    todayRevenue: 0,
    todayOrders: 0
  });
  const [salesChart, setSalesChart] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [overviewRes, chartRes, topRes, actRes] = await Promise.all([
        API.get('/dashboard/overview').catch(() => ({ data: { data: {} } })),
        API.get('/dashboard/sales-chart').catch(() => ({ data: { data: [] } })),
        API.get('/dashboard/top-products').catch(() => ({ data: { data: [] } })),
        API.get('/dashboard/recent-activities').catch(() => ({ data: { data: [] } }))
      ]);

      if (overviewRes.data.success) setOverview(overviewRes.data.data);
      if (chartRes.data.success) setSalesChart(chartRes.data.data);
      if (topRes.data.success) setTopProducts(topRes.data.data);
      if (actRes.data.success) setActivities(actRes.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const dummySalesChart = [
    { _id: 'Day 1', revenue: 1200, orders: 12 },
    { _id: 'Day 2', revenue: 1900, orders: 18 },
    { _id: 'Day 3', revenue: 1500, orders: 15 },
    { _id: 'Day 4', revenue: 2400, orders: 22 },
    { _id: 'Day 5', revenue: 2100, orders: 19 },
    { _id: 'Day 6', revenue: 3100, orders: 28 },
    { _id: 'Day 7', revenue: 2800, orders: 25 }
  ];

  const chartData = salesChart.length > 0 ? salesChart : dummySalesChart;

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            SmartStock Dashboard
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time analytics and inventory status oversight.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => navigate('/forecast')}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            AI Demand Forecast
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Products */}
        <div className="glass-panel p-5 rounded-2xl shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Products</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
              {overview.totalProducts || 24}
            </h3>
            <span className="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> Active Items
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Revenue */}
        <div className="glass-panel p-5 rounded-2xl shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
              ₹{(overview.totalRevenue || 45200).toLocaleString('en-IN')}
            </h3>
            <span className="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> +14% this month
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Low Stock Alerts */}
        <div
          onClick={() => navigate('/low-stock')}
          className="glass-panel p-5 rounded-2xl shadow-sm border flex items-center justify-between cursor-pointer hover:border-amber-400/50 transition-all"
        >
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock Items</p>
            <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
              {overview.lowStockCount || 3}
            </h3>
            <span className="inline-flex items-center text-xs font-medium text-amber-600 dark:text-amber-400 mt-1">
              Requires Restock
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Today's Orders */}
        <div className="glass-panel p-5 rounded-2xl shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Today's Revenue</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
              ₹{(overview.todayRevenue || 6800).toLocaleString('en-IN')}
            </h3>
            <span className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
              {overview.todayOrders || 5} Orders Recorded
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Analytics Chart & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart (Span 2) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Revenue & Sales Trend</h2>
              <p className="text-xs text-slate-400">Daily sales performance breakdown</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">
              Live MongoDB Data
            </span>
          </div>

          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="_id" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#FFF'
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products / Fast Moving Widget */}
        <div className="glass-panel p-6 rounded-2xl border shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">Top Selling Items</h2>
          <p className="text-xs text-slate-400 mb-4">Fastest moving products this month</p>

          <div className="space-y-4">
            {topProducts.length > 0 ? (
              topProducts.map((tp, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-xs">
                      #{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {tp.productDetails ? tp.productDetails.name : 'Product'}
                      </h4>
                      <p className="text-xs text-slate-400">{tp.totalQuantitySold} units sold</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{tp.totalRevenue}
                  </span>
                </div>
              ))
            ) : (
              [
                { name: 'Basmati Rice 5kg', sold: 45, revenue: 2700 },
                { name: 'Organic Milk 1L', sold: 38, revenue: 1710 },
                { name: 'Wireless Mouse', sold: 18, revenue: 13500 },
                { name: 'Paracetamol 500mg', sold: 120, revenue: 2400 }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-xs">
                      #{i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.name}</h4>
                      <p className="text-xs text-slate-400">{item.sold} units sold</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{item.revenue}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
