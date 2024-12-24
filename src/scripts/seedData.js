import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

dotenv.config();

const categories = [
  {
    name: 'Belocal',
    description: 'Local artisanal products and handicrafts',
    image: {
      public_id: 'belocal_category',
      url: 'https://images.unsplash.com/photo-1610851252127-85442ca5528e'
    }
  },
  {
    name: 'Hygiene',
    description: 'Personal care and hygiene products',
    image: {
      public_id: 'hygiene_category',
      url: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f'
    }
  },
  {
    name: 'Healthcare',
    description: 'Health and wellness products',
    image: {
      public_id: 'healthcare_category',
      url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528'
    }
  },
  {
    name: 'Agritech',
    description: 'Agricultural and farming products',
    image: {
      public_id: 'agritech_category',
      url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9'
    }
  },
  {
    name: 'Appliances',
    description: 'Home and kitchen appliances',
    image: {
      public_id: 'appliances_category',
      url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba'
    }
  }
];

const products = {
  Belocal: [
    {
      name: 'Handwoven Cotton Saree',
      description: 'Traditional handloom saree made by local artisans using pure cotton',
      price: 1499,
      stock: 50,
      images: [{
        public_id: 'belocal_saree',
        url: 'https://images.unsplash.com/photo-1610108702264-6c1b2f948c0d'
      }]
    },
    {
      name: 'Bamboo Craft Basket',
      description: 'Eco-friendly storage basket handcrafted from sustainable bamboo',
      price: 599,
      stock: 30,
      images: [{
        public_id: 'belocal_basket',
        url: 'https://images.unsplash.com/photo-1587131782738-de30ea91a542'
      }]
    },
    {
      name: 'Clay Water Pot',
      description: 'Traditional clay pot for storing water, keeps water naturally cool',
      price: 299,
      stock: 100,
      images: [{
        public_id: 'belocal_pot',
        url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61'
      }]
    },
    {
      name: 'Jute Shopping Bag',
      description: 'Eco-friendly shopping bag made from natural jute fiber',
      price: 199,
      stock: 200,
      images: [{
        public_id: 'belocal_bag',
        url: 'https://images.unsplash.com/photo-1591373032196-95f69f0c161f'
      }]
    },
    {
      name: 'Brass Diya Set',
      description: 'Set of 5 traditional brass diyas handcrafted by local artisans',
      price: 799,
      stock: 75,
      images: [{
        public_id: 'belocal_diya',
        url: 'https://images.unsplash.com/photo-1604423043492-41303788de80'
      }]
    }
  ],
  Hygiene: [
    {
      name: 'Natural Neem Soap',
      description: 'Handmade soap with natural neem extract for skin care',
      price: 99,
      stock: 150,
      images: [{
        public_id: 'hygiene_soap',
        url: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec'
      }]
    },
    {
      name: 'Bamboo Toothbrush Set',
      description: 'Eco-friendly bamboo toothbrushes, pack of 4',
      price: 299,
      stock: 100,
      images: [{
        public_id: 'hygiene_toothbrush',
        url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04'
      }]
    },
    {
      name: 'Organic Hand Sanitizer',
      description: 'Natural hand sanitizer with aloe vera, 100ml',
      price: 149,
      stock: 200,
      images: [{
        public_id: 'hygiene_sanitizer',
        url: 'https://images.unsplash.com/photo-1584483720412-ce931f4aefa8'
      }]
    },
    {
      name: 'Cotton Face Masks',
      description: 'Reusable cotton face masks, pack of 5',
      price: 249,
      stock: 300,
      images: [{
        public_id: 'hygiene_masks',
        url: 'https://images.unsplash.com/photo-1586942593568-29361efcd571'
      }]
    },
    {
      name: 'Natural Loofah',
      description: 'Natural bath loofah made from organic materials',
      price: 79,
      stock: 150,
      images: [{
        public_id: 'hygiene_loofah',
        url: 'https://images.unsplash.com/photo-1583503824339-91b776425b5e'
      }]
    }
  ],
  Healthcare: [
    {
      name: 'Ayurvedic Immunity Booster',
      description: 'Natural immunity booster with tulsi and giloy, 60 tablets',
      price: 399,
      stock: 100,
      images: [{
        public_id: 'healthcare_immunity',
        url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843'
      }]
    },
    {
      name: 'Digital Thermometer',
      description: 'Quick reading digital thermometer with LCD display',
      price: 199,
      stock: 150,
      images: [{
        public_id: 'healthcare_thermometer',
        url: 'https://images.unsplash.com/photo-1584483775357-6c8489e78445'
      }]
    },
    {
      name: 'First Aid Kit',
      description: 'Complete first aid kit for home use',
      price: 599,
      stock: 75,
      images: [{
        public_id: 'healthcare_firstaid',
        url: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde'
      }]
    },
    {
      name: 'BP Monitor',
      description: 'Digital blood pressure monitor for home use',
      price: 1499,
      stock: 50,
      images: [{
        public_id: 'healthcare_bp',
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef'
      }]
    },
    {
      name: 'Herbal Pain Relief Oil',
      description: 'Natural pain relief oil with wintergreen, 100ml',
      price: 249,
      stock: 100,
      images: [{
        public_id: 'healthcare_oil',
        url: 'https://images.unsplash.com/photo-1559830772-73d4e4a0170b'
      }]
    }
  ],
  Agritech: [
    {
      name: 'Organic Fertilizer',
      description: 'Natural organic fertilizer for plants, 5kg',
      price: 399,
      stock: 200,
      images: [{
        public_id: 'agritech_fertilizer',
        url: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d'
      }]
    },
    {
      name: 'Garden Tool Set',
      description: 'Complete set of basic gardening tools',
      price: 899,
      stock: 50,
      images: [{
        public_id: 'agritech_tools',
        url: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af'
      }]
    },
    {
      name: 'Seed Starter Kit',
      description: 'Kit includes pots, soil, and variety of vegetable seeds',
      price: 499,
      stock: 75,
      images: [{
        public_id: 'agritech_seeds',
        url: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d'
      }]
    },
    {
      name: 'Drip Irrigation Kit',
      description: 'Basic drip irrigation system for home garden',
      price: 1299,
      stock: 30,
      images: [{
        public_id: 'agritech_irrigation',
        url: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0'
      }]
    },
    {
      name: 'Plant Protection Net',
      description: 'Mesh net for protecting plants from birds and insects',
      price: 299,
      stock: 100,
      images: [{
        public_id: 'agritech_net',
        url: 'https://images.unsplash.com/photo-1624398907567-6b1c0d0dc22c'
      }]
    }
  ],
  Appliances: [
    {
      name: 'Solar Lantern',
      description: 'Rechargeable solar LED lantern for outdoor use',
      price: 799,
      stock: 100,
      images: [{
        public_id: 'appliances_lantern',
        url: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be'
      }]
    },
    {
      name: 'Manual Food Processor',
      description: 'Hand-operated food processor for chopping vegetables',
      price: 599,
      stock: 75,
      images: [{
        public_id: 'appliances_processor',
        url: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41'
      }]
    },
    {
      name: 'Water Filter',
      description: 'Gravity-based water filter with ceramic candles',
      price: 1499,
      stock: 50,
      images: [{
        public_id: 'appliances_filter',
        url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80'
      }]
    },
    {
      name: 'Roti Maker',
      description: 'Manual roti/chapati maker for perfect rotis',
      price: 899,
      stock: 60,
      images: [{
        public_id: 'appliances_roti',
        url: 'https://images.unsplash.com/photo-1619846227717-205b9dccac17'
      }]
    },
    {
      name: 'Pressure Cooker',
      description: '5L stainless steel pressure cooker',
      price: 1299,
      stock: 40,
      images: [{
        public_id: 'appliances_cooker',
        url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7'
      }]
    }
  ]
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
        role: 'merchant'
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
      const categoryProducts = products[category.name].map(product => ({
        ...product,
        category: category._id,
        merchant: merchant._id
      }));
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