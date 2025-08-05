import { Category } from "../../../../../src/Categories/domain/entities";

describe("Category - Unit Test", () => {
  const mockDate = new Date("2023-01-01T00:00:00.000Z");

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should create a Category with all properties", () => {
    const category = new Category(
      "123",
      "Test Category",
      "test-category",
      "Test description"
    );

    expect(category.id).toBe("123");
    expect(category.name).toBe("Test Category");
    expect(category.slug).toBe("test-category");
    expect(category.description).toBe("Test description");
    expect(category.createdAt).toEqual(mockDate);
    expect(category.updatedAt).toEqual(mockDate);
  });

  test("should create a Category with minimal required properties", () => {
    const category = new Category(null, "Minimal Category", "minimal-category");

    expect(category.id).toBeNull();
    expect(category.name).toBe("Minimal Category");
    expect(category.slug).toBe("minimal-category");
    expect(category.description).toBeNull();
    expect(category.createdAt).toEqual(mockDate);
    expect(category.updatedAt).toEqual(mockDate);
  });

  test("should create a Category with default dates", () => {
    const beforeCreation = new Date();
    jest.advanceTimersByTime(1000); // Avanzamos 1 segundo
    const category = new Category("456", "With Dates", "with-dates");
    jest.advanceTimersByTime(1000); // Avanzamos otro segundo
    const afterCreation = new Date();

    expect(category.createdAt.getTime()).toBeGreaterThanOrEqual(
      beforeCreation.getTime()
    );
    expect(category.createdAt.getTime()).toBeLessThanOrEqual(
      afterCreation.getTime()
    );
    expect(category.updatedAt.getTime()).toBeGreaterThanOrEqual(
      beforeCreation.getTime()
    );
    expect(category.updatedAt.getTime()).toBeLessThanOrEqual(
      afterCreation.getTime()
    );
  });

  test("should handle null description correctly", () => {
    const category = new Category("101", "Null Desc", "null-desc", null);

    expect(category.description).toBeNull();
  });
});
