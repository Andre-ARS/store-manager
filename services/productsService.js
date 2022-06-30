const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) return { code: 404, result: { message: 'Product not found' } }; 

  return { code: 200, result: product };
};

module.exports = { getAll, getById };
