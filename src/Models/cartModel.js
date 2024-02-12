const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  totalPrice: Number,
  priceAfterDiscount: Number,
  products: [{ type: mongoose.Types.ObjectId, ref: 'product' }],
  appliedCoupon: String,
});

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel;
