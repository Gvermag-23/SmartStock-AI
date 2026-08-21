import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { AlertTriangle, Plus, RefreshCw, Truck } from 'lucide-react';

const LowStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useNotification();

  const fetchLowStock = async () => {
    setLoading(true);
    try {
      const res = await API.get('/inventory/low-stock');
      if (res.data.success) setProducts(res.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  const handleRestock = async (productId, currentStock) => {
    const qtyStr = window.prompt(`Enter quantity to restock (Current stock: ${currentStock}):`, '50');
    if (!qtyStr || isNaN(qtyStr) || Number(qtyStr) <= 0) return;

    try {
      const res = await API.post('/inventory/stock-in', {
        productId,
        quantity: Number(qtyStr),
        notes: 'Restock action from Low Stock Alert Screen'
      });

      if (res.data.success) {
        addToast(`Restocked ${qtyStr} units successfully!`, 'success');
        fetchLowStock();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Restock failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            Low Stock Alerts & Restock
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Products at or below minimum threshold</p>
        </div>
        <button
          onClick={fetchLowStock}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="glass-panel p-6 rounded-2xl border shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-400 border-b uppercase text-[11px] font-semibold tracking-wider">
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Current Stock</th>
                <th className="px-6 py-3">Minimum Stock</th>
                <th className="px-6 py-3">Supplier</th>
                <th className="px-6 py-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400">Scanning stock levels...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ All products have sufficient stock levels!
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-amber-50/30 dark:hover:bg-amber-950/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">{p.name}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{p.sku}</td>
                    <td className="px-6 py-4 font-bold text-rose-600 dark:text-rose-400">{p.stock} units</td>
                    <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300">{p.minimumStock} units</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">
                      {p.supplier ? p.supplier.supplierName : 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleRestock(p._id, p.stock)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5 ml-auto"
                      >
                        <Plus className="w-3.5 h-3.5" /> Restock Item
                      </button>
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

export default LowStock;
