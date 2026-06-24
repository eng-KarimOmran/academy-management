import { CourseSelect } from "../../../prisma/generated/models";

export const courseBaseSelect: CourseSelect = {
  id: true,
  name: true,
  description: true,
  featuredReason: true,
  isActive: true,
  sessionDurationMinutes: true,
  requiredInitialDeposit: true,
  sessionsBeforeFullPayment: true,
  priceDiscounted: true,
  priceOriginal: true,
  totalSessions: true,
  academyId: true,
  createdAt: true,
};

export const courseDetailsSelect: CourseSelect = {
  ...courseBaseSelect,
  courseFeatures: {
    select: {
      id: true,
      text: true,
    },
  },
};
