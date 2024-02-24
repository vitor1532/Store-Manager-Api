const { addProductSchema } = require('./schemas');

const validateNewProduct = (body) => {
  const { error } = addProductSchema.validate(body);

  if (error) {
    const status = error.details.map((err) => (
      err.type === 'string.min' ? 'INVALID_VALUE' : 'BAD_REQUEST'));
    return { status: status[0], message: error.message };
  }
};

module.exports = {
  validateNewProduct,
};