const sinon = require("sinon");
const { expect } = require("chai");

const { salesService } = require("../../../services");
const { salesController } = require("../../../controllers");

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
