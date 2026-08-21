import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Settings as SettingsIcon, Building, Database, Server } from 'lucide-react';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          System Preferences
          <SettingsIcon className="w-5 h-5 text-blue-500" />
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Configure theme, branding, and API service connections</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border shadow-sm space-y-6">
        {/* Theme Settings */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Appearance Theme</h3>
            <p className="text-xs text-slate-400">Switch between light mode and dark dashboard mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" /> Dark Theme Active
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" /> Light Theme Active
              </>
            )}
          </button>
        </div>

        {/* Company Settings */}
        <div className="space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-500" />
            Organization Branding
          </h3>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Store / Company Name
            </label>
            <input
              type="text"
              defaultValue="SmartStock Retail Solutions"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>

        {/* System Connections */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-500" />
            Backend Infrastructure Status
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border">
              <span className="text-slate-600 dark:text-slate-300 font-medium">MongoDB Atlas Database</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Connected (smartstock-ai-db)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border">
              <span className="text-slate-600 dark:text-slate-300 font-medium">Python Scikit-learn Service</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Connected (Port 5000)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
