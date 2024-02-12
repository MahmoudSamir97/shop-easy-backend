const jwt = require('jsonwebtoken');
const path = require('path');
const categoryModel = require('../Models/categoryModel');
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../Helper/uploadImage');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({ status: 'success', data: { categories } });
  } catch (err) {
    res.status(500).json({ status: 'failed', err });
  }
};
exports.addCategory = async (req, res) => {
  try {
    const imagePath = path.join(__dirname, `../../Assets/images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);
    const addedCategory = await categoryModel.insertMany({
      createdBy: req.userId,
      categoryName: req.body.categoryName,
      image: [result.secure_url, result.public_id],
    });
    res.status(200).json({ status: 'success', data: { addedCategory } });
  } catch (err) {
    res.status(500).json({ status: 'failed', err: err.message });
  }
};
exports.updateCategrie = async (req, res) => {
  try {
    const foundedCategorie = await categoryModel.findOne({ categoryName: req.params.categoryName });
    if (!foundedCategorie) return res.status(404).json({ status: 'failed', message: 'Categorie not found!' });
    if (foundedCategorie.createdBy != req.userId && req.role != 'admin')
      return res.status(401).json({ status: 'failed', message: 'You are not Allowed' });
    if (req.file) {
      const imagePath = path.join(__dirname, `../../Assets/images/${req.file.filename}`);
      await cloudinaryRemoveImage(foundedCategorie.image);
      const result = await cloudinaryUploadImage(imagePath);
      foundedCategorie.image = [result.secure_url, result.public_id];
      await foundedCategorie.save();
    }
    const updatedCategorie = await categoryModel.findOneAndUpdate({ categoryName: req.params.categoryName }, req.body, {
      new: true,
    });
    res.status(201).json({ status: 'success', data: { updatedCategorie } });
  } catch (err) {
    res.status(500).json({ status: 'failed', err: err.message });
  }
};
exports.getCategorie = async (req, res) => {
  try {
    const foundedCategorie = await categoryModel.findOne({ categoryName: req.params.categoryName });
    if (!foundedCategorie) return res.status(404).json({ status: 'failed', message: 'foundedCategorie not exist!' });
    res.status(200).json({
      status: 'success',
      data: {
        foundedCategorie,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'failed', err });
  }
};
exports.deleteCategorie = async (req, res) => {
  try {
    const foundedCategorie = await categoryModel.findOne({ categoryName: req.body.categoryName });
    if (!foundedCategorie) return res.status(404).json({ status: 'failed', message: 'Categorie not found!' });
    if (foundedCategorie.createdBy != req.userId && req.role != 'admin')
      return res.status(401).json({ status: 'failed', message: 'You are not Allowed' });
    await categoryModel.findOneAndDelete({ categoryName: req.body.categoryName });
    res.status(200).json({ status: 'success', message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: 'failed', err: err.message });
  }
};
