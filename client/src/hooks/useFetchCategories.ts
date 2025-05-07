import { CategoryStatus,  Category } from "@/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchCategories,
  fetchCategoryById
} from "@/utilities/categorySlice";
import { RootState, useAppDispatch } from "@/store/store";

export interface HookResponse {
  categories?: Category[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentCategory?: Category | null;
  lastUpdated?: number | null;
}

interface Props {
  categoriesStatus: CategoryStatus;
  categoryId?:string;
  forceRefresh?: boolean; //Para forzar la actualizacion cuando sea necesario (re-fetching de datos)
  cacheTime?: number; //Tiempo en milisegundos antes de considerar obsoletos los datos (default: 5 min)
}

export function useFetchCategories({
    categoriesStatus,
    categoryId,
    forceRefresh = false,
    cacheTime = 5 * 60 * 1000, // 5 minutos
}: Props): HookResponse {
  const dispatch = useAppDispatch();

  const {
    categories,
    status,
    error,
    currentCategory,
    lastFetched 
  } = useSelector((state: RootState) => state.categories);

  //VERIFICAR QUE LOS DATOS NO ESTEN OBSOLETOS
  const shouldRefresh = (lastFetchTime: number | undefined): boolean =>{
        //devuelve true si:
        //1. se forzó la actualizacion (forceRefresh == true)
        //2. no hay tiempo de ultima actualizacion (lastFetchTime == undefined)
        //3. el tiempo actual - el tiempo de ultima actualizacion es mayor que el cacheTime
    
    return forceRefresh || !lastFetchTime || (Date.now() - lastFetchTime > cacheTime);
  }

// Seleccionamos las categorias a retornar según el CategoryStatus
  const getCategoriesByStatus = () => {
    switch (categoriesStatus) {
      
      case CategoryStatus.All:
      default:
        return categories;
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const currentCategories = getCategoriesByStatus();
        const lastFetch:number = lastFetched?.[categoriesStatus] || 0;

        // Si ya tenemos categorias y no necesitamos refrescar, no hacemos nada
        if (currentCategories && currentCategories.length > 0 && !shouldRefresh(lastFetch) && categoriesStatus !== CategoryStatus.SINGLECATEGORY) {
            return;
        }

        switch (categoriesStatus) {
          case CategoryStatus.All:
            await dispatch(fetchCategories()).unwrap();
            break;
          
          case CategoryStatus.SINGLECATEGORY:
            if (!categoryId) return;
            
            // Para categoria única, verificamos si ya la tenemos y si está actualizado
            if (currentCategory?.id === categoryId  && !shouldRefresh(lastFetched?.singleCategory)) {
                
              return;
              }
            await dispatch(fetchCategoryById(categoryId)).unwrap();
            break;
          default:
            await dispatch(fetchCategories()).unwrap();
            break;
        }
      } catch (error) {
        console.error("Failed to load categorias:", error);
      }
    };

    loadCategories();
  }, [dispatch, CategoryStatus, categoryId, forceRefresh]);

  if (categoriesStatus === CategoryStatus.SINGLECATEGORY && categoryId) {
    return {
      currentCategory,
      status,
      error,
      lastUpdated: lastFetched?.singleCategory || null,
    };
  }

  

  return {
    categories: getCategoriesByStatus(),
    status,
    error,
    lastUpdated: lastFetched?.[categoriesStatus] || null,
  };
}
