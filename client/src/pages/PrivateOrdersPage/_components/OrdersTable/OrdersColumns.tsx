import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order, WhatsAppStatusNames } from "@/types/order";
import { formatPrice } from "@/utilities";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle,
  Clock,
  Edit,
  MessageCircle,
  Send,
  Trash2,
} from "lucide-react";

export function buildOrderColumns(
  onEdit: (row: Order) => void,
  onDelete: (row: Order) => void
) {
  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "customerName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Info del Cliente
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div>
            <div className="font-medium">{order.customerName}</div>
            {order.customerEmail && (
              <div className="text-sm text-muted-foreground">
                {order.customerEmail}
              </div>
            )}
            {order.customerPhone && (
              <div className="text-sm text-muted-foreground">
                {order.customerPhone}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold"
          >
            Total
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
        const order = row.original;
        return (
          <div className="flex justify-center">
            <div className="font-medium">{formatPrice(order.total)}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "subtotal",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold"
          >
            Sub-total
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
        const order = row.original;
        return (
          <div className="flex justify-center">
            <div className="font-medium">{formatPrice(order.subtotal)}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "shippingCost",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold"
          >
            Costo de Envio
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
        const order = row.original;
        return (
          <div className="flex justify-center">
            {order.shippingCost ? (
              <div className="font-medium">
                {order.isFreeShipping
                  ? "Gratis"
                  : formatPrice(order.shippingCost)}
              </div>
            ) : (
              <div className="font-medium">
                {order.isFreeShipping ? "Gratis" : "N/A"}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: () => <div className="flex justify-center">Metodo de Pago</div>,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex justify-center">
            <div className="font-medium">
              {order.paymentMethod ? order.paymentMethod : "N/A"}
            </div>
          </div>
        );
      },
    },
    {
      id: "messagestatus",
      header: () => (
        <div className="flex justify-center">Estado de Mensaje</div>
      ),
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex justify-center flex-wrap gap-1">
            {order.whatsappStatus === WhatsAppStatusNames.PENDING && (
              <Badge
                variant="outline"
                className="text-xs border-yellow-500 bg-yellow-50 text-yellow-700"
              >
                <Clock className="w-3 h-3 mr-1" />
                Pendiente
              </Badge>
            )}

            {order.whatsappStatus === WhatsAppStatusNames.SENT && (
              <Badge
                variant="outline"
                className="text-xs border-blue-500 bg-blue-50 text-blue-700"
              >
                <Send className="w-3 h-3 mr-1" />
                Enviado
              </Badge>
            )}

            {order.whatsappStatus === WhatsAppStatusNames.RESPONDED && (
              <Badge
                variant="outline"
                className="text-xs border-green-500 bg-green-50 text-green-700"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Respondido
              </Badge>
            )}

            {order.whatsappStatus === WhatsAppStatusNames.COMPLETED && (
              <Badge
                variant="outline"
                className="text-xs border-purple-500 bg-purple-50 text-purple-700"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Venta Completada
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "products",
      header: () => <div className="flex justify-center">Productos</div>,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex justify-center flex-wrap gap-1">
            {/* {order.products.map((product) => (
                <Badge key={product.id} variant="outline" className="text-xs">
                  {product.name}
                </Badge>
              ))} */}
            {order.products.length}
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
