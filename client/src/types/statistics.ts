export type LessonStatistics = {
  totalLessons: number;
  scheduledLessons: number;
  completedLessons: number;
  canceledChargedLessons: number;
  canceledLessons: number;
  automaticLessons: number;
  manualLessons: number;
};

export type PaymentStatistics = {
  totalPaidAmount: number;
  totalRefundedAmount: number;
};

export type ClientStatistics = {
  totalClients: number;
  platformClients: number;
  officeClients: number;
  subscribedClients: number;
  nonSubscribedClients: number;
};

type CourseSubscription = {
  id: string;
  name: string;
  subsCount: number;
};

export type CourseStatistics = {
  total: number;
  courses: CourseSubscription[];
};