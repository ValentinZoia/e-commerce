import { Admin } from "../../../src/Auth/domain/entities";
import { Category } from "../../../src/Categories/domain/entities";
import { Product } from "../../../src/Products/domain/entities";

export const defaultValidUser: Admin = {
  id: "default-id",
  username: "admin@test.com",
  password: "password",
};

export const defaultValidJwtPayload = {
  id: defaultValidUser.id as string,
  username: defaultValidUser.username,
};
export const mockValidToken = "valid-token";

export const mockInvalidToken = "invalid-token";
