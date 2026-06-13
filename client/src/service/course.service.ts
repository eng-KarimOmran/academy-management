import { axiosClient } from "@/lib/axios";

import type {
  CreateCourseDto,
  UpdateCourseDto,
  DeleteCourseDto,
  GetAllCoursesDto,
  GetCourseDetailsDto,
  AddCourseFeaturesDto,
  DeleteCourseFeaturesDto,
} from "@/DTOs/course.dto";

import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";

import type { Course, CourseDetails } from "@/types/course";

const baseUrl = (academyId: string) => `/academies/${academyId}/courses`;

export const createCourse = (data: CreateCourseDto) => {
  const { academyId, ...body } = data;

  return axiosClient.post<SuccessfulResponse<Course>>(baseUrl(academyId), body);
};

export const updateCourse = (data: UpdateCourseDto) => {
  const { academyId, courseId, ...body } = data;

  return axiosClient.patch<SuccessfulResponse<Course>>(
    `${baseUrl(academyId)}/${courseId}`,
    body,
  );
};

export const deleteCourse = (data: DeleteCourseDto) => {
  const { academyId, courseId } = data;

  return axiosClient.delete<SuccessfulResponse<null>>(
    `${baseUrl(academyId)}/${courseId}`,
  );
};

export const getAllCourses = (data: GetAllCoursesDto) => {
  const { academyId } = data;

  return axiosClient.get<PaginatedResponse<Course>>(baseUrl(academyId), {
    params: {
      page: data.page ?? 1,
      limit: data.limit ?? 10,
      search: data.search ?? "",
    },
  });
};

export const getCourseDetails = (params: GetCourseDetailsDto) => {
  const { academyId, courseId } = params;

  return axiosClient.get<SuccessfulResponse<CourseDetails>>(
    `${baseUrl(academyId)}/${courseId}`,
  );
};

export const getCourseActive = ({ academyId }: { academyId: string }) => {
  return axiosClient.get<PaginatedResponse<Course>>(baseUrl(academyId), {
    params: {
      isActive: true,
    },
  });
};

export const AddCourseFeatures = (data: AddCourseFeaturesDto) => {
  const { academyId, courseId, text } = data;
  return axiosClient.post<SuccessfulResponse<Course>>(
    `${baseUrl(academyId)}/${courseId}/feature`,
    { text },
  );
};

export const DeleteCourseFeatures = (data: DeleteCourseFeaturesDto) => {
  const { academyId, courseId, featureId } = data;

  return axiosClient.delete<SuccessfulResponse<Course>>(
    `${baseUrl(academyId)}/${courseId}/feature/${featureId}`,
    {
      params: {
        isActive: true,
      },
    },
  );
};
