import { DBResponseCommand } from "@/types/shared";
import { useState } from "react";
import { toast } from "sonner";

interface MutationResult<T> {
    mutate: (variables: T, options?: any) => void;
    isPending: boolean;
}
export interface ResMessage {
    type: "success" | "error" | null;
    text: string | null;
}
interface UseHandlerDialogCommandProps<T2> {
    createItemMutation: MutationResult<T2>;
    updateItemMutation: MutationResult<{ id: string; values: T2 }>;
    deleteItemMutation?: MutationResult<{ id: string }>;
    title: string;
}

export function useHandlerDialogCommand<T extends { id: string }, T2>({
    createItemMutation,
    updateItemMutation,
    deleteItemMutation,
    title,
}: UseHandlerDialogCommandProps<T2>) {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [responseMessage, setResponseMessage] = useState<ResMessage | null>(
        null,
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
            updateItemMutation.mutate(
                { id: selectedItem.id, values },
                {
                    onSuccess: (res: DBResponseCommand<T>) => {
                        setResponseMessage({
                            type: res?.success ? "success" : "error",
                            text: res?.message || `${title} actualizado`,
                        });
                        setOpen(false);
                        //toast
                        toast.success(res?.message || `${title} actualizado`, {
                            position: "bottom-center",
                        });
                    },
                    onError: (err: any) => {
                        setResponseMessage({
                            type: "error",
                            text: err.message,
                        });
                        toast.error(err.message);
                        updateItemMutation.isPending = false;
                    },
                },
            );
        } else {
            createItemMutation.mutate(values, {
                onSuccess: (res: DBResponseCommand<T>) => {
                    setResponseMessage({
                        type: res?.success ? "success" : "error",
                        text: res?.message || `${title} creado`,
                    });
                    setOpen(false);
                    toast.success(res?.message || `${title} creado`, {
                        position: "bottom-center",
                    });
                },
                onError: (err: any) => {
                    setResponseMessage({ type: "error", text: err.message });
                    toast.error(err.message);
                    createItemMutation.isPending = false;
                },
            });
        }
    };

    const confirmDelete = () => {
        if (!selectedItem || !deleteItemMutation) return;
        deleteItemMutation.mutate(
            { id: selectedItem.id },
            {
                onSuccess: (res: DBResponseCommand<T>) => {
                    setResponseMessage({
                        type: res?.success ? "success" : "error",
                        text: res?.message || `${title} eliminado`,
                    });

                    setOpenDelete(false);
                    toast.success(res?.message || `${title} eliminado`, {
                        position: "bottom-center",
                    });
                },
                onError: (err: any) => {
                    setResponseMessage({ type: "error", text: err.message });
                    toast.error(err.message);
                    deleteItemMutation.isPending = false;
                },
            },
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
            createItemMutation.isPending ||
            updateItemMutation.isPending ||
            deleteItemMutation?.isPending ||
            false,
        onNew,
        onEdit,
        onDelete,
        confirmSave,
        confirmDelete,
    };
}
