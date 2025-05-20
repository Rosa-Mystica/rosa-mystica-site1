import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    '/banners/rosabanner1.png',
    '/banners/rosabanner2.png',
    '/banners/rosabanner3.png',
  ];

 useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  }, 5000);
  return () => clearInterval(interval);
}, [sliderImages.length]); // ✅ Add missing dependency


  const categories = [
    {
      title: 'Squash',
      description: 'Refreshments in a bottle.',
      image: '/products/squash.jpg',
      category: 'Squash',
    },
    {
      title: '🧵 Premium Napkins',
      description: 'Soft, elegant, and crafted to perfection.',
      image: '/products/napkin.jpg',
      category: 'Napkin',
    },
    {
      title: '☕ Printed Mugs',
      description: 'Stylish mugs for your morning brew.',
      image: '/products/mug.jpg',
      category: 'Mug',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-maroon-900">
      {/* Hero Slider */}
      <div className="w-full h-[400px] overflow-hidden relative">
        <img
          src={sliderImages[currentSlide]}
          alt="Banner"
          className="w-full h-full object-cover transition duration-700"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold">Rosa Mystica India</h1>
            <p className="mt-3 max-w-xl mx-auto text-lg">
              Premium Products from Dehradun. Crafted with love, tradition, and taste.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="mt-6 bg-white text-[#5D001E] px-6 py-2 font-semibold rounded hover:bg-gray-100 transition"
            >
              🛒 Explore Products
            </button>
          </motion.div>
        </div>
      </div>

      {/* Category Cards */}
      <section className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow hover:shadow-xl overflow-hidden cursor-pointer"
            onClick={() => navigate(`/products?category=${encodeURIComponent(item.category)}`)}
          >
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#5D001E] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Promotion Section */}
      <div className="bg-amber-100 text-center py-10 px-4 border-y border-amber-300">
        <h2 className="text-2xl font-bold mb-2 text-amber-800">🔥 Limited Time Offer</h2>
        <p className="text-amber-700 mb-4">Use <strong>WELCOME15</strong> for 15% OFF. New customers only!</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 transition"
        >
          Grab Deal
        </button>
      </div>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto py-14 px-6 text-center">
        <h3 className="text-2xl font-bold text-[#5D001E] mb-6">Why Choose Rosa Mystica?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-lg font-semibold text-[#5D001E] mb-2">🌿 Locally Sourced</h4>
            <p className="text-sm text-gray-600">We work with local farmers and artisans in Uttarakhand for pure and authentic materials.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-lg font-semibold text-[#5D001E] mb-2">🚚 Fast Delivery</h4>
            <p className="text-sm text-gray-600">All orders shipped quickly with tracking and reliable service.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-lg font-semibold text-[#5D001E] mb-2">⭐ Premium Quality</h4>
            <p className="text-sm text-gray-600">Top-tier packaging, hygiene, and quality control for every item.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
