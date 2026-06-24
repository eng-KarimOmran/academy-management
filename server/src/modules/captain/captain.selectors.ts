import { CaptainSelect } from "../../../prisma/generated/models";

export const CaptainBaseSelect: CaptainSelect = {
  id: true,
  isActive: true,
  captainLessonPrice: true,
  supportType: true,
  createdAt: true,
  baseSalary: true,
  academyId: true,
  user: {
    select: {
      id: true,
      name: true,
      phone: true,
    },
  },
};
