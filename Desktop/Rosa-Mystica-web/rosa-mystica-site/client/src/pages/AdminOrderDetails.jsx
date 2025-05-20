import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios'; // adjust path as needed

import html2pdf from 'html2pdf.js';

function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const labelRef = useRef();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        setError('❌ Failed to load order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await axios.patch(`http://localhost:5001/api/orders/${id}/cancel`);
      alert('✅ Order cancelled');
      navigate('/admin/orders');
    } catch (err) {
      alert('❌ Failed to cancel order');
    }
  };

  const handleMarkShipped = async () => {
    try {
      await axios.patch(`http://localhost:5001/api/orders/${id}/ship`);
      alert('✅ Order marked as shipped');
      navigate('/admin/orders');
    } catch (err) {
      alert('❌ Failed to mark as shipped');
    }
  };

  const handleDownloadLabel = () => {
    if (!labelRef.current) return;
    html2pdf(labelRef.current);
  };

  if (loading) return <div className="p-6">Loading order details...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-700">📦 Order Details</h1>
        <div className="space-x-2">
          {order.status !== 'cancelled' && order.status !== 'shipped' && (
            <button
              onClick={handleMarkShipped}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              🚚 Mark as Shipped
            </button>
          )}
          {order.status !== 'cancelled' && (
            <button
              onClick={handleCancel}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              ❌ Cancel Order
            </button>
          )}
          <button
            onClick={handleDownloadLabel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            🖨 Download Label
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p><strong>Order ID:</strong> {order.customOrderId}</p>
        <p><strong>Status:</strong> <span className={`font-semibold capitalize ${order.status === 'cancelled' ? 'text-red-600' : order.status === 'shipped' ? 'text-blue-600' : 'text-yellow-600'}`}>{order.status}</span></p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold mb-2">Customer Info</h2>
          <p><strong>Name:</strong> {order.customer.name}</p>
          <p><strong>Email:</strong> {order.customer.email}</p>
          <p><strong>Phone:</strong> {order.customer.phone}</p>
          <p><strong>Address:</strong> {order.customer.address}</p>
          {order.customer.gst && <p><strong>GST:</strong> {order.customer.gst}</p>}
        </div>

        <div>
          <h2 className="font-semibold mb-2">Order Summary</h2>
          <ul className="space-y-1">
            {order.items.map((item, i) => (
              <li key={i}>{item.name} × {item.quantity} = ₹{item.price * item.quantity}</li>
            ))}
          </ul>
          <p className="font-bold mt-2">Total: ₹{order.total}</p>
        </div>
      </div>

      {/* Hidden label content for PDF generation */}
      <div ref={labelRef} className="hidden print:block p-4">
        <h2>Shipping Label</h2>
        <p><strong>Order ID:</strong> {order.customOrderId}</p>
        <p><strong>Name:</strong> {order.customer.name}</p>
        <p><strong>Address:</strong> {order.customer.address}</p>
        <p><strong>Phone:</strong> {order.customer.phone}</p>
      </div>
    </div>
  );
}

export default AdminOrderDetails;
