const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getCategoyProducts,
} = require('../Controllers/productController');
const upload = require('../Middlewares/multer');
const productRoutes = express.Router();

productRoutes.route('/').get(getAllProducts).post(upload.single('image'), createProduct);
productRoutes.route('/:productName').patch(upload.single('image'), updateProduct).delete(deleteProduct);
productRoutes.get('/specefic', getProduct);
productRoutes.get('/category', getCategoyProducts);

module.exports = productRoutes;
