const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsService } = require('../../../src/services');
const { productsFromDB, productsFromModel } = require('../mocks/products.mock');

describe('Testa o service de Products', function () {
  it('Testa se a função retorna todos os produtos do banco', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    const responseFromService = {
      status: 'SUCCESSFUL',
      data: productsFromModel,
    };
    // act
    const products = await productsService.findAll();
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(responseFromService);
  });
  afterEach(function () {
    sinon.restore();
  });
});