import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface Props {
  isLoading: boolean;
  name: string;
}

const SubmitBtn = ({ isLoading, name }: Props) => {
  return (
    <Button
      disabled={isLoading}
      className={cn(
        " cursor-pointer",
        isLoading && "opacity-50 cursor-not-allowed"
      )}
      type="submit"
    >
      {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : name}
    </Button>
  );
};
export default SubmitBtn;
