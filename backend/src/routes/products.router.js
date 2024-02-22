const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

module.exports = router;
