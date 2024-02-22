const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (_req, res) => {
  const { status, data } = await productsService.getAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAll,
};