import { CategoryDataDto } from "../../../src/Categories/domain/dtos";
import { Category } from "../../../src/Categories/domain/entities";

export const mockValidCategoryDataResponse: Category = {
  id: "category-test-id",
  name: "category-test-id",
  slug: "category-test-id",
  description: "category-test-id",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockValidCategoryDataResponseV2: Category = {
  id: "category-test-id-2",
  name: "category-test-id-2",
  slug: "category-test-id-2",
  description: "category-test-id-2",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockValidCategoryDataRequest: CategoryDataDto = {
  name: "category-test-id",
  slug: "category-test-id",
  description: "category-test-id",
};

export const mockValidCategoryDataRequestToCategory = new Category(
  null, //id
  "category-test-id", //name
  "category-test-id", //slug
  "category-test-id" //description
);
