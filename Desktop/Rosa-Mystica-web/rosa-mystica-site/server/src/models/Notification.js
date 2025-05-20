import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['order', 'inventory', 'customer', 'system'],
      default: 'system',
    },
    seen: {
      type: Boolean,
      default: false,
    },
    userEmail: {
      type: String, // If null → meant for admin
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
