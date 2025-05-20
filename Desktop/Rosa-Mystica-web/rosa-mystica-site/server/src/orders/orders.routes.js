import express from 'express';
import Order from '../models/Order.js';
import Notification from '../models/Notification.js';

const router = express.Router();

// POST /api/orders — Create a new order
router.post('/', async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    const customOrderId = 'RM' + Math.random().toString(36).substring(2, 12).toUpperCase();
    const newOrder = new Order({ customer, items, total, customOrderId });
    await newOrder.save();

    // Notify Admin
    await Notification.create({
      type: 'order',
      title: '🛒 New Order Received',
      message: `Order by ${customer.name} for ₹${total}`,
      userType: 'admin'
    });

    res.status(201).json({ message: 'Order saved successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error saving order', error: error.message });
  }
});

// GET /api/orders?email=xyz@example.com — Get all or customer-specific orders
router.get('/', async (req, res) => {
  const { email } = req.query;
  try {
    const query = email ? { 'customer.email': email } : {};
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// GET /api/orders/:id — Get single order by MongoDB _id
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
});

// PATCH /api/orders/:id/cancel — Cancel an order
router.patch('/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });
// PATCH /api/orders/:id/ship — Mark as shipped
router.patch('/:id/ship', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'shipped' },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await Notification.create({
      recipient: order.customer.email,
      type: 'order-shipped',
      message: `✅ Your order (${order.customOrderId}) has been shipped.`,
    });

    res.json({ message: 'Order marked as shipped', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
});

    // Notify Customer
    await Notification.create({
      recipient: order.customer.email,
      type: 'order-cancelled',
      message: `❌ Your order (${order.customOrderId}) was cancelled by admin.`,
      userType: 'customer'
    });

    res.json({ message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel order', error: error.message });
  }
});

export default router;
