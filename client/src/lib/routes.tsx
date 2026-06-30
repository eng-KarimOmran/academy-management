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
  RiWallet3Line,
} from "@remixicon/react";

import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

import UserPage from "@/features/user/pages/UserPage";
import UserDetailsPage from "@/features/user/pages/UserDetailsPage";

export interface AppRoute {
  path: string;
  element: ReactNode;
  label?: string;
  icon?: ReactNode;
  showInNavbar?: boolean;
}

export const OWNER_ROUTES_SHARED: AppRoute[] = [
  // {
  //   path: "client/:clientId",
  //   element: <ClientDetailsPage />,
  //   showInNavbar: false,
  // },
  // {
  //   path: "subscription/:subscriptionId",
  //   element: <SubscriptionDetailsPage />,
  //   showInNavbar: false,
  // },
  // {
  //   path: "lesson/:lessonId",
  //   element: <LessonDetailsPage />,
  //   showInNavbar: false,
  // },
  // {
  //   path: "transactions/:transactionId",
  //   element: <TransactionDetailsPage />,
  //   showInNavbar: false,
  // },
];

export const OWNER_ROUTES: AppRoute[] = [
  // {
  //   path: "",
  //   element: <Statistic />,
  //   label: "لوحة التحكم",
  //   icon: <RiLayout2Line />,
  //   showInNavbar: true,
  // },
  // {
  //   path: "accounts",
  //   element: <Accounts />,
  //   label: "الحسابات",
  //   icon: <RiWallet3Line />,
  //   showInNavbar: true,
  // },
  // {
  //   path: "client",
  //   element: <ClientsPage />,
  //   label: "العملاء",
  //   icon: <RiGraduationCapFill />,
  //   showInNavbar: true,
  // },
  // {
  //   path: "subscription",
  //   element: <SubscriptionPage />,
  //   label: "الاشتراكات",
  //   icon: <RiFileList3Fill />,
  //   showInNavbar: true,
  // },
  // {
  //   path: "transactions",
  //   element: <TransactionsPage />,
  //   label: "المعاملات المالية",
  //   icon: <RiExchangeDollarLine />,
  //   showInNavbar: true,
  // },
  // {
  //   path: "lesson",
  //   element: <LessonPage />,
  //   label: "الحصص",
  //   icon: <RiSteering2Line />,
  //   showInNavbar: true,
  // },
  // {
  //   path: "course",
  //   element: <CoursePage />,
  //   label: "البرامج",
  //   icon: <RiRouteLine />,
  //   showInNavbar: true,
  // },
  // {
  //   path: "area",
  //   element: <AreaPage />,
  //   label: "المناطق",
  //   icon: <RiRoadMapLine />,
  //   showInNavbar: true,
  // },
  // {
  //   path: "car",
  //   element: <CarPage />,
  //   label: "السيارات",
  //   icon: <RiCarLine />,
  //   showInNavbar: true,
  // },
  // {
  //   path: "captain",
  //   element: <CaptainPage />,
  //   label: "الكباتن",
  //   icon: <RiGroupLine />,
  //   showInNavbar: true,
  // },
  // {
  //   path: "secretary",
  //   element: <SecretaryPage />,
  //   label: "موظفي المكتب",
  //   icon: <RiUser2Line />,
  //   showInNavbar: true,
  // },
  // {
  //   path: "academy/:academyId",
  //   element: <AcademyDetailsPage />,
  //   showInNavbar: false,
  // },
  // {
  //   path: "course/:courseId",
  //   element: <CourseDetailsPage />,
  //   showInNavbar: false,
  // },
  ...OWNER_ROUTES_SHARED,
];

export const ADMIN_ROUTES: AppRoute[] = [
  {
    path: "user",
    element: <UserPage />,
    label: "المستخدمين",
    icon: <RiUserSettingsFill />,
    showInNavbar: true,
  },
  {
    path: "user/:userId",
    element: <UserDetailsPage />,
    showInNavbar: false,
  },
  // {
  //   path: "academy",
  //   element: <AcademyPage />,
  //   label: "الأكاديميات",
  //   icon: <RiSchoolFill />,
  //   showInNavbar: true,
  // },
];

export const SECRETARY_ROUTES: AppRoute[] = [
  // {
  //   path: "",
  //   element: <Navigate to={"/dashboard/customer-management"} replace />,
  // },
  // {
  //   path: "customer-management",
  //   element: <CustomerManagement />,
  //   label: "إدارة العملاء",
  //   icon: <RiLayout2Line />,
  //   showInNavbar: true,
  // },
];

export const CAPTAIN_ROUTES: AppRoute[] = [
  // {
  //   path: "",
  //   element: <Navigate to={"/dashboard/today"} replace />,
  // },
  // {
  //   element: <GetLessons day="today" />,
  //   path: "today",
  //   icon: <RiLayout2Line />,
  //   label: "حصص اليوم",
  //   showInNavbar: true,
  // },
  // {
  //   element: <GetLessons day="tomorrow" />,
  //   path: "tomorrow",
  //   icon: <RiLayout2Line />,
  //   label: "حصص غدًا",
  //   showInNavbar: true,
  // },
];
