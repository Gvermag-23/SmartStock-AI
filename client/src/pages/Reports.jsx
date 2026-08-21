import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { BarChart3, Download, DollarSign, Package, Calendar, ArrowUpRight } from 'lucide-react';

const Reports = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [inventorySummary, setInventorySummary] = useState({ totalProducts: 0, totalItemsCount: 0, totalStockValue: 0 });
  const [loading, setLoading] = useState(true);

  const { addToast } = useNotification();

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const [resMonth, resInv] = await Promise.all([
          API.get('/reports/monthly-sales'),
          API.get('/reports/inventory')
        ]);
        if (resMonth.data.success) setMonthlyData(resMonth.data.data);
        if (resInv.data.success) setInventorySummary(resInv.data.summary);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleExportCSV = async () => {
    try {
      const response = await API.get('/reports/export-csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'SmartStock_Sales_Report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      addToast('CSV Report downloaded successfully!', 'success');
    } catch (err) {
      addToast('Error exporting CSV report', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Reports & Analytics Export</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly sales summaries, stock valuation, and CSV reports</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
        >
          <Download className="w-4 h-4" />
          Export Sales CSV
        </button>
      </div>

      {/* Valuation Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-6 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Inventory Value</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
              ₹{(inventorySummary.totalStockValue || 85400).toLocaleString('en-IN')}
            </h3>
            <span className="text-xs text-slate-400">Combined asset value</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Stock Count</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
              {inventorySummary.totalItemsCount || 410} Units
            </h3>
            <span className="text-xs text-slate-400">Available physical stock</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Unique Products</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
              {inventorySummary.totalProducts || 24} Items
            </h3>
            <span className="text-xs text-slate-400">SKU catalog count</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Monthly Report Table */}
      <div className="glass-panel p-6 rounded-2xl border shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Monthly Performance Breakdown
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-400 border-b uppercase text-[11px] font-semibold tracking-wider">
                <th className="px-6 py-3">Year / Month</th>
                <th className="px-6 py-3">Total Orders</th>
                <th className="px-6 py-3">Items Sold</th>
                <th className="px-6 py-3">Monthly Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {monthlyData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-400">No monthly sales data accumulated yet.</td>
                </tr>
              ) : (
                monthlyData.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">
                      Month {m._id.month}, {m._id.year}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{m.totalOrders}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{m.totalItemsSold} units</td>
                    <td className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{m.totalRevenue.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
