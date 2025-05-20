// server/src/notifications/notifications.routes.js
import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();

// GET all notifications (admin view)
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

// GET notifications by user email
router.get('/:email', async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.params.email }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

export default router;
