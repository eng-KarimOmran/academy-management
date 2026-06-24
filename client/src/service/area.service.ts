import * as Dto from "@/DTOs/area.dto";
import { axiosClient } from "@/lib/axios";

import type { Area } from "@/types/area";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";

type Entity = Area;

const areasUrl = {
  base: "/areas",
  byId: (id: string) => `/areas/${id}`,
};

export const getAllAreas = (data: Dto.GetAllDto) => {
  const { query } = data;

  return axiosClient.get<PaginatedResponse<Entity>>(areasUrl.base, {
    params: query,
  });
};

export const deleteArea = (data: Dto.DeleteDto) => {
  const { params } = data;
  const { areaId } = params

  return axiosClient.delete<SuccessfulResponse<null>>(
    areasUrl.byId(areaId)
  );
};

export const createArea = (data: Dto.CreateDto) => {
  const { body } = data;

  return axiosClient.post<SuccessfulResponse<Entity>>(
    areasUrl.base,
    body
  );
};

export const updateArea = (data: Dto.UpdateDto) => {
  const { params, body } = data;
  const { areaId } = params

  return axiosClient.patch<SuccessfulResponse<Entity>>(
    areasUrl.byId(areaId),
    body
  );
};

export const getArea = (data: Dto.DeleteDto) => {
  const { params } = data;
  const { areaId } = params

  return axiosClient.get<SuccessfulResponse<Entity>>(
    areasUrl.byId(areaId)
  );
};