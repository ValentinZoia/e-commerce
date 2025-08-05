import { NextFunction, Response, Request } from "express";
import { CategoryController } from "../../../../../src/Categories/presentation/controllers";
import {
  mockValidCategoryDataRequest,
  mockValidCategoryDataResponse,
  mockValidCategoryDataResponseV2,
} from "../../../../helpers/factories/category-mocks";
import {
  mockCreateCategoryService,
  mockDeleteCategoryService,
  mockGetAllCategoriesService,
  mockGetCategoryByIdService,
  mockGetCategoryByNameService,
  mockUpdateCategoryService,
} from "../../__mocks__/services/MockCategoryServices";
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

describe("CategoryController - Unit Test", () => {
  let categoryController: CategoryController;
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks();
    categoryController = new CategoryController(
      mockCreateCategoryService,
      mockUpdateCategoryService,
      mockDeleteCategoryService,
      mockGetAllCategoriesService,
      mockGetCategoryByIdService,
      mockGetCategoryByNameService
    );

    // Initialize Express mock objects
    mockRequest = MockRequest();
    mockResponse = MockResponse();
    mockNext = jest.fn();
  });

  describe("createCategory", () => {
    describe("Success", () => {
      test("should create a Category", async () => {
        mockRequest.body = mockValidCategoryDataRequest;

        mockCreateCategoryService.execute.mockResolvedValue(
          mockValidCategoryDataResponse
        );

        await categoryController.createCategory(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        // expect(mockCreateCategoryDto.).toHaveBeenCalled();

        expect(mockCreateCategoryService.execute).toHaveBeenCalledWith(
          mockValidCategoryDataRequest
        );

        expect(mockResponse.json).toHaveBeenCalledWith(
          mockValidCategoryDataResponse
        );
        expect(mockResponse.status).toHaveBeenCalledWith(201);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest.body = mockValidCategoryDataRequest;

        mockCreateCategoryService.execute.mockRejectedValue(new Error("Error"));

        await categoryController.createCategory(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });
  describe("updateCategory", () => {
    describe("Success", () => {
      test("should update a Category", async () => {
        mockRequest = MockRequest(
          {
            ...mockValidCategoryDataRequest,
          },

          { id: mockValidCategoryDataResponse.id },
          {}
        );
        mockUpdateCategoryService.execute.mockResolvedValue(
          mockValidCategoryDataResponse
        );

        await categoryController.updateCategory(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockUpdateCategoryService.execute).toHaveBeenCalledWith(
          mockRequest.params?.id as string,
          mockValidCategoryDataRequest
        );

        expect(mockResponse.json).toHaveBeenCalledWith(
          mockValidCategoryDataResponse
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {
            ...mockValidCategoryDataRequest,
          },

          { id: mockValidCategoryDataResponse.id },
          {}
        );

        mockUpdateCategoryService.execute.mockRejectedValue(new Error("Error"));

        await categoryController.updateCategory(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if id is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await categoryController.updateCategory(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
  describe("deleteCategory", () => {
    describe("Success", () => {
      test("should delete a Category", async () => {
        mockRequest = MockRequest(
          {},
          { id: mockValidCategoryDataResponse.id },
          {}
        );
        mockDeleteCategoryService.execute.mockResolvedValue(Promise.resolve());

        await categoryController.deleteCategory(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockDeleteCategoryService.execute).toHaveBeenCalledWith(
          mockRequest.params?.id as string
        );

        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {},
          { id: mockValidCategoryDataResponse.id },
          {}
        );

        mockDeleteCategoryService.execute.mockRejectedValue(new Error("Error"));

        await categoryController.deleteCategory(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if id is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await categoryController.deleteCategory(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
  describe("getAllCategorys", () => {
    describe("Success", () => {
      test("should get all Categorys", async () => {
        mockGetAllCategoriesService.execute.mockResolvedValue([
          mockValidCategoryDataResponseV2,
          mockValidCategoryDataResponse,
        ]);

        await categoryController.getAllCategories(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockGetAllCategoriesService.execute).toHaveBeenCalled();

        expect(mockResponse.json).toHaveBeenCalledWith([
          mockValidCategoryDataResponseV2,
          mockValidCategoryDataResponse,
        ]);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockGetAllCategoriesService.execute.mockRejectedValue(
          new Error("Error")
        );

        await categoryController.getAllCategories(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });
  describe("getCategoryById", () => {
    describe("Success", () => {
      test("should get Category by id", async () => {
        mockRequest = MockRequest(
          {},
          { id: mockValidCategoryDataResponse.id },
          {}
        );
        mockGetCategoryByIdService.execute.mockResolvedValue(
          mockValidCategoryDataResponse
        );
        await categoryController.getCategoryById(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockGetCategoryByIdService.execute).toHaveBeenCalledWith(
          mockRequest.params?.id as string
        );
        expect(mockResponse.json).toHaveBeenCalledWith(
          mockValidCategoryDataResponse
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {},
          { id: mockValidCategoryDataResponse.id },
          {}
        );

        mockGetCategoryByIdService.execute.mockRejectedValue(
          new Error("Error")
        );

        await categoryController.getCategoryById(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if id is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await categoryController.getCategoryById(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
  describe("getCategoryByName", () => {
    describe("Success", () => {
      test("should get Category by name", async () => {
        mockRequest = MockRequest(
          {},
          { name: mockValidCategoryDataResponse.name },
          {}
        );
        mockGetCategoryByNameService.execute.mockResolvedValue(
          mockValidCategoryDataResponse
        );
        await categoryController.getCategoryByName(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockGetCategoryByNameService.execute).toHaveBeenCalledWith(
          mockRequest.params?.name as string
        );
        expect(mockResponse.json).toHaveBeenCalledWith(
          mockValidCategoryDataResponse
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest = MockRequest(
          {},
          { name: mockValidCategoryDataResponse.name },
          {}
        );

        mockGetCategoryByNameService.execute.mockRejectedValue(
          new Error("Error")
        );

        await categoryController.getCategoryByName(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError.badRequest if name is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await categoryController.getCategoryByName(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
});
