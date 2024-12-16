import Category from '../models/categoryModel.js';

export const createCategory = async (req, res) => {
  try {
    console.log('Creating category:', req.body);
    const category = await Category.create(req.body);
    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error('Category creation error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
