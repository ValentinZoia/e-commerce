import { Suspense, useState } from "react";
import PrivateItemPageHeader from "@/components/PrivateItemPage/PrivateItemPageHeaders/PrivateItemPageHeader";
import DialogManage from "@/components/PrivateItemPage/Dialogs/DialogMange";
import { useHandlerDialogCommand } from "@/hooks/GenericTABLE/useHanlderDialogCommand";
import SkeletonDataTable from "./DataTable/Skeleton/SkeletonDataTable";
import { useDebounce } from "@/hooks/Shared/useDebounce";

interface MutationResult<T> {
  mutate: (variables: T, options?: any) => void;
  isPending: boolean;
}

interface PrivateItemPageProps<TFormValues> {
  titlePlural: string;
  titleSingular: string;
  useMutations: () => {
    createMutation: MutationResult<TFormValues>;
    updateMutation: MutationResult<{ id: string; values: TFormValues }>;
    deleteMutation?: MutationResult<{ id: string }>;
  };
  FiltersComponent?: React.ComponentType<any>;
  TableComponent: React.ComponentType<any>;
  FormComponent: React.ComponentType<any>;
  extraDeleteMessage?: string;
  defaultFilters?: Record<string, any>;
  skeletonRows?: number;
  skeletonColumns?: number;
}

export function PrivateItemPage<TItem extends { id: string }, TFormValues>({
  titlePlural,
  titleSingular,
  useMutations,
  FiltersComponent,
  TableComponent,
  FormComponent,
  extraDeleteMessage,
  defaultFilters = {},
  skeletonColumns,
  skeletonRows,
}: PrivateItemPageProps<TFormValues>) {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [filters, setFilters] = useState(defaultFilters);

  const { createMutation, updateMutation, deleteMutation } = useMutations();

  const {
    open,
    setOpen,
    openDelete,
    setOpenDelete,
    selectedItem,
    responseMessage,
    onNew,
    onEdit,
    onDelete,
    confirmSave,
    confirmDelete,
    isLoading,
  } = useHandlerDialogCommand<TItem, TFormValues>({
    createMutation,
    updateMutation,
    deleteMutation,
    title: titleSingular,
  });

  const resetFilters = () => {
    setSearchFilter("");
    setFilters(defaultFilters);
  };

  const debouncedSearch = useDebounce(searchFilter, 500);
  const debouncedFilters = useDebounce(filters, 500);
  return (
    <>
      <div className="space-y-6">
        <PrivateItemPageHeader
          titlePlural={titlePlural}
          titleSingular={titleSingular}
          handleNewItem={onNew}
          search={searchFilter}
          onSearchChange={setSearchFilter}
          resetFilters={resetFilters}
        >
          {FiltersComponent && (
            <FiltersComponent {...filters} setFilters={setFilters} />
          )}
        </PrivateItemPageHeader>

        <Suspense
          fallback={
            <SkeletonDataTable
              rows={skeletonRows || 7}
              columns={skeletonColumns || 5}
            />
          }
        >
          <TableComponent
            search={debouncedSearch}
            {...debouncedFilters}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Suspense>
      </div>

      <DialogManage<TItem>
        item={selectedItem}
        responseMessage={responseMessage}
        open={open}
        setOpen={setOpen}
        form={
          <FormComponent
            item={selectedItem}
            onSave={confirmSave}
            onClose={() => setOpen(false)}
            isLoading={isLoading}
          />
        }
        titleSingular={titleSingular}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        confirmDelete={confirmDelete}
        isLoading={isLoading}
        extraDeleteMessage={extraDeleteMessage}
      />
    </>
  );
}
