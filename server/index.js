import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB');
    
    // Initialize products if collection is empty
    const productsCount = await db.collection('products').countDocuments();
    if (productsCount === 0) {
      await initializeProducts();
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Fallback to in-memory data
    console.log('Using in-memory data as fallback');
  }
};

// Initialize dummy products
const initializeProducts = async () => {
  const products = [
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
    }
  ];

  if (db) {
    await db.collection('products').insertMany(products);
    console.log('Products initialized');
  }
};

// Fallback products for when DB is not available
const fallbackProducts = [
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
  }
];

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = db 
      ? await db.collection('products').find({}).toArray()
      : fallbackProducts;
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.json(fallbackProducts);
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = db 
      ? await db.collection('products').findOne({ id: productId })
      : fallbackProducts.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/checkout', async (req, res) => {
  try {
    const { customerInfo, cartItems, total } = req.body;
    
    // Simulate order processing
    const orderId = Math.random().toString(36).substr(2, 9);
    
    const order = {
      orderId,
      customerInfo,
      cartItems,
      total,
      status: 'processing',
      createdAt: new Date()
    };
    
    if (db) {
      await db.collection('orders').insertOne(order);
    }
    
    res.json({ 
      success: true, 
      orderId,
      message: 'Order placed successfully!' 
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ success: false, message: 'Error processing order' });
  }
});

// --- PRODUCT CRUD ---
app.post('/api/products', async (req, res) => {
  try {
    const product = req.body;
    if (db) {
      // Auto-increment id
      const last = await db.collection('products').find().sort({ id: -1 }).limit(1).toArray();
      product.id = last.length ? last[0].id + 1 : 1;
      await db.collection('products').insertOne(product);
      res.status(201).json(product);
    } else {
      res.status(500).json({ message: 'DB not available' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const update = req.body;
    if (db) {
      await db.collection('products').updateOne({ id }, { $set: update });
      res.json({ success: true });
    } else {
      res.status(500).json({ message: 'DB not available' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (db) {
      await db.collection('products').deleteOne({ id });
      res.json({ success: true });
    } else {
      res.status(500).json({ message: 'DB not available' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// --- CATEGORY CRUD ---
app.get('/api/categories', async (req, res) => {
  try {
    const categories = db ? await db.collection('categories').find({}).toArray() : [];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const category = req.body;
    if (db) {
      // Auto-increment id
      const last = await db.collection('categories').find().sort({ id: -1 }).limit(1).toArray();
      category.id = last.length ? last[0].id + 1 : 1;
      await db.collection('categories').insertOne(category);
      res.status(201).json(category);
    } else {
      res.status(500).json({ message: 'DB not available' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding category' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const update = req.body;
    if (db) {
      await db.collection('categories').updateOne({ id }, { $set: update });
      res.json({ success: true });
    } else {
      res.status(500).json({ message: 'DB not available' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating category' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (db) {
      await db.collection('categories').deleteOne({ id });
      res.json({ success: true });
    } else {
      res.status(500).json({ message: 'DB not available' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category' });
  }
});

// --- ORDER CRUD ---
app.get('/api/orders', async (req, res) => {
  try {
    const orders = db ? await db.collection('orders').find({}).toArray() : [];
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    if (db) {
      await db.collection('orders').updateOne({ orderId: id }, { $set: update });
      res.json({ success: true });
    } else {
      res.status(500).json({ message: 'DB not available' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (db) {
      await db.collection('orders').deleteOne({ orderId: id });
      res.json({ success: true });
    } else {
      res.status(500).json({ message: 'DB not available' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order' });
  }
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});