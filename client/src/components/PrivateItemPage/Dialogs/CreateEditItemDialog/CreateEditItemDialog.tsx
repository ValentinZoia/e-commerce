import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import DBmessage from "@/components/DBMessage/DBmessage";

import { ResMessage } from "@/hooks/GenericTABLE/useHanlderDialogCommand";
import { capitalizeFirstLetter } from "@/utilities";

interface CreateEditItemDialogProps<T> {
  item: T | null;
  responseMessage: ResMessage | null;
  open: boolean;
  onClose: () => void;
  titleSingular: string;
  children?: React.ReactNode;
}

function CreateEditItemDialog<T>({
  item,
  responseMessage,
  open,
  onClose,
  titleSingular,
  children,
}: CreateEditItemDialogProps<T>) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {item
              ? `Editar ${capitalizeFirstLetter(titleSingular)}`
              : `Crear ${capitalizeFirstLetter(titleSingular)}`}
          </DialogTitle>
          <DialogDescription>
            {item
              ? "Modifica los datos del item"
              : "Agrega un nuevo item al inventario"}
          </DialogDescription>
          <DBmessage responseMessage={responseMessage} />
        </DialogHeader>
        {children}
        {/* <ProductDialogForm
          onSave={onSave}
          product={product}
          onClose={onClose}
          isLoading={isLoading}
        /> */}
      </DialogContent>
    </Dialog>
  );
}
export default CreateEditItemDialog;
