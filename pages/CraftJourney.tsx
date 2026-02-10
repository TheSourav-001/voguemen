import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { ArrowLeft, Scissors, ThermometerSun, Leaf, Ruler } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CraftJourney: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-offwhite text-charcoal font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1598558528521-0f741639d4b3?q=80&w=2070&auto=format&fit=crop"
                        alt="Tailor at work"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6"
                    >
                        Our Craft <span className="text-primary">Journey</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white/80 text-lg md:text-2xl font-medium leading-relaxed"
                    >
                        From the loom to your wardrobe. A story of heritage, precision, and uncompromised luxury.
                    </motion.p>
                </div>
            </section>

            {/* The Process */}
            <section className="py-20 md:py-32 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Step 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-32"
                    >
                        <div className="md:w-1/2">
                            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2072&auto=format&fit=crop"
                                    alt="Fabric Selection"
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg">
                                    <Leaf className="text-primary" size={32} />
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">Step 01</h2>
                            <h3 className="text-3xl md:text-5xl font-black uppercase mb-8">Sourcing Heritage</h3>
                            <p className="text-charcoal/70 text-lg leading-relaxed mb-8">
                                We travel across Bangladesh to source the finest 100% organic cotton and heritage Muslin fabrics.
                                Our materials are chosen not just for their texture, but for their story and sustainability.
                            </p>
                            <ul className="space-y-4 font-bold text-sm uppercase tracking-wide text-charcoal/60">
                                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full" /> Organic Cotton from North Bengal</li>
                                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full" /> Heritage Muslin Weaves</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 mb-32"
                    >
                        <div className="md:w-1/2">
                            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1780&auto=format&fit=crop"
                                    alt="Pattern Cutting"
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg">
                                    <Ruler className="text-primary" size={32} />
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">Step 02</h2>
                            <h3 className="text-3xl md:text-5xl font-black uppercase mb-8">The Master Cut</h3>
                            <p className="text-charcoal/70 text-lg leading-relaxed mb-8">
                                Every silhouette is drafted by master pattern makers. We blend traditional tailoring techniques with modern fits to create garments that drape perfectly on the body.
                            </p>
                            <ul className="space-y-4 font-bold text-sm uppercase tracking-wide text-charcoal/60">
                                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full" /> Laser Precision Cutting</li>
                                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full" /> Anatomical Fit Adjustments</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center gap-12 md:gap-24"
                    >
                        <div className="md:w-1/2">
                            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop"
                                    alt="Stitching"
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg">
                                    <Scissors className="text-primary" size={32} />
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">Step 03</h2>
                            <h3 className="text-3xl md:text-5xl font-black uppercase mb-8">Hand Finishing</h3>
                            <p className="text-charcoal/70 text-lg leading-relaxed mb-8">
                                True luxury lies in the details. Buttonholes, linings, and final touches are finished by hand to ensure longevity and an exquisite feel.
                            </p>
                            <ul className="space-y-4 font-bold text-sm uppercase tracking-wide text-charcoal/60">
                                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full" /> Reinforced Seams</li>
                                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full" /> Hand-stitched Labels</li>
                            </ul>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 bg-charcoal text-white text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black uppercase mb-8">Experience The Quality</h2>
                    <p className="text-white/60 mb-12 text-lg">
                        Discover the result of our journey. Pieces designed to last a lifetime.
                    </p>
                    <button
                        onClick={() => navigate('/shop')}
                        className="bg-primary text-white hover:bg-white hover:text-charcoal px-12 py-4 rounded-full font-black uppercase tracking-widest transition-all text-sm md:text-base"
                    >
                        Shop The Collection
                    </button>
                </div>
            </section>
        </div>
    );
};
