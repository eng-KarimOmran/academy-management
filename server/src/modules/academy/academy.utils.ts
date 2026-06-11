import { AcademyWhereInput } from "../../../prisma/generated/models";

export const buildAcademyWhere = ({
  search,
}: {
  search?: string;
}): AcademyWhereInput => {
  const where: AcademyWhereInput = {};

  if (search) {
    where.OR = [
      { address: { contains: search, mode: "insensitive" } },
      { name: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
    ];
  }

  return where;
};