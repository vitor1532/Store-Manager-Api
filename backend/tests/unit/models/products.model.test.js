const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productsFromDB, productsFromModel } = require('../mocks/products.mock');

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

  afterEach(function () {
    sinon.restore();
  });
});