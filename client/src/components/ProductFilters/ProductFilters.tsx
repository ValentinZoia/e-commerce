import { Product, ProductStatus } from "@/types";
import { Filters } from "@/types/filters";
import { Separator } from "@/components/ui/separator";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  products: Product[];
  productsStatus: ProductStatus;
  categoryId?: string;
}

const ProductFilters = ({
  filters,
  setFilters,
  products,
  productsStatus,
  categoryId,
}: Props) => {
  const categories = categoryId
    ? [categoryId]
    : [...new Set(products?.map((p) => p.categoryId) || [])];
  const sizes = [
    ...new Set(products?.flatMap((p) => p.sizes?.map((s) => s.name)) || []),
  ];

  const isUnicCategory = productsStatus === ProductStatus.FORCATEGORY;
  const isNew = productsStatus === ProductStatus.NEW;
  const isPromotion = productsStatus === ProductStatus.PROMOTION;
  const isFeatured = productsStatus === ProductStatus.FEATURED;

  const isEspecial = isNew || isPromotion || isFeatured;

  return (
    <Card className="bg-white w-full max-w-sm">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Buscador */}
          <div className="space-y-2">
            <Label htmlFor="search">Buscar productos</Label>
            <Input
              id="search"
              type="text"
              placeholder="Buscar productos..."
              value={filters.searchQuery || ""}
              onChange={(e) =>
                setFilters({ ...filters, searchQuery: e.target.value })
              }
            />
          </div>

          <Separator />

          {/* Categorías */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Categoría {isUnicCategory ? `: ${categories[0]}` : ""}
            </Label>
            {!isUnicCategory && (
              <Select
                value={filters.category || ""}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    category: value || undefined,
                  })
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <Separator />

          {/* Rango de precios */}
          <div className="space-y-2">
            <Label>Rango de precio</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Mínimo"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    minPrice: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Máximo"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxPrice: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>
          </div>

          <Separator />

          {/* Filtros booleanos */}
          <div className="space-y-3">
            <Label>Filtros adicionales</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={!!filters.inStock}
                  onCheckedChange={(checked) =>
                    setFilters({
                      ...filters,
                      inStock: checked === true,
                    })
                  }
                />
                <Label htmlFor="inStock" className="font-normal">
                  Solo disponibles
                </Label>
              </div>

              {!isEspecial && (
                <>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isFeatured"
                      checked={!!filters.isFeatured}
                      onCheckedChange={(checked) =>
                        setFilters({
                          ...filters,
                          isFeatured: checked === true,
                        })
                      }
                    />
                    <Label htmlFor="isFeatured" className="font-normal">
                      Destacados
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isPromotion"
                      checked={!!filters.isPromotion}
                      onCheckedChange={(checked) =>
                        setFilters({
                          ...filters,
                          isPromotion: checked === true,
                        })
                      }
                    />
                    <Label htmlFor="isPromotion" className="font-normal">
                      En promoción
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isNew"
                      checked={!!filters.isNew}
                      onCheckedChange={(checked) =>
                        setFilters({
                          ...filters,
                          isNew: checked === true,
                        })
                      }
                    />
                    <Label htmlFor="isNew" className="font-normal">
                      Nuevos
                    </Label>
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="freeShipping"
                  checked={!!filters.freeShipping}
                  onCheckedChange={(checked) =>
                    setFilters({
                      ...filters,
                      freeShipping: checked === true,
                    })
                  }
                />
                <Label htmlFor="freeShipping" className="font-normal">
                  Envío gratis
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Tallas */}
          {sizes.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="size">Talla</Label>
              <Select
                value={filters.size || ""}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    size: value || undefined,
                  })
                }
              >
                <SelectTrigger id="size">
                  <SelectValue placeholder="Todas las tallas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las tallas</SelectItem>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size as string}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Separator />

          {/* Ordenamiento */}
          <div className="space-y-2">
            <Label htmlFor="sortBy">Ordenar por</Label>
            <Select
              value={filters.sortBy || ""}
              onValueChange={(value: any) =>
                setFilters({
                  ...filters,
                  sortBy: value || undefined,
                })
              }
            >
              <SelectTrigger id="sortBy">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Ordenar por</SelectItem>
                <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-desc">
                  Precio: mayor a menor
                </SelectItem>
                <SelectItem value="newest">Más nuevos primero</SelectItem>
                <SelectItem value="best-discount">
                  Mejores descuentos
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
