import { Router } from 'express';
import { protect, authorizeRoles } from '../middleware/auth.js';
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
} from '../controllers/orderController.js';

const router = Router();

router.post('/', protect, createOrder);
router.get('/:id', protect, getOrderById);
router.put(
  '/:id/status',
  protect,
  authorizeRoles('admin', 'merchant'),
  updateOrderStatus
);

export default router;
