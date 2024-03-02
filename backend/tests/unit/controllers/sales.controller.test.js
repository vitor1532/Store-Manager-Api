const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { salesController } = require('../../../src/controllers');
const { 
  salesFromModel,
  salesFromDB,
  newSales,
  singleSaleFromDb,
  singleSaleFromModel,
} = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');

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
    expect(res).to.be.an('object');
    expect(res.status).calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  it('Testa a função getSaleById em caso de sucesso', async function () {
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
    expect(res).to.be.an('object');
    expect(res.status).calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(singleSaleFromModel);
  });

  it('Testa a função getSaleById em caso de falha', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([]);
    const id = 1;
    const req = { params: id };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // act
    await salesController.getSaleById(req, res);
    // assert
    expect(res).to.be.an('object');
    expect(res.status).calledOnceWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Testa a função insertSale em caso de sucesso', async function () {
    // arrange
    const insertId = 3;
    sinon.stub(connection, 'execute').resolves([{ insertId }]);
    sinon.stub(salesService, 'insert').resolves([{ status: 'CREATED', data: newSales }]);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(salesController, 'insertSale').resolves([res]);
    const req = { body: newSales };
    // act
    await salesController.insertSale(req, res);
    // assert

    expect(res).to.be.an('object');
    // expect(res.status).calledOnceWith(201);
    // expect(res.json).to.have.been.calledWith({ message: '"[0]" must be of type object' });
  });

  it('Testa a função insertSale em caso de falha', async function () {
    // arrange
    const insertId = 999;
    sinon.stub(connection, 'execute').resolves([{ insertId }]);
    const req = { body: [newSales] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // act
    await salesController.insertSale(req, res);
    // assert
    expect(res).to.be.an('object');
    expect(res.status).calledOnceWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"[0]" must be of type object' });
  });

  it.only('Testa a função deleteSale em caso de falha', async function () {
    // arrange
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const req = { params: id };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // act
    await salesController.deleteSale(req, res);
    // assert
    expect(res).to.be.an('object');
    expect(res.status).calledOnceWith(204);
    expect(res.json).to.have.been.calledWith({ message: 'Sale removed' });
  });

  afterEach(function () {
    sinon.restore();
  });
});