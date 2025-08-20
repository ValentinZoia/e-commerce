import { useState } from "react";
import { Message } from "./Auth/useLogin";

const ITEMS_POR_PAGINA = 10;
interface Props<T extends { id: string }, T2> {
  items: T[] | null;

  createItem: (item: T2) => void;
  responseMessageCreateItem: Message | null;
  clearCreateMessage: () => void;

  updateItem: (id: string, item: T2) => void;
  responseMessageUpdateItem: Message | null;
  clearUpdateMessage: () => void;

  deleteItem: (id: string) => void;
  responseMessageDeleteItem: Message | null;
  clearDeleteMessage: () => void;
}

export function useTableFuncionality<T extends { id: string }, T2>({
  items,
  responseMessageCreateItem,
  responseMessageUpdateItem,
  responseMessageDeleteItem,
  clearCreateMessage,
  clearDeleteMessage,
  clearUpdateMessage,
  createItem,
  updateItem,
  deleteItem,
}: Props<T, T2>) {
  const [dialogUpdateCreateOpen, setDialogUpdateCreateOpen] = useState(false);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemEdited, setItemEdited] = useState<T | null>(null);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);

  const indexStart = (currentPage - 1) * ITEMS_POR_PAGINA;
  const indexEnd = indexStart + ITEMS_POR_PAGINA;

  const handleGuardar = (item: T2) => {
    if (itemEdited) {
      updateItem(itemEdited.id, item);
      console.log("editando");
      if (responseMessageUpdateItem?.error) {
        setDialogUpdateCreateOpen(true);
        return;
      }
      if (responseMessageUpdateItem?.success) {
        console.log("editando salio bien");
        setDialogUpdateCreateOpen(false);
        clearUpdateMessage();
        return;
      }

      return;
    }

    createItem(item);
    console.log("creando");
    if (responseMessageCreateItem?.error) {
      setDialogUpdateCreateOpen(true);
      return;
    }
    if (responseMessageCreateItem?.success) {
      console.log("creando salio bien");
      setDialogUpdateCreateOpen(false);
      clearCreateMessage();
      return;
    }
    return;
  };
  const handleDeleteSave = () => {
    if (itemToDeleteId) {
      deleteItem(itemToDeleteId);
      console.log("deleting");
      if (responseMessageDeleteItem?.error) {
        setDialogDeleteOpen(true);
        return;
      }
      if (responseMessageDeleteItem?.success) {
        console.log("deleting salio bien");
        setDialogDeleteOpen(false);
        clearDeleteMessage();
        return;
      }
      setDialogDeleteOpen(false);
      return;
    }
  };

  const handleEliminar = (id: string) => {
    clearDeleteMessage();
    setItemEdited(null);
    setItemToDeleteId(id);
    setDialogUpdateCreateOpen(false);
    clearCreateMessage();
    clearUpdateMessage();
    setDialogDeleteOpen(true);
  };

  const handleEditar = (item: T) => {
    clearCreateMessage();
    clearUpdateMessage();
    setItemEdited(item);
    setDialogDeleteOpen(false);
    clearDeleteMessage();
    setDialogUpdateCreateOpen(true);
  };

  const handleNuevo = () => {
    clearCreateMessage();
    clearUpdateMessage();
    clearDeleteMessage();
    setItemEdited(null);
    setItemToDeleteId(null);

    setDialogDeleteOpen(false);
    setDialogUpdateCreateOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  if (!items) {
    return {
      itemToDeleteId,
      setItemToDeleteId,
      handleDeleteSave,
      dialogDeleteOpen,
      setDialogDeleteOpen,
      itemEdited,
      setCurrentPage,
      currentPage,
      indexEnd,
      indexStart,
      totalPaginas: 0,
      itemsPaginados: [],
      dialogUpdateCreateOpen,
      setDialogUpdateCreateOpen,
      handleGuardar,
      handleEliminar,
      handleEditar,
      handleNuevo,
      formatPrice,
    };
  }
  const totalPaginas = Math.ceil(items.length / ITEMS_POR_PAGINA);
  const itemsPaginados = items.slice(indexStart, indexEnd);
  return {
    itemToDeleteId,
    setItemToDeleteId,
    handleDeleteSave,
    dialogDeleteOpen,
    setDialogDeleteOpen,
    itemEdited,
    setCurrentPage,
    currentPage,
    indexEnd,
    indexStart,
    totalPaginas,
    itemsPaginados,
    dialogUpdateCreateOpen,
    setDialogUpdateCreateOpen,
    handleGuardar,
    handleEliminar,
    handleEditar,
    handleNuevo,
    formatPrice,
  };
}
