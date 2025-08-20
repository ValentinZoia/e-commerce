import { LoaderCircle } from "lucide-react";

function LoaderPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoaderCircle className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );
}
export default LoaderPage;
