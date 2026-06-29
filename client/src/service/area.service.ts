import * as Dto from "@/DTOs/area.dto";
import { axiosClient } from "@/lib/axios";

import type { Area } from "@/types/area";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";

type Entity = Area;

const areasUrl = {
  base: (academyId: string) => `/academies/${academyId}/area`,
  byId: (academyId: string, id: string) => `/academies/${academyId}/area/${id}`,
};

export const getAllAreas = (data: Dto.GetAllDto) => {
  const { query, params } = data;
  const { academyId } = params

  return axiosClient.get<PaginatedResponse<Entity>>(areasUrl.base(academyId), {
    params: query,
  });
};

export const deleteArea = (data: Dto.DeleteDto) => {
  const { params } = data;
  const { areaId, academyId } = params

  return axiosClient.delete<SuccessfulResponse<null>>(
    areasUrl.byId(academyId, areaId)
  );
};

export const createArea = (data: Dto.CreateDto) => {
  const { body, params } = data;
  const { academyId } = params

  return axiosClient.post<SuccessfulResponse<Entity>>(
    areasUrl.base(academyId),
    body
  );
};

export const updateArea = (data: Dto.UpdateDto) => {
  const { params, body } = data;
  const { areaId, academyId } = params

  return axiosClient.patch<SuccessfulResponse<Entity>>(
    areasUrl.byId(academyId, areaId),
    body
  );
};

export const getArea = (data: Dto.DeleteDto) => {
  const { params } = data;
  const { areaId, academyId } = params

  return axiosClient.get<SuccessfulResponse<Entity>>(
    areasUrl.byId(academyId, areaId)
  );
};