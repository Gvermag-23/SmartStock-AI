import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { ShoppingCart, FileText, CheckCircle2, DollarSign, User, Calendar } from 'lucide-react';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [loading, setLoading] = useState(true);

  const { addToast } = useNotification();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProd, resSales] = await Promise.all([
        API.get('/products'),
        API.get('/sales')
      ]);
      if (resProd.data.success) setProducts(resProd.data.data);
      if (resSales.data.success) setSales(resSales.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedItem = products.find((p) => p._id === selectedProduct);
  const totalAmount = selectedItem ? selectedItem.price * (Number(quantity) || 0) : 0;

  const handleRecordSale = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity || Number(quantity) <= 0) {
      addToast('Please select product and quantity', 'error');
      return;
    }

    try {
      const res = await API.post('/sales', {
        productId: selectedProduct,
        customerName,
        quantity: Number(quantity),
        paymentMethod
      });

      if (res.data.success) {
        addToast(`Sale recorded successfully! Invoice: ${res.data.data.invoiceNumber}`, 'success');
        setSelectedProduct('');
        setCustomerName('');
        setQuantity('1');
        fetchData();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Error processing sale', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Sales & Billing Terminal</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Process quick sales, generate invoices, and view history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* POS Sale Form (Span 1) */}
        <form onSubmit={handleRecordSale} className="glass-panel p-6 rounded-2xl border shadow-sm space-y-4 h-fit">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-500" />
            New Sale Entry
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Walk-in Customer"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Select Product *
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200"
              required
            >
              <option value="">Choose item...</option>
              {products.map((p) => (
                <option key={p._id} value={p._id} disabled={p.stock <= 0}>
                  {p.name} — ₹{p.price} ({p.stock > 0 ? `${p.stock} in stock` : 'OUT OF STOCK'})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Quantity *
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200"
              >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="NetBanking">NetBanking</option>
              </select>
            </div>
          </div>

          {/* Amount Calculation Box */}
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              Total Amount:
            </span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ₹{totalAmount.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01]"
          >
            Complete & Print Invoice
          </button>
        </form>

        {/* Sales History Table (Span 2) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            Recent Sales & Invoices
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-400 border-b uppercase text-[11px] font-semibold tracking-wider">
                  <th className="px-4 py-3">Invoice #</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {sales.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-slate-400">No sales transactions recorded yet.</td>
                  </tr>
                ) : (
                  sales.map((s) => (
                    <tr key={s._id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">{s.invoiceNumber}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">{s.customerName}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">{s.product ? s.product.name : 'Item'}</td>
                      <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200">{s.quantity}</td>
                      <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">₹{s.totalAmount}</td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {s.paymentMethod}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
