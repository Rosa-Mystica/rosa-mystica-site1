import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { jwtDecode } from 'jwt-decode';

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    pin: '',
    phone: '',
    gst: '',
  });

  const [msg, setMsg] = useState('');

  // Auto-fill email from JWT
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.email) {
          setForm((prev) => ({ ...prev, email: decoded.email }));
        }
      } catch (err) {
        console.error('Invalid token');
      }
    }
  }, []);

  const getTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const { name, email, address, pin, phone } = form;

    if (!name || !email || !address || !pin || !phone) {
      alert('Please fill in all required fields.');
      return;
    }

    const order = {
      customer: form,
      items: cart,
      total: getTotal(),
    };

    try {
      const res = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Order placed successfully!');
        setCart([]); // clear context
        localStorage.removeItem(`cart_${form.email}`); // clear localStorage
        navigate('/thank-you');
      } else {
        alert('❌ Order failed: ' + data.message);
      }
    } catch (err) {
      alert('❌ Server error: ' + err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-green-700 mb-6">📦 Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Customer Info */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Customer Details:</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
                disabled
              />
              <textarea
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows={3}
                required
              />
              <input
                type="text"
                name="pin"
                placeholder="PIN Code"
                value={form.pin}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="gst"
                placeholder="GST Number (optional)"
                value={form.gst}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </form>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
            >
              ✅ Place Order
            </button>
          </div>

          {/* Right: Summary */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">Order Summary:</h2>
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b py-2 text-sm"
              >
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-3 text-green-700">
              <span>Total</span>
              <span>₹{getTotal()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
