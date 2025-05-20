import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login'); // 🚫 Not logged in
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setEmail(decoded.email);
    } catch (err) {
      console.error('Invalid token:', err.message);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        🎉 Welcome, {email ? email.split('@')[0] : 'User'}!
      </h1>

      <p className="text-gray-600 mb-6">
        You are now logged in. Enjoy browsing and shopping with Rosa Mystica India.
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
