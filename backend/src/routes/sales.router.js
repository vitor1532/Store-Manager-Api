const router = require('express').Router();
const { salesController } = require('../controllers');

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

module.exports = router;