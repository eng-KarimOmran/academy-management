import { useAuthState } from "@/store/AuthState";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const { user } = useAuthState();

  if (!user) {
    return <Navigate to={"/"} replace={true} />;
  }

  return <Outlet />;
}
