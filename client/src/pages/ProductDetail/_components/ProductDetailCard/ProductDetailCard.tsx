import { type Product } from "@/types"
import { Image } from "@/components/Image"
import { Share2 } from "lucide-react"
import { AddProductButton } from "@/components"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { calculateItemPrice } from "@/utilities/cartSlice"

interface ProductDetailCardProps {
  product: Product
 
}

const ProductDetailCard = ({ product }: ProductDetailCardProps) => {
 

  // Determine if product is in stock
  const inStock = product.stock > 0

  const isProductNew =  product.isNew;
  const isProductPromotion = product.isPromotion;

  const discountPorcentage = product?.discount ? product.discount * 100 : 0;

  return (
    <section className="flex flex-col items-center justify-between gap-8 md:flex-row">
      {/* Image */}
      <div className="w-full md:w-1/2 lg:w-2/5">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          placeholderSrc="https://placehold.co/300"
          errorSrc="https://placehold.co/300"
          lazy={true}
          height={300}
          width={300}
          className="object-cover w-full rounded-lg"
          
        />
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col gap-4">
        {/* Product Status Badges */}
        <div className="flex gap-2">
          
        {((isProductPromotion) ||
          (isProductNew)) && (
          <Badge
            className={cn(" z-10", {
              "bg-red-500 hover:bg-red-600":
                isProductPromotion,
              "bg-green-500 hover:bg-green-600":
                isProductNew,
            })}
          >
            {isProductPromotion &&
              `-${discountPorcentage}%`}
            {isProductNew && "Nuevo"}
          </Badge>
        )}
        </div>

        {/* Product Name */}
        <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

        {/* Category */}
        {product.category && (
          <div className="text-sm text-gray-600">Categoría: {product.category.name || "No especificada"}</div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-bold text-gray-900">${calculateItemPrice(product).toFixed(0)}</span>

          {product.discount && (
            <>
              <span className="text-lg text-gray-500 line-through">${product.price}</span>
              <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                {Math.round(product.discount * 100)}% OFF
              </span>
            </>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
        )}
        

        {/* Stock Status */}
        <div className="mt-4">
          <span className={`font-medium ${inStock ? "text-green-600" : "text-red-600"}`}>
            {inStock ? `En stock (${product.stock} disponibles)` : "Agotado"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-wrap">
          <AddProductButton product={product} size={"xl"} />
          
          
          

          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50">
            <Share2 size={20} />
            Compartir
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Información adicional</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Envío gratis en compras superiores a $50</li>
            <li>• Garantía de devolución de 30 días</li>
            <li>• Soporte al cliente 24/7</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailCard
