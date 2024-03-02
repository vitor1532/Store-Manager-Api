const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const updateProductQuantitySchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});

const addSaleSchema = Joi.array()
  .min(1)
  .items(
    Joi.object({
      productId: Joi.number().integer().min(1).required(),
      quantity: Joi.number().integer().min(1).required(),
    }),

  );

module.exports = { 
  addProductSchema,
  updateProductQuantitySchema,
  addSaleSchema,
};