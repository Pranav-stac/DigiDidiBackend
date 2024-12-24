import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter category name'],
      trim: true,
      maxLength: [100, 'Category name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please enter category description'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Please enter category image URL']
    }
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
