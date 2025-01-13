import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  shippingAddress: {
    fullName: String,
    phoneNumber: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String,
    location: {
      type: { type: String, default: 'Point' },
      coordinates: [Number]  // [longitude, latitude]
    }
  },
  paymentInfo: {
    razorpayOrderId: {
      type: String,
      sparse: true
    },
    razorpayPaymentId: {
      type: String,
      sparse: true
    },
    paymentMethod: {
      type: String,
      enum: ['RAZORPAY', 'UPI', 'COD'],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'FAILED'],
      default: 'PENDING'
    }
  },
  orderStatus: {
    type: String,
    enum: ['PLACED', 'CONFIRMED', 'PROCESSING', 'DELIVERED', 'CANCELLED'],
    default: 'PLACED'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for faster lookups
orderSchema.index({ 'paymentInfo.razorpayOrderId': 1 });
orderSchema.index({ user: 1, createdAt: -1 });

// Update timestamp on save
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Order', orderSchema);
