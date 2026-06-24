import { axiosClient } from "@/lib/axios";
import * as Dto from "@/DTOs/secretary.dto";

import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Secretary } from "@/types/secretary";

type Entity = Secretary;

const secretariesUrl = {
  base: (academyId: string) => `/academies/${academyId}/secretaries`,

  byId: (academyId: string, secretaryId: string) => `/academies/${academyId}/secretaries/${secretaryId}`,
};

export const createSecretary = (data: Dto.CreateDto) => {
  const { body, params } = data;
  const { academyId } = params

  return axiosClient.post<SuccessfulResponse<Entity>>(
    secretariesUrl.base(academyId),
    body
  );
};

export const updateSecretary = (data: Dto.UpdateDto) => {
  const { params, body } = data;
  const { secretaryId, academyId } = params;

  return axiosClient.patch<SuccessfulResponse<Entity>>(
    secretariesUrl.byId(academyId, secretaryId),
    body
  );
};

export const deleteSecretary = (data: Dto.DeleteDto) => {
  const { params } = data;
  const { secretaryId, academyId } = params;

  return axiosClient.delete<SuccessfulResponse<null>>(
    secretariesUrl.byId(academyId, secretaryId)
  );
};

export const getSecretary = (data: Dto.GetDetailsDto) => {
  const { params } = data;
  const { secretaryId, academyId } = params;

  return axiosClient.get<SuccessfulResponse<Entity>>(
    secretariesUrl.byId(academyId, secretaryId)
  );
};

export const getAllSecretaries = (data: Dto.GetAllDto) => {
  const { query, params } = data;
  const { academyId } = params;

  return axiosClient.get<PaginatedResponse<Entity>>(
    secretariesUrl.base(academyId),
    {
      params: query,
    }
  );
};