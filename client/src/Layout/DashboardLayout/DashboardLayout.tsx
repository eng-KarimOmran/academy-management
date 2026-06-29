import NavTop from "@/components/NavTop/NavTop";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUserDetailsState } from "@/store/UserDetailsState";
import { Navigate, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const { userDetails } = useUserDetailsState();

  if (!userDetails) {
    return <Navigate to={"/"} replace={true} />;
  }

  if (!userDetails.isPasswordChanged) {
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
