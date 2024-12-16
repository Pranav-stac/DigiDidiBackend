import { Router } from 'express';
import { protect, authorizeRoles } from '../middleware/auth.js';
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from '../controllers/productController.js';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/', getAllProducts);
router.post(
  '/',
  protect,
  authorizeRoles('merchant', 'admin'),
  upload.array('images', 5),
  createProduct
);
router.put('/:id', protect, authorizeRoles('merchant', 'admin'), updateProduct);

export default router;
