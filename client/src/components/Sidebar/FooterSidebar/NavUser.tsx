import { useAuthState } from "@/store/AuthState";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  RiArrowDownSLine,
  RiDoorLockLine,
  RiLogoutBoxLine,
} from "@remixicon/react";
import Logout from "@/components/Sidebar/FooterSidebar/Logout";
import { useDialogState } from "@/store/DialogState";
import { Link } from "react-router-dom";

export default function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useAuthState();
  const { setConfigDialog } = useDialogState();

  const handelLogout = () => {
    setConfigDialog({
      title: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
      description: "سيؤدي هذا الإجراء إلى إغلاق جلستك وتسجيل خروجك من حسابك.",
      children: <Logout />,
    });
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/src/assets/user.png" alt={"user"} />
                  <AvatarFallback className="rounded-lg">
                    {user?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.name || "غير معروف"}
                  </span>
                  <span className="truncate text-xs">
                    {user?.phone || "غير معروف"}
                  </span>
                </div>
                <RiArrowDownSLine className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal" dir="rtl">
                <div className="flex items-center gap-2 px-1 py-1.5 text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/src/assets/user.png" alt={"user"} />
                    <AvatarFallback className="rounded-lg">
                      {user?.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-start text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.name || "غير معروف"}
                    </span>
                    <span className="truncate text-xs">
                      {user?.phone || "غير معروف"}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="default" asChild>
                  <Link to={"/dashboard/change-password"}>
                    <RiDoorLockLine />
                    تغير كلمة المرور
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={handelLogout}>
                  <RiLogoutBoxLine />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
