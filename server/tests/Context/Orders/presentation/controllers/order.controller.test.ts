import { NextFunction, Response, Request } from "express";

import { OrderController } from "../../../../../src/Orders/presentation/controllers/Order.controller";

import {
  mockValidOrderDataRequest,
  mockValidOrderDataResponse,
  mockValidOrderDataResponseV2,
} from "../../../../helpers/factories/order-mocks";

import {
  mockCreateOrderService,
  mockDeleteOrderService,
  mockGetAllOrdersService,
  mockGetOrderByIdService,
  mockGetOrdersByCustomerEmailService,
  mockGetOrdersByCustomerNameService,
  mockGetOrdersByCustomerPhoneService,
  mockGetOrdersByProductIdService,
  mockUpdateOrderService,
} from "../../__mocks__/services/MockOrderServices";

import { CustomError } from "../../../../../src/shared/domain/errors";

const MockRequest = (body: any = {}, params: any = {}, query: any = {}) => ({
  body,
  params,
  query,
});

const MockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("OrderController - Unit Test", () => {
  let orderController: OrderController;
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks();
    orderController = new OrderController(
      mockCreateOrderService,
      mockUpdateOrderService,
      mockDeleteOrderService,
      mockGetAllOrdersService,
      mockGetOrderByIdService,
      mockGetOrdersByCustomerEmailService,
      mockGetOrdersByCustomerNameService,
      mockGetOrdersByCustomerPhoneService,
      mockGetOrdersByProductIdService
    );

    // Initialize Express mock objects
    mockRequest = MockRequest();
    mockResponse = MockResponse();
    mockNext = jest.fn();
  });

  describe("createOrder", () => {
    describe("Success", () => {
      test("should create a Order", async () => {
        mockRequest.body = mockValidOrderDataRequest;

        mockCreateOrderService.execute.mockResolvedValue(
          mockValidOrderDataResponse
        );

        await orderController.createOrder(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        // expect(mockCreateOrderDto.).toHaveBeenCalled();

        expect(mockCreateOrderService.execute).toHaveBeenCalledWith(
          mockValidOrderDataRequest
        );

        expect(mockResponse.json).toHaveBeenCalledWith(
          mockValidOrderDataResponse
        );
        expect(mockResponse.status).toHaveBeenCalledWith(201);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest.body = mockValidOrderDataRequest;

        mockCreateOrderService.execute.mockRejectedValue(new Error("Error"));

        await orderController.createOrder(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });
  describe("updateOrder", () => {
    describe("Success", () => {
      test("should update a Order", async () => {
        mockRequest = MockRequest(
          {
            ...mockValidOrderDataRequest,
          },

          { id: mockValidOrderDataResponse.id },
          {}
        );
        mockUpdateOrderService.execute.mockResolvedValue(
          mockValidOrderDataResponse
        );

        await orderController.updateOrder(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockUpdateOrderService.execute).toHaveBeenCalledWith(
          mockRequest.params?.id as string,
          mockValidOrderDataRequest
        );

        expect(mockResponse.json).toHaveBeenCalledWith(
          mockValidOrderDataResponse
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {
            ...mockValidOrderDataRequest,
          },

          { id: mockValidOrderDataResponse.id },
          {}
        );

        mockUpdateOrderService.execute.mockRejectedValue(new Error("Error"));

        await orderController.updateOrder(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if id is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await orderController.updateOrder(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
  describe("deleteOrder", () => {
    describe("Success", () => {
      test("should delete a Order", async () => {
        mockRequest = MockRequest(
          {},
          { id: mockValidOrderDataResponse.id },
          {}
        );
        mockDeleteOrderService.execute.mockResolvedValue(Promise.resolve());

        await orderController.deleteOrder(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockDeleteOrderService.execute).toHaveBeenCalledWith(
          mockRequest.params?.id as string
        );

        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {},
          { id: mockValidOrderDataResponse.id },
          {}
        );

        mockDeleteOrderService.execute.mockRejectedValue(new Error("Error"));

        await orderController.deleteOrder(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if id is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await orderController.deleteOrder(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
  describe("getAllOrders", () => {
    describe("Success", () => {
      test("should get all Orders", async () => {
        mockGetAllOrdersService.execute.mockResolvedValue([
          mockValidOrderDataResponseV2,
          mockValidOrderDataResponse,
        ]);

        await orderController.getAllOrders(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockGetAllOrdersService.execute).toHaveBeenCalled();

        expect(mockResponse.json).toHaveBeenCalledWith([
          mockValidOrderDataResponseV2,
          mockValidOrderDataResponse,
        ]);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockGetAllOrdersService.execute.mockRejectedValue(new Error("Error"));

        await orderController.getAllOrders(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });
  describe("getOrderById", () => {
    describe("Success", () => {
      test("should get Order by id", async () => {
        mockRequest = MockRequest(
          {},
          { id: mockValidOrderDataResponse.id },
          {}
        );
        mockGetOrderByIdService.execute.mockResolvedValue(
          mockValidOrderDataResponse
        );
        await orderController.getOrderById(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockGetOrderByIdService.execute).toHaveBeenCalledWith(
          mockRequest.params?.id as string
        );
        expect(mockResponse.json).toHaveBeenCalledWith(
          mockValidOrderDataResponse
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {},
          { id: mockValidOrderDataResponse.id },
          {}
        );

        mockGetOrderByIdService.execute.mockRejectedValue(new Error("Error"));

        await orderController.getOrderById(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if id is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await orderController.getOrderById(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
  describe("getOrdersByCustomerName", () => {
    describe("Success", () => {
      test("should gets Orders by customer name", async () => {
        mockRequest = MockRequest(
          {},
          { customerName: mockValidOrderDataResponse.customerName },
          {}
        );
        mockGetOrdersByCustomerNameService.execute.mockResolvedValue([
          mockValidOrderDataResponse,
        ]);
        await orderController.getOrdersByCustomerName(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockGetOrdersByCustomerNameService.execute).toHaveBeenCalledWith(
          mockRequest.params?.customerName as string
        );
        expect(mockResponse.json).toHaveBeenCalledWith([
          mockValidOrderDataResponse,
        ]);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {},
          { customerName: mockValidOrderDataResponse.customerName },
          {}
        );

        mockGetOrdersByCustomerNameService.execute.mockRejectedValue(
          new Error("Error")
        );

        await orderController.getOrdersByCustomerName(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if customerName is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await orderController.getOrdersByCustomerName(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });

  describe("getOrdersByCustomerPhone", () => {
    describe("Success", () => {
      test("should gets Orders by customer phone", async () => {
        mockRequest = MockRequest(
          {},
          { customerPhone: mockValidOrderDataResponse.customerPhone },
          {}
        );
        mockGetOrdersByCustomerPhoneService.execute.mockResolvedValue([
          mockValidOrderDataResponse,
        ]);
        await orderController.getOrdersByCustomerPhone(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(
          mockGetOrdersByCustomerPhoneService.execute
        ).toHaveBeenCalledWith(mockRequest.params?.customerPhone as string);
        expect(mockResponse.json).toHaveBeenCalledWith([
          mockValidOrderDataResponse,
        ]);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {},
          { customerPhone: mockValidOrderDataResponse.customerPhone },
          {}
        );

        mockGetOrdersByCustomerPhoneService.execute.mockRejectedValue(
          new Error("Error")
        );

        await orderController.getOrdersByCustomerPhone(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if customerPhone is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await orderController.getOrdersByCustomerPhone(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });

  describe("getOrdersByProductId", () => {
    describe("Success", () => {
      test("should gets Orders by product id", async () => {
        mockRequest = MockRequest({}, { productId: "1" }, {});
        mockGetOrdersByProductIdService.execute.mockResolvedValue([
          mockValidOrderDataResponse,
        ]);
        await orderController.getOrdersByProductId(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockGetOrdersByProductIdService.execute).toHaveBeenCalledWith(
          mockRequest.params?.productId as string
        );
        expect(mockResponse.json).toHaveBeenCalledWith([
          mockValidOrderDataResponse,
        ]);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest({}, { productId: "1" }, {});

        mockGetOrdersByProductIdService.execute.mockRejectedValue(
          new Error("Error")
        );

        await orderController.getOrdersByProductId(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if productId is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await orderController.getOrdersByProductId(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
});
