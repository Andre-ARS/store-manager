const connection = require('../helpers');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.sales_products;';
  const [result] = await connection.execute(query);

  return result;
};

module.exports = { getAll };