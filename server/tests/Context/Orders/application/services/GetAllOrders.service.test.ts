import { mockOrderRepository } from "../../__mocks__/repositories/MockOrderRepository";
import { GetAllOrdersService } from "../../../../../src/Orders/application/services";

import { mockValidOrderDataResponse } from "../../../../helpers/factories/order-mocks";
import { Order } from "../../../../../src/Orders/domain/entities/Order.entity";

describe("GetAllOrdersService - Unit Test", () => {
  let getAllOrdersService: GetAllOrdersService;

  beforeEach(() => {
    jest.clearAllMocks();
    getAllOrdersService = new GetAllOrdersService(mockOrderRepository);
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should get all orders successfully", async () => {
        mockOrderRepository.findAll.mockResolvedValue([
          mockValidOrderDataResponse,
          {
            ...mockValidOrderDataResponse,
            id: "2",
          } as Order,
        ]);

        const result = await getAllOrdersService.execute();

        expect(mockOrderRepository.findAll).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Array);
        expect(result).toEqual([
          mockValidOrderDataResponse,
          {
            ...mockValidOrderDataResponse,
            id: "2",
          } as Order,
        ]);
      });
      test("should return an empty array if there are no orders", async () => {
        mockOrderRepository.findAll.mockResolvedValue([]);

        const result = await getAllOrdersService.execute();

        expect(mockOrderRepository.findAll).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Array);
        expect(result).toEqual([]);
      });
    });
    describe("Failure", () => {
      describe("Error", () => {
        test("should throw a Error when database query fails", async () => {
          const errorMessage = "Database connection error";
          mockOrderRepository.findAll.mockRejectedValue(
            new Error(errorMessage)
          );

          await expect(getAllOrdersService.execute()).rejects.toThrow(
            Error(errorMessage)
          );

          expect(mockOrderRepository.findAll).toHaveBeenCalled();
        });
      });
    });
  });
});
