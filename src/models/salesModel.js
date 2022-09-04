const { connection } = require('../helpers');

const getAllSales = async () => {
  const query = `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity 
  FROM Store_Manager.sales s
  INNER JOIN Store_Manager.sales_products sp
  ON s.id = sp.sale_id
  ORDER BY sp.sale_id, sp.product_id`;

  const [sales] = await connection.execute(query);

  return sales;
};

const getSaleById = async (id) => {
  const query = `SELECT s.date, sp.product_id AS productId, sp.quantity 
  FROM Store_Manager.sales s
  INNER JOIN Store_Manager.sales_products sp
  ON s.id = sp.sale_id
  WHERE s.id = ?
  ORDER BY sp.product_id`;

  const [sale] = await connection.execute(query, [id]);

  return sale;
};

const addSale = async (saleInfo) => {
  const addSaleQuery = `INSERT INTO Store_Manager.sales
  VALUES ()`;

  const [{ insertId }] = await connection.execute(addSaleQuery);

  const query = `INSERT INTO Store_Manager.sales_products
  VALUES (?, ?, ?)`;

  saleInfo.forEach(async ({ productId, quantity }) => {
    await connection.execute(query, [insertId, productId, quantity]);
  });

  return {
    id: insertId,
    itemsSold: saleInfo,
  };
};

const excludeSale = async (id) => {
  const query = `DELETE FROM Store_Manager.sales
  WHERE id = ?`;

  const [{ affectedRows }] = await connection.execute(query, [id]);

  return affectedRows;
};

const updateSale = async (id, changes) => {
  const query = `UPDATE Store_Manager.sales_products
  SET quantity = ?
  WHERE sale_id = ?
  AND product_id = ?`;

  changes.forEach(async ({ productId, quantity }) => {
    await connection.execute(query, [quantity, id, productId]);    
  });

  const result = {
    saleId: id,
    itemsUpdated: changes,
  };

  return result;
};

module.exports = { addSale, getAllSales, getSaleById, excludeSale, updateSale };
