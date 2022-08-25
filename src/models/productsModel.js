const { connection } = require('../helpers');

const getAll = async () => {
  const query = 'SELECT * FROM heroku_de963535be464a2.products ORDER BY id';
  const [result] = await connection.execute(query);

  return result;
};

const getById = async (id) => {
  const query = `SELECT * FROM heroku_de963535be464a2.products
    WHERE id=?`;

  const [[result]] = await connection.execute(query, [id]);

  return result;
};

const create = async (name) => {
  const query = `INSERT INTO heroku_de963535be464a2.products (name)
  VALUES (?)`;

  const [response] = await connection.execute(query, [name]);

  const result = {
    id: response.insertId,
    name,
  };

  return result;
};

const update = async (id, name) => {
  const query = `UPDATE heroku_de963535be464a2.products
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
  const query = `DELETE FROM heroku_de963535be464a2.products
  WHERE id = ?`;

  const [{ affectedRows }] = await connection.execute(query, [id]);

  return affectedRows;
};

const findByName = async (name) => {
  const query = `SELECT * FROM heroku_de963535be464a2.products
  WHERE name LIKE CONCAT ('%', ?, '%')`;

  const [result] = await connection.execute(query, [name]);

  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  findByName,
};
