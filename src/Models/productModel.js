const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  slug: {
    type: String,
    default: null,
    unique: true,
  },
  priceAfterDiscount: Number,
  finalPrice: Number,
  image: String,
  category: String,
  stock: Number,
  appliedCoupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const productModel = mongoose.model('product', productSchema);
module.exports = productModel;
