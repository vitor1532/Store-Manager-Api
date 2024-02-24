const snakeize = require('snakeize');

const getFormattedColumnNames = (object) => Object.keys(snakeize(object)).join(',');

const getFormattedPlaceholders = (object) => Object.keys(object).map(() => '?').join(',');

const getFormattedUpdateColumns = (object) => Object.keys(snakeize(object))
  .map((key) => `${key} = ?`)
  .join(', ');

// console.log('columns: ', getFormattedColumnNames({
//   productId: 2,
//   quantity: 5,
// }));

// console.log('placeholders: ', `${getFormattedPlaceholders({
//   productId: 2,
//   quantity: 5,
// })}`);

// console.log('formattedString: ', `${getFormattedUpdateColumns({
//   productId: 2,
//   quantity: 5,
// })}`);

module.exports = {
  getFormattedColumnNames,
  getFormattedPlaceholders,
  getFormattedUpdateColumns,
};