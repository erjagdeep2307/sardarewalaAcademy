import { useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { Dumbbell,LogOut,ChevronLeft,ChevronRight,ChevronDown} from 'lucide-react'; 
import { cn } from '../../utils/utility';
import { navItems } from '../../types/testdata'; 
export default function Sidebar() {
 const [isCollapsed, setIsCollapsed] = useState(false);
 const [expandedMenus, setExpandedMenus] = useState<Record<string,boolean>>({"Gallery":true});
 const location = useLocation();

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  children?: { label: string; path: string; icon: React.ElementType }[];
}



 const toggleMenu = (label: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isCollapsed) setIsCollapsed(false);
    setExpandedMenus(prev => ({...prev, [label]: !prev[label]}));
  };

  const isPathActive = (path: string) => location.pathname === path;
  const isParentActive = (item: NavItem) => {
    if (item.path === location.pathname) return true;
    if (item.children) {
      return item.children.some(child => child.path === location.pathname);
    }
    return false;
  };
 return (
   <aside 
        className={cn(
          "bg-[#000080] dark:bg-slate-900 text-white hidden md:flex flex-col flex-shrink-0 border-r border-white/5 transition-all duration-300 relative",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Toggle Button on the Right Border */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-7 bg-[#FF9933] text-white p-1 rounded-full shadow-lg hover:bg-[#e68a00] transition-colors z-50 border-2 border-[#000080] dark:border-slate-900 "
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Sidebar Header / Logo */}
        <div className="h-20 flex items-center justify-center border-b border-white/10 overflow-hidden whitespace-nowrap">
           <Link to="/" className="flex items-center space-x-2 px-2">
              <div className="bg-white p-1.5 rounded-full flex-shrink-0 shadow-md">
                <Dumbbell className="h-6 w-6 text-[#FF9933]" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col transition-opacity duration-300">
                   <span className="font-black text-lg tracking-tight">SARDAREWALA</span>
                   <span className="text-[10px] text-[#FF9933] font-bold tracking-widest leading-none">ADMIN PANEL</span>
                </div>
              )}
           </Link>
        </div>
        
        {/* Navigation */}
         <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => (
            <div key={item.path}>
              <div
                className={cn(
                  "relative flex items-center rounded-lg transition-colors text-sm font-medium min-h-[48px] cursor-pointer group",
                  isCollapsed ? "justify-center px-0" : "px-4",
                  isParentActive(item)
                    ? "bg-[#FF9933] text-white" 
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center flex-1 h-full",
                    isCollapsed ? "justify-center" : "space-x-3"
                  )}
                  title={isCollapsed ? item.label : ''}
                  onClick={() => {
                     // If clicking parent that has children, expand menu if collapsed
                     if(item.children && !expandedMenus[item.label]) {
                        toggleMenu(item.label);
                     }
                  }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="whitespace-nowrap flex-1">{item.label}</span>}
                </Link>

                {/* Submenu Toggle Icon */}
                {!isCollapsed && item.children && (
                  <button
                    onClick={(e) => toggleMenu(item.label, e)}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors ml-2"
                  >
                    {expandedMenus[item.label] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                )}
              </div>

              {/* Submenu Items */}
              {!isCollapsed && item.children && expandedMenus[item.label] && (
                <div className="mt-1 ml-4 space-y-1 border-l border-white/20 pl-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={cn(
                        "flex items-center px-4 py-2 text-sm rounded-lg transition-colors",
                        isPathActive(child.path)
                          ? "bg-white/10 text-white font-semibold"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <child.icon className="w-3.5 h-3.5 mr-2 opacity-70" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-white/10">
          <Link 
            to="/" 
            className={cn(
               "flex items-center rounded-lg text-gray-300 hover:text-white hover:bg-red-600/20 transition-colors h-12",
               isCollapsed ? "justify-center" : "px-4 space-x-3"
            )}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap transition-opacity duration-300">Logout</span>}
          </Link>
        </div>
      </aside>
  )
}
