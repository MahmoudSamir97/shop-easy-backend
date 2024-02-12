const express = require('express');
const { updateUser, deactivateUserAccount, changeUserRole } = require('../Controllers/userController');
const authenticateToken = require('../Middlewares/authenticateToken');
const userRoutes = express.Router();
userRoutes.use(authenticateToken);
userRoutes.route('/:userName').patch(updateUser).delete(deactivateUserAccount);
userRoutes.patch('/role/:userName', changeUserRole);

module.exports = userRoutes;
