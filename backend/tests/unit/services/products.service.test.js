const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsService } = require('../../../src/services');
const { 
  productsFromDB,
  productsFromModel,
} = require('../mocks/products.mock');

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
  
  it('Retorna a mensagem de erro caso não exista dados no banco', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([false]);
    const failResponse = {
      status: 'NOT_FOUND', data: { message: 'Products not found' },
    };
    // act
    const products = await productsService.findAll();

    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(failResponse);
  });

  it('Testa se a função retorna um produto do banco', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([[productsFromDB[0]]]);
    const id = 1;
    const responseFromService = {
      status: 'SUCCESSFUL',
      data: productsFromModel[0],
    };
    // act
    const products = await productsService.findById(id);
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(responseFromService);
  });

  it('Testa se a função retorna uma mensagem de erro caso o produto não exista', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([[false]]);
    const id = 9999;
    const responseFromService = {
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    };
    // act
    const products = await productsService.findById(id);
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(responseFromService);
  });
  afterEach(function () {
    sinon.restore();
  });
});