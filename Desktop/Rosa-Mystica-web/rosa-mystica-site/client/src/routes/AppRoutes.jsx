import { Routes, Route } from 'react-router-dom';

// ✅ Public Pages
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import ThankYou from '../pages/ThankYou';
import ProductDetails from '../pages/ProductDetails';
import About from '../pages/About';
import Contact from '../pages/Contact';
// 🔔 Notifications
import AdminNotifications from '../pages/AdminNotifications';
import CustomerNotifications from '../pages/CustomerNotifications';

// 🧑‍💼 Customer Pages
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import Orders from '../pages/Orders';

// 🛠 Admin Pages
import AdminDashboard from '../pages/AdminDashboard';
import AdminProducts from '../pages/AdminProducts';
import AdminOrders from '../pages/AdminOrders';
import AdminOrderDetails from '../pages/AdminOrderDetails';

// 🔐 Route Protection
import ProtectedRoute from '../components/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>

      {/* ✅ Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/contact" element={<Contact />} />

      {/* 🔒 Customer Protected Routes */}
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><CustomerNotifications /></ProtectedRoute>} />
      <Route path="/about" element={<About />} />

      {/* 🔐 Admin Protected Routes */}
      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute adminOnly><AdminProducts /></ProtectedRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
      <Route path="/admin/orders/:id" element={<ProtectedRoute adminOnly><AdminOrderDetails /></ProtectedRoute>} />
      <Route path="/admin/notifications" element={<ProtectedRoute adminOnly><AdminNotifications /></ProtectedRoute>} />

    </Routes>
  );
}

export default AppRoutes;
