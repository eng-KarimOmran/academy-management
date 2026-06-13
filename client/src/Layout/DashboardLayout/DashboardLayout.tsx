import NavTop from "@/components/NavTop/NavTop";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuthState } from "@/store/AuthState";
import { Navigate, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const { user } = useAuthState();

  if (!user?.isPasswordChanged) {
    return <Navigate to={"/change-password"} replace={true} />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-background">
        <NavTop />
        <section className="p-2">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}
