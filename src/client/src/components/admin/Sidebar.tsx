import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/utility';
import AdminNavigation from './AdminNavigation';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'bg-[#000080] dark:bg-slate-900 text-white hidden md:flex flex-col flex-shrink-0 border-r border-white/5 transition-all duration-300 relative z-20',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-7 bg-[#FF9933] text-white p-1 rounded-full shadow-lg hover:bg-[#e68a00] transition-colors z-50 border-2 border-[#000080] dark:border-slate-900"
        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <AdminNavigation isCollapsed={isCollapsed} />
    </aside>
  );
}
