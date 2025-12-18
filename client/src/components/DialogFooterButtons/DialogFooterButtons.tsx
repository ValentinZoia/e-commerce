import { DialogFooter } from "../ui/dialog";
import { SubmitBtn } from "@/pages/Login/_components";
import { Button } from "../ui/button";

interface DialogFooterButtonsProps {
    onClose: () => void;
    name: string;
    isLoading: boolean;
}

export default function DialogFooterButtons({
    onClose,
    name,
    isLoading,
}: DialogFooterButtonsProps) {
    return (
        <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
            </Button>
            <SubmitBtn isLoading={isLoading} name={name} />
        </DialogFooter>
    );
}
