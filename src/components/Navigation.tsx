import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun, FileText, User, Sparkles, LogOut, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  user?: any;
  onLogin: () => void;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Resume Builder', href: '#resume', icon: <FileText className="w-4 h-4" /> },
    { name: 'Portfolio', href: '#portfolio', icon: <User className="w-4 h-4" /> },
    { name: 'Career Portal', href: '#careers', icon: <User className="w-4 h-4" /> },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    
    // Close all menus
    setIsOpen(false);
    setShowUserMenu(false);
    
    // If it's a hash link, scroll to the section
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = targetId ? document.getElementById(targetId) : null;
      
      if (targetElement) {
        // Calculate the scroll position, accounting for fixed header
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Smooth scroll to the target
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without triggering a page reload
        if (window.history.pushState) {
          window.history.pushState({}, '', href);
        } else {
          window.location.hash = href;
        }
      }
    } else {
      // Handle non-hash navigation (if any)
      window.location.href = href;
    }
  };

  // Function to get user's first name or email prefix
  const getUserDisplayName = () => {
    if (!user) return '';
    if (user.name) return user.name.split(' ')[0]; // Return first name only
    if (user.email) return user.email.split('@')[0]; // Return email prefix if no name
    return 'User';
  };



  return (
    <header className="w-full fixed top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
      <nav aria-label="Main navigation" className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg">
                {/* Panda Logo */}
                <span className="text-lg">🐼</span>
              </div>
              <span className="hidden sm:inline text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent tracking-wide">CareerPanda</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <motion.div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2.5 rounded-lg"
                  >
                    <span className="text-blue-500">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </a>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </motion.div>
              ))}
              
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </motion.button>
              
              {user ? (
                <div className="hidden md:flex items-center space-x-4">
                  <div className="relative" ref={menuRef}>
                    <motion.button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={getUserDisplayName()}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                          {getUserDisplayName().charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="truncate max-w-[120px]">{getUserDisplayName()}</span>
                    </motion.button>

                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                          onClick={() => setShowUserMenu(false)}
                        />
                      )}
                    </AnimatePresence>
                    
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                          className="absolute right-0 top-14 mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-200 dark:border-gray-700"
                        >
                          <button
                            onClick={() => {
                              onLogout();
                              setShowUserMenu(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 flex items-center space-x-2"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign out</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="hidden md:block">
                  <motion.button
                    onClick={onLogin}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center space-x-4">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </motion.button>
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  setShowUserMenu(false);
                }}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
        </div>
      </nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
              height: { duration: 0.3 },
              opacity: { duration: 0.25 }
            }}
            className="md:hidden w-full overflow-hidden bg-white dark:bg-gray-900 shadow-xl border-t border-gray-200 dark:border-gray-800"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.1 }}
                  className="border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                >
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-lg mx-2"
                    aria-current={window.location.hash === item.href ? 'page' : undefined}
                  >
                    <span className="text-blue-500">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </a>
                </motion.div>
              ))}
              
              {user ? (
                <motion.div 
                  className="px-2 py-3 border-t border-gray-100 dark:border-gray-800 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * navItems.length + 0.1 }}
                >
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg mx-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                      {getUserDisplayName().charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{getUserDisplayName()}</span>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-lg border border-red-200 dark:border-red-900/50 mx-2"
                  >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    <span>Sign out</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  className="px-2 py-3 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * navItems.length + 0.1 }}
                >
                  <button
                    onClick={() => {
                      onLogin();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg mx-2"
                  >
                    <span>Get Started</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;