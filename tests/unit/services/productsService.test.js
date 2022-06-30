const sinon = require("sinon");
const { expect } = require("chai");

const { productsModel } = require("../../../models");
const { productsService } = require("../../../services");

describe("Lista todos produtos", () => {
  before(async () => {
    const execute = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
      { id: 3, name: "Escudo do Capitão América" },
    ];

    sinon.stub(productsModel, "getAll").resolves(execute);
  });

  after(async () => {
    productsModel.getAll.restore();
  });

  describe("quando listado com sucesso", () => {
    it("retorna um array", async () => {
      const response = await productsService.getAll();

      expect(response.result).to.be.a("array");
    });
  });
});

describe("Busca produto pelo id", () => {
  describe("quando o id não existe", () => {
    it("retorna o codigo certo", async () => {
      const response = await productsService.getById(50);

      expect(response.code).to.be.equal(404);
    });
  });

  before(async () => {
    const execute = { id: 1, name: "Martelo de Thor" };

    sinon.stub(productsModel, "getAll").resolves(execute);
  });

  after(async () => {
    productsModel.getAll.restore();
  });

  describe("quando o id existe", () => {
    it("retorna o objeto do produto", async () => {
      const response = await productsService.getById(1);

      expect(response).to.be.a("object");
    });
  });
});
