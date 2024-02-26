const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./src/Routes/authRoute');
const userRoutes = require('./src/Routes/userRoute');
const categorieRoutes = require('./src/Routes/categoryRoute');
const couponRoutes = require('./src/Routes/couponRoute');
const cartRoutes = require('./src/Routes/cartRoute');
const stripRoutes = require('./src/Routes/strip');
const productRoutes = require('./src/Routes/productRoutes');

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/category', categorieRoutes);
app.use('/coupon', couponRoutes);
app.use('/cart', cartRoutes);
app.use('/strip', stripRoutes);

module.exports = app;
