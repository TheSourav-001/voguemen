
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../contexts/ShopContext';
import { AnimatedButton } from '../components/AnimatedButton';
import {
  ChevronRight,
  MapPin,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Truck,
  Smartphone,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../api-config';

type CheckoutStep = 'shipping' | 'payment' | 'success';

const PAYMENT_METHODS = [
  { id: 'bkash', name: 'bKash', logo: 'https://raw.githubusercontent.com/shunno-labs/bangladesh-payment-icons/main/icons/bkash.svg', color: '#E2136E', desc: 'Secure Mobile Payment' },
  { id: 'nagad', name: 'Nagad', logo: 'https://raw.githubusercontent.com/shunno-labs/bangladesh-payment-icons/main/icons/nagad.svg', color: '#F7941D', desc: 'Faster Mobile Banking' },
  { id: 'rocket', name: 'Rocket', logo: 'https://raw.githubusercontent.com/shunno-labs/bangladesh-payment-icons/main/icons/rocket.svg', color: '#8C3494', desc: 'Dutch-Bangla Service' },
  { id: 'upay', name: 'Upay', logo: 'https://raw.githubusercontent.com/shunno-labs/bangladesh-payment-icons/main/icons/upay.svg', color: '#FFD200', desc: 'UCB Mobile Banking' },
  { id: 'card', name: 'Saved Card', logo: 'https://raw.githubusercontent.com/shunno-labs/bangladesh-payment-icons/main/icons/visa.svg', color: '#1A1F71', desc: 'Credit / Debit Card' },
  { id: 'cod', name: 'Cash On Delivery', icon: <Truck />, color: '#1F2937', desc: 'Pay when you receive' }
];

export const Checkout: React.FC = () => {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [selectedMethod, setSelectedMethod] = useState('bkash');
  const { cart, totalPrice, totalItems } = useShop();
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState<{ cart: any[], total: number, customer: any } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFinalize = async () => {
    const token = localStorage.getItem('voguemen_token');
    if (!token) {
      alert("Please login to finalize your order.");
      navigate('/auth');
      return;
    }

    const orderNo = `#VM-2025-${(Math.random() * 10000).toFixed(0)}`;

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderNo,
          total: totalPrice,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        })
      });

      if (response.ok) {
        setOrderSummary({
          cart: [...cart],
          total: totalPrice,
          customer: { ...formData },
          orderId: orderNo
        });
        setStep('success');
      } else {
        const data = await response.json();
        alert(data.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Network error. Please try again.");
    }
  };

  if (step === 'success' && orderSummary) {
    return <SuccessState cart={orderSummary.cart} totalPrice={orderSummary.total} customer={orderSummary.customer} orderId={orderSummary.orderId} />;
  }

  return (
    <div className="pt-24 md:pt-40 pb-24 bg-offwhite min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* Stepper Header */}
            <div className="flex items-center gap-4 mb-12">
              <button
                onClick={() => setStep('shipping')}
                className={`text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2 ${step === 'shipping' ? 'text-primary' : 'text-charcoal/30'}`}
              >
                01. Shipping {step !== 'shipping' && <CheckCircle2 size={14} className="text-green-500" />}
              </button>
              <div className="h-px w-8 bg-border" />
              <button
                onClick={() => step !== 'shipping' && setStep('payment')}
                className={`text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-charcoal/30'}`}
              >
                02. Payment
              </button>
            </div>

            <AnimatePresence mode="wait">
              {step === 'shipping' ? (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary"><MapPin size={24} /></div>
                    <h2 className="text-2xl font-black text-charcoal uppercase tracking-tighter">Shipping Destination</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="FULL NAME"
                      placeholder="e.g. Tanvir Rahman"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <Input
                      label="MOBILE NUMBER"
                      placeholder="+880 1XXX XXXXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="DELIVERY ADDRESS"
                        placeholder="House, Road, Area..."
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                    <Input
                      label="AREA / CITY"
                      placeholder="Dhaka"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                    <Input
                      label="POSTAL CODE"
                      placeholder="1212"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    />
                  </div>

                  <div className="pt-8">
                    <AnimatedButton
                      variant="primary"
                      className="px-12 py-4 rounded-2xl text-xs uppercase tracking-widest"
                      onClick={() => setStep('payment')}
                    >
                      Continue to Payment <ChevronRight className="inline ml-2" size={16} />
                    </AnimatedButton>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary"><CreditCard size={24} /></div>
                    <h2 className="text-2xl font-black text-charcoal uppercase tracking-tighter">Treasury Gateway</h2>
                  </div>

                  <p className="text-charcoal/40 text-xs font-bold uppercase tracking-widest mb-8">Select Your Preferred Payment Method</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${selectedMethod === method.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-border hover:border-charcoal/20'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm">
                            {method.logo ? (
                              <img src={method.logo} alt={method.name} className="max-w-[80%] max-h-[80%] object-contain" />
                            ) : (
                              <div className="text-charcoal">{method.icon}</div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-black text-charcoal uppercase text-xs tracking-widest">{method.name}</h4>
                            <p className="text-[9px] text-charcoal/40 font-bold uppercase tracking-widest mt-1">{method.desc}</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethod === method.id ? 'bg-primary border-primary text-white' : 'border-border group-hover:border-charcoal/40'}`}>
                          {selectedMethod === method.id && <Check size={14} />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {selectedMethod === 'card' ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-offwhite p-6 rounded-2xl border border-border space-y-4"
                      >
                        <div className="flex items-center gap-3 text-primary mb-2">
                          <CreditCard size={18} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Card Details</span>
                        </div>
                        <Input label="CARD NUMBER" placeholder="XXXX XXXX XXXX XXXX" />
                        <div className="grid grid-cols-2 gap-4">
                          <Input label="EXPIRY DATE" placeholder="MM / YY" />
                          <Input label="CVV" placeholder="XXX" />
                        </div>
                        <Input label="CARDHOLDER NAME" placeholder="AS ON CARD" />
                      </motion.div>
                    ) : selectedMethod !== 'cod' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-offwhite p-6 rounded-2xl border border-border space-y-4"
                      >
                        <div className="flex items-center gap-3 text-primary mb-2">
                          <Smartphone size={18} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Mobile Wallet Verification</span>
                        </div>
                        <Input label={`${selectedMethod.toUpperCase()} NUMBER`} placeholder="01XXX XXXXXX" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-8 flex flex-col sm:flex-row gap-4">
                    <AnimatedButton
                      variant="primary"
                      className="px-12 py-4 rounded-2xl text-xs uppercase tracking-widest flex-grow"
                      onClick={handleFinalize}
                    >
                      Finalize Order (৳{totalPrice})
                    </AnimatedButton>
                    <button
                      onClick={() => setStep('shipping')}
                      className="px-8 py-4 text-xs font-black text-charcoal/40 uppercase tracking-widest hover:text-charcoal transition-colors"
                    >
                      Back to Shipping
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:w-1/3">
            <div className="bg-charcoal text-white p-8 md:p-10 rounded-3xl sticky top-32 shadow-2xl">
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">Cart Brief</h3>

              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                {cart.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 items-center">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                      <img src={item.images[0]} className="w-full h-full object-cover opacity-80" alt={item.name} />
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <h4 className="text-[10px] font-black uppercase tracking-widest truncate">{item.name}</h4>
                      <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-1">Size: {item.selectedSize} × {item.quantity}</p>
                      <p className="text-[10px] font-black text-primary mt-2">৳{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                  <span>Subtotal</span>
                  <span className="text-white">৳{totalPrice}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                  <span>Delivery (Express)</span>
                  <span className="text-primary">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-black uppercase tracking-tight pt-4">
                  <span>Total</span>
                  <span className="text-primary">৳{totalPrice}</span>
                </div>
              </div>

              <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4 group">
                <ShieldCheck className="text-primary group-hover:scale-110 transition-transform" size={24} />
                <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest leading-relaxed">
                  Your transaction is secured with 256-bit SSL encryption for a safe shopping experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, placeholder, value, onChange }: { label: string, placeholder: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black text-charcoal/30 uppercase tracking-[0.2em] block">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-offwhite border-2 border-transparent px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest focus:outline-none focus:border-primary/20 transition-all placeholder:text-charcoal/20"
    />
  </div>
);

const SuccessState = ({ cart, totalPrice, customer, orderId }: { cart: any[], totalPrice: number, customer: any, orderId: string }) => {
  const navigate = useNavigate();

  const handleDownloadInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-white z-[120] flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
      {/* Print-Only Invoice Component (Portrait A4) */}
      <div
        className="hidden print:block print-only fixed inset-0 bg-white z-[200] p-0"
        style={{ width: '210mm', height: '297mm', background: 'white' }}
      >
        <div className="w-full h-full p-0 flex flex-col bg-white">
          {/* Header Bar */}
          <div className="flex justify-between items-stretch mb-8">
            <div
              className="bg-primary px-12 py-8 flex items-center"
              style={{ clipPath: 'polygon(0 0, 92% 0, 100% 100%, 0% 100%)', width: '65%' }}
            >
              <h1 className="text-5xl font-black text-white tracking-[0.2em] uppercase">Invoice</h1>
            </div>
            <div className="flex flex-col items-end justify-center px-12 text-right">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 bg-charcoal rounded-lg flex items-center justify-center text-white shadow-lg"><ShieldCheck size={20} /></div>
                <h2 className="text-xl font-black text-charcoal uppercase tracking-tighter">VogueMen</h2>
              </div>
              <p className="text-[9px] font-bold text-charcoal/40 uppercase tracking-[0.4em]">Official Luxury Atelier</p>
            </div>
          </div>

          <div className="px-12 grid grid-cols-2 gap-12 mb-10">
            <div>
              <h3 className="text-xs font-black text-charcoal/30 mb-3 uppercase tracking-widest">Billing & Shipping:</h3>
              <p className="text-base font-black text-primary uppercase mb-1">{customer.name || 'Valued Client'}</p>
              <p className="text-xs font-bold text-charcoal/70 leading-relaxed uppercase tracking-tight">
                {customer.address || 'Standard Delivery'}<br />
                {customer.city} {customer.postalCode}<br />
                <span className="text-primary/60 font-black mt-1 inline-block">M: {customer.phone || 'N/A'}</span>
              </p>
            </div>
            <div className="flex flex-col items-end justify-start">
              <div className="space-y-2">
                <div className="flex justify-between gap-8">
                  <span className="text-[10px] font-black text-charcoal/30 uppercase tracking-widest">Order ID:</span>
                  <span className="text-xs font-black text-charcoal">{orderId}</span>
                </div>
                <div className="flex justify-between gap-8 text-right">
                  <span className="text-[10px] font-black text-charcoal/30 uppercase tracking-widest">Issue Date:</span>
                  <span className="text-xs font-black text-charcoal">{new Date().toLocaleDateString('en-GB')}</span>
                </div>
                <div className="flex justify-between gap-8 text-right">
                  <span className="text-[10px] font-black text-charcoal/30 uppercase tracking-widest">Due Date:</span>
                  <span className="text-xs font-black text-charcoal">Paid in Full</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-12 mb-10 flex-grow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-charcoal text-[10px] font-black uppercase tracking-[0.2em] text-white">
                  <th className="py-3 px-6 w-16">SL</th>
                  <th className="py-3 px-6">Description</th>
                  <th className="py-3 px-6 text-right">Rate</th>
                  <th className="py-3 px-6 text-center">Qty</th>
                  <th className="py-3 px-6 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-[10px] font-bold uppercase">
                {cart.map((item, i) => (
                  <tr key={i} className="border-b border-charcoal/5 hover:bg-offwhite/50 transition-colors">
                    <td className="py-4 px-6 text-charcoal/30">{(i + 1).toString().padStart(2, '0')}</td>
                    <td className="py-4 px-6">
                      <p className="font-black text-charcoal">{item.name}</p>
                      <p className="text-[8px] text-charcoal/40 mt-0.5 tracking-widest">{item.category} • Size: {item.selectedSize}</p>
                    </td>
                    <td className="py-4 px-6 text-right text-charcoal/60">৳{item.price.toLocaleString()}</td>
                    <td className="py-4 px-6 text-center text-charcoal/60">{item.quantity}</td>
                    <td className="py-4 px-6 text-right font-black text-charcoal">৳{(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-12 mb-10">
            <div className="flex justify-between items-end gap-16">
              <div className="flex-grow space-y-6">
                <div>
                  <h4 className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-3 border-b-2 border-primary/20 pb-1 w-fit">Registry Details</h4>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    <p className="text-[8px] font-black text-charcoal uppercase leading-tight">Ref: <span className="text-charcoal/40 font-bold ml-1">VMA-{Math.floor(Math.random() * 10000)}</span></p>
                    <p className="text-[8px] font-black text-charcoal uppercase leading-tight">Method: <span className="text-charcoal/40 font-bold ml-1">Treasury Checkout</span></p>
                    <p className="text-[8px] font-black text-charcoal uppercase leading-tight">Gateway: <span className="text-charcoal/40 font-bold ml-1">Visa Secure</span></p>
                    <p className="text-[8px] font-black text-charcoal uppercase leading-tight">Status: <span className="text-green-600 font-black ml-1">Verified</span></p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-3 border-b-2 border-primary/20 pb-1 w-fit">Terms & Policy</h4>
                  <p className="text-[8px] font-medium text-charcoal/40 uppercase leading-[1.6] tracking-wider max-w-[280px]">
                    Articles are crafted with precision. Exchanges valid for 7 days in original condition. Digital proof of purchase secured via SSL.
                  </p>
                </div>
              </div>

              <div className="w-60 space-y-2 bg-offwhite/30 p-6 rounded-3xl border border-charcoal/5">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-charcoal/40">
                  <span>Sub Total</span>
                  <span className="text-charcoal">৳{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-charcoal/40">
                  <span>Express Care</span>
                  <span className="text-primary">FREE</span>
                </div>
                <div className="flex justify-between text-2xl font-black uppercase tracking-tighter pt-3 border-t-2 border-primary/10 text-primary">
                  <span>Grand Total</span>
                  <span>৳{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-12 mt-auto pb-10 flex justify-between items-center bg-charcoal/5 py-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-primary rounded-full" />
                <span className="text-[10px] font-black text-charcoal uppercase tracking-[0.3em]">CRAFTED IN DHAKA</span>
              </div>
              <p className="text-[8px] font-bold text-charcoal/30 uppercase tracking-[0.1em]">© 2025 Voguemen International • Authentic Fashion Registry</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-56 h-[1px] bg-charcoal/20" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-charcoal">Atelier Signature</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, delay: 0.2 }}
          className="w-32 h-32 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-10"
        >
          <CheckCircle2 size={64} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-6xl font-black text-charcoal uppercase tracking-tighter mb-6"
        >
          Order <span className="text-primary">Confirmed</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-charcoal/50 text-lg md:text-xl font-medium mb-12"
        >
          Your collection is being prepared. <br />
          Order ID: <span className="text-charcoal font-black">{orderId}</span>
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <AnimatedButton
              variant="secondary"
              fullWidth
              className="py-5 text-xs uppercase tracking-widest rounded-2xl"
              onClick={handleDownloadInvoice}
            >
              Download Invoice
            </AnimatedButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
          >
            <AnimatedButton
              variant="primary"
              fullWidth
              className="py-5 text-xs uppercase tracking-widest rounded-2xl"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </AnimatedButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex items-center justify-center gap-8 text-[10px] text-charcoal/30 font-black uppercase tracking-widest"
        >
          <div className="flex items-center gap-2"><Truck size={14} /> Express Dhaka</div>
          <div className="flex items-center gap-2"><ShieldCheck size={14} /> Certified Authenticity</div>
        </motion.div>
      </motion.div>
    </div>
  );
};
