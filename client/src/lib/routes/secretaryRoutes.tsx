import type { AppRoute } from "@/App";
import { Navigate } from "react-router-dom";
import CustomerManagement from "@/Routes/SecretaryRoutes/CustomerManagement/CustomerManagement";
import { RiLayout2Line } from "@remixicon/react";
import { OWNER_ROUTES_SHARED } from "./ownerRoutes";

export const SECRETARY_ROUTES: AppRoute[] = [
  {
    path: "",
    element: <Navigate to={"/dashboard/customer-management"} replace />,
  },
  {
    path: "customer-management", 
    element: <CustomerManagement />,
    label: "إدارة العملاء",
    icon: <RiLayout2Line />,
    showInNavbar: true,
  },
  ...OWNER_ROUTES_SHARED,
];
