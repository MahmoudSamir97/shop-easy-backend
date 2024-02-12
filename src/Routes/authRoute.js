const express = require('express');
const {
  register,
  login,
  forgetPassword,
  resetPassword,
  createNewPassword,
  verifyUser,
  getDashboard,
} = require('../Controllers/authController');
const validate = require('../Middlewares/Valiadate');
const signupSchema = require('../joi Validations/signupSchema');
const verifyRole = require('../Middlewares/verifyRole');
const authenticateToken = require('../Middlewares/authenticateToken');
const authRoutes = express.Router();

authRoutes.post('/signup', validate(signupSchema), register);
authRoutes.post('/signin', login);
authRoutes.post('/forget', forgetPassword);
authRoutes.route('/reset/:token').get(resetPassword).post(createNewPassword);
authRoutes.get('/verify/:token', verifyUser);
authRoutes.get('/admin', authenticateToken, getDashboard);

module.exports = authRoutes;
