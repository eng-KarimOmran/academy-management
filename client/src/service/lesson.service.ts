import { axiosClient } from "@/lib/axios";

import type {
  CreateLessonDto,
  ChangeLessonStateDto,
  GetAllLessonsDto,
  GetLessonDetailsDto,
} from "@/DTOs/lesson.dto";

import type { LessonBase } from "@/types/lesson";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";

const baseUrl = (academyId: string) => `/academies/${academyId}/lessons`;

export const getAllLessons = async (data: GetAllLessonsDto) => {
  const { academyId } = data;
  return axiosClient.get<PaginatedResponse<LessonBase>>(baseUrl(academyId), {
    params: {
      page: data.page ?? 1,
      limit: data.limit ?? 10,
      search: data.search ?? "",
    },
  });
};

export const getLessonDetails = async (data: GetLessonDetailsDto) => {
  const { academyId, lessonId } = data;
  return axiosClient.get<SuccessfulResponse<LessonBase>>(
    `${baseUrl(academyId)}/${lessonId}`,
  );
};

export const createLesson = async (data: CreateLessonDto) => {
  const { academyId, ...body } = data;
  return axiosClient.post<SuccessfulResponse<LessonBase>>(
    baseUrl(academyId),
    body,
  );
};

export const changeLessonState = async (data: ChangeLessonStateDto) => {
  const { academyId, lessonId, ...body } = data;
  return axiosClient.patch(`${baseUrl(academyId)}/${lessonId}/status`, body);
};
