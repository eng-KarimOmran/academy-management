import { axiosClient } from "@/lib/axios";

import type {
  CreateClientDto,
  UpdateClientDto,
  DeleteClientDto,
  GetAllClientsDto,
  GetClientDetailsDto,
  GetClientByPhoneDto,
} from "@/DTOs/client.dto";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Client, ClientDetails } from "@/types/client";

const baseUrl = (academyId: string) => `/academies/${academyId}/clients`;

export const createClient = (data: CreateClientDto) => {
  const { academyId, ...body } = data;

  return axiosClient.post<SuccessfulResponse<Client>>(baseUrl(academyId), body);
};

export const updateClient = (data: UpdateClientDto) => {
  const { academyId, id, ...body } = data;

  return axiosClient.patch<SuccessfulResponse<Client>>(
    `${baseUrl(academyId)}/${id}`,
    body,
  );
};

export const deleteClient = (data: DeleteClientDto) => {
  const { academyId, id } = data;

  return axiosClient.delete<SuccessfulResponse<null>>(
    `${baseUrl(academyId)}/${id}`,
  );
};

export const getAllClients = (data: GetAllClientsDto) => {
  const { academyId } = data;

  return axiosClient.get<PaginatedResponse<Client>>(baseUrl(academyId), {
    params: {
      page: data.page ?? 1,
      limit: data.limit ?? 10,
      search: data.search ?? "",
    },
  });
};

export const getClientDetails = (params: GetClientDetailsDto) => {
  const { academyId, clientId } = params;
  return axiosClient.get<SuccessfulResponse<ClientDetails>>(
    `${baseUrl(academyId)}/${clientId}`,
  );
};

export const getClientByPhone = (params: GetClientByPhoneDto) => {
  const { academyId, phone } = params;
  return axiosClient.get<SuccessfulResponse<Client>>(
    `${baseUrl(academyId)}/phone/${phone}`,
  );
};