const sinon = require("sinon");
const { expect } = require("chai");

const { connection } = require("../../../helpers");
const { salesModel } = require("../../../models");
const { before, after } = require("mocha");

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
  describe("success cases", () => {
    before(async () => {
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
    });

    after(async () => {
      connection.execute.restore();
    });

    describe("If the id exists", () => {
      it("Returns an array with length greater than 0", async () => {
        const response = await salesModel.getSaleById(1);

        expect(response).to.be.a("array");
        expect(response).to.have.length.above(0);
      });
    });
  });

  describe("Fail cases", () => {
    before(async () => {
      let execute = [[]];

      sinon.stub(connection, "execute").resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe("If the id don't exists", () => {
      it("Returns an empty array", async () => {
        const response = await salesModel.getSaleById(5);

        expect(response).to.be.a("array");
        expect(response).to.have.length.below(1);
      });
    });
  });
});

describe("Tests the function excludeSale in models", () => {
  before(async () => {
    const execute = [{ affectedRows: 1 }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("Once succeeds", () => {
    it("delets only the right sale", async () => {
      const affectedRows = await salesModel.excludeSale(1);

      expect(affectedRows).to.be.equal(1);
    });
  });
});

describe("Tests the function updateSale in models", () => {
  before(async () => {
    const execute = [];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("Once succeeds", () => {
    it("Returns an object", async () => {
      const changes = [
        {
          productId: 1,
          quantity: 10,
        },
        {
          productId: 2,
          quantity: 50,
        },
      ];

      const response = await salesModel.updateSale(1, changes);

      expect(response).to.be.a("object");
    });
  });
});
