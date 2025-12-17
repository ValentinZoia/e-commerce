import { FormLabel, FormMessage } from "../ui/form";
import { ProductImagesInput } from "@/pages/PrivateProductsPage/_components/ProductImagesInput";

interface ImageUploadSectionProps {
    existingUrls: string[];
    setExistingUrls: React.Dispatch<React.SetStateAction<string[]>>;
    localFiles: File[];
    setLocalFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageUploadSection({
    existingUrls,
    localFiles,
    setExistingUrls,
    setLocalFiles,
}: ImageUploadSectionProps) {
    return (
        <div className="space-y-2">
            <FormLabel>Imágenes (máx 5)</FormLabel>
            <ProductImagesInput
                max={5}
                localFiles={localFiles}
                setLocalFiles={setLocalFiles}
                existingUrls={existingUrls}
                setExistingUrls={setExistingUrls}
            />
            <FormMessage />
        </div>
    );
}
