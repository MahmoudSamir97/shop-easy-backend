const { default: slugify } = require('slugify');
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../Helper/uploadImage');
const productModel = require('../Models/productModel');
const path = require('path');

exports.getAllProducts = async (req, res) => {
  try {
    console.log('hello');
    // PAGINATION
    let limit = req.query.limit * 1 || 10;
    let page = req.query.page * 1 || 1;
    let skip = (page - 1) * limit;
    const productsCount = await productModel.countDocuments();
    if (skip >= productsCount) throw new Error('Page does not exist');
    const products = await productModel.find().skip(skip).limit(limit);
    res.status(200).json({
      status: 'success',
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      err: err.message,
    });
  }
};
exports.createProduct = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ status: 'failed', message: 'you should upload product picture' });
    // 1- GET THE IMAGE PATH
    const imagePath = path.join(__dirname, `../../Assets/images/${req.file.filename}`);
    // 2-UPLOAD TO CLOUDINARY
    const result = await cloudinaryUploadImage(imagePath);
    const { secure_url } = result;
    const addedProduct = await productModel.insertMany({
      ...req.body,
      image: secure_url,
      slug: slugify(req.body.productName, { replacement: '-', lower: true }),
    });
    res.status(201).json({
      status: 'success',
      data: {
        addedProduct,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      err: err.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await productModel.findOne({ productName: req.body.productName });
    if (!product) return res.status(404).json({ status: 'failed', message: 'Product not exist!' });
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      err: err.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const foundedProduct = await productModel.findOne({ productName: req.params.productName });
    if (!foundedProduct) return res.status(404).json({ status: 'failed', message: 'Product not found!' });
    if (req.file) {
      const imagePath = path.join(__dirname, `../../Assets/images/${req.file.filename}`);
      await cloudinaryRemoveImage(foundedProduct.public_id);
      const result = await cloudinaryUploadImage(imagePath);
      foundedProduct.image = result.secure_url;
      await foundedProduct.save();
    }
    const updatedProduct = await productModel.findOneAndUpdate(
      { productName: req.params.productName },
      { ...req.body, slug: slugify(req.body.productName, { replacement: '-', lower: true }) },
      { new: true }
    );
    res.status(201).json({ status: 'success', data: { updatedProduct } });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      err: err.message,
    });
  }
};
exports.getCategoyProducts = async (req, res) => {
  try {
    const categoryProducts = await productModel.find({ category: req.body.category });
    if (!categoryProducts.length)
      return res.status(404).json({ status: 'failed', message: 'the category you searched for not exist' });
    res.status(200).json({ status: 'success', data: { categoryProducts } });
  } catch (err) {
    res.status(500).json({ status: 'failed', err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const foundedProduct = await productModel.findOne({ productName: req.params.productName });
    if (!foundedProduct) return res.status(404).json({ status: 'failed', message: 'product not found!' });
    await foundedProduct.deleteOne();
    res.status(204).json({ status: 'success' });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      err,
    });
  }
};
