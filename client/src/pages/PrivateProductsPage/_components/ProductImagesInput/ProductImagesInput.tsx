import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

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
          <div key={`existing-${i}`} className="relative">
            <img src={url} className="w-32 h-32 object-cover rounded-md" />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute top-1 right-1"
              onClick={() => removeExisting(i)}
              aria-label="Eliminar imagen existente"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {/* Previews de archivos locales aún no subidos */}
        {localFiles.map((file, i) => {
          const preview = URL.createObjectURL(file);
          return (
            <div key={`local-${i}`} className="relative">
              <img
                src={preview}
                className="w-32 h-32 object-cover rounded-md"
              />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1"
                onClick={() => removeLocal(i)}
                aria-label="Eliminar imagen local"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>

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
    </div>
  );
}
