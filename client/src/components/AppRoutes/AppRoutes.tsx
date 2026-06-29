import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";
import ProtectedLayout from "@/Layout/ProtectedLayout/ProtectedLayout";
import { getDashboardRoutes } from "@/lib/getDashboardRoutes";
import ChangePassword from "@/Routes/AuthRoutes/ChangePassword/ChangePassword";
import NotFound from "@/Routes/PublicRoutes/NotFound/NotFound";
import { useUserDetailsState } from "@/store/UserDetailsState";
import type { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomDialog from "../Dialog/CustomDialog";
import Login from "@/Routes/AuthRoutes/Login/Login";
import AuthLayout from "@/Layout/AuthLayout/AuthLayout";
import SignUp from "@/Routes/AuthRoutes/SignUp/SignUp";
import { TooltipProvider } from "../ui/tooltip";
import { Toaster } from "sonner";

export interface AppRoute {
  path: string;
  element: ReactNode;
  label?: string;
  icon?: ReactNode;
  showInNavbar?: boolean;
}

export default function AppRoutes() {
  const { userDetails } = useUserDetailsState();
  const authorizedRoutes = getDashboardRoutes(userDetails);

  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route path="change-password" element={<ChangePassword />} />

            <Route path="dashboard" element={<DashboardLayout />}>
              {authorizedRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        <CustomDialog />
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </TooltipProvider>
  );
}
