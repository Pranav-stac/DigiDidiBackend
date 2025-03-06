import User from '../models/userModel.js';
import Address from '../models/addressModel.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Verify Phone and Create/Login User
export const verifyPhone = async (req, res) => {
  try {
    const { phoneNumber, name } = req.body;

    let user = await User.findOne({ phoneNumber });

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        phoneNumber,
        name: name || `User${phoneNumber.slice(-4)}`,
        isPhoneVerified: true,
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Check if user exists
export const checkUserExists = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const exists = await User.exists({ phoneNumber });

    res.json({
      success: true,
      exists: !!exists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    const user = await User.create({
      name,
      phoneNumber,
      isPhoneVerified: true,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout user
export const logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('addresses');
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { ...req.body },
      { new: true, runValidators: true }
    ).populate('addresses');

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add address
export const addAddress = async (req, res) => {
  try {
    const address = await Address.create({
      ...req.body,
      user: req.user._id,
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { addresses: address._id } },
      { new: true }
    ).populate('addresses');

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete address
export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    await address.remove();

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { addresses: req.params.id } },
      { new: true }
    ).populate('addresses');

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user addresses
export const getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.json({
      success: true,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsersProfile = async (req, res) => {
  try {
    const users = await User.find().populate('addresses');
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
