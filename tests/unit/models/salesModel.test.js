const sinon = require("sinon");
const { expect } = require("chai");

const { connection } = require("../../../helpers");
const { salesModel } = require("../../../models");

describe("Tests the function addSale in models", () => {
  before(async () => {
    const execute = [{ insertId: 3 }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("Once succedes", () => {
    const saleInfo = [
      {
        productId: 3,
        quantity: 5,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    it("Returns an object", async () => {
      const response = await salesModel.addSale(saleInfo);

      expect(response).to.be.a("object");
    });
  });
});
