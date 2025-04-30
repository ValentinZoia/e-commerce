import { Product, ProductStatus } from "@/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchProducts,
  fetchFeaturedProducts,
  fetchNewProducts,
  fetchPromotionalProducts,
  fetchProductById,
} from "@/utilities/productSlice";
import { RootState, useAppDispatch } from "@/store/store";

export interface HookResponse {
  products?: Product[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentProduct?: Product | null;
  lastUpdated?: number | null;
}

interface Props {
  productsStatus: ProductStatus;
  productId?: string;
  forceRefresh?: boolean; //Para forzar la actualizacion cuando sea necesario (re-fetching de datos)
  cacheTime?: number; //Tiempo en milisegundos antes de considerar obsoletos los datos (default: 5 min)
}

export function useFetchProducts({
    productsStatus,
    productId,
    forceRefresh = false,
    cacheTime = 5 * 60 * 1000, // 5 minutos
}: Props): HookResponse {
  const dispatch = useAppDispatch();

  const {
    products,
    status,
    error,
    newProducts,
    featuredProducts,
    promotionalProducts,
    currentProduct,
    lastFetched 
  } = useSelector((state: RootState) => state.products);

  //VERIFICAR QUE LOS DATOS NO ESTEN OBSOLETOS
  const shouldRefresh = (lastFetchTime: number | undefined): boolean =>{
        //devuelve true si:
        //1. se forzó la actualizacion (forceRefresh == true)
        //2. no hay tiempo de ultima actualizacion (lastFetchTime == undefined)
        //3. el tiempo actual - el tiempo de ultima actualizacion es mayor que el cacheTime
    
    return forceRefresh || !lastFetchTime || (Date.now() - lastFetchTime > cacheTime);
  }

// Seleccionamos los productos a retornar según el ProductStatus
  const getProductsByStatus = () => {
    switch (productsStatus) {
      case ProductStatus.NEW:
        return newProducts;
      case ProductStatus.FEATURED:
        return featuredProducts;
      case ProductStatus.PROMOTION:
        return promotionalProducts;
      case ProductStatus.All:
      default:
        return products;
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const currentProducts = getProductsByStatus();
        const lastFetch = lastFetched?.[productsStatus] || 0;

        // Si ya tenemos productos y no necesitamos refrescar, no hacemos nada
        if (currentProducts && currentProducts.length > 0 && !shouldRefresh(lastFetch) && productsStatus !== ProductStatus.SINGLEPRODUCT) {
            return;
        }

        switch (productsStatus) {
          case ProductStatus.All:
            await dispatch(fetchProducts()).unwrap();
            break;
          case ProductStatus.NEW:
            await dispatch(fetchNewProducts()).unwrap();
            break;
          case ProductStatus.FEATURED:
            await dispatch(fetchFeaturedProducts()).unwrap();
            break;
          case ProductStatus.PROMOTION:
            await dispatch(fetchPromotionalProducts()).unwrap();
            break;
          case ProductStatus.SINGLEPRODUCT:
            if (!productId) return;
            
            // Para producto único, verificamos si ya lo tenemos y si está actualizado
            if (currentProduct?.id === productId  && !shouldRefresh(lastFetched?.singleProduct)) {
                
              return;
              }
            await dispatch(fetchProductById(productId)).unwrap();
            break;
          default:
            await dispatch(fetchProducts()).unwrap();
            break;
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, [dispatch, ProductStatus, productId, forceRefresh]);

  if (productsStatus === ProductStatus.SINGLEPRODUCT && productId) {
    return {
      currentProduct,
      status,
      error,
      lastUpdated: lastFetched?.singleProduct || null,
    };
  }

  

  return {
    products: getProductsByStatus(),
    status,
    error,
    lastUpdated: lastFetched?.[productsStatus] || null,
  };
}
