const { salesModel } = require('../models');
const { validateNewSale } = require('./validations/validateInputs');

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

module.exports = {
  findAll,
  findById,
  insert,
  remove,
};