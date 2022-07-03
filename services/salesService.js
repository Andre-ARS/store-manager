const { isValid } = require('../helpers');
const { productsModel, salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();

  return { code: 200, result: sales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (sale.length < 1) { return { code: 404, result: { message: 'Sale not found' } }; }

  return { code: 200, result: sale };
};

const addSale = async (saleInfo) => {
  const products = await productsModel.getAll();
  const productIds = products.map(({ id }) => id);

  if (await isValid(saleInfo, productIds)) {
    const response = await isValid(saleInfo, productIds);
    return response;
  }

  const sale = await salesModel.addSale(saleInfo);

  return { code: 201, result: sale };
};

module.exports = { addSale, getAllSales, getSaleById };
