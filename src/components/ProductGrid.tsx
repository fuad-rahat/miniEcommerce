import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from './SkeletonLoader';
import { fetchProducts } from '../services/api';

interface ProductGridProps {
  onProductClick: (product: Product) => void;
  category?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick, category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isServerAvailable, setIsServerAvailable] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      
      // Check if we got real server data or fallback data
      // This is a simple heuristic - in a real app you might have a better way to detect this
      try {
        const response = await fetch('/api/products', {
          signal: AbortSignal.timeout(2000)
        });
        setIsServerAvailable(response.ok);
      } catch {
        setIsServerAvailable(false);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setIsServerAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = category
    ? products.filter((p) => p.category && p.category.toLowerCase() === category.toLowerCase())
    : products;

  if (loading) {
    return <ProductGridSkeleton />;
  }

  return (
    <div className=''>
      {/* InfiniteScroll with product images */}
      

      {/* Server Status Indicator */}
      {!isServerAvailable && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4"
        >
          <div className="flex items-center space-x-3">
            <WifiOff className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="text-amber-800 dark:text-amber-200 font-medium">
                Demo Mode Active
              </p>
              <p className="text-amber-600 dark:text-amber-300 text-sm">
                Server is not available. Showing demo products. Start the backend server for full functionality.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {isServerAvailable && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4"
        >
          <div className="flex items-center space-x-3">
            <Wifi className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-green-800 dark:text-green-200 font-medium">
              Connected to server
            </p>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard
              product={product}
              onProductClick={onProductClick}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductGrid;