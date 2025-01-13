import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import {
  createOrder,
  getOrderDetails,
  myOrders,
  updatePaymentStatus
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

export default router;
