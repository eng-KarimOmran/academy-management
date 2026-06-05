import { AcademySelect } from "../../../prisma/generated/models";

export const academyBaseSelect: AcademySelect = {
  id: true,
  name: true,
  phone: true,
  address: true,
  paymentLink: true,
};

export const academyDetailsSelect: AcademySelect = {
  ...academyBaseSelect,
  createdAt: true,
  socialMediaPlatforms: {
    select: {
      id: true,
      platform: true,
      url: true,
    },
  },
  owners: {
    select: {
      id: true,
      name: true,
      phone: true,
    },
  },
};
