export interface DashboardStatistics {
  clients: {
    officeCount: number;
    platformCount: number;
    totalClient: number;
  };

  courses: {
    courseId: string;
    name: string;
    count: number;
  }[];

  subscriptions: {
    subscriptionActive: number;
    subscriptionActiveLimited: number;
    subscriptionCanceled: number;
    subscriptionCompleted: number;
    subscriptionPendingDeposit: number;
    totalSubscription: number;
  };

  transactions: {
    totalCash: number;
    totalRefund: number;
    totalCollected: number;
    totalWallet: number
  };

  lessons: {
    lessonCanceled: number;
    lessonCanceledCharged: number;
    lessonCompleted: number;
    lessonScheduled: number;
    lessonAutomatic: number;
    lessonManual: number;
    totalLesson: number;
  };

  area: {
    areaId: string;
    name: string;
    countLesson: number;
  }[];

  car: {
    carId: string;
    modelName: string;
    plateNumber: string;
    countLesson: number;
  }[];

  captain: {
    captainId: string;
    userId: string;
    name: string;
    phone: string;
    countLesson: number;
  }[];

  usersCreatedSubscription: {
    userId: string;
    name: string;
    phone: string;
    countSubscription: number;
  }[];
}