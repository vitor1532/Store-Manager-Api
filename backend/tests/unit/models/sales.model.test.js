const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { 
  salesFromDB,
  salesFromModel,
  newSales,
} = require('../mocks/sales.mock');

describe('Testa o model de Sales', function () {
  it('Recupera todos as sales com sucesso', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    // act
    const products = await salesModel.findAll();
    // assert
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(salesFromModel);
  });

  it('Recupera apenas uma das sales com sucesso', async function () {
    // arrange
    const id = 1;
    sinon.stub(connection, 'execute').resolves([salesFromDB[0]]);
    // act
    const product = await salesModel.findById(id);
    // assert
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(salesFromModel[0]);
  });

  it('testa insert sales', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    // act
    const result = await salesModel.insert(newSales);

    // assert
    expect(result).to.equal(1); // Expecting insertId
  });

  it('Testa a função remove em caso de sucesso', async function () {
    // arrange
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    // act
    const products = await salesModel.remove(id);
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal({ affectedRows: 1 });
  });

  it('Testa a função remove em caso de falha', async function () {
    // arrange
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
    // act
    const products = await salesModel.remove(id);
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal({ affectedRows: 0 });
  });

  afterEach(function () {
    sinon.restore();
  });
});