import { axiosClient } from "@/lib/axios";
import * as Dto from "@/DTOs/captain.dto";

import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Captain } from "@/types/captain";

type Entity = Captain;

const captainsUrl = {
  base: (academyId: string) => `/academies/${academyId}/captains`,
  byId: (academyId: string, captainId: string) => `/academies/${academyId}/captains/${captainId}`,
};

export const getAllCaptains = (data: Dto.GetAllDto) => {
  const { query, params } = data;
  const { academyId } = params

  return axiosClient.get<PaginatedResponse<Entity>>(
    captainsUrl.base(academyId),
    { params: query }
  );
};

export const getCaptain = (data: Dto.DeleteDto) => {
  const { params } = data;
  const { academyId, captainId } = params

  return axiosClient.get<SuccessfulResponse<Entity>>(
    captainsUrl.byId(academyId, captainId)
  );
};

export const createCaptain = (data: Dto.CreateDto) => {
  const { body, params } = data;
  const { academyId } = params

  return axiosClient.post<SuccessfulResponse<Entity>>(
    captainsUrl.base(academyId),
    body
  );
};

export const updateCaptain = (data: Dto.UpdateDto) => {
  const { params, body } = data;
  const { academyId, captainId } = params

  return axiosClient.patch<SuccessfulResponse<Entity>>(
    captainsUrl.byId(academyId, captainId),
    body
  );
};

export const deleteCaptain = (data: Dto.DeleteDto) => {
  const { params } = data;
  const { academyId, captainId } = params

  return axiosClient.delete<SuccessfulResponse<Entity>>(
    captainsUrl.byId(academyId, captainId)
  );
};