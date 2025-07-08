import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider } from './contexts/CartContext';
import { useTheme } from './contexts/ThemeContext';
import { Product } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import FlowingMenu from './components/FlowingMenu';
import PremiumPromo from './components/PremiumPromo';
import Footer from './components/Footer';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanel from './components/AdminPanel';
import { getCategories } from './services/api';

type View = 'home' | 'product';

const staticCategories = [
  { name: 'Electronics', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Books', image: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=400' },
];



function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const featuredRef = useRef<HTMLDivElement>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [categories, setCategories] = useState(staticCategories);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(Array.isArray(cats) && cats.length > 0 ? cats : staticCategories);
      } catch {
        setCategories(staticCategories);
      }
    };
    fetchCategories();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setTimeout(() => {
      featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar onHomeClick={handleBackToHome} onAdminClick={() => setAdminModalOpen(true)} />
        
        <main>
          <AnimatePresence mode="wait">
            {currentView === 'home' ? (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                
                <Hero />
                <PremiumPromo />
                <div
                  style={{ height: '420px', position: 'relative', marginBottom: '2rem' }}
                  className={`rounded-2xl shadow-xl border transition-colors ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}
                >
                  <p className={`text-[5rem] text-center font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Categories</p>
                  <FlowingMenu items={categories.map(cat => ({ text: cat.name, image: cat.image }))} onCategorySelect={handleCategorySelect} />
                </div>
                <div ref={featuredRef} className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-3 py-8 ">
                  <div className="relative  bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 mb-12 border border-gray-200 dark:border-gray-700">
                    <div className="sticky  z-10 flex flex-wrap items-center justify-between gap-4 mb-8 bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                          {selectedCategory ? (
                            <>
                              {selectedCategory} <span className="text-lg font-normal text-gray-500 dark:text-gray-300">(Category)</span>
                            </>
                          ) : (
                            'Featured Products'
                          )}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-base mt-1">
                          {selectedCategory
                            ? `Browse our best picks for ${selectedCategory.toLowerCase()}.`
                            : 'Discover our handpicked selection of premium products.'}
                        </p>
                      </div>
                      {selectedCategory && (
                        <button
                          className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
                          onClick={() => setSelectedCategory(undefined)}
                        >
                          Clear Filter
                        </button>
                      )}
                    </div>
                    <ProductGrid onProductClick={handleProductClick} category={selectedCategory} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="product"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductDetail
                  product={selectedProduct}
                  onBack={handleBackToHome}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <CartSidebar onCheckout={handleCheckout} />
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
        <AdminLoginModal open={adminModalOpen} onClose={() => setAdminModalOpen(false)} onLogin={() => setAdminLoggedIn(true)} />
        {adminLoggedIn && <AdminPanel onClose={() => setAdminLoggedIn(false)} />}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;