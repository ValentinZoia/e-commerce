import { CustomError } from "../../../src/shared/domain/errors";
import { JwtAdapter } from "../../../src/shared/infrastructure/adapters";
import { JwtAdminPayload } from "../../../src/shared/presentation/middlewares";
import { mockValidToken } from "../factories/defaultValues";

type MockJwtConfig = {
  payload?: JwtAdminPayload | null;
  token?: string;
  shouldFail?: boolean;
};

export const configureJwtMock = (
  config: MockJwtConfig = {}
): jest.Mocked<typeof JwtAdapter> => {
  const mockAdapter = JwtAdapter as jest.Mocked<typeof JwtAdapter>;

  mockAdapter.validateToken.mockImplementation((token) => {
    if (config.shouldFail) {
      return Promise.reject(CustomError.unauthorized("JWT validation failed"));
    }

    return Promise.resolve(token === config.token ? config.payload : null);
  });

  return mockAdapter;
};

// Versión simplificada para casos comunes
export const mockJwtValidation = (
  payload: JwtAdminPayload | null,
  token: string = "valid-token",
  shouldFail: boolean = false
) => {
  const shouldFailBool: boolean = shouldFail
    ? true
    : token !== mockValidToken
    ? true
    : false;
  configureJwtMock({ payload, token, shouldFail: shouldFailBool });
};
