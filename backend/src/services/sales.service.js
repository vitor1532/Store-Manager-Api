const { salesModel } = require('../models');

const findAll = async () => {
  const allSales = await salesModel.findAll();

  if (!allSales) return { status: 'NOT_FOUND', data: { message: 'Sales not found' } };

  return { status: 'SUCCESSFUL', data: allSales };
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
  findAll,
  findById,
};