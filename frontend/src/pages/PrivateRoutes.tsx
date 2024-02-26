import { isAuthenticatedAtom } from "@/state/atoms";
import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const PrivateRoutes = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
