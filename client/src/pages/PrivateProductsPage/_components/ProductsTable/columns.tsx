import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Product } from "@/types/product";
import { formatPrice } from "@/utilities";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  FolderTree,
  Star,
  Sparkles,
  Tag,
  Truck,
  Edit,
  Trash2,
  Banknote,
  // MoreHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  calculateItemCashPrice,
  calculateItemPrice,
} from "@/utilities/cartSlice";

export function buildProductColumns(
  onEdit: (row: Product) => void,
  onDelete: (row: Product) => void
) {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold"
          >
            Producto
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex flex-col justify-start">
            <div className="font-medium">{product.name}</div>
            {product.description && (
              <div className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </div>
            )}
            {product.sizes && product.sizes.length > 0 && (
              <div className="text-xs text-muted-foreground mt-1">
                Talles: {product.sizes.map((s) => s.name).join(", ")}
              </div>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "price",
      header: ({ column }) => (
        <div className="">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold"
          >
            Precio
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const product = row.original;
        const isDiscount =
          product.discountPercentage === undefined ||
          product.discountPercentage === 0
            ? false
            : true;
        const isCashDiscount =
          product.cashDiscountPercentage === undefined ||
          product.cashDiscountPercentage === 0
            ? false
            : true;
        return (
          <div className="">
            {isDiscount && (
              <div className="flex items-center gap-1">
                <div className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </div>
                <Badge variant="destructive" className="text-xs">
                  -{Math.round((product.discountPercentage as number) * 100)}%
                </Badge>
              </div>
            )}
            <div className="font-medium">
              {formatPrice(calculateItemPrice(product))}
            </div>
            {isCashDiscount && (
              <div className="text-sm text-green-600">
                Efectivo: {formatPrice(calculateItemCashPrice(product))}{" "}
              </div>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "stock",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold"
          >
            Stock
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const product = row.original;
        const totalSizeStock =
          product.sizes?.reduce((acc, s) => acc + s.stock, 0) || 0;

        return (
          <div className="flex gap-2 items-center justify-center">
            <div className="font-medium">{product.stock}</div>
            {product.sizes && product.sizes.length > 0 && (
              <div className="text-xs text-muted-foreground">
                Por talles: {totalSizeStock}
              </div>
            )}
          </div>
        );
      },
    },

    {
      id: "estado",
      header: () => <div className="flex justify-center">Estado</div>,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex justify-center">
            <Badge variant={product.stock > 0 ? "default" : "secondary"}>
              {product.stock > 0 ? "En Stock" : "Sin Stock"}
            </Badge>
          </div>
        );
      },
    },

    {
      id: "caracteristicas",
      header: () => <div className="">Características</div>,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex  items-center flex-wrap gap-1">
            {product.categoryId && (
              <Badge variant="outline" className="text-xs">
                <FolderTree className="w-3 h-3 mr-1" />
                {product.categoryId}
              </Badge>
            )}
            {product.isFeatured && (
              <Badge variant="outline" className="text-xs">
                <Star className="w-3 h-3 mr-1" />
                Destacado
              </Badge>
            )}
            {product.isNew && (
              <Badge variant="outline" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Nuevo
              </Badge>
            )}
            {product.isPromotion && (
              <Badge variant="outline" className="text-xs">
                <Tag className="w-3 h-3 mr-1" />
                Promo
              </Badge>
            )}
            {product.isFreeShipping && (
              <Badge variant="outline" className="text-xs">
                <Truck className="w-3 h-3 mr-1" />
                Envío Gratis
              </Badge>
            )}
            {product.cashDiscountPercentage !== null &&
              product.cashDiscountPercentage > 0 && (
                <Badge variant="outline" className="text-xs">
                  <Banknote className="w-3 h-3 mr-1" />
                  Desc. Efectivo
                </Badge>
              )}
          </div>
        );
      },
    },

    {
      id: "acciones",
      header: () => <div className="flex justify-end p-2">Acciones</div>,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(product)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(product)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(product)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        );
      },
    },
  ];

  return columns;
}
