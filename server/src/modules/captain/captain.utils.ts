import { TrainingSupport } from "../../../prisma/generated/enums";
import { CaptainWhereInput } from "../../../prisma/generated/models";

export const buildCaptainWhere = ({
  search,
  isActive,
  trainingType,
}: {
  search?: string;
  isActive?: boolean;
  trainingType?: TrainingSupport;
}): CaptainWhereInput => {
  const where: CaptainWhereInput = {};

  if (search) {
    where.OR = [
      { user: { name: { contains: search, mode: "insensitive" } } },
      { user: { phone: { contains: search, mode: "insensitive" } } },
    ];
  }

  if (trainingType) {
    where.trainingType = { in: ["BOTH", trainingType] };
  }

  if (typeof isActive !== "undefined") {
    where.isActive = isActive;
  }

  return where;
};
