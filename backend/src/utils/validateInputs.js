const { addProductSchema } = require('./schemas');

const validateNewProduct = ({ name }) => {
  const { error } = addProductSchema.validate({ name });

  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateNewProduct,
};