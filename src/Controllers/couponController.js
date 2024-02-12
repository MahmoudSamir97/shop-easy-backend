const jwt = require('jsonwebtoken');
const couponModel = require('../Models/couponModel');
const productModel = require('../Models/productModel');

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await couponModel.find();
    res.status(200).json({ status: 'success', data: { coupons } });
  } catch (err) {
    res.status(500).json({ status: 'failed', err: err.message });
  }
};

exports.addCoupon = async (req, res) => {
  try {
    const { couponCode, value, expireIn } = req.body;
    const addedCategory = await couponModel.insertMany({
      createdBy: req.userId,
      couponCode,
      value,
      expireIn,
    });
    res.status(200).json({ status: 'success', data: { addedCategory } });
  } catch (err) {
    res.status(500).json({ status: 'failed', err: err.message });
  }
};
exports.updateCoupon = async (req, res) => {
  try {
    const foundedCoupon = await couponModel.findOne({ couponCode: req.params.couponCode });
    if (!foundedCoupon) return res.status(404).json({ status: 'failed', message: 'Coupon not found!' });
    if (foundedCoupon.createdBy != req.userId && req.role != 'admin')
      return res.status(401).json({ status: 'failed', message: 'You are not Authorized' });
    for (const field in req.body) {
      if (req.body.hasOwnProperty(field)) {
        foundedCoupon[field] = req.body[field];
      }
    }
    foundedCoupon.updatedBy = req.userId;
    await foundedCoupon.save();
    res.status(201).json({ status: 'success', data: { updateCoupon } });
  } catch (err) {
    res.status(500).json({ status: 'failed', err: err.message });
  }
};
exports.deleteCoupon = async (req, res) => {
  try {
    const foundedCoupon = await couponModel.findOne({ couponCode: req.params.couponCode });
    if (!foundedCoupon) return res.status(404).json({ status: 'failed', message: 'Coupon not found!' });
    if (foundedCoupon.createdBy != req.userId && req.role != 'admin')
      return res.status(401).json({ status: 'failed', message: 'You are not Authorized!' });
    await couponModel.findOneAndDelete({ couponCode: req.params.couponCode });
    res.status(200).json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ status: 'failed', err: err.message });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const foundedCoupon = await couponModel.findOne({ couponCode: req.params.couponCode });
    if (!foundedCoupon) return res.status(404).json({ status: 'failed', message: 'Coupon not found!' });
    const foundedProduct = await productModel.findOne({ productName: req.body.productName });
    let { _id, value } = foundedCoupon;
    const priceAfterDiscount = foundedProduct.priceAfterDiscount - value * foundedProduct.priceAfterDiscount;
    console.log(priceAfterDiscount);
    await productModel.findOneAndUpdate(
      { productName: req.body.productName },
      { $set: { appliedCoupon: _id, priceAfterDiscount } }
    );
    // foundedProduct.appliedCoupon = couponCode;
    // foundedProduct.priceAfterDiscount = foundedProduct.priceAfterDiscount - value * priceAfterDiscount;

    res.status(201).json({ status: 'success', message: 'Coupon applied successfully' });
  } catch (err) {
    res.status(500).json({ status: 'failed', err: err.message });
  }
};
