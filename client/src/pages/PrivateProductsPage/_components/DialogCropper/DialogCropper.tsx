import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface DialogCropperProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  srcToCrop: string;
  confirmCrop: () => void;
  cropperRef: React.RefObject<HTMLImageElement | null>;
}

function DialogCropper({
  open,
  setOpen,
  srcToCrop,
  confirmCrop,
  cropperRef,
}: DialogCropperProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajustar imagen</DialogTitle>
        </DialogHeader>
        {srcToCrop && (
          <div className="space-y-3">
            <Cropper
              src={srcToCrop}
              ref={cropperRef}
              style={{ height: 350, width: "100%" }}
              aspectRatio={1}
              viewMode={1}
              guides={false}
              dragMode="move"
              background={false}
              autoCropArea={1}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="button" onClick={confirmCrop}>
                Recortar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
export default DialogCropper;
