import { SecretaryWhereInput } from "../../../prisma/generated/models";

export const buildSecretaryWhere = ({
  search,
}: {
  search?: string;
}): SecretaryWhereInput => {
  const where: SecretaryWhereInput = {};

  if (search) {
    where.OR = [
      { user: { name: { contains: search, mode: "insensitive" } } },
      { user: { phone: { contains: search, mode: "insensitive" } } },
    ];
  }

  return where;
};
