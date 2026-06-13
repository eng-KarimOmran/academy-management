import { axiosClient } from "@/lib/axios";
import type {
  CreateCaptainDto,
  UpdateCaptainDto,
  DeleteCaptainDto,
  GetAllCaptainsDto,
  GetLessonCaptainDto,
} from "@/DTOs/captain.dto";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Captain } from "@/types/captain";
import type { Transmission } from "@/types/enums";
import type { LessonBase } from "@/types/lesson";

const baseUrl = "/captains";

export const getAllCaptains = (data: GetAllCaptainsDto) => {
  return axiosClient.get<PaginatedResponse<Captain>>(baseUrl, {
    params: {
      page: data.page ?? 1,
      limit: data.limit ?? 10,
      search: data.search ?? "",
    },
  });
};

export const getCaptain = (id: string) =>
  axiosClient.get<SuccessfulResponse<Captain>>(`${baseUrl}/${id}`);

export const createCaptain = (data: CreateCaptainDto) =>
  axiosClient.post<SuccessfulResponse<Captain>>(baseUrl, data);

export const updateCaptain = (id: string, data: UpdateCaptainDto) =>
  axiosClient.patch<SuccessfulResponse<Captain>>(`${baseUrl}/${id}`, data);

export const deleteCaptain = (data: DeleteCaptainDto) =>
  axiosClient.delete<SuccessfulResponse<null>>(`${baseUrl}/${data.id}`);

export const getActiveCaptain = ({
  trainingType,
}: {
  trainingType: Transmission;
}) => {
  return axiosClient.get<PaginatedResponse<Captain>>(baseUrl, {
    params: {
      isActive: true,
      trainingType,
    },
  });
};

export const getLessonsCaptains = (data: GetLessonCaptainDto) => {
  const { userId, gte, lte } = data;
  return axiosClient.get<SuccessfulResponse<LessonBase[]>>(
    `${baseUrl}/${userId}/lessons`,
    {
      params: {
        gte,
        lte,
      },
    },
  );
};
