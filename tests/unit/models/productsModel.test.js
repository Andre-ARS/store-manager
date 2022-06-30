const sinon = require('sinon');
const { expect } = require('chai');


const { connection } = require('../../../helpers');
const { productsModel } = require('../../../models');

describe('Lista todos produtos', () => {

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

  describe('quando listado com sucesso', () => {
    it('retorna um array', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.a('array');
    });
  });
});

describe('Busca produto pelo id', () => {
  before(async () => {
    const execute = [[{ id: 1, name: "Martelo de Thor" }]];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("quando o id existe", () => {
    it("retorna o objeto do produto", async () => {
      const response = await productsModel.getById(1);

      expect(response).to.be.a("object");
    });
  });
});
