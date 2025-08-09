import { UpdateOrderService } from "../../../../../src/Orders/application/services";
import { mockOrderRepository } from "../../__mocks__/repositories/MockOrderRepository";
import { CustomError } from "../../../../../src/shared/domain/errors";
import {
  mockValidOrderDataRequest,
  mockValidOrderDataRequestToOrderType,
  mockValidOrderDataResponse,
} from "../../../../helpers/factories/order-mocks";
import { Order } from "../../../../../src/Orders/domain/entities/Order.entity";
describe("UpdateOrderService - Unit Test", () => {
  let updateOrderService: UpdateOrderService;

  beforeEach(() => {
    jest.clearAllMocks();
    updateOrderService = new UpdateOrderService(mockOrderRepository);
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should update a order successfully", async () => {
        const updatedOrderRes = {
          ...mockValidOrderDataResponse,
          customerName: "jorgito",
        } as Order;

        const updatedOrder = {
          ...mockValidOrderDataRequest,
          customerName: "jorgito",
        };
        const updatedOrderToOrderType = {
          ...mockValidOrderDataRequestToOrderType,

          id: mockValidOrderDataResponse.id as string,
          customerName: "jorgito",
        };
        updatedOrderToOrderType.products[0].orderId =
          mockValidOrderDataResponse.id as string;

        //Arrange
        mockOrderRepository.findById.mockResolvedValue(
          mockValidOrderDataResponse
        );
        mockOrderRepository.update.mockResolvedValue(updatedOrderRes);
        //Act
        const result = await updateOrderService.execute(
          mockValidOrderDataResponse.id as string,
          updatedOrder
        );
        //Assert
        expect(mockOrderRepository.findById).toHaveBeenCalledWith(
          mockValidOrderDataResponse.id as string
        );
        expect(mockOrderRepository.update).toHaveBeenCalledWith(
          mockValidOrderDataResponse.id as string,
          expect.objectContaining({
            ...updatedOrderToOrderType,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          } as Order)
        );
        expect(result).toEqual(updatedOrderRes);
      });
    });

    describe("Failure", () => {
      test("should throw a CustomError if order to update does not exist", async () => {
        //Arrange
        mockOrderRepository.findById.mockResolvedValue(null);
        //Act & Assert
        await expect(
          updateOrderService.execute(
            mockValidOrderDataResponse.id as string,
            mockValidOrderDataRequest
          )
        ).rejects.toThrow(
          CustomError.notFound("Orden a actualizar no encontrada")
        );
        expect(mockOrderRepository.findById).toHaveBeenCalledWith(
          mockValidOrderDataResponse.id as string
        );
        expect(mockOrderRepository.update).not.toHaveBeenCalled();
      });
      test("should throw a Error if bd update fails", async () => {
        const updatedOrder = {
          ...mockValidOrderDataRequest,
          customerName: "jorgito",
        };
        const updatedOrderToOrderType = {
          ...mockValidOrderDataRequestToOrderType,
          id: mockValidOrderDataResponse.id as string,
          customerName: "jorgito",
        };
        updatedOrderToOrderType.products[0].orderId =
          mockValidOrderDataResponse.id as string;

        //Arrange
        mockOrderRepository.findById.mockResolvedValue(
          mockValidOrderDataResponse
        );
        mockOrderRepository.update.mockRejectedValue(
          new Error("Database error")
        );
        //Act & Assert
        await expect(
          updateOrderService.execute(
            mockValidOrderDataResponse.id as string,
            updatedOrder
          )
        ).rejects.toThrow("Database error");
        expect(mockOrderRepository.findById).toHaveBeenCalledWith(
          mockValidOrderDataResponse.id as string
        );
        expect(mockOrderRepository.update).toHaveBeenCalledWith(
          mockValidOrderDataResponse.id as string,
          expect.objectContaining({
            ...updatedOrderToOrderType,
            customerName: "jorgito",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          } as Order)
        );
      });
      test("should throw a Error if db findById fails", async () => {
        //Arrange
        mockOrderRepository.findById.mockRejectedValue(
          new Error("Database error")
        );
        //Act & Assert
        await expect(
          updateOrderService.execute(
            mockValidOrderDataResponse.id as string,
            mockValidOrderDataRequest
          )
        ).rejects.toThrow("Database error");
        expect(mockOrderRepository.findById).toHaveBeenCalledWith(
          mockValidOrderDataResponse.id as string
        );
        expect(mockOrderRepository.update).not.toHaveBeenCalled();
      });
    });
  });
});
