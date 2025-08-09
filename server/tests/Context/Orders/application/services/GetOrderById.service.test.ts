import { CustomError } from "../../../../../src/shared/domain/errors";
import { GetOrderByIdService } from "../../../../../src/Orders/application/services";
import { mockOrderRepository } from "../../__mocks__/repositories/MockOrderRepository";
import { mockValidOrderDataResponse } from "../../../../helpers/factories/order-mocks";

describe("GetOrderByIdService - Unit Test", () => {
  let getOrderByIdService: GetOrderByIdService;

  beforeEach(() => {
    jest.clearAllMocks();
    getOrderByIdService = new GetOrderByIdService(mockOrderRepository);
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should get a order successfully", async () => {
        mockOrderRepository.findById.mockResolvedValue(
          mockValidOrderDataResponse
        );
        const result = await getOrderByIdService.execute(
          mockValidOrderDataResponse.id as string
        );
        expect(mockOrderRepository.findById).toHaveBeenCalledWith(
          mockValidOrderDataResponse.id as string
        );
        expect(result).toEqual(mockValidOrderDataResponse);
        expect(result).toHaveProperty("id", mockValidOrderDataResponse.id);
      });
    });
    describe("Failure", () => {
      describe("CustomError", () => {
        test("should throw a CustomError if order does not exist", async () => {
          const orderId = mockValidOrderDataResponse.id as string;
          //Arrange
          mockOrderRepository.findById.mockResolvedValue(null);
          //Act & Assert
          await expect(getOrderByIdService.execute(orderId)).rejects.toThrow(
            CustomError.notFound(`Orden con id "${orderId}" no encontrada`)
          );
          expect(mockOrderRepository.findById).toHaveBeenCalledWith(orderId);
        });
        test("should throw repository error when findById fails", async () => {
          // Arrange
          const orderId = "error-order-789";
          const repositoryError = new Error("Database connection failed");
          mockOrderRepository.findById.mockRejectedValue(repositoryError);

          // Act & Assert
          await expect(getOrderByIdService.execute(orderId)).rejects.toThrow(
            "Database connection failed"
          );

          expect(mockOrderRepository.findById).toHaveBeenCalledWith(orderId);
        });
      });
    });
  });
});
