import { useEffect } from "react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import {
  RiArrowLeftDoubleLine,
  RiSchoolFill,
  RiStackFill,
} from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { getAllAcademies } from "@/service/academy.service";
import { toast } from "sonner";
import type { Academy } from "@/types/academy";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import { useAuthState } from "@/store/AuthState";

export default function HeaderSidebar() {
  const { isMobile } = useSidebar();
  const { activeAcademy, setActiveAcademy } = useActiveAcademyState();
  const { user } = useAuthState();

  const hasNoRoles = !!user && (!user.roles || user.roles.length === 0);
  const isCaptainOnly =
    !!user && user.roles?.length === 1 && user.roles.includes("CAPTAIN");

  const canFetchAcademies = !!user && !isCaptainOnly && !hasNoRoles;

  const {
    isLoading,
    error,
    data: academies = [],
  } = useQuery<Academy[]>({
    queryKey: ["academies"],
    queryFn: async () => {
      const res = await getAllAcademies({ limit: 50, page: 1 });
      return res.data.data.items;
    },
    staleTime: 1000 * 60 * 5,
    enabled: canFetchAcademies,
  });

  useEffect(() => {
    if (error) {
      localStorage.clear();
      toast.error(
        error instanceof Error ? error.message : "خطأ في تحميل البيانات",
      );
    }
  }, [error]);

  useEffect(() => {
    if (!academies.length) return;
    const exists = academies.some((a) => a.id === activeAcademy?.id);
    if (activeAcademy && !exists) {
      setActiveAcademy(null);
      return;
    }
    if (!activeAcademy) {
      setActiveAcademy(academies[0]);
    }
  }, [academies, activeAcademy, setActiveAcademy]);

  if (isCaptainOnly || hasNoRoles) {
    return (
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-default hover:bg-transparent active:bg-transparent"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <RiSchoolFill className="size-4" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-start">
                  إدارة الأكاديميات
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Separator />
      </SidebarHeader>
    );
  }
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <RiStackFill className="size-4" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-start">
                    {isLoading
                      ? "جاري التحميل..."
                      : (activeAcademy?.name ?? "لا يوجد أكاديميات")}
                  </span>
                </div>

                <RiArrowLeftDoubleLine className="ms-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                الأكاديميات
              </DropdownMenuLabel>

              {isLoading ? (
                <div className="p-2 text-sm text-center text-muted-foreground">
                  جاري تحميل الأكاديميات...
                </div>
              ) : academies.length > 0 ? (
                academies.map((academy) => (
                  <DropdownMenuItem
                    key={academy.id}
                    onClick={() => setActiveAcademy(academy)}
                    className={`gap-2 p-2 cursor-pointer ${
                      academy.id === activeAcademy?.id ? "bg-accent" : ""
                    }`}
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <RiSchoolFill className="size-3.5 shrink-0" />
                    </div>
                    {academy.name}
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="p-2 text-sm text-center text-muted-foreground">
                  لا يوجد أكاديميات
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <Separator />
    </SidebarHeader>
  );
}
