const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, result } = await productsService.getById(id);

  res.status(code).json(result);
};

module.exports = { getAll, getById };
