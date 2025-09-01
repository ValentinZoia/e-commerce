import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "@/components/ui/button";
import { CropperData } from "@/hooks/Shared/useImageCropper";

interface ImageCropperModalProps {
  cropperData: CropperData;
  cropperRef: React.RefObject<HTMLImageElement | null>;
  aspectRatio: number;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ImageCropperModal({
  cropperData,
  cropperRef,
  aspectRatio,
  isLoading,
  onConfirm,
  onCancel,
}: ImageCropperModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">
          Recortar {cropperData.type === "logo" ? "Logo" : "Banner"}
        </h3>
        <div className="mb-4">
          <Cropper
            ref={cropperRef}
            src={cropperData.cropper}
            style={{ height: 400, width: "100%" }}
            aspectRatio={aspectRatio}
            guides={false}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="button" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Subiendo..." : "Confirmar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ImageCropperModal;
