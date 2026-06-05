import { axiosClient } from "@/lib/axios";

import type {
  CreateLessonDto,
  UpdateLessonDto,
  ChangeLessonStateDto,
  GetAllLessonsDto,
  GetLessonDetailsDto,
} from "@/DTOs/lesson.dto";
import type { LessonBase, LessonDetails } from "@/types/lesson";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";

export const getAllLessons = async (data: GetAllLessonsDto) => {
  const { academyId, ...params } = data;
  return axiosClient.get<PaginatedResponse<LessonBase>>(
    `/academy/${academyId}/lesson`,
    { params },
  );
};

export const getLessonDetails = async (data: GetLessonDetailsDto) => {
  const { academyId, lessonId } = data;
  return axiosClient.get<SuccessfulResponse<LessonDetails>>(
    `/academy/${academyId}/lesson/details/${lessonId}`,
  );
};

export const createLesson = async (data: CreateLessonDto) => {
  const { academyId, ...body } = data;
  return axiosClient.post<SuccessfulResponse<LessonBase>>(
    `/academy/${academyId}/lesson`,
    body,
  );
};

export const updateLesson = async (data: UpdateLessonDto) => {
  const { academyId, lessonId, ...body } = data;
  return axiosClient.patch<SuccessfulResponse<LessonBase>>(
    `/academy/${academyId}/lesson/${lessonId}`,
    body,
  );
};

export const changeLessonState = async (data: ChangeLessonStateDto) => {
  const { academyId, lessonId, ...body } = data;
  return axiosClient.patch(
    `/academy/${academyId}/lesson/${lessonId}/status`,
    body,
  );
};
