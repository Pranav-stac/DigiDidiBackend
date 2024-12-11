const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { createCategory, getAllCategories } = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.post('/', protect, authorizeRoles('admin'), createCategory);

module.exports = router; 