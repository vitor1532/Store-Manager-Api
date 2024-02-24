const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { 
  productsFromDB,
  productsFromModel,
  newProductFromDB,
} = require('../mocks/products.mock');

describe('Testa o model de Products', function () {
  it('Recupera todos os products com sucesso', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    // act
    const products = await productsModel.findAll();
    // assert
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Recupera apenas um dos products com sucesso', async function () {
    // arrange
    const id = 1;
    sinon.stub(connection, 'execute').resolves([[productsFromDB[0]]]);
    // act
    const product = await productsModel.findById(id);
    // assert
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productsFromModel[0]);
  });

  it('Testa a função insert de um dos products', async function () {
    // arrange
    const id = 4;
    sinon.stub(connection, 'execute').resolves([{ insertId: id }]);
    // act
    const insertId = await productsModel.insert(newProductFromDB[0].name);
    // assert
    expect(insertId).to.be.equal(newProductFromDB[0].id);
  });

  it('Testa a função remove do banco de dados', async function () {
    // arrange
    const id = 3;
    sinon.stub(connection, 'execute').resolves({ affectedRows: 1, succcess: true });
    // act
    const result = await productsModel.remove(id);
    // assert

    expect(result.affectedRows).to.be.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});