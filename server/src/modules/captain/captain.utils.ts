import { SupportType } from "../../../prisma/generated/enums";
import { CaptainWhereInput } from "../../../prisma/generated/models";

export const buildCaptainWhere = ({
  search,
  isActive,
  supportType,
  academyId
}: {
  search?: string;
  isActive?: boolean;
  supportType?: SupportType;
  academyId: string
}): CaptainWhereInput => {
  const where: CaptainWhereInput = { academyId };

  if (search) {
    where.OR = [
      { user: { name: { contains: search, mode: "insensitive" } } },
      { user: { phone: { contains: search, mode: "insensitive" } } },
    ];
  }

  if (supportType) {
    where.supportType = { in: ["BOTH", supportType] };
  }

  if (typeof isActive !== "undefined") {
    where.isActive = isActive;
  }

  return where;
};
