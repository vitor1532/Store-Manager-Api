const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsService } = require('../../../src/services');
const { 
  productsFromDB,
  successfulResponseFindAllFromService,
  errorResponseFindAllFromService,
  successfulResponseFindByIdFromService,
  errorResponseFindByIdFromService,
} = require('../mocks/products.mock');

describe('Testa o service de Products', function () {
  it('Testa se a função retorna todos os produtos do banco', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    // act
    const products = await productsService.findAll();
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(successfulResponseFindAllFromService);
  });
  
  it('Retorna a mensagem de erro caso não exista dados no banco', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([false]);
    // act
    const products = await productsService.findAll();
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(errorResponseFindAllFromService);
  });

  it('Testa se a função retorna um produto do banco', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([[productsFromDB[0]]]);
    const id = 1;
    // act
    const products = await productsService.findById(id);
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(successfulResponseFindByIdFromService);
  });

  it('Testa se a função retorna uma mensagem de erro caso o produto não exista', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([[false]]);
    const id = 9999;
    // act
    const products = await productsService.findById(id);
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(errorResponseFindByIdFromService);
  });
  afterEach(function () {
    sinon.restore();
  });
});