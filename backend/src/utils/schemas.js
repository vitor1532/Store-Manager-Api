const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { 
  addProductSchema,
};