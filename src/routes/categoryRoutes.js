import express from 'express';
import Category from '../models/categoryModel.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    console.log('Categories found:', categories); // Debug log
    
    const formattedCategories = categories.map(category => ({
      _id: category._id.toString(), // Convert ObjectId to string
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl
    }));
    
    console.log('Formatted categories:', formattedCategories); // Debug log
    
    res.status(200).json({
      success: true,
      categories: formattedCategories
    });
  } catch (error) {
    console.error('Error in GET /categories:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create new category (Admin only)
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      success: true,
      category: {
        _id: category._id.toString(),
        name: category.name,
        description: category.description,
        imageUrl: category.imageUrl
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
