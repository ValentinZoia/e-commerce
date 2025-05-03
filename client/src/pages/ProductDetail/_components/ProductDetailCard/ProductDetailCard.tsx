import { type Product } from "@/types";
import { Image } from "@/components/Image";
import { ChevronRight, RotateCcw, ShieldCheck} from "lucide-react";
import { AddProductButton } from "@/components";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  calculateItemCashPrice,
  calculateItemPrice,
} from "@/utilities/cartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatPrice } from "@/utilities";
import { Button } from "@/components/ui/button";

interface ProductDetailCardProps {
  product: Product;
}

const ProductDetailCard = ({ product }: ProductDetailCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    if (product.images.length > 1) {
      setCurrentImageIndex(index);
    }
  };

  const renderStockMessage = () => {
    if (!product.stock) return;
    if (product.stock === 1) {
      return (
        <p className="text-amber-600 font-medium text-sm mt-1">
          ¡No te lo pierdas es el último!
        </p>
      );
    } else if (product.stock < 5) {
      return (
        <p className="text-amber-600 font-medium text-sm mt-1">
          ¡Solo quedan {product.stock} en stock!
        </p>
      );
    }
    return null;
  };
  return (
    <>
      <div className="max-w-6xl mx-auto px-4">
        {product.categoryId && product.name && (
          <div className="flex items-center gap-1 text-sm mb-4">
            <div className="flex items-center">
              <Link to={"/"} className="text-emerald-600 hover:underline">
                Inicio
              </Link>
              <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
            </div>
            <div className="flex items-center">
              <Link
                to={`/category/${product.categoryId.toLocaleLowerCase()}`}
                className="text-emerald-600 hover:underline"
              >
                {product.categoryId}
              </Link>
              <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
            </div>
            <div className="flex items-center">
              <Link
                to={`/products/${product.id}`}
                className="text-emerald-600 hover:underline"
              >
                {product.name}
              </Link>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Parte izquierda - Imagenes */}
          <div className="space-y-4">
            <div className="flex gap-4">
              {product.images.length > 1 && (
                <div className="hidden md:flex flex-col gap-2">
                  {product.images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-20 h-20 border rounded cursor-pointer overflow-hidden",
                        currentImageIndex === index &&
                          "border-emerald-500 border-2"
                      )}
                      // onClick={() => setCurrentImageIndex(index)}
                      onMouseEnter={()=>handleMouseEnter(index)}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - Vista ${index + 1}`}
                        placeholderSrc="caca"
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                        lazy={true}
                        aspectRatio={1}
                        threshold={0.2}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="relative  w-full overflow-hidden rouded-md border">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="object-cover transition-transform duration-300"
                  placeholderSrc="https://placehold.co/300"
                  errorSrc="https://placehold.co/300"
                  lazy={true}
                  
                  threshold={0.2}
                />
                {product.discountPercentage &&
                  product.discountPercentage > 0 && (
                    <Badge className="absolute top-3 right-3 bg-emerald-600 hover:bg-emerald-700">
                      {product.discountPercentage * 100}% OFF
                    </Badge>
                  )}
                {product.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 text-xs bg-white/80 px-2 py-1 rounded-full">
                    {currentImageIndex + 1}/{product.images.length}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Parte derecha - Detalles */}
          <div className="space-y-6">
            {/* Datos del producto */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>

                  <span className="text-2xl font-bold">
                    {formatPrice(calculateItemPrice(product))}
                  </span>

                  {product.discountPercentage &&
                    product.discountPercentage > 0 && (
                      <Badge className="bg-emerald-600 hover:bg-emerald-700">
                        -{product.discountPercentage * 100}%
                      </Badge>
                    )}
                </div>

                {/* Precio con descuento  por pagar en efectivo */}
                {product.cashDiscountPercentage &&
                  product.cashDiscountPercentage > 0 && (
                    <p className="text-emerald-600 font-medium">
                      {formatPrice(calculateItemCashPrice(product))} con
                      Efectivo o Transferencia
                    </p>
                  )}

                {/* Cuotas */}
                {product.installments && product.installments[0] && (
                  <p className=" text-gray-600">
                    {product.installments[0].quantity} cuotas sin interés de{" "}
                    {formatPrice(product.installments[0].amount)}
                  </p>
                )}
                {/* Stock */}
                {renderStockMessage()}
              </div>
            </div>

            {/* Envio gratis */}
            {product.isFreeShipping && !product.freeShippingThreshold && (
              <div className="flex items-center gap-2  ">
                <span className="text-md bg-emerald-600 text-white px-4 py-1 rounded-md font-bold" >Envio gratis</span>
              </div>
            )}

            { !product.isFreeShipping && product.freeShippingThreshold  && (
              <div className="flex items-center gap-2 text-emerald-600 text-sm">
                <span>Envio gratis superando los {formatPrice(product.freeShippingThreshold)}</span>
              </div>
            )}

            {/* Sizes - Talles */}
            {product.sizes && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium">Talle: {selectedSize}</p>
                    <p className="font-medium">Stock del talle: {selectedStock}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                    key={size.name}
                    variant={selectedSize === size.name ? "default" : "outline"}
                    className={cn(
                      "h-10 w-10 rounded-md cursor-pointer",
                      selectedSize === size.name ? "bg-primary text-white" : "bg-white"
                    )}
                    onClick={() =>{
                      setSelectedSize(size.name);
                      setSelectedStock(size.stock);
                    }}
                    disabled={size.stock === 0}
                    >
                      {size.name}
                      
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Agregar al carrito */}
            <div className="w-full flex items-center gap-4">
              <AddProductButton 
                product={product}
                disabled={product.sizes ?selectedStock === 0 : false}
                />
              
            </div>

            {/* Politicas - Datos sugeridos - Etc */}
            <div className="space-y-4 pt-4 border-t">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-gray-700 mt-0.5" />
              <div>
                <p className="font-medium">Compra protegida</p>
                <p className="text-sm text-gray-600">Tus datos cuidados durante toda la compra.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="h-5 w-5 text-gray-700 mt-0.5" />
              <div>
                <p className="font-medium">Cambios y devoluciones</p>
                <p className="text-sm text-gray-600">Si no te gusta, contactanos y hacemos el cambio o la devolución.</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailCard;
