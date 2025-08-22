// utils/images.ts
import Resizer from "react-image-file-resizer";
import imageCompression from "browser-image-compression";

export const transformImageToWebp = async (
  file: File
): Promise<File | null> => {
  try {
    const maxWidth = 800; // tamaño estándar productos
    const maxHeight = 800;

    const options = {
      maxSizeMB: 0.7,
      maxWidthOrHeight: maxWidth,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        compressedFile,
        maxWidth,
        maxHeight,
        "WEBP",
        80, // calidad
        0,
        (uri) => {
          resolve(new File([uri as Blob], file.name, { type: "image/webp" }));
        },
        "blob",
        maxWidth,
        maxHeight
      );
    });
  } catch (error) {
    console.error("Error al transformar la imagen:", error);
    return null;
  }
};
