const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { validateProductsExistsMiddleware, validateInputNewSale } = require('../../../src/middlewares/validation.middlewares');
const { newSales, newSalesFromDb, newInvalidSales } = require('../mocks/sales.mock');
const { errorResponseFindByIdFromService } = require('../mocks/products.mock');
const validationMiddlewares = require('../../../src/middlewares/validation.middlewares');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a camada de middlewares', function () {
  it('Testa a função validateInputNewSale', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[newSalesFromDb]]);
    const next = sinon.stub();
    // Act
    const validated = await validateInputNewSale(newSales, next);
    // Assert
    expect(validated).to.be.deep.equal([]);
  });

  it('Testa a função validateInputNewSale em caso de erro', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[]]);
    const next = sinon.stub();

    // Act
    const validated = await validateInputNewSale(newSales, next);
    // Assert
    expect(validated).to.be.deep.equal([errorResponseFindByIdFromService, errorResponseFindByIdFromService]);
  });

  it('Testa a função validateProductsExistsMiddleware', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[newSalesFromDb]]);
    const next = sinon.stub();
    sinon.stub(validationMiddlewares, 'validateInputNewSale').resolves([]);
    const req = { body: newSales };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Act

    await validateProductsExistsMiddleware(req, res, next);

    // Assert

    expect(res).to.be.an('object');
    expect(res.body).to.be.deep.equal(undefined);
    expect(next).to.be.calledWith();
  });

  it('Testa a função validateProductsExistsMiddleware em caso de inválido', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[]]);
    const req = { body: newInvalidSales };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().resolves({ message: 'Product not found' }), 
    };

    const next = sinon.stub();

    // Act
    await validateProductsExistsMiddleware(req, res, next);

    // Assert

    expect(res).to.be.an('object');
    expect(res.status).calledWith(404);
    expect(res.json).to.be.calledWith(errorResponseFindByIdFromService.data);
  });

  afterEach(function () {
    sinon.restore();
  });
});