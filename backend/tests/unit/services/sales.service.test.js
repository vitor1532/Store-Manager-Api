const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesService } = require('../../../src/services');
const { 
  salesFromDB,
  successfulResponseFindAllFromService,
  errorResponseFindAllFromService,
  successfulResponseFindByIdFromService,
  errorResponseFindByIdFromService,
} = require('../mocks/sales.mock');

describe('Testa o service de sales', function () {
  it('Testa se a função retorna todos os produtos do banco', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    // act
    const sales = await salesService.findAll();
    // assert
    expect(sales).to.be.an('object');
    expect(sales).to.be.deep.equal(successfulResponseFindAllFromService);
  });
  
  it('Retorna a mensagem de erro caso não exista dados no banco', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([]);
    // act
    const sales = await salesService.findAll();
    // assert
    expect(sales).to.be.an('object');
    expect(sales).to.be.deep.equal(errorResponseFindAllFromService);
  });

  it('Testa se a função retorna um produto do banco', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([salesFromDB[0]]);
    const id = 1;
    // act
    const products = await salesService.findById(id);
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(successfulResponseFindByIdFromService);
  });

  it('Testa se a função retorna uma mensagem de erro caso o produto não exista', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([false]);
    const id = 9999;
    // act
    const products = await salesService.findById(id);
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(errorResponseFindByIdFromService);
  });
  afterEach(function () {
    sinon.restore();
  });
});