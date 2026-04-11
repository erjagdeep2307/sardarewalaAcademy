import React, { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { navItems } from '../types/testdata';
import Sidebar from '../components/admin/Sidebar';
import AdminNavigation from '../components/admin/AdminNavigation';
export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  return (
    <div className="h-screen overflow-hidden bg-gray-100 dark:bg-slate-950 flex transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close admin navigation"
          />
          <aside className="relative z-10 h-full w-72 max-w-[85vw] bg-[#000080] dark:bg-slate-900 text-white shadow-2xl">
            <AdminNavigation onNavigate={() => setIsMobileMenuOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
        {/* Top Header */}
        <header className="h-16 flex-shrink-0 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between px-4 md:px-8 border-b dark:border-slate-800 transition-colors duration-300">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">
            {navItems.find((i) => i.path === location.pathname)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-right hidden sm:block">
              <p className="font-bold text-gray-900 dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
            </div>
            <button
              type="button"
              className="md:hidden w-8 h-8 rounded-full bg-[#FF9933] flex items-center justify-center text-white font-bold shadow-md"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label="Toggle admin navigation"
              aria-expanded={isMobileMenuOpen}
            >
              A
            </button>
            <div className="hidden md:flex w-8 h-8 rounded-full bg-[#FF9933] items-center justify-center text-white font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
