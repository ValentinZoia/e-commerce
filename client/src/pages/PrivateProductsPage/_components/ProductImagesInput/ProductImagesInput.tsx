import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ProductImagePreview } from "../ProductImagesPreview";
import { DialogCropper } from "../DialogCropper";

interface ProductImagesInputProps {
  max?: number;
  localFiles: File[]; //estos no estan en la db - serian para subir
  setLocalFiles: (files: File[]) => void;
  existingUrls: string[]; // las que ya estan en la bd - para cuando se editan los datos
  setExistingUrls: (urls: string[]) => void;
}

export function ProductImagesInput({
  max = 5,
  localFiles,
  setLocalFiles,
  existingUrls,
  setExistingUrls,
}: ProductImagesInputProps) {
  const [open, setOpen] = useState(false);
  const [srcToCrop, setSrcToCrop] = useState<string | null>(null);
  const [pendingFileName, setPendingFileName] = useState<string>("image.png");
  const cropperRef = useRef<HTMLImageElement>(null);

  const totalCount = existingUrls.length + localFiles.length;

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (totalCount >= max) {
      // Podés reemplazar por toast/notification
      console.warn(`Máximo ${max} imágenes`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSrcToCrop(reader.result as string);
      setPendingFileName(file.name);
      setOpen(true);
    };
    reader.readAsDataURL(file);
    // Limpia el input para permitir volver a elegir el mismo archivo
    e.currentTarget.value = "";
  };
  const confirmCrop = () => {
    const cropper = (cropperRef.current as any)?.cropper;
    if (!cropper) return;
    // cuadrado para productos
    const canvas = cropper.getCroppedCanvas({ width: 800, height: 800 });
    canvas.toBlob((blob: Blob) => {
      if (!blob) return;
      const file = new File(
        [blob],
        pendingFileName.replace(/\.(jpe?g|png|webp)$/i, "") + "-cropped.png",
        {
          type: "image/png",
        }
      );
      setLocalFiles([...localFiles, file]);
      setOpen(false);
      setSrcToCrop(null);
    }, "image/png");
  };

  const removeLocal = (idx: number) => {
    const next = [...localFiles];
    next.splice(idx, 1);
    setLocalFiles(next);
  };

  const removeExisting = (idx: number) => {
    const next = existingUrls.filter((_, i) => i !== idx);
    setExistingUrls(next);
  };

  // liberar objectURLs creados en previews
  useEffect(() => {
    return () => {
      // nada que limpiar aquí porque usamos URL.createObjectURL on-the-fly
    };
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Input type="file" accept="image/*" onChange={handleChooseFile} />
        <span className="text-sm text-muted-foreground">
          {totalCount}/{max}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Previews de URLs existentes */}
        {existingUrls.map((url, i) => (
          <ProductImagePreview
            url={url}
            i={i}
            removeImage={removeExisting}
            existingOrLocal="existente"
          />
        ))}

        {/* Previews de archivos locales aún no subidos */}
        {localFiles.map((file, i) => {
          const preview = URL.createObjectURL(file);
          return (
            <ProductImagePreview
              url={preview}
              i={i}
              removeImage={removeLocal}
              existingOrLocal="local"
            />
          );
        })}
      </div>

      <DialogCropper
        open={open}
        setOpen={setOpen}
        srcToCrop={srcToCrop!}
        confirmCrop={confirmCrop}
        cropperRef={cropperRef}
      />
    </div>
  );
}
