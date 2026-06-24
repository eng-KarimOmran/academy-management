import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import { AcademyWhereInput } from "../../../prisma/generated/models";
import ApiError from "../../shared/utils/ApiError";
import AcademyRepository from "./academy.repository";
import { AcademyWithFullRelations } from "./academy.type";

export const buildAcademyWhere = ({
  search,
}: {
  search?: string;
}): AcademyWhereInput => {
  const where: AcademyWhereInput = {};

  if (search) {
    where.OR = [
      { id: { startsWith: search, mode: "insensitive" } },
      { name: { contains: search, mode: "insensitive" } },
    ];
  }

  return where;
};

export const getAcademyOrThrow = async (
  academyId: string,
  tx: TransactionClient,
  academy?: AcademyWithFullRelations
) => {
  const academyEx = academy ?? await AcademyRepository.getAcademyDetails(academyId, tx)

  if (!academyEx) throw ApiError.NotFound("Academy");

  return academyEx;
};