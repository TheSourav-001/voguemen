
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Heart, Menu, X, Search, ChevronDown, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../contexts/ShopContext';
import { useAuth } from '../contexts/AuthContext';
import { CATEGORIES } from '../constants';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const { totalItems } = useShop();
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowCollections(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-2' : 'bg-white py-4'}`}>
      {/* Top Banner */}
      <div className="bg-charcoal text-white text-[8px] md:text-[9px] text-center py-1.5 font-black uppercase tracking-[0.2em] md:tracking-[0.5em] relative z-50 px-2 leading-tight">
        Free Express Delivery Across Bangladesh | Join The Vogue Collective For 10% Off
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4 md:gap-12 mt-2">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-3xl font-black text-primary flex-shrink-0 tracking-tighter">
          VOGUE<span className="text-charcoal">MEN</span>
        </Link>

        {/* Categories - Desktop */}
        <div className="hidden lg:flex items-center gap-10 text-xs font-black text-charcoal flex-shrink-0 uppercase tracking-widest">
          <Link to="/shop" className="hover:text-primary transition-colors">Atelier</Link>
          <div
            className="relative"
            onMouseEnter={() => setShowCollections(true)}
            onMouseLeave={() => setShowCollections(false)}
          >
            <button className="flex items-center gap-2 hover:text-primary transition-colors uppercase">
              Collections <ChevronDown size={14} />
            </button>

            <AnimatePresence>
              {showCollections && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-4 bg-white shadow-2xl rounded-3xl p-8 w-[600px] grid grid-cols-2 gap-x-8 gap-y-4 border border-border"
                >
                  {CATEGORIES.slice(0, 10).map(cat => (
                    <Link key={cat} to={`/shop?category=${cat}`} className="hover:text-primary text-[10px] font-black tracking-widest uppercase border-b border-transparent hover:border-primary pb-2 transition-all">
                      {cat}
                    </Link>
                  ))}
                  <Link to="/shop" className="col-span-2 text-center mt-4 bg-offwhite py-3 rounded-xl hover:bg-primary hover:text-white transition-all">
                    Browse All 20 Categories
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/lookbook" className="hover:text-primary transition-colors">Lookbook</Link>
          <Link to="/shop" className="hover:text-primary transition-colors">New Drops</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-grow max-w-lg relative">
          <input
            type="text"
            placeholder="Search our heritage collection..."
            className="w-full bg-offwhite border-2 border-transparent px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/20 transition-all"
          />
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/20" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
          <Link to="/profile" className="hidden sm:block text-charcoal hover:text-primary transition-all">
            <User size={20} className={isLoggedIn ? "text-primary" : ""} />
          </Link>
          {isLoggedIn && (
            <Link to="/cart" className="relative text-charcoal hover:text-primary transition-all group">
              <ShoppingCart size={22} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-accent text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )}
          {isLoggedIn && (
            <button
              onClick={logout}
              className="hidden lg:block bg-charcoal text-white text-[10px] font-black uppercase px-6 py-2.5 rounded-xl hover:bg-primary transition-all tracking-widest"
            >
              Sign Out
            </button>
          )}
          {!isLoggedIn && (
            <Link
              to="/profile"
              className="hidden lg:block bg-primary text-white text-[10px] font-black uppercase px-6 py-2.5 rounded-xl hover:bg-charcoal transition-all tracking-widest shadow-xl shadow-primary/20"
            >
              The Atelier Login
            </Link>
          )}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-charcoal p-1.5 bg-offwhite rounded-lg">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 top-[85px] bg-white z-40 lg:hidden flex flex-col p-6 gap-6 font-black text-xl uppercase tracking-tighter overflow-y-auto pb-32"
          >
            {/* Mobile Search */}
            <div className="md:hidden relative mb-2">
              <input
                type="text"
                placeholder="Search collection..."
                className="w-full bg-offwhite border-2 border-transparent px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:border-primary/20 transition-all"
              />
              <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/20" />
            </div>

            <div className="mb-4">
              <h4 className="text-[10px] text-charcoal/30 tracking-[0.4em] mb-4">Discovery</h4>
              <Link to="/shop" className="block mb-4">The Atelier</Link>
              <Link to="/lookbook" className="block mb-4">Lookbook</Link>
              <Link to="/shop" className="block mb-4 text-primary">New Arrivals</Link>
            </div>

            <div className="mb-8">
              <h4 className="text-[10px] text-charcoal/30 tracking-[0.4em] mb-4">Collections</h4>
              <div className="grid grid-cols-1 gap-4 text-lg">
                {CATEGORIES.slice(0, 8).map(cat => (
                  <Link key={cat} to="/shop">{cat}</Link>
                ))}
                <Link to="/shop" className="text-primary text-sm tracking-widest">See All Categories</Link>
              </div>
            </div>

            <hr className="border-border" />
            <div className="flex flex-col gap-6 text-sm tracking-widest text-charcoal/40 mt-4">
              <Link to="/profile" className="flex items-center gap-3"><User size={18} /> {isLoggedIn ? 'My Account' : 'Login'}</Link>
              {isLoggedIn && (
                <>
                  <Link to="/cart" className="flex items-center gap-3"><ShoppingCart size={18} /> Cart ({totalItems})</Link>
                  <Link to="/profile" className="flex items-center gap-3"><Package size={18} /> Order History</Link>
                  <button onClick={logout} className="text-left flex items-center gap-3 text-accent"><X size={18} /> Sign Out</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
