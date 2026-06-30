import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomDialog from "../Dialog/CustomDialog";
import { getDashboardRoutes } from "@/lib/getDashboardRoutes";
import AuthLayout from "@/Layout/AuthLayout/AuthLayout";
import ProtectedLayout from "@/Layout/ProtectedLayout/ProtectedLayout";
import NotFound from "@/Routes/PublicRoutes/NotFound/NotFound";
import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";
import LoginPage from "@/features/auth/pages/Login";
import SignUpPage from "@/features/auth/pages/SignUp";
import ChangePasswordPage from "@/features/auth/pages/ChangePassword";


export default function AppRoutes() {
  const authorizedRoutes = getDashboardRoutes();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="change-password" element={<ChangePasswordPage />} />

          <Route path="dashboard" element={<DashboardLayout />}>
            {authorizedRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <CustomDialog />
    </BrowserRouter>
  );
}
