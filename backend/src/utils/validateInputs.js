const { addProductSchema } = require('./schemas');

const validateNewProduct = ({ name }) => {
  const { error } = addProductSchema.validate({ name });

  if (error) {
    const status = error.details.map((err) => (
      err.type === 'string.min' ? 'INVALID_VALUE' : 'BAD_REQUEST'));
    return { status, message: error.message };
  }
};

module.exports = {
  validateNewProduct,
};