import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, Lock } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">User Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Account settings and role permissions</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            {user ? user.fullName[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{user ? user.fullName : 'Guest'}</h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 capitalize mt-1">
              <Shield className="w-3.5 h-3.5" />
              {user ? user.role : 'Guest'} Role
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Full Name
            </label>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {user ? user.fullName : 'Guest'}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Email Address
            </label>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {user ? user.email : 'guest@smartstock.com'}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Assigned Permissions
            </label>
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <p>• Full product CRUD access</p>
              <p>• Inventory stock in & stock out processing</p>
              <p>• AI Demand forecast analysis</p>
              <p>• Reports export and analytics review</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
