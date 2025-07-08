import React, { useState, useEffect } from 'react';
import { API_BASE_URL, getProducts, getCategories } from '../services/api';

interface AdminPanelProps {
  onClose: () => void;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
}

interface Order {
  id?: string;
  orderId?: string;
  customer?: string;
  customerInfo?: { name?: string; email?: string; address?: string };
  total?: number;
  status?: string;
  date?: string;
  createdAt?: string;
  cartItems?: Array<{
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }>;
}

const staticCategories = [
  { id: '1', name: 'Electronics', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '2', name: 'Books', image: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=400' },
];
const staticProducts = [
  { id: '1', title: 'Premium Wireless Headphones', category: 'Electronics', price: 299.99, image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '2', title: 'Bestselling Novel', category: 'Books', price: 19.99, image: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=400' },
];
const staticOrders = [
  { id: '1', customer: 'John Doe', total: 399.98, status: 'Pending', date: '2024-07-01' },
  { id: '2', customer: 'Jane Smith', total: 19.99, status: 'Shipped', date: '2024-07-02' },
];

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categories, setCategories] = useState(staticCategories);
  const [products, setProducts] = useState(staticProducts);
  const [orders, setOrders] = useState(staticOrders);
  const [catName, setCatName] = useState('');
  const [catImage, setCatImage] = useState('');
  const [catUploading, setCatUploading] = useState(false);
  const [catUploadError, setCatUploadError] = useState('');
  const [prodTitle, setProdTitle] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodUploading, setProdUploading] = useState(false);
  const [prodUploadError, setProdUploadError] = useState('');
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'category' | 'product'; id: string } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          getCategories(),
          getProducts()
        ]);
        setCategories(Array.isArray(cats) && cats.length > 0 ? cats : staticCategories);
        setProducts(Array.isArray(prods) && prods.length > 0 ? prods : staticProducts);
      } catch {
        setCategories(staticCategories);
        setProducts(staticProducts);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders`);
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  const handleImgbbUpload = async (
    file: File,
    setUrl: (url: string) => void,
    setUploading: (uploading: boolean) => void,
    setError: (err: string) => void
  ) => {
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('key', IMGBB_API_KEY);
      formData.append('image', file);
      const res = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setUrl(data.data.url);
      } else {
        setError('Upload failed');
      }
    } catch {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Helper functions for order fields
  const getOrderId = (order: Order) => order.orderId || order.id;
  const getOrderCustomer = (order: Order) => order.customerInfo?.name || order.customer || '-';
  const getOrderDate = (order: Order) => order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date;

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center">
      <div className="relative w-full max-w-5xl bg-white dark:bg-gray-500 rounded-2xl shadow-2xl p-8 min-h-[70vh] flex flex-col max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-8 text-center">Admin Panel</h2>
        <div className="flex gap-4 mb-8 justify-center">
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition shadow ${tab === 'products' ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
            onClick={() => setTab('products')}
          >
            Manage Products
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition shadow ${tab === 'orders' ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
            onClick={() => setTab('orders')}
          >
            Manage Orders
          </button>
        </div>
        <div className="flex-1 w-full overflow-y-auto">
          {tab === 'products' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Categories */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">Categories</h3>
                  <button className="px-3 py-1 rounded bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700" onClick={() => setShowAddCategory(true)}>Add Category</button>
                </div>
                <ul className="space-y-3">
                  {categories.map(cat => (
                    <li key={cat.id} className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded p-2">
                      <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded object-cover border" />
                      <span className="font-semibold text-white flex-1">{cat.name}</span>
                      <button className="text-xs px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500" onClick={() => setEditCategory(cat)}>Edit</button>
                      <button className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => setDeleteConfirm({ type: 'category', id: cat.id })}>Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Products */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">Products</h3>
                  <button className="px-3 py-1 rounded bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700" onClick={() => setShowAddProduct(true)}>Add Product</button>
                </div>
                <ul className="space-y-3">
                  {products.map(prod => (
                    <li key={prod.id} className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded p-2">
                      <img src={prod.image} alt={prod.title} className="w-10 h-10 rounded object-cover border" />
                      <span className="font-semibold flex-1 text-white">{prod.title}</span>
                      <span className="text-xs text-gray-500">{prod.category}</span>
                      <span className="text-xs text-gray-700 dark:text-gray-200">${prod.price}</span>
                      <button className="text-xs px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500" onClick={() => setEditProduct(prod)}>Edit</button>
                      <button className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => setDeleteConfirm({ type: 'product', id: prod.id })}>Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">Orders</h3>
              </div>
              <ul className="space-y-3">
                {orders.map((order, idx) => (
                  <li key={getOrderId(order)} className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded p-2 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                    <span className="font-semibold text-white flex-1">Order {idx + 1}</span>
                    <span className="text-xs text-gray-500">{getOrderCustomer(order)}</span>
                    <span className="text-xs text-gray-700 dark:text-gray-200">${order.total}</span>
                    <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">{order.status}</span>
                    <span className="text-xs text-gray-400">{getOrderDate(order)}</span>
                    <button className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={async e => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this order?')) {
                        try {
                          await fetch(`${API_BASE_URL}/api/orders/${getOrderId(order)}`, { method: 'DELETE' });
                          setOrders(prev => prev.filter(o => getOrderId(o) !== getOrderId(order)));
                        } catch (err) {
                          console.error('Failed to delete order', err);
                        }
                      }
                    }}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Add Category Modal */}
        {showAddCategory && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md relative text-gray-900 dark:text-gray-100">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl" onClick={() => setShowAddCategory(false)}>&times;</button>
              <h3 className="text-xl font-bold mb-4 text-emerald-700 dark:text-emerald-400">Add Category</h3>
              <form className="flex flex-col gap-4" onSubmit={async e => {
                e.preventDefault();
                if (!catName || !catImage) return;
                try {
                  const res = await fetch(`${API_BASE_URL}/api/categories`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: catName, image: catImage }),
                  });
                  if (!res.ok) throw new Error('Failed to add category');
                  const newCat = await res.json();
                  setCategories(prev => [...prev, newCat]);
                  setCatName('');
                  setCatImage('');
                  setShowAddCategory(false);
                } catch {
                  setCatUploadError('Failed to add category');
                }
              }}>
                <input type="text" placeholder="Category Name" className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={catName} onChange={e => setCatName(e.target.value)} />
                <input type="file" accept="image/*" className="px-4 py-2" onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleImgbbUpload(file, setCatImage, setCatUploading, setCatUploadError);
                }} />
                {catUploading && <div className="text-emerald-600 text-sm">Uploading image...</div>}
                {catUploadError && <div className="text-red-500 text-sm">{catUploadError}</div>}
                {catImage && <img src={catImage} alt="Category" className="w-20 h-20 object-cover rounded mx-auto" />}
                <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition">Add Category</button>
              </form>
            </div>
          </div>
        )}
        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md relative text-gray-900 dark:text-gray-100">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl" onClick={() => setShowAddProduct(false)}>&times;</button>
              <h3 className="text-xl font-bold mb-4 text-emerald-700 dark:text-emerald-400">Add Product</h3>
              <form className="flex flex-col gap-4" onSubmit={async e => {
                e.preventDefault();
                if (!prodTitle || !prodPrice || !prodCategory || !prodImage) return;
                try {
                  const res = await fetch(`${API_BASE_URL}/api/products`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      title: prodTitle,
                      price: parseFloat(prodPrice),
                      category: prodCategory,
                      image: prodImage,
                    }),
                  });
                  if (!res.ok) throw new Error('Failed to add product');
                  const newProd = await res.json();
                  setProducts(prev => [...prev, newProd]);
                  setProdTitle('');
                  setProdPrice('');
                  setProdCategory('');
                  setProdImage('');
                  setShowAddProduct(false);
                } catch {
                  setProdUploadError('Failed to add product');
                }
              }}>
                <input type="text" placeholder="Product Name" className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={prodTitle} onChange={e => setProdTitle(e.target.value)} />
                <input type="number" placeholder="Price" className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={prodPrice} onChange={e => setProdPrice(e.target.value)} />
                <select className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={prodCategory} onChange={e => setProdCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <input type="file" accept="image/*" className="px-4 py-2" onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleImgbbUpload(file, setProdImage, setProdUploading, setProdUploadError);
                }} />
                {prodUploading && <div className="text-emerald-600 text-sm">Uploading image...</div>}
                {prodUploadError && <div className="text-red-500 text-sm">{prodUploadError}</div>}
                {prodImage && <img src={prodImage} alt="Product" className="w-20 h-20 object-cover rounded mx-auto" />}
                <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition">Add Product</button>
              </form>
            </div>
          </div>
        )}
        {/* Edit Category Modal */}
        {editCategory && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-gray-500 rounded-xl shadow-2xl p-8 w-full max-w-md relative text-gray-900 dark:text-gray-100">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl" onClick={() => setEditCategory(null)}>&times;</button>
              <h3 className="text-xl font-bold mb-4 text-emerald-700 dark:text-emerald-400">Edit Category</h3>
              <form className="flex flex-col gap-4" onSubmit={async e => {
                e.preventDefault();
                try {
                  const res = await fetch(`${API_BASE_URL}/api/categories/${editCategory.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: editCategory.name, image: editCategory.image }),
                  });
                  if (!res.ok) throw new Error('Failed to update category');
                  setCategories(prev => prev.map(cat => cat.id === editCategory.id ? { ...cat, name: editCategory.name, image: editCategory.image } : cat));
                  setEditCategory(null);
                } catch (err) {
                  console.error('Failed to update category', err);
                }
              }}>
                <input type="text" className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={editCategory.name} onChange={e => setEditCategory({ ...editCategory, name: e.target.value })} />
                <input type="file" accept="image/*" className="px-4 py-2" onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleImgbbUpload(file, url => setEditCategory({ ...editCategory, image: url }), () => {}, () => {});
                }} />
                {editCategory.image && <img src={editCategory.image} alt="Category" className="w-20 h-20 object-cover rounded mx-auto" />}
                <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition">Save Changes</button>
              </form>
            </div>
          </div>
        )}
        {/* Edit Product Modal */}
        {editProduct && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-gray-500 rounded-xl shadow-2xl p-8 w-full max-w-md relative text-gray-900 dark:text-gray-100">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl" onClick={() => setEditProduct(null)}>&times;</button>
              <h3 className="text-xl font-bold mb-4 text-emerald-700 dark:text-emerald-400">Edit Product</h3>
              <form className="flex flex-col gap-4" onSubmit={async e => {
                e.preventDefault();
                try {
                  const res = await fetch(`${API_BASE_URL}/api/products/${editProduct.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      title: editProduct.title,
                      price: editProduct.price,
                      category: editProduct.category,
                      image: editProduct.image,
                    }),
                  });
                  if (!res.ok) throw new Error('Failed to update product');
                  setProducts(prev => prev.map(prod => prod.id === editProduct.id ? { ...prod, ...editProduct } : prod));
                  setEditProduct(null);
                } catch (err) {
                  console.error('Failed to update product', err);
                }
              }}>
                <input type="text" className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={editProduct.title} onChange={e => setEditProduct({ ...editProduct, title: e.target.value })} />
                <input type="number" className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={editProduct.price} onChange={e => setEditProduct({ ...editProduct, price: Number(e.target.value) })} />
                <select className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={editProduct.category} onChange={e => setEditProduct({ ...editProduct, category: e.target.value })}>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <input type="file" accept="image/*" className="px-4 py-2" onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleImgbbUpload(file, url => setEditProduct({ ...editProduct, image: url }), () => {}, () => {});
                }} />
                {editProduct.image && <img src={editProduct.image} alt="Product" className="w-20 h-20 object-cover rounded mx-auto" />}
                <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition">Save Changes</button>
              </form>
            </div>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-xs relative text-center text-gray-900 dark:text-gray-100">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl" onClick={() => setDeleteConfirm(null)}>&times;</button>
              <h3 className="text-xl font-bold mb-4 text-emerald-700 dark:text-emerald-400">Confirm Delete</h3>
              <p className="mb-6">Are you sure you want to delete this {deleteConfirm.type}?</p>
              <button className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition mr-2" onClick={async () => {
                try {
                  await fetch(`${API_BASE_URL}/${deleteConfirm.type === 'category' ? 'categories' : 'products'}/${deleteConfirm.id}`, { method: 'DELETE' });
                  if (deleteConfirm.type === 'category') setCategories(prev => prev.filter(cat => cat.id !== deleteConfirm.id));
                  if (deleteConfirm.type === 'product') setProducts(prev => prev.filter(prod => prod.id !== deleteConfirm.id));
                  setDeleteConfirm(null);
                } catch {
                  setDeleteConfirm(null);
                }
              }}>Delete</button>
              <button className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold shadow hover:bg-gray-400 transition" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        )}
        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-gray-600 rounded-xl shadow-2xl p-8 w-full max-w-md relative text-gray-900 dark:text-gray-100">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl" onClick={() => setSelectedOrder(null)}>&times;</button>
              <h3 className="text-xl font-bold mb-4 text-emerald-700 dark:text-emerald-400">Order Details</h3>
              <div className="flex flex-col gap-2">
                {(() => {
                  const order = selectedOrder as Order;
                  return <>
                    <div><span className="font-semibold">Order ID:</span> {order.orderId || order.id}</div>
                    <div><span className="font-semibold">Customer:</span> {order.customerInfo?.name || order.customer || '-'}</div>
                    {order.customerInfo?.email && (
                      <div><span className="font-semibold">Email:</span> {order.customerInfo.email}</div>
                    )}
                    {order.customerInfo?.address && (
                      <div><span className="font-semibold">Address:</span> {order.customerInfo.address}</div>
                    )}
                    <div><span className="font-semibold">Total:</span> ${order.total}</div>
                    <div><span className="font-semibold">Status:</span> {order.status}</div>
                    <div><span className="font-semibold">Date:</span> {order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}</div>
                    <div className="mt-2"><span className="font-semibold">Items:</span></div>
                    <div className="flex flex-col gap-2">
                      {order.cartItems?.map((item, idx) => (
                        <div key={idx} className="border rounded p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 flex items-center gap-3">
                          <img src={item.image} alt={item.title} className="w-12 h-12 rounded object-cover border" />
                          <div className="flex-1">
                            <div><span className="font-semibold">Product:</span> {item.title}</div>
                            <div><span className="font-semibold">Price:</span> ${item.price}</div>
                            <div><span className="font-semibold">Quantity:</span> {item.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>;
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 