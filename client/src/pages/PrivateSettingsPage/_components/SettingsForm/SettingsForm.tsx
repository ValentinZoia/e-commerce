import { StoreCustomer } from "@/types";
import { Form } from "@/components/ui/form";
import { SubmitBtn } from "@/pages/Login/_components";
import "cropperjs/dist/cropper.css";
import { ImageCropperModal } from "@/components/ImageCropperModal";
import { BannersSection } from "../BannersSection";
import { LogoUploadSection } from "../LogoUploadSection";
import { StoreInfoSection } from "../StoreInfoSection";
import { useStoreForm } from "@/hooks/StoreCustomer/useStoreForm";
import { useImageCropper } from "@/hooks/Shared/useImageCropper";

interface SettingsFormProps {
  data: StoreCustomer;
}

function SettingsForm({ data }: SettingsFormProps) {
  const {
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
    isSubmitting,
  } = useStoreForm(data);

  const {
    cropperData,
    isLoading: isLoadingImages,
    cropperRef,
    openCropper,
    closeCropper,
    confirmCrop,
    getConfig,
  } = useImageCropper();

  const handleImageSelect = (
    file: File,
    type: "logo" | "banner",
    index?: number
  ) => {
    openCropper(file, type, index);
  };

  const handleCropConfirm = () => {
    confirmCrop(
      (url, type, index) => {
        if (type === "logo") {
          updateLogo(url);
        } else if (type === "banner" && index !== undefined) {
          updateBannerImage(index, url);
        }
      },
      (error) => {
        console.error("Error processing image:", error);
      }
    );
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <StoreInfoSection control={form.control} />

          <LogoUploadSection
            logoPreview={logoPreview}
            onLogoSelect={(file) => handleImageSelect(file, "logo")}
            onLogoRemove={removeLogo}
          />

          <BannersSection
            control={form.control}
            fields={fields}
            onAddBanner={addBanner}
            onRemoveBanner={removeBanner}
            onBannerImageSelect={(index, file) =>
              handleImageSelect(file, "banner", index)
            }
            getBannerImageUrl={getBannerImageUrl}
          />

          <SubmitBtn
            name="Guardar Cambios"
            isLoading={isLoadingImages || isSubmitting}
          />
        </form>
      </Form>

      {/* Cropper Modal */}
      {cropperData && (
        <ImageCropperModal
          cropperData={cropperData}
          cropperRef={cropperRef}
          aspectRatio={getConfig(cropperData.type).aspectRatio}
          isLoading={isLoadingImages}
          onConfirm={handleCropConfirm}
          onCancel={closeCropper}
        />
      )}
    </div>
  );
}
export default SettingsForm;
