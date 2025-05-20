import { useState } from 'react';
import axios from '../utils/axios'; // adjust path as needed

import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    gst: '',
    address: '',
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/auth/register', form);
      setMsg('✅ Registered successfully! You can now log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || '❌ Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">📝 Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="email" name="email" placeholder="Email" className="w-full border p-2 rounded" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full border p-2 rounded" value={form.password} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Full Name" className="w-full border p-2 rounded" value={form.name} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" className="w-full border p-2 rounded" value={form.phone} onChange={handleChange} />
        <input type="text" name="gst" placeholder="GST Number (optional)" className="w-full border p-2 rounded" value={form.gst} onChange={handleChange} />
        <textarea name="address" placeholder="Full Address" className="w-full border p-2 rounded" rows={3} value={form.address} onChange={handleChange} />

        <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition">
          Register
        </button>
        <p className="text-sm mt-2">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
        {msg && <p className="text-sm mt-2 text-blue-600">{msg}</p>}
      </form>
    </div>
  );
}

export default Register;
