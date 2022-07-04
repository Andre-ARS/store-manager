const sinon = require('sinon');
const { expect } = require('chai');


const { connection } = require('../../../helpers');
const { productsModel } = require('../../../models');

describe('Tests the function getAll in models', () => {

  before(async () => {
    const execute = [[
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
      { id: 3, name: "Escudo do Capitão América" },
    ]]; 

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Once succedes', () => {
    it('Returns an array', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.a('array');
    });
  });
});

describe("Tests the function getById in models", () => {
  before(async () => {
    const execute = [[{ id: 1, name: "Martelo de Thor" }]];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("If the id exists", () => {
    it("Returns the product's object", async () => {
      const response = await productsModel.getById(1);

      expect(response).to.be.a("object");
    });
  });
});

describe('Tests the function create in models', () => {
  before(async () => {
    const execute = [{ insertId: 4 }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Once succeeds', () => {
    it('Returns an object', async() => {
      const response = await productsModel.create('produto x')

      expect(response).to.be.a('object');
    });
  });
});

describe("Tests the function update in models", () => {
  before(async () => {
    const execute = [];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("Once succeeds", () => {
    it("Returns an object", async () => {
      const response = await productsModel.update(1, "Martelo do Batman");

      expect(response).to.be.a("object");
    });
  });
});
