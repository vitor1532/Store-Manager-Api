const { validateNewProduct } = require('../services/validations/validateInputs');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateNameMiddleware = async (req, res, next) => {
  const error = validateNewProduct(req.body);
  if (!error) return next(); 
  return res.status(mapStatusHTTP(error.status)).json({ message: error.message });
};

module.exports = {
  validateNameMiddleware,
};