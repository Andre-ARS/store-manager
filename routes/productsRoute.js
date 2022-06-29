const express = require('express');
const { productsController } = require('../controllers');

const productsRoute = express.Router();

productsRoute.get('/', productsController.getAll);

module.exports = productsRoute;