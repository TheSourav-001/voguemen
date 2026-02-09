
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_PRODUCTS } from '../constants';
import { useShop } from '../contexts/ShopContext';
import { AnimatedButton } from '../components/AnimatedButton';
import { Share2, ShieldCheck, Truck, RotateCcw, Check, X, Ruler, Heart } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const product = ALL_PRODUCTS.find(p => p.id === id) || ALL_PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  const calculateSize = () => {
    const h = parseInt(height);
    const w = parseInt(weight);
    if (!h || !w) return;

    if (h > 185 || w > 90) setRecommendedSize('XXL');
    else if (h > 175 || w > 80) setRecommendedSize('XL');
    else if (h > 170 || w > 70) setRecommendedSize('L');
    else if (h > 160 || w > 60) setRecommendedSize('M');
    else setRecommendedSize('S');
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, product.colors[0]);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="pt-24 md:pt-40 pb-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">

          {/* Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-6">
            <div className="flex md:flex-col gap-4 overflow-x-auto no-scrollbar">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-28 flex-shrink-0 border-2 rounded-xl overflow-hidden transition-all ${selectedImage === i ? 'border-primary' : 'border-transparent opacity-60'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumb" />
                </button>
              ))}
            </div>
            <div className="flex-grow aspect-[3/4] rounded-3xl overflow-hidden bg-offwhite shadow-2xl relative group">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                src={product.images[selectedImage]}
                className="w-full h-full object-cover"
                alt={product.name}
              />
              <div className="absolute top-6 right-6 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 rounded-2xl shadow-xl transition-all ${wishlist.includes(product.id) ? 'bg-accent text-white' : 'bg-white text-charcoal'}`}
                >
                  <Heart size={24} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                </button>
                <button className="p-4 bg-white rounded-2xl shadow-xl text-charcoal"><Share2 size={24} /></button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <span className="text-primary font-black uppercase text-xs tracking-[0.3em] block mb-4">{product.category}</span>
            <h1 className="text-4xl md:text-6xl font-black text-charcoal mb-8 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-6 mb-10">
              <span className="text-4xl font-black text-primary">৳{product.price}</span>
              <span className="text-xl text-charcoal/20 line-through">৳{Math.floor(product.price * 1.2)}</span>
              <span className="bg-accent text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Sale</span>
            </div>

            <p className="text-charcoal/50 leading-relaxed mb-12 text-lg font-medium">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-sm uppercase tracking-widest text-charcoal">Select Size</h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-[10px] font-black text-primary uppercase underline"
                >
                  Asian-Fit Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-16 rounded-2xl border-2 font-black transition-all flex items-center justify-center ${selectedSize === size ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30' : 'border-border text-charcoal/40 hover:border-charcoal'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <AnimatedButton
                onClick={handleAddToCart}
                variant={isAdded ? "outline" : "primary"}
                fullWidth
                className="py-5 text-lg rounded-2xl"
              >
                {isAdded ? (
                  <span className="flex items-center justify-center gap-2"><Check size={20} /> Added To Cart</span>
                ) : "Add to Bag"}
              </AnimatedButton>
              <AnimatedButton variant="secondary" fullWidth className="py-5 text-lg rounded-2xl" onClick={() => navigate('/cart')}>Buy It Now</AnimatedButton>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-border">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><ShieldCheck size={20} /></div>
                <span className="text-[10px] font-black text-charcoal/40 uppercase tracking-widest">Premium Quality</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Truck size={20} /></div>
                <span className="text-[10px] font-black text-charcoal/40 uppercase tracking-widest">Fast Track Delivery</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><RotateCcw size={20} /></div>
                <span className="text-[10px] font-black text-charcoal/40 uppercase tracking-widest">7-Day Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeGuide(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl p-10 relative z-10 shadow-3xl overflow-hidden"
            >
              <button
                onClick={() => setShowSizeGuide(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-offwhite hover:bg-primary/10 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary"><Ruler size={32} /></div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Asian-Fit Guide</h3>
                  <p className="text-[10px] font-black uppercase text-charcoal/30 tracking-widest">Tailored for Bangladeshi silhouettes</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-[10px] font-black uppercase text-charcoal/40 tracking-widest mb-3 block">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 175"
                    className="w-full bg-offwhite border border-border rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-charcoal/40 tracking-widest mb-3 block">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 75"
                    className="w-full bg-offwhite border border-border rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <AnimatedButton variant="primary" fullWidth className="py-4" onClick={calculateSize}>Calculate Best Fit</AnimatedButton>

              <AnimatePresence>
                {recommendedSize && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-primary rounded-2xl text-white text-center"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">Our Recommendion</p>
                    <p className="text-4xl font-black uppercase mb-4">Size {recommendedSize}</p>
                    <button
                      onClick={() => {
                        setSelectedSize(recommendedSize);
                        setShowSizeGuide(false);
                      }}
                      className="bg-white text-primary text-[10px] font-black uppercase px-6 py-2 rounded-lg hover:bg-charcoal hover:text-white transition-all tracking-widest"
                    >
                      Apply To Purchase
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
