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
  captainProfile: true,
  secretaryProfile: true,
};