import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from '../utils/axios'; // adjust path as needed

import { Bell, UserCircle } from 'lucide-react';
import { CartContext } from '../context/CartContext';

function Header() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef();
  const profileRef = useRef();

  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        axios
          .get(`http://localhost:5001/api/notifications/${decoded.email}`)
          .then(res => setNotifications(res.data.slice(0, 5)))
          .catch(err => console.error('Notification fetch error:', err));
      } catch (err) {
        console.error('Invalid token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-[#5D001E] text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:opacity-90 transition">
          Rosa Mystica India
        </Link>


        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/products" className="hover:text-gray-300 transition">Products</Link>
          <Link to="/about" className="hover:text-maroon-300 transition">About</Link>
          <Link to="/cart" className="hover:text-gray-300 transition">Cart ({totalItems})</Link>


          {user?.role === 'admin' && (
            <Link to="/admin" className="hover:text-gray-300 transition">Admin Panel</Link>
          )}

          {/* Notification Bell */}
          {user && (
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotif(prev => !prev)}
                className="relative hover:text-gray-300 transition"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-gray-800 shadow-lg rounded-md z-50 max-h-80 overflow-y-auto">
                  <div className="p-3 font-semibold border-b text-black">🔔 Notifications</div>
                  {notifications.length === 0 ? (
                    <div className="p-3 text-sm text-gray-500">No new notifications</div>
                  ) : (
                    notifications.map((n, i) => (
                      <div key={i} className="p-3 text-sm border-b hover:bg-gray-100 transition">
                        <div className="font-medium">{n.title}</div>
                        <div className="text-xs text-gray-600">{n.message}</div>
                      </div>
                    ))
                  )}
                  <Link
                    to={user.role === 'admin' ? '/admin/notifications' : '/notifications'}
                    className="block text-center py-2 text-blue-600 hover:underline text-sm"
                  >
                    View All →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Profile Dropdown */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfile(prev => !prev)}
                className="flex items-center gap-2 hover:text-gray-300 transition"
              >
                <UserCircle className="w-5 h-5" />
                <span>{user.email.split('@')[0]}</span>
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-gray-700 shadow-lg rounded-md z-50">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
              <Link to="/register" className="hover:text-gray-300 transition">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
