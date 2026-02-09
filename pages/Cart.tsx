
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../contexts/ShopContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { AnimatedButton } from '../components/AnimatedButton';

export const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useShop();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <ShoppingBag size={80} className="mx-auto text-border mb-6" />
          <h2 className="text-3xl font-black text-charcoal mb-4 uppercase">Your Cart is Empty</h2>
          <p className="text-charcoal/40 mb-10 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Let's find some essentials.</p>
          <Link to="/shop">
            <AnimatedButton variant="primary">Start Shopping</AnimatedButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-40 pb-24 bg-offwhite min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl font-black text-charcoal mb-12 uppercase tracking-tight">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={`${item.id}-${item.selectedSize}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-4 md:p-6 rounded-2xl border border-border flex gap-4 md:gap-8 items-center"
                >
                  <div className="w-24 h-32 md:w-32 md:h-40 rounded-xl overflow-hidden flex-shrink-0 bg-offwhite">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-black text-charcoal text-sm md:text-lg mb-1">{item.name}</h3>
                    <p className="text-[10px] md:text-xs text-charcoal/40 font-bold uppercase tracking-widest mb-4">
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 bg-offwhite px-3 py-1 rounded-lg border border-border">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-charcoal/40 hover:text-primary"><Minus size={16} /></button>
                        <span className="font-black text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-charcoal/40 hover:text-primary"><Plus size={16} /></button>
                      </div>
                      <span className="font-black text-primary">৳{item.price * item.quantity}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-accent hover:bg-accent/10 rounded-xl transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl border-2 border-primary/10 sticky top-32 shadow-xl">
              <h2 className="text-xl font-black text-charcoal mb-8 uppercase">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/40 font-bold uppercase">Subtotal</span>
                  <span className="font-black text-charcoal">৳{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/40 font-bold uppercase">Shipping</span>
                  <span className="font-black text-primary uppercase">Free</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between text-lg">
                  <span className="font-black text-charcoal uppercase">Grand Total</span>
                  <span className="font-black text-primary text-2xl">৳{totalPrice}</span>
                </div>
              </div>

              <Link to="/checkout">
                <AnimatedButton variant="primary" fullWidth className="py-4 text-base">
                  Checkout Now <ArrowRight size={18} className="inline ml-2" />
                </AnimatedButton>
              </Link>
              
              <p className="mt-6 text-[10px] text-charcoal/30 text-center font-bold uppercase tracking-widest">
                Secure SSL Encrypted Payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
