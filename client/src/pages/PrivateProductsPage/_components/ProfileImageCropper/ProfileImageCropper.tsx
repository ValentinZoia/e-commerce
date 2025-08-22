import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useRef } from "react";

interface ProfileImageCropperProps {
  image: string; // base64 o URL del file
  onCrop: (croppedImage: string) => void;
}

export function ProfileImageCropper({
  image,
  onCrop,
}: ProfileImageCropperProps) {
  const cropperRef = useRef<HTMLImageElement>(null);

  const handleCrop = () => {
    const cropper = (cropperRef.current as any)?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas({
        width: 300,
        height: 300,
      });
      onCrop(canvas.toDataURL("image/png"));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Cropper
        src={image}
        style={{ height: 300, width: "100%" }}
        aspectRatio={1}
        guides={false}
        ref={cropperRef}
        viewMode={1}
      />
      <button
        type="button"
        className="px-4 py-2 bg-primary text-white rounded"
        onClick={handleCrop}
      >
        Recortar
      </button>
    </div>
  );
}
