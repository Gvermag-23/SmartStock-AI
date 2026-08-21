import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { Boxes, ArrowDownRight, ArrowUpRight, History, Plus, Minus, Package } from 'lucide-react';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stock-in');

  const { addToast } = useNotification();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProd, resHist] = await Promise.all([
        API.get('/products'),
        API.get('/inventory/history')
      ]);
      if (resProd.data.success) setProducts(resProd.data.data);
      if (resHist.data.success) setHistory(resHist.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStockAction = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity || Number(quantity) <= 0) {
      addToast('Please select product and valid quantity', 'error');
      return;
    }

    const endpoint = activeTab === 'stock-in' ? '/inventory/stock-in' : '/inventory/stock-out';

    try {
      const res = await API.post(endpoint, {
        productId: selectedProduct,
        quantity: Number(quantity),
        notes
      });

      if (res.data.success) {
        addToast(res.data.message, 'success');
        setQuantity('');
        setNotes('');
        fetchData();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Stock operation failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Inventory Control & Stock Logs</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Perform Stock In / Stock Out and review full timeline</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Action Form (Span 1) */}
        <div className="glass-panel p-6 rounded-2xl border shadow-sm space-y-5 h-fit">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('stock-in')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'stock-in'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Plus className="w-3.5 h-3.5" /> Stock In
            </button>
            <button
              onClick={() => setActiveTab('stock-out')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'stock-out'
                  ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Minus className="w-3.5 h-3.5" /> Stock Out
            </button>
          </div>

          <form onSubmit={handleStockAction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Select Product *
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 dark:text-slate-200"
                required
              >
                <option value="">Choose item...</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} (Current Stock: {p.stock})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Quantity *
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Number of units"
                min="1"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 dark:text-slate-200"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Notes / Reference
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Shipment #4090 or Damage removal"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 dark:text-slate-200"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 font-semibold text-sm rounded-xl text-white shadow-lg transition-all ${
                activeTab === 'stock-in'
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                  : 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'
              }`}
            >
              {activeTab === 'stock-in' ? 'Process Stock In (+)' : 'Process Stock Out (-)'}
            </button>
          </form>
        </div>

        {/* Stock Movement Timeline (Span 2) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-blue-500" />
            Stock Activity Timeline
          </h2>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {loading ? (
              <p className="text-center py-8 text-slate-400">Loading history logs...</p>
            ) : history.length === 0 ? (
              <p className="text-center py-8 text-slate-400">No stock movements recorded yet.</p>
            ) : (
              history.map((h) => (
                <div
                  key={h._id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        h.action === 'Stock In'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                          : h.action === 'Sale' || h.action === 'Stock Out'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                      }`}
                    >
                      {h.action === 'Stock In' ? (
                        <ArrowDownRight className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {h.product ? h.product.name : 'Product'}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {h.notes || 'No notes'} • {new Date(h.createdAt).toLocaleDateString()} {new Date(h.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-sm font-bold ${
                        h.action === 'Stock In' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {h.action === 'Stock In' ? `+${h.quantity}` : `-${h.quantity}`} units
                    </span>
                    <p className="text-[11px] text-slate-400 font-medium">{h.action}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
