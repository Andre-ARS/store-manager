const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const { code, result } = await productsService.getAll();

  res.status(code).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, result } = await productsService.getById(Number(id));

  res.status(code).json(result);
};

const create = async (req, res) => {
  const { name } = req.body;

  const { code, result } = await productsService.create(name);

  res.status(code).json(result);
};

const update = async (req, res) => {
  const { body: { name }, params: { id } } = req;

  const { code, result } = await productsService.update(Number(id), name);

  res.status(code).json(result);
};

const exclude = async (req, res) => {
  const { id } = req.params;

  const { code, result } = await productsService.exclude(Number(id));

  res.status(code).json(result);
};

const findByName = async (req, res) => {
  const { q } = req.query;

  const { code, result } = await productsService.findByName(q);

  res.status(code).json(result);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  findByName,
};
