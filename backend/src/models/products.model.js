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
    'SELECT * FROM products WHERE name LIKE ?', 
    [`%${name}%`],
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

const update = async (name, id) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';

  return connection.execute(query, [name, id]);
};

const remove = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';

  return connection.execute(query, [id]);
};

module.exports = {
  findAll,
  findById,
  findByName,
  insert,
  update,
  remove,
};