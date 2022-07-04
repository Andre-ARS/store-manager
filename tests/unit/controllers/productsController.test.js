const sinon = require("sinon");
const { expect } = require("chai");

const { productsService } = require("../../../services");
const { productsController } = require("../../../controllers");

describe("Tests the function getAll in controllers", () => {
  const req = {};
  const res = {};

  before(() => {
    const responseOk = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
      { id: 3, name: "Escudo do Capitão América" },
    ];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, "getAll").resolves({
      code: 200,
      result: responseOk,
    });
  });

  after(async () => {
    productsService.getAll.restore();
  });

  describe("Once succedes", () => {
    it("Returns the status code 200", async () => {
      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe("Tests the function getById in controllers", () => {
  const req = {};
  const res = {};

  before(() => {
    const product = {
      code: 200,
      result: { id: 1, name: "Martelo de Thor" },
    };

    req.params = "1";
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, "getById").resolves(product);
  });

  after(async () => {
    productsService.getById.restore();
  });

  describe("If the id exists", () => {
    it("Returns the status code 200", async () => {
      await productsController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe('Tests the function create in controllers', () => {
  const req = {};
  const res = {};

  before(() => {
    const responseOk = {
      id: 4,
      name: 'produto x'
    }

    req.body = { name: 'produto x' }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, "create").resolves({
      code: 201,
      result: responseOk,
    });
  });

  after(async () => {
    productsService.create.restore();
  });

  describe("Once succedes", () => {
    it("Returns the status code 201", async () => {
      await productsController.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });
});


describe('Tests the function update in controllers', () => {
  const req = {};
  const res = {};

  before(() => {
    const responseOk = {
      id: 1,
      name: 'produto x'
    }

    req.params = 1
    req.body = { name: 'produto x' }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, "update").resolves({
      code: 200,
      result: responseOk,
    });
  });

  after(async () => {
    productsService.update.restore();
  });

  describe("Once succedes", () => {
    it("Returns the status code 200", async () => {
      await productsController.update(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});
