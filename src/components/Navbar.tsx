import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onHomeClick: () => void;
  onAdminClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick, onAdminClick }) => {
  const { state, dispatch } = useCart();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onHomeClick}
            className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            <Store size={24} />
            <span className="text-xl font-bold">ModernShop</span>
          </motion.button>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="relative bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors"
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Cart</span>
              {state.items.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </motion.span>
              )}
            </motion.button>

            <button
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
              onClick={onAdminClick}
            >
              Admin Panel
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;