import { NextFunction, Response, Request } from "express";
import { ProductController } from "../../../../../src/Products/presentation/controllers";
import {
  mockValidProductDataRequest,
  mockValidProductDataResponse,
  mockValidProductDataResponseV2,
  mockValidProductDataWithMinimumRequairedFieldsRequest,
} from "../../../../helpers/factories/product-mocks";
import {
  mockCreateProductService,
  mockDeleteProductService,
  mockGetAllProductsService,
  mockGetProductByIdService,
  mockGetProductByNameService,
  mockUpdateProductService,
} from "../../__mocks__/services/MockProductServices";
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

describe("ProductController - Unit Test", () => {
  let productController: ProductController;
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks();
    productController = new ProductController(
      mockCreateProductService,
      mockUpdateProductService,
      mockDeleteProductService,
      mockGetAllProductsService,
      mockGetProductByIdService,
      mockGetProductByNameService
    );

    // Initialize Express mock objects
    mockRequest = MockRequest();
    mockResponse = MockResponse();
    mockNext = jest.fn();
  });

  describe("createProduct", () => {
    describe("Success", () => {
      test("should create a product", async () => {
        mockRequest.body = mockValidProductDataRequest;

        mockCreateProductService.execute.mockResolvedValue(
          mockValidProductDataResponse
        );

        await productController.createProduct(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        // expect(mockCreateProductDto.).toHaveBeenCalled();

        expect(mockCreateProductService.execute).toHaveBeenCalledWith(
          mockValidProductDataRequest
        );

        expect(mockResponse.json).toHaveBeenCalledWith(
          mockValidProductDataResponse
        );
        expect(mockResponse.status).toHaveBeenCalledWith(201);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest.body = mockValidProductDataRequest;

        mockCreateProductService.execute.mockRejectedValue(new Error("Error"));

        await productController.createProduct(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });
  describe("updateProduct", () => {
    describe("Success", () => {
      test("should update a product", async () => {
        mockRequest = MockRequest(
          {
            ...mockValidProductDataWithMinimumRequairedFieldsRequest,
            ...mockValidProductDataRequest,
          },

          { id: mockValidProductDataResponse.id },
          {}
        );
        mockUpdateProductService.execute.mockResolvedValue(
          mockValidProductDataResponse
        );

        await productController.updateProduct(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockUpdateProductService.execute).toHaveBeenCalledWith(
          mockRequest.params?.id as string,
          mockValidProductDataRequest
        );

        expect(mockResponse.json).toHaveBeenCalledWith(
          mockValidProductDataResponse
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {
            ...mockValidProductDataWithMinimumRequairedFieldsRequest,
            ...mockValidProductDataRequest,
          },

          { id: mockValidProductDataResponse.id },
          {}
        );

        mockUpdateProductService.execute.mockRejectedValue(new Error("Error"));

        await productController.updateProduct(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if id is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await productController.updateProduct(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
  describe("deleteProduct", () => {
    describe("Success", () => {
      test("should delete a product", async () => {
        mockRequest = MockRequest(
          {},
          { id: mockValidProductDataResponse.id },
          {}
        );
        mockDeleteProductService.execute.mockResolvedValue(Promise.resolve());

        await productController.deleteProduct(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockDeleteProductService.execute).toHaveBeenCalledWith(
          mockRequest.params?.id as string
        );

        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {},
          { id: mockValidProductDataResponse.id },
          {}
        );

        mockDeleteProductService.execute.mockRejectedValue(new Error("Error"));

        await productController.deleteProduct(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if id is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await productController.deleteProduct(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
  describe("getAllProducts", () => {
    describe("Success", () => {
      test("should get all products", async () => {
        mockGetAllProductsService.execute.mockResolvedValue([
          mockValidProductDataResponseV2,
          mockValidProductDataResponse,
        ]);

        await productController.getAllProducts(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockGetAllProductsService.execute).toHaveBeenCalled();

        expect(mockResponse.json).toHaveBeenCalledWith([
          mockValidProductDataResponseV2,
          mockValidProductDataResponse,
        ]);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
      test("should get All product with options - promotion true", async () => {
        mockRequest = MockRequest(
          {},
          {},
          {
            promotion: "true",
            category: undefined,
            featured: undefined,
            new: undefined,
            skip: undefined,
            take: undefined,
          }
        );
        mockGetAllProductsService.execute.mockResolvedValue([
          {
            ...mockValidProductDataResponse,
            isPromotion: true,
            isFeatured: false,
            isNew: false,
          },
        ]);
        await productController.getAllProducts(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockGetAllProductsService.execute).toHaveBeenCalledWith({
          ...mockRequest.query,
          promotion: true,
        });

        expect(mockResponse.json).toHaveBeenCalledWith([
          {
            ...mockValidProductDataResponse,
            isPromotion: true,
            isFeatured: false,
            isNew: false,
          },
        ]);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });

      test("should get All product with options - new true", async () => {
        mockRequest = MockRequest(
          {},
          {},
          {
            promotion: undefined,
            category: undefined,
            featured: undefined,
            new: "true",
            skip: undefined,
            take: undefined,
          }
        );
        mockGetAllProductsService.execute.mockResolvedValue([
          {
            ...mockValidProductDataResponse,
            isPromotion: false,
            isFeatured: false,
            isNew: true,
          },
        ]);
        await productController.getAllProducts(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockGetAllProductsService.execute).toHaveBeenCalledWith({
          ...mockRequest.query,
          new: true,
        });

        expect(mockResponse.json).toHaveBeenCalledWith([
          {
            ...mockValidProductDataResponse,
            isPromotion: false,
            isFeatured: false,
            isNew: true,
          },
        ]);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
      test("should get All product with options - featured true", async () => {
        mockRequest = MockRequest(
          {},
          {},
          {
            promotion: undefined,
            category: undefined,
            featured: "true",
            new: undefined,
            skip: undefined,
            take: undefined,
          }
        );
        mockGetAllProductsService.execute.mockResolvedValue([
          {
            ...mockValidProductDataResponse,
            isPromotion: false,
            isFeatured: true,
            isNew: false,
          },
        ]);
        await productController.getAllProducts(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockGetAllProductsService.execute).toHaveBeenCalledWith({
          ...mockRequest.query,
          featured: true,
        });

        expect(mockResponse.json).toHaveBeenCalledWith([
          {
            ...mockValidProductDataResponse,
            isPromotion: false,
            isFeatured: true,
            isNew: false,
          },
        ]);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
      test("should get All product with options - category true", async () => {
        mockRequest = MockRequest(
          {},
          {},
          {
            promotion: undefined,
            category: mockValidProductDataResponse.categoryId,
            featured: undefined,
            new: undefined,
            skip: undefined,
            take: undefined,
          }
        );

        mockGetAllProductsService.execute.mockResolvedValue([
          {
            ...mockValidProductDataResponse,
          },
        ]);
        await productController.getAllProducts(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockGetAllProductsService.execute).toHaveBeenCalledWith(
          mockRequest.query
        );

        expect(mockResponse.json).toHaveBeenCalledWith([
          {
            ...mockValidProductDataResponse,
          },
        ]);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockGetAllProductsService.execute.mockRejectedValue(new Error("Error"));

        await productController.getAllProducts(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });
  describe("getProductById", () => {
    describe("Success", () => {
      test("should get product by id", async () => {
        mockRequest = MockRequest(
          {},
          { id: mockValidProductDataResponse.id },
          {}
        );
        mockGetProductByIdService.execute.mockResolvedValue(
          mockValidProductDataResponse
        );
        await productController.getProductById(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockGetProductByIdService.execute).toHaveBeenCalledWith(
          mockRequest.params?.id as string
        );
        expect(mockResponse.json).toHaveBeenCalledWith(
          mockValidProductDataResponse
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {},
          { id: mockValidProductDataResponse.id },
          {}
        );

        mockGetProductByIdService.execute.mockRejectedValue(new Error("Error"));

        await productController.getProductById(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if id is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await productController.getProductById(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
  describe("getProductByName", () => {
    describe("Success", () => {
      test("should get product by name", async () => {
        mockRequest = MockRequest(
          {},
          { name: mockValidProductDataResponse.name },
          {}
        );
        mockGetProductByNameService.execute.mockResolvedValue(
          mockValidProductDataResponse
        );
        await productController.getProductByName(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockGetProductByNameService.execute).toHaveBeenCalledWith(
          mockRequest.params?.name as string
        );
        expect(mockResponse.json).toHaveBeenCalledWith(
          mockValidProductDataResponse
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {},
          { name: mockValidProductDataResponse.name },
          {}
        );

        mockGetProductByNameService.execute.mockRejectedValue(
          new Error("Error")
        );

        await productController.getProductByName(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError.badRequest if name is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await productController.getProductByName(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
});
