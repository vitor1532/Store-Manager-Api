const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (_req, res, next) => {
  try {
    const { status, data } = await productsService.findAll();

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, data } = await productsService.findById(id);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return next(error);
  }
};

const insertProduct = async (req, res, next) => {
  try {
    const { status, data } = await productsService.insert(req.body);

    return res.status(mapStatusHTTP(status)).json(data); 
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const { status, data } = await productsService.update(body, id);
    return res.status(mapStatusHTTP(status)).json(data); 
  } catch (error) {
    return next(error);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { status, data } = await productsService.remove(id);

    return res.status(mapStatusHTTP(status)).json(data); 
  } catch (error) {
    return next(error);
  }
};

const getProductByName = async (req, res, next) => {
  try {
    const { q } = req.query;
    const { status, data } = await productsService.findByName(q);

    return res.status(mapStatusHTTP(status)).json(data); 
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  removeProduct,
  getProductByName,
};