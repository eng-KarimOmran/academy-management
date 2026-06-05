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

const bassUrl = "/area";

export const getAllAreas = (data: GetAllAreasDto) => {
  const query: string = `${bassUrl}?page=${data.page ?? 1}&limit=${data.limit ?? 10}&search=${data.search ?? ""}`;
  return axiosClient.get<PaginatedResponse<Area>>(query);
};

export const deleteArea = (data: DeleteAreaDto) =>
  axiosClient.delete<SuccessfulResponse<null>>(`${bassUrl}/${data.id}`);

export const createArea = (data: CreateAreaDto) =>
  axiosClient.post<SuccessfulResponse<Area>>(bassUrl, data);

export const updateArea = (id: string, data: UpdateAreaDto) =>
  axiosClient.patch<SuccessfulResponse<Area>>(`${bassUrl}/${id}`, data);

export const getArea = (id: string) =>
  axiosClient.get<SuccessfulResponse<Area>>(`${bassUrl}/details/${id}`);

export const getActiveAreas = (data: GetAreaActiveDto) =>
  axiosClient.get<SuccessfulResponse<Area[]>>(
    `${bassUrl}/active?type=${data.type}`,
  );