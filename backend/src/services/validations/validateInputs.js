const { 
  addProductSchema,
  addSaleSchema,
  updateProductQuantitySchema,
} = require('./schemas');

const validateNewProduct = (body) => {
  const { error } = addProductSchema.validate(body);

  if (error) {
    const status = error.details.map((err) => (
      err.type === 'string.min' ? 'INVALID_VALUE' : 'BAD_REQUEST'));
    return { status: status[0], message: error.message };
  }
};

const validateNewSale = (sales) => {
  const { error } = addSaleSchema.validate(sales);

  if (error) {
    const status = error.details.map((err) => (
      err.type === 'number.min' ? 'INVALID_VALUE' : 'BAD_REQUEST'));
    const newMessage = error.message.replace(/\[\d+\]\./g, '');
    return { status, message: newMessage };
  }
};

const validateUpdateProductQuantity = (body) => {
  const { error } = updateProductQuantitySchema.validate(body);

  if (error) {
    const status = error.details.map((err) => (
      err.type === 'number.min' ? 'INVALID_VALUE' : 'BAD_REQUEST'));
    return { status: status[0], message: error.message };
  }
};

module.exports = {
  validateNewProduct,
  validateNewSale,
  validateUpdateProductQuantity,
};