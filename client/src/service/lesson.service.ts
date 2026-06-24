import { axiosClient } from "@/lib/axios";
import * as Dto from "@/DTOs/lesson.dto";

import type { LessonBase } from "@/types/lesson";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";

type Entity = LessonBase;

const lessonsUrl = {
  base: (academyId: string) =>
    `/academies/${academyId}/lessons`,

  byId: (academyId: string, lessonId: string) =>
    `/academies/${academyId}/lessons/${lessonId}`,

  status: (academyId: string, lessonId: string) =>
    `/academies/${academyId}/lessons/${lessonId}/status`,
};

export const getAllLessons = (data: Dto.GetAllLessonsDto) => {
  const { params, query } = data;
  const { academyId } = params;

  return axiosClient.get<PaginatedResponse<Entity>>(
    lessonsUrl.base(academyId),
    { params: query }
  );
};

export const getLessonDetails = (data: Dto.GetLessonDetailsDto) => {
  const { params } = data;
  const { academyId, lessonId } = params;

  return axiosClient.get<SuccessfulResponse<Entity>>(
    lessonsUrl.byId(academyId, lessonId)
  );
};

export const createLesson = (data: Dto.CreateLessonDto) => {
  const { params, body } = data;
  const { academyId } = params;

  return axiosClient.post<SuccessfulResponse<Entity>>(
    lessonsUrl.base(academyId),
    body
  );
};

export const changeLessonState = (data: Dto.ChangeLessonStateDto) => {
  const { params, body } = data;
  const { academyId, lessonId } = params;

  return axiosClient.patch(
    lessonsUrl.status(academyId, lessonId),
    body
  );
};

export const updateLesson = (data: Dto.UpdateLessonDto) => {
  const { params, body } = data;
  const { academyId, lessonId } = params;

  return axiosClient.patch(
    lessonsUrl.byId(academyId, lessonId),
    body
  );
};