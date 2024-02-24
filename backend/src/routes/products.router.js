const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/', productsController.getAllProducts);

router.post('/', productsController.insertProduct);

router.put('/:id', productsController.updateProduct);

router.get('/:id', productsController.getProductById);

module.exports = router;