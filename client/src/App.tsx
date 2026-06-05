import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./Layout/ProtectedLayout/ProtectedLayout";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
import Login from "./Routes/Login/Login";
import Dashboard from "./Routes/Dashboard/Dashboard";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./Provider/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { dashboardRoutes } from "./lib/dashboardRoutes";
import { queryClient } from "./lib/queryClient";
import CustomDialog from "./components/Dialog/CustomDialog";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/dashboard" element={<ProtectedLayout />}>
                <Route index element={<Dashboard />} />
                {dashboardRoutes.map((r) => (
                  <Route key={r.path} path={r.path} element={r.element} />
                ))}
              </Route>
            </Routes>
            <CustomDialog />
          </BrowserRouter>
          <Toaster richColors position="top-center" />
        </TooltipProvider>
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
