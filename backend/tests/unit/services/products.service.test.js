const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsService } = require('../../../src/services');
const { 
  productsFromDB,
  newProductFromDB,
  successfulResponseFindAllFromService,
  errorResponseFindAllFromService,
  successfulResponseFindByIdFromService,
  errorResponseFindByIdFromService,
  successfulResponseInsertFromService,
  errorResponseInsertFromService,
} = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models');

describe('Testa o service de Products', function () {
  it('Testa se a função findAll retorna todos os produtos do banco', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    // act
    const products = await productsService.findAll();
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(successfulResponseFindAllFromService);
  });
  
  it('Retorna a mensagem de erro de findAll caso não exista dados no banco', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([false]);
    // act
    const products = await productsService.findAll();
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(errorResponseFindAllFromService);
  });

  it('Testa se a função findById retorna um produto do banco', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([[productsFromDB[0]]]);
    const id = 1;
    // act
    const products = await productsService.findById(id);
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(successfulResponseFindByIdFromService);
  });

  it('Testa se a função findById retorna uma mensagem de erro caso o produto não exista', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([[false]]);
    const id = 9999;
    // act
    const products = await productsService.findById(id);
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(errorResponseFindByIdFromService);
  });

  it('Testa se a função insert tem o comportamento esperado', async function () {
    // arrange
    const name = 'Foice do tinhoso';
    // sinon.stub(productsModel, 'findByName').resolves([]);
    sinon.stub(connection, 'execute').resolves([[]]);
    sinon.stub(productsModel, 'findById').resolves(newProductFromDB);

    // act
    const products = await productsService.insert({ name });
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(successfulResponseInsertFromService);
  });

  it('Testa se a função insert não tem o comportamento esperado', async function () {
    // arrange
    const name = 'Foice do tinhoso';
    sinon.stub(productsModel, 'findByName').resolves([]);
    sinon.stub(connection, 'execute').resolves([]);
    sinon.stub(productsModel, 'findById').resolves([]);

    // act
    const products = await productsService.insert({ name });
    // assert
    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(errorResponseInsertFromService);
  });

  it('Testa a função remove da camada model com um id inválido', async function () {
    // arrange
    const id = 9999;
    sinon.stub(connection, 'execute').resolves([[]]);
    sinon.stub(productsService, 'findById').resolves();
    // act
    const removedProduct = await productsService.remove(id);
    // assert
    expect(removedProduct).to.be.an('object');
    expect(removedProduct.status).to.be.equal('NOT_FOUND');
    expect(removedProduct.data).to.been.deep.equal({ message: 'Product not found' });
  });

  it('Testa a função remove da camada model com um id válido', async function () {
    // arrange
    const id = 1;
    sinon.stub(connection, 'execute').resolves([[productsFromDB[0]]]);
    sinon.stub(productsService, 'findById').resolves();
    // act
    const removedProduct = await productsService.remove(id);
    // assert
    expect(removedProduct).to.be.an('object');
    expect(removedProduct.status).to.be.equal('NO_CONTENT');
  });

  afterEach(function () {
    sinon.restore();
  });
});