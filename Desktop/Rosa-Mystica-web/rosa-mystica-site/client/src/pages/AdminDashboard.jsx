import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function AdminDashboard() {
  const navigate = useNavigate();

  const sections = [
    {
      title: '🛍 Product Management',
      actions: [
        'View, Add, Edit, Delete products',
        'Manage product categories',
        'Toggle active/inactive status'
      ],
      route: '/admin/products',
      color: 'from-pink-500 to-yellow-500'
    },
    {
      title: '🖼 Banner Management',
      actions: [
        'Upload homepage banners',
        'Schedule seasonal promo images'
      ],
      route: '/admin/banners',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: '📦 Inventory Management',
      actions: [
        'Set stock per product',
        'View low stock alerts'
      ],
      route: '/admin/inventory',
      color: 'from-green-500 to-lime-500'
    },
    {
      title: '🧾 Order Management',
      actions: [
        'View and filter orders',
        'Update order status',
        'Generate invoices/shipping labels'
      ],
      route: '/admin/orders',
      color: 'from-orange-500 to-amber-500'
    },
    {
      title: '👥 Customer Management',
      actions: [
        'View customer list',
        'Send WhatsApp or Email alerts',
        'Suspend or delete users'
      ],
      route: '/admin/customers',
      color: 'from-purple-500 to-fuchsia-500'
    },
    {
      title: '📈 Analytics Dashboard',
      actions: [
        'View sales stats and best-sellers',
        'Track order and user trends'
      ],
      route: '/admin/analytics',
      color: 'from-cyan-500 to-teal-500'
    },
    {
      title: '🔐 Admin Tools',
      actions: [
        'Change admin password',
        'Add/remove other admins',
        'Export data (CSV/Excel)'
      ],
      route: '/admin/tools',
      color: 'from-red-500 to-pink-600'
    }
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-100 min-h-screen">
      <motion.h1
        className="text-4xl font-extrabold text-center text-green-700 mb-8 drop-shadow"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌿 Rosa Mystica India – Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            onClick={() => navigate(section.route)}
            className={`cursor-pointer rounded-2xl p-5 text-white shadow-lg bg-gradient-to-br ${section.color} hover:scale-105 transition transform duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-bold mb-3 drop-shadow-md">{section.title}</h2>
            <ul className="list-disc list-inside text-sm opacity-90">
              {section.actions.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;