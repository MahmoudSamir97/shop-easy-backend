const express = require('express');
const { createCart, updateCart, applyCoupon } = require('../Controllers/cartController');
const cartRoutes = express.Router();

cartRoutes.route('/').post(createCart).patch(updateCart);
cartRoutes.route('/coupon/:coupon').post(applyCoupon);
module.exports = cartRoutes;
