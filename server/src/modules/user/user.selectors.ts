import { UserSelect } from "../../../prisma/generated/models";

export const userBaseSelect: UserSelect = {
  id: true,
  name: true,
  phone: true,
  roles: true,
  isActive: true,
};

export const userAuthSelect: UserSelect = {
  ...userBaseSelect,
  isPasswordChanged: true,
  logoutAt: true,
  password: true,
};

export const userDetailsSelect: UserSelect = {
  ...userBaseSelect,
  createdAt: true,
  captainProfile: {
    select: {
      id: true,
      captainLessonPrice: true,
      isActive: true,
      trainingType: true,
      createdAt: true,
      _count: {
        select: { lessons: true }
      },
    },
  },
  secretaryProfile: {
    select: {
      id: true,
      baseSalary: true,
      bonusAmount: true,
      targetCount: true,
      createdAt: true,
    },
  },
};

export const userAcademyRelationsSelect: UserSelect = {
  id: true,
  captainProfile: { select: { id: true } },
  secretaryProfile: { select: { id: true } },
  academies: { select: { id: true } }
};