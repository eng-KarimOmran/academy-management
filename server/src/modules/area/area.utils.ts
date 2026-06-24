import { SupportType } from "../../../prisma/generated/enums";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import { AreaWhereInput } from "../../../prisma/generated/models";
import ApiError from "../../shared/utils/ApiError";
import AreaRepository from "./area.repository";

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

export const getAreaOrThrow = async (areaId: string, tx: TransactionClient,) => {
  const areaEx = await AreaRepository.findById(areaId, tx)

  if (!areaEx) throw ApiError.NotFound("Area");

  return areaEx;
};