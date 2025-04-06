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
    imageUrl: 'public/hygiene-category.jpeg',
  },
  {
    name: 'Consumer Electronics',
    description: 'Electronic gadgets and accessories',
    imageUrl: 'public/electronics-category.jpeg',
  },
  {
    name: 'Local for Vocal',
    description: 'Local Products of the town or village',
    imageUrl: 'public/local-category.png',
  },
  {
    name: 'Healthcare',
    description: 'Healthcare products and supplements',
    imageUrl: 'public/local-category.png',
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
          url: 'public/pads.jpeg',
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
          url: 'public/cups.jpeg',
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
          url: 'public/period-panties.jpeg',
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
          url: 'public/period-pain.jpeg',
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
          url: 'public/intimate-wash.jpeg',
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
          url: 'public/hair-removal.jpeg',
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
          url: 'public/mom-care.jpeg',
        },
      ],
    },
  ],
  Healthcare: [
    {
      name: 'Pulse Oxymeter',
      subcategory: 'Diagnostic and monitoring',
      description: 'Accurate pulse oximeter for monitoring oxygen levels',
      price: 799,
      stock: 100,
      images: [
        {
          public_id: 'pulse_oxymeter',
          url: 'public/pulseOxy.jpg',
        },
      ],
    },
    {
      name: 'Thermometers',
      subcategory: 'Diagnostic and monitoring',
      description: 'Digital thermometers for quick and reliable readings',
      price: 249,
      stock: 150,
      images: [
        {
          public_id: 'thermometers',
          url: 'public/thermometer.jpg',
        },
      ],
    },
    {
      name: 'BP Monitors',
      subcategory: 'Diagnostic and monitoring',
      description: 'Electronic blood pressure monitors for home use',
      price: 1299,
      stock: 75,
      images: [
        {
          public_id: 'bp_monitors',
          url: 'public/bpMonitor.jpg',
        },
      ],
    },
    {
      name: 'Glucometer',
      subcategory: 'Diagnostic and monitoring',
      description: 'Easy-to-use glucometers for blood sugar tracking',
      price: 899,
      stock: 80,
      images: [
        {
          public_id: 'glucometer',
          url: 'public/glucometer.jpg',
        },
      ],
    },
    {
      name: 'Portable ECG',
      subcategory: 'Diagnostic and monitoring',
      description: 'Handheld ECG monitor for heart health tracking',
      price: 1999,
      stock: 40,
      images: [
        {
          public_id: 'portable_ecg',
          url: 'public/portableECG.jpg',
        },
      ],
    },
    {
      name: 'Fitness Trackers',
      subcategory: 'Wearable',
      description: 'Track your steps, heart rate and more',
      price: 1499,
      stock: 90,
      images: [
        {
          public_id: 'fitness_trackers',
          url: 'public/fitnesstracker.jpg',
        },
      ],
    },
    {
      name: 'Smart Rings',
      subcategory: 'Wearable',
      description: 'Advanced health tracking smart rings',
      price: 2499,
      stock: 60,
      images: [
        {
          public_id: 'smart_rings',
          url: 'public/smartrings.jpg',
        },
      ],
    },
    // {
    //   name: 'Smart Bands',
    //   subcategory: 'Wearable',
    //   description: 'Wearable smart bands for fitness and health tracking',
    //   price: 999,
    //   stock: 100,
    //   images: [
    //     {
    //       public_id: 'smart_bands',
    //       url: 'public/smart-band.jpeg',
    //     },
    //   ],
    // },
    {
      name: 'Nebulisers',
      subcategory: 'Respiratory care',
      description: 'Effective nebulisers for respiratory therapy',
      price: 1299,
      stock: 70,
      images: [
        {
          public_id: 'nebulisers',
          url: 'public/nebulizers.jpg',
        },
      ],
    },
    {
      name: 'Inhalers',
      subcategory: 'Respiratory care',
      description: 'Quick-relief inhalers for asthma and allergies',
      price: 399,
      stock: 90,
      images: [
        {
          public_id: 'inhalers',
          url: 'public/inhalers.jpg',
        },
      ],
    },
    {
      name: 'Digital Pregnancy Tests',
      subcategory: "Women's Health",
      description: 'Accurate and fast digital pregnancy test kits',
      price: 299,
      stock: 120,
      images: [
        {
          public_id: 'digital_pregnancy_tests',
          url: 'public/pregnancyTests.jpg',
        },
      ],
    },
    {
      name: 'BreastPumps',
      subcategory: "Women's Health",
      description: 'Comfortable and efficient breast pumps for mothers',
      price: 1599,
      stock: 40,
      images: [
        {
          public_id: 'breast_pumps',
          url: 'public/breastpumps.jpg',
        },
      ],
    },
    {
      name: 'TENS Machine',
      subcategory: 'Pain and Muscle relief',
      description: 'TENS machine for natural pain relief and muscle therapy',
      price: 1499,
      stock: 60,
      images: [
        {
          public_id: 'tens_machine',
          url: 'public/TENSmachine.jpg',
        },
      ],
    },
    {
      name: 'Infrared heating pad',
      subcategory: 'Pain and Muscle relief',
      description: 'Infrared heating pad for deep tissue relief',
      price: 999,
      stock: 100,
      images: [
        {
          public_id: 'infrared_heating_pad',
          url: 'public/infraredpads.png',
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
          url: 'public/bluetoothSpeaker.jpg',
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
          url: 'public/wiredspeakers.jpg',
        },
      ],
    },
    // {
    //   name: 'Wireless Speaker',
    //   subcategory: 'Speakers',
    //   description: 'Compact and powerful wireless speaker',
    //   price: 699,
    //   stock: 90,
    //   images: [
    //     {
    //       public_id: 'wireless_speaker',
    //       url: 'https://unsplash.com/photos/W9hcfmLZdyk',
    //     },
    //   ],
    // },
    {
      name: 'Earbuds',
      subcategory: 'Earphones',
      description: 'True wireless earbuds with noise cancellation',
      price: 499,
      stock: 75,
      images: [
        {
          public_id: 'earbuds',
          url: 'public/Earbuds.jpg',
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
          url: 'public/wired.jpg',
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
          url: 'public/neckband.jpg',
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
          url: 'public/headphones.jpg',
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
          url: 'public/10kPowerbank.jpg',
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
          url: 'public/20kMah.jpeg',
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
          url: 'public/solar-pb.jpeg',
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
          url: 'public/ctypeCable.jpg',
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
          url: 'public/adapter.jpg',
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
          url: 'public/basicSW.jpg',
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
          url: 'public/bluetoothcallSW.jpg',
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
