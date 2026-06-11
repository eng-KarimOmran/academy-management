import * as DTO from "./course.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { CourseCreateInput } from "../../../prisma/generated/models";
import { buildCourseWhere } from "./course.utils";
import { courseDetailsSelect } from "./course.selectors";
import CourseRepository from "./course.repository";

const CourseService = {
  async create(dataSafe: DTO.CreateDto) {
    const { body, params } = dataSafe;
    const { academyId } = params;

    const courseExists = await CourseRepository.findCourseByName({ academyId, name: body.name });
    if (courseExists) throw ApiError.Conflict("Name");

    const data: CourseCreateInput = {
      ...body,
      academy: { connect: { id: academyId } },
    };

    return await CourseRepository.create({ data });
  },

  async update(dataSafe: DTO.UpdateDto) {
    const { body, params } = dataSafe;
    const { courseId, academyId } = params;
    const { name } = body;

    const course = await CourseRepository.findCourseById({ id: courseId });
    if (!course) throw ApiError.NotFound({ model: "Course" });

    if (name && name !== course.name) {
      const nameTaken = await CourseRepository.findCourseByName({ name, academyId });
      if (nameTaken) throw ApiError.Conflict("Name");
    }

    return await CourseRepository.update({ id: courseId, data: body });
  },

  async getAll(dataSafe: DTO.GetAllDto) {
    const { query, params } = dataSafe;
    const { academyId } = params;
    const { limit, page, search, isActive } = query;

    const where = buildCourseWhere({ search, isActive, academyId });
    const { take, skip } = getPagination({ page, limit });

    const { courses, count } = await CourseRepository.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });

    const totalPages = getTotalPages({ limit, count });
    const pagination = { limit, page, totalPages, total: count };

    return { items: courses, pagination };
  },

  async getDetails(dataSafe: DTO.GetDetailsDto) {
    const { courseId } = dataSafe.params;

    const course = await CourseRepository.findCourseById({
      id: courseId,
      select: courseDetailsSelect,
    });

    if (!course) throw ApiError.NotFound({ model: "Course" });

    return course;
  },

  async deleteCourse(dataSafe: DTO.DeleteDto) {
    const { courseId } = dataSafe.params;

    const course = await CourseRepository.findCourseById({ id: courseId });
    if (!course) throw ApiError.NotFound({ model: "Course" });

    return await CourseRepository.delete({ id: courseId });
  },

  async addFeature({ courseId, text }: { courseId: string; text: string }) {
    const course = await CourseRepository.findCourseById({ id: courseId });
    if (!course) throw ApiError.NotFound({ model: "Course" });

    return await CourseRepository.addCourseFeature({ courseId, text });
  },

  async deleteFeature({ courseId, featureId }: { courseId: string; featureId: string }) {
    const course = await CourseRepository.findCourseById({ id: courseId });
    if (!course) throw ApiError.NotFound({ model: "Course" });

    return await CourseRepository.deleteCourseFeature({ courseId, featureId });
  }
};

export default CourseService;