const { salesService } = require('../services');

const addSale = async (req, res) => {
  const saleInfo = req.body;

  const { code, result } = await salesService.addSale(saleInfo);

  res.status(code).json(result);
};

const getAllSales = async (_req, res) => {
  const { code, result } = await salesService.getAllSales();

  res.status(code).json(result);
};

module.exports = { addSale, getAllSales };
