import { isAuthenticatedAtom } from "@/state/atoms";
import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const UnAuthenticatedRoutes = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  return isAuthenticated ? <Navigate to="/homepage" /> : <Outlet />;
};
export default UnAuthenticatedRoutes;
