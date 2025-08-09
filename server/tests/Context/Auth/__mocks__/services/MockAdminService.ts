import {
  CreateAdminService,
  DeleteAdminService,
  LogInAdminService,
} from "../../../../../src/Auth/application/services";

export const mockCreateAdminService: jest.Mocked<CreateAdminService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<CreateAdminService>;

export const mockLogInAdminService: jest.Mocked<LogInAdminService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<LogInAdminService>;

export const mockDeleteAdminService: jest.Mocked<DeleteAdminService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<DeleteAdminService>;
