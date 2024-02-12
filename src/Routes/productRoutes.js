const express = require('express');
const upload = require('../Middlewares/multer');
const validate = require('../Middlewares/Valiadate');
const productSchema = require('../joi Validations/productSchema');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getCategoyProducts,
} = require('../Controllers/productController');
const productRoutes = express.Router();

productRoutes.route('/').get(getAllProducts).post(upload.single('image'), validate(productSchema), createProduct);
productRoutes.route('/:productName').patch(upload.single('image'), updateProduct).delete(deleteProduct);
productRoutes.get('/specefic', getProduct);
productRoutes.get('/category', getCategoyProducts);

module.exports = productRoutes;
