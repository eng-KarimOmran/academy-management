import type { AppRoute } from "@/App";
import GetLessons from "@/Routes/CaptainRoutes/GetLessons/GetLessons";
import { RiLayout2Line } from "@remixicon/react";
import { Navigate } from "react-router-dom";

export const CAPTAIN_ROUTES_Shared: AppRoute[] = [
  {
    element: <GetLessons day="today" />,
    path: "today",
    icon: <RiLayout2Line />,
    label: "حصص اليوم",
    showInNavbar: true,
  },
  {
    element: <GetLessons day="tomorrow" />,
    path: "tomorrow",
    icon: <RiLayout2Line />,
    label: "حصص غدًا",
    showInNavbar: true,
  },
];

export const CAPTAIN_ROUTES: AppRoute[] = [
  {
    path: "",
    element: <Navigate to={"/dashboard/today"} replace />,
  },
  ...CAPTAIN_ROUTES_Shared,
];
