const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const {
  createOrder,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');

router.post('/', protect, createOrder);
router.get('/:id', protect, getOrderById);
router.put(
  '/:id/status',
  protect,
  authorizeRoles('admin', 'merchant'),
  updateOrderStatus
);

module.exports = router; 