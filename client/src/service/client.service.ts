import { axiosClient } from "@/lib/axios";
import * as Dto from "@/DTOs/client.dto";

import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Client, ClientDetails } from "@/types/client";

type Entity = Client;
type EntityDetails = ClientDetails;

const clientsUrl = {
  base: (academyId: string) =>
    `/academies/${academyId}/clients`,

  byId: (academyId: string, clientId: string) =>
    `/academies/${academyId}/clients/${clientId}`,

  details: (academyId: string, clientId: string) =>
    `/academies/${academyId}/clients/${clientId}`,

  byPhone: (academyId: string, phone: string) =>
    `/academies/${academyId}/clients/phone/${phone}`,
};

export const createClient = (data: Dto.CreateClientDto) => {
  const { academyId, ...body } = data.body

  return axiosClient.post<SuccessfulResponse<Entity>>(
    clientsUrl.base(academyId),
    body
  );
};

export const updateClient = (data: Dto.UpdateClientDto) => {
  const { params, body } = data;
  const { academyId, clientId } = params;

  return axiosClient.patch<SuccessfulResponse<Entity>>(
    clientsUrl.byId(academyId, clientId),
    body
  );
};

export const deleteClient = (data: Dto.DeleteClientDto) => {
  const { params } = data;
  const { academyId, clientId } = params;

  return axiosClient.delete<SuccessfulResponse<null>>(
    clientsUrl.byId(academyId, clientId)
  );
};

export const getAllClients = (data: Dto.GetAllClientsDto) => {
  const { params, query } = data;
  const { academyId } = params;

  return axiosClient.get<PaginatedResponse<Entity>>(
    clientsUrl.base(academyId),
    {
      params: query
    }
  );
};

export const getClientDetails = (data: Dto.ClientDetailsDto) => {
  const { params } = data;
  const { academyId, clientId } = params;

  return axiosClient.get<SuccessfulResponse<EntityDetails>>(
    clientsUrl.details(academyId, clientId)
  );
};

export const getClientByPhone = (data: Dto.GetClientByPhoneDto) => {
  const { params } = data;
  const { academyId, phone } = params;

  return axiosClient.get<SuccessfulResponse<Entity>>(
    clientsUrl.byPhone(academyId, phone)
  );
};