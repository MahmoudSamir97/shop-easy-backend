const jwt = require('jsonwebtoken');
const cartModel = require('../Models/cartModel');

exports.createCart = async (req, res) => {
  try {
    const { token } = req.headers;
    const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    const { priceAfterDiscount, totalPrice, products } = req.body;
    const addedCart = await cartModel.insertMany({
      userId,
      priceAfterDiscount,
      totalPrice,
      products,
    });
    res.status(201).json({ status: 'success', data: { addedCart } });
  } catch (err) {
    res.status(500).json({ status: 'failed', err: err.message });
  }
};
exports.updateCart = async (req, res) => {
  try {
    const { token } = req.headers;
    const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    const foundedCart = await cartModel.findOne({ userId });
    if (!foundedCart) return res.status(404).json({ status: 'failed', message: 'There is no cart for this user!' });
    if (foundedCart.userId != userId && role != 'admin')
      return res.status(401).json({ status: 'failed', message: 'You are not authorized!' });
    for (const field in req.body) {
      foundedCart[field] = req.body[field];
    }
    const updatedCart = await foundedCart.save();
    res.status(200).json({ status: 'success', data: { updatedCart } });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      err: err.message,
    });
  }
};
exports.applyCoupon = async (req, res) => {
  try {
    const { token } = req.headers;
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const cartProducts = await cartModel.find({ userId }).populate('products').lean();
    let result;
    cartProducts.forEach((el) => {
      result = el.products.some((field) => field.appliedCoupon);
    });
    if (result) return res.status(401).json({ status: 'failed', message: 'Coupon already applied' });
    const foundedCart = await cartModel.findOne({ userId });
    foundedCart.appliedCoupon = req.params.coupon;
    foundedCart.save();
    res.status(201).json({
      status: 'success',
      message: 'Coupon applied successfully',
      data: { cartProducts: cartProducts.products },
    });
  } catch (err) {
    res.status(500).json({ status: 'failed', err: err.message });
  }
};
