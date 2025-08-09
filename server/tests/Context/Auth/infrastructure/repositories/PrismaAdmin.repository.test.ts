import { mockAdminRepository } from "../../__mocks__/repositories/MockAdminRepository";
import {
  mockValidCreateUserRequest,
  mockCreateUserDbResponse,
} from "../../../../helpers/factories/admin-mocks";
import { mock } from "node:test";

describe("PrismaProductRepository - Unit Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    describe("Success", () => {
      test("should create a admin", async () => {
        mockAdminRepository.create.mockResolvedValue(mockCreateUserDbResponse);

        const admin = await mockAdminRepository.create({
          id: null,
          username: mockValidCreateUserRequest.username,
          password: mockValidCreateUserRequest.password,
        });
        expect(admin).toEqual(mockCreateUserDbResponse);
        expect(admin).toHaveProperty("id");
      });
    });
    describe("Failure", () => {
      test("should throw error when admin creation fails", async () => {
        const errorMessage = "Database connection error";
        mockAdminRepository.create.mockRejectedValue(new Error(errorMessage));

        await expect(
          mockAdminRepository.create({
            id: null,
            username: mockValidCreateUserRequest.username,
            password: mockValidCreateUserRequest.password,
          })
        ).rejects.toThrow(errorMessage);
      });
      test("should throw error when required fields are missing", async () => {
        mockAdminRepository.create.mockRejectedValue(
          new Error("Username and password are required")
        );

        await expect(
          mockAdminRepository.create({
            id: null,
            username: "",
            password: "",
          })
        ).rejects.toThrow("Username and password are required");
      });
    });
  });
  describe("findAdminByUsername", () => {
    describe("Success", () => {
      test("should find a admin", async () => {
        mockAdminRepository.findAdminByUsername.mockResolvedValue(
          mockCreateUserDbResponse
        );

        const admin = await mockAdminRepository.findAdminByUsername(
          mockValidCreateUserRequest.username
        );
        expect(admin).toEqual(mockCreateUserDbResponse);
        expect(admin).toHaveProperty("id");
        expect(admin?.username).toEqual(mockValidCreateUserRequest.username);
      });
      test("should get a null if admin by username not exist", async () => {
        mockAdminRepository.findAdminByUsername.mockResolvedValue(null);

        const admin = await mockAdminRepository.findAdminByUsername(
          mockValidCreateUserRequest.username
        );
        expect(admin).toBeNull();
      });
    });
    describe("Failure", () => {
      test("should throw error when admin findByUsername fails", async () => {
        const errorMessage = "Database connection error";
        mockAdminRepository.findAdminByUsername.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          mockAdminRepository.findAdminByUsername(
            mockValidCreateUserRequest.username
          )
        ).rejects.toThrow(errorMessage);
      });
      test("should throw error when username are missing", async () => {
        mockAdminRepository.findAdminByUsername.mockRejectedValue(
          new Error("Username is required")
        );
        await expect(
          mockAdminRepository.findAdminByUsername("")
        ).rejects.toThrow("Username is required");
      });
    });
  });
  describe("deleteByUsername", () => {
    describe("Success", () => {
      test("should delete a admin", async () => {
        mockAdminRepository.deleteByUsername.mockResolvedValue(
          Promise.resolve()
        );

        const admin = await mockAdminRepository.deleteByUsername(
          mockValidCreateUserRequest.username
        );
        expect(admin).toBeUndefined();
      });
    });
    describe("Failure", () => {
      test("should throw error when admin deletion fails", async () => {
        const errorMessage = "Database connection error";
        mockAdminRepository.deleteByUsername.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          mockAdminRepository.deleteByUsername(
            mockValidCreateUserRequest.username
          )
        ).rejects.toThrow(errorMessage);
      });
      test("should throw error when trying to delete non-existent admin", async () => {
        mockAdminRepository.deleteByUsername.mockRejectedValue(
          new Error("Record to delete does not exist")
        );

        await expect(
          mockAdminRepository.deleteByUsername("non-existent-username")
        ).rejects.toThrow("Record to delete does not exist");
      });
      test("should throw error when username are missing", async () => {
        mockAdminRepository.deleteByUsername.mockRejectedValue(
          new Error("Username is required")
        );
        await expect(mockAdminRepository.deleteByUsername("")).rejects.toThrow(
          "Username is required"
        );
      });
    });
  });
});
