import { Product, CustomerInfo, CartItem } from '../types';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Fallback products for when server is not available
const fallbackProducts: Product[] = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    price: 299.99,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics",
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    title: "Organic Coffee Beans",
    description: "Premium organic coffee beans sourced from sustainable farms. Rich flavor and aromatic blend for the perfect morning brew.",
    price: 24.99,
    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Food & Beverages",
    rating: 4.6,
    inStock: true
  },
  {
    id: 3,
    title: "Minimalist Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness and sleek design. Perfect for home office or study spaces.",
    price: 89.99,
    image: "https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Home & Garden",
    rating: 4.7,
    inStock: true
  },
  {
    id: 4,
    title: "Vintage Leather Wallet",
    description: "Handcrafted leather wallet with multiple compartments and timeless design. Made from premium genuine leather.",
    price: 79.99,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fashion",
    rating: 4.9,
    inStock: true
  },
  {
    id: 5,
    title: "Ceramic Plant Pot Set",
    description: "Beautiful set of ceramic plant pots in various sizes. Perfect for indoor plants and modern home decoration.",
    price: 49.99,
    image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Home & Garden",
    rating: 4.5,
    inStock: true
  },
  {
    id: 6,
    title: "Artisan Chocolate Gift Box",
    description: "Luxury chocolate gift box with artisan chocolates made from finest ingredients. Perfect for special occasions.",
    price: 39.99,
    image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Food & Beverages",
    rating: 4.8,
    inStock: true
  },
  {
    id: 7,
    title: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and smartphone connectivity. Track your health goals.",
    price: 199.99,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics",
    rating: 4.4,
    inStock: true
  },
  {
    id: 8,
    title: "Bamboo Kitchen Utensil Set",
    description: "Eco-friendly bamboo kitchen utensil set with modern design. Sustainable and durable for everyday cooking.",
    price: 34.99,
    image: "https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Home & Garden",
    rating: 4.6,
    inStock: true
  },
  {
    id: 9,
    title: "Bestselling Novel",
    description: "A gripping and heartwarming story from a bestselling author. Perfect for book lovers.",
    price: 19.99,
    image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Books",
    rating: 4.7,
    inStock: true
  },
  {
    id: 10,
    title: "Classic White Sneakers",
    description: "Comfortable and stylish sneakers for everyday wear. Timeless design and durable build.",
    price: 89.99,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Sneakers",
    rating: 4.8,
    inStock: true
  },
  {
    id: 11,
    title: "Latest Smartphone",
    description: "High-performance smartphone with stunning display and advanced camera features.",
    price: 799.99,
    image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Smartphone",
    rating: 4.9,
    inStock: true
  },
  {
    id: 12,
    title: "Travel Backpack",
    description: "Spacious and durable backpack for travel, work, or school. Multiple compartments and ergonomic design.",
    price: 59.99,
    image: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Backpack",
    rating: 4.6,
    inStock: true
  },
];

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(`${API_BASE_URL}/products`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products from server');
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Server not available, using fallback data:', error);
    // Return fallback data instead of throwing error
    return fallbackProducts;
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Failed to fetch product from server');
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Server not available, using fallback data:', error);
    // Return fallback product
    const product = fallbackProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
};

export const submitOrder = async (customerInfo: CustomerInfo, cartItems: CartItem[], total: number) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout for orders
    
    const response = await fetch(`${API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerInfo,
        cartItems,
        total
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Failed to submit order to server');
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Server not available, simulating order:', error);
    // Simulate successful order when server is down
    const orderId = Math.random().toString(36).substr(2, 9);
    return {
      success: true,
      orderId,
      message: 'Order placed successfully! (Demo mode - server unavailable)'
    };
  }
};