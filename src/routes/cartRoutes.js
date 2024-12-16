import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
  addToCart,
  removeFromCart,
  getCart,
} from '../controllers/cartController.js';

const router = Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.delete('/:productId', protect, removeFromCart);

export default router;
