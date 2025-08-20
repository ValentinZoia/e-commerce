import { SortDir } from "@/types/shared";
import { SortingState } from "@tanstack/react-table";
import { useState } from "react";

/**
 * Custom hook para manejar el estado de paginación y ordenamiento
 * en tablas basadas en TanStack Table.
 *
 * Retorna las propiedades necesarias para:
 * - paginar resultados (pageIndex y pageSize)
 * - ordenar resultados (sorting, sortBy y sortDir)
 */
export const useDataTablePagination = ({ pageSize }: { pageSize: number }) => {
  // Índice de página actual (empieza en 0 porque TanStack usa 0-based indexing)
  const [pageIndex, setPageIndex] = useState(0);

  // Estado del ordenamiento (TanStack Table lo maneja como un array de reglas)
  const [sorting, setSorting] = useState<SortingState>([]);

  // Nombre de la columna por la que se está ordenando (si existe). Ejemplo (name, price, etc. el id esta en el archivo columns de cada tabla)
  const sortBy = sorting[0]?.id as string | undefined;

  // Dirección del ordenamiento: "asc" | "desc" | undefined
  const sortDir: SortDir | undefined = sorting[0]?.desc
    ? "desc"
    : sorting[0]
    ? "asc"
    : undefined;

  return {
    // 🔹 Paginación
    pageIndex, // Página actual
    setPageIndex, // Setter para cambiar la página
    pageSize, // Tamaño de página (constante definida al crear el hook)

    // 🔹 Ordenamiento
    sorting, // Estado completo de ordenamiento (para TanStack Table)
    setSorting, // Setter para actualizar el ordenamiento
    sortBy, // Columna activa de ordenamiento
    sortDir, // Dirección de ordenamiento
  };
};
