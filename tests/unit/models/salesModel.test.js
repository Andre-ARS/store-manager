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

describe("Tests the function getAllSales in models", () => {
  before(async () => {
    const execute = [
      [
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
      ],
    ];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("Once succedes", () => {
    it("Returns an array", async () => {
      const response = await salesModel.getAllSales();

      expect(response).to.be.a("array");
    });
  });
});

describe("Tests the function getSaleById in models", () => {
  let execute = [
    [
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
    ],
  ];

  sinon.stub(connection, "execute").resolves(execute);
  
  describe("If the id exists", () => {
    it("Returns an array with length greater than 0", async () => {
      const response = await salesModel.getSaleById(1);
      
      expect(response).to.be.a("array");
      expect(response.length > 0).to.be.equal(true);
    });
    connection.execute.restore();
  });

  
  execute = [[]];

  sinon.stub(connection, "execute").resolves(execute);

  describe("If the id don't exists", () => {
    it("Returns an empty array", async () => {
      const response = await salesModel.getSaleById(5);
      
      expect(response).to.be.a("array");
      expect(response.length > 0).to.be.equal(false);
    });
    connection.execute.restore();
  });
});
