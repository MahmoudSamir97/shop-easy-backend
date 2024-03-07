const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./src/Routes/authRoute');
const userRoutes = require('./src/Routes/userRoute');
const categorieRoutes = require('./src/Routes/categoryRoute');
const couponRoutes = require('./src/Routes/couponRoute');
const cartRoutes = require('./src/Routes/cartRoute');
const stripRoutes = require('./src/Routes/strip');
const productRoutes = require('./src/Routes/productRoutes');

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/category', categorieRoutes);
app.use('/coupon', couponRoutes);
app.use('/cart', cartRoutes);
app.use('/strip', stripRoutes);

// ERROR
app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} doesn't exist on server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
