import React from 'react';
import { Bell, AlertTriangle, CheckCircle2, Package, Sparkles } from 'lucide-react';

const Notifications = () => {
  const notificationList = [
    {
      id: 1,
      title: 'Low Stock Alert',
      message: 'Paracetamol 500mg has reached minimum stock threshold (12 units remaining).',
      time: '10 mins ago',
      type: 'warning'
    },
    {
      id: 2,
      title: 'Sale Transaction Completed',
      message: 'Invoice #INV-9281-401 generated for Walk-in Customer (₹1,200).',
      time: '1 hour ago',
      type: 'success'
    },
    {
      id: 3,
      title: 'AI Prediction Updated',
      message: '7-day demand forecast for Organic Milk increased by +15%.',
      time: '3 hours ago',
      type: 'info'
    },
    {
      id: 4,
      title: 'New Product Added',
      message: 'Basmati Rice 5kg added to Groceries catalog by Admin.',
      time: 'Yesterday',
      type: 'info'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          System Notifications
          <Bell className="w-5 h-5 text-blue-500" />
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Low stock warnings, order activity, and system updates</p>
      </div>

      <div className="space-y-3">
        {notificationList.map((n) => (
          <div
            key={n.id}
            className="glass-panel p-4 rounded-2xl border shadow-sm flex items-start gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                n.type === 'warning'
                  ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                  : n.type === 'success'
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
              }`}
            >
              {n.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
              {n.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {n.type === 'info' && <Sparkles className="w-5 h-5" />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{n.title}</h4>
                <span className="text-[11px] text-slate-400 font-medium">{n.time}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
