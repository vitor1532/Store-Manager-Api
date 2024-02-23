const router = require('express').Router();
const { productsController } = require('../controllers');
const { validateInputs } = require('../middlewares/index');

router.get('/', productsController.getAllProducts);

router.post('/', validateInputs.validateNameMiddleware, productsController.insertProduct);

router.get('/:id', productsController.getProductById);

module.exports = router;