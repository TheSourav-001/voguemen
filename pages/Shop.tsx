
import React, { useState, useMemo } from 'react';
import { ALL_PRODUCTS, CATEGORIES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Grid, List, Search, SlidersHorizontal, ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';

export const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(25000);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesPrice = p.price <= priceRange;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [activeCategory, priceRange, searchQuery]);

  return (
    <div className="pt-24 md:pt-40 pb-24 bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">

        {/* Header Section */}
        <header className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-charcoal mb-4 md:mb-6 uppercase tracking-tighter"
          >
            The <span className="text-primary">Atelier</span>
          </motion.h1>
          <p className="text-charcoal/40 font-bold uppercase tracking-[0.3em] text-xs">
            Discover {filteredProducts.length} Premium Essentials Crafted for Perfection
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Advanced Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-32 space-y-10">

              {/* Search */}
              <div>
                <h3 className="text-[10px] font-black text-charcoal/30 uppercase tracking-[0.2em] mb-4">Search Inventory</h3>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20" size={16} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search drops..."
                    className="w-full bg-offwhite border-2 border-transparent focus:border-primary/20 rounded-2xl px-12 py-3 text-sm font-bold transition-all outline-none"
                  />
                </div>
              </div>

              {/* Categories Scrollable */}
              <div>
                <h3 className="text-[10px] font-black text-charcoal/30 uppercase tracking-[0.2em] mb-4">Collections</h3>
                <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                  <button
                    onClick={() => setActiveCategory('All')}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all font-black text-xs uppercase tracking-widest ${activeCategory === 'All' ? 'bg-primary text-white' : 'hover:bg-offwhite text-charcoal/60'}`}
                  >
                    All Collections <span>{ALL_PRODUCTS.length}</span>
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all font-black text-xs uppercase tracking-widest ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-offwhite text-charcoal/60'}`}
                    >
                      {cat} <span>{ALL_PRODUCTS.filter(p => p.category === cat).length}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] font-black text-charcoal/30 uppercase tracking-[0.2em]">Max Price</h3>
                  <span className="text-primary font-black text-xs">৳{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="25000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-1.5 bg-offwhite rounded-lg appearance-none"
                />
              </div>

              {/* Promo Card */}
              <div className="bg-charcoal p-8 rounded-3xl text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                <h4 className="font-black text-xl mb-4 leading-tight">JOIN THE COLLECTIVE</h4>
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-6">Get 10% Off Your First Order</p>
                <button className="w-full bg-white text-charcoal py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Sign Up Now</button>
              </div>

            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {isMobileFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white z-[60] lg:hidden p-6 overflow-y-auto shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-black uppercase">Filters</h3>
                    <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-offwhite rounded-xl">
                      <ChevronDown size={20} className="rotate-90" />
                    </button>
                  </div>

                  <div className="space-y-10">
                    {/* Search */}
                    <div>
                      <h3 className="text-[10px] font-black text-charcoal/30 uppercase tracking-[0.2em] mb-4">Search Inventory</h3>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20" size={16} />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search drops..."
                          className="w-full bg-offwhite border-2 border-transparent focus:border-primary/20 rounded-2xl px-12 py-3 text-sm font-bold transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <h3 className="text-[10px] font-black text-charcoal/30 uppercase tracking-[0.2em] mb-4">Collections</h3>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => { setActiveCategory('All'); setIsMobileFiltersOpen(false); }}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all font-black text-xs uppercase tracking-widest ${activeCategory === 'All' ? 'bg-primary text-white' : 'hover:bg-offwhite text-charcoal/60'}`}
                        >
                          All Collections <span>{ALL_PRODUCTS.length}</span>
                        </button>
                        {CATEGORIES.map(cat => (
                          <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setIsMobileFiltersOpen(false); }}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all font-black text-xs uppercase tracking-widest ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-offwhite text-charcoal/60'}`}
                          >
                            {cat} <span>{ALL_PRODUCTS.filter(p => p.category === cat).length}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Filter */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[10px] font-black text-charcoal/30 uppercase tracking-[0.2em]">Max Price</h3>
                        <span className="text-primary font-black text-xs">৳{priceRange}</span>
                      </div>
                      <input
                        type="range"
                        min="400"
                        max="25000"
                        step="100"
                        value={priceRange}
                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                        className="w-full accent-primary cursor-pointer h-1.5 bg-offwhite rounded-lg appearance-none"
                      />
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product Feed */}
          <main className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
              <div className="flex items-center gap-4 text-xs font-black text-charcoal/40 uppercase tracking-widest">
                Showing <span className="text-charcoal">{filteredProducts.length}</span> Masterpieces
              </div>
              <div className="w-full sm:w-auto flex items-center justify-between gap-4">
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-charcoal/20"
                >
                  <SlidersHorizontal size={14} /> Filters
                </button>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 bg-offwhite px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-border transition-all">
                    Sort <span className="hidden sm:inline">: Relevance</span> <ChevronDown size={14} />
                  </button>
                  <div className="hidden sm:flex gap-2">
                    <button className="p-2.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/20"><Grid size={18} /></button>
                    <button className="p-2.5 bg-offwhite text-charcoal/30 rounded-xl"><List size={18} /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-10">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, i) => (
                  <ShopProductCard key={product.id} product={product} index={i} />
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-24 text-center">
                <Search size={48} className="mx-auto text-border mb-6" />
                <h3 className="text-2xl font-black text-charcoal mb-4 uppercase">No Masterpieces Found</h3>
                <p className="text-charcoal/40 font-medium">Try adjusting your filters or search query.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const ShopProductCard: React.FC<{ product: any, index: number }> = ({ product, index }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useShop();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: (index % 12) * 0.05 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-offwhite shadow-sm group-hover:shadow-2xl transition-all duration-700">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className={`p-3 rounded-xl shadow-xl transition-all ${wishlist.includes(product.id) ? 'bg-accent text-white' : 'bg-white text-charcoal hover:bg-primary hover:text-white'}`}
          >
            <Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, product.sizes[0], product.colors[0]);
            }}
            className="p-3 bg-white text-charcoal rounded-xl shadow-xl hover:bg-primary hover:text-white transition-all"
          >
            <ShoppingCart size={18} />
          </button>
        </div>

        {product.isNew && (
          <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-lg">New</span>
        )}

        <div className="absolute bottom-4 left-4 right-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20">
            <p className="text-[9px] font-black text-primary uppercase mb-1 tracking-widest">In Stock</p>
            <div className="flex justify-between items-center text-[10px] font-bold text-charcoal">
              <span>Standard Fit</span>
              <span>Available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xs md:text-sm font-black text-charcoal group-hover:text-primary transition-colors truncate uppercase tracking-tight">{product.name}</h3>
        <p className="text-[8px] md:text-[10px] text-charcoal/30 font-black uppercase tracking-[0.2em] mt-1 mb-3 truncate">{product.category}</p>
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <span className="text-sm md:text-lg font-black text-charcoal">৳{product.price}</span>
          <span className="text-xs text-charcoal/20 line-through">৳{Math.floor(product.price * 1.3)}</span>
        </div>
      </div>
    </motion.div>
  );
};
