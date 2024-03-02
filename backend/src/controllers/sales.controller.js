const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllSales = async (_req, res, next) => {
  try {
    const { status, data } = await salesService.findAll();

    return res.status(mapStatusHTTP(status)).json(data); 
  } catch (error) {
    return next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, data } = await salesService.findById(id);

    return res.status(mapStatusHTTP(status)).json(data); 
  } catch (error) {
    return next(error);
  }
};

const insertSale = async (req, res, next) => {
  try {
    const { status, data } = await salesService.insert(req.body);
    return res.status(mapStatusHTTP(status)).json(data); 
  } catch (error) {
    return next(error);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, data } = await salesService.remove(id);

    return res.status(mapStatusHTTP(status)).json(data); 
  } catch (error) {
    return next(error);
  }
};

const updateProductQuantity = async (req, res, next) => {
  try {
    const { saleId, productId } = req.params;

    const { status, data } = await salesService.updateProductQuantity(
      saleId,
      productId,
      req.body,
    );

    return res.status(mapStatusHTTP(status)).json(data); 
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  deleteSale,
  updateProductQuantity,
};