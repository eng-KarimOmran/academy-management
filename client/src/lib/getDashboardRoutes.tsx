// import { CAPTAIN_ROUTES } from "./routes/captainRoutes";
import type { AppRoute } from "@/components/AppRoutes/AppRoutes";
import { ADMIN_ROUTES, OWNER_ROUTES } from "./routes/ownerRoutes";
// import { SECRETARY_ROUTES } from "./routes/secretaryRoutes";
import ChangePassword from "@/Routes/AuthRoutes/ChangePassword/ChangePassword";
import type { UserDetails } from "@/types/user";

export const getDashboardRoutes = (
  userDetails: UserDetails | null,
): AppRoute[] => {
  if (!userDetails) return [];

  const BASIC_ROUTES: AppRoute[] = [
    {
      path: "change-password",
      element: <ChangePassword />,
      showInNavbar: false,
    },
  ];

  if (userDetails?.academies.length) {
    BASIC_ROUTES.push(...OWNER_ROUTES);
  }

  if (userDetails.isAdmin) {
    BASIC_ROUTES.push(...ADMIN_ROUTES);
  }

  return BASIC_ROUTES;
};
