// client/src/pages/CustomerNotifications.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function CustomerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const email = decoded.email;

      axios
        .get(`http://localhost:5001/api/notifications/user/${email}`)
        .then((res) => setNotifications(res.data))
        .catch(() => console.error('Failed to load notifications'))
        .finally(() => setLoading(false));
    } catch (err) {
      console.error('Invalid token');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-green-700 mb-6">🔔 Notifications</h1>

      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <div className="text-gray-500 text-center">No notifications yet.</div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li key={n._id} className="bg-white shadow rounded p-4 border border-gray-100">
              <div className="font-medium text-gray-800">{n.message}</div>
              <div className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomerNotifications;
