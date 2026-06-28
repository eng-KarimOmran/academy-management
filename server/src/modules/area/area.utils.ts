import { SupportType } from "../../../prisma/generated/enums";
import { AreaOrderByWithRelationInput, AreaWhereInput } from "../../../prisma/generated/models";

export const buildAreaWhere = ({
  search,
  isActive,
  academyId,
  supportType,
}: {
  search?: string;
  isActive?: boolean;
  academyId: string
  supportType?: SupportType;
}): AreaWhereInput => {
  const where: AreaWhereInput = { academyId };

  if (search) {
    where.OR = [
      { id: { startsWith: search, mode: "insensitive" } },
      { name: { contains: search, mode: "insensitive" } },
    ];
  }

  if (typeof isActive !== "undefined") {
    where.isActive = isActive;
  }

  if (supportType) {
    where.supportType = {
      in: ["BOTH", supportType],
    };
  }

  return where;
};

export const orderBy: AreaOrderByWithRelationInput = {
  createdAt: "desc",
}