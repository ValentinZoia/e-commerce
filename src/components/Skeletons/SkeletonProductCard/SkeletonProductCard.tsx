
import { Card, CardHeader, CardTitle,  CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"


const SkeletonProductCard = () => {
  return (
    
    
    <Card className="overflow-hidden transition-all hover:shadow-md ">
      
      <div className="relative aspect-square overflow-hidden">
        
        {/* IMAGEN DEL PRODUCTO */}
        <Skeleton className="absolute inset-0 h-full w-full rounded-none  " />
        
      </div>
      <CardHeader className="px-4">
        <div className="flex flex-col items-start justify-between">
          <div>
            <CardTitle className="line-clamp-1 text-lg">
              {/* NOMBRE DEL PRODUCTO */}
                <Skeleton className="h-4 w-36" />
            </CardTitle>
            
          </div>
          <div className="text-right flex items-center gap-2 mt-2">
            <span >
              {/* PRECIO */}
              <Skeleton className="h-3 w-24" />

            </span>
            
          </div>
        </div>
      </CardHeader>
      
      <CardFooter className="flex flex-wrap gap-2 items-center justify-between px-4 pt-0">
        <div>
          {/* STOCK */}
          <Skeleton className="h-5 w-24" />
        </div>
        
        {/* BOTON DE AGREGAR AL CARRITO */}
        <Skeleton className="h-7 w-28 animate-pulse" />
      </CardFooter>
    </Card>
    
    
  );
};



export default SkeletonProductCard