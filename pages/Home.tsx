
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { AnimatedButton } from '../components/AnimatedButton';
import { ALL_PRODUCTS, CATEGORIES } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Truck, RotateCcw, ShieldCheck, Star, Heart, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const newArrivals = ALL_PRODUCTS.filter(p => p.isNew).slice(0, 8);
  const featuredAtelier = ALL_PRODUCTS.filter(p => p.category === 'Premium Shirts' || p.category === 'Luxury Watches').slice(0, 4);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };


  return (
    <div ref={containerRef} className="bg-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Cinematic Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Luxury Fashion"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-black uppercase tracking-[0.6em] text-xs mb-6"
          >
            The Summer 2025 Collective
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-4xl md:text-9xl font-black mb-4 md:mb-8 uppercase tracking-tighter"
          >
            VOGUE<span className="text-primary">MEN</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-lg md:text-2xl max-w-2xl mb-12 font-medium leading-relaxed"
          >
            Curating the finest South Asian craftsmanship with global modern silhouettes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-6"
          >
            <Link to="/shop">
              <AnimatedButton variant="primary" className="px-12 py-4 text-base">The Atelier</AnimatedButton>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Trust & Heritage Badges */}
      <section className="bg-charcoal py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
        >
          <Badge icon={<ShieldCheck size={32} />} title="Artisan Built" sub="Premium Quality Control" />
          <Badge icon={<Truck size={32} />} title="Express DHAKA" sub="Same Day Delivery" />
          <Badge icon={<RotateCcw size={32} />} title="Hassle Free" sub="7-Day Returns Policy" />
          <Badge icon={<Star size={32} />} title="Elite Service" sub="Rated 4.9/5 by 10k+ Men" />
        </motion.div>
      </section>

      {/* Discovery Categories */}
      <section className="py-24 px-8 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-charcoal uppercase mb-2">The Collections</h2>
            <div className="h-1.5 w-16 md:w-24 bg-primary rounded-full" />
          </div>
          <Link to="/shop" className="text-primary font-black text-sm uppercase tracking-widest flex items-center gap-2 group">
            Explore All <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8"
        >
          {CATEGORIES.slice(0, 12).map((cat, i) => (
            <motion.div
              key={cat}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                if (isLoggedIn) {
                  navigate(`/shop?category=${cat}`);
                } else {
                  navigate('/profile');
                }
              }}
              className="group cursor-pointer text-center"
            >
              <div className="aspect-square rounded-3xl overflow-hidden mb-4 bg-offwhite border-2 border-transparent group-hover:border-primary transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/20">
                <img
                  src={(ALL_PRODUCTS.find(p => p.category === cat)?.images[0]) || `https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={cat}
                />
              </div>
              <span className="text-[10px] font-black text-charcoal/40 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">{cat}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Drop - The High Fidelity Card */}
      <section className="py-24 bg-offwhite px-8">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-center mb-16"
          >
            <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Seasonal Selection</span>
            <h2 className="text-3xl md:text-5xl font-black text-charcoal uppercase tracking-tighter">New Arrivals</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12"
          >
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Editorial Story: Craftsmanship */}
      <section className="py-32 bg-white px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl overflow-hidden shadow-3xl"
            >
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200"
                alt="Craft"
                className="w-full aspect-[4/5] object-cover hover:scale-110 transition-transform duration-1000"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
              className="absolute -bottom-12 -right-12 bg-primary p-12 rounded-3xl text-white hidden lg:block shadow-2xl"
            >
              <h3 className="text-4xl font-black mb-4 uppercase">100%</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-white/70">Organic Egyptian Cotton</p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-7xl font-black text-charcoal uppercase mb-6 md:mb-12 leading-tight">Heritage Meets <span className="text-primary">Precision</span></h2>
            <p className="text-charcoal/60 text-base md:text-xl leading-relaxed mb-6 md:mb-10 font-medium">
              VogueMen is not just a brand; it's a movement to elevate Bangladeshi craftsmanship. Every piece in our Atelier collection is hand-finished by master tailors with over 30 years of experience in luxury garments.
            </p>
            <ul className="space-y-6 mb-12 text-charcoal font-black uppercase text-sm tracking-widest">
              <li className="flex items-center gap-4"><div className="w-3 h-3 bg-primary rounded-full" /> Double-stitched seams for longevity</li>
              <li className="flex items-center gap-4"><div className="w-3 h-3 bg-primary rounded-full" /> Ethically sourced raw materials</li>
              <li className="flex items-center gap-4"><div className="w-3 h-3 bg-primary rounded-full" /> Customized fit for Asian silhouettes</li>
            </ul>
            <AnimatedButton variant="secondary" className="px-12 py-4" onClick={() => navigate('/craft-journey')}>Our Craft Journey</AnimatedButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const Badge = ({ icon, title, sub }: { icon: any, title: string, sub: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    whileHover={{ y: -5 }}
    className="flex items-center gap-6 group cursor-default text-white"
  >
    <div className="text-primary group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <div>
      <p className="text-base font-black uppercase tracking-tight">{title}</p>
      <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">{sub}</p>
    </div>
  </motion.div>
);

const ProductCard: React.FC<{ product: any, index: number }> = ({ product, index }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-offwhite shadow-sm group-hover:shadow-2xl transition-all duration-700">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        {product.isNew && (
          <span className="absolute top-6 left-6 bg-primary text-white text-[9px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest">New Drop</span>
        )}
        <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
          <button className="bg-white p-4 rounded-2xl shadow-2xl text-charcoal hover:text-accent transition-all hover:scale-110"><Heart size={20} /></button>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
          <div className="text-white">
            <p className="text-[9px] font-black text-primary uppercase mb-2 tracking-widest">In Stock: {product.stock} units</p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-widest">Quick Look</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 px-2">
        <h3 className="text-sm font-black text-charcoal uppercase tracking-tight group-hover:text-primary transition-colors truncate">{product.name}</h3>
        <p className="text-[10px] text-charcoal/30 uppercase font-black tracking-[0.2em] mt-1 mb-3">{product.category}</p>
        <div className="flex items-center gap-4">
          <span className="text-xl font-black text-charcoal">৳{product.price}</span>
          <span className="text-xs text-charcoal/20 line-through font-bold">৳{Math.floor(product.price * 1.3)}</span>
        </div>
      </div>
    </motion.div>
  );
};

