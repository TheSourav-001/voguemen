
import React from 'react';
import { motion } from 'framer-motion';
import { ALL_PRODUCTS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { AnimatedButton } from '../components/AnimatedButton';

const LOOKS = [
    {
        id: 'look-1',
        title: 'The Monsoon Formal',
        description: 'Bespoke Zurhem blazers paired with artisanal linen trousers for the ultimate rainy season elegance.',
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1200',
        products: ['suitsblazers-0', 'trouserschinos-1']
    },
    {
        id: 'look-2',
        title: 'Heritage Nights',
        description: 'Hand-stitched Panjabis from our Illiyeen collection. Heritage meet modern precision.',
        image: 'https://images.unsplash.com/photo-1621335829175-95f437384d7c?q=80&w=1200',
        products: ['panjabipajama-0', 'luxurywatches-2']
    },
    {
        id: 'look-3',
        title: 'The Urban Atelier',
        description: 'Contemporary casuals for the Dhaka city life. Premium Blucheez polos and selvedge raw denim.',
        image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1200',
        products: ['premiumshirts-3', 'tshirthelp-2']
    }
];

export const Lookbook: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white pt-24">
            <section className="px-8 mb-24">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-primary font-black uppercase tracking-[0.6em] text-xs mb-6 block"
                >
                    Editorial Journals
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-9xl font-black text-charcoal uppercase tracking-tighter"
                >
                    THE <span className="text-primary">LOOKS</span>
                </motion.h1>
            </section>

            <div className="flex flex-col gap-0">
                {LOOKS.map((look, i) => (
                    <section key={look.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-screen border-b border-border`}>
                        <div className="lg:w-3/5 relative overflow-hidden group">
                            <motion.img
                                initial={{ scale: 1.2 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 1.5 }}
                                src={look.image}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                                alt={look.title}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700" />
                        </div>

                        <div className="lg:w-2/5 p-6 md:p-24 flex flex-col justify-center bg-offwhite">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-primary/40 font-black text-4xl md:text-8xl mb-2 md:mb-4 italic"
                            >
                                0{i + 1}
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-6xl font-black mb-4 md:mb-8 uppercase tracking-tighter"
                            >
                                {look.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-charcoal/60 text-base md:text-xl font-medium leading-relaxed mb-6 md:mb-12"
                            >
                                {look.description}
                            </motion.p>

                            <div className="flex flex-col gap-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-charcoal/30 mb-2">Shop The Look</h4>
                                {look.products.map(pId => {
                                    const product = ALL_PRODUCTS.find(p => p.id === pId);
                                    if (!product) return null;
                                    return (
                                        <motion.div
                                            key={pId}
                                            whileHover={{ x: 10 }}
                                            onClick={() => navigate(`/product/${product.id}`)}
                                            className="flex items-center gap-6 p-4 rounded-2xl bg-white border border-border group cursor-pointer hover:border-primary transition-all shadow-sm hover:shadow-xl"
                                        >
                                            <img src={product.images[0]} className="w-16 h-16 object-cover rounded-xl" alt={product.name} />
                                            <div className="flex-grow">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{product.category}</p>
                                                <p className="font-bold text-sm text-charcoal truncate max-w-[150px]">{product.name}</p>
                                            </div>
                                            <ArrowRight size={20} className="text-charcoal/20 group-hover:text-primary transition-colors" />
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="mt-16">
                                <AnimatedButton variant="secondary" className="px-12">View Full Collection</AnimatedButton>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};
