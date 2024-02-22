const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity FROM sales_products as sp
      JOIN sales as sa ON sp.sale_id = sa.id`,
  );
  return camelize(sales);
};

const findById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity FROM sales_products as sp
      JOIN sales as sa ON sp.sale_id = sa.id
      WHERE sp.sale_id = ?`,
    [id],
  );

  return camelize(sales);
};

module.exports = {
  findAll,
  findById,
};