import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  houseNumber: {
    type: String,
    required: [true, 'Please enter house/flat/block number']
  },
  street: {
    type: String,
    required: [true, 'Please enter street/road name']
  },
  landmark: String,
  city: {
    type: String,
    required: [true, 'Please enter city name']
  },
  state: {
    type: String,
    required: [true, 'Please enter state name']
  },
  pincode: {
    type: String,
    required: [true, 'Please enter pincode']
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Address', addressSchema); 