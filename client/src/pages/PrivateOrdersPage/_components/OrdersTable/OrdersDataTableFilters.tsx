import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WhatsAppStatusNames } from "@/types/order";
import { CheckCircle, Clock, MessageCircle, Search, Send } from "lucide-react";

interface OrdersDataTableFiltersProps {
  customerPhoneFilter: string;

  customerEmailFilter: string;

  customerNameFilter: string;

  statusFilter: WhatsAppStatusNames | string;

  productIdFilter: string;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      customerPhoneFilter: string;
      customerEmailFilter: string;
      customerNameFilter: string;
      statusFilter: WhatsAppStatusNames | string;
      productIdFilter: string;
    }>
  >;
}

function OrdersDataTableFilters({
  customerPhoneFilter,
  customerEmailFilter,
  customerNameFilter,
  statusFilter,
  productIdFilter,
  setFilters,
}: OrdersDataTableFiltersProps) {
  return (
    <div className="w-full flex flex-wrap flex-col gap-2">
      <div className=" grid grid-cols-2 gap-2 md:grid-cols-4">
        {/* Buscar por Email del Cliente */}
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Email del cliente...`}
            value={customerEmailFilter}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                customerEmailFilter: e.target.value,
              }))
            }
            className="max-w-sm"
          />
        </div>
        {/* Buscar por Celular del Cliente */}
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Celular del cliente...`}
            value={customerPhoneFilter}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                customerPhoneFilter: e.target.value,
              }))
            }
            className="max-w-sm"
          />
        </div>
        {/* Buscar por Nombre del Cliente */}
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Nombre del cliente...`}
            value={customerNameFilter}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                customerNameFilter: e.target.value,
              }))
            }
            className="max-w-sm"
          />
        </div>
        {/* Buscar por Product Id */}
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`id del producto...`}
            value={productIdFilter}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                productIdFilter: e.target.value,
              }))
            }
            className="max-w-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>

        <Select
          value={statusFilter}
          onValueChange={(e) =>
            setFilters((prev) => ({ ...prev, statusFilter: e }))
          }
        >
          <SelectTrigger className="w-[140px]" id="status">
            <SelectValue placeholder="Status.." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value={WhatsAppStatusNames.PENDING}>
              {" "}
              <Clock className="w-3 h-3 mr-1" />
              Pendiente
            </SelectItem>
            <SelectItem value={WhatsAppStatusNames.SENT}>
              <Send className="w-3 h-3 mr-1" />
              Enviado
            </SelectItem>
            <SelectItem value={WhatsAppStatusNames.RESPONDED}>
              <MessageCircle className="w-3 h-3 mr-1" />
              Respondido
            </SelectItem>
            <SelectItem value={WhatsAppStatusNames.COMPLETED}>
              <CheckCircle className="w-3 h-3 mr-1" />
              Venta Completada
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
export default OrdersDataTableFilters;
