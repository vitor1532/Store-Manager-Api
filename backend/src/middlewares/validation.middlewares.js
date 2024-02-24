const { productsModel } = require('../models');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateInputNewSale = async (sales, next) => {
  const error = [];
  const promises = sales.map(async (sale) => {
    const productExists = sale.productId ? await productsModel.findById(sale.productId) : next();
    if (!productExists) {
      error.push({ 
        status: 'NOT_FOUND', data: { message: 'Product not found' } }); 
    }
  });

  await Promise.all(promises);

  return error;
};

const validateProductsExistsMiddleware = async (req, res, next) => {
  try {
    const sales = req.body;

    const error = await validateInputNewSale(sales, next);

    if (error.length > 0) return res.status(mapStatusHTTP(error[0].status)).json(error[0].data);
    next();
  } catch (err) {
    console.log(err);
  } 
};

module.exports = {
  validateProductsExistsMiddleware,
};