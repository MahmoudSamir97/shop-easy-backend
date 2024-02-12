const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  categoryName: String,
  image: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const categoryModel = mongoose.model('categorie', categorySchema);
module.exports = categoryModel;
