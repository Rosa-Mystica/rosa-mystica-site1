import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const SECRET_KEY = 'rosa_secret_key'; // Ideally use process.env.SECRET_KEY

// ✅ GET /api/users/:email → Fetch user profile (public via token-decoded email)
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Send all fields needed for the form
    const { name, phone, gst, address, email } = user;
    res.json({ name, phone, gst, address, email });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
});


// ✅ PATCH /api/users/update → Update user profile (protected)
router.patch('/update', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or malformed token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { name, phone, gst, address } = req.body;

    // Basic check (optional, can be extended)
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    const updatedFields = {
      name: name.trim(),
      phone: phone.trim(),
      gst: gst?.trim() || '',
      address: address?.trim() || ''
    };

    const updatedUser = await User.findOneAndUpdate(
      { email: decoded.email },
      updatedFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return only safe fields
    const { email } = updatedUser;
    res.json({ name, phone, gst, address, email });

  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

export default router;