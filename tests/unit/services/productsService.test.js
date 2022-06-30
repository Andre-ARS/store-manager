const sinon = require("sinon");
const { expect } = require("chai");

const { productsModel } = require("../../../models");
const { productsService } = require("../../../services");

describe("Tests the function getAll in services", () => {
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

  describe("Once succedes", () => {
    it("Returns an array", async () => {
      const response = await productsService.getAll();

      expect(response.result).to.be.a("array");
    });
  });
});

describe("Tests the function getById in services", () => {
  describe("If the id don't exists", () => {
    it("returns the right status code", async () => {
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

  describe("If the id exists", () => {
    it("Returns the product's object", async () => {
      const response = await productsService.getById(1);

      expect(response).to.be.a("object");
    });
  });
});

describe("Tests the function create in services", () => {
  describe('Valids the name', () => {
    it("can't be undefined", async () => {
      const { code, result } = await productsService.create('');

      expect(code).to.be.equal(400);
      expect(result.message).to.be.equal('"name" is required');
    });

    it('must be at least 5 characters long', async () => {
      const { code, result } = await productsService.create('prod');

      expect(code).to.be.equal(422);
      expect(result.message).to.be.equal(
        '"name" length must be at least 5 characters long'
      );
    });
  });
  
  before(async () => {
    const product = {
      id: 4,
      name: "produto x",
    };

    sinon.stub(productsModel, "create").resolves(product);
  });

  after(async () => {
    productsModel.create.restore();
  });

  describe('Once succeeds', () => {
    it('returns the right status code', async () => {
      const { code, result } = await productsService.create('produto x');

      expect(code).to.be.equal(201);
      expect(result).to.be.a('object');
    });
  });
});
