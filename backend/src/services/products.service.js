const { productsModel } = require('../models');
const { validateNewProduct } = require('./validations/validateInputs');

const findAll = async () => {
  const products = await productsModel.findAll();

  if (!products) return { status: 'NOT_FOUND', data: { message: 'Products not found' } };

  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  return { status: 'SUCCESSFUL', data: product };
};

const insert = async (body) => {
  const error = validateNewProduct(body);
  if (error) {
    const { status, message } = error;
    
    return { status, data: { message } }; 
  }
  const { name } = body;
  const productExists = await productsModel.findByName(name); 
  if (productExists) return { status: 'CONFLICT', data: { message: 'Product already exists' } };

  const insertId = await productsModel.insert(name);

  const product = await productsModel.findById(insertId);

  return { status: 'CREATED', data: product };
};

module.exports = {
  findAll,
  findById,
  insert,
};