import express from 'express';
import { isAuthenticated, authorizeRoles } from '../middleware/auth.js';
import {
  createOrder,
  getOrderDetails,
  myOrders,
  updatePaymentStatus,
  getAllOrders
} from '../controllers/orderController.js';

const router = express.Router();

// Create new order
router.post('/create', isAuthenticated, createOrder);

// Get order details
router.get('/details/:id', isAuthenticated, getOrderDetails);

// Get logged in user orders
router.get('/my-orders', isAuthenticated, myOrders);

// Update payment status
router.post('/payment/update', isAuthenticated, updatePaymentStatus);

// Get all order - ADMIN
router.get('/', isAuthenticated, authorizeRoles('admin'), getAllOrders);

export default router;
