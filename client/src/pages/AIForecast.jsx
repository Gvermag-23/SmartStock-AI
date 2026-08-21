import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { BrainCircuit, Sparkles, AlertCircle, ShoppingCart, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AIForecast = () => {
  const [predictions, setPredictions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productForecast, setProductForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const res = await API.get('/predictions/all');
      if (res.data.success) {
        setPredictions(res.data.data);
        if (res.data.data.length > 0) {
          fetchSingleForecast(res.data.data[0].productId);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleForecast = async (id) => {
    try {
      const res = await API.get(`/predictions/product/${id}`);
      if (res.data.success) {
        setProductForecast(res.data.data);
        setSelectedProduct(id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  const forecastData = productForecast?.forecastData || [
    { day: 'Mon', demand: 18 },
    { day: 'Tue', demand: 22 },
    { day: 'Wed', demand: 20 },
    { day: 'Thu', demand: 25 },
    { day: 'Fri', demand: 30 },
    { day: 'Sat', demand: 28 },
    { day: 'Sun', demand: 19 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            AI Demand Prediction & Reorder Engine
            <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Machine Learning Scikit-learn forecast based on sales velocity
          </p>
        </div>
        <button
          onClick={fetchPredictions}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Re-run ML Engine
        </button>
      </div>

      {/* Main Forecast Visualizer & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Forecast Chart (Span 2) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-500" />
                7-Day Next Demand Forecast
              </h2>
              <p className="text-xs text-slate-400">
                {productForecast ? `Showing prediction for ${productForecast.product} (${productForecast.sku})` : 'Select a product below'}
              </p>
            </div>
            {productForecast && (
              <div className="text-right">
                <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800">
                  Predicted Demand: {productForecast.predictedDemand} units
                </span>
              </div>
            )}
          </div>

          <div className="h-64 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#FFF'
                  }}
                />
                <Bar dataKey="demand" fill="#6366F1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Suggestion Card */}
        <div className="glass-panel p-6 rounded-2xl border shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 w-fit mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">AI Reorder Recommendation</h3>
            <p className="text-xs text-slate-400 mt-1">Calculated formula: Predicted Demand - Current Stock + Safety Stock</p>
          </div>

          {productForecast ? (
            <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Current Stock:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{productForecast.currentStock} units</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Forecasted Demand:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{productForecast.predictedDemand} units</span>
              </div>
              <div className="flex justify-between text-xs border-t pt-2 dark:border-slate-700">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Suggested Reorder:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">
                  {productForecast.reorderQuantity > 0 ? `${productForecast.reorderQuantity} units` : 'None required'}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Select a product to view specific suggestions.</p>
          )}

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Prevents stockouts before next shipment cycle.
          </div>
        </div>
      </div>

      {/* Full Products Prediction Table */}
      <div className="glass-panel p-6 rounded-2xl border shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Product Forecast Matrix</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-400 border-b uppercase text-[11px] font-semibold tracking-wider">
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Current Stock</th>
                <th className="px-6 py-3">7-Day Demand</th>
                <th className="px-6 py-3">Reorder Qty</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {predictions.map((p) => (
                <tr
                  key={p.productId}
                  className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer ${
                    selectedProduct === p.productId ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                  }`}
                  onClick={() => fetchSingleForecast(p.productId)}
                >
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">{p.productName}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">{p.sku}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">{p.category}</td>
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">{p.currentStock}</td>
                  <td className="px-6 py-4 font-semibold text-indigo-600 dark:text-indigo-400">{p.predictedDemand} units</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        p.reorderQuantity > 0
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      }`}
                    >
                      {p.reorderQuantity > 0 ? `Buy ${p.reorderQuantity}` : 'Stock OK'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => fetchSingleForecast(p.productId)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                    >
                      View Graph
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AIForecast;
