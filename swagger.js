const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Store Manager',
    description: 'API de um CRUD de vendas e produtos',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Products',
      description: 'Products Endpoints',
    },
    {
      name: 'Sales',
      description: 'Sales Endpoints',
    },
  ],
  definitions: {
    Product: {
      id: 1,
      $name: 'Martelo de Thor',
    },
    Sales: {
      id: 1,
      $date: Date('2022-08-25 02:58:17'),
    },
    GetAllSales: {
      $saleId: 1,
      $date: Date('2022-08-25T02:38:03.000Z'),
      $productId: 1,
      $quantity: 5,
    },
    GetAllProducts: [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      {
        id: 3,
        name: 'Escudo do Capitão América',
      },
    ],
  },
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/router.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
  // eslint-disable-next-line global-require
  require('./src/index');
});