import { DBResponseCommand } from "@/types/shared";
import { useState } from "react";

interface MutationResult<T> {
  mutate: (variables: T, options?: any) => void;
  isPending: boolean;
}
export interface ResMessage {
  type: "success" | "error" | null;
  text: string | null;
}
interface UseHandlerDialogCommandProps<T2> {
  createMutation: MutationResult<T2>;
  updateMutation: MutationResult<{ id: string; values: T2 }>;
  deleteMutation?: MutationResult<{ id: string }>;
  title: string;
}

export function useHandlerDialogCommand<T extends { id: string }, T2>({
  createMutation,
  updateMutation,
  deleteMutation,
  title,
}: UseHandlerDialogCommandProps<T2>) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [responseMessage, setResponseMessage] = useState<ResMessage | null>(
    null
  );

  const onNew = () => {
    setSelectedItem(null);
    setResponseMessage(null);
    setOpen(true);
  };

  const onEdit = (item: T) => {
    setSelectedItem(item);
    setResponseMessage(null);
    setOpen(true);
  };

  const onDelete = (item: T) => {
    setSelectedItem(item);
    setResponseMessage(null);
    setOpenDelete(true);
  };

  const confirmSave = (values: T2) => {
    if (selectedItem) {
      updateMutation.mutate(
        { id: selectedItem.id, values },
        {
          onSuccess: (res: DBResponseCommand<T>) => {
            setResponseMessage({
              type: res?.success ? "success" : "error",
              text: res?.message || `${title} actualizado`,
            });
            setOpen(false);
          },
          onError: (err: any) => {
            setResponseMessage({ type: "error", text: err.message });
          },
        }
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: (res: DBResponseCommand<T>) => {
          setResponseMessage({
            type: res?.success ? "success" : "error",
            text: res?.message || `${title} creado`,
          });
          setOpen(false);
        },
        onError: (err: any) => {
          setResponseMessage({ type: "error", text: err.message });
        },
      });
    }
  };

  const confirmDelete = () => {
    if (!selectedItem || !deleteMutation) return;
    deleteMutation.mutate(
      { id: selectedItem.id },
      {
        onSuccess: (res: DBResponseCommand<T>) => {
          setResponseMessage({
            type: res?.success ? "success" : "error",
            text: res?.message || `${title} eliminado`,
          });
          setOpenDelete(false);
        },
        onError: (err: any) => {
          setResponseMessage({ type: "error", text: err.message });
        },
      }
    );
  };

  return {
    open,
    setOpen,
    openDelete,
    setOpenDelete,
    selectedItem,
    responseMessage,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation?.isPending ||
      false,
    onNew,
    onEdit,
    onDelete,
    confirmSave,
    confirmDelete,
  };
}
