const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/', productsController.getAllProducts);

router.post('/', productsController.insertProduct);

router.get('/:id', productsController.getProductById);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.removeProduct);

module.exports = router;