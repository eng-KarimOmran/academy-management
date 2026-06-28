import { Transmission } from "../../../prisma/generated/enums";
import { CarOrderByRelationAggregateInput, CarOrderByWithRelationInput, CarWhereInput } from "../../../prisma/generated/models";

export const buildCarWhere = ({
  search,
  gearType,
  isActive,
  academyId
}: {
  search?: string;
  isActive?: boolean;
  gearType?: Transmission;
  academyId: string
}): CarWhereInput => {
  const where: CarWhereInput = { academyId };

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

export const orderBy:CarOrderByWithRelationInput = {
  createdAt: "desc",
}