const { connection } = require('../helpers');

const addSale = async (saleInfo) => {
  const addSaleQuery = `INSERT INTO StoreManager.sales
  VALUES ()`;

  const [{ insertId }] = await connection.execute(addSaleQuery);

  const query = `INSERT INTO StoreManager.sales_products
  VALUES (?, ?, ?)`;

  saleInfo.forEach(async ({ productId, quantity }) => {
    await connection.execute(query, [insertId, productId, quantity]);
  });

  return {
    id: insertId,
    itemsSold: saleInfo,
  };
};

module.exports = { addSale };
