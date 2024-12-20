import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name'],
      maxLength: [30, 'Name cannot exceed 30 characters'],
    },
    lastName: {
      type: String,
      maxLength: [30, 'Name cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: 'Please enter valid email',
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      maxLength: [10, 'Phone number cannot exceed 10 characters'],
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
    avatar: {
      public_id: String,
      url: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationLink: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    firebaseUID: {
      type: String,
      required: [true, 'Please provide a Firebase UID'],
    },
    fcmId: {
      type: String,
    },
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);
export default User;
