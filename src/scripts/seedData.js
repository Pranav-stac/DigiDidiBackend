import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

dotenv.config();

const categories = [
  {
    name: 'Hygiene',
    description: 'Personal care and hygiene products',
    imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f',
  },
  {
    name: 'Consumer Electronics',
    description: 'Electronic gadgets and accessories',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
  },
];

const products = {
  Hygiene: [
    {
      name: 'Sanitary Pads',
      subcategory: 'Feminine Hygiene',
      description: 'Soft and absorbent sanitary pads for all-day comfort',
      price: 299,
      stock: 200,
      images: [
        {
          public_id: 'hygiene_sanitary_pads',
          url: 'https://images.unsplash.com/photo-1612531018390-1b09730e64a2',
        },
      ],
    },
    {
      name: 'Tampons & Menstrual Cup',
      subcategory: 'Feminine Hygiene',
      description: 'Eco-friendly menstrual cups and tampons for safe usage',
      price: 499,
      stock: 150,
      images: [
        {
          public_id: 'hygiene_tampons_cup',
          url: 'https://images.unsplash.com/photo-1575300806211-12b16eb37d4b',
        },
      ],
    },
  ],
  'Consumer Electronics': [
    {
      name: 'Bluetooth Speaker',
      subcategory: 'Speakers',
      description: 'Portable Bluetooth speaker with high-quality sound',
      price: 1599,
      stock: 100,
      images: [
        {
          public_id: 'electronics_bluetooth_speaker',
          url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a3',
        },
      ],
    },
    {
      name: 'Wireless Earbuds',
      subcategory: 'Earphones',
      description: 'True wireless earbuds with noise cancellation',
      price: 2499,
      stock: 75,
      images: [
        {
          public_id: 'electronics_wireless_earbuds',
          url: 'https://images.unsplash.com/photo-1586078130702-d208859b6226',
        },
      ],
    },
    {
      name: 'Power Bank 10k mAh',
      subcategory: 'Power Bank',
      description: 'Compact and fast-charging 10000mAh power bank',
      price: 1299,
      stock: 120,
      images: [
        {
          public_id: 'electronics_powerbank_10k',
          url: 'https://images.unsplash.com/photo-1548092372-0d1bd40894a3',
        },
      ],
    },
    {
      name: 'Charging Cable',
      subcategory: 'Charger',
      description: 'Durable and fast-charging USB-C cable',
      price: 499,
      stock: 300,
      images: [
        {
          public_id: 'electronics_charging_cable',
          url: 'https://images.unsplash.com/photo-1565061821100-5fe5e0c27c9b',
        },
      ],
    },
    {
      name: 'Smart Watch Bluetooth Calling',
      subcategory: 'Smart Watch',
      description: 'Advanced smartwatch with Bluetooth calling feature',
      price: 3999,
      stock: 50,
      images: [
        {
          public_id: 'electronics_smart_watch',
          url: 'https://images.unsplash.com/photo-1514481538271-cf9f993a2ba5',
        },
      ],
    },
  ],
};

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Create a dummy merchant user if not exists
    let merchant = await User.findOne({ role: 'merchant' });
    if (!merchant) {
      merchant = await User.create({
        name: 'Demo Merchant',
        phoneNumber: '9999999999',
        role: 'merchant',
      });
    }

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing categories and products');

    // Add categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Added categories');

    // Add products for each category
    for (const category of createdCategories) {
      const categoryProducts =
        products[category.name]?.map((product) => ({
          ...product,
          category: category._id,
          merchant: merchant._id,
        })) || [];
      await Product.insertMany(categoryProducts);
    }
    console.log('Added products');

    console.log('Data seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
