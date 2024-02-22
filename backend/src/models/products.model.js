const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ? ORDER BY ASC', [id]);
  return product;
};

module.exports = {
  findAll,
  findById,
}