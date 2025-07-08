import { Product, CustomerInfo, CartItem } from '../types';
import { fallbackProducts, fallbackCategories } from '../static/fallbackData';

export const API_BASE_URL = 'https://miniecommerce-1.onrender.com';

async function fetchWithFallback(endpoint: string, fallback: unknown) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    console.warn('Fetch failed, using fallback data:', err);
    return fallback;
  }
}

export async function getProducts() {
  return fetchWithFallback('/api/products', fallbackProducts);
}

export async function getCategories() {
  return fetchWithFallback('/api/categories', fallbackCategories);
}

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
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
    
    const response = await fetch(`${API_BASE_URL}/api/checkout`, {
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