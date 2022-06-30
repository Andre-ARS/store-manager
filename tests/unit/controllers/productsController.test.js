const sinon = require("sinon");
const { expect } = require("chai");

const { productsService } = require("../../../services");
const { productsController } = require("../../../controllers");

describe("Lista todos produtos", () => {
  const req = {};
  const res = {};
  
  before(() => {
    const responseOk = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
      { id: 3, name: "Escudo do Capitão América" },
    ];

    res.status = sinon.stub()
      .returns(res);
    res.json = sinon.stub()
      .returns();

    sinon.stub(productsService, "getAll").resolves({
      code: 200,
      result: responseOk,
    });
  });

  after(async () => {
    productsService.getAll.restore();
  });

  describe("quando listado com sucesso", () => {
    it("Retorna o codigo 200", async () => {
      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe("Busca produto pelo id", () => {
  const req = {};
  const res = {};
  
  before(() => {
    const product = {
      code: 200,
      result: { id: 1, name: "Martelo de Thor" },
    };
    
    req.params = '1'
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, "getById").resolves(product);
  });

  after(async () => {
    productsService.getById.restore();
  });

  describe("quando o id existe", () => {
    it("Retorna o codigo 200", async () => {
      await productsController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});
