import { PublicUserResponse } from "../../../src/Auth/application/services";
import { Admin } from "../../../src/Auth/domain/entities";

export const mockValidCreateUserRequest = {
  username: "admintest",
  password: "Password1",
};
export const mockValidLoginRequest = {
  username: "admintest",
  password: "Password1",
};
export const mockInvalidCreateUserRequestInvalidPasswordV1 = {
  username: "admintest",
  password: "Password", //no tiene numeros
};
export const mockInvalidCreateUserRequestInvalidPasswordV2 = {
  username: "admintest",
  password: "password1", //no tiene mayusculas
};
export const mockInvalidCreateUserRequestInvalidPasswordV3 = {
  username: "admintest",
  password: "password", //no tiene numeros ni mayusculas
};
export const mockInvalidCreateUserRequestInvalidPasswordV4 = {
  username: "admintest",
  password: "passw", //debe tener mas de 8 caracteres
};
export const mockInvalidCreateUserRequestInvalidUsernameV1 = {
  username: "ad", //debe tener mas de 3
  password: "Password1",
};
export const mockInvalidCreateUserRequestInvalidUsernameV2 = {
  username: "admin.test-0", //caracteres invalidos
  password: "Password1",
};
export const mockInvalidCreateUserRequestInvalidUsernameV3 = {
  username: "ADMINTEST", //debe ser en minusculas
  password: "Password1",
};
export const mockInvalidCreateUserRequestInvalidUsernameV4 = {
  username: "admin test", //no puede tener espacios
  password: "Password1",
};
export const mockInvalidCreateUserRequestInvalidUsernameV5 = {
  username: "admintestadmintestadm", //mas de 20
  password: "Password1",
};

export const mockCreateUserDbResponse: Admin = {
  id: "1",
  username: "admintest",
  password: "hashedPassword",
};
export const mockCreateUserPublicReponse: PublicUserResponse = {
  id: "1",
  username: "admintest",
};
