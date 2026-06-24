import { axiosClient } from "@/lib/axios";
import * as Dto from "@/DTOs/course.dto";

import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Course, CourseDetails } from "@/types/course";

type Entity = Course;
type EntityDetails = CourseDetails;

const coursesUrl = {
  base: (academyId: string) =>
    `/academies/${academyId}/courses`,

  byId: (academyId: string, courseId: string) =>
    `/academies/${academyId}/courses/${courseId}`,

  feature: (academyId: string, courseId: string) =>
    `/academies/${academyId}/courses/${courseId}/feature`,

  featureById: (academyId: string, courseId: string, featureId: string) =>
    `/academies/${academyId}/courses/${courseId}/feature/${featureId}`,
};

export const createCourse = (data: Dto.CreateDto) => {
  const { params, body } = data;
  const { academyId } = params;

  return axiosClient.post<SuccessfulResponse<Entity>>(
    coursesUrl.base(academyId),
    body
  );
};

export const updateCourse = (data: Dto.UpdateDto) => {
  const { params, body } = data;
  const { academyId, courseId } = params;

  return axiosClient.patch<SuccessfulResponse<Entity>>(
    coursesUrl.byId(academyId, courseId),
    body
  );
};

export const deleteCourse = (data: Dto.DeleteDto) => {
  const { params } = data;
  const { academyId, courseId } = params;

  return axiosClient.delete<SuccessfulResponse<null>>(
    coursesUrl.byId(academyId, courseId)
  );
};

export const getAllCourses = (data: Dto.GetAllDto) => {
  const { params, query } = data;
  const { academyId } = params;

  return axiosClient.get<PaginatedResponse<Entity>>(
    coursesUrl.base(academyId),
    {
      params: query,
    }
  );
};

export const getDetailsCourse = (data: Dto.GetDetailsDto) => {
  const { params } = data;
  const { academyId, courseId } = params;

  return axiosClient.get<SuccessfulResponse<EntityDetails>>(
    coursesUrl.byId(academyId, courseId)
  );
};

export const addCourseFeatures = (data: Dto.AddFeaturesDto) => {
  const { params, body } = data;
  const { academyId, courseId } = params;

  return axiosClient.post<SuccessfulResponse<Entity>>(
    coursesUrl.feature(academyId, courseId),
    body
  );
};

export const deleteCourseFeatures = (data: Dto.DeleteFeaturesDto) => {
  const { params } = data;
  const { academyId, courseId, featureId } = params;

  return axiosClient.delete<SuccessfulResponse<Entity>>(
    coursesUrl.featureById(academyId, courseId, featureId)
  );
};