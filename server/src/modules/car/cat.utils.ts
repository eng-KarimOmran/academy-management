import { Transmission } from "../../../prisma/generated/enums";
import { CarWhereInput } from "../../../prisma/generated/models";

export const buildCarWhere = ({
  search,
  gearType,
  isActive,
}: {
  search?: string;
  isActive?: boolean;
  gearType?: Transmission;
}): CarWhereInput => {
  const where: CarWhereInput = {};

  if (search) {
    where.OR = [
      { modelName: { contains: search, mode: "insensitive" } },
      { plateNumber: { contains: search, mode: "insensitive" } },
    ];
  }

  if (gearType) {
    where.gearType = gearType;
  }

  if (typeof isActive !== "undefined") {
    where.isActive = isActive;
  }

  return where;
};