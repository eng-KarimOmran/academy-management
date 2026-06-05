import * as DTO from "./course.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPaginationParams } from "../../shared/utils/Pagination";
import {
  createCourse,
  findCourseById,
  findCourseByName,
  findManyCourse,
  updateCourse,
  remove,
  addCourseFeatures,
  deleteCourseFeatures,
} from "./course.repository";
import { CourseCreateInput } from "../../../prisma/generated/models";
import { buildCourseWhere } from "./course.utils";
import { courseDetailsSelect } from "./course.selectors";

export const create = async (dataSafe: DTO.CreateDto) => {
  const { body, params } = dataSafe;
  const { academyId } = params;

  const courseExists = await findCourseByName({ academyId, name: body.name });

  if (courseExists) throw ApiError.Conflict("Name");

  const data: CourseCreateInput = {
    ...body,
    academy: { connect: { id: academyId } },
  };

  return await createCourse(data);
};

export const update = async (dataSafe: DTO.UpdateDto) => {
  const { body, params } = dataSafe;
  const { courseId, academyId } = params;

  const { name } = body;

  const course = await findCourseById({ id: courseId });

  if (!course) throw ApiError.NotFound({ model: "Course" });

  if (name && name !== course.name) {
    const nameTaken = await findCourseByName({ name, academyId });
    if (nameTaken) throw ApiError.Conflict("Name");
  }

  return await updateCourse({ id: courseId, data: body });
};

export const getAll = async (dataSafe: DTO.GetAllDto) => {
  const { query, params } = dataSafe;
  const { academyId } = params;
  const { limit, page, search, isActive } = query;

  const where = buildCourseWhere({ search, isActive, academyId });

  const { count, courses } = await findManyCourse({
    where,
    take: limit,
    skip: Math.min(0, page - 1) * limit,
    orderBy: { createdAt: "desc" },
  });

  const { safePage, totalPages } = getPaginationParams({
    limit,
    page,
    count,
  });

  const pagination = { limit, page: safePage, total: count, totalPages };

  return { items: courses, pagination };
};

export const getDetails = async (dataSafe: DTO.GetDetailsDto) => {
  const { courseId } = dataSafe.params;

  const course = await findCourseById({
    id: courseId,
    select: courseDetailsSelect,
  });

  if (!course) throw ApiError.NotFound({ model: "Course" });

  return course;
};

export const deleteCourse = async (dataSafe: DTO.DeleteDto) => {
  const { courseId } = dataSafe.params;

  const course = await findCourseById({ id: courseId });
  if (!course) throw ApiError.NotFound({ model: "Course" });

  return await remove(courseId);
};

export const addFeature = async ({
  courseId,
  text,
}: {
  courseId: string;
  text: string;
}) => {
  const course = await findCourseById({ id: courseId });
  if (!course) throw ApiError.NotFound({ model: "Course" });

  return await addCourseFeatures({ courseId, text });
};

export const deleteFeature = async ({
  courseId,
  featureId,
}: {
  courseId: string;
  featureId: string;
}) => {
  const course = await findCourseById({ id: courseId });
  if (!course) throw ApiError.NotFound({ model: "Course" });
  
  return await deleteCourseFeatures({ courseId, featureId });
};
