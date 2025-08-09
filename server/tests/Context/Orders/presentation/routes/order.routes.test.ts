import { createServer } from "../../../../../src/server";
import { Express } from "express";
import { AuthenticatedRequestHelper } from "../../../../helpers/auth/authenticatedRequestHelper";
import { PrismaClient } from "../../../../../src/generated/prisma";
import {
  mockValidOrderDataRequest,
  mockValidOrderDataResponse,
  mockValidOrderDataResponseV2,
} from "../../../../helpers/factories/order-mocks";
import { mockAdminRepository } from "../../../Auth/__mocks__/repositories/MockAdminRepository";

import {
  mockCreateOrderService,
  mockUpdateOrderService,
  mockDeleteOrderService,
  mockGetAllOrdersService,
  mockGetOrderByIdService,
  mockGetOrdersByCustomerEmailService,
  mockGetOrdersByCustomerNameService,
  mockGetOrdersByCustomerPhoneService,
  mockGetOrdersByProductIdService,
} from "../../__mocks__/services/MockOrderServices";
import { CustomError } from "../../../../../src/shared/domain/errors";

jest.mock(
  "../../../../../src/shared/infrastructure/adapters/jwt.adapter",
  () => ({
    JwtAdapter: {
      validateToken: jest.fn(),
    },
  })
);

jest.mock("../../../../../src/Orders/application/services", () => ({
  CreateOrderService: jest.fn(() => mockCreateOrderService),
  UpdateOrderService: jest.fn(() => mockUpdateOrderService),
  DeleteOrderService: jest.fn(() => mockDeleteOrderService),
  GetAllOrdersService: jest.fn(() => mockGetAllOrdersService),
  GetOrderByIdService: jest.fn(() => mockGetOrderByIdService),
  GetOrdersByCustomerEmailService: jest.fn(
    () => mockGetOrdersByCustomerEmailService
  ),
  GetOrdersByCustomerNameService: jest.fn(
    () => mockGetOrdersByCustomerNameService
  ),
  GetOrdersByCustomerPhoneService: jest.fn(
    () => mockGetOrdersByCustomerPhoneService
  ),
  GetOrdersByProductIdService: jest.fn(() => mockGetOrdersByProductIdService),
}));

jest.mock(
  "../../../../../src/Auth/infrastructure/repositories/PrismaAdmin.repository.impl",
  () => ({
    PrismaAdminRepositoryImpl: jest.fn(() => mockAdminRepository),
  })
);

jest.mock(
  "../../../../../src/Orders/infrastructure/repositories/PrismaOrder.repository.impl",
  () => ({
    PrismaOrderRepositoryImpl: jest.fn(),
  })
);

jest.mock(
  "../../../../../src/Orders/infrastructure/adapters/OrderSendMessageToCustomer.impl",
  () => ({
    OrderSendMessageToCustomer: jest.fn(),
  })
);

describe("Order Routes", () => {
  let app: Express;
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
    app = createServer();
  });

  beforeEach(() => {
    //Configuracion mocks base antes de cada test
    AuthenticatedRequestHelper.cleanup();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST", () => {
    describe("Success", () => {
      test("should create an Order successfully", async () => {
        mockCreateOrderService.execute.mockResolvedValue(
          mockValidOrderDataResponse
        );

        const response =
          await AuthenticatedRequestHelper.unauthenticatedRequest(app)
            .post("/api/orders")
            .send(mockValidOrderDataRequest);

        expect(mockCreateOrderService.execute).toHaveBeenCalled();
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.customerName).toBe(
          mockValidOrderDataRequest.customerName
        );
        expect(response.body).toEqual({
          ...mockValidOrderDataResponse,
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        });
      });
    });
    describe("Failure", () => {
      test("should return 400 if validation fails", async () => {
        const response =
          await AuthenticatedRequestHelper.unauthenticatedRequest(app)
            .post("/api/orders")
            .send({});

        expect(response.status).toBe(400);
      });
      test("should return 500 if create Order service fails", async () => {
        mockCreateOrderService.execute.mockRejectedValue(new Error("Error"));
        const response =
          await AuthenticatedRequestHelper.unauthenticatedRequest(app)
            .post("/api/orders")
            .send(mockValidOrderDataRequest);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
      });
    });
  });

  describe("PUT", () => {
    describe("Success", () => {
      test("should update an Order successfully", async () => {
        mockUpdateOrderService.execute.mockResolvedValue(
          mockValidOrderDataResponse
        );

        const response = await AuthenticatedRequestHelper.authenticatedPut(
          app,
          "/api/orders/:id"
        ).send(mockValidOrderDataRequest);

        expect(mockUpdateOrderService.execute).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.customerName).toBe(
          mockValidOrderDataRequest.customerName
        );
        expect(response.body).toEqual({
          ...mockValidOrderDataResponse,
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        });
      });
    });
    describe("Failure", () => {
      test("should return 401 if not authenticated", async () => {
        const response =
          await AuthenticatedRequestHelper.unauthenticatedRequest(app)
            .put("/api/orders/:id")
            .send(mockValidOrderDataRequest);

        expect(response.status).toBe(401);
      });
      test("should return 400 if validation fails", async () => {
        const response = await AuthenticatedRequestHelper.authenticatedPut(
          app,
          "/api/orders/:id"
        ).send({});

        expect(response.status).toBe(400);
      });
      test("should return 500 if update Order service fails", async () => {
        mockUpdateOrderService.execute.mockRejectedValue(new Error("Error"));
        const response = await AuthenticatedRequestHelper.authenticatedPut(
          app,
          "/api/orders/:id"
        ).send(mockValidOrderDataRequest);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
      });
      test("should return 404 if Order by id does not exist", async () => {
        mockUpdateOrderService.execute.mockRejectedValue(
          CustomError.notFound("Order not found")
        );
        const response = await AuthenticatedRequestHelper.authenticatedPut(
          app,
          "/api/orders/:id"
        ).send(mockValidOrderDataRequest);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Order not found");
      });
    });
  });

  describe("DELETE", () => {
    describe("Success", () => {
      test("should delete an Order successfully", async () => {
        mockDeleteOrderService.execute.mockResolvedValue(Promise.resolve());

        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/orders/:id"
        );

        expect(mockDeleteOrderService.execute).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          message: "Order deleted successfully",
        });
      });
    });
    describe("Failure", () => {
      test("should return 401 if not authenticated", async () => {
        const response =
          await AuthenticatedRequestHelper.unauthenticatedRequest(app).delete(
            "/api/orders/:id"
          );

        expect(response.status).toBe(401);
      });
      test("should return 500 if delete Order service fails", async () => {
        mockDeleteOrderService.execute.mockRejectedValue(new Error("Error"));
        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/orders/:id"
        ).send(mockValidOrderDataRequest);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
      });
      test("should return 404 if Order not found", async () => {
        mockDeleteOrderService.execute.mockRejectedValue(
          CustomError.notFound("Order not found")
        );
        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/orders/:id"
        ).send(mockValidOrderDataRequest);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Order not found");
      });
    });
  });

  describe("GET", () => {
    describe("GET ALL", () => {
      describe("Success", () => {
        test("should get all Orders successfully", async () => {
          mockGetAllOrdersService.execute.mockResolvedValue([
            mockValidOrderDataResponse,
            mockValidOrderDataResponseV2,
          ]);

          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            "/api/orders"
          );

          expect(mockGetAllOrdersService.execute).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body[0]).toHaveProperty("id");
          expect(response.body[0].customerName).toBe(
            mockValidOrderDataRequest.customerName
          );
        });
      });
      describe("Failure", () => {
        test("should return 401 if not authenticated", async () => {
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/orders"
            );

          expect(response.status).toBe(401);
        });
        test("should return 500 if get all Orders service fails", async () => {
          mockGetAllOrdersService.execute.mockRejectedValue(new Error("Error"));
          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            "/api/orders"
          );
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
      });
    });

    describe("GET BY ID", () => {
      describe("Success", () => {
        test("should get Order by id successfully", async () => {
          mockGetOrderByIdService.execute.mockResolvedValue(
            mockValidOrderDataResponse
          );

          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            `/api/orders/${mockValidOrderDataResponse.id}`
          );

          expect(mockGetOrderByIdService.execute).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("id");
          expect(response.body.id).toBe(mockValidOrderDataResponse.id);
        });
      });
      describe("Failure", () => {
        test("should return 401 if not authenticated", async () => {
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/orders/:id"
            );

          expect(response.status).toBe(401);
        });
        test("should return 500 if get Order by id service fails", async () => {
          mockGetOrderByIdService.execute.mockRejectedValue(new Error("Error"));
          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            "/api/orders/:id"
          );
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
        test("should return 404 if Order by id does not exist", async () => {
          mockGetOrderByIdService.execute.mockRejectedValue(
            CustomError.notFound("Order not found")
          );
          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            "/api/orders/:id"
          );
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Order not found");
        });
      });
    });

    describe("GET BY CUSTOMER EMAIL", () => {
      describe("Success", () => {
        test("should get Orders by customer email successfully", async () => {
          mockGetOrdersByCustomerEmailService.execute.mockResolvedValue([
            mockValidOrderDataResponse,
          ]);

          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            `/api/orders/customerEmail/${mockValidOrderDataResponse.customerEmail}`
          );

          expect(
            mockGetOrdersByCustomerEmailService.execute
          ).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body[0]).toHaveProperty("id");
          expect(response.body[0].customerEmail).toBe(
            mockValidOrderDataResponse.customerEmail
          );
        });
      });
      describe("Failure", () => {
        test("should return 401 if not authenticated", async () => {
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/orders/customerEmail/:customerEmail"
            );

          expect(response.status).toBe(401);
        });
        test("should return 500 if get Orders by customer email service fails", async () => {
          mockGetOrdersByCustomerEmailService.execute.mockRejectedValue(
            new Error("Error")
          );
          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            "/api/orders/customerEmail/:customerEmail"
          );
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
        test("should return 404 if no Orders found by customer email", async () => {
          mockGetOrdersByCustomerEmailService.execute.mockRejectedValue(
            CustomError.notFound("No orders found for customer email")
          );

          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            `/api/orders/customerEmail/non-existent@email.com`
          );

          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe(
            "No orders found for customer email"
          );
        });
      });
    });

    describe("GET BY CUSTOMER NAME", () => {
      describe("Success", () => {
        test("should get Orders by customer name successfully", async () => {
          mockGetOrdersByCustomerNameService.execute.mockResolvedValue([
            mockValidOrderDataResponse,
          ]);

          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            `/api/orders/customerName/${mockValidOrderDataResponse.customerName}`
          );

          expect(mockGetOrdersByCustomerNameService.execute).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body[0]).toHaveProperty("id");
          expect(response.body[0].customerName).toBe(
            mockValidOrderDataResponse.customerName
          );
        });
      });
      describe("Failure", () => {
        test("should return 401 if not authenticated", async () => {
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/orders/customerName/:customerName"
            );

          expect(response.status).toBe(401);
        });
        test("should return 500 if get Orders by customer name service fails", async () => {
          mockGetOrdersByCustomerNameService.execute.mockRejectedValue(
            new Error("Error")
          );
          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            "/api/orders/customerName/:customerName"
          );
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
        test("should return 404 if no Orders found by customer name", async () => {
          mockGetOrdersByCustomerNameService.execute.mockRejectedValue(
            CustomError.notFound("No orders found for customer name")
          );

          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            `/api/orders/customerName/non-existent-name`
          );

          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe(
            "No orders found for customer name"
          );
        });
      });
    });

    describe("GET BY CUSTOMER PHONE", () => {
      describe("Success", () => {
        test("should get Orders by customer phone successfully", async () => {
          mockGetOrdersByCustomerPhoneService.execute.mockResolvedValue([
            mockValidOrderDataResponse,
          ]);

          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            `/api/orders/customerPhone/${mockValidOrderDataResponse.customerPhone}`
          );

          expect(
            mockGetOrdersByCustomerPhoneService.execute
          ).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body[0]).toHaveProperty("id");
          expect(response.body[0].customerPhone).toBe(
            mockValidOrderDataResponse.customerPhone
          );
        });
      });
      describe("Failure", () => {
        test("should return 401 if not authenticated", async () => {
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/orders/customerPhone/:customerPhone"
            );

          expect(response.status).toBe(401);
        });
        test("should return 500 if get Orders by customer phone service fails", async () => {
          mockGetOrdersByCustomerPhoneService.execute.mockRejectedValue(
            new Error("Error")
          );
          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            "/api/orders/customerPhone/:customerPhone"
          );
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
        test("should return 404 if no Orders found by customer phone", async () => {
          mockGetOrdersByCustomerPhoneService.execute.mockRejectedValue(
            CustomError.notFound("No orders found for customer phone")
          );

          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            `/api/orders/customerPhone/999999999`
          );

          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe(
            "No orders found for customer phone"
          );
        });
      });
    });

    describe("GET BY PRODUCT ID", () => {
      describe("Success", () => {
        test("should get Orders by product id successfully", async () => {
          mockGetOrdersByProductIdService.execute.mockResolvedValue([
            mockValidOrderDataResponse,
          ]);

          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            `/api/orders/productId/product-123`
          );

          expect(mockGetOrdersByProductIdService.execute).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body[0]).toHaveProperty("id");
        });
      });
      describe("Failure", () => {
        test("should return 401 if not authenticated", async () => {
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/orders/productId/:productId"
            );

          expect(response.status).toBe(401);
        });
        test("should return 500 if get Orders by product id service fails", async () => {
          mockGetOrdersByProductIdService.execute.mockRejectedValue(
            new Error("Error")
          );
          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            "/api/orders/productId/:productId"
          );
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
        test("should return 404 if no Orders found by product id", async () => {
          mockGetOrdersByProductIdService.execute.mockRejectedValue(
            CustomError.notFound("No orders found for product id")
          );

          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            `/api/orders/productId/non-existent-product`
          );

          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("No orders found for product id");
        });
      });
    });
  });
});
