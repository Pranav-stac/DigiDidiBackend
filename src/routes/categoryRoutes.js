import express from 'express';
import Category from '../models/categoryModel.js';
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js';
import { upload } from '../utils/fileUpload.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    console.log('Categories found:', categories); // Debug log

    const formattedCategories = categories.map((category) => ({
      _id: category._id.toString(), // Convert ObjectId to string
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
    }));

    console.log('Formatted categories:', formattedCategories); // Debug log

    res.status(200).json({
      success: true,
      categories: formattedCategories,
    });
  } catch (error) {
    console.error('Error in GET /categories:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create new category (Admin only)
router.post(
  '/',
  isAuthenticated,
  authorizeRoles('admin'),
  upload.single('categoryImage'),
  async (req, res) => {
    try {
      const { categoryName, categoryDescription } = req.body;

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: 'No image uploaded.' });
      }

      const filePath = req.file.path;

      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'categories',
      });

      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });

      const category = await Category.create({
        name: categoryName,
        description: categoryDescription,
        imageUrl: result.secure_url,
      });

      res.status(201).json({
        success: true,
        category: {
          name: category.name,
          description: category.description,
          imageUrl: category.imageUrl,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

export default router;
