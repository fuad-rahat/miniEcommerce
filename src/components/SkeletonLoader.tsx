import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'rectangular' 
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full'
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
    >
      <Skeleton className="w-full h-48" />
      
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-12 h-4" />
        </div>
        
        <Skeleton className="w-3/4 h-6" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
        
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-24 h-10 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

export const ProductGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="w-32 h-6 mb-8" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <Skeleton className="w-full h-96 rounded-2xl" />
        </div>
        
        <div className="space-y-6">
          <div>
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-3/4 h-10 mb-4" />
            
            <div className="flex items-center space-x-4 mb-6">
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-20 h-6 rounded-full" />
            </div>
            
            <div className="space-y-2 mb-8">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>
            
            <Skeleton className="w-32 h-12 mb-8" />
            
            <div className="flex space-x-4">
              <Skeleton className="flex-1 h-14 rounded-xl" />
              <Skeleton className="w-14 h-14 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;