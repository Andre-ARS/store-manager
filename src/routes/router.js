const express = require('express');
const { productsRoute, salesRoute } = require('./index');

const router = express.Router();

router.use('/products', productsRoute);

router.use('/sales', salesRoute);

module.exports = router;