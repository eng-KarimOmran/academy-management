import type { AppRoute } from "@/App";
import { CAPTAIN_ROUTES } from "./routes/captainRoutes";
import { OWNER_ROUTES } from "./routes/ownerRoutes";
import { SECRETARY_ROUTES } from "./routes/secretaryRoutes";
import type { Role } from "@/types/enums";
export const getDashboardRoutes = (roles: Role[]): AppRoute[] => {
  if (roles.includes("OWNER")) return OWNER_ROUTES;

  if (roles.includes("SECRETARY")) return SECRETARY_ROUTES;

  if (roles.includes("CAPTAIN")) return CAPTAIN_ROUTES;

  return [];
};