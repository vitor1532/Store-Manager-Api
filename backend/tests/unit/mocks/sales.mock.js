const salesDate = [
  '2021-09-09T04:54:29.000Z',
  '2021-09-09T04:54:54.000Z',
];

const salesFromDB = [
  {
    saleId: 1,
    date: salesDate[0],
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: salesDate[1],
    productId: 2,
    quantity: 2,
  },
  {
    saleId: 2,
    date: salesDate[1],
    productId: 2,
    quantity: 2,
  },
];
const salesFromModel = [
  {
    saleId: 1,
    date: salesDate[0],
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: salesDate[1],
    productId: 2,
    quantity: 2,
  },
  {
    saleId: 2,
    date: salesDate[1],
    productId: 2,
    quantity: 2,
  },
];

const singleSaleFromDb = [
  {
    saleId: 1,
    date: salesDate[0],
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const singleSaleFromModel = [
  {
    saleId: 1,
    date: salesDate[0],
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const newSales = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 3,
  },
];

const newInvalidSales = [
  {
    productId: 999,
    quantity: 1,
  },
];

const newSalesFromDb = {
  id: undefined,
  itemsSold: [
    {
      productId: 1,
      quantity: 2,
    },
  ],
};

const successfulResponseFindAllFromService = {
  status: 'SUCCESSFUL',
  data: salesFromModel,
};

const errorResponseFindAllFromService = {
  status: 'NOT_FOUND', data: { message: 'Sales not found' },
};

const successfulResponseFindByIdFromService = {
  status: 'SUCCESSFUL',
  data: salesFromModel[0],
};

const errorResponseFindByIdFromService = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

const succsessfulResponseDeleteFromService = { 
  status: 'NO_CONTENT',
  data: { message: 'Sale removed' }, 
};

module.exports = {
  salesFromDB,
  salesFromModel,
  singleSaleFromDb,
  singleSaleFromModel,
  newSales,
  newInvalidSales,
  newSalesFromDb,
  successfulResponseFindAllFromService,
  errorResponseFindAllFromService,
  successfulResponseFindByIdFromService,
  errorResponseFindByIdFromService,
  succsessfulResponseDeleteFromService,
};