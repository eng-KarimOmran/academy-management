import { CourseSelect } from "../../../prisma/generated/models";

export const courseBaseSelect: CourseSelect = {
  id: true,
  name: true,
  description: true,
  featuredReason: true,
  isActive: true,
  practicalSessions: true,
  sessionDurationMinutes: true,
  priceDiscounted: true,
  priceOriginal: true,
  totalSessions: true,
};

export const courseDetailsSelect: CourseSelect = {
  ...courseBaseSelect,
  createdAt: true,
  courseFeatures: {
    select: {
      id: true,
      text: true,
    },
  },
};
