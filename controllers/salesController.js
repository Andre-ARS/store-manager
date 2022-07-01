const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
  const { code, result } = await salesService.getAllSales();

  res.status(code).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { code, result } = await salesService.getSaleById(Number(id));

  res.status(code).json(result);
};

const addSale = async (req, res) => {
  const saleInfo = req.body;

  const { code, result } = await salesService.addSale(saleInfo);

  res.status(code).json(result);
};

module.exports = { addSale, getAllSales, getSaleById };
