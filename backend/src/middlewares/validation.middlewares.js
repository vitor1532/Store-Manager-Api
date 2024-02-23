const { validateNewProduct } = require('../utils/validateInputs');

const validateNameMiddleware = async (req, res, next) => {
  const error = validateNewProduct(req.body);
  // next();
  if (!error) return next(); 
  return res.status(error.status).json({ message: error.message });
};

module.exports = {
  validateNameMiddleware,
};