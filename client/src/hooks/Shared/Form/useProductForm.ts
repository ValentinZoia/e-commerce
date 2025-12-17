import {
    ProductFormValues,
    defaultValues,
    productSchema,
} from "@/lib/zod-schemas/productSchema";
import { Product, Size } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transformImageToWebp, uploadToCloudinary } from "@/utilities/Images";
import { useInstallments } from "./useInstallments";

interface Props {
    product: Product | null;
    onSave: (product: ProductFormValues) => void;
}

export const useProductForm = ({ product, onSave }: Props) => {
    const [sizes, setSizes] = useState<Size[]>(product?.sizes || []);
    const [newSize, setNewSize] = useState<Size>({
        name: "",
        stock: 0,
    });

    // URLs ya persistidas (si estás editando un producto existente)
    const [existingUrls, setExistingUrls] = useState<string[]>(
        product?.images ?? [],
    );
    // Archivos locales recortados aún NO subidos
    const [localFiles, setLocalFiles] = useState<File[]>([]);

    const [isLoadingImages, setIsLoadingImages] = useState(false);

    const {
        installments,
        addInstallment,
        newInstallment,
        removeInstallment,
        setNewInstallment,
    } = useInstallments(product?.installments);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: product || defaultValues,
    });

    function addSize() {
        if (newSize.name) {
            setSizes([...sizes, newSize]);
            setNewSize({ name: "", stock: 0 });
        }
    }

    function removeSize(index: number) {
        setSizes(sizes.filter((_, i) => i !== index));
    }
    const onSubmit = async () => {
        setIsLoadingImages(true);
        const values = form.getValues();

        // 1) Subir solo las nuevas (localFiles) — las existingUrls ya están en Cloudinary
        const uploadedUrls: string[] = [];
        for (const file of localFiles) {
            // Convertir a WEBP
            const webpFile = await transformImageToWebp(file, "product");
            if (!webpFile) {
                console.error("No se pudo transformar a WebP");
                continue;
            }

            // Subir a Cloudinary
            const { data, error } = await uploadToCloudinary(webpFile);
            if (error || !data) {
                console.error("Error subiendo a Cloudinary", error);
                setIsLoadingImages(false);
                continue;
            }
            uploadedUrls.push(data);
        }

        // 2) Combinar con existentes y respetar máximo (ej. 5)
        const finalImages = [...existingUrls, ...uploadedUrls].slice(0, 5);

        // 3) Enviar a onSave con las URLs finales
        onSave({
            ...values,
            sizes,
            installments: installments[0] ? installments : [],
            images: finalImages, // <- string[]
        });

        setIsLoadingImages(false);
    };

    return {
        form,
        sizes: { sizes, addSize, removeSize, newSize, setNewSize },
        installments: {
            installments,
            addInstallment,
            removeInstallment,
            newInstallment,
            setNewInstallment,
        },
        images: {
            existingUrls,
            setExistingUrls,
            localFiles,
            setLocalFiles,
            isLoadingImages,
        },
        onSubmit,
    };
};
