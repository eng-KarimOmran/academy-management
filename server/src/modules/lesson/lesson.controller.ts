import { Response } from "express";
import * as DTO from "./lesson.dto";
import LessonService from "./lesson.service";
import sendSuccess from "../../shared/utils/successResponse";
import { RequestAuth } from "../../middlewares/auth.middleware";

const LessonController = {
  createLesson: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.CreateLessonDto;

    const lesson = await LessonService.create(dataSafe);

    return sendSuccess({
      res,
      statusCode: 201,
      data: lesson,
      message: "تمت جدولة الحصة بنجاح.",
    });
  },

  getAllLessons: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetAllLessonsDto;

    const data = await LessonService.getAll(dataSafe);

    return sendSuccess({
      res,
      data,
    });
  },

  getLessonDetails: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetLessonDetailsDto;

    const lessonData = await LessonService.getDetails(dataSafe);

    return sendSuccess({
      res,
      data: lessonData,
    });
  },

  updateLesson: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.UpdateLessonDto;

    const updatedLesson = await LessonService.update(dataSafe);

    return sendSuccess({
      res,
      data: updatedLesson,
      message: "تم تحديث بيانات الحصة بنجاح وتفادي تداخل المواعيد.",
    });
  },

  changeLessonState: async (req: RequestAuth, res: Response) => {
    const dataSafe = req.dataSafe as DTO.ChangeLessonStateDto;

    const userLogin = req.userLogin!;

    const updatedLesson = await LessonService.changeLessonState({
      userId: userLogin.id,
      dataSafe,
    });

    return sendSuccess({
      res,
      data: updatedLesson,
      message: `تمت تحديث حالة الحصة وإجراء التسووية المالية بنجاح.`,
    });
  },
};

export default LessonController;