const { connection } = require('../helpers');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';
  const [result] = await connection.execute(query);

  return result;
};

const getById = async (id) => {
  const query = `SELECT * FROM StoreManager.products
    WHERE id=?`;

  const [[result]] = await connection.execute(query, [id]);

  return result;
};

const create = async (name) => {
  const query = `INSERT INTO StoreManager.products (name)
  VALUES (?)`;

  const [response] = await connection.execute(query, [name]);

  const result = {
    id: response.insertId,
    name,
  };

  return result;
};

module.exports = { getAll, getById, create };