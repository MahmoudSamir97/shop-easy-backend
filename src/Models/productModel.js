const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  productName: String,
  slug: String,
  price: Number,
  priceAfterDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return this.price > val;
      },
      message: 'priceAfterDiscount must be less than price',
    },
  },
  finalPrice: Number,
  image: String,
  category: String,
  stock: String,
});
// PRE VALIDATE HOOK
productSchema.pre('validate', async function (next) {
  this.slug = slugify(this.productName, { lower: true });
  next();
});

const productModel = mongoose.model('product', productSchema);
module.exports = productModel;
