const camelize = require('camelize');
const connection = require('./connection');
const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity FROM sales_products as sp
      JOIN sales as sa ON sp.sale_id = sa.id`,
  );
  return camelize(sales);
};

const findById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT sa.date, sp.product_id, sp.quantity FROM sales_products as sp
      JOIN sales as sa ON sp.sale_id = sa.id
      WHERE sp.sale_id = ?`,
    [id],
  );

  return camelize(sales);
};

const insertSalesProducts = async (sales, insertId) => {
  try {
    const promises = sales.map((sale) => {
      const columns = getFormattedColumnNames(sale);
      const placeholders = getFormattedPlaceholders(sale);
      const query = `INSERT INTO sales_products (sale_id , ${columns}) VALUE (?, ${placeholders})`;
      return connection.execute(query, [insertId, ...Object.values(sale)]);
    }); 
    await Promise.all(promises);
  } catch (err) {
    console.log(err);
  }
};

const insert = async (sales) => {
  try {
    const [{ insertId }] = await connection.execute(
      `INSERT INTO sales (date)
        VALUE (NOW())`,
    );
    
    await insertSalesProducts(sales, insertId);
  
    return insertId;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findAll,
  findById,
  insert,
};