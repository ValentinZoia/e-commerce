import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DetailOrderProductsHeaderProps {
  children?: React.ReactNode;
  title: string;
}

function DetailOrderProductsHeader({
  title,
  children,
}: DetailOrderProductsHeaderProps) {
  return (
    <CardHeader className="px-4 md:px-6">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{children}</CardDescription>
    </CardHeader>
  );
}
export default DetailOrderProductsHeader;
