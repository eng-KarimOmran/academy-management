import { ClientSelect } from "../../../prisma/generated/models";

export const clientBaseSelect: ClientSelect = {
  id: true,
  name: true,
  phone: true,
  createdAt: true,
  academyId: true,
};

export const clientDetailsSelect: ClientSelect = {
  ...clientBaseSelect,
  subscriptions: {
    select: {
      id: true,
      status: true,
      course: {
        select: {
          name: true,
        },
      },
      createdAt: true,
    },
  },
};
