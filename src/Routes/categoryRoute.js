const express = require('express');
const {
  getAllCategories,
  addCategory,
  updateCategrie,
  deleteCategorie,
  getCategorie,
} = require('../Controllers/categoryController');
const upload = require('../Middlewares/multer');
const authenticateToken = require('../Middlewares/authenticateToken');
const categorieRoutes = express.Router();

categorieRoutes
  .route('/')
  .get(getAllCategories)
  .post(upload.single('image'), authenticateToken, addCategory)
  .delete(authenticateToken, deleteCategorie);
categorieRoutes
  .route('/:categoryName')
  .get(getCategorie)
  .patch(authenticateToken, upload.single('image'), updateCategrie);

module.exports = categorieRoutes;
