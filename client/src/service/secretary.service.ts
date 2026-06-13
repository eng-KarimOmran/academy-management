import type {
  CreateSecretaryDto,
  UpdateSecretaryDto,
  DeleteSecretaryDto,
  GetAllSecretariesDto,
  GetSecretaryParamsDto,
} from "@/DTOs/secretary.dto";

import { axiosClient } from "@/lib/axios";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Secretary } from "@/types/secretary";

const baseUrl = "/secretaries";

export const createSecretary = (data: CreateSecretaryDto) => {
  return axiosClient.post<SuccessfulResponse<Secretary>>(baseUrl, data);
};

export const updateSecretary = (data: UpdateSecretaryDto) => {
  const { secretaryId, ...body } = data;
  return axiosClient.patch<SuccessfulResponse<Secretary>>(
    `${baseUrl}/${secretaryId}`,
    body,
  );
};

export const deleteSecretary = (data: DeleteSecretaryDto) => {
  return axiosClient.delete<SuccessfulResponse<null>>(
    `${baseUrl}/${data.secretaryId}`,
  );
};

export const getSecretary = (data: GetSecretaryParamsDto) => {
  return axiosClient.get<SuccessfulResponse<Secretary>>(
    `${baseUrl}/${data.secretaryId}`,
  );
};

export const getAllSecretaries = (data: GetAllSecretariesDto) => {
  return axiosClient.get<PaginatedResponse<Secretary>>(baseUrl, {
    params: {
      ...data,
    },
  });
};