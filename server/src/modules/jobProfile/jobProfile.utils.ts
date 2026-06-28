import { JobProfileType, SupportType } from "../../../prisma/generated/enums";
import {
  JobProfileOrderByWithRelationInput,
  JobProfileWhereInput,
} from "../../../prisma/generated/models";

export const buildJobProfileWhere = ({
  academyId,
  search,
  isActive,
  jobProfileType,
  supportType,
}: {
  academyId: string;
  search?: string;
  isActive?: boolean;
  jobProfileType?: JobProfileType;
  supportType?: SupportType;
}): JobProfileWhereInput => {
  const where: JobProfileWhereInput = {
    academyId,
  };

  if (search) {
    where.OR = [
      { id: { contains: search } },
      {
        user: {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: search,
              },
            },
          ],
        }
      }
    ]
  }

  if (typeof isActive === "boolean") {
    where.isActive = isActive;
  }

  if (jobProfileType) {
    where.jobProfileType = jobProfileType;
  }

  if (supportType) {
    where.supportType = supportType;
  }

  return where;
};

export const orderBy: JobProfileOrderByWithRelationInput = {
  createdAt: "desc",
};