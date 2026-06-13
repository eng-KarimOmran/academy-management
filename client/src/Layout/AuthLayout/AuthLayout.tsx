import { useAuthState } from "@/store/AuthState";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const { user } = useAuthState();

  if (user) {
    return <Navigate to={"/dashboard"} replace={true} />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
}