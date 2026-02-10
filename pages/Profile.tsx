
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useShop } from '../contexts/ShopContext';
import { ALL_PRODUCTS } from '../constants';
import API_URL from '../api-config';

import { User, Package, Heart, Settings, LogOut, ChevronRight, Sparkles, Clock, Camera, Save, X, MapPin, Phone, Mail } from 'lucide-react';
import { AnimatedButton } from '../components/AnimatedButton';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
    const { user, logout, updateProfile } = useAuth();
    const { wishlist } = useShop();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'orders'>('profile');
    const [isUpdating, setIsUpdating] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);

    // Form States
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isUploadingFile, setIsUploadingFile] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setPhone(user.phone || '');
            setAddress(user.address || '');
            setAvatar(user.avatar || '');
            fetchOrders();
        }
    }, [user]);

    const handleFileUpload = async (file: File) => {
        setIsUploadingFile(true);
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const token = localStorage.getItem('voguemen_token');
            const response = await fetch(`${API_URL}/user/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                setAvatar(data.url);
                return data.url;
            } else {
                const data = await response.json();
                alert(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed');
        } finally {
            setIsUploadingFile(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('voguemen_token');
            const response = await fetch(`${API_URL}/orders`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleUpdateProfile = async () => {
        setIsUpdating(true);
        const result = await updateProfile({ name, phone, address, avatar });
        setIsUpdating(false);
        if (result.success) {
            setActiveTab('profile');
        } else {
            alert(result.error);
        }
    };

    const savedProducts = ALL_PRODUCTS.filter(p => wishlist.includes(p.id));

    return (
        <div className="pt-24 md:pt-40 pb-24 bg-white min-h-screen">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            <div className="max-w-[1440px] mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="relative">
                            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl relative bg-offwhite group">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-primary flex items-center justify-center text-white text-3xl md:text-5xl font-black">
                                        {user?.name?.charAt(0) || user?.email?.charAt(0)}
                                    </div>
                                )}
                                {/* Upload Overlay */}
                                <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        disabled={isUploadingFile}
                                    />
                                    {isUploadingFile ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Camera size={24} className="text-white" />
                                    )}
                                </label>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg">
                                <div className="w-4 h-4 md:w-6 md:h-6 bg-accent rounded-full animate-pulse border-2 border-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-6xl font-black text-charcoal uppercase tracking-tighter mb-2 md:mb-4">{user?.name || user?.email?.split('@')[0]}</h1>
                            <p className="text-charcoal/40 font-bold uppercase tracking-widest text-[10px] md:text-sm">VogueMen Member Since 2024</p>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button onClick={logout} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-offwhite rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all text-charcoal">
                            <LogOut size={16} /> Sign Out
                        </button>
                        <button onClick={() => setActiveTab('settings')} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                            <Settings size={16} /> Settings
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 flex flex-col gap-12">
                        <AnimatePresence mode="wait">
                            {activeTab === 'profile' && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex flex-col gap-12"
                                >
                                    {/* Atelier Fits / Wishlist */}
                                    <section>
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                                                <Sparkles className="text-primary" size={24} /> My Atelier Fits
                                            </h3>
                                            <span className="text-[10px] font-black text-charcoal/30 uppercase tracking-widest">{savedProducts.length} Items Saved</span>
                                        </div>

                                        {savedProducts.length > 0 ? (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                                {savedProducts.map(product => (
                                                    <motion.div
                                                        key={product.id}
                                                        whileHover={{ y: -5 }}
                                                        onClick={() => navigate(`/product/${product.id}`)}
                                                        className="group cursor-pointer"
                                                    >
                                                        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-offwhite mb-4 relative shadow-sm hover:shadow-2xl transition-all duration-500">
                                                            <img src={product.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                                                            <div className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-xl text-accent"><Heart size={14} fill="currentColor" /></div>
                                                        </div>
                                                        <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{product.brand}</p>
                                                        <p className="text-xs font-bold text-charcoal truncate uppercase">{product.name}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-offwhite rounded-3xl p-16 text-center border-2 border-dashed border-border">
                                                <Heart className="mx-auto text-charcoal/10 mb-6" size={48} />
                                                <p className="text-charcoal/40 font-bold uppercase tracking-widest text-sm mb-8">Your Atelier is currently empty</p>
                                                <AnimatedButton variant="primary" onClick={() => navigate('/shop')}>Explore Collection</AnimatedButton>
                                            </div>
                                        )}
                                    </section>

                                    {/* Recent Orders */}
                                    <section>
                                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                                            <Package className="text-primary" size={24} /> Recent Orders
                                        </h3>
                                        {orders.length > 0 ? (
                                            <div className="flex flex-col gap-4">
                                                {orders.map(order => (
                                                    <div key={order.id} className="flex items-center justify-between p-6 bg-offwhite rounded-2xl group hover:bg-white border border-transparent hover:border-border transition-all cursor-pointer shadow-sm hover:shadow-xl">
                                                        <div className="flex items-center gap-6">
                                                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-charcoal/20"><Package size={24} /></div>
                                                            <div>
                                                                <p className="text-[10px] font-black uppercase text-charcoal/30 tracking-widest mb-1">Order #{order.orderNo}</p>
                                                                <p className="font-bold text-sm">Processed {new Date(order.createdAt).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right flex items-center gap-6">
                                                            <div className="hidden sm:block">
                                                                <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">{order.status}</p>
                                                                <p className="font-bold text-sm">৳{order.total.toLocaleString()}</p>
                                                            </div>
                                                            <ChevronRight size={20} className="text-charcoal/20 group-hover:text-primary transition-colors" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-12 bg-offwhite rounded-3xl text-center border-2 border-dashed border-border">
                                                <Package className="mx-auto text-charcoal/10 mb-4" size={32} />
                                                <p className="text-charcoal/40 font-bold uppercase tracking-widest text-xs">No orders found yet</p>
                                            </div>
                                        )}
                                    </section>
                                </motion.div>
                            )}

                            {activeTab === 'settings' && (
                                <motion.div
                                    key="settings"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-offwhite rounded-[40px] p-8 md:p-12"
                                >
                                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-12 flex items-center gap-4">
                                        <Settings className="text-primary" size={32} /> Account Settings
                                    </h3>

                                    <div className="relative">
                                        <Camera className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={18} />
                                        <input
                                            type="text"
                                            value={avatar}
                                            onChange={(e) => setAvatar(e.target.value)}
                                            className="w-full bg-white border border-border rounded-2xl px-14 py-5 text-sm font-bold focus:outline-none focus:border-primary transition-all"
                                            placeholder="Profile Image URL"
                                        />
                                    </div>


                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/40 ml-4">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={18} />
                                            <input
                                                type="text"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full bg-white border border-border rounded-2xl px-14 py-5 text-sm font-bold focus:outline-none focus:border-primary transition-all"
                                                placeholder="+880 1XXX-XXXXXX"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/40 ml-4">Shipping Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={18} />
                                            <input
                                                type="text"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="w-full bg-white border border-border rounded-2xl px-14 py-5 text-sm font-bold focus:outline-none focus:border-primary transition-all"
                                                placeholder="City, Area, House No."
                                            />
                                        </div>
                                    </div>


                                    <div className="mt-12 flex gap-4">
                                        <AnimatedButton
                                            variant="primary"
                                            className="grow py-5"
                                            onClick={handleUpdateProfile}
                                            disabled={isUpdating}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <Save size={18} /> {isUpdating ? 'Saving...' : 'Save Collection Data'}
                                            </div>
                                        </AnimatedButton>
                                        <button
                                            onClick={() => setActiveTab('profile')}
                                            className="px-8 bg-white border border-border rounded-2xl hover:bg-offwhite transition-all text-charcoal"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'orders' && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-charcoal rounded-[40px] p-8 md:p-12 text-white"
                                >
                                    <div className="flex items-center justify-between mb-12">
                                        <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                                            <Clock className="text-primary" size={32} /> Tracking Center
                                        </h3>
                                        <button onClick={() => setActiveTab('profile')} className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                                            <X size={20} />
                                        </button>
                                    </div>

                                    {orders.length > 0 ? (
                                        <div className="flex flex-col gap-6">
                                            {orders.map(order => (
                                                <div key={order.id} className="p-8 bg-white/5 rounded-3xl border border-white/10">
                                                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Order Tracking: #{order.orderNo}</p>
                                                            <div className="flex items-center gap-4">
                                                                <span className="px-4 py-1.5 bg-primary rounded-full text-[9px] font-black uppercase">{order.status}</span>
                                                                <span className="text-white/40 text-xs font-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-left md:text-right">
                                                            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Total Assets</p>
                                                            <p className="text-2xl font-black tracking-tighter">৳{order.total.toLocaleString()}</p>
                                                        </div>
                                                    </div>

                                                    <div className="relative flex justify-between">
                                                        <div className="absolute top-4 left-0 right-0 h-1 bg-white/10 rounded-full" />
                                                        <div
                                                            className="absolute top-4 left-0 h-1 bg-primary rounded-full transition-all duration-1000"
                                                            style={{ width: order.status === 'DELIVERED' ? '100%' : order.status === 'SHIPPED' ? '66%' : order.status === 'PROCESSING' ? '33%' : '5%' }}
                                                        />
                                                        {['Placed', 'Processing', 'Shipped', 'Delivered'].map((label, idx) => (
                                                            <div key={label} className="relative z-10 flex flex-col items-center">
                                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 border-charcoal ${(idx === 0) ||
                                                                    (idx === 1 && (order.status === 'PROCESSING' || order.status === 'SHIPPED' || order.status === 'DELIVERED')) ||
                                                                    (idx === 2 && (order.status === 'SHIPPED' || order.status === 'DELIVERED')) ||
                                                                    (idx === 3 && order.status === 'DELIVERED')
                                                                    ? 'bg-primary' : 'bg-white/10'
                                                                    }`}>
                                                                    <div className="w-2 h-2 bg-white rounded-full" />
                                                                </div>
                                                                <span className="text-[8px] font-black uppercase tracking-widest mt-3 text-white/60">{label}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-20 bg-white/5 rounded-3xl">
                                            <Clock className="mx-auto text-white/10 mb-6" size={64} />
                                            <p className="text-white/20 font-black uppercase tracking-widest">No active shipments to track</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar */}
                    <div className="flex flex-col gap-8">
                        {/* VIP Status Card */}
                        <div className="bg-charcoal p-8 rounded-3xl text-white relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Sparkles size={20} className="text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">VIP Heritage Tier</span>
                                </div>
                                <h4 className="text-3xl font-black uppercase tracking-tighter mb-4">Elite Collective</h4>
                                <p className="text-white/40 text-[10px] font-bold uppercase leading-relaxed mb-8">Unlock express delivery, concierge styling, and early access to artisanal drops.</p>
                                <div className="w-full h-1 bg-white/10 rounded-full mb-2">
                                    <div className="w-[75%] h-full bg-primary rounded-full" />
                                </div>
                                <p className="text-right text-[9px] font-black text-white/40 uppercase tracking-widest">৳15,500 more to next tier</p>
                            </div>
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 90, 0]
                                }}
                                transition={{ duration: 20, repeat: Infinity }}
                                className="absolute -bottom-20 -right-20 w-64 h-64 border border-white/5 rounded-full"
                            />
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-offwhite p-4 rounded-3xl flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`flex items-center justify-between p-4 rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest ${activeTab === 'orders' ? 'bg-white text-primary' : 'hover:bg-white text-charcoal'}`}
                            >
                                <span className="flex items-center gap-3"><Clock size={16} /> Order Tracking</span>
                                <ChevronRight size={14} />
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`flex items-center justify-between p-4 rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest ${activeTab === 'settings' ? 'bg-white text-primary' : 'hover:bg-white text-charcoal'}`}
                            >
                                <span className="flex items-center gap-3"><Settings size={16} /> Account Settings</span>
                                <ChevronRight size={14} />
                            </button>
                        </div>

                        {/* User Summary Info */}
                        {user && (
                            <div className="bg-offwhite p-8 rounded-3xl flex flex-col gap-4">
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-charcoal/30">Member Details</h5>
                                <div className="flex items-center gap-4 text-xs font-bold text-charcoal">
                                    <Mail size={14} className="text-primary" /> {user.email}
                                </div>
                                {user.phone && (
                                    <div className="flex items-center gap-4 text-xs font-bold text-charcoal">
                                        <Phone size={14} className="text-primary" /> {user.phone}
                                    </div>
                                )}
                                {user.address && (
                                    <div className="flex items-center gap-4 text-xs font-bold text-charcoal">
                                        <MapPin size={14} className="text-primary" /> {user.address}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div >
            </div >
        </div >
    );
};
