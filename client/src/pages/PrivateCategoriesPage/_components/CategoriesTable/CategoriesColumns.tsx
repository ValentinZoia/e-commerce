import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Edit,
  Trash2,
  // MoreHorizontal,
} from "lucide-react";

import { Category } from "@/types";

export function buildCategoryColumns(
  onEdit: (row: Category) => void,
  onDelete: (row: Category) => void
) {
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold"
          >
            Categoria
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
        const category = row.original;
        return (
          <div>
            <div className="font-medium">{category.name}</div>
          </div>
        );
      },
    },

    {
      accessorKey: "slug",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold"
          >
            Slug
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
        const category = row.original;
        return (
          <div className="flex justify-center">
            <div className="font-medium">{category.slug}</div>
          </div>
        );
      },
    },

    {
      accessorKey: "description",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold"
          >
            Descripción
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
        const category = row.original;

        return (
          <div className="flex justify-center">
            <div className="font-medium">{category.description}</div>
          </div>
        );
      },
    },

    {
      id: "products",
      header: () => <div className="flex justify-center">Cant. Productos</div>,
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="flex justify-center">
            <div className="font-medium">
              {category.products ? category.products.length : "No especificada"}
            </div>
          </div>
        );
      },
    },
    {
      id: "acciones",
      header: () => <div className="flex justify-end p-2">Acciones</div>,
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(category)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(category)}
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
                <DropdownMenuItem onClick={() => onEdit(category)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(category)}
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
