const joi = require('joi');

const productSchema = joi.object({
  productName: joi.string().min(5).required(),
  priceAfterDiscount: joi.number().required(),
  finalPrice: joi.number().required(),
  image: joi.string(),
  category: joi.string().required(),
  stock: joi.number().required(),
  price: joi.number(),
});

module.exports = productSchema;
