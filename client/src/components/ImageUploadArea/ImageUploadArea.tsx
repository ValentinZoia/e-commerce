import { ImageIcon, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
interface ImageUploadAreaProps {
  imageUrl?: string | null;
  onImageSelect: (file: File) => void;
  onImageRemove?: () => void;
  placeholder?: string;
  className?: string;
  imageClassName?: string;
  type?: "logo" | "banner";
}
function ImageUploadArea({
  imageUrl,
  onImageSelect,
  onImageRemove,
  placeholder,
  className,
  imageClassName,
  type = "banner",
}: ImageUploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  if (imageUrl) {
    return (
      <div
        className={`relative ${
          type === "logo" ? "w-32 h-32 mx-auto" : "w-full"
        } ${className}`}
      >
        <img
          src={imageUrl}
          alt="Preview"
          className={`w-full ${
            type === "logo" ? "h-full" : "h-32"
          } object-cover rounded-lg border ${imageClassName}`}
        />
        {onImageRemove && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2"
            onClick={onImageRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center ${className}`}
    >
      <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <p className="text-sm text-gray-600 mb-4">
        {type === "logo"
          ? "Sube el logo de tu tienda"
          : "Sube la imagen del banner"}
      </p>
      <Button
        type="button"
        variant="outline"
        onClick={triggerFileInput}
        size="sm"
      >
        <Upload className="w-4 h-4 mr-2" />
        {placeholder}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
export default ImageUploadArea;
