import { Outlet, Navigate } from "react-router-dom";
import {PublicRoutes} from '@/types'
import useSession from "@/hooks/useSession";



const PrivateValidationFragment = <Outlet />;


export const AuthGuard = () => {
  const {isAuthenticated, loading} = useSession();
  if(loading){
    return <p>Cargando...</p>
  }

  return isAuthenticated ? (
   
      PrivateValidationFragment
    )  : (
    <Navigate replace to={`/${PublicRoutes.LOGIN}`}  />
  );
};

export default AuthGuard;