import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customOrderId: {
    type: String,
    unique: true,
    default: () => 'RM' + Math.random().toString(36).substring(2, 12).toUpperCase()
  },
  customer: {
    name: String,
    email: String,
    address: String,
    pin: String,
    phone: String,
    gst: String,
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
      productId: String,
    }
  ],
  total: Number,
  status: {
    type: String,
    enum: ['pending', 'shipped', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Order', orderSchema);
