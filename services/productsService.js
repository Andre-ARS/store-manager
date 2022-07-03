const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();

  return { code: 200, result: products };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) return { code: 404, result: { message: 'Product not found' } };

  return { code: 200, result: product };
};

const create = async (name) => {
  if (!name) return { code: 400, result: { message: '"name" is required' } };
  if (name.length < 5) {
    return {
      code: 422,
      result: { message: '"name" length must be at least 5 characters long' },
    };
  }
  const product = await productsModel.create(name);

  return { code: 201, result: product };
};

const update = async (id, name) => {
  const products = await productsModel.getAll();
  const productIds = products.map(({ id: productId }) => productId);

  if (!productIds.includes(id)) {
    return { code: 404, result: { message: 'Product not found' } };
  }
  if (!name) return { code: 400, result: { message: '"name" is required' } };
  if (name.length < 5) {
    return {
      code: 422,
      result: { message: '"name" length must be at least 5 characters long' },
    };
  }

  const product = await productsModel.update(id, name);

  return { code: 200, result: product };
};

module.exports = { getAll, getById, create, update };
