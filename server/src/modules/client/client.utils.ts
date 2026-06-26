import {
  ClientOrderByWithRelationInput,
  ClientWhereInput,
} from "../../../prisma/generated/models";
import { ClientSource } from "../../../prisma/generated/enums";

export const buildClientWhere = ({
  academyId,
  search,
  clientSource,
}: {
  academyId: string;
  search?: string;
  clientSource?: ClientSource;
}): ClientWhereInput => {
  const where: ClientWhereInput = { academyId }

  if (search) {
    where.OR = [
      {
        name: { contains: search, mode: "insensitive" }
      },
      {
        phone: { contains: search }
      }
    ]
  }

  if (clientSource) {
    where.source = clientSource
  }

  return where
}

export const orderBy: ClientOrderByWithRelationInput = {
  createdAt: "desc",
};