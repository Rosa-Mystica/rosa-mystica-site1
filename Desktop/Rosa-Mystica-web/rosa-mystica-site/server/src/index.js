import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Import Routes
import authRoutes from './auth/auth.routes.js';
import productRoutes from './products/products.routes.js';
import orderRoutes from './orders/orders.routes.js';
import userRoutes from './routes/user.routes.js';
import contactRoutes from './routes/contact.routes.js';
import notificationsRoutes from './routes/notification.routes.js';

// Init Express
const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Middleware order matters
app.use(cors());
app.use(express.json()); // 👈 Must come before any route that uses req.body
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

// ✅ Routes
app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/notifications', notificationsRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
