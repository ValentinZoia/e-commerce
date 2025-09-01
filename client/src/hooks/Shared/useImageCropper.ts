// hooks/useImageCropper.ts
import { useState, useRef } from "react";
import { transformImageToWebp, uploadToCloudinary } from "@/utilities/Images";

export interface CropperData {
  type: "logo" | "banner";
  index?: number;
  file: File;
  cropper: string;
}

export interface CropperConfig {
  width: number;
  height: number;
  aspectRatio: number;
}

const cropperConfigs: Record<"logo" | "banner", CropperConfig> = {
  logo: { width: 300, height: 300, aspectRatio: 1 },
  banner: { width: 1200, height: 375, aspectRatio: 3.2 },
};

export const useImageCropper = () => {
  const [cropperData, setCropperData] = useState<CropperData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cropperRef = useRef<HTMLImageElement>(null);

  const openCropper = (file: File, type: "logo" | "banner", index?: number) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCropperData({
        type,
        index,
        file,
        cropper: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const closeCropper = () => {
    setCropperData(null);
  };

  const confirmCrop = async (
    onSuccess: (url: string, type: "logo" | "banner", index?: number) => void,
    onError?: (error: any) => void
  ) => {
    if (!cropperData || !cropperRef.current) return;

    const cropper = (cropperRef.current as any).cropper;
    const config = cropperConfigs[cropperData.type];

    const canvas = cropper.getCroppedCanvas({
      width: config.width,
      height: config.height,
    });

    canvas.toBlob(async (blob: Blob) => {
      if (!blob) return;

      const file = new File([blob], `${cropperData.type}-${Date.now()}.webp`, {
        type: "image/webp",
      });

      setIsLoading(true);
      try {
        const webpFile = await transformImageToWebp(file, cropperData.type);
        if (!webpFile) {
          throw new Error("No se pudo transformar a WebP");
        }

        const { data, error } = await uploadToCloudinary(webpFile);
        if (error || !data) {
          throw new Error(`Error subiendo a Cloudinary: ${error}`);
        }

        onSuccess(data, cropperData.type, cropperData.index);
        setCropperData(null);
      } catch (error) {
        console.error("Error en el proceso de subida:", error);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    }, "image/webp");
  };

  const getConfig = (type: "logo" | "banner") => cropperConfigs[type];

  return {
    cropperData,
    isLoading,
    cropperRef,
    openCropper,
    closeCropper,
    confirmCrop,
    getConfig,
  };
};
