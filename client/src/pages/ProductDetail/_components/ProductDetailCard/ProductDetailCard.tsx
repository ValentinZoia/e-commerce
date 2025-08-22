import { ProductStatus, type Product } from "@/types";

import { ChevronRight, RotateCcw, ShieldCheck } from "lucide-react";

import {
  calculateItemCashPrice,
  calculateItemPrice,
} from "@/utilities/cartSlice";
import { Link } from "react-router-dom";

import { capitalizeFirstLetter, formatPrice } from "@/utilities";

import { ProductDetailImage } from "../ProductDetailImage";
import { ProductSizesHandler } from "../ProductSizesHandler";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductsHeader } from "@/components/ProductsHeader";
import { renderStockMessage } from "@/components/Product/RenderStockMessage";

interface ProductDetailCardProps {
  product: Product;
}

const ProductDetailCard = ({ product }: ProductDetailCardProps) => {
  const isDiscount =
    product.discountPercentage === null || product.discountPercentage === 0
      ? false
      : true;

  const isCashDiscount =
    product.cashDiscountPercentage === null ||
    product.cashDiscountPercentage === 0
      ? false
      : true;

  return (
    <>
      <div className="max-w-6xl mx-auto   ">
        {product.categoryId && product.name && (
          <div className="flex items-center gap-1 text-sm mb-4">
            <div className="flex items-center">
              <Link to={"/"} className=" hover:underline">
                Inicio
              </Link>
              <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
            </div>
            <div className="flex items-center">
              <Link
                to={`/categories/${product.categoryId.toLocaleLowerCase()}`}
                className=" hover:underline"
              >
                {capitalizeFirstLetter(product.categoryId)}
              </Link>
              <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
            </div>
            <div className="flex items-center">
              <Link to={`/products/${product.id}`} className=" hover:underline">
                {product.name}
              </Link>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Parte izquierda - Imagenes */}
            <div className="space-y-4">
              <ProductDetailImage product={product} isDiscounted={isDiscount} />
            </div>

            {/* Parte derecha - Detalles */}
            <div className="space-y-6">
              {/* Datos del producto */}
              <div>
                {/* Nombre */}
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>

                {/* Precios y Descuentos */}
                <div className="space-y-2">
                  {/* precio normal y con descuento fijo */}
                  <div className="flex flex-col items-start gap-1">
                    {/* precio normal tachado si hay decuento aparece sino no */}
                    {isDiscount && (
                      <span className="text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                    )}

                    {/* precio normal o con descuento fijo */}
                    <div className="flex items-center gap-2">
                      <span className="text-4xl ">
                        {formatPrice(calculateItemPrice(product))}
                      </span>

                      {isDiscount && (
                        <span className="text-celeste font-semilight text-lg">
                          {product.discountPercentage &&
                            product.discountPercentage * 100}
                          % OFF
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Precio con descuento  por pagar en efectivo */}
                  {isCashDiscount && (
                    <p className="text-celeste">
                      <span className="text-2xl ">
                        {formatPrice(calculateItemCashPrice(product))}{" "}
                      </span>
                      <span className="">con Efectivo o Transferencia</span>
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
                  {renderStockMessage(product)}
                </div>
              </div>

              {/* Envio gratis */}
              {product.isFreeShipping && !product.freeShippingThreshold && (
                <div className="flex items-center gap-2  ">
                  <span className="text-md bg-celeste text-white px-4 py-1 rounded-md font-bold">
                    Envio gratis
                  </span>
                </div>
              )}

              {!product.isFreeShipping && product.freeShippingThreshold && (
                <div className="flex items-center gap-2 text-celeste text-sm">
                  <span>
                    Envio gratis superando los{" "}
                    {formatPrice(product.freeShippingThreshold)}
                  </span>
                </div>
              )}

              {/* Sizes - Talles y  Button para agregar al carrito */}
              <ProductSizesHandler product={product} />

              {/* Politicas - Datos sugeridos - Etc */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-gray-700 mt-0.5" />
                  <div>
                    <p className="font-medium">Compra protegida</p>
                    <p className="text-sm text-gray-600">
                      Tus datos cuidados durante toda la compra.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="h-5 w-5 text-gray-700 mt-0.5" />
                  <div>
                    <p className="font-medium">Cambios y devoluciones</p>
                    <p className="text-sm text-gray-600">
                      Si no te gusta, contactanos y hacemos el cambio o la
                      devolución.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Descripcion */}
          {product.description && (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">
                  Descripción
                </AccordionTrigger>
                <AccordionContent className="text-sm mb-4 mt-2 whitespace-pre-line break-words">
                  {product.description}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          <ProductsHeader
            title="Productos Recomendados"
            productsStatus={ProductStatus.FORCATEGORY}
            categoryId={product.categoryId}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetailCard;
