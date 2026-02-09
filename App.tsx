
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

const Footer: React.FC = () => (
  <footer className="bg-charcoal text-white pt-24 pb-12 border-t border-white/5">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
      <div className="col-span-1">
        <h2 className="text-3xl font-black text-primary mb-8 tracking-tighter">VOGUE<span className="text-white">MEN</span></h2>
        <p className="text-white/50 text-sm leading-relaxed mb-10 font-medium">
          Bangladesh's premier luxury atelier. We craft modern silhouettes using heritage fabrics for the global man.
        </p>
        <div className="flex gap-4">
          {['FB', 'IG', 'YT', 'IN'].map(social => (
            <button key={social} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary transition-all font-black text-xs group">
              <span className="group-hover:scale-110 transition-transform">{social}</span>
            </button>
          ))}
        </div>
      </div>

      {['Collections', 'Support', 'Legal'].map((title, i) => (
        <div key={title}>
          <h4 className="font-black text-xs uppercase mb-8 tracking-[0.3em] text-primary">{title}</h4>
          <ul className="flex flex-col gap-4 text-white/50 text-xs font-bold uppercase tracking-widest">
            {i === 0 && <><li>New Arrivals</li><li>Premium Polos</li><li>Panjabi Atelier</li><li>Bottomwear</li></>}
            {i === 1 && <><li>Track Order</li><li>Shipping Policy</li><li>Returns & Exchanges</li><li>Contact Us</li></>}
            {i === 2 && <><li>Terms of Service</li><li>Privacy Policy</li><li>Cookie Policy</li><li>Accessibility</li></>}
          </ul>
        </div>
      ))}
    </div>

    <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/20 font-black uppercase tracking-[0.4em] text-center">
      <span>© 2025 VOGUEMEN CLOTHING LTD. CRAFTED IN DHAKA.</span>
      <div className="flex gap-8">
        <span>Verified by SSL</span>
        <span>Secure Checkout</span>
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
