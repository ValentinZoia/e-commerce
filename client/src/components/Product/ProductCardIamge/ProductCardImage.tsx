import { Product, ProductStatus } from "@/types/product";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/Image";

interface ProductCardImageProps {
  product: Product;
  discountText?: string | null;
  productsStatus?: ProductStatus;
}

function ProductCardImage({ product, discountText }: ProductCardImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <Link to={`/products/${product.id}`} className="w-full">
      <div
        className="relative aspect-square overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="object-cover transition-transform duration-300 hover:scale-105"
          placeholderSrc="https://placehold.co/300"
          errorSrc="https://placehold.co/300"
          lazy={true}
          aspectRatio={1}
          threshold={0.2}
        />
        {product.discountPercentage && product.discountPercentage > 0 && (
          <Badge className="absolute top-2 right-2 bg-celeste/95 hover:bg-celeste">
            -{discountText}
          </Badge>
        )}
      </div>
    </Link>
  );
}
export default ProductCardImage;
