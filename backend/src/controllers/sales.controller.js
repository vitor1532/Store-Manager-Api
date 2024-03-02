const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllSales = async (_req, res) => {
  const { status, data } = await salesService.findAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const insertSale = async (req, res) => {
  const { status, data } = await salesService.insert(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.remove(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProductQuantity = async (req, res) => {
  const { saleId, productId } = req.params;

  const { status, data } = await salesService.updateProductQuantity(
    saleId,
    productId,
    req.body,
  );

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  deleteSale,
  updateProductQuantity,
};