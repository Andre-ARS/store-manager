const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const { code, result } = await productsService.getAll();

  res.status(code).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, result } = await productsService.getById(id);

  res.status(code).json(result);
};

const create = async (req, res) => {
  const { name } = req.body;

  const { code, result } = await productsService.create(name);

  res.status(code).json(result);
};

module.exports = { getAll, getById, create };