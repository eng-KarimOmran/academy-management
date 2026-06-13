import Dashboard from "@/Routes/OwnerRoutes/Dashboard/Dashboard";
import ClientsPage from "@/Routes/OwnerRoutes/Client/Client";
import SubscriptionPage from "@/Routes/OwnerRoutes/Subscription/Subscription";
import TransactionsPage from "@/Routes/OwnerRoutes/Transaction/Transaction";
import LessonPage from "@/Routes/OwnerRoutes/Lesson/LessonPage";
import CoursePage from "@/Routes/OwnerRoutes/Course/Course";
import AreaPage from "@/Routes/OwnerRoutes/Area/Area";
import CarPage from "@/Routes/OwnerRoutes/Car/Car";
import CaptainPage from "@/Routes/OwnerRoutes/Captain/Captain";
import SecretaryPage from "@/Routes/OwnerRoutes/Secretary/Secretary";
import UserPage from "@/Routes/OwnerRoutes/User/User";
import AcademyPage from "@/Routes/OwnerRoutes/Academies/Academies";
import type { AppRoute } from "@/App";

import {
  RiCarLine,
  RiExchangeDollarLine,
  RiFileList3Fill,
  RiGraduationCapFill,
  RiGroupLine,
  RiLayout2Line,
  RiRoadMapLine,
  RiRouteLine,
  RiSchoolFill,
  RiSteering2Line,
  RiUser2Line,
  RiUserSettingsFill,
} from "@remixicon/react";

import AcademyDetailsPage from "@/Routes/OwnerRoutes/Academies/components/AcademyDetails";
import CourseDetailsPage from "@/Routes/OwnerRoutes/Course/components/CourseDetailsPage";
import UserDetailsPage from "@/Routes/OwnerRoutes/User/UserDetailsPage/UserDetailsPage";
import { SECRETARY_ROUTES_Shared } from "./secretaryRoutes";
import { CAPTAIN_ROUTES_Shared } from "./captainRoutes";

export const OWNER_ROUTES: AppRoute[] = [
  {
    path: "",
    element: <Dashboard />,
    label: "لوحة التحكم",
    icon: <RiLayout2Line />,
    showInNavbar: true,
  },
  {
    path: "client",
    element: <ClientsPage />,
    label: "العملاء",
    icon: <RiGraduationCapFill />,
    showInNavbar: true,
  },
  {
    path: "subscription",
    element: <SubscriptionPage />,
    label: "الاشتراكات",
    icon: <RiFileList3Fill />,
    showInNavbar: true,
  },
  {
    path: "transactions",
    element: <TransactionsPage />,
    label: "المعاملات المالية",
    icon: <RiExchangeDollarLine />,
    showInNavbar: true,
  },
  {
    path: "lesson",
    element: <LessonPage />,
    label: "الحصص",
    icon: <RiSteering2Line />,
    showInNavbar: true,
  },
  {
    path: "course",
    element: <CoursePage />,
    label: "البرامج",
    icon: <RiRouteLine />,
    showInNavbar: true,
  },
  {
    path: "area",
    element: <AreaPage />,
    label: "المناطق",
    icon: <RiRoadMapLine />,
    showInNavbar: true,
  },
  {
    path: "car",
    element: <CarPage />,
    label: "السيارات",
    icon: <RiCarLine />,
    showInNavbar: true,
  },
  {
    path: "captain",
    element: <CaptainPage />,
    label: "الكباتن",
    icon: <RiGroupLine />,
    showInNavbar: true,
  },
  {
    path: "secretary",
    element: <SecretaryPage />,
    label: "موظفي المكتب",
    icon: <RiUser2Line />,
    showInNavbar: true,
  },
  {
    path: "user",
    element: <UserPage />,
    label: "المستخدمين",
    icon: <RiUserSettingsFill />,
    showInNavbar: true,
  },
  {
    path: "academy",
    element: <AcademyPage />,
    label: "الأكاديميات",
    icon: <RiSchoolFill />,
    showInNavbar: true,
  },
  {
    path: "academy/:academyId",
    element: <AcademyDetailsPage />,
    showInNavbar: false,
  },
  {
    path: "course/:courseId",
    element: <CourseDetailsPage />,
    showInNavbar: false,
  },
  {
    path: "user/:userId",
    element: <UserDetailsPage />,
    showInNavbar: false,
  },
  ...SECRETARY_ROUTES_Shared,
  ...CAPTAIN_ROUTES_Shared,
];
