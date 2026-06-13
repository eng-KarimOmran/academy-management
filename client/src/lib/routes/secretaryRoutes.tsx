import ClientDetailsPage from "@/Routes/OwnerRoutes/Client/ClientDetailsPage/ClientDetailsPage";
import SubscriptionDetailsPage from "@/Routes/OwnerRoutes/Subscription/SubscriptionDetailsPage/SubscriptionDetailsPage";
import LessonDetailsPage from "@/Routes/OwnerRoutes/Lesson/components/LessonDetailsPage";
import TransactionDetailsPage from "@/Routes/OwnerRoutes/Transaction/TransactionDetailsPage/TransactionDetailsPage";
import type { AppRoute } from "@/App";
import { RiLayout2Line } from "@remixicon/react";
import CustomerManagement from "@/Routes/SecretaryRoutes/CustomerManagement/CustomerManagement";
import { Navigate } from "react-router-dom";

export const SECRETARY_ROUTES_Shared: AppRoute[] = [
  {
    path: "customer-management",
    element: <CustomerManagement />,
    label: "إدارة العملاء",
    icon: <RiLayout2Line />,
    showInNavbar: true,
  },
  {
    path: "client/:clientId",
    element: <ClientDetailsPage />,
    showInNavbar: false,
  },
  {
    path: "subscription/:subscriptionId",
    element: <SubscriptionDetailsPage />,
    showInNavbar: false,
  },
  {
    path: "lesson/:lessonId",
    element: <LessonDetailsPage />,
    showInNavbar: false,
  },
  {
    path: "transactions/:transactionId",
    element: <TransactionDetailsPage />,
    showInNavbar: false,
  },
];

export const SECRETARY_ROUTES: AppRoute[] = [
  {
    path: "",
    element: <Navigate to={"/dashboard/customer-management"} replace />,
  },
  ...SECRETARY_ROUTES_Shared,
];
