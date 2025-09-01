import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploadArea } from "@/components/ImageUploadArea";

interface LogoUploadSectionProps {
  logoPreview: string | null;
  onLogoSelect: (file: File) => void;
  onLogoRemove: () => void;
}

function LogoUploadSection({
  logoPreview,
  onLogoSelect,
  onLogoRemove,
}: LogoUploadSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Logo de la Tienda</CardTitle>
      </CardHeader>
      <CardContent>
        <ImageUploadArea
          imageUrl={logoPreview}
          onImageSelect={onLogoSelect}
          onImageRemove={onLogoRemove}
          placeholder="Seleccionar Logo"
          type="logo"
          className="p-8"
        />
      </CardContent>
    </Card>
  );
}
export default LogoUploadSection;
