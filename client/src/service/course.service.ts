import { axiosClient } from "@/lib/axios";

import type {
  CreateCourseDto,
  UpdateCourseDto,
  DeleteCourseDto,
  GetAllCoursesDto,
  GetCourseDetailsDto,
} from "@/DTOs/course.dto";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Course, CourseDetails } from "@/types/course";

export const createCourse = (data: CreateCourseDto) => {
  const { academyId, ...body } = data;

  return axiosClient.post<SuccessfulResponse<Course>>(
    `/academy/${academyId}/course`,
    body,
  );
};

export const updateCourse = (data: UpdateCourseDto) => {
  const { academyId, id, ...body } = data;

  return axiosClient.patch<SuccessfulResponse<Course>>(
    `/academy/${academyId}/course/${id}`,
    body,
  );
};

export const deleteCourse = (data: DeleteCourseDto) => {
  const { academyId, id } = data;

  return axiosClient.delete<SuccessfulResponse<null>>(
    `/academy/${academyId}/course/${id}`,
  );
};

export const getAllCourses = (params: GetAllCoursesDto) => {
  const { academyId, ...query } = params;

  return axiosClient.get<PaginatedResponse<CourseDetails>>(
    `/academy/${academyId}/course`,
    {
      params: query,
    },
  );
};

export const getCourseDetails = (params: GetCourseDetailsDto) => {
  const { academyId, id } = params;

  return axiosClient.get<SuccessfulResponse<CourseDetails>>(
    `/academy/${academyId}/course/details/${id}`,
  );
};

export const getCourseActive = ({ academyId }: { academyId: string }) => {
  return axiosClient.get<SuccessfulResponse<CourseDetails[]>>(
    `/academy/${academyId}/course/active`,
  );
};