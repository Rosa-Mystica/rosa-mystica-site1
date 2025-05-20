import { useEffect, useState } from 'react';
import axios from '../utils/axios'; // adjust path as needed

import { Link } from 'react-router-dom';
import moment from 'moment';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error loading orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const exportOrders = () => {
    const headers = ['Order ID', 'Name', 'Email', 'Phone', 'Address', 'Total', 'Items'];
    const rows = orders.map((order) => [
      order.customOrderId || order._id,
      order.customer.name,
      order.customer.email,
      order.customer.phone,
      order.customer.address,
      order.total,
      order.items.map((i) => `${i.name} x${i.quantity}`).join('; '),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-green-700">📦 Admin Orders</h1>
        <button
          onClick={exportOrders}
          className="bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-800 transition"
        >
          Export to CSV
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center mt-20 text-xl">No orders have been placed yet by customers.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded-lg shadow">
            <thead className="bg-green-100 text-green-900">
              <tr>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Items</th>
                <th className="p-3 border">Created At</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={idx} className="bg-white even:bg-gray-50 border-t hover:bg-green-50 transition">
                  <td className="p-3 border font-mono text-sm">{order.customOrderId || order._id}</td>
                  <td className="p-3 border">{order.customer.name}</td>
                  <td className="p-3 border">{order.customer.email}</td>
                  <td className="p-3 border">{order.customer.phone}</td>
                  <td className="p-3 border text-green-700 font-bold">₹{order.total}</td>
                  <td className="p-3 border text-xs">
                    {order.items.map((item, i) => (
                      <div key={i}>{item.name} × {item.quantity}</div>
                    ))}
                  </td>
                  <td className="p-3 border text-xs text-gray-500">
                    {moment(order.createdAt).fromNow()}
                  </td>
                  <td className="p-3 border text-sm">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
