export async function uploadToCloudinary(file: File) {
  const preset_name = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_name);
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    // Asegurarse de usar HTTPS en la URL
    const secureUrl = data.url.replace(/^http:\/\//i, "https://");

    return { data: secureUrl, error: null };
  } catch (error) {
    return { data: null, error: "Failed to upload image" + error };
  }
}
