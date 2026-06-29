import Statistic from "@/Routes/OwnerRoutes/Statistic/Statistic";
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

import AcademyDetailsPage from "@/Routes/OwnerRoutes/Academies/components/AcademyDetails";
import CourseDetailsPage from "@/Routes/OwnerRoutes/Course/components/CourseDetailsPage";
import UserDetailsPage from "@/Routes/OwnerRoutes/User/UserDetailsPage/UserDetailsPage";
import Accounts from "@/Routes/OwnerRoutes/Accounts/Accounts";
import ClientDetailsPage from "@/Routes/OwnerRoutes/Client/ClientDetailsPage/ClientDetailsPage";
import SubscriptionDetailsPage from "@/Routes/OwnerRoutes/Subscription/SubscriptionDetailsPage/SubscriptionDetailsPage";
import LessonDetailsPage from "@/Routes/OwnerRoutes/Lesson/components/LessonDetailsPage";
import TransactionDetailsPage from "@/Routes/OwnerRoutes/Transaction/TransactionDetailsPage/TransactionDetailsPage";
import type { AppRoute } from "@/components/AppRoutes/AppRoutes";

export const OWNER_ROUTES_SHARED: AppRoute[] = [
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

export const OWNER_ROUTES: AppRoute[] = [
  {
    path: "",
    element: <Statistic />,
    label: "لوحة التحكم",
    icon: <RiLayout2Line />,
    showInNavbar: true,
  },
  {
    path: "accounts",
    element: <Accounts />,
    label: "الحسابات",
    icon: <RiWallet3Line />,
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
    path: "academy/:academyId",
    element: <AcademyDetailsPage />,
    showInNavbar: false,
  },
  {
    path: "course/:courseId",
    element: <CourseDetailsPage />,
    showInNavbar: false,
  },
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
  {
    path: "academy",
    element: <AcademyPage />,
    label: "الأكاديميات",
    icon: <RiSchoolFill />,
    showInNavbar: true,
  },
];
