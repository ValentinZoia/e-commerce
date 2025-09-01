// utils/images.ts
import Resizer from "react-image-file-resizer";
import imageCompression from "browser-image-compression";

export type ImageType = "product" | "logo" | "banner";

interface ImageConfig {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  maxSizeMB: number;
}

const IMAGE_CONFIGS: Record<ImageType, ImageConfig> = {
  product: {
    maxWidth: 800,
    maxHeight: 800,
    quality: 80,
    maxSizeMB: 0.7,
  },
  logo: {
    maxWidth: 300,
    maxHeight: 300,
    quality: 90, // Mayor calidad para logos
    maxSizeMB: 0.3,
  },
  banner: {
    maxWidth: 1200,
    maxHeight: 375, // Aspect ratio 16:5 (1200/375 = 3.2, aproximadamente 16:5)
    quality: 85,
    maxSizeMB: 1.0, // Más tamaño permitido para banners
  },
};

export const transformImageToWebp = async (
  file: File,
  imageType: ImageType = "product"
): Promise<File | null> => {
  try {
    const config = IMAGE_CONFIGS[imageType];

    const options = {
      maxSizeMB: config.maxSizeMB,
      maxWidthOrHeight: Math.max(config.maxWidth, config.maxHeight),
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        compressedFile,
        config.maxWidth,
        config.maxHeight,
        "WEBP",
        config.quality,
        0,
        (uri) => {
          resolve(new File([uri as Blob], file.name, { type: "image/webp" }));
        },
        "blob",
        config.maxWidth,
        config.maxHeight
      );
    });
  } catch (error) {
    console.error("Error al transformar la imagen:", error);
    return null;
  }
};
