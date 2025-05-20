import { useEffect, useState } from 'react';
import axios from '../utils/axios'; // adjust path as needed

import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/api/products')
      .then(res => {
        setProducts(res.data);
        const cats = [...new Set(res.data.map(p => p.category))];
        setCategories(['All', ...cats]);
      })
      .catch(() => {
        setProducts([]);
        setCategories(['All']);
      });
  }, []);

  // Filter by category
  const filteredByCategory = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Filter by search term
  const filteredBySearch = filteredByCategory.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort results
  const sorted = [...filteredBySearch].sort((a, b) => {
    if (sortOption === 'price_asc') return a.price - b.price;
    if (sortOption === 'price_desc') return b.price - a.price;
    if (sortOption === 'name_asc') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="flex max-w-7xl mx-auto min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/4 p-6 bg-white shadow border-r">
        <h2 className="text-xl font-bold mb-4 text-maroon-700">🗂 Categories</h2>
        <ul className="space-y-3">
          {categories.map((cat, idx) => (
            <li
              key={idx}
              className={`cursor-pointer px-2 py-1 rounded transition ${
                selectedCategory === cat
                  ? 'bg-maroon-100 text-maroon-800 font-semibold'
                  : 'hover:text-maroon-700 hover:underline'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Products Area */}
      <main className="flex-1 p-6">
        {/* Search + Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="border p-2 rounded w-full md:w-1/2"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className="border p-2 rounded w-full md:w-1/4"
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A–Z</option>
          </select>
        </div>

        <h1 className="text-2xl font-bold text-maroon-700 mb-4">
          {selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </h1>

        {sorted.length === 0 ? (
          <p className="text-gray-600">No products match your criteria.</p>
        ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">


            {sorted.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-200"
              >
                <img
                  src={product.images?.[0] || '/no-image.png'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg truncate mb-1">{product.name}</h3>
                  <div className="text-maroon-700 font-bold text-lg">₹{product.price}</div>
                  {product.mrp && product.mrp > product.price && (
                    <div className="text-sm text-gray-500 line-through">₹{product.mrp}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Products;
