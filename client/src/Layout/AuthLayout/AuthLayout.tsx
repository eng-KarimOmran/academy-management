import { useUserDetailsState } from "@/store/UserDetailsState";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const { userDetails } = useUserDetailsState();

  if (userDetails) {
    return <Navigate to={"/dashboard"} replace={true} />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
}
