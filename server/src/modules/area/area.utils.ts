import { TrainingSupport } from "../../../prisma/generated/enums";
import { AreaWhereInput } from "../../../prisma/generated/models";

export const buildAreaWhere = ({
  search,
  isActive,
  supportType,
}: {
  search?: string;
  isActive?: boolean;
  supportType?: TrainingSupport;
}): AreaWhereInput => {
  const where: AreaWhereInput = {};

  if (search) {
    where.OR = [{ name: { contains: search, mode: "insensitive" } }];
  }

  if (typeof isActive !== "undefined") {
    where.isActive = isActive;
  }

  if (supportType) {
    where.supportType = supportType;
  }

  return where;
};
