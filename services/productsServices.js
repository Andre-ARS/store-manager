const { productsModel } = require('../models');

const getAll = () => {
  const products = productsModel.getAll();

  return products;
};

module.exports = { getAll };