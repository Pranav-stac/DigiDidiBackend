import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    validate: {
      validator: function (v) {
        return !v || /\S+@\S+\.\S+/.test(v);
      },
      message: 'Please enter valid email',
    },
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please enter your phone number'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: 'Please enter valid 10-digit phone number'
    }
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'merchant'],
    default: 'user',
  },
  avatar: {
    public_id: String,
    url: String,
  },
  addresses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }],
  defaultAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model('User', userSchema);
