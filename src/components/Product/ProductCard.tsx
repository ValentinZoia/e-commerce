import { Product } from "@/types"
import{ Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {Image} from '@/components/Image'

import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({product}:ProductCardProps) => {
  
  const handleAddToCart = () =>{
    console.log("se hagrego");
  }
  const isLowStock = product.stock <= 5 && product.stock > 0
  const isOutOfStock = product.stock === 0

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
       
        <Image
        src={product.image}
        alt={product.name}
        placeholderSrc="https://placehold.co/300"
        errorSrc="https://placehold.co/300"
        lazy={true}
        aspectRatio={1}
        className="object-cover transition-transform hover:scale-105"
        threshold={0.2}
          />

        {product.isFeatured && (
          <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">Featured</Badge>
        )}
      </div>
      <CardHeader className="px-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
            {product.category && (
              <CardDescription className="text-xs text-muted-foreground">{product.category.name}</CardDescription>
            )}
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-4 pt-0">
        <div>
          {isOutOfStock ? (
            <Badge variant="destructive">Out of stock</Badge>
          ) : isLowStock ? (
            <Badge variant="outline" className="text-amber-500 border-amber-500">
              Low stock: {product.stock} left
            </Badge>
          ) : (
            <Badge variant="outline" className="text-emerald-500 border-emerald-500">
              In stock: {product.stock}
            </Badge>
          )}
        </div>
        <Button onClick={handleAddToCart} disabled={isOutOfStock} size="sm" className="gap-1 cursor-pointer">
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard