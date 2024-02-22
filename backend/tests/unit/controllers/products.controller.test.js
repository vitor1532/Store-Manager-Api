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
    console.log(res.data);
    expect(res).to.be.an('object');
    expect(res.status).calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});