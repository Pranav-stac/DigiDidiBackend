const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { 
  createProduct, 
  getAllProducts, 
  updateProduct 
} = require('../controllers/productController');
const upload = require('../middleware/upload');

router.get('/', getAllProducts);
router.post(
  '/', 
  protect, 
  authorizeRoles('merchant', 'admin'), 
  upload.array('images', 5), 
  createProduct
);
router.put(
  '/:id', 
  protect, 
  authorizeRoles('merchant', 'admin'), 
  updateProduct
);

module.exports = router; 