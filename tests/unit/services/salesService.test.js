const sinon = require("sinon");
const { expect } = require("chai");

const { salesModel, productsModel } = require("../../../models");
const { salesService } = require("../../../services");

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
      expect(result.message).to.be.equal('"quantity" must be greater than or equal to 1');
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
    const saleInfo =   [
      {
        "productId": 3,
        "quantity": 5
      },
      {
        "productId": 2,
        "quantity":5
      }
    ]
  
    it("Returns an object", async () => {
      const { code, result } = await salesService.addSale(saleInfo);

      expect(code).to.be.equal(201)
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
    it('returns an Array', async () => {
      const { code, result } = await salesService.getAllSales();

      expect(code).to.be.equal(200);
    });
  });
});
