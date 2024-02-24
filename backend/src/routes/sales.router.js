const router = require('express').Router();
const { salesController } = require('../controllers');
const { validateProductsExistsMiddleware } = require('../middlewares/validation.middlewares');

router.get('/', salesController.getAllSales);

router.post('/', validateProductsExistsMiddleware, salesController.insertSale);

router.get('/:id', salesController.getSaleById);

module.exports = router;