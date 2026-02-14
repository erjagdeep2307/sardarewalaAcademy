import React, { useState, useEffect} from 'react';
import logo from "/logo.svg";
// import { ThemeProvider } from '../context/themeContext';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X,Youtube, Facebook, Instagram, Phone, Mail, Sun, Moon} from 'lucide-react';
import { Button } from '../components/UI/Button.tsx';
import { cn } from '../utils/utility.tsx';
import Footer from '../components/Footer/Footer.tsx';
export const PublicLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Theme State
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  // Apply Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    // { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    // { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 font-sans text-slate-800 dark:text-gray-100 transition-colors duration-300">
      {/* Top Bar - Green for Energy/Start */}
      <div className="bg-[#138808] dark:bg-green-900 text-white py-2 px-4 text-xs md:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><Phone className="w-3 h-3 mr-1" /> +91 97297 98025</span>
            <span className="flex items-center sm:flex"><Mail className="w-3 h-3 mr-1" /> info@sardarewala.com</span>
          </div>
          <div className="flex space-x-3">
            <Facebook className="w-4 h-4 cursor-pointer hover:text-[#FF9933] transition-colors" />
            <Instagram className="w-4 h-4 cursor-pointer hover:text-[#FF9933] transition-colors" />
            <a href='https://www.youtube.com/@Sikhsardarewalaacademy5784' aria-label='Watch us on Youtube' target='_blank' > <Youtube className="w-4 h-4 cursor-pointer hover:text-[#FF9933] transition-colors" />
          </a>
          </div>
        </div>
      </div>

      {/* Main Navbar - Navy Blue */}
      <header className="sticky top-0 z-50 bg-[#000080] dark:bg-slate-900 shadow-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
               <div className="p-1.5 rounded-full">
                {/* <Dumbbell className="h-8 w-8 text-[#FF9933]" /> */}
                <img src={logo} className="h-10 w-10" alt='SPTA'/>
               </div>
               <div className="flex flex-col">
                 <span className="text-white font-black text-xl leading-none tracking-tight">SARDAREWALA</span>
                 <span className="text-[#FF9933] font-bold text-xs tracking-widest">Physical Training Academy</span>
               </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-bold transition-colors hover:text-[#FF9933]",
                    isActive(link.path) ? "text-[#FF9933]" : "text-white"
                  )}
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
              
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              <Link to="/login">
                <Button variant="primary" size="sm" className="ml-2">
                  Login
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4 md:hidden">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
              >
                {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
              </button>
              <button
                className="text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#000066] dark:bg-slate-900 border-t border-white/10">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-bold"
                    ,isActive(link.path) ? "text-[#FF9933] bg-white/10" : "text-white hover:text-[#FF9933]"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4">
                <Link to={'/login'}>
                  <Button variant="primary" className="w-full">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};