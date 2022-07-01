const express = require('express');
const { salesController } = require('../controllers');

const salesRoute = express.Router();

salesRoute.get('/', salesController.getAllSales);

salesRoute.post('/', salesController.addSale);

module.exports = salesRoute;
