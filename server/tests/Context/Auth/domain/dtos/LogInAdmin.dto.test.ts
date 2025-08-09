import { LoginAdminDto } from "../../../../../src/Auth/domain/dtos";
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

describe("LoginAdminDto - Unit Test", () => {
  describe("Basic Validation", () => {
    test("should create a LoginAdminDto with valid data", () => {
      const loginAdminDto = LoginAdminDto.create(mockValidCreateUserRequest);
      expect(loginAdminDto).toBeInstanceOf(LoginAdminDto);
      expect(loginAdminDto.username).toEqual(
        mockValidCreateUserRequest.username
      );
      expect(loginAdminDto.password).toEqual(
        mockValidCreateUserRequest.password
      );
    });
    test("should throw an error if data is invalid", () => {
      expect(() =>
        LoginAdminDto.create(mockInvalidCreateUserRequestInvalidUsernameV1)
      ).toThrow(z.ZodError);
      expect(() =>
        LoginAdminDto.create(mockInvalidCreateUserRequestInvalidUsernameV2)
      ).toThrow(z.ZodError);
      expect(() =>
        LoginAdminDto.create(mockInvalidCreateUserRequestInvalidUsernameV3)
      ).toThrow(z.ZodError);
      expect(() =>
        LoginAdminDto.create(mockInvalidCreateUserRequestInvalidUsernameV4)
      ).toThrow(z.ZodError);
      expect(() =>
        LoginAdminDto.create(mockInvalidCreateUserRequestInvalidUsernameV5)
      ).toThrow(z.ZodError);
      expect(() =>
        LoginAdminDto.create(mockInvalidCreateUserRequestInvalidPasswordV1)
      ).toThrow(z.ZodError);
      expect(() =>
        LoginAdminDto.create(mockInvalidCreateUserRequestInvalidPasswordV2)
      ).toThrow(z.ZodError);
      expect(() =>
        LoginAdminDto.create(mockInvalidCreateUserRequestInvalidPasswordV3)
      ).toThrow(z.ZodError);
      expect(() =>
        LoginAdminDto.create(mockInvalidCreateUserRequestInvalidPasswordV4)
      ).toThrow(z.ZodError);
    });
  });
});
