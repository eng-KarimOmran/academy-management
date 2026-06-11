import { Response } from "express";
import * as DTO from "./lesson.dto";
import * as LessonService from "./lesson.service";
import sendSuccess from "../../shared/utils/successResponse";
import { RequestAuth } from "../../middlewares/auth.middleware";

export const createLesson = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.CreateLessonDto;

  const lesson = await LessonService.create(dataSafe);

  return sendSuccess({
    res,
    statusCode: 201,
    data: lesson,
    message: "تمت جدولة الحصة بنجاح.",
  });
};

export const getAllLessons = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetAllLessonsDto;

  const data = await LessonService.getAll(dataSafe);

  return sendSuccess({
    res,
    data,
  });
};

export const getLessonDetails = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.GetLessonDetailsDto;

  const lessonData = await LessonService.getDetails(dataSafe);

  return sendSuccess({
    res,
    data: lessonData,
  });
};

export const changeLessonState = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.ChangeLessonStateDto;
  const userLogin = req.userLogin!;

  const updatedLesson = await LessonService.changeLessonState({
    userId: userLogin.id,
    dataSafe,
  });

  return sendSuccess({
    res,
    data: updatedLesson,
    message: `تم تغيير حالة الحصة`,
  });
};

export const updateLesson = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.UpdateLessonDto;

  const lesson = await LessonService.update(dataSafe);

  return sendSuccess({
    res,
    statusCode: 201,
    data: lesson,
    message: "تمت جدولة الحصة بنجاح.",
  });
};