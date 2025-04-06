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
    imageUrl: 'public/uploads/hygiene-category.jpeg',
  },
  {
    name: 'Consumer Electronics',
    description: 'Electronic gadgets and accessories',
    imageUrl: 'public/uploads/electronics-category.jpeg',
  },
  {
    name: 'Local for Vocal',
    description: 'Local Products of the town or village',
    imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f',
  },
];

const products = {
  Hygiene: [
    {
      name: 'Sanitary Pads',
      subcategory: 'Feminine Hygiene',
      description: 'Soft and absorbent sanitary pads for all-day comfort',
      price: 100,
      stock: 200,
      images: [
        {
          public_id: 'hygiene_sanitary_pads',
          url: 'public/uploads/pads.jpeg',
        },
      ],
    },
    {
      name: 'Tampons & Menstrual Cup',
      subcategory: 'Feminine Hygiene',
      description: 'Eco-friendly menstrual cups and tampons for safe usage',
      price: 150,
      stock: 150,
      images: [
        {
          public_id: 'hygiene_tampons_cup',
          url: 'public/uploads/cups.jpeg',
        },
      ],
    },
    {
      name: 'Period Panties',
      subcategory: 'Feminine Hygiene',
      description: 'Comfortable period panties for leak protection',
      price: 120,
      stock: 180,
      images: [
        {
          public_id: 'hygiene_period_panties',
          url: 'public/uploads/period-panties.jpeg',
        },
      ],
    },
    {
      name: 'Period Pain Relief',
      subcategory: 'Health Care',
      description: 'Effective relief solutions for period pain',
      price: 99,
      stock: 100,
      images: [
        {
          public_id: 'hygiene_period_pain_relief',
          url: 'public/uploads/period-pain.jpeg',
        },
      ],
    },
    {
      name: 'Intimate wash & care',
      subcategory: 'Feminine Hygiene',
      description: 'Gentle care products for intimate hygiene',
      price: 199,
      stock: 120,
      images: [
        {
          public_id: 'hygiene_intimate_wash',
          url: 'public/uploads/intimate-wash.jpeg',
        },
      ],
    },
    {
      name: 'Hair Removal',
      subcategory: 'Personal Grooming',
      description: 'Hair removal products for smooth skin',
      price: 199,
      stock: 140,
      images: [
        {
          public_id: 'hygiene_hair_removal',
          url: 'public/uploads/hair-removal.jpeg',
        },
      ],
    },
    {
      name: 'Mom care',
      subcategory: 'Maternal Care',
      description: 'Specialized products for moms',
      price: 0,
      stock: 100,
      images: [
        {
          public_id: 'hygiene_mom_care',
          url: 'public/uploads/mom-care.jpeg',
        },
      ],
    },
  ],
  'Consumer Electronics': [
    {
      name: 'Bluetooth Speaker',
      subcategory: 'Speakers',
      description: 'Portable Bluetooth speaker with high-quality sound',
      price: 999,
      stock: 100,
      images: [
        {
          public_id: 'bluetooth_speaker',
          url: 'https://unsplash.com/photos/hpTH5b6mo2s',
        },
      ],
    },
    {
      name: 'Wired Speaker',
      subcategory: 'Speakers',
      description: 'High-quality wired speakers for home entertainment',
      price: 499,
      stock: 80,
      images: [
        {
          public_id: 'wired_speaker',
          url: 'https://unsplash.com/photos/nBuiLbz_j4A',
        },
      ],
    },
    {
      name: 'Wireless Speaker',
      subcategory: 'Speakers',
      description: 'Compact and powerful wireless speaker',
      price: 699,
      stock: 90,
      images: [
        {
          public_id: 'wireless_speaker',
          url: 'https://unsplash.com/photos/W9hcfmLZdyk',
        },
      ],
    },
    {
      name: 'Earbuds',
      subcategory: 'Earphones',
      description: 'True wireless earbuds with noise cancellation',
      price: 499,
      stock: 75,
      images: [
        {
          public_id: 'earbuds',
          url: 'https://unsplash.com/photos/Me9ySk1hxEw',
        },
      ],
    },
    {
      name: 'Wired Earphones',
      subcategory: 'Earphones',
      description: 'Comfortable wired earphones with clear sound',
      price: 149,
      stock: 150,
      images: [
        {
          public_id: 'wired_earphones',
          url: 'https://unsplash.com/photos/JRjE2W6m8Uo',
        },
      ],
    },
    {
      name: 'Neckband Earphones',
      subcategory: 'Earphones',
      description: 'Stylish neckband with deep bass',
      price: 299,
      stock: 120,
      images: [
        {
          public_id: 'neckband_earphones',
          url: 'https://unsplash.com/photos/EXPr9yckGYE',
        },
      ],
    },
    {
      name: 'Headphones',
      subcategory: 'Headphones',
      description: 'Over-ear headphones with immersive sound',
      price: 1399,
      stock: 60,
      images: [
        {
          public_id: 'headphones',
          url: 'https://unsplash.com/photos/R4rMy7SOrZU',
        },
      ],
    },
    {
      name: 'Power Bank 10k mAh',
      subcategory: 'Power Bank',
      description: 'Compact and fast-charging 10000mAh power bank',
      price: 599,
      stock: 120,
      images: [
        {
          public_id: 'power_bank_10k',
          url: 'https://unsplash.com/photos/ZXkxAysjAUc',
        },
      ],
    },
    {
      name: 'Power Bank 20k mAh',
      subcategory: 'Power Bank',
      description: 'High-capacity 20000mAh power bank',
      price: 1199,
      stock: 90,
      images: [
        {
          public_id: 'power_bank_20k',
          url: 'https://unsplash.com/photos/NLsh70wZ-mY',
        },
      ],
    },
    {
      name: 'Solar Power Bank',
      subcategory: 'Power Bank',
      description: 'Eco-friendly solar-powered power bank',
      price: 1999,
      stock: 50,
      images: [
        {
          public_id: 'solar_power_bank',
          url: 'https://unsplash.com/photos/UpF2ouaE4n8',
        },
      ],
    },
    {
      name: 'Charging Cables',
      subcategory: 'Charger',
      description: 'Durable and fast-charging USB-C cable',
      price: 199,
      stock: 300,
      images: [
        {
          public_id: 'charging_cable',
          url: 'https://unsplash.com/photos/zPK_Amvhnr0',
        },
      ],
    },
    {
      name: 'Adaptors',
      subcategory: 'Charger',
      description: 'Reliable charging adaptors for multiple devices',
      price: 199,
      stock: 250,
      images: [
        {
          public_id: 'adaptors',
          url: 'https://unsplash.com/photos/kJj5UIc1t4I',
        },
      ],
    },
    {
      name: 'Smart Watch Basic',
      subcategory: 'Smart Watch',
      description: 'Entry-level smartwatch with essential features',
      price: 999,
      stock: 80,
      images: [
        {
          public_id: 'smart_watch_basic',
          url: 'https://unsplash.com/photos/CBotbUogXDA',
        },
      ],
    },
    {
      name: 'Smart Watch Bluetooth Calling',
      subcategory: 'Smart Watch',
      description: 'Advanced smartwatch with Bluetooth calling feature',
      price: 1499,
      stock: 50,
      images: [
        {
          public_id: 'smart_watch_bluetooth',
          url: 'https://unsplash.com/photos/mXG9jGZlX2g',
        },
      ],
    },
  ],
};

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    let merchant = await User.findOne({ role: 'merchant' });
    if (!merchant) {
      merchant = await User.create({
        name: 'Demo Merchant',
        phoneNumber: '9999999999',
        role: 'merchant',
      });
    }

    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing categories and products');

    const createdCategories = await Category.insertMany(categories);
    console.log('Added categories');

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
