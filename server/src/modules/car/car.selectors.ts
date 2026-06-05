import { CarSelect } from "../../../prisma/generated/models";

export const carBaseSelect: CarSelect = {
  id: true,
  plateNumber: true,
  carSessionPrice: true,
  modelName: true,
  isActive: true,
  gearType: true,
  createdAt: true,
};