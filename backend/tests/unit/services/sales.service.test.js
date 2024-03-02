const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesService } = require('../../../src/services');
const { validateNewSale } = require('../../../src/services/validations/validateInputs');
const { 
  salesFromDB,
  newSalesFromDb,
  successfulResponseFindAllFromService,
  errorResponseFindAllFromService,
  successfulResponseFindByIdFromService,
  errorResponseFindByIdFromService,
  succsessfulResponseDeleteFromService,
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

  it('testa a inserção de uma sale', async function () {
    // Arrange
    const sales = [{ productId: 1, quantity: 2 }];
    sinon.stub(connection, 'execute').resolves([sales]);
    // Act
    const result = await salesService.insert(sales);

    // Assert
    expect(result).to.deep.equal({ status: 'CREATED', data: newSalesFromDb });
  });
  
  it('testa a função insert em caso de erro', async function () {
    // Arrange
    const sales = [{ productId: 1, quantity: -1 }];
    // Act
    const result = validateNewSale(sales);
    
    // Assert
    expect(result).to.deep.equal({ status: ['INVALID_VALUE'], message: '"quantity" must be greater than or equal to 1' });
  });

  it('Testa se a função remove em caso de sucesso', async function () {
    // arrange
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    // act
    const sales = await salesService.remove(id);
    // assert
    expect(sales).to.be.an('object');
    expect(sales).to.be.deep.equal(succsessfulResponseDeleteFromService);
  });

  it('Testa se a função remove em caso de falha', async function () {
    // arrange
    const id = 999;
    sinon.stub(connection, 'execute').resolves([]);
    // act
    const sales = await salesService.remove(id);
    // assert
    expect(sales).to.be.an('object');
    expect(sales).to.be.deep.equal(errorResponseFindByIdFromService);
  });

  afterEach(function () {
    sinon.restore();
  });
});