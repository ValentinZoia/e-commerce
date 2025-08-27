import { Card } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { DetailOrderProductsHeader } from "../DetailOrderProductsHeader";
import { DetailOrderProductsBody } from "../DetailOrderProductsBody";
import { CartItem } from "@/types";

interface DetailOrderProductsProps {
  totalItems: number;
  totalPrice: number;
  isFreeShipping: boolean;
  items: CartItem[];
  needActions?: boolean;
}

function DetailOrderProductsCard({
  totalItems,
  totalPrice,
  isFreeShipping,
  items,
  needActions,
}: DetailOrderProductsProps) {
  console.log(items);
  return (
    <Card className="rounded-none">
      <DetailOrderProductsHeader items={items} needActions={needActions} />
      <Separator />
      <DetailOrderProductsBody
        totalItems={totalItems}
        totalPrice={totalPrice}
        isFreeShipping={isFreeShipping}
      />
    </Card>
  );
}
export default DetailOrderProductsCard;
