const { expect } = require('chai');

const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
  getFormattedUpdateColumns,
} = require('../../../src/utils/generateFormattedQuery');

describe('Testa o arquivo generateFormattedQuery', function () {
  const mockObject = {
    columnOne: 1,
    columnTwo: 2,
  };

  it('Testa a função getFormattedColumnNames', function () {
    // Arrange
    const formattedColumns = 'column_one,column_two'; 
    // Act
    const columns = getFormattedColumnNames(mockObject);
    // Assert

    expect(columns).to.be.equal(formattedColumns);
  });

  it('Testa a função getFormattedPlaceholders', function () {
    // Arrange
    const formattedColumns = '?,?'; 
    // Act
    const columns = getFormattedPlaceholders(mockObject);
    // Assert

    expect(columns).to.be.equal(formattedColumns);
  });

  it('Testa a função getFormattedUpdateColumns', function () {
    // Arrange
    const formattedUpdateColumns = 'column_one = ?, column_two = ?'; 
    // Act
    const columns = getFormattedUpdateColumns(mockObject);
    // Assert

    expect(columns).to.be.equal(formattedUpdateColumns);
  });
});