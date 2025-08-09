import { Admin } from "../../../../../src/Auth/domain/entities";

describe("Admin - Unit Test", () => {
  test("should create a Admin with all properties", () => {
    const admin = new Admin("123", "username", "password");

    expect(admin.id).toBe("123");
    expect(admin.username).toBe("username");
    expect(admin.password).toBe("password");
  });
});
