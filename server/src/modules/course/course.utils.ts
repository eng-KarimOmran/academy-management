import { CourseWhereInput } from "../../../prisma/generated/models";

export const buildCourseWhere = ({
  search,
  isActive,
  academyId,
}: {
  search?: string;
  isActive?: boolean;
  academyId: string;
}): CourseWhereInput => {
  const where: CourseWhereInput = { academyId };

  if (search) {
    where.OR = [{ name: { contains: search, mode: "insensitive" } }];
  }

  if (typeof isActive !== "undefined") {
    where.isActive = isActive;
  }

  return where;
};
