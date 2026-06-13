import { useAuthState } from "@/store/AuthState";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { getDashboardRoutes } from "@/lib/getDashboardRoutes";

export default function ContentSidebar() {
  const currentPath = useLocation().pathname;
  const { user } = useAuthState();
  const routes = getDashboardRoutes(user?.roles ?? []);
  const links = routes.filter((r) => r.showInNavbar === true);

  const getActiveLink = (currentPath: string, path: string): string => {
    let currentPathSafe = "";
    if (currentPath === "/dashboard") {
      currentPathSafe = currentPath.replace("/dashboard", "");
    } else {
      currentPathSafe = currentPath.replace("/dashboard/", "");
    }
    return currentPathSafe === path ? "bg-sidebar-accent" : "bg-sidebar";
  };

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-1">
            {links.map((link) => (
              <SidebarMenuItem key={link.path}>
                <SidebarMenuButton
                  className={getActiveLink(currentPath, link.path)}
                  tooltip={link.label}
                  asChild
                >
                  <Link to={link.path}>
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
