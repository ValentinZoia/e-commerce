import { Badge } from "../ui/badge";

function BadgeProductDiscount({
  discountText,
}: {
  discountText: string | null | undefined;
}) {
  return (
    discountText && (
      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-3 py-1 text-xs shadow-lg">
        -{discountText}
      </Badge>
    )
  );
}
export default BadgeProductDiscount;
