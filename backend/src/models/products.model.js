const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?', 
    [id],
  );
  return product;
};

const findByName = async (name) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE name = ?', 
    [name],
  );
  return product;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (name)
      VALUE (?)`,
    [name],
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  findByName,
  insert,
};