const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/', productsController.getAll);

module.exports = router;
