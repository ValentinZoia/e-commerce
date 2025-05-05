import { cn } from '@/lib/utils'
import { Product } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {  useEffect} from 'react';
import {Image} from '@/components/Image'
import { Badge } from '@/components/ui/badge';

interface Props {
    product: Product;
    currentImageIndex: number;
    setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>
    isDiscounted: boolean;
}

const ProductDetailImage = ({product, currentImageIndex, setCurrentImageIndex, isDiscounted}:Props) => {
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setCurrentImageIndex(prev => {
          if (prev === 0) return prev;
          return prev - 1;
        });
      } else if (event.key === "ArrowRight") {
        setCurrentImageIndex(prev => {
          if (prev === product.images.length - 1) return prev;
          return prev + 1;
        });
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []); 
  
  
  
    return (
    <>
    <ChevronLeft
                  className={cn(
                    "md:hidden w-8 h-8 absolute top-1/2 left-0 z-10 text-white cursor-pointer  hover:bg-gradient-to-r hover:from-transparent hover:to-black  transition-transform duration-300 rounded-[inherit] ",
                    product.images.length <= 1 && "hidden",
                    currentImageIndex === 0 && "hidden"
                  )}
                  onClick={()=> setCurrentImageIndex(currentImageIndex - 1)}
                  
                 />

                <ChevronRight
                  className={cn(
                    "md:hidden w-8 h-8 absolute top-1/2 right-0 z-10 text-white cursor-pointer  hover:bg-gradient-to-l hover:from-transparent hover:to-black  transition-transform duration-300 rounded-[inherit]",
                    product.images.length <= 1 && "hidden",
                    currentImageIndex === product.images.length - 1 &&
                      "hidden"
                  )}
                  onClick={()=> setCurrentImageIndex(currentImageIndex + 1)}
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
                {isDiscounted && (
                    <Badge className="absolute top-3 right-3 bg-celeste/95 hover:bg-celeste">
                      {product.discountPercentage && product.discountPercentage * 100}% OFF
                    </Badge>
                  )}
                {product.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 text-xs bg-white/80 px-2 py-1 rounded-full">
                    {currentImageIndex + 1}/{product.images.length}
                  </div>
                )}
    </>
  )
}

export default ProductDetailImage