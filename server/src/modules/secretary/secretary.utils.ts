import { SecretaryWhereInput } from "../../../prisma/generated/models";

export const buildSecretaryWhere = ({
  search,
  academyId
}: {
  search?: string;
  academyId: string
}): SecretaryWhereInput => {
  const where: SecretaryWhereInput = { academyId };

  if (search) {
    where.OR = [
      { user: { name: { contains: search, mode: "insensitive" } } },
      { user: { phone: { contains: search, mode: "insensitive" } } },
    ];
  }

  return where;
};
