const productsFromDB = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Adaga de Loki' },
  { id: 3, name: 'Espada de Tyr' },
];

const productsFromModel = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Adaga de Loki' },
  { id: 3, name: 'Espada de Tyr' },
];

const successfulResponseFindAllFromService = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const errorResponseFindAllFromService = {
  status: 'NOT_FOUND', data: { message: 'Products not found' },
};

const successfulResponseFindByIdFromService = {
  status: 'SUCCESSFUL',
  data: productsFromModel[0],
};

const errorResponseFindByIdFromService = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  productsFromDB,
  productsFromModel,
  successfulResponseFindAllFromService,
  errorResponseFindAllFromService,
  successfulResponseFindByIdFromService,
  errorResponseFindByIdFromService,
};