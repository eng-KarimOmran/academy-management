import type { ReactNode } from "react";

export interface AppRoute {
  path: string;
  element: ReactNode;
  label?: string;
  icon?: ReactNode;
  showInNavbar?: boolean;
}

import {
  RiCarLine,
  RiSchoolFill,
  RiGroupLine,
  RiUserSettingsFill,
  RiUser2Line,
  RiGraduationCapFill,
  RiRouteLine,
  RiRoadMapLine,
  RiFileList3Fill,
  RiExchangeDollarLine,
  RiSteering2Line,
} from "@remixicon/react";

import AcademyPage from "@/Routes/Academies/Academies";
import AreaPage from "@/Routes/Area/Area";
import CarPage from "@/Routes/Car/Car";
import CaptainPage from "@/Routes/Captain/Captain";
import AcademyDetailsPage from "@/Routes/Academies/components/AcademyDetails";
import UserPage from "@/Routes/User/User";
import SecretaryPage from "@/Routes/Secretary/Secretary";
import ClientsPage from "@/Routes/Client/Client";
import ClientDetailsPage from "@/Routes/Client/ClientDetailsPage/ClientDetailsPage";
import CoursePage from "@/Routes/Course/Course";
import CourseDetailsPage from "@/Routes/Course/components/CourseDetailsPage";
import SubscriptionPage from "@/Routes/Subscription/Subscription";
import TransactionsPage from "@/Routes/Transaction/Transaction";
import SubscriptionDetailsPage from "@/Routes/Subscription/SubscriptionDetailsPage/SubscriptionDetailsPage";
import LessonPage from "@/Routes/Lesson/LessonPage";
import UserDetailsPage from "@/Routes/User/UserDetailsPage/UserDetailsPage";
import LessonDetailsPage from "@/Routes/Lesson/components/LessonDetailsPage";

export const dashboardRoutes: AppRoute[] = [
  {
    path: "/dashboard/client",
    element: <ClientsPage />,
    label: "العملاء",
    icon: <RiGraduationCapFill />,
    showInNavbar: true,
  },
  {
    path: "/dashboard/subscription",
    element: <SubscriptionPage />,
    label: "الاشتراكات",
    icon: <RiFileList3Fill />,
    showInNavbar: true,
  },
  {
    path: "/dashboard/transactions",
    element: <TransactionsPage />,
    label: "المعاملات المالية",
    icon: <RiExchangeDollarLine />,
    showInNavbar: true,
  },
  {
    path: "/dashboard/lesson",
    element: <LessonPage />,
    label: "الحصص",
    icon: <RiSteering2Line />,
    showInNavbar: true,
  },
  {
    path: "/dashboard/course",
    element: <CoursePage />,
    label: "البرامج",
    icon: <RiRouteLine />,
    showInNavbar: true,
  },
  {
    path: "/dashboard/academy",
    element: <AcademyPage />,
    label: "الأكاديميات",
    icon: <RiSchoolFill />,
    showInNavbar: true,
  },
  {
    path: "/dashboard/area",
    element: <AreaPage />,
    label: "المناطق",
    icon: <RiRoadMapLine />,
    showInNavbar: true,
  },
  {
    path: "/dashboard/car",
    element: <CarPage />,
    label: "السيارات",
    icon: <RiCarLine />,
    showInNavbar: true,
  },
  {
    path: "/dashboard/captain",
    element: <CaptainPage />,
    label: "الكباتن",
    icon: <RiGroupLine />,
    showInNavbar: true,
  },
  {
    path: "/dashboard/secretary",
    element: <SecretaryPage />,
    label: "موظفي المكتب",
    icon: <RiUser2Line />,
    showInNavbar: true,
  },
  {
    path: "/dashboard/user",
    element: <UserPage />,
    label: "المستخدمين",
    icon: <RiUserSettingsFill />,
    showInNavbar: true,
  },
  {
    path: "/dashboard/academy/:academyId",
    element: <AcademyDetailsPage />,
    showInNavbar: false,
  },
  {
    path: "/dashboard/client/:clientId",
    element: <ClientDetailsPage />,
    showInNavbar: false,
  },
  {
    path: "/dashboard/course/:courseId",
    element: <CourseDetailsPage />,
    showInNavbar: false,
  },
  {
    path: "/dashboard/subscription/:subscriptionId",
    element: <SubscriptionDetailsPage />,
    showInNavbar: false,
  },
  {
    path: "/dashboard/user/:userId",
    element: <UserDetailsPage />,
    showInNavbar: false,
  },
  {
    path: "/dashboard/lesson/:lessonId",
    element: <LessonDetailsPage />,
    showInNavbar: false,
  },
];
