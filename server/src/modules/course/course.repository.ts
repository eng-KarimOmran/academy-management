import {
  CourseCreateInput,
  CourseOrderByWithRelationInput,
  CourseSelect,
  CourseUpdateInput,
  CourseWhereInput,
} from "../../../prisma/generated/models";
import { prisma } from "../../lib/prisma";
import { courseBaseSelect } from "./course.selectors";

export const findCourseById = async ({
  id,
  select = courseBaseSelect,
}: {
  id: string;
  select?: CourseSelect;
}) => {
  return await prisma.course.findUnique({
    where: { id },
    select,
  });
};

export const findCourseByName = async ({
  name,
  academyId,
}: {
  name: string;
  academyId: string;
}) => {
  return await prisma.course.findUnique({
    where: { academyId_name: { name, academyId } },
    select: courseBaseSelect,
  });
};

export const findManyCourse = async (data: {
  where?: CourseWhereInput;
  skip?: number;
  take?: number;
  orderBy?: CourseOrderByWithRelationInput;
}) => {
  const [courses, count] = await prisma.$transaction([
    prisma.course.findMany({
      ...data,
      select: courseBaseSelect,
    }),
    prisma.course.count({ where: data.where }),
  ]);
  return { courses, count };
};

export const createCourse = async (data: CourseCreateInput) => {
  return await prisma.course.create({ data, select: courseBaseSelect });
};

export const updateCourse = async ({
  id,
  data,
}: {
  id: string;
  data: CourseUpdateInput;
}) => {
  return await prisma.course.update({
    where: { id },
    data,
    select: courseBaseSelect,
  });
};

export const remove = async (id: string) => {
  return await prisma.course.delete({
    where: { id },
    select: courseBaseSelect,
  });
};

export const addCourseFeatures = async ({
  courseId,
  text,
}: {
  courseId: string;
  text: string;
}) => {
  await prisma.course.update({
    where: { id: courseId },
    data: {
      courseFeatures: {
        create: {
          text,
        },
      },
    },
    select: courseBaseSelect,
  });
};

export const deleteCourseFeatures = async ({
  courseId,
  featureId,
}: {
  courseId: string;
  featureId: string;
}) => {
  await prisma.course.update({
    where: { id: courseId },
    data: {
      courseFeatures: {
        delete: {
          id: featureId,
        },
      },
    },
    select: courseBaseSelect,
  });
};