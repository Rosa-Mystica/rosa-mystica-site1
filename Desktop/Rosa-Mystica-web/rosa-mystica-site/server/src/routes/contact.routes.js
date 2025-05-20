// server/src/routes/contact.routes.js (or wherever you're defining it)
import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Message received!' });
  } catch (err) {
    console.error('❌ Contact save error:', err);
    res.status(500).json({ message: 'Failed to save message', error: err.message });
  }
});

export default router;
