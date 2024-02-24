const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (_req, res) => {
  const { status, data } = await productsService.findAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const insertProduct = async (req, res) => {
  const { status, data } = await productsService.insert(req.body);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
};