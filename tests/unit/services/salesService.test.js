const sinon = require("sinon");
const { expect } = require("chai");

const { salesModel, productsModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");

describe("Tests the function addSale in services", () => {
  before(async () => {
    const execute = [
      {
        id: 1,
        name: "Martelo de Thor",
      },
      {
        id: 2,
        name: "Traje de encolhimento",
      },
      {
        id: 3,
        name: "Escudo do Capitão América",
      },
    ];

    sinon.stub(productsModel, "getAll").resolves(execute);
  });

  after(async () => {
    productsModel.getAll.restore();
  });

  describe("Validates the request", () => {
    it('the "productId" can\'t be undefined', async () => {
      const saleInfo = [
        {
          quantity: 5,
        },
      ];

      const { code, result } = await salesService.addSale(saleInfo);

      expect(code).to.be.equal(400);
      expect(result.message).to.be.equal('"productId" is required');
    });

    it("the product must exist", async () => {
      const saleInfo = [
        {
          productId: 4,
          quantity: 5,
        },
      ];
      const { code, result } = await salesService.addSale(saleInfo);

      expect(code).to.be.equal(404);
      expect(result.message).to.be.equal("Product not found");
    });

    it('the "quantity" can\'t be undefined', async () => {
      const saleInfo = [
        {
          productId: 2,
        },
      ];
      const { code, result } = await salesService.addSale(saleInfo);

      expect(code).to.be.equal(400);
      expect(result.message).to.be.equal('"quantity" is required');
    });

    it('the "quantity" can\'t be less than 1', async () => {
      const saleInfo = [
        {
          productId: 2,
          quantity: 0,
        },
      ];
      const { code, result } = await salesService.addSale(saleInfo);

      expect(code).to.be.equal(422);
      expect(result.message).to.be.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });
  });

  before(async () => {
    const execute = {
      id: 3,
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

    sinon.stub(salesModel, "addSale").resolves(execute);
  });

  after(async () => {
    salesModel.addSale.restore();
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
      const { code, result } = await salesService.addSale(saleInfo);

      expect(code).to.be.equal(201);
      expect(result).to.be.a("object");
    });
  });
});

describe("Tests the function getAllSales in services", () => {
  before(async () => {
    const execute = [
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

    sinon.stub(salesModel, "getAllSales").resolves(execute);
  });

  after(async () => {
    salesModel.getAllSales.restore();
  });

  describe("Once succeeds", () => {
    it("returns the status code 200", async () => {
      const { code } = await salesService.getAllSales();

      expect(code).to.be.equal(200);
    });
  });
});

describe("Tests the function getSaleById in services", () => {
  describe("success cases", () => {
    before(async () => {
      const execute = [
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

      sinon.stub(salesModel, "getSaleById").resolves(execute);
    });

    after(async () => {
      salesModel.getSaleById.restore();
    });

    describe("Once succeeds", () => {
      it("returns an Array, and the status code 200 ", async () => {
        const { code, result } = await salesService.getSaleById(1);

        expect(code).to.be.equal(200);
        expect(result).to.be.a("array");
      });
    });
  });

  describe("fails cases", () => {
    before(async () => {
      const execute = [];

      sinon.stub(salesModel, "getSaleById").resolves(execute);
    });

    after(async () => {
      salesModel.getSaleById.restore();
    });

    describe("Once fails", () => {
      it("returns the status code 404", async () => {
        const { code, result } = await salesService.getSaleById(5);

        expect(code).to.be.equal(404);
        expect(result.message).to.be.equal("Sale not found");
      });
    });
  });
});

describe("Tests the function excludeSale in services", () => {
  describe("success cases", () => {
    before(async () => {
      const response = {};

      const sale = [
        {
          date: "2022-07-04T20:54:41.000Z",
          productId: 1,
          quantity: 5,
        },
        {
          date: "2022-07-04T20:54:41.000Z",
          productId: 2,
          quantity: 10,
        },
      ];

      sinon.stub(salesModel, "excludeSale").resolves(response);

      sinon.stub(salesModel, "getSaleById").resolves(sale);
    });

    after(async () => {
      salesModel.excludeSale.restore();
      salesModel.getSaleById.restore();
    });

    describe("Once succeeds", () => {
      it("returns the right status code", async () => {
        const { code, result } = await salesService.excludeSale(1);

        expect(code).to.be.equal(204);
        expect(result).to.be.undefined;
      });
    });
  });

  describe("fail cases", () => {
    before(async () => {
      const response = {};

      const sale = [];

      sinon.stub(salesModel, "excludeSale").resolves(response);

      sinon.stub(salesModel, "getSaleById").resolves(sale);
    });

    after(async () => {
      salesModel.excludeSale.restore();
      salesModel.getSaleById.restore();
    });

    describe("Validates the request", () => {
      it("productId must exist", async () => {
        const { code, result } = await salesService.excludeSale(5);

        expect(code).to.be.equal(404);
        expect(result.message).to.be.equal("Sale not found");
      });
    });
  });
});

describe("Tests the function updateSale in services", () => {
  describe("Fail cases", () => {
    before(async () => {
      const foudedId = [];

      const products = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
        },
      ];

      sinon.stub(salesModel, "getSaleById").resolves(foudedId);

      sinon.stub(productsModel, "getAll").resolves(products);
    });

    after(async () => {
      salesModel.getSaleById.restore();
      productsModel.getAll.restore();
    });

    describe("Validates the request", () => {
      it('the "productId" can\'t be undefined', async () => {
        const saleInfo = [
          {
            quantity: 5,
          },
        ];

        const { code, result } = await salesService.updateSale(1, saleInfo);

        expect(code).to.be.equal(400);
        expect(result.message).to.be.equal('"productId" is required');
      });

      it("the product must exist", async () => {
        const saleInfo = [
          {
            productId: 4,
            quantity: 5,
          },
        ];
        const { code, result } = await salesService.updateSale(1, saleInfo);

        expect(code).to.be.equal(404);
        expect(result.message).to.be.equal("Product not found");
      });

      it('the "quantity" can\'t be undefined', async () => {
        const saleInfo = [
          {
            productId: 2,
          },
        ];
        const { code, result } = await salesService.updateSale(1, saleInfo);

        expect(code).to.be.equal(400);
        expect(result.message).to.be.equal('"quantity" is required');
      });

      it('the "quantity" can\'t be less than 1', async () => {
        const saleInfo = [
          {
            productId: 2,
            quantity: 0,
          },
        ];
        const { code, result } = await salesService.updateSale(1, saleInfo);

        expect(code).to.be.equal(422);
        expect(result.message).to.be.equal(
          '"quantity" must be greater than or equal to 1'
        );
      });

      it("the sale must exist", async () => {
        const saleInfo = [
          {
            productId: 2,
            quantity: 2,
          },
        ];
        const { code, result } = await salesService.updateSale(5, saleInfo);

        expect(code).to.be.equal(404);
        expect(result.message).to.be.equal("Sale not found");
      });
    });
  });

  describe("Success cases", () => {
    before(async () => {
      const sale = {
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

      const foudedId = [
        {
          date: "2022-07-05T01:48:38.000Z",
          productId: 1,
          quantity: 5,
        },
        {
          date: "2022-07-05T01:48:38.000Z",
          productId: 2,
          quantity: 10,
        },
      ];

      const products = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
        },
      ];

      sinon.stub(salesModel, "getSaleById").resolves(foudedId);

      sinon.stub(productsModel, "getAll").resolves(products);

      sinon.stub(salesModel, "updateSale").resolves(sale);
    });

    after(async () => {
      salesModel.updateSale.restore();
      productsModel.getAll.restore();
      salesModel.getSaleById.restore();
    });

    describe("Once succeeds", () => {
      it("returns the right status code", async () => {
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

        const { code, result } = await salesService.updateSale(1, changes);

        expect(code).to.be.equal(200);
        expect(result).to.be.a("object");
      });
    });
  });
});
