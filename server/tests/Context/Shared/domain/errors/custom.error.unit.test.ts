import { CustomError } from "../../../../../src/shared/domain/errors";

describe("CustomError - Unit Test", () => {
  test("should create an instance with random values", () => {
    const customError = new CustomError(402, "402 error", "CustomError");

    expect(customError).toBeDefined();
    expect(customError).toBeInstanceOf(Error);
    expect(customError.statusCode).toBe(402);
    expect(customError.message).toBe("402 error");
    expect(customError.name).toBe("CustomError");
  });
  test("should create an instance with badRequest method", () => {
    const customError = CustomError.badRequest("Bad Request - error");

    expect(customError).toBeDefined();
    expect(customError).toBeInstanceOf(Error);
    expect(customError.statusCode).toBe(400);
    expect(customError.message).toBe("Bad Request - error");
    expect(customError.type).toBe("BadRequestError");
    expect(customError.name).toBe("CustomError");
  });
  test("should create an instance with notFound method", () => {
    const customError = CustomError.notFound("Not Found - error");

    expect(customError).toBeDefined();
    expect(customError).toBeInstanceOf(Error);
    expect(customError.statusCode).toBe(404);
    expect(customError.message).toBe("Not Found - error");
    expect(customError.type).toBe("NotFoundError");
    expect(customError.name).toBe("CustomError");
  });
  test("should create an instance with unauthorized method", () => {
    const customError = CustomError.unauthorized("Unauthorized - error");

    expect(customError).toBeDefined();
    expect(customError).toBeInstanceOf(Error);
    expect(customError.statusCode).toBe(401);
    expect(customError.message).toBe("Unauthorized - error");
    expect(customError.type).toBe("UnauthorizedError");
    expect(customError.name).toBe("CustomError");
  });
  test("should create an instance with forbidden method", () => {
    const customError = CustomError.forbidden("Forbidden - error");

    expect(customError).toBeDefined();
    expect(customError).toBeInstanceOf(Error);
    expect(customError.statusCode).toBe(403);
    expect(customError.message).toBe("Forbidden - error");
    expect(customError.type).toBe("ForbiddenError");
    expect(customError.name).toBe("CustomError");
  });
  test("should create an instance with internalServerError method", () => {
    const customError = CustomError.internalServerError();

    expect(customError).toBeDefined();
    expect(customError).toBeInstanceOf(Error);
    expect(customError.statusCode).toBe(500);
    expect(customError.message).toBe("Internal Server Error");
    expect(customError.type).toBe("InternalServerError");
    expect(customError.name).toBe("CustomError");
  });
});
