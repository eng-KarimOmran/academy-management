import { ClientSelect } from "../../../prisma/generated/models";

export const clientBaseSelect: ClientSelect = {
  id: true,
  name: true,
  phone: true,
};

export const clientDetailsSelect: ClientSelect = {
  ...clientBaseSelect,
  subscriptions: {
    select: {
      id: true,
      status: true,
      createdAt: true,
    },
  },
};