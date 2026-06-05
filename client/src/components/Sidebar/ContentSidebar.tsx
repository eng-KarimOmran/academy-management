import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { dashboardRoutes } from "@/lib/dashboardRoutes";

export default function ContentSidebar() {
  const currentPath = useLocation().pathname;
  const links = dashboardRoutes.filter((r) => r.showInNavbar === true);
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-1">
            {links.map((link) => (
              <SidebarMenuItem key={link.path}>
                <SidebarMenuButton
                  className={
                    link.path === currentPath
                      ? "bg-sidebar-accent"
                      : "bg-sidebar"
                  }
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
