const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  addToCart,
  removeFromCart,
  getCart
} = require('../controllers/cartController');

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.delete('/:productId', protect, removeFromCart);

module.exports = router; 