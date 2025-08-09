import { CreateAdminDto } from "../../../../../src/Auth/domain/dtos";
import { z } from "zod";
import {
  mockValidCreateUserRequest,
  mockInvalidCreateUserRequestInvalidPasswordV1,
  mockInvalidCreateUserRequestInvalidPasswordV2,
  mockInvalidCreateUserRequestInvalidPasswordV3,
  mockInvalidCreateUserRequestInvalidPasswordV4,
  mockInvalidCreateUserRequestInvalidUsernameV1,
  mockInvalidCreateUserRequestInvalidUsernameV2,
  mockInvalidCreateUserRequestInvalidUsernameV3,
  mockInvalidCreateUserRequestInvalidUsernameV4,
  mockInvalidCreateUserRequestInvalidUsernameV5,
} from "../../../../helpers/factories/admin-mocks";

describe("CreateAdminDto - Unit Test", () => {
  describe("Basic Validation", () => {
    test("should create a CreateAdminDto with valid data", () => {
      const createAdminDto = CreateAdminDto.create(mockValidCreateUserRequest);
      expect(createAdminDto).toBeInstanceOf(CreateAdminDto);
      expect(createAdminDto.username).toEqual(
        mockValidCreateUserRequest.username
      );
      expect(createAdminDto.password).toEqual(
        mockValidCreateUserRequest.password
      );
    });
    test("should throw an error if data is invalid", () => {
      expect(() =>
        CreateAdminDto.create(mockInvalidCreateUserRequestInvalidUsernameV1)
      ).toThrow(z.ZodError);
      expect(() =>
        CreateAdminDto.create(mockInvalidCreateUserRequestInvalidUsernameV2)
      ).toThrow(z.ZodError);
      expect(() =>
        CreateAdminDto.create(mockInvalidCreateUserRequestInvalidUsernameV3)
      ).toThrow(z.ZodError);
      expect(() =>
        CreateAdminDto.create(mockInvalidCreateUserRequestInvalidUsernameV4)
      ).toThrow(z.ZodError);
      expect(() =>
        CreateAdminDto.create(mockInvalidCreateUserRequestInvalidUsernameV5)
      ).toThrow(z.ZodError);
      expect(() =>
        CreateAdminDto.create(mockInvalidCreateUserRequestInvalidPasswordV1)
      ).toThrow(z.ZodError);
      expect(() =>
        CreateAdminDto.create(mockInvalidCreateUserRequestInvalidPasswordV2)
      ).toThrow(z.ZodError);
      expect(() =>
        CreateAdminDto.create(mockInvalidCreateUserRequestInvalidPasswordV3)
      ).toThrow(z.ZodError);
      expect(() =>
        CreateAdminDto.create(mockInvalidCreateUserRequestInvalidPasswordV4)
      ).toThrow(z.ZodError);
    });
  });
});
