import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [tokenChecked, setTokenChecked] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setTokenChecked(true);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded?.email) {
        setUserEmail(decoded.email);
      } else {
        setTokenChecked(true);
      }
    } catch (err) {
      console.error('Invalid token');
      setTokenChecked(true);
    }
  }, [token]);

  useEffect(() => {
    if (!userEmail) return;

    fetch(`http://localhost:5001/api/orders?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  }, [userEmail]);

  if (!token && tokenChecked) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-green-700">🧾 Your Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div key={idx} className="border rounded p-4 bg-white shadow">
              <p className="text-sm text-gray-500 mb-2">
                <strong>Placed On:</strong>{' '}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <ul className="text-sm mb-2">
                {order.items.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-semibold text-green-700">
                Total: ₹{order.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
