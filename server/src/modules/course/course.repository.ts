import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  CourseCreateInput,
  CourseOrderByWithRelationInput,
  CourseSelect,
  CourseUpdateInput,
  CourseWhereInput,
} from "../../../prisma/generated/models";
import { courseBaseSelect } from "./course.selectors";
import getClient from "../../shared/utils/getClient"

const CourseRepository = {
  async findCourseById({ id, select, tx }: { id: string; select?: CourseSelect; tx?: TransactionClient }) {
    return getClient(tx).course.findUnique({
      where: { id },
      select: select ?? courseBaseSelect,
    });
  },

  async findCourseByName({ name, academyId, tx }: { name: string; academyId: string; tx?: TransactionClient }) {
    return getClient(tx).course.findUnique({
      where: { academyId_name: { name, academyId } },
      select: courseBaseSelect,
    });
  },

  async findMany({ where, skip, take, orderBy, select, tx }: { skip?: number; take?: number; where?: CourseWhereInput; orderBy?: CourseOrderByWithRelationInput; select?: CourseSelect; tx?: TransactionClient }) {
    const client = getClient(tx);
    const [courses, count] = await Promise.all([
      client.course.findMany({ where, skip, take, orderBy, select: select ?? courseBaseSelect }),
      client.course.count({ where }),
    ]);
    return { courses, count };
  },

  async create({ data, select, tx }: { data: CourseCreateInput; select?: CourseSelect; tx?: TransactionClient }) {
    return getClient(tx).course.create({
      data,
      select: select ?? courseBaseSelect,
    });
  },

  async update({ id, data, select, tx }: { id: string; data: CourseUpdateInput; select?: CourseSelect; tx?: TransactionClient }) {
    return getClient(tx).course.update({
      where: { id },
      data,
      select: select ?? courseBaseSelect,
    });
  },

  async delete({ id, select, tx }: { id: string; select?: CourseSelect; tx?: TransactionClient }) {
    return getClient(tx).course.delete({
      where: { id },
      select: select ?? courseBaseSelect,
    });
  },

  async addCourseFeature({ courseId, text, tx }: { courseId: string; text: string; tx?: TransactionClient }) {
    return getClient(tx).course.update({
      where: { id: courseId },
      data: {
        courseFeatures: {
          create: { text },
        },
      },
      select: courseBaseSelect,
    });
  },

  async deleteCourseFeature({ courseId, featureId, tx }: { courseId: string; featureId: string; tx?: TransactionClient }) {
    return getClient(tx).course.update({
      where: { id: courseId },
      data: {
        courseFeatures: {
          delete: { id: featureId },
        },
      },
      select: courseBaseSelect,
    });
  },
};

export default CourseRepository;