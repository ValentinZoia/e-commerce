import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ProductImagePreviewProps {
  url: string;
  i: number;
  removeImage: (idx: number) => void;
  existingOrLocal: "existente" | "local";
}

function ProductImagePreview({
  url,
  i,
  removeImage,
  existingOrLocal,
}: ProductImagePreviewProps) {
  return (
    <div key={`${existingOrLocal}-${i}`} className="relative">
      <img src={url} className="w-32 h-32 object-cover rounded-md" />
      <Button
        type="button"
        size="icon"
        variant="destructive"
        className="absolute top-1 right-1"
        onClick={() => removeImage(i)}
        aria-label={`Eliminar imagen ${existingOrLocal}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
export default ProductImagePreview;
