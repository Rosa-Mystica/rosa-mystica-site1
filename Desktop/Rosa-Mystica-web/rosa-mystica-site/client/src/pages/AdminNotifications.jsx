// client/src/pages/AdminNotifications.jsx
import { useEffect, useState } from 'react';
import axios from '../utils/axios'; // adjust path as needed

import moment from 'moment';

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleClear = async () => {
    if (!window.confirm('Clear all notifications?')) return;
    try {
      await axios.delete('http://localhost:5001/api/notifications');
      setNotifications([]);
    } catch (err) {
      console.error('Failed to clear notifications:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-700">🔔 Admin Notifications</h1>
        <button
          onClick={handleClear}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Clear All
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n._id}
              className="bg-white border rounded shadow p-4 hover:shadow-md transition"
            >
              <div className="font-semibold text-green-800">{n.message}</div>
              <div className="text-xs text-gray-500 mt-1">{moment(n.createdAt).fromNow()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminNotifications;
