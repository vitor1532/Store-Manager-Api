const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();

  if (!products) return { status: 'NOT_FOUND', data: {message: 'Products not found'} };

  return {status: 'SUCCESSFUL', data: {products}};
};

module.exports = {
  getAll,
};