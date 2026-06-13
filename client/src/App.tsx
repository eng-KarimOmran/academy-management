import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./Layout/ProtectedLayout/ProtectedLayout";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./Provider/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/queryClient";
import CustomDialog from "./components/Dialog/CustomDialog";
import DashboardLayout from "./Layout/DashboardLayout/DashboardLayout";
import type { ReactNode } from "react";
import { useAuthState } from "./store/AuthState";
import { getDashboardRoutes } from "./lib/getDashboardRoutes";
import AuthInitializer from "./components/AuthInitializer/AuthInitializer";
import Login from "./Routes/AuthRoutes/Login/Login";
import SignUp from "./Routes/AuthRoutes/SignUp/SignUp";
import ChangePassword from "./Routes/AuthRoutes/ChangePassword/ChangePassword";
import NotFound from "./Routes/PublicRoutes/NotFound/NotFound";

export interface AppRoute {
  path: string;
  element: ReactNode;
  label?: string;
  icon?: ReactNode;
  showInNavbar?: boolean;
}

function App() {
  const { user } = useAuthState();
  const authorizedRoutes = getDashboardRoutes(user?.roles ?? []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthInitializer>
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
                    <Route
                      path="change-password"
                      element={<ChangePassword />}
                    />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>

              <CustomDialog />
            </BrowserRouter>
            <Toaster richColors position="top-center" />
          </TooltipProvider>
        </AuthInitializer>
      </ThemeProvider>
      <ReactQueryDevtools
        position="left"
        buttonPosition="bottom-left"
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
}

export default App;
