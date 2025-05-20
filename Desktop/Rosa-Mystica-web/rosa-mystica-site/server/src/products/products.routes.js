import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// ✅ GET: All products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

// ✅ POST: Add a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('❌ Product save error:', err);
    res.status(400).json({
      message: 'Error saving product',
      error: err.message,
    });
  }
});

// ✅ GET: Single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
  }
});

// ✅ PUT: Update product by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated)
      return res.status(404).json({ message: 'Product not found' });

    res.json({ message: '✅ Product updated', product: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
});

// ✅ DELETE: Remove product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: 'Product not found' });

    res.json({ message: '🗑️ Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});

export default router;
