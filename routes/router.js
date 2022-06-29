const express = require('express');
const { productsRoute } = require('./index');

const router = express.Router();

router.use('/products', productsRoute);

module.exports = router;