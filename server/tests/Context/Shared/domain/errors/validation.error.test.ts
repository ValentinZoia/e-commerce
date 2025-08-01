import { ValidationError } from "../../../../../src/shared/domain/errors";

describe("ValidationError - Unit Test", () => {
  test("should create an instance with default values", () => {
    const error = new ValidationError({});

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(Error);
    expect(error.errors).toEqual({});
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe("Validation failed");
    expect(error.name).toBe("ValidationError");
  });
  test("should store custom error messages", () => {
    const testErrors = {
      email: ["Invalid email format"],
      password: ["Too short", "Missing special character"],
    };

    const error = new ValidationError(
      testErrors,
      "Custom validation message",
      422
    );

    expect(error.message).toBe("Custom validation message");
    expect(error.statusCode).toBe(422);
    expect(error.errors).toEqual(testErrors);
  });

  test("should maintain error stack trace", () => {
    const error = new ValidationError({});
    expect(error.stack).toBeDefined();
  });

  test("should be throwable", () => {
    const throwFn = () => {
      throw new ValidationError({ field: ["Error"] });
    };

    expect(throwFn).toThrow(ValidationError);
    expect(throwFn).toThrow("Validation failed");
  });
});
