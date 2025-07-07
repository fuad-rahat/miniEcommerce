import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-white pt-12 pb-6 mt-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <span className="text-2xl font-bold tracking-tight mb-2 block">MiniEcommerce</span>
          <p className="text-sm text-emerald-200 mb-4">Your one-stop shop for premium products, fast delivery, and secure checkout. Experience the future of online shopping.</p>
          <div className="flex gap-4 mt-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-emerald-300 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.762.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-emerald-300 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-emerald-300 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.678 1.315 2.697 2.296 2.491 3.408 2.433 4.689 2.375 5.969 2.363 6.378 2.363 12c0 5.622.012 6.031.07 7.311.058 1.281.264 2.393 1.245 3.374.981.981 2.093 1.187 3.374 1.245 1.28.058 1.689.07 7.311.07s6.031-.012 7.311-.07c1.281-.058 2.393-.264 3.374-1.245.981-.981 1.187-2.093 1.245-3.374.058-1.28.07-1.689.07-7.311s-.012-6.031-.07-7.311c-.058-1.281-.264-2.393-1.245-3.374C19.393.334 18.281.128 17.001.07 15.721.012 15.311 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.2-10.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-emerald-200">Quick Links</h3>
          <nav className="flex flex-col gap-2 text-emerald-100 text-sm">
            <a href="#" className="hover:text-white transition">Home</a>
            <a href="#featured" className="hover:text-white transition">Featured</a>
            <a href="#categories" className="hover:text-white transition">Categories</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </nav>
        </div>
        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-emerald-200">Contact</h3>
          <ul className="text-emerald-100 text-sm space-y-1">
            <li>Email: <a href="mailto:support@miniecommerce.com" className="hover:text-white transition">support@miniecommerce.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:text-white transition">+1 234 567 890</a></li>
            <li>Address: 123 Market St, Digital City</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-emerald-900 text-center text-emerald-200 text-xs">
        &copy; {new Date().getFullYear()} MiniEcommerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 