const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  couponCode: String,
  value: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null,
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null,
  },
  expireIn: String,
});

const couponModel = mongoose.model('coupon', couponSchema);
module.exports = couponModel;
