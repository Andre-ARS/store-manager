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

const update = async (id, name) => {
  const query = `UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?`;

  await connection.execute(query, [name, id]);

  const result = {
    id,
    name,
  };

  return result;
};

const exclude = async (id) => {
  const query = `DELETE FROM StoreManager.products
  WHERE id = ?`;

  const [{ affectedRows }] = await connection.execute(query, [id]);

  return affectedRows;
};

module.exports = { getAll, getById, create, update, exclude };