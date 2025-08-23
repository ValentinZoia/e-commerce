import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Image } from "@/components/Image";
import { BadgeProductDiscount } from "@/components/BadgeProductDiscount";

interface Props {
  product: Product;

  isDiscounted: boolean;
}

const ProductDetailImage = ({ product, isDiscounted }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const discountText = product.discountPercentage
    ? `${product.discountPercentage * 100}% OFF`
    : null;
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => {
          if (prev === 0) return prev;
          return prev - 1;
        });
      } else if (event.key === "ArrowRight") {
        setCurrentImageIndex((prev) => {
          if (prev === product.images.length - 1) return prev;
          return prev + 1;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const handleMouseEnter = (index: number) => {
    if (product.images.length > 1) {
      setCurrentImageIndex(index);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        {/* VISTA DE IMAGENES PEQUEÑAS - SE VERA A PARTIR DE MD */}
        {product.images.length > 1 && (
          <div className="hidden md:flex flex-col gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={cn(
                  "w-20 h-20 border rounded cursor-pointer overflow-hidden",
                  currentImageIndex === index && "border-celeste border-2"
                )}
                // onClick={() => setCurrentImageIndex(index)}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Vista ${index + 1}`}
                  placeholderSrc="https://placehold.co/80"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                  lazy={false}
                  aspectRatio={1}
                  threshold={0.2}
                />
              </div>
            ))}
          </div>
        )}

        {/* IMAGEN PRINCIPAL - SE VERA EN TODAS LAS RESOLUCIONES */}
        <div className="relative  aspect-square w-full overflow-hidden rouded-md border">
          <ChevronLeft
            className={cn(
              "md:hidden w-8 h-8 absolute top-1/2 left-0 z-10 text-white cursor-pointer  hover:bg-gradient-to-r hover:from-transparent hover:to-black  transition-transform duration-300 rounded-[inherit] ",
              product.images.length <= 1 && "hidden",
              currentImageIndex === 0 && "hidden"
            )}
            onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
          />

          <ChevronRight
            className={cn(
              "md:hidden w-8 h-8 absolute top-1/2 right-0 z-10 text-white cursor-pointer  hover:bg-gradient-to-l hover:from-transparent hover:to-black  transition-transform duration-300 rounded-[inherit]",
              product.images.length <= 1 && "hidden",
              currentImageIndex === product.images.length - 1 && "hidden"
            )}
            onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
          />

          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="object-cover transition-transform duration-300"
            placeholderSrc="https://placehold.co/300"
            errorSrc="https://placehold.co/300"
            lazy={true}
            threshold={0.2}
          />
          {isDiscounted && <BadgeProductDiscount discountText={discountText} />}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 right-3 text-xs bg-white/80 px-2 py-1 rounded-full">
              {currentImageIndex + 1}/{product.images.length}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailImage;
