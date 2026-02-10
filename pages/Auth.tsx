
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from '../components/AnimatedButton';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleAuth = async () => {
    setError(null);
    setIsLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await register(email, password, name);
      }

      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center px-4 pt-20">
      <div className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-border">

        {/* Banner Side */}
        <div className="hidden md:flex md:w-1/2 bg-primary p-12 text-white flex-col justify-center relative overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-64 h-64 border-2 border-white/20 rounded-full"
          />
          <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase leading-tight relative z-10">
            {isLogin ? "Welcome Back to Luxury" : "Join the Elite Collective"}
          </h2>
          <p className="text-white/70 text-lg mb-10 relative z-10">
            Access exclusive drops, tracking, and personalized heritage collections.
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-fit border-2 border-white/50 px-8 py-3 rounded-xl font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all relative z-10"
          >
            {isLogin ? "Create Account" : "Sign In Instead"}
          </button>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-6 md:p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-3xl font-black text-charcoal uppercase tracking-tighter">
                {isLogin ? "Sign In" : "Register"}
              </h3>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider">
                  {error}
                </div>
              )}

              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={18} />
                  <input
                    type="text"
                    placeholder="FULL NAME"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-offwhite border border-border rounded-xl px-12 py-4 text-sm font-bold focus:outline-none focus:border-primary disabled:opacity-50"
                    disabled={isLoading}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={18} />
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-offwhite border border-border rounded-xl px-12 py-4 text-sm font-bold focus:outline-none focus:border-primary disabled:opacity-50"
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={18} />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-offwhite border border-border rounded-xl px-12 py-4 text-sm font-bold focus:outline-none focus:border-primary disabled:opacity-50"
                  disabled={isLoading}
                />
              </div>

              {isLogin && (
                <button className="text-[10px] text-primary font-black uppercase tracking-widest text-left hover:underline">
                  Forgot Password?
                </button>
              )}

              <AnimatedButton
                variant="primary"
                fullWidth
                className="py-4 mt-4"
                onClick={handleAuth}
                disabled={isLoading}
              >
                {isLoading ? "PLEASE WAIT..." : (isLogin ? "Continue To Atelier" : "Register Now")}
              </AnimatedButton>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
