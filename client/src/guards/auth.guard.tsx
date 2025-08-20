import { Outlet, Navigate } from "react-router-dom";
import { PublicRoutes } from "@/types";
import useSession from "@/hooks/Auth/useSession";
import LoaderAuthGuard from "./LoaderAuthGuard";

const PrivateValidationFragment = <Outlet />;

export const AuthGuard = () => {
  const { isAuthenticated, isLoading } = useSession();
  if (isLoading) {
    return <LoaderAuthGuard />;
  }

  return isAuthenticated ? (
    PrivateValidationFragment
  ) : (
    <Navigate replace to={`/${PublicRoutes.LOGIN}`} />
  );
};

export default AuthGuard;
