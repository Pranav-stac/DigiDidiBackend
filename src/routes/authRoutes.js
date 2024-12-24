import express from 'express';
import { isAuthenticated, authorizeRoles } from '../middleware/auth.js';
import {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updateProfile,
  addAddress,
  deleteAddress,
  getUserAddresses,
  verifyPhone,
  checkUserExists,
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/verify-phone', verifyPhone);
router.post('/check-user', checkUserExists);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);

// Protected routes
router.get('/profile', isAuthenticated, getUserProfile);
router.put('/profile', isAuthenticated, updateProfile);
router.post('/address', isAuthenticated, addAddress);
router.delete('/address/:id', isAuthenticated, deleteAddress);
router.get('/addresses', isAuthenticated, getUserAddresses);

export default router; 