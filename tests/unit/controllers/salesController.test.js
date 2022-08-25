const sinon = require("sinon");
const { expect } = require("chai");

const { salesService } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");

describe("Tests the function addSale in controllers", () => {
  const req = {};
  const res = {};

  before(() => {
    const responseOk = {
      id: 4,
      itemsSold: [
        {
          productId: 3,
          quantity: 5,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    req.body = [
      {
        productId: 3,
        quantity: 5,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "addSale").resolves({
      code: 201,
      result: responseOk,
    });
  });

  after(async () => {
    salesService.addSale.restore();
  });

  describe("Once succedes", () => {
    it("Returns the status code 201", async () => {
      await salesController.addSale(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });
});

describe("Tests the function getAllSales in controllers", () => {
  const req = {};
  const res = {};

  before(() => {
    const responseOk = [
      {
        saleId: 1,
        date: "2022-07-03T02:21:54.000Z",
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: "2022-07-03T02:21:54.000Z",
        productId: 2,
        quantity: 10,
      },
    ];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "getAllSales").resolves({
      code: 200,
      result: responseOk,
    });
  });

  after(async () => {
    salesService.getAllSales.restore();
  });

  describe("Once succedes", () => {
    it("Returns the status code 200", async () => {
      await salesController.getAllSales(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe("Tests the function getSaleById in controllers", () => {
  const req = {};
  const res = {};

  before(() => {
    const responseOk = [
      {
        date: "2022-07-03T02:21:54.000Z",
        productId: 1,
        quantity: 5,
      },
      {
        date: "2022-07-03T02:21:54.000Z",
        productId: 2,
        quantity: 10,
      },
    ];

    req.params = 1;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "getSaleById").resolves({
      code: 200,
      result: responseOk,
    });
  });

  after(async () => {
    salesService.getSaleById.restore();
  });

  describe("Once succedes", () => {
    it("Returns the status code 200", async () => {
      await salesController.getSaleById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe("Tests the function excludeSale in controllers", () => {
  const req = {};
  const res = {};

  before(() => {
    req.params = 1;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "excludeSale").resolves({
      code: 204,
    });
  });

  after(async () => {
    salesService.excludeSale.restore();
  });

  describe("Once succedes", () => {
    it("Returns the status code 204", async () => {
      await salesController.excludeSale(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
    });
  });
});

describe("Tests the function updateSale in controllers", () => {
  const req = {};
  const res = {};

  before(() => {
    const responseOk = {
      saleId: 1,
      itemsUpdated: [
        {
          productId: 1,
          quantity: 10,
        },
        {
          productId: 2,
          quantity: 50,
        },
      ],
    };

    req.params = 1;
    req.body = [
      {
        productId: 1,
        quantity: 10,
      },
      {
        productId: 2,
        quantity: 50,
      },
    ];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "updateSale").resolves({
      code: 200,
      result: responseOk,
    });
  });

  after(async () => {
    salesService.updateSale.restore();
  });

  describe("Once succedes", () => {
    it("Returns the status code 200", async () => {
      await salesController.updateSale(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});
