import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SkeletonDataTableProps {
  rows: number;
  columns: number;
}

function SkeletonDataTable({ rows, columns }: SkeletonDataTableProps) {
  return (
    <div className="w-full space-y-4">
      {/* Simular barra de búsqueda / filtros arriba */}

      {/* Tabla */}
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns - 1 }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-[80px]" />
              </TableHead>
            ))}
            <TableHead className="flex justify-end">
              <Skeleton className=" h-4 w-[80px]" />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns - 1 }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
              <TableCell className="flex justify-end gap-2">
                <Skeleton className="h-6 w-8" />
                <Skeleton className="h-6 w-8" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default SkeletonDataTable;
