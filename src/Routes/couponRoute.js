const express = require('express');
const {
  getAllCoupons,
  addCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
} = require('../Controllers/couponController');
const authenticateToken = require('../Middlewares/authenticateToken');
const couponRoutes = express.Router();

couponRoutes.route('/').get(getAllCoupons).post(authenticateToken, addCoupon);
couponRoutes
  .route('/:couponCode')
  .patch(authenticateToken, updateCoupon)
  .delete(authenticateToken, deleteCoupon)
  .post(applyCoupon);
module.exports = couponRoutes;
