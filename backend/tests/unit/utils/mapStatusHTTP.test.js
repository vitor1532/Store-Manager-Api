const { expect } = require('chai');
const mapStatusHTTP = require('../../../src/utils/mapStatusHTTP');

describe('Testa a função mapStatusHTTP', function () {
  it('Testa caso SUCCESSFUL', async function () {
    // arrange
    const success = 'SUCCESSFUL';
    // act
    const result = mapStatusHTTP(success);
    // assert
    expect(result).to.be.an('number');
    expect(result).to.be.equal(200);
  });

  it('Testa caso CREATED', async function () {
    // arrange
    const created = 'CREATED';
    // act
    const result = mapStatusHTTP(created);
    // assert
    expect(result).to.be.an('number');
    expect(result).to.be.equal(201);
  });

  it('Testa caso NO_CONTENT', async function () {
    // arrange
    const noContent = 'NO_CONTENT';
    // act
    const result = mapStatusHTTP(noContent);
    // assert
    expect(result).to.be.an('number');
    expect(result).to.be.equal(204);
  });

  it('Testa caso BAD_REQUEST', async function () {
    // arrange
    const badRequest = 'BAD_REQUEST';
    // act
    const result = mapStatusHTTP(badRequest);
    // assert
    expect(result).to.be.an('number');
    expect(result).to.be.equal(400);
  });

  it('Testa caso NOT_FOUND', async function () {
    // arrange
    const notFound = 'NOT_FOUND';
    // act
    const result = mapStatusHTTP(notFound);
    // assert
    expect(result).to.be.an('number');
    expect(result).to.be.equal(404);
  });

  it('Testa caso CONFLICT', async function () {
    // arrange
    const conflict = 'CONFLICT';
    // act
    const result = mapStatusHTTP(conflict);
    // assert
    expect(result).to.be.an('number');
    expect(result).to.be.equal(409);
  });

  it('Testa caso INVALID_VALUE', async function () {
    // arrange
    const invalidValue = 'INVALID_VALUE';
    // act
    const result = mapStatusHTTP(invalidValue);
    // assert
    expect(result).to.be.an('number');
    expect(result).to.be.equal(422);
  });

  it('Testa caso INTERNAL_SERVER_ERROR', async function () {
    // arrange
    const serverError = 'INTERNAL_SERVER_ERROR';
    // act
    const result = mapStatusHTTP(serverError);
    // assert
    expect(result).to.be.an('number');
    expect(result).to.be.equal(500);
  });
});