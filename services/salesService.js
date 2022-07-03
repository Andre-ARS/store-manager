const { productsModel, salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();

  return { code: 200, result: sales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  
  if (sale.length < 1) return { code: 404, result: { message: 'Sale not found' } };

  return { code: 200, result: sale };
};

const isValid = async (saleInfo) => {
  const products = await productsModel.getAll();
  const productIds = products.map(({ id }) => id);
  
  if (!saleInfo.every(({ productId }) => productId !== undefined)) {
    return { code: 400, result: { message: '"productId" is required' } };
  }
  
  if (!saleInfo.every(({ productId }) => productIds.includes(productId))) {
    return { code: 404, result: { message: 'Product not found' } };
  }

  if (!saleInfo.every(({ quantity }) => quantity !== undefined)) {
    return { code: 400, result: { message: '"quantity" is required' } };
  }

  if (!saleInfo.every(({ quantity }) => quantity >= 1)) {
    return {
      code: 422,
      result: { message: '"quantity" must be greater than or equal to 1' },
    };
  }
};

const addSale = async (saleInfo) => {
  if (await isValid(saleInfo)) {
    const response = await isValid(saleInfo);
    return response;
  }

  const sale = await salesModel.addSale(saleInfo);

  return { code: 201, result: sale };
};

module.exports = { addSale, getAllSales, getSaleById };
