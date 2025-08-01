import { CreateProductDto } from "../../../src/Products/domain/dtos";
import { Product, ProductBuilder } from "../../../src/Products/domain/entities";

export const requiredProductsFields = [
  "name",
  "description",
  "price",
  "categoryId",
];

const requiredProductsFieldsArray = [
  "name",
  "description",
  "price",
  "categoryId",
] as const;

type RequiredProductsFields = (typeof requiredProductsFieldsArray)[number];

type ProductMinimumFields = Pick<CreateProductDto, RequiredProductsFields>;

export const mockValidProductDataResponse: Product = {
  id: "1",
  name: "Remera Negra",
  description: "Description 1",
  price: 100,
  discountPercentage: 0.1,
  cashDiscountPercentage: 0.2,
  sizes: [],
  installments: [],
  images: [],
  stock: 1,
  isFreeShipping: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isNew: false,
  isPromotion: false,
  isFeatured: true,
  currentSize: "M",
  freeShippingThreshold: 200,
  cashPrice: 80,
  categoryId: "category-test-id",
};
export const mockValidProductDataResponseV2: Product = {
  id: "2",
  name: "Remera Negra",
  description: "Description 1",
  price: 100,
  discountPercentage: 0.1,
  cashDiscountPercentage: 0.2,
  sizes: [],
  installments: [],
  images: [],
  stock: 10,
  isFreeShipping: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isNew: true,
  isPromotion: false,
  isFeatured: false,
  currentSize: "M",
  freeShippingThreshold: 200,
  cashPrice: 80,
  categoryId: "category-test-id",
};

export const mockValidProductDataRequest: CreateProductDto = {
  name: "Remera Negra",
  description: "Description 1",
  price: 100,
  discountPercentage: 0.1,
  cashDiscountPercentage: 0.2,
  sizes: [],
  installments: [],
  images: [],
  stock: 1,
  isFreeShipping: false,
  isNew: false,
  isPromotion: false,
  isFeatured: true,
  currentSize: "M",
  freeShippingThreshold: 200,
  cashPrice: 80,
  categoryId: "category-test-id",
};

export const mockValidProductDataRequestConvertedToProductType =
  new ProductBuilder()
    .setName(mockValidProductDataRequest.name)
    .setDescription(mockValidProductDataRequest.description)
    .setPrice(mockValidProductDataRequest.price)
    .setCashPrice(mockValidProductDataRequest.cashPrice)
    .setDiscountPercentage(mockValidProductDataRequest.discountPercentage)
    .setCashDiscountPercentage(
      mockValidProductDataRequest.cashDiscountPercentage
    )
    .setSizes(mockValidProductDataRequest.sizes)
    .setInstallments(mockValidProductDataRequest.installments)
    .setImages(mockValidProductDataRequest.images)
    .setStock(mockValidProductDataRequest.stock)
    .setIsFreeShipping(mockValidProductDataRequest.isFreeShipping)
    .setIsNew(mockValidProductDataRequest.isNew)
    .setIsPromotion(mockValidProductDataRequest.isPromotion)
    .setIsFeatured(mockValidProductDataRequest.isFeatured)
    .setCurrentSize(mockValidProductDataRequest.currentSize)
    .setFreeShippingThreshold(mockValidProductDataRequest.freeShippingThreshold)
    .setCategoryId(mockValidProductDataRequest.categoryId)
    .setCreatedAt(new Date())
    .setUpdatedAt(new Date())
    .build();

export const mockValidProductDataWithMinimumRequairedFieldsRequest: ProductMinimumFields =
  {
    name: "Remera Negra",
    description: "Description 1",
    price: 100,
    categoryId: "category-test-id",
  };

export const mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType =
  new ProductBuilder()
    .setName(mockValidProductDataWithMinimumRequairedFieldsRequest.name)
    .setDescription(
      mockValidProductDataWithMinimumRequairedFieldsRequest.description
    )
    .setPrice(mockValidProductDataWithMinimumRequairedFieldsRequest.price)
    .setCategoryId(
      mockValidProductDataWithMinimumRequairedFieldsRequest.categoryId
    )
    .build();

// Precios negativos, porcentajes y stock negativo
export const mockInvalidProductDataNegativePriceAndPercentagesAndStockRequest: Omit<
  Product,
  "id"
> = {
  name: "nombre", // Nombre vacío
  description: "descripcion",
  cashDiscountPercentage: -0.2,
  discountPercentage: 0,
  sizes: [],
  installments: [],
  images: [],
  stock: -10,
  isFreeShipping: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isNew: true,
  isPromotion: false,
  isFeatured: false,
  currentSize: null,
  freeShippingThreshold: null,
  cashPrice: -10,
  price: -10, // Precio negativo
  categoryId: "category-test-id", //categoria valida
};

export const mockInvalidProductDataDontMatchStockForSizesAndtotalStockRequest: Omit<
  Product,
  "id"
> = {
  name: "nombre", // Nombre vacío
  description: "descrp",
  cashDiscountPercentage: 0.2,
  discountPercentage: 0.2,
  sizes: [
    { name: "M", stock: 2 },
    { name: "L", stock: 1 },
  ],
  installments: [],
  images: [],
  stock: 2,
  isFreeShipping: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isNew: true,
  isPromotion: false,
  isFeatured: false,
  currentSize: null,
  freeShippingThreshold: null,
  cashPrice: 8,
  price: 10, // Precio negativo
  categoryId: "category-test-id", //categoria valida
};

export const mockInvalidProductDataCashPriceGreaterThanPrice: Omit<
  Product,
  "id"
> = {
  name: "nombre", // Nombre vacío
  description: "descrip",
  cashDiscountPercentage: 0.2,
  discountPercentage: 0.2,
  sizes: [{ name: "M", stock: 2 }],
  installments: [],
  images: [],
  stock: 2,
  isFreeShipping: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isNew: true,
  isPromotion: false,
  isFeatured: false,
  currentSize: null,
  freeShippingThreshold: null,
  cashPrice: 12,
  price: 10, // Precio negativo
  categoryId: "category-test-id", //categoria valida
};

export const mockInvalidProductDataCashPriceDontMatchWithPriceByCashDiscount: Omit<
  Product,
  "id"
> = {
  name: "nombre", // Nombre vacío
  description: "descriop",
  cashDiscountPercentage: 0.2,
  discountPercentage: 0.2,
  sizes: [{ name: "M", stock: 2 }],
  installments: [],
  images: [],
  stock: 2,
  isFreeShipping: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isNew: true,
  isPromotion: false,
  isFeatured: false,
  currentSize: null,
  freeShippingThreshold: null,
  cashPrice: 7,
  price: 10, // Precio negativo
  categoryId: "category-test-id", //categoria valida
};
