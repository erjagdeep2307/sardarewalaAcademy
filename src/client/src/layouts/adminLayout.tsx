import React from 'react';
import { useLocation,Outlet } from 'react-router-dom';
import { navItems } from '../types/testdata';
import Sidebar from '../components/admin/Sidebar';
export const AdminLayout: React.FC = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar/>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between px-8 border-b dark:border-slate-800 transition-colors duration-300">
           <h2 className="text-lg font-bold text-gray-800 dark:text-white">
             {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
           </h2>
           <div className="flex items-center space-x-4">
             <div className="text-sm text-right hidden sm:block">
                <p className="font-bold text-gray-900 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
             </div>
             <div className="w-8 h-8 rounded-full bg-[#FF9933] flex items-center justify-center text-white font-bold shadow-md">A</div>
           </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};