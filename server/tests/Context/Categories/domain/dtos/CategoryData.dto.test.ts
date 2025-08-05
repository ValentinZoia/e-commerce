import { CategoryDataDto } from "../../../../../src/Categories/domain/dtos";
import { z } from "zod";

const validRequestCategoryData = {
  name: "test",
  slug: "test",
  description: "test",
};

describe("CategoryDataDto - Unit Test", () => {
  describe("Basic Validation", () => {
    test("should create DTO with valid data", () => {
      const result = CategoryDataDto.create(validRequestCategoryData);

      expect(result).toBeInstanceOf(CategoryDataDto);
      expect(result.name).toBe(validRequestCategoryData.name);
      expect(result.slug).toBe(validRequestCategoryData.slug);
      expect(result.description).toBe(validRequestCategoryData.description);
    });

    test("should create DTO with minimum required valid data", () => {
      const minimalData = {
        name: "abc", // min 3 chars
        slug: "abc", // min 3 chars
        description: null,
      };

      const result = CategoryDataDto.create(minimalData);

      expect(result).toBeInstanceOf(CategoryDataDto);
      expect(result.name).toBe(minimalData.name);
      expect(result.slug).toBe(minimalData.slug);
      expect(result.description).toBeNull();
    });

    test("should throw z.ZodError with invalid data", () => {
      const invalidData = {
        name: "ab", // too short
        slug: "ab", // too short
        description: 123, // wrong type
      };

      expect(() => CategoryDataDto.create(invalidData)).toThrow(z.ZodError);
    });

    test("should accept minimum valid name length (3)", () => {
      const data = {
        name: "abc", // exactly 3 chars
        slug: "test",
        description: null,
      };

      const result = CategoryDataDto.create(data);
      expect(result.name).toBe("abc");
    });

    test("should accept minimum valid slug length (3)", () => {
      const data = {
        name: "test",
        slug: "abc", // exactly 3 chars
        description: null,
      };

      const result = CategoryDataDto.create(data);
      expect(result.slug).toBe("abc");
    });
  });
});
