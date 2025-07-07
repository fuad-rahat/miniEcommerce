import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Truck, Shield } from 'lucide-react';
import BlurText from './BlurText';

const heroImages = [
  'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&w=800&q=80', // Fashion
  'https://images.pexels.com/photos/1813504/pexels-photo-1813504.jpeg?auto=compress&w=800&q=80', // Electronics
  'https://images.pexels.com/photos/3952232/pexels-photo-3952232.jpeg?auto=compress&w=800&q=80', // Home decor
];

const Hero: React.FC = () => {
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIdx(idx => (idx + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-2 md:px-8 py-8 md:py-16">
      {/* Layered gradients and digital accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[40vw] h-[40vw] bg-gradient-to-br from-emerald-400/40 via-blue-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-gradient-to-tr from-orange-300/30 via-pink-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse" />
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[...Array(20)].map((_, i) => (
            <line key={i} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="#10b981" strokeWidth="0.15" />
          ))}
          {[...Array(20)].map((_, i) => (
            <line key={i} y1={i * 5} x1="0" y2={i * 5} x2="100" stroke="#6366f1" strokeWidth="0.15" />
          ))}
        </svg>
      </div>
      {/* Split grid layout */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Glassmorphism content card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100 dark:border-gray-800 p-8 md:p-12 flex flex-col gap-6 items-start"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight"
          >
            <BlurText
              text="Discover Amazing Products"
              delay={150}
              animateBy="words"
              direction="top"
              spanClassName="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 bg-clip-text text-transparent font-bold drop-shadow-lg"
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-gray-700 dark:text-gray-200 mb-2 max-w-xl"
          >
            Shop the latest trends and discover unique products from our curated collection. Quality guaranteed, fast delivery, and exceptional customer service.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-xl shadow border border-emerald-100 dark:border-gray-800 backdrop-blur">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-mono tracking-wider">4.8+ Rating</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-xl shadow border border-emerald-100 dark:border-gray-800 backdrop-blur">
              <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-mono tracking-wider">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-xl shadow border border-emerald-100 dark:border-gray-800 backdrop-blur">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-mono tracking-wider">Secure Payment</span>
            </div>
          </motion.div>
        </motion.div>
        {/* Right: Digital carousel with floating cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex items-center justify-center h-[350px] md:h-[420px] w-full"
        >
          {/* Digital frame */}
          <div className="relative w-full max-w-md h-full rounded-3xl overflow-visible flex items-center justify-center">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-400/60 via-blue-400/40 to-purple-500/40 blur-lg animate-pulse z-0" />
            {/* Main carousel image */}
            {heroImages.map((img, i) => (
              <motion.img
                key={img}
                src={img}
                alt="Hero visual"
                initial={{ opacity: 0 }}
                animate={{ opacity: imgIdx === i ? 1 : 0, scale: imgIdx === i ? 1 : 0.95 }}
                transition={{ duration: 0.8 }}
                className={`absolute object-cover w-full h-[350px] md:h-[420px] rounded-2xl shadow-2xl border-4 border-white/60 dark:border-gray-800 transition-all duration-700 ${imgIdx === i ? 'z-10' : 'z-0'}`}
                style={{ pointerEvents: 'none', filter: imgIdx === i ? 'drop-shadow(0 0 32px #10b98188) saturate(1.2)' : 'none' }}
              />
            ))}
            {/* Floating product cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
              className="relative bottom-64 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-gray-900/80 border border-emerald-200 dark:border-emerald-900 shadow-lg rounded-xl px-6 py-3 flex flex-col items-center backdrop-blur-xl"
              style={{ minWidth: 180 }}
            >
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">Trending</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Smart Gadgets</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.7, type: 'spring' }}
              className="absolute bottom-6 right-0 bg-white/90 dark:bg-gray-900/80 border border-blue-200 dark:border-blue-900 shadow-lg rounded-xl px-5 py-2 flex flex-col items-center backdrop-blur-xl"
              style={{ minWidth: 140 }}
            >
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Deal</span>
              <span className="text-base font-semibold text-gray-900 dark:text-white">Up to 50% Off</span>
            </motion.div>
            {/* Carousel dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full border-2 ${imgIdx === i ? 'bg-emerald-500 border-emerald-500' : 'bg-white/70 border-gray-300'}`}
                  onClick={() => setImgIdx(i)}
                  aria-label={`Show image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;