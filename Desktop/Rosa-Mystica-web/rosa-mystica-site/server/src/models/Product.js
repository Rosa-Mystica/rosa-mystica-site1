import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    mrp: {
      type: Number,
      min: [0, 'MRP cannot be negative'],
    },
    images: {
      type: [String], // Array of image URLs
      validate: {
        validator: (val) => val.length > 0,
        message: 'At least one image is required',
      },
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    features: {
      type: [String], // Bullet points (max 5 ideally)
      validate: {
        validator: (arr) => arr.length <= 5,
        message: 'No more than 5 features allowed',
      },
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
