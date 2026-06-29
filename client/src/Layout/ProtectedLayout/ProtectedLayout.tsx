import { useUserDetailsState } from "@/store/UserDetailsState";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const { userDetails } = useUserDetailsState();

  if (!userDetails) {
    return <Navigate to={"/"} replace={true} />;
  }

  return <Outlet />;
}
