import { TransactionClient } from './../../../prisma/generated/internal/prismaNamespace';
import * as DTO from "./course.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { Prisma, Course } from "../../../prisma/generated/client";
import { prisma } from "../../lib/prisma";
import { buildCourseWhere } from "./course.utils";
import { courseDetailsSelect } from "./course.selectors";

interface ICourseService {
  create: (data: { dataSafe: DTO.CreateDto; tx?: TransactionClient }) => Promise<Course>;
  update: (data: { dataSafe: DTO.UpdateDto; tx?: TransactionClient }) => Promise<Course>;
  getAll: (data: { dataSafe: DTO.GetAllDto; tx?: TransactionClient }) => Promise<{ items: Course[]; pagination: { limit: number; page: number; totalPages: number; total: number } }>;
  getDetails: (data: { dataSafe: DTO.GetDetailsDto; tx?: TransactionClient }) => Promise<Course>;
  deleteCourse: (data: { dataSafe: DTO.DeleteDto; tx?: TransactionClient }) => Promise<Course>;
  addFeature: (data: { courseId: string; text: string; tx?: TransactionClient }) => Promise<Course>;
  deleteFeature: (data: { courseId: string; featureId: string; tx?: TransactionClient }) => Promise<Course>;
}

const CourseService: ICourseService = {
  async create({ dataSafe, tx }) {
    const { body, params } = dataSafe;
    const { academyId } = params;

    const run = async (tx: TransactionClient) => {
      const courseExists = await tx.course.findFirst({
        where: { academyId, name: body.name }
      });
      if (courseExists) throw ApiError.Conflict("Name");

      return await tx.course.create({
        data: {
          ...body,
          academy: { connect: { id: academyId } },
        },
        select: courseDetailsSelect
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async update({ dataSafe, tx }) {
    const { body, params } = dataSafe;
    const { courseId, academyId } = params;
    const { name, priceOriginal, priceDiscounted } = body;

    const run = async (tx: TransactionClient) => {
      const course = await tx.course.findUnique({ where: { id: courseId } });
      if (!course) throw ApiError.NotFound({ model: "Course" });

      const finalPriceOriginal = priceOriginal ?? course.priceOriginal;
      const finalPriceDiscounted = priceDiscounted ?? course.priceDiscounted;
      if (finalPriceDiscounted > finalPriceOriginal) {
        throw ApiError.BadRequest("لا يمكن للسعر بعد الخصم أن يكون أكبر من السعر قبل الخصم");
      }

      if (name && name !== course.name) {
        const nameTaken = await tx.course.findFirst({ where: { name, academyId } });
        if (nameTaken) throw ApiError.Conflict("Name");
      }

      return await tx.course.update({
        where: { id: courseId },
        data: body,
        select: courseDetailsSelect
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getAll({ dataSafe, tx }) {
    const { query, params } = dataSafe;
    const { academyId } = params;
    const { limit, page, search, isActive } = query;

    const run = async (tx: TransactionClient) => {
      const { take, skip } = getPagination({ page, limit });
      const where = buildCourseWhere({ search, isActive, academyId });

      const [courses, count] = await Promise.all([
        tx.course.findMany({
          where,
          take,
          skip,
          orderBy: { createdAt: "desc" },
          select: courseDetailsSelect
        }),
        tx.course.count({ where })
      ]);

      const totalPages = getTotalPages({ limit, count });
      const pagination = { limit, page, totalPages, total: count };

      return { items: courses, pagination };
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async getDetails({ dataSafe, tx }) {
    const { courseId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const course = await tx.course.findUnique({
        where: { id: courseId },
        select: courseDetailsSelect,
      });
      if (!course) throw ApiError.NotFound({ model: "Course" });

      return course;
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async deleteCourse({ dataSafe, tx }) {
    const { courseId } = dataSafe.params;

    const run = async (tx: TransactionClient) => {
      const course = await tx.course.findUnique({ where: { id: courseId } });
      if (!course) throw ApiError.NotFound({ model: "Course" });

      return await tx.course.delete({
        where: { id: courseId },
        select: courseDetailsSelect
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async addFeature({ courseId, text, tx }) {
    const run = async (tx: TransactionClient) => {
      const course = await tx.course.findUnique({ where: { id: courseId } });
      if (!course) throw ApiError.NotFound({ model: "Course" });

      // إضافة الـ Feature مباشرة عبر الـ Nested Queries الخاصة ببريزما
      return await tx.course.update({
        where: { id: courseId },
        data: {
          courseFeatures: {
            create: { text }
          }
        },
        select: courseDetailsSelect
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  },

  async deleteFeature({ courseId, featureId, tx }) {
    const run = async (tx: TransactionClient) => {
      const course = await tx.course.findUnique({ where: { id: courseId } });
      if (!course) throw ApiError.NotFound({ model: "Course" });

      return await tx.course.update({
        where: { id: courseId },
        data: {
          courseFeatures: {
            delete: { id: featureId }
          }
        },
        select: courseDetailsSelect
      });
    };

    return tx ? await run(tx) : await prisma.$transaction(run);
  }
};

export default CourseService;