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

const bassUrl = "/secretary";

export const createSecretary = (data: CreateSecretaryDto) => {
  return axiosClient.post<SuccessfulResponse<Secretary>>(bassUrl, data);
};

export const updateSecretary = (data: UpdateSecretaryDto) => {
  const { secretaryId, ...body } = data;
  return axiosClient.patch<SuccessfulResponse<Secretary>>(
    `${bassUrl}/${secretaryId}`,
    body,
  );
};

export const deleteSecretary = (data: DeleteSecretaryDto) => {
  return axiosClient.delete<SuccessfulResponse<null>>(
    `${bassUrl}/${data.secretaryId}`,
  );
};

export const getSecretary = (data: GetSecretaryParamsDto) => {
  return axiosClient.get<SuccessfulResponse<Secretary>>(
    `${bassUrl}/${data.secretaryId}`,
  );
};

export const getAllSecretaries = (params: GetAllSecretariesDto) => {
  return axiosClient.get<PaginatedResponse<Secretary>>(bassUrl, {
    params,
  });
};
