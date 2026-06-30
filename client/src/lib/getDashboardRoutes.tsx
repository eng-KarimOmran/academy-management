import ChangePasswordDashboardPage from "@/features/auth/pages/ChangePasswordDashboard";
import {
  ADMIN_ROUTES,
  OWNER_ROUTES,
  CAPTAIN_ROUTES,
  SECRETARY_ROUTES,
  type AppRoute,
} from "./routes";

import { useUserProfileState } from "@/store/UserDetailsState";

export const getDashboardRoutes = (): AppRoute[] => {
  const { userProfile } = useUserProfileState.getState();

  if (!userProfile) return [];

  const isOwner = userProfile.academies.length > 0;

  const isAdmin = userProfile.isAdmin;

  const isManager = userProfile.jobProfile.some(
    (j) => j.jobProfileType === "MANAGER",
  );

  const isSecretary = userProfile.jobProfile.some(
    (j) => j.jobProfileType === "SECRETARY",
  );

  const isCaptain = userProfile.jobProfile.some(
    (j) => j.jobProfileType === "CAPTAIN",
  );

  const BASIC_ROUTES: AppRoute[] = [
    {
      path: "change-password",
      element: <ChangePasswordDashboardPage />,
      showInNavbar: false,
    },
  ];

  if (isOwner) BASIC_ROUTES.push(...OWNER_ROUTES);
  if (isAdmin) BASIC_ROUTES.push(...ADMIN_ROUTES);
  if (isSecretary) BASIC_ROUTES.push(...SECRETARY_ROUTES);
  if (isCaptain) BASIC_ROUTES.push(...CAPTAIN_ROUTES);
  if (isManager) BASIC_ROUTES.push(...SECRETARY_ROUTES);

  const map = new Map<string, AppRoute>();

  BASIC_ROUTES.forEach((route) => {
    map.set(route.path, route);
  });

  const routes = [...map.values()];

  return routes;
};
