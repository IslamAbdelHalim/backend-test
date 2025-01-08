import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: String,
  price: {
    type: Number,
    required: true,
  },
  quantity: Number,
  createdAt: Date,
  updatedAt: Date,
});

productSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    next();
  } else {
    this.updatedAt = Date.now();
    next();
  }
});

const Product = mongoose.model('Products', productSchema);

export default Product;
