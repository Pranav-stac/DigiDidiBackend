import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      productStock,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'No image uploaded.' });
    }

    const merchant = req.user.id;

    const category = await Category.findOne({
      name: { $regex: `^${productCategory}$`, $options: 'i' },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // from upload folders getting file path
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'products',
    });

    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    const product = await Product.create({
      name: productName,
      description: productDescription,
      price: productPrice,
      category: category._id,
      stock: productStock,
      images: [
        {
          public_id: result.public_id,
          url: result.secure_url,
        },
      ],
      merchant,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category')
      .populate('merchant', 'name email');

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if user is merchant and owns the product
    if (
      product.merchant.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product',
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
