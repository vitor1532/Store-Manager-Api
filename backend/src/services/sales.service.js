const { salesModel } = require('../models');
const { validateNewSale, validateUpdateProductQuantity } = require('./validations/validateInputs');

const findAll = async () => {
  const allSales = await salesModel.findAll();

  if (!allSales) return { status: 'NOT_FOUND', data: { message: 'Sales not found' } };

  return { status: 'SUCCESSFUL', data: allSales };
};

const findById = async (id) => {
  const sales = await salesModel.findById(id);

  if (!sales || sales.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'SUCCESSFUL', data: sales };
};

const insert = async (sales) => {
  try {
    const error = validateNewSale(sales);
    if (error) {
      const { status, message } = error;
      
      return { status, data: { message } }; 
    }
    const insertId = await salesModel.insert(sales);
    const newSale = await salesModel.findFormattedSalesById(insertId);

    return { status: 'CREATED', data: newSale };
  } catch (err) {
    console.log(err);
  }
};

const remove = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  await salesModel.remove(id);

  return { status: 'NO_CONTENT', data: { message: 'Sale removed' } };
};

const updateProductQuantity = async (saleId, productId, body) => {
  const error = validateUpdateProductQuantity(body);

  if (error) {
    const { status, message } = error;    
    return { status, data: { message } }; 
  }

  const sale = await salesModel.findById(saleId);
  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  const isProductInSale = sale.find((product) => product.productId === Number(productId));
  if (!isProductInSale) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
  }

  const updatedSale = await salesModel.updateProductQuantity(saleId, productId, body);

  const updatedProductSale = updatedSale.find((product) => product.productId === Number(productId));

  return { status: 'SUCCESSFUL', data: { ...updatedProductSale, saleId: Number(saleId) } };
};

module.exports = {
  findAll,
  findById,
  insert,
  remove,
  updateProductQuantity,
};