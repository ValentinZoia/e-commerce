// hooks/useStoreForm.ts
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  storeCustomerSchema,
  StoreCustomerFormValues,
  defaultValues,
} from "@/lib/zod-schemas/storeCustomerSchema";
import { StoreCustomer } from "@/types";
import { useStoreCustomerMutations } from "@/hooks/StoreCustomer/useStoreCustomerMutations";

export const useStoreForm = (data: StoreCustomer) => {
  const { createMuation, updateMuation } = useStoreCustomerMutations();
  const [logoPreview, setLogoPreview] = useState<string | null>(
    data?.logo || null
  );

  const form = useForm<StoreCustomerFormValues>({
    resolver: zodResolver(storeCustomerSchema),
    defaultValues: data || defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "banners",
  });

  const updateLogo = (url: string) => {
    form.setValue("logo", url);
    setLogoPreview(url);
  };

  const removeLogo = () => {
    form.setValue("logo", null);
    setLogoPreview(null);
  };

  const updateBannerImage = (index: number, url: string) => {
    form.setValue(`banners.${index}.imageUrl`, url);
  };

  const addBanner = () => {
    if (fields.length < 3) {
      append({
        imageUrl: "",
        title: null,
        description: null,
        redirectUrl: null,
      });
    }
  };

  const removeBanner = (index: number) => {
    remove(index);
  };

  const getBannerImageUrl = (index: number): string => {
    return form.watch(`banners.${index}.imageUrl`) as string;
  };

  const onSubmit = async () => {
    const values = form.getValues();
    console.log(values);
    const banners = [...values.banners];
    console.log(banners);
    const dataToSave: StoreCustomerFormValues = {
      ...values,
      banners,
    };

    try {
      if (data) {
        updateMuation.mutate({ id: data.id, values: dataToSave });
        console.log("Updating store data:", dataToSave);
        return;
      }
      createMuation.mutate(dataToSave);
      console.log("Submitting store data:", dataToSave);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return {
    form,
    fields,
    logoPreview,
    updateLogo,
    removeLogo,
    updateBannerImage,
    addBanner,
    removeBanner,
    getBannerImageUrl,
    onSubmit,
    isSubmitting: createMuation.isPending || updateMuation.isPending,
  };
};
