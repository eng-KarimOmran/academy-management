import { SecretarySelect } from "../../../prisma/generated/models";

export const secretaryBaseSelect: SecretarySelect = {
  id: true,
  baseSalary: true,
  bonusAmount: true,
  targetCount: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
      phone: true,
    },
  },
};