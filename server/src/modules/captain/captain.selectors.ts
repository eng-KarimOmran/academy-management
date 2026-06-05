import { CaptainSelect } from "../../../prisma/generated/models";

export const CaptainBaseSelect: CaptainSelect = {
  id: true,
  isActive: true,
  captainLessonPrice: true,
  trainingType: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
      phone: true,
    },
  },
};
