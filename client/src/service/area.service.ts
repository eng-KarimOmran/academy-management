import type {
  CreateAreaDto,
  DeleteAreaDto,
  GetAllAreasDto,
  UpdateAreaDto,
  GetAreaActiveDto,
} from "@/DTOs/area.dto";
import { axiosClient } from "@/lib/axios";
import type { Area } from "@/types/area";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";

const baseUrl = "/areas";

export const getAllAreas = (data: GetAllAreasDto) => {
  return axiosClient.get<PaginatedResponse<Area>>(baseUrl, {
    params: {
      page: data.page ?? 1,
      limit: data.limit ?? 10,
      search: data.search ?? "",
    },
  });
};

export const deleteArea = (data: DeleteAreaDto) =>
  axiosClient.delete<SuccessfulResponse<null>>(`${baseUrl}/${data.id}`);

export const createArea = (data: CreateAreaDto) =>
  axiosClient.post<SuccessfulResponse<Area>>(baseUrl, data);

export const updateArea = (id: string, data: UpdateAreaDto) =>
  axiosClient.patch<SuccessfulResponse<Area>>(`${baseUrl}/${id}`, data);

export const getArea = (id: string) =>
  axiosClient.get<SuccessfulResponse<Area>>(`${baseUrl}/${id}`);

export const getActiveAreas = (data: GetAreaActiveDto) =>
  axiosClient.get<PaginatedResponse<Area>>(baseUrl, {
    params: {
      supportType: data.type,
      isActive: true,
    },
  });
