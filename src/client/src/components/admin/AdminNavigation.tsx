import { Link, NavLink, useLocation } from 'react-router-dom';
import { Dumbbell, LogOut } from 'lucide-react';
import { cn } from '@/utils/utility';
import { navItems } from '@/types/testdata';
import type { NavItem } from '@/types/types';
import { useLogout } from '@/hooks/AuthHook';

interface AdminNavigationProps {
  isCollapsed?: boolean;
  onNavigate?: () => void;
  className?: string;
  showBrand?: boolean;
}

export default function AdminNavigation({
  isCollapsed = false,
  onNavigate,
  className,
  showBrand = true,
}: AdminNavigationProps) {
  const location = useLocation();
  const { logoutMutation } = useLogout();

  const handleLogout = () => {
    logoutMutation();
    onNavigate?.();
  };

  const isParentActive = (item: NavItem) => {
    if (item.path === location.pathname) return true;
    if (item.children) {
      return item.children.some((child) => child.path === location.pathname);
    }
    return false;
  };

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {showBrand && (
        <div className="h-20 flex flex-shrink-0 items-center justify-center border-b border-white/10 overflow-hidden whitespace-nowrap">
          <Link
            to="/admin"
            className="flex items-center space-x-2 px-2"
            onClick={onNavigate}
          >
            <div className="bg-white p-1.5 rounded-full flex-shrink-0 shadow-md">
              <Dumbbell className="h-6 w-6 text-[#FF9933]" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col transition-opacity duration-300">
                <span className="font-black text-lg tracking-tight">SARDAREWALA</span>
                <span className="text-[10px] text-[#FF9933] font-bold tracking-widest leading-none">
                  ADMIN PANEL
                </span>
              </div>
            )}
          </Link>
        </div>
      )}

      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={cn(
              'relative flex items-center rounded-lg transition-colors text-sm font-medium min-h-[48px]',
              isCollapsed ? 'justify-center px-0' : 'px-4 space-x-3',
              isParentActive(item)
                ? 'bg-[#FF9933] text-white'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            )}
            title={isCollapsed ? item.label : ''}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap flex-1">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center rounded-lg text-gray-300 hover:text-white hover:bg-red-600/20 transition-colors h-12 w-full',
            isCollapsed ? 'justify-center' : 'px-4 space-x-3'
          )}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-sm font-medium whitespace-nowrap transition-opacity duration-300">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
