const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { productsController } = require('../../../src/controllers');
const { productsFromDB, productsFromModel } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a camada controller de products', function () {
  it('Testa a função getAllProducts', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // act
    await productsController.getAllProducts(req, res);
    // assert
    expect(res).to.be.an('object');
    expect(res.status).calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Testa a função getProductById em caso de sucesso', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([[productsFromDB[0]]]);
    const id = 1;
    const req = { params: id };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // act
    await productsController.getAllProducts(req, res);
    // assert
    expect(res).to.be.an('object');
    expect(res.status).calledOnceWith(200);
    expect(res.json).to.have.been.calledWith([productsFromModel[0]]);
  });

  it('Testa a função getProductById em caso de falha', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([]);
    const id = 9999;
    const req = { params: id };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // act
    await productsController.getAllProducts(req, res);
    // assert
    expect(res).to.be.an('object');
    expect(res.status).calledOnceWith(404);
    // expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});