import { ClientWhereInput } from "../../../prisma/generated/models";

export const buildClientWhere = ({
  search,
  academyId,
}: {
  search?: string;
  academyId: string;
}): ClientWhereInput => {
  const where: ClientWhereInput = {
    academyId,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
      { id: { contains: search } },
    ];
  }

  return where;
};
