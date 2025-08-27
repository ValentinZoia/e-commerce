import { Card } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { DetailOrderProductsHeader } from "../DetailOrderProductsHeader";

import { JSX } from "react";

interface DetailOrderProductsProps {
  HeaderComponent: JSX.Element;
  BodyComponent: JSX.Element;
  headerTitle: string;
}

function DetailOrderProductsCard({
  BodyComponent,
  HeaderComponent,
  headerTitle,
}: DetailOrderProductsProps) {
  return (
    <Card className="rounded-none">
      <DetailOrderProductsHeader title={headerTitle}>
        {HeaderComponent}
      </DetailOrderProductsHeader>
      <Separator />
      {BodyComponent}
      {/* <DetailOrderProductsBody
        totalItems={totalItems}
        totalPrice={totalPrice}
        isFreeShipping={isFreeShipping}
      /> */}
    </Card>
  );
}
export default DetailOrderProductsCard;
