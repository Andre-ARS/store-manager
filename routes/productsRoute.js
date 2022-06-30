const express = require('express');
const { productsController } = require('../controllers');

const productsRoute = express.Router();

productsRoute.get('/', productsController.getAll);

productsRoute.get('/:id', productsController.getById);

productsRoute.post('/', productsController.create);

module.exports = productsRoute;