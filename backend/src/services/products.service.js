const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();

  if (!products) return { status: 'NOT_FOUND', data: {message: 'Products not found'} };

  return {status: 'SUCCESSFUL', data: {products}};
};

const getById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return { status: 'NOT_FOUND', data: {message: 'Product not found'} };

  return {status: 'SUCCESSFUL', data: {product}};
};

module.exports = {
  getAll,
  getById,
};