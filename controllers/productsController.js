const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  res.status(200).json(products);
};

module.exports = { getAll };