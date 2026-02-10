
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, ShoppingBag } from 'lucide-react';
import { ALL_PRODUCTS } from '../constants';
import { useNavigate } from 'react-router-dom';

export const AtelierAI: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, products?: any[] }[]>([
        { role: 'assistant', content: 'Greeting from the Atelier. I am your personal stylist. How can I elevate your heritage collection today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setIsTyping(true);

        // Simulate AI reflection
        setTimeout(() => {
            let response = "That sounds like a magnificent choice. Based on our heritage collection, I recommend these pieces:";
            let recommendedProducts: any[] = [];

            const query = userMessage.toLowerCase();
            if (query.includes('suit') || query.includes('formal') || query.includes('office')) {
                recommendedProducts = ALL_PRODUCTS.filter(p => p.category === 'Suits & Blazers').slice(0, 2);
            } else if (query.includes('panjabi') || query.includes('eid') || query.includes('wedding')) {
                recommendedProducts = ALL_PRODUCTS.filter(p => p.category === 'Panjabi & Pajama' || p.category === 'Ethnic Wear').slice(0, 2);
            } else if (query.includes('watch') || query.includes('time')) {
                recommendedProducts = ALL_PRODUCTS.filter(p => p.category === 'Luxury Watches').slice(0, 2);
            } else {
                recommendedProducts = ALL_PRODUCTS.slice(0, 2);
                response = "I have curated a few exceptional pieces from our latest drop that might interest you:";
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response,
                products: recommendedProducts
            }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-primary text-white rounded-2xl shadow-2xl flex items-center justify-center group"
            >
                {isOpen ? <X size={24} /> : (
                    <>
                        <MessageSquare size={24} className="group-hover:hidden" />
                        <Sparkles size={24} className="hidden group-hover:block" />
                    </>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-[400px] h-[70vh] md:h-[600px] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col font-sans border border-border"
                    >
                        {/* Header */}
                        <div className="bg-charcoal text-white p-4 md:p-6 flex justify-between items-center flex-shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"><Sparkles size={20} /></div>
                                <div>
                                    <h4 className="font-black uppercase tracking-tighter">Atelier AI</h4>
                                    <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-60">Digital Concierge</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="opacity-60 hover:opacity-100"><X size={20} /></button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 flex flex-col gap-6 no-scrollbar">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%] ${m.role === 'user' ? 'ml-auto' : ''}`}>
                                    <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed ${m.role === 'user' ? 'bg-offwhite text-charcoal' : 'bg-primary/5 text-charcoal shadow-sm'}`}>
                                        {m.content}
                                    </div>
                                    {m.products && m.products.length > 0 && (
                                        <div className="grid grid-cols-1 gap-2 mt-4 w-full">
                                            {m.products.map(p => (
                                                <div
                                                    key={p.id}
                                                    onClick={() => navigate(`/product/${p.id}`)}
                                                    className="flex items-center gap-3 p-2 bg-white border border-border rounded-xl cursor-pointer hover:border-primary transition-all group"
                                                >
                                                    <img src={p.images[0]} className="w-10 h-10 object-cover rounded-lg" alt="" />
                                                    <div className="flex-grow">
                                                        <p className="text-[8px] font-black uppercase text-primary">{p.category}</p>
                                                        <p className="text-[10px] font-bold text-charcoal truncate">{p.name}</p>
                                                    </div>
                                                    <ShoppingBag size={14} className="text-charcoal/20 group-hover:text-primary" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-1 items-center p-4 bg-primary/5 rounded-2xl w-fit">
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-6 border-t border-border">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask for style advice..."
                                    className="w-full bg-offwhite border border-border rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-primary pr-12"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-charcoal transition-all"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
