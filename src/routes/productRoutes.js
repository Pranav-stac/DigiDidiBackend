import express from 'express';
import Product from '../models/productModel.js';
import { isAuthenticated, authorizeRoles } from '../middleware/auth.js';
import { createProduct } from '../controllers/productController.js';
import { upload } from '../utils/fileUpload.js';

const router = express.Router();

// Get all products or products by category
router.get('/', async (req, res) => {
  console.log('GET /products - Fetching products');
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    console.log('Query:', query);

    const products = await Product.find(query)
      .populate('category', 'name')
      .populate('merchant', 'name');

    console.log(`Found ${products.length} products`);
    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post(
  '/',
  isAuthenticated,
  authorizeRoles('admin'),
  upload.single('productImage'),
  createProduct
);

export default router;
