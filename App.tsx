
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShopProvider } from './contexts/ShopContext';
import { useAuth } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Splash } from './pages/Splash';
import { Onboarding } from './pages/Onboarding';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Auth } from './pages/Auth';
import { Checkout } from './pages/Checkout';
import { Lookbook } from './pages/Lookbook';
import { Profile } from './pages/Profile';
import { AtelierAI } from './components/AtelierAI';
import { CraftJourney } from './pages/CraftJourney';
import { ArrowRight, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-charcoal text-white pt-16 md:pt-24 pb-8 md:pb-12">
    <div className="max-w-[1440px] mx-auto px-6 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
        <div>
          <Link to="/" className="text-2xl md:text-3xl font-black text-white block mb-6 md:mb-8 tracking-tighter">
            VOGUE<span className="text-primary">MEN</span>
          </Link>
          <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-8 md:mb-10 font-medium">
            Bangladesh's premier luxury atelier. We craft modern silhouettes using heritage fabrics for the global man.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-primary transition-all group text-white">
              <Facebook size={20} className="group-hover:scale-110 transition-transform" />
            </Link>
            <Link to="#" className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-primary transition-all group text-white">
              <Instagram size={20} className="group-hover:scale-110 transition-transform" />
            </Link>
            <Link to="#" className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-primary transition-all group text-white">
              <Youtube size={20} className="group-hover:scale-110 transition-transform" />
            </Link>
            <Link to="#" className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-primary transition-all group text-white">
              <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-8 text-white/50">Collections</h4>
          <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-bold tracking-wide">
            <li><Link to="/shop" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            <li><Link to="/shop?category=Suits" className="hover:text-primary transition-colors">Bespoke Suits</Link></li>
            <li><Link to="/shop?category=Accessories" className="hover:text-primary transition-colors">Leather Goods</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-8 text-white/50">Client Services</h4>
          <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-bold tracking-wide">
            <li><Link to="/profile" className="hover:text-primary transition-colors">My Atelier Account</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Book an Appointment</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-8 text-white/50">Newsletter</h4>
          <p className="text-xs md:text-sm text-white/60 mb-6 font-medium leading-relaxed">
            Join our private list for early access to limited drops.
          </p>
          <div className="flex bg-white/10 rounded-xl p-1">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent w-full px-4 py-2 md:py-3 text-sm font-bold text-white placeholder-white/30 focus:outline-none"
            />
            <button className="bg-primary hover:bg-white hover:text-charcoal text-white p-2 md:p-3 rounded-lg transition-all">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-8 md:pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        <div className="text-center md:text-left">
          <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2">
            © 2024 VogueMen Bangladesh. All rights reserved.
          </p>
          <p className="text-primary/60 text-[10px] uppercase tracking-[0.2em] font-black">
            Developed by Sourav Dipto Apu
          </p>
        </div>
        <div className="flex items-center gap-6 md:gap-8">
          <p className="text-white/20 text-[10px] uppercase tracking-widest">Verified by SSL</p>
        </div>
      </div>
    </div>
  </footer>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          } />
          <Route path="/product/:id" element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/lookbook" element={
            <ProtectedRoute>
              <Lookbook />
            </ProtectedRoute>
          } />
          <Route path="/craft-journey" element={<CraftJourney />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Auth />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<'splash' | 'onboarding' | 'main'>('splash');

  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
          <ScrollToTop />
          <AnimatePresence mode='wait'>
            {appState === 'splash' && (
              <Splash key="splash" onComplete={() => setAppState('onboarding')} />
            )}
            {appState === 'onboarding' && (
              <Onboarding key="onboarding" onComplete={() => setAppState('main')} />
            )}
            {appState === 'main' && (
              <div className="flex flex-col min-h-screen">
                <AtelierAI />
                <Navbar />
                <main className="flex-grow overflow-x-hidden">
                  <AnimatedRoutes />
                </main>
                <Footer />
              </div>
            )}
          </AnimatePresence>
        </Router>
      </ShopProvider>
    </AuthProvider>
  );
};

export default App;
