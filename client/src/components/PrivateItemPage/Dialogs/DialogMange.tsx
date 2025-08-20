import { ResMessage } from "@/hooks/GenericTABLE/useHanlderDialogCommand";
import CreateEditItemDialog from "./CreateEditItemDialog/CreateEditItemDialog";
import DeleteItemDialog from "./DeleteItemDialog/DeleteItemDialog";

interface DialogMangeProps<T> {
  item: T | null;
  responseMessage: ResMessage | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form: React.ReactNode;
  titleSingular: string;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  openDelete: boolean;
  confirmDelete: () => void;
  isLoading: boolean;
  extraDeleteMessage?: string;
}

function DialogManage<T>({
  item,
  form,
  open,
  setOpen,
  responseMessage,
  openDelete,
  setOpenDelete,
  confirmDelete,
  isLoading,
  extraDeleteMessage,
  titleSingular,
}: DialogMangeProps<T>) {
  return (
    <>
      <CreateEditItemDialog<T>
        titleSingular={titleSingular}
        item={item}
        open={open}
        onClose={() => setOpen(false)}
        responseMessage={responseMessage}
      >
        {form}
      </CreateEditItemDialog>
      <DeleteItemDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onSave={confirmDelete}
        responseMessage={responseMessage}
        isLoading={isLoading}
        titleSingular="orden"
        extraDeleteMessage={extraDeleteMessage}
      />
    </>
  );
}
export default DialogManage;
