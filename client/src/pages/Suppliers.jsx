import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { Truck, Plus, Phone, Mail, MapPin, Trash2 } from 'lucide-react';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierName, setSupplierName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  const { addToast } = useNotification();

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const res = await API.get('/suppliers');
      if (res.data.success) setSuppliers(res.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    if (!supplierName || !phone) {
      addToast('Please enter Supplier Name and Phone', 'error');
      return;
    }

    try {
      const res = await API.post('/suppliers', { supplierName, email, phone, address });
      if (res.data.success) {
        addToast('Supplier added successfully!', 'success');
        setSupplierName('');
        setEmail('');
        setPhone('');
        setAddress('');
        fetchSuppliers();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Error adding supplier', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this supplier?')) return;
    try {
      const res = await API.delete(`/suppliers/${id}`);
      if (res.data.success) {
        addToast('Supplier removed', 'success');
        fetchSuppliers();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Error deleting supplier', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Supplier Directory</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage vendor contact details and procurement partners</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <form onSubmit={handleAddSupplier} className="glass-panel p-6 rounded-2xl border shadow-sm space-y-4 h-fit">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Truck className="w-5 h-5 text-indigo-500" />
            Add Supplier
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Supplier Name *
            </label>
            <input
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              placeholder="e.g. ABC Wholesalers"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Phone Number *
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 9876543210"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vendor@abc.com"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Address / Warehouse Location
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="City, State, Zip code"
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 h-20"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all"
          >
            Save Supplier
          </button>
        </form>

        {/* Suppliers List */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {suppliers.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-slate-400 glass-panel rounded-2xl border">
              No suppliers added yet.
            </div>
          ) : (
            suppliers.map((s) => (
              <div key={s._id} className="glass-panel p-5 rounded-2xl border shadow-sm relative group space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-bold flex items-center justify-center">
                      {s.supplierName[0]}
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">{s.supplierName}</h3>
                  </div>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {s.phone}
                  </p>
                  {s.email && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {s.email}
                    </p>
                  )}
                  {s.address && (
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {s.address}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
