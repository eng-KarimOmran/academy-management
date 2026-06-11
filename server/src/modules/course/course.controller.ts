import { Response } from "express";
import { RequestAuth } from "../../middlewares/auth.middleware";
import * as DTO from "./course.dto";
import sendSuccess from "../../shared/utils/successResponse";
import CourseService from "./course.service";
import { RequestAcademy } from "../academy/academy.middleware";

const CourseController = {
  createCourse: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateDto;

    const course = await CourseService.create(dataSafe);

    return sendSuccess({
      res,
      statusCode: 201,
      data: course,
      message: "تم إضافة البرنامج بنجاح",
    });
  },

  updateCourse: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.UpdateDto;

    const updatedCourse = await CourseService.update(dataSafe);

    return sendSuccess({
      res,
      data: updatedCourse,
      message: "تم تحديث البرنامج بنجاح",
    });
  },

  getAllCourses: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllDto;

    const data = await CourseService.getAll(dataSafe);

    return sendSuccess({
      res,
      data,
    });
  },

  getDetailsCourse: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetDetailsDto;

    const course = await CourseService.getDetails(dataSafe);

    return sendSuccess({ res, data: course });
  },

  deleteCourse: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.DeleteDto;

    await CourseService.deleteCourse(dataSafe);

    return sendSuccess({ res, message: "تم حذف البرنامج نهائياً" });
  },

  addCourseFeatures: async (req: RequestAcademy, res: Response) => {
    const { body, params } = req.dataSafe as DTO.AddCourseFeaturesDto;
    const { courseId } = params;
    const { text } = body;

    const data = await CourseService.addFeature({ courseId, text });

    return sendSuccess({
      res,
      statusCode: 201,
      data: data,
      message: "تم اضافة الميزة بنجاح",
    });
  },

  deleteCourseFeatures: async (req: RequestAcademy, res: Response) => {
    const { params } = req.dataSafe as DTO.DeleteCourseFeaturesDto;
    const { courseId, featureId } = params;

    const data = await CourseService.deleteFeature({ courseId, featureId });

    return sendSuccess({
      res,
      data: data,
      message: "تم حذف الميزة بنجاح",
    });
  },
};

export default CourseController;