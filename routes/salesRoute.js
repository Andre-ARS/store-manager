const express = require('express');
const { salesController } = require('../controllers');

const salesRoute = express.Router();

salesRoute.get('/', salesController.getAllSales);

salesRoute.get('/:id', salesController.getSaleById);

salesRoute.post('/', salesController.addSale);

salesRoute.delete('/:id', salesController.excludeSale);

module.exports = salesRoute;
