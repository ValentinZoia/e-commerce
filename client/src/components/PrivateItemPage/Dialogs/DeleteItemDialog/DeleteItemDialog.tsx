import DBmessage from "@/components/DBMessage/DBmessage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResMessage } from "@/hooks/GenericTABLE/useHanlderDialogCommand";
import { capitalizeFirstLetter } from "@/utilities";

interface DeleteItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  responseMessage: ResMessage | null;
  isLoading: boolean;
  titleSingular: string;
  extraDeleteMessage?: string;
}

function DeleteItemDialog({
  open,
  onClose,
  onSave,
  responseMessage,
  isLoading,
  titleSingular,
  extraDeleteMessage,
}: DeleteItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Eliminar {capitalizeFirstLetter(titleSingular)}?
          </DialogTitle>
          <DialogDescription>
            Estas Seguro que deseas eliminar este item? Esta accion no se puede
            deshacer.
            <br />
            {extraDeleteMessage}
          </DialogDescription>
          <DBmessage responseMessage={responseMessage} />
        </DialogHeader>
        <DialogFooter className="flex justify-between gap-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              disabled={isLoading}
              aria-label="Cancelar"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            variant="destructive"
            onClick={onSave}
            aria-label="Eliminar"
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteItemDialog;
