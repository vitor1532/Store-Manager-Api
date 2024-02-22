const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { salesController } = require('../../../src/controllers');
const { 
  salesFromModel,
  salesFromDB,
  singleSaleFromDb,
  singleSaleFromModel,
} = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a camada controller de sales', function () {
  it('Testa a função getAllSales', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // act
    await salesController.getAllSales(req, res);
    // assert
    console.log(res.data);
    expect(res).to.be.an('object');
    expect(res.status).calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  it('Testa a função getSaleById', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([singleSaleFromDb]);
    const id = 1;
    const req = { params: id };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // act
    await salesController.getSaleById(req, res);
    // assert
    console.log(res.data);
    expect(res).to.be.an('object');
    expect(res.status).calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(singleSaleFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});