import { useEffect, useState } from 'react';
import axios from '../utils/axios'; // adjust path as needed

import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    gst: '',
    address: '',
    email: '',
  });

  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMsg('⚠️ You must be logged in.');
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      axios
        .get(`http://localhost:5001/api/users/${decoded.email}`)
        .then((res) => {
          setForm({ ...res.data, email: decoded.email });
        })
        .catch(() => setMsg('⚠️ Failed to load profile'))
        .finally(() => setLoading(false));
    } catch (err) {
      setMsg('⚠️ Invalid session. Please log in again.');
      setLoading(false);
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    const token = localStorage.getItem('token');

    try {
      await axios.patch(
        'http://localhost:5001/api/users/update',
        {
          name: form.name,
          phone: form.phone,
          gst: form.gst,
          address: form.address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMsg('✅ Profile updated successfully');
    } catch (err) {
      console.error('Update error:', err);
      setMsg('❌ Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">👤 Your Profile</h1>
      {loading ? (
        <p className="text-gray-600">Loading profile...</p>
      ) : (
        <div className="space-y-4">
          <input
            type="email"
            value={form.email}
            disabled
            className="w-full border p-2 rounded bg-gray-100 text-gray-500"
          />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="gst"
            value={form.gst}
            onChange={handleChange}
            placeholder="GST Number (optional)"
            className="w-full border p-2 rounded"
          />
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full Address"
            className="w-full border p-2 rounded"
            rows={3}
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className={`bg-green-700 text-white px-6 py-2 rounded transition ${
              saving ? 'opacity-60 cursor-not-allowed' : 'hover:bg-green-800'
            }`}
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
          {msg && <p className="text-sm mt-2 text-blue-600">{msg}</p>}
        </div>
      )}
    </div>
  );
}

export default Profile;
