const router = require('express').Router();
const { salesController } = require('../controllers');

router.get('/', salesController.getAllSales);

router.post('/', salesController.insertSale);

router.get('/:id', salesController.getSaleById);

module.exports = router;